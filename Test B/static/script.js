const correctAnswers = {}; // Initialize as an empty object
const firstAttempts = {};

// 12-Question Misconception Catalog for Module 1 Across 4 Adaptive Tiers (Test B Isomorphic)
const misconceptionHints = {
  // --- TIER 1: Easy Scaffolded Order of Operations & Basic Fractions ---
  "T1_Q1": {
    "12195": "💡 <b>Misconception Hint</b>: Order of Operations rule (BODMAS/PEMDAS)! Multiply ($291 \\times 3 = 873$) and divide ($180 \\div 9 = 20$) before subtracting/adding.",
    "3483": "💡 <b>Misconception Hint</b>: Check the final addition term: $4356 - 873 + 20 = 3503$."
  },
  "T1_Q2": {
    "96": "💡 <b>Misconception Hint</b>: Calculate parentheses first ($18-6=12$), then division ($360 \\div 12 = 30$), then multiplication ($14 \\times 5 = 70$), so $30 + 70 = 100$.",
    "110": "💡 <b>Misconception Hint</b>: Double check your multiplication $14 \\times 5 = 70$."
  },
  "T1_Q3": {
    "7/15": "💡 <b>Misconception Hint</b>: Find common denominator (15): $\\frac{7}{15} + \\frac{3}{15} - \\frac{5}{15} = \\frac{5}{15} = \\frac{1}{3}$.",
    "1/2": "💡 <b>Misconception Hint</b>: Check simplifying $\\frac{5}{15} = \\frac{1}{3}$."
  },

  // --- TIER 2: Medium Standard Fractions & Decimals ---
  "T2_Q1": {
    "4/7": "💡 <b>Misconception Hint</b>: You added and subtracted numerators and denominators across directly ($2+3-1 = 4, 5+4-2 = 7$). Find the least common denominator (LCD = 20) first!",
    "15/20": "💡 <b>Misconception Hint</b>: Check the subtraction step: $\\frac{8}{20} + \\frac{15}{20} - \\frac{10}{20} = \\frac{13}{20}$."
  },
  "T2_Q2": {
    "1/3": "💡 <b>Misconception Hint</b>: Calculate parentheses first: $\\frac{1}{3} + \\frac{1}{4} = \\frac{7}{12}$. Then multiply: $\\frac{7}{12} \\times \\frac{4}{7} = \\frac{1}{3}$. Finally subtract: $\\frac{5}{6} - \\frac{2}{6} = \\frac{3}{6} = \\frac{1}{2}$.",
    "3/4": "💡 <b>Misconception Hint</b>: Remember to complete the subtraction from $\\frac{5}{6}$."
  },
  "T2_Q3": {
    "7.2": "💡 <b>Misconception Hint</b>: Evaluate multiplication and division first: $\\frac{3.6 \\times 0.8}{0.4} = \\frac{2.88}{0.4} = 7.2$. Then add $1.8$: $7.2 + 1.8 = 9.0$.",
    "11.0": "💡 <b>Misconception Hint</b>: Check decimal division $\\frac{2.88}{0.4} = 7.2$."
  },

  // --- TIER 3: Hard Complex Fraction Division & Rational Equations ---
  "T3_Q1": {
    "15/192": "💡 <b>Misconception Hint</b>: When dividing by a fraction product, invert the denominator fraction and multiply: $\\frac{3}{8} \\div \\frac{5}{24} = \\frac{3}{8} \\times \\frac{24}{5} = \\frac{9}{5}$.",
    "5/9": "💡 <b>Misconception Hint</b>: You inverted the numerator fraction instead of the denominator fraction."
  },
  "T3_Q2": {
    "1 / ((x+2)(x-2))": "💡 <b>Misconception Hint</b>: Cross-multiply numerators: $4(x-2) - 3(x+2) = 4x - 8 - 3x - 6 = x - 14$.",
    "(x + 2) / ((x+2)(x-2))": "💡 <b>Misconception Hint</b>: Watch out for distributing the negative sign: $-3(x+2) = -3x - 6$."
  },
  "T3_Q3": {
    "x = 2": "💡 <b>Misconception Hint</b>: Subtract $\\frac{3}{x+2}$ from both sides: $\\frac{1}{x} = \\frac{3}{x+2} \\Rightarrow x+2 = 3x \\Rightarrow 2x = 2 \\Rightarrow x = \\frac{2}{3}$.",
    "x = 1": "💡 <b>Misconception Hint</b>: Check cross multiplying $x+2 = 3x$."
  },

  // --- TIER 4: Expert Rational Algebraic Expressions & Limits ---
  "T4_Q1": {
    "(x + 2) / (2x + 2)": "💡 <b>Misconception Hint</b>: You added numerators and denominators across directly. Cross multiply by common denominator $(x+3)(x-1)$.",
    "(x^2 - 3x + 6) / ((x+3)(x-1))": "💡 <b>Misconception Hint</b>: Check expanding $x(x-1) + 2(x+3) = x^2 - x + 2x + 6 = x^2 + x + 6$."
  },
  "T4_Q2": {
    "2 / (x(x+h))": "💡 <b>Misconception Hint</b>: Check the numerator subtraction: $2(x - (x+h)) = -2h$, so the negative sign remains!",
    "0": "💡 <b>Misconception Hint</b>: $\\frac{2}{x+h}$ and $\\frac{2}{x}$ are not equal when $h \\neq 0$."
  },
  "T4_Q3": {
    "x = 2": "💡 <b>Misconception Hint</b>: $x = 2$ makes the denominator $x-2 = 0$ (undefined value), so it is an extraneous solution!",
    "x = 7/3": "💡 <b>Misconception Hint</b>: Check expanding $3x(x+2) + 4(x-2) = 3x^2 + 10x - 8 = 28$."
  }
};

let currentTier = 2; // Start at Tier 2 Medium
let userStepCount = 0; // Exactly 4 questions per user session
const tierIndices = { 1: 0, 2: 0, 3: 0, 4: 0 }; // Used variant per tier

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
  
  let tierName = "Tier 2: Medium (Fractions)";
  let tierColor = "#7c3aed";
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
      let mistakes = parseInt(sessionStorage.getItem('test2Mistakes') || '0', 10) + 1;
      sessionStorage.setItem('test2Mistakes', mistakes);
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
  const closeButton = document.querySelector("#closeButton");
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
    }

    totalQuestions++;
  }

  const currentMastery = parseInt(sessionStorage.getItem('test2MasteryScore') || '50', 10);

  // Must have at least 2 correct answers out of 4 (>= 50%)
  if (correctCount >= 2) {
    if (closeButton) closeButton.style.display = 'inline-block';

    resultMessage.innerHTML += `<br><br>🎉 <strong>Module 1 Mastered! (${correctCount}/4 Correct - ${Math.round((correctCount/4)*100)}%)</strong>`;
    resultMessage.innerHTML += `<br>You passed the requirement (at least 50% correct). Click below to advance!`;
    resultMessage.innerHTML += `<br><br><button onclick="openPage('linear_exercise.html')" class="button gray" style="background:#7c3aed; color:#ffffff; font-weight:bold; padding:10px 20px; border-radius:6px; cursor:pointer;">Next Exercise ➔</button>`;

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
    if (closeButton) closeButton.style.display = 'none'; // HIDE Close button - force user to re-attempt!

    resultMessage.innerHTML += `<br><br>⚠️ <strong>Score: ${correctCount}/4 Correct (${Math.round((correctCount/4)*100)}%)</strong>`;
    resultMessage.innerHTML += `<br>You must answer at least 2 out of 4 questions correctly (50%) to advance.`;
    resultMessage.innerHTML += `<br><br><button onclick="reattemptExercise()" class="button gray" style="background:#7c3aed; color:#ffffff; font-weight:bold; padding:10px 20px; border-radius:6px; cursor:pointer;">🔁 Re-attempt Module 1</button>`;
  }

  if (dialog) {
    dialog.showModal();
    if (closeButton) {
      closeButton.onclick = () => dialog.close();
    }
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