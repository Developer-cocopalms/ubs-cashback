export function toCsv(rows: Record<string, any>[]): string {
  if (!rows.length) return ''
  const headers = Object.keys(rows[0])
  const lines = [headers.join(',')]
  for (const row of rows) {
    const vals = headers.map(h => JSON.stringify(row[h] ?? '').replace(/\n/g, ' '))
    lines.push(vals.join(','))
  }
  return lines.join('\n')
}

export function toCsvAndDownload(rows: Record<string, any>[], filename: string) {
  const csv = toCsv(rows)
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}
