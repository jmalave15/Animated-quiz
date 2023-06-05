const startQuiz= document.querySelector("#start-quiz");
const intro= document.querySelector("#intro");
let time = document.querySelector(".time");
const questions = document.querySelector("#questions");

//questions and answers
const questionsArray = [
    { title:"What kind of fish is Nemo?",
        
        choices: ["Goldfish", "clown fish", "Blue Hippo", "Eagle Ray"],

        rightAnswer: "clown fish" },

    {title:"Who is Ariel's best friend?", 

        choices: ["Flounder", "Flanders", "Ned", "Junior"], 

        rightAnswer: "Flounder" }, 

    {title:"Which character is blue in Aladdin?", 

        choices: ["The genie", "Papa Smurf", "Blue Man Group", "Blue marker"], 

        rightAnswer: "The genie" },

    {title:"What Olaf likes the most?", 

        choices: ["Warm Hugs", "A carrot", "A Flying Squirrel", "A snowball"], 

        rightAnswer: "Warm Hugs" }, 

];

const currentQuestion = document.querySelector("#currentQuestion");
const nextQuestion = document.querySelector("#next");
const answer = document.querySelector("#answer");
const highScore = document.querySelector("#score");
const submitScore = document.querySelector("#submit");
const feedbackEl = document.querySelector("#feedback"); 

//timer with total seconds being 32
let timerInterval;

let secondsLeft = 32;

function startTimer() {
    timerInterval = setInterval(function() {

        time.textContent = secondsLeft + " Seconds Left";
        secondsLeft--;

        if (secondsLeft === 0) {
            clearInterval(timerInterval);
            endQuiz();
            console.log(secondsLeft);
        }

    }, 1000);
};

let currentIndex = 0;

//event starting quiz
startQuiz.addEventListener("click", function() 
{
    time.style.display = "block";
    intro.style.display = "none";
    score.style.display = "none";
    questions.style.display = "block";
    startTimer();
    appendNewQuestion();

});

//event clicking array of questions right or wrong
function choiceClick(event) {
    var buttonEl = event.target;
    if (!buttonEl.matches(".choice")) {
        return;
    }
    console.log(currentIndex);
    if (buttonEl.value !== questionsArray[currentIndex].rightAnswer) {
        secondsLeft-=5;
        if (secondsLeft < 0) {
            endQuiz();
        }
        time.textContent = secondsLeft + "seconds Left";
        feedbackEl.textContent = "Wrong"
    } else {
        feedbackEl.textContent = "Right"
    } feedbackEl.classList.remove("hide")
    setTimeout(function () {
        feedbackEl.classList.add("hide")
    }, 1000)
    currentIndex++;
    if (secondsLeft <= 0 || currentIndex === questionsArray.length) {
        endQuiz();
    } else {
        appendNewQuestion();
    }
}

//new question function
function appendNewQuestion() {
    const currentQuestionObj = questionsArray[currentIndex];
    answer.innerHTML = ""
    currentQuestion.innerHTML = currentQuestionObj.title;
    for (var i=0; i<currentQuestionObj.choices.length; i++) {
        var choice = currentQuestionObj.choices[i];
        var choiceNode = document.createElement("button");
        choiceNode.setAttribute("class", "choice");
        choiceNode.setAttribute("value", choice);
        choiceNode.onclick = choiceClick;
        choiceNode.textContent = i+1+". "+choice;
        answer.appendChild(choiceNode);
    }
}

//end of quiz loop
function endQuiz() {
    clearInterval(timerInterval);
    time.style.display = "none";
    intro.style.display = "none";
    questions.style.display = "none";
    score.style.display = "block";
    document.querySelector("#finalScore").textContent=secondsLeft

};

//submissions of score
submitScore.addEventListener("submit", function(event) {
    event.preventDefault();
    var playerName = document.querySelector("#playerName").value;
    let playerScore = secondsLeft;
    console.log(playerName);
    console.log(playerScore);
    var highScore = JSON.parse(localStorage.getItem("playerScore")) || []
    let newScore = {
        name: playerName,
        score: playerScore,
    }
    
    highScore.push(newScore);
    localStorage.setItem("playerScore", JSON.stringify(highScore));

});
