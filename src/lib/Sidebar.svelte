<script lang="ts">
    import { dogImages, doglist, savedDoglist } from "./state";

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
    const handleClickedDog = (dog: string) => {
        if ($savedDoglist.includes(dog)) {
            savedDoglist.update(list => list.filter(d => d !== dog));
        } else {
            savedDoglist.update(list => [...list, dog]);
            const apiName = dog.split(" ").reverse().join("/");

            // Only fetch the images if they haven't been fetched yet
            if (!$dogImages[dog]) {
                fetch(`https://dog.ceo/api/breed/${apiName}/images`)
                    .then(res => res.json())
                    .then(data => {
                        $dogImages[dog] = data.message;
                    });
            }
        }

        // Refresh the gallery UI
    };
</script>

<aside
    class="h-full bg-white shadow-xl border w-fit rounded-lg flex flex-col
p-2 gap-2">
    <h2 class="text-xl font-semibold p-1">🐶 The Barkchives</h2>

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
