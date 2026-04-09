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
    software_delivery_stability?: MetricBenchmark;
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

    private static transformMetrics(data: BenchmarkData, version: string): BenchmarkData {
        const transformed: BenchmarkData = {};
        
        for (const [key, entry] of Object.entries(data)) {
            const newEntry = JSON.parse(JSON.stringify(entry)); // Deep clone
            
            // 1. Invert percentage-based metrics (Change Fail Rate and Rework Rate)
            if (newEntry.changefailure) {
                newEntry.changefailure.mean = 10 - newEntry.changefailure.mean;
            }
            if (newEntry.rework) {
                newEntry.rework.mean = 10 - newEntry.rework.mean;
            }

            // 2. Transform "Software delivery instability" to "Software delivery stability"
            // The JSON contains "software_delivery_instability"
            const instability = (newEntry as any).software_delivery_instability;
            if (instability) {
                newEntry.software_delivery_stability = {
                    mean: 10 - instability.mean,
                    std: instability.std
                };
                delete (newEntry as any).software_delivery_instability;
            }

            // 3. Recalculate performance_average based on the now-consistent "High is best" metrics
            const metricsToAverage = ['leadtime', 'deployfreq', 'failurerecovery', 'changefailure'];
            if (version === '2025') {
                metricsToAverage.push('rework');
            }

            const sum = metricsToAverage.reduce((acc, m) => {
                return acc + (newEntry[m] ? newEntry[m].mean : 0);
            }, 0);
            const count = metricsToAverage.filter(m => newEntry[m]).length;
            
            if (count > 0 && newEntry.performance_average) {
                newEntry.performance_average.mean = sum / count;
            }

            transformed[key] = newEntry;
        }
        
        return transformed;
    }

    static getIndustryMetrics(version: string = '2025'): BenchmarkData {
        const rawData = this.editions[version]?.industry || this.editions['2025'].industry;
        return this.transformMetrics(rawData, version);
    }

    static getOrgSizeMetrics(version: string = '2025'): BenchmarkData {
        const rawData = this.editions[version]?.org || this.editions['2025'].org;
        return this.transformMetrics(rawData, version);
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
     * 10 is always best for all metrics.
     */
    static calculateDisplayScore(value: number | string, type: 'categorical' | 'percentage'): number {
        if (type === 'categorical') {
            // 1 (left/worst) to 6 (right/best) -> 0 to 10. (Right is best)
            return recode_numeric_range(value, 1, 6, 0, 10);
        } else {
            // 0% (right/best) to 100% (left/worst) -> 10 to 0. (Right is best)
            return recode_numeric_range(value, 0, 100, 10, 0);
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

        const stabilityMetrics = METRIC_DEFINITIONS.filter(d => d.type === 'percentage' && (!d.version || d.version === version));
        const stabilityScores = stabilityMetrics.map(d => individual[d.name].performanceScore);
        const stabilityAverage = stabilityScores.reduce((a, b) => a + b, 0) / stabilityScores.length;

        return {
            performanceAverage: perfAverage,
            throughputAverage,
            stabilityAverage, 
            individual
        };
    }
}
