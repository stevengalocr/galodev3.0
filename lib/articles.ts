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
  },
];

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

export function getAllSlugs(): string[] {
  return articles.map((a) => a.slug);
}
