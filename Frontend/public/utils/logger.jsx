export const logEvent = (message) => {
  const log = `[${new Date().toISOString()}] ${message}`;
  alert(log); };
