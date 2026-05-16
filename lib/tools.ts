export type Tool = {
  slug: string;
  name: string;
  category: string;
  desc: string;
  icon: string;
  comingSoon?: boolean;
  seoText?: {
    what: string;
    how: string;
    faqs: { q: string; a: string }[];
  };
};

export const tools: Tool[] = [
  {
    slug: 'base64',
    name: 'Base64 Tool',
    category: 'Dev',
    desc: 'Codifica y decodifica texto en Base64 al instante. Soporta texto plano, JSON y URLs. Todo en tu navegador.',
    icon: 'hash',
    seoText: {
      what: 'Base64 es un sistema de codificación que convierte datos binarios o texto en una cadena de caracteres ASCII seguros para transmitir por internet. Se usa en emails, APIs REST, tokens JWT, imágenes embebidas en CSS y autenticación HTTP Basic. Esta herramienta codifica y decodifica Base64 directamente en tu navegador — sin enviar nada a ningún servidor.',
      how: 'Pegá el texto que querés codificar en el panel izquierdo y el resultado Base64 aparece al instante. Para decodificar, pegá una cadena Base64 y obtenés el texto original. También podés usar los botones de copia con un clic. La herramienta detecta automáticamente si el input es texto plano o Base64.',
      faqs: [
        { q: '¿Base64 es cifrado?', a: 'No. Base64 es codificación, no cifrado. Cualquiera puede decodificar una cadena Base64 sin ninguna clave. No uses Base64 para proteger información sensible.' },
        { q: '¿Para qué se usa Base64 en la práctica?', a: 'Se usa para embeber imágenes en HTML/CSS (data URIs), transmitir datos binarios en JSON, codificar credenciales en HTTP Basic Auth y almacenar tokens JWT.' },
        { q: '¿Cuánto aumenta el tamaño al codificar en Base64?', a: 'Aproximadamente un 33% más. Cada 3 bytes de datos originales se convierten en 4 caracteres Base64.' },
        { q: '¿Funciona con caracteres especiales y emojis?', a: 'Sí. La herramienta usa UTF-8 internamente, así que soporta cualquier carácter Unicode incluyendo emojis, letras acentuadas y símbolos.' },
      ],
    },
  },
  {
    slug: 'video-trimmer',
    name: 'Video Trimmer',
    category: 'Video',
    desc: 'Corta clips de video localmente con precisión de milisegundos. Sin subir a servidores. Soporta MP4, WebM, MOV.',
    icon: 'scissors',
    seoText: {
      what: 'El Video Trimmer de GaloDev te permite recortar videos directamente en tu navegador usando FFmpeg.wasm — la misma tecnología de procesamiento de video profesional, compilada para correr 100% en tu dispositivo. Sin límite de tamaño, sin uploads, sin esperas. Soporta MP4, WebM, MOV y la mayoría de formatos modernos.',
      how: 'Arrastrá o seleccioná tu video, ajustá los puntos de inicio y fin en la línea de tiempo, y hacé clic en "Recortar". El procesamiento ocurre en tu dispositivo con FFmpeg.wasm. Cuando termine, descargás el clip recortado directamente desde el navegador.',
      faqs: [
        { q: '¿Hay límite de tamaño de archivo?', a: 'No hay límite impuesto por GaloDev. El límite real es la RAM de tu dispositivo, ya que el procesamiento ocurre localmente. Archivos de hasta 2GB funcionan bien en la mayoría de computadoras modernas.' },
        { q: '¿Qué formatos soporta?', a: 'MP4 (H.264/H.265), WebM (VP8/VP9), MOV y la mayoría de contenedores modernos. El output es MP4 por compatibilidad.' },
        { q: '¿Mi video se sube a algún servidor?', a: 'Nunca. Todo el procesamiento ocurre en tu navegador usando FFmpeg compilado a WebAssembly. Podés verificarlo en DevTools — no hay ninguna petición de red con tu video.' },
        { q: '¿Cuánto tarda en procesar?', a: 'Depende del tamaño del video y la velocidad de tu CPU. Un clip de 5 minutos en Full HD tarda entre 30 segundos y 2 minutos en una computadora moderna.' },
      ],
    },
  },
  {
    slug: 'video-compressor',
    name: 'Video Compressor',
    category: 'Video',
    desc: 'Reduce el peso de tus videos hasta un 90% sin pérdida visual notable. Procesado 100% en tu dispositivo.',
    icon: 'compress',
    seoText: {
      what: 'El Video Compressor de GaloDev reduce el tamaño de tus videos hasta un 90% usando codificación H.264 optimizada, sin pérdida visual notable. Ideal para compartir en WhatsApp, subir a redes sociales, enviar por email o liberar espacio en disco. Todo el procesamiento ocurre en tu navegador — sin límites, sin cuenta, sin esperas.',
      how: 'Subí tu video, elegí el nivel de compresión (ligero, balanceado o máximo) y hacé clic en "Comprimir". La herramienta usa FFmpeg.wasm para recodificar el video con parámetros optimizados. Al terminar, descargás el archivo comprimido directamente.',
      faqs: [
        { q: '¿Cuánto se reduce el tamaño?', a: 'Depende del video original y el nivel de compresión. Un video MP4 grabado con celular puede reducirse de 500MB a 50-80MB manteniendo buena calidad visual.' },
        { q: '¿Se nota la diferencia de calidad?', a: 'Con el modo "balanceado" la diferencia es casi imperceptible a simple vista. El modo "máximo" puede mostrar artefactos en escenas de movimiento rápido, pero es útil cuando el tamaño es prioritario.' },
        { q: '¿Funciona con videos de Instagram y TikTok?', a: 'Sí. También podés combinar esta herramienta con el Reels Downloader o el TikTok Downloader de GaloDev para comprimir videos descargados.' },
        { q: '¿El video se envía a algún servidor?', a: 'No. El procesamiento es 100% local usando FFmpeg.wasm. Ningún byte de tu video sale de tu dispositivo.' },
      ],
    },
  },
  {
    slug: 'gif-maker',
    name: 'GIF Maker',
    category: 'Video',
    desc: 'Convierte cualquier fragmento de video en GIF animado. Controla FPS, tamaño y duración. Sin límites.',
    icon: 'gif',
    seoText: {
      what: 'El GIF Maker de GaloDev convierte cualquier fragmento de video en GIF animado directamente en tu navegador. Controlás los FPS (frames por segundo), el tamaño de salida y la duración del clip. Perfecto para crear memes, reacciones, tutoriales animados o contenido para redes sociales. Sin apps, sin instalación, sin límites.',
      how: 'Subí tu video, seleccioná el fragmento que querés convertir usando los controles de inicio y fin, ajustá los FPS y el tamaño, y hacé clic en "Crear GIF". La conversión usa FFmpeg.wasm y puede tardar unos segundos dependiendo de la duración y resolución.',
      faqs: [
        { q: '¿Cuántos FPS debería usar?', a: 'Para GIFs de redes sociales, 15 FPS es el punto ideal entre fluidez y tamaño. Para contenido muy animado podés usar 24 FPS, pero el archivo será más pesado.' },
        { q: '¿Cuál es el tamaño máximo recomendado?', a: 'Para compartir en WhatsApp o Telegram, mantenete bajo los 5MB. Para Twitter, el límite es 15MB. Para uso web, 480px de ancho con 15 FPS es un buen punto de partida.' },
        { q: '¿Puedo convertir un Reel o TikTok a GIF?', a: 'Sí. Primero descargá el video con el Reels Downloader o el TikTok Downloader de GaloDev, y luego convertilo a GIF con esta herramienta.' },
        { q: '¿Por qué los GIFs son tan pesados comparado al video?', a: 'El formato GIF no usa compresión de video moderna como H.264. Cada frame se almacena casi completo, por eso un GIF de 10 segundos puede pesar más que un video de 1 minuto.' },
      ],
    },
  },
  {
    slug: 'reels-downloader',
    name: 'Reels Downloader',
    category: 'Social',
    desc: 'Descarga Reels de Instagram en alta calidad. Pega el enlace y descarga al instante, sin apps ni extensiones.',
    icon: 'instagram',
    seoText: {
      what: 'El Reels Downloader de GaloDev te permite descargar Reels de Instagram en alta calidad directamente desde tu navegador. Sin instalar apps, sin extensiones, sin crear cuenta. Solo pegás el enlace del Reel y descargás el video en segundos. Funciona desde computadora, tablet y celular.',
      how: 'Copiá el enlace del Reel de Instagram (el ícono de "Compartir" → "Copiar enlace"), pegalo en el campo de esta herramienta y hacé clic en "Descargar". El video se descarga en la calidad original publicada.',
      faqs: [
        { q: '¿Funciona con cuentas privadas?', a: 'No. Solo podés descargar Reels de cuentas públicas. Los Reels de cuentas privadas requieren autenticación que esta herramienta no solicita para proteger tu privacidad.' },
        { q: '¿La descarga incluye el audio?', a: 'Sí, el video se descarga con el audio original incluido.' },
        { q: '¿Puedo descargar Reels desde el celular?', a: 'Sí. Abrí galodev.com desde el navegador de tu celular, pegá el enlace y el video se descarga directamente a tu galería.' },
        { q: '¿Es legal descargar Reels de Instagram?', a: 'Descargar para uso personal es generalmente aceptado. No está permitido redistribuir el contenido de otros creadores sin su autorización. Respetá los derechos de autor.' },
      ],
    },
  },
  {
    slug: 'tiktok-downloader',
    name: 'TikTok Downloader',
    category: 'Social',
    desc: 'Descarga videos de TikTok sin marca de agua. Solo pega el enlace y descarga en segundos.',
    icon: 'tiktok',
    seoText: {
      what: 'El TikTok Downloader de GaloDev descarga videos de TikTok sin marca de agua directamente en tu navegador. Sin apps adicionales, sin registrarte, sin límites de descargas. Solo pegás el enlace del video y en segundos tenés el archivo en tu dispositivo.',
      how: 'Abrí el video en TikTok, tocá "Compartir" y copiá el enlace. Pegalo en el campo de esta herramienta y hacé clic en "Descargar". El video se descarga sin la marca de agua del logo de TikTok.',
      faqs: [
        { q: '¿Por qué descargar sin marca de agua?', a: 'Si querés reutilizar el contenido en otras plataformas como Instagram o WhatsApp, la marca de agua de TikTok puede verse poco profesional. Esta herramienta descarga el video limpio.' },
        { q: '¿Funciona con videos de cuentas privadas?', a: 'No. Solo podés descargar videos de cuentas públicas. Los videos privados requieren autenticación.' },
        { q: '¿Puedo descargarlo desde el celular?', a: 'Sí. Abrí galodev.com desde cualquier navegador móvil, pegá el enlace y el video se guarda directamente en tu galería.' },
        { q: '¿El video pierde calidad al descargarlo?', a: 'No. Se descarga en la calidad original con la que fue subido a TikTok.' },
      ],
    },
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
