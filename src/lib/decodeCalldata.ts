export function getSelector(input: string) {
  return input.slice(0, 10); // 4-byte selector
}

export function splitArgs(input: string): string[] {
  const argsHex = input.slice(10);
  const chunks = argsHex.match(/.{1,64}/g) || [];
  return chunks.map((chunk) => '0x' + chunk);
}
