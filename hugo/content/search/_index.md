---
title: "Search"
date: 2024-02-15T18:39:17-05:00
draft: true
---

## TEST page for search.dora.dev

<script>
    window.addEventListener('DOMContentLoaded', (event) => {
        let searchServer="https://search.dora.dev/";
        let inputBox = document.querySelector("#searchQuery");
        let resultsBox = document.querySelector('#searchResults');
        let searchURI = '';

        function makeDelay(ms) {
            var timer = 0;
            return function(callback){
                clearTimeout (timer);
                timer = setTimeout(callback, ms);
            };
        };
        

        inputBox.addEventListener('keyup', (event) => {
            if(inputBox.value.length >= 3) {
                query(inputBox.value)
            }
        })

        function query(searchTerm) {
            console.log(`searching ${searchTerm}...`)
            searchURI = `${searchServer}?query=${searchTerm}`;
            fetch(searchURI)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error ${response.status}`);
                    }
                    return response.json();
                })
                .then(data => {
                    resultsBox.innerHTML = '';
                    data.forEach((result) => {
                        thisResult = `
                            <div>
                                <div><a href="${result.link}">${result.title}</a></div>
                                <div>
                                    ${result.snippet}
                                </div>
                            </div>
                            `;
                        resultsBox.innerHTML += thisResult;
                    })

                })
                .catch(error => {
                    resultsBox.innerHTML = "(error fetching search results)"
                });
        }
    });
</script>

<input type="text" name="query" id="searchQuery" placeholder="(enter a search query)">

<div id="searchResults" style="width:80%;border:1px solid grey;padding:.5rem;height:40rem;overflow-y:auto">
    (results will appear here)
</div>