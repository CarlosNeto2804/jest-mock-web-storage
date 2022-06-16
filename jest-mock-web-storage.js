class JestMockWebStorage {
  constructor() {
    this.__verifyIfLibWorkingOnApplication();
    this.storage = {};
  }
  __verifyIfLibWorkingOnApplication() {
    if (window === "undefined" || window.Storage === "undefined") {
      throw new Error("Library not supported on platform");
    }
  }
  __mockStorageRemoveItem() {
    Storage.prototype.removeItem = jest.fn().mockImplementation((key) => {
      delete this.storage[key];
      return true;
    });
  }
  __mockStorageGetItem() {
    Storage.prototype.getItem = jest
      .fn()
      .mockImplementation((key) => this.storage[key]);
  }
  __mockStorageSetItem() {
    Storage.prototype.setItem = jest.fn().mockImplementation((key, value) => {
      if (!key) {
        throw new Error("Missing required field: 'key'");
      }
      this.storage[key] = value;
    });
  }
  createSandbox() {
    this.__mockStorageGetItem();
    this.__mockStorageSetItem();
    this.__mockStorageRemoveItem();
    return this
  }

  restore() {
    this.storage = {};
    jest.clearAllMocks();
    return true
  }
}


const buildLibrary = () => {
  const library = new JestMockWebStorage();
  return {
    createStorage: library.createSandbox,
    restoreStorage: library.restore 
  }
}


exports.JestMockWebStorage = JestMockWebStorage;
module.exports = buildLibrary();
