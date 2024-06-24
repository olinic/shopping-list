// import localforage from 'localforage';

// localforage.config({
//     name: 'ShoppingList',
//     version: 1,
//     storeName: 'listdata'
// });

// export function getItem(key: string): Promise<any> {
//     return localforage.getItem(key);
// } 

// export function setItem(key: string, value: any): any {
//     return localforage.setItem(key, value);
// }

let storage: any = {};

export async function getItem(key: string): Promise<any> {
    return storage[key];
} 

export function setItem(key: string, value: any): any {
    storage[key] = value;
    return value;
}

export function clear(): void {
    storage = {};
}