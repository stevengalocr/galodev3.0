'use client';

import { useState, useMemo, useCallback } from 'react';

function parseMarkdown(md: string): string {
  let s = md;

  // Escape HTML
  s = s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  // Fenced code blocks
  s = s.replace(/```(\w*)\n([\s\S]*?)```/g, (_, lang, code) =>
    `\x02pre\x03<code${lang ? ` class="lang-${lang}"` : ''}>${code.trimEnd()}</code>\x02/pre\x03`
  );

  // Inline code
  s = s.replace(/`([^`\n]+)`/g, '\x02code\x03$1\x02/code\x03');

  // Headers
  s = s.replace(/^###### (.+)$/gm, '\x02h6\x03$1\x02/h6\x03');
  s = s.replace(/^##### (.+)$/gm, '\x02h5\x03$1\x02/h5\x03');
  s = s.replace(/^#### (.+)$/gm, '\x02h4\x03$1\x02/h4\x03');
  s = s.replace(/^### (.+)$/gm, '\x02h3\x03$1\x02/h3\x03');
  s = s.replace(/^## (.+)$/gm, '\x02h2\x03$1\x02/h2\x03');
  s = s.replace(/^# (.+)$/gm, '\x02h1\x03$1\x02/h1\x03');

  // Bold + italic
  s = s.replace(/\*\*\*(.+?)\*\*\*/g, '\x02strong\x03\x02em\x03$1\x02/em\x03\x02/strong\x03');
  s = s.replace(/\*\*(.+?)\*\*/g, '\x02strong\x03$1\x02/strong\x03');
  s = s.replace(/\*(.+?)\*/g, '\x02em\x03$1\x02/em\x03');
  s = s.replace(/__(.+?)__/g, '\x02strong\x03$1\x02/strong\x03');
  s = s.replace(/_(.+?)_/g, '\x02em\x03$1\x02/em\x03');

  // Strikethrough
  s = s.replace(/~~(.+?)~~/g, '\x02del\x03$1\x02/del\x03');

  // Blockquote
  s = s.replace(/^&gt; (.+)$/gm, '\x02blockquote\x03$1\x02/blockquote\x03');

  // HR
  s = s.replace(/^(-{3,}|\*{3,}|_{3,})$/gm, '\x02hr /\x03');

  // Unordered lists
  s = s.replace(/^[-*] (.+)$/gm, '\x02li\x03$1\x02/li\x03');
  s = s.replace(/(\x02li\x03[\s\S]*?\x02\/li\x03)+/g, (m) => `\x02ul\x03${m}\x02/ul\x03`);

  // Ordered lists
  s = s.replace(/^\d+\. (.+)$/gm, '\x02oli\x03$1\x02/oli\x03');
  s = s.replace(/(\x02oli\x03[\s\S]*?\x02\/oli\x03)+/g, (m) =>
    `\x02ol\x03${m.replace(/\x02oli\x03/g, '\x02li\x03').replace(/\x02\/oli\x03/g, '\x02/li\x03')}\x02/ol\x03`
  );

  // Links + images
  s = s.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '\x02img src="$2" alt="$1" style="max-width:100%;border-radius:8px" /\x03');
  s = s.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '\x02a href="$2" target="_blank" rel="noopener noreferrer"\x03$1\x02/a\x03');

  // Paragraphs
  const lines = s.split('\n');
  const result: string[] = [];
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) { result.push('</p><p>'); continue; }
    if (trimmed.startsWith('\x02h') || trimmed.startsWith('\x02ul') || trimmed.startsWith('\x02ol') ||
        trimmed.startsWith('\x02blockquote') || trimmed.startsWith('\x02hr') || trimmed.startsWith('\x02pre')) {
      result.push(`</p>${trimmed}<p>`);
    } else {
      result.push(trimmed);
    }
  }
  s = `<p>${result.join('\n')}</p>`;
  s = s.replace(/<p>\s*<\/p>/g, '');
  s = s.replace(/<p>\n*<\/p>/g, '');

  // Restore tags
  s = s.replace(/\x02/g, '<').replace(/\x03/g, '>');

  return s;
}

const SAMPLE = `# Markdown Previewer

GaloDev tiene **herramientas gratuitas** para desarrolladores y diseñadores.

## Por qué usar Markdown

El formato Markdown es *simple*, portable y universal. Lo usan:

- GitHub, GitLab, Bitbucket
- Notion, Obsidian, VS Code
- README files y documentación

## Código

Código inline: \`npm install\`

\`\`\`javascript
function saludo(nombre) {
  return \`Hola, \${nombre}!\`;
}
console.log(saludo('GaloDev'));
\`\`\`

## Recursos

[Visita GaloDev](https://galodev.com) para más herramientas gratuitas.

---

> Herramientas que ayudan a todos.
`;

export default function MarkdownPreviewer() {
  const [md, setMd] = useState(SAMPLE);
  const [view, setView] = useState<'split' | 'preview' | 'editor'>('split');
  const [copied, setCopied] = useState(false);

  const html = useMemo(() => parseMarkdown(md), [md]);
  const wordCount = md.trim() ? md.trim().split(/\s+/).length : 0;
  const charCount = md.length;

  const copyHtml = useCallback(async () => {
    await navigator.clipboard.writeText(html);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [html]);

  const views = [
    { key: 'split', label: 'Dividido' },
    { key: 'editor', label: 'Editor' },
    { key: 'preview', label: 'Vista previa' },
  ] as const;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Toolbar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 24px', borderBottom: '1px solid var(--line)', gap: 16, flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', background: 'var(--ink-3)', border: '1px solid var(--line)', borderRadius: 999, padding: 3, gap: 3 }}>
          {views.map(({ key, label }) => (
            <button key={key} onClick={() => setView(key)} style={{
              padding: '7px 16px', borderRadius: 999, fontSize: 12, fontFamily: 'var(--font-mono)',
              letterSpacing: '0.06em', border: 'none', cursor: 'pointer',
              background: view === key ? 'var(--lime)' : 'transparent',
              color: view === key ? 'var(--ink)' : 'var(--paper-mute)',
              fontWeight: view === key ? 600 : 400, transition: 'all 0.2s',
            }}>{label}</button>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--paper-fade)' }}>{wordCount} palabras · {charCount} chars</span>
          <button onClick={copyHtml} className="btn btn-ghost btn-sm">{copied ? '✓ HTML copiado' : 'Copiar HTML'}</button>
          <button onClick={() => setMd('')} style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--paper-mute)', background: 'none', border: 'none', cursor: 'pointer' }}>Limpiar</button>
        </div>
      </div>

      {/* Editor / Preview */}
      <div style={{ display: 'grid', gridTemplateColumns: view === 'split' ? '1fr 1fr' : '1fr', minHeight: 480, flex: 1 }}>
        {/* Editor pane */}
        {(view === 'split' || view === 'editor') && (
          <div style={{ display: 'flex', flexDirection: 'column', borderRight: view === 'split' ? '1px solid var(--line)' : 'none' }}>
            <div style={{ padding: '8px 16px', borderBottom: '1px solid var(--line)', fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--paper-fade)' }}>Markdown</div>
            <textarea
              value={md}
              onChange={e => setMd(e.target.value)}
              spellCheck={false}
              style={{
                flex: 1, padding: '20px 24px', background: 'var(--ink-3)', border: 'none',
                color: 'var(--paper)', fontFamily: 'var(--font-mono)', fontSize: 14,
                lineHeight: 1.7, resize: 'none', outline: 'none', minHeight: 480,
              }}
            />
          </div>
        )}

        {/* Preview pane */}
        {(view === 'split' || view === 'preview') && (
          <div style={{ display: 'flex', flexDirection: 'column', background: 'var(--ink-2)' }}>
            <div style={{ padding: '8px 16px', borderBottom: '1px solid var(--line)', fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--paper-fade)' }}>Vista previa</div>
            <div
              className="md-preview"
              dangerouslySetInnerHTML={{ __html: html }}
              style={{ flex: 1, padding: '20px 28px', overflowY: 'auto', color: 'var(--paper-dim)', lineHeight: 1.75, fontSize: 15 }}
            />
          </div>
        )}
      </div>

      <style>{`
        .md-preview h1,.md-preview h2,.md-preview h3,.md-preview h4{font-family:var(--font-serif);color:var(--paper);margin:24px 0 12px;letter-spacing:-0.02em;line-height:1.1}
        .md-preview h1{font-size:36px}.md-preview h2{font-size:28px;padding-bottom:8px;border-bottom:1px solid var(--line)}.md-preview h3{font-size:22px}
        .md-preview p{margin:0 0 14px}.md-preview strong{color:var(--paper);font-weight:600}
        .md-preview em{font-style:italic;color:var(--paper)}
        .md-preview code{font-family:var(--font-mono);font-size:0.88em;background:var(--ink-3);padding:2px 6px;border-radius:4px;color:var(--lime)}
        .md-preview pre{background:var(--ink-3);border:1px solid var(--line);border-radius:12px;padding:16px 20px;overflow-x:auto;margin:0 0 16px}
        .md-preview pre code{background:none;padding:0;color:var(--paper);font-size:13px;border-radius:0}
        .md-preview ul,.md-preview ol{padding-left:24px;margin:0 0 14px}
        .md-preview li{margin-bottom:4px}
        .md-preview blockquote{margin:0 0 14px;padding:12px 20px;border-left:3px solid var(--lime);background:rgba(130,230,0,0.05);border-radius:0 8px 8px 0;color:var(--paper-dim);font-style:italic}
        .md-preview hr{border:none;border-top:1px solid var(--line);margin:24px 0}
        .md-preview a{color:var(--lime);text-decoration:underline;text-underline-offset:2px}
        .md-preview del{text-decoration:line-through;color:var(--paper-fade)}
      `}</style>
    </div>
  );
}
