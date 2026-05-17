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
  image?: string;
  excerpt: string;
  content: string;
  toc: TocItem[];
  prev?: { slug: string; title: string; category: string; readTime: string };
  next?: { slug: string; title: string; category: string; readTime: string };
  relatedSlugs?: string[];
};

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

export function getAllSlugs(): string[] {
  return articles.map((a) => a.slug);
}

export const articles: Article[] = [
  {
    slug: 'git-y-github-para-developers',
    title: 'Git y GitHub explicado fácil para developers — GaloDev',
    headline: 'Git y GitHub explicado fácil para developers.',
    lede: 'Commits, branches, pull requests y merge conflicts sin el dolor de cabeza habitual. La guía práctica que ojalá hubieras tenido cuando empezaste a programar.',
    category: 'Tendencias',
    readTime: '11 min',
    date: 'Ago 12, 2025',
    dateISO: '2025-08-12',
    issue: '01',
    coverClass: 'cover-1',
    coverOrn: '⎇',
    excerpt: 'Commits, branches, pull requests y merge conflicts. Todo lo que necesitás saber de Git y GitHub para trabajar como un developer profesional, sin misterios.',
    toc: [
      { id: 'intro', label: '¿Por qué Git?' },
      { id: 'conceptos', label: 'Conceptos clave' },
      { id: 'commits', label: 'Commits que importan' },
      { id: 'branches', label: 'Branches y flujos' },
      { id: 'pull-requests', label: 'Pull Requests' },
      { id: 'conflictos', label: 'Merge conflicts' },
      { id: 'buenas-practicas', label: 'Buenas prácticas' },
    ],
    content: `
<h2 id="intro">¿Por qué <span class="italic">Git?</span></h2>
<p>Git no es solo una herramienta de backup. Es un sistema de control de versiones distribuido que te permite colaborar con otros developers, experimentar sin miedo a romper nada, y volver al pasado cuando algo sale mal. En 2026, no saber Git es como no saber escribir: técnicamente podés trabajar, pero vas a tener problemas graves en cuanto trabajes con alguien más.</p>
<p>GitHub, por su parte, es la plataforma social de Git. El repositorio remoto donde vive tu código, donde otros pueden verlo, contribuir, y donde se integran las herramientas de CI/CD que automatizan tus deploys. Son dos cosas distintas: Git es el sistema, GitHub es la plataforma.</p>

<div class="numbers-callout">
  <div><div class="n-label">Developers que usan Git</div><div class="n-num">94<span class="italic">%</span></div></div>
  <div><div class="n-label">Repos en GitHub</div><div class="n-num">420<span class="italic">M+</span></div></div>
  <div><div class="n-label">Comandos que usás el 90% del tiempo</div><div class="n-num">8</div></div>
</div>

<h2 id="conceptos">Conceptos <span class="italic">clave.</span></h2>
<p>Antes de los comandos, los conceptos. Un <strong>repositorio</strong> es la carpeta de tu proyecto con todo el historial de cambios. Un <strong>commit</strong> es una foto instantánea del estado de tu código en un momento dado. Un <strong>branch</strong> es una línea paralela de desarrollo. Un <strong>remote</strong> es la copia del repositorio en un servidor (como GitHub).</p>
<p>El flujo básico de trabajo es siempre el mismo: modificás archivos, los preparás con <code>git add</code>, los commitás con <code>git commit</code>, y los subís al remote con <code>git push</code>. Cuando querés traer cambios del remote, usás <code>git pull</code>. Simple en teoría, complejo en la práctica cuando trabajás con más personas.</p>

<h2 id="commits">Commits que <span class="italic">importan.</span></h2>
<p>Un buen commit tiene dos características: es atómico (un solo cambio lógico) y tiene un mensaje descriptivo. El mensaje debería completar la frase "Si aplico este commit, este proyecto va a...". Nada de "fix", "changes", o el clásico "asdfg". Esos mensajes son inútiles tres meses después cuando buscás cuándo y por qué se rompió algo.</p>
<p>La convención más usada hoy es <strong>Conventional Commits</strong>: <code>feat: agregar autenticación con Google</code>, <code>fix: corregir cálculo de total con descuento</code>, <code>refactor: extraer lógica de validación a función separada</code>. Esta convención permite generar changelogs automáticos y hace el historial legible para humanos y herramientas.</p>
<ul>
  <li><code>feat:</code> — nueva funcionalidad</li>
  <li><code>fix:</code> — corrección de bug</li>
  <li><code>refactor:</code> — reorganización sin cambio de comportamiento</li>
  <li><code>docs:</code> — cambios en documentación</li>
  <li><code>chore:</code> — mantenimiento, dependencias, configuración</li>
</ul>

<h2 id="branches">Branches y <span class="italic">flujos.</span></h2>
<p>Una branch te permite desarrollar una funcionalidad de forma aislada sin afectar el código principal. La branch principal suele llamarse <code>main</code> (o <code>master</code> en repos más viejos) y debería contener siempre código estable y deployable. Para cada nueva feature o fix, creás una branch, trabajás en ella, y la mergeas de vuelta cuando está lista.</p>
<p>El flujo más usado en equipos pequeños es <strong>GitHub Flow</strong>: <code>main</code> siempre es deployable, cada cambio viene de una branch de feature, y esa branch se mergea via Pull Request con review. Para proyectos más grandes existe <strong>Git Flow</strong> con branches de develop, release y hotfix, aunque suele ser sobre-ingeniería para la mayoría de proyectos.</p>

<div class="pullquote">
  La branch <span class="italic">main</span> debería estar siempre lista para deployar. Si no podés deployar en cualquier momento, algo está mal en tu flujo.
</div>

<h2 id="pull-requests">Pull <span class="italic">Requests.</span></h2>
<p>Un Pull Request (PR) es una propuesta de mergeo: le decís al equipo "tengo estos cambios listos, revísenlos antes de integrarlos". Los PRs son el corazón de la colaboración en GitHub. Un buen PR tiene una descripción clara de qué hace y por qué, referencia el issue que resuelve, y es pequeño (menos de 400 líneas cambiadas es el ideal).</p>
<p>El code review en un PR no es para buscar errores de sintaxis (eso lo hacen el linter y los tests). Es para asegurarse de que la solución tiene sentido arquitectónicamente, que no introduce deuda técnica innecesaria, y para compartir conocimiento del codebase entre el equipo. Aprendés más en un buen code review que en muchos tutoriales.</p>

<h2 id="conflictos">Merge <span class="italic">conflicts.</span></h2>
<p>Los conflictos ocurren cuando dos personas modificaron las mismas líneas de código en ramas distintas. Git no sabe cuál versión es la correcta, así que te muestra ambas y te pide que decidas. No son tan terribles como parecen al principio, pero sí requieren atención para no pisar el trabajo de alguien más.</p>
<p>La mejor estrategia para minimizar conflictos: hacé branches cortas (idealmente 1-3 días de trabajo), sincronizate frecuentemente con <code>git pull --rebase origin main</code>, y comunicá con tu equipo cuando vayas a modificar archivos compartidos. Los conflictos en archivos de lock (<code>package-lock.json</code>, <code>yarn.lock</code>) son los más frecuentes y generalmente se resuelven regenerando el archivo.</p>

<h2 id="buenas-practicas">Buenas <span class="italic">prácticas.</span></h2>
<p>Nunca trabajes directamente en <code>main</code>. Siempre creá una branch para tus cambios. Hacé commits frecuentes pero significativos: no un commit gigante al final del día, ni un commit por cada línea. Añadí un <code>.gitignore</code> desde el inicio para no commitear <code>node_modules</code>, archivos <code>.env</code>, o carpetas de build.</p>
<p>Para los mensajes de commit, escribilos en imperativo y en el idioma del equipo. Si el equipo habla español, escribilos en español. Revisá con <code>git log --oneline</code> si el historial cuenta una historia coherente de cómo evolucionó el proyecto. Si parece una lista de notas sin sentido, trabajá en tus mensajes de commit.</p>`,
    next: { slug: 'que-es-docker', title: 'Qué es Docker y por qué todo developer debería aprenderlo', category: 'Tendencias', readTime: '11 min' },
    relatedSlugs: ['que-es-docker', 'desplegar-con-vercel', 'que-es-nextjs'],
  },

  {
    slug: 'que-es-docker',
    title: 'Qué es Docker y por qué todo developer debería aprenderlo — GaloDev',
    headline: 'Qué es Docker y por qué todo developer debería aprenderlo.',
    lede: 'Containers, imágenes, Docker Compose y deploys reproducibles. Todo lo que necesitás saber para dejar de escuchar "en mi máquina funciona" para siempre.',
    category: 'Tendencias',
    readTime: '11 min',
    date: 'Ago 19, 2025',
    dateISO: '2025-08-19',
    issue: '02',
    coverClass: 'cover-2',
    coverOrn: '◼',
    excerpt: 'Docker resuelve el problema más viejo del desarrollo: que algo funcione igual en tu máquina, en staging y en producción. Aquí entendés cómo y por qué.',
    toc: [
      { id: 'intro', label: '¿Qué es Docker?' },
      { id: 'containers', label: 'Containers vs VMs' },
      { id: 'imagenes', label: 'Imágenes y Dockerfile' },
      { id: 'compose', label: 'Docker Compose' },
      { id: 'desarrollo-local', label: 'Para desarrollo local' },
      { id: 'deploys', label: 'Para deploys' },
      { id: 'errores', label: 'Errores comunes' },
    ],
    content: `
<h2 id="intro">¿Qué es <span class="italic">Docker?</span></h2>
<p>Docker es una plataforma de containerización que empaqueta tu aplicación junto con todas sus dependencias en una unidad llamada container. El resultado: tu app corre exactamente igual en la laptop de desarrollo, en el servidor de staging y en producción. Sin "en mi máquina funciona", sin diferencias de versión de Node.js, sin problemas de dependencias del sistema operativo.</p>
<p>Antes de Docker, la solución era documentar minuciosamente qué instalar y en qué orden, rezar para que la versión del servidor coincidiera con la de desarrollo, y dedicar días enteros a reproducir bugs que solo aparecían en producción. Docker eliminó ese problema de raíz.</p>

<div class="numbers-callout">
  <div><div class="n-label">Empresas que usan Docker</div><div class="n-num">87<span class="italic">%</span></div></div>
  <div><div class="n-label">Overhead vs VM</div><div class="n-num">~3<span class="italic">%</span></div></div>
  <div><div class="n-label">Tiempo de inicio</div><div class="n-num">&lt;1<span class="italic">s</span></div></div>
</div>

<h2 id="containers">Containers <span class="italic">vs VMs.</span></h2>
<p>Una máquina virtual (VM) emula hardware completo: tiene su propio kernel, sus propios drivers, y ocupa varios GB. Un container de Docker comparte el kernel del sistema operativo host y solo empaqueta la aplicación con sus dependencias a nivel de userspace. El resultado: containers que arrancan en milisegundos y usan MB en lugar de GB.</p>
<p>Podés correr decenas de containers en la misma máquina donde solo cabrían 2-3 VMs. Y cada container está aislado: si uno falla o es comprometido, los demás no se ven afectados. Es el equilibrio perfecto entre aislamiento y eficiencia.</p>

<h2 id="imagenes">Imágenes y <span class="italic">Dockerfile.</span></h2>
<p>Una imagen Docker es la plantilla de solo lectura desde la que se crean los containers. El Dockerfile es el script que define cómo construir esa imagen: qué imagen base usar, qué instalar, qué archivos copiar, cómo iniciar la aplicación. Una imagen bien construida es reproducible, versionada, y se puede compartir en Docker Hub o en un registry privado.</p>
<p>Para una app Node.js, el Dockerfile básico parte de <code>node:20-alpine</code> (imagen oficial de Node con Alpine Linux, muy liviana), instala las dependencias con <code>npm ci</code>, copia el código, y define el comando de inicio. El flag <code>--production</code> en el install y el uso de multi-stage builds pueden reducir el tamaño de la imagen final en un 60-70%.</p>
<ul>
  <li><strong>FROM</strong> — imagen base (node:20-alpine, python:3.12, nginx:alpine)</li>
  <li><strong>WORKDIR</strong> — directorio de trabajo dentro del container</li>
  <li><strong>COPY</strong> — copiar archivos del host al container</li>
  <li><strong>RUN</strong> — ejecutar comandos durante el build</li>
  <li><strong>EXPOSE</strong> — declarar el puerto que usa la app</li>
  <li><strong>CMD</strong> — comando de inicio del container</li>
</ul>

<h2 id="compose">Docker <span class="italic">Compose.</span></h2>
<p>Docker Compose permite definir y correr aplicaciones multi-container con un solo archivo YAML. En lugar de correr manualmente tu app, tu base de datos, tu cache de Redis y tu servidor de emails, definís todos los servicios en <code>docker-compose.yml</code> y los levantás con <code>docker compose up</code>. Un comando, toda la infraestructura lista.</p>
<p>El <code>docker-compose.yml</code> define los servicios, las redes entre ellos, los volúmenes para datos persistentes, y las variables de entorno. Las dependencias entre servicios se declaran con <code>depends_on</code>. Los volumes permiten que los datos de la base de datos sobrevivan reinicios del container. Es la solución perfecta para entornos de desarrollo.</p>

<div class="pullquote">
  <code>docker compose up</code> y tenés toda tu infraestructura local corriendo. No hay setup más reproducible que ese.
</div>

<h2 id="desarrollo-local">Para desarrollo <span class="italic">local.</span></h2>
<p>El mayor valor de Docker en desarrollo es la paridad con producción. Tu equipo usa el mismo ambiente sin importar si tienen Mac, Windows o Linux. Los onboardings de nuevos developers pasan de "sigue estas 40 instrucciones" a "clona el repo y corre <code>docker compose up</code>". El tiempo de setup baja de horas a minutos.</p>
<p>Para desarrollo activo, los volúmenes de Docker te permiten montar el código de tu máquina directamente en el container, así los cambios se reflejan sin necesidad de rebuild. Combinado con hot reload de frameworks como Next.js o Vite, la experiencia de desarrollo es igual de fluida que sin Docker.</p>

<h2 id="deploys">Para <span class="italic">deploys.</span></h2>
<p>En producción, los containers de Docker son la base de Kubernetes, AWS ECS, Google Cloud Run y casi cualquier plataforma de deploy moderna. Tu imagen Docker es el artefacto deployable: la buildás en CI/CD, la subís al registry, y la plataforma la corre. El proceso es idéntico independientemente del servidor destino.</p>

<h2 id="errores">Errores <span class="italic">comunes.</span></h2>
<p>El error más común es no usar <code>.dockerignore</code>: incluir <code>node_modules</code> en el contexto de build lo hace lentísimo. El segundo error es correr containers como root por omisión: siempre creá un usuario sin privilegios. El tercero es guardar secretos en el Dockerfile o en variables de entorno hardcodeadas en la imagen: usá Docker secrets o variables inyectadas en runtime.</p>`,
    prev: { slug: 'git-y-github-para-developers', title: 'Git y GitHub explicado fácil para developers', category: 'Tendencias', readTime: '11 min' },
    next: { slug: 'mejores-extensiones-vscode-2026', title: 'Las mejores extensiones VSCode en 2026', category: 'Productividad', readTime: '9 min' },
    relatedSlugs: ['git-y-github-para-developers', 'desplegar-con-vercel', 'apis-modernas-con-nodejs'],
  },

  {
    slug: 'mejores-extensiones-vscode-2026',
    title: 'Las mejores extensiones VSCode en 2026 — GaloDev',
    headline: 'Las mejores extensiones de VSCode en 2026.',
    lede: 'Las extensiones que realmente hacen diferencia en tu productividad diaria. Sin relleno, sin las que ya todo el mundo tiene. Solo las que cambian cómo trabajás.',
    category: 'Productividad',
    readTime: '9 min',
    date: 'Sep 2, 2025',
    dateISO: '2025-09-02',
    issue: '03',
    coverClass: 'cover-3',
    coverOrn: '⚙',
    excerpt: 'Las extensiones de VSCode que realmente hacen diferencia: IA, temas, Git, debugging y productividad. Las que usamos todos los días en proyectos reales.',
    toc: [
      { id: 'intro', label: 'El problema del setup' },
      { id: 'ia', label: 'IA y autocompletado' },
      { id: 'git', label: 'Git integrado' },
      { id: 'calidad', label: 'Calidad de código' },
      { id: 'productividad', label: 'Productividad pura' },
      { id: 'temas', label: 'Tema y fuente' },
    ],
    content: `
<h2 id="intro">El problema del <span class="italic">setup.</span></h2>
<p>VSCode tiene más de 50,000 extensiones disponibles. La mayoría son mediocres, desactualizadas o duplicados de funcionalidad que ya incluye el editor. El problema no es encontrar extensiones, es no caer en el trap de instalar 40 que se pisan entre sí y ralentizan el editor hasta hacerlo inusable. Esta lista tiene solo las que realmente cambian tu flujo de trabajo.</p>

<div class="numbers-callout">
  <div><div class="n-label">Extensiones disponibles</div><div class="n-num">50<span class="italic">k+</span></div></div>
  <div><div class="n-label">Que realmente usás</div><div class="n-num">~12</div></div>
  <div><div class="n-label">Impacto en startup time</div><div class="n-num">alto</div></div>
</div>

<h2 id="ia">IA y <span class="italic">autocompletado.</span></h2>
<p><strong>GitHub Copilot</strong> sigue siendo el estándar de autocompletado IA en VSCode. En 2026 incluye Copilot Chat integrado directamente en el editor, permite hacer preguntas sobre el código seleccionado y generar tests o documentación con un comando. El modelo subyacente mejoró significativamente: las sugerencias de código complejo son más acertadas y el chat entiende el contexto del workspace completo.</p>
<p><strong>Codeium</strong> es la alternativa gratuita más sólida. La calidad del autocompletado es comparable a Copilot para la mayoría de casos, y la extensión de VSCode incluye chat, búsqueda de código y explicaciones de funciones. Si estás empezando y no querés pagar $10/mes, Codeium es tu mejor opción.</p>

<h2 id="git">Git <span class="italic">integrado.</span></h2>
<p><strong>GitLens</strong> transforma la experiencia de Git en VSCode. Ver quién cambió cada línea con inline blame, explorar el historial de un archivo línea por línea, comparar branches visualmente: todo sin salir del editor. La versión gratuita incluye lo esencial. La versión Pro agrega visualizaciones de worktrees y merge conflicts más avanzadas.</p>
<p><strong>Git Graph</strong> es el complemento perfecto: muestra el historial de commits como un árbol visual interactivo. Hacer checkout, cherry-pick, rebase o comparar commits se vuelve visual e intuitivo. Especialmente útil cuando trabajás en repos con muchas branches activas.</p>

<h2 id="calidad">Calidad de <span class="italic">código.</span></h2>
<p><strong>ESLint</strong> y <strong>Prettier</strong> son no negociables para proyectos JavaScript/TypeScript. ESLint detecta errores y malas prácticas en tiempo real. Prettier formatea automáticamente al guardar. La configuración óptima: Prettier maneja el formateo, ESLint se ocupa de las reglas de calidad, y no se pelean entre sí gracias al plugin <code>eslint-config-prettier</code>.</p>
<p><strong>Error Lens</strong> muestra los errores y warnings directamente en la línea del código, sin tener que mirar el panel de problemas. Es una extensión pequeña con un impacto de productividad desproporcionado: ves el error exactamente donde está, no en una lista separada.</p>

<div class="pullquote">
  El mejor setup de VSCode no es el que tiene más extensiones. Es el que tiene exactamente las que necesitás y ninguna más.
</div>

<h2 id="productividad">Productividad <span class="italic">pura.</span></h2>
<p><strong>Auto Rename Tag</strong> renombra automáticamente el tag de cierre cuando modificás el de apertura en HTML/JSX. Parece trivial. Te salva docenas de errores por día. <strong>Path Intellisense</strong> autocompleta rutas de archivos cuando escribís imports: elimina los typos en rutas relativas que siempre aparecen en el momento más inoportuno.</p>
<p><strong>Thunder Client</strong> es un cliente REST integrado en VSCode, similar a Postman pero sin salir del editor. Podés testear tus APIs, guardar las requests organizadas, y compartir las colecciones via Git. Para proyectos donde constantemente estás desarrollando y testeando APIs, es un cambio de juego.</p>

<h2 id="temas">Tema y <span class="italic">fuente.</span></h2>
<p>El tema y la fuente impactan directamente en cuántas horas podés programar sin fatiga visual. <strong>One Dark Pro</strong> sigue siendo el tema oscuro más equilibrado para días largos frente al monitor. Para fuentes con ligaduras, <strong>JetBrains Mono</strong> o <strong>Fira Code</strong> hacen el código más legible, especialmente operadores como <code>=></code> y <code>!==</code>.</p>`,
    prev: { slug: 'que-es-docker', title: 'Qué es Docker y por qué todo developer debería aprenderlo', category: 'Tendencias', readTime: '11 min' },
    next: { slug: 'aprender-programacion-rapido', title: 'Cómo aprender programación más rápido', category: 'Productividad', readTime: '11 min' },
    relatedSlugs: ['aprender-programacion-rapido', 'productividad-para-programadores', 'setup-programacion-2026'],
  },

  {
    slug: 'aprender-programacion-rapido',
    title: 'Cómo aprender programación más rápido en 2026 — GaloDev',
    headline: 'Cómo aprender a programar más rápido en 2026.',
    lede: 'Tutorial hell, proyectos propios, consistencia y el rol de la IA en el aprendizaje. La diferencia entre aprender durante años y aplicar en semanas.',
    category: 'Productividad',
    readTime: '11 min',
    date: 'Sep 9, 2025',
    dateISO: '2025-09-09',
    issue: '04',
    coverClass: 'cover-4',
    coverOrn: '▲',
    excerpt: 'La mayoría aprende a programar de la forma más lenta posible. Acá está el método que funciona: proyectos reales, consistencia deliberada, y usar la IA como co-piloto, no como muleta.',
    toc: [
      { id: 'intro', label: 'El problema del aprendizaje' },
      { id: 'tutorial-hell', label: 'Tutorial hell' },
      { id: 'proyectos', label: 'Aprender con proyectos' },
      { id: 'roadmap', label: 'El roadmap correcto' },
      { id: 'consistencia', label: 'Consistencia deliberada' },
      { id: 'ia', label: 'La IA como acelerador' },
      { id: 'conclusion', label: 'El verdadero enemy' },
    ],
    content: `
<h2 id="intro">El problema del <span class="italic">aprendizaje.</span></h2>
<p>La mayoría de personas aprende a programar mal. No porque sean malas estudiantes, sino porque el ecosistema de recursos de programación está diseñado para que sigas consumiendo contenido, no para que apliques lo que aprendiste. El resultado: años de tutoriales, cursos y videos, con una incapacidad de resolver un problema real de forma independiente.</p>
<p>Aprender a programar rápido no es cuestión de memorizar más. Es cuestión de cambiar el método. El aprendizaje efectivo en programación tiene una sola regla: el tiempo escribiendo código real es infinitamente más valioso que el tiempo viendo a alguien más escribirlo.</p>

<div class="numbers-callout">
  <div><div class="n-label">Tiempo para primer trabajo</div><div class="n-num">6<span class="italic">-12m</span></div></div>
  <div><div class="n-label">Tutorial hell promedio</div><div class="n-num">2<span class="italic">+ años</span></div></div>
  <div><div class="n-label">Skills que importan</div><div class="n-num">~8</div></div>
</div>

<h2 id="tutorial-hell">Tutorial <span class="italic">hell.</span></h2>
<p>Tutorial hell es el estado de consumir tutoriales indefinidamente sin construir nada propio. Lo reconocés cuando terminás un curso de 40 horas, te sentís confiado, intentás hacer un proyecto desde cero, y de repente no sabés por dónde empezar. El tutorial te llevó de la mano por cada paso. Sin esa mano, el progreso se congela.</p>
<p>El problema no son los tutoriales en sí: son esenciales para aprender conceptos nuevos. El problema es usarlos como sustituto de la práctica real. Cada tutorial debería ser seguido de un proyecto propio que aplique lo aprendido sin copiar el código del tutorial. Si no podés hacer eso, no aprendiste: memorizaste.</p>

<h2 id="proyectos">Aprender con <span class="italic">proyectos.</span></h2>
<p>El método que funciona: aprendés el mínimo necesario para empezar un proyecto, luego construís el proyecto, y buscás más información solo cuando te bloqueás. Este ciclo de necesidad → búsqueda → aplicación graba el conocimiento de forma duradera porque tiene contexto real. No aprendés "qué es un array": aprendés "cómo usar un array para guardar los ítems del carrito de mi tienda".</p>
<p>Proyectos para cada etapa: si estás empezando, una lista de tareas. Si ya dominás lo básico, un clon simplificado de algo que usás (Spotify, Twitter, Trello). Si querés trabajo, un proyecto que resuelva un problema real tuyo o de alguien que conocés. Los proyectos reales son infinitamente más valiosos que los proyectos de tutorial para un portfolio.</p>
<ul>
  <li><strong>Nivel inicial:</strong> calculadora, lista de tareas, generador de contraseñas, quiz app</li>
  <li><strong>Nivel intermedio:</strong> app del clima, blog con CMS, dashboard con autenticación</li>
  <li><strong>Nivel avanzado:</strong> SaaS con pagos, API pública, herramienta que otros usen</li>
</ul>

<h2 id="roadmap">El roadmap <span class="italic">correcto.</span></h2>
<p>El error más común es aprender demasiadas cosas en paralelo. Recomendamos este orden para web development: HTML/CSS hasta poder hacer layouts responsive, JavaScript hasta entender async/await y manipulación del DOM, React o un framework frontend, Node.js o un backend básico, y una base de datos (PostgreSQL o MongoDB). Ese stack te da trabajo. Todo lo demás viene después.</p>
<p>No empieces TypeScript hasta que sepas JavaScript. No empieces React hasta que entiendas el DOM. No empieces con bases de datos hasta tener algo que guardar. El orden importa más que la velocidad.</p>

<div class="pullquote">
  Un proyecto propio mediocre vale más que diez tutoriales perfectos. Porque el proyecto te enseña a resolver problemas reales.
</div>

<h2 id="consistencia">Consistencia <span class="italic">deliberada.</span></h2>
<p>30 minutos al día, todos los días, supera a 8 horas los sábados. El aprendizaje de programación requiere que el cerebro procese y consolide en el sueño entre sesiones. La consistencia diaria acelera ese proceso. Lo que importa no es cuántas horas estudias por semana, sino cuántas semanas consecutivas estudiás algo.</p>

<h2 id="ia">La IA como <span class="italic">acelerador.</span></h2>
<p>Usar IA para aprender a programar en 2026 es casi trampa: podés pedir explicaciones personalizadas, generar ejercicios de práctica, revisar tu código, y desbloquear problemas en segundos. Pero hay una trampa: si le pedís a la IA que escriba el código por vos antes de intentarlo, no aprendés. Usá la IA para entender el error, no para evitar el proceso de resolverlo.</p>`,
    prev: { slug: 'mejores-extensiones-vscode-2026', title: 'Las mejores extensiones VSCode en 2026', category: 'Productividad', readTime: '9 min' },
    next: { slug: 'que-es-base64', title: 'Qué es Base64 y cuándo usarlo', category: 'Herramientas', readTime: '8 min' },
    relatedSlugs: ['productividad-para-programadores', 'trabajos-programacion-y-la-ia', 'herramientas-ia-para-programadores'],
  },

  {
    slug: 'que-es-base64',
    title: 'Qué es Base64 y cuándo usarlo — GaloDev',
    headline: 'Qué es Base64 y cuándo usarlo de verdad.',
    lede: 'Base64 aparece en APIs, tokens, imágenes embebidas y autenticación HTTP. Entendé qué es, cómo funciona, cuándo tiene sentido usarlo y cuándo no.',
    category: 'Herramientas',
    readTime: '8 min',
    date: 'Sep 16, 2025',
    dateISO: '2025-09-16',
    issue: '05',
    coverClass: 'cover-5',
    coverOrn: '#',
    excerpt: 'Base64 es codificación, no cifrado. Aparece en tokens JWT, imágenes en CSS, APIs REST y autenticación HTTP Basic. Aquí entendés exactamente qué hace y cuándo usarlo.',
    toc: [
      { id: 'intro', label: '¿Qué es Base64?' },
      { id: 'como-funciona', label: 'Cómo funciona' },
      { id: 'cuando-usarlo', label: 'Cuándo usarlo' },
      { id: 'ejemplos', label: 'Ejemplos reales' },
      { id: 'limitaciones', label: 'Limitaciones' },
      { id: 'herramienta', label: 'Probalo ahora' },
    ],
    content: `
<h2 id="intro">¿Qué es <span class="italic">Base64?</span></h2>
<p>Base64 es un esquema de codificación que convierte datos binarios en texto ASCII. Su único propósito es hacer que datos arbitrarios (que pueden incluir bytes con valores especiales) sean seguros para transmitir en canales diseñados para texto, como emails o URLs. No es cifrado, no es compresión, no agrega seguridad: solo convierte el formato.</p>
<p>El nombre viene de que usa un alfabeto de 64 caracteres: A-Z, a-z, 0-9, + y /. Cada carácter Base64 representa 6 bits de datos. En grupos de 3 bytes (24 bits) de datos originales se obtienen 4 caracteres Base64. Por eso Base64 siempre produce strings cuya longitud es múltiplo de 4, completando con = si es necesario.</p>

<div class="numbers-callout">
  <div><div class="n-label">Overhead de tamaño</div><div class="n-num">~33<span class="italic">%</span></div></div>
  <div><div class="n-label">Caracteres en el alfabeto</div><div class="n-num">64</div></div>
  <div><div class="n-label">Bytes → chars</div><div class="n-num">3→4</div></div>
</div>

<h2 id="como-funciona">Cómo <span class="italic">funciona.</span></h2>
<p>El proceso toma los bytes de los datos originales en grupos de 3 (24 bits), los divide en 4 grupos de 6 bits, y mapea cada grupo a un carácter del alfabeto Base64. Si los datos no son múltiplo de 3 bytes, se agrega padding con el carácter = para que el resultado tenga longitud múltiplo de 4.</p>
<p>Por ejemplo, la letra "M" en ASCII es el byte 77 (01001101 en binario). Para codificarla sola en Base64, se necesita padding porque es un solo byte: el resultado es "TQ==". Los dos == indican que se agregaron dos bytes de padding. Esto también explica por qué strings Base64 terminan en 0, 1 o 2 signos de igual.</p>

<h2 id="cuando-usarlo">Cuándo <span class="italic">usarlo.</span></h2>
<p>Los casos de uso legítimos de Base64 son específicos. <strong>Data URIs</strong> permiten embeber imágenes directamente en HTML o CSS sin una request HTTP adicional: <code>src="data:image/png;base64,iVBOR..."</code>. Útil para iconos pequeños o cuando querés evitar requests. <strong>HTTP Basic Auth</strong> codifica el usuario y contraseña en el header: <code>Authorization: Basic dXNlcjpwYXNz</code>.</p>
<p>Los <strong>tokens JWT</strong> usan Base64url (una variante que reemplaza + con - y / con _ para ser segura en URLs) para sus tres partes: header, payload y firma. Las <strong>APIs REST</strong> que transfieren archivos o datos binarios en JSON usan Base64 porque JSON no puede contener bytes arbitrarios. Los <strong>emails</strong> (protocolo SMTP) usan Base64 para adjuntos porque el protocolo original solo maneja texto ASCII.</p>
<ul>
  <li>Data URIs para imágenes pequeñas en HTML/CSS</li>
  <li>HTTP Basic Auth headers</li>
  <li>Tokens JWT (Base64url en header y payload)</li>
  <li>Adjuntos de email (MIME)</li>
  <li>Transferencia de datos binarios en JSON</li>
</ul>

<div class="pullquote">
  Base64 no cifra. No protege. Solo cambia el formato. Un string Base64 es tan legible como texto plano para quien sepa decodificarlo.
</div>

<h2 id="limitaciones">Limitaciones <span class="italic">importantes.</span></h2>
<p>El overhead del 33% de tamaño es real y significativo: una imagen de 100KB se convierte en una string de 133KB. Para imágenes grandes, siempre es mejor servirlas como archivos separados. Base64 tampoco es apropiado para datos sensibles: cualquiera puede decodificar una string Base64 al instante, no hay secreto alguno. Los "passwords en Base64" en el código son texto plano disfrazado.</p>

<h2 id="herramienta">Probalo <span class="italic">ahora.</span></h2>
<p>Si necesitás codificar o decodificar Base64, la herramienta <a href="/tools/base64">Base64 Tool de GaloDev</a> lo hace directamente en tu navegador, sin enviar nada a ningún servidor. Soporta texto plano, JSON y strings URL-safe. El botón de swap invierte el proceso con un clic.</p>`,
    prev: { slug: 'aprender-programacion-rapido', title: 'Cómo aprender programación más rápido', category: 'Productividad', readTime: '11 min' },
    next: { slug: 'que-es-regex', title: 'Qué es Regex y cómo aprenderlo fácil', category: 'Herramientas', readTime: '10 min' },
    relatedSlugs: ['que-es-jwt', 'que-es-regex', 'validar-y-formatear-json'],
  },

  {
    slug: 'que-es-regex',
    title: 'Qué es Regex y cómo aprenderlo fácil — GaloDev',
    headline: 'Qué es Regex y cómo aprenderlo de forma práctica.',
    lede: 'Las expresiones regulares dan miedo hasta que las entendés. Sintaxis, patrones comunes, flags y casos de uso reales. Todo con ejemplos que puedés testear ahora mismo.',
    category: 'Herramientas',
    readTime: '10 min',
    date: 'Oct 14, 2025',
    dateISO: '2025-10-14',
    issue: '06',
    coverClass: 'cover-1',
    coverOrn: '.*',
    excerpt: 'Regex es la herramienta de búsqueda y validación más poderosa que existe. Una vez que la entendés, la usás para validar emails, extraer datos de texto y parsear logs con una línea de código.',
    toc: [
      { id: 'intro', label: '¿Qué es Regex?' },
      { id: 'sintaxis', label: 'Sintaxis básica' },
      { id: 'cuantificadores', label: 'Cuantificadores' },
      { id: 'grupos', label: 'Grupos de captura' },
      { id: 'flags', label: 'Flags esenciales' },
      { id: 'ejemplos', label: 'Patrones reales' },
      { id: 'herramienta', label: 'Practicá ahora' },
    ],
    content: `
<h2 id="intro">¿Qué es <span class="italic">Regex?</span></h2>
<p>Regex (expresión regular) es un lenguaje de patrones para buscar, validar y extraer texto. En una sola línea de regex podés validar si un email es válido, extraer todos los números de un string, o reemplazar patrones complejos en texto. Es una habilidad que parece difícil desde afuera pero que tiene una lógica clara una vez que la rompés en partes.</p>
<p>Las expresiones regulares existen en prácticamente todos los lenguajes de programación: JavaScript, Python, Go, Ruby, PHP. La sintaxis tiene pequeñas variaciones entre lenguajes, pero los conceptos core son universales. Aprenderla una vez es aprenderla para siempre.</p>

<div class="numbers-callout">
  <div><div class="n-label">Metacaracteres básicos</div><div class="n-num">12</div></div>
  <div><div class="n-label">Lenguajes que la soportan</div><div class="n-num">todos</div></div>
  <div><div class="n-label">Tiempo para lo esencial</div><div class="n-num">~2<span class="italic">h</span></div></div>
</div>

<h2 id="sintaxis">Sintaxis <span class="italic">básica.</span></h2>
<p>Los caracteres literales coinciden con ellos mismos: <code>hola</code> encuentra "hola" en el texto. El punto <code>.</code> coincide con cualquier carácter excepto salto de línea. El acento circunflejo <code>^</code> ancla al inicio del string. El signo de dólar <code>$</code> ancla al final. Las clases de caracteres entre corchetes <code>[abc]</code> coinciden con cualquiera de los caracteres listados.</p>
<p>Las clases predefinidas aceleran mucho la escritura: <code>\\d</code> coincide con dígitos (equivalente a <code>[0-9]</code>), <code>\\w</code> con caracteres de palabra (letras, números, guión bajo), <code>\\s</code> con espacios en blanco. Sus versiones en mayúscula niegan la clase: <code>\\D</code> coincide con lo que NO es dígito.</p>
<ul>
  <li><code>.</code> — cualquier carácter</li>
  <li><code>\\d</code> — dígito [0-9]</li>
  <li><code>\\w</code> — carácter de palabra [a-zA-Z0-9_]</li>
  <li><code>\\s</code> — espacio en blanco</li>
  <li><code>[abc]</code> — a, b, o c</li>
  <li><code>[^abc]</code> — cualquier cosa excepto a, b, c</li>
</ul>

<h2 id="cuantificadores">Cuantificadores <span class="italic">y repetición.</span></h2>
<p>Los cuantificadores dicen cuántas veces puede repetirse un elemento: <code>*</code> significa cero o más veces, <code>+</code> una o más veces, <code>?</code> cero o una vez. Para un número exacto usás llaves: <code>{3}</code> exactamente 3, <code>{2,5}</code> entre 2 y 5. Por defecto los cuantificadores son greedy (toman lo máximo posible); agregar <code>?</code> los hace lazy (toman lo mínimo).</p>

<h2 id="grupos">Grupos de <span class="italic">captura.</span></h2>
<p>Los paréntesis crean grupos de captura que te permiten extraer partes del match. Si tenés la regex <code>(\\d{4})-(\\d{2})-(\\d{2})</code> contra "2026-05-16", el grupo 1 captura "2026", el grupo 2 "05", el grupo 3 "16". Los grupos con nombre <code>(?&lt;año&gt;\\d{4})</code> hacen el código más legible. Los grupos no capturadores <code>(?:patrón)</code> agrupan sin capturar.</p>

<div class="pullquote">
  Una regex bien escrita reemplaza 20 líneas de código de string manipulation. Aprender 2 horas de regex vale 10 años de productividad.
</div>

<h2 id="flags">Flags <span class="italic">esenciales.</span></h2>
<p>Las flags modifican el comportamiento de la regex. <code>g</code> (global) encuentra todas las coincidencias, no solo la primera. <code>i</code> (case-insensitive) ignora mayúsculas. <code>m</code> (multiline) hace que <code>^</code> y <code>$</code> coincidan al inicio y fin de cada línea. <code>s</code> (dotall) hace que el punto también coincida con saltos de línea.</p>

<h2 id="ejemplos">Patrones <span class="italic">reales.</span></h2>
<p>Email básico: <code>[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}</code>. URL: <code>https?://[^\\s]+</code>. Solo números: <code>^\\d+$</code>. Fecha YYYY-MM-DD: <code>^\\d{4}-\\d{2}-\\d{2}$</code>. Contraseña mínima (8 chars, 1 número, 1 mayúscula): <code>^(?=.*\\d)(?=.*[A-Z]).{8,}$</code>. Estos patrones son puntos de partida, no la regex perfecta para cada caso.</p>

<h2 id="herramienta">Practicá <span class="italic">ahora.</span></h2>
<p>La mejor forma de aprender regex es practicando con texto real. El <a href="/tools/regex-tester">Regex Tester de GaloDev</a> resalta las coincidencias en tiempo real, muestra los grupos de captura, incluye todos los flags, y tiene plantillas de patrones comunes listos para usar.</p>`,
    prev: { slug: 'que-es-base64', title: 'Qué es Base64 y cuándo usarlo', category: 'Herramientas', readTime: '8 min' },
    next: { slug: 'que-es-jwt', title: 'Qué es JWT y cómo funciona', category: 'Herramientas', readTime: '8 min' },
    relatedSlugs: ['que-es-jwt', 'que-es-base64', 'validar-y-formatear-json'],
  },

  {
    slug: 'que-es-jwt',
    title: 'Qué es JWT y cómo funciona — GaloDev',
    headline: 'Qué es JWT y cómo funciona la autenticación moderna.',
    lede: 'JSON Web Tokens son el estándar de autenticación en APIs REST modernas. Entendé la estructura, cómo se firman, qué son los claims, y por qué no debés guardar datos sensibles en el payload.',
    category: 'Herramientas',
    readTime: '8 min',
    date: 'Oct 21, 2025',
    dateISO: '2025-10-21',
    issue: '07',
    coverClass: 'cover-2',
    coverOrn: '⊕',
    excerpt: 'JWT es el estándar de autenticación en APIs modernas. Header, payload, firma: todo lo que necesitás saber para trabajar con tokens de forma segura.',
    toc: [
      { id: 'intro', label: '¿Qué es JWT?' },
      { id: 'estructura', label: 'Las tres partes' },
      { id: 'como-funciona', label: 'El flujo de auth' },
      { id: 'claims', label: 'Claims estándar' },
      { id: 'seguridad', label: 'Seguridad y errores' },
      { id: 'herramienta', label: 'Decodificá ahora' },
    ],
    content: `
<h2 id="intro">¿Qué es <span class="italic">JWT?</span></h2>
<p>JWT (JSON Web Token) es un estándar abierto (RFC 7519) para transmitir información entre partes de forma segura y verificable. Se usa principalmente para autenticación: el servidor genera un token cuando el usuario inicia sesión, y el cliente lo envía en cada request posterior. El servidor puede verificar la autenticidad del token sin consultar una base de datos.</p>
<p>A diferencia de las sesiones tradicionales donde el servidor mantiene estado, con JWT el estado está en el token mismo. El servidor solo necesita la clave secreta para verificar que el token es auténtico y no fue manipulado. Esto lo hace ideal para APIs stateless y arquitecturas distribuidas.</p>

<div class="numbers-callout">
  <div><div class="n-label">Partes de un JWT</div><div class="n-num">3</div></div>
  <div><div class="n-label">Separadas por</div><div class="n-num"><span class="italic">punto</span></div></div>
  <div><div class="n-label">Codificación</div><div class="n-num">Base64url</div></div>
</div>

<h2 id="estructura">Las tres <span class="italic">partes.</span></h2>
<p>Un JWT tiene el formato <code>header.payload.signature</code>, tres partes codificadas en Base64url separadas por puntos. El <strong>header</strong> es un JSON con el tipo de token (<code>"typ":"JWT"</code>) y el algoritmo de firma (<code>"alg":"HS256"</code>). El <strong>payload</strong> contiene los claims: datos sobre el usuario y el token. La <strong>signature</strong> es la verificación criptográfica que garantiza que el token no fue alterado.</p>
<p>La signature se calcula aplicando el algoritmo indicado en el header a <code>base64url(header) + "." + base64url(payload)</code> usando la clave secreta del servidor. Si alguien modifica cualquier parte del token, la firma no coincide y el servidor rechaza el token. Es una garantía de integridad, no de confidencialidad: el payload es legible por cualquiera.</p>

<h2 id="como-funciona">El flujo de <span class="italic">auth.</span></h2>
<p>El flujo típico: el usuario envía sus credenciales al servidor, el servidor las verifica contra la base de datos, y si son correctas genera un JWT firmado con su clave secreta y lo devuelve al cliente. El cliente guarda el token (idealmente en memoria o en una cookie httpOnly, no en localStorage) y lo envía en el header <code>Authorization: Bearer &lt;token&gt;</code> en cada request.</p>
<p>Cuando el servidor recibe una request con token, verifica la firma usando su clave secreta, comprueba que el token no está expirado (claim <code>exp</code>), y extrae los datos del payload para saber quién hace la request. Todo esto sin tocar la base de datos. El costo: si un token es comprometido antes de expirar, no podés invalidarlo sin implementar una blacklist.</p>

<h2 id="claims">Claims <span class="italic">estándar.</span></h2>
<p>Los claims son los campos del payload. Los claims registrados (estándar) más usados son: <code>sub</code> (subject, el ID del usuario), <code>exp</code> (expiration time, timestamp Unix de cuándo expira), <code>iat</code> (issued at, cuándo fue creado), <code>iss</code> (issuer, quién lo emitió) y <code>aud</code> (audience, para quién es). Los claims privados son los que definís vos: rol del usuario, permisos, datos adicionales.</p>

<div class="pullquote">
  El payload de un JWT es legible por cualquiera. Nunca guardes contraseñas, datos de tarjeta, ni información médica en él.
</div>

<h2 id="seguridad">Seguridad y <span class="italic">errores.</span></h2>
<p>El error más común es guardar el JWT en localStorage: es accesible desde JavaScript y vulnerable a ataques XSS. Mejor usar cookies httpOnly que el navegador gestiona y que el JavaScript del cliente no puede leer. El segundo error es usar el algoritmo "none" o confundir algoritmos simétricos (HS256, donde todos usan la misma clave) con asimétricos (RS256, con clave pública/privada). El tercero es hacer tokens que nunca expiran: siempre definí <code>exp</code>.</p>

<h2 id="herramienta">Decodificá <span class="italic">ahora.</span></h2>
<p>Si necesitás inspeccionar un JWT, el <a href="/tools/jwt-decoder">JWT Decoder de GaloDev</a> decodifica el header y payload, muestra las fechas de expiración en formato legible, y te indica si el token ya expiró. Todo en tu navegador, sin enviar el token a ningún servidor.</p>`,
    prev: { slug: 'que-es-regex', title: 'Qué es Regex y cómo aprenderlo fácil', category: 'Herramientas', readTime: '10 min' },
    next: { slug: 'seo-en-nextjs', title: 'Cómo optimizar SEO en Next.js', category: 'Web Dev', readTime: '11 min' },
    relatedSlugs: ['que-es-base64', 'que-es-regex', 'como-generar-passwords-seguras'],
  },

  {
    slug: 'seo-en-nextjs',
    title: 'Cómo optimizar SEO en Next.js — GaloDev',
    headline: 'Cómo optimizar el SEO de tu app Next.js desde cero.',
    lede: 'Metadata dinámica, sitemap automático, Open Graph, JSON-LD schema y performance. Todo lo que Next.js te da gratis para dominar los resultados de búsqueda.',
    category: 'Web Dev',
    readTime: '11 min',
    date: 'Oct 28, 2025',
    dateISO: '2025-10-28',
    issue: '08',
    coverClass: 'cover-3',
    coverOrn: '⬆',
    excerpt: 'Next.js tiene el mejor soporte SEO de cualquier framework React. Aquí está cómo aprovecharlo al máximo: metadata dinámica, sitemap, OG images, JSON-LD y más.',
    toc: [
      { id: 'intro', label: 'Por qué Next.js para SEO' },
      { id: 'metadata', label: 'Metadata dinámica' },
      { id: 'sitemap', label: 'Sitemap automático' },
      { id: 'og-images', label: 'Open Graph Images' },
      { id: 'schema', label: 'JSON-LD Schema' },
      { id: 'performance', label: 'Performance = SEO' },
      { id: 'indexacion', label: 'Verificar indexación' },
    ],
    content: `
<h2 id="intro">Por qué Next.js para <span class="italic">SEO.</span></h2>
<p>Next.js domina el SEO de aplicaciones React por una razón simple: el HTML llega al navegador (y a los crawlers de Google) ya renderizado en el servidor. Las aplicaciones React puras (SPA) muestran un HTML casi vacío hasta que JavaScript carga y ejecuta, lo que puede penalizar el crawling e indexación. Con Next.js y su App Router, el contenido está disponible desde el primer byte.</p>
<p>El App Router de Next.js 13+ introdujo un sistema de metadata declarativo que hace el manejo de títulos, descripciones, Open Graph y canonical URLs una API limpia en lugar del caos de tags manuales. Si venís de pages router o de otras soluciones, el cambio es enorme.</p>

<div class="numbers-callout">
  <div><div class="n-label">Core Web Vitals</div><div class="n-num">3</div></div>
  <div><div class="n-label">Factores de ranking</div><div class="n-num">200<span class="italic">+</span></div></div>
  <div><div class="n-label">% búsquedas con clic</div><div class="n-num">~30<span class="italic">%</span></div></div>
</div>

<h2 id="metadata">Metadata <span class="italic">dinámica.</span></h2>
<p>La forma más limpia de manejar metadata en App Router es con la función <code>generateMetadata</code>. Para páginas estáticas exportás un objeto <code>metadata</code>. Para páginas dinámicas (como artículos de blog o páginas de producto) usás <code>async function generateMetadata({ params })</code> que recibe los parámetros de la ruta y devuelve el objeto de metadata.</p>
<p>El objeto metadata acepta <code>title</code> (string o template con <code>template: '%s | Tu sitio'</code>), <code>description</code>, <code>openGraph</code>, <code>twitter</code>, <code>alternates.canonical</code>, y <code>robots</code>. Next.js genera automáticamente los tags correctos: <code>&lt;title&gt;</code>, <code>&lt;meta name="description"&gt;</code>, <code>&lt;meta property="og:*"&gt;</code>. Sin instalar nada, sin configuración adicional.</p>

<h2 id="sitemap">Sitemap <span class="italic">automático.</span></h2>
<p>Crear un <code>sitemap.xml</code> en Next.js App Router es tan simple como crear un archivo <code>app/sitemap.ts</code> que exporte una función default retornando un array de objetos con <code>url</code>, <code>lastModified</code>, <code>changeFrequency</code> y <code>priority</code>. Next.js genera el XML automáticamente en <code>/sitemap.xml</code>. Para sites con miles de páginas, Next.js soporta sitemaps múltiples con <code>generateSitemaps()</code>.</p>

<div class="pullquote">
  Un sitemap bien configurado no garantiza indexación, pero sí le dice a Google exactamente qué páginas existen y cuáles son prioritarias.
</div>

<h2 id="og-images">Open Graph <span class="italic">Images.</span></h2>
<p>Las imágenes Open Graph son las que aparecen cuando compartís un link en redes sociales o mensajería. Next.js App Router permite generarlas programáticamente con <code>app/opengraph-image.tsx</code>: un componente React que se renderiza a imagen PNG usando la API de Edge Runtime. Podés usar fuentes personalizadas, calcular texto dinámico, y cambiar el diseño según los params de la página.</p>
<p>Para artículos de blog o páginas de producto, una OG image dinámica que muestre el título, la categoría y tu branding aumenta significativamente el click-through rate en redes sociales. La diferencia entre un link con preview genérico y uno con imagen relevante puede ser del 40-60% en engagement.</p>

<h2 id="schema">JSON-LD <span class="italic">Schema.</span></h2>
<p>El structured data (JSON-LD) es la forma de decirle a Google de qué trata tu página en un lenguaje que entiende sin interpretar. Para artículos, el schema <code>Article</code> permite que Google muestre el autor, la fecha y la imagen en los resultados. Para herramientas, <code>WebApplication</code>. Para FAQs, <code>FAQPage</code>. Para negocios locales, <code>LocalBusiness</code>.</p>
<p>En Next.js lo implementás con un <code>&lt;script type="application/ld+json"&gt;</code> en el layout o page, usando <code>dangerouslySetInnerHTML</code> con el JSON serializado. Podés validar el schema con el Rich Results Test de Google para verificar que está correctamente implementado y si califica para rich results.</p>

<h2 id="performance">Performance <span class="italic">= SEO.</span></h2>
<p>Core Web Vitals son métricas de experiencia de usuario que Google usa como factor de ranking: LCP (Largest Contentful Paint), INP (Interaction to Next Paint) y CLS (Cumulative Layout Shift). Next.js ayuda con las tres: Image component optimiza imágenes automáticamente evitando CLS, el streaming mejora LCP, y la arquitectura RSC reduce el JavaScript que llega al cliente mejorando INP.</p>

<h2 id="indexacion">Verificar <span class="italic">indexación.</span></h2>
<p>Configurá Google Search Console desde el primer día: conectá tu dominio, envía el sitemap, y monitoreá el estado de indexación. El coverage report te muestra qué páginas fueron indexadas, cuáles tienen errores, y cuáles fueron excluidas. La herramienta de inspección de URL te permite ver exactamente cómo Google ve cada página tuya.</p>`,
    prev: { slug: 'que-es-jwt', title: 'Qué es JWT y cómo funciona', category: 'Herramientas', readTime: '8 min' },
    next: { slug: 'errores-comunes-en-nextjs', title: 'Los errores más comunes en Next.js', category: 'Web Dev', readTime: '9 min' },
    relatedSlugs: ['que-es-nextjs', 'desplegar-con-vercel', 'errores-comunes-en-nextjs'],
  },

  {
    slug: 'errores-comunes-en-nextjs',
    title: 'Los errores más comunes en Next.js y cómo resolverlos — GaloDev',
    headline: 'Los errores más comunes en Next.js y cómo resolverlos.',
    lede: 'Hydration errors, use client mal usado, fetch que falla en producción, imágenes sin optimizar. Los problemas que te van a encontrar y la solución directa para cada uno.',
    category: 'Web Dev',
    readTime: '9 min',
    date: 'Nov 4, 2025',
    dateISO: '2025-11-04',
    issue: '09',
    coverClass: 'cover-4',
    coverOrn: '⚠',
    excerpt: 'Hydration errors, use client en el lugar equivocado, fetch que rompe en producción. Los errores que todo developer comete en Next.js y la solución directa para cada uno.',
    toc: [
      { id: 'intro', label: 'Los errores que se repiten' },
      { id: 'hydration', label: 'Hydration errors' },
      { id: 'use-client', label: 'El abuso de use client' },
      { id: 'fetch', label: 'Fetch y caché' },
      { id: 'imagenes', label: 'Imágenes sin optimizar' },
      { id: 'routing', label: 'Routing y params' },
      { id: 'conclusion', label: 'El patrón común' },
    ],
    content: `
<h2 id="intro">Los errores que se <span class="italic">repiten.</span></h2>
<p>Next.js es poderoso pero tiene una curva de aprendizaje real, especialmente con el App Router. Los mismos errores aparecen una y otra vez en proyectos de developers que vienen de Create React App o de versiones anteriores de Next.js. Esta guía cubre los más frecuentes con la solución directa para cada uno.</p>

<div class="numbers-callout">
  <div><div class="n-label">Error #1</div><div class="n-num"><span class="italic">hydration</span></div></div>
  <div><div class="n-label">Causa más común</div><div class="n-num"><span class="italic">fechas</span></div></div>
  <div><div class="n-label">Solución más rápida</div><div class="n-num"><span class="italic">suppressHydrationWarning</span></div></div>
</div>

<h2 id="hydration">Hydration <span class="italic">errors.</span></h2>
<p>El hydration error aparece cuando el HTML renderizado en el servidor no coincide con lo que React intenta renderizar en el cliente. El mensaje típico: "Hydration failed because the initial UI does not match what was rendered on the server". Las causas más comunes: usar <code>new Date()</code> sin formateo consistente (el servidor puede estar en otra zona horaria), acceder a <code>window</code> o <code>localStorage</code> directamente en un componente server, o renderizar contenido basado en <code>Math.random()</code>.</p>
<p>La solución depende del caso: para fechas, usá una librería que formatee de forma consistente o asegurate de usar UTC. Para código que solo debe correr en el cliente, usá <code>useEffect</code> con <code>useState</code> para renderizar después del montaje. Para casos donde la diferencia es intencional e inofensiva (como timestamps en comentarios), <code>suppressHydrationWarning={true}</code> en el elemento específico.</p>

<h2 id="use-client">'use client' mal <span class="italic">usado.</span></h2>
<p>El error más conceptual: marcar componentes como <code>'use client'</code> innecesariamente. En App Router, los componentes son Server Components por defecto, lo que significa que se renderizan en el servidor y envían HTML puro al cliente. Solo necesitás <code>'use client'</code> cuando usás hooks de React (<code>useState</code>, <code>useEffect</code>, <code>useRef</code>), event handlers, o APIs del browser (<code>localStorage</code>, <code>window</code>).</p>
<p>Marcar <code>'use client'</code> innecesariamente no rompe nada, pero aumenta el JavaScript que se envía al cliente y elimina los beneficios de rendimiento de los Server Components. La estrategia correcta: empezá con Server Components y solo convertí a Client Component cuando sea necesario. Mové el estado hacia las hojas del árbol de componentes, no hacia la raíz.</p>

<div class="pullquote">
  'use client' no significa "este componente corre solo en el cliente". Significa "este componente puede usar APIs del browser". Sigue renderizándose en el servidor para el HTML inicial.
</div>

<h2 id="fetch">Fetch y <span class="italic">caché.</span></h2>
<p>Next.js extiende el <code>fetch</code> nativo con caché automático. Por defecto en Next.js 14+, el fetch en Server Components usa <code>cache: 'force-cache'</code> (siempre cachea). Si necesitás datos frescos, usás <code>{ cache: 'no-store' }</code> o <code>{ next: { revalidate: 60 } }</code> para ISR. El error común: asumir que el fetch en producción se comporta como en desarrollo. En dev, el caché está deshabilitado. En producción, el caché puede servirte datos viejos si no configuraste correctamente la revalidación.</p>

<h2 id="imagenes">Imágenes sin <span class="italic">optimizar.</span></h2>
<p>Usar <code>&lt;img&gt;</code> HTML directo en lugar del componente <code>&lt;Image&gt;</code> de Next.js es el error que más impacta en performance. El componente Image de Next.js optimiza automáticamente: convierte a WebP/AVIF, genera versiones para diferentes tamaños de pantalla, implementa lazy loading por defecto, y evita layout shift reservando el espacio. Para imágenes de fuentes externas, hay que agregar el dominio en <code>nextConfig.images.remotePatterns</code>.</p>

<h2 id="routing">Routing y <span class="italic">params.</span></h2>
<p>En el App Router de Next.js 14+, los params de rutas dinámicas son Promises: <code>const { slug } = await params</code>, no <code>const { slug } = params</code>. Este cambio en Next.js 15 rompió muchos proyectos al actualizar. También es común olvidar que <code>generateStaticParams</code> es necesario para que las rutas dinámicas se pre-generen en el build. Sin él, las páginas son server-rendered on demand, lo que puede causar tiempos de carga más lentos en cold start.</p>

<h2 id="conclusion">El patrón <span class="italic">común.</span></h2>
<p>La mayoría de estos errores comparten un origen: asumir que Next.js App Router se comporta como una SPA de React. No es así. Es un framework full-stack donde el servidor y el cliente tienen roles distintos, el caché es intencional y configurable, y los componentes tienen propiedades diferentes según dónde se renderizan. Entender ese modelo mental es la clave para dejar de pelear contra el framework.</p>`,
    prev: { slug: 'seo-en-nextjs', title: 'Cómo optimizar SEO en Next.js', category: 'Web Dev', readTime: '11 min' },
    next: { slug: 'desplegar-con-vercel', title: 'Cómo desplegar una app con Vercel', category: 'Web Dev', readTime: '9 min' },
    relatedSlugs: ['que-es-nextjs', 'seo-en-nextjs', 'react-vs-nextjs'],
  },

  {
    slug: 'desplegar-con-vercel',
    title: 'Cómo desplegar una app con Vercel — GaloDev',
    headline: 'Cómo desplegar tu app con Vercel: guía completa.',
    lede: 'Desde conectar tu repositorio hasta producción con dominio propio, variables de entorno y deploys automáticos en cada commit. Sin complicaciones.',
    category: 'Web Dev',
    readTime: '9 min',
    date: 'Nov 11, 2025',
    dateISO: '2025-11-11',
    issue: '10',
    coverClass: 'cover-5',
    coverOrn: '▲',
    excerpt: 'Vercel convierte un git push en un deploy automático. Aquí está todo lo que necesitás: conectar GitHub, configurar variables de entorno, añadir dominio y evitar los errores comunes.',
    toc: [
      { id: 'intro', label: '¿Por qué Vercel?' },
      { id: 'conectar', label: 'Conectar con GitHub' },
      { id: 'deploy', label: 'Tu primer deploy' },
      { id: 'env', label: 'Variables de entorno' },
      { id: 'dominio', label: 'Dominio personalizado' },
      { id: 'preview', label: 'Preview deployments' },
      { id: 'errores', label: 'Errores comunes' },
    ],
    content: `
<h2 id="intro">¿Por qué <span class="italic">Vercel?</span></h2>
<p>Vercel es la plataforma de deploy más popular para aplicaciones Next.js y el estándar de facto para frontend moderno. Su propuesta es simple: conectás tu repositorio, y cada vez que hacés push a la rama principal, Vercel hace el build y despliega automáticamente. En menos de 60 segundos tu cambio está en producción. Sin configurar servidores, sin gestionar infraestructura, sin CI/CD manual.</p>
<p>Vercel no es solo para Next.js: funciona con Astro, SvelteKit, Nuxt, Remix, Angular, y prácticamente cualquier framework moderno. La infraestructura edge distribuida en más de 100 regiones garantiza latencia mínima para usuarios globales.</p>

<div class="numbers-callout">
  <div><div class="n-label">Regiones edge</div><div class="n-num">100<span class="italic">+</span></div></div>
  <div><div class="n-label">Deploy promedio</div><div class="n-num">45<span class="italic">s</span></div></div>
  <div><div class="n-label">Plan gratis</div><div class="n-num">∞<span class="italic">proj</span></div></div>
</div>

<h2 id="conectar">Conectar con <span class="italic">GitHub.</span></h2>
<p>El primer paso es crear una cuenta en Vercel (gratis, sin tarjeta de crédito para el plan Hobby) y conectar tu proveedor de Git. Vercel soporta GitHub, GitLab y Bitbucket. Recomendamos acceso selectivo: solo dás permisos a los repos que querés deployar, no a toda tu cuenta. Una vez conectado, importás el proyecto seleccionando el repositorio de la lista.</p>

<h2 id="deploy">Tu primer <span class="italic">deploy.</span></h2>
<p>Vercel detecta automáticamente el framework y configura el build. Para Next.js, el comando de build es <code>next build</code> y el directorio de salida es <code>.next</code>. No necesitás cambiar nada. Para otros frameworks, puede que tengas que especificar el directorio de output. Después de hacer clic en "Deploy", ves el log del build en tiempo real y en menos de un minuto tenés una URL del tipo <code>tu-proyecto.vercel.app</code>.</p>

<div class="pullquote">
  Cada <code>git push</code> a main es un deploy. Si el build falla, Vercel te avisa por email y mantiene la versión anterior activa.
</div>

<h2 id="env">Variables de <span class="italic">entorno.</span></h2>
<p>Las variables de entorno en Vercel se configuran en <strong>Settings → Environment Variables</strong>. Podés definirlas para tres entornos: Production (solo la rama principal), Preview (todas las ramas de feature), y Development (para bajarlas con <code>vercel env pull</code>). Las variables con prefijo <code>NEXT_PUBLIC_</code> se exponen al browser. Nunca pongas secretos con ese prefijo.</p>
<p>Un truco útil: Vercel permite vincular proyectos de Supabase, PlanetScale, Upstash u otros servicios directamente desde la interfaz. Las variables de entorno se agregan automáticamente a tu proyecto. Cuando el servicio externo cambia las credenciales, se actualizan en Vercel también.</p>

<h2 id="dominio">Dominio <span class="italic">personalizado.</span></h2>
<p>En <strong>Settings → Domains</strong>, agregás tu dominio y Vercel te indica exactamente qué registros DNS configurar. Para un dominio raíz (galodev.com), un registro A o ALIAS apuntando a Vercel. Para un subdominio (www.galodev.com), un CNAME. El SSL/TLS es automático vía Let's Encrypt. El tiempo de propagación de DNS varía entre 5 minutos y 48 horas según el TTL de tu proveedor.</p>

<h2 id="preview">Preview <span class="italic">deployments.</span></h2>
<p>Una feature subestimada: cada branch y cada Pull Request en GitHub genera automáticamente un preview deployment con su propia URL única. Podés compartir el link con el equipo para revisar cambios antes de mergear a producción. Es especialmente útil para feedback de diseño o QA. Los preview deployments tienen sus propias variables de entorno (el conjunto Preview que configuraste).</p>

<h2 id="errores">Errores <span class="italic">comunes.</span></h2>
<p>El build falla por variables de entorno faltantes: asegurate de que todas las variables que usás en el build (no solo en runtime) estén configuradas en Vercel. Las funciones serverless tienen un límite de 10 segundos en el plan Hobby (30 en Pro): si tu API tarda más, van a hacer timeout. El tamaño del bundle: Vercel tiene un límite de 50MB por función serverless. Si tenés dependencias pesadas, revisá si podés moverlas a edge functions o eliminarlas.</p>`,
    prev: { slug: 'errores-comunes-en-nextjs', title: 'Los errores más comunes en Next.js', category: 'Web Dev', readTime: '9 min' },
    next: { slug: 'que-es-nextjs', title: 'Qué es Next.js y por qué domina el desarrollo web', category: 'Web Dev', readTime: '11 min' },
    relatedSlugs: ['que-es-nextjs', 'seo-en-nextjs', 'git-y-github-para-developers'],
  },

  {
    slug: 'que-es-nextjs',
    title: 'Qué es Next.js y por qué domina el desarrollo web — GaloDev',
    headline: 'Qué es Next.js y por qué domina el desarrollo web moderno.',
    lede: 'SSR, SSG, App Router, Server Components, performance y SEO. Todo lo que hace de Next.js el framework de referencia para proyectos web serios en 2026.',
    category: 'Web Dev',
    readTime: '11 min',
    date: 'Dic 2, 2025',
    dateISO: '2025-12-02',
    issue: '11',
    coverClass: 'cover-1',
    coverOrn: '▲',
    excerpt: 'Next.js es el framework React más popular por razones concretas: SEO nativo, performance de clase mundial, y una arquitectura que escala. Aquí entendés por qué.',
    toc: [
      { id: 'intro', label: '¿Qué es Next.js?' },
      { id: 'ssr', label: 'SSR y SSG' },
      { id: 'app-router', label: 'App Router' },
      { id: 'server-components', label: 'Server Components' },
      { id: 'performance', label: 'Performance' },
      { id: 'react-vs-next', label: 'React vs Next.js' },
    ],
    content: `
<h2 id="intro">¿Qué es <span class="italic">Next.js?</span></h2>
<p>Next.js es un framework de React creado por Vercel que agrega todo lo que React no tiene por defecto: routing, renderizado en el servidor, optimización de imágenes, manejo de fuentes, generación de páginas estáticas, API routes y más. React es una librería de UI. Next.js es el framework completo que construís encima de ella para hacer un producto real.</p>
<p>Desde su versión 13 con el App Router, Next.js se convirtió en algo más: un framework full-stack que corre en el edge, con React Server Components que permiten eliminar JavaScript del cliente selectivamente, y una arquitectura que genera HTML en el servidor sin sacrificar la interactividad de React.</p>

<div class="numbers-callout">
  <div><div class="n-label">Descargas semanales NPM</div><div class="n-num">9<span class="italic">M+</span></div></div>
  <div><div class="n-label">% del top 10k webs</div><div class="n-num">~8<span class="italic">%</span></div></div>
  <div><div class="n-label">Versión actual</div><div class="n-num">15<span class="italic">.x</span></div></div>
</div>

<h2 id="ssr">SSR y <span class="italic">SSG.</span></h2>
<p>El rendering define cuándo y dónde se genera el HTML de tu página. Next.js soporta tres estrategias principales. <strong>SSG (Static Site Generation)</strong>: el HTML se genera en el build y se sirve como archivo estático. Ideal para contenido que no cambia frecuentemente: blogs, documentación, landing pages. Velocidad máxima. <strong>SSR (Server-Side Rendering)</strong>: el HTML se genera en el servidor en cada request. Ideal para contenido dinámico que depende del usuario o de datos en tiempo real.</p>
<p><strong>ISR (Incremental Static Regeneration)</strong> combina lo mejor de ambos: páginas estáticas que se regeneran en background cada N segundos. Un e-commerce puede tener páginas de producto estáticas que se actualizan cada hora sin necesidad de rebuilds completos. Esta estrategia es uno de los diferenciadores más poderosos de Next.js respecto a otros frameworks.</p>

<h2 id="app-router">App <span class="italic">Router.</span></h2>
<p>El App Router (introducido en Next.js 13, estable desde la 14) es la evolución del sistema de routing de Next.js. En lugar de un directorio <code>pages/</code>, el routing se basa en la estructura de carpetas dentro de <code>app/</code>. Cada carpeta puede tener un <code>page.tsx</code> (la página), <code>layout.tsx</code> (el layout que persiste entre navegaciones), <code>loading.tsx</code> (skeleton mientras carga), <code>error.tsx</code> (manejo de errores), y <code>not-found.tsx</code>.</p>
<p>Los route groups con <code>(nombre)</code> permiten organizar rutas sin afectar la URL. Los layouts anidados eliminan la duplicación de headers y footers. Parallel routes y intercepting routes permiten patrones de UI complejos como modals que se abren en la URL actual.</p>

<h2 id="server-components">Server <span class="italic">Components.</span></h2>
<p>React Server Components es la innovación más grande de los últimos años en el ecosistema React. Los componentes que no necesitan interactividad se renderizan completamente en el servidor: traen sus propios datos, generan HTML, y no envían JavaScript al cliente. El resultado: menos JavaScript, carga inicial más rápida, y acceso directo a bases de datos y servicios internos sin pasar por una API.</p>
<p>La regla simple: si el componente no usa <code>useState</code>, <code>useEffect</code> o event handlers, es un Server Component. Si necesita interactividad, es un Client Component y lleva <code>'use client'</code>. Los Server Components pueden importar Client Components, pero no al revés.</p>

<div class="pullquote">
  Next.js no es "React con más cosas". Es una arquitectura completa donde el servidor y el cliente colaboran de forma coordinada.
</div>

<h2 id="performance">Performance <span class="italic">incluida.</span></h2>
<p>Next.js incluye optimización automática en múltiples niveles. El componente <code>Image</code> convierte a WebP/AVIF, genera srcsets para diferentes resoluciones, implementa lazy loading, y reserva el espacio para evitar layout shift. El componente <code>Font</code> de <code>next/font</code> autoprefetcha y self-hostea fuentes de Google eliminando requests externas. El <code>Script</code> component maneja la estrategia de carga de JavaScript de terceros.</p>

<h2 id="react-vs-next">React vs <span class="italic">Next.js.</span></h2>
<p>La pregunta que siempre aparece: ¿cuándo uso solo React y cuándo uso Next.js? La respuesta corta: si estás haciendo una web que necesita ser indexada por buscadores, o que tiene más de 2-3 páginas, usá Next.js. Si estás haciendo una app interna detrás de login donde el SEO no importa, o una aplicación de dashboard muy interactiva, una SPA de React puede ser suficiente. En la práctica, el 90% de los proyectos se benefician de Next.js.</p>`,
    prev: { slug: 'desplegar-con-vercel', title: 'Cómo desplegar una app con Vercel', category: 'Web Dev', readTime: '9 min' },
    next: { slug: 'trabajos-programacion-y-la-ia', title: 'Qué trabajos de programación sobrevivirán a la IA', category: 'IA & Desarrollo', readTime: '10 min' },
    relatedSlugs: ['react-vs-nextjs', 'seo-en-nextjs', 'desplegar-con-vercel'],
  },

  {
    slug: 'trabajos-programacion-y-la-ia',
    title: 'Qué trabajos de programación sobrevivirán a la IA — GaloDev',
    headline: '¿Qué trabajos de programación sobrevivirán a la IA?',
    lede: 'La IA no va a reemplazar a los developers. Va a cambiar qué parte del trabajo hacen los developers. La pregunta correcta no es si sobrevivirás, es cómo adaptarte.',
    category: 'IA & Desarrollo',
    readTime: '10 min',
    date: 'Dic 9, 2025',
    dateISO: '2025-12-09',
    issue: '12',
    coverClass: 'cover-2',
    coverOrn: '◆',
    excerpt: 'La IA automatiza código repetitivo. Pero el trabajo de software va mucho más allá de escribir código. Qué habilidades te hacen irremplazable en la era de la IA.',
    toc: [
      { id: 'intro', label: 'El contexto real' },
      { id: 'automatizacion', label: 'Qué sí se automatiza' },
      { id: 'frontend', label: 'Frontend en la era IA' },
      { id: 'backend', label: 'Backend y sistemas' },
      { id: 'ai-engineers', label: 'AI Engineers' },
      { id: 'soft-skills', label: 'Las habilidades que importan' },
      { id: 'conclusion', label: 'La verdad incómoda' },
    ],
    content: `
<h2 id="intro">El contexto <span class="italic">real.</span></h2>
<p>La conversación sobre "la IA va a reemplazar a los developers" mezcla dos cosas distintas: la automatización de tareas específicas de programación (que ya está pasando) y el reemplazo de developers como profesión (que es mucho más complejo). Las herramientas de IA como Cursor, GitHub Copilot y Claude hacen que escribir código sea más rápido. No hacen que construir software sea más fácil.</p>
<p>Construir software es entender requerimientos ambiguos, tomar decisiones de arquitectura con información incompleta, debuggear sistemas complejos donde la documentación está incompleta, y colaborar con personas que tienen distintas perspectivas. Esas habilidades no se automatizan con un prompt.</p>

<div class="numbers-callout">
  <div><div class="n-label">Tareas automatizables</div><div class="n-num">~30<span class="italic">%</span></div></div>
  <div><div class="n-label">Demanda dev global</div><div class="n-num">+25<span class="italic">%</span></div></div>
  <div><div class="n-label">Skills que escasean</div><div class="n-num">criterio</div></div>
</div>

<h2 id="automatizacion">Qué sí se <span class="italic">automatiza.</span></h2>
<p>Las tareas más en riesgo de automatización son las más mecánicas: escribir código boilerplate, traducir requerimientos claros a código simple, hacer tests unitarios de funciones bien definidas, convertir diseños de Figma en componentes HTML/CSS básicos, documentar funciones existentes. Si una tarea puede ser completamente especificada en texto, probablemente la IA puede hacerla.</p>
<p>Esto no significa que los developers que hacían esas tareas sean innecesarios: significa que ahora pueden hacer más en menos tiempo. Un developer que antes tardaba 2 horas en escribir el boilerplate de una feature ahora tarda 20 minutos. Tiene 100 minutos más para trabajar en la parte que requiere juicio real.</p>

<h2 id="frontend">Frontend en la <span class="italic">era IA.</span></h2>
<p>El frontend es el área donde la IA ha avanzado más: generar componentes React, crear layouts CSS, adaptar diseños a móvil. Pero el frontend de 2026 requiere mucho más que traducir Figma a código: experiencia de usuario real, accesibilidad, performance en dispositivos de gama baja, internacionalización, estado global complejo. La IA puede escribir un componente. No puede decidir si ese componente debería existir, ni cómo debería comportarse en edge cases.</p>

<h2 id="backend">Backend y <span class="italic">sistemas.</span></h2>
<p>Backend, infraestructura y sistemas distribuidos son donde la IA tiene menos impacto en el corto plazo. Diseñar una arquitectura que escale, optimizar queries en una base de datos con millones de registros, debuggear un race condition en un sistema distribuido: estas habilidades requieren años de experiencia y comprensión profunda de sistemas. La IA puede ayudarte a escribir el código, pero no puede reemplazar el juicio.</p>

<div class="pullquote">
  La IA no compite con el developer que sabe por qué funciona algo. Compite con el que solo sabe cómo hacer que funcione.
</div>

<h2 id="ai-engineers">AI <span class="italic">Engineers.</span></h2>
<p>El rol que más está creciendo: AI Engineers. Developers que saben construir productos inteligentes: integrar LLMs via API, diseñar sistemas de RAG (Retrieval-Augmented Generation), construir pipelines de procesamiento de datos para IA, evaluar y mejorar la calidad de respuestas de modelos. No es data science clásico: es ingeniería de software con IA como componente central.</p>

<h2 id="soft-skills">Las habilidades que <span class="italic">importan.</span></h2>
<p>En la era de la IA, las habilidades más valiosas son las que más se alejan de la escritura de código: diseño de sistemas, comunicación con stakeholders no técnicos, estimación y gestión de complejidad, toma de decisiones con información incompleta, y la capacidad de evaluar si la solución de la IA realmente resuelve el problema. Nadie va a contratar a un developer que solo sabe pedirle a la IA que escriba código.</p>

<h2 id="conclusion">La verdad <span class="italic">incómoda.</span></h2>
<p>Los developers que van a tener problemas no son los que usan IA: son los que no la usan. Y los que van a prosperar no son solo los que la usan mejor: son los que combinan el uso de IA con criterio técnico real, curiosidad genuina, y la capacidad de construir productos que resuelven problemas reales. La IA es la palanca más poderosa que han tenido los developers. Como cualquier palanca, amplifica lo que ya tenías.</p>`,
    prev: { slug: 'que-es-nextjs', title: 'Qué es Next.js y por qué domina el desarrollo web', category: 'Web Dev', readTime: '11 min' },
    next: { slug: 'herramientas-ia-para-programadores', title: 'Las mejores herramientas IA para programadores', category: 'IA & Desarrollo', readTime: '10 min' },
    relatedSlugs: ['herramientas-ia-para-programadores', 'programar-mas-rapido-con-ia', 'chatgpt-vs-claude-vs-gemini'],
  },

  {
    slug: 'herramientas-ia-para-programadores',
    title: 'Las mejores herramientas IA para programadores en 2026 — GaloDev',
    headline: 'Las mejores herramientas IA para programadores en 2026.',
    lede: 'Cursor, Claude, GitHub Copilot, Windsurf, Bolt. Cada una tiene un caso de uso donde brilla. Aquí está el mapa completo para elegir sin perder tiempo.',
    category: 'IA & Desarrollo',
    readTime: '10 min',
    date: 'Dic 16, 2025',
    dateISO: '2025-12-16',
    issue: '13',
    coverClass: 'cover-3',
    coverOrn: '⚡',
    excerpt: 'Cursor, Claude, Copilot, Windsurf, Bolt. El ecosistema de herramientas IA para developers explotó en 2025. Aquí está cuándo usar cada una y cuál combinar.',
    toc: [
      { id: 'intro', label: 'El ecosistema en 2026' },
      { id: 'cursor', label: 'Cursor' },
      { id: 'claude', label: 'Claude Code' },
      { id: 'copilot', label: 'GitHub Copilot' },
      { id: 'windsurf', label: 'Windsurf' },
      { id: 'bolt', label: 'Bolt y v0' },
      { id: 'cuando-usar', label: 'Cuándo usar cada una' },
    ],
    content: `
<h2 id="intro">El ecosistema en <span class="italic">2026.</span></h2>
<p>En 2023 había una herramienta IA para developers: GitHub Copilot. En 2026 hay un ecosistema completo con herramientas especializadas para cada tipo de tarea. El riesgo: paralysis by analysis. El beneficio: si elegís bien, podés multiplicar tu productividad de forma real. Esta guía te ayuda a entender qué hace cada herramienta bien, y cuándo usarla.</p>

<div class="numbers-callout">
  <div><div class="n-label">Herramientas principales</div><div class="n-num">6<span class="italic">+</span></div></div>
  <div><div class="n-label">Costo mensual promedio</div><div class="n-num">$20<span class="italic">c/u</span></div></div>
  <div><div class="n-label">ROI estimado</div><div class="n-num">3<span class="italic">-5×</span></div></div>
</div>

<h2 id="cursor">Cursor — el editor <span class="italic">IA-first.</span></h2>
<p>Cursor es un fork de VSCode construido alrededor de la IA desde cero. La diferencia con Copilot: Cursor puede ver y modificar múltiples archivos a la vez, entender el contexto del proyecto completo (@codebase), y hacer cambios complejos con un prompt. El modo Composer permite describir una feature completa y que Cursor la implemente en múltiples archivos coordinados.</p>
<p>Cursor es la mejor opción cuando necesitás refactoring complejo, implementar features que tocan varios archivos, o migrar código entre patterns. El precio es $20/mes para el plan Pro, que incluye modelos GPT-4o y Claude Sonnet con uso razonable.</p>

<h2 id="claude">Claude Code — terminal <span class="italic">IA.</span></h2>
<p>Claude Code es el CLI de Anthropic que corre directamente en tu terminal y puede leer, escribir y ejecutar código en tu proyecto. La diferencia clave: accede a tu filesystem completo, puede correr comandos, y razona de forma profunda sobre problemas de arquitectura. Es especialmente potente para tareas de investigación de código ("¿por qué este bug aparece solo en producción?"), refactoring con criterio, y trabajo en codebases grandes que requieren entender múltiples archivos antes de cambiar algo.</p>

<h2 id="copilot">GitHub Copilot — el <span class="italic">estándar.</span></h2>
<p>Copilot sigue siendo la opción con mejor integración en el ecosistema de GitHub: code review con IA, sugerencias dentro del PR, autocompletado en el editor, y chat contextual. Si tu empresa ya usa GitHub, la integración nativa hace que Copilot sea la opción por defecto. Para developers individuales, la nueva extensión de Copilot para VS Code mejoró significativamente con modelos Claude y GPT-4o disponibles.</p>

<h2 id="windsurf">Windsurf — agente <span class="italic">autónomo.</span></h2>
<p>Windsurf de Codeium toma el concepto de editor IA un paso más allá con Cascade: un agente que puede trabajar de forma más autónoma, planificando y ejecutando tareas multipasos con menos intervención del developer. Para proyectos donde querés delegar más la implementación y supervisar el resultado, Windsurf es la competencia directa de Cursor. La versión gratuita es bastante generosa.</p>

<div class="pullquote">
  La combinación más productiva en 2026: Cursor para el código del día a día, Claude para problemas complejos de razonamiento, Bolt para prototipos rápidos de UI.
</div>

<h2 id="bolt">Bolt y <span class="italic">v0.</span></h2>
<p>Bolt (de StackBlitz) y v0 (de Vercel) son herramientas de prototipado IA: describís una UI o una app completa en texto, y obtenés código funcional en segundos. Son perfectas para validar ideas rápidamente o para mostrarle a un cliente cómo podría verse algo. El código generado no siempre es de producción, pero es un punto de partida sólido. v0 está especialmente optimizado para componentes React y shadcn/ui.</p>

<h2 id="cuando-usar">Cuándo usar <span class="italic">cada una.</span></h2>
<ul>
  <li><strong>Cursor / Windsurf</strong> — trabajo diario de coding, features nuevas, refactoring</li>
  <li><strong>Claude Code</strong> — debugging profundo, arquitectura, comprensión de codebases grandes</li>
  <li><strong>GitHub Copilot</strong> — si tu empresa ya usa GitHub o querés la integración más fluida</li>
  <li><strong>Bolt / v0</strong> — prototipos rápidos, demos de UI, validación de ideas</li>
  <li><strong>ChatGPT / Claude web</strong> — consultas generales, explicaciones, documentación</li>
</ul>`,
    prev: { slug: 'trabajos-programacion-y-la-ia', title: '¿Qué trabajos de programación sobrevivirán a la IA?', category: 'IA & Desarrollo', readTime: '10 min' },
    next: { slug: 'programar-mas-rapido-con-ia', title: 'Cómo programar más rápido con IA', category: 'IA & Desarrollo', readTime: '9 min' },
    relatedSlugs: ['chatgpt-vs-claude-vs-gemini', 'programar-mas-rapido-con-ia', 'trabajos-programacion-y-la-ia'],
  },

  {
    slug: 'programar-mas-rapido-con-ia',
    title: 'Cómo programar más rápido con IA — GaloDev',
    headline: 'Cómo programar más rápido con IA en 2026.',
    lede: 'La IA te puede hacer 2-3× más productivo o puede ser una distracción cara. La diferencia está en cómo la usás. Estos son los patrones que funcionan de verdad.',
    category: 'IA & Desarrollo',
    readTime: '9 min',
    date: 'Dic 23, 2025',
    dateISO: '2025-12-23',
    issue: '14',
    coverClass: 'cover-4',
    coverOrn: '⚡',
    image: '/blog/programar-mas-rapido-con-ia.jpg',
    excerpt: 'Debugging con IA, generación de boilerplate, documentación automática, prompts que funcionan y los errores que cuestan tiempo. Todo lo que necesitás para usar IA de verdad.',
    toc: [
      { id: 'intro', label: 'El uso honesto de IA' },
      { id: 'debugging', label: 'Debugging con IA' },
      { id: 'boilerplate', label: 'Boilerplate y scaffolding' },
      { id: 'documentacion', label: 'Documentación automática' },
      { id: 'prompts', label: 'Prompts que funcionan' },
      { id: 'errores', label: 'Los errores de IA que cuestan' },
      { id: 'conclusion', label: 'El límite real' },
    ],
    content: `
<h2 id="intro">El uso honesto de <span class="italic">IA.</span></h2>
<p>La mayoría de developers usa la IA de una de dos formas incorrectas: o la ignoran completamente ("no necesito ayuda de una máquina") o la usan para que escriba todo el código sin entenderlo ("copié lo que dio la IA y funcionó"). Ninguna de las dos maximiza el valor. El uso correcto es colaborativo: vos aportas el contexto, el criterio y la validación; la IA aporta velocidad y exploración de alternativas.</p>

<div class="numbers-callout">
  <div><div class="n-label">Aumento de productividad</div><div class="n-num">2<span class="italic">-3×</span></div></div>
  <div><div class="n-label">Con el método correcto</div><div class="n-num">hasta 5<span class="italic">×</span></div></div>
  <div><div class="n-label">Sin criterio propio</div><div class="n-num">0<span class="italic">×</span></div></div>
</div>

<h2 id="debugging">Debugging <span class="italic">con IA.</span></h2>
<p>El debugging es donde la IA tiene más impacto inmediato. El patrón que funciona: en lugar de pasarle solo el error, pasale el error + el código relevante + lo que ya intentaste + el contexto del sistema. Cuanto más contexto, mejor el diagnóstico. Un prompt como "este error aparece solo en producción, aquí está el código, aquí el error completo, ya verifiqué que las variables de entorno están correctas" da diagnósticos infinitamente mejores que solo pegar el stack trace.</p>
<p>La IA es especialmente buena en errores de patrones conocidos: hydration errors de React, race conditions típicos, errores de CORS, problemas de TypeScript. Para bugs de lógica de negocio específica de tu dominio, la IA puede plantear hipótesis pero la validación sigue siendo tuya.</p>

<h2 id="boilerplate">Boilerplate y <span class="italic">scaffolding.</span></h2>
<p>Generar código repetitivo es la tarea más directa para la IA: un CRUD completo para un modelo dado, los tipos TypeScript de una API dada la documentación, los tests unitarios de una función existente, los componentes de un formulario dado el schema de validación. Esto es donde la IA realmente libera tiempo: tareas que antes tomaban 1-2 horas ahora toman 10-15 minutos de revisión y ajuste.</p>
<p>El truco: no le pidas "escribí el código". Describí el contexto completo: el lenguaje, el framework, las convenciones del proyecto, qué existe ya y qué necesitás nuevo. El boilerplate de la IA que encaja en tu proyecto existente es mucho más útil que el código genérico que luego tenés que adaptar.</p>

<div class="pullquote">
  La IA escribe código rápido. Vos validás que ese código sea correcto. Esa división de roles es la clave de la productividad real.
</div>

<h2 id="documentacion">Documentación <span class="italic">automática.</span></h2>
<p>Documentar código es la tarea que más se posterga y donde la IA más ayuda sin riesgo. Pasale una función sin documentar y pedile que escriba el JSDoc/docstring. Pasale un componente React y pedile que explique sus props. Pasale un módulo completo y pedile que genere el README. La documentación generada por IA es un excelente punto de partida que podés refinar, no una solución perfecta que usás tal cual.</p>

<h2 id="prompts">Prompts que <span class="italic">funcionan.</span></h2>
<p>La calidad del prompt determina la calidad del resultado. Los mejores prompts para código tienen cuatro componentes: <strong>Rol</strong> (Actúa como un developer senior de TypeScript), <strong>Contexto</strong> (Estoy trabajando en una app Next.js con Supabase, el modelo User tiene estos campos...), <strong>Tarea específica</strong> (Escribí una función que...), y <strong>Restricciones</strong> (Usá el cliente de Supabase que ya está inicializado, sin dependencias adicionales, con manejo de errores).</p>

<h2 id="errores">Los errores de IA que <span class="italic">cuestan.</span></h2>
<p>La IA alucina librerías que no existen, APIs que cambiaron, configuraciones que no aplican a tu versión. El error más caro: aceptar código que "parece correcto" sin validarlo. Siempre revisá que las importaciones existan, que las APIs sean actuales, y que la lógica tenga sentido antes de mergear. Corregir un bug introducido por código de IA aceptado a ciegas puede costar más tiempo que haberlo escrito desde cero.</p>

<h2 id="conclusion">El límite <span class="italic">real.</span></h2>
<p>La IA no reemplaza entender lo que estás construyendo. Si no entendés la arquitectura de tu sistema, la IA va a generar código que funciona localmente y rompe en producción. Si no entendés los requerimientos, la IA va a implementar exactamente lo que pediste, no lo que necesitabas. La IA amplifica tu capacidad. No la reemplaza.</p>`,
    prev: { slug: 'herramientas-ia-para-programadores', title: 'Las mejores herramientas IA para programadores', category: 'IA & Desarrollo', readTime: '10 min' },
    next: { slug: 'chatgpt-vs-claude-vs-gemini', title: 'ChatGPT vs Claude vs Gemini — ¿Cuál usar en 2026?', category: 'IA & Desarrollo', readTime: '10 min' },
    relatedSlugs: ['chatgpt-vs-claude-vs-gemini', 'herramientas-ia-para-programadores', 'mejores-prompts-para-developers'],
  },

  {
    slug: 'chatgpt-vs-claude-vs-gemini',
    title: 'ChatGPT vs Claude vs Gemini — ¿Cuál usar en 2026? — GaloDev',
    headline: 'ChatGPT vs Claude vs Gemini — ¿cuál usar en 2026?',
    lede: 'Tres IAs, tres filosofías distintas. Comparamos ChatGPT, Claude y Gemini en coding, razonamiento, velocidad y costo para que elijas la que realmente te hace más productivo.',
    category: 'IA & Desarrollo',
    readTime: '10 min',
    date: 'Ene 6, 2026',
    dateISO: '2026-01-06',
    issue: '15',
    coverClass: 'cover-5',
    coverOrn: '▲',
    image: '/blog/chatgpt-vs-claude-vs-gemini.jpg',
    excerpt: 'ChatGPT, Claude y Gemini son las tres IAs que dominan el mercado. Comparativa real en coding, razonamiento, velocidad y precio para developers en 2026.',
    toc: [
      { id: 'intro', label: 'El panorama en 2026' },
      { id: 'chatgpt', label: 'ChatGPT' },
      { id: 'claude', label: 'Claude' },
      { id: 'gemini', label: 'Gemini' },
      { id: 'coding', label: 'Para programar' },
      { id: 'costo', label: 'Velocidad y costo' },
      { id: 'cual-elegir', label: '¿Cuál elegir?' },
    ],
    content: `
<h2 id="intro">El panorama en <span class="italic">2026.</span></h2>
<p>En 2023 había una sola IA que todo el mundo usaba. En 2026 hay tres ecosistemas completos compitiendo por tu atención y tu suscripción mensual. ChatGPT de OpenAI, Claude de Anthropic y Gemini de Google han madurado hasta el punto donde ninguna es claramente inferior. La pregunta ya no es "¿debería usar IA?" sino "¿cuál para qué?".</p>
<p>Hemos pasado meses trabajando con las tres para tareas reales de desarrollo: escribir código, debuggear, revisar arquitecturas, generar documentación y hacer análisis técnicos. Esto es lo que encontramos en la práctica.</p>

<div class="numbers-callout">
  <div><div class="n-label">IAs principales</div><div class="n-num">3</div></div>
  <div><div class="n-label">Modelos activos</div><div class="n-num">12<span class="italic">+</span></div></div>
  <div><div class="n-label">Costo estándar</div><div class="n-num">$20<span class="italic">/mes</span></div></div>
</div>

<h2 id="chatgpt">ChatGPT — el <span class="italic">estándar.</span></h2>
<p>ChatGPT es la IA más reconocida del mundo y tiene el ecosistema más maduro. GPT-4o es rápido, multimodal y sólido para la mayoría de tareas de programación. Canvas es excelente para trabajar código en documentos colaborativos. Los GPTs personalizados y los Actions permiten integraciones con herramientas externas. La app móvil es la mejor del mercado.</p>
<p>Su punto débil: tiende a ser demasiado confiado, afirmando cosas incorrectas con la misma seguridad que las correctas. Para código técnico complejo, las alucinaciones son más frecuentes que en Claude. La ventana de contexto es amplia pero no tanto como Claude para documentos muy largos.</p>
<ul>
  <li><strong>Mejor para:</strong> tareas generales, contenido, código con patrones conocidos, Canvas colaborativo</li>
  <li><strong>Débil en:</strong> razonamiento técnico profundo, contextos muy largos</li>
  <li><strong>Precio:</strong> $20/mes Plus, $200/mes Pro</li>
</ul>

<h2 id="claude">Claude — el <span class="italic">razonador.</span></h2>
<p>Claude de Anthropic es la elección favorita de muchos engineers senior. Su diferenciador es la calidad del razonamiento: cuando debuggea o revisa arquitectura, da explicaciones más claras y razona el por qué de cada decisión. También es más honesto sobre sus limitaciones: si no sabe algo, lo dice en lugar de inventar una respuesta convincente.</p>
<p>Claude destaca en tareas de contexto largo: analizar codebases completas, revisar PRs extensos, trabajar con documentación técnica larga. Su ventana de contexto masiva y el modo Extended Thinking lo hacen ideal para arquitecturas complejas donde el razonamiento paso a paso importa.</p>
<ul>
  <li><strong>Mejor para:</strong> debugging profundo, arquitectura, código complejo, contexto largo</li>
  <li><strong>Débil en:</strong> generación de imágenes (no tiene), ecosistema de plugins</li>
  <li><strong>Precio:</strong> $20/mes Pro</li>
</ul>

<div class="pullquote">
  Claude no solo da la respuesta correcta. Explica <span class="italic">por qué</span> las otras opciones están mal. Eso es lo que lo hace diferente.
</div>

<h2 id="gemini">Gemini — el <span class="italic">integrado.</span></h2>
<p>Gemini Advanced tiene su ventaja en la integración con el ecosistema de Google: Gmail, Drive, Docs, Meet. Para teams que viven en Google Workspace, es una extensión natural. Gemini 2.0 Ultra tiene capacidades multimodales impresionantes para análisis de video, imágenes y audio de forma nativa. Su búsqueda en tiempo real le permite acceder a documentación actualizada, algo que Claude y ChatGPT no hacen de forma nativa.</p>

<h2 id="coding">Para <span class="italic">programar.</span></h2>
<p>Para <strong>debugging de errores difíciles</strong>, Claude tiene ventaja clara. Para <strong>generación rápida de componentes UI</strong>, ChatGPT con Canvas es más fluido. Para <strong>proyectos que usan APIs de Google</strong>, Gemini tiene ventaja obvia. Para <strong>arquitecturas complejas y contexto largo</strong>, Claude lidera.</p>
<ul>
  <li>Debugging complejo → <strong>Claude</strong></li>
  <li>Boilerplate rápido → <strong>ChatGPT</strong></li>
  <li>APIs de Google Cloud → <strong>Gemini</strong></li>
  <li>Análisis de codebases → <strong>Claude</strong></li>
</ul>

<h2 id="costo">Velocidad y <span class="italic">costo.</span></h2>
<p>Los tres cuestan $20/mes para sus planes estándar. En velocidad de respuesta, ChatGPT 4o es el más rápido en respuestas cortas. Claude puede ser más lento en respuestas largas pero la calidad lo justifica. El verdadero costo no es solo la suscripción: es el tiempo que perdés corrigiendo respuestas incorrectas.</p>

<h2 id="cual-elegir">¿Cuál <span class="italic">elegir?</span></h2>
<p>Para trabajo de programación serio: <strong>Claude como IA principal</strong>. Su razonamiento técnico, honestidad sobre limitaciones y manejo de contexto largo lo hacen el más productivo para coding real. Complementá con ChatGPT para la interfaz más pulida y el ecosistema de plugins. Si ya estás en Google Workspace, añadí Gemini Advanced.</p>
<p>La estrategia óptima en 2026 es usar dos: Claude como tu IA principal de trabajo técnico y ChatGPT como segunda opinión y para tareas donde su ecosistema es superior. El costo de $40/mes se paga con creces en productividad.</p>`,
    prev: { slug: 'programar-mas-rapido-con-ia', title: 'Cómo programar más rápido con IA', category: 'IA & Desarrollo', readTime: '9 min' },
    next: { slug: 'mejores-prompts-para-developers', title: 'Los mejores prompts para developers', category: 'IA & Desarrollo', readTime: '8 min' },
    relatedSlugs: ['programar-mas-rapido-con-ia', 'herramientas-ia-para-programadores', 'trabajos-programacion-y-la-ia'],
  },

  // ── ISSUE 16 ──────────────────────────────────────────────────────────────
  {
    slug: 'mejores-prompts-para-developers',
    title: 'Los mejores prompts para developers — GaloDev',
    headline: 'Los mejores prompts para developers.',
    lede: 'Plantillas probadas para debugging, code review, arquitectura y documentación. Para de escribir prompts genéricos y empieza a obtener código production-ready.',
    category: 'IA & Desarrollo',
    readTime: '8 min',
    date: 'Ene 13, 2026',
    dateISO: '2026-01-13',
    issue: '16',
    coverClass: 'cover-1',
    coverOrn: '💬',
    image: '/blog/mejores-prompts-para-developers.jpg',
    excerpt: 'Plantillas probadas para debugging, code review, arquitectura y documentación. Para de escribir prompts genéricos y empieza a obtener respuestas production-ready.',
    toc: [
      { id: 'intro', label: 'Por qué importan los prompts' },
      { id: 'debugging', label: 'Prompts para debugging' },
      { id: 'review', label: 'Code review con IA' },
      { id: 'arquitectura', label: 'Diseño de arquitectura' },
      { id: 'docs', label: 'Documentación automática' },
      { id: 'plantillas', label: 'Plantillas listas para usar' },
    ],
    content: `
<h2 id="intro">Por qué importan los <span class="italic">prompts.</span></h2>
<p>La diferencia entre un developer que obtiene respuestas mediocres de la IA y uno que obtiene código production-ready no está en qué herramienta usa. Está en cómo la usa. El prompt es la interfaz entre tu problema y la inteligencia del modelo. Un prompt vago produce código vago. Un prompt preciso produce código que podés copiar directamente al repositorio.</p>
<p>Después de miles de horas usando Claude, ChatGPT y Copilot para trabajo real, estas son las plantillas que producen resultados consistentemente buenos.</p>

<div class="numbers-callout">
  <div><div class="n-label">Mejora en calidad</div><div class="n-num">3<span class="italic">×</span></div></div>
  <div><div class="n-label">Menos iteraciones</div><div class="n-num">60<span class="italic">%</span></div></div>
  <div><div class="n-label">Tiempo ahorrado/día</div><div class="n-num">2<span class="italic">h</span></div></div>
</div>

<h2 id="debugging">Prompts para <span class="italic">debugging.</span></h2>
<p>El error más común al pedir ayuda con un bug es pegar el mensaje de error sin contexto. La IA necesita saber: qué estabas intentando hacer, qué comportamiento esperabas, qué comportamiento obtuviste, y el stack trace completo.</p>
<p><strong>Plantilla base para debugging:</strong></p>
<pre><code>Tengo este error en [lenguaje/framework]:
[ERROR COMPLETO]

Contexto:
- Lo que intento hacer: [descripción clara]
- Comportamiento esperado: [qué debería pasar]
- Comportamiento actual: [qué está pasando]

Código relevante:
[CÓDIGO]

Versiones: Node 22, Next.js 15, TypeScript 5.4
Explícame la causa raíz y dame la corrección.</code></pre>
<p>El campo "versiones" es crítico. Un error de TypeScript 4 tiene soluciones diferentes a uno de TypeScript 5. Un problema de async/await en Node 18 puede no existir en Node 22.</p>

<h2 id="review">Code review con <span class="italic">IA.</span></h2>
<p>Usar la IA para review antes de abrir un PR te ahorra el tiempo de tus compañeros y atrapa problemas obvios. La clave es ser específico sobre qué tipo de revisión querés.</p>
<pre><code>Revisá este código buscando específicamente:
1. Problemas de seguridad (XSS, inyección, datos sin sanitizar)
2. Memory leaks o referencias que no se limpian
3. Casos edge no manejados
4. Código que no escala con volumen alto

[CÓDIGO]

Dame los problemas encontrados por severidad (crítico/medio/bajo) y el código corregido para cada uno.</code></pre>

<div class="pullquote">
  Un buen prompt es como un ticket de Jira bien escrito: define el contexto, el problema y el criterio de éxito antes de pedir la solución.
</div>

<h2 id="arquitectura">Diseño de <span class="italic">arquitectura.</span></h2>
<p>Para decisiones de arquitectura, el contexto de negocio importa tanto como el técnico. La IA necesita saber las restricciones reales, no solo el problema abstracto.</p>
<pre><code>Necesito diseñar [sistema]. Restricciones:
- Tráfico esperado: [X requests/segundo]
- Presupuesto mensual: [aproximado]
- Team: [tamaño y nivel de experiencia]
- Plazo para MVP: [tiempo]
- Stack actual: [tecnologías]

Dame 2-3 opciones de arquitectura con trade-offs claros y tu recomendación para estas restricciones específicas.</code></pre>

<h2 id="docs">Documentación <span class="italic">automática.</span></h2>
<p>Documentar código es el trabajo que todos posponen. Con IA podés generarlo en segundos si dás el contexto correcto:</p>
<pre><code>Generá documentación JSDoc para este código.
La audiencia son developers con experiencia en React pero que no conocen este módulo específico.
Incluí: propósito, parámetros con tipos, valor de retorno, casos de uso y un ejemplo funcional.

[CÓDIGO]</code></pre>

<h2 id="plantillas">Plantillas listas para <span class="italic">usar.</span></h2>
<ul>
  <li><strong>Explicar código heredado:</strong> "Explicá este código como si yo fuera un developer senior que nunca lo vio. Primero el propósito general, luego la lógica por bloques, y finalmente los riesgos o deudas técnicas evidentes."</li>
  <li><strong>Optimizar performance:</strong> "Este código funciona pero es lento. Identificá los cuellos de botella por orden de impacto y proponé la optimización de mayor retorno sin cambiar la API pública."</li>
  <li><strong>Convertir a TypeScript:</strong> "Convertí este JavaScript a TypeScript estricto. Inferí los tipos correctos, añadí los que faltan y usá tipos utility de TypeScript donde apliquen. No uses any."</li>
  <li><strong>Escribir tests:</strong> "Escribí tests unitarios para esta función. Cubrí: happy path, edge cases, entradas inválidas y los errores específicos que debería lanzar. Usá [Jest/Vitest]."</li>
</ul>`,
    prev: { slug: 'chatgpt-vs-claude-vs-gemini', title: 'ChatGPT vs Claude vs Gemini', category: 'IA & Desarrollo', readTime: '8 min' },
    next: { slug: 'crear-app-con-ia', title: 'Cómo crear una app desde cero usando IA', category: 'IA & Desarrollo', readTime: '10 min' },
    relatedSlugs: ['chatgpt-vs-claude-vs-gemini', 'programar-mas-rapido-con-ia', 'herramientas-ia-para-programadores'],
  },

  // ── ISSUE 17 ──────────────────────────────────────────────────────────────
  {
    slug: 'crear-app-con-ia',
    title: 'Cómo crear una app desde cero usando IA — GaloDev',
    headline: 'Cómo crear una app desde cero usando IA.',
    lede: 'De idea a código funcional usando Claude, Cursor y v0. El proceso real que usamos para construir apps, no el cuento de hadas de los influencers.',
    category: 'IA & Desarrollo',
    readTime: '10 min',
    date: 'Ene 20, 2026',
    dateISO: '2026-01-20',
    issue: '17',
    coverClass: 'cover-2',
    coverOrn: '✨',
    excerpt: 'De idea a código funcional usando Claude, Cursor y v0. El flujo real para construir apps con IA, sin los atajos que crean deuda técnica.',
    toc: [
      { id: 'realidad', label: 'La realidad de crear con IA' },
      { id: 'stack', label: 'El stack correcto' },
      { id: 'flujo', label: 'El flujo de trabajo' },
      { id: 'errores', label: 'Errores frecuentes' },
      { id: 'ejemplo', label: 'Ejemplo real paso a paso' },
    ],
    content: `
<h2 id="realidad">La realidad de crear con <span class="italic">IA.</span></h2>
<p>Los videos de YouTube muestran a alguien que crea una app en 10 minutos usando IA. Lo que no muestran son las 3 horas de debugging que vinieron después, el código espagueti que nadie puede mantener, o los errores de seguridad que quedaron porque nadie los revisó. Crear apps con IA es posible y poderoso, pero requiere un proceso disciplinado.</p>
<p>El objetivo no es que la IA escriba todo el código. El objetivo es eliminar la fricción de las partes repetitivas para que podás concentrarte en el diseño, la lógica de negocio y la experiencia del usuario.</p>

<div class="numbers-callout">
  <div><div class="n-label">Velocidad inicial</div><div class="n-num">5<span class="italic">×</span></div></div>
  <div><div class="n-label">Revisión necesaria</div><div class="n-num">100<span class="italic">%</span></div></div>
  <div><div class="n-label">Deuda si no revisás</div><div class="n-num">∞</span></div></div>
</div>

<h2 id="stack">El stack <span class="italic">correcto.</span></h2>
<p>No todas las herramientas de IA son iguales para crear apps. Estas son las que funcionan mejor juntas:</p>
<ul>
  <li><strong>v0.dev:</strong> Para generar UI rápido. Describís el componente, v0 genera React + Tailwind. Perfecto para prototipar interfaces en minutos.</li>
  <li><strong>Cursor:</strong> Editor de código con IA integrada. La combinación de autocompletado contextual + chat con el codebase completo es difícil de igualar.</li>
  <li><strong>Claude:</strong> Para arquitectura, debugging y decisiones técnicas complejas. El razonamiento más sólido para problemas que requieren pensar varios pasos adelante.</li>
  <li><strong>Supabase:</strong> Backend-as-a-service. Auth, base de datos PostgreSQL, storage y edge functions sin infraestructura propia. La IA conoce bien su API.</li>
</ul>

<h2 id="flujo">El flujo de <span class="italic">trabajo.</span></h2>
<p><strong>Fase 1 — Especificación:</strong> Antes de escribir código, pedile a Claude que te ayude a definir los requerimientos. "Quiero construir X. Ayúdame a definir las entidades principales, los flujos del usuario y las decisiones técnicas clave que debo tomar antes de empezar." Esta conversación suele tomar 20 minutos y evita semanas de refactoring.</p>
<p><strong>Fase 2 — Arquitectura:</strong> Con los requerimientos claros, pedí la estructura de directorios, los modelos de datos y la lista de endpoints o server actions necesarios. Pedí que justifique cada decisión técnica con el contexto de tu proyecto específico.</p>
<p><strong>Fase 3 — Generación de UI:</strong> Usá v0 para los componentes visuales. Cada componente debe tener un propósito claro. No generes una pantalla entera de golpe; generá cada sección por separado para poder revisarla.</p>
<p><strong>Fase 4 — Lógica de negocio:</strong> Acá es donde más atención necesitás. La IA puede generar código que parece correcto pero tiene sutilezas incorrectas en la lógica de tu dominio. Revisá cada función que toca datos críticos.</p>

<div class="pullquote">
  La IA es excelente para el 80% del código que es boilerplate y patterns conocidos. Tu expertise es necesario para el 20% que es específico de tu dominio.
</div>

<h2 id="errores">Errores <span class="italic">frecuentes.</span></h2>
<ul>
  <li><strong>Generar sin revisar:</strong> El código generado siempre necesita revisión humana. La IA no conoce tu contexto de negocio, tus usuarios ni tus restricciones específicas.</li>
  <li><strong>Prompts demasiado ambiguos:</strong> "Haceme una app de tareas" produce código genérico. "Haceme una app de tareas con prioridades, fecha límite y asignación de responsable, usando Next.js App Router y Supabase" produce algo utilizable.</li>
  <li><strong>Ignorar la seguridad:</strong> La IA prioriza hacer funcionar el código. Revisá siempre: validación de inputs, autorización, sanitización de datos y manejo de errores.</li>
  <li><strong>No establecer límites claros:</strong> Pedile a la IA que siga patrones específicos. Si tu codebase usa server actions, decilo explícitamente o generará API routes.</li>
</ul>

<h2 id="ejemplo">Ejemplo real paso a <span class="italic">paso.</span></h2>
<p>Para este mismo sitio (GaloDev), usamos Claude para definir la arquitectura de herramientas, v0 para prototipar los componentes visuales de cada herramienta, y Cursor para la integración. El proceso tomó 3 días para 15 herramientas funcionales. Sin IA, habría tomado 3 semanas.</p>
<p>El 30% del tiempo fue generación de código. El 70% fue revisión, ajuste y refinamiento. Esa proporción es la correcta cuando el resultado es código que podés mantener.</p>`,
    prev: { slug: 'mejores-prompts-para-developers', title: 'Los mejores prompts para developers', category: 'IA & Desarrollo', readTime: '8 min' },
    next: { slug: 'react-vs-nextjs', title: 'React vs Next.js: cuándo usar cada uno', category: 'Web Dev', readTime: '9 min' },
    relatedSlugs: ['mejores-prompts-para-developers', 'herramientas-ia-para-programadores', 'programar-mas-rapido-con-ia'],
  },

  // ── ISSUE 18 ──────────────────────────────────────────────────────────────
  {
    slug: 'react-vs-nextjs',
    title: 'React vs Next.js: cuándo usar cada uno — GaloDev',
    headline: 'React vs Next.js: cuándo usar cada uno.',
    lede: 'React y Next.js no son lo mismo. Entender la diferencia te ahorra semanas de trabajo y arquitecturas mal diseñadas. La guía definitiva para elegir bien.',
    category: 'Web Dev',
    readTime: '9 min',
    date: 'Ene 27, 2026',
    dateISO: '2026-01-27',
    issue: '18',
    coverClass: 'cover-3',
    coverOrn: '⚛',
    excerpt: 'React y Next.js no son lo mismo. La guía definitiva para saber cuándo usar cada uno y no terminar sobreingenierando un proyecto simple.',
    toc: [
      { id: 'diferencia', label: 'La diferencia fundamental' },
      { id: 'react-puro', label: 'Cuándo usar React puro' },
      { id: 'nextjs', label: 'Cuándo usar Next.js' },
      { id: 'rendering', label: 'Modelos de rendering' },
      { id: 'decision', label: 'Cómo decidir' },
    ],
    content: `
<h2 id="diferencia">La diferencia <span class="italic">fundamental.</span></h2>
<p>React es una librería de UI. Next.js es un framework completo construido sobre React. La distinción importa porque cambia completamente lo que obtenés sin configuración adicional. React te da los componentes y el sistema de estado. Next.js te da además: routing, rendering en servidor, optimización de imágenes, SEO, APIs y configuración de producción.</p>
<p>Elegir entre los dos no es un tema de preferencia personal. Es una decisión arquitectural que depende de los requerimientos de tu proyecto.</p>

<div class="numbers-callout">
  <div><div class="n-label">React: librería</div><div class="n-num">~50<span class="italic">kb</span></div></div>
  <div><div class="n-label">Next.js: framework</div><div class="n-num">todo</span></div></div>
  <div><div class="n-label">SEO con React puro</div><div class="n-num">❌</span></div></div>
</div>

<h2 id="react-puro">Cuándo usar React <span class="italic">puro.</span></h2>
<p>React sin Next.js tiene sentido en contextos específicos donde las capacidades extra de Next.js son irrelevantes o contraproducentes:</p>
<ul>
  <li><strong>Dashboards internos:</strong> Si la app está detrás de un login y el SEO no importa, React con Vite es más simple y rápido de configurar.</li>
  <li><strong>Aplicaciones de escritorio con Electron/Tauri:</strong> Next.js añade complejidad innecesaria cuando no hay servidor.</li>
  <li><strong>SPAs embebidas:</strong> Si tu app React se inserta dentro de otra aplicación o CMS, el control total de la build es más importante que las features de Next.js.</li>
  <li><strong>Prototipos rápidos:</strong> Para validar una idea sin preocuparse por SEO, performance de producción ni routing complejo, Vite + React es más liviano.</li>
</ul>

<h2 id="nextjs">Cuándo usar <span class="italic">Next.js.</span></h2>
<p>Next.js es la elección correcta para la mayoría de proyectos web modernos:</p>
<ul>
  <li><strong>Sitios que necesitan SEO:</strong> Blogs, portfolios, landing pages, ecommerce — cualquier cosa que necesite ser indexada por Google necesita rendering en servidor o estático.</li>
  <li><strong>Apps con contenido público:</strong> Si alguna parte de tu app es visible sin login, Next.js te da las herramientas para optimizarla.</li>
  <li><strong>Proyectos con API propia:</strong> Las API Routes y Server Actions de Next.js evitan tener que mantener un backend separado para operaciones simples.</li>
  <li><strong>Performance como prioridad:</strong> La optimización automática de imágenes, fonts y chunks de código de Next.js es difícil de replicar manualmente.</li>
</ul>

<div class="pullquote">
  La pregunta no es "¿React o Next.js?" La pregunta es "¿mi app necesita SEO, rendering en servidor o APIs propias?" Si la respuesta es sí a alguna, usá Next.js.
</div>

<h2 id="rendering">Modelos de <span class="italic">rendering.</span></h2>
<p>Next.js te da cuatro estrategias de rendering que React puro no ofrece:</p>
<ul>
  <li><strong>SSG (Static Site Generation):</strong> HTML generado en build time. Máxima performance, ideal para contenido que no cambia frecuentemente.</li>
  <li><strong>SSR (Server-Side Rendering):</strong> HTML generado por request. Bueno para contenido personalizado o en tiempo real.</li>
  <li><strong>ISR (Incremental Static Regeneration):</strong> Estático con revalidación periódica. El balance perfecto para la mayoría de casos.</li>
  <li><strong>CSR (Client-Side Rendering):</strong> Como React puro, pero opcional en Next.js cuando tiene sentido.</li>
</ul>

<h2 id="decision">Cómo <span class="italic">decidir.</span></h2>
<p>Respondé estas preguntas en orden: ¿El contenido necesita ser indexado por buscadores? → Next.js. ¿Tenés datos que cambian frecuentemente y son públicos? → Next.js. ¿Es una app completamente privada detrás de auth? → React con Vite puede ser suficiente. ¿Tenés un backend existente y solo necesitás UI? → React puro o Next.js como frontend puro.</p>
<p>Para proyectos nuevos en 2026, la respuesta correcta es Next.js en el 80% de los casos. El ecosistema, la documentación y el soporte de Vercel lo hacen la elección de menor fricción para la mayoría de equipos.</p>`,
    prev: { slug: 'crear-app-con-ia', title: 'Cómo crear una app desde cero usando IA', category: 'IA & Desarrollo', readTime: '10 min' },
    next: { slug: 'apis-modernas-con-nodejs', title: 'Cómo construir APIs modernas con Node.js', category: 'Web Dev', readTime: '11 min' },
    relatedSlugs: ['que-es-nextjs', 'desplegar-con-vercel', 'seo-en-nextjs'],
  },

  // ── ISSUE 19 ──────────────────────────────────────────────────────────────
  {
    slug: 'apis-modernas-con-nodejs',
    title: 'Cómo construir APIs modernas con Node.js — GaloDev',
    headline: 'Cómo construir APIs modernas con Node.js.',
    lede: 'REST, autenticación JWT, validación y despliegue. El stack completo para APIs que escalan, con código real que podés copiar y adaptar.',
    category: 'Web Dev',
    readTime: '11 min',
    date: 'Feb 3, 2026',
    dateISO: '2026-02-03',
    issue: '19',
    coverClass: 'cover-4',
    coverOrn: '🔌',
    excerpt: 'REST, autenticación JWT, validación y despliegue. El stack completo para construir APIs con Node.js que escalan sin volverse insostenibles.',
    toc: [
      { id: 'stack', label: 'El stack moderno' },
      { id: 'estructura', label: 'Estructura del proyecto' },
      { id: 'validacion', label: 'Validación con Zod' },
      { id: 'auth', label: 'Autenticación JWT' },
      { id: 'errores', label: 'Manejo de errores' },
      { id: 'deploy', label: 'Despliegue' },
    ],
    content: `
<h2 id="stack">El stack <span class="italic">moderno.</span></h2>
<p>El ecosistema de Node.js para APIs evolucionó mucho. Express sigue siendo relevante pero su minimalismo extremo significa que tenés que tomar muchas decisiones por tu cuenta. En 2026, el stack que ofrece el mejor balance entre productividad y control es: <strong>Hono</strong> (o Fastify) para el servidor, <strong>Zod</strong> para validación, <strong>Prisma</strong> para la base de datos, y <strong>JWT</strong> para autenticación.</p>

<div class="numbers-callout">
  <div><div class="n-label">Hono vs Express</div><div class="n-num">6<span class="italic">×</span> más rápido</div></div>
  <div><div class="n-label">Zod schemas</div><div class="n-num">TypeScript nativo</div></div>
  <div><div class="n-label">Prisma queries</div><div class="n-num">type-safe</div></div>
</div>

<h2 id="estructura">Estructura del <span class="italic">proyecto.</span></h2>
<p>La estructura que escala bien para APIs medianas:</p>
<pre><code>src/
  routes/        # Definición de endpoints por recurso
  handlers/      # Lógica de cada endpoint
  services/      # Lógica de negocio (sin HTTP)
  db/            # Queries y modelos de Prisma
  middleware/    # Auth, logging, rate limiting
  schemas/       # Schemas de Zod para validación
  lib/           # Utilidades compartidas</code></pre>
<p>La separación entre handlers y services es clave. Los handlers hablan HTTP (request, response). Los services hablan negocio (datos, reglas). Un service debe poder ser llamado desde un handler HTTP, un cron job o un test sin diferencia.</p>

<h2 id="validacion">Validación con <span class="italic">Zod.</span></h2>
<p>Nunca confíes en los datos que llegan de un request. Zod te permite definir el schema esperado y validar automáticamente:</p>
<pre><code>import { z } from 'zod';

const CreateUserSchema = z.object({
  email: z.string().email(),
  name: z.string().min(2).max(100),
  role: z.enum(['admin', 'user']).default('user'),
});

type CreateUserInput = z.infer&lt;typeof CreateUserSchema&gt;;

// En el handler:
const result = CreateUserSchema.safeParse(req.body);
if (!result.success) {
  return res.status(400).json({ errors: result.error.flatten() });
}
// result.data está tipado correctamente</code></pre>

<h2 id="auth">Autenticación <span class="italic">JWT.</span></h2>
<p>La autenticación con JWT implica dos operaciones: generar el token al hacer login, y verificarlo en cada request protegido.</p>
<pre><code>import jwt from 'jsonwebtoken';

// Generar token
const token = jwt.sign(
  { userId: user.id, role: user.role },
  process.env.JWT_SECRET!,
  { expiresIn: '7d' }
);

// Middleware de verificación
export function requireAuth(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No autorizado' });
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET!);
    next();
  } catch {
    res.status(401).json({ error: 'Token inválido' });
  }
}</code></pre>

<div class="pullquote">
  Una API bien diseñada falla de forma predecible. Los errores son tan importantes como los happy paths.
</div>

<h2 id="errores">Manejo de <span class="italic">errores.</span></h2>
<p>Creá una clase de error custom y un middleware global de manejo de errores. Esto centraliza el logging y garantiza respuestas consistentes:</p>
<pre><code>class AppError extends Error {
  constructor(
    public message: string,
    public statusCode: number = 500,
    public code?: string
  ) { super(message); }
}

// Middleware global (último middleware antes de iniciar el servidor)
app.use((err, req, res, next) => {
  const status = err instanceof AppError ? err.statusCode : 500;
  const message = err instanceof AppError ? err.message : 'Error interno';
  console.error(err);
  res.status(status).json({ error: message, code: err.code });
});</code></pre>

<h2 id="deploy">Despliegue.</h2>
<p>Para APIs Node.js en 2026, las mejores opciones son Railway (el más simple para proyectos chicos), Fly.io (mejor precio/performance para apps medianas) y AWS Lambda/Vercel Functions si la API tiene tráfico irregular. Evitá EC2 clásico a menos que tengas requerimientos muy específicos que justifiquen la complejidad operacional.</p>`,
    prev: { slug: 'react-vs-nextjs', title: 'React vs Next.js: cuándo usar cada uno', category: 'Web Dev', readTime: '9 min' },
    next: { slug: 'como-generar-passwords-seguras', title: 'Cómo generar y manejar contraseñas seguras', category: 'Herramientas', readTime: '7 min' },
    relatedSlugs: ['que-es-nextjs', 'que-es-jwt', 'desplegar-con-vercel'],
  },

  // ── ISSUE 20 ──────────────────────────────────────────────────────────────
  {
    slug: 'como-generar-passwords-seguras',
    title: 'Cómo generar y manejar contraseñas seguras — GaloDev',
    headline: 'Cómo generar y manejar contraseñas seguras.',
    lede: 'La mayoría de contraseñas son inseguras por las mismas razones de siempre. Los patrones correctos para generar, almacenar y manejar credenciales.',
    category: 'Herramientas',
    readTime: '7 min',
    date: 'Feb 10, 2026',
    dateISO: '2026-02-10',
    issue: '20',
    coverClass: 'cover-5',
    coverOrn: '🔐',
    excerpt: 'Entropía, hashing con bcrypt y gestores de contraseñas. Todo lo que necesitás para no ser la próxima brecha de seguridad.',
    toc: [
      { id: 'entropia', label: 'Entropía y fortaleza' },
      { id: 'generar', label: 'Cómo generar contraseñas' },
      { id: 'almacenar', label: 'Cómo almacenarlas' },
      { id: 'gestores', label: 'Gestores de contraseñas' },
      { id: 'codigo', label: 'Implementación en código' },
    ],
    content: `
<h2 id="entropia">Entropía y <span class="italic">fortaleza.</span></h2>
<p>La fortaleza de una contraseña se mide en bits de entropía: qué tan difícil sería adivinarla por fuerza bruta. Una contraseña de 8 caracteres solo con letras tiene unos 45 bits de entropía. Una de 16 caracteres alfanuméricos tiene más de 95 bits. Para contexto: con hardware moderno, 45 bits se rompen en minutos. 95 bits tardarían más de la edad del universo.</p>
<p>La longitud importa más que la complejidad. "correctohorsestaple" (cuatro palabras al azar) es más segura que "P@ssw0rd!" aunque esta última parezca más compleja.</p>

<div class="numbers-callout">
  <div><div class="n-label">8 chars alfanum</div><div class="n-num">~45<span class="italic"> bits</span></div></div>
  <div><div class="n-label">16 chars random</div><div class="n-num">~95<span class="italic"> bits</span></div></div>
  <div><div class="n-label">Seguro desde</div><div class="n-num">80<span class="italic"> bits</span></div></div>
</div>

<h2 id="generar">Cómo generar <span class="italic">contraseñas.</span></h2>
<p>El error más común es usar Math.random() para generar contraseñas. <strong>Math.random() no es criptográficamente seguro</strong>. Para contraseñas reales, usá <code>crypto.getRandomValues()</code> en el browser o <code>crypto.randomBytes()</code> en Node.js.</p>
<pre><code>// Browser / Node.js moderno
function generatePassword(length = 16): string {
  const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
  const array = new Uint32Array(length);
  crypto.getRandomValues(array);
  return Array.from(array, n => charset[n % charset.length]).join('');
}</code></pre>
<p>Para generar passphrases (más fáciles de recordar y muy seguras), usá una lista de palabras como EFF Diceware y seleccioná al menos 5 palabras al azar.</p>

<h2 id="almacenar">Cómo <span class="italic">almacenarlas.</span></h2>
<p>Nunca almacenés contraseñas en texto plano. Nunca uses MD5 o SHA-1 para hashear contraseñas. Estas funciones son rápidas, lo que las hace vulnerables a ataques de fuerza bruta. En cambio, usá algoritmos diseñados específicamente para contraseñas: <strong>bcrypt</strong>, <strong>Argon2</strong> o <strong>scrypt</strong>. Son lentos por diseño.</p>
<pre><code>import bcrypt from 'bcrypt';

// Al guardar la contraseña:
const SALT_ROUNDS = 12; // más alto = más lento y más seguro
const hash = await bcrypt.hash(plainPassword, SALT_ROUNDS);
await db.user.update({ where: { id }, data: { passwordHash: hash } });

// Al verificar:
const isValid = await bcrypt.compare(plainPassword, storedHash);
if (!isValid) throw new Error('Contraseña incorrecta');</code></pre>

<div class="pullquote">
  Si tu base de datos fuera robada mañana, ¿cuánto tiempo tendría un atacante para acceder a las cuentas de tus usuarios? Con bcrypt y salt_rounds=12, la respuesta es "suficiente para que los usuarios cambien sus contraseñas."
</div>

<h2 id="gestores">Gestores de <span class="italic">contraseñas.</span></h2>
<p>Para uso personal, un gestor de contraseñas no es opcional si querés seguridad real. Las mejores opciones en 2026: <strong>Bitwarden</strong> (código abierto, gratis, self-hosteable), <strong>1Password</strong> (mejor UX, ideal para teams) y <strong>KeePassXC</strong> (local, sin nube, máximo control). Evitá guardar contraseñas en el browser — si alguien accede a tu computadora, tiene acceso a todo.</p>

<h2 id="codigo">Implementación en <span class="italic">código.</span></h2>
<p>Algunos patrones adicionales para aplicaciones robustas: implementá rate limiting en endpoints de login (máximo 5 intentos por minuto por IP), invalidá todas las sesiones cuando el usuario cambia su contraseña, usá HTTPS siempre para que las contraseñas nunca viajen en texto plano, y considerá implementar autenticación de dos factores (2FA) con TOTP para cuentas con acceso a datos sensibles.</p>`,
    prev: { slug: 'apis-modernas-con-nodejs', title: 'Cómo construir APIs modernas con Node.js', category: 'Web Dev', readTime: '11 min' },
    next: { slug: 'validar-y-formatear-json', title: 'Validar y formatear JSON como un profesional', category: 'Herramientas', readTime: '7 min' },
    relatedSlugs: ['que-es-jwt', 'que-es-base64', 'que-es-regex'],
  },

  // ── ISSUE 21 ──────────────────────────────────────────────────────────────
  {
    slug: 'validar-y-formatear-json',
    title: 'Validar y formatear JSON como un profesional — GaloDev',
    headline: 'Validar y formatear JSON como un profesional.',
    lede: 'JSON malformado, esquemas rotos y debugging de APIs. Todo lo que necesitás saber para que tu API nunca vuelva a fallar por un formato incorrecto.',
    category: 'Herramientas',
    readTime: '7 min',
    date: 'Feb 17, 2026',
    dateISO: '2026-02-17',
    issue: '21',
    coverClass: 'cover-1',
    coverOrn: '{}',
    excerpt: 'JSON malformado, esquemas rotos y debugging de APIs. El conocimiento fundamental para trabajar con datos estructurados sin volverse loco.',
    toc: [
      { id: 'estructura', label: 'Estructura de JSON' },
      { id: 'errores', label: 'Errores comunes' },
      { id: 'validacion', label: 'Validación con schemas' },
      { id: 'formatear', label: 'Formateo y limpieza' },
      { id: 'herramientas', label: 'Herramientas útiles' },
    ],
    content: `
<h2 id="estructura">Estructura de <span class="italic">JSON.</span></h2>
<p>JSON (JavaScript Object Notation) es el formato de intercambio de datos más usado en la web. Es simple: objetos con llaves y valores, arrays, strings, números, booleanos y null. Su simplicidad es su ventaja y también su trampa: un solo carácter mal puesto rompe todo el documento.</p>
<p>Las reglas que más desarrolladores olvidan: las llaves de objetos siempre van entre comillas dobles (no simples), no se permiten comas al final del último elemento, y los comentarios no existen en JSON estándar.</p>

<div class="numbers-callout">
  <div><div class="n-label">Error más común</div><div class="n-num">trailing comma</div></div>
  <div><div class="n-label">Herramienta online</div><div class="n-num">jsonlint.com</div></div>
  <div><div class="n-label">Schema estándar</div><div class="n-num">JSON Schema</div></div>
</div>

<h2 id="errores">Errores <span class="italic">comunes.</span></h2>
<p>Los errores de JSON más frecuentes en el trabajo real:</p>
<ul>
  <li><strong>Trailing comma:</strong> <code>{"name": "Juan",}</code> — la coma después del último elemento es inválida en JSON.</li>
  <li><strong>Comillas simples:</strong> <code>{'name': 'Juan'}</code> — JSON solo acepta comillas dobles.</li>
  <li><strong>undefined:</strong> <code>{"value": undefined}</code> — undefined no existe en JSON. Usá null.</li>
  <li><strong>NaN e Infinity:</strong> No son valores JSON válidos. Hay que convertirlos antes de serializar.</li>
  <li><strong>Caracteres sin escapar:</strong> Comillas, barras invertidas y ciertos caracteres de control dentro de strings necesitan escape.</li>
</ul>
<pre><code>// Esto rompe JSON.stringify de forma silenciosa:
JSON.stringify({ fn: () => {}, sym: Symbol('x'), undef: undefined });
// Resultado: {} — los tres campos desaparecen

// Para detectarlo:
const data = { name: 'Juan', callback: () => {} };
const safe = JSON.parse(JSON.stringify(data));
// safe = { name: 'Juan' } — callback silenciosamente eliminado</code></pre>

<h2 id="validacion">Validación con <span class="italic">schemas.</span></h2>
<p>Parsear JSON sin validar es un riesgo de seguridad y estabilidad. Si una API externa o un usuario puede enviar JSON arbitrario, necesitás validar la estructura antes de usarla. Zod es la librería más elegante para esto en TypeScript:</p>
<pre><code>import { z } from 'zod';

const ArticleSchema = z.object({
  title: z.string().min(1).max(200),
  content: z.string(),
  tags: z.array(z.string()).max(10).optional(),
  publishedAt: z.string().datetime().optional(),
});

function parseArticle(raw: unknown) {
  const result = ArticleSchema.safeParse(raw);
  if (!result.success) {
    throw new Error(\`JSON inválido: \${result.error.message}\`);
  }
  return result.data; // tipado correctamente
}</code></pre>

<div class="pullquote">
  JSON.parse lanza un error si el JSON está malformado. Pero no te dice nada si el JSON es válido pero tiene la estructura incorrecta para tu app. Ahí entra la validación de schemas.
</div>

<h2 id="formatear">Formateo y <span class="italic">limpieza.</span></h2>
<p>Para debugging y logging, JSON.stringify acepta parámetros opcionales para formatear la salida:</p>
<pre><code>// Indentación con 2 espacios
console.log(JSON.stringify(data, null, 2));

// Filtrar solo ciertas llaves
console.log(JSON.stringify(data, ['id', 'name', 'email'], 2));

// Transformar valores al serializar
JSON.stringify(data, (key, value) => {
  if (key === 'password') return '[REDACTED]';
  if (value instanceof Date) return value.toISOString();
  return value;
});</code></pre>

<h2 id="herramientas">Herramientas <span class="italic">útiles.</span></h2>
<p>Para el trabajo diario: la herramienta JSON del mismo GaloDev, <strong>jq</strong> en la terminal para transformar JSON desde scripts, <strong>Insomnia</strong> o <strong>Bruno</strong> para probar APIs con JSON, y la extensión <strong>JSON Viewer</strong> en el browser para formatear automáticamente respuestas de APIs.</p>`,
    prev: { slug: 'como-generar-passwords-seguras', title: 'Cómo generar y manejar contraseñas seguras', category: 'Herramientas', readTime: '7 min' },
    next: { slug: 'como-funcionan-los-qr', title: 'Cómo funcionan los códigos QR y cómo generarlos', category: 'Herramientas', readTime: '6 min' },
    relatedSlugs: ['que-es-base64', 'que-es-regex', 'que-es-jwt'],
  },

  // ── ISSUE 22 ──────────────────────────────────────────────────────────────
  {
    slug: 'como-funcionan-los-qr',
    title: 'Cómo funcionan los códigos QR y cómo generarlos — GaloDev',
    headline: 'Cómo funcionan los códigos QR y cómo generarlos.',
    lede: 'Los QR son más simples de lo que parecen. Cómo funcionan por dentro y cómo generarlos gratis para tu proyecto, negocio o campaña.',
    category: 'Herramientas',
    readTime: '6 min',
    date: 'Feb 24, 2026',
    dateISO: '2026-02-24',
    issue: '22',
    coverClass: 'cover-2',
    coverOrn: '▩',
    excerpt: 'Los QR son más simples de lo que parecen. Cómo funcionan por dentro y cómo generarlos gratis para tu proyecto, negocio o campaña.',
    toc: [
      { id: 'estructura', label: 'Estructura de un QR' },
      { id: 'datos', label: 'Qué datos pueden almacenar' },
      { id: 'generar', label: 'Cómo generarlos' },
      { id: 'codigo', label: 'QR desde código' },
      { id: 'usos', label: 'Usos prácticos' },
    ],
    content: `
<h2 id="estructura">Estructura de un <span class="italic">QR.</span></h2>
<p>QR viene de "Quick Response". Es una matriz de puntos en blanco y negro que codifica información de forma que puede leerse desde cualquier ángulo. A diferencia de los barcodes lineales, los QR son bidimensionales, lo que les permite almacenar mucho más información.</p>
<p>La estructura de un QR tiene partes fijas: los tres cuadrados en las esquinas son los "patrones de posición" que le dicen al lector dónde empieza y termina el código. La zona central almacena los datos codificados en bloques con corrección de errores. Gracias a esta corrección, un QR puede ser leído incluso si hasta el 30% está dañado o cubierto.</p>

<div class="numbers-callout">
  <div><div class="n-label">Capacidad máxima</div><div class="n-num">7,089<span class="italic"> chars</span></div></div>
  <div><div class="n-label">Corrección error</div><div class="n-num">7–30<span class="italic">%</span></div></div>
  <div><div class="n-label">Versiones QR</div><div class="n-num">1–40</div></div>
</div>

<h2 id="datos">Qué datos pueden <span class="italic">almacenar.</span></h2>
<p>Los QR pueden codificar cualquier texto, pero hay formatos estándar que los dispositivos reconocen automáticamente:</p>
<ul>
  <li><strong>URLs:</strong> El caso más común. El teléfono abre el navegador directamente.</li>
  <li><strong>Contactos vCard:</strong> El teléfono ofrece agregar el contacto automáticamente.</li>
  <li><strong>WiFi:</strong> Formato <code>WIFI:S:NombreRed;T:WPA;P:Contraseña;;</code> — el teléfono se conecta con un tap.</li>
  <li><strong>Email:</strong> Abre el cliente de email con destinatario y asunto precargados.</li>
  <li><strong>SMS:</strong> Abre el cliente de mensajería con número y texto predefinidos.</li>
  <li><strong>Texto plano:</strong> Cualquier información sin formato especial.</li>
</ul>

<h2 id="generar">Cómo <span class="italic">generarlos.</span></h2>
<p>Para uso puntual sin código, la herramienta QR de GaloDev genera QR de alta resolución listos para imprimir o usar en digital, sin registro ni marcas de agua. Para integraciones más específicas: <strong>qrcode.react</strong> para proyectos React, <strong>qrcode</strong> (npm) para Node.js, y la API de <strong>goqr.me</strong> para integraciones sin instalación.</p>

<h2 id="codigo">QR desde <span class="italic">código.</span></h2>
<pre><code>import QRCode from 'qrcode';

// Generar como Data URL (para mostrar en img tag)
const dataUrl = await QRCode.toDataURL('https://galodev.com', {
  width: 400,
  margin: 2,
  color: {
    dark: '#000000',
    light: '#ffffff'
  },
  errorCorrectionLevel: 'H' // más resistente a daño
});

// En React:
function QRDisplay({ url }: { url: string }) {
  const [src, setSrc] = useState('');
  useEffect(() => {
    QRCode.toDataURL(url).then(setSrc);
  }, [url]);
  return &lt;img src={src} alt="QR Code" /&gt;;
}</code></pre>

<div class="pullquote">
  Un QR que lleva a tu WhatsApp Business puede convertir un cliente que ve tu letrero en un chat inmediato. Es la distancia más corta entre el mundo físico y tu negocio digital.
</div>

<h2 id="usos">Usos <span class="italic">prácticos.</span></h2>
<p>Los usos que más impacto tienen para developers y emprendedores: QR en tarjetas de presentación (directo al perfil de LinkedIn o portafolio), QR en menús de restaurantes (siempre actualizados sin reimprimir), QR en packaging (tutorial de uso en video), y QR para WiFi en oficinas (elimina la pregunta "¿cuál es el WiFi?").</p>`,
    prev: { slug: 'validar-y-formatear-json', title: 'Validar y formatear JSON como un profesional', category: 'Herramientas', readTime: '7 min' },
    next: { slug: 'mejores-herramientas-para-developers', title: 'Las mejores herramientas gratuitas para developers', category: 'Herramientas', readTime: '8 min' },
    relatedSlugs: ['que-es-base64', 'que-es-regex', 'validar-y-formatear-json'],
  },

  // ── ISSUE 23 ──────────────────────────────────────────────────────────────
  {
    slug: 'mejores-herramientas-para-developers',
    title: 'Las mejores herramientas gratuitas para developers en 2026 — GaloDev',
    headline: 'Las mejores herramientas gratuitas para developers en 2026.',
    lede: 'Desde JSON formatters hasta generadores de paletas de colores. Las herramientas online que todo developer debería tener guardadas en sus bookmarks.',
    category: 'Herramientas',
    readTime: '8 min',
    date: 'Mar 3, 2026',
    dateISO: '2026-03-03',
    issue: '23',
    coverClass: 'cover-3',
    coverOrn: '🛠',
    excerpt: 'La colección curada de herramientas online gratuitas que usan los developers más productivos. Bookmarks que valen su peso en tiempo.',
    toc: [
      { id: 'codigo', label: 'Herramientas de código' },
      { id: 'diseño', label: 'Herramientas de diseño' },
      { id: 'apis', label: 'Testing de APIs' },
      { id: 'productividad', label: 'Productividad' },
      { id: 'galodev', label: 'Las herramientas de GaloDev' },
    ],
    content: `
<h2 id="codigo">Herramientas de <span class="italic">código.</span></h2>
<p>El ecosistema de herramientas gratuitas para developers es enorme. El truco es saber cuáles valen la pena. Estas son las que usamos constantemente:</p>
<ul>
  <li><strong>Transform.tools:</strong> Convierte entre formatos: JSON a TypeScript, CSS a Tailwind, HTML a JSX, SVG a componente React. Imprescindible para no escribir conversiones manuales.</li>
  <li><strong>Regex101:</strong> La mejor herramienta de testing de expresiones regulares. Explica cada parte del regex, muestra capturas y tiene biblioteca de patterns comunes.</li>
  <li><strong>JWT.io:</strong> Decodifica y verifica tokens JWT en tiempo real. Perfecto para debugging de autenticación.</li>
  <li><strong>CyberChef:</strong> La "navaja suiza" de la transformación de datos. Base64, hash, cifrado, compresión — todo en una interfaz de drag-and-drop.</li>
</ul>

<div class="numbers-callout">
  <div><div class="n-label">Herramientas GaloDev</div><div class="n-num">15<span class="italic"> tools</span></div></div>
  <div><div class="n-label">100% gratuitas</div><div class="n-num">sin registro</div></div>
  <div><div class="n-label">Privacidad</div><div class="n-num">solo cliente</div></div>
</div>

<h2 id="diseño">Herramientas de <span class="italic">diseño.</span></h2>
<ul>
  <li><strong>Coolors.co:</strong> Generador de paletas de colores. Space bar para generar, lock para fijar colores que te gustan.</li>
  <li><strong>Realtime Colors:</strong> Preview de tu paleta aplicada en un mockup de UI real. Mucho más útil que ver swatches.</li>
  <li><strong>Heroicons / Lucide:</strong> Librerías de iconos SVG limpios para React. Open source y con buscador.</li>
  <li><strong>Unsplash / Pexels:</strong> Fotos de alta calidad gratuitas y libres de derechos para proyectos.</li>
  <li><strong>Squoosh:</strong> Compresión de imágenes en el browser. Convierte a WebP, AVIF o JPEG con preview antes-después.</li>
</ul>

<h2 id="apis">Testing de <span class="italic">APIs.</span></h2>
<ul>
  <li><strong>Bruno:</strong> El mejor cliente HTTP local para 2026. Open source, sin sync a la nube, archivos en formato texto versionables con git.</li>
  <li><strong>Hoppscotch:</strong> Alternativa web a Postman. Funciona sin instalar nada, tiene colecciones y environments.</li>
  <li><strong>RequestBin:</strong> Crea un endpoint temporal para recibir webhooks durante el desarrollo. Invaluable para integrar servicios externos.</li>
</ul>

<div class="pullquote">
  Las mejores herramientas son las que no te sacan del flujo. Una buena herramienta tarda 2 segundos en darte la respuesta. Una mala herramienta te hace crear cuenta, esperar email de verificación y navegar un dashboard antes de llegar al resultado.
</div>

<h2 id="productividad">Productividad.</h2>
<ul>
  <li><strong>Excalidraw:</strong> Pizarra virtual para diagramas con estética de boceto. Perfecto para planificar arquitecturas en videollamadas.</li>
  <li><strong>Carbon.now.sh:</strong> Convierte fragmentos de código en imágenes estéticamente bonitas para compartir en redes o presentaciones.</li>
  <li><strong>TinyPNG:</strong> Compresión de PNG y JPG sin pérdida visible de calidad. Para cuando necesitás comprimir imágenes en batch.</li>
</ul>

<h2 id="galodev">Las herramientas de <span class="italic">GaloDev.</span></h2>
<p>Construimos nuestras propias herramientas con exactamente lo que necesitamos y sin el bloatware que viene con las alternativas existentes: conversor de colores HEX/RGB/HSL/OKLCH con match de Tailwind, generador de regex con cheatsheet integrado, decodificador JWT con validación de expiración, generador UUID v4, codificador Base64, previewer de Markdown, contador de palabras, generador de QR, compresor de imágenes, y más. Todo sin registro, sin cookies de tracking, procesamiento solo en tu navegador.</p>`,
    prev: { slug: 'como-funcionan-los-qr', title: 'Cómo funcionan los códigos QR', category: 'Herramientas', readTime: '6 min' },
    next: { slug: 'paleta-de-colores-profesional', title: 'Cómo crear una paleta de colores profesional', category: 'Herramientas', readTime: '8 min' },
    relatedSlugs: ['que-es-base64', 'que-es-regex', 'que-es-jwt'],
  },

  // ── ISSUE 24 ──────────────────────────────────────────────────────────────
  {
    slug: 'paleta-de-colores-profesional',
    title: 'Cómo crear una paleta de colores profesional — GaloDev',
    headline: 'Cómo crear una paleta de colores profesional para tu proyecto.',
    lede: 'Color theory aplicada al código. OKLCH, CSS variables y las herramientas que los mejores diseñadores usan para crear paletas que no parecen generadas por IA.',
    category: 'Herramientas',
    readTime: '8 min',
    date: 'Mar 10, 2026',
    dateISO: '2026-03-10',
    issue: '24',
    coverClass: 'cover-4',
    coverOrn: '🎨',
    excerpt: 'Color theory aplicada al código. OKLCH, CSS variables y cómo crear paletas coherentes que elevan cualquier proyecto.',
    toc: [
      { id: 'teoria', label: 'Teoría del color básica' },
      { id: 'oklch', label: 'Por qué OKLCH' },
      { id: 'paleta', label: 'Construir la paleta' },
      { id: 'css', label: 'Implementar con CSS' },
      { id: 'errores', label: 'Errores comunes' },
    ],
    content: `
<h2 id="teoria">Teoría del color <span class="italic">básica.</span></h2>
<p>No necesitás ser diseñador para crear buenas paletas de color. Necesitás entender tres conceptos: tono (hue), saturación y luminosidad. El tono es el "color" percibido (rojo, azul, verde). La saturación es qué tan vívido es. La luminosidad es qué tan claro u oscuro es. Con estos tres controles podés construir cualquier paleta coherente.</p>
<p>La regla 60-30-10: 60% del espacio visual en un color neutral (fondos, surfaces), 30% en un secundario (texto, bordes), 10% en el acento de marca (botones principales, highlights). Los acentos funcionan precisamente porque son escasos.</p>

<div class="numbers-callout">
  <div><div class="n-label">Colores en paleta</div><div class="n-num">3–5</div></div>
  <div><div class="n-label">Tones por color</div><div class="n-num">9–11</div></div>
  <div><div class="n-label">Contraste mínimo</div><div class="n-num">4.5:1<span class="italic"> WCAG</span></div></div>
</div>

<h2 id="oklch">Por qué <span class="italic">OKLCH.</span></h2>
<p>HSL fue el estándar por años pero tiene un defecto fundamental: pasos iguales en lightness no se perciben como iguales. Un amarillo al 70% de lightness y un azul al 70% de lightness se ven completamente diferentes en luminosidad percibida. OKLCH (Oklab Lightness Chroma Hue) es perceptualmente uniforme: si subís 10 puntos de L en cualquier color, el cambio visual percibido es consistente.</p>
<pre><code>/* HSL — problema: misma L, luminosidad percibida diferente */
color: hsl(60 100% 70%);   /* amarillo: se ve muy claro */
color: hsl(240 100% 70%);  /* azul: se ve oscuro */

/* OKLCH — solución: la L es perceptualmente uniforme */
color: oklch(0.75 0.15 90);   /* amarillo */
color: oklch(0.75 0.15 240);  /* azul — misma luminosidad percibida */</code></pre>

<h2 id="paleta">Construir la <span class="italic">paleta.</span></h2>
<p>El proceso para crear una paleta de 9 tonos para un color base:</p>
<ol>
  <li>Elegí tu color acento. Usá OKLCH: empieza con el hue de tu marca, chroma ~0.15-0.2, lightness ~0.55.</li>
  <li>Generá los 9 tonos variando solo lightness (de 0.95 a 0.15) manteniendo hue y chroma constantes.</li>
  <li>Ajustá chroma para los extremos: los tonos muy claros y muy oscuros se ven mejor con chroma reducido (0.05-0.08).</li>
  <li>Verificá contraste: el texto necesita al menos 4.5:1 contra el fondo (WCAG AA). Usá el checker de WebAIM.</li>
  <li>Nombrá los tonos del 50 al 950 siguiendo la convención de Tailwind.</li>
</ol>

<div class="pullquote">
  Una paleta profesional no es "colores que se ven bien juntos". Es un sistema donde cada combinación tiene contraste previsible y cada tono tiene un rol definido.
</div>

<h2 id="css">Implementar con <span class="italic">CSS.</span></h2>
<pre><code>:root {
  /* Color de marca: lime */
  --color-brand-50:  oklch(0.97 0.04 130);
  --color-brand-100: oklch(0.93 0.08 130);
  --color-brand-500: oklch(0.75 0.20 130);
  --color-brand-900: oklch(0.25 0.06 130);

  /* Semantic tokens — lo que realmente usás */
  --color-accent:    var(--color-brand-500);
  --color-text:      oklch(0.15 0.01 130);
  --color-surface:   oklch(0.98 0.005 130);
  --color-border:    oklch(0.88 0.02 130);
}</code></pre>
<p>La capa de semantic tokens es la clave. Los componentes usan <code>var(--color-accent)</code>, no <code>oklch(0.75 0.20 130)</code>. Cuando cambies la marca, cambiás un valor y se actualiza todo.</p>

<h2 id="errores">Errores <span class="italic">comunes.</span></h2>
<ul>
  <li>Negro puro (#000000) y blanco puro (#ffffff) nunca aparecen en diseño profesional. Siempre tintá los neutros hacia tu color de marca.</li>
  <li>Más de 3 colores de acento en una interfaz crea ruido. Elegí uno principal y usalo con disciplina.</li>
  <li>No verificar contraste: diseñar en pantalla calibrada y no testar en condiciones reales (sol directo, pantallas viejas) es un error crítico.</li>
</ul>`,
    prev: { slug: 'mejores-herramientas-para-developers', title: 'Las mejores herramientas gratuitas para developers', category: 'Herramientas', readTime: '8 min' },
    next: { slug: 'productividad-para-programadores', title: 'Productividad real para programadores', category: 'Productividad', readTime: '9 min' },
    relatedSlugs: ['mejores-herramientas-para-developers', 'que-es-base64', 'que-es-regex'],
  },

  // ── ISSUE 25 ──────────────────────────────────────────────────────────────
  {
    slug: 'productividad-para-programadores',
    title: 'Productividad real para programadores — GaloDev',
    headline: 'Productividad real para programadores.',
    lede: 'No es sobre trabajar más horas. Es sobre eliminar lo que te interrumpe, optimizar tu flujo y proteger el tiempo de concentración profunda.',
    category: 'Productividad',
    readTime: '9 min',
    date: 'Mar 17, 2026',
    dateISO: '2026-03-17',
    issue: '25',
    coverClass: 'cover-5',
    coverOrn: '⚡',
    excerpt: 'Las técnicas de productividad que realmente funcionan para programadores: deep work, gestión de interrupciones y sistemas que escalan.',
    toc: [
      { id: 'problema', label: 'El problema real' },
      { id: 'deep-work', label: 'Deep work para developers' },
      { id: 'interrupciones', label: 'Gestionar interrupciones' },
      { id: 'sistemas', label: 'Sistemas que funcionan' },
      { id: 'herramientas', label: 'Herramientas' },
    ],
    content: `
<h2 id="problema">El problema <span class="italic">real.</span></h2>
<p>La programación es un trabajo de concentración profunda. Para entrar en el estado de flujo donde resolvés problemas difíciles se necesitan entre 15 y 20 minutos sin interrupciones. Cada notificación, cada Slack, cada "¿tenés un minuto?" destruye ese estado y requiere otros 15 minutos de recuperación. Si trabajás 8 horas con una interrupción cada 30 minutos, en teoría tenés 16 bloques de trabajo. En práctica tenés 0 bloques de trabajo profundo.</p>

<div class="numbers-callout">
  <div><div class="n-label">Tiempo para flujo</div><div class="n-num">15–20<span class="italic"> min</span></div></div>
  <div><div class="n-label">Recuperación post-interrupción</div><div class="n-num">23<span class="italic"> min</span></div></div>
  <div><div class="n-label">Costo real de una notif</div><div class="n-num">40<span class="italic"> min</span></div></div>
</div>

<h2 id="deep-work">Deep work para <span class="italic">developers.</span></h2>
<p>Cal Newport llama "deep work" al trabajo cognitivo sin distracciones. Para programadores es la diferencia entre un buen día y un día donde "estuviste ocupado pero no avanzaste nada". La implementación práctica:</p>
<ul>
  <li><strong>Bloques de 90 minutos:</strong> La unidad básica de deep work. Menos no es suficiente para entrar en flujo. Más es cognitivamente agotador.</li>
  <li><strong>Sin excepciones en el bloque:</strong> Notificaciones silenciadas, Slack en do-not-disturb, email cerrado. Sin excepciones. Si "algo urgente puede pasar", definí un canal único de emergencias reales.</li>
  <li><strong>Ritual de inicio:</strong> Los mejores developers tienen un ritual corto (5-10 min) antes de cada bloque de deep work. Revisar el task, hacer un plan en papel, preparar el ambiente. El ritual activa el modo de concentración.</li>
</ul>

<h2 id="interrupciones">Gestionar <span class="italic">interrupciones.</span></h2>
<p>No todas las interrupciones son iguales. Aprendé a distinguir las urgentes (que justifican romper el bloque) de las importantes (que pueden esperar) de las triviales (que no necesitan tu atención en absoluto). El error más común es tratar todas como urgentes.</p>
<p>Protocolos que funcionan: batch las respuestas a mensajes (revisar Slack/email solo 3 veces al día), usá "async first" en comunicación (mensajes no esperan respuesta inmediata), creá un documento de FAQ para las preguntas repetitivas que te hace tu equipo.</p>

<div class="pullquote">
  Los mejores developers no son los que escriben código más rápido. Son los que pasan más tiempo en estados de concentración profunda donde el pensamiento complejo es posible.
</div>

<h2 id="sistemas">Sistemas que <span class="italic">funcionan.</span></h2>
<p><strong>GTD para developers:</strong> Capturá todo (ideas, bugs, features) en un inbox. Procesá el inbox una vez al día. Organizá las tareas por contexto (código, reunión, research). Revisá semanalmente para no perder nada importante.</p>
<p><strong>Técnica Pomodoro adaptada:</strong> 50 minutos de trabajo + 10 de pausa funciona mejor que 25+5 para programación. Los problemas técnicos necesitan más tiempo continuo para llegar a la solución.</p>
<p><strong>Documentation-first:</strong> Antes de empezar una feature compleja, escribí en comentarios o en un archivo temporal qué vas a hacer y cómo. Este proceso clarifica el pensamiento y reduce el tiempo total de implementación.</p>

<h2 id="herramientas">Herramientas.</h2>
<p>Las herramientas solo ayudan si el sistema subyacente funciona. Dicho eso, las más útiles: <strong>Obsidian</strong> para notas vinculadas (el grafo de conexiones entre ideas es genuinamente útil), <strong>Linear</strong> para gestión de proyectos técnicos (mejor que Jira para equipos chicos), y el <strong>Pomodoro Timer de GaloDev</strong> para cuando necesitás estructura visual en tus bloques de trabajo.</p>`,
    prev: { slug: 'paleta-de-colores-profesional', title: 'Cómo crear una paleta de colores profesional', category: 'Herramientas', readTime: '8 min' },
    next: { slug: 'setup-programacion-2026', title: 'El setup de programación perfecto para 2026', category: 'Productividad', readTime: '10 min' },
    relatedSlugs: ['mejores-extensiones-vscode-2026', 'evitar-burnout-como-developer', 'setup-programacion-2026'],
  },

  // ── ISSUE 26 ──────────────────────────────────────────────────────────────
  {
    slug: 'setup-programacion-2026',
    title: 'El setup de programación perfecto para 2026 — GaloDev',
    headline: 'El setup de programación perfecto para 2026.',
    lede: 'Hardware, VSCode, terminal, fuentes y extensiones. El entorno de desarrollo completo que usamos en GaloDev para programar más rápido y con menos fricción.',
    category: 'Productividad',
    readTime: '10 min',
    date: 'Mar 24, 2026',
    dateISO: '2026-03-24',
    issue: '26',
    coverClass: 'cover-1',
    coverOrn: '💻',
    excerpt: 'Hardware, VSCode, terminal, fuentes y extensiones. El entorno completo para programar con menos fricción en 2026.',
    toc: [
      { id: 'hardware', label: 'Hardware mínimo y óptimo' },
      { id: 'vscode', label: 'Configuración de VSCode' },
      { id: 'terminal', label: 'Terminal productiva' },
      { id: 'fuentes', label: 'Fuentes de código' },
      { id: 'dotfiles', label: 'Dotfiles y sync' },
    ],
    content: `
<h2 id="hardware">Hardware mínimo y <span class="italic">óptimo.</span></h2>
<p>El hardware importa más de lo que admitimos. Un developer que espera 3 segundos en cada hot reload pierde media hora al día. Multiplicalo por 250 días hábiles: son 125 horas al año perdidas en esperas. El ROI de buen hardware es alto y directo.</p>
<ul>
  <li><strong>Mínimo viable:</strong> 16 GB RAM, SSD de 512 GB, procesador con 8 núcleos o más. Con esto podés correr 2-3 proyectos con Docker y Node.js sin problemas.</li>
  <li><strong>Óptimo para productividad:</strong> 32 GB RAM, M-chip de Apple o equivalente AMD. La diferencia en builds de TypeScript y React es de 3-5×.</li>
  <li><strong>El periférico más subestimado:</strong> Un monitor adicional. Tener el código en un monitor y la documentación/browser en el otro elimina el alt-tab constante y mejora el flujo cognitivo.</li>
</ul>

<div class="numbers-callout">
  <div><div class="n-label">RAM mínima 2026</div><div class="n-num">16<span class="italic"> GB</span></div></div>
  <div><div class="n-label">Monitores recomendados</div><div class="n-num">2</div></div>
  <div><div class="n-label">ROI buen hardware</div><div class="n-num">10<span class="italic">×</span></div></div>
</div>

<h2 id="vscode">Configuración de <span class="italic">VSCode.</span></h2>
<p>VSCode con la configuración correcta es difícil de superar. Las settings más importantes:</p>
<pre><code>{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.tabSize": 2,
  "editor.minimap.enabled": false,  // libera espacio sin perder info útil
  "editor.stickyScroll.enabled": true,  // mantiene el contexto visible
  "editor.bracketPairColorization.enabled": true,
  "terminal.integrated.defaultProfile.osx": "zsh",
  "files.autoSave": "onFocusChange",
  "editor.inlineSuggest.enabled": true  // para GitHub Copilot / Cursor
}</code></pre>

<h2 id="terminal">Terminal <span class="italic">productiva.</span></h2>
<p>La terminal es donde pasan muchas horas. Una buena configuración reduce la fricción significativamente:</p>
<ul>
  <li><strong>Zsh + Oh My Zsh:</strong> Autocompletado de comandos, historial fuzzy, plugins de git que muestran el branch y estado en el prompt.</li>
  <li><strong>Starship:</strong> Prompt minimalista y ultra rápido. Muestra contexto relevante (branch, versión de Node, errores) sin saturar.</li>
  <li><strong>fzf:</strong> Fuzzy finder para historial de comandos (Ctrl+R) y búsqueda de archivos. Una vez que te acostumbrás no podés vivir sin él.</li>
  <li><strong>Aliases útiles:</strong> <code>alias gs="git status"</code>, <code>alias gp="git push"</code>, <code>alias ll="ls -la"</code>. Tres caracteres vs diez, miles de veces al día.</li>
</ul>

<div class="pullquote">
  El setup perfecto no existe, pero el setup que reduce tu fricción diaria a cero sí. Identificá los 3 procesos que más te interrumpen y optimizalos. Solo esos tres.
</div>

<h2 id="fuentes">Fuentes de <span class="italic">código.</span></h2>
<p>Las fuentes con ligaduras hacen el código más legible al combinar símbolos comunes en glifos únicos. Las mejores para código en 2026: <strong>JetBrains Mono</strong> (claro y muy legible), <strong>Fira Code</strong> (las ligaduras más completas) y <strong>Cascadia Code</strong> (la opción de Microsoft, excelente en Windows). El tamaño de fuente ideal es 14-15px con line-height de 1.6.</p>

<h2 id="dotfiles">Dotfiles y <span class="italic">sync.</span></h2>
<p>Los dotfiles son tus archivos de configuración (.zshrc, .gitconfig, settings.json de VSCode). Guardá todos en un repositorio de GitHub y escribí un script de instalación. La próxima vez que configures una máquina nueva, un solo comando restaura todo tu entorno en minutos. Herramientas como Chezmoi o Stow hacen esto especialmente limpio con symlinks.</p>`,
    prev: { slug: 'productividad-para-programadores', title: 'Productividad real para programadores', category: 'Productividad', readTime: '9 min' },
    next: { slug: 'evitar-burnout-como-developer', title: 'Cómo evitar el burnout como developer', category: 'Productividad', readTime: '8 min' },
    relatedSlugs: ['mejores-extensiones-vscode-2026', 'productividad-para-programadores', 'aprender-programacion-rapido'],
  },

  // ── ISSUE 27 ──────────────────────────────────────────────────────────────
  {
    slug: 'evitar-burnout-como-developer',
    title: 'Cómo evitar el burnout como developer — GaloDev',
    headline: 'Cómo evitar el burnout como developer.',
    lede: 'El burnout no aparece de golpe. Se acumula. Las señales tempranas, cómo prevenirlo y cómo recuperarte si ya está pasando.',
    category: 'Productividad',
    readTime: '8 min',
    date: 'Mar 31, 2026',
    dateISO: '2026-03-31',
    issue: '27',
    coverClass: 'cover-2',
    coverOrn: '🧘',
    excerpt: 'El burnout no aparece de golpe. Se acumula. Las señales tempranas y las estrategias concretas para prevenirlo o recuperarte si ya está pasando.',
    toc: [
      { id: 'que-es', label: '¿Qué es el burnout técnico?' },
      { id: 'señales', label: 'Señales tempranas' },
      { id: 'causas', label: 'Causas raíz' },
      { id: 'prevenir', label: 'Estrategias de prevención' },
      { id: 'recuperar', label: 'Cómo recuperarse' },
    ],
    content: `
<h2 id="que-es">¿Qué es el <span class="italic">burnout técnico?</span></h2>
<p>El burnout en developers no es solo cansancio. Es el agotamiento de la capacidad cognitiva que le da sentido al trabajo: ya no podés pensar creativamente, los problemas difíciles parecen imposibles, y la motivación que antes te hacía programar por gusto desaparece. Es diferente al cansancio normal porque no se resuelve durmiendo un fin de semana.</p>
<p>La industria tech tiene tasas de burnout desproporcionadas por razones específicas: cultura de disponibilidad constante, proyectos sin fin claro, cambio técnico permanente que hace que el conocimiento se vuelva obsoleto, y la glorificación del overwork.</p>

<div class="numbers-callout">
  <div><div class="n-label">Developers con burnout</div><div class="n-num">83<span class="italic">%</span></div></div>
  <div><div class="n-label">Causa principal</div><div class="n-num">overwork</div></div>
  <div><div class="n-label">Recuperación típica</div><div class="n-num">3–6<span class="italic"> meses</span></div></div>
</div>

<h2 id="señales">Señales <span class="italic">tempranas.</span></h2>
<p>El burnout se puede interceptar si reconocés las señales antes de que se vuelvan severas:</p>
<ul>
  <li>Tareas que antes tomaban 2 horas ahora toman 6 sin explicación clara.</li>
  <li>Pensar en el trabajo fuera del horario laboral de forma ansiosa, no productiva.</li>
  <li>Irritabilidad inusual con tecnologías o compañeros que antes no te molestaban.</li>
  <li>Pérdida del interés en aprender cosas nuevas (para developers, esto es una señal seria).</li>
  <li>Errores repetitivos en código que normalmente escribirías correctamente.</li>
  <li>Dificultad para desconectarte al final del día aunque no estés resolviendo nada.</li>
</ul>

<h2 id="causas">Causas <span class="italic">raíz.</span></h2>
<p>Las causas más comunes en la industria tech: deuda técnica acumulada que hace que cada tarea sea más difícil de lo que debería, estimaciones irreales que crean presión constante, falta de autonomía sobre decisiones técnicas importantes, y la sensación de no avanzar ("siempre hay más features, nunca terminamos nada").</p>

<div class="pullquote">
  El burnout no es debilidad. Es el resultado predecible de un sistema insostenible operando sin cambios por demasiado tiempo.
</div>

<h2 id="prevenir">Estrategias de <span class="italic">prevención.</span></h2>
<ul>
  <li><strong>Límites no negociables:</strong> Definí una hora de cierre y respetala. El trabajo que no terminaste hoy lo terminás mañana. El mundo no se acaba.</li>
  <li><strong>Proyectos propios chicos:</strong> Tener algo tuyo — aunque sea un script de 50 líneas — donde tenés control total recarga la autonomía que el trabajo a veces drena.</li>
  <li><strong>Deliberate practice fuera del trabajo:</strong> Aprender algo nuevo (un lenguaje, un concepto matemático, música) que no esté relacionado con tu trabajo actual previene el estancamiento intelectual.</li>
  <li><strong>Decir no con datos:</strong> Cuando te pidan más de lo que podés entregar con calidad, presentá el trade-off: "Si agrego esto al sprint, X no se puede entregar bien. ¿Cuál priorizamos?"</li>
</ul>

<h2 id="recuperar">Cómo <span class="italic">recuperarse.</span></h2>
<p>Si ya estás en burnout severo, la recuperación requiere tiempo real. No hay hack. Las acciones concretas: tomate al menos 2 semanas de vacaciones reales (sin laptop), reducí horas y carga durante 1-2 meses, hablá con tu manager sobre redistribuir responsabilidades, y considerá hablar con un profesional — el burnout severo tiene componentes fisiológicos que requieren apoyo especializado. Tu cerebro es tu herramienta de trabajo. Protegerlo no es lujo, es mantenimiento.</p>`,
    prev: { slug: 'setup-programacion-2026', title: 'El setup de programación perfecto para 2026', category: 'Productividad', readTime: '10 min' },
    next: { slug: 'tecnologias-mejor-pagadas-2026', title: 'Las tecnologías mejor pagadas para developers en 2026', category: 'Tendencias', readTime: '9 min' },
    relatedSlugs: ['productividad-para-programadores', 'setup-programacion-2026', 'aprender-programacion-rapido'],
  },

  // ── ISSUE 28 ──────────────────────────────────────────────────────────────
  {
    slug: 'tecnologias-mejor-pagadas-2026',
    title: 'Las tecnologías mejor pagadas para developers en 2026 — GaloDev',
    headline: 'Las tecnologías mejor pagadas para developers en 2026.',
    lede: 'Los datos reales de Stack Overflow y niveles.fyi sobre qué tecnologías pagan más. Dónde invertir tu tiempo de aprendizaje con criterio.',
    category: 'Tendencias',
    readTime: '9 min',
    date: 'Abr 7, 2026',
    dateISO: '2026-04-07',
    issue: '28',
    coverClass: 'cover-3',
    coverOrn: '💰',
    excerpt: 'Los datos reales sobre qué tecnologías pagan más en 2026 y por qué. Dónde invertir tu tiempo de aprendizaje para maximizar el retorno.',
    toc: [
      { id: 'datos', label: 'Los datos de 2026' },
      { id: 'lideres', label: 'Tecnologías líderes' },
      { id: 'emergentes', label: 'Las emergentes a seguir' },
      { id: 'latam', label: 'Contexto Latinoamérica' },
      { id: 'decision', label: 'Cómo decidir qué aprender' },
    ],
    content: `
<h2 id="datos">Los datos de <span class="italic">2026.</span></h2>
<p>El Stack Overflow Developer Survey y los datos de niveles.fyi pintan un panorama claro: las tecnologías mejor pagadas no son las más populares. Son las más especializadas, las que requieren más experiencia, o las que están en alta demanda con poca oferta de talento. El promedio de un developer JavaScript con 3 años de experiencia en EEUU es $120k. Un ML Engineer con PyTorch y experiencia en producción, $200k+.</p>

<div class="numbers-callout">
  <div><div class="n-label">Salary JS mid (EEUU)</div><div class="n-num">$120<span class="italic">k</span></div></div>
  <div><div class="n-label">Salary ML Engineer</div><div class="n-num">$200<span class="italic">k+</span></div></div>
  <div><div class="n-label">Premium por Rust</div><div class="n-num">+40<span class="italic">%</span></div></div>
</div>

<h2 id="lideres">Tecnologías <span class="italic">líderes.</span></h2>
<ul>
  <li><strong>Rust:</strong> El lenguaje mejor pagado en múltiples encuestas consecutivas. La demanda supera masivamente la oferta de developers competentes. Se usa en sistemas críticos, WebAssembly, blockchain y tooling de alto rendimiento. La curva de aprendizaje es real pero el retorno también.</li>
  <li><strong>Go (Golang):</strong> Dominante en infraestructura, Kubernetes, y servicios backend de alta performance. Las empresas que lo usan pagan bien porque los developers competentes en Go son escasos.</li>
  <li><strong>Kubernetes / Cloud Native:</strong> Platform engineers y SREs con experiencia real en Kubernetes son algunos de los perfiles más buscados. La diferencia entre "sé qué es un Pod" y "puedo diseñar la arquitectura de cluster para producción" vale $60-80k de diferencia.</li>
  <li><strong>ML / AI Engineering:</strong> No el "hago prompts" sino el "construyo y deplego modelos en producción". LLM fine-tuning, RAG pipelines, MLOps — todo esto tiene demanda enorme y poca oferta calificada.</li>
</ul>

<h2 id="emergentes">Las emergentes a <span class="italic">seguir.</span></h2>
<ul>
  <li><strong>WebAssembly:</strong> La tecnología que permite correr código C++, Rust o Go en el browser a velocidad nativa. Todavía nicho pero con momentum creciente en herramientas de video, audio y computación intensiva.</li>
  <li><strong>Edge Computing:</strong> Cloudflare Workers, Vercel Edge, Deno Deploy. El paradigma está creciendo y la especialización en performance a escala global tiene alta demanda.</li>
  <li><strong>Security Engineering:</strong> Con el aumento de ataques y regulaciones de seguridad, los developers con experiencia real en seguridad (no solo conocimiento teórico) son escasos y bien pagados.</li>
</ul>

<div class="pullquote">
  El mejor aprendizaje no es perseguir el stack de moda. Es construir algo real con la tecnología que querés aprender. Los proyectos en producción valen más que 100 tutoriales.
</div>

<h2 id="latam">Contexto <span class="italic">Latinoamérica.</span></h2>
<p>Para developers en LATAM que trabajan remoto para empresas de EEUU o Europa, el arbitraje geográfico es real y significativo. Un developer de Costa Rica, Colombia o Argentina con el mismo nivel técnico puede ganar 3-4× más trabajando para empresa extranjera que en el mercado local. Las tecnologías con mayor demanda internacional para LATAM: Node.js/TypeScript, React/Next.js, Python para data/ML, y cloud (AWS/GCP). El inglés técnico sólido todavía multiplica el rango de oportunidades disponibles.</p>

<h2 id="decision">Cómo decidir qué <span class="italic">aprender.</span></h2>
<p>No aprendas tecnologías por el salary solo. La fórmula que funciona: elegí algo que se usa en problemas que te interesan genuinamente (va a ser más fácil mantenerte motivado), que tenga demanda probada en el mercado (verifica en LinkedIn Jobs y Stack Overflow Survey), y donde puedas construir algo real en 3 meses (un proyecto en producción vale más que cualquier certificado en el CV).</p>`,
    prev: { slug: 'evitar-burnout-como-developer', title: 'Cómo evitar el burnout como developer', category: 'Productividad', readTime: '8 min' },
    next: { slug: 'trabajo-remoto-para-developers', title: 'Trabajo remoto para developers: la guía real', category: 'Tendencias', readTime: '10 min' },
    relatedSlugs: ['trabajos-programacion-y-la-ia', 'aprender-programacion-rapido', 'trabajo-remoto-para-developers'],
  },

  // ── ISSUE 29 ──────────────────────────────────────────────────────────────
  {
    slug: 'trabajo-remoto-para-developers',
    title: 'Trabajo remoto para developers: la guía real — GaloDev',
    headline: 'Trabajo remoto para developers: la guía real.',
    lede: 'Conseguir trabajo remoto, negociar salario en dólares desde Latinoamérica y sobrevivir el aislamiento. Lo que nadie te dice en los tutoriales de YouTube.',
    category: 'Tendencias',
    readTime: '10 min',
    date: 'Abr 14, 2026',
    dateISO: '2026-04-14',
    issue: '29',
    coverClass: 'cover-4',
    coverOrn: '🌍',
    excerpt: 'Conseguir trabajo remoto, negociar en dólares desde LATAM y sobrevivir el aislamiento. La guía sin adornos para developers que quieren trabajar globalmente.',
    toc: [
      { id: 'realidad', label: 'La realidad del trabajo remoto' },
      { id: 'conseguir', label: 'Cómo conseguirlo' },
      { id: 'negociar', label: 'Negociar el salario' },
      { id: 'productividad', label: 'Ser productivo en remoto' },
      { id: 'aislamiento', label: 'El aislamiento' },
    ],
    content: `
<h2 id="realidad">La realidad del trabajo <span class="italic">remoto.</span></h2>
<p>El trabajo remoto para developers tiene un ROI extraordinario desde Latinoamérica. Un developer Senior en Costa Rica puede ganar $60-80k trabajando para empresa costarricense. El mismo developer, con las mismas habilidades, trabajando para empresa de EEUU puede ganar $90-140k. La diferencia no está en las habilidades — está en saber cómo presentarse, dónde buscar y cómo negociar.</p>
<p>Lo que también es cierto: el trabajo remoto no es para todos. Requiere autodisciplina alta, comunicación escrita excelente, y tolerancia al aislamiento social. No es defecto tener estas limitaciones; es importante reconocerlas antes de comprometerse.</p>

<div class="numbers-callout">
  <div><div class="n-label">Salario LATAM local</div><div class="n-num">$40–70<span class="italic">k</span></div></div>
  <div><div class="n-label">Salario remoto EEUU</div><div class="n-num">$90–140<span class="italic">k</span></div></div>
  <div><div class="n-label">Diferencial promedio</div><div class="n-num">2<span class="italic">×</span></div></div>
</div>

<h2 id="conseguir">Cómo <span class="italic">conseguirlo.</span></h2>
<p>Los canales que funcionan en 2026 para trabajo remoto internacional:</p>
<ul>
  <li><strong>LinkedIn:</strong> Optimizá tu perfil en inglés. El título no debe decir "Software Developer" sino "Senior Full-Stack Engineer | React · TypeScript · Node.js". Activá "Open to Work" pero solo visible para recruiters, no público.</li>
  <li><strong>Toptal / Arc.dev / Gun.io:</strong> Plataformas de vetting para developers LATAM. Tienen proceso de selección riguroso pero una vez adentro, el acceso a empresas que pagan bien es directo.</li>
  <li><strong>YC Jobs / LinkedIn Remote Jobs:</strong> Filtrá por "Remote" y aplica directamente. Startups de YC tienen cultura más abierta a contratar LATAM que grandes corporaciones.</li>
  <li><strong>Red de contactos:</strong> El 70% de las posiciones remotas bien pagadas se llenan por referidos antes de publicarse. Conectar con developers latinoamericanos que ya están en esas empresas es la ruta más eficiente.</li>
</ul>

<h2 id="negociar">Negociar el <span class="italic">salario.</span></h2>
<p>El error más común: pedir demasiado poco por miedo o inseguridad geográfica. Las empresas que contratan remoto internacional ya saben que van a pagar en rango de mercado global, no en rango local. Si dan el primer número, es siempre bajo. Si te piden el número primero, dá un rango basado en Glassdoor/levels.fyi para el rol en EEUU con un descuento del 20-30% por ser remoto LATAM.</p>
<p>Para contratos como contratista independiente (freelance), cobrá en USD y considerá usar Deel, Brex o Wise para recibir pagos internacionales sin comisiones abusivas. La estructura legal depende de cada país — consultá un contador local.</p>

<div class="pullquote">
  El trabajo remoto no te hace menos valioso que alguien en San Francisco. Te hace más valioso: mismas habilidades, tiempo de respuesta razonable, y el empleador ahorra en costos de oficina y beneficios locales.
</div>

<h2 id="productividad">Ser productivo en <span class="italic">remoto.</span></h2>
<p>La trampa principal del trabajo remoto es la procrastinación disfrazada de "flexibilidad". Las estructuras que ayudan: horario fijo aunque nadie te lo exija (tu cerebro necesita ritmo), espacio dedicado para trabajar (aunque sea una esquina del cuarto con buena iluminación), y check-ins proactivos con el equipo para no volverse invisible.</p>
<p>Sobre-comunicar es mejor que sub-comunicar en remoto. Si terminaste una tarea, escribí un update breve. Si estás bloqueado, pedí ayuda antes de que pase media jornada. La visibilidad construye confianza en entornos remotos.</p>

<h2 id="aislamiento">El <span class="italic">aislamiento.</span></h2>
<p>El aislamiento es el costo real del trabajo remoto. Las estrategias que funcionan: trabajar desde cafeterías o coworkings 1-2 días a la semana, mantener actividades sociales no relacionadas al trabajo, y ser intencional en las conexiones con el equipo remoto (videollamadas ocasionales no laborales, celebrar victorias del equipo). El aislamiento que se ignora evoluciona en burnout.</p>`,
    prev: { slug: 'tecnologias-mejor-pagadas-2026', title: 'Las tecnologías mejor pagadas en 2026', category: 'Tendencias', readTime: '9 min' },
    next: { slug: 'portfolio-developer-moderno', title: 'Cómo crear un portfolio de developer que consigue trabajo', category: 'Tendencias', readTime: '9 min' },
    relatedSlugs: ['tecnologias-mejor-pagadas-2026', 'trabajos-programacion-y-la-ia', 'productividad-para-programadores'],
  },

  // ── ISSUE 30 ──────────────────────────────────────────────────────────────
  {
    slug: 'portfolio-developer-moderno',
    title: 'Cómo crear un portfolio de developer que consigue trabajo — GaloDev',
    headline: 'Cómo crear un portfolio de developer que consigue trabajo.',
    lede: 'Los portfolios que funcionan no son los más bonitos. Son los que demuestran que podés resolver problemas reales. Estructura, proyectos y errores que hay que evitar.',
    category: 'Tendencias',
    readTime: '9 min',
    date: 'Abr 21, 2026',
    dateISO: '2026-04-21',
    issue: '30',
    coverClass: 'cover-5',
    coverOrn: '📁',
    excerpt: 'Los portfolios que consiguen trabajo no son los más bonitos. Son los que demuestran resolución de problemas reales. La guía completa para construirlo.',
    toc: [
      { id: 'importa', label: '¿Importa el portfolio?' },
      { id: 'proyectos', label: 'Qué proyectos incluir' },
      { id: 'estructura', label: 'Estructura que funciona' },
      { id: 'errores', label: 'Errores que descartan' },
      { id: 'stack', label: 'Stack técnico recomendado' },
    ],
    content: `
<h2 id="importa">¿Importa el <span class="italic">portfolio?</span></h2>
<p>La respuesta honesta: depende del nivel. Para developers junior sin experiencia laboral, el portfolio es el activo más importante. Para mid y senior, es el CV y los proyectos en GitHub los que importan más, aunque un portfolio bien hecho acelera el proceso. Para roles en FAANG y empresas grandes, el portfolio importa menos que el performance en entrevistas técnicas.</p>
<p>Dicho esto, un portfolio bien construido puede ser la diferencia entre que un recruiter pase 30 segundos o 5 minutos en tu perfil. Esos minutos adicionales son donde ocurre la consideración real.</p>

<div class="numbers-callout">
  <div><div class="n-label">Tiempo promedio recruiter</div><div class="n-num">30<span class="italic"> seg</span></div></div>
  <div><div class="n-label">Proyectos óptimos</div><div class="n-num">3–5</div></div>
  <div><div class="n-label">Primeros 3 seg deciden</div><div class="n-num">todo</div></div>
</div>

<h2 id="proyectos">Qué proyectos <span class="italic">incluir.</span></h2>
<p>La calidad siempre vence a la cantidad. Tres proyectos sólidos son mejores que doce proyectos mediocres. Lo que hace a un proyecto destacar:</p>
<ul>
  <li><strong>Resuelve un problema real:</strong> No "una app de tareas para practicar React". Sí "una herramienta que construí para automatizar el proceso X que me tomaba 2 horas cada semana".</li>
  <li><strong>Tiene usuarios o impacto medible:</strong> "500 personas lo usan mensualmente" o "redujo el tiempo de X en 60%" son claims que destacan.</li>
  <li><strong>Muestra tus decisiones técnicas:</strong> El README debe explicar por qué elegiste el stack, qué problemas resolviste y qué aprenderías a hacer diferente.</li>
  <li><strong>Está en producción:</strong> Un link funcional vale más que screenshots. Deploya en Vercel, Railway o Render — todos tienen tier gratuito.</li>
</ul>

<h2 id="estructura">Estructura que <span class="italic">funciona.</span></h2>
<p>La estructura que convierte visitas en contactos:</p>
<ol>
  <li><strong>Hero conciso (3 segundos):</strong> Quién sos, qué hacés, para qué sirve tu trabajo. Sin scroll para verlo.</li>
  <li><strong>Proyectos (el corazón):</strong> Screenshots reales, descripción del problema, stack y link. No más de 4-5.</li>
  <li><strong>Stack y skills (30 segundos):</strong> Lista honesta de lo que sabés bien. No incluyas jQuery si no lo usarías en producción hoy.</li>
  <li><strong>Sobre vos (sin exagerar):</strong> Tu background real en 3-4 oraciones y qué tipo de trabajo buscás.</li>
  <li><strong>Contacto obvio:</strong> Email clickeable y LinkedIn. No formularios de contacto complicados.</li>
</ol>

<div class="pullquote">
  El peor portfolio es el que está desactualizado. Un portfolio de 2021 con proyectos "en construcción" dice más de vos que no tener portfolio.
</div>

<h2 id="errores">Errores que <span class="italic">descartan.</span></h2>
<ul>
  <li>Proyectos de tutoriales copiados sin modificación. Los recruiters conocen el "To-Do App with React" de cualquier curso popular.</li>
  <li>Links rotos o demos que no cargan. Revisá todos los links antes de compartir el portfolio.</li>
  <li>Diseño que compite con el contenido. El portfolio es sobre tu trabajo, no sobre demostrar que sabés CSS avanzado (a menos que seas frontend especializado en diseño).</li>
  <li>Sin código en GitHub. Si el proyecto no tiene repositorio público, el 70% de los developers que revisen el portfolio se irán sin contactar.</li>
  <li>Exagerar el stack: "Experto en AWS" cuando hiciste un deploy básico en EC2 una vez.</li>
</ul>

<h2 id="stack">Stack técnico <span class="italic">recomendado.</span></h2>
<p>Para el portfolio mismo: Next.js + Tailwind desplegado en Vercel es el estándar en 2026. Es rápido, tiene buen SEO y el deploy es gratis y automático. Para portfolios más creativos, Astro es una excelente opción con hydration selectiva que produce sitios ultra rápidos. Evitá WordPress o Wix — manda la señal equivocada para un developer técnico.</p>`,
    prev: { slug: 'trabajo-remoto-para-developers', title: 'Trabajo remoto para developers: la guía real', category: 'Tendencias', readTime: '10 min' },
    relatedSlugs: ['tecnologias-mejor-pagadas-2026', 'trabajo-remoto-para-developers', 'aprender-programacion-rapido'],
  },
];
