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

const colors = {
    'low': '#D93025',
    'medium': '#FBBC04',
    'high': '#34A853',
    'elite': '#0D652D',
    'you': '#0F346F',
    'average': '#5F6368',
    'bar': '#0F346F'
}

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

const icons = {
    'you': `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2c-4.97 0-9 4.03-9 9 0 4.17 2.84 7.67 6.69 8.69L12 22l2.31-2.31C18.16 18.67 21 15.17 21 11c0-4.97-4.03-9-9-9zm0 2c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.3c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/></svg>`,
    'average': `<svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24" viewBox="0 0 24 24" width="24"><rect fill="none" height="24" width="24"/><g><path fill="currentColor" d="M12,12.75c1.63,0,3.07,0.39,4.24,0.9c1.08,0.48,1.76,1.56,1.76,2.73L18,18H6l0-1.61c0-1.18,0.68-2.26,1.76-2.73 C8.93,13.14,10.37,12.75,12,12.75z M4,13c1.1,0,2-0.9,2-2c0-1.1-0.9-2-2-2s-2,0.9-2,2C2,12.1,2.9,13,4,13z M5.13,14.1 C4.76,14.04,4.39,14,4,14c-0.99,0-1.93,0.21-2.78,0.58C0.48,14.9,0,15.62,0,16.43V18l4.5,0v-1.61C4.5,15.56,4.73,14.78,5.13,14.1z M20,13c1.1,0,2-0.9,2-2c0-1.1-0.9-2-2-2s-2,0.9-2,2C18,12.1,18.9,13,20,13z M24,16.43c0-0.81-0.48-1.53-1.22-1.85 C21.93,14.21,20.99,14,20,14c-0.39,0-0.76,0.04-1.13,0.1c0.4,0.68,0.63,1.46,0.63,2.29V18l4.5,0V16.43z M12,6c1.66,0,3,1.34,3,3 c0,1.66-1.34,3-3,3s-3-1.34-3-3C9,7.34,10.34,6,12,6z"/></g></svg>`
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

function renderPerformanceGraph(percentile) {

    let yourPerformance = percentile / 100;

    let labels = ['Profile'];
    let values = [''];
    let buffervalues = [''];
    let prev = 0;
    for (let variable of Object.keys(profileStats)) {
      labels.push(variable.capitalize());
      let percentile = variable == 'elite' ?
          1 :
          normDist(profileStats[variable], mean, stddev);
      values.push(percentile - prev);
      buffervalues.push(null);
      prev = percentile;
    }
    labels.push('Your Performance');
    values.push(yourPerformance);
    buffervalues.push(yourPerformance);
    let dataTable = google.visualization.arrayToDataTable(
    [labels, buffervalues, values, buffervalues]);
    var options = {
      isStacked: true,
      bars: 'horizontal',
      bar: { groupWidth: '100%' },
      height: 120,
      chartArea: { top: 0, left: 20, right: 20, height: 60 },
      enableInteractivity: false,
      series: {
        0: { color: colors['low'] },
        1: { color: colors['medium'] },
        2: { color: colors['high'] },
        3: { color: colors['elite'] },
        4: { type: 'line', color: colors['you'], lineWidth: 4 }
      },
      hAxis: {
        minValue: 0,
        maxValue: 1,
        ticks: [0, .25, .5, .75, 1],
        format: 'percent'
      },
      legend: { position: 'bottom' }
    };

    function addOverlayMarker(parentElement, xPos, iconName, color) {
        const overlayHtml = `<div class="overlay-marker">${icons[iconName]}</div>`;
        parentElement.insertAdjacentHTML('beforeend',overlayHtml)
        var overlay = parentElement.lastChild;
        overlay.style.left = `${xPos-11}px`;
        overlay.style.color = color;
        overlay.style.visibility = 'visible';
      }

    function placeMarker(dataTable) {
        var cli = this.getChartLayoutInterface();
        var parent = document.getElementById('performance-graph');
        addOverlayMarker(parent, Math.floor(cli.getXLocation(dataTable.getValue(1, 5))), 'you', colors['you']);
      };
  
      let chart = new google.visualization.BarChart(
      document.getElementById('performance-graph'));
      google.visualization.events.addListener(
      chart,
      'ready',
      placeMarker.bind(chart, dataTable)
      );
      chart.draw(dataTable, options);

}

function drawCharts() {
    
    // TODO: test for presence of all URL Params and fail gracefully if any are missing.
    const urlParams = new URLSearchParams(window.location.search);

    // COMPUTE USER SCORES
  let industry = urlParams.get('industry');
  let userPerformanceIndicators = getUserPerformanceIndicators(urlParams);
  let userProfileAndPercentile = getProfileAndPercentile(userPerformanceIndicators);
  
  // UPDATE PAGE WITH USER SCORES
  decoratePagewithProfileAndPercentage(userProfileAndPercentile);
  
  // DRAW CHARTS
  renderPerformanceGraph(userProfileAndPercentile.percentile);

  let industryBaselines = baselines[industry];
  console.debug(industryBaselines);

  for (let indicator of indicators) {
    let userScore = userPerformanceIndicators[indicator];
    let globalAverage = baselines['all'][indicator]/100 * 6;
    let industryAverage = baselines[industry][indicator]/100 * 6;

  }

}

// invoke calculations and decorate page
(function() {

    google.charts.load('current', {
        packages: ['corechart', 'bar'] 
    });

    google.charts.setOnLoadCallback(drawCharts);


}());
