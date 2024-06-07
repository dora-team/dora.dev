<script>
    export let view_mode = "summary";
</script>

<div class="viewcontrol">
    View mode:
    <label for="summary"
        ><input
            type="radio"
            name="view_mode"
            bind:group={view_mode}
            value="summary"
            id="summary"
        />summary</label
    >
    <label for="detail"
        ><input
            type="radio"
            name="view_mode"
            bind:group={view_mode}
            value="detail"
            id="detail"
        />detail</label
    >
</div>

<style lang="scss">
    .viewcontrol {
        margin: 2em;
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