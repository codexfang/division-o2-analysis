/**
 * Division O2 — Mock Market Intelligence Engine
 * Fully local heuristic analysis. No APIs or external data.
 */

const SATURATION_KEYWORDS = [
  'ai',
  'artificial intelligence',
  'machine learning',
  'crypto',
  'blockchain',
  'web3',
  'delivery',
  'uber',
  'marketplace',
  'saas',
  'app',
  'platform',
]

const NICHE_KEYWORDS = [
  'niche',
  'vertical',
  'specialized',
  'b2b',
  'enterprise',
  'underserved',
  'rural',
  'regional',
  'workflow',
  'compliance',
  'legacy',
  'offline-first',
]

const HIGH_COMPETITION_INDUSTRIES = [
  'fintech',
  'social media',
  'consumer',
  'logistics',
  'dating',
]

const RISK_TEMPLATES = [
  {
    id: 'crowded-market',
    trigger: (ctx) => ctx.saturationScore >= 65,
    title: 'Crowded market dynamics',
    description:
      'Incumbents with distribution and brand trust may compress margins before you achieve product-market fit.',
    severity: 'high',
  },
  {
    id: 'cac-pressure',
    trigger: (ctx) => ctx.competitionScore >= 60,
    title: 'Customer acquisition cost pressure',
    description:
      'Paid channels in this category are expensive; organic growth may be slower than projected.',
    severity: 'medium',
  },
  {
    id: 'regulatory',
    trigger: (ctx) =>
      /fintech|health|crypto|finance|medical/i.test(ctx.industry + ctx.idea),
    title: 'Regulatory and compliance overhead',
    description:
      'Licensing, data handling, and audit requirements can extend time-to-market and burn rate.',
    severity: 'high',
  },
  {
    id: 'thin-moat',
    trigger: (ctx) => ctx.ideaLength < 80 && ctx.nicheScore < 40,
    title: 'Differentiation unclear',
    description:
      'The idea description lacks specificity on defensibility, making investor and customer conversations harder.',
    severity: 'medium',
  },
  {
    id: 'platform-risk',
    trigger: (ctx) => /platform|marketplace|aggregator/i.test(ctx.idea),
    title: 'Chicken-and-egg marketplace risk',
    description:
      'Two-sided networks require simultaneous supply and demand; cold-start failure is common.',
    severity: 'high',
  },
  {
    id: 'tech-commodity',
    trigger: (ctx) => /ai|gpt|llm|chatbot/i.test(ctx.idea),
    title: 'Commoditized technology layer',
    description:
      'Model APIs and open-source stacks lower barriers; sustainable advantage must sit in data, workflow, or distribution.',
    severity: 'medium',
  },
  {
    id: 'execution',
    trigger: () => true,
    title: 'Execution and focus risk',
    description:
      'Early teams often spread across too many features; a narrow wedge with measurable retention is critical.',
    severity: 'low',
  },
]

function normalizeText(text = '') {
  return text.toLowerCase().trim()
}

function countKeywordHits(text, keywords) {
  const normalized = normalizeText(text)
  return keywords.reduce((count, kw) => {
    const regex = new RegExp(`\\b${kw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'gi')
    const matches = normalized.match(regex)
    return count + (matches ? matches.length : 0)
  }, 0)
}

function parseCompetitors(competitorsRaw = '') {
  return competitorsRaw
    .split(',')
    .map((c) => c.trim())
    .filter(Boolean)
}

function clamp(value, min = 0, max = 100) {
  return Math.min(max, Math.max(min, Math.round(value)))
}

function levelFromScore(score, low, medium, labels) {
  if (score < low) return labels[0]
  if (score < medium) return labels[1]
  return labels[2]
}

function competitionLevelFromScore(score) {
  if (score < 25) return 'Weak'
  if (score < 50) return 'Moderate'
  if (score < 75) return 'Strong'
  return 'Saturated'
}

function saturationLevelFromScore(score) {
  if (score < 35) return 'Low'
  if (score < 65) return 'Medium'
  return 'High'
}

function recommendationFromScores({ viability, saturation, competition, opportunity }) {
  if (viability >= 72 && opportunity >= 60 && saturation < 70) {
    return {
      action: 'Proceed',
      tone: 'positive',
      summary:
        'Signals suggest a defensible wedge with manageable competitive pressure. Prioritize customer discovery interviews within two weeks.',
    }
  }
  if (viability < 40 || (saturation >= 75 && competition >= 70)) {
    return {
      action: 'Avoid',
      tone: 'negative',
      summary:
        'Market structure and idea positioning indicate high friction. Consider pivoting the wedge or targeting a less saturated segment.',
    }
  }
  return {
    action: 'Needs Validation',
    tone: 'caution',
    summary:
      'Mixed signals — promising elements exist but assumptions need testing. Run 10–15 problem interviews before building.',
  }
}

function buildOpportunityInsight(ctx) {
  const { nicheScore, saturationScore, competitionScore, industry, targetAudience } = ctx

  if (nicheScore >= 55 && saturationScore < 55) {
    return `Division O2 models a favorable window: "${industry}" shows niche positioning with ${targetAudience || 'your target segment'} potentially underserved by incumbents. Differentiated workflow or distribution could capture early adopters before saturation accelerates.`
  }
  if (saturationScore >= 70) {
    return `The "${industry}" space is structurally crowded. Opportunity exists only with a sharp wedge—unique data, regulatory moat, or 10× UX on a narrow job-to-be-done—that incumbents cannot copy within 12 months.`
  }
  if (competitionScore >= 65) {
    return `Competitive intensity is elevated. Market potential hinges on switching costs you can create early—integrations, team habits, or proprietary datasets—not feature parity alone.`
  }
  return `Moderate opportunity profile: validate willingness-to-pay with "${targetAudience || 'target users'}" and map incumbent gaps. Speed of learning will matter more than initial feature breadth.`
}

function scoreViability(ctx) {
  let score = 52

  if (ctx.ideaLength >= 120 && ctx.ideaLength <= 600) score += 12
  else if (ctx.ideaLength < 60) score -= 15
  else if (ctx.ideaLength > 800) score -= 5

  score += Math.min(ctx.keywordDensity * 4, 16)
  score += Math.min(ctx.nicheScore * 0.2, 14)
  score -= Math.min(ctx.saturationScore * 0.25, 22)
  score -= Math.min(ctx.competitionScore * 0.2, 18)
  score -= Math.min(ctx.competitorCount * 3, 15)

  if (ctx.competitorCount === 0) score += 4
  if (ctx.nicheScore >= 50 && ctx.saturationScore < 50) score += 10

  return clamp(score)
}

/**
 * @param {{ idea: string, industry: string, targetAudience: string, competitors?: string }} input
 * @returns {import('../types').AnalysisReport}
 */
export function analyzeMarket(input) {
  const idea = input.idea || ''
  const industry = input.industry || ''
  const targetAudience = input.targetAudience || ''
  const competitors = parseCompetitors(input.competitors || '')

  const combined = `${idea} ${industry} ${targetAudience}`
  const ctx = {
    idea,
    industry,
    targetAudience,
    ideaLength: idea.trim().length,
    keywordDensity: countKeywordHits(combined, SATURATION_KEYWORDS),
    saturationHits: countKeywordHits(idea, ['ai', 'crypto', 'delivery', 'blockchain', 'web3']),
    nicheScore: 0,
    saturationScore: 0,
    competitionScore: 0,
    opportunityScore: 0,
    competitorCount: competitors.length,
  }

  ctx.saturationScore = clamp(
    28 +
      ctx.saturationHits * 12 +
      ctx.keywordDensity * 5 +
      (/\b(app|platform|marketplace)\b/i.test(idea) ? 10 : 0),
  )

  const industryNorm = normalizeText(industry)
  let industryCompetitionBoost = 0
  for (const tag of HIGH_COMPETITION_INDUSTRIES) {
    if (industryNorm.includes(tag)) industryCompetitionBoost += 18
  }
  ctx.competitionScore = clamp(
    22 +
      industryCompetitionBoost +
      ctx.competitorCount * 8 +
      (competitors.some((c) => /google|amazon|meta|microsoft|apple/i.test(c)) ? 15 : 0) +
      ctx.saturationHits * 4,
  )

  const nicheHits = countKeywordHits(combined, NICHE_KEYWORDS)
  const uniqueWordRatio =
    idea.split(/\s+/).filter((w) => w.length > 8).length / Math.max(idea.split(/\s+/).length, 1)
  ctx.nicheScore = clamp(nicheHits * 12 + uniqueWordRatio * 40 + (idea.length > 200 ? 8 : 0))

  ctx.opportunityScore = clamp(
    40 + ctx.nicheScore * 0.45 - ctx.saturationScore * 0.3 - ctx.competitionScore * 0.15,
  )

  const viabilityScore = scoreViability(ctx)
  const marketSaturation = saturationLevelFromScore(ctx.saturationScore)
  const competitionLevel = competitionLevelFromScore(ctx.competitionScore)
  const opportunityInsight = buildOpportunityInsight(ctx)

  const risks = RISK_TEMPLATES.filter((t) => t.trigger(ctx))
    .slice(0, 5)
    .map(({ title, description, severity }) => ({ title, description, severity }))

  const recommendation = recommendationFromScores({
    viability: viabilityScore,
    saturation: ctx.saturationScore,
    competition: ctx.competitionScore,
    opportunity: ctx.opportunityScore,
  })

  return {
    id: `report-${Date.now()}`,
    analyzedAt: new Date().toISOString(),
    input: { idea, industry, targetAudience, competitors: competitors.join(', ') },
    viability: {
      title: 'Viability Score',
      score: viabilityScore,
      level: levelFromScore(viabilityScore, 40, 65, ['Low Potential', 'Moderate', 'Strong']),
      explanation: `Composite score from idea clarity (${ctx.ideaLength} chars), keyword signals, and competitive landscape.`,
      details: `Keyword density index: ${ctx.keywordDensity}. Niche positioning index: ${ctx.nicheScore}/100. Saturation drag: -${Math.min(Math.round(ctx.saturationScore * 0.25), 22)} pts.`,
      tone: viabilityScore >= 65 ? 'positive' : viabilityScore >= 45 ? 'caution' : 'negative',
    },
    marketSaturation: {
      title: 'Market Saturation',
      score: ctx.saturationScore,
      level: marketSaturation,
      explanation: `${marketSaturation} saturation detected based on trending category keywords and industry patterns.`,
      details: `Elevated signals: ${ctx.saturationHits > 0 ? 'AI/crypto/delivery terms present' : 'none'}. Broader density keywords matched ${ctx.keywordDensity} times.`,
      tone:
        marketSaturation === 'Low'
          ? 'positive'
          : marketSaturation === 'Medium'
            ? 'caution'
            : 'negative',
    },
    competition: {
      title: 'Competition Analysis',
      score: ctx.competitionScore,
      level: competitionLevel,
      explanation: `${competitionLevel} competitive pressure with ${ctx.competitorCount} named competitor${ctx.competitorCount === 1 ? '' : 's'}.`,
      details: industryCompetitionBoost
        ? `Industry "${industry}" maps to high-competition cluster (+${industryCompetitionBoost} internal weight).`
        : `Industry "${industry || 'unspecified'}" adds baseline competitive assumptions.`,
      tone:
        competitionLevel === 'Weak' || competitionLevel === 'Moderate'
          ? 'positive'
          : competitionLevel === 'Strong'
            ? 'caution'
            : 'negative',
    },
    opportunity: {
      title: 'Market Opportunity',
      score: ctx.opportunityScore,
      level: levelFromScore(ctx.opportunityScore, 40, 60, ['Limited', 'Moderate', 'Strong']),
      explanation: opportunityInsight,
      details: `Opportunity index blends niche language (${nicheHits} hits), long-form specificity, and inverse saturation/competition weighting.`,
      tone: ctx.opportunityScore >= 60 ? 'positive' : ctx.opportunityScore >= 40 ? 'caution' : 'negative',
    },
    risks,
    recommendation: {
      title: 'Strategic Recommendation',
      action: recommendation.action,
      explanation: recommendation.summary,
      details: `Decision matrix: viability ${viabilityScore}, saturation ${ctx.saturationScore}, competition ${ctx.competitionScore}, opportunity ${ctx.opportunityScore}.`,
      tone: recommendation.tone,
    },
  }
}

export default analyzeMarket
