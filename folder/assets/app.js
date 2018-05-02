$(document).ready(function(){

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

      var database= firebase.database()
      
      database.ref().on("value", function(snapshot) {
          console.log(snapshot.val())
      });
      $("#button").on("click", function(event){
        event.preventDefault();
        // console.log(event)
        var name= $("#name").val()
        var destination= $("#destination").val()
        var firstTrainTime=$("#firsttraintime").val()
        var frequency=$("#frequency").val()
        console.log(name, destination, firstTrainTime, frequency)
        var trainObject={
            name:name,
            destination:destination,
            firstTrainTime: firstTrainTime,
            frequency: frequency
        }
        console.log(trainObject)
        database.ref("/trains").push(trainObject)
      });

      
});

//connect firebase+
// connect to moment.js
// get the table to populate with information from the form (dynamiclly) on.click
// dynamiclly add times
// calculate when the next train will arrive;this should be relative to the current time.
// Users from many different machines must be able to view same train times.
// 
// 