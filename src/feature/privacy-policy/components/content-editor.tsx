import { useEffect, useRef } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";

interface ContentEditorProps {
  placeholder?: string;
  onChange?: (html: string) => void;
  value?: string;
  minHeight?: string;
  label?: string;
}

function ContentEditor({
  placeholder = "Start writing...",
  onChange,
  value,
  minHeight = "320px",
  label,
}: ContentEditorProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const quillInstanceRef = useRef<Quill | null>(null);

  const toolbarOptions = [
    [{ header: [1, 2, 3, false] }],
    [{ font: [] }, { size: ["small", false, "large", "huge"] }],
    ["bold", "italic", "underline", "strike"],
    [{ color: [] }, { background: [] }],
    ["blockquote", "code-block"],
    [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
    [{ indent: "-1" }, { indent: "+1" }, { align: [] }],
    ["link", "image"],
    ["clean"],
  ];

  useEffect(() => {
    if (!containerRef.current || quillInstanceRef.current) return;

    const editorEl = containerRef.current.appendChild(
      document.createElement("div")
    );

    quillInstanceRef.current = new Quill(editorEl, {
      theme: "snow",
      placeholder,
      modules: {
        toolbar: toolbarOptions,
        history: { delay: 2000, maxStack: 500, userOnly: true },
      },
    });

    // Set initial value (edit mode)
    if (value) {
      quillInstanceRef.current.root.innerHTML = value;
    }

    quillInstanceRef.current.on("text-change", () => {
      const html = quillInstanceRef.current?.root.innerHTML ?? "";
      // Treat empty editor as empty string
      const isEmpty = quillInstanceRef.current?.getText().trim() === "";
      onChange?.(isEmpty ? "" : html);
    });

    return () => {
      if (containerRef.current) containerRef.current.innerHTML = "";
      quillInstanceRef.current = null;
    };
  }, []);

  return (
    <>
       <style>{`
        /* Toolbar */
        .quill-wrapper .ql-toolbar.ql-snow {
          border: none;
          border-bottom: 1px solid #e2e8f0;
          background: #f8fafc;
          padding: 10px 12px;
          border-radius: 12px 12px 0 0;
          flex-wrap: wrap;
          gap: 2px;
        }

        /* Toolbar buttons */
        .quill-wrapper .ql-toolbar.ql-snow .ql-formats {
          margin-right: 8px;
        }
        .quill-wrapper .ql-toolbar button,
        .quill-wrapper .ql-toolbar .ql-picker-label {
          border-radius: 6px;
          padding: 3px 5px;
          transition: background 0.15s;
        }
        .quill-wrapper .ql-toolbar button:hover,
        .quill-wrapper .ql-toolbar .ql-picker-label:hover {
          background: #e2e8f0 !important;
          color: #1e293b !important;
        }
        .quill-wrapper .ql-toolbar button.ql-active,
        .quill-wrapper .ql-toolbar .ql-picker-label.ql-active {
          background: #dbeafe !important;
          color: #2563eb !important;
        }
        .quill-wrapper .ql-toolbar .ql-stroke {
          stroke: #64748b;
        }
        .quill-wrapper .ql-toolbar button:hover .ql-stroke,
        .quill-wrapper .ql-toolbar button.ql-active .ql-stroke {
          stroke: #2563eb;
        }
        .quill-wrapper .ql-toolbar .ql-fill {
          fill: #64748b;
        }
        .quill-wrapper .ql-toolbar button:hover .ql-fill,
        .quill-wrapper .ql-toolbar button.ql-active .ql-fill {
          fill: #2563eb;
        }

        /* Editor container */
        .quill-wrapper .ql-container.ql-snow {
          border: none;
          font-family: inherit;
          font-size: 14px;
        }

        /* Editor area */
        .quill-wrapper .ql-editor {
          min-height: ${minHeight};
          padding: 16px 20px;
          color: #1e293b;
          line-height: 1.7;
          caret-color: #2563eb;
        }
        .quill-wrapper .ql-editor.ql-blank::before {
          color: #94a3b8;
          font-style: normal;
          font-size: 14px;
        }

        /* Headings */
        .quill-wrapper .ql-editor h1 { font-size: 1.5rem; font-weight: 700; color: #0f172a; }
        .quill-wrapper .ql-editor h2 { font-size: 1.25rem; font-weight: 600; color: #1e293b; }
        .quill-wrapper .ql-editor h3 { font-size: 1.1rem;  font-weight: 600; color: #334155; }

        /* Blockquote */
        .quill-wrapper .ql-editor blockquote {
          border-left: 3px solid #2563eb;
          background: #f0f6ff;
          padding: 10px 16px;
          border-radius: 0 8px 8px 0;
          color: #475569;
          margin: 8px 0;
        }

        /* Code block */
        .quill-wrapper .ql-editor pre.ql-syntax {
          background: #1e293b;
          color: #e2e8f0;
          border-radius: 8px;
          padding: 14px 16px;
          font-size: 13px;
          line-height: 1.6;
        }

        /* Picker dropdowns */
        .quill-wrapper .ql-snow .ql-picker-options {
          border-radius: 8px;
          border: 1px solid #e2e8f0;
          box-shadow: 0 4px 12px rgba(0,0,0,0.08);
          padding: 4px;
        }
        .quill-wrapper .ql-snow .ql-picker-item:hover {
          background: #f1f5f9;
          border-radius: 4px;
        }
      `}</style>

      <div className="flex flex-col gap-1.5">
        {label && (
          <label className="text-[13px] font-medium text-slate-600">{label}</label>
        )}
        <div className="quill-wrapper w-full border border-slate-200 rounded-xl overflow-hidden shadow-sm bg-white focus-within:border-blue-300 focus-within:ring-3 focus-within:ring-blue-500/10 transition-all">
          <div ref={containerRef} />
        </div>
      </div>
    </>
  );
}

export default ContentEditor;