---
title: "[WIP / Experimental] Core"
date: 2023-06-26T09:36:16-04:00
draft: true
---

> DORA Core is a work in progress. Learn more, and provide feedback, in the [DORA Core GitHub Discussion](https://github.com/dora-team/dora.dev/discussions/265).

# DORA Core
DORA’s research program is continuous and ongoing; each year brings new avenues of inquiry, and each analysis yields new insights. At the cutting edge, new concepts are introduced frequently, and artifacts (especially the [Accelerate State of DevOps Reports]({{< relref "/publications" >}})) are continuously released, revealing new insights and dynamics. With each study, some prior findings are reinforced, while others may be called into question. This is a hallmark of good science: any new finding is to be considered suspect—intriguing, but suspect—until it has been validated through replication and application. Meanwhile, practitioners are encouraged to apply the research in their own professional contexts. In such contexts, it can be challenging to keep up with the latest developments from DORA: cultural transformation efforts in a large organization require a steady hand, persistent over stretches of time measured across multiple years. An attempt to update one’s practices to match the pace of the research can lead to counterproductive churn. In these contexts, it’s more practical to rely on “evergreen” artifacts. DORA Core represents a distillation of DORA’s most foundational findings: metrics, capabilities, and outcomes that the research has repeatedly surfaced. It enables teams to focus their improvement efforts even more precisely on what is likely to produce tangible benefits to their organizational goals and quality of life. 

WORK IN PROGRESS -- try clicking the capabilities -- they should navigate to the cap pages.

<script>
    window.onload = function() {
        var coreModel = document.getElementById('dora-core-model').contentDocument;

        var capabilities = coreModel.querySelectorAll('.entity.capability');

       for (const item of capabilities) {
            item.addEventListener('click', () => {
                // do something when the item is clicked
                let capabilitySlug=item.id;
                let capabilityCategory=item.dataset.category;

                console.log(capabilitySlug);
                console.log(capabilityCategory);

                window.location.href=`/devops-capabilities/${capabilityCategory}/${capabilitySlug}/`;
            });
       }
    };
</script>

<object data="dora-core-model.svg" id="dora-core-model" type="image/svg+xml" style="width:100%;"></object>

> [Download as PDF](dora-core-model.pdf)

## FAQ
#### What’s in Core? What isn’t?
DORA Core encompasses the set of entities that have been perennially studied by DORA and whose interactions are well supported. These entities include capabilities like [Continuous delivery]({{< relref "/devops-capabilities/technical/continuous-delivery">}}) and [Generative organizational culture]({{< relref "/devops-capabilities/cultural/generative-organizational-culture">}}), metrics like the “Four Key'' metrics, and outcomes like organizational performance. These established ideas contrast with areas of inquiry, or divergent predictive pathways, which have shown promise when we’ve studied them, but aren’t (yet) as well supported as part of DORA’s predictive model. An entity may be considered for Core if: a) it has been researched at least twice; b) practitioners have found it valuable; c) continued exploration is warranted. This rubric is, by design, a subjective one, which draws heavily on the data and analyses, but it is ultimately guided by intuition. So please contribute! Your intuition is valuable; if you feel like something doesn’t accurately reflect the research, please let us know.

#### Will Core ever change?
Yes! The application of research is necessarily less volatile than the research itself. But it’s not static. Core will evolve over time, and things we’re starting to investigate now will, once established, “graduate” into core. A threshold of support is required for inclusion in core; likewise, if sufficient evidence is collected to support the removal or alteration of something in core, it will be deprecated. Core is informed by, and evolves with, the research—but more slowly.

#### What is the Core Model?
The DORA Core Model is a visual summary of the predictive framework that DORA has been developing since its inception. It draws from all of the Structural Equation Models (SEMs) that have been developed through the years, to highlight the best-supported entities and predictive pathways. Practitioners are encouraged to study the Model and use it to guide their continuous improvement journeys.

#### Are all research years treated equally?
No. Some findings have proven to be extremely durable, replicating year after year. But, as one expects when studying a dynamic context, other findings have changed. Plus, every year, we add or subtract areas of study. Our goal with Core is to create something that’s durable across years, while also evolving as we continue to learn. To that end, more recent research gets more weight than older research. This is why, for example, “Shift Left on Security” is separated from the Technical Capabilities, which reflects findings from 2021 and 2022 that showed the unique impact of security practices on software delivery performance.
