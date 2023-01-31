// data constants for 2022
const mean = 3.8187;
const stddev = 1.0642;

const baselines = {
    'all': { 'leadtime': 3.24, 'deployfreq': 3.3, 'ttr': 4.21, 'chgfail': 4.53},
    'education': { 'leadtime': 3.14, 'deployfreq': 3.05, 'ttr': 4.21, 'chgfail': 4.75},
    'energy': { 'leadtime': 3.24, 'deployfreq': 3.29, 'ttr': 4.19, 'chgfail': 4.65},
    'finance': { 'leadtime': 3.38, 'deployfreq': 3.49, 'ttr': 4.6, 'chgfail': 4.95},
    'government': { 'leadtime': 3.22, 'deployfreq': 3.09, 'ttr': 4.26, 'chgfail': 5.23},
    'healthcare': { 'leadtime': 3.15, 'deployfreq': 3.22, 'ttr': 4.19, 'chgfail': 4.55},
    'industrials': { 'leadtime': 3, 'deployfreq': 3.1, 'ttr': 4.12, 'chgfail': 4.53},
    'insurance': { 'leadtime': 3.08, 'deployfreq': 2.79, 'ttr': 3.71, 'chgfail': 3.97},
    'media': { 'leadtime': 3.18, 'deployfreq': 3.64, 'ttr': 3.82, 'chgfail': 4.56},
    'nonprofit': { 'leadtime': 3.13, 'deployfreq': 3.23, 'ttr': 3.3, 'chgfail': 4.22},
    'other': { 'leadtime': 3.46, 'deployfreq': 3.61, 'ttr': 4.53, 'chgfail': 5.08},
    'retail': { 'leadtime': 3.48, 'deployfreq': 3.62, 'ttr': 4.74, 'chgfail': 4.86},
    'technology': { 'leadtime': 3.22, 'deployfreq': 3.25, 'ttr': 4.09, 'chgfail': 4.29},
    'telecoms': { 'leadtime': 2.9, 'deployfreq': 2.94, 'ttr': 4.02, 'chgfail': 4.34}
}