'use client';

import { Component, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
  toolName?: string;
}

interface State {
  hasError: boolean;
  message: string;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, message: '' };
  }

  static getDerivedStateFromError(err: Error): State {
    return { hasError: true, message: err.message };
  }

  componentDidCatch(err: Error) {
    // Only log in dev — in prod this is silently recovered
    if (process.env.NODE_ENV === 'development') {
      console.error('[ErrorBoundary]', err);
    }
  }

  reset = () => this.setState({ hasError: false, message: '' });

  render() {
    if (!this.state.hasError) return this.props.children;
    return (
      <div
        style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          justifyContent: 'center', gap: 16, padding: '64px 24px',
          textAlign: 'center',
        }}
      >
        <span style={{ fontSize: 48 }}>⚠️</span>
        <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 28, letterSpacing: '-0.02em' }}>
          Algo salió mal
        </h2>
        <p style={{ fontSize: 15, color: 'var(--paper-mute)', maxWidth: 400 }}>
          {this.props.toolName
            ? `La herramienta "${this.props.toolName}" encontró un error inesperado.`
            : 'Esta herramienta encontró un error inesperado.'}
          {' '}Podés intentarlo de nuevo o contactarnos si el problema persiste.
        </p>
        {this.state.message && (
          <code style={{
            fontSize: 12, color: 'var(--paper-fade)', background: 'var(--ink-3)',
            padding: '6px 12px', borderRadius: 6, fontFamily: 'var(--font-mono)',
            maxWidth: 480, wordBreak: 'break-all',
          }}>
            {this.state.message}
          </code>
        )}
        <button
          onClick={this.reset}
          className="btn btn-ghost btn-sm"
          style={{ marginTop: 8 }}
        >
          Reintentar
        </button>
      </div>
    );
  }
}
