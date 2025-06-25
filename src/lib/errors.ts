export enum ErrorCode {
ApiKeyNotFound = 'apiKey_not_found',
DbError = 'db_error',
CacheError = 'cache_error',
InvalidPayload = 'invalid_payload'
}

export type ErrorResponse = {
error: {
code: ErrorCode;
message: string;
};
};