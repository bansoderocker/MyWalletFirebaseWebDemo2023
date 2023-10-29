
var gridTripList = [];
$(document).ready(function () {
    getTripList();
    gridBind();
});

function getTripList() {
    firebase.initializeApp(firebaseConfig);
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
        tableString += '<input type="button" value="edit" id="'+gridTripList[i].key.trim();
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

    sessionStorage.setItem('key', key.id);
    window.open('DailyExpenseEntry.html');
}