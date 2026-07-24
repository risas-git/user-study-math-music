const correctAnswers = {}; // Initialize as an empty object
const firstAttempts = {};

// Misconception Catalog mapping question choices to pedagogical feedback
const misconceptionHints = {
  // Addition Test B
  "q1": {
    "1991": "💡 <b>Misconception Hint</b>: Check the thousands place addition (1000 + 400 = 1400, carry 1 = 1500).",
    "2001": "💡 <b>Misconception Hint</b>: Check the units addition: 3 + 8 = 11, so the unit digit must be 1."
  },
  "q2": {
    "97892": "💡 <b>Misconception Hint</b>: Check the thousands place sum (0 + 7 = 7, but carry makes it 8).",
    "98782": "💡 <b>Misconception Hint</b>: Check the tens place addition (50 + 30 = 80)."
  },
  "q3": {
    "90090": "💡 <b>Misconception Hint</b>: Line up place values before adding.",
    "89190": "💡 <b>Misconception Hint</b>: Check the tens digit sum."
  }
};

// Update Adaptive Mastery Score (BKT Light Model)
function updateMasteryScore(isCorrect) {
  let score = parseInt(sessionStorage.getItem('test2MasteryScore') || '50', 10);
  if (isCorrect) {
    score = Math.min(100, score + 25);
  } else {
    score = Math.max(0, score - 15);
  }
  sessionStorage.setItem('test2MasteryScore', score);
  renderMasteryWidget();
  return score;
}

// Render Top Adaptive Mastery Widget
function renderMasteryWidget() {
  let widget = document.getElementById('adaptiveMasteryWidget');
  const score = parseInt(sessionStorage.getItem('test2MasteryScore') || '50', 10);
  
  let tierName = "Tier 2 (Medium)";
  let tierColor = "#7c3aed";
  if (score >= 75) {
    tierName = "Tier 3 (Mastery Achieved)";
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
      resultMessage.innerHTML = "Please select an option first";
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
      let mistakes = parseInt(sessionStorage.getItem('test2Mistakes') || '0', 10) + 1;
      sessionStorage.setItem('test2Mistakes', mistakes);
      firstAttempts[questionId] = [selectedAnswer.value];
    }
  }

  // Enable Next Question / Result button after checking answer
  const num = questionId.replace('q', '');
  const nextBtn = document.querySelector(`#submitButton${num}`);
  if (nextBtn) {
    nextBtn.disabled = false;
  }
  if (questionId === 'q3') {
    const resBtn = document.querySelector('#submitButton');
    if (resBtn) resBtn.disabled = false;
  }
}

// Re-attempt Exercise Module
function reattemptExercise() {
  const dialog = document.querySelector("#resultDialog");
  if (dialog) dialog.close();

  // Reset radio inputs and result messages
  const inputs = document.querySelectorAll('input[type="radio"]');
  inputs.forEach(input => input.checked = false);

  const msgs = document.querySelectorAll('[id^="resultMessage_"]');
  msgs.forEach(msg => msg.innerHTML = '');

  // Reset attempt cache for page
  for (const key in firstAttempts) {
    delete firstAttempts[key];
  }
  for (const key in correctAnswers) {
    delete correctAnswers[key];
  }

  // Disable next buttons until Check & Submit is pressed again
  const b1 = document.querySelector('#submitButton1');
  if (b1) b1.disabled = true;
  const b2 = document.querySelector('#submitButton2');
  if (b2) b2.disabled = true;
  const s = document.querySelector('#submitButton');
  if (s) s.disabled = true;

  // Show Q1
  const q1 = document.getElementById('Q1');
  if (q1) q1.style.display = 'block';
  const q2 = document.getElementById('Q2');
  if (q2) q2.style.display = 'none';
  const q3 = document.getElementById('Q3');
  if (q3) q3.style.display = 'none';

  // Re-enable check buttons
  const s3 = document.querySelector('#submitButton3');
  if (s3) s3.disabled = false;
}

// Check answers for all questions and display results
function checkAnswers(lastPage) {
  if (typeof event !== 'undefined' && event && event.preventDefault) {
    event.preventDefault();
  }
  const dialog = document.querySelector("#resultDialog");
  const resultMessage = document.querySelector("#resultMessage");
  if (resultMessage) resultMessage.innerHTML = "";

  let correctCount = 0;
  let totalQuestions = 0;

  for (const questionId in firstAttempts) {
    const selectedAnswerValue = firstAttempts[questionId][0];
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

  const currentMastery = parseInt(sessionStorage.getItem('test2MasteryScore') || '50', 10);

  if (correctCount >= 2 || currentMastery >= 75) {
    resultMessage.innerHTML += `<br><br>🎉 <strong>Module Mastered! (Score: ${currentMastery}%)</strong>`;
    resultMessage.innerHTML += `<br>You may now advance to the next exercise section.`;
    if (typeof nextButton !== 'undefined' && nextButton) nextButton.disabled = false;
    if (typeof submitButton3 !== 'undefined' && submitButton3) submitButton3.disabled = true;
    if (typeof submitButton !== 'undefined' && submitButton) submitButton.disabled = true;

    if (lastPage == true) {  
      let endTime = sessionStorage.getItem('testBEndTime');
      if (!endTime) {
        endTime = Date.now();
        sessionStorage.setItem('testBEndTime', endTime);
      }

      resultMessage.innerHTML += "<br><br><strong>All exercises are successfully completed!</strong>";
      resultMessage.innerHTML += "<br>Click <strong>End</strong> to view your total time.";
      if (typeof nextButton !== 'undefined' && nextButton) nextButton.disabled = false;
      if (typeof submitButton3 !== 'undefined' && submitButton3) submitButton3.disabled = true;
      if (typeof submitButton !== 'undefined' && submitButton) submitButton.disabled = true;
    }
  } 
  else {
    resultMessage.innerHTML += `<br><br>⚠️ <strong>Mastery Threshold Not Reached (Current: ${currentMastery}% | Required: 75%)</strong>`;
    resultMessage.innerHTML += `<br>You must re-attempt this exercise module before advancing.`;
    resultMessage.innerHTML += `<br><br><button onclick="reattemptExercise()" class="button gray" style="background:#7c3aed; color:#ffffff; font-weight:bold; padding:8px 16px; border-radius:6px; cursor:pointer;">🔁 Re-attempt Exercise</button>`;
    
    if (typeof nextButton !== 'undefined' && nextButton) nextButton.disabled = true;
    if (typeof exampleButton !== 'undefined' && exampleButton) exampleButton.disabled = false;
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
let startTime = parseInt(sessionStorage.getItem('testBStartTime') || sessionStorage.getItem('testStartTime'), 10);
if (!startTime || isNaN(startTime)) {
  startTime = Date.now();
  sessionStorage.setItem('testBStartTime', startTime);
}

function updateTimer() {
  const timerElement = document.getElementById('timer');
  if (timerElement) {
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

  const cond = sessionStorage.getItem('test2Condition') || 'Without Music';
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
  badge.innerHTML = isMusic ? '🎵 Phase 2: WITH MUSIC' : '🔇 Phase 2: WITHOUT MUSIC';
  document.body.appendChild(badge);
}

// Render Floating Skip Button for Quick Testing
function renderSkipButton() {
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
    let endTime = sessionStorage.getItem('testBEndTime');
    if (!endTime) {
      sessionStorage.setItem('testBEndTime', Date.now());
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