<script lang="ts">
    import { doglist, savedDoglist } from "./state";

    // Capitalize the first letter of each word in a string
    const formatName = (name: string) => {
        return name
            .split(" ")
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");
    };
</script>

<aside
    class="h-full bg-white shadow-xl border w-fit rounded-lg flex flex-col
p-2 gap-2">
    <div>
        <input
            type="text"
            placeholder="Search"
            class="input input-bordered input-sm w-full input-primary" />
    </div>
    <ul
        class="h-full flex flex-col items-start
    overflow-y-auto overflow-x-hidden text-sm">
        {#each $doglist as dog}
            <button
                on:click={async () => {
                    if ($savedDoglist.includes(dog)) {
                        savedDoglist.update(list =>
                            list.filter(d => d !== dog)
                        );
                    } else {
                        savedDoglist.update(list => [...list, dog]);
                    }
                }}
                class="w-full text-left rounded-md p-1 my-[1px] duration-100
                {$savedDoglist.includes(dog) ? 'bg-accent' : ''}
            ">{formatName(dog)}</button>
        {/each}
    </ul>
    <button
        on:click={() => savedDoglist.set([])}
        class="btn btn-sm btn-primary w-full">
        Reset
    </button>
</aside>
