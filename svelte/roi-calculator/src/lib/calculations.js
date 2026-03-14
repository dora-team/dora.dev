const MONTHS_PER_YEAR = 12;

export const DEFAULTS = {
    staff_size: 500,
    salary: 176000,
    revenue: 100000000,
    downtime_cost_per_hour: 100000,
    current_deployments_per_year: 50,
    current_features_per_year: 50,
    idea_success_rate: 0.33,
    revenue_impact_per_feature: 0.005,
    current_cfr: 0.05,
    current_fdrt: 4,
    time_saved_per_developer: 0.125,
    ai_license_cost_per_user: 250,
    additional_ai_cost_per_user: 80,
    additional_ai_infra_cost: 100000,
    training_cost_per_user: 9600,
    target_deployments_per_year: 56,
    target_features_per_year: 56,
    target_cfr: 0.06,
    j_curve_drop: 0.15,
    j_curve_duration: 3,
};

const enforceMin = (val, min) => {
    const num = parseFloat(val);
    if (isNaN(num)) return min;
    return num < min ? min : num;
};

export const sanitizeInputs = (raw) => {
    return {
        ...raw,
        // Can be negative
        time_saved_per_developer: parseFloat(raw.time_saved_per_developer) || 0,
        
        // Must be >= 0
        ai_license_cost_per_user: enforceMin(raw.ai_license_cost_per_user, 0),
        additional_ai_cost_per_user: enforceMin(raw.additional_ai_cost_per_user, 0),
        additional_ai_infra_cost: enforceMin(raw.additional_ai_infra_cost, 0),
        training_cost_per_user: enforceMin(raw.training_cost_per_user, 0),

        // Must be > 0 (using a small epsilon)
        staff_size: enforceMin(raw.staff_size, 0.000001),
        salary: enforceMin(raw.salary, 0.000001),
        revenue: enforceMin(raw.revenue, 0.000001),
        downtime_cost_per_hour: enforceMin(raw.downtime_cost_per_hour, 0.000001),
        current_deployments_per_year: enforceMin(raw.current_deployments_per_year, 0.000001),
        current_features_per_year: enforceMin(raw.current_features_per_year, 0.000001),
        idea_success_rate: enforceMin(raw.idea_success_rate, 0.000001),
        revenue_impact_per_feature: enforceMin(raw.revenue_impact_per_feature, 0.000001),
        current_cfr: enforceMin(raw.current_cfr, 0.000001),
        current_fdrt: enforceMin(raw.current_fdrt, 0.000001),
        target_deployments_per_year: enforceMin(raw.target_deployments_per_year, 0.000001),
        target_features_per_year: enforceMin(raw.target_features_per_year, 0.000001),
        target_cfr: enforceMin(raw.target_cfr, 0.000001),
        j_curve_drop: enforceMin(raw.j_curve_drop, 0.000001),
        j_curve_duration: enforceMin(raw.j_curve_duration, 0.000001),
    };
};

export const calculateROI = (inputs) => {
    const i = sanitizeInputs({ ...DEFAULTS, ...inputs });

    // Costs
    const total_hard_costs = ((i.ai_license_cost_per_user + i.additional_ai_cost_per_user + i.training_cost_per_user) * i.staff_size) + i.additional_ai_infra_cost;
    const j_curve_cost = i.staff_size * i.salary * i.j_curve_drop * (i.j_curve_duration / MONTHS_PER_YEAR);
    const total_first_year_investment = total_hard_costs + j_curve_cost;

    // Value
    const headcount_reinvestment_capacity = i.staff_size * i.salary * i.time_saved_per_developer;
    const revenue_from_extra_features = (i.target_features_per_year - i.current_features_per_year) * i.idea_success_rate * i.revenue_impact_per_feature * i.revenue;
    const downtime_savings = (i.current_deployments_per_year * i.current_cfr * i.current_fdrt * i.downtime_cost_per_hour) - (i.target_deployments_per_year * i.target_cfr * i.current_fdrt * i.downtime_cost_per_hour);
    const total_first_year_value = headcount_reinvestment_capacity + revenue_from_extra_features + downtime_savings;

    // Summary
    const first_year_benefit = total_first_year_value - total_first_year_investment;
    const roi = total_first_year_investment !== 0 ? first_year_benefit / total_first_year_investment : 0;
    const payback_period = total_first_year_value > 0 ? total_first_year_investment / total_first_year_value : Infinity;

    return {
        total_hard_costs,
        j_curve_cost,
        total_first_year_investment,
        headcount_reinvestment_capacity,
        revenue_from_extra_features,
        downtime_savings,
        total_first_year_value,
        first_year_benefit,
        roi,
        payback_period
    };
};
