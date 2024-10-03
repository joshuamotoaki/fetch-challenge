<script lang="ts">
    import { doglist } from "./state";

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
            <button class="">{formatName(dog)}</button>
        {/each}
    </ul>
</aside>
