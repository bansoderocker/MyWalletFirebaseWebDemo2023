
function getValueById(objectid) {
    return objectid.value;
}
function setValueById(objectid, dataValue) {
    $("#" + objectid).val(dataValue);
}


function getCurrentDateTime() {
    var date = new Date();
    var currentDateTime = ("00" + (date.getMonth() + 1)).slice(-2)
        + "/" + ("00" + date.getDate()).slice(-2)
        + "/" + date.getFullYear() + " "
        + ("00" + date.getHours()).slice(-2) + ":"
        + ("00" + date.getMinutes()).slice(-2)
        + ":" + ("00" + date.getSeconds()).slice(-2);
    return currentDateTime;
}
