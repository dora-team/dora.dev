// DEPRECATED
// This file is used for reference from legacy implementation




/**
 * Render performance graphs for quickcheck
 */

(function () {

    const urlParams = new URLSearchParams(window.location.search);
    let perfValues = {};
    let allCapabilities = "";
    let profileSelected = "";
    let capabilitiesSelected = []
    let capabilityQuestions = {}
    let capabilityAnswers = {}
    const indicators = {
      'leadtime': {
        'label': 'Lead time',
        'legend': 'none',
        'ticks': [
          { v: 0, f: '>6m' }, { v: 20, f: '1-6m' }, { v: 40, f: '1w - 1m' },
          { v: 60, f: '1d - 1w' }, { v: 80, f: '<1d' }, { v: 100, f: '<1h' }
        ]
      },
      'deployfreq': {
        'label': 'Deploy frequency',
        'legend': 'none',
        'ticks': [
          { v: 0, f: '>6m' }, { v: 20, f: '1-6m' }, { v: 40, f: '1w - 1m' },
          { v: 60, f: '1d - 1w' }, { v: 80, f: '<1d' }, { v: 100, f: 'on demand' }
        ]
      },
      'ttr': {
        'label': 'Time to restore',
        'legend': 'none',
        'ticks': [
          { v: 0, f: '>6m' }, { v: 20, f: '1-6m' }, { v: 40, f: '1w - 1m' },
          { v: 60, f: '1d - 1w' }, { v: 80, f: '<1d' }, { v: 100, f: '<1h' }
        ]
      },
      'chgfail': {
        'label': 'Change fail rate',
        'legend': 'bottom',
        'ticks': [
          { v: 0, f: '76-100%' }, { v: 20, f: '61-75%' }, { v: 40, f: '46-60%' },
          { v: 60, f: '31-45%' }, { v: 80, f: '16-30%' }, { v: 100, f: '0-15%' }
        ]
      }
    };
    const mean = 4.251338;
    const stddev = 1.000992;
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
    const colors = {
      'low': '#D93025',
      'medium': '#FBBC04',
      'high': '#34A853',
      'elite': '#0D652D',
      'you': '#0F346F',
      'average': '#5F6368',
      'bar': '#0F346F'
    }
    const icons = {
      'you': `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2c-4.97 0-9 4.03-9 9 0 4.17 2.84 7.67 6.69 8.69L12 22l2.31-2.31C18.16 18.67 21 15.17 21 11c0-4.97-4.03-9-9-9zm0 2c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.3c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/></svg>`,
      'average': `<svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24" viewBox="0 0 24 24" width="24"><rect fill="none" height="24" width="24"/><g><path fill="currentColor" d="M12,12.75c1.63,0,3.07,0.39,4.24,0.9c1.08,0.48,1.76,1.56,1.76,2.73L18,18H6l0-1.61c0-1.18,0.68-2.26,1.76-2.73 C8.93,13.14,10.37,12.75,12,12.75z M4,13c1.1,0,2-0.9,2-2c0-1.1-0.9-2-2-2s-2,0.9-2,2C2,12.1,2.9,13,4,13z M5.13,14.1 C4.76,14.04,4.39,14,4,14c-0.99,0-1.93,0.21-2.78,0.58C0.48,14.9,0,15.62,0,16.43V18l4.5,0v-1.61C4.5,15.56,4.73,14.78,5.13,14.1z M20,13c1.1,0,2-0.9,2-2c0-1.1-0.9-2-2-2s-2,0.9-2,2C18,12.1,18.9,13,20,13z M24,16.43c0-0.81-0.48-1.53-1.22-1.85 C21.93,14.21,20.99,14,20,14c-0.39,0-0.76,0.04-1.13,0.1c0.4,0.68,0.63,1.46,0.63,2.29V18l4.5,0V16.43z M12,6c1.66,0,3,1.34,3,3 c0,1.66-1.34,3-3,3s-3-1.34-3-3C9,7.34,10.34,6,12,6z"/></g></svg>`
    }
    const ranking = [
      "Strongly disagree",
      "Disagree",
      "Neither agree nor disagree",
      "Agree",
      "Strongly agree"
    ]
  
    function clamp(value, max) {
      return Math.max(Math.min(value, max), 1);
    }
  
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
  
    function calculateProfile(my_value) {
      let profile = '';
      for (let my_profile of Object.keys(profileStats)) {
        if (my_value <= profileStats[my_profile]) {
          profile = my_profile;
          break;
        }
      }
      let percentile = Math.round(100 * normDist(my_value, mean, stddev));
      return {
        profile: profile,
        percentile: percentile
      }
    }
  
    function scalePerf(value) {
      return 20 * (value - 1);
    }
  
    String.prototype.capitalize = function () {
      return this.charAt(0).toUpperCase() + this.slice(1);
    };
  
    function renderPerformanceGraph(average) {
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
      let yourPerformance = normDist(average, mean, stddev);
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
  
    function renderPerformanceComparison(industry, element){
        let allIndicators = ['leadtime', 'deployfreq', 'ttr', 'chgfail'];

        allIndicators.forEach(indicator => {
            renderGraph(indicator, industry, element);
        });
    }

    function renderGraph(indicator, industry, element) {
      let dataTable = new google.visualization.DataTable();
      dataTable.addColumn('string', 'Aspect of Software Delivery Performance');
      dataTable.addColumn('number', 'Your performance');
      var pluralIndustry = industry=='all' ? 'ies' : 'y';
      var industryString = `${industry} industr${pluralIndustry} performance`.capitalize()
      dataTable.addColumn('number', industryString);
      dataTable.addRows([[
        indicators[indicator]['label'], perfValues[indicator], baselines[industry][indicator]
      ]]);
      let chartHeight = indicators[indicator]['legend'] == 'bottom' ? 120 : 70;
      var options = {
        bars: 'horizontal',
        bar: { groupWidth: '30%' },
        height: chartHeight,
        chartArea: { top: 0, left: 120, right: 20, height: 40 },
        enableInteractivity: false,
        series: {
          0: { color: colors['bar'] },
          1: { type: 'line', color: colors['average'], lineWidth: 0, pointSize: 8, pointShape: 'diamond' }
        },
        hAxis: { minValue: 0, maxValue: 100, ticks: indicators[indicator]['ticks'] },
        legend: { position: indicators[indicator]['legend'] }
      };
  
      function placeMarkers(dataTable) {
        var cli = this.getChartLayoutInterface();
        var parent = document.getElementById(element + indicator);
        addOverlayMarker(parent, Math.floor(cli.getXLocation(dataTable.getValue(0, 1))), 'you', colors['bar']);
      };

      let chart = new google.visualization.BarChart(document.getElementById(element + indicator));
      console.log(dataTable);
      chart.draw(dataTable, options);
    }
  
    function addOverlayMarker(parentElement, xPos, iconName, color) {
      const overlayHtml = `<div class="overlay-marker">${icons[iconName]}</div>`;
      parentElement.insertAdjacentHTML('beforeend',overlayHtml)
      var overlay = parentElement.lastChild;
      overlay.style.left = `${xPos-11}px`;
      overlay.style.color = color;
      overlay.style.visibility = 'visible';
    }
  
    function selectProfile(myValue) {
      const { profile, percentile } = calculateProfile(myValue)
      profileSelected = profile;
      let profileSpan = document.getElementById('profile');
      profileSpan.textContent = profile;
      profileSpan.classList.add('profile-' + profile);
      let profileTitles = document.getElementsByClassName('profile-title');
      for (var i = 0; i < profileTitles.length; i++) {
        profileTitles.item(i).textContent = profile;
      }
      let profileColors = document.getElementsByClassName('color-by-profile');
      for (var i = 0; i < profileColors.length; i++) {
        profileColors.item(i).classList.add(profile);
      }
      let percentileSpan = document.getElementById('percentile');
      percentileSpan.textContent = percentile;
    }
  
    function renderBreakdown(mutationsList, observer) {
      for (let mutation of mutationsList) {
        if (mutation.target.classList.contains('glue-is-shown')) {
          for (let indicator of Object.keys(indicators)) {
            let element = document.getElementById(indicator + '-' + profileSelected);
            if (element) {
              element.classList.remove('perf-regular');
              element.classList.add('perf-highlight');
            }
          }
          observer.disconnect();
        }
      }
    }
  
    function renderCapabilityGraph(capability, data, element, focus) {
      let dataTable = new google.visualization.DataTable();
      let value = parseFloat(urlParams.get(capability)) / 4.0;
      let mean = data["mean"] / 100;
      let profileMean = data["profile-mean"] / 100;
      let backgroundColor = focus ? '#E8F0FE' : 'white';
      dataTable.addColumn('string', 'Capability');
      dataTable.addColumn('number', 'Your performance');
      dataTable.addColumn('number', 'Average (all industries)');
      dataTable.addColumn('number', `${profileSelected} performer avg.`.capitalize());
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
          2: { type: 'line', color: colors[profileSelected], lineWidth: 0, pointSize: 8, pointShape: 'circle' }
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
  
      function placeMarkers(dataTable) {
        var cli = this.getChartLayoutInterface();
        var parent = document.getElementById(element);
        addOverlayMarker(parent, Math.floor(cli.getXLocation(dataTable.getValue(0, 1))), 'you', colors['bar']);
      };
  
      let chart = new google.visualization.BarChart(
      document.getElementById(element));
      google.visualization.events.addListener(
      chart,
      'ready',
      placeMarkers.bind(chart, dataTable)
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
  
    function viewPerformance(e) {
      for (let key of Object.keys(capabilityQuestions)) {
        capability = key.substr(0, key.indexOf('-'));
        capabilityAnswers[capability].push(getRadioValue(key));
      }
      let average = (array) => array.reduce((a, b) => a + b) / array.length;
      let queryString = "";
      for (var i = 0; i < capabilitiesSelected.length; i++) {
        capability = capabilitiesSelected[i];
        queryString += "&" + capability + "=" + average(capabilityAnswers[capability]);
      }
      window.location.replace("performance.html" + window.location.search + queryString);
    }
  
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
  
    function createCapabilitiesTable() {
      let capabilities = allCapabilities[profileSelected];
      let capTable = document.getElementById('modal-content');
      let questionId = 0;
      for (let key of Object.keys(capabilities)) {
        capability = capabilities[key];
        let title = document.getElementById("rec-name-" + questionId);
        title.textContent = capabilities[key].title;
        let img = document.getElementById("rec-img-" + questionId);
        img.src = capabilities[key].img;
        let link = document.getElementById("rec-link-" + questionId);
        link.href = capabilities[key].url;
        capabilitiesSelected.push(key);
        capabilityAnswers[key] = [];
        html = `<img src="${capability.img}" class="capability-img" />\n`;
        html += `<h4 class="h-c-eyebrow h-has-bottom-margin">Capability ${questionId + 1} of 3: ${capability.questions.length} questions</h4>\n`;
        html += `<h3 class="h-c-headline h-c-headline--three h-has-bottom-margin">${capability.title}</h3>\n`;
        html += `<p>${capability.description} <a href='${capability.url}' target='_blank'>Learn more</a></p>\n`;
        html += '<div class="ranking-align h-c-table__overflowcontainer">';
        html += '<table class="h-c-table h-c-table--datatable h-c-table--datatable-altrows h-c-table--stacked"><thead><tr>';
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
  
    function populateRecommendations() {
      let capabilities = allCapabilities[profileSelected];
      let performance = [];
      for (let capability of Object.keys(capabilities)) {
        if (urlParams.has(capability)) {
          let difference = 25 * parseFloat(urlParams.get(capability));
          performance.push([capability, difference]);
        }
      }
      if (performance.length == 3) {
        performance.sort(function (first, second) {
      if (first[1] != second[1]) {
            return first[1] - second[1];
      }
      return (first[1] - capabilities[first[0]]["profile-mean"]) - (second[1] - capabilities[second[0]]["profile-mean"]);
        });
        let recommendation = document.getElementById("capability");
        let resultsTab = document.getElementById("rec-results");
        resultsTab.style.display = "block";
        for (let i = 0; i < 3; i++) {
          let capability = performance[i][0];
          let title = document.getElementById("cap-title-" + i);
          title.textContent = capabilities[capability].title;
          if (i == 0) {
            recommendation.textContent = capabilities[capability].title.toLowerCase();
          }
          let description = document.getElementById("cap-description-" + i);
          description.innerHTML = capabilities[capability].description;
          let image = document.getElementById("cap-img-" + i);
          image.src = capabilities[capability].img;
          let url = document.getElementById("cap-url-" + i);
          url.href = capabilities[capability].url;
          renderCapabilityGraph(capability, capabilities[capability], "cap-graph-" + i, i == 0);
        }
      } else {
        createCapabilitiesTable()
        let compareTab = document.getElementById("rec-more");
        compareTab.style.display = "block";
      }
    }
  
    // function renderIndustryTab(mutationsList, observer) {
    //   renderGraphTab(mutationsList, observer, urlParams.get('industry'), 'perf-ind-');
    // }
  
    // function renderOverallTab(mutationsList, observer) {
    //   renderGraphTab(mutationsList, observer, 'all', 'perf-main-');
    // }
  
    // function renderGraphTab(mutationsList, observer, industry, element) {
    //   for (let mutation of mutationsList) {
    //     if (mutation.target.classList.contains('glue-is-shown')) {
    //       for (let variable of Object.keys(indicators)) {
    //         renderGraph(variable, industry, element);
    //       }
    //       observer.disconnect();
    //     }
    //   }
    // }
  
    function showCapabilityModal() {
      showModal("modal","c-focus","modal-close");
    }
  
    function showShareModal() {
      showModal("share-modal","results-hero");
      document.getElementById("share-url").value = location.href;
    }
  
    function showModal(element, parent, additionalCloseButton=undefined) {
      let modalDiv = document.getElementById(element);
      let modal = new glue.ui.Modal(modalDiv, document.getElementById(parent));
      modal.open();
      modalDiv.scrollTo(0, 0);
      if (additionalCloseButton != undefined) {
        document.getElementById(additionalCloseButton).addEventListener('click', function () { modal.close(); });
      }
    }
  
    function renderResults() {
      for (let variable
       of ['leadtime', 'deployfreq', 'ttr', 'chgfail', 'industry']) {
        if (!urlParams.has(variable)) {
          return;
        }
      }
      let average = 0;
      for (let variable of Object.keys(indicators)) {
        let unnormalized = clamp(parseInt(urlParams.get(variable)), 6);
        average += unnormalized;
        perfValues[variable] = clamp(scalePerf(unnormalized), 100);
      }
      average = average / Object.keys(indicators).length;
      selectProfile(average);
      renderPerformanceGraph(average);
      document.getElementById('cap-click').addEventListener('click', showCapabilityModal);
      document.getElementById('share-button').addEventListener('click', showShareModal);
      document.getElementById('results').addEventListener('click', viewPerformance);
  
      let xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          allCapabilities = JSON.parse(this.responseText);
          populateRecommendations();
        }
      }
      xhr.open("GET", "/js/devops-capabilities.json");
      xhr.send();
    
    renderPerformanceComparison('all', 'perf-main-');
    renderPerformanceComparison(urlParams.get('industry'), 'perf-ind-');
  
      document.querySelectorAll('#share-button').forEach(button => {
        button.addEventListener('click', () => {
          if (typeof navigator.clipboard !== 'undefined') {
            navigator.clipboard.writeText(location.href);
          } else {
            alert("Due to Chrome security restrictions, copying to the clipboard does not work on staging environments.");
          }
        }, false);
      });
  
    }
  
    google.charts.load('current', { packages: ['corechart', 'bar'] });
    window.addEventListener('load', renderResults, false);
  })();
  