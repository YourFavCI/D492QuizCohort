/**
 * ============================================================================
 * D492 COMPTIA DATA+ (DA0-002) - WHO WANTS TO BE A MILLIONAIRE
 * DECENTRALIZED QUESTION BANK (data/questions.js)
 * ============================================================================
 * Contains all 54 review scenarios across the 5 CompTIA Data+ domains.
 *
 * Schema per question:
 * - id: Unique integer (1 to 54)
 * - domainId: 1 to 5 (maps to window.GAME_CONFIG.domains)
 * - domainName: CompTIA Data+ DA0-002 domain title
 * - difficulty: 1 (Foundational), 2 (Intermediate), or 3 (Advanced)
 * - question: Scenario prompt from the question slide
 * - options: Object containing A, B, C, D choices
 * - correct: Correct option key ("A", "B", "C", or "D")
 * - fiftyFiftyKeep: The single best trap distractor to keep alongside the
 *                   correct answer when 50:50 is triggered (and top rival in Audience Poll)
 * - socraticCoach: Socratic guiding question shown when "Phone a Coach" is used
 * - explanation: Comprehensive 2-3 sentence rationale explaining why the correct
 *                answer fits the scenario and why key distractors do not
 * - supplementalKey: Topic key linking to data/supplemental.js for the expandable
 *                    "Deep Dive / Exam Clue" accordion
 */

window.QUESTION_BANK = [
  // ==========================================================================
  // DOMAIN 1: DATA CONCEPTS & ENVIRONMENTS (Questions 1 - 10)
  // ==========================================================================
  {
    id: 1,
    domainId: 1,
    domainName: "Data Concepts & Environments",
    difficulty: 1,
    question: "A retailer needs to analyze sales transactions from the last five years. The data is stored in structured tables optimized for reporting across departments. Which repository is the best fit?",
    options: {
      A: "Data warehouse",
      B: "Data lake",
      C: "Operational log file",
      D: "Personal spreadsheet"
    },
    correct: "A",
    fiftyFiftyKeep: "B",
    socraticCoach: "Notice that the data is already cleaned, structured into tables, and optimized for multi-year, cross-departmental reporting. Do we need an unstructured raw storage pool, or a centralized enterprise repository built specifically for structured analytical queries?",
    explanation: "A data warehouse stores integrated, historical, and structured data specifically modeled (schema-on-write) for enterprise reporting and cross-departmental analysis. In contrast, a data lake stores raw structured, semi-structured, and unstructured data before modeling, while operational log files and spreadsheets lack enterprise reporting scalability.",
    supplementalKey: "repositories_dw_vs_dl"
  },
  {
    id: 2,
    domainId: 1,
    domainName: "Data Concepts & Environments",
    difficulty: 1,
    question: "A data science team wants to retain raw JSON, images, audio, and CSV files before deciding how each will be analyzed. Which repository is most appropriate?",
    options: {
      A: "Data mart",
      B: "Data lake",
      C: "Relational transaction table",
      D: "Data dictionary"
    },
    correct: "B",
    fiftyFiftyKeep: "A",
    socraticCoach: "Look closely at the file formats: raw JSON, images, audio, and CSVs saved *before* deciding how to structure or analyze them. Which repository uses a 'schema-on-read' approach to hold raw files of any format?",
    explanation: "A data lake is designed to ingest and retain massive volumes of raw structured, semi-structured (JSON), and unstructured (images, audio) data in its native format using a schema-on-read approach. Data marts and relational transaction tables require predefined tabular schemas, and a data dictionary only stores metadata definitions rather than the files themselves.",
    supplementalKey: "repositories_dw_vs_dl"
  },
  {
    id: 3,
    domainId: 1,
    domainName: "Data Concepts & Environments",
    difficulty: 1,
    question: "A company creates a smaller repository containing curated sales data for its sales division. What is this repository called?",
    options: {
      A: "Data mart",
      B: "Data lake",
      C: "OLTP system",
      D: "Source control repository"
    },
    correct: "A",
    fiftyFiftyKeep: "B",
    socraticCoach: "Think about scope: instead of an enterprise-wide warehouse serving every department, this is a curated subset tailored for a single business unit (the sales division). What do we call a department-specific slice of a data warehouse?",
    explanation: "A data mart is a focused, subject-oriented subset of a larger data warehouse curated to meet the reporting needs of a specific department or business division, such as sales or marketing. An OLTP system handles live front-end transactions rather than curated historical analytics, and a data lake holds uncurated raw data.",
    supplementalKey: "repositories_dw_vs_dl"
  },
  {
    id: 4,
    domainId: 1,
    domainName: "Data Concepts & Environments",
    difficulty: 2,
    question: "An online order system must record each purchase immediately and support frequent inserts and updates. Which workload is it primarily designed for?",
    options: {
      A: "OLAP",
      B: "OLTP",
      C: "Batch reporting",
      D: "Data visualization"
    },
    correct: "B",
    fiftyFiftyKeep: "A",
    socraticCoach: "Is this system processing real-time day-to-day business *transactions* (inserts, updates, order capture), or is it running complex historical *analytical* aggregations across millions of past rows?",
    explanation: "Online Transaction Processing (OLTP) systems are engineered for fast, high-concurrency day-to-day operational workloads such as recording live purchases, inserts, and updates with strict data integrity. Online Analytical Processing (OLAP) systems are optimized for complex read-heavy historical queries and multi-dimensional aggregations rather than real-time order entry.",
    supplementalKey: "oltp_vs_olap"
  },
  {
    id: 5,
    domainId: 1,
    domainName: "Data Concepts & Environments",
    difficulty: 1,
    question: "An analyst stores customer satisfaction as Low, Medium, or High. What type of data is this?",
    options: {
      A: "Nominal",
      B: "Ordinal",
      C: "Discrete quantitative",
      D: "Continuous quantitative"
    },
    correct: "B",
    fiftyFiftyKeep: "A",
    socraticCoach: "'Low, Medium, High' are text categories rather than numerical measurements, which rules out the quantitative options. Between Nominal and Ordinal, do these three labels have a natural, meaningful rank order?",
    explanation: "Ordinal data represents categorical values that follow a logical, meaningful rank or hierarchy (Low < Medium < High), even though the mathematical distance between ranks is not uniform. Nominal data consists of unranked categories (like eye color or product type), while discrete and continuous apply strictly to numerical measurements.",
    supplementalKey: "data_types_classification"
  },
  {
    id: 6,
    domainId: 1,
    domainName: "Data Concepts & Environments",
    difficulty: 1,
    question: "A database stores the number of support tickets submitted each day. How should this variable be classified?",
    options: {
      A: "Continuous",
      B: "Nominal",
      C: "Discrete",
      D: "Ordinal"
    },
    correct: "C",
    fiftyFiftyKeep: "A",
    socraticCoach: "Can a support desk receive 14.378 support tickets in a single day, or are daily ticket counts strictly whole, countable integers (0, 1, 2, 3...)?",
    explanation: "Daily ticket counts are quantitative and discrete because they can only take countable whole-number (integer) values and cannot be meaningfully subdivided into fractions on a single record. Continuous variables can take any fractional value along a measurement scale (such as time duration, weight, or temperature), while nominal and ordinal describe qualitative categories.",
    supplementalKey: "data_types_classification"
  },
  {
    id: 7,
    domainId: 1,
    domainName: "Data Concepts & Environments",
    difficulty: 2,
    question: "A dataset contains ZIP codes such as 30303 and 10001. Which statement is most accurate?",
    options: {
      A: "They are continuous measurements",
      B: "They are discrete measures",
      C: "They are categorical identifiers",
      D: "They are ordinal because they contain digits"
    },
    correct: "C",
    fiftyFiftyKeep: "B",
    socraticCoach: "Even though 30303 and 10001 are written with numeric digits, ask yourself: does subtracting 10001 from 30303 or taking the average of two ZIP codes produce a meaningful mathematical measurement, or are those digits just serving as geographic labels?",
    explanation: "ZIP codes, phone numbers, and employee IDs are categorical (nominal) identifiers that happen to use digits as labels for geographic regions or entities. Because performing arithmetic like addition or averaging on ZIP codes is mathematically meaningless, they must be treated as categorical strings rather than discrete or continuous quantitative measures.",
    supplementalKey: "data_types_classification"
  },
  {
    id: 8,
    domainId: 1,
    domainName: "Data Concepts & Environments",
    difficulty: 1,
    question: "A company stores data in a public cloud and keeps its sensitive customer database on its own servers. Which infrastructure model is this?",
    options: {
      A: "Private cloud only",
      B: "Public cloud only",
      C: "Hybrid",
      D: "On-premises only"
    },
    correct: "C",
    fiftyFiftyKeep: "A",
    socraticCoach: "The company is combining two distinct environments—public cloud storage for general workloads plus local on-premises servers for sensitive customer records. What deployment model bridges both worlds?",
    explanation: "A hybrid infrastructure model integrates public cloud services with on-premises servers or private cloud hardware, allowing organizations to scale general workloads in the cloud while keeping sensitive data under direct local control. The 'only' options fail because the scenario explicitly spans both public cloud and on-premises environments.",
    supplementalKey: "cloud_infrastructure_models"
  },
  {
    id: 9,
    domainId: 1,
    domainName: "Data Concepts & Environments",
    difficulty: 2,
    question: "A database table has one row per sale and includes measures such as quantity and revenue, plus keys to customer, product, and date tables. In a dimensional model, what is this table?",
    options: {
      A: "Fact table",
      B: "Data dictionary",
      C: "Bridge table",
      D: "Dimension table"
    },
    correct: "A",
    fiftyFiftyKeep: "D",
    socraticCoach: "In a star or snowflake schema, one central table holds quantitative numerical measurements (quantity, revenue) and foreign keys, while the surrounding tables hold descriptive context (who, what, when, where). Which one is the central table of measurements?",
    explanation: "In dimensional modeling (such as a star schema), a fact table sits at the center and records measurable quantitative business events (metrics like quantity and revenue) alongside foreign keys pointing to surrounding tables. Dimension tables store the descriptive attributes (customer names, product categories, calendar dates) used to filter and group those facts.",
    supplementalKey: "dimensional_modeling_star"
  },
  {
    id: 10,
    domainId: 1,
    domainName: "Data Concepts & Environments",
    difficulty: 1,
    question: "A reporting team wants a reusable tool for querying and managing relational databases with SQL. Which category of software is designed for this?",
    options: {
      A: "DBMS",
      B: "Image editor",
      C: "Presentation software",
      D: "Web browser only"
    },
    correct: "A",
    fiftyFiftyKeep: "D",
    socraticCoach: "Which core software layer sits between users and raw database storage to administer schemas, enforce constraints, and execute SQL queries?",
    explanation: "A Database Management System (DBMS)—or Relational DBMS (RDBMS) such as MySQL, PostgreSQL, or SQL Server—provides the engine and tools required to create, query, secure, and administer relational databases using SQL. Presentation software, image editors, and standalone web browsers cannot natively manage relational schemas or execute SQL engines.",
    supplementalKey: "dbms_and_sql_tools"
  },

  // ==========================================================================
  // DOMAIN 2: DATA ACQUISITION & PREPARATION (Questions 11 - 22)
  // ==========================================================================
  {
    id: 11,
    domainId: 2,
    domainName: "Data Acquisition & Preparation",
    difficulty: 1,
    question: "An analyst combines customer data from a CRM system with order data from an e-commerce database using a shared CustomerID. Which operation is being performed?",
    options: {
      A: "Join",
      B: "Binning",
      C: "Scaling",
      D: "Imputation"
    },
    correct: "A",
    fiftyFiftyKeep: "B",
    socraticCoach: "The analyst is matching records horizontally across two separate tables based on a common key (`CustomerID`). Which relational operation links tables by a shared key?",
    explanation: "A join operation horizontally combines columns from two or more tables by matching rows that share a common relational key, such as `CustomerID`. Binning groups continuous numbers into ranges, scaling adjusts numeric magnitudes, and imputation fills in missing values.",
    supplementalKey: "joins_vs_blending_appending"
  },
  {
    id: 12,
    domainId: 2,
    domainName: "Data Acquisition & Preparation",
    difficulty: 2,
    question: "A team collects data from a vendor API every night and loads it into an analytics platform after cleaning and transforming it. Which process is this?",
    options: {
      A: "ETL",
      B: "OLTP",
      C: "RBAC",
      D: "UAT"
    },
    correct: "A",
    fiftyFiftyKeep: "B",
    socraticCoach: "Trace the chronological order of the steps in the prompt: 1) Collect (Extract), 2) Clean and transform (Transform), and 3) Load into the analytics platform (Load). Which acronym matches that sequence?",
    explanation: "Extract, Transform, Load (ETL) describes a data pipeline where raw data is extracted from source systems, cleaned and transformed in a staging area, and then loaded into the target analytics repository. In contrast, OLTP handles live transactions, RBAC governs security permissions, and UAT is user testing.",
    supplementalKey: "etl_vs_elt"
  },
  {
    id: 13,
    domainId: 2,
    domainName: "Data Acquisition & Preparation",
    difficulty: 2,
    question: "A cloud platform first loads raw data and then transforms it inside the destination environment. Which approach is this?",
    options: {
      A: "ETL",
      B: "ELT",
      C: "OLTP",
      D: "Data masking"
    },
    correct: "B",
    fiftyFiftyKeep: "A",
    socraticCoach: "Compare this to the previous question: here, the raw data is *loaded immediately* into the cloud destination first, and the transformation happens *afterward* using the destination platform's compute power. How does that flip the letters?",
    explanation: "Extract, Load, Transform (ELT) extracts raw data from sources and loads it directly into a scalable cloud data warehouse or data lake before using the destination system's processing power to transform it. Traditional ETL performs the transformation on an intermediate server *before* loading into the target warehouse.",
    supplementalKey: "etl_vs_elt"
  },
  {
    id: 14,
    domainId: 2,
    domainName: "Data Acquisition & Preparation",
    difficulty: 1,
    question: "A dataset contains the same customer record three times because of repeated imports. What data-quality issue should be addressed?",
    options: {
      A: "Duplication",
      B: "Data lineage",
      C: "Encryption",
      D: "Redundancy"
    },
    correct: "A",
    fiftyFiftyKeep: "D",
    socraticCoach: "When repeated batch imports accidentally insert identical copies of the exact same customer row into a single table, what specific data-cleansing defect are we removing during deduplication?",
    explanation: "Data duplication occurs when identical records are unintentionally repeated within a dataset (often due to repeated imports or faulty joins), which artificially inflates row counts and summary totals. While redundancy often refers to storing the same data attributes across multiple tables or systems, exact repeated rows from an import error are addressed through deduplication.",
    supplementalKey: "data_cleaning_missing_outliers"
  },
  {
    id: 15,
    domainId: 2,
    domainName: "Data Acquisition & Preparation",
    difficulty: 2,
    question: "A required Age field contains blank values for 8% of records. What should the analyst do first?",
    options: {
      A: "Replace every blank with NULL",
      B: "Investigate why values are missing and assess an appropriate treatment",
      C: "Delete the entire dataset",
      D: "Assume the blanks mean the customer is under 18"
    },
    correct: "B",
    fiftyFiftyKeep: "A",
    socraticCoach: "Before you ever alter, impute, or delete missing records on the CompTIA Data+ exam, what is always the mandatory first analytical step to ensure you don't introduce bias?",
    explanation: "When encountering missing data, an analyst must first profile and investigate the root cause of the missingness (e.g., whether values are missing at random or due to a systemic collection bug) before choosing imputation, exclusion, or NULL handling. Blindly replacing values, making unverified assumptions, or deleting valid data can severely distort downstream analysis.",
    supplementalKey: "data_cleaning_missing_outliers"
  },
  {
    id: 16,
    domainId: 2,
    domainName: "Data Acquisition & Preparation",
    difficulty: 2,
    question: "A numeric field contains a customer age of 245. What is the best initial action?",
    options: {
      A: "Treat it as a valid maximum",
      B: "Flag it as a possible outlier or invalid value and validate against source rules",
      C: "Convert it to a string and ignore it",
      D: "Replace this age with the mean"
    },
    correct: "B",
    fiftyFiftyKeep: "D",
    socraticCoach: "A human age of 245 is biologically impossible—likely a typo for 24 or 45. Before automatically overwriting it with the mean, what should a diligent analyst check first?",
    explanation: "An impossible value like an age of 245 represents a data entry error or extreme anomaly that must first be flagged and validated against business rules and source records (to see if the true age can be recovered). Automatically imputing the mean without investigating first can mask systemic data collection bugs.",
    supplementalKey: "data_cleaning_missing_outliers"
  },
  {
    id: 17,
    domainId: 2,
    domainName: "Data Acquisition & Preparation",
    difficulty: 1,
    question: "An analyst changes date strings such as '1/12/2026' into a consistent date data type like 2026-12-01 so they can be sorted and analyzed. Which technique is this?",
    options: {
      A: "Data type conversion",
      B: "Data masking",
      C: "Clustering",
      D: "Aggregation"
    },
    correct: "A",
    fiftyFiftyKeep: "D",
    socraticCoach: "The values are currently stored as plain text strings (`VARCHAR`) and need to be cast into standardized ISO `DATE` objects so chronological sorting works properly. What preparation technique changes a field's underlying storage type?",
    explanation: "Data type conversion (or type casting) transforms values from one storage format to another—such as parsing raw text strings into standardized ISO `YYYY-MM-DD` date objects—so date math and chronological sorting function properly. Without converting from string to date, sorting would order dates alphabetically ('1/12' before '2/1') rather than chronologically.",
    supplementalKey: "data_transformation_scaling_binning"
  },
  {
    id: 18,
    domainId: 2,
    domainName: "Data Acquisition & Preparation",
    difficulty: 2,
    question: "A company wants to compare salaries measured in dollars with expenses measured in thousands of dollars. Which preparation step makes the data comparable?",
    options: {
      A: "Scaling",
      B: "Appending",
      C: "Parsing",
      D: "Deduplication"
    },
    correct: "A",
    fiftyFiftyKeep: "C",
    socraticCoach: "One column reports `50,000` (dollars) while the other reports `50` (thousands of dollars). What numerical preparation step adjusts units or numeric magnitudes onto a common scale?",
    explanation: "Scaling (or normalization/standardization) adjusts numeric variables that are recorded in different units or orders of magnitude so they can be accurately compared or fed into analytical models on equal footing. Appending stacks rows vertically, parsing splits text strings, and deduplication removes duplicate rows.",
    supplementalKey: "data_transformation_scaling_binning"
  },
  {
    id: 19,
    domainId: 2,
    domainName: "Data Acquisition & Preparation",
    difficulty: 1,
    question: "An analyst groups customer ages into ranges: 18–24, 25–34, 35–44, and 45+. What transformation is being used?",
    options: {
      A: "Scaling",
      B: "Joining",
      C: "Encryption",
      D: "Binning"
    },
    correct: "D",
    fiftyFiftyKeep: "A",
    socraticCoach: "Think of taking individual numeric ages (19, 22, 24) and dropping them into labeled age 'buckets' or intervals. What is the data-prep term for bucketing continuous numbers into intervals?",
    explanation: "Binning (also called bucketing or discretization) converts continuous or granular numeric values into categorical intervals or age brackets (such as 18–24 and 25–34) to simplify analysis and histogram visualization. Scaling keeps numbers continuous while changing their range, whereas binning groups them into discrete buckets.",
    supplementalKey: "data_transformation_scaling_binning"
  },
  {
    id: 20,
    domainId: 2,
    domainName: "Data Acquisition & Preparation",
    difficulty: 2,
    question: "A survey is sent to every 20th customer on an ordered customer list. Which sampling method is being used?",
    options: {
      A: "Systematic sampling",
      B: "Convenience sampling",
      C: "Cluster sampling",
      D: "Simple random sampling"
    },
    correct: "A",
    fiftyFiftyKeep: "D",
    socraticCoach: "Notice the rule used to pick participants: starting from an ordered list and selecting every $k$-th (every 20th) record at a fixed, repeating interval. Which sampling method uses a fixed system or interval?",
    explanation: "Systematic sampling selects sample members from an ordered population list at a fixed, regular interval (every $k$-th element, such as every 20th customer). Simple random sampling uses pure chance for every pick without an interval rule, cluster sampling selects entire pre-existing groups (like specific store locations), and convenience sampling picks whoever is easiest to reach.",
    supplementalKey: "sampling_methods"
  },
  {
    id: 21,
    domainId: 2,
    domainName: "Data Acquisition & Preparation",
    difficulty: 2,
    question: "A query is slow because it repeatedly searches a large table by CustomerID. Which database optimization may improve lookup performance?",
    options: {
      A: "Add an appropriate index",
      B: "Convert all values to text",
      C: "Remove the WHERE clause",
      D: "Use a CROSS JOIN"
    },
    correct: "A",
    fiftyFiftyKeep: "C",
    socraticCoach: "Just like using an alphabetized index at the back of a textbook instead of reading every single page from start to finish, what database structure speeds up `WHERE` lookups and joins on `CustomerID`?",
    explanation: "Adding a database index on frequently searched or joined columns like `CustomerID` creates an optimized lookup structure (such as a B-tree) so the database engine can locate matching rows without scanning the entire table. While indexes slightly increase storage and write overhead, they dramatically accelerate read and lookup queries.",
    supplementalKey: "query_optimization_indexing"
  },
  {
    id: 22,
    domainId: 2,
    domainName: "Data Acquisition & Preparation",
    difficulty: 1,
    question: "An analyst needs only orders placed in 2026, rather than every order in the database. Which query operation reduces the rows returned?",
    options: {
      A: "Filtering",
      B: "Concatenation",
      C: "Encryption",
      D: "Pivoting"
    },
    correct: "A",
    fiftyFiftyKeep: "D",
    socraticCoach: "When you apply a `WHERE OrderYear = 2026` condition to subset a table horizontally so only matching records pass through, what operation are you performing?",
    explanation: "Filtering applies logical criteria (such as a SQL `WHERE` clause) to restrict the result set and return only the rows that satisfy the condition (orders placed in 2026). Concatenation merges text strings together, pivoting rotates rows into columns, and encryption scrambles data for security.",
    supplementalKey: "query_optimization_indexing"
  },

  // ==========================================================================
  // DOMAIN 3: DATA ANALYSIS (Questions 23 - 37)
  // ==========================================================================
  {
    id: 23,
    domainId: 3,
    domainName: "Data Analysis",
    difficulty: 1,
    question: "A manager asks, 'What happened to revenue last quarter?' The analyst summarizes the change from the prior quarter. Which analytics type is this?",
    options: {
      A: "Descriptive",
      B: "Diagnostic",
      C: "Predictive",
      D: "Prescriptive"
    },
    correct: "A",
    fiftyFiftyKeep: "B",
    socraticCoach: "Match the four types of analytics to their core question: 'What happened?' vs. 'Why did it happen?' vs. 'What will happen next?' vs. 'What action should we take?'. Which one simply describes the past?",
    explanation: "Descriptive analytics summarizes historical data to answer the question 'What happened?' using KPIs, period-over-period comparisons, and summary reports. It does not drill into root causes (diagnostic), forecast future trends (predictive), or recommend optimal decisions (prescriptive).",
    supplementalKey: "four_types_of_analytics"
  },
  {
    id: 24,
    domainId: 3,
    domainName: "Data Analysis",
    difficulty: 1,
    question: "After revenue declines, an analyst investigates whether a price increase or a supply issue caused the decline. Which analytics type is this?",
    options: {
      A: "Descriptive",
      B: "Diagnostic",
      C: "Predictive",
      D: "Prescriptive"
    },
    correct: "B",
    fiftyFiftyKeep: "A",
    socraticCoach: "We already know *what* happened (revenue declined). Now the analyst is drilling down to isolate the *root cause* (price increase vs. supply bottleneck). Just like a doctor finding the cause of symptoms, what is this called?",
    explanation: "Diagnostic analytics investigates historical data to answer 'Why did it happen?' by performing root-cause analysis, drill-downs, and correlation checks (such as testing price increases vs. supply issues). Descriptive analytics only reports that the decline occurred without explaining the underlying cause.",
    supplementalKey: "four_types_of_analytics"
  },
  {
    id: 25,
    domainId: 3,
    domainName: "Data Analysis",
    difficulty: 1,
    question: "A model estimates next month's customer churn using historical customer behavior. Which analytics type is this?",
    options: {
      A: "Descriptive",
      B: "Diagnostic",
      C: "Predictive",
      D: "Prescriptive"
    },
    correct: "C",
    fiftyFiftyKeep: "D",
    socraticCoach: "The model is using historical patterns to forecast a *future* probability ('next month's customer churn'), without yet recommending which specific retention offer to send. Which analytics tier forecasts future outcomes?",
    explanation: "Predictive analytics uses statistical modeling, machine learning, and historical trends to answer 'What is likely to happen in the future?'—such as estimating next month's customer churn. Prescriptive analytics goes a step further by recommending specific actions to change or optimize that future outcome.",
    supplementalKey: "four_types_of_analytics"
  },
  {
    id: 26,
    domainId: 3,
    domainName: "Data Analysis",
    difficulty: 2,
    question: "An analyst compares several discount strategies and recommends the one expected to maximize profit. Which analytics type is this?",
    options: {
      A: "Descriptive",
      B: "Diagnostic",
      C: "Predictive",
      D: "Prescriptive"
    },
    correct: "D",
    fiftyFiftyKeep: "C",
    socraticCoach: "Notice the keyword *recommends*: the analysis doesn't stop at forecasting what might happen—it evaluates options and prescribes the best course of action to maximize profit. Which tier prescribes an action?",
    explanation: "Prescriptive analytics evaluates multiple potential scenarios or optimizations to answer 'What action should we take?' and recommends the best decision to achieve a target goal (maximizing profit). While it builds on predictive forecasts, its defining feature is prescribing an actionable recommendation.",
    supplementalKey: "four_types_of_analytics"
  },
  {
    id: 27,
    domainId: 3,
    domainName: "Data Analysis",
    difficulty: 2,
    question: "The values are 4, 5, 5, 6, and 30. Which measure of center is least affected by the extreme value 30?",
    options: {
      A: "Mean",
      B: "Median",
      C: "Range",
      D: "Standard deviation"
    },
    correct: "B",
    fiftyFiftyKeep: "A",
    socraticCoach: "First, eliminate Range and Standard Deviation because those measure *spread/dispersion*, not center. Between Mean and Median, which one stays anchored at `5` even when `30` pulls the average upward?",
    explanation: "The median (the middle value in an ordered list, which is 5 here) is a robust measure of central tendency that resists extreme outliers like 30. The arithmetic mean is heavily skewed upward to 10 by the outlier, while range and standard deviation are measures of dispersion rather than measures of center.",
    supplementalKey: "descriptive_stats_center_spread"
  },
  {
    id: 28,
    domainId: 3,
    domainName: "Data Analysis",
    difficulty: 1,
    question: "A dataset contains 2, 4, 6, and 8. What is the mean?",
    options: {
      A: "2",
      B: "4",
      C: "5",
      D: "6"
    },
    correct: "C",
    fiftyFiftyKeep: "B",
    socraticCoach: "Add the four values together ($2 + 4 + 6 + 8$) and divide that sum by the total number of observations ($4$). What does that give you?",
    explanation: "The arithmetic mean is calculated by summing all values in the dataset ($2 + 4 + 6 + 8 = 20$) and dividing by the count of values ($4$), which equals $5$. Because this dataset is perfectly symmetrical, $5$ is also the median (the average of the two middle numbers, $4$ and $6$).",
    supplementalKey: "descriptive_stats_center_spread"
  },
  {
    id: 29,
    domainId: 3,
    domainName: "Data Analysis",
    difficulty: 1,
    question: "A dataset contains 3, 7, 9, 10, and 21. What is the median?",
    options: {
      A: "7",
      B: "9",
      C: "10",
      D: "21"
    },
    correct: "B",
    fiftyFiftyKeep: "C",
    socraticCoach: "Count how many numbers are in the ordered list `3, 7, 9, 10, 21`: there are 5 values (an odd count). Which number sits dead-center with two values below it and two values above it?",
    explanation: "The median is the middle value of a dataset when ordered from least to greatest. Because `3, 7, 9, 10, 21` contains an odd number of observations (5 values), the median is the exact 3rd value in the middle, which is `9` (whereas an even number of values would require averaging the two middle numbers).",
    supplementalKey: "descriptive_stats_center_spread"
  },
  {
    id: 30,
    domainId: 3,
    domainName: "Data Analysis",
    difficulty: 1,
    question: "A business wants to understand how spread out its processing times are around the mean. Which measure is most appropriate?",
    options: {
      A: "Standard deviation",
      B: "Mode",
      C: "Median",
      D: "Mean"
    },
    correct: "A",
    fiftyFiftyKeep: "D",
    socraticCoach: "Mode, Median, and Mean are all measures of *central tendency* (where the center sits). Which option is a measure of *dispersion* that quantifies the average distance of data points from the mean?",
    explanation: "Standard deviation is a measure of dispersion (variability) that quantifies how tightly or widely individual data points are spread out around the mean. Mode, median, and mean are measures of central tendency that describe a dataset's typical center rather than its spread.",
    supplementalKey: "descriptive_stats_center_spread"
  },
  {
    id: 31,
    domainId: 3,
    domainName: "Data Analysis",
    difficulty: 2,
    question: "A z-score is +2. What does this indicate?",
    options: {
      A: "The value is two standard deviations below the mean",
      B: "The value is two standard deviations above the mean",
      C: "The value equals the mean",
      D: "The value is two units above the median"
    },
    correct: "B",
    fiftyFiftyKeep: "A",
    socraticCoach: "Recall the z-score formula: $z = (x - \\mu) / \\sigma$. What does the *positive sign* ($+$) tell you about the direction from the mean, and what unit of distance does a z-score measure?",
    explanation: "A z-score measures how many standard deviations a specific observation falls above or below the population or sample mean. A positive sign ($+2$) indicates the value is two standard deviations *above* the mean, whereas a negative z-score ($-2$) would be two standard deviations below the mean and $0$ would equal the mean.",
    supplementalKey: "z_scores_and_percent_change"
  },
  {
    id: 32,
    domainId: 3,
    domainName: "Data Analysis",
    difficulty: 2,
    question: "A company's sales increase from $80,000 to $100,000. What is the percentage increase?",
    options: {
      A: "20%",
      B: "25%",
      C: "120%",
      D: "125%"
    },
    correct: "B",
    fiftyFiftyKeep: "A",
    socraticCoach: "Watch out for the common trap! The dollar increase is $\\$20,000$, Voiding the impulse to pick 20%—remember you must divide that $\\$20,000$ change by the *original starting baseline* ($\\$80,000$), not by $\\$100,000$. What is $20,000 / 80,000$?",
    explanation: "Percentage increase is calculated as $(\\text{New} - \\text{Original}) / \\text{Original} \\times 100$. Dividing the $\\$20,000$ increase by the original baseline of $\\$80,000$ gives $0.25$, or $25\\%$ (a common exam trap is dividing by the new $\\$100,000$ figure to get $20\\%$).",
    supplementalKey: "z_scores_and_percent_change"
  },
  {
    id: 33,
    domainId: 3,
    domainName: "Data Analysis",
    difficulty: 3,
    question: "A Type I error occurs when an analyst:",
    options: {
      A: "Fails to reject a false null hypothesis",
      B: "Rejects a true null hypothesis",
      C: "Accepts a true alternative hypothesis",
      D: "Uses the wrong chart type"
    },
    correct: "B",
    fiftyFiftyKeep: "A",
    socraticCoach: "Think of a Type I error as a 'False Positive' alarm (a smoke detector going off when there is no actual fire—the null hypothesis of 'no fire' was actually true, yet we rejected it). Which choice describes rejecting a true null?",
    explanation: "A Type I error (false positive, denoted by $\\alpha$) occurs when an analyst rejects the null hypothesis ($H_0$) when the null hypothesis is actually true in reality. Failing to reject a false null hypothesis is a Type II error (false negative, denoted by $\\beta$).",
    supplementalKey: "hypothesis_testing_pvalues_errors"
  },
  {
    id: 34,
    domainId: 3,
    domainName: "Data Analysis",
    difficulty: 3,
    question: "A Type II error occurs when an analyst:",
    options: {
      A: "Rejects a true null hypothesis",
      B: "Fails to reject a false null hypothesis",
      C: "Finds a statistically significant result",
      D: "Uses a sample larger than necessary"
    },
    correct: "B",
    fiftyFiftyKeep: "A",
    socraticCoach: "If Type I is a False Positive, Type II is a 'False Negative'—missing a real effect that is actually there (the null hypothesis of 'no effect' is false, yet we failed to reject it). Which option matches that?",
    explanation: "A Type II error (false negative, denoted by $\\beta$) occurs when an analyst fails to reject a null hypothesis ($H_0$) that is actually false, thereby missing a real effect present in the population. Rejecting a true null hypothesis is a Type I error.",
    supplementalKey: "hypothesis_testing_pvalues_errors"
  },
  {
    id: 35,
    domainId: 3,
    domainName: "Data Analysis",
    difficulty: 2,
    question: "A researcher reports a p-value of 0.03 and uses a significance level of 0.05. What is the correct decision?",
    options: {
      A: "Fail to reject the null hypothesis",
      B: "Reject the null hypothesis",
      C: "Declare the null hypothesis is true",
      D: "Increase the sample mean"
    },
    correct: "B",
    fiftyFiftyKeep: "A",
    socraticCoach: "Remember the classic statistics rhyme: 'If the p-value is low (less than $\\alpha$), the null must go!' Compare $p = 0.03$ against $\\alpha = 0.05$—is $p$ lower than $\\alpha$?",
    explanation: "When the p-value ($0.03$) is less than or equal to the chosen significance threshold $\\alpha$ ($0.05$), the result is statistically significant and the correct decision is to reject the null hypothesis ($H_0$). If the p-value had been greater than $0.05$, the researcher would fail to reject the null hypothesis.",
    supplementalKey: "hypothesis_testing_pvalues_errors"
  },
  {
    id: 36,
    domainId: 3,
    domainName: "Data Analysis",
    difficulty: 1,
    question: "An analyst calculates the average salary separately for each department. Which SQL clause or analytical operation summarizes the salaries by department?",
    options: {
      A: "GROUP BY",
      B: "ORDER BY",
      C: "WHERE",
      D: "SUM()"
    },
    correct: "A",
    fiftyFiftyKeep: "B",
    socraticCoach: "In SQL, when you apply an aggregate function like `AVG(Salary)` and want one subtotal row *per department*, which clause buckets the rows into department categories?",
    explanation: "In SQL, the `GROUP BY` clause organizes rows sharing the same category value (such as `Department`) into summary groups so aggregate functions like `AVG(Salary)` can be computed separately for each group. `ORDER BY` only sorts the output rows, `WHERE` filters individual rows before grouping, and `SUM()` adds values rather than grouping them.",
    supplementalKey: "sql_aggregates_and_grouping"
  },
  {
    id: 37,
    domainId: 3,
    domainName: "Data Analysis",
    difficulty: 2,
    question: "Which SQL aggregate counts all rows, including rows where some columns contain NULL?",
    options: {
      A: "COUNT(column_name)",
      B: "COUNT(*)",
      C: "AVG(*)",
      D: "SUM(*)"
    },
    correct: "B",
    fiftyFiftyKeep: "A",
    socraticCoach: "In SQL, passing a specific column name into `COUNT(column_name)` skips over any `NULL` cells in that column. Which wildcard syntax tells SQL to count every physical row in the table regardless of `NULL` values?",
    explanation: "`COUNT(*)` counts the total number of rows returned by a query regardless of whether individual columns contain `NULL` values. In contrast, `COUNT(column_name)` ignores `NULL` entries and counts only non-NULL values in that specific column, while `AVG(*)` and `SUM(*)` are invalid SQL syntax.",
    supplementalKey: "sql_aggregates_and_grouping"
  },

  // ==========================================================================
  // DOMAIN 4: VISUALIZATION & REPORTING (Questions 38 - 47)
  // ==========================================================================
  {
    id: 38,
    domainId: 4,
    domainName: "Visualization & Reporting",
    difficulty: 1,
    question: "A sales director wants to see monthly revenue over the last three years and identify the overall pattern. Which chart is best?",
    options: {
      A: "Line chart",
      B: "Pie chart",
      C: "Scatter plot",
      D: "Gantt chart"
    },
    correct: "A",
    fiftyFiftyKeep: "C",
    socraticCoach: "The sales director is tracking a continuous metric (monthly revenue) across 36 sequential time periods to spot longitudinal trends and seasonality. Which chart connects continuous time-series points?",
    explanation: "A line chart is the optimal visualization for tracking continuous metrics across sequential time intervals (such as 36 months of revenue) to highlight trends, seasonality, and trajectory. Pie charts show static part-to-whole proportions, scatter plots compare two numeric variables for correlation, and Gantt charts track project schedules.",
    supplementalKey: "chart_selection_guide"
  },
  {
    id: 39,
    domainId: 4,
    domainName: "Visualization & Reporting",
    difficulty: 1,
    question: "A regional manager wants to compare total sales across five regions. Which chart is best?",
    options: {
      A: "Histogram",
      B: "Bar or column chart",
      C: "Scatter plot",
      D: "Waterfall chart"
    },
    correct: "B",
    fiftyFiftyKeep: "A",
    socraticCoach: "We are comparing a total metric across five distinct, discrete *categorical* labels (North, South, East, West, Central)—not continuous numeric bins. Should we use a bar/column chart or a histogram?",
    explanation: "A bar or column chart is ideal for comparing aggregate values across discrete, independent categories such as sales regions, product lines, or departments. A histogram looks visually similar but is reserved exclusively for showing the frequency distribution of a single continuous numeric variable across adjacent numeric intervals (bins).",
    supplementalKey: "chart_selection_guide"
  },
  {
    id: 40,
    domainId: 4,
    domainName: "Visualization & Reporting",
    difficulty: 1,
    question: "An analyst wants to examine the relationship between advertising spend and sales revenue, both numeric variables. Which chart is best?",
    options: {
      A: "Pie chart",
      B: "Scatter plot",
      C: "Gantt chart",
      D: "Histogram"
    },
    correct: "B",
    fiftyFiftyKeep: "D",
    socraticCoach: "We have two continuous quantitative variables—Advertising Spend on the X-axis and Sales Revenue on the Y-axis—and want to see if higher ad spend correlates with higher revenue. Which chart plots paired $(x, y)$ coordinates?",
    explanation: "A scatter plot displays paired observations across two quantitative axes $(x, y)$ to reveal correlations, clusters, trends, and outliers between two continuous numeric variables (such as advertising spend and sales revenue). Histograms only show the distribution of a single numeric variable, and pie charts show categorical proportions.",
    supplementalKey: "chart_selection_guide"
  },
  {
    id: 41,
    domainId: 4,
    domainName: "Visualization & Reporting",
    difficulty: 2,
    question: "A quality manager wants to see how many product weights fall into each measurement range. Which chart is most appropriate?",
    options: {
      A: "Histogram",
      B: "Line chart",
      C: "Bar Chart",
      D: "Gantt chart"
    },
    correct: "A",
    fiftyFiftyKeep: "C",
    socraticCoach: "Notice that product weight is a continuous measurement grouped into adjacent numerical ranges (bins), and we are counting how many items fall into each weight bin to inspect the shape of the distribution. Which chart uses contiguous numeric bins?",
    explanation: "A histogram plots the frequency distribution of a continuous numeric variable (product weights) by dividing the measurement scale into contiguous intervals (bins) and showing how many observations fall into each bin. Unlike a bar chart, which compares separate categorical labels with gaps between bars, a histogram has touching bars representing a continuous numeric spectrum.",
    supplementalKey: "chart_selection_guide"
  },
  {
    id: 42,
    domainId: 4,
    domainName: "Visualization & Reporting",
    difficulty: 2,
    question: "A finance team wants to show how revenue is reduced by expenses to arrive at net profit. Which chart is best?",
    options: {
      A: "Waterfall chart",
      B: "Scatter plot",
      C: "Histogram",
      D: "Gantt chart"
    },
    correct: "A",
    fiftyFiftyKeep: "C",
    socraticCoach: "Picture a financial bridge chart that starts with a full column for Gross Revenue, then shows floating 'stepping stone' blocks stepping down for each expense category until landing on the final Net Profit pillar. What is that chart called?",
    explanation: "A waterfall chart visualizes the cumulative effect of sequential positive and negative values—such as how an initial starting value (gross revenue) is increased or reduced by intermediate steps (cost of goods, operating expenses, taxes) to reach a final ending value (net profit). None of the other chart types track sequential additive and subtractive bridges.",
    supplementalKey: "chart_selection_guide"
  },
  {
    id: 43,
    domainId: 4,
    domainName: "Visualization & Reporting",
    difficulty: 1,
    question: "A project manager needs to display tasks, start dates, durations, and overlapping project activities. Which chart is best?",
    options: {
      A: "Gantt chart",
      B: "Pie chart",
      C: "Histogram",
      D: "Scatter plot"
    },
    correct: "A",
    fiftyFiftyKeep: "D",
    socraticCoach: "In project management, which horizontal bar timeline maps out project tasks down the left side and stretches bars across calendar dates to show start/end dates, durations, and overlapping dependencies?",
    explanation: "A Gantt chart is a project management timeline visualization that lists tasks on the vertical axis and plots horizontal bars across a calendar timeline to show task start dates, durations, milestones, and overlapping activities. Pie charts, histograms, and scatter plots are designed for quantitative data distributions rather than project scheduling.",
    supplementalKey: "chart_selection_guide"
  },
  {
    id: 44,
    domainId: 4,
    domainName: "Visualization & Reporting",
    difficulty: 1,
    question: "A dashboard is intended for executives who need a quick view of performance. What is the best design approach?",
    options: {
      A: "Show all available data fields",
      B: "Highlight a small set of relevant KPIs with clear labels and concise context",
      C: "Use many colors and 3D effects",
      D: "Avoid titles so the dashboard looks cleaner"
    },
    correct: "B",
    fiftyFiftyKeep: "A",
    socraticCoach: "Executives have very limited time and need high-level strategic situational awareness at a glance. Should we overwhelm them with raw tables and 3D visual clutter, or surface concise, clearly labeled KPIs?",
    explanation: "Effective executive dashboard design prioritizes visual clarity by displaying a focused set of Key Performance Indicators (KPIs) with clear titles, labels, and benchmark context (such as targets or prior-period comparisons). Dumping every raw field or adding 3D effects creates cognitive overload and chart junk that obscures actionable insights.",
    supplementalKey: "dashboard_design_and_delivery"
  },
  {
    id: 45,
    domainId: 4,
    domainName: "Visualization & Reporting",
    difficulty: 2,
    question: "A report filter appears to work, but the displayed totals do not change when a region is selected. What should the analyst do first?",
    options: {
      A: "Validate the filter logic and its connection to the data",
      B: "Change the chart colors",
      C: "Delete the source data",
      D: "Publish the report as a PDF"
    },
    correct: "A",
    fiftyFiftyKeep: "D",
    socraticCoach: "When an interactive slicer or dropdown lets you click a region on screen, yet the KPI cards and totals stay frozen, what is most likely disconnected under the hood in your BI tool?",
    explanation: "When a dashboard slicer or filter fails to update visual totals, the analyst should first inspect the underlying filter configuration, table relationships, and visual interaction bindings to ensure the filter is actually wired to the target data model. Changing colors, exporting to PDF, or deleting source data will not fix a broken relationship or visual binding.",
    supplementalKey: "dashboard_design_and_delivery"
  },
  {
    id: 46,
    domainId: 4,
    domainName: "Visualization & Reporting",
    difficulty: 2,
    question: "A dashboard refreshes slowly because it retrieves millions of unnecessary rows. Which action is most likely to improve performance?",
    options: {
      A: "Filter or subset the data to the required records",
      B: "Add more decorative charts",
      C: "Increase the number of dashboard colors",
      D: "Replace all numeric values with text"
    },
    correct: "A",
    fiftyFiftyKeep: "D",
    socraticCoach: "If a report only needs the last 12 months of regional summary data, why pull 15 years of unaggregated row-level history over the network? What query or model optimization cuts down payload size?",
    explanation: "Filtering, aggregating, or subsetting the data at the source query or data-model level so the dashboard retrieves only the rows and columns actually needed for the view drastically reduces memory consumption and refresh latency. Converting numbers to text or adding extra charts would degrade performance even further.",
    supplementalKey: "dashboard_design_and_delivery"
  },
  {
    id: 47,
    domainId: 4,
    domainName: "Visualization & Reporting",
    difficulty: 1,
    question: "A department needs an interactive report that users can filter whenever they want. Which delivery method is most appropriate?",
    options: {
      A: "Dynamic dashboard",
      B: "Static snapshot",
      C: "Printed report only",
      D: "One-time screenshot"
    },
    correct: "A",
    fiftyFiftyKeep: "B",
    socraticCoach: "Notice the two requirements: *interactive* (users can click slicers and filters) and *on-demand* ('whenever they want'). Can a printed page, screenshot, or static snapshot respond to live user clicks?",
    explanation: "A dynamic (interactive) hosted dashboard connects to live or scheduled data models and allows end users to apply self-service filters, slicers, and drill-downs on demand. Static snapshots, printed reports, and one-time screenshots freeze a single view at a point in time and cannot be interactively filtered.",
    supplementalKey: "dashboard_design_and_delivery"
  },

  // ==========================================================================
  // DOMAIN 5: DATA GOVERNANCE (Questions 48 - 54)
  // ==========================================================================
  {
    id: 48,
    domainId: 5,
    domainName: "Data Governance",
    difficulty: 2,
    question: "A company documents the origin of a data field and the transformations it went through before appearing in a report. What is this documentation describing?",
    options: {
      A: "Data lineage",
      B: "Data masking",
      C: "Data binning",
      D: "Data sampling"
    },
    correct: "A",
    fiftyFiftyKeep: "B",
    socraticCoach: "Think of a family tree or audit trail for a data field: tracing where the field was born (source system), every calculation or ETL pipeline it passed through, and where it lands on the final dashboard. What is that lifecycle trail called?",
    explanation: "Data lineage tracks and documents the complete lifecycle of data—from its initial point of origin through every system, ETL pipeline, and transformation rule up to its final consumption in a report. Maintaining clear data lineage enables impact analysis, auditing, and troubleshooting when report numbers look unexpected.",
    supplementalKey: "governance_lineage_dictionary"
  },
  {
    id: 49,
    domainId: 5,
    domainName: "Data Governance",
    difficulty: 1,
    question: "A data dictionary defines field names, meanings, formats, and permitted values. What governance purpose does it serve?",
    options: {
      A: "Standardizes understanding of data elements",
      B: "Encrypts data in transit",
      C: "Removes all duplicate records",
      D: "Predicts future outcomes"
    },
    correct: "A",
    fiftyFiftyKeep: "C",
    socraticCoach: "A data dictionary is a metadata reference document rather than an automated security or machine-learning tool. Why do data governance teams publish a centralized guide of column definitions, data types, and allowed values?",
    explanation: "A data dictionary serves as a centralized metadata reference that defines table columns, business meanings, data types, field lengths, and valid domain values so analysts and stakeholders interpret and use data consistently. It is a documentation artifact rather than an active encryption, deduplication, or predictive engine.",
    supplementalKey: "governance_lineage_dictionary"
  },
  {
    id: 50,
    domainId: 5,
    domainName: "Data Governance",
    difficulty: 1,
    question: "A database contains names, email addresses, and government identification numbers. These fields are examples of:",
    options: {
      A: "PII",
      B: "OLAP",
      C: "ETL",
      D: "KPI"
    },
    correct: "A",
    fiftyFiftyKeep: "D",
    socraticCoach: "Full names, personal email addresses, and Social Security / government ID numbers can directly pinpoint a specific living individual. Which governance and privacy classification covers data that identifies a person?",
    explanation: "Personally Identifiable Information (PII) refers to any data attribute—such as full name, email address, phone number, or government ID/SSN—that can be used on its own or combined with other fields to trace or distinguish an individual's identity. Under privacy regulations, PII requires strict access controls, masking, and encryption.",
    supplementalKey: "data_privacy_security_controls"
  },
  {
    id: 51,
    domainId: 5,
    domainName: "Data Governance",
    difficulty: 2,
    question: "A company replaces customer names with randomly generated tokens before sharing a dataset with analysts. Which protection technique is being applied?",
    options: {
      A: "Masking or pseudonymization",
      B: "Data aggregation only",
      C: "Data lineage",
      D: "Indexing"
    },
    correct: "A",
    fiftyFiftyKeep: "B",
    socraticCoach: "The records are still row-level individual transactions (not summed up into totals), but the direct human identifiers (`CustomerName`) have been swapped out for non-sensitive substitute tokens. What privacy technique obfuscates or substitutes identifiers?",
    explanation: "Data masking, tokenization, and pseudonymization protect sensitive PII by obscuring real identifiers or replacing them with reversible or non-sensitive substitute tokens so analysts can work with row-level data without exposing private customer identities. Aggregation summarizes rows into high-level totals rather than substituting tokens on individual records.",
    supplementalKey: "data_privacy_security_controls"
  },
  {
    id: 52,
    domainId: 5,
    domainName: "Data Governance",
    difficulty: 1,
    question: "A company requires employees to access customer records only when their job responsibilities require it. Which control is this?",
    options: {
      A: "Role-based access control (RBAC)",
      B: "Public access",
      C: "Data replication",
      D: "Open data sharing"
    },
    correct: "A",
    fiftyFiftyKeep: "C",
    socraticCoach: "Permissions are granted strictly according to an employee's job function (e.g., Billing Specialist vs. Warehouse Clerk) to enforce the principle of least privilege. What access control model assigns rights by job role?",
    explanation: "Role-Based Access Control (RBAC) enforces the principle of least privilege by grouping permissions according to specific organizational job functions and granting users access only to the data required to perform their assigned duties. This prevents unauthorized internal snooping and reduces the blast radius of compromised accounts.",
    supplementalKey: "data_privacy_security_controls"
  },
  {
    id: 53,
    domainId: 5,
    domainName: "Data Governance",
    difficulty: 2,
    question: "A company encrypts customer records while stored on disk. Which encryption state is being protected?",
    options: {
      A: "In transit",
      B: "At rest",
      C: "In memory only",
      D: "During visualization"
    },
    correct: "B",
    fiftyFiftyKeep: "A",
    socraticCoach: "Notice the data is sitting stationary on a physical hard drive or database disk rather than actively traveling across a network cable or Wi-Fi connection. Is stationary stored data 'in transit' or 'at rest'?",
    explanation: "Encryption at rest protects stationary data stored on physical media such as database hard drives, SSDs, backup tapes, or cloud storage buckets so that stolen drives or unauthorized file reads cannot expose plaintext records. Encryption in transit (such as TLS/HTTPS) protects data while it actively travels across networks.",
    supplementalKey: "data_privacy_security_controls"
  },
  {
    id: 54,
    domainId: 5,
    domainName: "Data Governance",
    difficulty: 1,
    question: "A report is tested by representative business users to confirm that it meets their needs before release. Which test is this?",
    options: {
      A: "Unit testing",
      B: "User acceptance testing (UAT)",
      C: "Stress testing",
      D: "Regression sampling"
    },
    correct: "B",
    fiftyFiftyKeep: "A",
    socraticCoach: "Developers run unit tests on isolated code blocks, and engineers run stress tests on server load. When the actual *end-user business stakeholders* test the final report to sign off that it solves their real-world workflow, what phase of testing is that?",
    explanation: "User Acceptance Testing (UAT) is the final validation phase where actual business stakeholders and end users test a report or dashboard in realistic scenarios to verify that it meets functional requirements before production sign-off. Unit testing checks isolated technical components during development, and stress testing evaluates system stability under heavy load.",
    supplementalKey: "testing_and_quality_assurance"
  }
];
