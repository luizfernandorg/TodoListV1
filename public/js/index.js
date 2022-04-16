//jshint esversion:8
let counter = 0;
/**
 * TODO:
 *  avoid use of counter, 
 *  the key and item should be 
 *  generate after insert the 
 *  new value in the back-end 
 *  and then retrieve the those 
 *  values back from the back-end
 */
/* make a post-call to the API to insert the new task
 * and then inject the new line inside the unordered list
*/
$("form").on("submit", (e) => {
    e.preventDefault();
    const url = e.target.action;
    const value = $("#newItem").val();
    $("ul").append(`<li id="item${counter}" key='${counter}'><span>${value}</span> <span><a href='#' onClick="removeLine('item${counter}')"><span class="material-icons">delete</span></a> <a href="#" onClick="editIt('item${counter}')"><span class="material-icons">edit</span></a></span></li>`);
    counter++;
    $("#newItem").val("");
    if(value === ""){
        return false;
    }else{
        $.post(
            url,
            { 'item': value },
            (data) => {
                console.log(data)
            }
        );
    }
});
function removeLine(item){
    const url = '/removeTask'
    const key = $(`#${item}`).attr("key")
    $.post(
        url,
        { 'id': key },
        (data) => {
            console.log(data.status)
        }
    );
    $(`#${item}`).remove();
}
/*
 * confirm if the input recieves caracters
 * and has the disabled attribute on the button
 * then removes the attribute disabled from the button
 */
$("#newItem").keyup((e) => {
    const text = $("#newItem").val();
    if(text !== "" && $("button[type='submit']").attr('disabled')){
        $("button[type='submit']").removeAttr("disabled");
    }
});

// Create the option to edit the task added
function editIt(item){
    const textForInput = $(`#${item}`).text().split("delete")[0].trim();
    $(`#${item}`).html(`<input type='text' id="edited" value="${textForInput}"><button id="save" onClick="changeValue('${item}')"><span class="material-icons">check</span></button>`);
}

// triggered by the save button. Will adapt the li with the new value
function changeValue(item){
    const url = '/updateTask'
    const key = $(`#${item}`).attr("key")
    const textEdited = $("#edited").val();
    $.post(
        url,
        {'id': key, 'item':textEdited},
        (data) => {
            console.log(data.status)
        }
    )
    $(`#${item}`).html(`<span>${textEdited}</span> <span><a href='#' onClick="removeLine('${item}')"><span class="material-icons">delete</span></a> <a href="#" onClick="editIt('${item}')"><span class="material-icons">edit</span></a></span>`);
}