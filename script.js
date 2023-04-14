window.onload = function () {
    const option1 = document.getElementById('a_text')
    const answerEls = document.querySelectorAll("label")
    const option2 = document.getElementById('b_text')
    const option3 = document.getElementById('c_text')
    const option4 = document.getElementById('d_text')
    const getQuestion = document.getElementById('Question')
    const submitBtn = document.querySelector('button')
    let j = 0
    let score = 0
    let questions = []
    let options = []
    const getQuiz = async () => {
        const getQuizData = await fetch('https://opentdb.com/api.php?amount=10&category=18&difficulty=medium&type=multiple')
        const data = await getQuizData.json()
        return data
    }
    getQuiz().then(data => {
        const question = data.results
        // console.log(question.length)
        questions = question
        console.log(questions)
        loadQuiz(questions)
    })
    function loadQuiz(questions) {
        deslect()
        // console.log(questions)
        options[0] = questions[j].correct_answer;
        for (i = 1; i < 4; i++) {
            options[i] = questions[j].incorrect_answers[i - 1]
        }
        // console.log(options)
        shuffleArray(options)
        getQuestion.textContent = questions[j].question
        option1.textContent = options[0]
        option2.textContent = options[1]
        option3.textContent = options[2]
        option4.textContent = options[3]
    }
    function deslect() {
        const answerEl = Array.from(answerEls)
        answerEl.forEach((answero) => {
            answero.previousElementSibling.checked = false;
        })
    }
    function getChecked() {
        let answer = undefined;
        // console.log(answerEls[0])
        const answerEl = Array.from(answerEls)
        // console.log(answerEl[0].innerText)
        answerEl.forEach(answero => {
            if (answero.previousElementSibling.checked) {
                answer = answero.innerText;
                console.log(answer)
            }
        })
        // Array.from(answerEls).forEach((answerEl) => {
        //     console.log(answerEl.parentElement)
        //     // console.log(answerEls[0].labels)
        //     if (answerEl.checked) {
        //         answer = answerEl.innerText;
        //         console.log(answer)
        //     }
        // });

        return answer;

    }
    submitBtn.addEventListener("click", () => {
        // check to see the answer
        const answer = getChecked();
        console.log(questions[j].correct_answer)

        if (answer) {
            console.log("yo")
            if (answer === questions[j].correct_answer) {
                score++;
                console.log(score)
            }

            j++;
            if (j < questions.length) {
                loadQuiz(questions);
            } else {
                quiz.innerHTML = `
                    <h2>You answered correctly ${score}/10 questions.</h2>
                    
                    <button onclick="location.reload()">Reload</button>
                `;
            }
        }
    });
    function shuffleArray(array) {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
    }
}
