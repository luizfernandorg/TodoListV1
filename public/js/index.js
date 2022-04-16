//jshint esversion:8

/* make a post-call to the API to insert the new task
 * and then inject the new line inside the unordered list
*/
$("form").on("submit", (e) => {
    e.preventDefault();
    const url = e.target.action;
    const value = $("#newItem").val();
    
    if(value === ""){
        return false;
    }else{
        console.log(value)
        $.post(
            url,
            { 'item': value },
            (data) => {
                console.log(data)
                $("ul").append(`<li id="item${data.item.id}" key='${data.item.id}'><span>${data.item.item}</span> <span><a href='#' onClick="removeLine('item${data.item.id}')"><span class="material-icons">delete</span></a> <a href="#" onClick="editIt('item${data.item.id}')"><span class="material-icons">edit</span></a></span></li>`);
            }
        );
    }
});
function removeLine(item){
    console.log(item)
    const url = '/removeTask'
    const key = $(`#${item}`).attr("key")
    $.post(
        url,
        { 'id': key },
        (data) => {
            console.log("removeLine")
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
    console.log("Edit")
    console.log(item)
    const textForInput = $(`#${item}`).text().split("delete")[0].trim();
    console.log(textForInput)
    $(`#${item}`).html(`<input type='text' id="edited" value="${textForInput}"><button id="save" onClick="changeValue('${item}')"><span class="material-icons">check</span></button>`);
}

// triggered by the save button. Will adapt the li with the new value
function changeValue(item){
    console.log(item)
    const url = '/updateTask'
    const key = $(`#${item}`).attr("key")
    const textEdited = $("#edited").val();
    $.post(
        url,
        {'id': key, 'item':textEdited},
        (data) => {
            console.log("changeValue")
            console.log(data.status)
        }
    )
    $(`#${item}`).html(`<span>${textEdited}</span> <span><a href='#' onClick="removeLine('${item}')"><span class="material-icons">delete</span></a> <a href="#" onClick="editIt('${item}')"><span class="material-icons">edit</span></a></span>`);
}