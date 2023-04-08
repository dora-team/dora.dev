// With thanks to Bryony Miles: https://medium.com/@bryony_17728/d3-js-two-v-4-network-charts-compared-8d3c66b0499c
// this script assumes Alpinejs is loaded on the calling page

var linkTo;
(function() {

  const radius = 5;
  const boundary = radius + 10;

  linkTo = function(name) {
    let element = {}
    for (let node of nodes) {
      if (node.id == name) {
        element.id = name;
        element.name = node.name;
        openModal(element);
      }
    }
  }

  function openModal(d, i) {
    let nodeName = d.name.replace(/_[^_]*_/, '');
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4 && xhr.status == 200) {
        window.Alpine.store('modal').capability_headline = nodeName;
        window.Alpine.store('modal').capability_content = xhr.responseText;
        window.Alpine.store('modal').open=true;
      }
    }
    xhr.open("GET", "content/" + d.id + ".html");
    xhr.send();
  }

  function highlightLinks(d) {
    document.querySelectorAll(".link").forEach(n => {
      n.id != "key-link" && n.setAttribute("marker-end", "")
    });
    document.querySelectorAll(".c-" + d.id).forEach(n => {
      n.style.stroke = "black";
      n.setAttribute("marker-end", "url(#arrow)")
    });
  };

  function coolLinks(d) {
    document.querySelectorAll(".link").forEach(n => {
      n.id != "key-link" && n.setAttribute("marker-end", "url(#arrow-muted)")
    });
    document.querySelectorAll(".c-" + d.id).forEach(n => {
      n.style.stroke = "#dadce0";
    });
  };

  function renderNode(d, i) {
    if (!d.hasOwnProperty("dummy")) {
      let box = d3.select(this).on("mouseover", highlightLinks).on("mouseout", coolLinks)
        .on("touchstart", highlightLinks).on("touchend", coolLinks);
      text = box.append("text").attr("class", "bfd-textbox").on("click", openModal);
      let title = d.name.split(/\n/);
      let dy = 0.3 - (title.length - 1) * 0.6;
      for (let line of title) {
        let italic = " ";
        if (line.charAt(0) === "_" && line.charAt(line.length - 1) === "_") {
          line = line.substring(1, line.length - 1);
          italic = " italic ";
        }
        let tspan = text.append("tspan").attr("class", "bfd-text text" + italic + d.type + "-text").text(line)
            .attr("dx", 10).attr("dy", dy.toString() + "em");
        dy += 1.2;
      }
      box.append("circle").attr("class", "bfd-circle node " + d.type).attr("r", radius);
      if (d.hasOwnProperty("cluster")) {
        box.append("text").attr("class", "text plus").attr("dx", "-3.5").attr("dy", "4").text("+");
      }
    }
  }

  const width = Math.min(window.innerWidth-64, 1040);
  const height = 500;
  const columnFactor = width / 9;
  const rowFactor = height / 8;

  const svg = d3.select('#bfd').append("svg").attr("width", width).attr("height", height)
  const defs = svg.append("defs");
  defs.append("marker").attr("id", "arrow").attr("markerWidth", 10).attr("markerHeight", 10)
      .attr("refX", 10).attr("refY", 3).attr("orient", "auto").attr("markerUnits", "strokeWidth")
      .append("path").attr("d", "M0,0 L0,6 L9,3 z");
  defs.append("marker").attr("id", "arrow-muted").attr("markerWidth", 10).attr("markerHeight", 10)
      .attr("refX", 10).attr("refY", 3).attr("orient", "auto").attr("markerUnits", "strokeWidth")
      .append("path").attr("d", "M0,0 L0,6 L9,3 z").attr("class", "muted");

  let nodes = [
    { "id": "autonomy", "name": "Autonomy, trust,\nand voice", "type": "cultural", "col": -3, "row": -6, "cluster": 1 },
    { "id": "culture", "name": "Culture and\nwork environment", "type": "outcome", "col": 2, "row": -5, "cluster": 1 },
    { "id": "retrospectives", "name": "Retrospectives", "type": "cultural", "col": 2, "row": -6 },
    { "id": "lean-product", "name": "Lean product\ndevelopment", "type": "process", "col": -5, "row": -4, "cluster": 1 },
    { "id": "org-perf", "name": "Organizational\nperformance", "type": "outcome", "col": 6, "row": -2, "cluster": 1},
    { "id": "sdo-perf", "name": "Software\ndelivery &\noperational\nperformance", "type": "outcome", "col": 2, "row": 0, "cluster": 1 },
    { "id": "change", "name": "Change\napprovals", "type": "process", "col": -4, "row": 2, "cluster": 1 },
    { "id": "cloud", "name": "Cloud\ninfrastructure", "type": "technical", "col": 4, "row": 2},
    { "id": "func-out", "name": "Functional\noutsourcing\n_decreases_", "type": "management", "col": 4, "row": 2 },
    { "id": "cd", "name": "Continuous\ndelivery", "type": "technical", "col": -2, "row": 4 },
    { "id": "tech-practices", "name": "Technical\npractices", "type": "technical", "col": -4, "row": 4, "cluster": 1 },
    { "id": "burnout", "name": "_Less_\nBurnout", "type": "outcome", "col": 2, "row": 4 },
    { "id": "deploy-pain", "name": "_Less_\ndeployment\npain", "type": "outcome", "col": 2, "row": 4 },
    { "id": "rework", "name": "_Less_\nrework", "type": "outcome", "col": 2, "row": 4 },
    { "id": "dr", "name": "Disaster\nrecovery\ntesting", "type": "process", "col": 4, "row": 2 },
    { "id": "lean-management", "name": "Lean\nmanagement", "type": "management", "col": -4, "row": 0, "cluster": 1 },
    { "id": "leadership", "name": "Transformational\nleadership", "type": "cultural", "col": -6, "row": 0, "cluster": 1 }
  ]

  let links = [
    { "source": "autonomy", "target": "culture" },
    { "source": "autonomy", "target": "sdo-perf" },
    { "source": "retrospectives", "target": "culture" },
    { "source": "retrospectives", "target": "culture" },
    { "source": "lean-product", "target": "culture" },
    { "source": "culture", "target": "sdo-perf" },
    { "source": "func-out", "target": "sdo-perf" },
    { "source": "cloud", "target": "sdo-perf" },
    { "source": "cd", "target": "culture" },
    { "source": "lean-management", "target": "culture" },
    { "source": "lean-management", "target": "sdo-perf" },
    { "source": "culture", "target": "org-perf" },
    { "source": "sdo-perf", "target": "org-perf" },
    { "source": "leadership", "target": "tech-practices" },
    { "source": "leadership", "target": "lean-product" },
    { "source": "cd", "target": "burnout" },
    { "source": "lean-product", "target": "burnout" },
    { "source": "lean-management", "target": "burnout" },
    { "source": "dr", "target": "sdo-perf" },
    { "source": "cd", "target": "sdo-perf" },
    { "source": "cd", "target": "rework" },
    { "source": "cd", "target": "deploy-pain" },
    { "source": "tech-practices", "target": "cd" },
    { "source": "lean-product", "target": "org-perf" },
    { "source": "sdo-perf", "target": "lean-product" },
    { "source": "lean-product", "target": "sdo-perf" },
    { "source": "change", "target": "sdo-perf" },
    { "source": "change", "target": "burnout" },
    { "source": "change", "target": "culture" },
    { "source": "lean-product", "target": "culture" },
    { "source": "lean-product", "target": "burnout" }
  ]

  function startDrag() {
    if (!d3.event.active) simulation.alpha(0.1).restart();
    highlightLinks(d3.event.subject);
    d3.event.subject.fx = d3.event.subject.x;
    d3.event.subject.fy = d3.event.subject.y;
  }

  function drag() {
    d3.event.subject.fx = d3.event.x;
    d3.event.subject.fy = d3.event.y;
  }

  function endDrag() {
    if (!d3.event.active) simulation.alpha(0);
    coolLinks(d3.event.subject);
    d3.event.subject.fx = null;
    d3.event.subject.fy = null;
  }

  const link = svg.selectAll(".link").data(links).enter().append("path")
	.attr("class", d => "link muted c-" + d.source + " c-" + d.target)
        .attr("id", d => d.source + "_" + d.target)
        .attr("marker-end", "url(#arrow-muted)");
  const node = svg.selectAll(".node").data(nodes).enter().append("g")
	.call(d3.drag().on("start", startDrag).on("drag", drag).on("end", endDrag))
        .each(renderNode);

  const simulation = d3.forceSimulation(nodes)
        .force('charge', d3.forceManyBody().strength(-100))
  // .force('center', d3.forceCenter(width / 2, height / 2))
        .force("column", d3.forceX(n => n.col * columnFactor + width / 2).strength(1))
        .force("row", d3.forceY(n => n.row * rowFactor + height / 2).strength(1))
        .force('collide', d3.forceCollide().radius(d => 50))
        .force('link', d3.forceLink(links).id(d => d.id).strength(1));
  simulation.stop();

  simulation.on("tick", function(d) {
    link.attr("d", arc);
    d3.selectAll(".node")
        .attr("cx", d => d.x = Math.max(boundary, Math.min(width - boundary, d.x)))
        .attr("cy", d => d.y = Math.max(boundary, Math.min(height - boundary, d.y)));
    d3.selectAll(".text")
        .attr("x", d => d.x)
        .attr("y", d => d.y);
  });

  function arc(d) {
    if (d.target.hasOwnProperty("dummy")) return "";
    let dx = d.target.x - d.source.x;
    let dy = d.target.y - d.source.y;
    let dr = Math.sqrt(dx * dx + dy * dy) * 2;
    let arc = [ "M", d.source.x, d.source.y, "A", dr, dr, 0, 0, 1, d.target.x, d.target.y ];
    return arc.join(" ");
  }

  simulation.alpha(1).restart();

})();