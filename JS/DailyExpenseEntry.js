var isExpanseGridVisible = true;
var ExpenseList = [];
var TripId = '';
var hdnExpenseId = 0;
$(document).ready(function () {
    var now = new Date();
    var day = ("0" + now.getDate()).slice(-2);
    var month = ("0" + (now.getMonth() + 1)).slice(-2);
    var today = now.getFullYear() + "-" + (month) + "-" + (day);
    setValueById("txtTripDate", today);
    if (sessionStorage.length > 0) {
        TripId = sessionStorage.getItem('key');
        if (TripId != undefined && TripId != '') {
            if (!firebase.apps.length) {
                firebase.initializeApp(firebaseConfig);
            }
            db = firebase.database();
            db.ref('Trip/' + TripId + '/').on('value', function (snapshot) {
                var childData = snapshot.val();
                gridTripList = [];
                gridTripList.push(childData);
                //snapshot.forEach(function (childSnapshot) {
                //  var childData = childSnapshot.val();
                console.log("dATA : "); console.log(childData.TruckNumber);
                setValueById("txtTruckNumber", childData.TruckNumber);
                setValueById("txtPartyName", childData.PartyName);
                setValueById("txtTripDate", childData.TripDate);
                setValueById("txtParticular", childData.Particular);
                setValueById("txtTripAmount", childData.TripAmount);
                setValueById("txtTripExpense", childData.ExpenseOther);
                $("#btnAddEditTrip").val("Update Trip")
                ExpenseList = JSON.parse(childData.Expense);
                DisplayExpenseGrid();

                // });
                //gridBind();
            });
        }
    }

});

function AddExpenseInGrid() {

    var ExpenseTitle = $('#txtExpenseTitle').val().trim();
    var ExpenseAmount = $('#txtExpenseAmount').val();

    $('#txtExpenseTitle').val(ExpenseTitle)
    if (ExpenseTitle == '') {
        alert("Please Enter Expense Title");
        return;
    }
    else if (ExpenseAmount == '') {
        alert("Please Enter Expense Amount");
        return;
    } else if (ExpenseList.length > 0) {
        for (var i = 0; i < ExpenseList.length; i++) {
            if (ExpenseList[i].ExpenseTitle.includes(ExpenseTitle)) {
                alert(ExpenseTitle + " is Already Exists");
                return;
            }
        }
    }
    if (hdnExpenseId == 0) {
        var temp = {};
        temp.Id = ExpenseList.length + 1;
        temp.ExpenseTitle = ExpenseTitle.toString().toUpperCase();
        temp.ExpenseAmount = ExpenseAmount;
        ExpenseList.push(temp);
    } else {
        ExpenseList[hdnExpenseId].ExpenseTitle = ExpenseTitle.toString().toUpperCase();
        ExpenseList[hdnExpenseId].ExpenseAmount = ExpenseAmount;
    }
    DisplayExpenseGrid();
    $('#txtExpenseTitle').val('')
    $('#txtExpenseAmount').val('');
    hdnExpenseId = 0;
}
function AddEditExpense(id) {

    $('#ExpenseEdit' + id).css("display", "none");
    var x = ExpenseList.filter(function (element) { return element.Id == id; })
    $('#txtExpenseTitle').val(x[0].ExpenseTitle);
    $('#txtExpenseAmount').val(x[0].ExpenseAmount);
    hdnExpenseId = id;

}
function UpdateExpense(id) {
    $('#ExpenseSave' + id).css("display", "none");
    $('#ExpenseEdit' + id).css("display", "");
}


function DisplayExpenseGrid() {

    var tableString = "";
    tableString += "<div class='row'><div class='col-md-3'> Expense </div> <div class='col-md-3'> Amount </div>";
    tableString += "<div class='col-md-3'>Action</div> <div class='col-md-3'></div>";

    let TotalExpenseAmount = 0;
    for (var i = 0; i < ExpenseList.length; i++) {
        tableString += "<div class='col-md-3'> <input type='text' id='ExpenseTitle" + ExpenseList[i].Id + "' value='" + ExpenseList[i].ExpenseTitle + "' readonly/> </div> ";
        tableString += "<div class='col-md-3'> <input type='number' id='ExpenseAmount" + ExpenseList[i].Id + "' value='" + ExpenseList[i].ExpenseAmount + "' readonly/> </div>";
        tableString += "<div class='col-md-3'><input type='button' class='btn btn-secondary' id='ExpenseEdit" + ExpenseList[i].Id + "' value='edit' onclick='AddEditExpense(" + ExpenseList[i].Id + ")'/>";
        tableString += "<input type='button' class='btn btn-primary' id='ExpenseSave" + ExpenseList[i].Id + "' value='Save' onclick='UpdateExpense(" + ExpenseList[i].Id + ")' style='display: none;'/> </div> <div class='col-md-3'></div>";
        TotalExpenseAmount = TotalExpenseAmount + parseFloat(ExpenseList[i].ExpenseAmount);
        $('#txtTotalExpenseAmount').val(TotalExpenseAmount);
    }
    tableString += "</div>";
    // console.log(tableString);
    //  $('#gridExpanse').html(tableString);

    var tblString = ""
    tblString += "<tr><td> Expense </td> <td> Amount </td>";
    tblString += "<td>Action</td></tr>";
    for (var i = 0; i < ExpenseList.length; i++) {
        tblString += "<tr>"
        tblString += "<td> " + ExpenseList[i].ExpenseTitle + "</td> ";
        tblString += "<td> " + ExpenseList[i].ExpenseAmount + "</td>";
        tblString += "<td> <input type='button' class='btn btn-secondary' id='ExpenseEdit" + ExpenseList[i].Id + "' value='edit' onclick='AddEditExpense(" + ExpenseList[i].Id + ")'/>";
        tblString += "<input type='button' class='btn btn-primary' id='ExpenseSave" + ExpenseList[i].Id + "' value='Save' onclick='UpdateExpense(" + ExpenseList[i].Id + ")' style='display: none;'/> </td></tr>";
        TotalExpenseAmount = TotalExpenseAmount + parseFloat(ExpenseList[i].ExpenseAmount);
        $('#txtTotalExpenseAmount').val(TotalExpenseAmount);
    }

    $("#tblExpense").html(tblString);

}
function saveTripDetailsToFirebase() {

    // var ExpenseUniqueIDkey = "exp_" + new Date().getTime().toString();
    var TripUniqueIDkey = "trip" + new Date().getTime().toString();

    var data = {}
    data.TruckNumber = getValueById(txtTruckNumber);
    data.PartyName = getValueById(txtPartyName);
    data.TripDate = getValueById(txtTripDate);
    data.Particular = getValueById(txtParticular);
    data.TripAmount = parseFloat(getValueById(txtTripAmount) == "" ? 0 : getValueById(txtTripAmount));
    data.ExpenseOther = parseFloat(getValueById(txtTripExpense) == "" ? 0 : getValueById(txtTripExpense));
    data.ExpenseTotal = parseFloat(getValueById(txtTotalExpenseAmount) == "" ? 0 : getValueById(txtTotalExpenseAmount));
    data.ExpenseFinal = (parseFloat(data.ExpenseOther) + parseFloat(data.ExpenseTotal));
    data.CreatedOn = getCurrentDateTime();
    data.key = TripUniqueIDkey;
    data.Expense = JSON.stringify(ExpenseList);
    if (checkFormDataIsValidate(data)) {
        if (TripId != undefined && TripId != '') {
            data.key = TripId;
            db.ref("/Trip").child(TripId).set(data);
        } else {
            db.ref("/Trip").child(TripUniqueIDkey).set(data);
        }
        console.log(data)
        alert("added successfully");
        setValueById("txtTruckNumber", '');
        setValueById("txtPartyName", '');
        setValueById("txtTripDate", '');
        setValueById("txtParticular", '');
        setValueById("txtTripAmount", '');
        setValueById("txtTripExpense", '');
        ExpenseList = [];
        $('#gridExpanse').html('');

        // $("#txtPartyName").val("");
        // $("#txtPageNo").val("");
    }
}

function checkFormDataIsValidate(data) {
    if (data == undefined) {
        alert("please try after some time");
        return;
    } else if (data.TruckNumber.length < 4) {
        alert("Please enter valid truck number");
        return;
    } else if (data.PartyName.length < 4) {
        alert("Please enter valid Party Name");
        return;
    } else if (data.Particular.length < 4) {
        alert("Please enter valid particular");
        return;
    } else if (parseInt(data.TripAmount > 0)) {
        alert("Please enter valid trip Amount");
        return;
    }
    return true;
}

