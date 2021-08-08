$(document).ready(onReady);

function onReady() {
    $('#postBtn').on('click', postTasks)
    $(document).on('click','.deleteBtn', deleteTask )
    $(document).on('click','.completeBtn', generateGreen)
    getTaskData();
};

//Create button to change background color to green
function generateGreen() {
    // let context = $(this)
    console.log(this)
    $(this).closest('tr').addClass('greenBackground')
    console.log('WORK')
    $(this).hide('');
    completeTask();
};

function completeTask() {
    let taskId = $(this).closest('tr').data('id');
    console.log('taskId', taskId)

    // let complete = $(this).closest('tr').data('complete');
    // console.log('complete', complete)

    // if (complete === false || complete === null) {
    //     complete = true;
    // }
    // else if (complete === true || complete === null) {
    //     complete = false;
    // }
    $.ajax({
        type: 'PUT',
        url: `/tasks/${taskId}`,
        // data: {complete: complete}
    }).then((res) => {
        console.log(res)
        getTaskData();
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
            console.log('append', response)
            $('#taskTableBody').append(`
                <tr id="greenBackground" class= "grayBackground" data-complete="${response[i].complete}" data-id="${response[i].id}">
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
        complete: false
    }
    $.ajax({
        type: 'POST',
        url: '/tasks',
        data: postTask
    }).then( function (response) {
        console.log('Response', response)
        getTaskData();
        $('#taskInput').val('')
    });
};