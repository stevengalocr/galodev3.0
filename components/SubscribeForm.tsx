'use client';

type Props = {
  placeholder?: string;
  buttonLabel?: string;
  style?: React.CSSProperties;
  inputStyle?: React.CSSProperties;
  variant?: 'pill' | 'stack';
};

export default function SubscribeForm({
  placeholder = 'tu@email.com',
  buttonLabel = 'Suscribirse',
  style,
  inputStyle,
  variant = 'pill',
}: Props) {
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // TODO: wire to newsletter provider (ConvertKit, Beehiiv, etc.)
  }

  if (variant === 'stack') {
    return (
      <form style={{ display: 'flex', flexDirection: 'column', gap: 8, ...style }} onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder={placeholder}
          required
          style={{
            padding: '10px 14px',
            border: '1px solid var(--line-2)',
            borderRadius: 999,
            fontSize: 13,
            color: 'var(--paper)',
            background: 'var(--ink)',
            ...inputStyle,
          }}
        />
        <button className="btn btn-glow" type="submit">{buttonLabel}</button>
      </form>
    );
  }

  return (
    <form
      style={{
        display: 'inline-flex',
        gap: 8,
        alignItems: 'center',
        background: 'var(--ink-3)',
        border: '1px solid var(--line)',
        borderRadius: 999,
        padding: '6px 6px 6px 18px',
        ...style,
      }}
      onSubmit={handleSubmit}
    >
      <input type="email" placeholder={placeholder} required style={{ fontSize: 14, minWidth: 200, ...inputStyle }} />
      <button className="btn btn-glow btn-sm" type="submit">{buttonLabel}</button>
    </form>
  );
}
