<script>
    import { currentImages } from "../scripts/state";
    import DogImage from "./DogImage.svelte";

    let numCols = 3;
    $: dispCss = `grid-template-columns: repeat(${numCols}, 1fr)`;
</script>

<main
    id="gallery"
    class="flex-1 shadow-xl border rounded-lg h-full bg-white overflow-y-auto">
    {#if $currentImages.length === 0}
        <h2 class="text-xl font-semibold text-center mt-8">No images found</h2>
        <p class="text-lg text-center">
            Add a breed in the sidebar to see images here!
        </p>
    {:else}
        <div style={dispCss} class="p-2 grid gap-2">
            <!-- Flexbox per numCols to make gallery have less whitespace -->
            {#each Array(numCols) as _, i}
                <div class="flex flex-col gap-2">
                    {#each $currentImages as dogInfo, j}
                        {#if j % numCols === i}
                            <DogImage
                                dogImage={dogInfo[0]}
                                dogName={dogInfo[1]} />
                        {/if}
                    {/each}
                </div>
            {/each}
        </div>
    {/if}
</main>
