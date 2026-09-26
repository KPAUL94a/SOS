import { useEffect, useRef, useState, type FormEvent } from 'react';

type ChatRole = 'user' | 'assistant';
type ChatMessage = {
  id: number;
  role: ChatRole;
  content: string;
};
type OllamaMessage = {
  role: 'system' | ChatRole;
  content: string;
};
type ConnectionStatus = 'checking' | 'connected' | 'offline';

const systemPrompt =
  'You are a concise disaster-preparedness assistant. Give practical, calm guidance, prioritize immediate safety, and direct people to local emergency services for urgent danger. Do not claim to know live conditions or replace official instructions. If information is uncertain, say so.';

function normalizeEndpoint(endpoint: string) {
  return endpoint.trim().replace(/\/+$/, '');
}

export default function LocalLlamaChat() {
  const [endpoint, setEndpoint] = useState('http://localhost:11434');
  const [endpointDraft, setEndpointDraft] = useState('http://localhost:11434');
  const [models, setModels] = useState<string[]>([]);
  const [model, setModel] = useState('');
  const [status, setStatus] = useState<ConnectionStatus>('checking');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [prompt, setPrompt] = useState('');
  const [error, setError] = useState('');
  const [sending, setSending] = useState(false);
  const controllerRef = useRef<AbortController | null>(null);
  const transcriptRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const controller = new AbortController();
    setStatus('checking');
    setModels([]);
    setModel('');
    setError('');

    async function loadModels() {
      try {
        const response = await fetch(`${normalizeEndpoint(endpoint)}/api/tags`, {
          signal: controller.signal,
        });
        if (!response.ok) {
          throw new Error(`Ollama returned ${response.status} while loading models.`);
        }
        const result = (await response.json()) as {
          models?: Array<{ name?: string }>;
        };
        const availableModels = (result.models ?? [])
          .map((item) => item.name)
          .filter((name): name is string => Boolean(name));
        setModels(availableModels);
        setModel((current) => availableModels.includes(current) ? current : availableModels[0] ?? '');
        setStatus('connected');
      } catch (cause) {
        if (controller.signal.aborted) return;
        setStatus('offline');
        setError(
          cause instanceof TypeError
            ? 'Could not reach Ollama. Check that it is running and allows this app’s origin with OLLAMA_ORIGINS.'
            : cause instanceof Error
              ? cause.message
              : 'Could not load local models.',
        );
      }
    }

    if (normalizeEndpoint(endpoint)) {
      void loadModels();
    } else {
      setStatus('offline');
      setError('Enter the URL of your local Ollama server.');
    }

    return () => controller.abort();
  }, [endpoint]);

  useEffect(() => {
    transcriptRef.current?.scrollTo({
      top: transcriptRef.current.scrollHeight,
      behavior: 'smooth',
    });
  }, [messages]);

  async function sendMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const content = prompt.trim();
    if (!content || sending || !model) return;

    const conversation = [...messages, { id: Date.now(), role: 'user' as const, content }];
    const assistantId = Date.now() + 1;
    setMessages([...conversation, { id: assistantId, role: 'assistant', content: '' }]);
    setPrompt('');
    setError('');
    setSending(true);

    const controller = new AbortController();
    controllerRef.current = controller;

    try {
      const response = await fetch(`${normalizeEndpoint(endpoint)}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal,
        body: JSON.stringify({
          model,
          stream: true,
          messages: [
            { role: 'system', content: systemPrompt },
            ...conversation.map(({ role, content: messageContent }) => ({
              role,
              content: messageContent,
            })),
          ] satisfies OllamaMessage[],
        }),
      });

      if (!response.ok) {
        const body = await response.text();
        let detail = body;
        try {
          const parsed = JSON.parse(body) as { error?: string };
          detail = parsed.error ?? body;
        } catch {
          // Keep the response body as the most useful available error detail.
        }
        throw new Error(detail || `Ollama returned ${response.status}.`);
      }
      if (!response.body) {
        throw new Error('Ollama did not return a readable response stream.');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';
      let answer = '';

      function addChunk(line: string) {
        if (!line.trim()) return;
        const chunk = JSON.parse(line) as {
          message?: { content?: string };
          error?: string;
        };
        if (chunk.error) throw new Error(chunk.error);
        const text = chunk.message?.content ?? '';
        if (text) {
          answer += text;
          setMessages((current) =>
            current.map((message) =>
              message.id === assistantId
                ? { ...message, content: answer }
                : message,
            ),
          );
        }
      }

      while (true) {
        const { done, value } = await reader.read();
        buffer += decoder.decode(value, { stream: !done });
        const lines = buffer.split('\n');
        buffer = lines.pop() ?? '';
        for (const line of lines) addChunk(line);
        if (done) break;
      }
      addChunk(buffer);
      if (!answer) {
        throw new Error('The local model returned an empty response. Try again.');
      }
    } catch (cause) {
      if (cause instanceof DOMException && cause.name === 'AbortError') {
        setMessages((current) =>
          current.filter((message) => message.id !== assistantId || message.content),
        );
      } else {
        setMessages((current) =>
          current.filter((message) => message.id !== assistantId || message.content),
        );
        setError(cause instanceof Error ? cause.message : 'The local model request failed.');
      }
    } finally {
      controllerRef.current = null;
      setSending(false);
    }
  }

  function stopResponse() {
    controllerRef.current?.abort();
  }

  function connect(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextEndpoint = normalizeEndpoint(endpointDraft);
    if (nextEndpoint) setEndpoint(nextEndpoint);
  }

  return (
    <section className="rounded-[12px] border border-white/15 bg-[#183c32] p-4 shadow-[0_8px_22px_rgba(0,0,0,0.18)]">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2
            style={{ fontFamily: "'League Gothic:Regular'", fontVariationSettings: '"wdth" 100', fontSize: 22 }}
            className="m-0 text-white"
          >
            Ask Llama
          </h2>
          <p style={{ fontFamily: "'Kreon:Regular'", fontSize: 12 }} className="mb-0 mt-1 text-white/75">
            Llama is a specially trained AI model for disaster management
          </p>
        </div>
        <span
          role="status"
          aria-label={status === 'connected' ? `Connected to ${model}` : status}
          title={status === 'connected' ? `Connected to ${model}` : status}
          className={`size-2.5 shrink-0 rounded-full ring-4 ${
            status === 'connected'
              ? 'bg-emerald-300 ring-emerald-300/15'
              : status === 'checking'
                ? 'animate-pulse bg-amber-300 ring-amber-300/15'
                : 'bg-red-300 ring-red-300/15'
          }`}
        />
      </div>

      {messages.length > 0 && (
        <div
          ref={transcriptRef}
          aria-live="polite"
          aria-label="Chat messages"
          className="mt-3 flex max-h-[min(42vh,360px)] min-h-20 flex-col gap-2 overflow-y-auto rounded-[8px] bg-black/15 p-3"
        >
          {messages.map((message) => (
            <div
              key={message.id}
              className={`max-w-[90%] whitespace-pre-wrap break-words rounded-[10px] px-3 py-2 text-sm ${
                message.role === 'user'
                  ? 'ml-auto bg-[#e5f2e8] text-[#20362d]'
                  : 'mr-auto bg-white/15 text-white'
              }`}
            >
              {message.content || (sending ? 'Thinking…' : '')}
            </div>
          ))}
        </div>
      )}

      {error && (
        <p role="alert" className="mb-0 mt-3 rounded-[8px] bg-red-950/40 px-3 py-2 text-sm text-red-100">
          {error}
        </p>
      )}

      <form onSubmit={sendMessage} className="mt-3 flex items-center gap-2 rounded-[8px] bg-white/95 p-1.5 focus-within:ring-2 focus-within:ring-emerald-300">
        <label className="min-w-0 flex-1">
          <span className="sr-only">Ask Llama a question</span>
          <input
            aria-label="Ask Llama a question"
            value={prompt}
            onChange={(event) => setPrompt(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter' && !event.shiftKey) {
                event.preventDefault();
                event.currentTarget.form?.requestSubmit();
              }
            }}
            placeholder="Ask anything about the emergency..."
            disabled={status !== 'connected' || !model || sending}
            className="w-full min-w-0 bg-transparent px-2 py-1.5 text-sm text-[#20362d] outline-none placeholder:text-gray-500 disabled:cursor-not-allowed"
          />
        </label>
        {sending ? (
          <button
            type="button"
            onClick={stopResponse}
            aria-label="Stop response"
            className="flex size-9 shrink-0 items-center justify-center rounded-[6px] bg-[#2d6752] text-white transition-colors hover:bg-[#23513f]"
          >
            <svg aria-hidden="true" viewBox="0 0 20 20" className="size-4" fill="currentColor">
              <rect x="4" y="4" width="12" height="12" rx="2" />
            </svg>
          </button>
        ) : (
          <button
            type="submit"
            aria-label="Send question"
            disabled={!prompt.trim() || status !== 'connected' || !model}
            className="flex size-9 shrink-0 items-center justify-center rounded-[6px] bg-[#2d6752] text-white transition-colors hover:bg-[#23513f] disabled:cursor-not-allowed disabled:opacity-40"
          >
            <svg aria-hidden="true" viewBox="0 0 20 20" className="size-4" fill="none">
              <path d="M3.5 10h12m-5-5 5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        )}
      </form>

      <details className="mt-2 text-xs text-white/70">
        <summary className="w-fit cursor-pointer select-none">Local model settings</summary>
        <div className="mt-2 flex flex-col gap-2 rounded-[8px] bg-black/15 p-3">
          <label className="flex flex-col gap-1">
            Model
            <select
              aria-label="Local model"
              value={model}
              onChange={(event) => setModel(event.target.value)}
              disabled={status !== 'connected' || models.length === 0 || sending}
              className="w-full rounded-[6px] border border-white/20 bg-[#244b40] px-3 py-2 text-sm text-white disabled:opacity-60"
            >
              {models.length === 0 && <option value="">No local models found</option>}
              {models.map((name) => <option key={name} value={name}>{name}</option>)}
            </select>
          </label>
          <form onSubmit={connect} className="flex flex-col gap-1.5">
            <label htmlFor="ollama-endpoint">Ollama URL</label>
            <div className="flex gap-2">
              <input
                id="ollama-endpoint"
                value={endpointDraft}
                onChange={(event) => setEndpointDraft(event.target.value)}
                placeholder="http://localhost:11434"
                className="min-w-0 flex-1 rounded-[6px] border border-white/20 bg-[#244b40] px-3 py-2 text-sm text-white placeholder:text-white/45"
                type="url"
              />
              <button type="submit" className="rounded-[6px] bg-white/15 px-3 py-2 text-white hover:bg-white/25">
                Connect
              </button>
            </div>
          </form>
        </div>
      </details>
    </section>
  );
}
