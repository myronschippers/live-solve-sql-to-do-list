$(document).ready(init);

function init() {
    console.log('Hello Isurs!!!');

    // EVENT LISTENERS
    $('.js-btn-add-task').on('click', clickAddTask);
    $('.js-tasks-list').on('click', '.js-btn-delete', clickTaskDelete);
    $('.js-tasks-list').on('click', '.js-btn-complete', clickTaskComplete);

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

function clickTaskDelete(event) {
    const taskId = $(this).data().id;

    deleteTask(taskId);
}

function clickTaskComplete(event) {
    const taskId = $(this).data().id;
    // .data() =
    // {
    //     id: '1'
    // }

    completeTask(taskId);
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

function deleteTask(taskId) {
    // make AJAX call to endpoint
    $.ajax({
        type: 'DELETE',
        url: `/api/tasks/delete/${taskId}`,
    })
    .then(function(response) {
        getTasks();
    })
    .catch(function(err) {
        console.log(err);
        alert('There was an error deleting your task.');
    });
}

function completeTask(taskId) {
    // make AJAX call to endpoint
    $.ajax({
        type: 'PUT',
        url: `/api/tasks/complete/${taskId}`,
    })
    .then(function(response) {
        getTasks();
    })
    .catch(function(err) {
        console.log(err);
        alert('There was an error completing your task.');
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
        let btnElement = `<button
                            class="btn btn-success js-btn-complete"
                            data-id="${task.id}"
                        >
                            Complete
                        </button>`;
        let itemClass = 'notComplete';
        
        if (task.complete === 'true') {
            itemClass = 'isComplete';
            btnElement = `<button
                            class="btn btn-secondary js-btn-complete"
                            disabled
                            data-id="${task.id}"
                        >
                            Complete
                        </button>`;
        }

        $tasksList.append(`
            <li class="list-group-item ${itemClass}">
                <div class="row">
                    <div class="col-6">
                        ${task.description}
                    </div>
                    <div class="col-6 text-right">
                        ${btnElement}
                        <button
                            class="btn btn-danger js-btn-delete"
                            data-id="${task.id}"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </li>
        `);
    }

}
