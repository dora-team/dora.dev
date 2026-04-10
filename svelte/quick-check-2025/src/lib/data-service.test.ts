import { describe, it, expect } from 'vitest';
import { DataService } from './data-service';

describe('DataService', () => {
    it('should calculate categorical performance scores correctly', () => {
        expect(DataService.calculatePerformanceScore(1, 'categorical')).toBe(0);
        expect(DataService.calculatePerformanceScore(6, 'categorical')).toBe(10);
        expect(DataService.calculatePerformanceScore(3.5, 'categorical')).toBe(5);
    });

    it('should calculate percentage performance scores correctly (0 is 10, 100 is 0)', () => {
        expect(DataService.calculatePerformanceScore(0, 'percentage')).toBe(10);
        expect(DataService.calculatePerformanceScore(100, 'percentage')).toBe(0);
        expect(DataService.calculatePerformanceScore(50, 'percentage')).toBe(5);
    });

    it('should calculate categorical display scores correctly', () => {
        expect(DataService.calculateDisplayScore(1, 'categorical')).toBe(0);
        expect(DataService.calculateDisplayScore(6, 'categorical')).toBe(10);
    });

    it('should calculate percentage display scores correctly (0 is 10, 100 is 0)', () => {
        expect(DataService.calculateDisplayScore(0, 'percentage')).toBe(10);
        expect(DataService.calculateDisplayScore(100, 'percentage')).toBe(0);
    });

    it('should load 2024 industry metrics', () => {
        const data = DataService.getIndustryMetrics('2024');
        expect(data.all.name).toBe('All industries');
        expect(data.all.rework).toBeUndefined();
    });

    it('should load 2025 industry metrics and transform them correctly', () => {
        const data = DataService.getIndustryMetrics('2025');
        expect(data.all.name).toBe('All industries');
        expect(data.all.rework).toBeDefined();
        
        // Raw CFR was 1.9, should be 8.1 now
        expect(data.all.changefailure.mean).toBeCloseTo(8.1);
        
        // Raw Rework was 2.2, should be 7.8 now
        expect(data.all.rework!.mean).toBeCloseTo(7.8);
        
        // Instability was 2.1, should be Stability 7.9
        expect(data.all.software_delivery_stability).toBeDefined();
        expect(data.all.software_delivery_stability!.mean).toBeCloseTo(7.9);
        
        // Recalculated performance average should be (5.5 + 4.8 + 7.4 + 8.1 + 7.8) / 5 = 6.72
        expect(data.all.performance_average!.mean).toBeCloseTo(6.72);
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

    it('should calculateAll correctly', () => {
        const metrics = {
            leadtime: 6,
            deployfreq: 6,
            failurerecovery: 6,
            changefailure: 0,
            rework: 0,
        };
        const results = DataService.calculateAll(metrics, '2025');
        expect(results.performanceAverage).toBe(10);
        expect(results.throughputAverage).toBe(10);
        expect(results.stabilityAverage).toBe(10);
        expect(results.individual.leadtime.displayScore).toBe(10);
        expect(results.individual.changefailure.displayScore).toBe(10);
    });
});
