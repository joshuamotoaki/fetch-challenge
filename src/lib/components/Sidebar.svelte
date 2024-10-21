<script lang="ts">
    import {
        cacheBreed,
        formatBreedName,
        refreshGallery
    } from "../scripts/helpers";
    import { doglist, savedDoglist } from "../scripts/state";

    // Filter the dog list based on the search input
    let searchInput: string = "";
    $: filteredDoglist = $doglist.filter(dog =>
        dog.includes(searchInput.toLowerCase())
    );

    // Save the dog, fetch images if needed, refresh gallery UI
    const handleClickedDog = async (dog: string) => {
        if ($savedDoglist.includes(dog)) {
            savedDoglist.update(list => list.filter(d => d !== dog));
        } else {
            savedDoglist.update(list => [...list, dog]);
            await cacheBreed(dog);
        }

        refreshGallery();
    };
</script>

<aside
    class="h-full bg-white shadow-xl border w-fit rounded-lg flex flex-col
p-2 gap-2">
    <button class="w-20 sm:w-fit"
        on:click={() => {
            // Set scroll position of id="gallery" to 0 smoothly
            const galleryElem = document.getElementById("gallery");
            if (galleryElem) {
                galleryElem.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });
            }
        }}>
        <h2 class="text-base sm:text-xl font-semibold p-1">🐶 The Barkchives</h2>
    </button>

    <div>
        <input
            bind:value={searchInput}
            type="text"
            placeholder="Search"
            class="input input-bordered input-sm w-20 sm:w-fit input-primary" />
    </div>
    <div
        class="h-full flex flex-col items-start
    overflow-y-auto overflow-x-hidden text-xs sm:text-sm">
        {#each filteredDoglist as dog}
            <button
                on:click={() => handleClickedDog(dog)}
                class="w-20 sm:w-full text-left rounded-md p-1 my-[1px] duration-100 
                {$savedDoglist.includes(dog)
                    ? 'bg-primary'
                    : 'hover:bg-purple-100'}
            ">{formatBreedName(dog)}</button>
        {/each}
    </div>
    <button
        on:click={() => {
            savedDoglist.set([]);
            refreshGallery();
        }}
        class="btn btn-sm btn-primary w-20 sm:w-full">
        Reset
    </button>
</aside>
