
export const SUBJECTS = {
  GRANT: 'permissions.grant',
  REVOKE: 'permissions.revoke',
  CHECK: 'permissions.check',
  LIST: 'permissions.list'
};


// ...existing code...

export type ErrorResponse = {
  error: {
    code: string;
    message: string;
  };
};

// Optional: type guard for ErrorResponse
export function isErrorResponse(obj: any): obj is ErrorResponse {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    typeof obj.error === 'object' &&
    typeof obj.error.code === 'string' &&
    typeof obj.error.message === 'string'
  );
}

export type GrantRequest = {
  apiKey: string;
  module: string;
  action: string;
};

export type GrantResponse = {
  status: 'ok';
};

export type RevokeRequest = {
  apiKey: string;
  module: string;
  action: string;
};

export type RevokeResponse = {
  status: 'ok';
};

// ...other types...


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



