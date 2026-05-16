/** Slugs that have a working implementation (rendered by ToolRenderer) */
const IMPLEMENTED_SLUGS = new Set([
  'base64',
  'password-generator',
  'json-formatter',
  'color-palette',
  'qr-code-maker',
  'video-trimmer',
  'video-compressor',
  'gif-maker',
]);

export function hasImplementation(slug: string): boolean {
  return IMPLEMENTED_SLUGS.has(slug);
}
