var startButton = document.querySelector("#start");
var timerElement = document.querySelector(".timer");
var scoreCounter = document.querySelector(".score-counter");
var questionElement = document.querySelector("#question-box");
var celebrate = document.querySelector(".celebrate");


var questions = [
    {   name: "Q1.",
        question : "Which element is used to create a heading?",
        answers: [
            {value: "<h1>",correct: true},
            {value: "<p>",correct: false},
            {value: "<img>",correct: false},
            {value: "<div>",correct: false},
        ]

    }, 
    {
        name: "Q2.",
        question : "Which one of these is not an ID",
        answers: [
            {value: "#element",correct: false},
            {value: "#left", correct: false},
            {value: ".right", correct: true},
            {value: "#top", correct: false},
        ]
    },
 
    {
        name: "Q3.",
        question : "Media query does what?",
        answers: [
            {value:"Gives you information about latest technology", correct: false},
            {value:"A CSS technique which allows different presentations", correct:true},
            {value:"A Java script command", correct: false},
            {value:"Is an element in html", correct: false},
        ]
    },
     
    {
        name: "Q4.",
        question : "When a user enters their information in a form and it is stored on their local, where is it stored?",
        answers: [
            {value:"Local storage", correct: true},
            {value:"In the database",correct: false},
            {value:"On the cookies",correct: false},
            {value:"In the HTML",correct: false},
        ]
    },
  
    {
        name: "Q5.",
        question : "What is the command to convert object to a string?", 
        answers: [
            {value:"JSON.parse",correct: false},
            {value:"localStorage.setItem",correct: false},
            {value:"JSON.stringify",correct: true},
            {value:"addEventListener",correct: false},
        ]
    },

    {
        name: "Q6.",
        question : "What is the terminal command to copy a repo from git to your local?",
        answers: [
            {value:"cd",correct: false},
            {value:"init",correct: false},
            {value:"clone",correct: true},
            {value:"touch",correct: false},
        ]
    },
   
    {
        name: "Q7.",
        question : "What is a Boolean",
        answers: [
            {value:"a number value",correct: false},
            {value:"a string value",correct: false},
            {value:"a decimal value",correct: false},
            {value:"a true or false value",correct: true},
        ]
    },

    {
        name: "Q8.",
        question : "What is this operator ||",
        answers: [
            {value: "or",correct: true},
            {value: "and",correct: false},
            {value: "add",correct: false},
            {value:"sum",correct: false},
        ]
    },
    {
        name: "Q9.",
        question : "(2,4,6,8,10,12,14,16,18,20) What is the index value of 10",
        answers: [
            {value: "5",correct: false},
            {value: "6",correct: false},
            {value: "10",correct: false},
            {value: "4",correct: true},
        ]
    },
    {
        name: "Q10.",
        question : "What is an array?",
        answers: [
            {value:"A line of code that points to a link",correct: false},
            {value:"A css style to create a table",correct: false},
            {value:"A command to start a script",correct: false},
            {value:"A collection of the any data type",correct: true},
        ]
    }
    
]

// Attach event listener to start button to call startGame function on click
startButton.addEventListener('click', startGame);


// The startGame function is called when the start button is clicked
function startGame() {
    startTimer();
    renderQuestion();
  }

// this function is used to init the time with the seconds we allocate for the game

function formatTimeLeft(time) {
    const minutes = Math.floor(time / 60);
    let seconds = time % 60;
    
    var timerSection = document.querySelector(".timer");
    timerSection.innerHTML = `${minutes}:${seconds}`; ;
  }

    const TIME_LIMIT = 50;
    let timePassed = 0;
    let timeLeft = TIME_LIMIT;
    let timerInterval = null;


    function startTimer() {
    timerInterval = setInterval(() => {
    
    // The amount of time passed increments by one
    timePassed = timePassed += 1;
    timeLeft = TIME_LIMIT - timePassed;
    var timerSection = document.querySelector(".timer");
    timerSection.innerHTML = timeLeft;
    if(timeLeft === 0){
    clearInterval(timerInterval);

    };
      
  },1000);
}

//if answer incorrect subtract 3 seconds
function incorrectAnswer() {
    timerInterval-=3
}

//If the game is completed
function gameCompleted() {
    var name = []
    var name = prompt ("Game Over, Please enter your name");
    alert("Well done " + name +", play again soon!");
    clearInterval(timerInterval);
}

//Render the questiins and show the answers
var currentQuestionIndex = 0;
function renderQuestion() {
    var currentQuestion = questions[currentQuestionIndex]
    var questionSection = document.querySelector(".question");
     questionSection.innerHTML = "";
    

    if( currentQuestion !== undefined) {
        var questionHeading = document.createElement("h1")
        questionHeading.textContent = currentQuestion.name + " " + currentQuestion.question;
        questionSection.appendChild(questionHeading);

        var buttonContainer = document.createElement("div");
        buttonContainer.className = "question-box";
        for(var i = 0; i < currentQuestion.answers.length; i++) {
            var button = document.createElement("button")
            button.className = "button";
            button.value = currentQuestion.answers[i].value;
            button.dataset.correct = currentQuestion.answers[i].correct ;
            button.textContent = currentQuestion.answers[i].value;
           // button.addEventListener("click", this.submitAnswer);
            button.addEventListener("click", function(event) {
                checkAnswer(event.currentTarget.dataset.correct)
                event.preventDefault();
            });
            buttonContainer.appendChild(button);

        }
        questionSection.appendChild(buttonContainer);


    } else {
        gameCompleted()
    }
}

//Check the submitted answer
function checkAnswer(selectedAnswer){
    var celebrationElement = document.querySelector(".celebrate");
    if (selectedAnswer === "true") {
        currentQuestionIndex++;
        renderQuestion();
        celebrationElement.innerHTML = "Correct!";
    } else 
        {celebrationElement.innerHTML = "Incorrect!";
        incorrectAnswer();
        }
    
}
