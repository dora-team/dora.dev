<script>
    import { appState } from "./state.svelte.js";
    import png_url_summary from "../assets/png/dora-core-v2.1.0-summary.png";
    import png_url_detail from "../assets/png/dora-core-v2.1.0-detail.png";
    import pdf_url_summary from "../assets/pdf/dora-core-v2.1.0-summary.pdf";
    import pdf_url_detail from "../assets/pdf/dora-core-v2.1.0-detail.pdf";

    let download_urls = {
        png: {
            summary: png_url_summary,
            detail: png_url_detail,
        },
        pdf: {
            summary: pdf_url_summary,
            detail: pdf_url_detail,
        },
    };
</script>

<div class="core-footer">
    <div class="version">DORA Core model v2.1.0</div>
    <div>
        download:
        <a href={download_urls["png"][appState.view_mode]} target="_blank">PNG</a>
        <a href={download_urls["pdf"][appState.view_mode]} target="_blank">PDF</a>
    </div>
</div>

<style>
    .core-footer {
        display: flex;
        justify-content: end;
        margin-bottom: 2rem;
        font-size: 0.75rem;
        column-gap: 1rem;
        color: var(--color-grey-medium);
    }

    a {
        color: var(--color-grey-medium);
        display: inline-block;
        margin-inline: 0.15rem;
    }
</style>
