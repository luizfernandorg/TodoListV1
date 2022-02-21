//jshint esversion:8
let counter = 0;

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
        $.post(
            url,
            { 'item': value },
            (data) => {
                counter++;
                $("ul").append(`<li id="item${counter}"><span>${data.item}</span> <span><a href='#' onClick="removeLine('item${counter}')">delete</a> <a href="#" onClick="editIt('item${counter}')">edit</a></span></li>`);
                $("#newItem").val("");
            }
        );
    }
});
function removeLine(item){
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
    $(`#${item}`).html(`<input type='text' id="edited" value="${textForInput}"><button id="save" onClick="changeValue('${item}')">Save</button`);
}

// triggered by the save button. Will adapt the li with the new value
function changeValue(item){
    const textEdited = $("#edited").val();
    $(`#${item}`).html(`<span>${textEdited}</span> <span><a href='#' onClick="removeLine('${item}')">delete</a> <a href="#" onClick="editIt('${item}')">edit</a></span>`);
}