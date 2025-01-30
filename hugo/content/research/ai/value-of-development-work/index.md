---
title: "How Gen AI Affects the Value of Development Work"
date: 2024-12-10
updated: 2024-12-10T00:00:00Z
research_collection: "Artificial Intelligence"
draft: false
authors:
    1: {name: 'Dr. Kevin M. Storer', url: '/research/team/#dr-kevin-m-storer'}
tab_order: "10"
tab_title: "Value of Development Work"
headline: "How Gen AI Affects the Value of Development Work"
# heroimage: "/research/2024/dora-report-ai-preview-hero.png"
type: "research_archives/preview"
---

Developers’ well-being and job satisfaction have been a central topic of inquiry for the [DORA Research Team](https://dora.dev/research/team/) for many years, including as part of [the 2024 DORA Report](https://dora.dev/dora-report-2024). This year, we were especially interested in investigating whether there is evidence that developers’ well-being is affected by the rapid adoption and use of generative artificial intelligence (gen AI) in development work.

We found that developers who more extensively use gen AI in their work report:

* More time in a flow state,
* Higher overall job satisfaction,
* Increased productivity, and
* Less burnout.

Conversely, we found that developers who more extensively use gen AI in their work report:

* No difference in time spent on toilsome work, and
* Less time spent on valuable work.

These findings were quite surprising for us, for two reasons.

First, spending less time on valuable work when you use gen AI is a notable counterpoint to a popular argument for adopting gen AI in development work—that gen AI will speed up routine development tasks, thereby allowing developers to work on "something better."

Second, as researchers, we found it paradoxical that developers spending *less time on work they find valuable* would also report *more time in flow, more satisfaction, more productivity, and less burnout.* It is reasonable to expect that spending one’s time on work that is valuable would be a predictor of well-being.

After debating this paradox for some time, and generating several plausible hypotheses to explain it, we realized that we were, in fact, grappling with a more fundamental question:

**How do developers actually ascribe "value" to their work?**

So, in September 2024, we conducted a series of 10 in-depth interviews with development professionals, each lasting approximately 90 minutes. Participants were asked about the types of development tasks that they found valuable and nonvaluable, how they made assessments about whether specific tasks had value, and whether using gen AI to perform those tasks changed, or would change, their evaluation.

### Five Views of "Value" in Development Work

Across these interviews, developers described the value of their work using five main views of "value," from which a framework was derived for understanding the value of development work and gen AI's impacts on those facets of value. This framework is visualized in Table 1 and further described below.

![Five "Views" of Value in Development Work](five-views.png 'The five views of "value" of development work described by participants, their meanings, and the anticipated impacts of Gen AI on each of these perspectives.')

**Utilitarian Value** describes the impact that the work has on the world.
* Utilitarian Value is determined by the impact that developers perceive their product having in the world and the impact of specific development tasks on the creation of that product.
* Gen AI can be anticipated to have a potentially positive impact on the Utilitarian Value of development work, *by increasing the pace at which developers work*.

**Reputational Value** describes the recognition that an individual performed work.
* Reputational Value is determined by the Utilitarian Value of that work and whether its performance can be ascribed to/owned by any individual developer.
* Gen AI can be anticipated to have a potentially positive impact on the Reputational Value of development work, by *increasing the Utilitarian Value of an individual developer's labor*.
* However, Gen AI can also be anticipated to have a potentially negative impact on the Reputational Value of development work, by *calling into question the ownership of the labor performed with Gen AI.*

**Economic Value** describes the pay associated with performing development work.
* Economic Value is determined by the Utilitarian Value of the work, the Reputational Value of the work, and the (in)accessibility of the skillset, where niche skillsets are more highly valued.
* Gen AI can be anticipated to have a potentially positive impact on the Economic Value of development work, by *increasing the Utilitarian Value of an individual developer's labor*.
* However, Gen AI can also be anticipated to have a potentially negative impact on the Economic Value of development work, by *reducing the Reputational Value of development work* and by *making the requisite skillset more accessible*.

**Intrinsic Value** describes the inherent worthwhileness of performing development work.
* Intrinsic Value is highly subjective, deeply personal, and often argued from a perspective of valuing traditional ways of learning and achieving.
* Gen AI can be anticipated to have a neutral impact on the Intrinsic Value of development work, because *historical examples suggest novel technologies change norms around educational and knowledge standards* (consider wayfinding pre-GPS or mental math pre-mobile phone calculator).

**Hedonistic Value**  describes the enjoyment resultant from performing development work.
* Hedonistic Value is highly subjective and dependent upon the personal interests of the developer in question.
* Gen AI can be anticipated to have a potentially positive impact on the Hedonistic Value of development work, if the *developer enjoys using Gen AI or Gen AI makes enjoyable tasks accessible*.
* Gen AI can also be anticipated to have a potentially negative impact on the Hedonistic Value of development work, if the *developer enjoys performing a task Gen AI renders obsolete*.
* Gen AI can also be anticipated to have a neutral impact on the Hedonistic Value of development work, because, for now, *developers are not being forced to use Gen AI and so can perform any enjoyable task if they want*.

Put simply, Gen AI has variable and interconnected impacts on how developers, and the world, perceive the value of development work.

### Five Strategies for Ensuring AI Amplifies Developers’ Value

#### Allow use of gen AI throughout the software development and delivery process.
Developers who prioritized the Utilitarian Value of their work—emphasizing their individual impact on the world—perceived gen AI as a clear value-booster. That is, by increasing the speed at which developers can change an application, the time taken to produce an impact in the world is reduced. So, allowing the use of gen AI in as many development tasks as possible may increase the perceived Utilitarian Value of development work by expediting the completion of more steps throughout the development process.

#### Acknowledge the labor of working with gen AI.
Developers who prioritized the Reputational Value of their work—emphasizing the benefits of being recognized for having completed work—perceived gen AI as a potential value-reducer. That is, by supporting developers in completing their work, it is possible that gen AI will be given the credit for the work performed, at the expense of the developer. Although gen AI can scaffold many development tasks, working with gen AI still requires labor on the part of the developer. There are even new job titles, like prompt engineer, and programming paradigms, like [chat-oriented programming](https://sourcegraph.com/blog/chat-oriented-programming-in-action), emerging in response to the labor of using gen AI in development. Leadership explicitly acknowledging this labor involved in working with gen AI may help assuage fears about gen AI’s impacts on the Reputational Value of development, by centering developers’ contributions to AI-assisted development work.

#### Reward work outcomes, not just time spent.
Developers who prioritized the Economic Value of their work—emphasizing the pay associated with their labor—had mixed feelings about gen AI’s potential impacts on development work’s value. On one hand, they perceived gen AI to increase their productivity, thereby making their time more economically valuable. On the other hand, because gen AI expedites task completion, some developers expressed concerns about whether increases in individual productivity would cause reductions in workforce or paid hours. How gen AI will shape our future global economic systems has been widely debated and would be impossible for us to predict. But, we believe that rewarding developers for the outcomes of their work, not just how much time they spend in the office, may help mitigate these fears and encourage gen AI use.

#### Frame gen AI as an opportunity to learn new skills
Developers who prioritized the Intrinsic Value of their work—emphasizing the inherent value of understanding the skills of development—gen AI was perceived as a potential value-reducer. That is, gen AI use might make it less important for developers to maintain some development skills. However, as noted above, there are myriad examples throughout history of novel technologies which shifted the norms of educational standards. So, gen AI might also make *other* skills, like prompt engineering, more important for developers to hone. Framing gen AI as an opportunity to learn new skills across the software development lifecycle may help assuage developers’ fears about other skills being obsolesced, by emphasizing that novel technologies historically *change what* is important to know, rather than *making knowing things unimportant.*

#### Support developers in choosing *not* to use gen AI for tasks they enjoy.
Developers who prioritized the Hedonistic Value of their work—emphasizing the pleasure derived from performing certain tasks—gen AI was perceived as a potential value-reducer. That is, because gen AI is capable of doing many tasks that these developers enjoy, it might spoil some of the fun of development. However, we are not aware of any case where gen AI use is *compulsory*. Although developers report many benefits of gen AI use in their work, we believe that organizations supporting developers who would prefer to perform development tasks without AI assistance is important for preserving the joy of development work that enticed many professional developers into the field initially.

### Conclusion

As gen AI becomes increasingly central to developers’ everyday worklives, it is important to understand how its use impacts the way developers understand and perceive the value of their professional labor. For many people, the value of their professional labor extends well beyond the economic value placed on it and the associated compensation to encompass aspects of personal identity, pleasure, and contribution to the world. After working with developers for more than a decade, the DORA team was not surprised to find that developers understand the value of their work as a complicated and nuanced web of factors bridging utilitarian, reputational, economic, intrinsic, and hedonistic perspectives on the meaning of "value." Since this is a complicated topic and gen AI’s role in the valuation of development work is still evolving, it will be important to build upon and refine this research over time. But, our desire is that this framework and set of recommendations for organizations will help us, collectively, continue to identify opportunities for gen AI to maximize developers’ productivity and well-being. We look forward to working with developers, organizations, and the [DORA Community](https://dora.community/) toward this goal.
