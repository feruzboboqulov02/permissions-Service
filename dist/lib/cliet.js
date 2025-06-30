"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermissionsClient = void 0;
const nats_1 = require("nats");
const types_1 = require("./types");
const jsonCodec = (0, nats_1.JSONCodec)();
/**
 * Client for the permissions service
 */
class PermissionsClient {
    constructor(nats) {
        this.nats = nats;
    }
    /**
     * Grant a permission to an API key
     * @param request The grant request
     * @returns Promise resolving to the grant response or error
     */
    async grant(request) {
        try {
            const response = await this.nats.request(types_1.SUBJECTS.GRANT, jsonCodec.encode(request), { timeout: 5000 });
            return jsonCodec.decode(response.data);
        }
        catch (error) {
            return {
                error: {
                    code: 'internal_error',
                    message: `Failed to grant permission: ${error.message}`
                }
            };
        }
    }
    /**
     * Revoke a permission from an API key
     * @param request The revoke request
     * @returns Promise resolving to the revoke response or error
     */
    async revoke(request) {
        try {
            const response = await this.nats.request(types_1.SUBJECTS.REVOKE, jsonCodec.encode(request), { timeout: 5000 });
            return jsonCodec.decode(response.data);
        }
        catch (error) {
            return {
                error: {
                    code: 'internal_error',
                    message: `Failed to revoke permission: ${error.message}`
                }
            };
        }
    }
    /**
     * Check if an API key has a permission
     * @param request The check request
     * @returns Promise resolving to the check response or error
     */
    async check(request) {
        try {
            const response = await this.nats.request(types_1.SUBJECTS.CHECK, jsonCodec.encode(request), { timeout: 5000 });
            return jsonCodec.decode(response.data);
        }
        catch (error) {
            return {
                error: {
                    code: 'internal_error',
                    message: `Failed to check permission: ${error.message}`
                }
            };
        }
    }
    /**
     * List all permissions for an API key
     * @param request The list request
     * @returns Promise resolving to the list response or error
     */
    async list(request) {
        try {
            const response = await this.nats.request(types_1.SUBJECTS.LIST, jsonCodec.encode(request), { timeout: 5000 });
            return jsonCodec.decode(response.data);
        }
        catch (error) {
            return {
                error: {
                    code: 'internal_error',
                    message: `Failed to list permissions: ${error.message}`
                }
            };
        }
    }
}
exports.PermissionsClient = PermissionsClient;
