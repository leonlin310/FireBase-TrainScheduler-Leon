//TODO: Initialize Firebase

var config = {
    apiKey: "AIzaSyAa11wV-YuiKv5h1RG2Y5tUN364eFzoR6Y",
    authDomain: "train-scheduler-assignme-69c39.firebaseapp.com",
    databaseURL: "https://train-scheduler-assignme-69c39.firebaseio.com",
    projectId: "train-scheduler-assignme-69c39",
    storageBucket: "train-scheduler-assignme-69c39.appspot.com",
    messagingSenderId: "403935769131"
};

firebase.initializeApp(config);
var database = firebase.database();


//DONE: Create an on click submit event
$("#submitButton").on("click", function () {
    //DONE: grab the values of info typed into fields and save to variable
    var trainVal = $("#trainNameField").val().trim();
    var destinationVal = $("#destinationField").val().trim();
    var startTimeVal = $("#startTimeField").val().trim();
    var frequencyVal = $("#frequencyField").val().trim();

    //DONE: create an object to push to the Firebase
    var trainObject = {
        Name: trainVal,
        Destination: destinationVal,
        TrainTime: startTimeVal,
        Frequency: frequencyVal
    };

    //DONE: push the variables to the Firebase
    database.ref().push(trainObject);

});

//TODO: Grab info from the Firebase then append to the HTML
database.ref().on("child_added", function (child) {
    console.log(child.val());

    var trainPulledVal = child.val().Name; 
    var destinationPulledVal = child.val().Destination; 
    var startTimePulledVal = child.val().TrainTime; 
    var frequencyPulledVal = child.val().Frequency;
    
    var tableRow = $("<tr>").append(
        $("<td>").text(trainPulledVal),
        $("<td>").text(destinationPulledVal),
        $("<td>").text(frequencyPulledVal),
        $("<td>").text("Next Arrival TBD"),
        $("<td>").text("Minutes Away TBD")
    )
    $("tbody").append(tableRow);
});




