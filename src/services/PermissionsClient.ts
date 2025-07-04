import type { Module, Action, Permission } from '../lib/types.ts';

export class PermissionsClient {
  private granted: Set<string> = new Set();

  grant<M extends Module>(module: M, action: Action<M>) {
    this.granted.add(this.toKey(module, action));
  }

  revoke<M extends Module>(module: M, action: Action<M>) {
    this.granted.delete(this.toKey(module, action));
  }

  check<M extends Module>(module: M, action: Action<M>): boolean {
    return this.granted.has(this.toKey(module, action));
  }

  list<M extends Module = Module>(): Permission<M>[] {
    return [...this.granted].map((entry) => {
      const [module, action] = entry.split(':');
      return {
        module: module as M,
        action: action as Action<M>
      };
    });
  }

  private toKey<M extends Module>(module: M, action: Action<M>): string {
    return `${module}:${action}`;
  }
}
