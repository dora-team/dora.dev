(function() {

    let variables = [ "leadtime", "deployfreq", "ttr", "chgfail", "industry" ];
    let activated = { "leadtime" : false, "deployfreq" : false, "ttr" : false, "chgfail" : false, "industry" : false };
  
    function updateStatus(e) {
      if (!e.target.name) {
        return;
      }
      activated[e.target.name] = true;
      let all_activated = true;
      variables.forEach(function(item, index) {
        if (activated[item] == false) {
          all_activated = false;
        }
      });
      if (all_activated) {
        document.getElementById("view-results").disabled = false;
      }
    }
  
    function registerOnClickHandler() {
      for (let variable of variables) {
        for (let element of document.getElementsByName(variable)) {
          element.addEventListener("change", updateStatus);
        }
      }
    }
  
    window.addEventListener("load", registerOnClickHandler, false);
  })();