<script lang="ts">
    import { currentImages, dogImages, doglist, savedDoglist } from "../scripts/state";

    // Filter the dog list based on the search input
    let searchInput: string = "";
    $: filteredDoglist = $doglist.filter(dog =>
        dog.includes(searchInput.toLowerCase())
    );

    // Capitalize the first letter of each word in a string
    const formatName = (name: string) => {
        return name
            .split(" ")
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");
    };

    // Save the dog, fetch images if needed, refresh gallery UI
    const handleClickedDog = async (dog: string) => {
        if ($savedDoglist.includes(dog)) {
            savedDoglist.update(list => list.filter(d => d !== dog));
        } else {
            savedDoglist.update(list => [...list, dog]);
            const apiName = dog.split(" ").reverse().join("/");

            // Only fetch the images if they haven't been fetched yet
            if (!$dogImages[dog]) {
                await fetch(`https://dog.ceo/api/breed/${apiName}/images/random/20`)
                    .then(res => res.json())
                    .then(data => {
                        $dogImages[dog] = data.message;
                    });
            }
        }

        // Round robin algorithm to display images in a grid
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

        // Refresh the gallery UI
        currentImages.set(newImageURLs);
    };
</script>

<aside
    class="h-full bg-white shadow-xl border w-fit rounded-lg flex flex-col
p-2 gap-2">
    <button
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
        <h2 class="text-xl font-semibold p-1">🐶 The Barkchives</h2>
    </button>

    <div>
        <input
            bind:value={searchInput}
            type="text"
            placeholder="Search"
            class="input input-bordered input-sm w-full input-primary" />
    </div>
    <ul
        class="h-full flex flex-col items-start
    overflow-y-auto overflow-x-hidden text-sm">
        {#each filteredDoglist as dog}
            <button
                on:click={() => handleClickedDog(dog)}
                class="w-full text-left rounded-md p-1 my-[1px] duration-100
                {$savedDoglist.includes(dog)
                    ? 'bg-primary'
                    : 'hover:bg-purple-100'}
            ">{formatName(dog)}</button>
        {/each}
    </ul>
    <button
        on:click={() => savedDoglist.set([])}
        class="btn btn-sm btn-primary w-full">
        Reset
    </button>
</aside>
