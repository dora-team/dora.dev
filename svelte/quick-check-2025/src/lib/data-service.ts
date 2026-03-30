import industry_2024 from "./data/editions/2024/industry_metrics.json";
import org_2024 from "./data/editions/2024/organization_size_metrics.json";
import industry_2025 from "./data/editions/2025/industry_metrics.json";
import org_2025 from "./data/editions/2025/organization_size_metrics.json";

export interface MetricBenchmark {
    mean: number;
    std: number;
}

export interface IndustryMetrics {
    name: string;
    performance_average: MetricBenchmark;
    leadtime: MetricBenchmark;
    deployfreq: MetricBenchmark;
    changefailure: MetricBenchmark;
    failurerecovery: MetricBenchmark;
    rework?: MetricBenchmark;
}

export interface BenchmarkData {
    [key: string]: IndustryMetrics;
}

export class DataService {
    private static editions: Record<string, { industry: BenchmarkData, org: BenchmarkData }> = {
        "2024": { industry: industry_2024 as BenchmarkData, org: org_2024 as BenchmarkData },
        "2025": { industry: industry_2025 as BenchmarkData, org: org_2025 as BenchmarkData }
    };

    static async getIndustryMetrics(version: string = '2025'): Promise<BenchmarkData> {
        return this.editions[version]?.industry || this.editions["2025"].industry;
    }

    static async getOrgSizeMetrics(version: string = '2025'): Promise<BenchmarkData> {
        return this.editions[version]?.org || this.editions["2025"].org;
    }

    static calculateRecodedMetric(value: number, type: 'categorical' | 'percentage'): number {
        const val = parseFloat(value as any);
        if (isNaN(val) || val === -1) return 0;

        if (type === 'categorical') {
            // 1 to 6 recoded to 0 to 10
            return ((val - 1) / (6 - 1)) * 10;
        } else {
            // 0 to 100 recoded to 10 to 0 (higher is worse)
            return (100 - val) / 10;
        }
    }

    static calculatePerformanceAverage(metrics: Record<string, number>, version: string): number {
        const recoded: number[] = [
            this.calculateRecodedMetric(metrics.leadtime, 'categorical'),
            this.calculateRecodedMetric(metrics.deployfreq, 'categorical'),
            this.calculateRecodedMetric(metrics.failurerecovery, 'categorical'),
            this.calculateRecodedMetric(metrics.changefailure, 'percentage'),
        ];
        if (version === '2025' && metrics.rework !== undefined && metrics.rework !== -1) {
            recoded.push(this.calculateRecodedMetric(metrics.rework, 'percentage'));
        }
        
        return recoded.reduce((a, b) => a + b, 0) / recoded.length;
    }
}
