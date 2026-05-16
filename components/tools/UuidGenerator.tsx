'use client';

import { useState, useCallback } from 'react';

function genV4(): string {
  return crypto.randomUUID();
}

type Format = 'default' | 'uppercase' | 'nodashes' | 'braces';

function formatUuid(uuid: string, fmt: Format): string {
  switch (fmt) {
    case 'uppercase': return uuid.toUpperCase();
    case 'nodashes': return uuid.replace(/-/g, '');
    case 'braces': return `{${uuid}}`;
    default: return uuid;
  }
}

export default function UuidGenerator() {
  const [uuid, setUuid] = useState(() => genV4());
  const [bulk, setBulk] = useState(10);
  const [bulkList, setBulkList] = useState<string[]>([]);
  const [format, setFormat] = useState<Format>('default');
  const [copied, setCopied] = useState<string | null>(null);

  const generate = useCallback(() => setUuid(genV4()), []);

  const generateBulk = useCallback(() => {
    setBulkList(Array.from({ length: bulk }, () => genV4()));
  }, [bulk]);

  const copy = async (text: string, key: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  };

  const copyAll = async () => {
    const text = bulkList.map(u => formatUuid(u, format)).join('\n');
    await copy(text, 'all');
  };

  const fmtOptions: { key: Format; label: string }[] = [
    { key: 'default', label: 'Estándar' },
    { key: 'uppercase', label: 'Mayúsculas' },
    { key: 'nodashes', label: 'Sin guiones' },
    { key: 'braces', label: '{Con llaves}' },
  ];

  return (
    <div style={{ padding: '32px 40px', display: 'flex', flexDirection: 'column', gap: 28 }}>

      {/* Single UUID */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <label style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--paper-mute)' }}>UUID v4</label>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <div style={{ flex: 1, padding: '16px 20px', background: 'var(--ink-3)', border: '1px solid var(--line)', borderRadius: 14, fontFamily: 'var(--font-mono)', fontSize: 16, color: 'var(--lime)', letterSpacing: '0.04em', wordBreak: 'break-all' }}>
            {formatUuid(uuid, format)}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <button onClick={generate} className="btn btn-glow btn-sm" style={{ whiteSpace: 'nowrap' }}>Generar</button>
            <button onClick={() => copy(formatUuid(uuid, format), 'single')} className="btn btn-ghost btn-sm">
              {copied === 'single' ? '✓ Copiado' : 'Copiar'}
            </button>
          </div>
        </div>
      </div>

      {/* Format */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <label style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--paper-mute)' }}>Formato</label>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {fmtOptions.map(({ key, label }) => (
            <button key={key} onClick={() => setFormat(key)} style={{
              padding: '8px 16px', borderRadius: 999, fontSize: 12, fontFamily: 'var(--font-mono)',
              letterSpacing: '0.06em', border: '1px solid',
              borderColor: format === key ? 'var(--lime)' : 'var(--line)',
              background: format === key ? 'rgba(130,230,0,0.12)' : 'var(--ink-3)',
              color: format === key ? 'var(--lime)' : 'var(--paper-mute)',
              cursor: 'pointer', transition: 'all 0.2s',
            }}>{label}</button>
          ))}
        </div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--paper-fade)', padding: '8px 12px', background: 'var(--ink-3)', borderRadius: 8, border: '1px solid var(--line)' }}>
          Preview: <span style={{ color: 'var(--paper-mute)' }}>{format === 'nodashes' ? formatUuid(uuid, format) : formatUuid(uuid, format)}</span>
        </div>
      </div>

      {/* Bulk */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, borderTop: '1px solid var(--line)', paddingTop: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <label style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--paper-mute)' }}>Generación masiva</label>
          {bulkList.length > 0 && (
            <button onClick={copyAll} className="btn btn-glow btn-sm">
              {copied === 'all' ? '✓ Todos copiados' : `Copiar ${bulkList.length}`}
            </button>
          )}
        </div>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', flex: 1 }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--paper-mute)' }}>{bulk} UUIDs</span>
          </div>
          <input type="range" min={1} max={100} value={bulk} onChange={e => setBulk(Number(e.target.value))}
            style={{ flex: 1, accentColor: 'var(--lime)', cursor: 'pointer' }} />
          <button onClick={generateBulk} className="btn btn-ghost btn-sm" style={{ whiteSpace: 'nowrap' }}>Generar {bulk}</button>
        </div>
        {bulkList.length > 0 && (
          <div style={{ maxHeight: 240, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 4 }}>
            {bulkList.map((u, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, padding: '8px 14px', background: 'var(--ink-3)', borderRadius: 8, border: '1px solid var(--line)' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--paper-dim)', flex: 1 }}>{formatUuid(u, format)}</span>
                <button onClick={() => copy(formatUuid(u, format), `bulk-${i}`)} style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: copied === `bulk-${i}` ? 'var(--lime)' : 'var(--paper-mute)', background: 'none', border: 'none', cursor: 'pointer' }}>
                  {copied === `bulk-${i}` ? '✓' : 'Copiar'}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
