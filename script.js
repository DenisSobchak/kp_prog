"use strict";

const questions = [
    {question: "Яка властивість форми в Visual Studio відповідає за назву форми?",
    options: ["Text", "Name", "Caption", "Title"],
    correctAnswer: ["Title"],
    },
    {question: "Яка властивість форми в Visual Studio дозволяє встановлювати",
    options: ["Location", "Position", "Top", "Left"],
    correctAnswer: ["Location", "Position"],
    },
    {question: "Яка властивість форми в Visual Studio встановлює ширину форми?",
    options: ["Width", "Height", "Size", "Dimension"],
    correctAnswer: ["Width"],
    },
    {question: "Яка властивість форми в Visual Studio дозволяє встановлювати колір фону форми?",
    options: ["BackColor", "ForeColor", "BackgroundColor", "Color"],
    correctAnswer: ["BackColor"],
    },
    {question: "Яка властивість форми в Visual Studio встановлює заголовок форми, що відображається в панелі заголовка вікна?",
    options: ["Text", "Caption", "Title", "Header"],
    correctAnswer: ["Text"],
    },
    {question: "Яка властивість форми в Visual Studio дозволяє встановлювати режим видимості форми?",
    options: ["Visible", "Display", "Show", "Hide"],
    correctAnswer: ["Visible"],
    },
    {question: `Яка властивість форми в Visual Studio встановлює режим закриття форми при натисканні на кнопку "Х" в правому верхньому кутку вікна?`,
    options: ["ControlBox", "CloseBox", "ExitButton", "CloseButton"],
    correctAnswer: ["ControlBox"],
    },
    {question: "Яка властивість форми в Visual Studio дозволяє встановлювати іконку форми, що відображається в панелі заголовка вікна?",
    options: ["Icon", "TitleIcon", "FormIcon", "WindowIcon"],
    correctAnswer: ["Icon"],
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
    // const blockButton = document.createElement("li");
    // optionsElement.appendChild(blockButton);
    let selectedAnswer = questions[indexQuestion].answered;
    
    questionElement.textContent = questions[indexQuestion].question;
    optionsElement.innerHTML = "";
    questions[indexQuestion].options.forEach((option, index) => {
        const optionElement = document.createElement("li");
        const checkBoxElement = document.createElement("input");
        const labelElement = document.createElement("label");
        checkBoxElement.checked = index === selectedAnswer;
        if (checkBoxElement.checked) {
            labelElement.classList.add("selected");
          }
        checkBoxElement.type = questions[indexQuestion].correctAnswer.length > 1 ? "checkbox" : "radio";
        checkBoxElement.addEventListener("change", () => {
            if (questions[indexQuestion].correctAnswer.length > 1) {
                const checkedInputs = document.querySelectorAll(`input[name="question${indexQuestion}"]:checked`);
                if (checkedInputs.length > questions[indexQuestion].correctAnswer.length) {
                    checkBoxElement.checked = false;
                }
            }
            checkedAnswer(option, index, indexQuestion);
        });
        checkBoxElement.name = `question${indexQuestion}`;  
        checkBoxElement.id = `option_${index}`;
        checkBoxElement.checked = index === selectedAnswer;
        labelElement.textContent = option;
        labelElement.setAttribute("for", `option_${index}`);
        optionsElement.appendChild(optionElement);
        optionElement.appendChild(checkBoxElement);
        optionElement.appendChild(labelElement);
    })
    
 
    backBtn(optionsElement, indexQuestion);
    nextBtn(optionsElement, indexQuestion);
   
}

function nextBtn(optionsElement, indexQuestion) {
    const nextBtn = document.createElement("input");
    nextBtn.value = "Next";
    nextBtn.type = "submit";
    nextBtn.className = "submit-btn next-btn";
    if (indexQuestion >= questions.length) {
        nextBtn.disabled = true;
    }
    optionsElement.appendChild(nextBtn);
    nextBtn.addEventListener("click", (e) => {
        e.preventDefault();
        if (indexQuestion === questions.length - 1) { 
            const submitBtn = document.createElement("input");
            submitBtn.value = "Submit";
            submitBtn.type = "submit";
            nextBtn.style.display = "none"
            submitBtn.className = "submit-btn sbm";
            optionsElement.appendChild(submitBtn);
            submitBtn.addEventListener("click", (e) => {
                e.preventDefault();
                displayResult();
            });
            if (arraysAreEqual(checkedAnswer(indexQuestion), questions[indexQuestion].correctAnswer)) {
                score++
                indexQuestion++;
                displayQuestion(indexQuestion);
            } else {
                indexQuestion++;
                displayQuestion(indexQuestion);
            }
           
        } else {
            const checkedInput = document.querySelector(`input[name="question${indexQuestion}"]:checked`);
            if (checkedInput) {
                questions[indexQuestion].answered = parseInt(checkedInput.id.split("_")[1]);
            }
            if (arraysAreEqual(checkedAnswer(indexQuestion), questions[indexQuestion].correctAnswer)) {
                score++
                indexQuestion++;
                displayQuestion(indexQuestion);
            } else {
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
    backBtn.className = "submit-btn back-btn";
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
    const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
    const isCheckboxes = document.querySelectorAll('input[type="checkbox"]');
    if (checkedInput) {
        if (isCheckboxes.length === 0 && document.querySelectorAll('input[type="radio"]').length > 0) {
            const checkedOption = checkedInput.nextElementSibling.textContent;
            userAnwer.push(checkedOption);
        }
        if (isCheckboxes.length > 0 && document.querySelectorAll('input[type="radio"]').length === 0) {
            checkboxes.forEach(checkbox => {
                userAnwer.push(checkbox.nextElementSibling.textContent);
            })
        }
    } else {
        backBtn.disabled = false;
        nextBtn.disabled = false;
    }
    return userAnwer;
}

function displayResult() {
    const elementResult = document.getElementById("result");
    const scoreInterest = (score / questions.length) * 100;

    elementResult.textContent = `Ваш резулятат: ${scoreInterest}%`
    modal.style.display = "flex";
    modal.style.opacity = "1";
    const elementButtonResult = document.getElementById("result-button");
    elementButtonResult.addEventListener("click", () => {
        location.reload(); 
        modal.style.display = 'none';
        modal.style.opacity = "0";
        displayQuestion(0);
    });
    
}


function arraysAreEqual(arr1, arr2) {
    return arr1.length === arr2.length && arr1.every((value, index) => value === arr2[index]);
    
}



displayQuestion(indexQuestion);