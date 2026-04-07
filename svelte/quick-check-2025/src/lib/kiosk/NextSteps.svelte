<script>
    import StartOver from './StartOver.svelte';
    let { displayMode = 'kiosk', onreset } = $props();

    const reset = () => onreset();
</script>

<section class="nextSteps">
    <StartOver {onreset} {displayMode} />
    <h1>Next Steps</h1>
    <div>
        <ul>
            <li>
                Read the <a href="https://dora.dev/report" target="_blank"
                    >DORA Report</a
                >
            </li>
            <li>
                <a href="https://dora.dev/capabilities" target="_blank"
                    >Discover capabilities</a
                > to help you improve
            </li>
            <li>
                Join the <a href="https://dora.community" target="_blank"
                    >DORA Community</a
                >
            </li>
        </ul>
    </div>
    <div class="qrcode">
        <img
            alt="dora.dev"
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAACOUAAAjlCAIAAACqhwhjAAAABmJLR0QA/wD/AP+gvaeTAAAgAElEQVR4nOzdf3BV9Z0//pDwK40Umdb9QwmRAgbQat0OOlYoP0brTolVO8v2B8gqXWTFbaXTjhZpFccW8FPdEbtVGX8MIq4zth1pC05bFRBUlJ2VDiiYBYJNsJ1WO6gICWBuvn8sU1e/4UdC7n29z7mPx9/tPc/j67zf93Ceuff26ujoqAAAAAAAAIAgldEBAAAAAAAAKGv6KgAAAAAAACLpqwAAAAAAAIikrwIAAAAAACCSvgoAAAAAAIBI+ioAAAAAAAAi6asAAAAAAACIpK8CAAAAAAAgkr4KAAAAAACASPoqAAAAAAAAIumrAAAAAAAAiKSvAgAAAAAAIJK+CgAAAAAAgEj6KgAAAAAAACLpqwAAAAAAAIikrwIAAAAAACCSvgoAAAAAAIBI+ioAAAAAAAAi6asAAAAAAACIpK8CAAAAAAAgkr4KAAAAAACASPoqAAAAAAAAIumrAAAAAAAAiKSvAgAAAAAAIJK+CgAAAAAAgEj6KgAAAAAAACLpqwAAAAAAAIikrwIAAAAAACCSvgoAAAAAAIBI+ioAAAAAAAAi6asAAAAAAACIpK8CAAAAAAAgkr4KAAAAAACASPoqAAAAAAAAIumrAAAAAAAAiKSvAgAAAAAAIJK+CgAAAAAAgEj6KgAAAAAAACLpqwAAAAAAAIikrwIAAAAAACCSvgoAAAAAAIBI+ioAAAAAAAAi6asAAAAAAACIpK8CAAAAAAAgkr4KAAAAAACASPoqAAAAAAAAIumrAAAAAAAAiKSvAgAAAAAAIJK+CgAAAAAAgEj6KgAAAAAAACLpqwAAAAAAAIikrwIAAAAAACCSvgoAAAAAAIBI+ioAAAAAAAAi6asAAAAAAACIpK8CAAAAAAAgkr4KAAAAAACASPoqAAAAAAAAIumrAAAAAAAAiKSvAgAAAAAAIJK+CgAAAAAAgEj6KgAAAAAAACLpqwAAAAAAAIikrwIAAAAAACCSvgoAAAAAAIBI+ioAAAAAAAAi6asAAAAAAACIpK8CAAAAAAAgkr4KAAAAAACASPoqAAAAAAAAIumrAAAAAAAAiKSvAgAAAAAAIJK+CgAAAAAAgEj6KgAAAAAAACLpqwAAAAAAAIikrwIAAAAAACCSvgoAAAAAAIBI+ioAAAAAAAAi6asAAAAAAACIpK8CAAAAAAAgkr4KAAAAAACASPoqAAAAAAAAIumrAAAAAAAAiKSvAgAAAAAAIJK+CgAAAAAAgEj6KgAAAAAAACLpqwAAAAAAAIikrwIAAAAAACCSvgoAAAAAAIBI+ioAAAAAAAAi6asAAAAAAACIpK8CAAAAAAAgkr4KAAAAAACASPoqAAAAAAAAIumrAAAAAAAAiKSvAgAAAAAAIJK+CgAAAAAAgEj6KgAAAAAAACLpqwAAAAAAAIikrwIAAAAAACCSvgoAAAAAAIBIvaMDcDS9e..."
        />
        <a href="https://dora.dev/" target="_blank">dora.dev</a>
    </div>
</section>

<style lang="scss">
    section.nextSteps {
        border-top: 1px solid #eee;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        gap: 2rem;
        padding: 0 2rem;
    }

    .qrcode {
        text-align: center;
        padding: 0.5rem 0;
        width: 6rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        img {
            display: block;
        }
        a {
            font-size: 0.75rem;
            line-height: 0.75rem;
            color: #666;
            text-decoration: none;
        }
    }
</style>
