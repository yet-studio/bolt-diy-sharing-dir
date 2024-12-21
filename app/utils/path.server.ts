export function joinPaths(...parts: string[]): string {
  // Nettoyer les parties du chemin
  const cleanParts = parts.map(part => 
    part.replace(/^\/+/, '').replace(/\/+$/, '')
  ).filter(Boolean);

  // Joindre avec un seul slash
  return cleanParts.join('/');
}

export function getExtension(filename: string): string {
  const parts = filename.split('.');
  return parts.length > 1 ? parts.pop() || '' : '';
}

export function getBasename(filename: string): string {
  const parts = filename.split('/');
  return parts[parts.length - 1];
}
