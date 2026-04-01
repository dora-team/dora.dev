import { describe, it, expect } from 'vitest';
import { DataService } from './data-service';

describe('DataService', () => {
    it('should calculate categorical recoding correctly', () => {
        expect(DataService.calculateRecodedMetric(1, 'categorical')).toBe(0);
        expect(DataService.calculateRecodedMetric(6, 'categorical')).toBe(10);
        expect(DataService.calculateRecodedMetric(3.5, 'categorical')).toBe(5);
    });

    it('should calculate percentage recoding correctly', () => {
        expect(DataService.calculateRecodedMetric(0, 'percentage')).toBe(10);
        expect(DataService.calculateRecodedMetric(100, 'percentage')).toBe(0);
        expect(DataService.calculateRecodedMetric(50, 'percentage')).toBe(5);
    });

    it('should load 2024 industry metrics', async () => {
        const data = await DataService.getIndustryMetrics('2024');
        expect(data.all.name).toBe('All industries');
        expect(data.all.rework).toBeUndefined();
    });

    it('should load 2025 industry metrics', async () => {
        const data = await DataService.getIndustryMetrics('2025');
        expect(data.all.name).toBe('All industries');
        expect(data.all.rework).toBeDefined();
        expect(typeof data.all.rework!.mean).toBe('number');
    });

    it('should calculate performance average for 2024 (4 metrics)', () => {
        const metrics = {
            leadtime: 6, // 10
            deployfreq: 6, // 10
            failurerecovery: 6, // 10
            changefailure: 0, // 10
        };
        const avg = DataService.calculatePerformanceAverage(metrics, '2024');
        expect(avg).toBe(10);
    });

    it('should calculate performance average for 2025 (5 metrics)', () => {
        const metrics = {
            leadtime: 6, // 10
            deployfreq: 6, // 10
            failurerecovery: 6, // 10
            changefailure: 0, // 10
            rework: 0, // 10
        };
        const avg = DataService.calculatePerformanceAverage(metrics, '2025');
        expect(avg).toBe(10);
    });
});
