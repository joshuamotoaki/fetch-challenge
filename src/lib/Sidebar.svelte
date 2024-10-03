<script>
    import { doglist } from "./state";
</script>

<aside class="h-full bg-primary w-fit rounded-lg">
    <ul class="p-2 h-full overflow-y-auto overflow-x-hidden">
        {#each $doglist as dog}
            <li class="">{dog}</li>
        {/each}
    </ul>
</aside>
