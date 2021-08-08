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
    $(this).closest('tr').addClass('greenBackground')
    console.log('WORK')
    $(this).hide('');
    completeTask();
};

function completeTask() {
    let id = $(this).closest('tr').data('id');
    console.log('Id', id)

    // let complete = $(this).closest('tr').data('complete');
    // console.log('complete', complete)

    // if (complete === false || complete === null) {
    //     complete = true;
    // }
   
    $.ajax({
        type: 'PUT',
        url: `/tasks/${id}`
        // data: {complete: complete}
    }).then((res) => {
        console.log(res)
        getTaskData();
    }).catch((err) => {
        console.log('error in PUT', err);
    });
};

function deleteTask(){
    const taskId = $(this).closest('tr').data('id')
    $.ajax({
        type: 'DELETE',
        url: `/tasks/${taskId}`,
    }).then((res) => {
        console.log(res)
        getTaskData();
    }).catch((err) => {
        console.log('error in DELETE', err);
    });
};
// get task data from the server
function getTaskData() {
    $("#taskTableBody").empty();
    $.ajax({
        type: 'GET',
        url: '/tasks'
    }).then((res) => {
        console.log("Get Task", res);
        // append data to the DOM
        for (let i = 0; i < res.length; i++) {
            console.log('append', res)
            $('#taskTableBody').append(`
                <tr id="greenBackground" class= "grayBackground" data-complete="${res[i].complete}" data-id="${res[i].id}">
                    <td>${res[i].task}</td>
                    <td><button id="completeInput" class="completeBtn">Complete</button></td>
                    <td><button id="redBackground" class="deleteBtn">Delete</button></td>
                </tr>
            `);
        }
    }).catch((err) => {
        console.log('error in GET', err);
    });
};
function postTasks() {
    let postTask = {
        task: $('#taskInput').val(),
    }
    $.ajax({
        type: 'POST',
        url: '/tasks',
        data: postTask
    }).then((res) => {
        console.log('Response', res)
        getTaskData();
        $('#taskInput').val('')
    }).catch((err) => {
        console.log('error in POST', err);
    });
};