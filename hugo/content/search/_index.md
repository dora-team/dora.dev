---
title: "Search"
date: 2024-02-15T18:39:17-05:00
draft: false
---

> This is an early preview of DORA search.

<script>
    let searchServer="https://search.dora.dev/";

    window.addEventListener('DOMContentLoaded', (event) => {
        let inputBox = document.querySelector("#searchQuery");
        let resultsBox = document.querySelector('#webResultsContainer');
        let resultsHeader = document.querySelector('#resultsHeader')
        let publicationResultsHeader = document.querySelector('#publicationResultsHeader');
        let publicationResultsBox = document.querySelector('#publicationResults');
        let askDora = document.querySelector('#askDora');
        let searchQuery = ''
        let searchURI = '';
        let max_web_records = 12; // pagination support is limited; for now, just return 12 and display all on one page
        
        let params = new URLSearchParams(window.location.search);
        if(params.has("q")) {
            searchQuery=params.get("q");
        }

        function query(searchTerm) {
            publicationResultsHeader.innerHTML = '';
            publicationResultsBox.innerHTML = '';
            resultsBox.innerHTML = '';
            askDora.style.display = 'none';
            resultsBox.innerHTML = `<span class="searching">Searching "${searchQuery}..."</span>`;
            console.log(`searching ${searchTerm}...`)
            searchURI = `${searchServer}?query=${searchTerm}&max_web_records=${max_web_records}`;
            fetch(searchURI)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error ${response.status}`);
                    }
                    return response.json();
                })
                .then(data => {
                    // populate website results
                    if(data["links"].length) {
                        askDora.style.display = 'block';
                        resultsBox.innerHTML = '<h3>Guides, capabilities, and more</h3>';
                        data["links"].forEach((result) => {
                            thisResult = `
                                <a href="${result.link}" class="webResults">
                                    <h4>${result.title}</h4>
                                    <p>
                                        ${result.snippet}
                                    </p>
                                    <span class="url">${result.link}</span>
                                </a>
                                `;
                            resultsBox.innerHTML += thisResult;})
                        } else {
                            resultsBox.innerHTML = `No results for ${searchTerm}`
                        }
                    if(data["pdfs"].length) {
                        publicationResultsHeader.innerHTML = '<h3>DORA publications</h3>';
                        let year = 0;
                        data["pdfs"].forEach((result) => {
                            year = result.publication_year;
                            snippet = result.snippet;
                            page_number = result.page_number;
                            // URL `/dora-report-${year}` requires Firebase redirect, so it won't work if site is served by Hugo
                            publicationResultsBox.innerHTML += `
                                <a href="/dora-report-${year}" target="_blank">
                                    <div class="publication">
                                        <div class="thumbnail">
                                            <img src="/img/sodr_thumbnails/${year}.png">
                                            <br>
                                            <h3>State of DevOps Report ${year}</h3>
                                            <h4>p. ${page_number}</h4>
                                        </div>
                                        <div class="snippet">
                                            <div class="snippetText">${snippet.split(" ").slice(0,1000).join(" ")}</div>
                                            <small>Read the full report</small>
                                        </div>
                                    </div>
                                </a>
                            `
                        })
                    }
                })
                .catch(error => {
                    resultsBox.innerHTML = "(error fetching search results)";
                    console.log(error);
                });
            resultsHeader.innerHTML = `Search results: <b>${searchQuery}</b>`;
            resultsHeader.style.display = 'block';
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
    <div id="publicationResultsHeader"></div>
    <div id="publicationResults"></div>
    <div id="webAndGenerativeResults">
        <div id="webResultsContainer"></div>
        <div id="askDoraContainer">
            <a href="https://ask.dora.dev/" target=_blank>
                <div id="askDora">
                    <img src="communitycritter-green.png">
                    <h3>Explore further</h3>
                    <h4>
                        Try DORA’s new<br>
                        Generative AI search experience
                    </h4>
                    ask.dora.dev
                </div>
            </a>
        </div>
    </div>
</div>

<style>
    /* TODO: move these to a linked stylesheet and add mobile styles */

    main {
        width:100%;
    }

    #searchResultsContainer {
        margin: 0 1em;
    }

    #searchResultsContainer h3 {
        border-bottom:1px solid #ccc;
        color:#666;
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
        display:none;
    }

    #resultsHeader b {
        color:rgb(32, 33, 36);
    }

    #publicationResults {
        display:grid;
        grid-gap:1em;
        grid-template-columns:1fr 1fr 1fr;
    }

    #publicationResults div.publication {
        display: flex;
        margin-right:1em;
    }

    #publicationResults div.snippet {
        font-family:roboto;
        line-height:1.25;
        font-weight:300;
    }

    #publicationResults div.snippetText {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 9;
        overflow: hidden;
    }

    #publicationResults div.publication small {
        color:#1a73e8;
    }

    #publicationResults div.thumbnail {
        margin-right:.25em;
    }

    #publicationResults h3 {
        font-size:1em;
        font-weight:bold;
        border:none;
        display:inline;
    }

    #publicationResults h4 {
        font-size:.75em;
        color:#999;
        display:inline;
    }

    #publicationResults a {
        text-decoration:none;
        color:#333;
    }

    #publicationResults img {
        max-width:8em;
        max-height:8em;
        margin-right:.5em;
        border:1px solid #999;
    }

    #webAndGenerativeResults {
        display:flex;
        flex-direction:row;
        margin-top:1em;
    }

    #askDoraContainer {
        text-align:center;
    }

    .searching {
        color:#999;
        font-style:italic;
    }

    #webResultsContainer {
        flex-grow:1;
        margin-right:2em;
    }

    .webResults {
        padding:.75rem 0;
    }

    .webResults:not(last-child) {
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

    .webResults .url {
        font-size:.75rem;
    }

    .webResults:hover {
        color:#333;
    }

    .webResults:hover h4, .webResults:hover .url {
        color:#1a73e8;
    }

    #askDoraContainer a {
        text-decoration:none;
    }

    #askDora {
        background-color:#eee;
        border:1px solid #ccc;
        border-radius:1em;
        text-align:center;
        margin-top:6em;
        padding:.5rem;
        width:16rem;
        display:none;
    }

    #askDora img {
        width:8rem;
    }

    #askDora h3, #askDora h4 {
        color:#333;
    }

    #askDora h3 {
        font-size:1.25rem;
        font-weight:bold;
        border:none;
    }

    #askDora h4 {
        font-size:.85rem;
    }
</style>