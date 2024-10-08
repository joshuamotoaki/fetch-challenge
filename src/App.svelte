<script lang="ts">
    import { onMount } from "svelte";
    import Failure from "./lib/components/Failure.svelte";
    import Gallery from "./lib/components/Gallery.svelte";
    import Sidebar from "./lib/components/Sidebar.svelte";
    import { cacheBreed, refreshGallery } from "./lib/scripts/helpers";
    import { doglist, isFailure, savedDoglist } from "./lib/scripts/state";

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
            await cacheBreed(breed);
        }

        // Add images to the gallery if there are saved dogs
        if ($savedDoglist.length > 0) {
            refreshGallery();
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
                <section class="p-2 pr-0 overflow-hidden">
                    <Sidebar />
                </section>
                <section class="p-2 flex-1 overflow-hidden">
                    <Gallery />
                </section>
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
