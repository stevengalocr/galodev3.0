/** Slugs that have a working implementation (rendered by ToolRenderer) */
const IMPLEMENTED_SLUGS = new Set([
  'base64',
  'video-trimmer',
  'video-compressor',
  'gif-maker',
  'reels-downloader',
  'tiktok-downloader',
]);

export function hasImplementation(slug: string): boolean {
  return IMPLEMENTED_SLUGS.has(slug);
}
