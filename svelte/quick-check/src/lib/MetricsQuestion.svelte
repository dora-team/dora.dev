<script>
  //@ts-nocheck
  import { createEventDispatcher } from "svelte";
  import { fade } from "svelte/transition";
  export let metrics;
  export let metric_name = "METRIC",
    metric_position = 1,
    current_metric = 0,
    displayMode = "embedded";
  import metrics_question_responses from "./data/metrics_question_responses.json";
  import metrics_images from "./data/metrics_images.json";
  const metrics_details = {
    leadtime: {
      friendly_name: "Lead time",
      description:
        "For the primary application or service you work on, what is your <b>lead time for changes</b> (that is, how long does it take to go from code committed to code successfully running in production)?",
    },
    deployfreq: {
      friendly_name: "Deploy frequency",
      description:
        "For the primary application or service you work on, <b>how often does your organization deploy code</b> to production or release it to end users?",
    },
    changefailure: {
      friendly_name: "Change fail percentage",
      description:
        "For the primary application or service you work on, <b>what percentage of changes to production or released to users result in degraded service</b> (for example, lead to service impairment or service outage) and subsequently require remediation (for example, require a hotfix, rollback, fix forward or patch)?",
    },
    failurerecovery: {
      friendly_name: "Failed deployment recovery time",
      description:
        "For the primary application or service you work on, <b>how long does it generally take to restore service</b> after a change to production or release to users results in degraded service (for example, lead to service impairment or service outage) and subsequently requires remediation (for example, require a hotfix, rollback, fix forward, or patch)?",
    },
  };

  let metric_friendly_name = metrics_details[metric_name]["friendly_name"];
  let metric_question_text = metrics_details[metric_name].description;

  const dispatch = createEventDispatcher();

  const nextMetric = () => dispatch("nextMetric");
</script>

<!-- TODO: images on this page are inlined from "metrics_image.json" ... we should be able to use Vite to inline them automatically from static image files, which will make the source cleaner -->
<div
  in:fade={{ delay: 250, duration: 100 }}
  out:fade={{ delay: 150, duration: 100 }}
  class="question-container"
>
  <section class="question {displayMode}">
    <aside>
      <h5>
        Question {metric_position + 1} of 4<span class="friendly_name"
          >: {metric_friendly_name}</span
        >
      </h5>
      <h2>{metric_friendly_name}</h2>
      <img alt={metric_friendly_name} src={metrics_images[metric_name]} />
    </aside>
    <fieldset>
      <legend>
        <div class="description">{@html metric_question_text}</div>
      </legend>
      <div class="inputs">
        {#if metric_name === "changefailure"}
          {#if displayMode === "embedded"}
            <slider>
              <input
                type="range"
                name="changefailure"
                min="0"
                max="100"
                on:change={nextMetric}
                bind:value={metrics["changefailure"]}
              />
              <echo>
                {#if metrics["changefailure"] >= 0}{metrics[
                    "changefailure"
                  ]}{/if}
              </echo>
              <tickmarks>
                <tick>|<br />0</tick>
                <tick>|</tick>
                <tick>|<br />20</tick>
                <tick>|</tick>
                <tick>|<br />40</tick>
                <tick>|</tick>
                <tick>|<br />60</tick>
                <tick>|</tick>
                <tick>|<br />80</tick>
                <tick>|</tick>
                <tick>|<br />100</tick>
              </tickmarks>
            </slider>
          {:else}
            {#each { length: 11 } as _, value}
              <label
                ><input
                  name="changefailure"
                  type="radio"
                  bind:group={metrics["changefailure"]}
                  on:change={nextMetric}
                  value={value * 10}
                />{value * 10}%</label
              >
            {/each}
          {/if}
        {:else}
          {#each Object.entries(metrics_question_responses[metric_name]) as [value, text]}
            <label
              ><input
                name={metric_name}
                type="radio"
                bind:group={metrics[metric_name]}
                on:change={nextMetric}
                {value}
              />{text}</label
            >
          {/each}
        {/if}
      </div>
    </fieldset>
  </section>
</div>

<style lang="scss">
  * {
    box-sizing: border-box;
  }

  label {
    display: block;
  }

  // background colors
  .question-container:nth-child(1) {
    .question aside {
      background-color: var(--dora-highlight);
    }
  }
  .question-container:nth-child(2) {
    .question aside {
      background-color: var(--dora-secondary-b);
    }
  }
  .question-container:nth-child(3) {
    .question aside {
      background-color: var(--dora-secondary-a);
    }
  }
  .question-container:nth-child(4) {
    .question aside {
      background-color: var(--dora-secondary-c);
    }
  }

  section.question {
    display: flex;
    flex-direction: row;
    margin-bottom: 16px;
    background-color: color-mix(in srgb, var(--dora-primary-light), transparent 50%);

    aside {
      padding: 1rem;
      margin-right: 1rem;
      width: 35%;
      max-width: 320px;

      h5 {
        color: var(--dora-primary-dark);
      }
    }

    .description {
      padding-top: 1.5rem;
      font-size: calc(clamp(16px, 1.25vw, 20px));
      line-height:1.4;
      font-weight: 400;
    }

    fieldset {
      width: 65%;
      padding: 12px;
    }

    span.friendly_name {
      display: none;
    }

    img {
      max-width: 100%;
    }

    legend {
      margin-bottom: .5em;
    }

    label {
      margin-bottom: 6px;
      padding-inline: 0.5rem;
    }

    slider {
      display: grid;
      max-width: 600px;
      grid-template-columns: auto 2rem;
      input[type="range"] {
        width: 100%;
      }
      echo {
        padding: 0 0.5rem;
        height: 1.5rem;
        vertical-align: middle;
      }
    }
    tickmarks {
      width: 100%;
      max-width: 600px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      margin-left: 0rem;
      margin-right: -3rem;
      tick {
        display: inline-block;
        text-align: right;
        font-size: 0.65rem;
        color: #666;
        text-align: center;
        width: 1rem;
      }
    }

    &.kiosk {
      flex-direction: column;
      border-bottom: none;
      position: absolute;
      top: 0;
      left: 40vw;
      background-color: transparent;

      aside {
        width: 35vw;
        background-color: transparent !important;
      }

      p.description {
        padding-top: 0;
        font-size: 1.5rem;
      }

      fieldset {
        width: calc(100% - 1rem);
      }

      h2 {
        display: none;
      }

      img {
        display: none;
      }
      span.friendly_name {
        display: inline;
      }

      // show radio options as buttons
      input[type="radio"] {
        display: none;
      }

      label {
        font-size: 1.65rem;
        background-color: #eef;
        border-radius: 0.5rem;
        border: 1px solid #e9e9f0;
        padding: 0.5rem 1rem;
        user-select: none;

        &:active,
        &:has(:checked) {
          background-color: var(--dora-blue);
          color: white;
        }

        &:has(input[type="radio"][name="changefailure"]) {
          display: inline-block;
          font-size: 2rem;
          border-radius: 50%;
          width: 6rem;
          height: 6rem;
          text-align: center;
          line-height: 6rem;
          padding: 0;
          margin: 0.5rem;
        }
      }

      div.inputs:has(input[type="radio"][name="changefailure"]) {
        text-align: center;
      }
    }
  }

  /* There's no elegant way to use global variables for media queries (css variables aren't supported for this purpose, 
    and SCSS vars are cumbersome to propagate between different svelte components).
    So we'll use a "magic number" of 800px, in each file */
  @media (max-width: 800px) {
    section.question {
      flex-direction: column;
      aside {
        width: 100%;
        padding: 0.5rem;
        background-color: transparent !important;
        img {
          display: none;
        }
      }
      p.description {
        padding-top: 0;
      }

      fieldset {
        width: calc(100% - 1rem);
        padding: 0.5rem;
        label {
          padding-left: 0.5rem;
        }
      }
    }
  }
</style>
