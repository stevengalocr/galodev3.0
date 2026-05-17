declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

function track(event: string, params?: Record<string, string | number>) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', event, params);
  }
}

export const analytics = {
  toolUsed: (toolSlug: string) =>
    track('tool_used', { tool_slug: toolSlug }),

  copied: (context: string) =>
    track('copy_click', { context }),

  shared: (method: string, url: string) =>
    track('share', { method, content_url: url }),

  articleRead: (slug: string) =>
    track('article_read', { article_slug: slug }),
};
