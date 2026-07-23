const correctAnswers = {}; // Initialize as an empty object
const firstAttempts = {};

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

    if (lastPage == true) {  
      let endTime = sessionStorage.getItem('testEndTime');
      if (!endTime) {
        endTime = Date.now();
        sessionStorage.setItem('testEndTime', endTime);
      }

      resultMessage.innerHTML += "<br><br><strong>All exercises are successfully completed!</strong>";
      resultMessage.innerHTML += "<br>Click <strong>End</strong> to view your total time.";
      nextButton.disabled = false;
      submitButton3.disabled = true;
      submitButton.disabled = true;
    }
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

// Display time from start of test
let startTime = parseInt(sessionStorage.getItem('testBStartTime') || sessionStorage.getItem('testStartTime'), 10);
if (!startTime || isNaN(startTime)) {
  startTime = Date.now();
  sessionStorage.setItem('testBStartTime', startTime);
}

function updateTimer() {
  const timerElement = document.getElementById('timer');
  if (!timerElement) return;

  const savedEndTime = sessionStorage.getItem('testBEndTime');
  const currentTime = savedEndTime ? parseInt(savedEndTime, 10) : Date.now();
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
updateTimer();

// Render Top-Right Persistent Phase Badge (With / Without Music)
function renderPhaseBadge() {
  if (document.getElementById('phaseHeaderBadge')) return;
  const cond = sessionStorage.getItem('test2Condition') || 'Without Music';
  const isMusic = cond.toLowerCase().includes('with music') && !cond.toLowerCase().includes('without');
  
  const badge = document.createElement('div');
  badge.id = 'phaseHeaderBadge';
  badge.style.cssText = `
    position: fixed;
    top: 15px;
    right: 20px;
    z-index: 10000;
    padding: 8px 16px;
    border-radius: 20px;
    font-family: Arial, sans-serif;
    font-size: 14px;
    font-weight: bold;
    box-shadow: 0 4px 10px rgba(0,0,0,0.15);
    background-color: ${isMusic ? '#7c3aed' : '#475569'};
    color: #ffffff;
    border: 2px solid #ffffff;
  `;
  badge.innerHTML = isMusic ? '🎵 Phase 2: WITH MUSIC' : '🔇 Phase 2: WITHOUT MUSIC';
  document.body.appendChild(badge);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', renderPhaseBadge);
} else {
  renderPhaseBadge();
}