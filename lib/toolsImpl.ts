/** Slugs that have a working implementation (rendered by ToolRenderer) */
const IMPLEMENTED_SLUGS = new Set([
  'json-formatter',
  'base64',
  'password-generator',
  'regex-tester',
  'jwt-decoder',
  'uuid-generator',
  'markdown-previewer',
  'pomodoro-timer',
  'quick-notes',
  'focus-mode',
  'qr-code-maker',
  'image-compressor',
  'unit-converter',
  'color-converter',
  'url-encoder',
]);

export function hasImplementation(slug: string): boolean {
  return IMPLEMENTED_SLUGS.has(slug);
}
