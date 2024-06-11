import localforage from 'localforage';

localforage.config({
    name: 'ShoppingList',
    version: 1,
    storeName: 'listdata'
});

export function getItem(key) {
    return localforage.getItem(key);
} 

export function setItem(key, value) {
    return localforage.setItem(key, value);
}