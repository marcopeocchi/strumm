export const formatMMSS = (seconds: number) => new Date((seconds || 1) * 1000)
  .toISOString()
  .substring(14, 19)