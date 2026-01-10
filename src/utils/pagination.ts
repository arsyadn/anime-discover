export const DEFAULT_LIMIT = 15;

export function getOffset(page: number, limit: number = DEFAULT_LIMIT): number {
  return Math.max(page - 1, 0) * limit;
}
