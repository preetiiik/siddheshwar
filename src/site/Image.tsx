import type { ImgHTMLAttributes } from 'react';
import manifest from './image-manifest.json';

export function SiteImage({ src, ...props }: ImgHTMLAttributes<HTMLImageElement>) {
  const images: Record<string, string> = manifest;
  const optimized = src ? images[decodeURIComponent(src)] : undefined;
  return <img {...props} src={optimized ? encodeURI(optimized) : src} />;
}
