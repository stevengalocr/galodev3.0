# Guía para Crear Artículos en GaloDev

Todo artículo nuevo va en `lib/articles.ts` como un objeto dentro del array `articles`. Esta guía explica cada campo, las reglas de HTML del contenido, los componentes especiales disponibles, y el checklist antes de publicar.

---

## 1. Estructura del objeto `Article`

```typescript
{
  slug: string;           // URL: /blog/[slug]
  title: string;          // <title> HTML — incluye " — GaloDev" al final
  headline: string;       // Título visual en la página del artículo
  lede: string;           // Subtítulo/sumario debajo del headline (1-2 frases)
  category: string;       // Badge de categoría: 'Tutorial' | 'Guía' | 'Comparativa' | 'Recursos'
  readTime: string;       // Ej: '9 min' — calcula ~200 palabras/min
  date: string;           // Ej: 'May 10, 2025'
  dateISO: string;        // Ej: '2025-05-10' — para <time datetime="">
  issue: string;          // Número de edición con ceros: '01', '02', ... '14'
  coverClass: string;     // CSS class para el fondo de portada: 'cover-1' | 'cover-2' | 'cover-3' | 'cover-4'
  coverOrn: string;       // Texto ornamental en la portada (corto, sin espacios)
  excerpt: string;        // Texto de la card en el listado de artículos (1-2 frases)
  content: string;        // HTML completo del artículo (template literal con backticks)
  toc: TocItem[];         // Array de { id: string; label: string } para el índice lateral
  prev?: { slug; title; category; readTime };  // Artículo anterior (opcional)
  next?: { slug; title; category; readTime };  // Artículo siguiente (opcional)
}
```

---

## 2. Reglas de `content` (HTML)

El campo `content` es un template literal de TypeScript. **No uses backticks dentro** del contenido — causarían un error de compilación. Para código inline usa `<code>`, para bloques usa `<ul>/<ol>` con `<li>` que contengan `<code>`.

### Estructura de headings

Todos los `<h2>` llevan un `id` que debe coincidir exactamente con el `id` del array `toc`:

```html
<h2 id="intro">¿Qué es <span class="italic">Next.js</span>?</h2>
```

El patrón de italics: pon en `<span class="italic">` la última palabra o frase corta del heading para el efecto tipográfico del diseño.

### Párrafos

Texto corriente: siempre en `<p>`. Nunca texto suelto sin etiqueta.

```html
<p>Texto normal con <strong>énfasis</strong> y <code>código inline</code>.</p>
```

### Listas

```html
<ul>
  <li><strong>Término</strong>: descripción del término.</li>
  <li>Ítem sin término bold.</li>
</ul>

<ol>
  <li>Primer paso.</li>
  <li>Segundo paso.</li>
</ol>
```

---

## 3. Componentes especiales

### `numbers-callout` — Stats visuales

Úsalo una vez por artículo, generalmente tras la introducción. Siempre 3 stats:

```html
<div class="numbers-callout">
  <div><div class="n-label">Etiqueta stat</div><div class="n-num">42<span class="italic">K</span></div></div>
  <div><div class="n-label">Etiqueta stat</div><div class="n-num">100<span class="italic">%</span></div></div>
  <div><div class="n-label">Etiqueta stat</div><div class="n-num">&lt;1<span class="italic">s</span></div></div>
</div>
```

- El número va en `<div class="n-num">` y la unidad/sufijo en `<span class="italic">` dentro de él.
- La etiqueta va en `<div class="n-label">`.
- Usa entidades HTML cuando el stat tenga `<` o `>`: `&lt;` / `&gt;`.

### `pullquote` — Cita destacada

Úsalo una vez por artículo, en el punto de mayor impacto del texto:

```html
<div class="pullquote">
  Frase memorable o insight clave con <span class="italic">palabra enfatizada.</span>
</div>
```

- Máximo 20 palabras.
- La frase debe poder leerse sola, fuera de contexto.
- El punto final va dentro del `</div>`, después del `</span>` si termina con italics.

### FAQs — SEO estructurado

Siempre incluye una sección de FAQs como último `<h2>` antes del cierre del contenido. Mínimo 4 preguntas:

```html
<h2 id="faqs">Preguntas <span class="italic">frecuentes.</span></h2>
<h3>¿Pregunta en formato interrogativo?</h3>
<p>Respuesta directa y completa en 2-4 frases. Sin bullets, sin listas — prosa directa.</p>
<h3>¿Segunda pregunta?</h3>
<p>Respuesta.</p>
```

- El `id` de la sección FAQs siempre es `"faqs"`.
- Las preguntas en `<h3>`, sin `id`.
- Las respuestas directamente en `<p>`, nunca en listas ni sub-secciones.
- Elige preguntas que la gente busca en Google: "¿Cuál es la diferencia entre X e Y?", "¿Cuándo usar X?", "¿Es X gratis?".

### CTAs a herramientas GaloDev

Para referenciar herramientas del sitio, usa links inline dentro de párrafos:

```html
<p>Prueba el <a href="/tools/json-formatter">JSON Formatter de GaloDev</a> — formatea y valida JSON en tiempo real, sin registro.</p>
```

- Nunca botones o secciones especiales de CTA — los links inline en contexto funcionan mejor.
- El texto del link debe ser descriptivo: "JSON Formatter de GaloDev", no "haz clic aquí".
- Añade un dash `—` y una descripción corta del beneficio después del link.

---

## 4. Array `toc`

El `toc` genera el índice lateral de navegación. Cada entrada:

```typescript
{ id: 'intro', label: '¿Qué es Next.js?' }
```

- `id`: debe coincidir **exactamente** con el atributo `id` del `<h2>` correspondiente.
- `label`: texto visible en el índice. Puede ser más corto que el heading completo.
- Orden: mismo orden que los headings en el contenido.
- La sección FAQs siempre va última: `{ id: 'faqs', label: 'Preguntas frecuentes' }`.

---

## 5. Campos `prev` y `next`

Forman la navegación secuencial entre artículos. El artículo más antiguo no tiene `prev`; el más reciente no tiene `next`.

```typescript
prev: { slug: 'slug-articulo-anterior', title: 'Título corto', category: 'Tutorial', readTime: '9 min' },
next: { slug: 'slug-articulo-siguiente', title: 'Título corto', category: 'Guía', readTime: '11 min' },
```

**Importante**: cuando añades un artículo nuevo, actualiza el campo `next` del artículo anterior para que apunte al nuevo. El orden es cronológico por fecha de publicación (campo `date`).

---

## 6. Categorías disponibles

| Valor | Uso |
|-------|-----|
| `'Tutorial'` | Guías paso a paso con instrucciones concretas |
| `'Guía'` | Explicaciones conceptuales de tecnologías o conceptos |
| `'Comparativa'` | Artículos X vs Y con análisis de diferencias |
| `'Recursos'` | Listas curadas, colecciones de herramientas |

---

## 7. `coverClass` y `coverOrn`

- `coverClass`: alterna entre `'cover-1'`, `'cover-2'`, `'cover-3'`, `'cover-4'`. Define el estilo de fondo de la portada del artículo.
- `coverOrn`: texto corto que aparece como ornamento en la portada. Usa palabras descriptivas en inglés, sin espacios: `'deploy'`, `'data'`, `'AI'`, `'vs'`, `'code'`, `'tools'`, `'video'`, `'docker'`, `'json'`, `'base64'`, `'next'`.

---

## 8. Longitudes recomendadas

| Campo | Longitud recomendada |
|-------|----------------------|
| `title` | 50-70 caracteres (incluye " — GaloDev") |
| `headline` | 60-80 caracteres |
| `lede` | 150-250 caracteres (1-2 frases) |
| `excerpt` | 120-180 caracteres (1-2 frases) |
| `coverOrn` | 2-10 caracteres |
| `readTime` | Calcula ~200 palabras/min. 2000w = 10min |

Para el campo `content`:
- Artículo corto: ~2000 palabras de texto real
- Artículo medio: ~2500 palabras
- Artículo largo: ~2750–3000 palabras

---

## 9. Checklist antes de publicar

- [ ] `slug` es único en el array `articles`
- [ ] `issue` es el siguiente número disponible (con cero: `'15'`, no `'15'`)
- [ ] Todos los `id` en `toc` coinciden exactamente con los `id` de los `<h2>` en `content`
- [ ] El artículo incluye exactamente **1 `numbers-callout`**
- [ ] El artículo incluye exactamente **1 `pullquote`**
- [ ] El artículo incluye sección **FAQs** con mínimo 4 preguntas como último `<h2>`
- [ ] El contenido **no tiene backticks** (` `` `) — rompen el template literal
- [ ] Los **caracteres especiales** como `<`, `>` en texto están escapados como `&lt;`, `&gt;`
- [ ] El artículo anterior tiene su campo `next` actualizado apuntando a este artículo
- [ ] Al menos **1 CTA** a una herramienta de GaloDev si el tema lo permite
- [ ] `prev` apunta al artículo cronológicamente anterior
- [ ] `next` está ausente si es el artículo más reciente

---

## 10. Ejemplo mínimo completo

```typescript
{
  slug: 'que-es-typescript',
  title: '¿Qué es TypeScript y por qué usarlo? — GaloDev',
  headline: '¿Qué es TypeScript? La guía que necesitas.',
  lede: 'Tipos estáticos, interfaces, generics y por qué TypeScript se ha convertido en el estándar de la industria para proyectos JavaScript serios.',
  category: 'Guía',
  readTime: '9 min',
  date: 'Jun 01, 2025',
  dateISO: '2025-06-01',
  issue: '15',
  coverClass: 'cover-3',
  coverOrn: 'types',
  excerpt: 'Tipos estáticos, interfaces, generics y por qué TypeScript domina el desarrollo JavaScript moderno. Guía completa para empezar.',
  toc: [
    { id: 'intro', label: '¿Qué es TypeScript?' },
    { id: 'por-que', label: 'Por qué usar TypeScript' },
    { id: 'tipos', label: 'Tipos básicos' },
    { id: 'interfaces', label: 'Interfaces y tipos' },
    { id: 'generics', label: 'Generics' },
    { id: 'empezar', label: 'Cómo empezar' },
    { id: 'faqs', label: 'Preguntas frecuentes' },
  ],
  content: `
<h2 id="intro">¿Qué es <span class="italic">TypeScript</span>?</h2>
<p>TypeScript es un superset de JavaScript que añade tipado estático opcional...</p>

<div class="numbers-callout">
  <div><div class="n-label">Proyectos en GitHub</div><div class="n-num">50<span class="italic">%+</span></div></div>
  <div><div class="n-label">Reducción de bugs</div><div class="n-num">15<span class="italic">%</span></div></div>
  <div><div class="n-label">Stack Overflow rank</div><div class="n-num">5<span class="italic">º</span></div></div>
</div>

<!-- ... resto del contenido ... -->

<div class="pullquote">
  TypeScript no ralentiza el desarrollo. <span class="italic">Acelera</span> el mantenimiento.
</div>

<!-- ... más secciones ... -->

<h2 id="faqs">Preguntas <span class="italic">frecuentes.</span></h2>
<h3>¿TypeScript reemplaza a JavaScript?</h3>
<p>No. TypeScript compila a JavaScript — el output final siempre es JS...</p>
<h3>¿Es TypeScript más lento?</h3>
<p>El runtime es idéntico porque TypeScript compila a JavaScript...</p>
  `,
  prev: { slug: 'que-es-nextjs', title: '¿Qué es Next.js? La guía definitiva', category: 'Guía', readTime: '14 min' },
},
```

---

## 11. Añadir el artículo al array

Los artículos están en **orden cronológico ascendente** — el más antiguo primero, el más reciente al final. Inserta el nuevo artículo al final del array `articles`, antes del cierre `];`.

El array está en `lib/articles.ts`. Las funciones de utilidad `getArticleBySlug()` y `getAllSlugs()` al final del archivo no necesitan modificarse — funcionan con cualquier artículo que añadas al array.
