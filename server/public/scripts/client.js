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
    const $tasksList = $('.js-tasks-list');

    $tasksList.empty()
    for (let task of tasksArray) {
        $tasksList.append(`
            <li class="list-group-item">
                <div class="row">
                    <div class="col-6">
                        ${task.description}
                    </div>
                    <div class="col-6 text-right">
                        <button class="btn btn-success">Complete</button>
                        <button class="btn btn-danger">Delete</button>
                    </div>
                </div>
            </li>
        `);
    }

}
