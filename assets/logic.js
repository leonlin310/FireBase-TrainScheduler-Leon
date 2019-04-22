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

//DONE: Grab info from the Firebase then append to the HTML
database.ref().on("child_added", function (child) {
    console.log(child.val());

    var trainPulledVal = child.val().Name; 
    var destinationPulledVal = child.val().Destination; 
    var startTimePulledVal = child.val().TrainTime; 
    var frequencyPulledVal = child.val().Frequency;
    var currentTime = moment();
    var currentTimeFormat = moment().format("HHmm");
    //Done: save the time in military time
    var timeFormat = "HHmm"
    var convertedTime = moment(startTimePulledVal, timeFormat);
    var futureConvertedTime = convertedTime.diff(currentTime, "minutes");

    //Begin logic statements here
    //Get the remainder of time from 'now' and the first train
    var differenceTime = convertedTime.diff(currentTime, "minutes")*-1;
    console.log("Difference between now entered time", differenceTime);

    //get the remainder using %. Ex 10 divided by 3 = 3 with remaidner of 1. % finds
    var remainderCalc = differenceTime % frequencyPulledVal
    console.log("Math Difference", remainderCalc);

    //subtract the remainder from the frequency and store in a variable
    var untilArrival = frequencyPulledVal - remainderCalc
    console.log("until arrival is:", untilArrival);
    
    futureTrainTime = currentTime.add(untilArrival, "m").format("HH:mm")
    console.log("future train time:" + futureTrainTime);

 

    // iF STATEMENT
        if (startTimePulledVal <= currentTimeFormat ) {
            console.log("Start time is less than current time");
            var tableRow = $("<tr>").append(
                $("<td>").text(trainPulledVal),
                $("<td>").text(destinationPulledVal),
                $("<td>").text(frequencyPulledVal),
                $("<td>").text(futureTrainTime),
                $("<td>").text(untilArrival)
            )
            $("tbody").append(tableRow);
        }

        else{
            console.log("Start time is in the future");

            var tableRow = $("<tr>").append(
                $("<td>").text(trainPulledVal),
                $("<td>").text(destinationPulledVal),
                $("<td>").text(frequencyPulledVal),
                $("<td>").text(startTimePulledVal),
                $("<td>").text(futureConvertedTime),
                console.log("futureconverted time is: ", futureConvertedTime)
            )
            $("tbody").append(tableRow);
        }

});


