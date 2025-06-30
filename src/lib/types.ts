
export const SUBJECTS = {
  GRANT: 'permissions.grant',
  REVOKE: 'permissions.revoke',
  CHECK: 'permissions.check',
  LIST: 'permissions.list'
};


export type ModuleActions = {
    TRADES: 'create' | 'create-manual';
    INVENTORY: 'create' | 'update' | 'delete' | 'read';
    USERS: 'create' | 'read' | 'update' | 'delete' | 'block';
    REPORTS: 'generate' | 'view' | 'export';
    SETTINGS: 'read' | 'update';
    PAYMENTS: 'initiate' | 'confirm' | 'cancel' | 'refund';
}

export type Module = keyof ModuleActions;
export type Action<M extends Module> = ModuleActions[M];



export type ErrorResponse = {
  error: {
    code: string;
    message: string;
  };
};


export function isErrorResponse(obj: any): obj is ErrorResponse {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    typeof obj.error === 'object' &&
    typeof obj.error.code === 'string' &&
    typeof obj.error.message === 'string'
  );
}

export type GrantRequest<M extends Module = Module> = {
  apiKey: string;
  module: M;
  action: Action<M>;
};

export type GrantResponse = {
  status: 'ok';
};

export type RevokeRequest<M extends Module = Module> = {
  apiKey: string;
  module: M;
  action: Action<M>;
};

export type RevokeResponse = {
  status: 'ok';
};




export type GrantRevokeRequest<M extends Module = Module> = {
apiKey: string;
module: M;
action: Action<M>;
};

export type CheckRequest<M extends Module = Module> = {
apiKey: string;
module: M;
action: Action<M>;
};

export type ListRequest = {
apiKey: string;
};

export type Permission<M extends Module = Module> = {
module: M;
action: Action<M>;
};

export type ErrorCode = 'db_error' | 'not_found' | 'invalid_request' | 'unknown';

export type SuccessResponse = { status: 'ok' };

export type CheckResponse = { allowed: boolean };

export type ListResponse<M extends Module = Module> = { permissions: Permission<M>[] };



