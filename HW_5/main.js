/* All answer option */

const option1 = document.querySelector('.option1'),
    option2 = document.querySelector('.option2'),
    option3 = document.querySelector('.option3'),
    option4 = document.querySelector('.option4');

//  All our options   

const optionElements = document.querySelectorAll('.option');

const question = document.getElementById('question');  // саме питання

const numberofQuestion = document.getElementById('number-of-question'),  // номер питання
    numberofAllQuestion = document.getElementById('number-of-all-questions'); // кількість всіх питань

let indexOfQuestion,  // індекс поточного питання
    indexOfPage = 0;  // індекс сторінки

const answersTracker = document.getElementById('answers-tracker');  // обгортка для трекера
const btnNext = document.getElementById('btn-next'); // кнопка далі

let score = 0;  // підсумковий результат

const correctAnswer = document.getElementById('correct-answer'),  // кількість вірних відповідей
    numberofAllQuestion2 = document.getElementById('number-of-all-questions-2'),  // кількість всіх питань ( в модальному вікні )
    btnTryAgain = document.getElementById('btn-try-again');

const questions = [
    {
        question: 'У якому році затонув "Титанік" ?',
        options: [
            '1915',
            '1977',
            '1912',
            '1908', 
        ],
        rightAnswer: 3
    },
    {
        question: 'Яка столиця Португалії ?',
        options: [
            'Порту',
            'Лісабон',
            'Мадейра',
            'Фаро', 
        ],
        rightAnswer: 2
    },
    {
        question: 'Яка тривалість життя бабки ?',
        options: [
            '72 години',
            '36 годин',
            '24 години',
            '12 годин', 
        ],
        rightAnswer: 3
    },
    {
        question: 'Хто винайшов консервну банку для консервування їжі в 1810 році ? ',
        options: [
            'Роберт Піл',
            'Дейв Бартрам',
            'Льюїс Коллінз ',
            'Пітер Дуранд', 
        ],
        rightAnswer: 4
    }
];

numberofAllQuestion.innerHTML = questions.length; // виводими кількість питань
const load = () => {
    question.innerHTML = questions[indexOfQuestion].question;  // саме питання

    // мапить відповіді

    option1.innerHTML = questions[indexOfQuestion].options[0];
    option2.innerHTML = questions[indexOfQuestion].options[1];
    option3.innerHTML = questions[indexOfQuestion].options[2];
    option4.innerHTML = questions[indexOfQuestion].options[3];

    numberofQuestion.innerHTML = indexOfPage + 1; // встановлення номера поточної сторінки
    indexOfPage++;  // збільшення індекса сторінки
};

let completedAnswers = [];  //  масив для вже заданих питань

const randomQuestion = () => {
    let randomNumber = Math.floor(Math.random() * questions.length);
    let hitDuplicate = false;  // якорь для перевірки однакових питань 

    if(indexOfPage == questions.length) {
        quizOver();
    } else {
        if(completedAnswers.length > 0) {
            completedAnswers.forEach(item => {
                if(item == randomNumber) {
                    hitDuplicate = true;
                }
            });
            if(hitDuplicate) {
                randomQuestion();
            } else {
                indexOfQuestion = randomNumber;
                load();
            }
        }
        if(completedAnswers.length == 0) {
            indexOfQuestion = randomNumber;
            load();
        }
    }
    completedAnswers.push(indexOfQuestion);
};
randomQuestion();

const checkAnswer = el => {
    if(el.target.dataset.id == questions[indexOfQuestion].rightAnswer) {
        el.target.classList.add('correct');
        updateAnswerTracker('correct');
        score++;
    } else {
        el.target.classList.add('wrong');
        updateAnswerTracker('wrong');
    }
    disableOptions();
}

for(option of optionElements) {
    option.addEventListener('click' , e => checkAnswer(e));
}

const disableOptions = () => {
    optionElements.forEach(item => {
        item.classList.add('disabled');
        if(item.dataset.id == questions[indexOfQuestion].rightAnswer){
            item.classList.add('correct');
        }
    })
}
// видалення всіх класів з усіх відповідей
const enableOptions = () => {
    optionElements.forEach(item => {
        item.classList.remove('disabled', 'correct', 'wrong' );
    })
}

const answerTracker = () => {
    questions.forEach(() => {
        const div = document.createElement('div');
        answersTracker.appendChild(div);
    })
};

const updateAnswerTracker = status => {
    answersTracker.children[indexOfPage - 1].classList.add('${status}');
}

const validate = () => {
    if(optionElements[0].classList.contains('disabled')){
        alert('Вам треба вибрати один із варіантів відповіді')
    } else {
        randomQuestion();
        enableOptions();
    }
}

const quizOver = () => {
    document.querySelector('.quiz-over-modal').classList.add('active');
    correctAnswer.innerHTML = score;
    numberofAllQuestion2.innerHTML = questions.length;
}

const tryAgain = () => {
    window.location.reload();
};

btnTryAgain.addEventListener('click', tryAgain);

btnNext.addEventListener('click', () => {
    validate();
})

window.addEventListener('load', () => {
    randomQuestion();
    answerTracker();
});