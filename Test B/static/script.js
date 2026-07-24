const correctAnswers = {}; // Initialize as an empty object
const firstAttempts = {};

// Misconception Catalog for Module 1 (Mixed Operations & Rational Expressions - Test B Isomorphic)
const misconceptionHintsModule1 = {
  "T1_Q1": { "12195": "💡 <b>Misconception Hint</b>: Order of Operations rule (BODMAS/PEMDAS)! Multiply ($291 \\times 3 = 873$) and divide ($180 \\div 9 = 20$) before subtracting/adding.", "3483": "💡 <b>Misconception Hint</b>: Check the final addition term: $4356 - 873 + 20 = 3503$." },
  "T1_Q2": { "96": "💡 <b>Misconception Hint</b>: Calculate parentheses first ($18-6=12$), then division ($360 \\div 12 = 30$), then multiplication ($14 \\times 5 = 70$), so $30 + 70 = 100$.", "110": "💡 <b>Misconception Hint</b>: Double check your multiplication $14 \\times 5 = 70$." },
  "T1_Q3": { "7/15": "💡 <b>Misconception Hint</b>: Find common denominator (15): $\\frac{7}{15} + \\frac{3}{15} - \\frac{5}{15} = \\frac{5}{15} = \\frac{1}{3}$.", "1/2": "💡 <b>Misconception Hint</b>: Check simplifying $\\frac{5}{15} = \\frac{1}{3}$." },
  "T2_Q1": { "4/7": "💡 <b>Misconception Hint</b>: You added and subtracted numerators and denominators across directly. Find the least common denominator (LCD = 20) first!", "15/20": "💡 <b>Misconception Hint</b>: Check the subtraction step: $\\frac{8}{20} + \\frac{15}{20} - \\frac{10}{20} = \\frac{13}{20}$." },
  "T2_Q2": { "1/3": "💡 <b>Misconception Hint</b>: Calculate parentheses first: $\\frac{1}{3} + \\frac{1}{4} = \\frac{7}{12}$. Multiply: $\\frac{7}{12} \\times \\frac{4}{7} = \\frac{1}{3}$. Subtract: $\\frac{5}{6} - \\frac{2}{6} = \\frac{3}{6} = \\frac{1}{2}$.", "3/4": "💡 <b>Misconception Hint</b>: Remember to complete the subtraction from $\\frac{5}{6}$." },
  "T2_Q3": { "7.2": "💡 <b>Misconception Hint</b>: Evaluate multiplication/division first: $\\frac{3.6 \\times 0.8}{0.4} = 7.2$. Then add $1.8$: $7.2 + 1.8 = 9.0$.", "11.0": "💡 <b>Misconception Hint</b>: Check decimal division $\\frac{2.88}{0.4} = 7.2$." },
  "T3_Q1": { "15/192": "💡 <b>Misconception Hint</b>: When dividing by a fraction product, invert the denominator fraction and multiply: $\\frac{3}{8} \\div \\frac{5}{24} = \\frac{3}{8} \\times \\frac{24}{5} = \\frac{9}{5}$.", "5/9": "💡 <b>Misconception Hint</b>: You inverted the numerator fraction instead of the denominator fraction." },
  "T3_Q2": { "1 / ((x+2)(x-2))": "💡 <b>Misconception Hint</b>: Cross-multiply numerators: $4(x-2) - 3(x+2) = 4x - 8 - 3x - 6 = x - 14$.", "(x + 2) / ((x+2)(x-2))": "💡 <b>Misconception Hint</b>: Watch out for distributing the negative sign: $-3(x+2) = -3x - 6$." },
  "T3_Q3": { "x = 2": "💡 <b>Misconception Hint</b>: Subtract $\\frac{3}{x+2}$ from both sides: $\\frac{1}{x} = \\frac{3}{x+2} \\Rightarrow x+2 = 3x \\Rightarrow 2x = 2 \\Rightarrow x = \\frac{2}{3}$.", "x = 1": "💡 <b>Misconception Hint</b>: Check cross multiplying $x+2 = 3x$." },
  "T4_Q1": { "(x + 2) / (2x + 2)": "💡 <b>Misconception Hint</b>: You added numerators and denominators across directly. Cross multiply by common denominator $(x+3)(x-1)$.", "(x^2 - 3x + 6) / ((x+3)(x-1))": "💡 <b>Misconception Hint</b>: Check expanding $x(x-1) + 2(x+3) = x^2 - x + 2x + 6 = x^2 + x + 6$." },
  "T4_Q2": { "2 / (x(x+h))": "💡 <b>Misconception Hint</b>: Check numerator subtraction: $2(x - (x+h)) = -2h$, so the negative sign remains!", "0": "💡 <b>Misconception Hint</b>: $\\frac{2}{x+h}$ and $\\frac{2}{x}$ are not equal when $h \\neq 0$." },
  "T4_Q3": { "x = 2": "💡 <b>Misconception Hint</b>: $x = 2$ makes denominator $x-2 = 0$ (undefined), so it is extraneous!", "x = 7/3": "💡 <b>Misconception Hint</b>: Check expanding $3x(x+2) + 4(x-2) = 3x^2 + 10x - 8 = 28$." }
};

// Misconception Catalog for Module 2 (Differentiation & Integration - Test B Isomorphic)
const misconceptionHintsModule2 = {
  "M2_T1_Q1": { "16x^3 + 6x + 9": "💡 <b>Misconception Hint</b>: Derivative of constant term $+9$ is $0$!", "4x^3 + 3x - 5": "💡 <b>Misconception Hint</b>: Multiply exponent by coefficient: $4 \\times 4 = 16$, $2 \\times 3 = 6$." },
  "M2_T1_Q2": { "18x + 6 + C": "💡 <b>Misconception Hint</b>: You differentiated instead of integrating! Use $\\int x^n dx = \\frac{x^{n+1}}{n+1} + C$.", "9x^3 + 6x^2 - 4x + C": "💡 <b>Misconception Hint</b>: Divide by new power: $\\frac{9x^3}{3} = 3x^3$ and $\\frac{6x^2}{2} = 3x^2$." },
  "M2_T1_Q3": { "3/sqrt(x) + 5/x^2": "💡 <b>Misconception Hint</b>: Derivative of $\\frac{5}{x} = 5x^{-1}$ is $-5x^{-2} = -\\frac{5}{x^2}$.", "3sqrt(x) - 5x^-2": "💡 <b>Misconception Hint</b>: Derivative of $6x^{1/2}$ is $6 \\cdot \\frac{1}{2} x^{-1/2} = \\frac{3}{\\sqrt{x}}$." },
  "M2_T2_Q1": { "4e^{3x} + 2\\cos(5x)": "💡 <b>Misconception Hint</b>: Apply Chain Rule! Multiply by inner derivative: $\\frac{d}{dx}(e^{3x}) = 3e^{3x}$ and $\\frac{d}{dx}(\\sin(5x)) = 5\\cos(5x)$.", "12e^{3x} - 10\\cos(5x)": "💡 <b>Misconception Hint</b>: Derivative of $\\sin(u)$ is positive $+\\cos(u)$." },
  "M2_T2_Q2": { "10": "💡 <b>Misconception Hint</b>: Calculate $F(2) - F(1) = (16-8) - (2-2) = 8 - 0 = 8$.", "6": "💡 <b>Misconception Hint</b>: Check evaluating $F(2) = 2(8) - 2(4) = 16 - 8 = 8$." },
  "M2_T2_Q3": { "24": "💡 <b>Misconception Hint</b>: Derivative is $y' = 9x^2 - 4$. Evaluate at $x = 2$: $9(4) - 4 = 32$.", "36": "💡 <b>Misconception Hint</b>: Do not forget to subtract $4$: $36 - 4 = 32$." },
  "M2_T3_Q1": { "4x^3 * 1/x": "💡 <b>Misconception Hint</b>: Use Product Rule: $\\frac{d}{dx}(u \\cdot v) = u'v + uv'$. Do not just multiply derivatives!", "4x^3 ln(x)": "💡 <b>Misconception Hint</b>: Include the second product term: $x^4 \\cdot \\frac{1}{x} = x^3$." },
  "M2_T3_Q2": { "x^3 cos(x^3 + 2) + C": "💡 <b>Misconception Hint</b>: Substitution $u = x^3+2 \\Rightarrow du = 3x^2 \, dx$. Integral is $\\int \\sin(u) du = -\\cos(u) + C$.", "cos(x^3 + 2) + C": "💡 <b>Misconception Hint</b>: Integral of $\\sin(u)$ is $-\\cos(u)$." },
  "M2_T3_Q3": { "2x / 3": "💡 <b>Misconception Hint</b>: Use Quotient Rule: $\\frac{u'v - uv'}{v^2}$. Do not differentiate numerator and denominator separately!", "(3x^2 + 4x + 9) / (3x - 2)^2": "💡 <b>Misconception Hint</b>: Expand numerator carefully: $2x(3x-2) - 3(x^2+3) = 6x^2 - 4x - 3x^2 - 9 = 3x^2 - 4x - 9$." },
  "M2_T4_Q1": { "x^2 e^{2x} + C": "💡 <b>Misconception Hint</b>: Use Integration by Parts: $\\int u \, dv = uv - \\int v \, du$. Do not just integrate factors separately!", "e^{2x}(x + 1/2) + C": "💡 <b>Misconception Hint</b>: Formula gives $x e^{2x} - \\int e^{2x} dx = e^{2x}(x - \\frac{1}{2}) + C$." },
  "M2_T4_Q2": { "1 / (x^4 + 5x)": "💡 <b>Misconception Hint</b>: Apply Chain Rule for logarithm: $\\frac{d}{dx}\\ln(g(x)) = \\frac{g'(x)}{g(x)} = \\frac{4x^3 + 5}{x^4 + 5x}$.", "(4x^3 + 5) / x": "💡 <b>Misconception Hint</b>: Keep full denominator $x^4 + 5x$." },
  "M2_T4_Q3": { "1/2": "💡 <b>Misconception Hint</b>: Substitute $u = \\cos(x) \\Rightarrow du = -\\sin(x) dx$. Integral is $\\int_0^1 u^2 du = [\\frac{u^3}{3}]_0^1 = \\frac{1}{3}$.", "1": "💡 <b>Misconception Hint</b>: Evaluate $[\\frac{u^3}{3}]_0^1 = \\frac{1}{3} - 0 = \\frac{1}{3}$." }
};

// Misconception Catalog for Module 3 (Linear & Quadratic Equations - Test B Isomorphic)
const misconceptionHintsModule3 = {
  "M3_T1_Q1": { "x = 5": "💡 <b>Misconception Hint</b>: Add $8$ to both sides first: $5x = 30 \\Rightarrow x = 6$.", "x = 14/5": "💡 <b>Misconception Hint</b>: $30 \\div 5 = 6$." },
  "M3_T1_Q2": { "x = 4": "💡 <b>Misconception Hint</b>: After dividing by $4$, $x - 3 = 4 \\Rightarrow x = 7$.", "x = 1": "💡 <b>Misconception Hint</b>: Add $3$ to both sides." },
  "M3_T1_Q3": { "x = 8": "💡 <b>Misconception Hint</b>: Quadratic equations have both positive and negative roots: $x = \\pm 8$.", "x = 32": "💡 <b>Misconception Hint</b>: Take the square root, do not divide by 2!" },
  "M3_T2_Q1": { "x = -3, -4": "💡 <b>Misconception Hint</b>: $(x-3)(x-4) = 0 \\Rightarrow x = +3, +4$. Watch signs!", "x = 2, 6": "💡 <b>Misconception Hint</b>: $-2 + (-6) = -8$, not $-7$." },
  "M3_T2_Q2": { "x = -2, 7": "💡 <b>Misconception Hint</b>: $(x+7)(x-2) = 0 \\Rightarrow x = -7, +2$.", "x = 1, -14": "💡 <b>Misconception Hint</b>: Check sum $1 + (-14) = -13 \\neq 5$." },
  "M3_T2_Q3": { "x = 4": "💡 <b>Misconception Hint</b>: Do not divide by $x$! $x = 0$ is also a valid root: $3x(x-4)=0$.", "x = 0, -4": "💡 <b>Misconception Hint</b>: $x - 4 = 0 \\Rightarrow x = +4$." },
  "M3_T3_Q1": { "x = 1/2, 4": "💡 <b>Misconception Hint</b>: $x = \\frac{-b \\pm \\sqrt{b^2-4ac}}{2a} = \\frac{-9 \\pm 7}{4} = -\\frac{1}{2}, -4$.", "x = -1, -4": "💡 <b>Misconception Hint</b>: Check $\\frac{-9+7}{4} = -\\frac{2}{4} = -\\frac{1}{2}$." },
  "M3_T3_Q2": { "D = -25 (No real roots)": "💡 <b>Misconception Hint</b>: $D = b^2 - 4ac = (-7)^2 - 4(2)(3) = 49 - 24 = +25 > 0$.", "D = 1 (2 real roots)": "💡 <b>Misconception Hint</b>: $49 - 24 = 25$." },
  "M3_T3_Q3": { "x = -2, -6": "💡 <b>Misconception Hint</b>: $(x-4)^2 = 4 \\Rightarrow x - 4 = \\pm 2 \\Rightarrow x = 6, 2$.", "x = 3, 4": "💡 <b>Misconception Hint</b>: Check $(3)^2 - 8(3) + 12 = -3 \\neq 0$." },
  "M3_T4_Q1": { "(x,y) = (6,6)": "💡 <b>Misconception Hint</b>: $6 \\times 6 = 36 \\neq 35$. Solve $x(12-x) = 35$.", "(x,y) = (10,2)": "💡 <b>Misconception Hint</b>: $10 \\times 2 = 20 \\neq 35$." },
  "M3_T4_Q2": { "x = 1, 9": "💡 <b>Misconception Hint</b>: Substitute $u = x^2 \\Rightarrow u = 1, 9 \\Rightarrow x = \\pm 1, \\pm 3$.", "x = +-1, +-9": "💡 <b>Misconception Hint</b>: $\\sqrt{9} = 3$, not $9$." },
  "M3_T4_Q3": { "x = 4, 16": "💡 <b>Misconception Hint</b>: $\\sqrt{x}$ cannot be negative! $u = -4$ yields no real $x$.", "x = -4, 2": "💡 <b>Misconception Hint</b>: These are values of $u = \\sqrt{x}$, so $x = u^2 = 4$." }
};

let currentTier = 2; // Start at Tier 2 Medium
let userStepCount = 0; // Exactly 4 questions per user session
const tierIndices = { 1: 0, 2: 0, 3: 0, 4: 0 }; // Used variant per tier

function resetExerciseFormState() {
  const form = document.getElementById('exerciseForm');
  if (form) form.reset();

  const inputs = document.querySelectorAll('input[type="radio"]');
  inputs.forEach(input => {
    input.checked = false;
  });

  const msgs = document.querySelectorAll('[id^="resultMessage_"]');
  msgs.forEach(msg => {
    msg.innerHTML = '';
  });

  const checkBtns = document.querySelectorAll('button[onclick*="checkAnswer"]');
  checkBtns.forEach(btn => {
    btn.disabled = false;
  });

  const nextBtns = document.querySelectorAll('[id^="btn_next_"]');
  nextBtns.forEach(btn => {
    btn.disabled = true;
  });

  for (const key in firstAttempts) delete firstAttempts[key];
  for (const key in correctAnswers) delete correctAnswers[key];

  currentTier = 2;
  userStepCount = 0;
  for (const k in tierIndices) tierIndices[k] = 0;

  const path = window.location.pathname.toLowerCase();
  const isMod3 = path.includes('module3_exercise') || path.includes('quadratic_exercise');
  const isMod2 = path.includes('module2_exercise') || path.includes('deri_exercise1');
  const startId = isMod3 ? 'M3_T2_Q1' : (isMod2 ? 'M2_T2_Q1' : 'T2_Q1');

  const allDivs = document.querySelectorAll('[id^="T"], [id^="M2_T"], [id^="M3_T"]');
  allDivs.forEach(div => div.style.display = 'none');

  const startDiv = document.getElementById(startId);
  if (startDiv) startDiv.style.display = 'block';
}

function getMisconceptionCatalog() {
  const path = window.location.pathname.toLowerCase();
  if (path.includes('module3_exercise') || path.includes('quadratic_exercise')) {
    return misconceptionHintsModule3;
  }
  if (path.includes('module2_exercise') || path.includes('deri_exercise1')) {
    return misconceptionHintsModule2;
  }
  return misconceptionHintsModule1;
}

// Update Adaptive Mastery Score (BKT Light Model)
function updateMasteryScore(isCorrect) {
  const path = window.location.pathname.toLowerCase();
  const key = (path.includes('module3_exercise') || path.includes('quadratic_exercise')) ? 'test2Mod3MasteryScore' : ((path.includes('module2_exercise') || path.includes('deri_exercise1')) ? 'test2Mod2MasteryScore' : 'test2MasteryScore');
  let score = parseInt(sessionStorage.getItem(key) || '50', 10);
  if (isCorrect) {
    score = Math.min(100, score + 25);
  } else {
    score = Math.max(0, score - 15);
  }
  sessionStorage.setItem(key, score);
  renderMasteryWidget();
  return score;
}

// Render Top Adaptive Mastery Widget
function renderMasteryWidget() {
  let widget = document.getElementById('adaptiveMasteryWidget');
  const path = window.location.pathname.toLowerCase();
  const key = (path.includes('module3_exercise') || path.includes('quadratic_exercise')) ? 'test2Mod3MasteryScore' : ((path.includes('module2_exercise') || path.includes('deri_exercise1')) ? 'test2Mod2MasteryScore' : 'test2MasteryScore');
  const score = parseInt(sessionStorage.getItem(key) || '50', 10);
  
  let tierName = "Tier 2: Medium (Baseline)";
  let tierColor = "#7c3aed";
  if (currentTier === 4) {
    tierName = "Tier 4: Expert Level";
    tierColor = "#16a34a";
  } else if (currentTier === 3) {
    tierName = "Tier 3: Hard Level";
    tierColor = "#7c3aed";
  } else if (currentTier === 1) {
    tierName = "Tier 1: Easy Level";
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

  const path = window.location.pathname.toLowerCase();
  let prefix = 'T';
  if (path.includes('module3_exercise') || path.includes('quadratic_exercise')) prefix = 'M3_T';
  else if (path.includes('module2_exercise') || path.includes('deri_exercise1')) prefix = 'M2_T';

  const nextQId = `${prefix}${currentTier}_Q${variantIndex}`;

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
  const catalog = getMisconceptionCatalog();

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
    if (catalog[questionId] && catalog[questionId][selectedAnswer.value]) {
      hint = "<br>" + catalog[questionId][selectedAnswer.value];
    } else {
      hint = "<br>💡 <b>Hint</b>: Review operational precedence, calculus rules, or linear/quadratic formulas.";
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
  resetExerciseFormState();
  const dialog = document.querySelector("#resultDialog");
  if (dialog) dialog.close();
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

  const path = window.location.pathname.toLowerCase();
  const isMod3 = path.includes('module3_exercise') || path.includes('quadratic_exercise');
  const isMod2 = path.includes('module2_exercise') || path.includes('deri_exercise1');

  let moduleTitle = 'Module 1 (Mixed Operations)';
  let nextPage = 'module2_explanation.html';
  let nextBtnText = 'Next Module (Differentiation & Integration) ➔';

  if (isMod2) {
    moduleTitle = 'Module 2 (Differentiation & Integration)';
    nextPage = 'module3_explanation.html';
    nextBtnText = 'Next Module (Linear & Quadratic Equations) ➔';
  } else if (isMod3) {
    moduleTitle = 'Module 3 (Linear & Quadratic Equations)';
    nextPage = 'finish.html';
    nextBtnText = 'Finish Study ➔';
  }

  // Must have at least 2 correct answers out of 4 (>= 50%)
  if (correctCount >= 2) {
    resultMessage.innerHTML += `<br><br>🎉 <strong>${moduleTitle} Mastered! (${correctCount}/4 Correct - ${Math.round((correctCount/4)*100)}%)</strong>`;
    resultMessage.innerHTML += `<br>You passed the requirement (at least 50% correct). Click below to advance!`;
    resultMessage.innerHTML += `<br><br><button onclick="openPage('${nextPage}')" class="button gray" style="background:#7c3aed; color:#ffffff; font-weight:bold; padding:10px 20px; border-radius:6px; cursor:pointer;">${nextBtnText}</button>`;

    if (isMod3 || lastPage == true) {  
      let endTime = sessionStorage.getItem('testBEndTime');
      if (!endTime) {
        endTime = Date.now();
        sessionStorage.setItem('testBEndTime', endTime);
      }

      resultMessage.innerHTML += "<br><br><strong>All exercises are successfully completed!</strong>";
      resultMessage.innerHTML += "<br>Click <strong>Finish Study ➔</strong> to view your total time.";
    }
  } 
  else {
    let modLabel = isMod3 ? 'Module 3' : (isMod2 ? 'Module 2' : 'Module 1');
    resultMessage.innerHTML += `<br><br>⚠️ <strong>Score: ${correctCount}/4 Correct (${Math.round((correctCount/4)*100)}%)</strong>`;
    resultMessage.innerHTML += `<br>You must answer at least 2 out of 4 questions correctly (50%) to advance.`;
    resultMessage.innerHTML += `<br><br><button onclick="reattemptExercise()" class="button gray" style="background:#7c3aed; color:#ffffff; font-weight:bold; padding:10px 20px; border-radius:6px; cursor:pointer;">🔁 Re-attempt ${modLabel}</button>`;
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
  resetExerciseFormState();
  renderPhaseBadge();
  renderSkipButton();
  renderMasteryWidget();
});
window.addEventListener('load', () => {
  resetExerciseFormState();
  renderPhaseBadge();
  renderSkipButton();
  renderMasteryWidget();
});
window.addEventListener('pageshow', () => {
  resetExerciseFormState();
});