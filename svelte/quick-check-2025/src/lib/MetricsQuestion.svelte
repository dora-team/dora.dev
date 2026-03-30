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
      aside_name: "Lead time",
      description:
        "For the primary application or service you work on, what is your <b>lead time for changes</b> (that is, how long does it take to go from code committed to code successfully running in production)?",
    },
    deployfreq: {
      aside_name: "Deploy frequency",
      description:
        "For the primary application or service you work on, <b>how often does your organization deploy code</b> to production or release it to end users?",
    },
    failurerecovery: {
      aside_name: "Failure recovery",
      description:
        "For the primary application or service you work on, <b>how long does it generally take to restore service</b> after a change to production or release to users results in degraded service (for example, lead to service impairment or service outage) and subsequently requires remediation (for example, require a hotfix, rollback, fix forward, or patch)?",
    },
    changefailure: {
      aside_name: "Change fail rate",
      description:
        "Approximately what percentage of changes to production or releases to users result in degraded service (for example, leads to service impairment or service outage) and subsequently requires remediation (for example, requires a hotfix, rollback, fix forward or patch), if at all?",
    },
    rework: {
      aside_name: "Deployment rework rate",
      description:
        "Approximately what percentage of deployments in the last 6 months were not planned but were performed to address a user-facing bug in the application?",
    },
  };

  $: metric_aside_name = metrics_details[metric_name]["aside_name"];
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
        QUESTION {metric_position + 1} OF {total_metrics}
      </h5>
      <h2>{metric_aside_name}</h2>
      {#if metrics_images[metric_name]}
        <img alt={metric_aside_name} src={metrics_images[metric_name]} />
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
            <div class="slider-container">
              <input
                type="range"
                name={metric_name}
                min="0"
                max="100"
                bind:value={metrics[metric_name]}
              />
              <div class="echo">
                {#if metrics[metric_name] >= 0}{metrics[metric_name]}%<br/>{metric_name === "changefailure" ? "of changes fail" : "of changes were unplanned"}{/if}
              </div>
              <div class="tickmarks">
                <div class="tick">|<br />0</div>
                <div class="tick">|</div>
                <div class="tick">|<br />20</div>
                <div class="tick">|</div>
                <div class="tick">|<br />40</div>
                <div class="tick">|</div>
                <div class="tick">|<br />60</div>
                <div class="tick">|</div>
                <div class="tick">|<br />80</div>
                <div class="tick">|</div>
                <div class="tick">|<br />100</div>
              </div>
            </div>
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

  .question-container {
      width: 100%;
  }

  section.question {
    display: flex;
    flex-direction: row;
    margin-bottom: 16px;
    background-color: white;

    &.leadtime aside { background-color: var(--dora-highlight); }
    &.deployfreq aside { background-color: var(--dora-secondary-b); }
    &.failurerecovery aside { background-color: var(--dora-secondary-a); }
    &.changefailure aside { background-color: var(--dora-secondary-c); }
    &.rework aside { background-color: #e1f5fe; } // Light blue for rework

    aside {
      padding: 1.5rem;
      margin-right: 1.5rem;
      width: 33%;
      max-width: 320px;
      display: flex;
      flex-direction: column;
      align-items: flex-start;

      h5 {
        color: #333;
        font-size: 0.8rem;
        margin-bottom: 0.5rem;
        font-weight: 500;
        text-transform: uppercase;
      }
      h2 {
          font-size: 2.2rem;
          line-height: 1.1;
          margin-bottom: 1.5rem;
          font-weight: 600;
      }
    }

    .description {
      padding-top: 1rem;
      font-size: 1.2rem;
      line-height:1.4;
      font-weight: 400;
      margin-bottom: 1.5rem;
    }

    fieldset {
      width: 67%;
      padding: 1rem 1.5rem 1rem 0;
      border: none;
    }

    img {
      max-width: 80%;
      align-self: center;
      margin-top: auto;
    }

    label {
      display: block;
      margin-bottom: 12px;
      font-size: 1.1rem;
      cursor: pointer;
      input {
          margin-right: 0.5rem;
      }
    }

    .slider-container {
      max-width: 600px;
      input[type="range"] {
        width: 100%;
        margin-bottom: 1rem;
      }
      .echo {
        text-align: center;
        font-weight: bold;
        color: var(--dora-blue);
        margin-bottom: 1rem;
        min-height: 3rem;
      }
    }
    .tickmarks {
      display: flex;
      justify-content: space-between;
      .tick {
        font-size: 0.75rem;
        color: #999;
        text-align: center;
        width: 1rem;
      }
    }

    &.kiosk {
      aside {
        background-color: transparent !important;
      }
      fieldset {
          width: 100%;
      }
    }
  }

  .placeholder-icon {
      width: 200px;
      height: 200px;
      background-color: #eee;
      border: 1px solid #ddd;
  }

  @media (max-width: 800px) {
    section.question {
      flex-direction: column;
      aside {
        width: 100%;
        max-width: none;
        padding: 1.5rem;
        h2 { font-size: 1.8rem; margin-bottom: 0.5rem; }
        img { display: none; }
      }
      fieldset {
        width: 100%;
        padding: 1rem;
      }
    }
  }
</style>
