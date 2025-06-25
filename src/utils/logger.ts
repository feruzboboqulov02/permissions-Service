export const log = (event: string, details: Record<string, any>) => {
console.log(JSON.stringify({ timestamp: new Date().toISOString(), event, ...details }));
};