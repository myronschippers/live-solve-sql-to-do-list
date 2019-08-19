$(document).ready(init);

function init() {
    console.log('Hello Isurs!!!');

    getTasks();
}

//
// API CALLS
// ----------------------------------------

function getTasks() {
    $.ajax({
        type: 'GET',
        url: '/api/tasks',
    })
    .then(function(response) {
        render(response);
    })
    .catch(function(err) {
        console.log(err);
        alert('There was an error getting your tasks.');
    });
}

//
// VIEW MANIPULATION
// ----------------------------------------

function render(tasksArray) {
    console.log(tasksArray);

}
