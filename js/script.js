const questions = [
    {
        question: "Qual é o maior animal do mundo?",
        answers:[
            {text: "Tubarão branco", correct: false},
            {text: "Baleia Azul", correct: true},
            {text: "Elefante", correct: false},
            {text: "Girafa", correct: false}
        ]
    },
    {
        question: "Qual é o menor país do mundo?",
        answers:[
            {text: "Vaticano", correct: true},
            {text: "Butão", correct: false},
            {text: "Nepal", correct: false},
            {text: "Sri Lanka", correct: false}
        ]
    },
    {
        question: "Qual é o maior deserto do mundo?",
        answers:[
            {text: "Kalahari", correct: false},
            {text: "Gobi", correct: false},
            {text: "Sahara", correct: false},
            {text: "Antartica", correct: true}
        ]
    },
    {
        question: "Qual é o menor continente do mundo?",
        answers:[
            {text: "Asia", correct: false},
            {text: "Australia", correct: true},
            {text: "Artico", correct: false},
            {text: "Africa", correct: false}
        ]
    }

]
const questionElement = document.getElementById("question")
const answerButtons = document.getElementById("answer-buttons")
const nextButton = document.getElementById("next-btn")

let currentQuestionIndex = 0
let score = 0

function startQuiz(){
    currentQuestionIndex = 0
    score = 0
    nextButton.innerHTML = "Próximo"
    showQuestion()
}
function showQuestion(){
    resetState()
    let currentQuestion = questions[currentQuestionIndex]
    let questionNo = currentQuestionIndex + 1
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question

        currentQuestion.answers.forEach(answer =>{
            const button = document.createElement("button")
            button.innerHTML = answer.text
            button.classList.add("btn")
            answerButtons.appendChild(button)
            if(answer.correct){
                button.dataset.correct = answer.correct
            }
            button.addEventListener("click", selectAnswer)
        })
}

function resetState(){
    nextButton.style.display = "none"
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild)
    }
}
function selectAnswer(e){
    const selectedBtn = e.target
    const isCorrect = selectedBtn.dataset.correct === "true"
    if(isCorrect){
        selectedBtn.classList.add("correct")
        score++
    } else{
        selectedBtn.classList.add("incorrect")
    }
    Array.from(answerButtons.children).forEach(button =>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct")
        }
        button.disabled = true
    })
    nextButton.style.display = "block"
}



function showScore(){
    resetState()
    questionElement.innerHTML = `Você pontuou ${score} de ${questions.length}!`
    nextButton.innerHTML = "Jogue Novamente"
    nextButton.style.display = "block"
}

function handeleNextButton(){
    currentQuestionIndex++
    if(currentQuestionIndex < questions.length){
        showQuestion()
    }else{
        showScore()
    }
}
nextButton.addEventListener("click", () => {
    if(currentQuestionIndex < questions.length){
        handeleNextButton()
    }else{
        startQuiz()
    }
})
startQuiz()