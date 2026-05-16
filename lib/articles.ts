export type TocItem = { id: string; label: string };

export type Article = {
  slug: string;
  title: string;
  headline: string;
  lede: string;
  category: string;
  readTime: string;
  date: string;
  dateISO: string;
  issue: string;
  coverClass: string;
  coverOrn: string;
  excerpt: string;
  content: string;
  toc: TocItem[];
  prev?: { slug: string; title: string; category: string; readTime: string };
  next?: { slug: string; title: string; category: string; readTime: string };
  relatedSlugs?: string[];
};

export const articles: Article[] = [
  {
    slug: 'desplegar-con-vercel',
    title: 'Cómo desplegar con Vercel: Guía completa 2025 — GaloDev',
    headline: 'Cómo desplegar tu app con Vercel: guía completa para 2025.',
    lede: 'Desde conectar tu repositorio hasta tener tu app en producción con dominio propio, variables de entorno y deploys automáticos en cada commit. Todo lo que necesitas saber sin dar vueltas.',
    category: 'Tutorial',
    readTime: '9 min',
    date: 'May 10, 2025',
    dateISO: '2025-05-10',
    issue: '04',
    coverClass: 'cover-1',
    coverOrn: 'deploy',
    excerpt: 'Desde conectar tu repo de GitHub hasta tener tu app en producción con dominio propio. Todo lo que necesitas para publicar con Vercel en menos de 10 minutos.',
    toc: [
      { id: 'intro', label: '¿Qué es Vercel?' },
      { id: 'requisitos', label: 'Requisitos previos' },
      { id: 'conectar', label: 'Conectar con GitHub' },
      { id: 'deploy', label: 'Tu primer deploy' },
      { id: 'env', label: 'Variables de entorno' },
      { id: 'dominio', label: 'Dominio personalizado' },
      { id: 'preview', label: 'Preview deployments' },
      { id: 'conclusion', label: 'Conclusión' },
    ],
    content: `
<h2 id="intro">¿Qué es <span class="italic">Vercel</span>?</h2>
<p>Vercel es la plataforma de despliegue más popular para aplicaciones frontend y fullstack, especialmente si trabajas con Next.js. No en vano: Vercel es la empresa que creó Next.js, así que la integración entre ambos es prácticamente perfecta. Pero no te confundas: Vercel también funciona de maravilla con Astro, SvelteKit, Nuxt, Remix, Vue, y casi cualquier framework moderno.</p>
<p>Lo que hace especial a Vercel es su arquitectura edge: tu aplicación se despliega en más de <strong>100 regiones alrededor del mundo</strong> automáticamente. Cada vez que alguien visita tu sitio, se sirve desde el servidor más cercano a él. El resultado es latencia mínima sin configuración adicional.</p>

<div class="numbers-callout">
  <div><div class="n-label">Regiones edge</div><div class="n-num">100<span class="italic">+</span></div></div>
  <div><div class="n-label">Deploy promedio</div><div class="n-num">45<span class="italic">s</span></div></div>
  <div><div class="n-label">Plan gratis</div><div class="n-num">∞<span class="italic">proj</span></div></div>
</div>

<h2 id="requisitos">Requisitos <span class="italic">previos.</span></h2>
<p>Antes de empezar, asegúrate de tener lo siguiente:</p>
<ul>
  <li><strong>Una cuenta en GitHub, GitLab o Bitbucket</strong> — Vercel se conecta directamente a tu repositorio.</li>
  <li><strong>Tu proyecto listo para producción</strong> — asegúrate de que corre sin errores con <code>npm run build</code>.</li>
  <li><strong>Un archivo de configuración correcto</strong> — en Next.js es automático; en otros frameworks puede requerir un <code>vercel.json</code> mínimo.</li>
  <li><strong>Una cuenta de Vercel</strong> — el plan gratuito (Hobby) es más que suficiente para empezar y soporta proyectos personales sin límite.</li>
</ul>
<p>No necesitas tarjeta de crédito para el plan gratuito. Vercel es generoso: el free tier incluye 100GB de ancho de banda al mes, builds ilimitados y funciones serverless.</p>

<h2 id="conectar">Conectar con <span class="italic">GitHub.</span></h2>
<p>El flujo de trabajo con Vercel gira alrededor de tu repositorio. Cada vez que haces <code>git push</code>, Vercel detecta el cambio, hace el build y despliega automáticamente. Así de simple.</p>
<p>Para empezar, ve a <strong>vercel.com</strong>, crea una cuenta y selecciona "Add New Project". Vercel te pedirá que conectes tu proveedor de Git. Elige GitHub (o GitLab/Bitbucket) y autoriza el acceso. Puedes dar acceso a todos tus repositorios o solo a los que elijas — recomiendo el acceso selectivo por seguridad.</p>
<p>Una vez conectado, verás la lista de tus repositorios. Busca el proyecto que quieres desplegar y haz clic en "Import".</p>

<div class="pullquote">
  Cada <code>git push</code> a <span class="italic">main</span> es un deploy. No hay paso dos.
</div>

<h2 id="deploy">Tu primer <span class="italic">deploy.</span></h2>
<p>Después de seleccionar el repositorio, Vercel detecta automáticamente el framework. Si es Next.js, configura todo sin intervención tuya. Para otros frameworks, puede que necesites especificar el comando de build y el directorio de salida.</p>
<p>Los valores por defecto para Next.js son:</p>
<ul>
  <li><strong>Build Command:</strong> <code>next build</code></li>
  <li><strong>Output Directory:</strong> <code>.next</code></li>
  <li><strong>Install Command:</strong> <code>npm install</code></li>
  <li><strong>Root Directory:</strong> <code>./</code> (la raíz del proyecto)</li>
</ul>
<p>Haz clic en "Deploy" y observa cómo Vercel muestra el log del build en tiempo real. En menos de 60 segundos tendrás tu aplicación live con una URL del tipo <code>tu-proyecto.vercel.app</code>. Esa URL es permanente y siempre apuntará a tu último deploy en producción.</p>

<h2 id="env">Variables de <span class="italic">entorno.</span></h2>
<p>Casi toda aplicación real necesita variables de entorno: claves de API, URLs de bases de datos, secretos de autenticación. Vercel tiene una gestión de variables de entorno excelente que te permite separar los valores según el entorno.</p>
<p>Ve a <strong>Settings → Environment Variables</strong> en tu proyecto en Vercel. Puedes añadir variables para tres entornos distintos:</p>
<ol>
  <li><strong>Production</strong> — solo se aplican en el deploy de la rama principal (main/master).</li>
  <li><strong>Preview</strong> — se aplican en los preview deployments (ramas y pull requests).</li>
  <li><strong>Development</strong> — las puedes descargar con <code>vercel env pull .env.local</code> para usarlas en tu máquina.</li>
</ol>
<p>Para Next.js, recuerda: las variables que empiezan con <code>NEXT_PUBLIC_</code> se exponen al cliente (navegador). Las demás solo son accesibles en el servidor. <strong>Nunca pongas claves secretas con el prefijo NEXT_PUBLIC_</strong>.</p>

<h2 id="dominio">Dominio <span class="italic">personalizado.</span></h2>
<p>La URL de <code>vercel.app</code> funciona perfectamente, pero para un proyecto serio necesitas tu propio dominio. Vercel hace que añadir un dominio sea trivial.</p>
<p>En <strong>Settings → Domains</strong>, escribe tu dominio y Vercel te mostrará exactamente qué registros DNS tienes que añadir en tu proveedor (Namecheap, Cloudflare, GoDaddy, etc.). Normalmente son dos registros:</p>
<ul>
  <li>Un registro <strong>A</strong> para el dominio raíz (<code>@</code>) apuntando a la IP de Vercel.</li>
  <li>Un registro <strong>CNAME</strong> para el subdominio <code>www</code> apuntando a <code>cname.vercel-dns.com</code>.</li>
</ul>
<p>Una vez propagados los DNS (puede tomar entre 5 minutos y 48 horas, aunque suele ser rápido), Vercel automáticamente provisiona un <strong>certificado SSL/TLS gratis</strong> vía Let's Encrypt. HTTPS desde el primer día, sin coste adicional.</p>

<h2 id="preview">Preview <span class="italic">deployments.</span></h2>
<p>Esta es una de las funcionalidades más potentes de Vercel y que más valor aporta en equipos. Cada vez que abres un Pull Request o haces push a una rama que no sea main, Vercel crea automáticamente un <em>preview deployment</em> con su propia URL única.</p>
<p>¿Para qué sirve? Para revisar cambios en producción antes de mergear. Tu diseñador puede ver la feature en funcionamiento real. Tu cliente puede aprobar cambios en un entorno idéntico al de producción. Y cuando hay un bug en una PR, lo detectas antes de que llegue a los usuarios reales.</p>
<p>Cada comentario en la PR puede vincularse a un screenshot automático del preview deployment si instalas la integración de Vercel en GitHub. Es el flujo de trabajo más cómodo que existe para desarrollo frontend.</p>

<h2 id="conclusion">Conclusión: <span class="italic">¿Vale la pena Vercel?</span></h2>
<p>Para proyectos personales, startups y webs de contenido como esta: <strong>absolutamente sí</strong>. La experiencia de developer de Vercel no tiene competencia. El plan gratuito es más que suficiente para empezar a monetizar con AdSense, afiliados o cualquier otro modelo.</p>
<p>Cuando escales y el tráfico supere los límites del plan Hobby (100GB de ancho de banda), el plan Pro cuesta $20/mes y soporta proyectos comerciales. A esas alturas, si tienes tráfico para superar esos límites, ya estarás generando ingresos suficientes para cubrirlo.</p>
<p>El stack que recomendamos: <strong>Next.js + Vercel + Supabase</strong>. Es la combinación más potente, mejor documentada y más fácil de escalar que existe hoy para proyectos web modernos. Cada pieza encaja perfectamente con las otras.</p>
    `,
    next: { slug: 'utilizar-supabase', title: 'Supabase: La base de datos que está cambiando el juego', category: 'Tutorial', readTime: '10 min' },
  },

  {
    slug: 'utilizar-supabase',
    title: 'Cómo usar Supabase: Base de datos, Auth y Storage — GaloDev',
    headline: 'Supabase: todo lo que necesitas para tu backend sin complicaciones.',
    lede: 'Base de datos PostgreSQL, autenticación, storage y funciones serverless en una sola plataforma open source. La alternativa a Firebase que los desarrolladores llevaban años esperando.',
    category: 'Tutorial',
    readTime: '10 min',
    date: 'May 08, 2025',
    dateISO: '2025-05-08',
    issue: '03',
    coverClass: 'cover-3',
    coverOrn: 'data',
    excerpt: 'Base de datos PostgreSQL, autenticación, storage y funciones serverless en una sola plataforma open source. La alternativa a Firebase que los desarrolladores llevaban años esperando.',
    toc: [
      { id: 'intro', label: '¿Qué es Supabase?' },
      { id: 'proyecto', label: 'Crear tu primer proyecto' },
      { id: 'database', label: 'Base de datos y tablas' },
      { id: 'auth', label: 'Autenticación' },
      { id: 'storage', label: 'Storage' },
      { id: 'nextjs', label: 'Integración con Next.js' },
      { id: 'conclusion', label: 'Conclusión' },
    ],
    content: `
<h2 id="intro">¿Qué es <span class="italic">Supabase</span>?</h2>
<p>Supabase es una plataforma de backend open source que te da en un solo lugar: una base de datos PostgreSQL, autenticación de usuarios, almacenamiento de archivos, funciones serverless y una API REST y GraphQL generadas automáticamente. Todo sin necesidad de configurar servidores.</p>
<p>Lo que lo diferencia de Firebase (la alternativa más conocida) es que usa <strong>PostgreSQL real</strong>. No una base de datos NoSQL con sus limitaciones, sino SQL completo con relaciones, joins, índices y todas las herramientas que conoces. Además, al ser open source, puedes hacer self-hosting si lo necesitas.</p>

<div class="numbers-callout">
  <div><div class="n-label">Plan gratuito</div><div class="n-num">500<span class="italic">MB</span></div></div>
  <div><div class="n-label">Auth incluida</div><div class="n-num">50<span class="italic">K</span></div></div>
  <div><div class="n-label">Requests/mes</div><div class="n-num">2<span class="italic">M</span></div></div>
</div>

<h2 id="proyecto">Crear tu primer <span class="italic">proyecto.</span></h2>
<p>Crear un proyecto en Supabase toma menos de dos minutos. Ve a <strong>supabase.com</strong>, crea una cuenta (puedes usar tu cuenta de GitHub) y haz clic en "New Project".</p>
<p>Selecciona tu organización, elige un nombre para el proyecto, crea una contraseña segura para tu base de datos (guárdala bien, la necesitarás) y selecciona la región más cercana a tus usuarios. Para audiencia hispanohablante, las opciones más comunes son:</p>
<ul>
  <li><strong>us-east-1</strong> (North Virginia) — buena opción general para Latinoamérica.</li>
  <li><strong>eu-central-1</strong> (Frankfurt) — si tu audiencia está principalmente en España.</li>
  <li><strong>sa-east-1</strong> (São Paulo) — la más cercana para Sudamérica.</li>
</ul>
<p>Supabase tardará unos 2 minutos en provisionar tu proyecto. Una vez listo, tendrás acceso al <strong>Dashboard</strong>, una interfaz visual completa desde la que puedes gestionar todo sin tocar código.</p>

<h2 id="database">Base de datos y <span class="italic">tablas.</span></h2>
<p>La base de datos de Supabase es PostgreSQL estándar. Puedes crear tablas desde el Table Editor visual del dashboard o directamente con SQL en el SQL Editor. Para proyectos serios, recomendamos SQL: es más reproducible y puedes versionar tus migraciones.</p>
<p>Supabase tiene una funcionalidad clave llamada <strong>Row Level Security (RLS)</strong>. Con RLS puedes definir políticas que controlan qué filas puede leer, escribir o eliminar cada usuario. Es la forma correcta de proteger tus datos sin lógica adicional en tu backend.</p>
<p>Un ejemplo básico de política RLS para que cada usuario solo vea sus propios registros:</p>
<ul>
  <li>Habilita RLS en la tabla desde el dashboard.</li>
  <li>Crea una política: <code>auth.uid() = user_id</code> para SELECT.</li>
  <li>Crea otra política: <code>auth.uid() = user_id</code> para INSERT, UPDATE, DELETE.</li>
</ul>
<p>Con esto, aunque alguien obtenga tu clave pública de Supabase, no podrá leer datos de otros usuarios. La seguridad está en la base de datos, no en tu código.</p>

<div class="pullquote">
  Row Level Security es la diferencia entre una app <span class="italic">vulnerable</span> y una app segura por diseño.
</div>

<h2 id="auth">Autenticación sin <span class="italic">dolor.</span></h2>
<p>Supabase incluye autenticación completa lista para usar. Soporta:</p>
<ol>
  <li><strong>Email + password</strong> — con confirmación por email opcional.</li>
  <li><strong>Magic links</strong> — el usuario recibe un link y hace clic para autenticarse. Sin contraseña.</li>
  <li><strong>OAuth providers</strong> — Google, GitHub, Apple, Twitter, Discord, Slack y más de 15 proveedores.</li>
  <li><strong>Phone OTP</strong> — autenticación por SMS con código de un solo uso.</li>
</ol>
<p>La configuración de cada proveedor toma menos de 5 minutos. Para Google OAuth, por ejemplo: vas a <strong>Authentication → Providers → Google</strong> en el dashboard, añades tu Client ID y Secret de Google Cloud Console, y Supabase maneja todo el flujo OAuth. Puedes tener Google Auth funcionando en tu app en menos de 10 minutos.</p>

<h2 id="storage">Storage para tus <span class="italic">archivos.</span></h2>
<p>Supabase Storage te permite subir y servir archivos (imágenes, PDFs, videos) directamente integrado con tu autenticación. Los archivos se organizan en "buckets" que puedes hacer públicos o privados.</p>
<p>La integración con RLS es perfecta: puedes definir políticas para que solo el propietario de un archivo pueda modificarlo, o hacer ciertos buckets públicos para assets estáticos como avatares o imágenes de perfil.</p>
<p>En el plan gratuito tienes <strong>1GB de almacenamiento</strong>, suficiente para empezar. El ancho de banda también está incluido. Para proyectos con muchos archivos, el plan Pro ofrece 100GB por $25/mes.</p>

<h2 id="nextjs">Integración con <span class="italic">Next.js.</span></h2>
<p>La integración entre Supabase y Next.js es excelente gracias al paquete oficial <code>@supabase/supabase-js</code> y el más reciente <code>@supabase/ssr</code> para el App Router.</p>
<p>Para conectar Supabase a tu proyecto Next.js:</p>
<ol>
  <li>Instala las dependencias: <code>npm install @supabase/supabase-js @supabase/ssr</code></li>
  <li>Añade tus variables de entorno: <code>NEXT_PUBLIC_SUPABASE_URL</code> y <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code> (las encuentras en <strong>Project Settings → API</strong>).</li>
  <li>Crea un cliente Supabase para el servidor y otro para el cliente.</li>
  <li>Usa los clientes en tus Server Components, Client Components y Route Handlers según necesites.</li>
</ol>
<p>El paquete <code>@supabase/ssr</code> maneja correctamente las cookies y la sesión del usuario entre el servidor y el cliente, algo crítico en Next.js con App Router donde tienes componentes que se renderizan en el servidor.</p>

<h2 id="conclusion">Conclusión: el <span class="italic">backend perfecto.</span></h2>
<p>Para el 90% de proyectos web, Supabase te da todo lo que necesitas sin necesidad de configurar tu propio backend. La combinación <strong>Next.js + Vercel + Supabase</strong> es hoy el stack más productivo para lanzar aplicaciones web rápidamente sin sacrificar escalabilidad.</p>
<p>El plan gratuito de Supabase es generoso para empezar. Cuando tu proyecto crezca, el plan Pro a $25/mes soporta proyectos con tráfico real sin problemas. Y al ser open source, si algún día necesitas más control, puedes hacer self-hosting en tu propia infraestructura.</p>
<p>Pruébalo en tu próximo proyecto: conecta Supabase a una app Next.js en 10 minutos y verás por qué cada vez más desarrolladores lo eligen por encima de Firebase.</p>
    `,
    prev: { slug: 'desplegar-con-vercel', title: 'Cómo desplegar con Vercel: guía completa 2025', category: 'Tutorial', readTime: '9 min' },
    next: { slug: 'claude-vs-chatgpt', title: 'Claude vs ChatGPT: ¿cuál es el mejor en 2025?', category: 'Comparativa', readTime: '12 min' },
  },

  {
    slug: 'claude-vs-chatgpt',
    title: 'Claude vs ChatGPT: ¿Cuál es el mejor asistente IA en 2025? — GaloDev',
    headline: 'Claude vs ChatGPT: la comparativa honesta que nadie más hace.',
    lede: 'Dos años de usar ambos en producción. Cuál gana en código, cuál en redacción, cuál en razonamiento, y cuándo usar uno sobre el otro. Sin marketing, solo datos y experiencia real.',
    category: 'Comparativa',
    readTime: '12 min',
    date: 'May 05, 2025',
    dateISO: '2025-05-05',
    issue: '02',
    coverClass: 'cover-2',
    coverOrn: 'AI',
    excerpt: 'Dos años usando ambos en producción. Cuál gana en código, cuál en redacción, cuál en razonamiento. La comparativa honesta sin marketing.',
    toc: [
      { id: 'intro', label: 'La guerra de los LLMs' },
      { id: 'quienes', label: '¿Quiénes son los contendientes?' },
      { id: 'redaccion', label: 'Redacción y creatividad' },
      { id: 'codigo', label: 'Programación y código' },
      { id: 'razonamiento', label: 'Razonamiento y análisis' },
      { id: 'contexto', label: 'Contexto y memoria' },
      { id: 'precios', label: 'Precios y planes' },
      { id: 'verdict', label: 'Veredicto final' },
    ],
    content: `
<h2 id="intro">La guerra de los <span class="italic">LLMs.</span></h2>
<p>Hace dos años, ChatGPT era la única respuesta seria cuando alguien preguntaba qué asistente de IA usar. Hoy la pregunta es más difícil. Claude de Anthropic lleva varios trimestres siendo considerado el mejor LLM disponible en múltiples benchmarks, mientras que OpenAI ha respondido con GPT-4o y los modelos de la serie "o" con capacidades de razonamiento avanzado.</p>
<p>Esta no es una comparativa de benchmarks artificiales. Es la comparativa de alguien que ha usado <strong>ambos modelos en producción</strong> — para escribir código, redactar contenido, analizar datos y resolver problemas complejos. Lo que importa no es qué dice una tabla de resultados, sino qué funciona mejor en el mundo real.</p>

<div class="numbers-callout">
  <div><div class="n-label">Claude contexto</div><div class="n-num">200<span class="italic">K</span></div></div>
  <div><div class="n-label">GPT-4o contexto</div><div class="n-num">128<span class="italic">K</span></div></div>
  <div><div class="n-label">Lanzamientos 2024</div><div class="n-num">12<span class="italic">+</span></div></div>
</div>

<h2 id="quienes">¿Quiénes son los <span class="italic">contendientes</span>?</h2>
<p><strong>ChatGPT</strong> es el producto de OpenAI, la empresa que básicamente inició la carrera moderna de los LLMs con GPT-3 en 2020 y la popularizó masivamente con ChatGPT en noviembre de 2022. Hoy ofrece varios modelos: GPT-4o (el más rápido y equilibrado), o1 y o3 (especializados en razonamiento), y GPT-4o-mini (más barato). OpenAI tiene detrás la inversión masiva de Microsoft.</p>
<p><strong>Claude</strong> es el asistente de Anthropic, fundada por ex-empleados de OpenAI que querían construir IA de forma más segura. Claude Sonnet 4 y Claude Opus 4 son sus modelos más capaces actualmente. Anthropic ha recibido inversiones significativas de Google y Amazon, y su enfoque en "IA constitucional" (entrenar modelos para que sean útiles, inofensivos y honestos) ha dado resultados notables en términos de calidad de respuesta.</p>

<h2 id="redaccion">Redacción y <span class="italic">creatividad.</span></h2>
<p>Este es el área donde Claude destaca de forma más consistente. Las respuestas de Claude tienen una calidad de prosa notablemente superior: mejor estructura, vocabulario más rico, y una capacidad para mantener el tono y estilo solicitado que ChatGPT no siempre logra.</p>
<p>Para redacción de contenido, artículos, emails o documentos técnicos, Claude produce textos que requieren menos edición. No añade frases de relleno. No repite ideas. No usa el mismo adjetivo tres veces en un párrafo. Características que parecen menores pero que se acumulan en grandes diferencias cuando produces mucho contenido.</p>
<p>ChatGPT con GPT-4o también escribe bien, especialmente en inglés. Pero tiende a ser más verbose y a incluir estructuras predecibles (listas de bullets cuando no se piden, introducciones genéricas, conclusiones formulaicas) que Claude evita mejor.</p>

<div class="pullquote">
  Claude escribe como alguien que <span class="italic">sabe escribir</span>. GPT-4o escribe como alguien que sabe que debe escribir bien.
</div>

<h2 id="codigo">Programación y <span class="italic">código.</span></h2>
<p>Aquí la situación es más matizada. Ambos modelos son excelentes programando, pero tienen fortalezas distintas:</p>
<ul>
  <li><strong>Claude</strong> brilla en tareas de código complejas que requieren razonar sobre una base de código grande, refactorizar con criterio, y mantener coherencia a través de muchos archivos. Su contexto de 200K tokens es una ventaja real aquí.</li>
  <li><strong>ChatGPT (o1/o3)</strong> gana en problemas algorítmicos puros, matemáticas, y código que requiere múltiples pasos de razonamiento lógico. Los modelos "o" de OpenAI están específicamente diseñados para este tipo de tareas.</li>
  <li><strong>GPT-4o</strong> es más rápido que Claude Sonnet para completar código simple y tiene mejor integración con el ecosistema de herramientas de OpenAI (intérprete de código, búsqueda web en tiempo real).</li>
</ul>
<p>Para el desarrollo web del día a día — Next.js, TypeScript, APIs REST, SQL — Claude Sonnet 4 es nuestra primera elección. Para algoritmos y problemas matemáticos complejos, o1 de OpenAI es difícil de superar.</p>

<h2 id="razonamiento">Razonamiento y <span class="italic">análisis.</span></h2>
<p>Claude destaca en tareas que requieren razonamiento largo y coherente: analizar documentos complejos, extraer conclusiones de múltiples fuentes, detectar inconsistencias en argumentos, o estructurar respuestas a preguntas abiertas difíciles.</p>
<p>ChatGPT con los modelos "o" (o1, o3) ha sido específicamente entrenado para razonamiento mediante cadena de pensamiento ("chain of thought"). Para problemas que requieren muchos pasos lógicos bien definidos — matemáticas, lógica formal, puzzles — o3 es actualmente el líder indiscutible.</p>
<p>Para razonamiento sobre texto y análisis de documentos extensos: Claude. Para razonamiento matemático y lógico: los modelos "o" de OpenAI.</p>

<h2 id="contexto">Contexto y <span class="italic">memoria.</span></h2>
<p>Claude ofrece ventanas de contexto de <strong>200K tokens</strong> (aproximadamente 150,000 palabras o un libro de tamaño medio). GPT-4o tiene 128K tokens. En la práctica, esto rara vez importa para conversaciones normales, pero es crucial si necesitas analizar código largo, documentos extensos o PDFs completos.</p>
<p>Ninguno de los dos recuerda conversaciones anteriores de forma nativa (necesitas Projects en Claude o Threads en ChatGPT para persistencia). Ambos tienen funciones de memoria, pero funcionan de forma diferente y ninguno es perfecto todavía.</p>

<h2 id="precios">Precios y <span class="italic">planes.</span></h2>
<p>Los planes de consumo son similares en precio. Para uso personal:</p>
<ul>
  <li><strong>ChatGPT Plus</strong>: $20/mes — acceso a GPT-4o, búsqueda web, generación de imágenes (DALL-E), y acceso limitado a o1.</li>
  <li><strong>Claude Pro</strong>: $20/mes — acceso a Claude Sonnet y Opus, contexto extendido, y Projects.</li>
  <li><strong>ChatGPT Pro</strong>: $200/mes — acceso ilimitado a todos los modelos incluyendo o1 Pro y o3.</li>
</ul>
<p>Para desarrollo vía API, los precios son comparables. Claude Sonnet 4 es más barato por token que GPT-4o, lo que lo hace más atractivo para aplicaciones con mucho volumen de requests.</p>

<h2 id="verdict">Veredicto <span class="italic">final.</span></h2>
<p><strong>Usa Claude si:</strong> redactas mucho contenido, trabajas con bases de código grandes, necesitas análisis de documentos extensos, o priorizas la calidad de la prosa sobre la velocidad.</p>
<p><strong>Usa ChatGPT si:</strong> necesitas acceso a información en tiempo real, trabajas con problemas matemáticos o algorítmicos complejos (usa o1/o3), o estás en el ecosistema de herramientas de OpenAI.</p>
<p>La respuesta honesta es que <strong>no tienes que elegir</strong>. $20/mes en Claude Pro y $20/mes en ChatGPT Plus es la inversión en productividad más barata que puedes hacer como desarrollador o creador de contenido hoy. Úsalos para lo que cada uno hace mejor.</p>
    `,
    prev: { slug: 'utilizar-supabase', title: 'Supabase: todo lo que necesitas para tu backend', category: 'Tutorial', readTime: '10 min' },
    next: { slug: 'grok-vs-gemini', title: 'Grok vs Gemini: los IAs de xAI y Google', category: 'Comparativa', readTime: '10 min' },
  },

  {
    slug: 'grok-vs-gemini',
    title: 'Grok vs Gemini: Comparativa completa 2025 — GaloDev',
    headline: 'Grok vs Gemini: dos gigantes tecnológicos y sus apuestas en IA.',
    lede: 'xAI de Elon Musk contra Google DeepMind. Información en tiempo real, capacidades multimodales, precios y casos de uso. La comparativa que necesitabas para decidir cuál usar.',
    category: 'Comparativa',
    readTime: '10 min',
    date: 'May 02, 2025',
    dateISO: '2025-05-02',
    issue: '01',
    coverClass: 'cover-4',
    coverOrn: 'vs',
    excerpt: 'xAI de Elon Musk contra Google DeepMind. Información en tiempo real, capacidades multimodales y precios. La comparativa definitiva para 2025.',
    toc: [
      { id: 'intro', label: 'Dos gigantes tecnológicos' },
      { id: 'grok', label: '¿Qué es Grok?' },
      { id: 'gemini', label: '¿Qué es Gemini?' },
      { id: 'tiempo-real', label: 'Información en tiempo real' },
      { id: 'multimodal', label: 'Capacidades multimodales' },
      { id: 'developers', label: 'Para desarrolladores' },
      { id: 'casos', label: 'Casos de uso' },
      { id: 'verdict', label: 'Veredicto' },
    ],
    content: `
<h2 id="intro">Dos gigantes <span class="italic">tecnológicos.</span></h2>
<p>Mientras el mundo debate entre Claude y ChatGPT, dos actores con recursos prácticamente ilimitados han entrado en la carrera con propuestas muy diferentes: Google con Gemini y xAI (la empresa de Elon Musk) con Grok. Ninguno de los dos es una copia del otro, y sus fortalezas reflejan de dónde vienen sus creadores.</p>
<p>Google tiene décadas de indexación web, infraestructura de búsqueda, y la mayor base de datos de conocimiento del mundo. xAI tiene acceso a Twitter/X en tiempo real y la filosofía de Musk de no censurar respuestas. El resultado son dos modelos con personalidades, fortalezas y debilidades muy distintas.</p>

<div class="numbers-callout">
  <div><div class="n-label">Gemini contexto</div><div class="n-num">1<span class="italic">M</span></div></div>
  <div><div class="n-label">Grok contexto</div><div class="n-num">131<span class="italic">K</span></div></div>
  <div><div class="n-label">Gemini lanzamiento</div><div class="n-num">2023<span class="italic">·Q4</span></div></div>
</div>

<h2 id="grok">¿Qué es <span class="italic">Grok</span>?</h2>
<p>Grok es el modelo de lenguaje creado por xAI, la empresa de inteligencia artificial fundada por Elon Musk en 2023. Se lanzó inicialmente como exclusiva para suscriptores de X Premium, y su diferenciador principal era el acceso a datos en tiempo real de la plataforma X (antes Twitter).</p>
<p>Grok 3, la versión más reciente en el momento de escribir este artículo, es un modelo genuinamente capaz. Ha obtenido resultados competitivos en benchmarks de razonamiento matemático y científico, y su enfoque en responder "sin filtros" lo diferencia de competidores más cautelosos como Gemini.</p>
<p>Musk ha sido explícito sobre su filosofía: Grok está diseñado para ser más honesto y menos "políticamente correcto" que otros modelos. En la práctica, esto significa que responde a preguntas que otros modelos rechazan, aunque también puede producir respuestas que no pasarían los filtros de seguridad de Anthropic u OpenAI.</p>

<h2 id="gemini">¿Qué es <span class="italic">Gemini</span>?</h2>
<p>Gemini es la familia de modelos de IA de Google DeepMind. Lanzado en diciembre de 2023, reemplazó a Bard como el asistente de IA principal de Google. La familia incluye varios modelos: Gemini Ultra (el más potente), Gemini Pro (el equilibrado), y Gemini Flash (el más rápido y económico).</p>
<p>La gran apuesta de Google con Gemini es la <strong>multimodalidad</strong>: fue diseñado desde cero para entender y generar texto, código, imágenes, audio y video de forma nativa. No es una característica añadida después, sino parte del diseño fundamental del modelo.</p>
<p>Otra ventaja significativa de Gemini es su <strong>ventana de contexto de 1 millón de tokens</strong> en Gemini 1.5 Pro — la más grande disponible comercialmente. Esto equivale aproximadamente a 700,000 palabras o varias horas de video. Para análisis de documentos o bases de código enormes, esto es una ventaja real.</p>

<h2 id="tiempo-real">Información en <span class="italic">tiempo real.</span></h2>
<p>Esta es probablemente la diferencia más práctica entre ambos modelos. <strong>Grok tiene acceso nativo a X (Twitter)</strong> en tiempo real. Si quieres saber qué está pasando ahora mismo en el mundo, qué están diciendo los expertos sobre un tema específico, o cuál es el sentimiento del mercado en tiempo real, Grok tiene una ventaja genuina aquí.</p>
<p>Para periodistas, traders, y cualquiera que necesite información actualizada al minuto, Grok es el único modelo que puede ofrecer esto sin fricción. Puede analizar conversaciones que sucedieron hace minutos, no hace meses.</p>
<p>Gemini tiene acceso a búsqueda de Google, lo que también le da información actualizada, aunque no en tiempo real al nivel de los datos de X. Sin embargo, para la mayoría de preguntas factuales actuales, ambos tienen acceso suficiente a información reciente.</p>

<div class="pullquote">
  Si lo que necesitas es saber qué pasa ahora mismo en el mundo, <span class="italic">Grok no tiene competencia.</span>
</div>

<h2 id="multimodal">Capacidades <span class="italic">multimodales.</span></h2>
<p>Aquí Gemini tiene una ventaja estructural. Al haber sido diseñado multimodal desde el principio, maneja imágenes, audio y video de forma más sofisticada que Grok. Puedes subir una imagen de un error en tu pantalla y Gemini lo entiende. Puedes subir un PDF de 100 páginas y analizarlo completo. Puedes subir un video corto y pedir que lo describa o analice.</p>
<p>Grok también tiene capacidades multimodales con imágenes, pero son más básicas que las de Gemini. Para tareas que involucran análisis profundo de imágenes, documentos extensos o video, Gemini es la mejor opción actualmente.</p>
<p>Una característica única de Gemini es su integración con el ecosistema de Google: puedes conectarlo a Google Drive, Docs, Gmail, y Workspace en general. Para usuarios del ecosistema de Google, esto es una ventaja práctica que ningún otro modelo ofrece.</p>

<h2 id="developers">Para <span class="italic">desarrolladores.</span></h2>
<p>Ambos tienen APIs bien documentadas, pero hay diferencias importantes:</p>
<ul>
  <li><strong>Gemini API</strong> (a través de Google AI Studio) tiene un plan gratuito generoso con límites de uso diarios. El acceso a través de Google Cloud Vertex AI es más potente pero más complejo de configurar.</li>
  <li><strong>Grok API</strong> sigue el mismo formato que la API de OpenAI, lo que significa que si ya tienes código usando OpenAI, migrar a Grok es literalmente cambiar la URL base y la clave API. Esto reduce la barrera de adopción significativamente.</li>
  <li><strong>Precios</strong>: Gemini Flash es uno de los modelos más baratos disponibles por token. Grok también es competitivo en precio, especialmente comparado con GPT-4o o Claude Opus.</li>
</ul>

<h2 id="casos">Casos de <span class="italic">uso por modelo.</span></h2>
<p>Usa <strong>Grok</strong> cuando necesites:</p>
<ul>
  <li>Monitorear tendencias en redes sociales o información en tiempo real.</li>
  <li>Respuestas sin filtros de seguridad excesivos (investigación, periodismo, debates).</li>
  <li>Integración simple con APIs existentes de OpenAI (el formato es compatible).</li>
  <li>Análisis de sentimiento en tiempo real de conversaciones públicas.</li>
</ul>
<p>Usa <strong>Gemini</strong> cuando necesites:</p>
<ul>
  <li>Analizar documentos muy largos (hasta 1M tokens de contexto).</li>
  <li>Procesar imágenes, audio o video de forma sofisticada.</li>
  <li>Integración con el ecosistema de Google Workspace.</li>
  <li>Modelo económico y rápido para alto volumen de requests (Gemini Flash).</li>
</ul>

<h2 id="verdict">Veredicto: depende de <span class="italic">para qué.</span></h2>
<p>No hay un ganador absoluto entre Grok y Gemini porque están optimizados para cosas diferentes. Grok es el modelo para el mundo real y el presente inmediato: X, tendencias, información sin filtrar. Gemini es el modelo para documentos, multimodalidad y el ecosistema de Google.</p>
<p>Si tuviéramos que elegir uno solo para uso general: <strong>Gemini Pro</strong>. La ventana de contexto de 1M tokens, las capacidades multimodales maduras, y el plan gratuito generoso lo hacen el mejor punto de entrada. Pero si tu caso de uso específico implica redes sociales, tiempo real o compatibilidad con la API de OpenAI, Grok merece una prueba seria.</p>
<p>La buena noticia es que ninguno de los dos cuesta $20/mes para la mayoría de usuarios, y ambos tienen planes gratuitos usables. Pruébalos. La mejor comparativa es la que haces con tus propios casos de uso.</p>
    `,
    prev: { slug: 'claude-vs-chatgpt', title: 'Claude vs ChatGPT: la comparativa honesta', category: 'Comparativa', readTime: '12 min' },
    next: { slug: 'ia-generativa-explicado-facil', title: 'IA Generativa explicada fácil', category: 'Guía', readTime: '8 min' },
  },

  {
    relatedSlugs: ['claude-vs-chatgpt', 'grok-vs-gemini', 'que-es-nextjs'],
    slug: 'ia-generativa-explicado-facil',
    title: 'IA Generativa explicada fácil: guía completa 2025 — GaloDev',
    headline: 'IA Generativa explicada fácil: qué es, cómo funciona y cómo usarla hoy.',
    lede: 'LLMs, tokens, agentes, automatización. Todo lo que necesitas entender sobre la inteligencia artificial generativa sin tecnicismos innecesarios. La guía que le enviarías a tu madre, y también a tu CTO.',
    category: 'Guía',
    readTime: '8 min',
    date: 'May 12, 2025',
    dateISO: '2025-05-12',
    issue: '05',
    coverClass: 'cover-2',
    coverOrn: 'AI',
    excerpt: 'LLMs, tokens, agentes y automatización explicados sin tecnicismos. Todo lo que necesitas para entender la IA generativa y empezar a usarla hoy mismo.',
    toc: [
      { id: 'intro', label: '¿Qué es la IA generativa?' },
      { id: 'como-funciona', label: '¿Cómo funciona un LLM?' },
      { id: 'casos-uso', label: 'Casos de uso reales' },
      { id: 'agentes', label: 'Agentes de IA' },
      { id: 'limitaciones', label: 'Limitaciones importantes' },
      { id: 'comenzar', label: 'Cómo empezar hoy' },
      { id: 'faqs', label: 'Preguntas frecuentes' },
    ],
    content: `
<h2 id="intro">¿Qué es la IA <span class="italic">generativa</span>?</h2>
<p>La inteligencia artificial generativa es la rama de la IA capaz de crear contenido nuevo: texto, imágenes, código, audio, video. A diferencia de la IA clásica, que clasificaba o predecía a partir de datos existentes, la IA generativa <strong>produce</strong>. Escribe un artículo, genera una fotografía que nunca existió, compone música, o escribe código funcional. Esta capacidad de crear es lo que la hace fundamentalmente diferente de todo lo anterior.</p>
<p>El detonante de la revolución actual fue la publicación del paper "Attention is All You Need" por investigadores de Google en 2017. Ese paper introdujo la arquitectura <strong>Transformer</strong>, que es la base de todos los grandes modelos de lenguaje que usamos hoy: GPT, Claude, Gemini, Llama. Antes de los Transformers, los modelos de IA eran mucho más limitados en su capacidad de entender y generar lenguaje natural con coherencia.</p>
<p>Hoy, la IA generativa está integrada en herramientas que millones de personas usan cada día: el autocompletado en Gmail, las sugerencias de código en VS Code, los chatbots de atención al cliente, los generadores de imágenes. No es una tecnología del futuro. Es la tecnología del presente, y entenderla ya no es opcional para quien trabaja con tecnología.</p>

<div class="numbers-callout">
  <div><div class="n-label">Usuarios ChatGPT</div><div class="n-num">180<span class="italic">M</span></div></div>
  <div><div class="n-label">Modelos en Hugging Face</div><div class="n-num">500<span class="italic">K+</span></div></div>
  <div><div class="n-label">Inversión global IA 2024</div><div class="n-num">200<span class="italic">B$</span></div></div>
</div>

<h2 id="como-funciona">¿Cómo funciona un <span class="italic">LLM</span>?</h2>
<p>Un Large Language Model (LLM) es un sistema que predice qué texto viene a continuación dado un texto previo. Esto suena simple, pero la escala a la que se hace produce resultados que parecen inteligencia genuina. Durante el entrenamiento, el modelo procesa cantidades masivas de texto —básicamente todo el internet, libros, artículos científicos, código— y aprende las relaciones estadísticas entre palabras, frases y conceptos.</p>
<p>El mecanismo central es la <strong>atención</strong> (attention). Cuando el modelo genera una respuesta, evalúa simultáneamente qué partes de todo el texto previo son relevantes para predecir la siguiente palabra. No lee de izquierda a derecha como un humano: considera todas las relaciones a la vez. Es lo que permite mantener coherencia a lo largo de respuestas largas y complejas.</p>
<p>Los <strong>tokens</strong> son la unidad básica que maneja el modelo. Un token equivale aproximadamente a 3/4 de una palabra en inglés (algo menos en español). GPT-4 fue entrenado con billones de tokens. Cuando pagas por una API de LLM, pagas por tokens procesados, tanto los que entran (tu prompt) como los que salen (la respuesta del modelo).</p>
<p>El comportamiento útil —seguir instrucciones, ser honesto, no ser dañino— viene de la fase de afinamiento: RLHF (Reinforcement Learning from Human Feedback). Humanos califican las respuestas del modelo y ese feedback ajusta los parámetros. Es lo que convierte un modelo que predice texto en un asistente que colabora contigo de forma productiva.</p>

<div class="pullquote">
  Un LLM no "sabe" nada. <span class="italic">Predice</span> qué texto viene después, con tanta precisión que el resultado parece conocimiento real.
</div>

<h2 id="casos-uso">Casos de uso <span class="italic">reales.</span></h2>
<p>La IA generativa no es útil para todo, pero donde sí lo es, transforma el flujo de trabajo de forma radical. Los casos donde el impacto es más claro hoy:</p>
<ul>
  <li><strong>Código</strong>: GitHub Copilot, Claude Code y ChatGPT generan código funcional, explican errores, refactorizan funciones y documentan automáticamente. Un desarrollador con estas herramientas puede producir el doble en el mismo tiempo sin sacrificar calidad.</li>
  <li><strong>Redacción y contenido</strong>: artículos, emails, descripciones de producto, guiones de video. La IA genera el borrador; tú editas y añades criterio y voz propia. El tiempo de producción cae un 60-70% en la mayoría de casos.</li>
  <li><strong>Análisis de documentos</strong>: sube un contrato de 80 páginas y pide un resumen ejecutivo en cinco puntos clave. Analiza reportes financieros, documentación técnica, papers académicos en segundos en vez de horas.</li>
  <li><strong>Imágenes y diseño</strong>: Midjourney, DALL-E y Stable Diffusion generan imágenes de alta calidad desde descripciones en texto. Prototipos visuales, assets de marketing, conceptualización de producto.</li>
  <li><strong>Automatización de procesos</strong>: agentes de IA que ejecutan tareas secuenciales sin intervención humana. Los flujos que antes requerían semanas de programación se crean hoy en horas.</li>
</ul>

<h2 id="agentes">Agentes de <span class="italic">IA.</span></h2>
<p>Un agente de IA es un sistema que puede tomar acciones en el mundo real, no solo generar texto. La diferencia es fundamental: un chatbot responde preguntas; un agente busca información en internet, ejecuta código, guarda archivos, llama a APIs externas y encadena múltiples acciones para completar objetivos complejos sin supervisión constante.</p>
<p>El funcionamiento básico de un agente tiene cuatro fases: recibe un objetivo en lenguaje natural, planifica los pasos necesarios para lograrlo, ejecuta cada paso usando las herramientas disponibles, y evalúa el resultado ajustando el plan si algo no sale como esperaba. Este bucle continúa hasta completar el objetivo.</p>
<p>Agentes que puedes usar hoy mismo:</p>
<ol>
  <li><strong>Claude Code</strong>: agente de programación que lee, escribe y ejecuta código en tu máquina local. Puede completar tareas de desarrollo completas: crear features, corregir bugs, escribir tests.</li>
  <li><strong>Devin</strong>: el primer "ingeniero de software IA" que puede tomar un issue de GitHub, investigar el código, implementar la solución y crear un pull request listo para revisión.</li>
  <li><strong>Zapier AI</strong>: agentes de automatización conectados a más de 5,000 apps sin necesidad de código. Crea flujos de trabajo complejos en lenguaje natural.</li>
  <li><strong>LangChain / LlamaIndex</strong>: frameworks open source para construir tus propios agentes con herramientas y bases de conocimiento personalizadas.</li>
</ol>
<p>El límite actual de los agentes es la confiabilidad en tareas ambiguas. Son excelentes cuando el camino hacia el objetivo es claro y definido; fallan cuando la tarea requiere juicio humano complejo o contexto que no está en sus instrucciones. La supervisión humana sigue siendo necesaria para decisiones críticas.</p>

<h2 id="limitaciones">Limitaciones <span class="italic">importantes.</span></h2>
<p>Entender qué no puede hacer la IA generativa es tan importante como entender qué sí puede. Las limitaciones que más impactan en uso real:</p>
<ul>
  <li><strong>Alucinaciones</strong>: los LLMs pueden inventar información con total confianza. Citan estudios que no existen, dan fechas incorrectas, afirman hechos falsos. Siempre verifica información factual crítica con fuentes primarias.</li>
  <li><strong>Fecha de corte</strong>: el conocimiento del modelo termina en su fecha de entrenamiento. Para información reciente, necesitas modelos con acceso a búsqueda web en tiempo real (como Perplexity, ChatGPT con búsqueda, o Grok).</li>
  <li><strong>Sin memoria persistente</strong>: cada conversación empieza desde cero a menos que uses herramientas específicas (Projects en Claude, Custom GPTs en ChatGPT). El modelo no recuerda lo que le dijiste ayer.</li>
  <li><strong>Privacidad de datos</strong>: todo lo que envías a un LLM en la nube pasa por los servidores del proveedor. Para datos sensibles (médicos, legales, financieros), considera modelos locales como Llama corriendo en tu propia infraestructura.</li>
  <li><strong>Razonamiento matemático exacto</strong>: los LLMs cometen errores en operaciones matemáticas complejas. Para cálculos críticos, usa herramientas con ejecución de código (Code Interpreter de ChatGPT, por ejemplo).</li>
</ul>

<h2 id="comenzar">Cómo empezar <span class="italic">hoy.</span></h2>
<p>Si eres nuevo en la IA generativa, este es el camino más directo para extraerle valor en menos de una semana:</p>
<ol>
  <li><strong>Días 1-2</strong>: Crea cuentas gratuitas en Claude (claude.ai) y ChatGPT (chat.openai.com). Úsalos para tareas reales de tu trabajo diario: redactar emails, resumir documentos, explicar conceptos técnicos. La curva de aprendizaje es mínima.</li>
  <li><strong>Días 3-4</strong>: Aprende a escribir buenos prompts. La regla de oro: contexto + tarea + formato de salida. "Eres un experto en marketing digital. Necesito 5 ideas para un post de Instagram sobre [producto] para [audiencia]. Devuelve una lista con el copy completo y el CTA para cada idea."</li>
  <li><strong>Días 5-7</strong>: Explora la API. Con $5 de crédito en OpenAI o Anthropic puedes construir tu primera aplicación con IA. Empieza simple: un generador de algo que te sea útil personalmente. El salto de usuario a builder cambia completamente la perspectiva.</li>
</ol>
<p>El mejor aprendizaje siempre viene de usar la IA para resolver problemas reales tuyos, no de tutoriales abstractos. La tecnología es accesible hoy. El único requisito es empezar.</p>

<h2 id="faqs">Preguntas <span class="italic">frecuentes.</span></h2>
<h3>¿La IA generativa va a reemplazar a los programadores?</h3>
<p>No en el corto ni medio plazo. La IA aumenta la productividad de los desarrolladores pero no puede reemplazar el criterio arquitectónico, la comprensión del negocio y la resolución de problemas complejos y ambiguos. Los desarrolladores que usan IA serán más productivos que los que no, y eso sí cambiará el mercado laboral: se necesitarán menos programadores junior para tareas repetitivas, pero más desarrolladores senior capaces de supervisar y dirigir sistemas con IA.</p>
<h3>¿Cuál es la diferencia entre IA generativa e IA clásica?</h3>
<p>La IA clásica clasifica, predice y toma decisiones basadas en patrones en datos existentes: detección de spam, sistemas de recomendación, diagnóstico médico por imagen. La IA generativa crea contenido nuevo que no existía antes: texto, imágenes, código, audio. La distinción fundamental es entre sistemas que analizan y sistemas que producen.</p>
<h3>¿Es seguro usar IA generativa con datos de mi empresa?</h3>
<p>Depende del proveedor y del tipo de datos. OpenAI y Anthropic ofrecen acuerdos de no entrenamiento para clientes de API y planes empresariales: tus datos no se usan para mejorar el modelo. Para datos altamente sensibles (historiales médicos, datos financieros regulados), considera modelos locales como Llama o Mistral corriendo en tu propia infraestructura, donde los datos nunca salen de tu red.</p>
<h3>¿Cuánto cuesta desarrollar una app con IA generativa?</h3>
<p>Para proyectos pequeños, los costes de API son mínimos: GPT-4o Mini cuesta $0.15 por millón de tokens de entrada. Una aplicación con 1,000 usuarios activos diarios puede costar entre $20-100/mes en llamadas a la API. Para aplicaciones con millones de usuarios, el coste de LLM se vuelve significativo y requiere optimización: caché de respuestas, modelos más pequeños para tareas simples, y procesamiento por lotes.</p>
    `,
    prev: { slug: 'grok-vs-gemini', title: 'Grok vs Gemini: comparativa completa 2025', category: 'Comparativa', readTime: '10 min' },
    next: { slug: 'api-rest-nodejs', title: 'Cómo crear una API REST con Node.js y Express', category: 'Tutorial', readTime: '11 min' },
  },

  {
    slug: 'api-rest-nodejs',
    title: 'Cómo crear una API REST con Node.js y Express: guía completa — GaloDev',
    headline: 'API REST con Node.js y Express: de cero a producción en una guía.',
    lede: 'Rutas, controladores, middleware, validación, autenticación con JWT y manejo de errores. Todo lo que necesitas para construir una API profesional con Node.js sin atajos ni malas prácticas.',
    category: 'Tutorial',
    readTime: '11 min',
    date: 'May 14, 2025',
    dateISO: '2025-05-14',
    issue: '06',
    coverClass: 'cover-3',
    coverOrn: 'code',
    excerpt: 'Rutas, middleware, validación, JWT y manejo de errores. Todo lo que necesitas para construir una API REST profesional con Node.js y Express desde cero.',
    toc: [
      { id: 'intro', label: '¿Qué es una API REST?' },
      { id: 'setup', label: 'Setup del proyecto' },
      { id: 'rutas', label: 'Rutas y controladores' },
      { id: 'middleware', label: 'Middleware y validación' },
      { id: 'auth', label: 'Autenticación con JWT' },
      { id: 'errores', label: 'Manejo de errores' },
      { id: 'deploy', label: 'Deploy en producción' },
      { id: 'faqs', label: 'Preguntas frecuentes' },
    ],
    content: `
<h2 id="intro">¿Qué es una <span class="italic">API REST</span>?</h2>
<p>Una API REST (Representational State Transfer) es una interfaz que permite que dos sistemas de software se comuniquen a través de HTTP usando un conjunto de convenciones bien definidas. Es el estándar de facto para construir backends web modernos: tu frontend en React o Next.js habla con tu backend a través de una API REST, y tu app móvil usa la misma API. Defines los endpoints una vez; todos los clientes los consumen.</p>
<p>Los principios fundamentales de REST son sencillos. Cada recurso tiene su propia URL (<code>/usuarios</code>, <code>/productos</code>, <code>/pedidos</code>). Las operaciones se expresan con verbos HTTP: GET para leer, POST para crear, PUT/PATCH para actualizar, DELETE para eliminar. Las respuestas son stateless: cada request contiene toda la información necesaria, el servidor no guarda estado de sesión entre requests.</p>
<p>Node.js con Express es hoy la combinación más popular para construir APIs REST. Node.js aporta un servidor JavaScript de alto rendimiento basado en eventos no bloqueantes —ideal para APIs con muchas conexiones concurrentes— y Express añade una capa de abstracción limpia sobre el módulo <code>http</code> nativo para definir rutas, middleware y respuestas de forma intuitiva.</p>

<div class="numbers-callout">
  <div><div class="n-label">Descargas Express/sem</div><div class="n-num">35<span class="italic">M</span></div></div>
  <div><div class="n-label">Node.js usuarios</div><div class="n-num">6.3<span class="italic">M</span></div></div>
  <div><div class="n-label">Empresas usando Node</div><div class="n-num">98<span class="italic">K+</span></div></div>
</div>

<h2 id="setup">Setup del <span class="italic">proyecto.</span></h2>
<p>Empezamos con un proyecto limpio. Crea una carpeta, inicializa npm e instala las dependencias esenciales:</p>
<ul>
  <li><code>express</code>: el framework web</li>
  <li><code>dotenv</code>: para cargar variables de entorno desde <code>.env</code></li>
  <li><code>cors</code>: para habilitar peticiones cross-origin desde tu frontend</li>
  <li><code>helmet</code>: para añadir headers de seguridad HTTP automáticamente</li>
  <li><code>express-validator</code>: para validar y sanitizar los datos de entrada</li>
  <li><code>jsonwebtoken</code> y <code>bcryptjs</code>: para autenticación con JWT y hashing de contraseñas</li>
</ul>
<p>La estructura de carpetas que recomendamos para una API escalable es la siguiente: <code>src/routes/</code> para las definiciones de rutas, <code>src/controllers/</code> para la lógica de negocio, <code>src/middleware/</code> para middleware reutilizable, <code>src/models/</code> para los modelos de datos, y <code>src/utils/</code> para funciones auxiliares. Esta separación mantiene el código organizado cuando la API crece.</p>
<p>Tu archivo <code>src/app.js</code> principal registra el middleware global y monta los routers. El archivo <code>src/server.js</code> arranca el servidor en el puerto configurado. Separar app de server facilita los tests: puedes importar <code>app</code> sin que el servidor arranque en el puerto.</p>

<h2 id="rutas">Rutas y <span class="italic">controladores.</span></h2>
<p>La organización de rutas por recurso mantiene el código modular. Para un recurso <code>/usuarios</code>, creas <code>src/routes/usuarios.js</code> con un Express Router que define GET /, GET /:id, POST /, PUT /:id y DELETE /:id. Cada ruta apunta a una función del controlador correspondiente.</p>
<p>Los controladores contienen la lógica de negocio: validar parámetros, interactuar con la base de datos, y devolver la respuesta correcta. Mantén los controladores delgados: si una función tiene más de 30-40 líneas, probablemente puedes extraer parte de la lógica a un servicio o utilidad reutilizable.</p>
<p>Las convenciones de respuesta son importantes para la consistencia. Para recursos encontrados, devuelve el objeto directamente con status 200. Para creación exitosa, devuelve el recurso creado con status 201. Para not found, devuelve status 404 con un mensaje descriptivo. Para errores de validación, status 422. Para errores del servidor, status 500 (nunca expongas el stack trace en producción).</p>
<p>Usa siempre parámetros de ruta (<code>/:id</code>) para identificadores de recursos y query params (<code>?page=2&limit=20</code>) para filtros y paginación. Nunca pongas filtros o parámetros opcionales en la ruta principal: dificultan el mantenimiento y generan rutas inconsistentes.</p>

<div class="pullquote">
  Un controlador que supera las 30 líneas es una señal de que <span class="italic">algo pertenece en otro lugar.</span>
</div>

<h2 id="middleware">Middleware y <span class="italic">validación.</span></h2>
<p>El middleware en Express es cualquier función que recibe <code>(req, res, next)</code> y puede modificar el request, enviar una respuesta, o pasar el control al siguiente middleware. Es el mecanismo más poderoso de Express: toda la funcionalidad transversal (autenticación, logging, validación, rate limiting) vive en middleware.</p>
<p>El orden de registro del middleware global importa. El orden recomendado es: seguridad (helmet, cors), parseo de body (express.json()), logging, rate limiting, y finalmente las rutas. El middleware de manejo de errores siempre va al final, con cuatro parámetros: <code>(err, req, res, next)</code>.</p>
<p>Para validación de datos de entrada, <code>express-validator</code> es la opción más idiomática en Express. Defines reglas de validación como array de middlewares antes del controlador:</p>
<ul>
  <li><code>body('email').isEmail().normalizeEmail()</code> — valida y normaliza el email</li>
  <li><code>body('password').isLength({ min: 8 })</code> — mínimo 8 caracteres</li>
  <li><code>body('nombre').trim().notEmpty()</code> — elimina espacios y verifica que no esté vacío</li>
  <li><code>param('id').isUUID()</code> — verifica que el ID sea un UUID válido</li>
</ul>
<p>En el controlador, llamas a <code>validationResult(req)</code> para obtener los errores. Si los hay, devuelves 422 con los detalles. Este patrón centraliza la validación, mantiene los controladores limpios y provee mensajes de error consistentes al cliente.</p>

<h2 id="auth">Autenticación con <span class="italic">JWT.</span></h2>
<p>JSON Web Tokens (JWT) son el mecanismo estándar para autenticación stateless en APIs REST. En lugar de guardar sesiones en el servidor, el cliente recibe un token firmado que incluye la identidad del usuario. En cada request siguiente, el cliente envía ese token en el header <code>Authorization: Bearer &lt;token&gt;</code> y el servidor lo verifica criptográficamente.</p>
<p>El flujo de autenticación tiene dos endpoints principales. El endpoint de login (<code>POST /auth/login</code>) recibe email y contraseña, verifica la contraseña contra el hash almacenado con <code>bcrypt.compare()</code>, y si es correcta genera un JWT con <code>jwt.sign(payload, secret, { expiresIn: '7d' })</code>. El payload incluye el ID del usuario y cualquier dato necesario para autorización (rol, plan, etc.).</p>
<p>El middleware de autenticación extrae el token del header Authorization, lo verifica con <code>jwt.verify(token, secret)</code>, y si es válido añade los datos del usuario a <code>req.user</code> para que los controladores los usen. Si el token es inválido o ha expirado, devuelve 401.</p>
<p>Consideraciones de seguridad críticas: usa un secret largo y aleatorio (mínimo 256 bits), guárdalo en variables de entorno nunca en el código, y establece tiempos de expiración cortos para access tokens (15 minutos a 1 hora). Implementa refresh tokens con mayor duración para renovar el access token sin que el usuario tenga que hacer login de nuevo.</p>

<h2 id="errores">Manejo de <span class="italic">errores.</span></h2>
<p>Un sistema robusto de manejo de errores es la diferencia entre una API que frustra a los desarrolladores y una que da joy de integrar. El patrón recomendado es crear una clase <code>AppError</code> que extiende <code>Error</code> con campos adicionales como <code>statusCode</code> e <code>isOperational</code>. Los errores operacionales (validación fallida, not found, unauthorized) son esperados y se devuelven al cliente. Los errores de programación (bugs, excepciones inesperadas) se loggean internamente y devuelven un 500 genérico.</p>
<p>El middleware de error global captura cualquier error que llegue con <code>next(error)</code> desde los controladores. Centraliza la lógica de respuesta: formato consistente, distinción entre entornos (desarrollo muestra el stack trace; producción solo el mensaje), y logging estructurado para monitoreo.</p>
<p>Para errores async, usa try/catch en los controladores o un wrapper de async que capture errores automáticamente y los pase a next(). Olvidar un try/catch en un controlador async provoca que el servidor quede colgado sin respuesta; el wrapper elimina ese riesgo por completo.</p>

<h2 id="deploy">Deploy en <span class="italic">producción.</span></h2>
<p>Para desplegar tu API Node.js en producción, las opciones más comunes son Railway, Render, Fly.io y AWS/GCP para escala mayor. Todos soportan Node.js con configuración mínima y deploys automáticos desde GitHub.</p>
<p>Variables de entorno obligatorias en producción: <code>NODE_ENV=production</code> (desactiva stack traces en respuestas de error), <code>PORT</code> (el puerto que usará el servidor), <code>JWT_SECRET</code> (el secret para firmar tokens), y la connection string de tu base de datos. Nunca hardcodees estos valores en el código.</p>
<p>En producción, añade un <strong>process manager</strong> como PM2 que reinicia tu app si cae y permite zero-downtime deployments. Si tu API necesita escalar horizontalmente, asegúrate de que sea truly stateless: sin sesiones en memoria, sin estado local. Toda la persistencia debe estar en la base de datos o caché externo (Redis).</p>

<h2 id="faqs">Preguntas <span class="italic">frecuentes.</span></h2>
<h3>¿Cuándo usar REST vs GraphQL?</h3>
<p>REST es la elección correcta para la mayoría de APIs: es más simple, tiene mejor soporte de caché HTTP, y los desarrolladores lo entienden sin curva de aprendizaje adicional. GraphQL brilla cuando tienes clientes con necesidades de datos muy diferentes (web vs mobile con campos distintos), o cuando necesitas evitar over-fetching en aplicaciones con muchas relaciones complejas. Para el 80% de proyectos, REST bien diseñado supera a GraphQL en mantenibilidad a largo plazo.</p>
<h3>¿Express vs Fastify vs Hono?</h3>
<p>Express sigue siendo la opción más segura por su ecosistema maduro y la cantidad de documentación disponible. Fastify ofrece rendimiento significativamente mejor (hasta 2x más requests por segundo) con validación de schemas integrada — buena elección si el rendimiento es crítico. Hono es la opción moderna para edge runtimes (Cloudflare Workers, Deno). Para la mayoría de proyectos: Express si priorizas ecosistema, Fastify si priorizas rendimiento.</p>
<h3>¿Cómo manejo la paginación en una API REST?</h3>
<p>El enfoque recomendado es cursor-based pagination para listas grandes que cambian frecuentemente (feeds, logs), y offset pagination para datasets estáticos o con filtros complejos. Para cursor pagination: devuelve un <code>nextCursor</code> en cada respuesta que el cliente usa como parámetro en la siguiente petición. Para offset: acepta <code>?page=2&limit=20</code> y devuelve <code>total</code>, <code>page</code>, <code>limit</code> y los items. Siempre pon un límite máximo de items por página (50-100) para proteger el servidor.</p>
<h3>¿Necesito TypeScript para una API de producción?</h3>
<p>Altamente recomendado, especialmente para proyectos que crecerán o tendrán múltiples desarrolladores. TypeScript atrapa errores en tiempo de compilación que en JavaScript aparecen en producción: tipos incorrectos en respuestas de base de datos, campos opcionales no manejados, typos en nombres de propiedades. El coste de setup es mínimo (1-2 horas) y el beneficio en mantenibilidad es enorme. Para APIs pequeñas o scripts rápidos, JavaScript está bien.</p>
    `,
    prev: { slug: 'ia-generativa-explicado-facil', title: 'IA Generativa explicada fácil', category: 'Guía', readTime: '8 min' },
    next: { slug: 'herramientas-gratis-desarrolladores-2026', title: 'Las mejores herramientas gratis para desarrolladores en 2026', category: 'Recursos', readTime: '12 min' },
  },

  {
    slug: 'herramientas-gratis-desarrolladores-2026',
    title: 'Las mejores herramientas gratis para desarrolladores en 2026 — GaloDev',
    headline: 'Las mejores herramientas gratis para desarrolladores en 2026.',
    lede: 'JSON formatters, generadores de contraseñas, paletas de color, herramientas de video, compresión, Base64, descargadores. La lista curada de utilidades que deberías tener siempre a mano sin pagar ni registrarte.',
    category: 'Recursos',
    readTime: '12 min',
    date: 'May 16, 2025',
    dateISO: '2025-05-16',
    issue: '07',
    coverClass: 'cover-1',
    coverOrn: 'tools',
    excerpt: 'La lista curada de herramientas web gratuitas que todo desarrollador debería tener a mano en 2026. Sin registro, sin freemium, sin límites artificiales.',
    toc: [
      { id: 'intro', label: 'Por qué las herramientas importan' },
      { id: 'json', label: 'JSON Formatter y Validator' },
      { id: 'base64', label: 'Base64 Encoder/Decoder' },
      { id: 'colores', label: 'Generador de paletas' },
      { id: 'contrasenas', label: 'Generador de contraseñas' },
      { id: 'video', label: 'Herramientas de video' },
      { id: 'descargadores', label: 'Descargadores sociales' },
      { id: 'flujo', label: 'Flujo de trabajo óptimo' },
      { id: 'faqs', label: 'Preguntas frecuentes' },
    ],
    content: `
<h2 id="intro">Por qué las <span class="italic">herramientas importan.</span></h2>
<p>Un desarrollador con las herramientas correctas no solo trabaja más rápido — trabaja con menos fricción mental. Cuando necesitas formatear un JSON, generar una paleta de colores o comprimir un video, lo último que quieres es perder diez minutos buscando una herramienta que funcione, que no te obligue a registrarte, que no esconda la función clave detrás de un paywall, o que no te bombardee con anuncios intrusivos.</p>
<p>El problema con la mayoría de herramientas online es exactamente ese: el modelo de negocio está en fricción. Te dan el 80% gratis y bloquean el 20% más útil. Te obligan a crear una cuenta para guardar el resultado. Muestran tantos anuncios que la interfaz se vuelve inutilizable. O directamente venden tus datos mientras tú usas su "herramienta gratis".</p>
<p>En GaloDev construimos herramientas que querríamos usar nosotros mismos. Sin registro. Sin límites artificiales. Sin "actualiza para exportar". Rápidas, bien diseñadas, y que hacen exactamente lo que dicen hacer. En este artículo recorremos las categorías más importantes y qué buscar en cada una.</p>

<div class="numbers-callout">
  <div><div class="n-label">Tiempo perdido/semana</div><div class="n-num">2.5<span class="italic">h</span></div></div>
  <div><div class="n-label">En herramientas rotasn</div><div class="n-num">47<span class="italic">%</span></div></div>
  <div><div class="n-label">Dev tools en GaloDev</div><div class="n-num">8<span class="italic">+</span></div></div>
</div>

<h2 id="json">JSON Formatter y <span class="italic">Validator.</span></h2>
<p>El JSON es el formato de intercambio de datos más usado en desarrollo web. Y también el más propenso a errores silenciosos: una coma de más, una llave sin cerrar, un string sin comillas dobles. Cuando una API devuelve JSON malformado o cuando recibes un blob de texto sin formato de una respuesta HTTP, necesitas dos cosas: formatear el JSON para que sea legible, y validarlo para encontrar el error.</p>
<p>Una buena herramienta de JSON debe hacer varias cosas bien. Formatear con indentación configurable (2 o 4 espacios). Validar y señalar exactamente en qué línea está el error. Permitir minimizar (comprimir) el JSON para producción. Y opcionalmente, mostrar una vista de árbol para navegar estructuras anidadas complejas.</p>
<p>Las herramientas que obligan a pegar el JSON en un campo y hacer clic en "formatear" son válidas pero lentas. Las mejores reformatean en tiempo real mientras escribes o pegas el contenido, mostrando errores al instante. Esto es especialmente valioso cuando debuggeas respuestas de APIs directamente en el navegador.</p>
<p>Prueba el <a href="/tools/json-formatter">JSON Formatter de GaloDev</a> — formatea, valida y comprime JSON en tiempo real sin registro ni límites. Copia el resultado con un clic.</p>

<div class="pullquote">
  Una buena herramienta de desarrollo <span class="italic">desaparece.</span> La usas, hace lo que necesitas, y sigues trabajando.
</div>

<h2 id="base64">Base64 <span class="italic">Encoder/Decoder.</span></h2>
<p>Base64 aparece constantemente en el desarrollo: tokens JWT (que son tres segmentos codificados en Base64), imágenes embebidas en CSS o HTML como data URIs, credenciales de autenticación HTTP Basic, respuestas de APIs que codifican datos binarios, certificados SSL y claves criptográficas en formato PEM.</p>
<p>Una herramienta de Base64 útil debe codificar y decodificar texto con soporte correcto de UTF-8 (los caracteres españoles, acentos y ñ deben manejarse correctamente). También debe soportar codificación URL-safe, donde los caracteres <code>+</code> y <code>/</code> se reemplazan por <code>-</code> y <code>_</code> para uso seguro en URLs y cookies.</p>
<p>El caso más frecuente en el día a día: decodificar el payload de un JWT para ver qué datos contiene sin necesidad de una librería. Simplemente tomas el segundo segmento del token (entre los dos puntos), lo pegas en el decoder, y obtienes el JSON con los claims del usuario. Muy útil para debugging en desarrollo.</p>
<p>El <a href="/tools/base64">Base64 Encoder/Decoder de GaloDev</a> convierte texto a Base64 y viceversa al instante, con soporte completo de UTF-8, modo URL-safe y copia con un clic.</p>

<h2 id="colores">Generador de <span class="italic">paletas de color.</span></h2>
<p>El color es uno de los aspectos más difíciles del diseño para desarrolladores que no son diseñadores. Elegir una paleta que funcione —que tenga suficiente contraste, que sea coherente, que tenga variantes claras y oscuras para distintos estados— requiere conocimientos de teoría del color que la mayoría de devs no tiene tiempo de aprender.</p>
<p>Un buen generador de paletas resuelve este problema: dado un color base, genera automáticamente variantes armónicas. Los mejores también calculan el ratio de contraste WCAG para verificar accesibilidad (AA y AAA), exportan los colores en múltiples formatos (HEX, RGB, HSL, CSS variables), y permiten previsualizar los colores en componentes de UI reales.</p>
<p>Las paletas generativas (complementarias, análogas, tríadas) son el punto de partida. Pero para aplicaciones de producción, lo que más valor aporta es una escala de un solo color: del más claro (backgrounds) al más oscuro (texto), con 10-12 pasos. Esto es lo que usan Tailwind CSS (con sus escala de grises, azules, etc.) y la mayoría de sistemas de diseño modernos.</p>
<p>El <a href="/tools/color-palette">Generador de Paletas de GaloDev</a> crea paletas armónicas a partir de cualquier color base, con contraste WCAG y exportación en CSS, Tailwind y múltiples formatos.</p>

<h2 id="contrasenas">Generador de <span class="italic">contraseñas.</span></h2>
<p>Las contraseñas débiles siguen siendo la causa número uno de brechas de seguridad en aplicaciones web. Y la ironía es que generar contraseñas fuertes es trivial con la herramienta correcta. Un buen generador de contraseñas debe permitir controlar la longitud, incluir o excluir cada tipo de carácter (mayúsculas, minúsculas, números, símbolos), y generar múltiples contraseñas a la vez.</p>
<p>Para casos de uso de desarrollo específicos: generar secrets para JWT, claves de API, o tokens de sesión. Para estos casos, quieres contraseñas puramente aleatorias de al menos 32 caracteres con todos los tipos de caracteres. Algunos generadores también muestran la entropía de la contraseña (en bits), que es la métrica real de cuán difícil es adivinarla por fuerza bruta.</p>
<p>Una función infravalorada: el modo passphrase. En lugar de <code>Ks#9mP2@qL</code>, genera <code>correcto-caballo-batería-grapa</code> — más fácil de recordar, igual de segura o más, y más difícil de adivinar para ataques de diccionario. Para contraseñas que tienes que escribir manualmente, las passphrases son superiores.</p>
<p>Prueba el <a href="/tools/password-generator">Generador de Contraseñas de GaloDev</a> — contraseñas criptográficamente seguras con control total de parámetros, directamente en tu navegador sin enviar datos a ningún servidor.</p>

<h2 id="video">Herramientas de <span class="italic">video.</span></h2>
<p>Las herramientas de procesamiento de video online han sido históricamente un desastre: lentas porque procesan en el servidor, con límites de tamaño, que requieren registro, y que cobran por exportar en calidad decente. La alternativa era instalar software de escritorio pesado (Adobe Premiere, DaVinci Resolve) para tareas simples que no lo justifican.</p>
<p>La revolución aquí viene de FFmpeg.wasm: la versión WebAssembly de FFmpeg, el motor de procesamiento de video más potente del mundo, corriendo directamente en tu navegador. Esto cambia todo: el procesamiento es local (tus videos nunca se suben a ningún servidor), es gratuito sin límites, y funciona con videos de cualquier tamaño que tu RAM pueda manejar.</p>
<p>Las tres herramientas de video más útiles para desarrolladores y creadores de contenido:</p>
<ul>
  <li><strong>Video Compressor</strong>: reduce el tamaño de un video manteniendo la calidad visual aceptable. Imprescindible para videos que van a ser embebidos en webs o enviados por email. El <a href="/tools/video-compressor">Compresor de Video de GaloDev</a> procesa todo en tu navegador.</li>
  <li><strong>Video Trimmer</strong>: corta el inicio o el final de un video sin recodificación cuando es posible. Para extraer un clip específico de un video largo en segundos.</li>
  <li><strong>GIF Maker</strong>: convierte un fragmento de video a GIF animado. Los GIFs son el formato estándar para demos de software, reacciones en Slack, y previsualizaciones en READMEs de GitHub.</li>
</ul>
<p>Prueba las <a href="/tools/video-compressor">herramientas de video de GaloDev</a> — procesamiento local con FFmpeg.wasm, sin subir tus archivos a ningún servidor externo.</p>

<h2 id="descargadores">Descargadores <span class="italic">sociales.</span></h2>
<p>Las plataformas de redes sociales no facilitan la descarga de contenido aunque sea tuyo propio. Quieres guardar un Reel de Instagram que publicaste, descargar un TikTok sin marca de agua para reutilizarlo en otra plataforma, o salvar contenido que te inspiró antes de que desaparezca. Los descargadores online resuelven esto, aunque la calidad varía enormemente.</p>
<p>Un buen descargador social debe detectar automáticamente la plataforma a partir de la URL, ofrecer múltiples opciones de calidad (HD, SD, solo audio), y funcionar de forma confiable. Los que fallan en el 30% de los casos por temas de APIs o limitaciones de plataforma simplemente no son útiles.</p>
<p>GaloDev ofrece descargadores para <a href="/tools/instagram-reels">Instagram Reels</a> y <a href="/tools/tiktok-downloader">TikTok</a> que devuelven opciones de descarga en video y audio directamente. Pega la URL, obtén el video. Sin registro, sin extensiones, sin esperas.</p>

<h2 id="flujo">Flujo de trabajo <span class="italic">óptimo.</span></h2>
<p>El valor real de las herramientas no es cada una individualmente, sino cómo se integran en tu flujo de trabajo. Algunos patrones que funcionan bien:</p>
<ul>
  <li><strong>API debugging</strong>: recibe respuesta JSON → formatea con JSON Formatter → valida estructura → copia el payload limpio para documentación.</li>
  <li><strong>Auth debugging</strong>: obtén un JWT de tu API → decodifica el payload con Base64 Decoder → verifica claims, roles y expiración → detecta el problema sin necesidad de herramientas externas.</li>
  <li><strong>Assets para web</strong>: tienes un video de pantalla grabada → comprimes con Video Compressor → recortas con Video Trimmer → conviertes la parte más relevante a GIF para el README.</li>
  <li><strong>Setup de proyecto</strong>: generás el JWT_SECRET con el Generador de Contraseñas (32+ chars, todos los tipos) → codificas en Base64 si el servicio lo requiere → añades al .env.</li>
</ul>
<p>Tener estas herramientas en un solo lugar, con una interfaz consistente, reduce el coste cognitivo de cambiar de contexto. En vez de buscar en Google cada vez, tienes una URL que ya conoces y en la que confías.</p>
<p>Todas las herramientas de este artículo están disponibles en <a href="/tools">galodev.com/tools</a>, sin registro, sin límites, sin anuncios intrusivos.</p>

<h2 id="faqs">Preguntas <span class="italic">frecuentes.</span></h2>
<h3>¿Son seguras las herramientas online para datos sensibles?</h3>
<p>Depende de la herramienta y del tipo de datos. Las herramientas que procesan todo en el cliente (JavaScript en tu navegador) nunca envían tus datos a ningún servidor — son tan seguras como tu propia máquina. Las herramientas de GaloDev como el JSON Formatter, Base64 Encoder y el Generador de Contraseñas procesan todo localmente. Para datos altamente confidenciales (tokens de producción, datos de clientes), siempre preferible usar herramientas locales o verificar que el procesamiento es client-side antes de usar cualquier servicio online.</p>
<h3>¿Por qué hay tantas herramientas online de mala calidad?</h3>
<p>La mayoría de herramientas online están construidas para monetizar con anuncios o freemium, no para ser útiles. El incentivo es maximizar tiempo en la página y pageviews, no minimizar la fricción del usuario. Esto crea herramientas deliberadamente incompletas, con flujos de registro innecesarios y límites artificiales. Las herramientas bien diseñadas como las de GaloDev parten del principio opuesto: hacer exactamente lo necesario, rápido y sin fricción.</p>
<h3>¿Puedo usar estas herramientas en mobile?</h3>
<p>Sí, las herramientas de GaloDev están diseñadas con layouts responsivos que funcionan en móvil. Algunas tareas (como formatear JSON largo o comprimir video) son más cómodas en desktop por el tamaño de pantalla, pero todas son funcionales en cualquier dispositivo moderno. No hay apps nativas que instalar: funcionan directamente en el navegador.</p>
<h3>¿Con qué frecuencia se actualizan estas herramientas?</h3>
<p>Las herramientas de GaloDev se mantienen activamente. Cuando una API externa cambia (como sucede con los descargadores sociales que dependen de APIs de terceros), se actualiza en cuanto es posible. Las herramientas que procesan localmente (JSON, Base64, generador de contraseñas, video con FFmpeg.wasm) son más estables porque no dependen de servicios externos.</p>
    `,
    prev: { slug: 'api-rest-nodejs', title: 'Cómo crear una API REST con Node.js y Express', category: 'Tutorial', readTime: '11 min' },
    next: { slug: 'formatear-validar-json-online', title: 'Cómo formatear y validar JSON online', category: 'Tutorial', readTime: '7 min' },
  },

  {
    slug: 'formatear-validar-json-online',
    title: 'Cómo formatear y validar JSON online: guía práctica — GaloDev',
    headline: 'Cómo formatear y validar JSON: la guía práctica para devs.',
    lede: 'Qué es JSON, errores más comunes, cómo formatearlo en un clic y cómo validarlo sin instalar nada. Con la herramienta online de GaloDev que lo hace todo en tiempo real.',
    category: 'Tutorial',
    readTime: '7 min',
    date: 'May 18, 2025',
    dateISO: '2025-05-18',
    issue: '08',
    coverClass: 'cover-4',
    coverOrn: 'json',
    excerpt: 'Qué es JSON, los errores más comunes y cómo formatearlo y validarlo en segundos sin instalar nada. Guía práctica con herramienta online.',
    toc: [
      { id: 'intro', label: '¿Qué es JSON?' },
      { id: 'sintaxis', label: 'Sintaxis y reglas básicas' },
      { id: 'errores', label: 'Errores más comunes' },
      { id: 'formatear', label: 'Cómo formatear JSON' },
      { id: 'validar', label: 'Cómo validar JSON' },
      { id: 'herramienta', label: 'La herramienta de GaloDev' },
      { id: 'faqs', label: 'Preguntas frecuentes' },
    ],
    content: `
<h2 id="intro">¿Qué es <span class="italic">JSON</span>?</h2>
<p>JSON (JavaScript Object Notation) es el formato de intercambio de datos más utilizado en el desarrollo web moderno. Nació como una forma de serializar objetos JavaScript, pero hoy es el estándar universal para comunicación entre APIs REST, archivos de configuración, almacenamiento de datos en bases de datos NoSQL, y prácticamente cualquier sistema que necesite intercambiar datos estructurados entre componentes.</p>
<p>Su popularidad se debe a tres razones: es legible por humanos (a diferencia de formatos binarios como Protocol Buffers), es fácil de parsear por máquinas (a diferencia de XML, que requiere parsers más complejos), y tiene soporte nativo en JavaScript con <code>JSON.parse()</code> y <code>JSON.stringify()</code>. Cada lenguaje de programación moderno tiene librerías para JSON, lo que lo hace el formato de hecho para APIs que necesitan ser consumidas por clientes en múltiples lenguajes.</p>

<div class="numbers-callout">
  <div><div class="n-label">APIs que usan JSON</div><div class="n-num">97<span class="italic">%</span></div></div>
  <div><div class="n-label">vs XML (antiguo)</div><div class="n-num">3<span class="italic">%</span></div></div>
  <div><div class="n-label">Tamaño vs XML</div><div class="n-num">30<span class="italic">% menos</span></div></div>
</div>

<h2 id="sintaxis">Sintaxis y <span class="italic">reglas básicas.</span></h2>
<p>JSON tiene una sintaxis estricta con muy pocas reglas, pero cada una debe cumplirse exactamente o el documento es inválido. Los tipos de datos válidos en JSON son: string (siempre entre comillas dobles), número (entero o decimal), booleano (<code>true</code> o <code>false</code>, en minúsculas), null, array (lista ordenada entre corchetes), y objeto (colección de pares clave-valor entre llaves).</p>
<p>Las reglas más importantes que debes recordar:</p>
<ul>
  <li><strong>Las claves siempre van entre comillas dobles</strong>. No simples, no sin comillas. <code>{"nombre": "Juan"}</code> es válido; <code>{nombre: "Juan"}</code> no lo es.</li>
  <li><strong>Los strings siempre entre comillas dobles</strong>. Las comillas simples no son válidas en JSON aunque sí lo sean en JavaScript.</li>
  <li><strong>No se permiten comas finales</strong>. <code>{"a": 1, "b": 2,}</code> con la coma después del 2 es JSON inválido.</li>
  <li><strong>No hay comentarios</strong>. JSON no soporta <code>//</code> ni <code>/* */</code>. Si necesitas documentación en un JSON de configuración, usa una clave especial como <code>"_comment"</code>.</li>
  <li><strong>Los números no van entre comillas</strong>. <code>{"edad": 25}</code> es correcto; <code>{"edad": "25"}</code> convierte el número en string.</li>
</ul>

<h2 id="errores">Errores más <span class="italic">comunes.</span></h2>
<p>La mayoría de errores de JSON provienen de unos pocos patrones que se repiten constantemente. Reconocerlos te ahorrará mucho tiempo de debugging:</p>
<ul>
  <li><strong>Coma final (trailing comma)</strong>: el error más frecuente. Viene de copiar código JavaScript donde las comas finales sí son válidas (ES2017+). En JSON, siempre inválido.</li>
  <li><strong>Comillas simples</strong>: los desarrolladores que vienen de Python o de escribir objetos JavaScript literales tienden a usar comillas simples. JSON solo acepta comillas dobles.</li>
  <li><strong>Valores undefined</strong>: JavaScript tiene el tipo <code>undefined</code>, pero JSON no. Si serializas un objeto con propiedades <code>undefined</code>, <code>JSON.stringify()</code> las omite silenciosamente, lo que puede causar bugs difíciles de detectar.</li>
  <li><strong>Strings con caracteres especiales sin escapar</strong>: las comillas dobles dentro de un string deben escaparse como <code>\"</code>. Los saltos de línea como <code>\\n</code>. Las barras invertidas como <code>\\\\</code>.</li>
  <li><strong>Números muy grandes</strong>: JavaScript usa IEEE 754 de 64 bits para números, lo que significa que enteros mayores de 2^53 pierden precisión. Para IDs muy grandes (como los de Twitter/X), usa strings en lugar de números.</li>
</ul>

<div class="pullquote">
  El 80% de los errores de JSON son <span class="italic">una coma de más</span> o comillas del tipo equivocado.
</div>

<h2 id="formatear">Cómo formatear <span class="italic">JSON.</span></h2>
<p>Un JSON "minificado" (sin espacios ni saltos de línea) es ideal para transmisión de datos porque ocupa menos bytes, pero es completamente ilegible para un humano. Cuando recibes una respuesta de API o necesitas revisar un archivo de configuración, formatear el JSON con indentación correcta es el primer paso.</p>
<p>En JavaScript puedes formatear JSON con <code>JSON.stringify(obj, null, 2)</code> — el tercer argumento especifica la indentación en espacios. Pero para JSON que ya tienes como string (de un archivo, de una respuesta HTTP), necesitas primero parsearlo y luego re-serializarlo: <code>JSON.stringify(JSON.parse(jsonString), null, 2)</code>.</p>
<p>En la terminal, <code>jq</code> es la herramienta de facto para trabajar con JSON: <code>cat data.json | jq .</code> formatea el archivo con colores y sintaxis resaltada. También permite filtrar y transformar JSON con su propio lenguaje de consultas.</p>
<p>Para el día a día sin salir del navegador, una herramienta online es la opción más rápida. Pega, formatea, copia. Sin instalar nada.</p>

<h2 id="validar">Cómo validar <span class="italic">JSON.</span></h2>
<p>Validar JSON tiene dos niveles. El primero es la validación sintáctica: ¿es el JSON bien formado según la especificación? Un JSON sintácticamente inválido no puede ser parseado. La validación sintáctica detecta comas extra, comillas faltantes, llaves sin cerrar.</p>
<p>El segundo nivel es la validación de schema: ¿tiene el JSON la estructura que esperamos? ¿Están presentes todos los campos requeridos? ¿Los tipos de dato son correctos? Para esto existe JSON Schema, un estándar que define la estructura esperada de un documento JSON. Con JSON Schema puedes especificar que un campo es requerido, que debe ser de tipo string, que debe tener un mínimo de longitud, que debe coincidir con un patrón regex.</p>
<p>Para debugging en desarrollo, la validación sintáctica es suficiente en el 90% de casos. Cuando recibes un error de "invalid JSON" en tu aplicación, lo que necesitas es formatear y ver dónde está el error de sintaxis. Para APIs en producción, la validación de schema es importante para garantizar que los datos que entran tienen la forma correcta antes de procesarlos.</p>

<h2 id="herramienta">La herramienta de <span class="italic">GaloDev.</span></h2>
<p>El <a href="/tools/json-formatter">JSON Formatter de GaloDev</a> hace tres cosas en tiempo real mientras escribes o pegas tu JSON:</p>
<ol>
  <li><strong>Formatea</strong>: añade indentación, saltos de línea y espaciado correcto para hacer el JSON legible al instante.</li>
  <li><strong>Valida</strong>: detecta errores de sintaxis y los marca con el mensaje de error y la posición exacta donde está el problema.</li>
  <li><strong>Minimiza</strong>: comprime el JSON eliminando todo el whitespace innecesario, ideal para copiar el payload final para una request de API o para reducir el tamaño de un archivo de datos.</li>
</ol>
<p>Todo el procesamiento ocurre en tu navegador con JavaScript nativo. Tu JSON nunca se envía a ningún servidor. Funciona offline. No hay límite de tamaño más allá de la memoria de tu pestaña. Y no necesitas registro.</p>

<h2 id="faqs">Preguntas <span class="italic">frecuentes.</span></h2>
<h3>¿Cuál es la diferencia entre JSON y JavaScript object literals?</h3>
<p>Los object literals de JavaScript son más flexibles: las claves pueden ir sin comillas (<code>{nombre: "Juan"}</code>), se permiten comillas simples, se aceptan comas finales, y pueden contener funciones y valores <code>undefined</code>. JSON es un subconjunto más estricto: claves siempre entre comillas dobles, solo comillas dobles para strings, sin comas finales, sin funciones, sin <code>undefined</code>. Todo JSON válido es JavaScript válido, pero no todo object literal de JavaScript es JSON válido.</p>
<h3>¿Por qué JSON no soporta comentarios?</h3>
<p>Douglas Crockford, el creador de JSON, lo explica así: los comentarios en archivos de configuración JSON tienden a usarse para incluir directivas de parseo (instrucciones especiales que algunos parsers interpretan), lo que rompe la interoperabilidad. Para mantener JSON como un formato puramente de datos sin comportamiento, se excluyeron los comentarios deliberadamente. Si necesitas documentación en JSON, la convención es usar una clave <code>"_comment"</code> con el texto descriptivo.</p>
<h3>¿JSON5 o JSONC resuelven las limitaciones?</h3>
<p>JSON5 y JSONC (JSON with Comments) son superconjuntos de JSON que añaden comentarios, comas finales y otras mejoras. Son útiles para archivos de configuración (TypeScript usa <code>tsconfig.json</code> con soporte de comentarios en VS Code). Sin embargo, para APIs y transmisión de datos entre servicios, siempre usa JSON estándar: la interoperabilidad universal es más valiosa que la conveniencia adicional.</p>
<h3>¿Cómo debuggeo JSON de APIs que devuelven errores de parseo?</h3>
<p>El flujo más eficiente: copia el cuerpo de la respuesta HTTP exactamente como viene (en DevTools de Chrome, en la pestaña Network → Response), pégalo en un formatter de JSON, y deja que el validador señale el error. Si la respuesta parece JSON pero el Content-Type es text/html, probablemente el servidor devolvió un error HTML (404, 500) en vez del JSON esperado — revisa el status code primero.</p>
    `,
    prev: { slug: 'herramientas-gratis-desarrolladores-2026', title: 'Las mejores herramientas gratis para desarrolladores en 2026', category: 'Recursos', readTime: '12 min' },
    next: { slug: 'que-es-base64', title: '¿Qué es Base64 y para qué sirve?', category: 'Guía', readTime: '7 min' },
  },

  {
    relatedSlugs: ['formatear-validar-json-online', 'api-rest-nodejs', 'herramientas-gratis-desarrolladores-2026'],
    slug: 'que-es-base64',
    title: '¿Qué es Base64 y para qué sirve? Guía completa — GaloDev',
    headline: '¿Qué es Base64 y para qué sirve? La guía que necesitabas.',
    lede: 'Base64 aparece en JWT, imágenes en CSS, autenticación HTTP y certificados SSL. Qué es, cómo funciona la codificación, cuándo usarla y cuándo no, con herramienta online incluida.',
    category: 'Guía',
    readTime: '7 min',
    date: 'May 20, 2025',
    dateISO: '2025-05-20',
    issue: '09',
    coverClass: 'cover-1',
    coverOrn: 'base64',
    excerpt: 'Base64 aparece en JWT, imágenes en CSS, auth HTTP y certificados SSL. Qué es, cómo funciona y cuándo usarla explicado en una guía directa.',
    toc: [
      { id: 'intro', label: '¿Qué es Base64?' },
      { id: 'como-funciona', label: 'Cómo funciona la codificación' },
      { id: 'usos', label: 'Para qué se usa Base64' },
      { id: 'jwt', label: 'Base64 en JWT' },
      { id: 'cuando-no', label: 'Cuándo NO usar Base64' },
      { id: 'herramienta', label: 'La herramienta de GaloDev' },
      { id: 'faqs', label: 'Preguntas frecuentes' },
    ],
    content: `
<h2 id="intro">¿Qué es <span class="italic">Base64</span>?</h2>
<p>Base64 es un esquema de codificación que convierte datos binarios arbitrarios en una cadena de texto usando solo 64 caracteres ASCII seguros: las letras <code>A-Z</code> y <code>a-z</code> (52 caracteres), los dígitos <code>0-9</code> (10 caracteres), más los símbolos <code>+</code> y <code>/</code>. El carácter <code>=</code> se usa como padding al final cuando los datos no son múltiplo de 3 bytes.</p>
<p>La razón de existir de Base64 es histórica pero sigue siendo relevante: muchos sistemas de transmisión de datos (email original, HTTP, protocolos de red legacy) fueron diseñados para manejar solo texto ASCII, no datos binarios arbitrarios. Base64 permite "empaquetar" cualquier dato binario —una imagen, un archivo ejecutable, datos criptográficos— en un formato de texto que puede transmitirse de forma segura por cualquier sistema que maneje texto.</p>
<p>El coste de esta conveniencia: los datos codificados en Base64 ocupan aproximadamente un <strong>33% más de espacio</strong> que los datos originales. Cada 3 bytes de datos originales producen 4 caracteres Base64. Es un intercambio deliberado: compatibilidad universal a cambio de tamaño.</p>

<div class="numbers-callout">
  <div><div class="n-label">Tamaño extra</div><div class="n-num">33<span class="italic">%</span></div></div>
  <div><div class="n-label">Caracteres del alfabeto</div><div class="n-num">64<span class="italic">chars</span></div></div>
  <div><div class="n-label">Bytes por símbolo</div><div class="n-num">6<span class="italic">bits</span></div></div>
</div>

<h2 id="como-funciona">Cómo funciona la <span class="italic">codificación.</span></h2>
<p>El proceso de codificación Base64 opera en grupos de 3 bytes (24 bits) a la vez. Esos 24 bits se dividen en cuatro grupos de 6 bits cada uno. Cada grupo de 6 bits puede representar un número del 0 al 63, que se mapea a uno de los 64 caracteres del alfabeto Base64.</p>
<p>Por ejemplo, la cadena "Hola" se codifica así: los bytes ASCII de "H", "o", "l" son 72, 111, 108 en decimal, o 01001000 01101111 01101100 en binario (24 bits). Esos 24 bits se dividen en cuatro grupos de 6: 010010, 000110, 111101, 101100, que corresponden a los índices 18, 6, 61, 44, que se mapean a los caracteres S, G, 9, s. Resultado: "SG9s". El resto de la cadena ("a" en nuestro ejemplo) se procesa con padding si no completa un grupo de 3 bytes.</p>
<p>Este proceso es completamente reversible: dado el texto Base64, puedes recuperar exactamente los datos binarios originales sin pérdida de información. Base64 es una codificación, no un cifrado — no es secreto, no protege la información, cualquiera puede decodificarlo.</p>

<div class="pullquote">
  Base64 no es cifrado. Es una <span class="italic">codificación</span>: todo el mundo puede decodificarlo. No confundas compatibilidad con seguridad.
</div>

<h2 id="usos">Para qué se <span class="italic">usa Base64.</span></h2>
<p>Base64 aparece en muchos lugares del desarrollo web moderno, a veces de forma obvia y a veces completamente transparente:</p>
<ul>
  <li><strong>JSON Web Tokens (JWT)</strong>: los tokens JWT están formados por tres partes separadas por puntos. Cada parte es Base64url-encoded (la variante URL-safe de Base64). El header y el payload son JSON codificado en Base64; la firma es un hash criptográfico codificado en Base64.</li>
  <li><strong>Data URIs en HTML/CSS</strong>: puedes embeber imágenes directamente en HTML o CSS codificándolas en Base64: <code>src="data:image/png;base64,iVBORw0KGgo..."</code>. Útil para iconos pequeños o imágenes críticas que quieres evitar que sean requests HTTP separadas.</li>
  <li><strong>Autenticación HTTP Basic</strong>: el header de autenticación básica envía las credenciales como <code>usuario:contraseña</code> codificado en Base64: <code>Authorization: Basic dXN1YXJpbzpjb250cmFzZcOxYQ==</code>.</li>
  <li><strong>Email con adjuntos</strong>: el estándar MIME que permite adjuntos en emails codifica los archivos binarios en Base64 para poder transmitirlos a través de los servidores de email que históricamente solo manejaban texto ASCII.</li>
  <li><strong>Certificados y claves criptográficas</strong>: los archivos PEM (certificados SSL, claves RSA) son datos binarios DER codificados en Base64, delimitados por líneas como <code>-----BEGIN CERTIFICATE-----</code>.</li>
</ul>

<h2 id="jwt">Base64 en <span class="italic">JWT.</span></h2>
<p>Entender que los JWT son Base64 es extremadamente útil para debugging. Un JWT tiene el formato <code>header.payload.signature</code>. El header y el payload son simplemente JSON codificado en Base64url. Esto significa que cualquiera que tenga el token puede leer el contenido del payload sin necesidad de ninguna clave secreta.</p>
<p>Para decodificar el payload de un JWT a mano: toma la segunda parte del token (entre el primer y segundo punto), añade padding con <code>=</code> hasta que la longitud sea múltiplo de 4, y decodifica de Base64. Obtendrás el JSON con los claims: <code>sub</code> (subject, normalmente el ID del usuario), <code>exp</code> (expiración como timestamp Unix), <code>iat</code> (issued at), y cualquier claim personalizado.</p>
<p>Lo que no puedes hacer sin la clave secreta es verificar la firma ni falsificar el token. La seguridad de JWT viene de la firma criptográfica, no de que el payload esté "oculto". Si necesitas que el contenido del JWT sea confidencial, debes usar JWE (JSON Web Encryption), que cifra el payload.</p>
<p>Usa el <a href="/tools/base64">Base64 Decoder de GaloDev</a> para decodificar el payload de tus JWT directamente en el navegador, sin enviar el token a ningún servidor externo.</p>

<h2 id="cuando-no">Cuándo <span class="italic">NO usar Base64.</span></h2>
<p>Base64 tiene usos legítimos bien definidos, pero también aparece en patrones incorrectos que debes evitar:</p>
<ul>
  <li><strong>No uses Base64 como "cifrado"</strong>: codificar datos en Base64 no los protege. Si alguien intercepta un string Base64, lo puede decodificar inmediatamente. Para datos sensibles, usa cifrado real (AES, RSA) no codificación.</li>
  <li><strong>No transmitas contraseñas en Base64</strong>: HTTP Basic Auth envía credenciales en Base64, lo que las hace completamente visibles para cualquiera que intercepte el tráfico HTTP. Solo usa HTTP Basic Auth sobre HTTPS, nunca sobre HTTP plano.</li>
  <li><strong>No embebas imágenes grandes en Base64</strong>: las data URIs en Base64 no se cachean por el navegador de la misma forma que los archivos externos. Para imágenes pequeñas (iconos de menos de 1KB), puede ser conveniente. Para imágenes grandes, siempre mejor un archivo externo que el navegador puede cachear.</li>
  <li><strong>No uses Base64 en URLs sin variante URL-safe</strong>: el Base64 estándar usa los caracteres <code>+</code> y <code>/</code>, que tienen significado especial en URLs. Si pones Base64 en una URL, usa la variante Base64url que reemplaza <code>+</code> por <code>-</code> y <code>/</code> por <code>_</code>.</li>
</ul>

<h2 id="herramienta">La herramienta de <span class="italic">GaloDev.</span></h2>
<p>El <a href="/tools/base64">Base64 Encoder/Decoder de GaloDev</a> cubre los casos de uso más comunes del día a día de un desarrollador:</p>
<ul>
  <li><strong>Codificar texto a Base64</strong>: con soporte completo de UTF-8. Los caracteres españoles (acentos, ñ, ü) se manejan correctamente usando la codificación UTF-8 antes de Base64.</li>
  <li><strong>Decodificar Base64 a texto</strong>: especialmente útil para leer el payload de JWTs, decodificar headers de autenticación, o inspeccionar cualquier string Base64 que encuentres en logs o respuestas de APIs.</li>
  <li><strong>Modo URL-safe</strong>: alterna entre Base64 estándar y Base64url para uso seguro en URLs, cookies y tokens web.</li>
</ul>
<p>Todo el procesamiento es local en tu navegador. No se envía ningún dato a servidores externos. Puedes usarlo con confianza para tokens de desarrollo, aunque siempre recomendamos no decodificar tokens de producción en herramientas de terceros.</p>

<h2 id="faqs">Preguntas <span class="italic">frecuentes.</span></h2>
<h3>¿Base64 y Base64url son lo mismo?</h3>
<p>Son variantes. Base64 estándar usa los caracteres <code>+</code>, <code>/</code> y <code>=</code> para padding. Base64url reemplaza <code>+</code> por <code>-</code> y <code>/</code> por <code>_</code>, y omite o hace opcional el padding con <code>=</code>. Esta variante es segura para usar en URLs, headers HTTP y cookies sin necesidad de encoding adicional. Los JWT usan Base64url específicamente por esta razón.</p>
<h3>¿Cómo decodifico Base64 en JavaScript?</h3>
<p>Para strings ASCII simples: <code>atob(base64string)</code> decodifica y <code>btoa(string)</code> codifica. Para UTF-8 correcto (caracteres como ñ, á, etc.), necesitas un paso adicional para manejar la codificación: <code>decodeURIComponent(escape(atob(base64string)))</code> para decodificar y <code>btoa(unescape(encodeURIComponent(string)))</code> para codificar. En Node.js, usa <code>Buffer.from(base64string, 'base64').toString('utf8')</code> para decodificar.</p>
<h3>¿Por qué los JWT tienen tres partes y no dos?</h3>
<p>Un JWT tiene: header (metadatos del token: algoritmo de firma, tipo), payload (los datos: quién es el usuario, cuándo expira, qué permisos tiene), y signature (la verificación criptográfica de que el header y payload no han sido modificados). La firma se calcula con <code>HMAC-SHA256(base64url(header) + "." + base64url(payload), secret)</code>. Sin la firma, cualquiera podría modificar el payload (cambiar su ID de usuario, sus permisos) y el servidor lo aceptaría. La firma hace eso imposible sin conocer el secret.</p>
<h3>¿Puedo usar Base64 para comprimir datos?</h3>
<p>No, Base64 hace lo contrario: aumenta el tamaño un 33%. Para comprimir, usa algoritmos como gzip o brotli. Un patrón que verás en algunos sistemas es comprimir primero (con zlib/gzip) y luego codificar en Base64 para transmisión de texto: el tamaño final puede ser menor que el original si los datos son muy compresibles, aunque sigue siendo mayor que el dato solo comprimido sin Base64.</p>
    `,
    prev: { slug: 'formatear-validar-json-online', title: 'Cómo formatear y validar JSON online', category: 'Tutorial', readTime: '7 min' },
    next: { slug: 'optimizar-videos-sin-perder-calidad', title: 'Cómo optimizar videos sin perder calidad', category: 'Tutorial', readTime: '10 min' },
  },

  {
    relatedSlugs: ['que-es-base64', 'herramientas-gratis-desarrolladores-2026', 'formatear-validar-json-online'],
    slug: 'optimizar-videos-sin-perder-calidad',
    title: 'Cómo optimizar videos sin perder calidad: guía completa 2025 — GaloDev',
    headline: 'Cómo optimizar videos sin perder calidad: compresión, recorte y GIF.',
    lede: 'Videos de 500MB que pesan 50MB sin perder nitidez visible. Codecs, bitrate, resolución, herramientas de recorte y conversión a GIF. Todo lo que necesitas para optimizar video para web, redes sociales y documentación técnica.',
    category: 'Tutorial',
    readTime: '10 min',
    date: 'May 22, 2025',
    dateISO: '2025-05-22',
    issue: '10',
    coverClass: 'cover-2',
    coverOrn: 'video',
    excerpt: 'Videos de 500MB que pesan 50MB sin perder calidad visible. Codecs, bitrate, compresión, recorte y GIF para web y redes sociales.',
    toc: [
      { id: 'intro', label: 'El problema del peso del video' },
      { id: 'codecs', label: 'Codecs y formatos' },
      { id: 'comprimir', label: 'Cómo comprimir sin perder calidad' },
      { id: 'recortar', label: 'Recortar videos' },
      { id: 'gif', label: 'Convertir video a GIF' },
      { id: 'herramientas', label: 'Herramientas de GaloDev' },
      { id: 'faqs', label: 'Preguntas frecuentes' },
    ],
    content: `
<h2 id="intro">El problema del <span class="italic">peso del video.</span></h2>
<p>Una grabación de pantalla de 5 minutos en MacOS puede pesar fácilmente 500MB en el formato nativo de QuickTime (.mov). Subir ese archivo a Notion, enviarlo por Slack, o embebido en un README de GitHub es impracticable. Los sitios web con videos sin optimizar cargan lentos, consumen el ancho de banda del servidor, y destruyen la experiencia en móvil. El video sin optimizar es uno de los problemas de rendimiento web más comunes y más fáciles de resolver.</p>
<p>La buena noticia es que la mayoría del peso de un video no es "calidad visual" — es ineficiencia en la codificación. Un video grabado con el codec H.264 de alta calidad puede recodificarse con ajustes diferentes y quedar un 60-80% más pequeño con diferencias de calidad que son imperceptibles para el ojo humano en uso normal. No estamos hablando de sacrificar calidad; estamos hablando de eliminar datos redundantes que el ojo no procesa.</p>
<p>El otro escenario frecuente: tienes una reunión grabada de 2 horas y solo necesitas compartir los 3 minutos relevantes. O tienes un video tutorial y quieres crear un GIF animado del fragmento más importante para el README de tu proyecto. Estas tareas no deberían requerir instalar software pesado ni usar servicios que cobran por exportar.</p>

<div class="numbers-callout">
  <div><div class="n-label">Reducción típica</div><div class="n-num">70<span class="italic">%</span></div></div>
  <div><div class="n-label">H.265 vs H.264</div><div class="n-num">50<span class="italic">% mejor</span></div></div>
  <div><div class="n-label">Velocidad FFmpeg.wasm</div><div class="n-num">100<span class="italic">% local</span></div></div>
</div>

<h2 id="codecs">Codecs y <span class="italic">formatos.</span></h2>
<p>Un codec (coder-decoder) es el algoritmo que comprime y descomprime el video. El contenedor (MP4, MOV, WebM) es el "sobre" que empaqueta los streams de video y audio. Entender esta distinción ayuda a tomar mejores decisiones de compresión.</p>
<p>Los codecs más importantes hoy:</p>
<ul>
  <li><strong>H.264 (AVC)</strong>: el estándar universal. Compatible con prácticamente todos los dispositivos y navegadores. Buen equilibrio entre calidad y tamaño. La gran mayoría de videos en web usan H.264 en un contenedor MP4.</li>
  <li><strong>H.265 (HEVC)</strong>: el sucesor de H.264. Ofrece la misma calidad visual con la mitad del tamaño de archivo. El problema es la compatibilidad: requiere soporte de hardware y no todos los navegadores lo soportan nativamente.</li>
  <li><strong>VP9</strong>: el codec open source de Google, comparable a H.265 en eficiencia. Usado en WebM, el formato de video nativo de la web abierta. Mejor soporte en Chrome/Firefox que H.265.</li>
  <li><strong>AV1</strong>: la siguiente generación. 30% más eficiente que VP9, completamente open source y sin royalties. Soporte creciente en navegadores y hardware. El futuro del video web, aunque la codificación es significativamente más lenta.</li>
</ul>
<p>Para uso web general en 2025: H.264 en MP4 es la opción segura para máxima compatibilidad. Si tu audiencia usa navegadores modernos, VP9 en WebM o incluso AV1 pueden darte mejor calidad por el mismo tamaño.</p>

<div class="pullquote">
  La calidad de un video no depende solo de la resolución. El <span class="italic">codec y el bitrate</span> importan igual o más.
</div>

<h2 id="comprimir">Cómo comprimir <span class="italic">sin perder calidad.</span></h2>
<p>El parámetro más importante en la compresión de video es el <strong>CRF (Constant Rate Factor)</strong>. En H.264 con FFmpeg, el CRF va de 0 (sin pérdida, archivo enorme) a 51 (máxima compresión, calidad horrible). El rango útil está entre 18 y 28:</p>
<ul>
  <li><strong>CRF 18-20</strong>: calidad visualmente sin pérdida. Para masters y archivos que vas a reeditar.</li>
  <li><strong>CRF 22-24</strong>: excelente calidad para distribución. La diferencia con 18 es imperceptible para la mayoría de contenido.</li>
  <li><strong>CRF 26-28</strong>: buena calidad para web. Los archivos son significativamente más pequeños. Las diferencias son visibles solo en contenido con mucho movimiento o degradados.</li>
</ul>
<p>Además del CRF, otros ajustes que afectan el tamaño sin impactar la calidad percibida: reducir la resolución si el video original es 4K pero se va a ver en pantallas de 1080p, bajar el framerate de 60fps a 30fps para contenido que no tiene mucho movimiento, y comprimir el audio con AAC a 128kbps en vez de formatos sin pérdida.</p>
<p>El preset de velocidad también importa: FFmpeg ofrece presets de <code>ultrafast</code> a <code>veryslow</code>. Los presets más lentos producen archivos más pequeños con la misma calidad. Para compresión de archivos finales, <code>slow</code> o <code>medium</code> es un buen equilibrio.</p>

<h2 id="recortar">Recortar <span class="italic">videos.</span></h2>
<p>Recortar un video significa extraer un segmento específico del video original, descartando el inicio y/o el final. Hay dos modos de recorte en FFmpeg con diferencias importantes:</p>
<p><strong>Recorte sin recodificación</strong> (<code>-c copy</code>): FFmpeg copia los streams de video y audio sin procesarlos. Es instantáneo incluso para videos de horas, pero el punto de corte exacto puede variar unos segundos porque solo puede cortar en keyframes (I-frames). Perfecto cuando necesitas velocidad y la precisión de segundo no importa.</p>
<p><strong>Recorte con recodificación</strong>: FFmpeg redecodifica y recodifica el video, lo que permite cortes exactos al fotograma. Es más lento (puede tardar minutos para videos largos) pero produce cortes precisos. Necesario para edición precisa o cuando necesitas sincronía exacta de audio y video.</p>
<p>Para la mayoría de casos de uso de desarrollo (extraer un clip de una demo, cortar la intro de una grabación de pantalla), el recorte sin recodificación es más que suficiente y es prácticamente instantáneo.</p>

<h2 id="gif">Convertir video a <span class="italic">GIF.</span></h2>
<p>Los GIFs animados son el formato estándar para demos de software en READMEs de GitHub, documentación técnica, y comunicación asíncrona en Slack y Notion. Un GIF de 5 segundos que muestra exactamente cómo funciona una feature vale más que 500 palabras de documentación.</p>
<p>La limitación de los GIFs: solo soportan 256 colores por frame (paleta de 8 bits). Los videos modernos tienen millones de colores. La clave para hacer GIFs con buena calidad es la dithering y la generación inteligente de paleta de colores. FFmpeg puede generar primero la paleta óptima para el fragmento específico del video y luego usarla para la conversión — el resultado es significativamente mejor que la conversión directa.</p>
<p>Para GIFs de grabaciones de pantalla (código, interfaces, demos), la limitación de 256 colores prácticamente no importa porque el contenido de pantalla suele tener pocos colores. El resultado visual es excelente. Para GIFs de video natural (personas, fotografía), la degradación de color es más visible.</p>
<p>El tamaño de los GIFs puede ser considerable. Para reducirlo sin perder calidad: limita el framerate a 10-15fps (los GIFs a 24fps son innecesariamente grandes para la mayoría de demos), reduce la resolución al mínimo necesario, y limita la duración a lo esencial — los mejores GIFs de documentación duran 3-8 segundos.</p>

<h2 id="herramientas">Herramientas de <span class="italic">GaloDev.</span></h2>
<p>GaloDev ofrece tres herramientas de video que usan FFmpeg.wasm — la versión de FFmpeg compilada a WebAssembly que corre directamente en tu navegador. Esto significa que el procesamiento es completamente local: tu video nunca sale de tu computadora, no hay límites de tamaño más allá de tu RAM, y funciona offline.</p>
<ul>
  <li><strong><a href="/tools/video-compressor">Video Compressor</a></strong>: comprime video con control de calidad (CRF) y selección de preset. Ideal para reducir el tamaño de grabaciones de pantalla, videos de producto o cualquier archivo que necesites compartir.</li>
  <li><strong><a href="/tools/video-trimmer">Video Trimmer</a></strong>: recorta el inicio y fin de un video especificando timestamps. Usa modo de copia rápida para archivos largos o recodificación precisa cuando necesitas cortes exactos.</li>
  <li><strong><a href="/tools/gif-maker">GIF Maker</a></strong>: convierte un fragmento de video a GIF animado con control de resolución y framerate. Generación inteligente de paleta para máxima calidad visual.</li>
</ul>
<p>Las tres herramientas procesan todo en tu navegador. No hay servidor. No hay upload. Simplemente seleccionas el archivo, configuras los parámetros, y descargas el resultado.</p>

<h2 id="faqs">Preguntas <span class="italic">frecuentes.</span></h2>
<h3>¿Cuánto se puede comprimir un video sin que se note?</h3>
<p>Depende del contenido. Las grabaciones de pantalla con poco movimiento y áreas sólidas de color se comprimen muy bien: una grabación de 200MB puede quedar en 20-30MB sin diferencia visual apreciable. Los videos con mucho movimiento, contenido de acción o escenas naturales complejas se comprimen menos eficientemente. El CRF 23-24 con H.264 es el punto de equilibrio recomendado para la mayoría de contenido de pantalla.</p>
<h3>¿Por qué usar FFmpeg.wasm en el navegador en vez de FFmpeg instalado?</h3>
<p>Para usuarios no técnicos o para flujos de trabajo esporádicos, no instalar FFmpeg es una ventaja real. FFmpeg requiere línea de comandos y recordar los parámetros correctos para cada caso. Una herramienta web con interfaz visual elimina esa barrera. Para uso intensivo o automatización, FFmpeg instalado siempre será más rápido (no tiene el overhead de WebAssembly) y más flexible.</p>
<h3>¿Los GIFs o los videos WebP/AVIF son mejor opción hoy?</h3>
<p>Para uso en páginas web, los videos cortos en bucle (MP4 sin audio o WebM) son técnicamente superiores a los GIFs: menor tamaño, más colores, mejor calidad. Puedes usar <code>&lt;video autoplay loop muted playsinline&gt;</code> para replicar el comportamiento de un GIF. Sin embargo, los GIFs siguen siendo el estándar práctico para READMEs de GitHub, Slack, Notion y la mayoría de plataformas de documentación que no soportan video embebido directamente.</p>
<h3>¿Qué resolución debería usar para videos en web?</h3>
<p>Para la mayoría de contenido web: 1080p (1920×1080) es el máximo que tiene sentido en 2025. La mayoría de usuarios no tiene pantallas 4K, y los videos 4K son 4 veces más grandes sin beneficio visible para la mayoría. Para grabaciones de pantalla que se muestran en el contexto de documentación o demos: 720p o incluso 540p suele ser suficiente si el contenido original no tiene texto muy pequeño.</p>
    `,
    prev: { slug: 'que-es-base64', title: '¿Qué es Base64 y para qué sirve?', category: 'Guía', readTime: '7 min' },
    next: { slug: 'que-es-docker', title: '¿Qué es Docker? Guía para principiantes', category: 'Guía', readTime: '11 min' },
  },

  {
    relatedSlugs: ['api-rest-nodejs', 'desplegar-con-vercel', 'herramientas-gratis-desarrolladores-2026'],
    slug: 'que-es-docker',
    title: '¿Qué es Docker? Guía completa para principiantes 2025 — GaloDev',
    headline: '¿Qué es Docker? La guía que lo explica de verdad.',
    lede: 'Contenedores, imágenes, Dockerfile, Docker Compose, redes y volúmenes. Todo lo que necesitas para entender Docker desde cero y usarlo en desarrollo y producción.',
    category: 'Guía',
    readTime: '11 min',
    date: 'May 24, 2025',
    dateISO: '2025-05-24',
    issue: '11',
    coverClass: 'cover-3',
    coverOrn: 'docker',
    excerpt: 'Contenedores, imágenes, Dockerfile y Docker Compose explicados desde cero. La guía que necesitas para entender Docker y usarlo en producción.',
    toc: [
      { id: 'intro', label: '¿Qué es Docker?' },
      { id: 'conceptos', label: 'Conceptos clave' },
      { id: 'instalacion', label: 'Instalación y primer comando' },
      { id: 'dockerfile', label: 'Escribir un Dockerfile' },
      { id: 'compose', label: 'Docker Compose' },
      { id: 'redes', label: 'Redes y volúmenes' },
      { id: 'produccion', label: 'Docker en producción' },
      { id: 'faqs', label: 'Preguntas frecuentes' },
    ],
    content: `
<h2 id="intro">¿Qué es <span class="italic">Docker</span>?</h2>
<p>Docker es una plataforma de contenedores que permite empaquetar una aplicación junto con todas sus dependencias en una unidad portable y reproducible llamada contenedor. Un contenedor incluye el código de la aplicación, el runtime, las librerías del sistema, las variables de configuración — todo lo que la aplicación necesita para ejecutarse — en un paquete que funciona igual en cualquier máquina que tenga Docker instalado.</p>
<p>El problema que resuelve Docker es tan antiguo como el desarrollo de software: "en mi máquina funciona". Cada desarrollador tenía versiones diferentes de Node.js, Python, PostgreSQL, dependencias del sistema. El código que funcionaba en el portátil del desarrollador fallaba en el servidor de producción porque el entorno era diferente. Docker elimina este problema: si el contenedor funciona en tu laptop, funciona en el servidor de tu colega, en CI/CD, y en producción exactamente igual.</p>
<p>Docker no es virtualización completa. Las máquinas virtuales emulan hardware completo y tienen un sistema operativo completo por cada VM. Los contenedores comparten el kernel del sistema operativo host y solo virtualizan el espacio de usuario. El resultado: los contenedores son <strong>mucho más ligeros y rápidos</strong> que las VMs — arrancan en segundos, no minutos, y usan una fracción de los recursos.</p>

<div class="numbers-callout">
  <div><div class="n-label">Imágenes en Docker Hub</div><div class="n-num">14<span class="italic">M+</span></div></div>
  <div><div class="n-label">Arrancado de contenedor</div><div class="n-num">&lt;1<span class="italic">s</span></div></div>
  <div><div class="n-label">Overhead vs VM</div><div class="n-num">10<span class="italic">x menos</span></div></div>
</div>

<h2 id="conceptos">Conceptos <span class="italic">clave.</span></h2>
<p>Para usar Docker efectivamente, necesitas entender cuatro conceptos fundamentales que se relacionan entre sí:</p>
<ul>
  <li><strong>Imagen</strong>: una plantilla de solo lectura que define el contenido del contenedor. Es como una "foto" del sistema de archivos con todos los archivos de la aplicación, dependencias y configuración. Las imágenes se construyen a partir de un Dockerfile y se almacenan en registros como Docker Hub o GitHub Container Registry.</li>
  <li><strong>Contenedor</strong>: una instancia en ejecución de una imagen. De la misma imagen puedes crear docenas de contenedores, todos idénticos, corriendo simultáneamente. Los contenedores tienen su propio sistema de archivos, red y espacio de procesos aislado del host.</li>
  <li><strong>Dockerfile</strong>: el archivo de texto que describe cómo construir una imagen. Define el punto de partida (imagen base), los comandos para instalar dependencias, copiar código, y qué comando ejecutar al arrancar el contenedor.</li>
  <li><strong>Registry</strong>: un repositorio de imágenes. Docker Hub es el registro público oficial con miles de imágenes oficiales (nginx, postgres, node, redis, etc.). Puedes tener registros privados en AWS ECR, Google Artifact Registry, o self-hosted.</li>
</ul>

<div class="pullquote">
  "En mi máquina funciona" deja de ser un problema cuando <span class="italic">tu máquina es el contenedor.</span>
</div>

<h2 id="instalacion">Instalación y <span class="italic">primer comando.</span></h2>
<p>Para instalar Docker en tu máquina: descarga Docker Desktop desde docker.com, instálalo y ábrelo. Docker Desktop incluye el Docker Engine, Docker CLI, Docker Compose, y una interfaz gráfica para gestionar contenedores e imágenes. En Linux, puedes instalar solo Docker Engine sin la interfaz gráfica si prefieres.</p>
<p>Una vez instalado, verifica la instalación con <code>docker --version</code>. Tu primer comando real: <code>docker run hello-world</code>. Docker descargará la imagen <code>hello-world</code> de Docker Hub (si no la tienes localmente), creará un contenedor, lo ejecutará (que imprime un mensaje de confirmación) y lo detendrá. En ese solo comando ocurrió pull + create + start + log + stop.</p>
<p>Comandos esenciales del día a día:</p>
<ul>
  <li><code>docker pull nginx</code> — descarga la imagen oficial de nginx</li>
  <li><code>docker run -p 8080:80 nginx</code> — corre nginx mapeando el puerto 8080 de tu máquina al 80 del contenedor</li>
  <li><code>docker ps</code> — lista los contenedores en ejecución</li>
  <li><code>docker ps -a</code> — lista todos los contenedores, incluyendo los detenidos</li>
  <li><code>docker stop &lt;id&gt;</code> — detiene un contenedor</li>
  <li><code>docker rm &lt;id&gt;</code> — elimina un contenedor detenido</li>
  <li><code>docker images</code> — lista las imágenes descargadas localmente</li>
  <li><code>docker rmi &lt;imagen&gt;</code> — elimina una imagen local</li>
</ul>

<h2 id="dockerfile">Escribir un <span class="italic">Dockerfile.</span></h2>
<p>El Dockerfile define cómo construir la imagen de tu aplicación. Cada instrucción crea una capa en la imagen, y Docker cachea estas capas para acelerar las builds subsiguientes. Las instrucciones más usadas:</p>
<ul>
  <li><code>FROM</code>: define la imagen base. Siempre es la primera instrucción. <code>FROM node:20-alpine</code> usa Node.js 20 sobre Alpine Linux (imagen mínima de ~5MB).</li>
  <li><code>WORKDIR</code>: establece el directorio de trabajo dentro del contenedor. <code>WORKDIR /app</code></li>
  <li><code>COPY</code>: copia archivos del host al contenedor. <code>COPY package*.json ./</code></li>
  <li><code>RUN</code>: ejecuta un comando durante la build. <code>RUN npm ci --only=production</code></li>
  <li><code>EXPOSE</code>: documenta qué puerto usa el contenedor (no lo abre realmente).</li>
  <li><code>CMD</code>: el comando que se ejecuta cuando arranca el contenedor. <code>CMD ["node", "server.js"]</code></li>
</ul>
<p>El orden de las instrucciones importa para el caching. Copia y ejecuta los pasos que cambian menos frecuentemente primero (instalar dependencias), y los que cambian más frecuentemente después (copiar el código fuente). Así Docker reutiliza las capas cacheadas cuando solo cambia el código, evitando reinstalar todas las dependencias en cada build.</p>
<p>Para producción, usa <strong>multi-stage builds</strong>: una primera etapa para construir la aplicación (con todas las herramientas de build, devDependencies, etc.) y una segunda etapa solo con lo necesario para producción. La imagen final es mucho más pequeña y no incluye herramientas de desarrollo que amplían la superficie de ataque.</p>

<h2 id="compose">Docker <span class="italic">Compose.</span></h2>
<p>Una aplicación real raramente es solo un contenedor. Tienes el servidor de tu aplicación, la base de datos, un cache con Redis, quizá un worker de colas. Docker Compose te permite definir y gestionar múltiples contenedores como una unidad, describiendo todos los servicios, redes y volúmenes en un archivo <code>docker-compose.yml</code>.</p>
<p>Un ejemplo típico para una app Node.js con PostgreSQL y Redis:</p>
<ul>
  <li>Servicio <code>app</code>: tu aplicación Node.js, construida desde tu Dockerfile, con las variables de entorno de conexión a la base de datos.</li>
  <li>Servicio <code>postgres</code>: la imagen oficial de PostgreSQL con volumen para persistir los datos más allá de la vida del contenedor.</li>
  <li>Servicio <code>redis</code>: la imagen oficial de Redis para caché y colas.</li>
</ul>
<p>Con un solo comando <code>docker compose up</code> arrancas toda la stack. Con <code>docker compose down</code> la paras. Con <code>docker compose logs -f app</code> ves los logs de tu aplicación en tiempo real. Con <code>docker compose exec postgres psql -U postgres</code> abres una sesión de psql en tu base de datos sin instalar PostgreSQL en tu máquina host.</p>
<p>Esta es la killer feature de Docker Compose para desarrollo: un nuevo desarrollador que se une al proyecto solo necesita instalar Docker y ejecutar <code>docker compose up</code>. No hay que instalar Node.js de la versión correcta, ni PostgreSQL, ni Redis, ni configurar variables de entorno manualmente. El entorno completo de desarrollo se levanta en un comando.</p>

<h2 id="redes">Redes y <span class="italic">volúmenes.</span></h2>
<p>Docker gestiona redes y almacenamiento con dos abstracciones que necesitas entender para producción correcta:</p>
<p><strong>Redes</strong>: por defecto, los contenedores están aislados. Para que se comuniquen, deben estar en la misma red Docker. Docker Compose crea automáticamente una red compartida para todos los servicios definidos en el mismo archivo, permitiendo que se referencien por nombre de servicio (<code>postgres</code>, <code>redis</code>) en vez de IP. Para producción, usa redes con nombre explícito para controlar qué servicios pueden comunicarse entre sí.</p>
<p><strong>Volúmenes</strong>: los contenedores son efímeros — cuando se eliminan, pierden todos sus datos. Para persistir datos (la base de datos, archivos subidos por usuarios, logs), necesitas volúmenes. Un volumen Docker es un directorio administrado por Docker que vive fuera del sistema de archivos del contenedor y persiste independientemente del ciclo de vida del contenedor. En Docker Compose: <code>volumes: - postgres_data:/var/lib/postgresql/data</code> monta el volumen <code>postgres_data</code> en el directorio de datos de Postgres.</p>

<h2 id="produccion">Docker en <span class="italic">producción.</span></h2>
<p>Para producción, la mayoría de equipos hoy usa Kubernetes para orquestar contenedores a escala, o servicios gestionados que abstraen la orquestación: AWS ECS, Google Cloud Run, o Azure Container Apps. Para aplicaciones más pequeñas, desplegar contenedores en un VPS con Docker Compose funciona perfectamente.</p>
<p>Prácticas críticas para producción: nunca corras contenedores como root (usa <code>USER</code> en el Dockerfile para crear un usuario no privilegiado), usa imágenes base minimales (Alpine, Distroless) para reducir la superficie de ataque, escanea las imágenes con herramientas como Trivy para detectar vulnerabilidades, y usa tags específicos de versión en tus imágenes base (nunca <code>:latest</code> en producción — no es reproducible).</p>
<p>Los health checks son esenciales: añade <code>HEALTHCHECK</code> en tu Dockerfile para que Docker y los orquestadores puedan detectar automáticamente cuándo un contenedor está en un estado inválido y reiniciarlo. Una app que no responde pero cuyo proceso sigue vivo no se detecta sin health checks.</p>

<h2 id="faqs">Preguntas <span class="italic">frecuentes.</span></h2>
<h3>¿Cuál es la diferencia entre Docker y Kubernetes?</h3>
<p>Docker es la tecnología de contenedores: define cómo crear y ejecutar contenedores. Kubernetes es un orquestador: gestiona la ejecución de muchos contenedores a escala, distribuyéndolos entre múltiples máquinas, manejando la tolerancia a fallos, el escalado automático y los rolling updates. Kubernetes usa Docker (u otros runtimes de contenedores) por debajo, pero añade una capa de gestión de alto nivel. Empieza con Docker; usa Kubernetes cuando necesites escalar a decenas o cientos de contenedores.</p>
<h3>¿Docker es necesario si uso serverless?</h3>
<p>No necesariamente. Serverless (Lambda, Cloud Functions, Vercel Edge) maneja el entorno de ejecución por ti — no necesitas configurar contenedores. Sin embargo, muchas plataformas serverless también soportan contenedores (AWS Lambda Container Image, Cloud Run), y Docker sigue siendo útil para desarrollo local porque puedes emular el entorno de producción serverless localmente con herramientas como SAM CLI.</p>
<h3>¿Qué diferencia hay entre ADD y COPY en un Dockerfile?</h3>
<p>Usa siempre <code>COPY</code> a menos que tengas una razón específica para usar <code>ADD</code>. <code>COPY</code> hace exactamente lo que dice: copia archivos del host al contenedor. <code>ADD</code> tiene superpoderes adicionales: puede descomprimir archivos tar automáticamente y puede descargar archivos desde URLs remotas. Estos comportamientos implícitos hacen que las builds sean menos predecibles. La guía oficial de Docker recomienda <code>COPY</code> por defecto.</p>
<h3>¿Cómo reduzco el tamaño de mis imágenes Docker?</h3>
<p>Las estrategias más efectivas: usa imágenes base Alpine (node:20-alpine pesa ~40MB vs node:20 que pesa ~1GB), usa multi-stage builds para no incluir herramientas de build en la imagen final, instala solo dependencias de producción (<code>npm ci --only=production</code>), y usa <code>.dockerignore</code> para excluir node_modules, .git, archivos de tests y cualquier cosa que no necesite estar en la imagen. Una imagen Node.js bien optimizada puede pesar menos de 100MB.</p>
    `,
    prev: { slug: 'optimizar-videos-sin-perder-calidad', title: 'Cómo optimizar videos sin perder calidad', category: 'Tutorial', readTime: '10 min' },
    next: { slug: 'angular-vs-react-vs-nextjs', title: 'Angular vs React vs Next.js: comparativa completa', category: 'Comparativa', readTime: '13 min' },
  },

  {
    slug: 'angular-vs-react-vs-nextjs',
    title: 'Angular vs React vs Next.js: comparativa completa 2025 — GaloDev',
    headline: 'Angular vs React vs Next.js: cuál elegir en 2025 y por qué.',
    lede: 'Rendimiento, ecosistema, curva de aprendizaje, salarios y casos de uso reales. La comparativa honesta entre los tres frameworks frontend más importantes para ayudarte a elegir el que tiene más sentido para tu proyecto y tu carrera.',
    category: 'Comparativa',
    readTime: '13 min',
    date: 'May 26, 2025',
    dateISO: '2025-05-26',
    issue: '12',
    coverClass: 'cover-4',
    coverOrn: 'vs',
    excerpt: 'Rendimiento, ecosistema, curva de aprendizaje y salarios. La comparativa entre Angular, React y Next.js para ayudarte a elegir en 2025.',
    toc: [
      { id: 'intro', label: 'El eterno debate frontend' },
      { id: 'angular', label: 'Angular: el framework completo' },
      { id: 'react', label: 'React: la librería flexible' },
      { id: 'nextjs', label: 'Next.js: React en producción' },
      { id: 'performance', label: 'Rendimiento comparado' },
      { id: 'ecosistema', label: 'Ecosistema y empleo' },
      { id: 'cuando', label: '¿Cuándo usar cada uno?' },
      { id: 'verdict', label: 'Veredicto' },
      { id: 'faqs', label: 'Preguntas frecuentes' },
    ],
    content: `
<h2 id="intro">El eterno debate <span class="italic">frontend.</span></h2>
<p>Pocas decisiones técnicas generan más debate que la elección del framework frontend. Angular vs React vs Next.js es una conversación que ocurre en cada equipo que empieza un nuevo proyecto, en cada entrevista técnica, y en cada hilo de Twitter sobre desarrollo web. El problema es que la mayoría de las opiniones están sesgadas por preferencia personal, experiencia limitada, o el contexto específico del proyecto de quien opina.</p>
<p>Esta comparativa intenta ser diferente. No elegiremos un ganador absoluto porque no existe. Lo que haremos es definir con precisión en qué sobresale cada opción, qué tipo de proyecto y equipo se beneficia más de cada una, y qué factores deberían pesar más en tu decisión. Al final sabrás cuál elegir para tu situación específica.</p>
<p>Una aclaración importante antes de empezar: React y Next.js no son alternativas completamente separadas. Next.js es un <strong>framework construido sobre React</strong>. Comparar los tres juntos tiene sentido porque representan tres puntos en el espectro de opiniones del framework: Angular en el extremo más "batteries included", React puro en el extremo más minimalista y flexible, y Next.js en un punto intermedio que añade estructura a React sin la rigidez de Angular.</p>

<div class="numbers-callout">
  <div><div class="n-label">React descgas/sem</div><div class="n-num">26<span class="italic">M</span></div></div>
  <div><div class="n-label">Next.js descargas/sem</div><div class="n-num">9<span class="italic">M</span></div></div>
  <div><div class="n-label">Angular descargas/sem</div><div class="n-num">4<span class="italic">M</span></div></div>
</div>

<h2 id="angular">Angular: el <span class="italic">framework completo.</span></h2>
<p>Angular es el framework más opinionado de los tres. Creado y mantenido por Google, ofrece una solución completa para el desarrollo frontend: sistema de componentes, routing, gestión de estado con RxJS y Signals, inyección de dependencias, formularios reactivos, testing integrado con Jasmine/Karma, y su propio CLI potente. No necesitas tomar decisiones sobre qué librería de routing usar o cómo gestionar el estado — Angular ya tomó esas decisiones por ti.</p>
<p>Angular usa TypeScript de forma obligatoria desde el principio (no opcional como en React). También usa un sistema de decoradores y metadatos (<code>@Component</code>, <code>@Injectable</code>, <code>@NgModule</code>) que tiene una curva de aprendizaje inicial más pronunciada pero que produce código muy estructurado y fácil de mantener en equipos grandes.</p>
<p>Las ventajas de Angular son más evidentes en proyectos enterprise: aplicaciones grandes con docenas de desarrolladores, estructuras complejas de módulos, necesidad de testing riguroso, y donde la consistencia del código entre equipos es crítica. Google usa Angular internamente en proyectos como Google Cloud Console, lo que garantiza que el framework tenga soporte a largo plazo y esté diseñado para escala real.</p>
<p>El rendimiento de Angular ha mejorado significativamente con Ivy (su nuevo motor de rendering) y especialmente con los Signals en Angular 17+. La nueva sintaxis de control de flujo (<code>@if</code>, <code>@for</code>) reemplaza directivas como <code>*ngIf</code> y <code>*ngFor</code> con algo más parecido a los JSX de React. Angular está modernizándose activamente, aunque cargando con la deuda de compatibilidad de ser el más antiguo de los tres.</p>

<div class="pullquote">
  Angular es el framework que <span class="italic">toma decisiones por ti</span>. Si no quieres tomarlas tú, eso es una ventaja, no una limitación.
</div>

<h2 id="react">React: la <span class="italic">librería flexible.</span></h2>
<p>React es técnicamente una librería, no un framework. Esta distinción es importante: React solo se ocupa de la capa de view (los componentes y cómo se renderizan). Todo lo demás — routing, gestión de estado, formularios, data fetching — son decisiones que tú tomas eligiendo entre múltiples opciones del ecosistema. Esta flexibilidad es a la vez su mayor fortaleza y su mayor fuente de fricción.</p>
<p>La propuesta central de React es el modelo de componentes basado en JSX y el virtual DOM. Los componentes son funciones de JavaScript (o TypeScript) que devuelven elementos JSX. El estado local con useState, efectos secundarios con useEffect, y lógica reutilizable encapsulada en hooks personalizados. Este modelo es extremadamente expresivo y compose muy bien — puedes construir casi cualquier tipo de UI con las mismas primitivas.</p>
<p>Lo que React no incluye y necesitas decidir tú: para routing, React Router o TanStack Router. Para gestión de estado global, Zustand, Redux Toolkit, Jotai o Recoil. Para data fetching, TanStack Query o SWR. Para forms, React Hook Form. Para SSR, Next.js o Remix. Esta libertad de elección es poderosa para desarrolladores experimentados que saben qué necesitan; puede ser paralizante para equipos sin experiencia en el ecosistema.</p>
<p>React puro (sin Next.js) es ideal para SPAs (Single Page Applications) donde el SEO no es crítico: dashboards, aplicaciones internas, paneles de administración, aplicaciones que requieren autenticación. Para aplicaciones públicas donde el SEO importa, React solo sin SSR no es suficiente.</p>

<h2 id="nextjs">Next.js: React <span class="italic">en producción.</span></h2>
<p>Next.js toma React y añade todo lo que necesitas para una aplicación web de producción: routing basado en el sistema de archivos, Server Side Rendering (SSR), Static Site Generation (SSG), Incremental Static Regeneration (ISR), React Server Components, Route Handlers para APIs, optimización automática de imágenes y fuentes, y un sistema de metadata para SEO.</p>
<p>El App Router de Next.js 13+ es el cambio más significativo en la historia del framework. Introduce los React Server Components — componentes que se renderizan en el servidor y solo envían HTML al cliente, sin JavaScript en el bundle del navegador. Esto tiene implicaciones profundas en rendimiento: los componentes que hacen queries a la base de datos o llaman a APIs pueden hacerlo directamente en el servidor, sin exponer esa lógica al cliente, y sin round-trips adicionales.</p>
<p>Para la mayoría de proyectos web públicos en 2025 — blogs, e-commerce, landing pages, aplicaciones SaaS con contenido público — Next.js es la opción más pragmática. Tienes todas las ventajas de React más SSR/SSG para SEO, una plataforma de despliegue optimizada en Vercel, y un ecosistema activo con soporte de la empresa que más invierte en el ecosistema React.</p>

<h2 id="performance">Rendimiento <span class="italic">comparado.</span></h2>
<p>El rendimiento es más matizado que "cual es más rápido". Depende de qué mides y en qué escenario:</p>
<ul>
  <li><strong>Bundle size inicial</strong>: React puro tiene el bundle más pequeño (45KB gzipped). Next.js añade runtime de routing y otros ~20-30KB. Angular tiene el bundle inicial más grande (~100KB para una app mínima), aunque Ivy ha mejorado esto significativamente con tree-shaking agresivo.</li>
  <li><strong>Rendering en servidor (SSR/SSG)</strong>: Next.js está optimizado para esto por diseño. React sin Next.js requiere configuración adicional (Vite SSR, etc.). Angular Universal es la solución de Angular pero requiere configuración significativa y el ecosistema es menos maduro.</li>
  <li><strong>Runtime performance</strong>: los tres son comparables en el 99% de aplicaciones reales. Las diferencias de benchmarks sintéticos no se traducen en diferencias perceptibles para el usuario en aplicaciones bien escritas.</li>
  <li><strong>Tiempo de desarrollo</strong>: Angular tiene el overhead de setup más alto pero la máxima consistencia. React puro requiere ensamblar el stack. Next.js tiene la mejor relación setup/productividad para la mayoría de proyectos.</li>
</ul>

<h2 id="ecosistema">Ecosistema y <span class="italic">empleo.</span></h2>
<p>El ecosistema y el mercado laboral son factores prácticos que merecen consideración honesta. Según el State of JavaScript 2024 y datos de npm:</p>
<ul>
  <li><strong>React/Next.js</strong>: dominan el mercado. React tiene 26M descargas semanales y Next.js 9M. La mayoría de ofertas de empleo frontend requieren React. Los salarios de React developers son altos y la demanda supera la oferta en la mayoría de mercados.</li>
  <li><strong>Angular</strong>: fuerte en entornos enterprise, especialmente en sectores como banca, seguros, gobierno y grandes corporaciones. Los proyectos de Angular tienden a ser más largos, más estables y con equipos más grandes. Los salarios son comparables a React o ligeramente superiores en enterprise, pero hay menos oportunidades totales.</li>
  <li><strong>Next.js específico</strong>: las ofertas que piden Next.js específicamente han crecido enormemente en los últimos dos años. Es el framework preferido para startups y scale-ups que construyen productos web. Vercel ha hecho un trabajo excepcional construyendo el ecosistema.</li>
</ul>
<p>Si estás empezando y quieres maximizar oportunidades laborales, aprender React (y por extensión Next.js) es la decisión con mejor ROI en el mercado actual.</p>

<h2 id="cuando">¿Cuándo usar <span class="italic">cada uno</span>?</h2>
<p>Usa <strong>Angular</strong> cuando:</p>
<ul>
  <li>El equipo es grande (10+ desarrolladores) y la consistencia del código es crítica.</li>
  <li>El proyecto es enterprise con necesidades complejas de formularios, permisos y módulos.</li>
  <li>La organización ya tiene inversión en el ecosistema Angular (formación, librerías internas).</li>
  <li>Necesitas testing riguroso con infraestructura integrada desde el principio.</li>
</ul>
<p>Usa <strong>React puro</strong> cuando:</p>
<ul>
  <li>El proyecto es un dashboard o aplicación interna donde el SEO no importa.</li>
  <li>El equipo tiene preferencia por un stack específico que no encaja con Next.js.</li>
  <li>Estás construyendo una librería de componentes o un sistema de diseño.</li>
</ul>
<p>Usa <strong>Next.js</strong> cuando:</p>
<ul>
  <li>El proyecto es un sitio público donde el SEO y los Core Web Vitals importan.</li>
  <li>Quieres la productividad de React con SSR/SSG sin configuración adicional.</li>
  <li>Estás construyendo una startup o producto SaaS y quieres mover rápido.</li>
  <li>El equipo tiene experiencia con React o está empezando sin preferencia histórica.</li>
</ul>

<h2 id="verdict">Veredicto: <span class="italic">2025 y más allá.</span></h2>
<p>Para el desarrollador individual empezando hoy: <strong>React + Next.js</strong>. La curva de aprendizaje es manejable, la demanda laboral es máxima, el ecosistema es enorme, y Next.js cubre la mayoría de casos de uso desde apps simples hasta plataformas complejas.</p>
<p>Para equipos enterprise construyendo aplicaciones grandes y complejas: <strong>Angular</strong> merece consideración seria. Su estructura opinada es una ventaja real cuando el equipo crece y la consistencia importa más que la flexibilidad.</p>
<p>Para proyectos existentes: <strong>continúa con lo que tienes</strong>. El costo de migrar de Angular a React o viceversa raramente justifica el beneficio, a menos que tengas razones técnicas específicas muy fuertes. La mejor tecnología es la que tu equipo domina.</p>

<h2 id="faqs">Preguntas <span class="italic">frecuentes.</span></h2>
<h3>¿Debería aprender React antes de Next.js?</h3>
<p>Sí, aunque no necesitas ser experto en React antes de empezar con Next.js. Entiende los fundamentos: componentes, props, estado con useState, efectos con useEffect, y el modelo de eventos. Con esa base puedes empezar Next.js y aprender las capas adicionales (SSR, routing, Server Components) en contexto real. Intentar aprender Next.js sin React previo es confuso porque no distingues qué viene de React y qué de Next.js.</p>
<h3>¿Vue.js o Svelte son alternativas viables?</h3>
<p>Absolutamente. Vue.js tiene una comunidad fuerte especialmente en Asia y ofrece una excelente experiencia de desarrollo. Svelte (y SvelteKit) tiene la propuesta técnica más interesante de todos — compila a JavaScript puro sin runtime — y está ganando tracción. Sin embargo, el mercado laboral para Vue y Svelte es significativamente menor que para React en la mayoría de regiones hispanohablantes. Para aprendizaje personal y proyectos propios, son excelentes; para maximizar oportunidades laborales, React/Next.js sigue siendo la apuesta más segura en 2025.</p>
<h3>¿Next.js vs Remix: cuál es mejor?</h3>
<p>Ambos son frameworks de React con SSR. Next.js tiene más adopción, mejor integración con Vercel y React Server Components nativos. Remix tiene un enfoque más centrado en el modelo web (formularios nativos, nested routing, mejor UX en conexiones lentas). Next.js es la opción segura; Remix es excelente para quienes valoran sus principios de diseño específicos. La diferencia en la práctica para la mayoría de proyectos es menor de lo que sugiere el debate online.</p>
<h3>¿Tiene futuro Angular o está perdiendo terreno?</h3>
<p>Angular tiene futuro garantizado por su uso extensivo en empresas grandes y el respaldo de Google. Las versiones recientes (Angular 17+) muestran innovación real: Signals, nueva sintaxis de control de flujo, mejor rendimiento. No está perdiendo terreno en su nicho enterprise; simplemente ese nicho no crece tan rápido como el ecosistema React. Para aplicaciones enterprise grandes, Angular sigue siendo una elección completamente válida y bien soportada.</p>
    `,
    prev: { slug: 'que-es-docker', title: '¿Qué es Docker? Guía para principiantes', category: 'Guía', readTime: '11 min' },
    next: { slug: 'nextjs-en-vercel', title: 'Next.js en Vercel: ISR, Edge Functions y más', category: 'Tutorial', readTime: '9 min' },
  },

  {
    slug: 'nextjs-en-vercel',
    title: 'Next.js en Vercel: ISR, Edge Functions y despliegue avanzado — GaloDev',
    headline: 'Next.js en Vercel: más allá del deploy básico.',
    lede: 'ISR para contenido dinámico con velocidad estática, Edge Functions para lógica global, Middleware para auth y redirects, y estrategias de caché avanzadas. Todo lo que Vercel añade a Next.js en producción.',
    category: 'Tutorial',
    readTime: '9 min',
    date: 'May 28, 2025',
    dateISO: '2025-05-28',
    issue: '13',
    coverClass: 'cover-1',
    coverOrn: 'deploy',
    excerpt: 'ISR, Edge Functions, Middleware y estrategias de caché avanzadas. Todo lo que Vercel añade a Next.js que no ves en la documentación básica.',
    toc: [
      { id: 'intro', label: 'Más allá del deploy básico' },
      { id: 'isr', label: 'Incremental Static Regeneration' },
      { id: 'edge', label: 'Edge Functions' },
      { id: 'middleware', label: 'Middleware en Next.js' },
      { id: 'cache', label: 'Estrategias de caché' },
      { id: 'analytics', label: 'Analytics y monitoreo' },
      { id: 'faqs', label: 'Preguntas frecuentes' },
    ],
    content: `
<h2 id="intro">Más allá del <span class="italic">deploy básico.</span></h2>
<p>Conectar un repositorio de Next.js a Vercel y hacer clic en "Deploy" es solo el comienzo. Vercel ofrece una plataforma completa de funcionalidades avanzadas que transforman cómo funciona tu aplicación Next.js en producción: caché inteligente, ejecución en el edge global, análisis de rendimiento, protección contra ataques, y herramientas de observabilidad. La mayoría de desarrolladores usa solo el 20% de lo que Vercel ofrece.</p>
<p>Este artículo cubre las funcionalidades avanzadas que marcan la diferencia entre una app que "funciona en Vercel" y una app que aprovecha Vercel para ofrecer la mejor experiencia posible a los usuarios. Si ya tienes tu app desplegada y quieres llevarla al siguiente nivel, este es tu siguiente paso.</p>

<div class="numbers-callout">
  <div><div class="n-label">Regiones edge</div><div class="n-num">100<span class="italic">+</span></div></div>
  <div><div class="n-label">Cold start Edge Fn</div><div class="n-num">&lt;1<span class="italic">ms</span></div></div>
  <div><div class="n-label">ISR revalidation</div><div class="n-num">on-demand<span class="italic"> o tiempo</span></div></div>
</div>

<h2 id="isr">Incremental Static <span class="italic">Regeneration.</span></h2>
<p>ISR (Incremental Static Regeneration) es una de las funcionalidades más poderosas de Next.js, y Vercel la implementa de forma óptima. El concepto: sirve páginas pre-generadas estáticamente (velocidad máxima, sin tiempo de servidor) pero las regenera automáticamente en background cuando el contenido cambia, sin necesidad de un redeploy completo.</p>
<p>En el App Router, configuras ISR con la opción <code>revalidate</code> en fetch o con la exportación de segmento <code>export const revalidate = 3600</code> (en segundos). Cuando un usuario visita la página después de que el tiempo de revalidación ha expirado, Vercel sirve la versión cacheada inmediatamente (sin espera) y en background solicita la nueva versión. El siguiente usuario ya recibe el contenido fresco. Este patrón "stale-while-revalidate" es el mejor equilibrio entre velocidad y frescura de contenido.</p>
<p>Para revalidación bajo demanda (cuando actualizes el CMS y quieres que la página se actualice inmediatamente sin esperar el timer), Next.js ofrece <code>revalidatePath()</code> y <code>revalidateTag()</code>. Tu CMS puede llamar a un Route Handler de Next.js con un webhook, y ese handler invalida las páginas o grupos de páginas afectados. El CMS actualiza la página en segundos, sin redeploy.</p>
<p>ISR funciona a escala global en Vercel: cada región edge tiene su propia caché. La revalidación se propaga globalmente de forma controlada. Para un blog con 1,000 páginas, ISR significa que solo las páginas que cambian se regeneran — no rebuilds completos del sitio con cada cambio de contenido.</p>

<div class="pullquote">
  ISR es la velocidad de lo estático con la frescura de lo <span class="italic">dinámico.</span> No tienes que elegir entre uno y otro.
</div>

<h2 id="edge">Edge <span class="italic">Functions.</span></h2>
<p>Las Edge Functions son funciones serverless que se ejecutan en la red edge de Vercel, cerca del usuario, en lugar de en una región centralizada. La diferencia en latencia es enorme: una función en us-east-1 tarda 200-300ms en responder a un usuario en Madrid; una Edge Function tarda 10-20ms porque se ejecuta en el nodo más cercano al usuario.</p>
<p>Las Edge Functions usan el runtime Edge de Vercel, que es una versión de V8 (el motor JavaScript de Chrome) con APIs web estándar pero sin Node.js completo. Esto significa que no puedes usar módulos de Node.js nativos (fs, crypto, etc.) — solo APIs web estándar como fetch, Request, Response, y un subconjunto de las APIs disponibles en el runtime de Node.js.</p>
<p>Casos de uso ideales para Edge Functions:</p>
<ul>
  <li><strong>A/B testing</strong>: decides qué variante mostrar en el edge antes de que la página se sirva, sin round-trip al servidor original.</li>
  <li><strong>Personalización geográfica</strong>: muestra contenido diferente según el país del usuario, con latencia mínima.</li>
  <li><strong>Autenticación y autorización ligera</strong>: verifica tokens JWT y redirige usuarios no autenticados sin pasar por el servidor de la aplicación.</li>
  <li><strong>Transformación de respuestas</strong>: modifica headers, inyecta contenido, o redirige respuestas de upstream antes de enviarlas al cliente.</li>
</ul>
<p>Para usar Edge Functions en Next.js, añade <code>export const runtime = 'edge'</code> a un Route Handler o un Server Component. Vercel detecta esto y despliega la función en el edge.</p>

<h2 id="middleware">Middleware en <span class="italic">Next.js.</span></h2>
<p>El Middleware de Next.js es código que se ejecuta antes de que se procese cualquier request — antes del rendering, antes del caché, antes del routing. Corre en el edge y puede modificar la request, la response, o redirigir a otra URL. El archivo <code>middleware.ts</code> en la raíz del proyecto aplica a todas las rutas por defecto; puedes usar <code>matcher</code> para limitarlo a rutas específicas.</p>
<p>Los casos de uso más comunes del Middleware:</p>
<ul>
  <li><strong>Protección de rutas</strong>: verifica que el usuario esté autenticado antes de servir páginas protegidas. Redirige a login si no lo está. Sin Middleware, esta verificación ocurre después de que el página se sirve, causando un flash de contenido protegido.</li>
  <li><strong>Redirecciones internacionalización</strong>: detecta el idioma preferido del usuario (por header Accept-Language o cookie) y redirige a la versión localizada de la URL.</li>
  <li><strong>Feature flags</strong>: activa o desactiva features para grupos de usuarios sin redeploy.</li>
  <li><strong>Rate limiting</strong>: limita el número de requests por IP a rutas específicas (APIs públicas, endpoints de auth).</li>
</ul>
<p>El Middleware corre en el runtime Edge, así que tiene las mismas limitaciones que las Edge Functions: sin APIs de Node.js completo. Para lógica que requiere Node.js (acceso a base de datos, librerías nativas), usa Route Handlers en el runtime Node.js estándar.</p>

<h2 id="cache">Estrategias de <span class="italic">caché.</span></h2>
<p>Next.js en Vercel tiene cuatro capas de caché distintas, y entenderlas es clave para optimizar el rendimiento:</p>
<ol>
  <li><strong>Request Memoization</strong>: dentro de un mismo render, si múltiples Server Components hacen el mismo fetch, Next.js lo deduplicará automáticamente. Solo se hace una request HTTP real por par URL+options por render.</li>
  <li><strong>Data Cache</strong>: el resultado de los fetch se cachea en el servidor entre requests. Persiste entre deploys a menos que uses <code>revalidate</code> o <code>no-store</code>.</li>
  <li><strong>Full Route Cache</strong>: las rutas estáticas y las generadas con ISR se cachean como HTML+RSC payload. Es la caché que permite servir páginas a velocidad estática.</li>
  <li><strong>Router Cache</strong>: el cliente cachea los segmentos de ruta visitados en memoria. Las navegaciones a páginas ya visitadas son instantáneas — sin request al servidor.</li>
</ol>
<p>La estrategia recomendada: usa <code>fetch(url)</code> sin opciones especiales para datos que quieres que se cachen agresivamente, <code>fetch(url, { next: { revalidate: 60 } })</code> para datos que se refrescan cada minuto, y <code>fetch(url, { cache: 'no-store' })</code> para datos que nunca deben cachearse (datos de usuario autenticado, tiempo real, etc.).</p>

<h2 id="analytics">Analytics y <span class="italic">monitoreo.</span></h2>
<p>Vercel ofrece Analytics integrado que mide los Core Web Vitals reales de tus usuarios: LCP (Largest Contentful Paint), FID/INP (interactividad), CLS (estabilidad visual), y TTFB (tiempo hasta el primer byte). No son métricas de laboratorio — son datos reales de los navegadores de tus usuarios segmentados por página, país, y tipo de dispositivo.</p>
<p>Vercel Speed Insights va un paso más allá: mide el rendimiento de cada ruta individualmente y te alerta cuando una página degrada sus Web Vitals. Esto es especialmente valioso cuando tienes muchas páginas y necesitas identificar cuáles tienen problemas de rendimiento sin revisarlas manualmente.</p>
<p>Para errores y logging, Vercel tiene integración nativa con Sentry, Datadog, y otros proveedores de observabilidad. También puedes ver los logs de tus funciones en tiempo real en el dashboard de Vercel. Para producción seria, configura alertas que te notifiquen cuando el error rate sube o cuando el tiempo de respuesta de una función supera un umbral.</p>

<h2 id="faqs">Preguntas <span class="italic">frecuentes.</span></h2>
<h3>¿Puedo usar Next.js sin Vercel?</h3>
<p>Sí, absolutamente. Next.js es open source y puedes desplegarlo en cualquier plataforma que soporte Node.js: Railway, Render, Fly.io, AWS, GCP, Azure, o tu propio VPS. Sin embargo, algunas funcionalidades avanzadas de Vercel (ISR óptimo, Edge Network global, Analytics integrado) están estrechamente acopladas a la plataforma. En otras plataformas, ISR funciona pero puede no estar tan optimizado, y las Edge Functions requieren alternativas como Cloudflare Workers.</p>
<h3>¿Cuándo debo usar Server Actions vs Route Handlers?</h3>
<p>Los Server Actions son funciones del servidor que se pueden llamar directamente desde componentes client sin crear un endpoint HTTP explícito. Son ideales para mutations que vienen de formularios o interacciones del usuario: crear, actualizar, eliminar datos. Los Route Handlers son endpoints HTTP explícitos (GET, POST, etc.) ideales para APIs que serán consumidas por clientes externos, webhooks de terceros, o cuando necesitas control explícito sobre headers y respuestas HTTP. Para uso interno de la aplicación, los Server Actions son más ergonómicos; para APIs públicas, los Route Handlers.</p>
<h3>¿ISR funciona con bases de datos que cambian frecuentemente?</h3>
<p>Sí, con la estrategia correcta. Para contenido que cambia frecuentemente pero donde la latencia de algunos segundos es aceptable (precios, inventario): usa <code>revalidate</code> con un tiempo corto (30-60 segundos). Para contenido que necesita actualizarse inmediatamente después de un cambio (artículos publicados, productos añadidos): implementa revalidación bajo demanda con webhooks y <code>revalidatePath()</code>. Para datos que deben estar completamente frescos en cada request (carrito de compra, datos del usuario autenticado): usa <code>cache: 'no-store'</code> y acepta el coste de rendering dinámico.</p>
<h3>¿Cómo optimizo el Cold Start de las funciones serverless en Vercel?</h3>
<p>El cold start de las funciones Node.js serverless en Vercel es generalmente bajo (50-300ms), pero puede impactar si tienes funciones con dependencias pesadas. Estrategias para reducirlo: minimiza las dependencias importadas en cada función (imports al nivel de archivo o dinámicos), usa el runtime Edge para funciones que no necesitan Node.js completo (cold start &lt;1ms), y considera Vercel's Fluid Compute (anteriormente Streaming Functions) para funciones que necesitan mantener conexiones largas. Las Edge Functions prácticamente no tienen cold start porque V8 Isolates son mucho más ligeras que contenedores Node.js.</p>
    `,
    prev: { slug: 'angular-vs-react-vs-nextjs', title: 'Angular vs React vs Next.js: comparativa completa', category: 'Comparativa', readTime: '13 min' },
    next: { slug: 'que-es-nextjs', title: '¿Qué es Next.js? La guía definitiva', category: 'Guía', readTime: '14 min' },
  },

  {
    relatedSlugs: ['nextjs-en-vercel', 'desplegar-con-vercel', 'angular-vs-react-vs-nextjs'],
    slug: 'que-es-nextjs',
    title: '¿Qué es Next.js? La guía definitiva 2025 — GaloDev',
    headline: '¿Qué es Next.js? La guía definitiva para entenderlo de verdad.',
    lede: 'SSR, SSG, ISR, App Router, Server Components, React vs Next.js. Todo lo que necesitas saber sobre el framework de React más popular del mundo, explicado desde los fundamentos hasta los conceptos avanzados.',
    category: 'Guía',
    readTime: '14 min',
    date: 'May 30, 2025',
    dateISO: '2025-05-30',
    issue: '14',
    coverClass: 'cover-2',
    coverOrn: 'next',
    excerpt: 'SSR, SSG, ISR, App Router, Server Components y más. Todo lo que necesitas para entender Next.js de verdad, desde los fundamentos hasta producción.',
    toc: [
      { id: 'intro', label: '¿Qué es Next.js?' },
      { id: 'historia', label: 'De React a Next.js' },
      { id: 'rendering', label: 'Tipos de rendering' },
      { id: 'app-router', label: 'El App Router' },
      { id: 'server-components', label: 'React Server Components' },
      { id: 'seo', label: 'SEO con Next.js' },
      { id: 'vs-react', label: 'Next.js vs React puro' },
      { id: 'empezar', label: 'Cómo empezar' },
      { id: 'faqs', label: 'Preguntas frecuentes' },
    ],
    content: `
<h2 id="intro">¿Qué es <span class="italic">Next.js</span>?</h2>
<p>Next.js es un framework de React para construir aplicaciones web fullstack. Creado por Vercel (anteriormente ZEIT) en 2016 y hoy el framework de React más popular del mundo, Next.js añade sobre React lo que necesitas para una aplicación de producción: routing basado en el sistema de archivos, múltiples estrategias de rendering (SSR, SSG, ISR), optimización automática de imágenes y fuentes, un sistema de API routes para el backend, y una integración perfecta con la plataforma de despliegue de Vercel.</p>
<p>Mientras que React es una librería de UI que se ocupa solo de renderizar componentes en el navegador, Next.js es un framework completo que corre tanto en el servidor como en el cliente. Esto es fundamental: Next.js puede ejecutar código en el servidor antes de enviar HTML al navegador, puede pre-generar páginas estáticas en el momento del build, y puede regenerar esas páginas en background cuando el contenido cambia. Esta flexibilidad de rendering es lo que distingue a Next.js de React puro.</p>
<p>La adopción de Next.js es masiva. Lo usan empresas como Netflix, Twitch, TikTok, Hulu, Target, Nike, GitHub y miles de startups. El framework tiene más de 120,000 estrellas en GitHub y 9 millones de descargas semanales en npm. No es una moda — es la infraestructura web de algunas de las aplicaciones más visitadas del mundo.</p>

<div class="numbers-callout">
  <div><div class="n-label">Descargas npm/sem</div><div class="n-num">9<span class="italic">M</span></div></div>
  <div><div class="n-label">Estrellas GitHub</div><div class="n-num">120<span class="italic">K+</span></div></div>
  <div><div class="n-label">Versión actual</div><div class="n-num">15<span class="italic">.x</span></div></div>
</div>

<h2 id="historia">De React <span class="italic">a Next.js.</span></h2>
<p>Para entender por qué existe Next.js, necesitas entender el problema que resuelve. React en sus primeros años producía lo que se conoce como SPAs (Single Page Applications): aplicaciones donde el servidor envía una página HTML casi vacía y todo el contenido se genera con JavaScript en el navegador del usuario.</p>
<p>Las SPAs tienen ventajas — interactividad fluida, transiciones rápidas entre páginas después de la carga inicial — pero también problemas serios. El SEO es terrible: los crawlers de Google ven la página vacía antes de que JavaScript ejecute. La performance percibida en carga inicial es pobre: el usuario ve una pantalla en blanco o un spinner hasta que JavaScript descarga, parsea y ejecuta. En conexiones lentas, esto puede tomar varios segundos.</p>
<p>Next.js resolvió estos problemas en 2016 con su primera versión: Server Side Rendering para React. En lugar de enviar HTML vacío, el servidor ejecuta los componentes de React y envía HTML completamente renderizado al cliente. El usuario ve contenido inmediatamente; los crawlers de búsqueda ven el contenido real; React "hidrata" el HTML estático añadiendo los event listeners para la interactividad.</p>
<p>Desde entonces, Next.js ha evolucionado significativamente. Pages Router (la arquitectura original) funcionaba bien pero tenía limitaciones. El App Router, introducido en Next.js 13 como beta y estabilizado en Next.js 14, representa un rediseño completo basado en React Server Components — una nueva primitiva de React que cambia fundamentalmente cómo se divide el código entre servidor y cliente.</p>

<h2 id="rendering">Tipos de <span class="italic">rendering.</span></h2>
<p>Una de las fortalezas de Next.js es su flexibilidad en estrategias de rendering. Puedes elegir la estrategia óptima para cada página de tu aplicación, e incluso mezclar estrategias dentro de la misma página:</p>
<ul>
  <li><strong>Static Site Generation (SSG)</strong>: la página se genera en el momento del build como HTML estático. Velocidad máxima — el servidor solo sirve un archivo, no ejecuta código en cada request. Ideal para contenido que no cambia frecuentemente: landing pages, documentación, blogs sin actualización constante.</li>
  <li><strong>Server Side Rendering (SSR)</strong>: la página se genera en el servidor en cada request. El HTML siempre refleja los datos más actuales. Coste: cada request tiene latencia del servidor. Ideal para páginas con datos que cambian constantemente o que dependen del usuario autenticado.</li>
  <li><strong>Incremental Static Regeneration (ISR)</strong>: combina SSG y SSR. La página se sirve como HTML estático (velocidad máxima) pero se regenera en background después de un tiempo configurado. La próxima request después de la revalidación recibe contenido fresco. Ideal para la mayoría de contenido dinámico: artículos de blog, páginas de producto, listados.</li>
  <li><strong>Partial Prerendering (PPR)</strong>: introducido en Next.js 14, permite tener partes estáticas y partes dinámicas en la misma página de forma nativa. El shell estático se sirve inmediatamente; los fragmentos dinámicos se streaman desde el servidor. Lo mejor de ambos mundos sin configuración adicional.</li>
</ul>

<div class="pullquote">
  La pregunta no es "¿uso SSR o SSG?". Es <span class="italic">"¿qué parte de esta página necesita ser dinámica?"</span>
</div>

<h2 id="app-router">El <span class="italic">App Router.</span></h2>
<p>El App Router es el sistema de routing de Next.js 13+ y representa la forma moderna de construir aplicaciones Next.js. Basado en el directorio <code>app/</code> en la raíz del proyecto, usa el sistema de archivos como definición de rutas: la carpeta <code>app/blog/[slug]/</code> con un archivo <code>page.tsx</code> define la ruta <code>/blog/:slug</code>.</p>
<p>El App Router introduce un conjunto de archivos con propósito especial que estructuran la aplicación:</p>
<ul>
  <li><code>page.tsx</code>: el componente que se renderiza para una ruta. Puede ser un Server Component o Client Component.</li>
  <li><code>layout.tsx</code>: un wrapper que persiste entre navegaciones. Los layouts anidados permiten secciones de la UI que no se remontan al navegar entre páginas del mismo subtree.</li>
  <li><code>loading.tsx</code>: UI de loading que se muestra automáticamente mientras se carga la página. Implementa React Suspense por debajo.</li>
  <li><code>error.tsx</code>: UI de error que se muestra cuando algo falla en el render. Actúa como Error Boundary de React.</li>
  <li><code>not-found.tsx</code>: UI para rutas no encontradas (404).</li>
  <li><code>route.ts</code>: define un Route Handler (endpoint de API) para la ruta.</li>
</ul>
<p>El sistema de layouts anidados es una de las mejoras más significativas sobre el Pages Router. Si tienes una sección <code>/dashboard</code> con su propio layout (sidebar, header), ese layout persiste mientras navegas entre páginas del dashboard sin remontarse. Esto resulta en transiciones más fluidas y mejor experiencia de usuario.</p>

<h2 id="server-components">React Server <span class="italic">Components.</span></h2>
<p>Los React Server Components (RSC) son el cambio más profundo en la historia de React y Next.js. En el App Router, todos los componentes son Server Components por defecto — solo añades <code>'use client'</code> al inicio del archivo cuando el componente necesita interactividad del lado del cliente.</p>
<p>¿Qué hace especiales a los Server Components? Se renderizan completamente en el servidor y envían solo HTML y un formato especial (RSC payload) al cliente. <strong>No añaden JavaScript al bundle del navegador</strong>. Pueden hacer operaciones del servidor directamente: consultar una base de datos, leer archivos, llamar a APIs con credenciales secretas, todo sin exponer esa lógica al cliente.</p>
<p>Un ejemplo concreto: un componente de lista de artículos en un blog. Con React puro, necesitarías: hacer un fetch desde el cliente, manejar loading/error states, y el código de fetching se incluye en el bundle del cliente. Con un Server Component, simplemente usas <code>await db.query('SELECT * FROM articles')</code> directamente en el componente — el componente accede a la base de datos directamente, sin API endpoint, sin fetch desde el cliente, y sin añadir JavaScript al bundle del navegador.</p>
<p>La división de la aplicación es la siguiente: usa Server Components para partes de la UI que solo muestran datos (listas, cards, contenido estático). Usa Client Components (<code>'use client'</code>) solo cuando necesites: event listeners (onClick, onChange), hooks de React (useState, useEffect, useContext), APIs del navegador (localStorage, geolocation), o librerías que usan APIs del navegador.</p>

<h2 id="seo">SEO con <span class="italic">Next.js.</span></h2>
<p>Next.js tiene soporte nativo para SEO a través del Metadata API, que reemplaza la necesidad de librerías como react-helmet. El sistema de metadata es tipado, composable y funciona tanto en páginas estáticas como dinámicas.</p>
<p>Para metadata estática, exportas un objeto <code>metadata</code> desde el <code>page.tsx</code> o <code>layout.tsx</code>:</p>
<ul>
  <li><code>title</code>: el título de la página. Puede ser un string o un objeto con <code>template</code> para títulos consistentes con el nombre del sitio.</li>
  <li><code>description</code>: la meta description que aparece en los resultados de búsqueda.</li>
  <li><code>openGraph</code>: metadata para compartir en redes sociales.</li>
  <li><code>robots</code>: instrucciones para los crawlers (indexar, seguir links, etc.).</li>
  <li><code>canonical</code>: URL canónica para evitar contenido duplicado.</li>
</ul>
<p>Para metadata dinámica (páginas con slug, páginas de producto con ID), exportas la función <code>generateMetadata({ params })</code> que puede ser async y acceder a la base de datos para obtener el título y descripción reales del contenido.</p>
<p>Next.js también genera automáticamente el sitemap.xml y robots.txt cuando añades los archivos <code>app/sitemap.ts</code> y <code>app/robots.ts</code>. El sitemap puede ser dinámico — generado a partir de tu base de datos de artículos, productos o páginas en el momento del request.</p>

<h2 id="vs-react">Next.js vs React <span class="italic">puro.</span></h2>
<p>La pregunta "¿uso React puro o Next.js?" tiene una respuesta bastante clara en 2025. Usa React puro (con Vite) cuando tu aplicación es una SPA donde el SEO no importa: dashboards internos, paneles de administración, aplicaciones que requieren autenticación para acceder a cualquier contenido. En estos casos, el SSR de Next.js no aporta valor y añade complejidad innecesaria.</p>
<p>Usa Next.js cuando: tu aplicación tiene páginas públicas que deben ser indexadas por Google, cuando la performance en carga inicial importa para usuarios en el mundo real, cuando necesitas una API junto con el frontend sin configurar un servidor separado, o cuando quieres aprovechar las optimizaciones automáticas de imágenes, fuentes y scripts que incluye Next.js.</p>
<p>La pregunta complementaria es si usar Next.js en Vercel o en otra plataforma. La experiencia en Vercel está optimizada para Next.js: ISR funciona perfectamente, los Edge Functions se integran sin configuración, y las actualizaciones automáticas de infraestructura garantizan que siempre uses las últimas optimizaciones. En otras plataformas (Railway, Render, AWS), Next.js funciona bien pero puede que algunas funcionalidades avanzadas (especialmente relacionadas con ISR y Edge) requieran configuración adicional.</p>

<h2 id="empezar">Cómo <span class="italic">empezar.</span></h2>
<p>El comando oficial para crear un nuevo proyecto Next.js es <code>npx create-next-app@latest</code>. El wizard interactivo te pregunta el nombre del proyecto, si quieres TypeScript (recomendado: sí), ESLint (recomendado: sí), Tailwind CSS (depende de tus preferencias), y si quieres el App Router (recomendado: sí, es la arquitectura moderna).</p>
<p>Estructura básica de un proyecto Next.js con App Router:</p>
<ul>
  <li><code>app/</code>: todas las páginas, layouts y route handlers.</li>
  <li><code>app/layout.tsx</code>: el layout raíz que envuelve toda la aplicación. Aquí van providers globales, metadata base, y elementos UI que aparecen en todas las páginas.</li>
  <li><code>app/page.tsx</code>: la página principal (ruta <code>/</code>).</li>
  <li><code>components/</code>: componentes reutilizables que no son páginas.</li>
  <li><code>lib/</code>: utilidades, helpers, configuración de base de datos.</li>
  <li><code>public/</code>: archivos estáticos (imágenes, favicon). Accesibles directamente por URL.</li>
  <li><code>next.config.ts</code>: configuración del framework.</li>
</ul>
<p>Para comenzar el servidor de desarrollo: <code>npm run dev</code>. Next.js arranca en <code>localhost:3000</code> con hot reload automático. Para el build de producción: <code>npm run build</code>. Para verificar el bundle y optimizar el rendimiento: <code>npm run build</code> seguido de <code>npx @next/bundle-analyzer</code>.</p>
<p>El camino de aprendizaje recomendado: empieza con la documentación oficial de Next.js (nextjs.org/docs) — está excepcionalmente bien escrita. Completa el tutorial oficial de "Learn Next.js" que construye una aplicación de dashboard completa. Luego lee este blog para conceptos avanzados y patrones de producción. La curva de aprendizaje es suave si ya conoces React — la mayoría de conceptos nuevos se entienden en contexto al construir algo real.</p>

<h2 id="faqs">Preguntas <span class="italic">frecuentes.</span></h2>
<h3>¿Next.js es solo para sitios con SEO o también para apps internas?</h3>
<p>Next.js funciona perfectamente para apps internas, aunque la alternativa más ligera (React + Vite) puede ser más sencilla si el SEO no es un requisito. La ventaja de usar Next.js incluso para apps internas es el sistema de Route Handlers para APIs, la optimización de imágenes, y el acceso a Server Components para data fetching directo. Si tu equipo ya conoce Next.js, usarlo para todo — apps públicas e internas — tiene sentido por la consistencia. Si estás empezando, Vite + React para apps privadas y Next.js para apps públicas es una división razonable.</p>
<h3>¿Cuándo debo usar el Pages Router vs el App Router?</h3>
<p>Para proyectos nuevos: App Router siempre. Es la arquitectura moderna con React Server Components, mejor soporte de streaming, layouts anidados y el futuro del framework. El Pages Router seguirá recibiendo mantenimiento pero las nuevas funcionalidades se desarrollan para el App Router. Para proyectos existentes en Pages Router: la migración no es urgente, es funcional y bien soportado, pero planifica migrar si el proyecto tiene larga vida por delante.</p>
<h3>¿Next.js tiene todo lo que necesito o necesito añadir librerías?</h3>
<p>Next.js cubre routing, rendering, API routes, optimización de assets y metadata. Para el resto necesitas librerías: base de datos (Prisma, Drizzle, Supabase), autenticación (NextAuth.js / Auth.js, Clerk, Lucia), gestión de estado global (Zustand, Jotai), formularios (React Hook Form), validación (Zod), emails (Resend, Nodemailer), y pagos (Stripe). El ecosistema alrededor de Next.js es maduro y tiene soluciones de alta calidad para cada una de estas necesidades.</p>
<h3>¿Puedo usar Next.js para construir una API solo, sin frontend?</h3>
<p>Técnicamente sí — los Route Handlers de Next.js pueden ser el backend de una API REST completa. Sin embargo, si tu caso de uso es principalmente una API sin frontend, frameworks como Hono, Fastify o Express son más apropiados: tienen menor overhead, mejor rendimiento para APIs puras, y no cargan con las abstracciones de rendering que no vas a usar. Next.js brilla cuando el frontend y el backend están en el mismo proyecto y se benefician de compartir código TypeScript, tipos y utilidades.</p>
    `,
    prev: { slug: 'nextjs-en-vercel', title: 'Next.js en Vercel: ISR, Edge Functions y más', category: 'Tutorial', readTime: '9 min' },
  },
];

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

export function getAllSlugs(): string[] {
  return articles.map((a) => a.slug);
}
