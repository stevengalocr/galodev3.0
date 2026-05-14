export type Tool = {
  slug: string;
  name: string;
  category: string;
  desc: string;
  uses: string;
  icon: string;
  comingSoon?: boolean;
};

export const tools: Tool[] = [
  {
    slug: 'base64',
    name: 'Base64 Tool',
    category: 'Dev',
    desc: 'Codifica y decodifica texto en Base64 al instante. Soporta texto plano, JSON y URLs. Todo en tu navegador.',
    uses: '198 hoy',
    icon: 'hash',
  },
  {
    slug: 'video-trimmer',
    name: 'Video Trimmer',
    category: 'Video',
    desc: 'Corta clips de video localmente con precisión de milisegundos. Sin subir a servidores. Soporta MP4, WebM, MOV.',
    uses: '312 hoy',
    icon: 'scissors',
  },
  {
    slug: 'video-compressor',
    name: 'Video Compressor',
    category: 'Video',
    desc: 'Reduce el peso de tus videos hasta un 90% sin pérdida visual notable. Procesado 100% en tu dispositivo.',
    uses: '289 hoy',
    icon: 'compress',
  },
  {
    slug: 'gif-maker',
    name: 'GIF Maker',
    category: 'Video',
    desc: 'Convierte cualquier fragmento de video en GIF animado. Controla FPS, tamaño y duración. Sin límites.',
    uses: '241 hoy',
    icon: 'gif',
  },
  {
    slug: 'reels-downloader',
    name: 'Reels Downloader',
    category: 'Social',
    desc: 'Descarga Reels de Instagram en alta calidad. Pega el enlace y descarga al instante, sin apps ni extensiones.',
    uses: '604 hoy',
    icon: 'instagram',
  },
  {
    slug: 'tiktok-downloader',
    name: 'TikTok Downloader',
    category: 'Social',
    desc: 'Descarga videos de TikTok sin marca de agua. Solo pega el enlace y descarga en segundos.',
    uses: '812 hoy',
    icon: 'tiktok',
  },
  {
    slug: 'password-generator',
    name: 'Password Generator',
    category: 'Generator',
    desc: 'Contraseñas fuertes e irrastreables en un toque. Longitud ajustable, símbolos opcionales, excluye caracteres ambiguos.',
    uses: '812 hoy',
    icon: 'lock',
  },
  {
    slug: 'json-formatter',
    name: 'JSON Formatter',
    category: 'Dev / Format',
    desc: 'Pretty-print, minify, validación. Vista de árbol con colapso. Funciona con archivos de más de 50MB.',
    uses: '604 hoy',
    icon: 'code',
  },
  {
    slug: 'color-palette',
    name: 'Palette Builder',
    category: 'Color',
    desc: 'Genera paletas armónicas desde cualquier color semilla. Exporta a Tailwind, Figma y CSS.',
    uses: '441 hoy',
    icon: 'palette',
  },
  {
    slug: 'qr-code-maker',
    name: 'QR Code Maker',
    category: 'Generator',
    desc: 'Wifi, vCard, links, pagos. Colores personalizados, módulos redondeados, incrustar logos.',
    uses: '389 hoy',
    icon: 'qr',
  },
  {
    slug: 'image-compressor',
    name: 'Image Compressor',
    category: 'Image',
    desc: 'PNG / JPG / WebP. Hasta 90% más pequeño, solo en tu dispositivo. Arrastra una carpeta, obtén un zip.',
    uses: '312 hoy',
    icon: 'image',
  },
  {
    slug: 'markdown-editor',
    name: 'Markdown Editor',
    category: 'Text',
    desc: 'Vista previa en tiempo real, tablas GFM, resaltado de código, exportar a HTML/PDF.',
    uses: '277 hoy',
    icon: 'file',
  },
  {
    slug: 'unit-converter',
    name: 'Unit Converter',
    category: 'Converter',
    desc: 'Longitud, masa, volumen, temperatura, datos, tiempo, energía. Más de 240 unidades, offline.',
    uses: '241 hoy',
    icon: 'globe',
  },
  {
    slug: 'base64-hash',
    name: 'Base64 / Hash',
    category: 'Dev',
    desc: 'Codificar, decodificar, MD5, SHA-256, SHA-512. Archivos o texto. Copiar al portapapeles.',
    uses: '198 hoy',
    icon: 'hash',
  },
];

export const toolCategories = [
  { label: 'Todos', count: 48 },
  { label: 'Generadores', count: 12 },
  { label: 'Conversores', count: 9 },
  { label: 'Texto', count: 8 },
  { label: 'Imagen', count: 7 },
  { label: 'Color', count: 5 },
  { label: 'Dev', count: 7 },
];

export function getToolBySlug(slug: string): Tool | undefined {
  return tools.find((t) => t.slug === slug);
}
