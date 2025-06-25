export type GrantRevokeRequest = {
apiKey: string;
module: string;
action: string;
};

export type CheckRequest = {
apiKey: string;
module: string;
action: string;
};

export type ListRequest = {
apiKey: string;
};

export type Permission = {
module: string;
action: string;
};

export type ErrorCode = 'db_error' | 'not_found' | 'invalid_request' | 'unknown';

export type SuccessResponse = { status: 'ok' };

export type CheckResponse = { allowed: boolean };

export type ListResponse = { permissions: Permission[] };