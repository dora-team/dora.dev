/**
 * Compute performance data
 */

// constants are included from `constants.js` via Hugo pipelines
// helpers are included from `helpers.js` via Hugo pipelines

// user data analysis functions
function getUserPerformanceIndicators(urlParams) {

  let userPerformanceIndicators = {};

  Object.keys(indicators).forEach(indicator => {
    userPerformanceIndicators[indicator] = urlParams.get(indicator);
  });

  return userPerformanceIndicators;
}

function getProfileAndPercentile(constants, userPerformanceIndicators) {

  let average = 0;

  Object.keys(indicators).forEach(indicator => {
    
    indicator_value = userPerformanceIndicators[indicator];

    let unnormalized = clamp(parseInt(indicator_value), 6);
    average += unnormalized;

  })

  average = average / Object.keys(indicators).length;

  let percentile = Math.round(100 * normDist(average, constants.mean, constants.stddev));

  // TODO: #42 this doesn't have to be a struct since it's returning a single value
  return {
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

    let spectrum_width = 570;

    let marker_position = userProfileAndPercentile.percentile * spectrum_width / 100 + 15;
    document.getElementById('your-performance').style.left = marker_position + 'px' ;

    let percentile_rounded = Math.round(userProfileAndPercentile.percentile/10) * 10;
    if (percentile_rounded == 0) { percentile_rounded = 10 };
    document.getElementById('percentile-banner').classList.add('percentile_' + percentile_rounded);
    document.getElementById('percentile-banner').innerText=userProfileAndPercentile.percentile;

}

function drawComparisonChart(constants, indicator, user_score, industry, show_legend) {

    let baselines = constants.baselines;

    industry_baseline = baselines[industry];
    user_score = scalePerf(user_score);

    let dataTable = new google.visualization.DataTable();
    dataTable.addColumn('string', 'Aspect of Software Delivery Performance');
    dataTable.addColumn('number', 'Your performance');
    var pluralIndustry = industry=='all' ? 'ies' : 'y';
    var industryString = `${industry} industr${pluralIndustry} performance`.capitalize()
    dataTable.addColumn('number', industryString);
    dataTable.addRows([[indicators[indicator].label, user_score, scalePerf(industry_baseline[indicator])]]);

    var options = {
      bars: 'horizontal',
      bar: { groupWidth: '30%' },
      height: show_legend ? 120 : 70,
      width: screen.width <= 480 ? 350 : '',
      chartArea: { top: 0, left: 120, right: 20, height: 40 },
      enableInteractivity: false,
      series: {
        0: { color: '#0F346F' },
        1: { type: 'line', color: '#afb2b6', lineWidth: 0, pointSize: 12, pointShape: 'diamond'}
      },
        hAxis: { minValue: 1, 
            maxValue: 6, 
            ticks: indicators[indicator]['ticks'] 
            },
        legend: { position: show_legend ? 'bottom' : 'off' }
    };
        
    let target_div = (industry == 'all') ? 'all' : 'industry';
    let chart = new google.visualization.BarChart(document.getElementById('perf-' + target_div + '-' + indicator));
    
    // move the "you" icons into place
    icon_id = 'perf-' + target_div + '-' + indicator + '-marker';
    google.visualization.events.addListener(
        chart,
        'ready',
        function() {
            var cli = chart.getChartLayoutInterface();
            yourXpos = cli.getXLocation(dataTable.getValue(0, 1));
            document.getElementById(icon_id).style.left = yourXpos-12 + 'px';
        }
    );
    
    chart.draw(dataTable, options);

}

  function getRadioValue(name) {
    var elements = document.getElementsByName(name);
    for (var i = 0; i < elements.length; i++) {
      if (elements[i].checked) {
        return parseInt(elements[i].value);
      }
    }
  }

  function viewPerformance() {
    for (let key of Object.keys(capabilityQuestions)) {
      capability = key.substr(0, key.indexOf('-'));
      capabilityAnswers[capability].push(getRadioValue(key));
    }
    let average = (array) => array.reduce((a, b) => a + b) / array.length;
    let queryString = "";
    for (var i = 0; i < capabilitiesSelected.length; i++) {
      capability = capabilitiesSelected[i];
      queryString += "&" + capability + "=" + average(capabilityAnswers[capability]).toFixed(2);
    }

    let newURL = window.location.search + queryString;
    window.location.replace(newURL);
    
  }

  function renderCapabilityGraph(capability, data, capability_index, focus, profile) {
    let element = `cap-graph-${capability_index}`;
    const urlParams = new URLSearchParams(window.location.search);
    let dataTable = new google.visualization.DataTable();
    let value = parseFloat(urlParams.get(capability)) / 4.0;
    let mean = data["mean"] / 100;
    let profileMean = data["profile-mean"] / 100;
    let backgroundColor = focus ? '#E8F0FE' : 'white';
    dataTable.addColumn('string', 'Capability');
    dataTable.addColumn('number', 'Your performance');
    dataTable.addColumn('number', 'Average (all industries)');
    dataTable.addColumn('number', `${profile} performer avg.`.capitalize());
    dataTable.addRows([[data["title"], value, mean, profileMean]]);
    var options = {
      bars: 'horizontal',
      bar: { groupWidth: '40%' },
      height: 120,
      chartArea: { top: 0, left: 0, right: 20, height: 40 },
      enableInteractivity: false,
      series: {
        0: { color: colors['bar'] },
        1: { type: 'line', color: colors['average'], lineWidth: 0, pointSize: 8, pointShape: 'diamond' },
        2: { type: 'line', color: colors[profile], lineWidth: 0, pointSize: 8, pointShape: 'circle' }
      },
      hAxis: {
        minValue: 0,
        maxValue: 1,
        ticks: [0, .25, .5, .75, 1],
        format: 'percent'
      },
      vAxis: {
        textPosition: 'none'
      },
      legend: { position: 'bottom' },
      backgroundColor: backgroundColor
    };

      let chart = new google.visualization.BarChart(document.getElementById(element));
          // move the "you" icon into place
        google.visualization.events.addListener(
            chart,
            'ready',
            function() {
                var cli = chart.getChartLayoutInterface();
                yourXpos = cli.getXLocation(dataTable.getValue(0, 1));
                document.getElementById(`capability-marker-${capability_index}`).style.left = yourXpos-12 + 'px';
            }
        );
      chart.draw(dataTable, options);
}


// compute metrics and render display
(function() {

    // load the constants (research outputs) for this year
    let thisyear = document.querySelector('#results-year').value;
    let constants_thisyear = constants[thisyear];

    // load charting library
    google.charts.load('current', {
        packages: ['corechart', 'bar'] 
    });

    // TODO: #38 test for presence of all URL Params and fail gracefully if any are missing.
    const urlParams = new URLSearchParams(window.location.search);

    // COMPUTE USER SCORES
    let industry = urlParams.get('industry');
    let userPerformanceIndicators = getUserPerformanceIndicators(urlParams);
    let userProfileAndPercentile = getProfileAndPercentile(constants_thisyear, userPerformanceIndicators);

    // UPDATE PAGE BASED ON USER PROFILE
    decoratePagewithProfileAndPercentage(userProfileAndPercentile);

    let industryBaselines = constants_thisyear.baselines[industry];

    document.getElementById('results').addEventListener('click', function(e) {
        e.preventDefault();
        viewPerformance();
        populateRecommendations(userProfileAndPercentile.profile, userPerformanceIndicators);
    })

    // When charting library is loaded, render charts
    google.charts.setOnLoadCallback(function() {
        
        
        // for each indicator, draw comparison chart
        Object.keys(indicators).forEach((indicator, index, arr) => {
            
            // draw 'all industries'
            drawComparisonChart(
                constants_thisyear,
                indicator,
                userPerformanceIndicators[indicator],
                'all',
                arr[index + 1] ? false : true // show legend on last graph
            );

            // draw 'your industry'
            drawComparisonChart(
                constants_thisyear,
                indicator,
                userPerformanceIndicators[indicator],
                industry,
                arr[index + 1] ? false : true // show legend on last graph
            );
        });

        // hide hidden divs until clicked
        document.getElementById('perf-industry').style.display='none';

        // hide other tabs until clicked
        let things_to_hide = ["c_compare"]
        things_to_hide.forEach((tab) => {
            document.getElementById(tab).style.display='none';
        })

    })  

}());

window.addEventListener('DOMContentLoaded', () => {

    // prioritization exercise
    let step_width = document.querySelector('.prioritize_step').getBoundingClientRect().width;
    console.log(step_width);

    function showPrioritizationStep(step) {
        
        console.log('step: ' + step);

        document.querySelector('.prioritize_contents').style.left = 0 - (step_width * step) + 'px';

        let selectedStepHeight = document.querySelector('#prioritize_' + step).getBoundingClientRect().height;

        document.querySelector('.prioritize_container').style.height = selectedStepHeight + 'px';

        if(step > 4) {
            console.log('error: prioritization step out of bounds');
            return;
        }

        let prioritizeButton = document.querySelector('#prioritize_button');

        if(0 < step < 4) {
            

            prioritizeButton.innerText='Next';
            
            // remove description of exercise
            document.querySelector('.button_description').style.display = (step == 0)? 'block' : 'none';

            // set button to advance to next step
            prioritizeButton.dataset.target_step = parseInt(step) + 1;

            // disable button until fields are completed
            // prioritizeButton.disabled = 'true';

        } 
        
        if (step == 4) {
            prioritizeButton.style.display='none';
        }

    }

    document.querySelector("#prioritize_button").addEventListener("click", function(event){
        let target_step = event.target.dataset.target_step;
        showPrioritizationStep(target_step);
    });

    showPrioritizationStep(0);

});