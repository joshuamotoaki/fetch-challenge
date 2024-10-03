<script>
    import { dogImages } from "./state";
</script>

<main class="flex-1 shadow-xl border rounded-lg h-full bg-white">
    <div class="p-2 grid grid-cols-3 gap-2">
        {#each $dogImages as dogImage}
            <img
                src={dogImage}
                alt="dog"
                class="w-1/4 h-1/4 rounded-md shadow-md" />
        {:else}
            <p>No images found</p>
        {/each}
    </div>
</main>
