var currentProjectId = 'filter1';

function toggleProjectDiv(divId)
{
    var projectDiv = document.getElementById(divId);
    var childContainerDiv = projectDiv.querySelector(".project-container");

    // Hide the currently visible project
    if (currentProjectId !== null) {
        var currentProjectDiv = document.getElementById(currentProjectId);
        var currentChildContainerDiv = currentProjectDiv.querySelector(".project-container");

        currentProjectDiv.style.display = "none";
        currentChildContainerDiv.style.display = "none";
    }

    // Show the selected project
    if (projectDiv.style.display === "none") {
        projectDiv.style.display = "block";
        childContainerDiv.style.display = "block";
        currentProjectId = divId;
    } else {
        projectDiv.style.display = "none";
        childContainerDiv.style.display = "none";
        currentProjectId = null;
    }
}

const projectViews = Array.from(document.getElementsByClassName("view"));

// const temp = document.createElement('div');

function toggleView(id) {
    projectViews.forEach(view => {
        view.id == id ? view.classList.add('shown') : view.classList.remove('shown');
    });
}