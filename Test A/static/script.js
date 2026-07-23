const correctAnswers = {}; // Initialize as an empty object
const firstAttempts = {};

// Store first attempts
function checkAnswer(questionId, correctAnswer) {
  if (typeof event !== 'undefined' && event && event.preventDefault) {
    event.preventDefault();
  }
  const selectedAnswer = document.querySelector(`input[name="${questionId}"]:checked`);
  const resultMessage = document.querySelector(`#resultMessage_${questionId}`);

  if (!selectedAnswer) {
    if (resultMessage) {
      resultMessage.innerHTML = "Please select an option";
      resultMessage.style.color = "red";
    }
    return;
  }

  if (selectedAnswer.value === correctAnswer) {
    if (resultMessage) {
      resultMessage.innerHTML = "Correct answer!";
      resultMessage.style.color = "green";
    }
    
    // Update correctAnswers based on first attempt
    if (!correctAnswers[questionId]) {
      correctAnswers[questionId] = correctAnswer;
    }

    // Store first attempt
    if (!firstAttempts[questionId]) {
      firstAttempts[questionId] = [selectedAnswer.value];
    }
  } else {
    if (resultMessage) {
      resultMessage.innerHTML = "Incorrect.";
      resultMessage.style.color = "red";
    }
    
    // Store first attempt
    if (!firstAttempts[questionId]) {
      firstAttempts[questionId] = [selectedAnswer.value];
    }
  }
}

// Check answers for all questions and display results
function checkAnswers(lastPage) {
  if (typeof event !== 'undefined' && event && event.preventDefault) {
    event.preventDefault();
  }
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
    if (typeof nextButton !== 'undefined' && nextButton) nextButton.disabled = false;
    if (typeof submitButton3 !== 'undefined' && submitButton3) submitButton3.disabled = true;
    if (typeof submitButton !== 'undefined' && submitButton) submitButton.disabled = true;

    if (lastPage == true) {  
      let endTime = sessionStorage.getItem('testEndTime');
      if (!endTime) {
        endTime = Date.now();
        sessionStorage.setItem('testEndTime', endTime);
      }

      resultMessage.innerHTML += "<br><br><strong>All exercises are successfully completed!</strong>";
      resultMessage.innerHTML += "<br>Click <strong>End</strong> to view your total time.";
      if (typeof nextButton !== 'undefined' && nextButton) nextButton.disabled = false;
      if (typeof submitButton3 !== 'undefined' && submitButton3) submitButton3.disabled = true;
      if (typeof submitButton !== 'undefined' && submitButton) submitButton.disabled = true;
    }
  } 
  else {
    resultMessage.innerHTML += "<br>Check Examples and Reattempt Test.";
    if (typeof exampleButton !== 'undefined' && exampleButton) exampleButton.disabled = false;
    if (typeof submitButton3 !== 'undefined' && submitButton3) submitButton3.disabled = true;
    if (typeof submitButton !== 'undefined' && submitButton) submitButton.disabled = true;
  }
  if (totalQuestions === 0) {
    resultMessage.innerHTML = "No answers were selected.";
  }

  if (dialog) {
    dialog.showModal();
    const closeButton = document.querySelector("#closeButton");
    if (closeButton) {
      closeButton.addEventListener("click", () => {
        dialog.close();
      });
    }
  }
}

// Show individual question
function showNextQuestionDiv(nextDivId, currentDivId) {
  const currentDiv = document.getElementById(currentDivId);
  if (currentDiv) currentDiv.style.display = 'none';

  const nextDiv = document.getElementById(nextDivId);
  if (nextDiv) nextDiv.style.display = 'block';
}

// Open next page
function openPage(pagePath) {
  window.location.href = pagePath;
}

// Display time from start of test
let startTime = parseInt(sessionStorage.getItem('testStartTime'), 10);
if (!startTime || isNaN(startTime)) {
  startTime = Date.now();
  sessionStorage.setItem('testStartTime', startTime);
}

function updateTimer() {
  const timerElement = document.getElementById('timer');
  if (timerElement) {
    const savedEndTime = sessionStorage.getItem('testEndTime');
    const currentTime = savedEndTime ? parseInt(savedEndTime, 10) : Date.now();
    const elapsedTime = currentTime - startTime;

    const hours = Math.floor(elapsedTime / 3600000);
    const minutes = Math.floor((elapsedTime % 3600000) / 60000);
    const seconds = Math.floor((elapsedTime % 60000) / 1000);

    const formattedTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    timerElement.textContent = formattedTime;
    timerElement.style.fontSize = '16px';
  }

  // Continuously ensure phase badge exists
  renderPhaseBadge();
}

// Update the timer every second
setInterval(updateTimer, 1000);

// Render Top-Right Persistent Phase Badge (With / Without Music)
function renderPhaseBadge() {
  if (document.getElementById('phaseHeaderBadge')) return;
  if (!document.body) return;

  const cond = sessionStorage.getItem('test1Condition') || 'With Music';
  const isMusic = cond.toLowerCase().includes('with music') && !cond.toLowerCase().includes('without');
  
  const badge = document.createElement('div');
  badge.id = 'phaseHeaderBadge';
  badge.style.cssText = `
    position: fixed !important;
    top: 15px !important;
    right: 20px !important;
    z-index: 999999 !important;
    padding: 8px 16px !important;
    border-radius: 20px !important;
    font-family: Arial, sans-serif !important;
    font-size: 14px !important;
    font-weight: bold !important;
    box-shadow: 0 4px 12px rgba(0,0,0,0.25) !important;
    background-color: ${isMusic ? '#0284c7' : '#475569'} !important;
    color: #ffffff !important;
    border: 2px solid #ffffff !important;
    pointer-events: none !important;
  `;
  badge.innerHTML = isMusic ? '🎵 Phase 1: WITH MUSIC' : '🔇 Phase 1: WITHOUT MUSIC';
  document.body.appendChild(badge);
}

// Initial execution attempts
if (document.body) {
  renderPhaseBadge();
}
document.addEventListener('DOMContentLoaded', renderPhaseBadge);
window.addEventListener('load', renderPhaseBadge);