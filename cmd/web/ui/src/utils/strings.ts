export const ellipsis = (str: string, lim: number) =>
  str.length > lim
    ? `${str.substring(0, lim)}...`
    : str