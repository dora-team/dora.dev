<script lang="ts">
  import { fade } from "svelte/transition";
  import type { Metrics, DisplayMode } from "./types";

  // @ts-ignore
  import metrics_question_responses_raw from "./data/metrics_question_responses.json";
  // @ts-ignore
  import metrics_images_raw from "./data/metrics_images.json";
  // @ts-ignore
  import metrics_details_raw from "./data/metrics_details.json";

  const metrics_question_responses = metrics_question_responses_raw as Record<
    string,
    Record<string, string>
  >;
  const metrics_images = metrics_images_raw as Record<string, string>;
  const metrics_details = metrics_details_raw as Record<
    string,
    { friendly_name: string; description: string }
  >;

  let {
    metrics = $bindable(),
    metric_name = "leadtime",
    metric_position = 0,
    total_metrics = 5,
    displayMode = "embedded",
    onNextMetric,
  }: {
    metrics: Metrics;
    metric_name: keyof Metrics;
    metric_position: number;
    total_metrics: number;
    displayMode: DisplayMode;
    onNextMetric?: () => void;
  } = $props();

  let metric_friendly_name = $derived(
    metrics_details[metric_name as string]["friendly_name"],
  );
  let metric_question_text = $derived(
    metrics_details[metric_name as string].description,
  );

  const nextMetric = () => {
    if (onNextMetric) onNextMetric();
  };
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
      {#if metrics_images[metric_name as string]}
        <img
          alt={metric_friendly_name}
          src={metrics_images[metric_name as string]}
        />
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
                name={metric_name as string}
                min="0"
                max="100"
                bind:value={metrics[metric_name as string]}
              />
              <echo>
                {#if Number(metrics[metric_name as string]) >= 0}{metrics[
                    metric_name as string
                  ]}%<br />{metric_name === "changefailure"
                    ? "of changes fail"
                    : "of deployments were unplanned"}{/if}
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
                  name={metric_name as string}
                  type="radio"
                  bind:group={metrics[metric_name as string]}
                  onchange={nextMetric}
                  value={value * 10}
                />{value * 10}%</label
              >
            {/each}
          {/if}
        {:else}
          {#each Object.entries(metrics_question_responses[metric_name as string]) as [value, text]}
            <label
              ><input
                name={metric_name as string}
                type="radio"
                bind:group={metrics[metric_name as string]}
                onchange={nextMetric}
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
    background-color: color-mix(
      in srgb,
      var(--dora-primary-light),
      transparent 50%
    );

    &.leadtime aside {
      background-color: var(--dora-highlight);
    }
    &.deployfreq aside {
      background-color: var(--dora-secondary-b);
    }
    &.failurerecovery aside {
      background-color: var(--dora-secondary-a);
    }
    &.changefailure aside {
      background-color: var(--dora-secondary-c);
    }
    &.rework aside {
      background-color: var(--dora-highlight);
    }

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
      line-height: 1.4;
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
      margin-bottom: 0.5em;
    }

    label {
      margin-bottom: 6px;
      padding-inline: 0.5rem;
      font-size: 1rem;
      cursor: pointer;
    }

    slider {
      display: flex;
      flex-direction: column;
      max-width: 600px;
      margin-bottom: 1rem;
      input[type="range"] {
        width: 100%;
        margin-bottom: 0.25rem;
      }
      echo {
        padding: 0 0.5rem;
        height: 2.5rem;
        font-weight: bold;
        color: var(--dora-blue);
        text-align: center;
        line-height: 1.2;
      }
    }
    tickmarks {
      width: 100%;
      max-width: 600px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      margin-top: 0.25rem;
      tick {
        display: inline-block;
        text-align: right;
        font-size: 0.65rem;
        color: #666;
        text-align: center;
        width: 1.5rem;
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

      .description {
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
    background-color: rgba(255, 255, 255, 0.2);
    border: 1px dashed rgba(0, 0, 0, 0.1);
  }

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
      .description {
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
