/**
 * Compute performance data
 */

// data constants for 2019
const mean = 4.251338;
const stddev = 1.000992;

const indicators = [
  'leadtime',
  'deployfreq',
  'ttr',
  'chgfail'
];

const profileStats = {
  'low': 3.5,
  'medium': 4.4,
  'high': 5.2,
  'elite': 6
};

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

// general helper functions
String.prototype.capitalize = function () {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

// analysis helper functions
// algorithm from Handbook of Mathematical Functions (Abramowitz & Stegun),
// formula 7.1.26
function normDist(x, mean, standardDeviation) {
  const a1 = 0.254829592;
  const a2 = -0.284496736;
  const a3 = 1.421413741;
  const a4 = -1.453152027;
  const a5 = 1.061405429;
  const p = 0.3275911;

  let val = (mean - x) / (Math.sqrt(2) * standardDeviation);
  let sign = (val < 0) ? -1 : 1;
  var xabs = Math.abs(val);
  var t = 1.0 / (1.0 + xabs * p);
  var y = 1.0 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-xabs * xabs);
  var erf = sign * y;
  return (1 - erf) / 2;
}

function clamp(value, max) {
  return Math.max(Math.min(value, max), 1);
}

function scalePerf(value) {
  return 20 * (value - 1);
}

// user data analysis functions
function getUserPerformanceIndicators(urlParams) {

  let userPerformanceIndicators = {};

  indicators.forEach(indicator => {
    userPerformanceIndicators[indicator] = urlParams.get(indicator);
  });

  return userPerformanceIndicators;
}

function getProfileAndPercentile(userPerformanceIndicators) {

  let average = 0;
  for (let indicator of indicators) {
    
    indicator_value = userPerformanceIndicators[indicator];

    let unnormalized = clamp(parseInt(indicator_value), 6);
    average += unnormalized;
  }
  average = average / indicators.length;

  let profile = '';
  for (let my_profile of Object.keys(profileStats)) {
    if (average <= profileStats[my_profile]) {
      profile = my_profile;
      break;
    }
  }

  let percentile = Math.round(100 * normDist(average, mean, stddev));
  
  return {
    profile: profile,
    percentile: percentile
  }

}

function decoratePagewithProfileAndPercentage(userProfileAndPercentile) {
    Array.from(document.getElementsByClassName('profile-title')).forEach(element => {
        element.innerText = userProfileAndPercentile.profile;
    })
    Array.from(document.getElementsByClassName('color-by-profile')).forEach(element => {
        element.classList.add(userProfileAndPercentile.profile);
    })
    document.getElementById('percentile').innerText = userProfileAndPercentile.percentile;
}

// invoke calculations when page is ready
window.addEventListener('load',function(event){

  // TODO: test for presence of all URL Params and fail gracefully if any are missing.
  const urlParams = new URLSearchParams(window.location.search);
  
  let industry = urlParams.get('industry');

  let userPerformanceIndicators = getUserPerformanceIndicators(urlParams);
  let userProfileAndPercentile = getProfileAndPercentile(userPerformanceIndicators);
  
  decoratePagewithProfileAndPercentage(userProfileAndPercentile);
  
  let industryBaselines = baselines[industry];
  console.debug(industryBaselines);

  for (let indicator of indicators) {
    let userScore = userPerformanceIndicators[indicator];
    let globalAverage = baselines['all'][indicator]/100 * 6;
    let industryAverage = baselines[industry][indicator]/100 * 6;

  }

});