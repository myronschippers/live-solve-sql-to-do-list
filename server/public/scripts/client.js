$(document).ready(init);

function init() {
    console.log('Hello Isurs!!!');

    // EVENT LISTENERS
    $('.js-btn-add-task').on('click', clickAddTask);

    getTasks();
}

//
// EVENT HANDLERS
// ----------------------------------------

function clickAddTask(event) {
    const $inputTask = $('.js-input-task');
    const description = $inputTask.val();

    $inputTask.val('');
    postNewTask(description);
}

//
// API CALLS
// ----------------------------------------

function postNewTask(taskDesc) {
    // make AJAX call to endpoint
    $.ajax({
        type: 'POST',
        url: '/api/tasks',
        data: {
            description: taskDesc,
        }
    })
    .then(function(response) {
        getTasks();
    })
    .catch(function(err) {
        console.log(err);
        alert('There was an error creating your task.');
    });
}

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

function deleteTask() {
    // make AJAX call to endpoint
}

function completeTask() {
    // make AJAX call to endpoint
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
