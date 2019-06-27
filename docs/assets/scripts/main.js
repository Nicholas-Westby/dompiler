// Set the current page button to link to the GitHub version of this page.
let button = document.querySelector("[href=\"#current-github-page\"]");
if (button) {
    button.href = "https://github.com/Nicholas-Westby/dompiler/tree/master/docs" + window.location.pathname;
}