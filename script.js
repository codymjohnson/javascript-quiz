// pulled elements from html
const begin = document.getElementById("begin");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const letterA = document.getElementById("A");
const letterB = document.getElementById("b");
const letterC = document.getElementById("c");
const counter = document.getElementById("counter");
const timeGuage = document.getElementById("timeGuage");
const progress = document.getElementById("progress");
const score = document.getElementById("score");

// question array
let questions = [ {
question: "What are the 4 primary ingredients of beer?",
letterA: "water, grain, yeast, hops",
letterB: "water, sulphites, hops, wheat",
letterC: "water, sugar, yeast, hops",
correct: "a"
}, {
question: "what is the name of the device that converts the grain starches to sugars?",
letterA: "Grain-barrel",
letterB: "Starch-converter",
letterC: "Mash tun",
correct: "c"
}, {
question: "What is the name of unfermented beer?",
letterA: "vort",
letterB: "wort",
letterC: "bort",
correct: "b"
}, {
question: "What is the average time for boiling the wort in the kettle?",
letterA: "45 minutes",
letterB: "80 minutes",
letterC: "60 minutes",
correct: "c"
}, {
question: "When is the temperature safe to add the yeast?",
letterA: "70 degrees f",
letterB: "60 degrees f",
letterC: "75 degrees f",
correct: "a"
}, {
question: "How long is the average primary fermentation period?",
letterA: "1 week",
letterB: "2 weeks",
letterC: "4 weeks",
correct: "b"
} ]

// important variables
const finalQuestion = questions.length - 1;
let currentQuestion = 0;
let count = 0;
const questionTime = 30;
const guageWidth = 100;
const guageType = guageWidth / questionTime;
let timer; 
let score = 0;

// question generator
function promptQuestion() {
let q = questions[currentQuestion];
question.innerHTML = "<p>" + q.question + "</p>";
letterA.innerHTML = q.letterA;
letterB.innerHTML = q.letterB;
letterC.innerHTML = q.letterC;
}


// begin quiz
function beginQuiz() {
    start.style.display = "none";
    promptQuestion();
    quiz.style.display = "block";
    startTimer();
    timer = setInterval(startTimer,1000);
}

// show counter
function startTimer() {
    if(count <= questionTime) {
        counter.innerHTML = count;
        timeGuage.style.width = count;
        timeGuage.style.width = count * gaugeType + "px";
        count++
    } else {
        count = 0
        wrongAnswer();
        if(currentQuestion < finalQuestion) {
            currentQuestion++;
        } else {
            clearInterval(timer);
            showScore();
        }
    }
}

// function to see if answer is correct
function checkAnswer(answer) {
    if(answer === questions[currentQuestion].correct) {
        
    }

}



// function to see if answer is correct
function checkAnswer(answer) {
    if(answer === questions[currentQuestion].correct) {
        score++;
        correctAns();
    } else {
        wrongAns();
    }
    count = 0;
    if(currentQuestion < finalQuestion) {
        currentQuestion++;
        showScore();
    }
}

// if correct
function correctAns() {
    document.getElementById(currentQuestion).style.backgroundColor = "blue";
}

// if incorrect
function wrongAns() {
    document.getElementById(currentQuestion).style.backgroundColor = "red";
}

function showScore() {
    score.style.display = "block";
}

console.log(beginQuiz)

begin.addEventListener("click", beginQuiz)