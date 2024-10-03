<script>
    import { currentImages } from "./state";
    import DogImage from "./DogImage.svelte";
</script>

<main class="flex-1 shadow-xl border rounded-lg h-full bg-white">
    <div class="p-2 grid grid-cols-3 gap-2">
        {#each $currentImages as dogImage}
            <DogImage {dogImage} />
        {:else}
            <p>No images found</p>
        {/each}
    </div>
</main>
