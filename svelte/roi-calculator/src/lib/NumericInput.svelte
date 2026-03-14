<script>
    import { sanitizeNumericInput } from "./inputUtils.js";

    let {
        label,
        value = $bindable(),
        id,
        suffix = "",
        min = 0.000001,
        description = "",
        defaultValue = undefined,
        isCurrency = false,
    } = $props();

    let displayValue = $state("");
    let showDescription = $state(false);

    const format = (val) => {
        const base = new Intl.NumberFormat("en-US").format(val);
        return isCurrency ? `$${base}` : base;
    };

    // Sync display value with the internal numeric value
    $effect(() => {
        if (value !== undefined) {
            const formatted = format(value);
            if (displayValue !== formatted) {
                displayValue = formatted;
            }
        }
    });

    function handleInput(e) {
        let raw = sanitizeNumericInput(e.target.value);

        if (raw === "" || raw === "-") {
            displayValue = isCurrency ? `$${raw}` : raw;
            value = Math.max(0, min);
        } else {
            let num = parseFloat(raw);
            if (!isNaN(num)) {
                if (num < min) {
                    num = min;
                    displayValue = isCurrency ? `$${num}` : num.toString();
                } else {
                    displayValue = isCurrency ? `$${raw}` : raw;
                }
                value = num;
            }
        }
    }

    function handleBlur() {
        if (value < min) value = min;
        displayValue = format(value);
    }

    function toggleDescription() {
        showDescription = !showDescription;
    }

    let formattedDefault = $derived.by(() => {
        if (defaultValue === undefined) return "";
        const base = new Intl.NumberFormat("en-US").format(defaultValue);
        if (isCurrency) {
            return `$${base} USD`;
        }
        return base;
    });
</script>

<div class="input-group">
    <div class="label-container">
        <label for={id}>{label}{suffix ? ` (${suffix})` : ""}</label>
        {#if description || defaultValue !== undefined}
            <button
                type="button"
                class="info-icon"
                onclick={toggleDescription}
                aria-label="Show description"
            >
                <span class="google-material-icons">info_outline</span>
            </button>
        {/if}
    </div>

    {#if showDescription}
        <div class="description-box">
            {#if description}
                <p>{description}</p>
            {/if}
            {#if defaultValue !== undefined}
                <p class="default-note">
                    <strong>Default value:</strong>
                    {formattedDefault}{!isCurrency && suffix
                        ? ` ${suffix}`
                        : ""}
                </p>
            {/if}
        </div>
    {/if}

    <input
        type="text"
        {id}
        value={displayValue}
        oninput={handleInput}
        onblur={handleBlur}
        inputmode="decimal"
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
            background-color: transparent !important;
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
    }
</style>
