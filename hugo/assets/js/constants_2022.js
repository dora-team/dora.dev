// TODO!!!! These aren't actually 2022 numbers; they're still 2019

// data constants for 2019
const mean = 4.251338;
const stddev = 1.000992;

const baselines = {
  'all': { 'leadtime': 50, 'deployfreq': 49, 'ttr': 78, 'chgfail': 88 },
  'education': { 'leadtime': 52, 'deployfreq': 49, 'ttr': 73, 'chgfail': 96 },
  'energy': { 'leadtime': 40, 'deployfreq': 35, 'ttr': 73, 'chgfail': 81 },
  'finance': { 'leadtime': 46, 'deployfreq': 44, 'ttr': 78, 'chgfail': 84 },
  'government': { 'leadtime': 38, 'deployfreq': 36, 'ttr': 70, 'chgfail': 88 },
  'healthcare': { 'leadtime': 41, 'deployfreq': 42, 'ttr': 68, 'chgfail': 82 },
  'industrials': { 'leadtime': 40, 'deployfreq': 39, 'ttr': 79, 'chgfail': 91 },
  'insurance': { 'leadtime': 49, 'deployfreq': 51, 'ttr': 80, 'chgfail': 91 },
  'media': { 'leadtime': 58, 'deployfreq': 65, 'ttr': 85, 'chgfail': 85 },
  'nonprofit': { 'leadtime': 67, 'deployfreq': 73, 'ttr': 93, 'chgfail': 98 },
  'retail': { 'leadtime': 59, 'deployfreq': 67, 'ttr': 87, 'chgfail': 89 },
  'technology': { 'leadtime': 51, 'deployfreq': 51, 'ttr': 78, 'chgfail': 90 },
  'telecoms': { 'leadtime': 44, 'deployfreq': 43, 'ttr': 79, 'chgfail': 81 },
  'other': { 'leadtime': 51, 'deployfreq': 48, 'ttr': 80, 'chgfail': 89 }
}