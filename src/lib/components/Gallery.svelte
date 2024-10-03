<script>
    import { currentImages } from "../scripts/state";
    import DogImage from "./DogImage.svelte";
    import { onMount } from "svelte";

    // Adjust the number of columns based on the window width
    let numCols = 3;
    const updateNumCols = () => {
        const screenWidth = window.innerWidth;
        if (screenWidth >= 1400) {
            numCols = 6;
        } else if (screenWidth >= 1200) {
            numCols = 5;
        } else if (screenWidth >= 992) {
            numCols = 4;
        } else if (screenWidth >= 768) {
            numCols = 3;
        } else if (screenWidth >= 576) {
            numCols = 2;
        } else {
            numCols = 1;
        }
    };

    onMount(() => {
        updateNumCols();
        window.addEventListener("resize", updateNumCols);
        return () => window.removeEventListener("resize", updateNumCols);
    });

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
