let storage = {};

export function setupMocks() {
    global.Storage.prototype.setItem = jest.fn((key, value) => {
        storage[key] = value;
    });
    global.Storage.prototype.getItem = jest.fn((key) => storage[key]);
}

export function clear() {
    storage = {};
}