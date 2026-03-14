import { describe, it, expect } from 'vitest';
import { calculateROI, DEFAULTS } from './calculations';

describe('calculateROI', () => {
    it('should calculate ROI correctly with default values', () => {
        const results = calculateROI(DEFAULTS);

        // Expected values from CSV:
        // Total hard costs: $5,065,000
        // J-Curve cost: $3,300,000
        // Total first year investment: $8,365,000
        // Headcount reinvestment capacity: $11,000,000
        // Revenue from extra feature deployments: $990,000
        // Additional revenue or costs avoided by reducing downtime: -$344,000
        // Total first year value: $11,646,000
        // First year benefit: $3,281,000
        // ROI: 39%
        // Payback period (years): 0.7

        expect(results.total_hard_costs).toBe(5065000);
        expect(results.j_curve_cost).toBe(3300000);
        expect(results.total_first_year_investment).toBe(8365000);
        expect(results.headcount_reinvestment_capacity).toBe(11000000);
        expect(Math.round(results.revenue_from_extra_features)).toBe(990000);
        expect(results.downtime_savings).toBe(-344000);
        expect(Math.round(results.total_first_year_value)).toBe(11646000);
        expect(Math.round(results.first_year_benefit)).toBe(3281000);
        expect(Math.round(results.roi * 100)).toBe(39);
        expect(results.payback_period.toFixed(1)).toBe("0.7");
    });

    it('should handle zero values for AI costs and negative time saved', () => {
        const results = calculateROI({
            ...DEFAULTS,
            ai_license_cost_per_user: 0,
            additional_ai_cost_per_user: 0,
            additional_ai_infra_cost: 0,
            training_cost_per_user: 0,
            time_saved_per_developer: -0.1
        });

        expect(results.total_hard_costs).toBe(0);
        expect(results.headcount_reinvestment_capacity).toBeLessThan(0);
        expect(results.total_first_year_investment).toBe(3300000); // Only J-curve cost remains
    });
});
