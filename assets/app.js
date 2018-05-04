$(document).ready(function () {

    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyCOY-c7nIgzloHcjicS8hgAwCSA2tldCkU",
        authDomain: "train-scheduler-a99a1.firebaseapp.com",
        databaseURL: "https://train-scheduler-a99a1.firebaseio.com",
        projectId: "train-scheduler-a99a1",
        storageBucket: "train-scheduler-a99a1.appspot.com",
        messagingSenderId: "172491776511"
    };
    firebase.initializeApp(config);

    var database = firebase.database()

    database.ref("/trains").on("child_added", function (snapshot) {
        var trainObject = snapshot.val()
        console.log(trainObject)

        var table = $("<tr>")
        var name = $("<td>").text(trainObject.name)
        var destination = $("<td>").text(trainObject.destination)
        var nextArrival = $("<td>")
        var frequency = $("<td>").text(trainObject.frequency)
        var minutesAway = $("<td>")

        table.append(name)
        table.append(destination)
        table.append(nextArrival)
        table.append(frequency)
        table.append(minutesAway)
        $("#tbody").append(table)
    });

    $("#button").on("click", function (event) {
        event.preventDefault();
        // console.log(event)
        var name = $("#name").val()
        var destination = $("#destination").val()
        var firstTrainTime = $("#firsttraintime").val()
        var frequency = $("#frequency").val()
        console.log(name, destination, firstTrainTime, frequency)
        var trainObject = {
            name: name,
            destination: destination,
            firstTrainTime: firstTrainTime,
            frequency: frequency
        }
        console.log(trainObject)
        database.ref("/trains").push(trainObject)

        var frequency = "3";

        var firstTrainTime = "02:00";

        var firstTimeConverted = moment(firstTrainTime, "HH:mm").subtract(1, "years");
        console.log(firstTimeConverted);

        var currentTime = moment();
        console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

        var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
        console.log("DIFFERENCE IN TIME: " + diffTime);

        var remainingTime = diffTime % frequency;

        var minutesAway = frequency - remainingTime;
        console.log("MINUTES TILL TRAIN: " + minutesAway);

        var nextArrival = moment().add(minutesAway, "minutes");
        console.log("ARRIVAL TIME: " + moment(nextArrival).format("hh:mm"));
    });

});
