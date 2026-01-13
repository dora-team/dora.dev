# Audit Results for Refactor titleForHTMLHead

## Templates using `titleForHTMLHead`
- `hugo/themes/dora-2025/layouts/partials/head.html`

## Content files using `titleForHTMLHead`
(Generated via `grep -r "titleForHTMLHead" hugo/content`)

- `hugo/content/capabilities/code-maintainability/index.md`
- `hugo/content/capabilities/visual-management/index.md`
- `hugo/content/capabilities/work-visibility-in-value-stream/index.md`
- `hugo/content/capabilities/test-data-management/index.md`
- `hugo/content/capabilities/teams-empowered-to-choose-tools/index.md`
- `hugo/content/capabilities/platform-engineering/index.md`
- `hugo/content/capabilities/job-satisfaction/index.md`
- `hugo/content/capabilities/generative-organizational-culture/index.md`
- `hugo/content/capabilities/documentation-quality/index.md`
- `hugo/content/capabilities/deployment-automation/index.md`
- `hugo/content/capabilities/continuous-delivery/index.md`
- `hugo/content/capabilities/version-control/index.md`
- `hugo/content/capabilities/clear-and-communicated-ai-stance/index.md`
- `hugo/content/capabilities/database-change-management/index.md`
- `hugo/content/capabilities/team-experimentation/index.md`
- `hugo/content/capabilities/cloud-infrastructure/index.md`
- `hugo/content/capabilities/ai-accessible-internal-data/index.md`
- `hugo/content/capabilities/loosely-coupled-teams/index.md`
- `hugo/content/capabilities/proactive-failure-notification/index.md`
- `hugo/content/capabilities/monitoring-systems/index.md`
- `hugo/content/capabilities/trunk-based-development/index.md`
- `hugo/content/capabilities/learning-culture/index.md`
- `hugo/content/capabilities/transformational-leadership/index.md`
- `hugo/content/capabilities/monitoring-and-observability/index.md`
- `hugo/content/capabilities/working-in-small-batches/index.md`
- `hugo/content/capabilities/pervasive-security/index.md`
- `hugo/content/capabilities/test-automation/index.md`
- `hugo/content/capabilities/continuous-integration/index.md`
- `hugo/content/capabilities/customer-feedback/index.md`
- `hugo/content/capabilities/user-centric-focus/index.md`
- `hugo/content/capabilities/streamlining-change-approval/index.md`
- `hugo/content/capabilities/wip-limits/index.md`
- `hugo/content/capabilities/healthy-data-ecosystems/index.md`
- `hugo/content/guides/how-to-transform/index.md`
- `hugo/content/guides/how-to-innovate-with-generative-ai/index.md`
- `hugo/content/guides/value-stream-management/index.md`
- `hugo/content/guides/how-to-empower-software-delivery-teams/index.md`

## Observations
- Most usage in `capabilities/` uses the format "Capabilities: [Name]".
- Some exceptions in `capabilities/` (e.g. "Platform Engineering" without prefix).
- `guides/` uses various titles.
- The template simply falls back to `.Title` if `.Params.TitleForHTMLHead` is missing.
