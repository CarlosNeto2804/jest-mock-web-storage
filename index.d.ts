declare module "jest-mock-web-storage" {
  export class JestMockWebStorage {
    constructor();
    restore(): boolean;
    createSandbox(): this;
  }
  export default {
    createStorage: () => JestMockWebStorage,
    restoreStorage: boolean,
  };
}
