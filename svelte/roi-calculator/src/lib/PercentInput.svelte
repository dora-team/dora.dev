<script>
    import { sanitizeNumericInput } from "./inputUtils.js";

    let {
        label,
        value = $bindable(),
        id,
        min = 0.000001,
        description = "",
        defaultValue = undefined,
    } = $props();

    let displayValue = $state("");
    let showDescription = $state(false);
    let isEditing = $state(false);

    // Sync display value with the internal numeric value when not actively editing
    $effect(() => {
        if (!isEditing && value !== undefined) {
            // value is 0.33, display should be 33
            const formatted = (value * 100).toFixed(2).replace(/\.?0+$/, "");
            if (displayValue !== formatted) {
                displayValue = formatted;
            }
        }
    });

    function handleInput(e) {
        let raw = sanitizeNumericInput(e.target.value);

        if (raw === "" || raw === "-") {
            displayValue = raw;
            value = Math.max(0, min);
        } else {
            let numValue = parseFloat(raw) / 100;
            if (!isNaN(numValue)) {
                if (numValue < min) {
                    numValue = min;
                    displayValue = (numValue * 100).toString();
                } else {
                    displayValue = raw;
                }
                value = numValue;
            }
        }
    }

    function handleBlur() {
        isEditing = false;
        if (value < min) value = min;
        displayValue = (value * 100).toFixed(2).replace(/\.?0+$/, "");
    }

    function toggleDescription() {
        showDescription = !showDescription;
    }

    let formattedDefault = $derived(
        defaultValue !== undefined
            ? (defaultValue * 100).toFixed(2).replace(/\.?0+$/, "") + "%"
            : "",
    );
</script>

<div class="input-group">
    <div class="label-container">
        <label for={id}>{label} (%)</label>
        {#if description || defaultValue !== undefined}
            <button
                type="button"
                class="info-icon"
                onclick={toggleDescription}
                aria-label={showDescription ? "Hide description" : "Show description"}
                aria-expanded={showDescription}
            >
                <span class="google-material-icons">info_outline</span>
            </button>
        {/if}
    </div>

    {#if showDescription}
        <div class="description-box" id="{id}-description" role="region" aria-live="polite">
            {#if description}
                <p>{description}</p>
            {/if}
            {#if defaultValue !== undefined}
                <p class="default-note">
                    <strong>Default value:</strong>
                    {formattedDefault}
                </p>
            {/if}
        </div>
    {/if}

    <input
        type="text"
        {id}
        value={displayValue}
        oninput={handleInput}
        onfocus={() => isEditing = true}
        onblur={handleBlur}
        inputmode="decimal"
        aria-describedby={showDescription ? `${id}-description` : undefined}
    />
</div>

<style lang="scss">
    .input-group {
        margin-bottom: 1.25rem;
        display: flex;
        flex-direction: column;
    }

    .label-container {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        margin-bottom: 0.25rem;
    }

    label {
        font-size: 0.9rem;
        color: #555;
        margin-bottom: 0;
    }

    .info-icon {
        background: none;
        border: none;
        padding: 0;
        cursor: pointer;
        display: flex;
        align-items: center;
        color: var(--dora-sky-blue);

        .google-material-icons {
            font-size: 18px;
        }

        &:hover {
            color: var(--dora-prussian-blue);
            background-color: transparent;
        }
    }

    .description-box {
        background-color: var(--dora-warm-white);
        border-left: 3px solid var(--dora-sky-blue);
        padding: 0.75rem;
        font-size: 0.85rem;
        margin-bottom: 0.75rem;
        border-radius: 0 4px 4px 0;
        line-height: 1.4;
        color: #444;

        p {
            margin: 0;
            &:not(:last-child) {
                margin-bottom: 0.5rem;
            }
        }

        .default-note {
            color: #666;
        }
    }

    input {
        padding: 0.5rem;
        border: 1px solid #ccc;
        border-radius: 4px;
        font-size: 1rem;
        width: 100%;
        box-sizing: border-box;
    }
</style>
