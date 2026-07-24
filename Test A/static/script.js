const correctAnswers = {}; // Initialize as an empty object
const firstAttempts = {};

// Misconception Catalog mapping question choices to pedagogical feedback
const misconceptionHints = {
  // Addition
  "q1": {
    "2001": "💡 <b>Misconception Hint</b>: Check your carrying/regrouping in the tens place (60 + 20 + 10 carry = 90, not 100).",
    "1999": "💡 <b>Misconception Hint</b>: Check the units addition: 3 + 8 = 11, so the last digit must be 1."
  },
  "q2": {
    "97892": "💡 <b>Misconception Hint</b>: Check the thousands place sum (0 + 7 = 7, but 9 + 8 in hundreds carries 1 so it becomes 8).",
    "98782": "💡 <b>Misconception Hint</b>: Check the tens place addition (50 + 30 = 80, not 70)."
  },
  "q3": {
    "90090": "💡 <b>Misconception Hint</b>: Remember to line up digits correctly by place value before adding.",
    "89190": "💡 <b>Misconception Hint</b>: Check the tens digit sum: 1 + 8 + 1 + 1 carry = 11."
  }
};

// Update Adaptive Mastery Score (BKT Light Model)
function updateMasteryScore(isCorrect) {
  let score = parseInt(sessionStorage.getItem('test1MasteryScore') || '50', 10);
  if (isCorrect) {
    score = Math.min(100, score + 25);
  } else {
    score = Math.max(0, score - 15);
  }
  sessionStorage.setItem('test1MasteryScore', score);
  renderMasteryWidget();
  return score;
}

// Render Top Adaptive Mastery Widget
function renderMasteryWidget() {
  let widget = document.getElementById('adaptiveMasteryWidget');
  const score = parseInt(sessionStorage.getItem('test1MasteryScore') || '50', 10);
  
  let tierName = "Tier 2 (Medium)";
  let tierColor = "#0284c7";
  if (score >= 80) {
    tierName = "Tier 3 (Mastery High)";
    tierColor = "#16a34a";
  } else if (score < 40) {
    tierName = "Tier 1 (Scaffolded Easy)";
    tierColor = "#ea580c";
  }

  if (!widget && document.body) {
    widget = document.createElement('div');
    widget.id = 'adaptiveMasteryWidget';
    widget.style.cssText = `
      position: fixed;
      top: 60px;
      right: 20px;
      z-index: 99999;
      background: #ffffff;
      border: 2px solid ${tierColor};
      border-radius: 12px;
      padding: 10px 16px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      font-family: Arial, sans-serif;
      font-size: 13px;
      color: #1e293b;
    `;
    document.body.appendChild(widget);
  }

  if (widget) {
    widget.style.borderColor = tierColor;
    widget.innerHTML = `
      <div style="font-weight: bold; color: ${tierColor}; margin-bottom: 4px;">🧠 Adaptive ITS Mastery</div>
      <div>Level: <strong>${tierName}</strong></div>
      <div style="margin-top: 4px; background: #e2e8f0; border-radius: 6px; height: 8px; width: 140px; overflow: hidden;">
        <div style="background: ${tierColor}; width: ${score}%; height: 100%; transition: width 0.3s ease;"></div>
      </div>
      <div style="font-size: 11px; color: #64748b; margin-top: 2px; text-align: right;">${score}% Mastered</div>
    `;
  }
}

// Store first attempts and count mistakes with Misconception Feedback
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

  const isFirstTry = !firstAttempts[questionId];

  if (selectedAnswer.value === correctAnswer) {
    if (resultMessage) {
      resultMessage.innerHTML = "✅ Correct answer! Great job.";
      resultMessage.style.color = "green";
    }
    
    if (isFirstTry) {
      updateMasteryScore(true);
      correctAnswers[questionId] = correctAnswer;
      firstAttempts[questionId] = [selectedAnswer.value];
    }
  } else {
    // Look up misconception hint
    let hint = "";
    if (misconceptionHints[questionId] && misconceptionHints[questionId][selectedAnswer.value]) {
      hint = "<br>" + misconceptionHints[questionId][selectedAnswer.value];
    } else {
      hint = "<br>💡 <b>Hint</b>: Review the place values or order of operations carefully.";
    }

    if (resultMessage) {
      resultMessage.innerHTML = "❌ Incorrect." + hint;
      resultMessage.style.color = "#dc2626";
    }
    
    if (isFirstTry) {
      updateMasteryScore(false);
      let mistakes = parseInt(sessionStorage.getItem('test1Mistakes') || '0', 10) + 1;
      sessionStorage.setItem('test1Mistakes', mistakes);
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

  const currentMastery = parseInt(sessionStorage.getItem('test1MasteryScore') || '50', 10);

  if (correctCount >= 2 || currentMastery >= 75) {
    resultMessage.innerHTML += `<br><br>🎉 <strong>Module Mastered! (Score: ${currentMastery}%)</strong>`;
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
    resultMessage.innerHTML += `<br><br>Adaptive Hint: Current Mastery is ${currentMastery}%. Reattempt test to achieve 75%+ mastery.`;
    if (typeof exampleButton !== 'undefined' && exampleButton) exampleButton.disabled = false;
    if (typeof submitButton3 !== 'undefined' && submitButton3) submitButton3.disabled = true;
    if (typeof submitButton !== 'undefined' && submitButton) submitButton.disabled = true;
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

  renderPhaseBadge();
  renderSkipButton();
  renderMasteryWidget();
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
    background-color: ${isMusic ? '#7c3aed' : '#475569'} !important;
    color: #ffffff !important;
    border: 2px solid #ffffff !important;
    pointer-events: none !important;
  `;
  badge.innerHTML = isMusic ? '🎵 Phase 1: WITH MUSIC' : '🔇 Phase 1: WITHOUT MUSIC';
  document.body.appendChild(badge);
}

// Render Floating Skip Button for Quick Testing
function renderSkipButton() {
  const disabledBtns = document.querySelectorAll('button[disabled]');
  disabledBtns.forEach(btn => btn.removeAttribute('disabled'));

  if (document.getElementById('skipTestBtn')) return;
  if (!document.body) return;

  if (window.location.pathname.toLowerCase().includes('finish.html')) return;

  const btn = document.createElement('button');
  btn.id = 'skipTestBtn';
  btn.style.cssText = `
    position: fixed !important;
    bottom: 20px !important;
    right: 20px !important;
    z-index: 999999 !important;
    padding: 10px 18px !important;
    border-radius: 25px !important;
    font-family: Arial, sans-serif !important;
    font-size: 14px !important;
    font-weight: bold !important;
    box-shadow: 0 4px 12px rgba(0,0,0,0.3) !important;
    background-color: #ea580c !important;
    color: #ffffff !important;
    border: 2px solid #ffffff !important;
    cursor: pointer !important;
  `;
  btn.innerHTML = '⏩ Skip to Finish';
  btn.onclick = () => {
    let endTime = sessionStorage.getItem('testEndTime');
    if (!endTime) {
      sessionStorage.setItem('testEndTime', Date.now());
    }
    const inTemplates = window.location.pathname.toLowerCase().includes('/templates/');
    window.location.href = inTemplates ? 'finish.html' : './templates/finish.html';
  };
  
  document.body.appendChild(btn);
}

// Initial execution
if (document.body) {
  renderPhaseBadge();
  renderSkipButton();
  renderMasteryWidget();
}
document.addEventListener('DOMContentLoaded', () => {
  renderPhaseBadge();
  renderSkipButton();
  renderMasteryWidget();
});
window.addEventListener('load', () => {
  renderPhaseBadge();
  renderSkipButton();
  renderMasteryWidget();
});