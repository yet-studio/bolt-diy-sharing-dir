export async function generateHash(input: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(input);
  
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  
  return hashHex;
}

export async function generateUniqueFileName(originalName: string): Promise<string> {
  const timestamp = Date.now();
  const randomString = Math.random().toString(36).substring(2, 15);
  const hash = await generateHash(`${originalName}${timestamp}${randomString}`);
  
  const extension = originalName.split('.').pop();
  return `${hash}${extension ? `.${extension}` : ''}`;
}
