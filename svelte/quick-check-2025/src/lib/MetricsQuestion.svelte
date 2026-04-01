<script>
  //@ts-nocheck
  import { createEventDispatcher } from "svelte";
  import { fade } from "svelte/transition";
  export let metrics;
  export let metric_name = "METRIC",
    metric_position = 0,
    total_metrics = 5,
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
    failurerecovery: {
      friendly_name: "Failure recovery",
      description:
        "For the primary application or service you work on, <b>how long does it generally take to restore service</b> after a change to production or release to users results in degraded service (for example, lead to service impairment or service outage) and subsequently requires remediation (for example, require a hotfix, rollback, fix forward, or patch)?",
    },
    changefailure: {
      friendly_name: "Change fail rate",
      description:
        "Approximately what percentage of changes to production or releases to users result in degraded service (for example, leads to service impairment or service outage) and subsequently requires remediation (for example, requires a hotfix, rollback, fix forward or patch), if at all?",
    },
    rework: {
      friendly_name: "Deployment rework rate",
      description:
        "Approximately what percentage of deployments in the last 6 months were not planned but were performed to address a user-facing bug in the application?",
    },
  };

  $: metric_friendly_name = metrics_details[metric_name]["friendly_name"];
  $: metric_question_text = metrics_details[metric_name].description;

  const dispatch = createEventDispatcher();

  const nextMetric = () => dispatch("nextMetric");
</script>

<div
  in:fade={{ delay: 250, duration: 100 }}
  out:fade={{ delay: 150, duration: 100 }}
  class="question-container"
>
  <section class="question {displayMode} {metric_name}">
    <aside>
      <h5>
        Question {metric_position + 1} of {total_metrics}
      </h5>
      <h2>{metric_friendly_name}</h2>
      {#if metrics_images[metric_name]}
        <img alt={metric_friendly_name} src={metrics_images[metric_name]} />
      {:else}
        <div class="placeholder-icon"></div>
      {/if}
    </aside>
    <fieldset>
      <legend>
        <div class="description">{@html metric_question_text}</div>
      </legend>
      <div class="inputs">
        {#if metric_name === "changefailure" || metric_name === "rework"}
          {#if displayMode === "embedded"}
            <slider>
              <input
                type="range"
                name={metric_name}
                min="0"
                max="100"
                bind:value={metrics[metric_name]}
              />
              <echo>
                {#if metrics[metric_name] >= 0}{metrics[metric_name]}%<br/>{metric_name === "changefailure" ? "of changes fail" : "of changes were unplanned"}{/if}
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
                  name={metric_name}
                  type="radio"
                  bind:group={metrics[metric_name]}
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



  section.question {
    display: flex;
    flex-direction: row;
    margin-bottom: 16px;
    background-color: color-mix(in srgb, var(--dora-primary-light), transparent 50%);

    &.leadtime aside { background-color: var(--dora-highlight); }
    &.deployfreq aside { background-color: var(--dora-secondary-b); }
    &.failurerecovery aside { background-color: var(--dora-secondary-a); }
    &.changefailure aside { background-color: var(--dora-secondary-c); }
    &.rework aside { background-color: #e1f5fe; } // Light blue for rework

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

    img {
      max-width: 100%;
    }

    legend {
      margin-bottom: .5em;
    }

    label {
      margin-bottom: 6px;
      padding-inline: 0.5rem;
      font-size: 1rem;
      cursor: pointer;
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
        font-weight: bold;
        color: var(--dora-blue);
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

  .placeholder-icon {
      width: 100%;
      aspect-ratio: 1/1;
      background-color: rgba(255,255,255,0.2);
      border: 1px dashed rgba(0,0,0,0.1);
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
