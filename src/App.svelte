<script lang="ts">
    import { onMount } from "svelte";
    import Navbar from "./lib/Navbar.svelte";
    import { doglist } from "./lib/state";

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
            throw new Error("Failed to fetch dog list");
        }

        const newDogList: string[] = [];
        for (const [breed, subBreeds] of Object.entries(rawDoglistJson.message)) {
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

<Navbar />
