const correctAnswers = {}; // Initialize as an empty object
const firstAttempts = {};

// 12-Question Misconception Catalog for Module 1 Across 4 Adaptive Tiers (Test A)
const misconceptionHints = {
  // --- TIER 1: Easy Scaffolded Order of Operations & Basic Fractions ---
  "T1_Q1": {
    "20176": "💡 <b>Misconception Hint</b>: Order of Operations rule (BODMAS/PEMDAS)! Multiply ($382 \\times 4 = 1528$) and divide ($120 \\div 6 = 20$) before subtracting/adding.",
    "3893": "💡 <b>Misconception Hint</b>: Check the final addition term: $5421 - 1528 + 20 = 3913$."
  },
  "T1_Q2": {
    "88": "💡 <b>Misconception Hint</b>: Calculate parentheses first ($15-3=12$), then division ($240 \\div 12 = 20$), then multiplication ($18 \\times 4 = 72$), so $20 + 72 = 92$.",
    "104": "💡 <b>Misconception Hint</b>: Double check your multiplication $18 \\times 4 = 72$."
  },
  "T1_Q3": {
    "5/12": "💡 <b>Misconception Hint</b>: Find common denominator (12): $\\frac{5}{12} + \\frac{3}{12} - \\frac{4}{12} = \\frac{4}{12} = \\frac{1}{3}$.",
    "1/2": "💡 <b>Misconception Hint</b>: Check simplifying $\\frac{4}{12} = \\frac{1}{3}$."
  },

  // --- TIER 2: Medium Standard Fractions & Decimals ---
  "T2_Q1": {
    "6/7": "💡 <b>Misconception Hint</b>: You added and subtracted numerators and denominators across directly ($3+5-2 = 6, 4+6-3 = 7$). Find the least common denominator (LCD = 12) first!",
    "13/12": "💡 <b>Misconception Hint</b>: Check the subtraction step: $\\frac{9}{12} + \\frac{10}{12} - \\frac{8}{12} = \\frac{11}{12}$."
  },
  "T2_Q2": {
    "1/4": "💡 <b>Misconception Hint</b>: Calculate parentheses first: $\\frac{1}{2} + \\frac{1}{4} = \\frac{3}{4}$. Then multiply: $\\frac{3}{4} \\times \\frac{2}{3} = \\frac{1}{2}$. Finally subtract: $\\frac{7}{8} - \\frac{4}{8} = \\frac{3}{8}$.",
    "1/2": "💡 <b>Misconception Hint</b>: Remember to complete the subtraction from $\\frac{7}{8}$."
  },
  "T2_Q3": {
    "9.0": "💡 <b>Misconception Hint</b>: Evaluate multiplication and division first: $\\frac{4.5 \\times 0.6}{0.3} = \\frac{2.7}{0.3} = 9$. Then add $2.5$: $9 + 2.5 = 11.5$.",
    "14.0": "💡 <b>Misconception Hint</b>: Check decimal division $\\frac{2.7}{0.3} = 9$."
  },

  // --- TIER 3: Hard Complex Fraction Division & Rational Equations ---
  "T3_Q1": {
    "20/81": "💡 <b>Misconception Hint</b>: When dividing by a fraction product, invert the denominator fraction and multiply: $\\frac{4}{9} \\div \\frac{10}{18} = \\frac{4}{9} \\times \\frac{18}{10} = \\frac{4}{5}$.",
    "5/4": "💡 <b>Misconception Hint</b>: You inverted the numerator fraction instead of the denominator fraction."
  },
  "T3_Q2": {
    "1 / ((x+1)(x-1))": "💡 <b>Misconception Hint</b>: Cross-multiply numerators: $3(x-1) - 2(x+1) = 3x - 3 - 2x - 2 = x - 5$.",
    "(x + 1) / ((x+1)(x-1))": "💡 <b>Misconception Hint</b>: Watch out for distributing the negative sign: $-2(x+1) = -2x - 2$."
  },
  "T3_Q3": {
    "x = 3": "💡 <b>Misconception Hint</b>: Subtract $\\frac{2}{x+3}$ from both sides: $\\frac{1}{x} = \\frac{3}{x+3} \\Rightarrow x+3 = 3x \\Rightarrow 2x = 3 \\Rightarrow x = \\frac{3}{2}$.",
    "x = 1": "💡 <b>Misconception Hint</b>: Check cross multiplying $x+3 = 3x$."
  },

  // --- TIER 4: Expert Rational Algebraic Expressions & Limits ---
  "T4_Q1": {
    "(x + 3) / (2x + 1)": "💡 <b>Misconception Hint</b>: You added numerators and denominators across directly. Cross multiply by common denominator $(x+2)(x-1)$.",
    "(x^2 - 4x + 6) / ((x+2)(x-1))": "💡 <b>Misconception Hint</b>: Check expanding $x(x-1) + 3(x+2) = x^2 - x + 3x + 6 = x^2 + 2x + 6$."
  },
  "T4_Q2": {
    "1 / (x(x+h))": "💡 <b>Misconception Hint</b>: Check the numerator subtraction: $x - (x+h) = -h$, so the negative sign remains!",
    "0": "💡 <b>Misconception Hint</b>: $\\frac{1}{x+h}$ and $\\frac{1}{x}$ are not equal when $h \\neq 0$."
  },
  "T4_Q3": {
    "x = 3": "💡 <b>Misconception Hint</b>: $x = 3$ makes the denominator $x-3 = 0$ (undefined value), so it is an extraneous solution!",
    "x = 11/2": "💡 <b>Misconception Hint</b>: Check expanding $2x(x+3) + 5(x-3) = 2x^2 + 11x - 15 = 36$."
  }
};

let currentTier = 2; // Start at Tier 2 Medium
let userStepCount = 0; // Exactly 4 questions per user session
const tierIndices = { 1: 0, 2: 0, 3: 0, 4: 0 }; // Used variant per tier

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
  
  let tierName = "Tier 2: Medium (Fractions)";
  let tierColor = "#0284c7";
  if (currentTier === 4) {
    tierName = "Tier 4: Expert Rational Algebra";
    tierColor = "#16a34a";
  } else if (currentTier === 3) {
    tierName = "Tier 3: Hard Complex Division";
    tierColor = "#7c3aed";
  } else if (currentTier === 1) {
    tierName = "Tier 1: Easy Arithmetic & Fractions";
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
      <div>Progress: <strong>Step ${Math.min(userStepCount + 1, 4)} / 4</strong></div>
      <div style="font-size: 12px; margin-top: 2px;">Active Level: <strong>${tierName}</strong></div>
      <div style="margin-top: 4px; background: #e2e8f0; border-radius: 6px; height: 8px; width: 160px; overflow: hidden;">
        <div style="background: ${tierColor}; width: ${score}%; height: 100%; transition: width 0.3s ease;"></div>
      </div>
      <div style="font-size: 11px; color: #64748b; margin-top: 2px; text-align: right;">${score}% Mastered</div>
    `;
  }
}

// 4-Step Adaptive Trajectory Helper Engine
function handleNextBranch(currentQId) {
  const isCorrect = (firstAttempts[currentQId] && firstAttempts[currentQId][0] === correctAnswers[currentQId]);
  userStepCount++;

  if (userStepCount >= 4) {
    checkAnswers(false);
    return;
  }

  if (isCorrect) {
    currentTier = Math.min(4, currentTier + 1);
  } else {
    currentTier = Math.max(1, currentTier - 1);
  }

  const variantIndex = (tierIndices[currentTier] % 3) + 1;
  tierIndices[currentTier]++;

  const nextQId = `T${currentTier}_Q${variantIndex}`;

  renderMasteryWidget();
  showNextQuestionDiv(nextQId, currentQId);
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
    let hint = "";
    if (misconceptionHints[questionId] && misconceptionHints[questionId][selectedAnswer.value]) {
      hint = "<br>" + misconceptionHints[questionId][selectedAnswer.value];
    } else {
      hint = "<br>💡 <b>Hint</b>: Review operational precedence, common denominators, or fraction inversion.";
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

  // 1. Disable Check & Submit button for this question (can only click once!)
  if (typeof event !== 'undefined' && event && event.target) {
    event.target.disabled = true;
  }
  const currentDiv = document.querySelector(`#${questionId}`);
  if (currentDiv) {
    const checkBtn = currentDiv.querySelector('button[onclick*="checkAnswer"]');
    if (checkBtn) checkBtn.disabled = true;
  }

  // 2. Enable Next Question button after Check & Submit is clicked
  const nextBtn = document.querySelector(`#btn_next_${questionId}`);
  if (nextBtn) nextBtn.disabled = false;
}

// Re-attempt Exercise Module
function reattemptExercise() {
  const dialog = document.querySelector("#resultDialog");
  if (dialog) dialog.close();

  const inputs = document.querySelectorAll('input[type="radio"]');
  inputs.forEach(input => input.checked = false);

  const msgs = document.querySelectorAll('[id^="resultMessage_"]');
  msgs.forEach(msg => msg.innerHTML = '');

  // Re-enable all check buttons
  const checkBtns = document.querySelectorAll('button[onclick*="checkAnswer"]');
  checkBtns.forEach(btn => btn.disabled = false);

  for (const key in firstAttempts) delete firstAttempts[key];
  for (const key in correctAnswers) delete correctAnswers[key];

  currentTier = 2;
  userStepCount = 0;
  for (const k in tierIndices) tierIndices[k] = 0;

  const allDivs = document.querySelectorAll('[id^="T"]');
  allDivs.forEach(div => div.style.display = 'none');

  const startDiv = document.getElementById('T2_Q1');
  if (startDiv) startDiv.style.display = 'block';

  renderMasteryWidget();
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

  let stepNum = 1;
  for (const questionId in firstAttempts) {
    const selectedAnswerValue = firstAttempts[questionId][0];
    const correctAnswer = correctAnswers[questionId];

    if (correctAnswer === selectedAnswerValue) {
      correctCount++;
      resultMessage.innerHTML += `<br>Question ${stepNum}: Correct`;
    } else if (selectedAnswerValue) {
      resultMessage.innerHTML += `<br>Question ${stepNum}: Wrong`;
    }

    stepNum++;
    totalQuestions++;
  }

  const currentMastery = parseInt(sessionStorage.getItem('test1MasteryScore') || '50', 10);

  // Must have at least 2 correct answers out of 4 (>= 50%)
  if (correctCount >= 2) {
    resultMessage.innerHTML += `<br><br>🎉 <strong>Module 1 Mastered! (${correctCount}/4 Correct - ${Math.round((correctCount/4)*100)}%)</strong>`;
    resultMessage.innerHTML += `<br>You passed the requirement (at least 50% correct). Click below to advance!`;
    resultMessage.innerHTML += `<br><br><button onclick="openPage('linear_exercise.html')" class="button gray" style="background:#16a34a; color:#ffffff; font-weight:bold; padding:10px 20px; border-radius:6px; cursor:pointer;">Next Exercise ➔</button>`;

    if (lastPage == true) {  
      let endTime = sessionStorage.getItem('testEndTime');
      if (!endTime) {
        endTime = Date.now();
        sessionStorage.setItem('testEndTime', endTime);
      }

      resultMessage.innerHTML += "<br><br><strong>All exercises are successfully completed!</strong>";
      resultMessage.innerHTML += "<br>Click <strong>End</strong> to view your total time.";
    }
  } 
  else {
    resultMessage.innerHTML += `<br><br>⚠️ <strong>Score: ${correctCount}/4 Correct (${Math.round((correctCount/4)*100)}%)</strong>`;
    resultMessage.innerHTML += `<br>You must answer at least 2 out of 4 questions correctly (50%) to advance.`;
    resultMessage.innerHTML += `<br><br><button onclick="reattemptExercise()" class="button gray" style="background:#0284c7; color:#ffffff; font-weight:bold; padding:10px 20px; border-radius:6px; cursor:pointer;">🔁 Re-attempt Module 1</button>`;
  }

  if (dialog) {
    dialog.showModal();
  }
}

function showNextQuestionDiv(nextDivId, currentDivId) {
  const currentDiv = document.getElementById(currentDivId);
  if (currentDiv) currentDiv.style.display = 'none';

  const nextDiv = document.getElementById(nextDivId);
  if (nextDiv) nextDiv.style.display = 'block';
}

function openPage(pagePath) {
  window.location.href = pagePath;
}

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

setInterval(updateTimer, 1000);

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
    let endTime = sessionStorage.getItem('testEndTime');
    if (!endTime) {
      sessionStorage.setItem('testEndTime', Date.now());
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