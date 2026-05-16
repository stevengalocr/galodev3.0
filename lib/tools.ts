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
  // ── 7 DEVELOPER TOOLS ──────────────────────────────────────────────────
  {
    slug: 'json-formatter',
    name: 'JSON Formatter',
    category: 'Dev',
    desc: 'Pretty-print, minify y validación JSON en tiempo real. Detecta errores con precisión de línea y carácter.',
    icon: 'code',
    seoText: {
      what: 'El JSON Formatter de GaloDev te permite formatear, minificar y validar JSON directamente en el navegador. Ideal para depurar APIs REST, revisar respuestas de endpoints, o limpiar archivos de configuración. Sin límite de tamaño, sin uploads, sin registro.',
      how: 'Pega tu JSON en el panel izquierdo. Si elegís "Formatear", obtenés el JSON indentado con 2 espacios. "Minificar" comprime todo en una línea mostrando el porcentaje de reducción. "Validar" te indica exactamente dónde está el error si el JSON es inválido.',
      faqs: [
        { q: '¿Por qué mi JSON es inválido?', a: 'Los errores más comunes son: comas al final de arrays/objetos (trailing commas), comillas simples en lugar de dobles, o claves sin comillas. El validador te indica la posición exacta del error.' },
        { q: '¿Funciona con archivos grandes?', a: 'Sí. El procesamiento ocurre en tu navegador con JavaScript nativo, sin timeout ni límite de tamaño más allá de la RAM disponible.' },
        { q: '¿Cuánto se reduce al minificar?', a: 'Depende de la cantidad de espacios e indentación original. Un JSON bien formateado puede reducirse entre 20% y 40% al minificarse.' },
        { q: '¿Puedo usarlo para validar JSON de APIs?', a: 'Sí. Copiá la respuesta de tu API directamente desde las DevTools del navegador y pegala en el formatter para validar y explorar la estructura.' },
      ],
    },
  },
  {
    slug: 'base64',
    name: 'Base64 Tool',
    category: 'Dev',
    desc: 'Codifica y decodifica texto en Base64 al instante. Soporta texto plano, JSON y URLs. Todo en tu navegador.',
    icon: 'hash',
    seoText: {
      what: 'Base64 es un sistema de codificación que convierte datos binarios o texto en una cadena de caracteres ASCII seguros para transmitir por internet. Se usa en emails, APIs REST, tokens JWT, imágenes embebidas en CSS y autenticación HTTP Basic. Esta herramienta codifica y decodifica Base64 directamente en tu navegador, sin enviar nada a ningún servidor.',
      how: 'Pegá el texto que querés codificar en el panel izquierdo y el resultado Base64 aparece al instante. Para decodificar, pegá una cadena Base64 y obtenés el texto original. También podés usar el botón de swap para invertir el proceso con un clic.',
      faqs: [
        { q: '¿Base64 es cifrado?', a: 'No. Base64 es codificación, no cifrado. Cualquiera puede decodificar una cadena Base64 sin ninguna clave. No uses Base64 para proteger información sensible.' },
        { q: '¿Para qué se usa Base64 en la práctica?', a: 'Se usa para embeber imágenes en HTML/CSS (data URIs), transmitir datos binarios en JSON, codificar credenciales en HTTP Basic Auth y almacenar tokens JWT.' },
        { q: '¿Cuánto aumenta el tamaño al codificar en Base64?', a: 'Aproximadamente un 33% más. Cada 3 bytes de datos originales se convierten en 4 caracteres Base64.' },
        { q: '¿Funciona con caracteres especiales y emojis?', a: 'Sí. La herramienta usa UTF-8 internamente, así que soporta cualquier carácter Unicode incluyendo emojis, letras acentuadas y símbolos.' },
      ],
    },
  },
  {
    slug: 'password-generator',
    name: 'Password Generator',
    category: 'Dev',
    desc: 'Contraseñas criptográficamente seguras con un clic. Longitud ajustable, símbolos opcionales, excluye caracteres ambiguos.',
    icon: 'lock',
    seoText: {
      what: 'El Password Generator de GaloDev usa crypto.getRandomValues(), la API criptográfica del navegador, para generar contraseñas verdaderamente aleatorias. Podés configurar la longitud, los tipos de caracteres y excluir ambiguos como I, l, 1, O, 0. Un medidor de entropía en bits te muestra exactamente qué tan fuerte es la contraseña.',
      how: 'Ajustá la longitud con el slider, seleccioná los tipos de caracteres que querés incluir y copiá la contraseña con un clic. Para generar una nueva, hacé clic en el botón de regenerar. El historial de sesión guarda las últimas 5 contraseñas generadas.',
      faqs: [
        { q: '¿Qué tan segura es una contraseña de 20 caracteres?', a: 'Con mayúsculas, minúsculas, números y símbolos, una contraseña de 20 caracteres tiene más de 130 bits de entropía. Tardaría millones de años en romperse por fuerza bruta.' },
        { q: '¿Se guarda mi contraseña en algún servidor?', a: 'No. La generación ocurre 100% en tu navegador. Ningún dato sale de tu dispositivo.' },
        { q: '¿Por qué excluir caracteres ambiguos?', a: 'Caracteres como I (i mayúscula), l (L minúscula), 1 (uno), O (o mayúscula) y 0 (cero) son difíciles de distinguir en ciertas fuentes. Excluirlos evita errores al escribir la contraseña a mano.' },
        { q: '¿Qué significa entropía en bits?', a: 'La entropía mide la aleatoriedad. Más bits = más difícil de adivinar. Para cuentas importantes, recomendamos al menos 80 bits. Para cuentas críticas, 120 bits o más.' },
      ],
    },
  },
  {
    slug: 'regex-tester',
    name: 'Regex Tester',
    category: 'Dev',
    desc: 'Testea expresiones regulares en tiempo real. Resalta coincidencias, muestra grupos de captura, incluye cheatsheet.',
    icon: 'regex',
    seoText: {
      what: 'El Regex Tester de GaloDev te permite escribir y probar expresiones regulares en tiempo real contra cualquier texto. Las coincidencias se resaltan visualmente en diferentes colores, podés ver los grupos de captura de cada match, activar flags como global, case-insensitive o multiline, y usar plantillas de patrones comunes como email, URL, fecha o IP.',
      how: 'Escribe tu expresión regular en el campo de patrón (sin las barras, se agregan automáticamente). Seleccioná los flags que necesitás con los botones g/i/m/s. Pegá o escribí el texto de prueba. Las coincidencias se resaltan en tiempo real y se listan debajo con su posición y grupos.',
      faqs: [
        { q: '¿Qué diferencia hay entre los flags?', a: 'g (global) busca todas las ocurrencias. i (case-insensitive) ignora mayúsculas. m (multiline) hace que ^ y $ coincidan al inicio/fin de cada línea. s (dotall) hace que el punto coincida también con saltos de línea.' },
        { q: '¿Por qué mi regex no funciona en JavaScript pero sí en otros lenguajes?', a: 'JavaScript tiene algunas diferencias respecto a PCRE (PHP, Python). Por ejemplo, no soporta lookbehind variable ni referencias inversas en todos los contextos. Este tester usa el motor de JavaScript nativo.' },
        { q: '¿Puedo usar grupos de captura con nombre?', a: 'Sí. La sintaxis es (?<nombre>patrón). Los grupos aparecen en la lista de coincidencias.' },
        { q: '¿Cómo pruebo si un email es válido?', a: 'Usá el preset "Email" incluido en la herramienta. El patrón cubre la mayoría de emails válidos según el estándar RFC 5322 simplificado.' },
      ],
    },
  },
  {
    slug: 'jwt-decoder',
    name: 'JWT Decoder',
    category: 'Dev',
    desc: 'Decodifica tokens JWT al instante. Muestra header, payload, expiración y algoritmo. Sin enviar nada a servidores.',
    icon: 'key',
    seoText: {
      what: 'El JWT Decoder de GaloDev decodifica JSON Web Tokens directamente en tu navegador. Pegás el token y en segundos ves el header (algoritmo, tipo), el payload (claims, usuario, fechas) y la información de expiración. Ideal para depurar autenticación en APIs, verificar claims de tokens de Supabase, Auth0, Firebase o cualquier proveedor JWT.',
      how: 'Pegá tu JWT en el campo de texto. La herramienta lo divide automáticamente en sus 3 partes: header, payload y firma. El header y payload se muestran como JSON formateado. Si el token tiene los campos exp o iat, se muestran como fechas legibles y se calcula si el token está expirado.',
      faqs: [
        { q: '¿Esta herramienta puede verificar la firma del JWT?', a: 'No. La verificación de firma requiere la clave secreta o la clave pública, que no debes compartir nunca. Esta herramienta solo decodifica (lee) el contenido público del token.' },
        { q: '¿Es seguro pegar mi JWT aquí?', a: 'El procesamiento es 100% local, ningún dato sale de tu navegador. Dicho esto, nunca compartas JWTs de producción con claves de larga duración en herramientas externas.' },
        { q: '¿Qué es el campo exp en un JWT?', a: 'exp es el "expiration time", un timestamp Unix (segundos desde 1970) que indica cuándo expira el token. El decoder lo convierte a fecha y hora legible y te muestra cuánto tiempo falta o hace que expiró.' },
        { q: '¿Qué significa el algoritmo en el header?', a: 'HS256 significa HMAC con SHA-256 (clave simétrica). RS256 usa RSA con SHA-256 (clave pública/privada). ES256 usa ECDSA. El algoritmo determina cómo se firma y verifica el token.' },
      ],
    },
  },
  {
    slug: 'uuid-generator',
    name: 'UUID Generator',
    category: 'Dev',
    desc: 'Genera UUIDs v4 criptográficamente seguros. Generación masiva de hasta 100, múltiples formatos, copia con un clic.',
    icon: 'fingerprint',
    seoText: {
      what: 'El UUID Generator de GaloDev usa crypto.randomUUID() del navegador para generar identificadores únicos universales v4 criptográficamente seguros. Podés generar desde 1 hasta 100 UUIDs a la vez, elegir el formato (estándar, mayúsculas, sin guiones, con llaves) y copiar uno o todos con un clic.',
      how: 'Hacé clic en "Generar" para crear un UUID v4. Para generación masiva, ajustá el slider a la cantidad que necesitás y hacé clic en "Generar N". Elegí el formato de salida y copiá todos de una vez o uno por uno.',
      faqs: [
        { q: '¿Qué es un UUID v4?', a: 'UUID v4 es un identificador de 128 bits generado con datos aleatorios. Tiene el formato xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx donde x es aleatorio e y es 8, 9, a o b. La probabilidad de colisión es prácticamente cero.' },
        { q: '¿Cuándo debería usar UUID en lugar de IDs numéricos?', a: 'Los UUIDs son ideales cuando necesitás generar IDs en el cliente sin coordinación con el servidor, cuando querés evitar que los IDs sean predecibles (seguridad), o en sistemas distribuidos donde varios nodos generan registros.' },
        { q: '¿Es realmente único?', a: 'En términos prácticos, sí. La probabilidad de generar dos UUIDs v4 iguales es 1 en 2^122 (5.3×10^36). Generando mil millones de UUIDs por segundo durante 100 años, la probabilidad de colisión seguiría siendo negligible.' },
        { q: '¿Puedo usar UUID v4 como clave primaria en una base de datos?', a: 'Sí, y es una práctica común. El único trade-off es que los UUIDs son más grandes que los enteros (16 bytes vs 4-8 bytes) y pueden afectar el rendimiento de los índices en tablas muy grandes.' },
      ],
    },
  },
  {
    slug: 'markdown-previewer',
    name: 'Markdown Previewer',
    category: 'Dev',
    desc: 'Editor y vista previa de Markdown en tiempo real. Vista dividida, GitHub-flavored, exporta HTML.',
    icon: 'file-text',
    seoText: {
      what: 'El Markdown Previewer de GaloDev te permite escribir y previsualizar Markdown en tiempo real con una vista dividida editor/preview. Soporta GitHub Flavored Markdown: encabezados, listas, código (bloques e inline), links, imágenes, blockquotes, strikethrough y separadores. El HTML generado se puede copiar con un clic.',
      how: 'Escribe o pega tu Markdown en el panel izquierdo. La vista previa se actualiza en tiempo real a la derecha. Podés alternar entre vista dividida, solo editor o solo preview. El botón "Copiar HTML" te da el HTML renderizado listo para usar.',
      faqs: [
        { q: '¿Qué es Markdown?', a: 'Markdown es un lenguaje de marcado ligero que convierte texto plano en HTML. Fue creado por John Gruber en 2004 y hoy es el estándar de facto para documentación, READMEs de GitHub y plataformas como Notion y Obsidian.' },
        { q: '¿Qué es GitHub Flavored Markdown?', a: 'GFM es una extensión de Markdown estándar que agrega tablas, listas de tareas, strikethrough (~~tachado~~) y resaltado de código con nombre de lenguaje. Es el formato usado en GitHub, GitLab y Bitbucket.' },
        { q: '¿Mis notas se guardan?', a: 'No. El contenido existe solo mientras tenés la pestaña abierta. Para notas persistentes, usá la herramienta Quick Notes de GaloDev que guarda en localStorage.' },
        { q: '¿Puedo usar el HTML exportado en mi sitio web?', a: 'Sí. El HTML generado es estándar y limpio. Asegurate de aplicar tus propios estilos CSS ya que el preview usa los estilos de GaloDev.' },
      ],
    },
  },

  // ── 3 PRODUCTIVITY TOOLS ───────────────────────────────────────────────
  {
    slug: 'pomodoro-timer',
    name: 'Pomodoro Timer',
    category: 'Productividad',
    desc: 'Temporizador Pomodoro con sesiones de trabajo y descanso configurables. Notificaciones del navegador.',
    icon: 'timer',
    seoText: {
      what: 'El Pomodoro Timer de GaloDev implementa la técnica Pomodoro: bloques de trabajo concentrado de 25 minutos separados por descansos de 5. Cada 4 sesiones, un descanso largo de 15 minutos. Los tiempos son completamente configurables, incluye indicador circular de progreso, contador de sesiones completadas y notificaciones del navegador al terminar cada bloque.',
      how: 'Elegí el modo (Trabajo, Descanso o Descanso largo) con las tabs. Si querés ajustar los tiempos, hacé clic en el ícono de configuración. Presioná play para empezar. El círculo de progreso se llena a medida que avanza el tiempo. Al completar, recibirás una notificación del navegador (si la permitiste).',
      faqs: [
        { q: '¿Qué es la técnica Pomodoro?', a: 'Desarrollada por Francesco Cirillo en los años 80, consiste en trabajar en bloques de 25 minutos de concentración total, seguidos de 5 minutos de descanso. Mejora el enfoque y reduce la fatiga mental.' },
        { q: '¿Funciona con el navegador en segundo plano?', a: 'El timer sigue corriendo mientras la pestaña está abierta, aunque esté en segundo plano. Las notificaciones del navegador te avisan cuando termina cada sesión.' },
        { q: '¿Puedo cambiar la duración de 25 minutos?', a: 'Sí. En el panel de configuración podés ajustar los tiempos de trabajo (1-90min), descanso (1-30min) y descanso largo (1-60min) según tu flujo de trabajo.' },
        { q: '¿Por qué 4 pomodoros antes del descanso largo?', a: 'Después de 4 sesiones de 25 minutos (2 horas de trabajo concentrado), el cerebro necesita un descanso más profundo para consolidar lo aprendido y recuperar energía cognitiva.' },
      ],
    },
  },
  {
    slug: 'quick-notes',
    name: 'Quick Notes',
    category: 'Productividad',
    desc: 'Bloc de notas rápido con auto-guardado en tu dispositivo. Sin cuenta, sin sync, sin distracciones.',
    icon: 'edit',
    seoText: {
      what: 'Quick Notes es un bloc de notas minimalista que guarda automáticamente en localStorage de tu navegador. Sin cuenta, sin registro, sin sincronización con servidores. Tus notas persisten entre sesiones en el mismo navegador. Muestra conteo de palabras, líneas y caracteres en tiempo real. Ideal para apuntes rápidos mientras desarrollás.',
      how: 'Simplemente escribí. El auto-guardado se activa 800ms después de que dejás de escribir. Un indicador en la barra superior confirma cuando se guardó. Para limpiar todo, hacé clic en "Limpiar" y confirmá la acción. Para copiar todo el contenido, usá "Copiar todo".',
      faqs: [
        { q: '¿Dónde se guardan mis notas?', a: 'En el localStorage de tu navegador, en tu dispositivo. No se envían a ningún servidor de GaloDev ni de terceros.' },
        { q: '¿Se borran las notas si limpio el caché?', a: 'Sí. Si limpias el localStorage del navegador o usas "Limpiar historial del sitio", las notas se borran. Para notas importantes, usá "Copiar todo" y guardalas en tu app de notas preferida.' },
        { q: '¿Puedo usar markdown en Quick Notes?', a: 'Quick Notes es texto plano sin formato. Si necesitás Markdown con vista previa, usá el Markdown Previewer de GaloDev.' },
        { q: '¿Las notas están disponibles en otros dispositivos?', a: 'No. localStorage es específico del navegador y dispositivo. No hay sincronización entre dispositivos. Quick Notes está pensado para notas rápidas de sesión, no para almacenamiento permanente.' },
      ],
    },
  },
  {
    slug: 'focus-mode',
    name: 'Focus Mode',
    category: 'Productividad',
    desc: 'Modo de trabajo minimalista con timer y pantalla completa. Cero distracciones. Define tu tarea y enfócate.',
    icon: 'focus',
    seoText: {
      what: 'Focus Mode es un espacio de trabajo minimalista diseñado para eliminar distracciones. Escribís la tarea en la que vas a trabajar, elegís la duración (presets de 15, 25, 45, 60 o 90 minutos), y entrás en pantalla completa. Un timer circular cuenta el tiempo restante con animación suave. Sin botones, sin menús, sin nada que no sea tu tarea y el tiempo.',
      how: 'Escribí en qué vas a trabajar. Elegí la duración con los círculos de presets. Presioná el botón de pantalla completa para eliminar todas las distracciones. Hacé clic en play. Cuando termine el tiempo, el círculo se completa y podés iniciar una nueva sesión.',
      faqs: [
        { q: '¿Qué hace diferente al Focus Mode del Pomodoro Timer?', a: 'El Pomodoro Timer sigue la técnica específica de 25/5/15 con múltiples sesiones y notificaciones. El Focus Mode es más libre: elegís cualquier duración y es mucho más minimalista visualmente, pensado para entrar en estado de flujo.' },
        { q: '¿Funciona en celular?', a: 'Sí. Está optimizado para mobile. La pantalla completa puede comportarse diferente en iOS (Safari limita la API Fullscreen), pero el timer funciona correctamente.' },
        { q: '¿Puedo pausar el timer?', a: 'Sí. El botón de pausa está disponible durante la sesión. También podés resetearlo en cualquier momento con el botón de reinicio.' },
        { q: '¿Hay algún sonido al terminar?', a: 'No hay sonido por defecto para mantener el entorno libre de interrupciones sonoras. Si necesitás notificación sonora, combinalo con el Pomodoro Timer.' },
      ],
    },
  },

  // ── 5 HIGH-VOLUME SEO UTILITIES ────────────────────────────────────────
  {
    slug: 'qr-code-maker',
    name: 'QR Code Maker',
    category: 'Utilidades',
    desc: 'Genera QR codes para URLs, WiFi, vCard, email y más. Colores personalizados. Descarga PNG o SVG.',
    icon: 'qr',
    seoText: {
      what: 'El QR Code Maker de GaloDev genera códigos QR directamente en tu navegador usando un encoder Reed-Solomon implementado desde cero, sin dependencias externas. Soporta URLs, textos, datos WiFi, vCards, emails y teléfonos. Podés personalizar los colores del módulo y el fondo, ajustar el tamaño y descargar en PNG o SVG.',
      how: 'Escribí o pegá el contenido en el campo de texto, o elegí una plantilla (URL, email, WiFi, teléfono, vCard). Personalizá los colores con los pickers. Ajustá el tamaño con el slider y descargá en PNG para imprimir o SVG para escalar a cualquier tamaño sin perder calidad.',
      faqs: [
        { q: '¿Qué contenido puede llevar un QR code?', a: 'Texto libre, URLs, emails (mailto:), teléfonos (tel:), SMS, datos WiFi (WIFI:T:WPA;S:Red;P:Clave;;), vCards para contactos, y eventos de calendario (VEVENT). El límite de caracteres depende del nivel de corrección de errores.' },
        { q: '¿Cuántos caracteres puede tener el contenido?', a: 'Esta herramienta soporta hasta aproximadamente 182 caracteres con corrección de errores nivel M. Para URLs largas, considerá usar un acortador de links primero.' },
        { q: '¿Cuál es la diferencia entre PNG y SVG?', a: 'PNG es una imagen rasterizada ideal para uso digital e impresión a tamaño fijo. SVG es vectorial y se puede escalar a cualquier tamaño sin pixelarse, ideal para impresión de alta calidad o uso en diseño.' },
        { q: '¿Puedo usar cualquier color en el QR?', a: 'Sí, pero asegurate de que haya suficiente contraste entre el color del módulo y el fondo. Los lectores QR necesitan al menos una relación de contraste 4:1 para leer correctamente.' },
      ],
    },
  },
  {
    slug: 'image-compressor',
    name: 'Image Compressor',
    category: 'Utilidades',
    desc: 'Comprime imágenes JPG, PNG y WebP hasta un 90% de reducción. Solo en tu dispositivo, sin límites.',
    icon: 'image',
    seoText: {
      what: 'El Image Compressor de GaloDev reduce el tamaño de tus imágenes usando la Canvas API del navegador, sin enviar nada a ningún servidor. Soporta JPG, PNG y WebP como entrada, y puede exportar en JPEG o WebP optimizado. Incluye control de calidad, redimensionado máximo, comparación visual antes/después y descarga directa.',
      how: 'Arrastrá tu imagen al área de drop o hacé clic para seleccionarla. Ajustá el slider de calidad (80% es un buen punto de partida) y el ancho máximo de salida. Elegí el formato de salida (JPEG para fotos, WebP para mejor compresión). Hacé clic en "Aplicar" para recomprimir y "Descargar" para guardar.',
      faqs: [
        { q: '¿Qué formatos de imagen soporta?', a: 'Acepta cualquier formato que tu navegador pueda mostrar: JPG, PNG, WebP, GIF (solo el primer frame), BMP y AVIF en navegadores compatibles. La salida puede ser JPEG o WebP.' },
        { q: '¿Por qué WebP es mejor que JPEG?', a: 'WebP es un formato moderno de Google que ofrece 25-35% menos peso que JPEG con la misma calidad visual. Es soportado por todos los navegadores modernos y es el formato recomendado para imágenes en la web.' },
        { q: '¿Se pierde calidad al comprimir?', a: 'Sí, la compresión JPEG y WebP es con pérdida. Con calidad al 80%, la diferencia visual es prácticamente imperceptible. Por debajo del 60% empiezan a verse artefactos en áreas de gradiente.' },
        { q: '¿Hay límite de tamaño?', a: 'No hay límite impuesto por GaloDev. El límite real es la RAM de tu dispositivo para procesar la imagen en Canvas. Imágenes de hasta 20MB funcionan bien en la mayoría de dispositivos.' },
      ],
    },
  },
  {
    slug: 'unit-converter',
    name: 'Unit Converter',
    category: 'Utilidades',
    desc: 'Convierte unidades de longitud, peso, temperatura, almacenamiento y pantalla. Todas las conversiones visibles a la vez.',
    icon: 'arrows',
    seoText: {
      what: 'El Unit Converter de GaloDev convierte unidades en 5 categorías: longitud (mm a millas), peso (mg a toneladas), temperatura (Celsius, Fahrenheit, Kelvin), almacenamiento digital (bytes a terabytes, bits a megabits) y unidades de pantalla/CSS (px, rem, em, pt, vw, vh). Muestra todas las conversiones de la categoría a la vez para comparar fácilmente.',
      how: 'Elegí la categoría con los botones en la parte superior. Ingresá el valor numérico, seleccioná la unidad de origen y la unidad de destino. El resultado aparece al instante. El botón de swap intercambia origen y destino. La tabla inferior muestra el valor convertido a todas las unidades de la categoría.',
      faqs: [
        { q: '¿Cómo convierto px a rem?', a: 'En la categoría "Pantalla / CSS", seleccioná px como origen y rem como destino. El convertidor usa 16px como base (el valor por defecto del navegador). 16px = 1rem, 24px = 1.5rem, 32px = 2rem.' },
        { q: '¿Por qué la temperatura no usa la misma fórmula que las otras unidades?', a: 'Las otras unidades tienen relaciones proporcionales (multiplicar por un factor). La temperatura usa fórmulas de conversión con sumas y multiplicaciones porque las escalas tienen ceros diferentes. 0°C = 32°F = 273.15K.' },
        { q: '¿Qué diferencia hay entre KB y KiB?', a: 'KB (kilobyte) puede referirse a 1000 bytes (SI) o 1024 bytes (binario). Esta herramienta usa la definición binaria (1KB = 1024 bytes), que es la más común en sistemas operativos y almacenamiento.' },
        { q: '¿Puedo convertir velocidades o presión?', a: 'Actualmente soportamos las 5 categorías más usadas. Si necesitás otras categorías como velocidad, presión o energía, escríbenos por WhatsApp y las agregamos.' },
      ],
    },
  },
  {
    slug: 'color-converter',
    name: 'Color Converter',
    category: 'Utilidades',
    desc: 'Convierte colores entre HEX, RGB, HSL y OKLCH. Encuentra el color Tailwind más cercano. Copia con un clic.',
    icon: 'palette',
    seoText: {
      what: 'El Color Converter de GaloDev convierte colores entre todos los formatos usados en web: HEX (para HTML/CSS), RGB (para CSS y diseño), HSL (para manipulación de tonos) y OKLCH (el nuevo estándar de CSS moderno). También incluye un buscador de colores Tailwind que encuentra el color más cercano en la paleta oficial de Tailwind CSS.',
      how: 'Usá el color picker para seleccionar un color visualmente, o escribí directamente en cualquier campo. Al modificar un formato, todos los demás se actualizan automáticamente. Los presets te permiten partir de colores comunes. El buscador de Tailwind compara contra más de 100 colores de la paleta y te muestra el nombre (ej: blue-500).',
      faqs: [
        { q: '¿Qué es OKLCH y para qué se usa?', a: 'OKLCH es un espacio de color perceptualmente uniforme que CSS moderno soporta nativamente. A diferencia de HSL, OKLCH garantiza que colores con el mismo valor de luminosidad se perciban igualmente brillantes, lo que es ideal para paletas de diseño consistentes.' },
        { q: '¿Qué diferencia hay entre RGB y HSL?', a: 'RGB define colores por sus componentes rojo, verde y azul. HSL los define por tono (Hue, 0-360°), saturación (0-100%) y luminosidad (0-100%). HSL es más intuitivo para ajustes de diseño como "hacer este color más claro" o "menos saturado".' },
        { q: '¿Por qué el color Tailwind que muestra no es exactamente igual?', a: 'El buscador encuentra el color Tailwind más cercano por distancia euclidiana en el espacio RGB. Es una aproximación, no una conversión exacta. Tailwind tiene una paleta fija de colores.' },
        { q: '¿Soporta colores con transparencia (alpha)?', a: 'La versión actual trabaja con colores opacos. El soporte para rgba y hsla está en el roadmap.' },
      ],
    },
  },
  {
    slug: 'url-encoder',
    name: 'URL Encoder',
    category: 'Utilidades',
    desc: 'Codifica y decodifica URLs y query strings. Muestra exactamente qué caracteres cambian. Dos modos: componente y URL completa.',
    icon: 'link',
    seoText: {
      what: 'El URL Encoder de GaloDev codifica y decodifica URLs y query strings usando los dos métodos estándar de JavaScript: encodeURIComponent (para parámetros individuales) y encodeURI (para URLs completas). Muestra exactamente qué caracteres fueron codificados, permite hacer swap entre el texto original y el codificado, e incluye plantillas para casos de uso comunes.',
      how: 'Elegí el modo (Codificar o Decodificar) y el alcance (Componente para query params, URL completa para rutas). Pegá tu texto y el resultado aparece al instante. El botón de swap usa el resultado como nueva entrada para hacer el proceso inverso. Los caracteres codificados se muestran en el panel inferior.',
      faqs: [
        { q: '¿Cuándo usar "Componente" vs "URL completa"?', a: 'Usa encodeURIComponent para codificar valores individuales de query string (ej: ?q=búsqueda+rápida). Usa encodeURI para URLs completas donde querés preservar la estructura (los /, ?, &, = no se codifican).' },
        { q: '¿Por qué los espacios se convierten en %20?', a: '%20 es la codificación percent-encoding del espacio (ASCII 32). En URLs de query string también podés ver + para representar espacios (application/x-www-form-urlencoded). Esta herramienta usa el estándar RFC 3986 con %20.' },
        { q: '¿Qué caracteres NO se codifican en encodeURIComponent?', a: 'Los caracteres que no se codifican son: A-Z, a-z, 0-9, -, _, ., ~. Todos los demás (incluyendo espacios, tildes, @, /, =, &) se codifican como %XX.' },
        { q: '¿Puedo decodificar una URL que tiene %2F o %3F?', a: 'Sí. Usá el modo "Decodificar" con "Componente" para decodificar todos los caracteres incluyendo los que tienen significado en URLs como / (%2F) y ? (%3F).' },
      ],
    },
  },
];

export const toolCategories = [
  { label: 'Todos', count: 15 },
  { label: 'Dev', count: 7 },
  { label: 'Productividad', count: 3 },
  { label: 'Utilidades', count: 5 },
];

export function getToolBySlug(slug: string): Tool | undefined {
  return tools.find((t) => t.slug === slug);
}
