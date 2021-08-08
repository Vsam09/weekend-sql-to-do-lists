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
    let complete = $(this).data('complete')
        if ( complete === complete)
            console.log('true', complete)
        else{
            console.log('false')
        }
    $.ajax({
        type: 'BOOLEAN',
        url: '/tasks'
    }).then(function(res) {
        console.log(res)
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
                <tr id="greenBackground" data-id="${response[i].id}">
                    <td>${response[i].task}</td>
                    <td>${response[i].date}</td>

                    <td><button class="completeBtn">Complete</button></td>
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
    }
    $.ajax({
        type: 'POST',
        url: '/tasks',
        data: postTask
    }).then( function (response) {
        $('#taskInput').val(''),
        $('#dateInput').val('')
        getTaskData();
    });
};