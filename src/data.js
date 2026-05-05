export const PHASES = [
  { id: 0, label: 'Phase 0', title: 'Shore up your stack',         color: '#7c6fe0', light: 'rgba(124,111,224,0.15)', border: 'rgba(124,111,224,0.35)' },
  { id: 1, label: 'Phase 1', title: 'Analytics upgrade',           color: '#1aaa82', light: 'rgba(26,170,130,0.14)',  border: 'rgba(26,170,130,0.35)'  },
  { id: 2, label: 'Phase 2', title: 'Data engineering',            color: '#e07c2a', light: 'rgba(224,124,42,0.14)',  border: 'rgba(224,124,42,0.35)'  },
  { id: 3, label: 'Phase 3', title: 'Specialize + build in public', color: '#c44ea8', light: 'rgba(196,78,168,0.14)',  border: 'rgba(196,78,168,0.35)'  },
]

export const DAYS_DATA = [
  { day: '1',     phase: 0, name: 'DAX — CALCULATE & FILTER',
    tasks: ['Watch SQLBI "Introducing DAX" first 3 videos (free on YouTube)', 'Open Power BI → blank .pbix → write your first CALCULATE measure', 'Build: Total Sales, Sales for Category A (filtered), Sales excl. returns', "Save .pbix to a new GitHub repo named 'dax-practice'"],
    resources: ['SQLBI.com', 'Guy in a Cube YouTube', 'Microsoft Learn DAX'] },

  { day: '2',     phase: 0, name: 'DAX — ALL, ALLEXCEPT, context transition',
    tasks: ['Understand row context vs filter context — the hardest DAX concept', 'Write measures using ALL() to remove filters, ALLEXCEPT() to keep one', 'Build: % of total sales per category (needs ALL on denominator)', 'Commit your .pbix with a descriptive message'],
    resources: ['SQLBI "Understanding Evaluation Contexts" article (free)'] },

  { day: '3',     phase: 0, name: 'DAX — Time intelligence',
    tasks: ['Create a proper Date table (mandatory for time intelligence to work)', 'Write: YTD sales, MTD sales, same period last year comparison', 'Functions: DATESYTD, SAMEPERIODLASTYEAR, DATESINPERIOD', 'Build a simple 3-page dashboard: Summary, Trend, YoY comparison'],
    resources: ['Power BI docs — Time intelligence functions'] },

  { day: '4',     phase: 0, name: 'Data modeling — star schema',
    tasks: ['Delete all existing relationships in your .pbix — rebuild from scratch', 'Create proper star schema: 1 fact table + 3 dimension tables', 'Fact: Sales transactions. Dims: Date, Product, Customer', 'Verify all relationships are 1-to-many, single direction'],
    resources: ['SQLBI "The Definitive Guide to DAX" sample chapters (free)'] },

  { day: '5',     phase: 0, name: 'Rebuild HR Analytics dashboard with proper DAX',
    tasks: ['Open your existing HR dashboard — identify all implicit measures', 'Replace every implicit measure with explicit DAX measures', 'Add: attrition rate %, headcount trend, gender diversity ratio', 'Add executive summary page with 4 KPI cards at the top', '🏁 Milestone: HR Dashboard v2 committed to GitHub'],
    resources: ['Your existing HR dashboard .pbix'] },

  { day: '6–7',   phase: 0, name: 'Consolidate + LinkedIn setup',
    tasks: ['Review all DAX measures you wrote — understand each one cold', 'Set up LinkedIn Creator mode if not already done', "Update LinkedIn headline: 'Power BI Developer | DAX | Data Analytics'", 'Screenshot your best dashboard visual — save for first LinkedIn post'],
    resources: ['LinkedIn Creator mode'] },

  { day: '8',     phase: 0, name: 'SQL — Window functions (Part 1)',
    tasks: ['Install DBeaver (free) — connect to a local SQLite or use Mode Analytics online', 'Practice: ROW_NUMBER(), RANK(), DENSE_RANK() — understand the difference', 'Write: rank employees by salary within department using PARTITION BY', 'Complete 5 LeetCode SQL Easy problems'],
    resources: ['mode.com/sql-tutorial', 'LeetCode SQL', 'DBeaver'] },

  { day: '9',     phase: 0, name: 'SQL — Window functions (Part 2)',
    tasks: ['Practice: LAG(), LEAD() — compare current row to previous/next row', 'Practice: NTILE() — split data into quartiles', 'Write: running total of sales, MoM growth % using LAG', 'Complete 5 LeetCode SQL Medium problems'],
    resources: ['LeetCode SQL', 'SQLZoo'] },

  { day: '10',    phase: 0, name: 'SQL — CTEs and subqueries',
    tasks: ['Learn WITH clause (CTE) — this is how professionals write complex SQL', 'Rewrite 3 nested subqueries as CTEs — notice how readable they become', 'Write: multi-step CTE finding top 3 customers per region per quarter', 'Complete 5 LeetCode SQL Medium problems'],
    resources: ['mode.com/sql-tutorial/sql-with'] },

  { day: '11',    phase: 0, name: 'Python setup + pandas basics',
    tasks: ['Install Anaconda (includes Jupyter, pandas, everything you need)', 'Open Jupyter Notebook — load a CSV with pd.read_csv()', 'Practice: filter rows, select columns, rename, sort, head/tail/describe', "Complete Kaggle 'Pandas' course — Day 1 and 2 (free, ~2 hrs)"],
    resources: ['Kaggle Pandas course (free)', 'pandas docs'] },

  { day: '12',    phase: 0, name: 'Python pandas — groupby, merge, pivot',
    tasks: ['groupby + agg: total sales by region, average salary by department', 'merge: join two DataFrames like SQL JOIN — inner, left, outer', 'pivot_table: replicate your best Excel pivot table in pandas', 'Replicate one of your Wipro MIS reports entirely in Python', '🏁 Milestone: MIS report replicated in Python — commit to GitHub'],
    resources: ['Kaggle Pandas course (free)', 'pandas docs'] },

  { day: '13–14', phase: 0, name: 'Mock interview prep + job applications',
    tasks: ['Practice 10 DAX interview questions out loud — explain your reasoning', 'Practice 10 SQL window function questions', 'Update resume: add GitHub link, reframe all automation with numbers', 'Apply to 10 Senior Analyst / BI Developer roles on Naukri + LinkedIn', '🏁 Milestone: Phase 0 complete. Interview-ready for BI/Analytics roles.'],
    resources: ['Glassdoor interview questions', 'Naukri.com', 'LinkedIn Jobs'] },

  { day: '15',    phase: 1, name: 'Statistics — distributions and what they mean',
    tasks: ["Watch StatQuest: 'Normal Distribution clearly explained' (15 min)", "Watch StatQuest: 'Histograms clearly explained' (10 min)", 'Load any CSV in Jupyter — plot a histogram, identify the distribution', 'Understand: mean vs median and when each is misleading'],
    resources: ['StatQuest YouTube (Josh Starmer)', 'Khan Academy Statistics'] },

  { day: '16',    phase: 1, name: 'Statistics — correlation and business interpretation',
    tasks: ["Watch StatQuest: 'Correlation clearly explained'", 'Understand why correlation ≠ causation with real business examples', 'Calculate correlation matrix in pandas: df.corr()', 'Write 3 sentences interpreting the correlation — practice stakeholder language'],
    resources: ['StatQuest YouTube'] },

  { day: '17',    phase: 1, name: 'Statistics — A/B testing basics',
    tasks: ["Watch StatQuest: 'p-values clearly explained'", 'Understand: null hypothesis, significance level, Type 1 vs Type 2 errors', 'Learn sample size calculation — why small samples are dangerous', "Read: 'How companies like Flipkart use A/B testing' (search LinkedIn)"],
    resources: ['StatQuest YouTube', 'Khan Academy'] },

  { day: '18',    phase: 1, name: 'Git — version control for data work',
    tasks: ['Install Git + create GitHub account if not already done', 'Learn: git init, add, commit, push, pull — takes 2 hours max', 'Create repo structure: /projects /sql /notebooks /dashboards', 'Commit all your Phase 0 work with proper descriptive messages'],
    resources: ['git-scm.com', 'GitHub Skills (free)'] },

  { day: '19',    phase: 1, name: 'Python viz — Plotly Express',
    tasks: ['pip install plotly — interactive charts in 5 lines of code', 'Build: bar chart, line chart, scatter plot, box plot with Plotly Express', 'Key advantage over Matplotlib: hover tooltips, zoom, filter built in', 'Compare same chart in Matplotlib vs Plotly — feel the difference'],
    resources: ['Plotly Express docs', 'plotly.com/python'] },

  { day: '20–21', phase: 1, name: 'Project selection + dataset exploration',
    tasks: ['Browse Kaggle datasets — pick one in HR, ops, or finance (your domain)', 'Download dataset, load in Jupyter, run initial EDA', "Frame a business question: 'Why is attrition high in Q3?' not 'analyze data'", 'Write the business question at the top of your notebook as a comment'],
    resources: ['Kaggle datasets', 'data.gov.in (Indian public data)'] },

  { day: '22–23', phase: 1, name: 'EDA — exploratory data analysis',
    tasks: ['Check: shape, dtypes, missing values, duplicates — fix all issues', 'Univariate analysis: distribution of each key variable', 'Bivariate analysis: how does each variable relate to your target?', 'Write 5 observations in markdown cells — practice business language'],
    resources: ['pandas-profiling library for automated EDA report'] },

  { day: '24–25', phase: 1, name: 'Seaborn for statistical visualization',
    tasks: ["pip install seaborn — statistical plots that Plotly doesn't do as well", 'Build: heatmap (correlation matrix), pairplot, violin plot, boxplot', 'Use heatmap to identify top 3 correlations in your project dataset', 'Label axes properly — imagine a non-technical manager reading this'],
    resources: ['Seaborn docs', 'seaborn.pydata.org/examples'] },

  { day: '26–27', phase: 1, name: 'Find 3 real insights in your dataset',
    tasks: ["An insight = observation + reason + business implication (3 sentences)", "Bad: 'Attrition is 23%'. Good: 'Attrition is 23% in Q3, driven by sales team (47%)'", 'Create a visualization for each insight — one chart per insight', 'Write a 300-word README explaining findings — this is your pitch deck', '🏁 Milestone: EDA notebook with 3 insights pushed to GitHub'],
    resources: ['Your GitHub repo README'] },

  { day: '28–30', phase: 1, name: 'Power BI dashboard on project dataset',
    tasks: ['Import your cleaned dataset from Python into Power BI', 'Page 1: Executive summary — 4 KPIs, trend line, top insight callout', 'Page 2: Deep dive — filters, slicers, drill-through', 'Page 3: Recommendations — text visual with your 3 insights', 'Use proper DAX measures — no implicit measures allowed now'],
    resources: ['Your .pbix from Phase 0 as a template'] },

  { day: '31–33', phase: 1, name: 'Polish and package the portfolio project',
    tasks: ['Jupyter notebook: clean all cells, add markdown headers, make it readable', 'Export notebook to HTML — add link in GitHub README', 'Export Power BI dashboard screenshots — add to README', 'README must have: problem, data source, method, 3 key findings, visuals', '🏁 Milestone: Complete portfolio project live on GitHub'],
    resources: ['GitHub README best practices'] },

  { day: '34–36', phase: 1, name: 'First LinkedIn post + visibility',
    tasks: ['Post format: Problem → What I tried → Finding → Lesson', 'Include screenshot of your best dashboard visual', 'Tag hashtags: #PowerBI #DataAnalytics #DAX #Python', 'Comment on 5 data posts per day — genuine, specific comments', 'Connect with 10 data professionals from target companies'],
    resources: ['LinkedIn Creator mode'] },

  { day: '37–42', phase: 1, name: 'Job applications + interview prep',
    tasks: ['Apply to 15 roles: Senior Data Analyst, Analytics Engineer, BI Developer', 'Prepare to walk through your portfolio project in 5 minutes', "Practice: 'Tell me about a time you reduced reporting time' — Wipro story", 'Practice 3 SQL window function questions on whiteboard (no IDE)', 'Mock interview: explain CALCULATE to a non-technical person', '🏁 Milestone: Phase 1 complete. Portfolio live. LinkedIn active.'],
    resources: ['Glassdoor interview questions', 'Naukri.com'] },

  { day: '43–45', phase: 2, name: 'Cloud setup — Google BigQuery',
    tasks: ['Create Google Cloud account — $300 free credit + BigQuery always-free tier', 'Upload a CSV dataset to BigQuery — feel the scale difference vs local SQL', 'Run window functions in BigQuery SQL — same syntax, cloud scale', 'Connect Power BI Desktop to BigQuery — your BI skill now talks to cloud', '🏁 Milestone: BigQuery connected to Power BI, Git workflow solid'],
    resources: ['cloud.google.com', 'Google Cloud Skills Boost (free)'] },

  { day: '46–49', phase: 2, name: 'Git advanced — branches and pull requests',
    tasks: ['Learn: git branch, checkout, merge — work on features without breaking main', 'Practice: create feature branch, make changes, merge back to main', 'Learn: .gitignore — never commit credentials or large data files', 'Set up SSH keys for GitHub — no more password prompts'],
    resources: ['GitHub Skills', 'Atlassian Git tutorial'] },

  { day: '50–52', phase: 2, name: 'dbt fundamentals — first model',
    tasks: ['pip install dbt-bigquery — connect dbt to your BigQuery project', 'Understand dbt model structure: sources → staging → marts', 'Create your first model: a staging SQL file that cleans raw data', 'Run dbt run — watch it create a table in BigQuery automatically'],
    resources: ['dbt Learn course (free at learn.getdbt.com)', 'dbt docs'] },

  { day: '53–56', phase: 2, name: 'dbt — tests, documentation, Jinja',
    tasks: ['Add dbt tests: not_null, unique, accepted_values on your models', 'Run dbt test — see which data quality issues surface automatically', 'Write dbt docs: add descriptions to all models and columns', 'Run dbt docs generate + dbt docs serve — see auto-generated data catalog', 'Learn basic Jinja in dbt: ref(), source(), variables'],
    resources: ['dbt Learn', 'dbt Slack community'] },

  { day: '57–63', phase: 2, name: 'Build a complete dbt project',
    tasks: ['Choose a dataset with 3+ tables — e.g. sales orders + customers + products', 'Build full dbt lineage: raw → staging (clean) → marts (business logic)', 'Add at least 5 dbt tests across your models', 'Connect your mart table to Power BI — show the full stack', 'Commit entire dbt project to GitHub with proper README', '🏁 Milestone: dbt project on GitHub — Analytics Engineer portfolio piece'],
    resources: ['dbt Learn', 'GitHub'] },

  { day: '64–67', phase: 2, name: 'Python for data pipelines — requests + ingestion',
    tasks: ['Learn: requests library — fetch data from a public API in Python', 'Try: OpenWeatherMap API or any free public API', 'Write a script: fetch data → clean with pandas → save to CSV', 'Understand: what an ETL pipeline actually is (Extract, Transform, Load)'],
    resources: ['requests docs', 'public-apis.io (list of free APIs)'] },

  { day: '68–70', phase: 2, name: 'Prefect — orchestration',
    tasks: ['pip install prefect — free cloud tier available', 'Convert your API script into a Prefect flow with @flow and @task decorators', 'Schedule it to run daily — feel the difference from a cron job', 'Add error handling: what happens if the API is down?'],
    resources: ['Prefect docs', 'Prefect Cloud free tier'] },

  { day: '71–77', phase: 2, name: 'Capstone pipeline project',
    tasks: ['Build end-to-end: API/CSV → Python (Prefect) → BigQuery → dbt → Power BI', 'India-relevant ideas: IPL stats, NSE stock data, Indian weather, Zomato reviews', 'Architecture diagram: draw the data flow in draw.io or Excalidraw', 'README: problem, architecture, tools used, how to run it', '🏁 Milestone: Full pipeline on GitHub. Ready for DE/Analytics Engineer interviews.'],
    resources: ['draw.io', 'Excalidraw', 'Kaggle'] },

  { day: '78–84', phase: 2, name: 'Snowflake basics',
    tasks: ['Create Snowflake free trial account (30 days)', 'Load data, run queries — compare to BigQuery syntax (mostly same)', 'Connect dbt to Snowflake — practice switching warehouses', 'Snowflake-specific: virtual warehouses, time travel, zero-copy cloning'],
    resources: ['Snowflake free trial', 'Snowflake University (free)'] },

  { day: '85–91', phase: 2, name: 'SQL advanced — performance and optimization',
    tasks: ['Learn: EXPLAIN ANALYZE — understand query execution plans', 'Understand: when to use indexes, partitioning, clustering', 'Practice: optimize a slow query — reduce scan size with partitioning', 'Complete 10 LeetCode SQL Hard problems'],
    resources: ['PostgreSQL docs on EXPLAIN', 'LeetCode SQL'] },

  { day: '92–98', phase: 2, name: 'Aggressive job search + portfolio review',
    tasks: ['Review all 3 portfolio projects — upgrade the weakest one', 'Apply to 20 Analytics Engineer / Data Engineer roles', "Prepare system design answer: 'Design a reporting pipeline for 10M rows/day'", 'Practice walking through your full pipeline project in 10 minutes', 'Reach out to 5 data professionals at target companies on LinkedIn', '🏁 Milestone: Phase 2 complete. 3 portfolio projects. Full DE stack mastered.'],
    resources: ['LinkedIn', 'Naukri', 'AngelList (startups)'] },

  { day: '99–105',  phase: 3, name: 'Nail your niche — HR analytics',
    tasks: ['Study: people analytics, workforce planning, compensation benchmarking', 'Find 5 India-based companies hiring for HR analytics / people analytics', 'Build: attrition prediction model + Power BI dashboard combo', 'This rare combination (ML + BI) almost no BI dev can demonstrate'],
    resources: ['LinkedIn People Analytics group', 'SHRM research'] },

  { day: '106–112', phase: 3, name: 'ML basics — scikit-learn',
    tasks: ['pip install scikit-learn — the standard Python ML library', 'Learn: train/test split, cross-validation, why it matters', 'Build logistic regression model: predict attrition (0/1) on HR dataset', 'Evaluate: confusion matrix, precision, recall — not just accuracy', 'Feature importance: which factors drive attrition? This is the business insight.'],
    resources: ['Kaggle ML course (free)', 'scikit-learn docs'] },

  { day: '113–120', phase: 3, name: 'LinkedIn content — 4 posts this month',
    tasks: ['Post 1: Your biggest automation win at Wipro — with the numbers', 'Post 2: One DAX technique you wish you had known earlier', 'Post 3: What dbt taught you about SQL you did not know before', 'Post 4: Screenshot of your attrition model + dashboard combined', 'Engage: 10 genuine comments per day on data posts'],
    resources: ['LinkedIn Creator mode'] },

  { day: '121–135', phase: 3, name: 'Freelance — first client',
    tasks: ['Create Upwork profile: "Power BI + dbt Analytics Engineer — 7yrs automation"', 'Take first 2 projects at ₹1,500/hr to build reviews (raise rate after)', 'Reach out locally: CA firms, SMEs in Kolkata often need BI dashboards', 'Deliverable template: discovery call → proposal → delivery → review request', '🏁 Milestone: End of Month 5: First freelance client delivered.'],
    resources: ['Upwork', 'Toptal', 'LinkedIn Services marketplace'] },

  { day: '136–150', phase: 3, name: 'Advanced dbt + data quality',
    tasks: ['dbt macros: write reusable SQL logic — the equivalent of VBA functions', 'dbt packages: install dbt_utils, dbt_expectations for advanced testing', 'Learn: data observability concepts — monitoring pipelines in production', 'Study: slowly changing dimensions (SCD Type 1, 2) — common interview topic'],
    resources: ['dbt docs', 'dbt Hub (packages)', 'dbt Slack'] },

  { day: '151–160', phase: 3, name: 'Certifications',
    tasks: ['PL-300 Power BI certification — if target companies require it (2 weeks prep)', 'dbt Fundamentals certification — free, takes 1 day, adds credibility', 'Google Data Analytics certificate — recognized by MNCs in India', 'Note: certifications support your story, projects ARE your story'],
    resources: ['Microsoft Learn', 'learn.getdbt.com', 'Coursera'] },

  { day: '161–170', phase: 3, name: 'Consolidate portfolio — final polish',
    tasks: ['GitHub profile README: summary of who you are + link all 3 projects', 'Project 1 (HR Analytics): Python EDA + Power BI + ML attrition model', 'Project 2 (dbt): full dbt project with tests + docs on BigQuery', 'Project 3 (Pipeline): end-to-end pipeline with Prefect + dbt + dashboard', 'All READMEs: problem, method, result, architecture, how to run'],
    resources: ['GitHub Profile README guide'] },

  { day: '171–180', phase: 3, name: 'Top 1% positioning — final push',
    tasks: ['Apply to remote-first companies (your skill set is now globally competitive)', 'Target consulting rate: ₹3,000–4,000/hr for BI + DE combined work', 'Mentor 1 junior analyst on LinkedIn — teaching solidifies your expertise', "Write a short 'what I learned' post — 6 months, public, honest", '🏁 You are no longer a candidate. You are the person companies call.'],
    resources: ['LinkedIn', 'Toptal', 'Remote.co'] },
]