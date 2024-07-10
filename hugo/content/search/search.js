let searchServer = "https://search.dora.dev/"; ``

window.addEventListener('DOMContentLoaded', (event) => {
    let inputBox = document.querySelector("#searchPage .searchQuery");
    let resultsBox = document.querySelector('#webResultsContainer');
    let resultsHeader = document.querySelector('#resultsHeader')
    let publicationResultsHeader = document.querySelector('#publicationResultsHeader');
    let publicationResultsBox = document.querySelector('#publicationResults');
    let askDora = document.querySelector('#askDora');
    let searchQuery = ''
    let searchURI = '';
    let max_web_records = 12; // pagination support is limited; for now, just return 12 and display all on one page

    let params = new URLSearchParams(window.location.search);

    function sanitizeQuery(str) {
        // remove any characters that aren't letters, numbers, spaces, dashes, periods, or question marks
        return str.replace(/[^a-zA-Z0-9\s\-\.\?\%\'\"\:\(\)\[\]]/g, ' ');
    }

    if (params.has("q")) {
        searchQuery = params.get("q");
        inputBox.value = sanitizeQuery(searchQuery);
    } else {
        inputBox.focus();
    }

    function query(searchTerm) {

        searchTerm = sanitizeQuery(searchTerm);

        resetPage();
        resultsBox.innerHTML = `<span class="searching">Searching "${searchTerm}..."</span>`;
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
                if (data["links"].length) {
                    showWebResults(data["links"]);
                } else {
                    resultsBox.innerHTML = `No results for ${searchTerm}`
                }
                if (data["pdfs"].length) {
                    showPDFResults(data["pdfs"]);
                }
            })
            .catch(error => {
                resultsBox.innerHTML = "(error fetching search results)";
                console.log(error);
            });
        resultsHeader.innerHTML = `Search results: <b>${searchTerm}</b>`;
        resultsHeader.style.display = 'block';
    }

    function resetPage() {
        publicationResultsHeader.innerHTML = '';
        publicationResultsBox.innerHTML = '';
        resultsBox.innerHTML = '';
        askDora.style.display = 'none';
    }

    function showWebResults(links) {
        askDora.style.display = 'block';
        resultsBox.innerHTML = '<h3>Guides, capabilities, and more</h3>';
        links.forEach((result) => {
            thisResult = `
                <a href="${result.link}" class="webResults">
                    <h4>${result.title}</h4>
                    <p>
                        ${result.snippet}
                    </p>
                    <span class="url">${result.link}</span>
                </a>
                `;
            resultsBox.innerHTML += thisResult;
        })
    }

    function showPDFResults(pdfs) {
        publicationResultsHeader.innerHTML = '<h3>DORA publications</h3>';
        let year = 0;
        pdfs.forEach((result) => {
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
                        <div class="snippetText">${snippet.split(" ").slice(0, 1000).join(" ")}</div>
                        <small>Read the full report</small>
                    </div>
                </div>
            </a>
            `
        })
    }

    if (searchQuery.length) {
        query(searchQuery);
    }

});