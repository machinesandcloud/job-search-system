export interface SalaryRange {
  p25: number;
  median: number;
  p75: number;
}

export interface RoleSalaries {
  junior: SalaryRange;
  mid: SalaryRange;
  senior: SalaryRange;
  staff: SalaryRange;
  totalCompMultiplier: number; // equity+bonus as % of base at senior level
}

export interface CityInfo {
  displayName: string;
  stateOrCountry: string;
  multiplier: number; // relative to national median
  currency: string;
  currencySymbol: string;
  techHubNotes: string;
}

export interface SalaryPageDef {
  slug: string;
  roleKey: string;
  cityKey: string;
}

// Base salaries in USD (national median baseline)
export const ROLE_SALARIES: Record<string, RoleSalaries & { displayName: string; shortName: string }> = {
  "software-engineer": {
    displayName: "Software Engineer",
    shortName: "SWE",
    junior:  { p25: 88_000,  median: 102_000, p75: 118_000 },
    mid:     { p25: 120_000, median: 140_000, p75: 162_000 },
    senior:  { p25: 155_000, median: 180_000, p75: 210_000 },
    staff:   { p25: 195_000, median: 230_000, p75: 275_000 },
    totalCompMultiplier: 1.45,
  },
  "frontend-developer": {
    displayName: "Frontend Developer",
    shortName: "Frontend",
    junior:  { p25: 82_000,  median: 96_000,  p75: 112_000 },
    mid:     { p25: 112_000, median: 132_000, p75: 152_000 },
    senior:  { p25: 145_000, median: 170_000, p75: 198_000 },
    staff:   { p25: 180_000, median: 215_000, p75: 260_000 },
    totalCompMultiplier: 1.40,
  },
  "backend-developer": {
    displayName: "Backend Developer",
    shortName: "Backend",
    junior:  { p25: 85_000,  median: 100_000, p75: 116_000 },
    mid:     { p25: 115_000, median: 136_000, p75: 158_000 },
    senior:  { p25: 150_000, median: 175_000, p75: 205_000 },
    staff:   { p25: 188_000, median: 225_000, p75: 268_000 },
    totalCompMultiplier: 1.42,
  },
  "full-stack-developer": {
    displayName: "Full Stack Developer",
    shortName: "Full Stack",
    junior:  { p25: 82_000,  median: 97_000,  p75: 113_000 },
    mid:     { p25: 114_000, median: 134_000, p75: 155_000 },
    senior:  { p25: 148_000, median: 172_000, p75: 200_000 },
    staff:   { p25: 185_000, median: 220_000, p75: 262_000 },
    totalCompMultiplier: 1.40,
  },
  "product-manager": {
    displayName: "Product Manager",
    shortName: "PM",
    junior:  { p25: 92_000,  median: 110_000, p75: 128_000 },
    mid:     { p25: 128_000, median: 152_000, p75: 176_000 },
    senior:  { p25: 162_000, median: 192_000, p75: 225_000 },
    staff:   { p25: 205_000, median: 248_000, p75: 295_000 },
    totalCompMultiplier: 1.50,
  },
  "data-scientist": {
    displayName: "Data Scientist",
    shortName: "Data Scientist",
    junior:  { p25: 88_000,  median: 105_000, p75: 122_000 },
    mid:     { p25: 115_000, median: 138_000, p75: 160_000 },
    senior:  { p25: 150_000, median: 178_000, p75: 210_000 },
    staff:   { p25: 192_000, median: 232_000, p75: 278_000 },
    totalCompMultiplier: 1.45,
  },
  "data-engineer": {
    displayName: "Data Engineer",
    shortName: "Data Engineer",
    junior:  { p25: 86_000,  median: 102_000, p75: 118_000 },
    mid:     { p25: 115_000, median: 136_000, p75: 158_000 },
    senior:  { p25: 148_000, median: 175_000, p75: 205_000 },
    staff:   { p25: 188_000, median: 225_000, p75: 268_000 },
    totalCompMultiplier: 1.43,
  },
  "machine-learning-engineer": {
    displayName: "Machine Learning Engineer",
    shortName: "ML Engineer",
    junior:  { p25: 95_000,  median: 115_000, p75: 135_000 },
    mid:     { p25: 132_000, median: 158_000, p75: 185_000 },
    senior:  { p25: 170_000, median: 205_000, p75: 245_000 },
    staff:   { p25: 220_000, median: 268_000, p75: 320_000 },
    totalCompMultiplier: 1.55,
  },
  "ai-engineer": {
    displayName: "AI Engineer",
    shortName: "AI Engineer",
    junior:  { p25: 98_000,  median: 120_000, p75: 142_000 },
    mid:     { p25: 138_000, median: 165_000, p75: 195_000 },
    senior:  { p25: 178_000, median: 215_000, p75: 258_000 },
    staff:   { p25: 230_000, median: 280_000, p75: 335_000 },
    totalCompMultiplier: 1.60,
  },
  "ios-developer": {
    displayName: "iOS Developer",
    shortName: "iOS Dev",
    junior:  { p25: 85_000,  median: 100_000, p75: 115_000 },
    mid:     { p25: 115_000, median: 135_000, p75: 155_000 },
    senior:  { p25: 148_000, median: 173_000, p75: 202_000 },
    staff:   { p25: 185_000, median: 220_000, p75: 262_000 },
    totalCompMultiplier: 1.40,
  },
  "android-developer": {
    displayName: "Android Developer",
    shortName: "Android Dev",
    junior:  { p25: 84_000,  median: 99_000,  p75: 114_000 },
    mid:     { p25: 112_000, median: 133_000, p75: 153_000 },
    senior:  { p25: 145_000, median: 170_000, p75: 198_000 },
    staff:   { p25: 182_000, median: 217_000, p75: 258_000 },
    totalCompMultiplier: 1.40,
  },
  "devops-engineer": {
    displayName: "DevOps Engineer",
    shortName: "DevOps",
    junior:  { p25: 85_000,  median: 100_000, p75: 116_000 },
    mid:     { p25: 115_000, median: 136_000, p75: 158_000 },
    senior:  { p25: 148_000, median: 174_000, p75: 204_000 },
    staff:   { p25: 186_000, median: 222_000, p75: 265_000 },
    totalCompMultiplier: 1.40,
  },
  "site-reliability-engineer": {
    displayName: "Site Reliability Engineer",
    shortName: "SRE",
    junior:  { p25: 88_000,  median: 104_000, p75: 120_000 },
    mid:     { p25: 120_000, median: 142_000, p75: 165_000 },
    senior:  { p25: 155_000, median: 183_000, p75: 215_000 },
    staff:   { p25: 198_000, median: 238_000, p75: 285_000 },
    totalCompMultiplier: 1.45,
  },
  "cloud-engineer": {
    displayName: "Cloud Engineer",
    shortName: "Cloud Engineer",
    junior:  { p25: 84_000,  median: 99_000,  p75: 115_000 },
    mid:     { p25: 112_000, median: 133_000, p75: 154_000 },
    senior:  { p25: 145_000, median: 170_000, p75: 198_000 },
    staff:   { p25: 182_000, median: 217_000, p75: 258_000 },
    totalCompMultiplier: 1.40,
  },
  "cybersecurity-engineer": {
    displayName: "Cybersecurity Engineer",
    shortName: "Security Engineer",
    junior:  { p25: 86_000,  median: 102_000, p75: 118_000 },
    mid:     { p25: 116_000, median: 138_000, p75: 160_000 },
    senior:  { p25: 150_000, median: 178_000, p75: 210_000 },
    staff:   { p25: 192_000, median: 232_000, p75: 278_000 },
    totalCompMultiplier: 1.42,
  },
  "engineering-manager": {
    displayName: "Engineering Manager",
    shortName: "EM",
    junior:  { p25: 140_000, median: 162_000, p75: 188_000 },
    mid:     { p25: 168_000, median: 198_000, p75: 232_000 },
    senior:  { p25: 205_000, median: 248_000, p75: 295_000 },
    staff:   { p25: 255_000, median: 308_000, p75: 370_000 },
    totalCompMultiplier: 1.55,
  },
  "product-designer": {
    displayName: "Product Designer",
    shortName: "Product Designer",
    junior:  { p25: 78_000,  median: 92_000,  p75: 108_000 },
    mid:     { p25: 108_000, median: 128_000, p75: 148_000 },
    senior:  { p25: 138_000, median: 162_000, p75: 190_000 },
    staff:   { p25: 172_000, median: 205_000, p75: 245_000 },
    totalCompMultiplier: 1.38,
  },
  "data-analyst": {
    displayName: "Data Analyst",
    shortName: "Data Analyst",
    junior:  { p25: 68_000,  median: 80_000,  p75: 94_000  },
    mid:     { p25: 88_000,  median: 105_000, p75: 122_000 },
    senior:  { p25: 112_000, median: 132_000, p75: 155_000 },
    staff:   { p25: 140_000, median: 168_000, p75: 200_000 },
    totalCompMultiplier: 1.28,
  },
  "business-analyst": {
    displayName: "Business Analyst",
    shortName: "BA",
    junior:  { p25: 65_000,  median: 78_000,  p75: 92_000  },
    mid:     { p25: 85_000,  median: 100_000, p75: 116_000 },
    senior:  { p25: 108_000, median: 128_000, p75: 150_000 },
    staff:   { p25: 135_000, median: 162_000, p75: 192_000 },
    totalCompMultiplier: 1.22,
  },
  "technical-program-manager": {
    displayName: "Technical Program Manager",
    shortName: "TPM",
    junior:  { p25: 110_000, median: 130_000, p75: 152_000 },
    mid:     { p25: 140_000, median: 165_000, p75: 192_000 },
    senior:  { p25: 170_000, median: 202_000, p75: 238_000 },
    staff:   { p25: 212_000, median: 252_000, p75: 300_000 },
    totalCompMultiplier: 1.48,
  },
  "scrum-master": {
    displayName: "Scrum Master",
    shortName: "Scrum Master",
    junior:  { p25: 72_000,  median: 86_000,  p75: 100_000 },
    mid:     { p25: 92_000,  median: 110_000, p75: 128_000 },
    senior:  { p25: 115_000, median: 138_000, p75: 162_000 },
    staff:   { p25: 145_000, median: 175_000, p75: 208_000 },
    totalCompMultiplier: 1.18,
  },
};

export const CITIES: Record<string, CityInfo> = {
  "san-francisco": {
    displayName: "San Francisco",
    stateOrCountry: "CA",
    multiplier: 1.48,
    currency: "USD",
    currencySymbol: "$",
    techHubNotes: "San Francisco and the broader Bay Area remain the highest-paying tech market globally. FAANG and AI lab density drives salaries 40–50% above national median.",
  },
  "new-york-city": {
    displayName: "New York City",
    stateOrCountry: "NY",
    multiplier: 1.38,
    currency: "USD",
    currencySymbol: "$",
    techHubNotes: "NYC is the second-highest tech salary market, with strong fintech, media, and startup demand supplementing the FAANG presence. Finance-adjacent tech roles pay a premium.",
  },
  "seattle": {
    displayName: "Seattle",
    stateOrCountry: "WA",
    multiplier: 1.38,
    currency: "USD",
    currencySymbol: "$",
    techHubNotes: "Seattle's market is dominated by Amazon and Microsoft, with strong cloud and SWE demand. No state income tax makes take-home pay significantly higher than California equivalents.",
  },
  "boston": {
    displayName: "Boston",
    stateOrCountry: "MA",
    multiplier: 1.22,
    currency: "USD",
    currencySymbol: "$",
    techHubNotes: "Boston has a strong biotech, healthtech, and fintech market alongside traditional tech. MIT and Harvard alumni networks drive premium compensation at growth-stage companies.",
  },
  "austin": {
    displayName: "Austin",
    stateOrCountry: "TX",
    multiplier: 1.10,
    currency: "USD",
    currencySymbol: "$",
    techHubNotes: "Austin has grown significantly as a tech hub post-2020, with Apple, Tesla, Oracle, and Dell campuses attracting talent. No state income tax provides a real-take-home advantage.",
  },
  "los-angeles": {
    displayName: "Los Angeles",
    stateOrCountry: "CA",
    multiplier: 1.20,
    currency: "USD",
    currencySymbol: "$",
    techHubNotes: "LA's tech market spans entertainment tech, gaming, e-commerce (Snap, Riot Games, SpaceX, Beyond Meat), and a growing startup ecosystem. Compensation is strong but below SF.",
  },
  "chicago": {
    displayName: "Chicago",
    stateOrCountry: "IL",
    multiplier: 1.05,
    currency: "USD",
    currencySymbol: "$",
    techHubNotes: "Chicago's tech market is anchored by fintech, trading (CME, Citadel), and enterprise software. Compensation is below coastal markets but cost of living is materially lower.",
  },
  "denver": {
    displayName: "Denver",
    stateOrCountry: "CO",
    multiplier: 1.08,
    currency: "USD",
    currencySymbol: "$",
    techHubNotes: "Denver's tech scene has grown substantially, with Salesforce, Google, and numerous cloud/cybersecurity companies. A strong remote-work culture makes Denver a popular destination for coastal salary earners.",
  },
  "atlanta": {
    displayName: "Atlanta",
    stateOrCountry: "GA",
    multiplier: 0.98,
    currency: "USD",
    currencySymbol: "$",
    techHubNotes: "Atlanta is a growing tech hub with Mailchimp, NCR, and a strong fintech and cybersecurity ecosystem. Significantly lower cost of living than coastal markets.",
  },
  "miami": {
    displayName: "Miami",
    stateOrCountry: "FL",
    multiplier: 0.98,
    currency: "USD",
    currencySymbol: "$",
    techHubNotes: "Miami's tech scene has grown rapidly, driven by crypto/fintech and remote workers relocating from coastal markets. No state income tax. Salaries remain slightly below national median.",
  },
  "washington-dc": {
    displayName: "Washington, D.C.",
    stateOrCountry: "DC",
    multiplier: 1.22,
    currency: "USD",
    currencySymbol: "$",
    techHubNotes: "DC's tech market is heavily influenced by government contracting and cybersecurity clearance premiums. Amazon HQ2 in Arlington has elevated the broader DC-area compensation.",
  },
  "toronto": {
    displayName: "Toronto",
    stateOrCountry: "ON, Canada",
    multiplier: 0.78,
    currency: "CAD",
    currencySymbol: "CA$",
    techHubNotes: "Toronto is Canada's largest tech hub, with Shopify, Google, Amazon, and a strong AI research cluster. Salaries are in CAD and lower than US equivalents, though strong by Canadian standards.",
  },
  "london": {
    displayName: "London",
    stateOrCountry: "England, UK",
    multiplier: 0.82,
    currency: "GBP",
    currencySymbol: "£",
    techHubNotes: "London is Europe's leading tech hub, with DeepMind, Meta, Amazon, and a thriving fintech ecosystem. Salaries are in GBP; strong by European standards but below US coastal equivalents.",
  },
  "remote": {
    displayName: "Remote",
    stateOrCountry: "United States",
    multiplier: 1.02,
    currency: "USD",
    currencySymbol: "$",
    techHubNotes: "US-based remote roles increasingly pay near or at coastal market rates for senior engineers. Companies like Stripe, GitLab, and Automattic have fully remote compensation parity. Actual pay depends on the company's location-based pay policy.",
  },
  "manchester": {
    displayName: "Manchester",
    stateOrCountry: "England, UK",
    multiplier: 0.62,
    currency: "GBP",
    currencySymbol: "£",
    techHubNotes: "Manchester is the UK's second-largest tech hub, home to Autotrader, The Hut Group, booking.com, and AO World. A lower cost of living than London combined with a maturing startup ecosystem makes Manchester increasingly attractive for tech talent.",
  },
  "edinburgh": {
    displayName: "Edinburgh",
    stateOrCountry: "Scotland, UK",
    multiplier: 0.64,
    currency: "GBP",
    currencySymbol: "£",
    techHubNotes: "Edinburgh has a thriving fintech scene (FNZ, Nucleus Financial, Baillie Gifford) and a strong academic pipeline from the University of Edinburgh. Competitive salaries by UK standards with significantly lower housing costs than London.",
  },
  "birmingham": {
    displayName: "Birmingham",
    stateOrCountry: "England, UK",
    multiplier: 0.58,
    currency: "GBP",
    currencySymbol: "£",
    techHubNotes: "Birmingham is the UK's second-largest city by population and a growing tech hub, with HSBC, Lloyds, and DHL headquartered here. Lower salaries than London but substantially lower cost of living makes net purchasing power competitive.",
  },
  "bristol": {
    displayName: "Bristol",
    stateOrCountry: "England, UK",
    multiplier: 0.63,
    currency: "GBP",
    currencySymbol: "£",
    techHubNotes: "Bristol has a high concentration of aerospace (Airbus, Rolls-Royce), defence tech, and a growing startup scene. Proximity to London and strong university pipeline from UoB and UWE make it a popular tech relocation destination.",
  },
  "vancouver": {
    displayName: "Vancouver",
    stateOrCountry: "BC, Canada",
    multiplier: 0.71,
    currency: "CAD",
    currencySymbol: "CA$",
    techHubNotes: "Vancouver is Canada's third-largest tech market with major Amazon, Microsoft, and Apple engineering offices, plus a strong gaming industry (EA, Activision, Sony). High cost of living but strong salaries by Canadian standards.",
  },
  "calgary": {
    displayName: "Calgary",
    stateOrCountry: "AB, Canada",
    multiplier: 0.66,
    currency: "CAD",
    currencySymbol: "CA$",
    techHubNotes: "Calgary's tech sector has diversified beyond its oil and gas roots, with growing fintech, energy tech, and data analytics industries. Alberta has no provincial income tax, making take-home pay strong relative to gross salary.",
  },
  "montreal": {
    displayName: "Montréal",
    stateOrCountry: "QC, Canada",
    multiplier: 0.61,
    currency: "CAD",
    currencySymbol: "CA$",
    techHubNotes: "Montréal is a global AI research hub (Mila, Element AI, Google Brain) and has a thriving gaming industry (Ubisoft, EA, Warner Bros). Lower salaries than Toronto/Vancouver, but significantly lower cost of living and a strong AI/ML talent pipeline.",
  },
  "sydney": {
    displayName: "Sydney",
    stateOrCountry: "NSW, Australia",
    multiplier: 0.88,
    currency: "AUD",
    currencySymbol: "A$",
    techHubNotes: "Sydney is Australia's largest tech market with Atlassian, Canva, Afterpay, and major AWS, Google, and Salesforce offices. Strong salaries by regional standards; Australia's superannuation system adds 11% employer contribution on top of base.",
  },
  "melbourne": {
    displayName: "Melbourne",
    stateOrCountry: "VIC, Australia",
    multiplier: 0.83,
    currency: "AUD",
    currencySymbol: "A$",
    techHubNotes: "Melbourne is Australia's second-largest tech hub with strong fintech (ANZ, NAB), e-commerce (REA Group, MYOB), and a rapidly growing startup scene. Slightly lower salaries than Sydney but comparable cost of living.",
  },
};

function applyMultiplier(range: SalaryRange, multiplier: number): SalaryRange {
  return {
    p25: Math.round((range.p25 * multiplier) / 1_000) * 1_000,
    median: Math.round((range.median * multiplier) / 1_000) * 1_000,
    p75: Math.round((range.p75 * multiplier) / 1_000) * 1_000,
  };
}

export function getSalaryData(roleKey: string, cityKey: string) {
  const role = ROLE_SALARIES[roleKey];
  const city = CITIES[cityKey];
  if (!role || !city) return null;

  const m = city.multiplier;
  return {
    role,
    city,
    salaries: {
      junior: applyMultiplier(role.junior, m),
      mid: applyMultiplier(role.mid, m),
      senior: applyMultiplier(role.senior, m),
      staff: applyMultiplier(role.staff, m),
    },
    totalCompSenior: {
      p25:    Math.round((role.senior.p25 * m * role.totalCompMultiplier) / 1_000) * 1_000,
      median: Math.round((role.senior.median * m * role.totalCompMultiplier) / 1_000) * 1_000,
      p75:    Math.round((role.senior.p75 * m * role.totalCompMultiplier) / 1_000) * 1_000,
    },
  };
}

function fmt(n: number, symbol: string) {
  if (n >= 1_000_000) return `${symbol}${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${symbol}${Math.round(n / 1_000)}K`;
  return `${symbol}${n}`;
}
export function formatSalary(n: number, currencySymbol: string) {
  return fmt(n, currencySymbol);
}

// All 280 salary page combinations to generate
export const SALARY_PAGES: SalaryPageDef[] = Object.keys(ROLE_SALARIES).flatMap((roleKey) =>
  Object.keys(CITIES).map((cityKey) => ({
    slug: `${roleKey}-salary-${cityKey}`,
    roleKey,
    cityKey,
  }))
);
