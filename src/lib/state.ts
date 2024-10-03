import { writable } from "svelte/store";

export const doglist = writable<string[]>([]);
