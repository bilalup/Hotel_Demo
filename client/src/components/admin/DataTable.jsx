export function DataTable({ columns, rows, rowKey = "_id", emptyMessage = "No records found." }) {
  if (!rows.length) {
    return <p className="py-16 text-center text-sm text-stone">{emptyMessage}</p>;
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-ink/10 bg-white">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-ink/10 text-[11px] uppercase tracking-wider text-stone">
            {columns.map((col) => (
              <th key={col.key} className="px-5 py-4 font-medium">{col.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row[rowKey]} className="border-b border-ink/5 last:border-0 hover:bg-warm-white/60">
              {columns.map((col) => (
                <td key={col.key} className="px-5 py-4 text-ink">
                  {col.render ? col.render(row) : row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
