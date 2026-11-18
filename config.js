/**
 * ============================================================================
 * D492 COMPTIA DATA+ (DA0-002) - WHO WANTS TO BE A MILLIONAIRE
 * DECENTRALIZED CONFIGURATION FILE (config.js)
 * ============================================================================
 * Edit values in this file to customize cohort eligibility, timer tiers,
 * prize ladders, lifeline behavior, and email reporting templates without
 * touching the game engine or HTML/CSS.
 */

window.GAME_CONFIG = {
  // --------------------------------------------------------------------------
  // 1. COURSE & COHORT METADATA
  // --------------------------------------------------------------------------
  course: {
    code: "D492",
    examCode: "DA0-002",
    title: "CompTIA Data+ Millionaire Studio",
    subtitle: "Part 3: Interactive Self-Paced Review Cohort",
    defaultInstructorEmail: "", // Optional pre-fill; leave blank for student input
    emailSubjectPrefix: "D492 Self-Paced Cohort Part 3 Completion"
  },

  // --------------------------------------------------------------------------
  // 2. COHORT COMPLETION & ELIGIBILITY RULES
  // --------------------------------------------------------------------------
  // Toggle key parameters below after consulting with the course instructor:
  cohortRules: {
    // By default, ONLY the 54-Question Super Millionaire Run grants cohort credit
    // so students review the entire 54-question deck.
    // Set classicModeCohortEligible to true ONLY if winning all 15 questions in Classic counts.
    classicModeCohortEligible: false,
    superModeCohortEligible: true,
    domainBlitzCohortEligible: false,

    // If a student clicks "Walk Away" to bank their money early, it NEVER counts
    // as cohort completion (they must reach the end of the mode).
    walkAwayForfeitsCohortCredit: true,

    // In Classic Mode (if enabled for credit), losing on a wrong answer forfeits completion credit.
    classicLossForfeitsCohortCredit: true,

    // Minimum accuracy percentage required at the end of the 54-Question Super Run
    // to unlock the official Course Instructor Completion Email (set to 0 for completion-only).
    minimumPassingAccuracyPercent: 0
  },

  // --------------------------------------------------------------------------
  // 3. TIMER CONFIGURATION (30s / 45s / 60s)
  // --------------------------------------------------------------------------
  timer: {
    // Tier 1 (Early questions), Tier 2 (Mid-level), Tier 3 (High-stakes questions)
    tier1Seconds: 30,
    tier2Seconds: 45,
    tier3Seconds: 60,

    // Classic Mode is strictly timed (cannot be toggled off by the student).
    classicModeLockedOn: true,

    // Super Millionaire (54-Q) and Domain Blitz allow the student to toggle the timer on/off.
    superModeDefaultOn: true,
    blitzModeDefaultOn: false,

    // Tooltip text shown when the student hovers over the '?' icon next to the Timer Toggle
    tooltipText: "Timer Rules: Tier 1 = 30s | Tier 2 = 45s | Tier 3 = 60s. Classic 15-Q Mode is strictly timed like the TV show. In 54-Q Super Millionaire & Domain Blitz, you can toggle the timer ON or OFF."
  },

  // --------------------------------------------------------------------------
  // 4. GAME MODES & PRIZE LADDERS
  // --------------------------------------------------------------------------
  modes: {
    classic: {
      id: "classic",
      title: "Classic 15-Question Millionaire Run",
      badgeText: "Strict TV Show Rules • Timed Only",
      description: "Climb the iconic 15-tier prize ladder from $100 to $1,000,000 across all 5 DA0-002 domains. Strictly timed (30s/45s/60s), no Second Chance Shield, and one wrong answer ends the run!",
      totalQuestions: 15,
      allowTimerToggle: false,
      hasSecondChanceShield: false,
      allowBonusLifelineDrops: false,
      allowWalkAway: true,
      safeHavenSteps: [5, 10, 15],
      ladder: [
        { step: 1,  amount: 100,     formatted: "$100",       safeHaven: false, timerTier: 1 },
        { step: 2,  amount: 200,     formatted: "$200",       safeHaven: false, timerTier: 1 },
        { step: 3,  amount: 300,     formatted: "$300",       safeHaven: false, timerTier: 1 },
        { step: 4,  amount: 500,     formatted: "$500",       safeHaven: false, timerTier: 1 },
        { step: 5,  amount: 1000,    formatted: "$1,000",     safeHaven: true,  timerTier: 1 },
        { step: 6,  amount: 2000,    formatted: "$2,000",     safeHaven: false, timerTier: 2 },
        { step: 7,  amount: 4000,    formatted: "$4,000",     safeHaven: false, timerTier: 2 },
        { step: 8,  amount: 8000,    formatted: "$8,000",     safeHaven: false, timerTier: 2 },
        { step: 9,  amount: 16000,   formatted: "$16,000",    safeHaven: false, timerTier: 2 },
        { step: 10, amount: 32000,   formatted: "$32,000",    safeHaven: true,  timerTier: 2 },
        { step: 11, amount: 64000,   formatted: "$64,000",    safeHaven: false, timerTier: 3 },
        { step: 12, amount: 125000,  formatted: "$125,000",   safeHaven: false, timerTier: 3 },
        { step: 13, amount: 250000,  formatted: "$250,000",   safeHaven: false, timerTier: 3 },
        { step: 14, amount: 500000,  formatted: "$500,000",   safeHaven: false, timerTier: 3 },
        { step: 15, amount: 1000000, formatted: "$1,000,000", safeHaven: true,  timerTier: 3 }
      ]
    },

    super: {
      id: "super",
      title: "The 54-Question Super Millionaire Run",
      badgeText: "Official Cohort Completion Mode",
      description: "Conquer all 54 shuffled CompTIA Data+ scenarios up to the $5,000,000 Super Jackpot. Features Safe Havens every 10 questions, a rechargeable Second Chance Shield, and 3 hidden Bonus Lifeline drops.",
      totalQuestions: 54,
      allowTimerToggle: true,
      hasSecondChanceShield: true,
      rechargeShieldAtSafeHavens: true,
      allowBonusLifelineDrops: true,
      bonusLifelineDropCount: 3, // 3 random questions award a lifeline back if answered right on 1st try without hints
      allowWalkAway: true, // Note: Walking away forfeits cohort completion credit
      safeHavenSteps: [10, 20, 30, 40, 50, 54],
      windowSize: 10, // Design A: Shows a 10-question scrolling window + Milestone Tracker
      milestones: [
        { step: 10, label: "Q10", formatted: "$25,000" },
        { step: 20, label: "Q20", formatted: "$100,000" },
        { step: 30, label: "Q30", formatted: "$350,000" },
        { step: 40, label: "Q40", formatted: "$1,000,000" },
        { step: 50, label: "Q50", formatted: "$2,500,000" },
        { step: 54, label: "Q54", formatted: "$5,000,000" }
      ]
    },

    blitz: {
      id: "blitz",
      title: "Domain Blitz (Targeted Practice)",
      badgeText: "Practice Only • Non-Cohort Credit",
      description: "Isolate and drill one specific CompTIA Data+ domain at a time to sharpen weak areas before your exam.",
      allowTimerToggle: true,
      hasSecondChanceShield: true,
      allowBonusLifelineDrops: false,
      allowWalkAway: false
    }
  },

  // --------------------------------------------------------------------------
  // 5. LIFELINE CONFIGURATION
  // --------------------------------------------------------------------------
  lifelines: {
    startingCounts: {
      fiftyFifty: 1,
      phoneCoach: 1,
      askAudience: 1
    },
    askAudience: {
      // 80% of the time the audience majority picks the right answer;
      // 20% of the time on tricky questions, the top distractor slightly edges out or ties the right answer.
      reliabilityRate: 0.80
    },
    phoneCoach: {
      coachName: "Data+ Virtual Coach",
      coachRole: "Socratic Exam Strategist"
    }
  },

  // --------------------------------------------------------------------------
  // 6. DA0-002 OFFICIAL DOMAINS
  // --------------------------------------------------------------------------
  domains: [
    { id: 1, name: "Data Concepts & Environments",   count: 10, color: "#38BDF8" },
    { id: 2, name: "Data Acquisition & Preparation", count: 12, color: "#A855F7" },
    { id: 3, name: "Data Analysis",                  count: 15, color: "#F59E0B" },
    { id: 4, name: "Visualization & Reporting",      count: 10, color: "#10B981" },
    { id: 5, name: "Data Governance",                count: 7,  color: "#EC4899" }
  ]
};

// Helper to auto-generate the 54-step prize ladder for Super Millionaire Mode
(function buildSuperLadder() {
  const amounts = [
    500, 1000, 2000, 3500, 5000, 7500, 10000, 15000, 20000, 25000,             // Q1 - Q10 ($25K Safe Haven)
    30000, 37500, 45000, 52500, 60000, 67500, 75000, 82500, 90000, 100000,     // Q11 - Q20 ($100K Safe Haven)
    120000, 140000, 160000, 185000, 210000, 235000, 260000, 290000, 320000, 350000, // Q21 - Q30 ($350K Safe Haven)
    400000, 450000, 500000, 560000, 625000, 700000, 775000, 850000, 925000, 1000000, // Q31 - Q40 ($1M Safe Haven)
    1125000, 1250000, 1400000, 1550000, 1700000, 1850000, 2000000, 2150000, 2300000, 2500000, // Q41 - Q50 ($2.5M Safe Haven)
    3000000, 3500000, 4250000, 5000000                                         // Q51 - Q54 ($5M Super Jackpot)
  ];
  const safeSteps = window.GAME_CONFIG.modes.super.safeHavenSteps;
  window.GAME_CONFIG.modes.super.ladder = amounts.map((amt, idx) => {
    const step = idx + 1;
    let timerTier = 1;
    if (step > 36) timerTier = 3;
    else if (step > 18) timerTier = 2;
    return {
      step: step,
      amount: amt,
      formatted: "$" + amt.toLocaleString("en-US"),
      safeHaven: safeSteps.includes(step),
      timerTier: timerTier
    };
  });
})();
