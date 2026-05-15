export type Tool = {
  slug: string;
  name: string;
  category: string;
  desc: string;
  icon: string;
  comingSoon?: boolean;
};

export const tools: Tool[] = [
  {
    slug: 'base64',
    name: 'Base64 Tool',
    category: 'Dev',
    desc: 'Codifica y decodifica texto en Base64 al instante. Soporta texto plano, JSON y URLs. Todo en tu navegador.',
    icon: 'hash',
  },
  {
    slug: 'video-trimmer',
    name: 'Video Trimmer',
    category: 'Video',
    desc: 'Corta clips de video localmente con precisión de milisegundos. Sin subir a servidores. Soporta MP4, WebM, MOV.',
    icon: 'scissors',
  },
  {
    slug: 'video-compressor',
    name: 'Video Compressor',
    category: 'Video',
    desc: 'Reduce el peso de tus videos hasta un 90% sin pérdida visual notable. Procesado 100% en tu dispositivo.',
    icon: 'compress',
  },
  {
    slug: 'gif-maker',
    name: 'GIF Maker',
    category: 'Video',
    desc: 'Convierte cualquier fragmento de video en GIF animado. Controla FPS, tamaño y duración. Sin límites.',
    icon: 'gif',
  },
  {
    slug: 'reels-downloader',
    name: 'Reels Downloader',
    category: 'Social',
    desc: 'Descarga Reels de Instagram en alta calidad. Pega el enlace y descarga al instante, sin apps ni extensiones.',
    icon: 'instagram',
  },
  {
    slug: 'tiktok-downloader',
    name: 'TikTok Downloader',
    category: 'Social',
    desc: 'Descarga videos de TikTok sin marca de agua. Solo pega el enlace y descarga en segundos.',
    icon: 'tiktok',
  },
  {
    slug: 'password-generator',
    name: 'Password Generator',
    category: 'Generadores',
    desc: 'Contraseñas fuertes e irrastreables en un toque. Longitud ajustable, símbolos opcionales, excluye caracteres ambiguos.',
    icon: 'lock',
    comingSoon: true,
  },
  {
    slug: 'json-formatter',
    name: 'JSON Formatter',
    category: 'Dev',
    desc: 'Pretty-print, minify, validación. Vista de árbol con colapso. Funciona con archivos de más de 50MB.',
    icon: 'code',
    comingSoon: true,
  },
  {
    slug: 'color-palette',
    name: 'Palette Builder',
    category: 'Color',
    desc: 'Genera paletas armónicas desde cualquier color semilla. Exporta a Tailwind, Figma y CSS.',
    icon: 'palette',
    comingSoon: true,
  },
  {
    slug: 'qr-code-maker',
    name: 'QR Code Maker',
    category: 'Generadores',
    desc: 'Wifi, vCard, links, pagos. Colores personalizados, módulos redondeados, incrustar logos.',
    icon: 'qr',
    comingSoon: true,
  },
  {
    slug: 'image-compressor',
    name: 'Image Compressor',
    category: 'Imagen',
    desc: 'PNG / JPG / WebP. Hasta 90% más pequeño, solo en tu dispositivo. Arrastra una carpeta, obtén un zip.',
    icon: 'image',
    comingSoon: true,
  },
  {
    slug: 'markdown-editor',
    name: 'Markdown Editor',
    category: 'Texto',
    desc: 'Vista previa en tiempo real, tablas GFM, resaltado de código, exportar a HTML/PDF.',
    icon: 'file',
    comingSoon: true,
  },
  {
    slug: 'unit-converter',
    name: 'Unit Converter',
    category: 'Conversores',
    desc: 'Longitud, masa, volumen, temperatura, datos, tiempo, energía. Más de 240 unidades, offline.',
    icon: 'globe',
    comingSoon: true,
  },
];

export const toolCategories = [
  { label: 'Todos', count: 13 },
  { label: 'Video', count: 3 },
  { label: 'Social', count: 2 },
  { label: 'Dev', count: 2 },
  { label: 'Generadores', count: 2 },
  { label: 'Imagen', count: 1 },
  { label: 'Texto', count: 1 },
];

export function getToolBySlug(slug: string): Tool | undefined {
  return tools.find((t) => t.slug === slug);
}
