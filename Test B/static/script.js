const correctAnswers = {}; // Initialize as an empty object
const firstAttempts = {};

// Comprehensive Misconception Catalog for University-Level Mathematics (Test B Isomorphic)
const misconceptionHints = {
  // Tier 1: Polynomial & Like Terms
  "q1": {
    "7x^2 - 8x + 13": "💡 <b>Misconception Hint</b>: Watch the signs! $-2x + 6x = +4x$ and $9 + (-4) = +5$.",
    "10x^2 + 4x + 5": "💡 <b>Misconception Hint</b>: When adding like terms, add coefficients ($5+2=7$), do not multiply them."
  },
  "q2": {
    "5a^2b + 11ab^2 + 4": "💡 <b>Misconception Hint</b>: Check the $ab^2$ terms: $4ab^2 + (-7ab^2) = -3ab^2$.",
    "7a^3b^3 + 4": "💡 <b>Misconception Hint</b>: You cannot combine $a^2b$ and $ab^2$ terms because their exponent powers differ."
  },

  // Tier 2: Complex Fractions & Rational Expressions
  "q3": {
    "4/7": "💡 <b>Misconception Hint</b>: You added numerators AND denominators directly ($2+3-1 = 4, 5+4-2 = 7$). Find the least common denominator (LCD = 20) first!",
    "15/20": "💡 <b>Misconception Hint</b>: Check the subtraction step: $\\frac{8}{20} + \\frac{15}{20} - \\frac{10}{20} = \\frac{13}{20}$."
  },
  "q4": {
    "(x + 2) / (2x + 2)": "💡 <b>Misconception Hint</b>: You added numerators and denominators across directly. Cross multiply by common denominator $(x+3)(x-1)$.",
    "(x^2 - 3x + 6) / ((x+3)(x-1))": "💡 <b>Misconception Hint</b>: Check expanding $x(x-1) + 2(x+3) = x^2 - x + 2x + 6 = x^2 + x + 6$."
  },

  // Tier 3: Rational Algebraic Equations & Difference Quotient
  "q5": {
    "x = 2": "💡 <b>Misconception Hint</b>: $x = 2$ makes the denominator $x-2 = 0$ (undefined value), so it is an extraneous solution!",
    "x = 7/3": "💡 <b>Misconception Hint</b>: Check expanding $3x(x+2) + 4(x-2) = 3x^2 + 10x - 8 = 28$."
  },
  "q6": {
    "2 / (x(x+h))": "💡 <b>Misconception Hint</b>: Check the numerator subtraction: $2(x - (x+h)) = -2h$, so the negative sign remains!",
    "0": "💡 <b>Misconception Hint</b>: $\\frac{2}{x+h}$ and $\\frac{2}{x}$ are not equal when $h \\neq 0$."
  }
};

let currentTier = 2; // Default start at Tier 2 (Medium)

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
  
  let tierName = "Tier 2: Medium (Standard Uni)";
  let tierColor = "#7c3aed";
  if (currentTier === 3 || score >= 75) {
    tierName = "Tier 3: Advanced (Mastery High)";
    tierColor = "#16a34a";
  } else if (currentTier === 1 || score < 40) {
    tierName = "Tier 1: Moderate (Scaffolded)";
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
      <div style="font-weight: bold; color: ${tierColor}; margin-bottom: 4px;">🧠 Adaptive ITS Engine</div>
      <div>Active Tier: <strong>${tierName}</strong></div>
      <div style="margin-top: 4px; background: #e2e8f0; border-radius: 6px; height: 8px; width: 150px; overflow: hidden;">
        <div style="background: ${tierColor}; width: ${score}%; height: 100%; transition: width 0.3s ease;"></div>
      </div>
      <div style="font-size: 11px; color: #64748b; margin-top: 2px; text-align: right;">${score}% Mastered</div>
    `;
  }
}

// Dynamic Tier Branching Helper
function handleNextBranch(currentQId) {
  const isCorrect = (firstAttempts[currentQId] && firstAttempts[currentQId][0] === correctAnswers[currentQId]);
  
  let nextQId = 'Q4';
  if (currentQId === 'q3') {
    if (isCorrect) {
      currentTier = 3;
      nextQId = 'Q5'; // Branch UP to Tier 3 Advanced
    } else {
      currentTier = 1;
      nextQId = 'Q1'; // Branch DOWN to Tier 1 Scaffolded
    }
  } else if (currentQId === 'q1') {
    nextQId = isCorrect ? 'Q4' : 'Q2';
  } else if (currentQId === 'q2') {
    nextQId = 'Q4';
  } else if (currentQId === 'q4') {
    nextQId = 'Q5';
  } else if (currentQId === 'q5') {
    nextQId = 'Q6';
  } else if (currentQId === 'q6') {
    nextQId = 'Q6';
  }

  renderMasteryWidget();
  showNextQuestionDiv(nextQId, currentQId.toUpperCase());
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
      hint = "<br>💡 <b>Hint</b>: Review common denominators, expanding brackets, or sign rules carefully.";
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

  // Enable Next Question or Result button after checking answer
  const num = questionId.replace('q', '');
  const nextBtn = document.querySelector(`#submitButton${num}`);
  if (nextBtn) nextBtn.disabled = false;

  const resBtn = document.querySelector('#submitButton');
  if (resBtn) resBtn.disabled = false;

  const nextExBtn = document.querySelector('#nextButton');
  if (nextExBtn) nextExBtn.disabled = false;
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

  // Reset attempt cache
  for (const key in firstAttempts) delete firstAttempts[key];
  for (const key in correctAnswers) delete correctAnswers[key];

  currentTier = 2;

  // Show Q3 (Tier 2 Start) or Q1
  for (let i = 1; i <= 6; i++) {
    const q = document.getElementById(`Q${i}`);
    if (q) q.style.display = (i === 3 || i === 1 ? 'block' : 'none');
  }

  const s3 = document.querySelector('#submitButton3');
  if (s3) s3.disabled = false;
  const s1 = document.querySelector('#submitButton1');
  if (s1) s1.disabled = false;
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
      resultMessage.innerHTML += `<br>Question ${questionId.toUpperCase()}: Correct`;
    } else if (selectedAnswerValue) {
      resultMessage.innerHTML += `<br>Question ${questionId.toUpperCase()}: Wrong`;
    }

    totalQuestions++;
  }

  const currentMastery = parseInt(sessionStorage.getItem('test2MasteryScore') || '50', 10);

  // Un-disable Next Exercise button whenever Result is clicked
  const nextExBtn = document.querySelector('#nextButton');
  if (nextExBtn) nextExBtn.disabled = false;

  if (correctCount >= 1 || currentMastery >= 50) {
    resultMessage.innerHTML += `<br><br>🎉 <strong>Module Completed! (Score: ${currentMastery}%)</strong>`;
    resultMessage.innerHTML += `<br>You may now advance to the next exercise section.`;

    if (lastPage == true) {  
      let endTime = sessionStorage.getItem('testBEndTime');
      if (!endTime) {
        endTime = Date.now();
        sessionStorage.setItem('testBEndTime', endTime);
      }

      resultMessage.innerHTML += "<br><br><strong>All exercises are successfully completed!</strong>";
      resultMessage.innerHTML += "<br>Click <strong>End</strong> to view your total time.";
    }
  } 
  else {
    resultMessage.innerHTML += `<br><br>⚠️ <strong>Current Mastery: ${currentMastery}%</strong>`;
    resultMessage.innerHTML += `<br><br><button onclick="reattemptExercise()" class="button gray" style="background:#7c3aed; color:#ffffff; font-weight:bold; padding:8px 16px; border-radius:6px; cursor:pointer;">🔁 Re-attempt Exercise</button>`;
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