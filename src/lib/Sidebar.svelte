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

<aside class="h-full bg-primary w-fit rounded-lg">
    <ul
        class="p-2 h-full flex flex-col items-start
    overflow-y-auto overflow-x-hidden">
        {#each $doglist as dog}
            <button 
            on:click={() => {
                if ($savedDoglist.includes(dog)) {
                    savedDoglist.update(list => list.filter(d => d !== dog));
                } else {
                    savedDoglist.update(list => [...list, dog]);
                }
            }}
            class="
                {$savedDoglist.includes(dog) ? 'bg-accent' : 'bg-primary'}
            ">{formatName(dog)}</button>
        {/each}
    </ul>
</aside>
