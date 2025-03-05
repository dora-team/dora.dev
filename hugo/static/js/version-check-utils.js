function getParameterByName(name, url = window.location.href) {
  name = name.replace(/[\[\]]/g, '\$&'); // escape square brackets in name for regex
  const urlObject = new URL(url);
  return urlObject.searchParams.get(name);
}

function showContent(version) {
  // Show content for exact version match
  document.querySelectorAll(`.version-content[data-version="${version}"]`).forEach(el => {
    if (el) {
      el.style.display = 'block';
    }
  });

  // Show default content if no version match
  const defaultContent = document.querySelector('.version-content[data-default]');
  if (defaultContent && !document.querySelector('.version-content[style="display: block;"]')) {
    if (defaultContent) {
      defaultContent.style.display = 'block';
    }
  }
}
