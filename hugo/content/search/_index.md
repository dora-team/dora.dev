---
title: "Search"
date: 2024-02-15T18:39:17-05:00
draft: true
---

> This is an early preview of DORA search.

<script>
    let searchServer="https://search.dora.dev/";

    window.addEventListener('DOMContentLoaded', (event) => {
        let inputBox = document.querySelector("#searchQuery");
        let resultsBox = document.querySelector('#webResults');
        let resultsHeader = document.querySelector('#resultsHeader')
        let publicationResultsBox = document.querySelector('#publicationResults');
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
                    publicationResultsBox.innerHTML = '';
                    // populate website results
                    if(data["links"].length) {
                        data["links"].forEach((result) => {
                            thisResult = `
                                <a href="${result.link}" class="webResults">
                                    <span class="url">${result.link}</span>
                                    <h4>${result.title}</h4>
                                    <p>
                                        ${result.snippet}
                                    </p>
                                </a>
                                `;
                            resultsBox.innerHTML += thisResult;})
                        } else {
                            resultsBox.innerHTML = `No results for ${searchTerm}`
                        }
                    if(data["pdfs"].length) {
                        data["pdfs"].forEach((result) => {
                            publicationResultsBox.innerHTML += `
                                <div style="width:33%;line-height:4em;height:4em;text-align:center">
                                    PDF
                                </div>
                            `
                        })
                    }
                })
                .catch(error => {
                    resultsBox.innerHTML = "(error fetching search results)";
                    console.log(error);
                });
            resultsHeader.innerHTML = `Search results: <b>${searchQuery}</b>`;
        }

        inputBox.value = searchQuery;
        if(searchQuery.length) {
            query(searchQuery);
        }

    });
</script>

<form action="." method="get" id="searchForm"><input type="search" name="q" id="searchQuery" placeholder="Search dora.dev for..."><input type="submit" value="search" id="searchButton" /></form>

<h2 id="resultsHeader">Search</h2>
<div id="searchResultsContainer">
    <div id="publicationResults"></div>
    <div id="webResults"></div>
    <div id="askDora">[put ask.dora.dev snipe here]</div>
</div>

<style>
    main {
        width:100%;
    }

    #searchResultsContainer {
        display: grid;
        grid-template-areas:
            "a a"
            "b c";
    }

    #publicationResults {
        grid-area: a;
        display:grid;
        grid-gap:1em;
        grid-template-columns:1fr 1fr 1fr;
    }

    #publicationResults div {
        border:1px solid #999;
        width:33%;
        border-radius:1em;
    }

    #webResults {
        grid-area: b;
    }

    #askDora {
        grid-area: c;
    }

    #searchForm {
        display:flex;
        width:100%;
    }

    #searchQuery {
        display:block;
        flex-grow:1;
        margin:0;
        padding-inline:1rem;
        border:1px solid #999;
        border-radius:10vmin 0 0 10vmin;
    }

    #searchButton {
        display:block;
        margin:0;
        border-radius: 0 10vmin 10vmin 0;
        font-size:1rem;
    }

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
    .webResults:not(last-child) {
        padding:.75rem 0;
        border-bottom:1px solid #eee;
    }

    .webResults, .webResults:hover {
        display:block;
        color:rgb(99,99,99);
        text-decoration:none;
    }

    .webResults h4 {
        color:rgb(32, 33, 36);
        font-weight:bold;
    }

    .webResults:hover h4 {
        color:#1a73e8;
    }

    .webResults .url {
        font-size:.75rem;
    }
</style>