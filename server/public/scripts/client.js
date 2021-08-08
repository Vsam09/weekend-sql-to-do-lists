$(document).ready(onReady);

function onReady() {
    $('#postBtn').on('click', postTasks)
    $(document).on('click','.deleteBtn', deleteTask )
    $(document).on('click','.completeBtn', generateGreen)
    getTaskData();
};

//Create button to change background color to green
function generateGreen() {
    console.log(this)
    $(this).closest('tr').addClass('greenBackground')
    console.log('WORK')
    $(this).hide();
    completeTask();

};

function completeTask () {
    let taskId = $(this).closest('tr').data('id');
    let complete = $(this).closest('tr').data('complete');
    if (complete === false || complete === null) {
        complete = true;
    }
    else if (complete === true || complete === null) {
        complete = false;
    }
    $.ajax({
        type: 'PUT',
        url: `/tasks/${taskId}`,
        data: {complete: complete}
    }).then(function(res) {
        console.log(res)
        getTaskData();
    }).catch((err) => {
        console.log('PUT Error', err)
    })
};

function deleteTask(){
    const taskId = $(this).closest('tr').data('id')
    $.ajax({
        type: 'DELETE',
        url: `/tasks/${taskId}`,
    }).then(function(res) {
        console.log(res)
        getTaskData();
    })
};
// get task data from the server
function getTaskData() {
    $("#taskTableBody").empty();
    $.ajax({
        type: 'GET',
        url: '/tasks'
    }).then(function (response) {
        console.log("Get Task", response);
        // append data to the DOM
        for (let i = 0; i < response.length; i++) {
            $('#taskTableBody').append(`
                <tr id="greenBackground" class= "grayBackground" data-id="${response[i].id}">
                    <td>${response[i].task}</td>

                    <td><button id="completeInput" class="completeBtn">Complete</button></td>
                    <td><button id="redBackground" class="deleteBtn">Delete</button></td>
                </tr>
            `);
        }
    });
};
function postTasks() {
    let postTask = {
        task: $('#taskInput').val(),
        date: $('#dateInput').val(),
        complete: $('#completeInput').val()
    }
    $.ajax({
        type: 'POST',
        url: '/tasks',
        data: postTask
    }).then( function (response) {
        $('#taskInput').val(''),
        $('#dateInput').val(''),
        $('#completeInput').val('')
        getTaskData();
    });
};