export function formatRevisionDuration(seconds = 0) {
  const safeSeconds = Math.floor(Math.max(0, Number(seconds) || 0));
  const minutes = Math.floor(safeSeconds / 60);
  const hours = Math.floor(minutes / 60);

  if (hours > 0) return `${hours}h ${minutes % 60}m`;
  if (minutes > 0) return `${minutes}m`;
  return `${safeSeconds}s`;
}
