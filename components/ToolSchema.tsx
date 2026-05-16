import type { Tool } from '@/lib/tools';

type Props = { tool: Tool; url: string };

export default function ToolSchema({ tool, url }: Props) {
  const appSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: tool.name,
    description: tool.desc,
    url,
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'Web browser',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    featureList: tool.seoText?.what ?? tool.desc,
    inLanguage: 'es',
    author: {
      '@type': 'Organization',
      name: 'GaloDev',
      url: 'https://galodev.com',
    },
  };

  const faqSchema = tool.seoText?.faqs?.length
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: tool.seoText.faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.q,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.a,
          },
        })),
      }
    : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(appSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
    </>
  );
}
