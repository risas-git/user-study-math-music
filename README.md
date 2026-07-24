# 🎵 Math & Music Adaptive ITS User Study

> **Final Project** for *392049 User Studies in Interactive Intelligent Systems (SoSe 2026)*  
> **Repository:** [user-study-math-music](https://github.com/risas-git/user-study-math-music)  
> **🚀 Start Entire User Study (Participant Entry):** [https://risas-git.github.io/user-study-math-music/](https://risas-git.github.io/user-study-math-music/)

---

## ⚡ Quick Links & Navigation (For Reviewers & Coworkers)

Use these direct links to inspect specific modules, explanations, examples, or answer keys quickly:

| Content / Module | Explanation Page | Formula Sheet & Examples | Test A Exercise | Test B Exercise |
| :--- | :--- | :--- | :--- | :--- |
| **Module 1**: Mixed Operations | [📖 View Explanation](https://risas-git.github.io/user-study-math-music/Test%20A/templates/module1_explanation.html) | [📝 View Examples](https://risas-git.github.io/user-study-math-music/Test%20A/templates/module1_example.html) | [✏️ Start Test A M1](https://risas-git.github.io/user-study-math-music/Test%20A/templates/module1_exercise.html) | [✏️ Start Test B M1](https://risas-git.github.io/user-study-math-music/Test%20B/templates/module1_exercise.html) |
| **Module 2**: Calculus | [📖 View Explanation](https://risas-git.github.io/user-study-math-music/Test%20A/templates/module2_explanation.html) | [📝 View Examples](https://risas-git.github.io/user-study-math-music/Test%20A/templates/module2_example.html) | [✏️ Start Test A M2](https://risas-git.github.io/user-study-math-music/Test%20A/templates/module2_exercise.html) | [✏️ Start Test B M2](https://risas-git.github.io/user-study-math-music/Test%20B/templates/module2_exercise.html) |
| **Module 3**: Algebra Equations | [📖 View Explanation](https://risas-git.github.io/user-study-math-music/Test%20A/templates/module3_explanation.html) | [📝 View Examples](https://risas-git.github.io/user-study-math-music/Test%20A/templates/module3_example.html) | [✏️ Start Test A M3](https://risas-git.github.io/user-study-math-music/Test%20A/templates/module3_exercise.html) | [✏️ Start Test B M3](https://risas-git.github.io/user-study-math-music/Test%20B/templates/module3_exercise.html) |

### 🔑 Question Bank & Answer Keys
- 📋 **[Full Question & Answer Bank (Interactive Web Page)](https://risas-git.github.io/user-study-math-music/Test_A_and_Test_B_Question_Bank.html)**
- 📄 **[Full Question & Answer Bank (GitHub Markdown View)](https://github.com/risas-git/user-study-math-music/blob/main/Test_A_and_Test_B_Question_Bank.md)**

---

## 📌 Research Objective

This user study investigates the **cognitive and behavioral effects of background music versus silence on mathematical problem-solving performance, mastery speed, and mistake rates** within an adaptive Intelligent Tutoring System (ITS).

This project is built upon and significantly extends the open-source foundation of [DromedaryITS.io by adiakhalid](https://github.com/adiakhalid/DromedaryITS.io).

---

## 🚀 Key Improvements & Adaptive Engine Extensions

While the original codebase provided basic static math exercises, this application transforms the system into a **fully dynamic, adaptive Intelligent Tutoring System (ITS)**:

1. **4-Tier Dynamic Difficulty Engine (BKT-Light Model)**:
   - **Baseline Entry**: Every participant starts at **Tier 2 (Medium)**.
   - **Performance Routing**: Correct answers advance the participant up to **Tier 4 (Expert Level)**; incorrect answers route the participant down to **Tier 1 (Easy Level)**.
   - **Fixed Trajectory Length**: Each participant receives exactly **4 personalized questions per module** adapted dynamically to their skill level.

2. **Pedagogical Misconception Hints (Instant Feedback)**:
   - Rather than just displaying "Incorrect", the system pinpoints specific mathematical misconceptions (e.g., BODMAS order errors, missing product rule terms, dropping extraneous roots) with dynamically typeset MathJax LaTeX equations.

3. **Mastery Progression Gate ($\ge 50\%$ Score Rule)**:
   - Participants must score **at least 50% (2 out of 4 correct)** to unlock the next math module.
   - If a participant scores $< 50\%$, the modal dialog restricts progression, requiring them to re-attempt the module to ensure learning acquisition.

---

## ✨ Features Specific to This Study

- 📝 **Participant Registration & Pretest Score Input**:
  Collects Participant ID, self-reported baseline pretest score, and initial math confidence before starting.
- 🎲 **Counterbalanced AB/BA Group Assignment**:
  Automatically and randomly assigns participants to eliminate order effect bias:
  - **Group 1 (AB)**: Phase 1 (Test A *With Music*) $\rightarrow$ Phase 2 (Test B *Without Music*)
  - **Group 2 (BA)**: Phase 1 (Test A *Without Music*) $\rightarrow$ Phase 2 (Test B *With Music*)
- ⏱️ **Global Timers & Active Condition Badges**:
  Tracks total task duration and displays fixed header badges (`🎵 WITH MUSIC` vs `🔇 WITHOUT MUSIC`).
- 📚 **3 Structured Math Modules (Isomorphic Test A & Test B Pairs)**:
  - **Module 1**: Mixed Operations & Rational Expressions
  - **Module 2**: Differentiation & Integration
  - **Module 3**: Linear & Quadratic Equations
- 📊 **Automated Google Sheets Database Sync**:
  Participant completion data, pretest scores, mistake counts, phase completion times, and mastery scores are automatically submitted in real-time to a cloud database via Google Apps Script Webhook.

---

## 📊 Live Database & Results Access

Collaborators and researchers can view real-time participant results directly in the study database:

👉 **[View Study Results in Google Sheets](https://docs.google.com/spreadsheets/d/1sKCx_820smp_PYYnc3YiOn2Cm9aLMFtOTcHEAywJfwo/edit?usp=sharing)** *(Real-time participant data document)*

---

## 🤖 AI Usage Disclosure

- **Mathematical Content & Explanations**: Math questions, distractors, step-by-step worked examples, and misconception catalog hints were generated and verified with the assistance of Generative AI models. Please note minor mathematical edge cases may occur.
- **Full-Stack System Implementation**: Generative AI tools were fully utilized to design the adaptive trajectory algorithms, MathJax typesetting integration, browser cache isolation, state management, and web application architecture to fulfill the experimental requirements of this user study.
