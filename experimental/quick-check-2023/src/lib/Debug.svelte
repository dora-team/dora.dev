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
        leadtime: <input type="number" min="1" max="6" value={metrics["leadtime"]} on:change={(e) => {metrics["leadtime"] = e.target.value}}><br />
        deployfreq: <input type="number" min="1" max="6" value={metrics["deployfreq"]} on:change={(e) => {metrics["deployfreq"] = e.target.value}}><br />
        changefailure: <input type="number" min="0" max="100" value={metrics["changefailure"]} on:change={(e) => {metrics["changefailure"] = e.target.value}}><br />
        failurerecovery: <input type="number" min="1" max="6" value={metrics["failurerecovery"]} on:change={(e) => {metrics["failurerecovery"] = e.target.value}}><br />
        step: {step}<br />
        industry: {industry}<br>
        <a href="/">start over</a>
    </div>
{/if}
