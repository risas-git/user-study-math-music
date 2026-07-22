const correctAnswers = {}; // Initialize as an empty object
const firstAttempts = {};
//const questionContainer = document.getElementById("questionContainer");
// Load the question on the main html file
/* function loadQuestions(questionsArray) {
  const currentQuestion = questionsArray[currentQuestionIndex];

  const questionDiv = document.createElement("div");
  questionDiv.id = currentQuestion.id;
  questionDiv.innerHTML = `
    <p>${currentQuestion.question}</p>
    ${currentQuestion.options
      .map(
        (option, index) =>
          `<input type="radio" id="${currentQuestion.id}_option${index}" name="${currentQuestion.id}" value="${option.value}">
           <label for="${currentQuestion.id}_option${index}">${option.label}</label><br>`
      )
      .join("")}
    <button onclick="checkAnswer('${currentQuestion.id}', '${currentQuestion.correctAnswer}')">Check & Submit</button>
  `;

  questionContainer.innerHTML = "";
  questionContainer.appendChild(questionDiv);
} */

// Store first attempts
function checkAnswer(questionId, correctAnswer) {
  event.preventDefault();
  const selectedAnswer = document.querySelector(`input[name="${questionId}"]:checked`);
  const resultMessage = document.querySelector(`#resultMessage_${questionId}`);

  if (!selectedAnswer) {
    resultMessage.innerHTML = "Please select an option";
    resultMessage.style.color = "red";
    return;
  }

  if (selectedAnswer.value === correctAnswer) {
    resultMessage.innerHTML = "Correct answer!";
    resultMessage.style.color = "green";
    
    // Update correctAnswers based on first attempt
    if (!correctAnswers[questionId]) {
      correctAnswers[questionId] = correctAnswer;
    }

    // Store first attempt
    if (!firstAttempts[questionId]) {
      firstAttempts[questionId] = [selectedAnswer.value];
    }
  } else {
    resultMessage.innerHTML = "Incorrect.";
    resultMessage.style.color = "red";
    
    // Store first attempt
    if (!firstAttempts[questionId]) {
      firstAttempts[questionId] = [selectedAnswer.value];
    }
  }
}

//disableRadioButtons(options);
// Check answers for all questions and display results
function checkAnswers(lastPage) {
  event.preventDefault();
  const dialog = document.querySelector("#resultDialog");
  const resultMessage = document.querySelector("#resultMessage");

  let correctCount = 0;
  let totalQuestions = 0;

  for (const questionId in firstAttempts) {
    const selectedAnswerValue = firstAttempts[questionId][0]; // Get the first attempt
    const correctAnswer = correctAnswers[questionId];

    if (correctAnswer === selectedAnswerValue) {
      correctCount++;
      resultMessage.innerHTML += `<br>Question ${questionId}: Correct`;
    } else if (selectedAnswerValue) {
      resultMessage.innerHTML += `<br>Question ${questionId}: Wrong`;
    } else {
      resultMessage.innerHTML += `<br>Question ${questionId}: Not selected`;
    }

    totalQuestions++;
  }

  if (correctCount >= 2) {
    resultMessage.innerHTML += "<br>Congratulations! You passed this exercise.";
    nextButton.disabled = false;
    submitButton3.disabled = true;
    submitButton.disabled = true;

  if (lastPage == true)
  {  
  resultMessage.innerHTML += "<br>All exercises are sucessfully completed.";
  nextButton.disabled = false;
  submitButton3.disabled = true;
  submitButton.disabled = true;}
  } 
  else {
    resultMessage.innerHTML += "<br>Check Examples and Reattempt Test.";
    exampleButton.disabled = false;
    submitButton3.disabled = true;
    submitButton.disabled = true;
  }
  if (totalQuestions === 0) {
    resultMessage.innerHTML = "No answers were selected.";
  }


  dialog.showModal();
  const closeButton = document.querySelector("#closeButton");
  closeButton.addEventListener("click", () => {
    dialog.close();
  });
}

// Show individual question
function showNextQuestionDiv(nextDivId, currentDivId) {
  const currentDiv = document.getElementById(currentDivId);
  currentDiv.style.display = 'none';

  const nextDiv = document.getElementById(nextDivId);
  nextDiv.style.display = 'block';
}
// Open next page
function openPage(pagePath) {
  window.location.href = pagePath;
}
// Display time
let startTime = Date.now();

    function updateTimer() {
      const timerElement = document.getElementById('timer');
      const currentTime = Date.now();
      const elapsedTime = currentTime - startTime;

      const hours = Math.floor(elapsedTime / 3600000);
      const minutes = Math.floor((elapsedTime % 3600000) / 60000);
      const seconds = Math.floor((elapsedTime % 60000) / 1000);

      const formattedTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
      timerElement.textContent = formattedTime;
      timerElement.style.fontSize = '16px'; 
    }
     // Update the timer every second
    setInterval(updateTimer, 1000);

    // Initial update
    updateTimer();

    // button style 
    // https://designmodo.com/create-css3-buttons/