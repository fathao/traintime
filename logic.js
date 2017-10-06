// $(document).ready(function() {


            //skip firebase for now. WIll create one when google fixed the issue.

            // try to set up the button function now.

            // Initialize Firebase
            var config = {
                apiKey: "AIzaSyCBNFkreYh0_zYMlm9N9CcxZip47Ds-MzU",
                authDomain: "train-schedule-6e7c2.firebaseapp.com",
                databaseURL: "https://train-schedule-6e7c2.firebaseio.com",
                projectId: "train-schedule-6e7c2",
                storageBucket: "",
                messagingSenderId: "1006663779580"
            };
            firebase.initializeApp(config);

            var database = firebase.database();





            $("#add-train").on("click", function(event) {

                event.preventDefault();


                var trainName = $("#name-input").val().trim();
                var destination = $("#destination-input").val().trim();
                // var firstTrainTimeInput = moment($("#time-input").val().trim(), "hh:mm");
                var firstTrainTimeInput = $("#time-input").val().trim();

                var firstTrainTimeConverted = moment(firstTrainTimeInput, "hh:mm").subtract(1, "years");
                var frequencyInput = $("#frequency-input").val().trim(),

                    //this is why my earlier activities were not working bcause i did not have a temp holder.
                    tempHolder = {
                        name: trainName,
                        destination: destination,
                        firstTrainTimeInput: firstTrainTimeInput,
                        frequency: frequencyInput
                    };


                database.ref().push(tempHolder);

                console.log(trainName.name);
                console.log(destination.destination);
                console.log(firstTrainTimeInput.firstTrainTimeInput);
                console.log(frequencyInput.frequency);

                alert("train added");
                //clearout inputs

                $("#name-input").val("");
                $("#destination-input").val("");
                $("#time-input").val("");
                $("#frequency-input").val("");

            });



            database.ref().on("child_added", function(childSnapshot, preChildkey) {

                console.log(childSnapshot.val());

                //these are firebase inputs...
                var trainName = childSnapshot.val().name;
                var destination = childSnapshot.val().destination;
                var firstTrainTimeConverted = childSnapshot.val().firstTrainTimeConverted;
                var frequency = childSnapshot.val().frequency;

                console.log(trainName);
                console.log(destination);
                // console.log(firstTrainTimeInput);
                console.log(frequency);
                //make sure they have something inside

                var diffTime = moment().diff(moment(firstTrainTimeConverted), "minutes");
                var timeRemainder = parseInt(diffTime) % parseInt(frequency);
                var minutes = parseInt(frequency) - parseInt(timeRemainder);


                var nextArrival = moment().add(minutes, "m")
                    .format("hh:mm A");

                console.log(diffTime);
                console.log(timeRemainder);
                console.log(minutes);
                console.log(nextArrival);

                $("#train-schedule > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + frequency + " mins" + "</td><td>" + nextArrival + "</td><td>" + minutes + "</td></tr>");


            }, 
            function(errorObject) {
                console.log("Errors handled: " + errorObject.code);

            });
        // });