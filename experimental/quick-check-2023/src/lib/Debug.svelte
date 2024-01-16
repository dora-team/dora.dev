<script>
    import { slide } from "svelte/transition";
    export let metrics, step, industry;
    let expanded = false;
</script>

<div
    style="cursor:pointer;font-family:monospace;border:1px solid lightgrey;padding:.25rem;width:fit-content"
    on:click={() => {
        expanded = !expanded;
    }}
>
    DEBUG {#if expanded}🔼{:else}🔽{/if}
</div>

{#if expanded}
    <div
        style="background-color:lightgray;width:max-content;padding:1em;font-family:monospace"
        transition:slide
    >
        leadtime: {metrics["leadtime"]}<br />
        deployfreq: {metrics["deployfreq"]}<br />
        changefailure: {metrics["changefailure"]}<br />
        failurerecovery: {metrics["failurerecovery"]}<br />
        step: {step}<br />
        industry: {industry}<br>
        <a href="/">start over</a>
    </div>
{/if}
