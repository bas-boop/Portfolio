const projectViews = Array.from(document.getElementsByClassName("view"));
var currentProjectId = 'filter1';

function toggleProjectDiv(divId)
{
    var projectDiv = document.getElementById(divId);
    var childContainerDiv = projectDiv.querySelector(".project-container");

    // Hide the currently visible project
    if (currentProjectId !== null) {
        var currentProjectDiv = document.getElementById(currentProjectId);

        currentProjectDiv.style.display = "none";
        currentChildContainerDiv.style.display = "none";
    }

    // Show the selected project
    if (projectDiv.style.display === "none") {
        projectDiv.style.display = "block";
        currentProjectId = divId;
    } else {
        projectDiv.style.display = "none";
        currentProjectId = null;
    }
}

function toggleView(id) {
    projectViews.forEach(view => {
        view.id == id ? view.classList.add('shown') : view.classList.remove('shown');
    });
}