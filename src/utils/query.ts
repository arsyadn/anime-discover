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

export const generateYearOptions = (startYear = 1990) => {
  const currentYear = new Date().getFullYear();
  const options = [{ label: "All Year", value: "" }];

  for (let year = currentYear; year >= startYear; year--) {
    options.push({
      label: String(year),
      value: String(year),
    });
  }

  return options;
};
