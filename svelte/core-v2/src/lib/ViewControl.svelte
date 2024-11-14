<script>
    import { onMount } from 'svelte';

    export let view_mode = "summary";

    // Function to update view_mode based on URL query parameter
    const updateViewModeFromQuery = () => {
        const urlParams = new URLSearchParams(window.location.search);
        const mode = urlParams.get('view');
        view_mode = mode === 'detail' ? 'detail' : 'summary';
    };

    // Function to update URL query parameter based on view_mode
    const updateUrlQuery = () => {
        const urlParams = new URLSearchParams(window.location.search);
        urlParams.set('view', view_mode);
        window.history.replaceState({}, '', `${window.location.pathname}?${urlParams.toString()}`);
    };

    onMount(() => {
        updateViewModeFromQuery();
        window.addEventListener('popstate', updateViewModeFromQuery); // Handle back/forward
        return () => {
            window.removeEventListener('popstate', updateViewModeFromQuery);
        };
    });
</script>

<div class="viewcontrol">
    View mode:
    <label for="summary" class:active={view_mode === 'summary'}>
        <input
            type="radio"
            name="view_mode"
            bind:group={view_mode}
            value="summary"
            id="summary"
            on:change={updateUrlQuery}
        />summary
    </label>
    <label for="detail" class:active={view_mode === 'detail'}>
        <input
            type="radio"
            name="view_mode"
            bind:group={view_mode}
            value="detail"
            id="detail"
            on:change={updateUrlQuery}
        />detail
    </label>
</div>

<style lang="scss">
    .viewcontrol {
        text-align: right;
        label {
            border: 1px solid var(--color-grey-light);
            padding: 0.5em;
            border-radius: 0.5em;

            input[type="radio"] {
                margin-right:.25em;
            }
        }
    }
</style>
