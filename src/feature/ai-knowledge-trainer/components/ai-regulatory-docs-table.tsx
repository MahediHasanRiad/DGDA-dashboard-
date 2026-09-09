import {
  FileText,
  RefreshCw,
  Download,
  Trash2,
  CheckCircle,
  MoreVertical,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { type RegulatoryDoc, getCategoryBadgeStyle } from "../ai-knowledge-trainer.data";

interface AIRegulatoryDocsTableProps {
  docs: RegulatoryDoc[];
  onSync: (doc: RegulatoryDoc) => void;
  onDelete: (doc: RegulatoryDoc) => void;
}

export function AIRegulatoryDocsTable({
  docs,
  onSync,
  onDelete,
}: AIRegulatoryDocsTableProps) {
  return (
    <div
      className="rounded-2xl border overflow-hidden shadow-lg flex flex-col"
      style={{
        backgroundColor: "var(--color-bg-card)",
        borderColor: "var(--color-border-0)",
      }}
    >
      <div className="overflow-x-auto min-h-[300px]">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr
              className="border-b text-xs font-semibold tracking-wider uppercase select-none"
              style={{
                borderColor: "var(--color-border-0)",
                backgroundColor: "var(--color-bg-surface)",
                color: "var(--color-text-muted)",
              }}
            >
              <th className="py-4 px-4 w-16 text-center">Status</th>
              <th className="py-4 px-4 min-w-[280px]">Official Regulatory Document</th>
              <th className="py-4 px-4 min-w-[180px]">Category</th>
              <th className="py-4 px-4 min-w-[120px]">File Size</th>
              <th className="py-4 px-4 min-w-[160px]">Last Model Sync</th>
              <th className="py-4 px-4 w-20 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y" style={{ borderColor: "var(--color-border-subtle)" }}>
            {docs.map((doc) => {
              const badgeStyle = getCategoryBadgeStyle(doc.category);

              return (
                <tr
                  key={doc.id}
                  className="transition-colors hover:bg-[#142742]/70 group"
                >
                  {/* Status */}
                  <td className="py-4 px-4 text-center">
                    <div className="flex items-center justify-center">
                      <span className="relative flex h-2.5 w-2.5">
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]"></span>
                      </span>
                    </div>
                  </td>

                  {/* Document Title */}
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20">
                        <FileText className="h-4 w-4" />
                      </div>
                      <div>
                        <span
                          className="text-sm font-semibold block"
                          style={{ color: "var(--color-text-primary-0)" }}
                        >
                          {doc.title}
                        </span>
                        <span className="text-xs text-slate-400 font-mono">
                          {doc.docNumber}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Category */}
                  <td className="py-4 px-4">
                    <span
                      className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border"
                      style={{
                        backgroundColor: badgeStyle.bg,
                        color: badgeStyle.text,
                        borderColor: badgeStyle.border,
                      }}
                    >
                      {doc.category}
                    </span>
                  </td>

                  {/* File Size */}
                  <td className="py-4 px-4 text-xs font-mono text-slate-300">
                    {doc.fileSize}
                  </td>

                  {/* Last Sync */}
                  <td className="py-4 px-4 text-xs text-slate-400">
                    <div className="flex items-center gap-1.5">
                      <CheckCircle className="h-3.5 w-3.5 text-emerald-400" />
                      <span>{doc.lastSync}</span>
                    </div>
                  </td>

                  {/* Actions */}
                  <td className="py-4 px-4 text-center">
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <button className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-[#1C3352] transition-colors">
                          <MoreVertical className="h-4 w-4" />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align="end"
                        className="w-44 rounded-xl p-1 shadow-xl border bg-[#102035] border-[#1C3352] text-slate-200"
                      >
                        <DropdownMenuItem
                          onClick={() => onSync(doc)}
                          className="gap-2 text-xs rounded-lg cursor-pointer py-2 hover:bg-[#1C3352] hover:text-white"
                        >
                          <RefreshCw className="h-3.5 w-3.5 text-emerald-400" />
                          <span>Re-index Vectors</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="gap-2 text-xs rounded-lg cursor-pointer py-2 hover:bg-[#1C3352] hover:text-white"
                        >
                          <Download className="h-3.5 w-3.5 text-blue-400" />
                          <span>Download PDF</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => onDelete(doc)}
                          className="gap-2 text-xs rounded-lg cursor-pointer py-2 text-red-400 hover:bg-red-500/10 hover:text-red-300"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                          <span>Remove Doc</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
