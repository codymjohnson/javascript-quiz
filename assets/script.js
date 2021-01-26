// pulled elements from html
var questionBlock = document.getElementById("question-block");
var begin = document.getElementById("begin");
var questions = document.getElementById("questions");
var options = document.getElementById("options");
var timeGuage = document.getElementById("timer");
var highScores = document.getElementById("high-scores-page");

// question array
var questionArray = [
    {
        q: "What are the 4 primary ingredients of beer?",
        opt: ["water grain yeast hops", "water sulphites hops wheat", "water sugar yeast hops"],
        ans: "water grain yeast hops"
    },
    {
        q: "what is the name of the device that converts the grain starches to sugars?",
        opt: ["Grain-barrel", "Starch-converter", "Mash tun"],
        ans: "Mash tun",
    },
    {
        q: "What is the name of unfermented beer?",
        opt: ["vort", "wort", "bort"],
        ans: "wort",
    },
    {
        q: "What is the average time for boiling the wort in the kettle?",
        opt: ["45 minutes", "80 minutes", "60 minutes"],
        ans: "60 minutes",
    },
    {
        q: "When is the temperature safe to add the yeast?",
        opt: ["70 degrees f", "60 degrees f", "75 degrees f"],
        ans: "70 degrees f",
    },
    {
        q: "How long is the average primary fermentation period?",
        opt: ["1 week", "2 weeks", "4 weeks"],
        ans: "2 weeks",
    }
];

var remainingTime = questionArray.length * 20;
var currentIndex = 0;
var score = 0
var quizDone = false;

// begin quiz event listener
begin.addEventListener("click", startQuiz);

// function to begin quiz and timer
function startQuiz() {
    begin.style.visibility = "hidden";
    showQuestions();
    startTimer();
};

// timer Function
function startTimer() {
    var timeInterval = setInterval(function () {
        remainingTime--;
        timeGuage.textContent = "Time left: " + remainingTime;

        // conditional for ending quiz if timer runs out
        if (remainingTime <= 0) {
            clearInterval(timeInterval);
            endQuiz();
        };
    }, 1000);
};

// function to generate questions
function showQuestions() {
    var currentQuestion = questionArray[currentIndex];
    questionBlock.setAttribute("class", "");
    questions.textContent = currentQuestion.q;
    options.textContent = "";

    // generating buttons for options
    currentQuestion.opt.forEach(function (option, i) {
        var choiceButt = document.createElement("button");
        choiceButt.setAttribute("class", "btn btn-warning");
        choiceButt.style.marginBottom = "8px";
        choiceButt.textContent = i + 1 + ": " + option;
        options.appendChild(choiceButt);
        options.appendChild(document.createElement("br"));


        // evaluate if answer is correct or not
        choiceButt.onclick = function evaluate() {
            var evaluation = document.createElement("p");
            if (questionArray[currentIndex].opt[i] === questionArray[currentIndex].ans) {
                evaluation.textContent = "Cheers!";
                evaluation.style.color = "green";
                choiceButt.appendChild(document.createElement("hr"));
                choiceButt.appendChild(evaluation);
                score += 3;
                setTimeout(nextQuestion, 1000);
            } else {
                evaluation.textContent = "Newp";
                evaluation.style.color = "red";
                choiceButt.appendChild(document.createElement("hr"));
                choiceButt.appendChild(evaluation);
                remainingTime -= 10;
                setTimeout(nextQuestion, 1000);
            };
        };
    });

};

// Function to generate next question in the array
function nextQuestion() {
    if (currentIndex < questionArray.length - 1) {
        currentIndex += 1;
        showQuestions();
    } else {
        quizDone = true;
        endQuiz();
    };

};

// Function for ending quiz and sending user to score page
function endQuiz() {
    timeGuage.textContent = "";
    timeGuage.style.visibility = "hidden";
    if (quizDone === true) {
        questions.textContent = "All done, time for another drink!";
    } else {
        questions.textContent = "Sucks to suck, time is up";
    };

    // Show score
    options.textContent = "You got " + score + " points! Wanna save your score?";

    // Create elements to hold new score and name
    var hiScore = document.createElement("p");
    var userName = document.createElement("input");
    var submitScore = document.createElement("button");

    // Style for high score elements
    hiScore.style.marginTop = "18px";
    userName.style.width = "50%";
    userName.style.marginBottom = "18px";
    userName.setAttribute("class", "form-control");
    userName.setAttribute("placeholder", "Enter Name");
    submitScore.setAttribute("class", "btn btn-warning");
    submitScore.textContent = "Submit";
    hiScore.appendChild(userName);
    hiScore.appendChild(submitScore);
    options.appendChild(hiScore);

    // run Highscore after score is submitted
    submitScore.onclick = function addScore() {
        var scoreList = JSON.parse(localStorage.getItem("allEntries"));
        if (scoreList === null) {
            scoreList = [];
        };
        var nameList = userName.value;
        var nameScore = score;
        var hiScoreList = {
            User: nameList,
            Score: nameScore
        };
        localStorage.setItem("hiScoreList", JSON.stringify("hiScoreList"));

        // Save score to storage
        scoreList.push(hiScoreList);
        localStorage.setItem("")


    };


};

