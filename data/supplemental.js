/**
 * ============================================================================
 * D492 COMPTIA DATA+ (DA0-002) - WHO WANTS TO BE A MILLIONAIRE
 * DECENTRALIZED SUPPLEMENTAL STUDY CARDS (data/supplemental.js)
 * ============================================================================
 * Powers the expandable "+ Deep Dive / Exam Clue" accordion after a student
 * answers a question. Keyed by `supplementalKey` from data/questions.js.
 *
 * When adding material from the instructor's supplemental PowerPoint, simply
 * edit the `examTip`, `comparisonRows`, or `keyTakeaways` in the matching key!
 */

window.SUPPLEMENTAL_NOTES = {
  // --------------------------------------------------------------------------
  // DOMAIN 1: DATA CONCEPTS & ENVIRONMENTS
  // --------------------------------------------------------------------------
  repositories_dw_vs_dl: {
    title: "Data Repositories: Warehouse vs. Lake vs. Mart",
    examTip: "Look for two clue words in the scenario: 'Structure' and 'Scope'. Structured + Enterprise-wide = Data Warehouse. Raw/Unstructured (JSON, audio, images) = Data Lake. Single Department Subset = Data Mart.",
    comparisonHeaders: ["Repository", "Data Format", "Schema Timing", "Primary Use Case"],
    comparisonRows: [
      ["Data Warehouse", "Structured tables", "Schema-on-Write", "Cross-department historical BI & reporting"],
      ["Data Lake", "Raw (JSON, CSV, audio, images)", "Schema-on-Read", "Data science, ML, unmodeled raw storage"],
      ["Data Mart", "Curated structured subset", "Schema-on-Write", "Single business unit (e.g., Sales or Finance)"]
    ]
  },

  oltp_vs_olap: {
    title: "Workload Comparison: OLTP vs. OLAP",
    examTip: "If the prompt mentions fast inserts, updates, live order entry, or day-to-day operations, pick OLTP. If it mentions multi-year trends, aggregations, or read-heavy historical reporting, pick OLAP.",
    comparisonHeaders: ["Feature", "OLTP (Transactional)", "OLAP (Analytical)"],
    comparisonRows: [
      ["Core Purpose", "Run live day-to-day business transactions", "Analyze historical trends & support decisions"],
      ["Typical Operations", "Frequent INSERT, UPDATE, DELETE", "Complex SELECT with aggregations & joins"],
      ["Schema Design", "Highly normalized (3NF) to prevent anomalies", "Denormalized dimensional (Star/Snowflake)"]
    ]
  },

  data_types_classification: {
    title: "Variable Classification: Categorical vs. Quantitative",
    examTip: "Watch out for 'numeric-looking labels'! ZIP codes, phone numbers, and ID badges use digits, but you cannot meaningfully calculate an 'average ZIP code'—making them Nominal Categorical identifiers.",
    comparisonHeaders: ["Category", "Sub-Type", "Definition", "DA0-002 Examples"],
    comparisonRows: [
      ["Categorical (Qualitative)", "Nominal", "Unordered labels or names", "ZIP codes, Department, Eye color"],
      ["Categorical (Qualitative)", "Ordinal", "Categories with a natural rank order", "Satisfaction (Low/Med/High), T-shirt size"],
      ["Quantitative (Numeric)", "Discrete", "Countable whole integers (no fractions)", "Daily support tickets, Number of children"],
      ["Quantitative (Numeric)", "Continuous", "Measurable on a scale with fractions", "Revenue, Weight, Processing time"]
    ]
  },

  cloud_infrastructure_models: {
    title: "Infrastructure Deployment Models",
    examTip: "Whenever an organization splits workloads between a public cloud provider (AWS/Azure/GCP) and its own local on-premises servers (usually for compliance or sensitive PII), it is a Hybrid model.",
    keyTakeaways: [
      "On-Premises: Hardware and data reside entirely inside the organization's private datacenter.",
      "Public Cloud: Infrastructure is hosted off-site and shared across multiple tenants by a cloud provider.",
      "Private Cloud: Cloud infrastructure dedicated exclusively to a single organization.",
      "Hybrid Cloud: Combines public cloud scalability with on-premises or private cloud control for sensitive databases."
    ]
  },

  dimensional_modeling_star: {
    title: "Dimensional Modeling: Fact vs. Dimension Tables",
    examTip: "Fact tables hold the 'Numbers & Foreign Keys' (metrics you sum or average, like Quantity and Revenue). Dimension tables hold the 'Who, What, Where, and When' (descriptive text attributes used for filtering and grouping).",
    comparisonHeaders: ["Table Type", "Contents", "Row Granularity", "Examples"],
    comparisonRows: [
      ["Fact Table", "Quantitative metrics + Foreign keys", "One row per business event/transaction", "FactSales (SaleID, DateKey, CustKey, Revenue, Qty)"],
      ["Dimension Table", "Descriptive attributes (text/categories)", "One row per unique entity", "DimCustomer, DimProduct, DimDate"]
    ]
  },

  dbms_and_sql_tools: {
    title: "Database Management Systems (DBMS)",
    examTip: "A DBMS (such as PostgreSQL, MySQL, Oracle, or SQL Server) is the software engine that enforces relational schemas, manages user concurrency, and executes SQL queries.",
    keyTakeaways: [
      "RDBMS platforms manage structured relational tables linked by primary and foreign keys.",
      "SQL (Structured Query Language) is the standard language used within a DBMS to define (DDL), manipulate (DML), and query (DQL) relational data."
    ]
  },

  // --------------------------------------------------------------------------
  // DOMAIN 2: DATA ACQUISITION & PREPARATION
  // --------------------------------------------------------------------------
  joins_vs_blending_appending: {
    title: "Combining Data: Joining vs. Appending",
    examTip: "Joining adds columns horizontally by matching a shared key (like CustomerID). Appending (or UNION) stacks rows vertically from tables that have the exact same columns.",
    comparisonHeaders: ["Operation", "Direction", "Requirement", "Result"],
    comparisonRows: [
      ["Join", "Horizontal (adds columns)", "Shared key column (e.g., CustomerID)", "Enriches customer rows with order details"],
      ["Append / UNION", "Vertical (stacks rows)", "Matching column structure & data types", "Combines Q1 orders table with Q2 orders table"]
    ]
  },

  etl_vs_elt: {
    title: "Data Pipelines: ETL vs. ELT",
    examTip: "Look at WHERE and WHEN the transformation happens: if data is cleaned/transformed *before* loading into the target warehouse, choose ETL. If raw data is loaded *first* and transformed *inside* the cloud destination, choose ELT.",
    comparisonHeaders: ["Pipeline", "Sequence", "Where Transformation Occurs", "Best Environment"],
    comparisonRows: [
      ["ETL", "Extract -> Transform -> Load", "In a separate staging server before loading", "Traditional data warehouses & strict compliance"],
      ["ELT", "Extract -> Load -> Transform", "Inside the destination cloud platform after loading", "Modern cloud data warehouses & data lakes"]
    ]
  },

  data_cleaning_missing_outliers: {
    title: "Data Quality: Duplication, Missing Values & Outliers",
    examTip: "On CompTIA Data+, NEVER immediately delete rows or blindly overwrite blanks/outliers with the mean! Always profile, investigate the root cause, and validate against source business rules first.",
    keyTakeaways: [
      "Duplication: Repeated identical records (often from multiple imports) that inflate counts and sums; fixed via deduplication.",
      "Missing Values (Blanks/NULLs): First investigate *why* values are missing before choosing imputation, exclusion, or keeping NULL.",
      "Implausible Outliers (e.g., Age = 245): Flag as an invalid entry and validate against source system rules before correcting or excluding."
    ]
  },

  data_transformation_scaling_binning: {
    title: "Data Transformations: Type Conversion, Scaling & Binning",
    examTip: "Type Conversion fixes format representation (text string '1/12/2026' -> ISO Date). Scaling aligns numeric units ($vs.$ in thousands). Binning groups continuous numbers into labeled buckets (18–24, 25–34).",
    comparisonHeaders: ["Technique", "What It Does", "Scenario Clue"],
    comparisonRows: [
      ["Data Type Conversion", "Casts values from one data type to another", "Converting date strings into sortable DATE objects"],
      ["Scaling", "Adjusts numeric magnitudes onto a comparable scale", "Comparing salaries in $ with expenses in $1,000s"],
      ["Binning (Bucketing)", "Groups continuous numbers into discrete ranges", "Grouping ages into 18–24, 25–34, 35–44, 45+"]
    ]
  },

  sampling_methods: {
    title: "Statistical Sampling Methods",
    examTip: "Every k-th record (e.g., every 20th customer on an ordered list) is ALWAYS Systematic Sampling.",
    comparisonHeaders: ["Sampling Method", "Selection Rule", "Exam Clue"],
    comparisonRows: [
      ["Systematic", "Selects every k-th item from an ordered list", "'Every 20th customer on an ordered list'"],
      ["Simple Random", "Every member has an equal, purely random chance", "'Random number generator picks 100 IDs'"],
      ["Stratified", "Divides population into subgroups, then samples each proportionally", "'Sample 10% from each age bracket'"],
      ["Cluster", "Randomly selects entire pre-existing groups/locations", "'Survey all customers at 3 randomly chosen stores'"]
    ]
  },

  query_optimization_indexing: {
    title: "Query Performance: Indexing & Filtering",
    examTip: "Slow lookups on a large table's WHERE or JOIN column? Add an Index. Dashboard or query pulling too many rows? Filter (subset) the data early.",
    keyTakeaways: [
      "Database Index: Creates a fast lookup pointer on frequently searched columns (like CustomerID), avoiding full table scans.",
      "Filtering (WHERE clause): Reduces row volume returned over the network by including only records that match specific criteria (e.g., year = 2026)."
    ]
  },

  // --------------------------------------------------------------------------
  // DOMAIN 3: DATA ANALYSIS
  // --------------------------------------------------------------------------
  four_types_of_analytics: {
    title: "The Four Tiers of Data Analytics",
    examTip: "Match the verb/question in the scenario directly to the tier: Summarize past = Descriptive; Investigate root cause = Diagnostic; Estimate/Forecast future = Predictive; Recommend best action = Prescriptive.",
    comparisonHeaders: ["Analytics Tier", "Core Question Answered", "Scenario Keyword Clues"],
    comparisonRows: [
      ["1. Descriptive", "What happened?", "Summarizes last quarter's revenue change, historical KPIs"],
      ["2. Diagnostic", "Why did it happen?", "Investigates whether price or supply caused a decline"],
      ["3. Predictive", "What is likely to happen next?", "Estimates next month's customer churn from historical patterns"],
      ["4. Prescriptive", "What action should we take?", "Compares discount strategies and recommends the profit maximizer"]
    ]
  },

  descriptive_stats_center_spread: {
    title: "Measures of Center vs. Measures of Dispersion",
    examTip: "Outliers pull the Mean toward the extreme value, making the Median the best measure of center for skewed data. Standard Deviation measures spread around the mean.",
    comparisonHeaders: ["Metric", "Category", "Formula / Rule", "Outlier Sensitivity"],
    comparisonRows: [
      ["Mean (Average)", "Measure of Center", "Sum of values / Count of values", "Highly sensitive (skewed by extreme values)"],
      ["Median", "Measure of Center", "Middle value of an ordered list (or avg of middle 2)", "Resistant / robust against extreme outliers"],
      ["Mode", "Measure of Center", "Most frequently occurring value", "Not affected by extreme tails"],
      ["Standard Deviation", "Measure of Spread", "Typical distance of data points around the mean", "Sensitive to outliers (uses squared deviations)"]
    ]
  },

  z_scores_and_percent_change: {
    title: "Z-Scores & Percentage Change Formulas",
    examTip: "For Percentage Change, ALWAYS divide the difference by the ORIGINAL starting value—never the new ending value! For Z-scores, the sign (+/-) tells you above or below the mean in standard deviation units.",
    keyTakeaways: [
      "Z-Score Formula: z = (Value - Mean) / Standard Deviation. A z-score of +2 means the value sits exactly 2 standard deviations ABOVE the mean.",
      "Percentage Change Formula: ((New - Original) / Original) × 100. From $80,000 to $100,000 is ($20,000 / $80,000) × 100 = +25%."
    ]
  },

  hypothesis_testing_pvalues_errors: {
    title: "Hypothesis Testing: p-values, Type I & Type II Errors",
    examTip: "Memory trick: 'If the p-value is low (p <= alpha), the null must go (Reject H0)!' Type I Error = False Positive (Rejecting a true null). Type II Error = False Negative (Failing to reject a false null).",
    comparisonHeaders: ["Concept", "Statistical Meaning", "Everyday Analogy"],
    comparisonRows: [
      ["p-value <= alpha (0.03 <= 0.05)", "Statistically significant -> Reject Null (H0)", "Strong evidence against the default assumption"],
      ["Type I Error (Alpha / False Positive)", "Rejecting a TRUE null hypothesis", "Fire alarm rings when there is NO fire"],
      ["Type II Error (Beta / False Negative)", "Failing to reject a FALSE null hypothesis", "Fire alarm stays silent when there IS a real fire"]
    ]
  },

  sql_aggregates_and_grouping: {
    title: "SQL Aggregations: GROUP BY & COUNT(*) vs. COUNT(column)",
    examTip: "Use GROUP BY whenever a question asks for an aggregate 'by department' or 'for each category'. Remember that COUNT(*) counts every physical row including NULLs, while COUNT(col) skips NULLs.",
    comparisonHeaders: ["SQL Element", "Behavior", "NULL Handling"],
    comparisonRows: [
      ["GROUP BY dept", "Buckets rows by category before calculating AVG/SUM/COUNT", "Treats NULL as its own group bucket"],
      ["COUNT(*)", "Counts total physical rows in the table/group", "INCLUDES rows with NULL columns"],
      ["COUNT(column_name)", "Counts non-empty values in that specific column", "IGNORES (skips) NULL values"]
    ]
  },

  // --------------------------------------------------------------------------
  // DOMAIN 4: VISUALIZATION & REPORTING
  // --------------------------------------------------------------------------
  chart_selection_guide: {
    title: "CompTIA Data+ Chart Selection Matrix",
    examTip: "Distinguish Bar Chart vs. Histogram carefully: Bar Charts compare discrete categories (5 sales regions), whereas Histograms display the frequency distribution of continuous numeric ranges/bins (product weight ranges).",
    comparisonHeaders: ["Chart Type", "Best Analytical Use Case", "Scenario Clue from Deck"],
    comparisonRows: [
      ["Line Chart", "Trends over continuous time periods", "Monthly revenue over the last 3 years"],
      ["Bar / Column Chart", "Comparing totals across discrete categories", "Comparing total sales across 5 regions"],
      ["Scatter Plot", "Relationship / correlation between 2 numeric variables", "Advertising spend ($) vs. Sales revenue ($)"],
      ["Histogram", "Frequency distribution across numeric intervals (bins)", "How many product weights fall into each range"],
      ["Waterfall Chart", "Sequential positive/negative changes from start to end", "How revenue is reduced by expenses to reach net profit"],
      ["Gantt Chart", "Project schedule, task start dates, durations & overlaps", "Displaying project tasks, durations & overlapping activities"]
    ]
  },

  dashboard_design_and_delivery: {
    title: "Dashboard Design, Troubleshooting & Delivery",
    examTip: "Executive dashboards should highlight a small set of clearly labeled KPIs without 3D clutter. If a filter doesn't update totals, check filter logic/data bindings first. If refresh is slow, filter out unnecessary rows.",
    keyTakeaways: [
      "Executive Design: Keep it concise—surface top KPIs with clear labels and context; avoid 3D chart junk.",
      "Broken Filter Troubleshooting: Always validate the filter logic and its underlying relationship/connection to the data model first.",
      "Slow Refresh Optimization: Filter or subset the query/dataset so the report stops pulling millions of unnecessary historical rows.",
      "Interactive Delivery: Use a Dynamic Dashboard when users need on-demand self-service filtering (vs. static PDF snapshots)."
    ]
  },

  // --------------------------------------------------------------------------
  // DOMAIN 5: DATA GOVERNANCE
  // --------------------------------------------------------------------------
  governance_lineage_dictionary: {
    title: "Metadata & Governance: Data Lineage vs. Data Dictionary",
    examTip: "Data Lineage = the 'life story / pipeline journey' of a field (origin -> transformations -> report). Data Dictionary = the 'reference glossary' of field names, formats, and permitted values.",
    comparisonHeaders: ["Artifact", "Core Question Answered", "Governance Purpose"],
    comparisonRows: [
      ["Data Lineage", "Where did this field come from and how was it transformed?", "Tracks origin, ETL hops, and transformations to the final report"],
      ["Data Dictionary", "What does this column mean and what values are allowed?", "Standardizes stakeholder understanding of field definitions & formats"]
    ]
  },

  data_privacy_security_controls: {
    title: "Data Privacy & Security: PII, Masking, RBAC & Encryption",
    examTip: "Stored on disk = Encryption at Rest. Moving over a network = Encryption in Transit. Replacing names with random tokens = Masking/Pseudonymization. Access based on job duties = RBAC.",
    comparisonHeaders: ["Security Concept", "Definition / Mechanism", "Scenario Clue"],
    comparisonRows: [
      ["PII", "Data that directly or indirectly identifies a person", "Names, email addresses, government ID numbers"],
      ["Masking / Tokenization", "Obscures or replaces sensitive identifiers with tokens", "Replacing customer names with random tokens for analysts"],
      ["RBAC", "Grants least-privilege access based on job role", "Accessing customer records only when job responsibilities require it"],
      ["Encryption at Rest", "Encrypts stationary data stored on physical media", "Encrypting customer records while stored on disk"]
    ]
  },

  testing_and_quality_assurance: {
    title: "Report Testing & Quality Assurance (UAT)",
    examTip: "When representative business users test a report to verify it meets their functional day-to-day needs before deployment, that is always User Acceptance Testing (UAT).",
    keyTakeaways: [
      "Unit Testing: Performed by developers to verify isolated code expressions or calculations.",
      "Stress / Load Testing: Evaluates database and dashboard responsiveness under heavy concurrent user traffic.",
      "User Acceptance Testing (UAT): Performed by representative business stakeholders to sign off that the report meets business requirements before release."
    ]
  }
};
