// data constants for 2019
const mean = 4.251338;
const stddev = 1.000992;

const profileStats = {
  'low': 3.5,
  'medium': 4.4,
  'high': 5.2,
  'elite': 6
};

const colors = {
    'low': '#D93025',
    'medium': '#FBBC04',
    'high': '#34A853',
    'elite': '#0D652D',
    'you': '#0F346F',
    'average': '#afb2b6',
    'bar': '#0F346F'
}

const baselines = {
  'all': { 'leadtime': 50, 'deployfreq': 49, 'ttr': 78, 'chgfail': 88 },
  'education': { 'leadtime': 52, 'deployfreq': 49, 'ttr': 73, 'chgfail': 96 },
  'energy': { 'leadtime': 40, 'deployfreq': 35, 'ttr': 73, 'chgfail': 81 },
  'finance': { 'leadtime': 46, 'deployfreq': 44, 'ttr': 78, 'chgfail': 84 },
  'government': { 'leadtime': 38, 'deployfreq': 36, 'ttr': 70, 'chgfail': 88 },
  'healthcare': { 'leadtime': 41, 'deployfreq': 42, 'ttr': 68, 'chgfail': 82 },
  'industrials': { 'leadtime': 40, 'deployfreq': 39, 'ttr': 79, 'chgfail': 91 },
  'insurance': { 'leadtime': 49, 'deployfreq': 51, 'ttr': 80, 'chgfail': 91 },
  'media': { 'leadtime': 58, 'deployfreq': 65, 'ttr': 85, 'chgfail': 85 },
  'nonprofit': { 'leadtime': 67, 'deployfreq': 73, 'ttr': 93, 'chgfail': 98 },
  'retail': { 'leadtime': 59, 'deployfreq': 67, 'ttr': 87, 'chgfail': 89 },
  'technology': { 'leadtime': 51, 'deployfreq': 51, 'ttr': 78, 'chgfail': 90 },
  'telecoms': { 'leadtime': 44, 'deployfreq': 43, 'ttr': 79, 'chgfail': 81 },
  'other': { 'leadtime': 51, 'deployfreq': 48, 'ttr': 80, 'chgfail': 89 }
}

const allCapabilities = {
    "elite": {
      "westrum": {
        "title": "Westrum organizational culture",
        "description": "Westrum&rsquo;s measure of organizational culture is predictive of IT performance, organizational performance, and decreasing burnout. Hallmarks of this measure include good information flow, high cooperation and trust, bridging between teams, and conscious inquiry.",
        "mean": 77,
        "profile-mean": 85,
        "url": "https://cloud.google.com/solutions/devops/devops-culture-westrum-organizational-culture",
        "img": "https://www.google.com/images/icons/material/system/svg/support_24px.svg",
        "context": "How strongly do you agree or disagree with the following? On my team:",
        "questions": [
      "Information is actively sought.",
      "Messengers are not punished when they deliver news of failures or other bad news.",
      "Responsibilities are shared.",
      "Cross-functional collaboration is encouraged and rewarded.",
      "Failure causes inquiry.",
      "New ideas are welcomed.",
      "Failures are treated primarily as opportunities to improve the system."
        ] },
      "monitoring": {
        "title": "Monitoring and observability",
        "description": "A comprehensive monitoring and observability system allows teams to understand the health of their systems. Effective solutions enable monitoring predefined metrics, including system state as experienced by users as well as allowing engineers to interactively debug systems and explore properties and patterns as they emerge.",
        "mean": 67,
        "profile-mean": 75,
        "url": "https://cloud.google.com/solutions/devops/devops-measurement-monitoring-and-observability",
        "img": "https://www.google.com/images/icons/material/system/svg/analytics_24px.svg",
        "context": "How do you watch and understand your systems at work? Please rate how strongly you agree or disagree with the following statements:",
        "questions": [
      "My team has a tech solution in place to report on the overall health of systems (e.g, are my systems functioning? / do my systems have sufficient resources available?).",
      "My team has a tech solution in place to report on system state as experienced by customers (e.g., &ldquo;do my customers know if my system is down and have a bad experience?&rdquo;).",
      "My team has a tech solution in place for monitoring key business and systems metrics.",
      "My team has tooling in place that can help us with understanding and debugging our systems in production.",
      "My team has tooling in place that provides the ability to find information about things we did not previously know (e.g., we can identify &ldquo;unknown unknowns&rdquo;).",
      "My team has access to tools and data which help us trace, understand, and diagnose infrastructure problems in our production environment, including interactions between services."
        ] },
      "mvp": {
        "title": "Working in small batches",
        "description": "Teams should slice work into small pieces that can be completed in a week or less. The key is to have work decomposed into small features that allow for rapid development, instead of developing complex features on branches and releasing them infrequently. This idea can be applied at the feature and the product level. (An MVP is a prototype of a product with just enough features to enable validated learning about the product and its business model.) Working in small batches enables short lead times and faster feedback loops.",
        "mean": 61,
        "profile-mean": 83,
        "url": "https://cloud.google.com/solutions/devops/devops-process-working-in-small-batches",
        "img": "https://www.google.com/images/icons/material/system/svg/communities_24px.svg",
        "context": "The following questions ask about how work is sized. Please rate how strongly you agree or disagree with the following statements.",
        "questions": [
      "Our features are sliced in a way that lend themselves to frequent production releases.",
      "Our features are decomposed in a way that allows a developer to complete the work in a week or less.",
      "Our work is decomposed into features that allow for minimum viable products (MVPs) and rapid development, rather than complex and lengthy processes (an MVP has just enough features to get validated learning about the product & its continued development)."
        ] } },
    "high": {
      "learn": {
        "title": "Learning culture",
        "description": "Is learning, in your culture, considered essential for continued progress? Is learning thought of as a cost or an investment? This is a measure of an organization&rsquo;s learning culture.",
        "mean": 82,
        "profile-mean": 85,
        "url": "https://cloud.google.com/solutions/devops/devops-culture-learning-culture",
        "img": "https://www.google.com/images/icons/material/system/svg/school_24px.svg",
        "context": "Please rate how strongly you agree or disagree with the following statements as descriptive of your organization.",
        "questions": [
      "Learning is the key to improvement.",
      "Once we quit learning we endanger our future.",
      "Learning is viewed as an investment, not an expense."
        ] },
      "wip": {
        "title": "Work in process limits",
        "description": "The use of work-in-process limits to manage the flow of work is well known in the Lean community. When used effectively, this drives process improvement, increases throughput, and makes constraints visible in the system.",
        "mean": 54,
        "profile-mean": 56,
        "url": "https://cloud.google.com/solutions/devops/devops-measurement-wip-limits",
        "img": "https://www.google.com/images/icons/material/system/svg/compress_24px.svg",
        "context": "Please rate how strongly you agree or disagree with the following statements:",
        "questions": [
      "As a team, we are good at limiting our work in process (WIP).",
      "We strive to limit our WIP, and have processes in place to do so.",
      "Our WIP limits make obstacles to higher flow visible.",
      "Our WIP limits lead to process improvement.",
      "WIP limits are used as a way to improve our throughput."
        ] },
      "trunk": {
        "title": "Trunk-based development",
        "description": "Trunk-based development has been shown to be a predictor of high performance in software development and delivery. It is characterized by fewer than three active branches in a code repository; branches and forks having very short lifetimes (e.g., less than a day) before being merged into master; and application teams rarely or never having &ldquo;code lock&rdquo; periods when no one can check in code or do pull requests due to merging conflicts, code freezes, or stabilization phases.",
        "mean": 54,
        "profile-mean": 60,
        "url": "https://cloud.google.com/solutions/devops/devops-tech-trunk-based-development",
        "img": "https://www.google.com/images/icons/material/system/svg/integration_instructions_24px.svg",
        "context": "For the primary application or service you work on:",
        "questions": [
      "All developers on my team push code to trunk/master at least daily.",
      "There are fewer than three active branches on the application's code repo.",
      "Our application team never has code lock periods when no one can check in code or do pull requests due to merging conflicts.",
      "Branches and forks have very short lifetimes (less than a day) before being merged to master."
        ] } },
    "medium": {
      "ci": {
        "title": "Continuous integration",
        "description": "Continuous integration (CI) is the first step towards continuous delivery. This is a development practice where code is regularly checked in, and each check-in triggers a set of quick tests to discover serious regressions, which developers fix immediately. The CI process creates canonical builds and packages that are ultimately deployed and released.",
        "mean": 66,
        "profile-mean": 61,
        "url": "https://cloud.google.com/solutions/devops/devops-tech-continuous-integration",
        "img": "https://www.google.com/images/icons/material/system/svg/all_inclusive_24px.svg",
        "context": "For the primary application or service you work on:",
        "questions": [
      "Code commits result in an automated build of the software.",
      "Code commits result in a series of automated tests being run.",
      "Automated builds and tests are executed successfully every day.",
      "Current builds are available to testers for exploratory testing.",
      "Developers get feedback from the acceptance and performance tests every day."
        ] },
      "cd": {
        "title": "Continuous delivery",
        "description": "Continuous delivery (CD) is the ability to release changes of all kinds on demand quickly, safely, and sustainably. Teams that practice continuous delivery well are able to release software and make changes to production in a low-risk way at any time &mdash; including during normal business hours &mdash; without impacting users.",
        "mean": 65,
        "profile-mean": 61,
        "url": "https://cloud.google.com/solutions/devops/devops-tech-continuous-delivery",
        "img": "https://www.google.com/images/icons/material/system/svg/swap_driving_apps_wheel_24px.svg",
        "context": "For the primary application or service you work on:",
        "questions": [
      "Our software is in a deployable state throughout its lifecycle.",
      "My team prioritizes keeping the software deployable over working on new features.",
      "Fast feedback on the quality and deployability of the system is available to anyone on the team.",
      "When people get feedback that the system is not deployable (such as failing builds or tests), they make fixing these issues their highest priority.",
      "We can deploy our system to production, or to end users, at any time, on demand."
        ] },
      "architecture": {
        "title": "Architecture",
        "description": "Having a loosely coupled architecture allows your teams to work independently, without relying on other teams for support and services, which in turn enables them to work quickly and deliver value to the organization. It affects the extent to which a team can test and deploy their applications on demand, without requiring orchestration with other services.",
        "mean": 56,
        "profile-mean": 51,
        "url": "https://cloud.google.com/solutions/devops/devops-tech-architecture",
        "img": "https://www.google.com/images/icons/material/system/svg/grid_view_24px.svg",
        "context": "For the primary application or service you work on:",
        "questions": [
      "On my team, we can make large-scale changes to the design of our system without the permission of somebody outside the team.",
      "To complete my own work, I don&rsquo;t need to communicate and coordinate with people outside my team.",
      "On my team, we can make large-scale changes to the design of our system without creating significant work for other teams.",
      "On my team, we can make large-scale changes to the design of our system without depending on other teams to make changes in their systems.",
      "My team can deploy and release our product or service on demand, independently of other services it depends upon.",
      "We can do most of our testing on demand, without requiring an integrated test environment.",
      "On my team, we perform deployments during normal business hours with negligible downtime."
        ] } },
    "low": {
      "conttest": {
        "title": "Continuous testing",
        "description": "Continuous testing means teams build quality in by testing throughout the software delivery lifecycle, using a combination of automated and manual tests to gain visibility into the quality of the software, and curating their test suites to make them more effective and to keep complexity and cost under control.",
        "mean": 63,
        "profile-mean": 53,
        "url": "https://cloud.google.com/solutions/devops/devops-tech-test-automation",
        "img": "https://www.google.com/images/icons/material/system/svg/assignment_turned_in_24px.svg",
        "context": "For the primary application or service you work on:",
        "questions": [
      "Developers primarily create and maintain acceptance tests.",
      "When the automated tests pass, I am confident the software is releasable.",
      "Test failures are likely to indicate a real defect.",
      "It is easy for developers to fix acceptance test failures.",
      "Developers use their own development environment to reproduce acceptance failures.",
      "Automated tests are seamlessly integrated into our software delivery toolchain.",
      "We continuously review and improve our test suite to better find defects and keep complexity and cost under control.",
      "We have the test data necessary to run our tests easily at every step.",
      "Testers work alongside developers throughout the software development and delivery process.",
      "Manual test activities such as exploratory testing, usability testing, and acceptance testing are performed continuously throughout the delivery process.",
      "Developers practice test-driven development by writing unit tests before writing production code for all changes to the codebase.",
      "I can get feedback from automated tests in less than ten minutes both on my local workstation and from the CI server."
        ] },
      "cloud": {
        "title": "Cloud infrastructure",
        "description": "We find that use of the cloud drives software delivery performance &mdash; but only if they follow the five essential characteristics of cloud computing as outlined by NIST: on-demand self-service, broad network access, resource pooling, rapid elasticity, and measured service.",
        "mean": 64,
        "profile-mean": 55,
        "url": "https://cloud.google.com/solutions/devops/devops-tech-cloud-infrastructure",
        "img": "https://www.google.com/images/icons/material/system/svg/cloud_24px.svg",
        "context": "Please rate how strongly you agree or disagree with the following statements.",
        "questions": [
      "Once I have access, I can independently provision and configure the cloud resources and capabilities required for my product or service on demand without raising tickets or requiring human interaction.",
      "The service or product that I primarily work on is designed to be accessed from a broad range of devices (e.g. smartphones, tablets, laptops) over the network without the need for proprietary plug-ins or protocols.",
      "The cloud my product or service runs on serves multiple teams and applications, with compute and infrastructure resources dynamically assigned and re-assigned based on demand.",
      "I can dynamically increase or decrease the cloud resources available for the service or product that I primarily support based on demand.",
      "I can monitor or control the quantity and/or cost of cloud resources used by the service or product that I primarily support."
        ] },
      "maintainability": {
        "title": "Code maintainability",
        "description": "Teams that manage code maintainability well have systems and tools that make it easy for developers to change code maintained by other teams, find examples in the codebase, reuse other people&rsquo;s code, as well as add, upgrade, and migrate to new versions of dependencies without breaking their code.",
        "mean": 65,
        "profile-mean": 56,
        "url": "https://cloud.google.com/solutions/devops/devops-tech-code-maintainability",
        "img": "https://www.google.com/images/icons/material/system/svg/code_24px.svg",
        "context": "Please rate how strongly you agree or disagree with the following statements:",
        "questions": [
      "It&rsquo;s easy for us to change code maintained by other teams if we need to.",
      "It is easy for me to find examples in our codebase.",
      "It is easy for me to reuse other people&rsquo;s code.",
      "It is easy for me to add new dependencies to my project.",
      "It is easy for me to migrate to a new version of a dependency.",
      "My dependencies are stable and rarely break my code."
        ] }
    }
  }