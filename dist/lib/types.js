"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SUBJECTS = void 0;
exports.isErrorResponse = isErrorResponse;
/**
 * NATS subjects for the permissions service
 */
exports.SUBJECTS = {
    GRANT: 'permissions.grant',
    REVOKE: 'permissions.revoke',
    CHECK: 'permissions.check',
    LIST: 'permissions.list'
};
// Optional: type guard for ErrorResponse
function isErrorResponse(obj) {
    return (typeof obj === 'object' &&
        obj !== null &&
        typeof obj.error === 'object' &&
        typeof obj.error.code === 'string' &&
        typeof obj.error.message === 'string');
}
