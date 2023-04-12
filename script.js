"use strict";

const questions = [
    {question: "Яка властивість форми в Visual Studio відповідає за назву форми?",
    options: ["Text", "Name", "Caption", "Title"],
    correctAnswer: ["Title"],
    // answered: false,
    },
    {question: "Яка властивість форми в Visual Studio дозволяє встановлювати",
    options: ["Location", "Position", "Top", "Left"],
    correctAnswer: ["Location", "Position"],
    // answered: false,
    },
    {question: "Яка властивість форми в Visual Studio встановлює ширину форми?",
    options: ["Width", "Height", "Size", "Dimension"],
    correctAnswer: ["Width"],
    // answered: false,
    },
    {question: "Яка властивість форми в Visual Studio дозволяє встановлювати колір фону форми?",
    options: ["BackColor", "ForeColor", "BackgroundColor", "Color"],
    correctAnswer: ["BackColor"],
    // answered: false,
    },
    {question: "Яка властивість форми в Visual Studio встановлює заголовок форми, що відображається в панелі заголовка вікна?",
    options: ["Text", "Caption", "Title", "Header"],
    correctAnswer: ["Text"],
    // answered: false,
    },
    {question: "Яка властивість форми в Visual Studio дозволяє встановлювати режим видимості форми?",
    options: ["Visible", "Display", "Show", "Hide"],
    correctAnswer: ["Visible"],
    // answered: false,
    },
    {question: `Яка властивість форми в Visual Studio встановлює режим закриття форми при натисканні на кнопку "Х" в правому верхньому кутку вікна?`,
    options: ["ControlBox", "CloseBox", "ExitButton", "CloseButton"],
    correctAnswer: ["ControlBox"],
    // answered: false,
    },
    {question: "Яка властивість форми в Visual Studio дозволяє встановлювати іконку форми, що відображається в панелі заголовка вікна?",
    options: ["Icon", "TitleIcon", "FormIcon", "WindowIcon"],
    correctAnswer: ["Icon"],
    // answered: false,
    }
]
let indexQuestion = 0;
let score = 0;


for (let i = 0; i < questions.length; i++) {
    questions[i].answered = -1;
}

function displayQuestion (indexQuestion)  {
    const questionElement = document.getElementById("questionTitel");
    const optionsElement = document.getElementById("optionList");
    let selectedAnswer = questions[indexQuestion].answered;
    
    questionElement.textContent = questions[indexQuestion].question;
    optionsElement.innerHTML = "";
    questions[indexQuestion].options.forEach((option, index) => {
        const optionElement = document.createElement("li");
        const checkBoxElement = document.createElement("input");
        const labelElement = document.createElement("label");
        checkBoxElement.type = "radio"
        checkBoxElement.name = `question${indexQuestion}`;  
        checkBoxElement.id = `option_${index}`; // Изменить эту строку
        checkBoxElement.checked = index === selectedAnswer; // Добавить эту строку
        labelElement.textContent = option;
        optionsElement.appendChild(optionElement);
        optionElement.appendChild(checkBoxElement);
        optionElement.appendChild(labelElement);
        checkBoxElement.addEventListener("change", () => checkedAnswer(option, index, indexQuestion));
    })
    
 
    backBtn(optionsElement, indexQuestion);
    nextBtn(optionsElement, indexQuestion);
   
}

function nextBtn(optionsElement, indexQuestion) {
    const nextBtn = document.createElement("input");
    nextBtn.value = "Next";
    nextBtn.type = "submit";
    // nextBtn.style.display = indexQuestion >= questions.length - 1 ? "none" : "";
    nextBtn.className = "submit-btn";
    if (indexQuestion >= questions.length) {
        nextBtn.disabled = true;
    }
    console.log(questions.length);
    optionsElement.appendChild(nextBtn);
    nextBtn.addEventListener("click", (e) => {
        e.preventDefault();
        console.log(questions.length)
        console.log(indexQuestion)
        if (indexQuestion === questions.length - 1) { // Обновленное условие
            const submitBtn = document.createElement("input");
            submitBtn.value = "Submit";
            submitBtn.type = "submit";
            nextBtn.style.display = "none"
            submitBtn.className = "submit-btn";
            optionsElement.appendChild(submitBtn);
            submitBtn.addEventListener("click", (e) => {
                e.preventDefault();
                displayResult();
                console.log("Form submitted");
            });
        } else {
            const checkedInput = document.querySelector(`input[name="question${indexQuestion}"]:checked`);
            if (checkedInput) {
                questions[indexQuestion].answered = parseInt(checkedInput.id.split("_")[1]);
            }
            console.log(checkedAnswer());
            console.log(questions[indexQuestion].correctAnswer);

            if (arraysAreEqual(checkedAnswer(indexQuestion), questions[indexQuestion].correctAnswer)) {
                score++
                indexQuestion++;
                displayQuestion(indexQuestion);
                console.log(score)
            } else {
                console.log("no");
                indexQuestion++;
                displayQuestion(indexQuestion);
            }
        }
    });
}

function backBtn (optionsElement, indexQuestion)  {
    const backBtn = document.createElement("input");
    backBtn.type = "submit";
    backBtn.value = "Back";
    backBtn.className = "submit-btn";
    if (indexQuestion <= 0) {
        backBtn.disabled = true; 
    }
    optionsElement.appendChild(backBtn);
    backBtn.addEventListener("click", (e) => {
        e.preventDefault();
        indexQuestion--;
        displayQuestion(indexQuestion);
    })
   
}

function checkedAnswer(indexQuestion) {
    const userAnwer = [];
    const checkedInput = document.querySelector(`input[name="question${indexQuestion}"]:checked`);
    debugger
    console.log(checkedInput);
    if (checkedInput) {
        const checkedOption = checkedInput.nextElementSibling.textContent;
        userAnwer.push(checkedOption);
        console.log("Yoohoo")
    } else {
        console.log("Ни один вариант ответа не выбран");
    }
    return userAnwer;
}

function displayResult() {
    const elementResult = document.getElementById("result");
    const scoreInterest = (score / questions.length) * 100;
    debugger
    elementResult.textContent = `Ваш резулятат: ${scoreInterest}%`
    modal.style.display = 'block';
    const elementButtonResult = document.getElementById("result-button");
    elementButtonResult.addEventListener("click", () => {
        modal.style.display = 'none';
        displayQuestion(0);
    });
    
}


function arraysAreEqual(arr1, arr2) {
    return arr1.length === arr2.length && arr1.every((value, index) => value === arr2[index]);
}

displayQuestion(indexQuestion);