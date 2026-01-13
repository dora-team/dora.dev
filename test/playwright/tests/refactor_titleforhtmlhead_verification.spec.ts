import { test, expect } from '@playwright/test';

const pagesToTest = [
  { path: '/capabilities/ai-accessible-internal-data/', expectedTitle: 'DORA | Capabilities: AI-accessible internal data' },
  { path: '/capabilities/clear-and-communicated-ai-stance/', expectedTitle: 'DORA | Capabilities: Clear and communicated AI stance' },
  { path: '/capabilities/cloud-infrastructure/', expectedTitle: 'DORA | Capabilities: Flexible infrastructure' },
  { path: '/capabilities/code-maintainability/', expectedTitle: 'DORA | Capabilities: Code maintainability' },
  { path: '/capabilities/continuous-delivery/', expectedTitle: 'DORA | Capabilities: Continuous delivery' },
  { path: '/capabilities/continuous-integration/', expectedTitle: 'DORA | Capabilities: Continuous integration' },
  { path: '/capabilities/customer-feedback/', expectedTitle: 'DORA | Capabilities: Customer feedback' },
  { path: '/capabilities/database-change-management/', expectedTitle: 'DORA | Capabilities: Database change management' },
  { path: '/capabilities/deployment-automation/', expectedTitle: 'DORA | Capabilities: Deployment automation' },
  { path: '/capabilities/documentation-quality/', expectedTitle: 'DORA | Capabilities: Documentation quality' },
  { path: '/capabilities/generative-organizational-culture/', expectedTitle: 'DORA | Capabilities: Generative organizational culture' },
  { path: '/capabilities/healthy-data-ecosystems/', expectedTitle: 'DORA | Capabilities: Healthy data ecosystems' },
  { path: '/capabilities/job-satisfaction/', expectedTitle: 'DORA | Capabilities: Job satisfaction' },
  { path: '/capabilities/learning-culture/', expectedTitle: 'DORA | Capabilities: Learning culture' },
  { path: '/capabilities/loosely-coupled-teams/', expectedTitle: 'DORA | Capabilities: Loosely coupled teams' },
  { path: '/capabilities/monitoring-and-observability/', expectedTitle: 'DORA | Capabilities: Monitoring and observability' },
  { path: '/capabilities/monitoring-systems/', expectedTitle: 'DORA | Capabilities: Monitoring systems to inform business decisions' },
  { path: '/capabilities/pervasive-security/', expectedTitle: 'DORA | Capabilities: Pervasive security' },
  { path: '/capabilities/platform-engineering/', expectedTitle: 'DORA | Capabilities: Platform engineering' },
  { path: '/capabilities/proactive-failure-notification/', expectedTitle: 'DORA | Capabilities: Proactive failure notification' },
  { path: '/capabilities/streamlining-change-approval/', expectedTitle: 'DORA | Capabilities: Streamlining change approval' },
  { path: '/capabilities/team-experimentation/', expectedTitle: 'DORA | Capabilities: Team experimentation' },
  { path: '/capabilities/teams-empowered-to-choose-tools/', expectedTitle: 'DORA | Capabilities: Empowering teams to choose tools' },
  { path: '/capabilities/test-automation/', expectedTitle: 'DORA | Capabilities: Test automation' },
  { path: '/capabilities/test-data-management/', expectedTitle: 'DORA | Capabilities: Test data management' },
  { path: '/capabilities/transformational-leadership/', expectedTitle: 'DORA | Capabilities: Transformational leadership' },
  { path: '/capabilities/trunk-based-development/', expectedTitle: 'DORA | Capabilities: Trunk-based development' },
  { path: '/capabilities/user-centric-focus/', expectedTitle: 'DORA | Capabilities: User-centric focus' },
  { path: '/capabilities/version-control/', expectedTitle: 'DORA | Capabilities: Version control' },
  { path: '/capabilities/visual-management/', expectedTitle: 'DORA | Capabilities: Visual management' },
  { path: '/capabilities/wip-limits/', expectedTitle: 'DORA | Capabilities: Work in process limits' },
  { path: '/capabilities/work-visibility-in-value-stream/', expectedTitle: 'DORA | Capabilities: Visibility of work in the value stream' },
  { path: '/capabilities/working-in-small-batches/', expectedTitle: 'DORA | Capabilities: Working in small batches' },
  { path: '/guides/how-to-empower-software-delivery-teams/', expectedTitle: 'DORA | How to empower software delivery teams as a business leader' },
  { path: '/guides/how-to-innovate-with-generative-ai/', expectedTitle: 'DORA | How to enable your software delivery teams to innovate with generative AI' },
  { path: '/guides/how-to-transform/', expectedTitle: 'DORA | How to transform your organization' },
  { path: '/guides/value-stream-management/', expectedTitle: 'DORA | Value stream mapping for software delivery' },
];

test.describe('Baseline Title Verification', () => {
  for (const { path, expectedTitle } of pagesToTest) {
    test(`should have correct title for ${path}`, async ({ page }) => {
      await page.goto(path);
      await expect(page).toHaveTitle(expectedTitle);
    });
  }
});
