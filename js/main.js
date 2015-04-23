$(document).ready(function() {

    var count = null;
    var counter = null;
	var highScore = 0;
    var currentScore = null;
	var gameActive = false;

    document.getElementById("answer").disabled = true;

	function timer() {
        count = count - 1;
        if (count < 0) {
            endGame();
            return;
        }

        document.getElementById("countdown").innerHTML = count;
    }

    function startGame() {

        gameActive = true;
        currentScore = 0;
        updateScore(currentScore);

        createQuestion();

        clearInterval(counter);
        count = 30;

        document.getElementById("answer").disabled = false;
        document.getElementById("answer").value = "";
        document.getElementById("countdown").innerHTML = count;
        counter = setInterval(timer, 1000);

        document.getElementById("answer").focus();

    }

    function updateScore(newScore) {
        document.getElementById("currentScore").innerHTML =
            newScore;
    }

    function createQuestion() {

		do {

	        maximumOperand = 10;

			existing = document.getElementById("equation").innerHTML;

	        operand1 = Math.round(Math.random() * maximumOperand);
	        operand2 = Math.round(Math.random() * maximumOperand);

	        document.getElementById("equation").innerHTML = operand1 +
		            "+" + operand2;

			next = document.getElementById("equation").innerHTML;

		} while (existing == next);

    }

    var f = new Function('x', 'y', 'return x+y');

    function evaluateAnswer() {

        if (gameActive) {

console.log(f(operand1, operand2).toString().length);
console.log(document.getElementById("answer").value.toString().length);

			var readyToEvaluate = f(operand1, operand2).toString().length == document.getElementById("answer").value.toString().length;

			console.log(readyToEvaluate);

            if (readyToEvaluate) {

				if (parseInt(document.getElementById("answer").value) == f(operand1, operand2)) {

				    var correctSound = document.createElement("audio");
				    correctSound.src="sounds/VideoRecord.ogg";
				    correctSound.volume=1;
				    correctSound.autoPlay=false;
				    correctSound.preLoad=true;       

			        correctSound.play();

	                currentScore++;
	                updateScore(currentScore);

	            } else {

				    var incorrectSound = document.createElement("audio");
				    incorrectSound.src="sounds/VideoStop.ogg";
				    incorrectSound.volume=1;
				    incorrectSound.autoPlay=false;
				    incorrectSound.preLoad=true;

			        incorrectSound.play();

				}	

	            document.getElementById("answer").value = "";

	            createQuestion();
	            document.getElementById("answer").focus();
	
			} 

        }

    }

    function endGame() {

		if (gameActive) {

	        document.getElementById("countdown").innerHTML = 0;
	        clearInterval(counter);
	        gameActive = false;
	        document.getElementById("answer").disabled = true;
	        document.getElementById("equation").innerHTML = "Complete!";

	        if (currentScore > highScore) {
	
			    var highScoreSound = document.createElement("audio");
			    highScoreSound.src="sounds/dimension.ogg";
			    highScoreSound.volume=1;
			    highScoreSound.autoPlay=false;
			    highScoreSound.preLoad=true;

				highScoreSound.play();

	            highScore = currentScore;
	            document.getElementById("highScore").innerHTML =
	                highScore;
	
	        } else {

			    var gameOverSound = document.createElement("audio");
			    gameOverSound.src="sounds/Positive.mp3";
			    gameOverSound.volume=1;
			    gameOverSound.autoPlay=false;
			    gameOverSound.preLoad=true;

				gameOverSound.play();

			}

	        document.getElementById("answer").value = "";

		}


    }

    document.body.onkeyup = function(e) {
        if (e.keyCode == 32) {
            startGame();
        }
        if (e.keyCode == 27) {
            endGame();
        }
    };

	$("#answer").bind("keyup", function() {
		evaluateAnswer();
	});

	//DOM EVENTS
	$('#newGameBtn').on('click', function(){
		startGame();
	});

	$('#endGameBtn').on('click', function(){
		endGame();
	});

});
