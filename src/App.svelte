<script lang="ts">
    import { onMount } from "svelte";
    import Navbar from "./lib/Navbar.svelte";
    import { doglist, isFailure } from "./lib/state";
    import Failure from "./lib/Failure.svelte";

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
                    newDogList.push(`${breed} ${subBreed}`);
                });
            } else {
                newDogList.push(breed);
            }
        }

        // Set the store in order to initialize the app
        doglist.set(newDogList);
    });
</script>

{#if isFailure}
    <Failure />
{:else}
    <Navbar />
    {#if $doglist.length > 0}
        <button class="btn btn-primary"> Hi there! </button>
    {:else}
        <div class="flex flex-col items-center justify-center mt-12">
            <div>
                <span class="loading loading-dots loading-lg"></span>
            </div>
            <h2 class="text-2xl font-semibold">Loading dogs</h2>
        </div>
    {/if}
{/if}
