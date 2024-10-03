import { writable } from "svelte/store";

export const isFailure = writable<boolean>(false);

export const doglist = writable<string[]>([]);
