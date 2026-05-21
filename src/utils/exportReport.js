import { jsPDF } from 'jspdf'

function addSection(doc, y, title, body, maxWidth) {
  let cursor = y
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(11)
  doc.text(title, 14, cursor)
  cursor += 6
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(10)
  const lines = doc.splitTextToSize(body, maxWidth)
  doc.text(lines, 14, cursor)
  return cursor + lines.length * 5 + 4
}

/**
 * @param {import('../mock/marketAnalyzer').AnalysisReport | object} report
 * @param {string} [filename]
 */
export function downloadReportPdf(report, filename) {
  const doc = new jsPDF({ unit: 'mm', format: 'a4' })
  const maxWidth = 182
  let y = 18

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(16)
  doc.text('Division O2 Analysis', 14, y)
  y += 8
  doc.setFontSize(9)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(100)
  doc.text(`Generated ${new Date(report.analyzedAt).toLocaleString()} — Mock Intelligence Engine`, 14, y)
  doc.setTextColor(0)
  y += 10

  y = addSection(doc, y, 'Startup Idea', report.input?.idea || '—', maxWidth)
  y = addSection(
    doc,
    y,
    'Context',
    `Industry: ${report.input?.industry || '—'}\nAudience: ${report.input?.targetAudience || '—'}\nCompetitors: ${report.input?.competitors || '—'}`,
    maxWidth,
  )

  y = addSection(
    doc,
    y,
    report.viability.title,
    `Score: ${report.viability.score}/100 (${report.viability.level})\n${report.viability.explanation}`,
    maxWidth,
  )
  y = addSection(
    doc,
    y,
    report.marketSaturation.title,
    `${report.marketSaturation.level} — ${report.marketSaturation.score}/100\n${report.marketSaturation.explanation}`,
    maxWidth,
  )
  y = addSection(
    doc,
    y,
    report.competition.title,
    `${report.competition.level} — ${report.competition.score}/100\n${report.competition.explanation}`,
    maxWidth,
  )
  y = addSection(doc, y, report.opportunity.title, report.opportunity.explanation, maxWidth)

  if (y > 240) {
    doc.addPage()
    y = 18
  }

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(11)
  doc.text('Risks', 14, y)
  y += 6
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(10)
  report.risks.forEach((risk, i) => {
    const block = `${i + 1}. ${risk.title} [${risk.severity}]\n${risk.description}`
    const lines = doc.splitTextToSize(block, maxWidth)
    if (y + lines.length * 5 > 280) {
      doc.addPage()
      y = 18
    }
    doc.text(lines, 14, y)
    y += lines.length * 5 + 3
  })

  y += 4
  if (y > 250) {
    doc.addPage()
    y = 18
  }
  y = addSection(
    doc,
    y,
    report.recommendation.title,
    `${report.recommendation.action}\n${report.recommendation.explanation}`,
    maxWidth,
  )

  const name =
    filename ||
    `division-o2-report-${new Date().toISOString().slice(0, 10)}.pdf`
  doc.save(name)
}
