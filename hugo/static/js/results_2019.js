/**
 * Compute performance data
 */

// data constants for 2019
const mean = 4.251338;
const stddev = 1.000992;

const indicators = {
    'leadtime': {
      'label': 'Lead time',
      'ticks': [
        { v: 0, f: '>6m' }, { v: 20, f: '1-6m' }, { v: 40, f: '1w - 1m' },
        { v: 60, f: '1d - 1w' }, { v: 80, f: '<1d' }, { v: 100, f: '<1h' }
      ]
    },
    'deployfreq': {
      'label': 'Deploy frequency',
      'ticks': [
        { v: 0, f: '>6m' }, { v: 20, f: '1-6m' }, { v: 40, f: '1w - 1m' },
        { v: 60, f: '1d - 1w' }, { v: 80, f: '<1d' }, { v: 100, f: 'on demand' }
      ]
    },
    'ttr': {
      'label': 'Time to restore',
      'ticks': [
        { v: 0, f: '>6m' }, { v: 20, f: '1-6m' }, { v: 40, f: '1w - 1m' },
        { v: 60, f: '1d - 1w' }, { v: 80, f: '<1d' }, { v: 100, f: '<1h' }
      ]
    },
    'chgfail': {
      'label': 'Change fail rate',
      'ticks': [
        { v: 0, f: '76-100%' }, { v: 20, f: '61-75%' }, { v: 40, f: '46-60%' },
        { v: 60, f: '31-45%' }, { v: 80, f: '16-30%' }, { v: 100, f: '0-15%' }
      ]
    }
  };

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

  Object.keys(indicators).forEach(indicator => {
    userPerformanceIndicators[indicator] = urlParams.get(indicator);
  });

  return userPerformanceIndicators;
}

function getProfileAndPercentile(userPerformanceIndicators) {

  let average = 0;

  Object.keys(indicators).forEach(indicator => {
    
    indicator_value = userPerformanceIndicators[indicator];

    let unnormalized = clamp(parseInt(indicator_value), 6);
    average += unnormalized;

  })

  average = average / Object.keys(indicators).length;

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
        element.innerText = element.innerText.toLowerCase().replace('unknown',userProfileAndPercentile.profile);
    })
    Array.from(document.getElementsByClassName('color-by-profile')).forEach(element => {
        element.classList.add(userProfileAndPercentile.profile);
    })
    document.getElementById('percentile').innerText = userProfileAndPercentile.percentile;
   }


function drawUserPerformanceChart(percentile) {

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
    let dataTable = google.visualization.arrayToDataTable([labels, buffervalues, values, buffervalues]);
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
  
    let chart = new google.visualization.BarChart(document.getElementById('performance-graph'));
    
    // move the "you" icon into place
    google.visualization.events.addListener(
        chart,
        'ready',
        function() {
            var cli = chart.getChartLayoutInterface();
            yourXpos = cli.getXLocation(dataTable.getValue(1, 5));
            document.getElementById('yourPerformanceMarker').style.left = yourXpos-12 + 'px';
        }
    );

    chart.draw(dataTable, options);

}

function drawComparisonChart(indicator, user_score, industry, show_legend) {

    industry_baseline = baselines[industry];
    user_score = scalePerf(user_score);

    let dataTable = new google.visualization.DataTable();
    dataTable.addColumn('string', 'Aspect of Software Delivery Performance');
    dataTable.addColumn('number', 'Your performance');
    var pluralIndustry = industry=='all' ? 'ies' : 'y';
    var industryString = `${industry} industr${pluralIndustry} performance`.capitalize()
    dataTable.addColumn('number', industryString);
    dataTable.addRows([[indicators[indicator].label, user_score, industry_baseline]]);
    
    var options = {
      bars: 'horizontal',
      bar: { groupWidth: '30%' },
      height: show_legend ? 120 : 70,
      chartArea: { top: 0, left: 120, right: 20, height: 40 },
      enableInteractivity: false,
      series: {
        0: { color: colors['bar'] },
        1: { type: 'line', color: colors['average'], lineWidth: 0, pointSize: 8, pointShape: 'diamond' }
      },
        hAxis: { minValue: 0, 
            maxValue: 100, 
            ticks: indicators[indicator]['ticks'] 
            },
        legend: { position: show_legend ? 'bottom' : 'off' }
    };

    // function placeMarkers(dataTable) {
    //   var cli = this.getChartLayoutInterface();
    //   var parent = document.getElementById(element + indicator);
    //   addOverlayMarker(parent, Math.floor(cli.getXLocation(dataTable.getValue(0, 1))), 'you', colors['bar']);
    // };

    let target_div = (industry == 'all') ? 'all' : 'industry';
    let chart = new google.visualization.BarChart(document.getElementById('perf-' + target_div + '-' + indicator));
    chart.draw(dataTable, options);

}

// compute metrics and render display
(function() {

    // load charting library
    google.charts.load('current', {
        packages: ['corechart', 'bar'] 
    });

    // TODO: test for presence of all URL Params and fail gracefully if any are missing.
    const urlParams = new URLSearchParams(window.location.search);

    // COMPUTE USER SCORES
    let industry = urlParams.get('industry');
    let userPerformanceIndicators = getUserPerformanceIndicators(urlParams);
    let userProfileAndPercentile = getProfileAndPercentile(userPerformanceIndicators);

    // UPDATE PAGE WITH USER SCORES
    decoratePagewithProfileAndPercentage(userProfileAndPercentile);

    let industryBaselines = baselines[industry];
    console.debug(industryBaselines);
    console.debug(userPerformanceIndicators);

    // When charting library is loaded, render charts
    google.charts.setOnLoadCallback(function() {
        
        drawUserPerformanceChart(userProfileAndPercentile.percentile);
        
        // for each indicator, draw comparison chart
        Object.keys(indicators).forEach((indicator, index, arr) => {
            
            // draw 'all industries'
            drawComparisonChart(
                indicator,
                userPerformanceIndicators[indicator],
                'all',
                arr[index + 1] ? false : true // show legend on last graph
            );

            // draw 'your industry'
            drawComparisonChart(
                indicator,
                userPerformanceIndicators[indicator],
                industry,
                arr[index + 1] ? false : true // show legend on last graph
            );
        });

        // hide 'your industry' until clicked
        document.getElementById('perf-industry').style.display='none';
    })  

}());
