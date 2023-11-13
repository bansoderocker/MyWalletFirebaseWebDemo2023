
var gridTripList = [];
$(document).ready(function () {
    var now = new Date();
    var day = ("0" + now.getDate()).slice(-2);
    var month = ("0" + (now.getMonth() + 1)).slice(-2);
    var today = now.getFullYear() + "-" + (month) + "-" + (day);
    setValueById("txtTripDate", today);
    console.log(sessionStorage);
    if (sessionStorage.length > 0) {
        TripId = sessionStorage.getItem('key');
        if (TripId != undefined && TripId != '') {
            if (!firebase.apps.length) {
                firebase.initializeApp(firebaseConfig);
            } db = firebase.database();
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
    } else {
        setValueById("txtTruckNumber", '');
        setValueById("txtPartyName", '');
        setValueById("txtTripDate", '');
        setValueById("txtParticular", '');
        setValueById("txtTripAmount", '');
        setValueById("txtTripExpense", '');
        ExpenseList = [];
        $('#gridExpanse').html('');
    }
    getTripList();
    gridBind();
});

function getTripList() {
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }

    db = firebase.database();
    db.ref("Trip/").on('value', function (snapshot) {
        var x = snapshot.val();
        gridTripList = [];
        snapshot.forEach(function (childSnapshot) {
            var childData = childSnapshot.val();
            gridTripList.push(childData);
            console.log(childData);
        });
        gridBind();
    });

}

function gridBind() {
    var tableString = "";
    tableString += "<div class='col-md-2'> Date </div> <div class='col-md-1'> Truck No </div>";
    tableString += "<div class='col-md-4'> Particular</div> <div class='col-md-1'>Amount</div><div class='col-md-2'>Expense</div> <div class='col-md-1'>Action</div>";
    tableString += "<hr/>";

    let TotalAmount = 0;
    let ExpenseFinal = 0;
    for (var i = 0; i < gridTripList.length; i++) {
        tableString += '<div class="col-md-2">' + gridTripList[i].TripDate + '</div>';
        tableString += '<div class="col-md-1">' + gridTripList[i].TruckNumber + '</div>';
        tableString += '<div class="col-md-4">' + gridTripList[i].Particular + '</div>';
        tableString += '<div class="col-md-1">' + gridTripList[i].TripAmount + '</div>';
        tableString += '<div class="col-md-2">' + gridTripList[i].ExpenseFinal + '</div>';
        tableString += '<div class="col-md-1">';
        tableString += '<input type="button" value="edit" id="' + gridTripList[i].key.trim();
        tableString += '"onclick="AddEditTrip(this)" /></div>';
        tableString += '<hr/>';
        TotalAmount = TotalAmount + parseFloat(gridTripList[i].TripAmount);
        ExpenseFinal = ExpenseFinal + parseFloat(gridTripList[i].ExpenseFinal);
        console.log(tableString);
    }
    $('#txtTotalAmount').val(TotalAmount);
    $('#txtTotalExpense').val(ExpenseFinal);
    // console.log(tableString);
    $('#triptable').html(tableString);
}
function AddEditTrip(key) {
    debugger;
    if (key) {
        sessionStorage.setItem('key', key.id);
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
    } else {
        sessionStorage.clear();

    }

    window.open('../MyWalletFirebaseWebDemo2023/ExpenseEntryList.html#popup1', '_self');
}