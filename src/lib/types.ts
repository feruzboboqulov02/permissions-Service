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

export type SuccessResponse = { status: 'ok' };

export type CheckResponse = { allowed: boolean };

export type ListResponse = { permissions: Permission[] };