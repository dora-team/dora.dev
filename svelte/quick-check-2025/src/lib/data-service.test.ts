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

    it('should calculate percentage display scores correctly (0 is 0, 100 is 10)', () => {
        expect(DataService.calculateDisplayScore(0, 'percentage')).toBe(0);
        expect(DataService.calculateDisplayScore(100, 'percentage')).toBe(10);
    });

    it('should load 2024 industry metrics', () => {
        const data = DataService.getIndustryMetrics('2024');
        expect(data.all.name).toBe('All industries');
        expect(data.all.rework).toBeUndefined();
    });

    it('should load 2025 industry metrics', () => {
        const data = DataService.getIndustryMetrics('2025');
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
        expect(results.instabilityAverage).toBe(0);
        expect(results.individual.leadtime.displayScore).toBe(10);
        expect(results.individual.changefailure.displayScore).toBe(0);
    });
});
