<script lang="ts">
    import WebIcon from "./icons/WebIcon.svelte";

    export let dogImage: string;
    export let dogName: string;
</script>

<div class="image-container shadow-md">
    <img src={dogImage} alt={dogName} />
    <div class="overlay flex flex-col">
        <span class="text-lg font-semibold">
            {dogName}
        </span>
        <a
            href={`https://www.google.com/search?q=${dogName}`}
            target="_blank"
            rel="noopener noreferrer"
            class="text-xs">
            <WebIcon />
        </a>
    </div>
</div>

<style>
    img {
        width: 100%;
        height: auto;
        display: block;
        border-radius: 0.375rem;
    }

    .image-container {
        position: relative;
        display: inline-block;
    }

    .overlay {
        border-radius: 0.375rem;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(128, 0, 128, 0.7);
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        transition: opacity 0.3s;
    }

    .image-container:hover .overlay {
        opacity: 1;
    }
</style>
