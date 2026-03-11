<script>
    import { onMount } from 'svelte';
    import { DEFAULTS, calculateROI, sanitizeInputs } from './lib/calculations';
    import { formatCurrency, formatPercent, formatNumber } from './lib/formatters';
    import NumericInput from './lib/NumericInput.svelte';
    import PercentInput from './lib/PercentInput.svelte';

    let inputs = $state({ ...DEFAULTS });
    let results = $derived(calculateROI(inputs));

    const loadFromHash = () => {
        const hash = window.location.hash.substring(1);
        if (hash) {
            try {
                const params = new URLSearchParams(hash);
                let newInputs = { ...inputs };
                for (const [key, value] of params.entries()) {
                    if (key in DEFAULTS) {
                        newInputs[key] = parseFloat(value);
                    }
                }
                // Sanitize everything after loading from hash
                inputs = sanitizeInputs(newInputs);
            } catch (e) {
                console.error("Failed to parse hash", e);
            }
        }
    };

    const saveToHash = () => {
        const params = new URLSearchParams();
        for (const [key, value] of Object.entries(inputs)) {
            params.set(key, value);
        }
        const newHash = params.toString();
        if (window.location.hash.substring(1) !== newHash) {
            window.location.hash = newHash;
        }
    };

    onMount(() => {
        loadFromHash();
        window.addEventListener('hashchange', loadFromHash);
        return () => window.removeEventListener('hashchange', loadFromHash);
    });

    $effect(() => {
        // Debounce to avoid excessive URL hash updates on every keystroke.
        const timer = setTimeout(() => {
            saveToHash();
        }, 300);

        return () => clearTimeout(timer);
    });

    const resetToDefaults = () => {
        inputs = { ...DEFAULTS };
    };

</script>

<div class="roi-calculator">
    <div class="grid">
        <section class="inputs">
            <h2>Input variables</h2>
            
            <div class="input-section">
                <h3>Organizational metrics</h3>
                <NumericInput 
                    label="Technical staff size" 
                    id="staff_size" 
                    suffix="FTE" 
                    bind:value={inputs.staff_size} 
                    defaultValue={DEFAULTS.staff_size}
                    description="The count of full time employees, or equivalent, who are involved in the software development lifecycle. Include all roles that may use AI to contribute to the process, including product managers, software engineers, user experience designers, technical leads, site reliability engineers, and more."
                />
                <NumericInput 
                    label="Average fully loaded technical staff salary" 
                    id="salary" 
                    bind:value={inputs.salary} 
                    defaultValue={DEFAULTS.salary}
                    isCurrency={true}
                    description="Software engineer salaries vary greatly between regions in the world. The 'fully loaded' cost (total cost to the employer) typically adds between 30% (US) to 100% (Europe) on top of the average base salary to account for taxes, benefits, and overhead."
                />
            </div>

            <div class="input-section">
                <h3>Baseline software delivery metrics</h3>
                <NumericInput 
                    label="Product portfolio revenue" 
                    id="revenue" 
                    bind:value={inputs.revenue} 
                    defaultValue={DEFAULTS.revenue}
                    isCurrency={true}
                    description="This is the annual revenue driven by this software."
                />
                <NumericInput 
                    label="Cost of downtime per hour" 
                    id="downtime_cost_per_hour" 
                    bind:value={inputs.downtime_cost_per_hour} 
                    defaultValue={DEFAULTS.downtime_cost_per_hour}
                    isCurrency={true}
                    description="This is an estimate of the cost of 1 hour of system outage. We recommend considering revenue lost as well as additional costs, such as reputational damage. You could also estimate this by dividing the product portfolio revenue by the number of hours in a year (8,760)."
                />
                <NumericInput 
                    label="Current deployments per year" 
                    id="current_deployments_per_year" 
                    bind:value={inputs.current_deployments_per_year} 
                    defaultValue={DEFAULTS.current_deployments_per_year}
                    description="Estimate the total number of deployments per year for this application or service."
                />
                <NumericInput 
                    label="Current features deployed per year" 
                    id="current_features_per_year" 
                    bind:value={inputs.current_features_per_year} 
                    defaultValue={DEFAULTS.current_features_per_year}
                    description="Features are user-facing enhancements designed to improve the product experience. Features and deployments rarely have a one-to-one relationship; a single deployment might bundle several new features, or a single complex feature might be rolled out incrementally across multiple deployments. The deployments per year can be used as a reasonable proxy."
                />
                <PercentInput 
                    label="Idea success rate" 
                    id="idea_success_rate" 
                    bind:value={inputs.idea_success_rate} 
                    defaultValue={DEFAULTS.idea_success_rate}
                    description="The percentage of shipped features that increase revenue for the application. Research suggests that about one-third (33%) of features shipped increase revenue for the application."
                />
                <PercentInput 
                    label="Average revenue impact per feature" 
                    id="revenue_impact_per_feature" 
                    bind:value={inputs.revenue_impact_per_feature} 
                    defaultValue={DEFAULTS.revenue_impact_per_feature}
                    description="Average revenue lift per successful feature. We recognize this is likely very difficult to project and recommend a conservative value here between 0.01% and 1%."
                />
                <PercentInput 
                    label="Current change failure rate" 
                    id="current_cfr" 
                    bind:value={inputs.current_cfr} 
                    defaultValue={DEFAULTS.current_cfr}
                    description="Current percentage of changes to production or released to users result in degraded service."
                />
                <NumericInput 
                    label="Failed deployment recovery time" 
                    id="current_fdrt" 
                    suffix="hours" 
                    bind:value={inputs.current_fdrt} 
                    defaultValue={DEFAULTS.current_fdrt}
                    description="Average number of hours it generally takes to restore service after a change to production or release to users results in degraded service."
                />
            </div>

            <div class="input-section">
                <h3>AI estimates</h3>
                <PercentInput 
                    label="Net time saved per developer" 
                    id="time_saved_per_developer" 
                    min={-1} 
                    bind:value={inputs.time_saved_per_developer} 
                    defaultValue={DEFAULTS.time_saved_per_developer}
                    description="Net productivity boost as a percentage. Be sure to consider both time saved in generating and the verification tax associated with things like code reviews."
                />
                <NumericInput 
                    label="Annual AI license cost per user" 
                    id="ai_license_cost_per_user" 
                    min={0} 
                    bind:value={inputs.ai_license_cost_per_user} 
                    defaultValue={DEFAULTS.ai_license_cost_per_user}
                    isCurrency={true}
                    description="The annual price per user of an AI subscription."
                />
                <NumericInput 
                    label="Additional annual AI costs per user" 
                    id="additional_ai_cost_per_user" 
                    min={0} 
                    bind:value={inputs.additional_ai_cost_per_user} 
                    defaultValue={DEFAULTS.additional_ai_cost_per_user}
                    isCurrency={true}
                    description="Any additional per user costs, such as API or Token costs."
                />
                <NumericInput 
                    label="Additional annual AI infrastructure costs" 
                    id="additional_ai_infra_cost" 
                    min={0} 
                    bind:value={inputs.additional_ai_infra_cost} 
                    defaultValue={DEFAULTS.additional_ai_infra_cost}
                    isCurrency={true}
                    description="New AI-related infrastructure costs including compute, networking, storage, and monitoring."
                />
                <NumericInput 
                    label="Annual training costs per user" 
                    id="training_cost_per_user" 
                    min={0} 
                    bind:value={inputs.training_cost_per_user} 
                    defaultValue={DEFAULTS.training_cost_per_user}
                    isCurrency={true}
                    description="Training and enablement costs for each employee."
                />
                <NumericInput 
                    label="Target number of deployments per year" 
                    id="target_deployments_per_year" 
                    bind:value={inputs.target_deployments_per_year} 
                    defaultValue={DEFAULTS.target_deployments_per_year}
                    description="Expected deployments per year. DORA's research shows that adopting AI is associated with an increase in software delivery throughput."
                />
                <NumericInput 
                    label="Target number of features deployed per year" 
                    id="target_features_per_year" 
                    bind:value={inputs.target_features_per_year} 
                    defaultValue={DEFAULTS.target_features_per_year}
                    description="Expected features delivered per year. Features are user-facing enhancements designed to improve the product experience."
                />
                <PercentInput 
                    label="Target change failure rate" 
                    id="target_cfr" 
                    bind:value={inputs.target_cfr} 
                    defaultValue={DEFAULTS.target_cfr}
                    description="Target percentage of changes to production or released to users result in degraded service. DORA's research shows an increase in delivery instability is associated with the adoption of AI."
                />
                <PercentInput 
                    label="J-Curve productivity drop" 
                    id="j_curve_drop" 
                    bind:value={inputs.j_curve_drop} 
                    defaultValue={DEFAULTS.j_curve_drop}
                    description="Temporary productivity decreases during AI learning phase."
                />
                <NumericInput 
                    label="J-Curve productivity drop timeline" 
                    id="j_curve_duration" 
                    suffix="months" 
                    bind:value={inputs.j_curve_duration} 
                    defaultValue={DEFAULTS.j_curve_duration}
                    description="The length of the productivity decrease."
                />
            </div>
        </section>

        <section class="results">
            <div class="sticky-results">
                <h2>Calculated ROI</h2>
                
                <div class="summary-card primary">
                    <h3>Year 1 net profit</h3>
                    <p class="value">{formatCurrency(results.year_1_net_profit)}</p>
                    <div class="roi-stats">
                        <div class="stat">
                            <span class="label">Return on investment (ROI)</span>
                            <span class="value">{formatPercent(results.roi)}</span>
                        </div>
                        <div class="stat">
                            <span class="label">Payback period</span>
                            <span class="value">{results.payback_period === Infinity ? "N/A" : results.payback_period.toFixed(1) + " years"}</span>
                        </div>
                    </div>
                </div>

                <div class="result-sections">
                    <div class="result-section">
                        <h3>Costs (1st year investment)</h3>
                        <div class="stat">
                            <span class="label">Total hard costs (tooling and training)</span>
                            <span class="value">{formatCurrency(results.total_hard_costs)}</span>
                        </div>
                        <div class="stat">
                            <span class="label">J-Curve cost</span>
                            <span class="value">{formatCurrency(results.j_curve_cost)}</span>
                        </div>
                        <div class="stat total">
                            <span class="label">Total 1 year investment</span>
                            <span class="value">{formatCurrency(results.total_investment)}</span>
                        </div>
                    </div>

                    <div class="result-section">
                        <h3>Value (annual return)</h3>
                        <div class="stat">
                            <span class="label">Headcount reinvestment capacity</span>
                            <span class="value">{formatCurrency(results.headcount_reinvestment_capacity)}</span>
                        </div>
                        <div class="stat">
                            <span class="label">Revenue from extra feature deployments</span>
                            <span class="value">{formatCurrency(results.revenue_from_extra_features)}</span>
                        </div>
                        <div class="stat">
                            <span class="label">Downtime impact (savings/costs)</span>
                            <span class="value">{formatCurrency(results.downtime_savings)}</span>
                        </div>
                        <div class="stat total">
                            <span class="label">Total annual value</span>
                            <span class="value">{formatCurrency(results.total_annual_value)}</span>
                        </div>
                    </div>
                </div>

                <div class="roi-calculator-controls">
                    <button class="secondary" onclick={resetToDefaults}>Reset to defaults</button>
                </div>
            </div>
        </section>
    </div>

    <div class="dora-callout">
        <div class="dora-callout-title">Note on methodology</div>
        <div class="dora-callout-content">
            <p>Treat these calculations as a high-uncertainty estimate meant to spark a conversation, rather than a rigid mathematical formula. As the saying goes, all models are wrong, but we hope this one proves useful for your team as you assess the impact of AI in the software development lifecycle.</p>
            <p>As with any DORA insights, the real value comes from contextualizing the findings and applying them within your own organization. We’ve provided the ROI of AI-assisted software development calculator so you can explore the mechanics, adjust the assumptions to match your reality, and build your own estimate. Once you’ve had a chance to experiment, we invite you to share how it’s working out for your team in the <a href="https://dora.community" target="_blank">DORA Community</a>.</p>
        </div>
    </div>
</div>

<style lang="scss">
    .roi-calculator {
        max-width: 1200px;
        margin: 0 auto;
        padding: 2rem;
        color: var(--dora-primary-dark);
    }

    .roi-calculator-controls {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 2rem;
    }

    .grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 3rem;
    }

    h2 {
        font-size: 1.5rem;
        margin-top: 0;
        margin-bottom: 1.5rem;
        color: var(--dora-prussian-blue);
    }

    .input-section {
        border: 1px solid var(--border-color-medium);
        border-radius: 8px;
        padding: 1.5rem;
        margin-bottom: 2rem;
        background-color: #fcfcfc;

        h3 {
            margin: 0 0 1.5rem 0;
            font-weight: 600;
            color: var(--dora-prussian-blue);
            font-size: 1.1rem;
            border-bottom: none;
            padding-bottom: 0;
        }
    }

    .sticky-results {
        position: sticky;
        top: 2rem;
    }

    .summary-card {
        color: white;
        padding: 2rem;
        border-radius: 12px;
        text-align: center;
        margin-bottom: 2rem;
        box-shadow: 0 4px 12px rgba(0,0,0,0.1);

        &.primary {
            background-color: var(--dora-prussian-blue);
        }

        h3 {
            margin-top: 0;
            font-size: 1.2rem;
            opacity: 0.95;
            font-weight: 400;
        }

        .value {
            font-size: 3.5rem;
            font-weight: 700;
            margin: 0.5rem 0 1.5rem 0;
            color: var(--dora-highlight);
        }

        .roi-stats {
            display: flex;
            justify-content: space-around;
            border-top: 1px solid rgba(255,255,255,0.2);
            padding-top: 1.5rem;

            .stat {
                display: flex;
                flex-direction: column;

                .label {
                    font-size: 0.85rem;
                    opacity: 0.9;
                    margin-bottom: 0.25rem;
                }

                .value {
                    font-size: 1.75rem;
                    margin: 0;
                    color: white;
                }
            }
        }
    }

    .result-section {
        background: white;
        border: 1px solid var(--border-color-medium);
        border-radius: 8px;
        padding: 1.5rem;
        margin-bottom: 1rem;

        h3 {
            margin-top: 0;
            font-size: 1.1rem;
            border-bottom: 1px solid #eee;
            padding-bottom: 0.75rem;
            margin-bottom: 1rem;
            color: var(--dora-vermillion);
        }

        .stat {
            display: flex;
            justify-content: space-between;
            margin-bottom: 0.75rem;
            font-size: 0.95rem;

            &.total {
                margin-top: 1rem;
                padding-top: 1rem;
                border-top: 2px solid #eee;
                font-weight: 700;
                font-size: 1.15rem;
                color: var(--dora-prussian-blue);
            }

            .label {
                color: #555;
            }

            .value {
                font-weight: 500;
            }
        }
    }

    @media (max-width: 900px) {
        .grid {
            grid-template-columns: 1fr;
        }
        
        .sticky-results {
            position: static;
        }
    }
</style>
