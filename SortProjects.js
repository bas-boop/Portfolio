const projectViews = Array.from(document.getElementsByClassName("view"));
const defaultViewId = "new";

toggleView(getIdFromHash() ?? defaultViewId);

function toggleView(id) {
    history.replaceState(null, null, `#${id}`);
    projectViews.forEach(view => {
        view.id == id ? view.classList.add('shown') : view.classList.remove('shown');
    });
}

function getIdFromHash() {
    const hash = document.location.hash.substring(1);

    return document.getElementById(hash) ? hash : null;
}