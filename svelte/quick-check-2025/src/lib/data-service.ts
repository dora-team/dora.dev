import industry_2024 from './data/editions/2024/industry_metrics.json';
import org_2024 from './data/editions/2024/organization_size_metrics.json';
import industry_2025 from './data/editions/2025/industry_metrics.json';
import org_2025 from './data/editions/2025/organization_size_metrics.json';
import { recode_numeric_range } from './utils';

export interface MetricBenchmark {
    mean: number;
    std: number;
}

export interface IndustryMetrics {
    name: string;
    performance_average?: MetricBenchmark;
    software_delivery_throughput?: MetricBenchmark;
    software_delivery_instability?: MetricBenchmark;
    leadtime: MetricBenchmark;
    deployfreq: MetricBenchmark;
    changefailure: MetricBenchmark;
    failurerecovery: MetricBenchmark;
    rework?: MetricBenchmark;
}

export interface BenchmarkData {
    [key: string]: IndustryMetrics;
}

export type MetricType = 'categorical' | 'percentage';

interface MetricDefinition {
    name: string;
    type: MetricType;
    version?: string;
}

const METRIC_DEFINITIONS: MetricDefinition[] = [
    { name: 'leadtime', type: 'categorical' },
    { name: 'deployfreq', type: 'categorical' },
    { name: 'failurerecovery', type: 'categorical' },
    { name: 'changefailure', type: 'percentage' },
    { name: 'rework', type: 'percentage', version: '2025' },
];

export class DataService {
    private static editions: Record<string, { industry: BenchmarkData, org: BenchmarkData }> = {
        '2024': { industry: industry_2024 as BenchmarkData, org: org_2024 as BenchmarkData },
        '2025': { industry: industry_2025 as BenchmarkData, org: org_2025 as BenchmarkData }
    };

    static getIndustryMetrics(version: string = '2025'): BenchmarkData {
        return this.editions[version]?.industry || this.editions['2025'].industry;
    }

    static getOrgSizeMetrics(version: string = '2025'): BenchmarkData {
        return this.editions[version]?.org || this.editions['2025'].org;
    }

    /**
     * Calculates the performance score (0-10, where 10 is best) for a metric.
     */
    static calculatePerformanceScore(value: number | string, type: 'categorical' | 'percentage'): number {
        if (type === 'categorical') {
            // 1 (worst) to 6 (best) -> 0 to 10
            return recode_numeric_range(value, 1, 6, 0, 10);
        } else {
            // 0% (best) to 100% (worst) -> 10 to 0
            return recode_numeric_range(value, 0, 100, 10, 0);
        }
    }

    /**
     * Calculates the display score (0-10, where 0 is left and 10 is right on the graph).
     * For throughput, 10 is best. For instability, 0 is best.
     */
    static calculateDisplayScore(value: number | string, type: 'categorical' | 'percentage'): number {
        if (type === 'categorical') {
            // 1 (left) to 6 (right) -> 0 to 10. (Right is best)
            return recode_numeric_range(value, 1, 6, 0, 10);
        } else {
            // 0% (left) to 100% (right) -> 0 to 10. (Left is best)
            return recode_numeric_range(value, 0, 100, 0, 10);
        }
    }

    static calculatePerformanceAverage(metrics: Record<string, number | string>, version: string): number {
        const activeDefinitions = METRIC_DEFINITIONS.filter(d => !d.version || d.version === version);
        
        const scores = activeDefinitions
            .map(d => {
                const val = metrics[d.name];
                if (val === undefined || val === -1 || val === '-1') return null;
                return this.calculatePerformanceScore(val, d.type);
            })
            .filter((s): s is number => s !== null);

        if (scores.length === 0) return 0;
        return scores.reduce((a, b) => a + b, 0) / scores.length;
    }

    /**
     * Returns all calculated metrics for a given set of user inputs.
     */
    static calculateAll(metrics: Record<string, number | string>, version: string) {
        const perfAverage = this.calculatePerformanceAverage(metrics, version);
        
        const individual: Record<string, { performanceScore: number, displayScore: number }> = {};
        METRIC_DEFINITIONS.forEach(d => {
            const val = metrics[d.name] ?? -1;
            individual[d.name] = {
                performanceScore: this.calculatePerformanceScore(val, d.type),
                displayScore: this.calculateDisplayScore(val, d.type)
            };
        });

        // Specific group averages as used in the UI
        const throughputScores = ['leadtime', 'deployfreq', 'failurerecovery']
            .map(name => individual[name].performanceScore);
        const throughputAverage = throughputScores.reduce((a, b) => a + b, 0) / throughputScores.length;

        const instabilityMetrics = METRIC_DEFINITIONS.filter(d => d.type === 'percentage' && (!d.version || d.version === version));
        const instabilityScores = instabilityMetrics.map(d => individual[d.name].performanceScore);
        const instabilityAverage = instabilityScores.reduce((a, b) => a + b, 0) / instabilityScores.length;

        return {
            performanceAverage: perfAverage,
            throughputAverage,
            instabilityAverage: 10 - instabilityAverage, // The UI expects 0 to be "stable" and 10 to be "unstable" for the group header? 
            // Wait, instability_average in YourPerformance.svelte was (10 - stability_avg).
            // instability_stability_scores are performance scores (10 is best).
            // So if stability_avg is 10 (perfect), instability is 0. Correct.
            individual
        };
    }
}
