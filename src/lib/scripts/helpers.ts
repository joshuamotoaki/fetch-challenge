import { get } from "svelte/store";
import { breedCache, currentImages, savedDoglist } from "./state";

/**
 * Fetches URLs of images of a given breed from the Dog API and caches them
 * @param breed The breed to cache
 */
export const cacheBreed = async (breed: string) => {
    if (!get(breedCache)[breed]) {
        const apiName = breed.split(" ").reverse().join("/");
        await fetch(`https://dog.ceo/api/breed/${apiName}/images/random/20`)
            .then(res => res.json())
            .then(data => {
                get(breedCache)[breed] = data.message;
            });
    }
};

/**
 * Refreshes the gallery with the current saved dog breeds
 */
export const refreshGallery = () => {
    const newImageURLs: [string, string][] = [];
    let shouldContinue = true;
    for (let i = 0; shouldContinue; i++) {
        shouldContinue = false;
        for (const breed of get(savedDoglist)) {
            const potImg = get(breedCache)[breed][i];
            if (potImg !== undefined) {
                newImageURLs.push([potImg, breed]);
                shouldContinue = true;
            }
        }
    }

    // Refresh the gallery UI
    currentImages.set(newImageURLs);
};
