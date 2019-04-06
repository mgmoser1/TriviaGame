$(document).ready(function trivia() {
    // GLOBAL VARIABLES //
    var questions = [
        {
            question: "Who painted <em>Guernica</em>?",
            choices: ["Wassily Kandinsky", "Pablo Picasso", "Salvador Dali", "Jeff Koons"],
            rightAns: "Pablo Picasso",
            image: "assets/images/guernica.jpg"
        },
        {
            question: "Who sculpted <em>The Kiss</em>?",
            choices: ["Jean Michel Basquiat", "Wassily Kandinsky", "Henri Matisse", "Constantin Brancusi"],
            rightAns: "Constantin Brancusi",
            image: "assets/images/the-kiss.jpg"
        },
        {
            question: "Who created the cut out painting <em>Icarus</em>?",
            choices: ["Frida Kahlo", "Roy Lichtenstein", "Salvador Dali", "Henri Matisse"],
            rightAns: "Henri Matisse",
            image: "assets/images/icarus.jpg"

        },
        {
            question: "Who painted <em>In the Car</em>?",
            choices: ["Roy Lichtenstein", "Henri Matisse", "Paul Cezanne", "Constantin Brancusi"],
            rightAns: "Roy Lichtenstein",
            image: "assets/images/in-the-car.jpg"

        },
        {
            question: "Who painted <em>The Son of Man</em>?",
            choices: ["Wassily Kandinsky", "Roy Lichtenstein", "Henri Matisse", "Rene Magritte"],
            rightAns: "Rene Magritte",
            image: "assets/images/the-son-of-man.jpg"

        },
        {
            question: "Who painted <em>Two Heads on Gold</em>?",
            choices: ["Pablo Picasso", "Jean Michel Basquiat", "Wassily Kandinsky", "Frida Kahlo"],
            rightAns: "Jean Michel Basquiat",
            image: "assets/images/two-heads-on-gold.jpg"

        },
        {
            question: "Who painted <em>Composition 8</em>?",
            choices: ["Rene Magritte", "Jean Michel Basquiat", "Wassily Kandinsky", "Salvador Dali"],
            rightAns: "Wassily Kandinsky",
            image: "assets/images/composition-8.jpg"

        },
        {
            question: "Who painted <em>Apples and Oranges</em>?",
            choices: ["Rene Magritte", "Frida Kahlo", "Pablo Picasso", "Paul Cezanne"],
            rightAns: "Paul Cezanne",
            image: "assets/images/apples-and-oranges.jpg"

        },
        {
            question: "Who sculpted <em>Cloud Gate</em>?",
            choices: ["Constantin Brancusi", "Jean Michel Basquiat", "Anish Kapoor", "Paul Cezanne"],
            rightAns: "Anish Kapoor",
            image: "assets/images/cloud-gate.jpg"

        },
        {
            question: "Who sculpted <em>Balloon Dog</em>?",
            choices: ["Jeff Koons", "Jean Michel Basquiat", "Anish Kapoor", "Paul Cezanne"],
            rightAns: "Jeff Koons",
            image: "assets/images/balloon-dog.jpg"

        }


    ];

    var rightCount = 0;
    var wrongCount = 0;
    var numTimeOuts = 0;
    var countDown = 10;

    var currentQuestion = "";
    var currentChoices = [];
    var currentCorrect = "";
    var currentImage = "";

    var $startButton = $('<button id="start-btn">').html("Start");
    var timer; // holds the setIterval for the 10 sec delay.
    var showTimer; // holds the setInterval for the 1 second decrement.
    var pause; // holds the setInterval for the 3 second pause between questions.
    var timeRemaining = $("<h2>").html("Time Remaining: " + countDown + " Seconds");

    // FUNCTIONS //



    function createButton(array) {
        for (var i = 0; i < array.length; i++) {
            var btn = $("<button class='response'>").text(array[i]);
            btn.attr("data-name", array[i]);
            $("#row3").append(btn);
        }
    }

    $("#row1").empty();
    $("#row2").append($startButton);
    $("#row3").empty();

    // START BUTTON CLICK //
    $("#start-btn").on('click', function () {


        // FUNCTIONS //

        function reset() {
            trivia();
        }

        function stop() {
            clearInterval(showTimer);
            countDown = 10;
            pause = setInterval(run, 3000);
        }

        function timeOut() {
            clearInterval(timer);
            clearInterval(showTimer);
            numTimeOuts++;
            quesCount++;
            // console.log(quesCount);
            // console.log(numTimeOuts);
            var $correctNotice = $("<p>").html("The right answer was " + currentCorrect + ".");
            var $timeUpNotice = $("<h3>").html("Time's up!");
            $("#row2").empty();
            $("#row3").empty();
            $("#row2").append($timeUpNotice);
            $("#row3").append($correctNotice);
            $("#row3").append("<img src=" + currentImage + ">");
            stop();
        }

        function run() {
            clearInterval(timer);
            clearInterval(pause);
            clearInterval(showTimer);
            countDown = 10;
            timeRemaining = $("<h2>").html("Time Remaining: " + countDown + " Seconds");  // Not working?
            timer = setInterval(timeOut, (1000 * 10));
            showTimer = setInterval(decrement, 1000);
            fillQuestion();
        }

        function decrement() {
            countDown--;
            timeRemaining = $("<h2>").html("Time Remaining: " + countDown + " Seconds");
            $("#row1").empty();
            $("#row1").append(timeRemaining);
            if (countDown < 0) {
                stop();
            }
        }

        function fillQuestion() {

            if (quesCount < questions.length) {
                currentQuestion = questions[quesCount].question;
                currentChoices = questions[quesCount].choices;
                currentCorrect = questions[quesCount].rightAns;
                currentImage = questions[quesCount].image;
                $("#row2").empty();
                $("#row2").append(currentQuestion);
                $("#row3").empty();
                createButton(currentChoices);

            } else {
                clearInterval(timer);
                clearInterval(pause);
                clearInterval(showTimer);

                var $rightNotice = $("<h3>").html("Right: " + rightCount);
                var $wrongNotice = $("<h3>").html("Wrong: " + wrongCount);
                var $numTimeOuts = $("<h3>").html("Not Answered: " + numTimeOuts);

                $("#row1").empty();
                $("#row2").empty();
                $("#row3").empty();
                $("#row1").append("<h2>").html("Here's how you did:");
                $("#row2").append($rightNotice);
                $("#row2").append($wrongNotice);
                $("#row2").append($numTimeOuts);
                $("#row3").append($startButton);

                $($startButton).on("click", reset());
            }

        }
        // ACTION
        var quesCount = 0;
        run();

        // console.log(currentQuestion);
        // console.log(currentChoices);


        // RESPONSE CLICK //
        $(document).on('click', '.response', function () {
            clearInterval(timer);
            //stop();
            // console.log(this);
            var input = $(this).attr('data-name');
            console.log(input);
            var $correctNotice = $("<p>").html("The right answer was " + currentCorrect + ".");

            if (input === currentCorrect) {
                // correct
                rightCount++;
                quesCount++;
            //    console.log(quesCount);
            //    console.log(rightCount);
                var $correctAns = $("<h3>").html("That's right!");
                $("#row2").empty();
                $("#row3").empty();
                $("#row2").append($correctAns);
                $("#row3").append($correctNotice);
                $("#row3").append("<img src=" + currentImage + ">");
                stop();

            } else {
                // wrong
                wrongCount++;
                quesCount++;
            //    console.log(quesCount);
                var $wrongAns = $("<h3>").html("Sorry!");
                $("#row2").empty();
                $("#row3").empty();
                $("#row2").append($wrongAns);
                $("#row3").append($correctNotice);
                $("#row3").append("<img src=" + currentImage + ">");
                stop();

            }

        });

        // start button for loop. Should include calls to createButton, run, stop, pause, response onclick.
        // timeUp and response onclick should return right++, wrong++, or timeUp++. (?)

    });
});