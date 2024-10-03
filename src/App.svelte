<script lang="ts">
    import { onMount } from "svelte";
    import Navbar from "./lib/Navbar.svelte";
    import { doglist, isFailure } from "./lib/state";
    import Failure from "./lib/Failure.svelte";
    import Sidebar from "./lib/Sidebar.svelte";
    import Gallery from "./lib/Gallery.svelte";

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

        // Set the store in order to initialize the app
        doglist.set(newDogList);
    });
</script>

{#if $isFailure}
    <Failure />
{:else}
    <div class="w-screen h-screen overflow-hidden flex flex-col bg-base-100">
        <div class="p-2 pb-0">
            <Navbar />
        </div>
        {#if $doglist.length > 0}
            <div class="flex flex-1 overflow-hidden">
                <div class="p-2 pr-0 overflow-hidden">
                    <Sidebar />
                </div>
                <div class="p-2 flex-1">
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
