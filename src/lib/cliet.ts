import { NatsConnection, JSONCodec } from 'nats';
import {
  SUBJECTS,
  GrantRequest,
  GrantResponse,
  RevokeRequest,
  RevokeResponse,
  CheckRequest,
  CheckResponse,
  ListRequest,
  ListResponse,
  ErrorResponse,
  isErrorResponse
} from './types';

const jsonCodec = JSONCodec();


export class PermissionsClient {
  constructor(private nats: NatsConnection) {}

  
  async grant(request: GrantRequest): Promise<GrantResponse | ErrorResponse> {
    try {
      const response = await this.nats.request(
        SUBJECTS.GRANT,
        jsonCodec.encode(request),
        { timeout: 5000 }
      );
      return jsonCodec.decode(response.data) as GrantResponse | ErrorResponse;
    } catch (error) {
      return {
        error: {
          code: 'internal_error',
          message: `Failed to grant permission: ${(error as Error).message}`
        }
      };
    }
  }

  async revoke(request: RevokeRequest): Promise<RevokeResponse | ErrorResponse> {
    try {
      const response = await this.nats.request(
        SUBJECTS.REVOKE,
        jsonCodec.encode(request),
        { timeout: 5000 }
      );
      return jsonCodec.decode(response.data) as RevokeResponse | ErrorResponse;
    } catch (error) {
      return {
        error: {
          code: 'internal_error',
          message: `Failed to revoke permission: ${(error as Error).message}`
        }
      };
    }
  }

  
  async check(request: CheckRequest): Promise<CheckResponse | ErrorResponse> {
    try {
      const response = await this.nats.request(
        SUBJECTS.CHECK,
        jsonCodec.encode(request),
        { timeout: 5000 }
      );
      return jsonCodec.decode(response.data) as CheckResponse | ErrorResponse;
    } catch (error) {
      return {
        error: {
          code: 'internal_error',
          message: `Failed to check permission: ${(error as Error).message}`
        }
      };
    }
  }

  
  async list(request: ListRequest): Promise<ListResponse | ErrorResponse> {
    try {
      const response = await this.nats.request(
        SUBJECTS.LIST,
        jsonCodec.encode(request),
        { timeout: 5000 }
      );
      return jsonCodec.decode(response.data) as ListResponse | ErrorResponse;
    } catch (error) {
      return {
        error: {
          code: 'internal_error',
          message: `Failed to list permissions: ${(error as Error).message}`
        }
      };
    }
  }
}
