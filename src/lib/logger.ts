export function logEvent(event: string, details: Record<string, any>) {
  console.log(JSON.stringify({ timestamp: new Date().toISOString(), event, ...details }));
}

export function logError(event: string, error: any) {
  console.error(JSON.stringify({ timestamp: new Date().toISOString(), event, error: error?.message || error }));
}