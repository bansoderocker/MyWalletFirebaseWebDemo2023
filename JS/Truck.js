let UniqueIDkey = '';
let childName = 'truck';
var truckGridList = [];
$(document).ready(function () {

    if (sessionStorage.length > 0) {
        UniqueIDkey = sessionStorage.getItem('key');

        if (UniqueIDkey != undefined && UniqueIDkey != '') {

            if (!firebase.apps.length) {
                firebase.initializeApp(firebaseConfig);
            }
            //firebase.initializeApp(firebaseConfig);
            db = firebase.database();
            db.ref('truck/' + UniqueIDkey + '/').on('value', function (snapshot) {
                var childData = snapshot.val();
                gridTripList = [];
                gridTripList.push(childData);
                //snapshot.forEach(function (childSnapshot) {
                //  var childData = childSnapshot.val();
                console.log("dATA : "); console.log(childData.TruckNumber);
                setValueById("txtTruckNumber", childData.TruckNumber);
                $("#btnAddEditTruck").val("Update Truck");
                // });
                //gridBind();
            });
        }
    }

    getTruckList();
    //fn_truckGridBind();
});

function getTruckList() {
    //   firebase.initializeApp(firebaseConfig);
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }
    db = firebase.database();
    db.ref(childName + "/").on('value', function (snapshot) {
        var x = snapshot.val();
        truckGridList = [];
        snapshot.forEach(function (childSnapshot) {
            var childData = childSnapshot.val();
            truckGridList.push(childData);
        });
        console.log(truckGridList);
        fn_truckGridBind();
    });
}

function fn_truckGridBind() {
    var tableString = "";
    tableString += "<div class='col-md-2'> </div> <div class='col-md-1'> Truck No </div>";
    tableString += "<div class='col-md-4'></div> <div class='col-md-1'></div><div class='col-md-2'></div> <div class='col-md-1'>Action</div>";
    tableString += "<hr/>";

    let TotalAmount = 0;
    let ExpenseFinal = 0;
    for (var i = 0; i < truckGridList.length; i++) {
        tableString += '<div class="col-md-2"></div>';
        tableString += '<div class="col-md-1">' + truckGridList[i].TruckNumber + '</div>';
        tableString += '<div class="col-md-4"></div>';
        tableString += '<div class="col-md-1"></div>';
        tableString += '<div class="col-md-2"></div>';
        tableString += '<div class="col-md-1">';
        tableString += '<input type="button" value="edit" id="' + truckGridList[i].key.trim();
        tableString += '"onclick="fn_AddEditTruck(this)" /></div>';
        tableString += '<hr/>';

        console.log(tableString);
    }
    // console.log(tableString);
    $('#trucktable').html(tableString);

}

function saveTruckDetailsToFirebase() {

    if (sessionStorage.length > 0) {
        UniqueIDkey = sessionStorage.getItem('key');
    } else {
        UniqueIDkey = "truck-" + new Date().getTime().toString();
    }
    var data = {}
    data.TruckNumber = getValueById(txtTruckNumber).toString().toUpperCase();
    data.CreatedOn = getCurrentDateTime();
    data.key = UniqueIDkey;

    if (fn_checkFormDataIsValidate(data)) {
        //     if (TripId != undefined && TripId != '') {
        // data.key = TripId;
        db.ref("/" + childName).child(UniqueIDkey).set(data);
        // }
        // } else {
        //     db.ref("/Trip").child(UniqueIDkey).set(data);
        // }
        console.log(data)
        alert("Truck Data added successfully");
        setValueById("txtTruckNumber", '');
        sessionStorage.clear();
        window.open('../MyWalletFirebaseWebDemo2023/TruckList.html', '_self');
    }
}
function fn_checkFormDataIsValidate(data) {
    if (data == undefined) {
        alert("please try after some time");
        return;
    } else if (data.TruckNumber.length < 4) {
        alert("Please enter valid truck number");
        return;
    }
    return true;
}

function fn_AddEditTruck(key) {

  
    if (key) {
        sessionStorage.setItem('key', key.id);
        UniqueIDkey = key.id;
        db.ref('truck/' + UniqueIDkey + '/').on('value', function (snapshot) {
            var childData = snapshot.val();
            gridTripList = [];
            gridTripList.push(childData);
            //snapshot.forEach(function (childSnapshot) {
            //  var childData = childSnapshot.val();
            console.log("dATA : "); console.log(childData.TruckNumber);
            setValueById("txtTruckNumber", childData.TruckNumber);
            $("#btnAddEditTruck").val("Update Truck");
            // });
            //gridBind();
        });
    } else {
        sessionStorage.clear();
        setValueById("txtTruckNumber", "");
        $("#btnAddEditTruck").val("Add Truck");
    }
    window.open("../MyWalletFirebaseWebDemo2023/TruckList.html#popup1", '_self')

}