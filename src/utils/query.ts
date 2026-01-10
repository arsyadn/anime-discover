export const buildQuery = (
  params: Record<string, string | number | undefined>
): string => {
  return new URLSearchParams(
    Object.entries(params).reduce<Record<string, string>>(
      (acc, [key, value]) => {
        if (value !== undefined) {
          acc[key] = String(value);
        }
        return acc;
      },
      {}
    )
  ).toString();
};
