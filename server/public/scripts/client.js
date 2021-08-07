$(document).ready(onReady);

function onReady() {
    $('#postBtn').on('click', postTasks)
    $(document).on('click','.deleteBtn', deleteTask )
    getTaskData();
};

function deleteTask(){
    // console.log('Delete Button working..', $(this))
    // $(this).parent().parent().remove();
    const taskId = $(this).closest('tr').data('id')
    $.ajax({
        type: 'DELETE',
        url: `/tasks/${taskId}`,
    }).then(function(res) {
        console.log(res)
        getTaskData();
    })
};
// get artist data from the server
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
                <tr data-id="${response[i].id}">
                    <td>${response[i].task}</td>
                    <td>${response[i].date}</td>

                    <td><button class="completeBtn">Complete</button></td>
                    <td><button class="deleteBtn">Delete</button></td>
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