/**
 * ============================================================================
 * D492 COMPTIA DATA+ (DA0-002) - WHO WANTS TO BE A MILLIONAIRE
 * CORE GAME ENGINE & WEB AUDIO SYNTHESIZER (js/engine.js)
 * ============================================================================
 */

(function () {
  "use strict";

  // --------------------------------------------------------------------------
  // 1. WEB AUDIO API SOUND EFFECTS SYNTHESIZER (No external MP3s required)
  // --------------------------------------------------------------------------
  class StudioAudio {
    constructor() {
      this.ctx = null;
      this.muted = false;
    }

    init() {
      if (!this.ctx) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (AudioCtx) this.ctx = new AudioCtx();
      }
      if (this.ctx && this.ctx.state === "suspended") {
        this.ctx.resume();
      }
    }

    toggleMute() {
      this.muted = !this.muted;
      return this.muted;
    }

    playTone(freq, type, duration, delay = 0, gainVal = 0.14) {
      if (this.muted) return;
      this.init();
      if (!this.ctx) return;

      const now = this.ctx.currentTime + delay;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.exponentialRampToValueAtTime(gainVal, now + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + duration + 0.02);
    }

    playStartShow() {
      // Dramatic rising studio arpeggio
      [220, 277.18, 329.63, 440, 554.37, 659.25].forEach((f, i) => {
        this.playTone(f, "triangle", 0.35, i * 0.08, 0.15);
      });
    }

    playLockIn() {
      // Classic suspense double-hit chime
      this.playTone(392.0, "sine", 0.25, 0, 0.18);
      this.playTone(196.0, "triangle", 0.45, 0.05, 0.15);
    }

    playCorrect(isMilestone = false) {
      if (isMilestone) {
        // Major Safe Haven fanfare
        [523.25, 659.25, 783.99, 1046.5, 1318.5].forEach((f, i) => {
          this.playTone(f, "triangle", 0.45, i * 0.09, 0.18);
        });
      } else {
        // Bright emerald chord
        [440, 554.37, 659.25, 880].forEach((f, i) => {
          this.playTone(f, "sine", 0.3, i * 0.06, 0.15);
        });
      }
    }

    playShieldSaved() {
      // Sci-fi cyan shield deflection sound
      this.playTone(587.33, "sine", 0.2, 0, 0.16);
      this.playTone(440, "triangle", 0.25, 0.12, 0.16);
      this.playTone(659.25, "sine", 0.35, 0.24, 0.16);
    }

    playWrong() {
      // Dramatic minor drop
      this.playTone(311.13, "sawtooth", 0.35, 0, 0.12);
      this.playTone(233.08, "sawtooth", 0.65, 0.2, 0.14);
    }

    playLifeline() {
      // Whoosh chime
      [659.25, 880, 1174.66].forEach((f, i) => {
        this.playTone(f, "sine", 0.22, i * 0.06, 0.14);
      });
    }

    playTick(urgent = false) {
      this.playTone(urgent ? 880 : 520, "sine", 0.06, 0, urgent ? 0.12 : 0.06);
    }
  }

  const audio = new StudioAudio();

  // --------------------------------------------------------------------------
  // 2. GAME STATE OBJECT
  // --------------------------------------------------------------------------
  const state = {
    studentName: "",
    mode: "super", // "classic", "super", or "blitz"
    selectedBlitzDomain: 1,
    questions: [],
    currentIndex: 0,
    isAnsweringAllowed: false,
    timerEnabled: true,
    timerLocked: false,
    timeLeft: 30,
    timerInterval: null,
    hintUsedOnCurrentQ: false,
    eliminatedOptions: [],

    // Money & Progression
    currentPrize: 0,
    lastSafeHavenPrize: 0,
    lastSafeHavenStep: 0,
    shieldActive: false,
    bonusDropIndices: [],

    // Lifelines
    lifelines: {
      fiftyFifty: 1,
      phoneCoach: 1,
      askAudience: 1
    },

    // Outcome & Diagnostic Tracking
    runOutcome: "", // "won", "completed_super", "walked_away", "lost_classic", "completed_blitz"
    walkedAway: false,
    startTime: null,
    endTime: null,
    totalCorrectFirstTry: 0,
    totalAnswered: 0,
    domainStats: {}, // { 1: { correct: 0, total: 0 }, ... }
    missedQuestions: []
  };

  // --------------------------------------------------------------------------
  // 3. DOM ELEMENT REFERENCES
  // --------------------------------------------------------------------------
  const dom = {};

  function cacheDom() {
    // Views
    dom.lobbyView = document.getElementById("lobby-view");
    dom.stageView = document.getElementById("stage-view");
    dom.resultsView = document.getElementById("results-view");

    // Top HUD
    dom.hudShield = document.getElementById("hud-shield");
    dom.hudShieldText = document.getElementById("hud-shield-text");
    dom.timerToggleInput = document.getElementById("timer-toggle-input");
    dom.timerToggleLabel = document.getElementById("timer-toggle-label");
    dom.timerTooltipBox = document.getElementById("timer-tooltip-box");
    dom.muteBtn = document.getElementById("mute-btn");
    dom.walkAwayBtn = document.getElementById("walk-away-btn");
    dom.returnLobbyBtn = document.getElementById("return-lobby-btn");

    // Lobby Inputs
    dom.studentNameInput = document.getElementById("student-name-input");
    dom.blitzDomainSelect = document.getElementById("blitz-domain-select");
    dom.startClassicBtn = document.getElementById("start-classic-btn");
    dom.startSuperBtn = document.getElementById("start-super-btn");
    dom.startBlitzBtn = document.getElementById("start-blitz-btn");

    // Stage Elements
    dom.qCounterPill = document.getElementById("q-counter-pill");
    dom.qPrizePill = document.getElementById("q-prize-pill");
    dom.bonusDropPill = document.getElementById("bonus-drop-pill");
    dom.clockRing = document.getElementById("clock-ring");
    dom.clockText = document.getElementById("clock-text");

    // Lifelines
    dom.btn5050 = document.getElementById("ll-5050");
    dom.btnCoach = document.getElementById("ll-coach");
    dom.btnAudience = document.getElementById("ll-audience");
    dom.badge5050 = document.getElementById("badge-5050");
    dom.badgeCoach = document.getElementById("badge-coach");
    dom.badgeAudience = document.getElementById("badge-audience");

    dom.coachDrawer = document.getElementById("coach-drawer");
    dom.coachMessage = document.getElementById("coach-message");
    dom.audienceDrawer = document.getElementById("audience-drawer");
    dom.audienceBarsContainer = document.getElementById("audience-bars-container");

    // Question & Answers
    dom.questionText = document.getElementById("question-text");
    dom.answerBtns = {
      A: document.getElementById("ans-btn-A"),
      B: document.getElementById("ans-btn-B"),
      C: document.getElementById("ans-btn-C"),
      D: document.getElementById("ans-btn-D")
    };
    dom.answerTexts = {
      A: document.getElementById("ans-text-A"),
      B: document.getElementById("ans-text-B"),
      C: document.getElementById("ans-text-C"),
      D: document.getElementById("ans-text-D")
    };

    // Rationale & Deep Dive Accordion
    dom.rationaleDrawer = document.getElementById("rationale-drawer");
    dom.rationaleStatus = document.getElementById("rationale-status");
    dom.revealedDomainTag = document.getElementById("revealed-domain-tag");
    dom.rationaleBody = document.getElementById("rationale-body");
    dom.deepDiveToggle = document.getElementById("deep-dive-toggle");
    dom.deepDiveTitleSpan = document.getElementById("deep-dive-title-span");
    dom.deepDiveIcon = document.getElementById("deep-dive-icon");
    dom.deepDiveContent = document.getElementById("deep-dive-content");
    dom.nextQBtn = document.getElementById("next-q-btn");

    // Sidebar Ladder
    dom.ladderTitle = document.getElementById("ladder-title");
    dom.milestoneTracker = document.getElementById("milestone-tracker");
    dom.ladderList = document.getElementById("ladder-list");

    // Results Screen
    dom.resHeadline = document.getElementById("res-headline");
    dom.resSubheadline = document.getElementById("res-subheadline");
    dom.resFinalPrize = document.getElementById("res-final-prize");
    dom.resAccuracy = document.getElementById("res-accuracy");
    dom.resScoreFraction = document.getElementById("res-score-fraction");
    dom.resTimeElapsed = document.getElementById("res-time-elapsed");
    dom.resModeName = document.getElementById("res-mode-name");
    dom.domainBarsContainer = document.getElementById("domain-bars-container");
    dom.outlookBox = document.getElementById("outlook-completion-box");
    dom.ciEmailInput = document.getElementById("ci-email-input");
    dom.sendOutlookBtn = document.getElementById("send-outlook-btn");
    dom.copyReportBtn = document.getElementById("copy-report-btn");
    dom.playAgainBtn = document.getElementById("play-again-btn");
    dom.missedQuestionsList = document.getElementById("missed-questions-list");
  }

  // --------------------------------------------------------------------------
  // 4. INITIALIZATION & HELPER UTILITIES
  // --------------------------------------------------------------------------
  function shuffleArray(arr) {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  function initDomainStats() {
    state.domainStats = {};
    window.GAME_CONFIG.domains.forEach((d) => {
      state.domainStats[d.id] = {
        name: d.name,
        color: d.color,
        correct: 0,
        total: 0
      };
    });
  }

  function buildQuestionsForMode(modeId, blitzDomainId) {
    const bank = window.QUESTION_BANK || [];
    if (modeId === "super") {
      // All 54 questions shuffled across all 5 domains
      return shuffleArray(bank);
    }

    if (modeId === "blitz") {
      const filtered = bank.filter((q) => q.domainId === Number(blitzDomainId));
      return shuffleArray(filtered);
    }

    // Classic 15-Question Run: Stratified sample across all 5 domains (3 per domain),
    // sorted by difficulty (1 -> 2 -> 3) so the $100 to $1,000,000 climb scales naturally
    let selected = [];
    window.GAME_CONFIG.domains.forEach((d) => {
      const domainPool = shuffleArray(bank.filter((q) => q.domainId === d.id));
      selected.push(...domainPool.slice(0, 3));
    });
    selected = shuffleArray(selected);
    selected.sort((a, b) => (a.difficulty || 1) - (b.difficulty || 1));
    return selected.slice(0, 15);
  }

  // --------------------------------------------------------------------------
  // 5. STARTING A GAME MODE
  // --------------------------------------------------------------------------
  function startGame(modeId) {
    const cfg = window.GAME_CONFIG;
    state.studentName = (dom.studentNameInput.value || "").trim() || "D492 Student";
    localStorage.setItem("d492_student_name", state.studentName);

    state.mode = modeId;
    state.selectedBlitzDomain = Number(dom.blitzDomainSelect.value || 1);
    state.questions = buildQuestionsForMode(modeId, state.selectedBlitzDomain);
    state.currentIndex = 0;
    state.currentPrize = 0;
    state.lastSafeHavenPrize = 0;
    state.lastSafeHavenStep = 0;
    state.walkedAway = false;
    state.runOutcome = "";
    state.startTime = Date.now();
    state.totalCorrectFirstTry = 0;
    state.totalAnswered = 0;
    state.missedQuestions = [];
    initDomainStats();

    // Configure Mode-Specific Rules (Shield, Lifelines, Timer Lock, Bonus Drops)
    const modeCfg = cfg.modes[modeId];
    state.shieldActive = Boolean(modeCfg.hasSecondChanceShield);

    state.lifelines = {
      fiftyFifty: cfg.lifelines.startingCounts.fiftyFifty,
      phoneCoach: cfg.lifelines.startingCounts.phoneCoach,
      askAudience: cfg.lifelines.startingCounts.askAudience
    };

    // Random Bonus Lifeline Drop indices for 54-Q Super Millionaire Mode
    state.bonusDropIndices = [];
    if (modeCfg.allowBonusLifelineDrops) {
      // Pick 3 random indices between Q8 and Q48 (excluding safe havens)
      const candidates = [];
      for (let i = 7; i < state.questions.length - 4; i++) {
        if (!modeCfg.safeHavenSteps.includes(i + 1)) candidates.push(i);
      }
      state.bonusDropIndices = shuffleArray(candidates).slice(0, modeCfg.bonusLifelineDropCount || 3);
    }

    // Timer Lock vs Toggle
    if (modeId === "classic") {
      state.timerEnabled = true;
      state.timerLocked = true;
      dom.timerToggleInput.checked = true;
      dom.timerToggleInput.disabled = true;
      dom.timerToggleLabel.classList.add("locked");
    } else {
      state.timerLocked = false;
      dom.timerToggleInput.disabled = false;
      dom.timerToggleLabel.classList.remove("locked");
      state.timerEnabled = dom.timerToggleInput.checked;
    }

    // HUD Visibility
    dom.hudShield.style.display = modeCfg.hasSecondChanceShield ? "inline-flex" : "none";
    dom.walkAwayBtn.style.display = modeCfg.allowWalkAway ? "inline-block" : "none";
    dom.returnLobbyBtn.style.display = "inline-block";
    updateShieldHud();

    // Switch View
    dom.lobbyView.classList.remove("active");
    dom.resultsView.classList.remove("active");
    dom.stageView.classList.add("active");

    audio.playStartShow();
    loadQuestion();
  }

  function updateShieldHud() {
    if (state.shieldActive) {
      dom.hudShield.classList.remove("depleted");
      dom.hudShieldText.textContent = "Second Chance Shield: ACTIVE";
    } else {
      dom.hudShield.classList.add("depleted");
      dom.hudShieldText.textContent = "Shield Used (Recharges at Safe Haven)";
    }
  }

  // --------------------------------------------------------------------------
  // 6. LOADING A QUESTION & RENDERING DESIGN A SIDEBAR LADDER
  // --------------------------------------------------------------------------
  function getStepInfo(stepNumber) {
    const cfg = window.GAME_CONFIG;
    if (state.mode === "classic") {
      return cfg.modes.classic.ladder[stepNumber - 1];
    }
    if (state.mode === "super") {
      return cfg.modes.super.ladder[stepNumber - 1];
    }
    // Domain Blitz step info
    const amt = stepNumber * 10000;
    return {
      step: stepNumber,
      amount: amt,
      formatted: "$" + amt.toLocaleString("en-US"),
      safeHaven: stepNumber === state.questions.length,
      timerTier: stepNumber > 8 ? 2 : 1
    };
  }

  function loadQuestion() {
    clearInterval(state.timerInterval);
    const q = state.questions[state.currentIndex];
    const stepNum = state.currentIndex + 1;
    const totalQ = state.questions.length;
    const stepInfo = getStepInfo(stepNum);

    state.isAnsweringAllowed = true;
    state.hintUsedOnCurrentQ = false;
    state.eliminatedOptions = [];

    // Header Pills (Domain is hidden until answer is clicked!)
    dom.qCounterPill.textContent = `Question ${stepNum} of ${totalQ}`;
    dom.qPrizePill.textContent = `For ${stepInfo.formatted}`;

    const isBonusDrop = state.bonusDropIndices.includes(state.currentIndex);
    dom.bonusDropPill.style.display = isBonusDrop ? "inline-block" : "none";

    // Question & Options
    dom.questionText.textContent = q.question;
    ["A", "B", "C", "D"].forEach((letter) => {
      const btn = dom.answerBtns[letter];
      btn.disabled = false;
      btn.className = "answer-btn";
      dom.answerTexts[letter].textContent = q.options[letter];
    });

    // Hide Drawers
    dom.coachDrawer.classList.remove("visible");
    dom.audienceDrawer.classList.remove("visible");
    dom.rationaleDrawer.classList.remove("visible");
    dom.deepDiveContent.classList.remove("open");
    dom.deepDiveIcon.textContent = "+";

    updateLifelineButtons();
    renderLadderSidebar();
    startQuestionClock(stepInfo.timerTier);
  }

  function renderLadderSidebar() {
    const cfg = window.GAME_CONFIG;
    const stepNum = state.currentIndex + 1;

    if (state.mode === "classic") {
      dom.ladderTitle.textContent = "15-Tier Millionaire Ladder";
      dom.milestoneTracker.style.display = "none";
      const rows = [...cfg.modes.classic.ladder].reverse();
      dom.ladderList.innerHTML = rows
        .map((r) => {
          const classes = ["ladder-row"];
          if (r.safeHaven) classes.push("safe-haven");
          if (r.step === stepNum) classes.push("current");
          else if (r.step < stepNum) classes.push("passed");
          return `<li class="${classes.join(" ")}">
            <span>${r.step < stepNum ? '<span class="step-check">✓</span> ' : "♦ "}${r.step}</span>
            <span>${r.formatted}</span>
          </li>`;
        })
        .join("");
      return;
    }

    if (state.mode === "super") {
      // DESIGN A: 6-Milestone Safe Haven Bar + 10-Question Scrolling Window
      dom.ladderTitle.textContent = "Super Millionaire Meter";
      dom.milestoneTracker.style.display = "grid";

      const milestones = cfg.modes.super.milestones;
      dom.milestoneTracker.innerHTML = milestones
        .map((m) => {
          const reached = state.lastSafeHavenStep >= m.step;
          const isCurrentWindow =
            stepNum <= m.step && stepNum > m.step - 10;
          return `<div class="milestone-node ${reached ? "reached" : ""} ${isCurrentWindow ? "active-window" : ""}">
            <span class="m-step">${reached ? "★ " : ""}${m.label}</span>
            <span class="m-amt">${m.formatted}</span>
          </div>`;
        })
        .join("");

      // Determine current 10-question window (Q1-10, Q11-20, Q21-30, Q31-40, Q41-50, Q51-54)
      const windowIndex = Math.floor((stepNum - 1) / 10);
      const startStep = windowIndex * 10 + 1;
      const endStep = Math.min(startStep + 9, 54);
      const windowSlice = cfg.modes.super.ladder
        .slice(startStep - 1, endStep)
        .reverse();

      dom.ladderList.innerHTML = windowSlice
        .map((r) => {
          const classes = ["ladder-row"];
          if (r.safeHaven) classes.push("safe-haven");
          if (r.step === stepNum) classes.push("current");
          else if (r.step < stepNum) classes.push("passed");
          return `<li class="${classes.join(" ")}">
            <span>${r.step < stepNum ? '<span class="step-check">✓</span> ' : "♦ "}Q${r.step}</span>
            <span>${r.formatted}</span>
          </li>`;
        })
        .join("");
      return;
    }

    // Domain Blitz Ladder
    dom.ladderTitle.textContent = "Domain Blitz Progress";
    dom.milestoneTracker.style.display = "none";
    const total = state.questions.length;
    const blitzRows = [];
    for (let s = total; s >= 1; s--) {
      const info = getStepInfo(s);
      const classes = ["ladder-row"];
      if (s === total) classes.push("safe-haven");
      if (s === stepNum) classes.push("current");
      else if (s < stepNum) classes.push("passed");
      blitzRows.push(`<li class="${classes.join(" ")}">
        <span>${s < stepNum ? '<span class="step-check">✓</span> ' : "♦ "}Q${s}</span>
        <span>${info.formatted}</span>
      </li>`);
    }
    dom.ladderList.innerHTML = blitzRows.join("");
  }

  // --------------------------------------------------------------------------
  // 7. TIMER ENGINE (30s / 45s / 60s)
  // --------------------------------------------------------------------------
  function getSecondsForTier(tier) {
    const tCfg = window.GAME_CONFIG.timer;
    if (tier === 3) return tCfg.tier3Seconds || 60;
    if (tier === 2) return tCfg.tier2Seconds || 45;
    return tCfg.tier1Seconds || 30;
  }

  function startQuestionClock(tier) {
    clearInterval(state.timerInterval);
    state.timeLeft = getSecondsForTier(tier);

    if (!state.timerEnabled) {
      dom.clockRing.className = "clock-ring untimed";
      dom.clockText.textContent = "UNTIMED";
      return;
    }

    updateClockDisplay();
    state.timerInterval = setInterval(() => {
      if (!state.isAnsweringAllowed) return;
      state.timeLeft--;
      updateClockDisplay();

      if (state.timeLeft <= 5 && state.timeLeft > 0) {
        audio.playTick(true);
      }

      if (state.timeLeft <= 0) {
        clearInterval(state.timerInterval);
        handleTimeExpired();
      }
    }, 1000);
  }

  function updateClockDisplay() {
    dom.clockRing.className =
      state.timeLeft <= 10 ? "clock-ring urgent" : "clock-ring";
    dom.clockText.textContent = `${state.timeLeft}s`;
  }

  function handleTimeExpired() {
    if (!state.isAnsweringAllowed) return;
    // Treat timer expiration as an incorrect answer
    evaluateAnswer(null, true);
  }

  // --------------------------------------------------------------------------
  // 8. SINGLE-CLICK ANSWER LOCK & EVALUATION
  // --------------------------------------------------------------------------
  function handleAnswerClick(chosenLetter) {
    if (!state.isAnsweringAllowed) return;
    state.isAnsweringAllowed = false;
    clearInterval(state.timerInterval);

    // Disable all buttons immediately & flash Amber Lock-In
    ["A", "B", "C", "D"].forEach((l) => {
      dom.answerBtns[l].disabled = true;
    });
    const chosenBtn = dom.answerBtns[chosenLetter];
    if (chosenBtn) chosenBtn.classList.add("locked-amber");

    audio.playLockIn();

    // Dramatic 650ms studio pause before revealing green/red
    setTimeout(() => {
      if (chosenBtn) chosenBtn.classList.remove("locked-amber");
      evaluateAnswer(chosenLetter, false);
    }, 650);
  }

  function evaluateAnswer(chosenLetter, isTimeout = false) {
    const q = state.questions[state.currentIndex];
    const stepNum = state.currentIndex + 1;
    const stepInfo = getStepInfo(stepNum);
    const isCorrect = !isTimeout && chosenLetter === q.correct;

    state.totalAnswered++;
    state.domainStats[q.domainId].total++;

    // Highlight Correct Option in Emerald Green
    dom.answerBtns[q.correct].classList.add("reveal-correct");
    if (!isCorrect && chosenLetter && dom.answerBtns[chosenLetter]) {
      dom.answerBtns[chosenLetter].classList.add("reveal-wrong");
    }

    let statusHeadline = "";
    let statusClass = "";
    let bonusAwardedText = "";

    if (isCorrect) {
      state.totalCorrectFirstTry++;
      state.domainStats[q.domainId].correct++;
      state.currentPrize = stepInfo.amount;

      // Check Safe Haven Checkpoint
      if (stepInfo.safeHaven) {
        state.lastSafeHavenPrize = stepInfo.amount;
        state.lastSafeHavenStep = stepNum;
        if (
          state.mode === "super" &&
          window.GAME_CONFIG.modes.super.rechargeShieldAtSafeHavens
        ) {
          state.shieldActive = true;
          updateShieldHud();
        }
      }

      // Check Bonus Lifeline Drop (Super Mode only, if answered right without using a hint)
      if (
        state.bonusDropIndices.includes(state.currentIndex) &&
        !state.hintUsedOnCurrentQ
      ) {
        const awardedName = awardRandomBonusLifeline();
        bonusAwardedText = ` • 🎁 BONUS LIFELINE WON: +1 ${awardedName}!`;
      }

      audio.playCorrect(stepInfo.safeHaven);
      statusHeadline = stepInfo.safeHaven
        ? `★ SAFE HAVEN LOCKED IN: ${stepInfo.formatted}!${bonusAwardedText}`
        : `✓ CORRECT! You climb to ${stepInfo.formatted}${bonusAwardedText}`;
      statusClass = "status-correct";
    } else {
      // Track missed question for post-game review
      state.missedQuestions.push({
        question: q.question,
        domainName: q.domainName,
        chosen: isTimeout
          ? "Time Expired"
          : `${chosenLetter}: ${q.options[chosenLetter]}`,
        correct: `${q.correct}: ${q.options[q.correct]}`,
        explanation: q.explanation
      });

      if (state.mode === "classic") {
        // Strict TV Show rules: One wrong answer ends the run and drops to last Safe Haven!
        audio.playWrong();
        state.currentPrize = state.lastSafeHavenPrize;
        state.runOutcome = "lost_classic";
        statusHeadline = isTimeout
          ? `⏰ TIME EXPIRED! Correct Answer: ${q.correct}. You drop to ${formatMoney(state.currentPrize)}.`
          : `✕ INCORRECT! Correct Answer: ${q.correct}. Game Over — You leave with ${formatMoney(state.currentPrize)}.`;
        statusClass = "status-wrong";
      } else {
        // Super Millionaire (54-Q) or Domain Blitz: Study-First Second Chance Shield
        if (state.shieldActive) {
          audio.playShieldSaved();
          state.shieldActive = false;
          updateShieldHud();
          statusHeadline = isTimeout
            ? `🛡️ TIME EXPIRED — SECOND CHANCE SHIELD ACTIVATED! Prize protected at ${formatMoney(state.currentPrize)}.`
            : `🛡️ SECOND CHANCE SHIELD ACTIVATED! Correct Answer: ${q.correct}. Your prize is protected!`;
          statusClass = "status-shield";
        } else {
          audio.playWrong();
          state.currentPrize = state.lastSafeHavenPrize;
          statusHeadline = isTimeout
            ? `⏰ TIME EXPIRED! Dropped to Safe Haven (${formatMoney(state.currentPrize)}). Study the rationale below and keep going!`
            : `✕ INCORRECT! Dropped to Safe Haven (${formatMoney(state.currentPrize)}). Review the clue below and continue your run!`;
          statusClass = "status-wrong";
        }
      }
    }

    populateRationaleAndDeepDive(q, statusHeadline, statusClass);
  }

  function awardRandomBonusLifeline() {
    const keys = [
      { key: "fiftyFifty", label: "50:50" },
      { key: "phoneCoach", label: "Phone a Coach" },
      { key: "askAudience", label: "Ask the Audience" }
    ];
    // Prefer recharging a depleted lifeline first
    const depleted = keys.filter((k) => state.lifelines[k.key] === 0);
    const pool = depleted.length > 0 ? depleted : keys;
    const pick = pool[Math.floor(Math.random() * pool.length)];
    state.lifelines[pick.key]++;
    updateLifelineButtons();
    return pick.label;
  }

  function populateRationaleAndDeepDive(q, statusHeadline, statusClass) {
    dom.rationaleStatus.textContent = statusHeadline;
    dom.rationaleStatus.className = `rationale-status ${statusClass}`;

    // Reveal the Domain Tag NOW that the question has been answered!
    dom.revealedDomainTag.textContent = `Domain ${q.domainId}: ${q.domainName}`;
    dom.rationaleBody.textContent = q.explanation;

    // Populate Deep Dive / Exam Clue Accordion from data/supplemental.js
    const supp =
      (window.SUPPLEMENTAL_NOTES &&
        window.SUPPLEMENTAL_NOTES[q.supplementalKey]) ||
      null;
    if (supp) {
      dom.deepDiveTitleSpan.textContent = `Deep Dive & Exam Clue: ${supp.title}`;
      let html = `<div class="exam-clue-callout"><strong>💡 Exam Clue:</strong> ${supp.examTip}</div>`;

      if (supp.comparisonHeaders && supp.comparisonRows) {
        html += `<table class="supp-table"><thead><tr>`;
        supp.comparisonHeaders.forEach((h) => {
          html += `<th>${h}</th>`;
        });
        html += `</tr></thead><tbody>`;
        supp.comparisonRows.forEach((row) => {
          html += `<tr>`;
          row.forEach((cell) => {
            html += `<td>${cell}</td>`;
          });
          html += `</tr>`;
        });
        html += `</tbody></table>`;
      } else if (supp.keyTakeaways) {
        html += `<ul style="padding-left:1.2rem; display:flex; flex-direction:column; gap:0.35rem;">`;
        supp.keyTakeaways.forEach((item) => {
          html += `<li>${item}</li>`;
        });
        html += `</ul>`;
      }
      dom.deepDiveContent.innerHTML = html;
    }

    // Update Next Button Label
    const isLastQuestion = state.currentIndex === state.questions.length - 1;
    if (state.runOutcome === "lost_classic") {
      dom.nextQBtn.textContent = "View Final Summary Report →";
    } else if (isLastQuestion) {
      dom.nextQBtn.textContent = "Complete Run & View Diagnostic Report →";
    } else {
      dom.nextQBtn.textContent = `Continue to Question ${state.currentIndex + 2} →`;
    }

    dom.rationaleDrawer.classList.add("visible");
  }

  function handleNextButton() {
    if (state.runOutcome === "lost_classic") {
      finishGame("lost_classic");
      return;
    }

    if (state.currentIndex >= state.questions.length - 1) {
      const outcome =
        state.mode === "super"
          ? "completed_super"
          : state.mode === "classic"
            ? "won_classic"
            : "completed_blitz";
      finishGame(outcome);
      return;
    }

    state.currentIndex++;
    loadQuestion();
  }

  // --------------------------------------------------------------------------
  // 9. LIFELINES: 50:50, SOCRATIC VIRTUAL COACH, 80/20 FALLIBLE AUDIENCE POLL
  // --------------------------------------------------------------------------
  function updateLifelineButtons() {
    const ll = state.lifelines;

    dom.btn5050.disabled = !state.isAnsweringAllowed || ll.fiftyFifty <= 0;
    dom.btn5050.classList.toggle("used", ll.fiftyFifty <= 0);
    dom.badge5050.textContent = ll.fiftyFifty;

    dom.btnCoach.disabled = !state.isAnsweringAllowed || ll.phoneCoach <= 0;
    dom.btnCoach.classList.toggle("used", ll.phoneCoach <= 0);
    dom.badgeCoach.textContent = ll.phoneCoach;

    dom.btnAudience.disabled = !state.isAnsweringAllowed || ll.askAudience <= 0;
    dom.btnAudience.classList.toggle("used", ll.askAudience <= 0);
    dom.badgeAudience.textContent = ll.askAudience;
  }

  function useFiftyFifty() {
    if (!state.isAnsweringAllowed || state.lifelines.fiftyFifty <= 0) return;
    state.lifelines.fiftyFifty--;
    state.hintUsedOnCurrentQ = true;
    audio.playLifeline();

    const q = state.questions[state.currentIndex];
    const keepDistractor =
      q.fiftyFiftyKeep && q.fiftyFiftyKeep !== q.correct
        ? q.fiftyFiftyKeep
        : ["A", "B", "C", "D"].find((l) => l !== q.correct);

    ["A", "B", "C", "D"].forEach((letter) => {
      if (letter !== q.correct && letter !== keepDistractor) {
        state.eliminatedOptions.push(letter);
        dom.answerBtns[letter].classList.add("eliminated-5050");
        dom.answerBtns[letter].disabled = true;
      }
    });

    updateLifelineButtons();
  }

  function usePhoneCoach() {
    if (!state.isAnsweringAllowed || state.lifelines.phoneCoach <= 0) return;
    state.lifelines.phoneCoach--;
    state.hintUsedOnCurrentQ = true;
    audio.playLifeline();

    const q = state.questions[state.currentIndex];
    dom.coachMessage.textContent = `"${q.socraticCoach}"`;
    dom.coachDrawer.classList.add("visible");
    updateLifelineButtons();
  }

  function useAskAudience() {
    if (!state.isAnsweringAllowed || state.lifelines.askAudience <= 0) return;
    state.lifelines.askAudience--;
    state.hintUsedOnCurrentQ = true;
    audio.playLifeline();

    const q = state.questions[state.currentIndex];
    const reliability =
      window.GAME_CONFIG.lifelines.askAudience.reliabilityRate || 0.8;
    const audienceIsRight = Math.random() < reliability;

    const activeLetters = ["A", "B", "C", "D"].filter(
      (l) => !state.eliminatedOptions.includes(l)
    );
    const rival =
      q.fiftyFiftyKeep && activeLetters.includes(q.fiftyFiftyKeep)
        ? q.fiftyFiftyKeep
        : activeLetters.find((l) => l !== q.correct);

    const weights = { A: 0, B: 0, C: 0, D: 0 };

    if (activeLetters.length === 2) {
      // If 50:50 was already used, split 100% between the 2 remaining options
      if (audienceIsRight) {
        weights[q.correct] = 64 + Math.floor(Math.random() * 18); // 64% - 81%
      } else {
        // 20% fallible case: close split where rival slightly leads
        weights[q.correct] = 44 + Math.floor(Math.random() * 5); // 44% - 48%
      }
      weights[rival] = 100 - weights[q.correct];
    } else {
      // All 4 options active
      if (audienceIsRight) {
        weights[q.correct] = 52 + Math.floor(Math.random() * 22); // 52% - 73%
        weights[rival] = 14 + Math.floor(Math.random() * 12);
      } else {
        // 20% fallible case: audience slightly favors the top trap distractor!
        weights[rival] = 40 + Math.floor(Math.random() * 8); // 40% - 47%
        weights[q.correct] = 35 + Math.floor(Math.random() * 7); // 35% - 41%
      }
      let remainder = 100 - weights[q.correct] - weights[rival];
      const others = activeLetters.filter(
        (l) => l !== q.correct && l !== rival
      );
      const firstOther = Math.floor(remainder * 0.55);
      weights[others[0]] = firstOther;
      weights[others[1]] = remainder - firstOther;
    }

    dom.audienceBarsContainer.innerHTML = ["A", "B", "C", "D"]
      .map((letter) => {
        const pct = weights[letter] || 0;
        return `<div class="audience-col">
          <span class="audience-pct">${pct}%</span>
          <div class="audience-bar-track">
            <div class="audience-bar-fill" style="height: ${pct}%;"></div>
          </div>
          <span class="audience-letter">${letter}</span>
        </div>`;
      })
      .join("");

    dom.audienceDrawer.classList.add("visible");
    updateLifelineButtons();
  }

  // --------------------------------------------------------------------------
  // 10. WALK AWAY & END-OF-GAME DIAGNOSTIC + OUTLOOK COMPLETION EMAIL
  // --------------------------------------------------------------------------
  function handleWalkAway() {
    if (!state.isAnsweringAllowed) return;
    const confirmMsg =
      state.mode === "super"
        ? `Walk away now with ${formatMoney(state.currentPrize)}?\n\nIMPORTANT: Walking away early forfeits Cohort Part 3 completion credit (you must finish all 54 questions to unlock the completion email).`
        : `Walk away and bank ${formatMoney(state.currentPrize)}?`;

    if (!window.confirm(confirmMsg)) return;
    clearInterval(state.timerInterval);
    state.walkedAway = true;
    finishGame("walked_away");
  }

  function isEligibleForCohortCredit(outcome, accuracyPct) {
    const rules = window.GAME_CONFIG.cohortRules;
    if (state.walkedAway && rules.walkAwayForfeitsCohortCredit) return false;
    if (accuracyPct < (rules.minimumPassingAccuracyPercent || 0)) return false;

    if (state.mode === "super" && outcome === "completed_super") {
      return Boolean(rules.superModeCohortEligible);
    }
    if (state.mode === "classic" && outcome === "won_classic") {
      return Boolean(rules.classicModeCohortEligible);
    }
    return false;
  }

  function finishGame(outcome) {
    clearInterval(state.timerInterval);
    state.runOutcome = outcome;
    state.endTime = Date.now();
    dom.walkAwayBtn.style.display = "none";

    const elapsedSec = Math.max(
      1,
      Math.round((state.endTime - state.startTime) / 1000)
    );
    const mins = Math.floor(elapsedSec / 60);
    const secs = elapsedSec % 60;
    const timeStr = `${mins}m ${secs}s`;

    const totalQ = state.questions.length;
    const accuracyPct =
      state.totalAnswered > 0
        ? Math.round((state.totalCorrectFirstTry / totalQ) * 100)
        : 0;

    // Switch to Results View
    dom.stageView.classList.remove("active");
    dom.resultsView.classList.add("active");

    const modeCfg = window.GAME_CONFIG.modes[state.mode];
    dom.resModeName.textContent = modeCfg.title;
    dom.resFinalPrize.textContent = formatMoney(state.currentPrize);
    dom.resAccuracy.textContent = `${accuracyPct}%`;
    dom.resScoreFraction.textContent = `${state.totalCorrectFirstTry} / ${totalQ}`;
    dom.resTimeElapsed.textContent = timeStr;

    if (outcome === "completed_super") {
      dom.resHeadline.textContent = `Congratulations, ${state.studentName}!`;
      dom.resSubheadline.textContent =
        "You conquered all 54 CompTIA Data+ scenarios in the Super Millionaire Run!";
    } else if (outcome === "won_classic") {
      dom.resHeadline.textContent = `MILLIONAIRE WINNER — ${state.studentName}!`;
      dom.resSubheadline.textContent =
        "You cleared all 15 questions under strict TV clock rules!";
    } else if (outcome === "walked_away") {
      dom.resHeadline.textContent = `You Walked Away with ${formatMoney(state.currentPrize)}`;
      dom.resSubheadline.textContent = `Run ended on Question ${state.currentIndex + 1} of ${totalQ}.`;
    } else if (outcome === "lost_classic") {
      dom.resHeadline.textContent = "Classic Millionaire Run Ended";
      dom.resSubheadline.textContent = `You leave with your Safe Haven prize of ${formatMoney(state.currentPrize)}.`;
    } else {
      dom.resHeadline.textContent = `Domain Blitz Complete — ${state.studentName}`;
      dom.resSubheadline.textContent =
        "Targeted practice run complete. Review your domain mastery below!";
    }

    // Render 5-Domain Breakdown Bars
    dom.domainBarsContainer.innerHTML = window.GAME_CONFIG.domains
      .map((d) => {
        const st = state.domainStats[d.id];
        if (!st || st.total === 0) return "";
        const pct = Math.round((st.correct / st.total) * 100);
        const barColor =
          pct >= 80 ? "#10b981" : pct >= 60 ? "#f59e0b" : "#ef4444";
        return `<div class="domain-bar-row">
          <div class="domain-bar-labels">
            <span><strong>Domain ${d.id}:</strong> ${d.name}</span>
            <span><strong>${st.correct}/${st.total}</strong> (${pct}%)</span>
          </div>
          <div class="domain-bar-track">
            <div class="domain-bar-fill" style="width:${pct}%; background:${barColor};"></div>
          </div>
        </div>`;
      })
      .join("");

    // Render Cohort Completion Outlook Box
    const eligible = isEligibleForCohortCredit(outcome, accuracyPct);
    renderCohortOutlookBox(eligible, accuracyPct, timeStr);
    renderMissedQuestionsReview();
  }

  function generateVerificationCode(accuracyPct) {
    const stamp = new Date().toISOString().slice(0, 10).replace(/-/g, "");
    const nameClean = state.studentName
      .replace(/[^a-zA-Z0-9]/g, "")
      .toUpperCase()
      .slice(0, 4);
    return `D492-P3-${nameClean || "WGU"}-${accuracyPct}P-${stamp}`;
  }

  function buildPlainTextReport(accuracyPct, timeStr) {
    const code = generateVerificationCode(accuracyPct);
    const lines = [
      "============================================================",
      "WGU D492 (COMPTIA DATA+ DA0-002) - SELF-PACED COHORT PART 3",
      "OFFICIAL COMPLETION & DIAGNOSTIC REPORT",
      "============================================================",
      `Student Name:       ${state.studentName}`,
      `Completed Mode:     ${window.GAME_CONFIG.modes[state.mode].title}`,
      `Completion Status:  COMPLETED (${state.totalCorrectFirstTry} / ${state.questions.length} Correct - ${accuracyPct}%)`,
      `Final Prize Score:  ${formatMoney(state.currentPrize)}`,
      `Time Elapsed:       ${timeStr}`,
      `Timestamp:          ${new Date().toLocaleString()}`,
      `Verification Code:  ${code}`,
      "",
      "--- DA0-002 DOMAIN MASTERY BREAKDOWN ---"
    ];

    window.GAME_CONFIG.domains.forEach((d) => {
      const st = state.domainStats[d.id];
      if (st && st.total > 0) {
        const pct = Math.round((st.correct / st.total) * 100);
        lines.push(`• Domain ${d.id} (${d.name}): ${st.correct}/${st.total} (${pct}%)`);
      }
    });

    lines.push("============================================================");
    return lines.join("\n");
  }

  function renderCohortOutlookBox(eligible, accuracyPct, timeStr) {
    if (eligible) {
      dom.outlookBox.className = "outlook-completion-box";
      dom.outlookBox.innerHTML = `
        <h3>✅ Official Cohort Part 3 Completion Unlocked!</h3>
        <p style="font-size:0.86rem; color:#cbd5e1;">
          Enter your Course Instructor's WGU email address below and click <strong>Send Completion Email in Outlook</strong> to submit your official Part 3 diagnostic breakdown.
        </p>
        <div class="ci-email-row">
          <input type="email" id="ci-email-input" placeholder="Course Instructor Email (e.g., firstname.lastname@wgu.edu)" value="${window.GAME_CONFIG.course.defaultInstructorEmail || ""}" />
          <button type="button" class="outlook-btn" id="send-outlook-btn">📧 Send Completion Email in Outlook</button>
          <button type="button" class="copy-report-btn" id="copy-report-btn">📋 Copy Report to Clipboard</button>
        </div>
      `;

      document
        .getElementById("send-outlook-btn")
        .addEventListener("click", () => {
          const ciEmail = (
            document.getElementById("ci-email-input").value || ""
          ).trim();
          if (!ciEmail || !ciEmail.includes("@")) {
            window.alert(
              "Please enter a valid Course Instructor email address (e.g., firstname.lastname@wgu.edu)."
            );
            return;
          }
          const subject = encodeURIComponent(
            `${window.GAME_CONFIG.course.emailSubjectPrefix} - ${state.studentName}`
          );
          const body = encodeURIComponent(
            buildPlainTextReport(accuracyPct, timeStr)
          );
          window.location.href = `mailto:${encodeURIComponent(ciEmail)}?subject=${subject}&body=${body}`;
        });

      document
        .getElementById("copy-report-btn")
        .addEventListener("click", (e) => {
          const reportText = buildPlainTextReport(accuracyPct, timeStr);
          navigator.clipboard.writeText(reportText).then(() => {
            e.target.textContent = "✓ Copied to Clipboard!";
            setTimeout(() => {
              e.target.textContent = "📋 Copy Report to Clipboard";
            }, 2200);
          });
        });
    } else {
      dom.outlookBox.className = "outlook-completion-box ineligible";
      let reason =
        "To unlock your official Cohort Part 3 completion email for your Course Instructor, you must complete all 54 questions in 'The 54-Question Super Millionaire Run' without walking away.";
      if (state.walkedAway) {
        reason =
          "Because you chose to Walk Away early, this run does not count toward Cohort Part 3 completion credit. Complete the full 54-Question Super Millionaire Run to unlock your Course Instructor completion email!";
      }
      dom.outlookBox.innerHTML = `
        <h3>ℹ️ Practice / Non-Completion Run</h3>
        <p style="font-size:0.86rem; color:#cbd5e1;">${reason}</p>
      `;
    }
  }

  function renderMissedQuestionsReview() {
    if (state.missedQuestions.length === 0) {
      dom.missedQuestionsList.innerHTML = `<p style="color:#6ee7b7; font-size:0.9rem;">Flawless run! You did not miss a single question.</p>`;
      return;
    }

    dom.missedQuestionsList.innerHTML = state.missedQuestions
      .map(
        (m, idx) => `<div style="background:rgba(5,8,20,0.7); border:1px solid #334155; border-radius:10px; padding:1rem; margin-bottom:0.75rem;">
        <div style="font-size:0.75rem; color:var(--gold-bright); font-weight:700; margin-bottom:0.25rem;">${m.domainName}</div>
        <div style="font-weight:600; font-size:0.92rem; margin-bottom:0.5rem;">${idx + 1}. ${m.question}</div>
        <div style="font-size:0.82rem; color:#fca5a5;">Your Answer: ${m.chosen}</div>
        <div style="font-size:0.82rem; color:#6ee7b7; font-weight:700; margin-bottom:0.4rem;">Correct Answer: ${m.correct}</div>
        <div style="font-size:0.82rem; color:#cbd5e1;">${m.explanation}</div>
      </div>`
      )
      .join("");
  }

  function formatMoney(amount) {
    return "$" + Number(amount || 0).toLocaleString("en-US");
  }

  // --------------------------------------------------------------------------
  // 11. EVENT LISTENERS & BOOTSTRAP
  // --------------------------------------------------------------------------
  function bindEvents() {
    // Saved student name
    const savedName = localStorage.getItem("d492_student_name");
    if (savedName) dom.studentNameInput.value = savedName;

    // Populate tooltip from config
    dom.timerTooltipBox.textContent = window.GAME_CONFIG.timer.tooltipText;

    // Populate Blitz Domain Dropdown
    dom.blitzDomainSelect.innerHTML = window.GAME_CONFIG.domains
      .map((d) => `<option value="${d.id}">Domain ${d.id}: ${d.name} (${d.count} Qs)</option>`)
      .join("");

    // Start Mode Buttons
    dom.startClassicBtn.addEventListener("click", () => startGame("classic"));
    dom.startSuperBtn.addEventListener("click", () => startGame("super"));
    dom.startBlitzBtn.addEventListener("click", () => startGame("blitz"));

    // Timer Toggle in Top HUD
    dom.timerToggleInput.addEventListener("change", () => {
      if (state.timerLocked) {
        dom.timerToggleInput.checked = true;
        return;
      }
      state.timerEnabled = dom.timerToggleInput.checked;
      if (
        dom.stageView.classList.contains("active") &&
        state.isAnsweringAllowed
      ) {
        const stepInfo = getStepInfo(state.currentIndex + 1);
        startQuestionClock(stepInfo.timerTier);
      }
    });

    // Audio Mute Toggle
    dom.muteBtn.addEventListener("click", () => {
      const isMuted = audio.toggleMute();
      dom.muteBtn.textContent = isMuted ? "🔇 Sound: OFF" : "🔊 Sound: ON";
    });

    // Walk Away & Return to Lobby
    dom.walkAwayBtn.addEventListener("click", handleWalkAway);
    dom.returnLobbyBtn.addEventListener("click", () => {
      clearInterval(state.timerInterval);
      dom.stageView.classList.remove("active");
      dom.resultsView.classList.remove("active");
      dom.lobbyView.classList.add("active");
      dom.walkAwayBtn.style.display = "none";
      dom.returnLobbyBtn.style.display = "none";
      dom.hudShield.style.display = "none";
      state.timerLocked = false;
      dom.timerToggleInput.disabled = false;
      dom.timerToggleLabel.classList.remove("locked");
    });

    // Answer Buttons (Single-Click Instant Lock)
    ["A", "B", "C", "D"].forEach((letter) => {
      dom.answerBtns[letter].addEventListener("click", () =>
        handleAnswerClick(letter)
      );
    });

    // Lifelines
    dom.btn5050.addEventListener("click", useFiftyFifty);
    dom.btnCoach.addEventListener("click", usePhoneCoach);
    dom.btnAudience.addEventListener("click", useAskAudience);

    // Deep Dive Accordion Toggle
    dom.deepDiveToggle.addEventListener("click", () => {
      const isOpen = dom.deepDiveContent.classList.toggle("open");
      dom.deepDiveIcon.textContent = isOpen ? "−" : "+";
    });

    // Next Question Button
    dom.nextQBtn.addEventListener("click", handleNextButton);

    // Play Again Button
    dom.playAgainBtn.addEventListener("click", () => {
      dom.resultsView.classList.remove("active");
      dom.lobbyView.classList.add("active");
      dom.returnLobbyBtn.style.display = "none";
      dom.hudShield.style.display = "none";
      state.timerLocked = false;
      dom.timerToggleInput.disabled = false;
      dom.timerToggleLabel.classList.remove("locked");
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    cacheDom();
    bindEvents();
  });
})();
