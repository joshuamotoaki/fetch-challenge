import { get, writable } from "svelte/store";

// Sets to true if the app encounters an error (shows <Failure /> component)
export const isFailure = writable<boolean>(false);

// List of dog breeds fetched from the Dog API
export const doglist = writable<string[]>([]);

// Dog image URLs fetched from the Dog API
export const dogImages = writable<string[]>([]);

// Generic persistent store that saves to local storage
const createLocalStorageStore = <T>(key: string, initialValue: T) => {
    const store = writable<T>(initialValue);

    return {
        subscribe: store.subscribe,
        set: (value: T) => {
            localStorage.setItem(key, JSON.stringify(value));
            store.set(value);
        },
        update: (updater: (value: T) => T) => {
            const value = updater(get(store));
            localStorage.setItem(key, JSON.stringify(value));
            store.set(value);

            return value;
        }
    };
};

// List of dog breeds saved to local storage
export const savedDoglist = createLocalStorageStore<string[]>("doglist", []);
