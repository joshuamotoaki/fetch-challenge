<script lang="ts">
    import { onMount } from "svelte";
    import { currentImages, dogImages, doglist, isFailure, savedDoglist } from "./lib/scripts/state";
    import Failure from "./lib/components/Failure.svelte";
    import Sidebar from "./lib/components/Sidebar.svelte";
    import Gallery from "./lib/components/Gallery.svelte";

    type RawDogList = {
        message: {
            [breed: string]: string[];
        };
        status: string;
    };

    onMount(async () => {
        // Fetch the list of all dogs from the Dog API
        const rawDoglist = await fetch("https://dog.ceo/api/breeds/list/all");
        const rawDoglistJson: RawDogList = await rawDoglist.json();

        // Immediately throw an error if the API request failed
        if (rawDoglistJson.status !== "success") {
            isFailure.set(true);
        }

        const newDogList: string[] = [];
        for (const [breed, subBreeds] of Object.entries(
            rawDoglistJson.message
        )) {
            if (subBreeds.length > 0) {
                subBreeds.forEach((subBreed: string) => {
                    newDogList.push(`${subBreed} ${breed}`);
                });
            } else {
                newDogList.push(breed);
            }
        }

        // Fetch saved dogs from local storage
        const savedDogs = localStorage.getItem("doglist");
        if (savedDogs) {
            savedDoglist.set(JSON.parse(savedDogs));
        }

        // Add images to the URL cache if they exist
        for (const breed of $savedDoglist) {
            if ($dogImages[breed] === undefined) {
                const apiName = breed.split(" ").reverse().join("/");
                await fetch(`https://dog.ceo/api/breed/${apiName}/images/random/20`)
                    .then(res => res.json())
                    .then(data => {
                        $dogImages[breed] = data.message;
                    });
            }
        }

        // Add images to the gallery if there are saved dogs
        if ($savedDoglist.length > 0) {
            const newImageURLs: [string, string][] = [];
            let shouldContinue = true;
            for (let i = 0; shouldContinue; i++) {
                shouldContinue = false;
                for (const breed of $savedDoglist) {
                    const potImg = $dogImages[breed][i];
                    if (potImg !== undefined) {
                        newImageURLs.push([potImg, breed]);
                        shouldContinue = true;
                    }
                }
            }

            currentImages.set(newImageURLs);
        }

        // Set the store in order to initialize the app
        doglist.set(newDogList);
    });
</script>

{#if $isFailure}
    <Failure />
{:else}
    <div class="w-screen h-screen overflow-hidden flex flex-col bg-purple-100">
        {#if $doglist.length > 0}
            <div class="flex flex-1 overflow-hidden">
                <div class="p-2 pr-0 overflow-hidden">
                    <Sidebar />
                </div>
                <div class="p-2 flex-1 overflow-hidden">
                    <Gallery />
                </div>
            </div>
        {:else}
            <div class="flex flex-col items-center justify-center mt-12">
                <div>
                    <span class="loading loading-dots loading-lg"></span>
                </div>
                <h2 class="text-2xl font-semibold">Loading dogs</h2>
            </div>
        {/if}
    </div>
{/if}
