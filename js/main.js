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

		console.log('in start');

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

        maximumOperand = 5;

        operand1 = Math.round(Math.random() * maximumOperand);
        operand2 = Math.round(Math.random() * maximumOperand);
        document.getElementById("equation").innerHTML = operand1 +
            "+" + operand2;

    }

    var f = new Function('x', 'y', 'return x+y');

    function evaluateAnswer() {

        if (gameActive) {

            if (parseInt(document.getElementById("answer").value) ==
                f(operand1, operand2)) {
                currentScore++;
                updateScore(currentScore);
            }

            document.getElementById("answer").value = "";

            createQuestion();
            document.getElementById("answer").focus();

        }

    }

    function endGame() {
        document.getElementById("countdown").innerHTML = 0;
        clearInterval(counter);
        gameActive = false;
        document.getElementById("answer").disabled = true;
        document.getElementById("equation").innerHTML = "&nbsp;";

        if (currentScore > highScore) {
            highScore = currentScore;
            document.getElementById("highScore").innerHTML =
                highScore;
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
