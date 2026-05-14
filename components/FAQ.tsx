'use client';

import { useState } from 'react';

type FAQItem = { q: string; a: string };
type Props = { items: FAQItem[]; defaultOpen?: number };

export default function FAQ({ items, defaultOpen = 0 }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpen);

  return (
    <div className="faq">
      {items.map((item, i) => (
        <div key={i} className={`faq-item${openIndex === i ? ' open' : ''}`}>
          <button className="faq-q" onClick={() => setOpenIndex(openIndex === i ? null : i)}>
            <span className="faq-q-text">{item.q}</span>
            <span className="faq-toggle" />
          </button>
          <div className="faq-a">{item.a}</div>
        </div>
      ))}
    </div>
  );
}
