/**
 * Compute performance data
 */

// constants are included from `constants_2019.js` via Hugo pipelines
// helpers are included from `helpers_2019.js` via Hugo pipelines

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

    // highlight performance comparison table
    Object.keys(indicators).forEach((indicator) => {
        document.getElementById(indicator + '-' + userProfileAndPercentile.profile).classList.add('highlight');
    });
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
    dataTable.addRows([[indicators[indicator].label, user_score, industry_baseline[indicator]]]);

    var options = {
      bars: 'horizontal',
      bar: { groupWidth: '30%' },
      height: show_legend ? 120 : 70,
      chartArea: { top: 0, left: 120, right: 20, height: 40 },
      enableInteractivity: false,
      series: {
        0: { color: colors['bar'] },
        1: { type: 'line', color: colors['average'], lineWidth: 0, pointSize: 12, pointShape: 'diamond'}
      },
        hAxis: { minValue: 0, 
            maxValue: 100, 
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

function populateKeyCapabilities(profile) {
    let selected_capabilities = allCapabilities[profile];
    
    Object.keys(selected_capabilities).forEach((capability, index, arr) => {
        document.getElementById('rec-link-' + index).href = selected_capabilities[capability].url;
        document.getElementById('rec-img-' + index).src = selected_capabilities[capability].img;
        document.getElementById('rec-name-' + index).innerText = selected_capabilities[capability].title.capitalize();
    });

}

// "HELP ME PRIORITIZE" modal
let capabilitiesSelected = []
let capabilityQuestions = {}
let capabilityAnswers = {}

const ranking = [
    "Strongly disagree",
    "Disagree",
    "Neither agree nor disagree",
    "Agree",
    "Strongly agree"
  ]

function updateStatus(e) {
    if (!e.target.name) {
      return;
    }
    capabilityQuestions[e.target.name] = true;
    let all_answered = true;
    for (let key of Object.keys(capabilityQuestions)) {
      if (!capabilityQuestions[key]) {
        all_answered = false;
      }
    }
    if (all_answered) {
      document.getElementById("modal-error").style.display = "none";
      document.getElementById("results").disabled = false;
    }
  }  

function createCapabilitiesTable(profile) {

    let capTable = document.getElementById('modal-content');
    
    // if table has already been built, don't rebuild
    if (document.getElementById('capabilities-table')) { return; };

    let capabilities = allCapabilities[profile];
    let questionId = 0;
    for (let key of Object.keys(capabilities)) {
      capability = capabilities[key];
      capabilitiesSelected.push(key);
      capabilityAnswers[key] = [];
      html = `<img src="${capability.img}" class="capability-img" />\n`;
      html += `<h4 class="h-c-eyebrow h-has-bottom-margin">Capability ${questionId + 1} of 3: ${capability.questions.length} questions</h4>\n`;
      html += `<h3 class="h-c-headline h-c-headline--three h-has-bottom-margin">${capability.title}</h3>\n`;
      html += `<p>${capability.description} <a href='${capability.url}' target='_blank'>Learn more</a></p>\n`;
      html += '<div class="ranking-align h-c-table__overflowcontainer">';
      html += '<table id="capabilities-table" class="h-c-table h-c-table--datatable h-c-table--datatable-altrows h-c-table--stacked"><thead><tr>';
      html += `<thead><tr>
  <th scope="col" style="width:40%" class="ranking-key">${capability.context}</th>
  <th scope="col" style="width:12%">${ranking[0]}</th>
  <th scope="col" style="width:12%">${ranking[1]}</th>
  <th scope="col" style="width:12%">${ranking[2]}</th>
  <th scope="col" style="width:12%">${ranking[3]}</th>
  <th scope="col" style="width:12%">${ranking[4]}</th>
</tr></thead><tbody>`;
      let index = 0;
      for (let question of capability.questions) {
        html += `<tr><td class='question'><p>${question}</p></td>`;
        questionKey = key.toString() + "-" + index.toString();
        for (let score = 0; score < 5; score++) {
          html += `<td><label for="${questionKey}_${score}"><input type="radio" name="${questionKey}" value="${score}" id="${questionKey}_${score}"/><span>${ranking[score]}</span></label></td>`;
        }
        capabilityQuestions[questionKey] = false;
        html += "</tr>";
        index++;
      }
      html += "</tbody></table></div>";
      capTable.insertAdjacentHTML('beforeend', html)
      questionId++;
    }
    for (let key of Object.keys(capabilityQuestions)) {
      for (let element of document.getElementsByName(key)) {
        element.addEventListener("change", updateStatus);
      }
    }
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

  function populateRecommendations(profile, userPerformanceIndicators) {
    let capabilities = allCapabilities[profile];
    let performance = [];
    for (let capability of Object.keys(capabilities)) {
    let difference = 25 * parseFloat(userPerformanceIndicators[capability]);
    performance.push([capability, difference]);
    }

    performance.sort(function (first, second) {
	if (first[1] != second[1]) {
          return first[1] - second[1];
	}
	return (first[1] - capabilities[first[0]]["profile-mean"]) - (second[1] - capabilities[second[0]]["profile-mean"]);
      });
      let recommendation = document.getElementById("capability");
      document.getElementById("caps_prioritized").style.display = "block";
      document.getElementById("caps_unprioritized").style.display = "none";
      for (let i = 0; i < 3; i++) {
        let capability = performance[i][0];
        let title = document.getElementById("cap-title-" + i);
        title.textContent = capabilities[capability].title;
        if (i == 0) {
          recommendation.textContent = capabilities[capability].title.toLowerCase();
        }
        let description = document.getElementById("cap-description-" + i);
        description.innerHTML = capabilities[capability].description;
        let url = document.getElementById("cap-url-" + i);
        url.href = capabilities[capability].url;
        // renderCapabilityGraph(capability, capabilities[capability], "cap-graph-" + i, i == 0);
      }
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

    console.debug(userPerformanceIndicators);

    // UPDATE PAGE BASED ON USER PROFILE
    decoratePagewithProfileAndPercentage(userProfileAndPercentile);
    populateKeyCapabilities(userProfileAndPercentile.profile);

    let industryBaselines = baselines[industry];

    // apply listeners for modal

    let close_controls = ['modal-close','modal-close-bottom'];

    close_controls.forEach((element) => {
        document.getElementById(element).addEventListener('click', function(e) {
            e.preventDefault();
            document.getElementById('modal').style.display='none';
        })
    })
    
    document.getElementById('cap-click').addEventListener('click', function(e) {
        e.preventDefault();
        document.getElementById('modal').style.display='block';
        createCapabilitiesTable(userProfileAndPercentile.profile);
    })

    document.getElementById('results').addEventListener('click', function(e) {
        e.preventDefault();
        viewPerformance();
        populateRecommendations(userProfileAndPercentile.profile, userPerformanceIndicators);
    })

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

        // hide hidden divs until clicked
        document.getElementById('perf-industry').style.display='none';
        document.getElementById('caps_prioritized').style.display='none';

        // if capability recommendations have been generated, show them
        let capabilitiesInUrl = 0;
        Object.keys(allCapabilities).forEach((profile) => {
            Object.keys(allCapabilities[profile]).forEach( (capability) => {
                if (urlParams.has(capability)) {
                    capabilitiesInUrl++;
                }
            })
        })

        if (capabilitiesInUrl == 3) {
            populateRecommendations(userProfileAndPercentile.profile, userPerformanceIndicators);
        }

        // hide other tabs until clicked
        let things_to_hide = ["c_compare","c_breakdown"]
        things_to_hide.forEach((tab) => {
            document.getElementById(tab).style.display='none';
        })

    })  

}());
