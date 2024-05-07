---
title: "Search"
date: 2024-02-15T18:39:17-05:00
draft: true
---

<script>
    let searchServer="https://search.dora.dev/";

    window.addEventListener('DOMContentLoaded', (event) => {
        let inputBox = document.querySelector("#searchQuery");
        let resultsBox = document.querySelector('#searchResults');
        let resultsHeader = document.querySelector('#resultsHeader')
        let searchQuery = ''
        let searchURI = '';
        
        let params = new URLSearchParams(window.location.search);
        if(params.has("q")) {
            searchQuery=params.get("q");
        }

        function query(searchTerm) {
            resultsBox.innerHTML = `<span class="searching">Searching "${searchQuery}..."</span>`;
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
                            <div class="searchResults">
                                <div><a href="${result.link}">${result.title}</a></div>
                                <p>
                                    ${result.snippet}
                                </p>
                            </div>
                            `;
                        resultsBox.innerHTML += thisResult;
                    })

                })
                .catch(error => {
                    resultsBox.innerHTML = "(error fetching search results)"
                });
            resultsHeader.innerHTML = `Search results: <b>${searchQuery}</b>`;
        }

        inputBox.value = searchQuery;
        if(searchQuery.length) {
            query(searchQuery);
        }

    });
</script>


<h2 id="resultsHeader">Search</h2>

<form action="." method="get">
    <input type="search" name="q" id="searchQuery" placeholder="Search dora.dev for..."> <input type="submit" value="search" id="searchButton" />
</form>

<div id="searchResults"></div>

<style>
    #resultsHeader {
        color:#666;
    }

    #resultsHeader b {
        color:rgb(32, 33, 36);
    }

    .searching {
        color:#999;
        font-style:italic;
    }
    .searchResults:not(last-child) {
        padding:.75rem 0;
        border-bottom:1px solid #eee;
    }
</style>