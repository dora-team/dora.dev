import { test, expect } from '@playwright/test';

const pagesToTest = [
  { path: '/capabilities/code-maintainability/', expectedTitle: 'DORA | Capabilities: Code Maintainability' },
  { path: '/capabilities/visual-management/', expectedTitle: 'DORA | Capabilities: Visual Management' },
  { path: '/capabilities/work-visibility-in-value-stream/', expectedTitle: 'DORA | Capabilities: Visibility of work in the value stream' },
  { path: '/capabilities/test-data-management/', expectedTitle: 'DORA | Capabilities: Test Data Management' },
  { path: '/capabilities/teams-empowered-to-choose-tools/', expectedTitle: 'DORA | Capabilities: Empowering teams to choose tools' },
  { path: '/capabilities/platform-engineering/', expectedTitle: 'DORA | Platform Engineering' },
  { path: '/capabilities/job-satisfaction/', expectedTitle: 'DORA | Capabilities: Job Satisfaction' },
  { path: '/capabilities/generative-organizational-culture/', expectedTitle: 'DORA | Capabilities: Generative Organizational Culture' },
  { path: '/capabilities/documentation-quality/', expectedTitle: 'DORA | Capabilities: Documentation quality' },
  { path: '/capabilities/deployment-automation/', expectedTitle: 'DORA | Capabilities: Deployment Automation' },
  { path: '/capabilities/continuous-delivery/', expectedTitle: 'DORA | Capabilities: Continuous Delivery' },
  { path: '/capabilities/version-control/', expectedTitle: 'DORA | Capabilities: Version Control' },
  { path: '/capabilities/clear-and-communicated-ai-stance/', expectedTitle: 'DORA | Clear and communicated AI stance' },
  { path: '/capabilities/database-change-management/', expectedTitle: 'DORA | Capabilities: Database Change Management' },
  { path: '/capabilities/team-experimentation/', expectedTitle: 'DORA | Capabilities: Team Experimentation' },
  { path: '/capabilities/cloud-infrastructure/', expectedTitle: 'DORA | Capabilities: Flexible Infrastructure' },
  { path: '/capabilities/ai-accessible-internal-data/', expectedTitle: 'DORA | AI-accessible internal data' },
  { path: '/capabilities/loosely-coupled-teams/', expectedTitle: 'DORA | Capabilities: Loosely Coupled Teams' },
  { path: '/capabilities/proactive-failure-notification/', expectedTitle: 'DORA | Capabilities: Proactive Failure Notification' },
  { path: '/capabilities/monitoring-systems/', expectedTitle: 'DORA | Capabilities: Monitoring systems to inform business decisions' },
  { path: '/capabilities/trunk-based-development/', expectedTitle: 'DORA | Capabilities: Trunk-based Development' },
  { path: '/capabilities/learning-culture/', expectedTitle: 'DORA | Capabilities: Learning Culture' },
  { path: '/capabilities/transformational-leadership/', expectedTitle: 'DORA | Capabilities: Transformational Leadership' },
  { path: '/capabilities/monitoring-and-observability/', expectedTitle: 'DORA | Capabilities: Monitoring and Observability' },
  { path: '/capabilities/working-in-small-batches/', expectedTitle: 'DORA | Capabilities: Working in Small Batches' },
  { path: '/capabilities/pervasive-security/', expectedTitle: 'DORA | Capabilities: Pervasive Security' },
  { path: '/capabilities/test-automation/', expectedTitle: 'DORA | Capabilities: Test automation' },
  { path: '/capabilities/continuous-integration/', expectedTitle: 'DORA | Capabilities: Continuous Integration' },
  { path: '/capabilities/customer-feedback/', expectedTitle: 'DORA | Capabilities: Customer Feedback' },
  { path: '/capabilities/user-centric-focus/', expectedTitle: 'DORA | User-centric focus' },
  { path: '/capabilities/streamlining-change-approval/', expectedTitle: 'DORA | Capabilities: Streamlining Change Approval' },
  { path: '/capabilities/wip-limits/', expectedTitle: 'DORA | Capabilities: Work in process limits' },
  { path: '/capabilities/healthy-data-ecosystems/', expectedTitle: 'DORA | Healthy data ecosystems' },
  { path: '/guides/how-to-transform/', expectedTitle: 'DORA | How to transform your organization' },
  { path: '/guides/how-to-innovate-with-generative-ai/', expectedTitle: 'DORA | How to enable your software delivery teams to innovate with generative AI' },
  { path: '/guides/value-stream-management/', expectedTitle: 'DORA | Value stream mapping for software delivery' },
  { path: '/guides/how-to-empower-software-delivery-teams/', expectedTitle: 'DORA | How to empower software delivery teams as a business leader' },
];

test.describe('Baseline Title Verification', () => {
  for (const { path, expectedTitle } of pagesToTest) {
    test(`should have correct title for ${path}`, async ({ page }) => {
      await page.goto(path);
      await expect(page).toHaveTitle(expectedTitle);
    });
  }
});
