<script>
    export let view_mode = "summary";
    import png_url_summary from '../assets/png/dora-core-v2.0.0-summary.png'
    import png_url_detail from '../assets/png/dora-core-v2.0.0-detail.png'

    let png_urls = {
        "summary": png_url_summary,
        "detail": png_url_detail
    }
</script>

<div class="core-footer">
    <div class="version">DORA Core model v2.0.0</div>
    <div><a href="{png_urls[view_mode]}" target="_blank">download as PNG</a></div>
</div>

<style>
    .core-footer {
        display: flex;
        justify-content: end;
        margin-bottom: 2rem;
        font-size: 0.75rem;
        column-gap: 1rem;
    }

    .version {
        color: var(--color-grey-medium);
    }

    a {
        color:var(--color-grey-medium)
    }
</style>
