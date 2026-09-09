import { useEffect, useRef } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";

interface ContentRichEditorProps {
  placeholder?: string;
  onChange?: (html: string) => void;
  value?: string;
  minHeight?: string;
  label?: string;
}

export function ContentRichEditor({
  placeholder = "Enter your main content here...",
  onChange,
  value,
  minHeight = "340px",
  label = "Content",
}: ContentRichEditorProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const quillInstanceRef = useRef<Quill | null>(null);

  const toolbarOptions = [
    [{ header: [1, 2, 3, false] }],
    [{ font: [] }, { size: ["small", false, "large", "huge"] }],
    ["bold", "italic", "underline", "strike"],
    [{ color: [] }, { background: [] }],
    ["blockquote", "code-block"],
    [{ list: "ordered" }, { list: "bullet" }],
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

    if (value) {
      quillInstanceRef.current.root.innerHTML = value;
    }

    quillInstanceRef.current.on("text-change", () => {
      const html = quillInstanceRef.current?.root.innerHTML ?? "";
      const isEmpty = quillInstanceRef.current?.getText().trim() === "";
      onChange?.(isEmpty ? "" : html);
    });

    const currentContainer = containerRef.current;
    return () => {
      if (currentContainer) {
        currentContainer.innerHTML = "";
      }
      quillInstanceRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <style>{`
        /* Dark Theme Quill Toolbar */
        .content-quill-wrapper .ql-toolbar.ql-snow {
          border: none;
          border-bottom: 1px solid #1C3352;
          background: #0B1728;
          padding: 10px 14px;
          border-radius: 12px 12px 0 0;
          flex-wrap: wrap;
          gap: 3px;
        }

        .content-quill-wrapper .ql-toolbar.ql-snow .ql-formats {
          margin-right: 8px;
        }
        .content-quill-wrapper .ql-toolbar button,
        .content-quill-wrapper .ql-toolbar .ql-picker-label {
          border-radius: 6px;
          padding: 3px 5px;
          color: #94A3B8 !important;
          transition: background 0.15s, color 0.15s;
        }
        .content-quill-wrapper .ql-toolbar button:hover,
        .content-quill-wrapper .ql-toolbar .ql-picker-label:hover {
          background: #142742 !important;
          color: #F8FAFC !important;
        }
        .content-quill-wrapper .ql-toolbar button.ql-active,
        .content-quill-wrapper .ql-toolbar .ql-picker-label.ql-active {
          background: rgba(245, 158, 11, 0.15) !important;
          color: #F59E0B !important;
        }
        .content-quill-wrapper .ql-toolbar .ql-stroke {
          stroke: #94A3B8;
        }
        .content-quill-wrapper .ql-toolbar button:hover .ql-stroke,
        .content-quill-wrapper .ql-toolbar button.ql-active .ql-stroke {
          stroke: #F59E0B;
        }
        .content-quill-wrapper .ql-toolbar .ql-fill {
          fill: #94A3B8;
        }
        .content-quill-wrapper .ql-toolbar button:hover .ql-fill,
        .content-quill-wrapper .ql-toolbar button.ql-active .ql-fill {
          fill: #F59E0B;
        }

        /* Editor container */
        .content-quill-wrapper .ql-container.ql-snow {
          border: none;
          font-family: inherit;
          font-size: 14px;
          background: #0E1B2E;
        }

        /* Editor area */
        .content-quill-wrapper .ql-editor {
          min-height: ${minHeight};
          padding: 18px 20px;
          color: #F8FAFC;
          line-height: 1.7;
          caret-color: #F59E0B;
        }
        .content-quill-wrapper .ql-editor.ql-blank::before {
          color: #64748B;
          font-style: normal;
          font-size: 14px;
        }

        /* Headings & elements */
        .content-quill-wrapper .ql-editor h1 { font-size: 1.5rem; font-weight: 700; color: #F8FAFC; margin-bottom: 0.5rem; }
        .content-quill-wrapper .ql-editor h2 { font-size: 1.25rem; font-weight: 600; color: #E2E8F0; margin-bottom: 0.4rem; }
        .content-quill-wrapper .ql-editor h3 { font-size: 1.1rem;  font-weight: 600; color: #CBD5E1; }
        .content-quill-wrapper .ql-editor p { margin-bottom: 0.8rem; color: #CBD5E1; }

        /* Blockquote */
        .content-quill-wrapper .ql-editor blockquote {
          border-left: 3px solid #F59E0B;
          background: rgba(245, 158, 11, 0.08);
          padding: 10px 16px;
          border-radius: 0 8px 8px 0;
          color: #FDE68A;
          margin: 10px 0;
        }

        /* Code block */
        .content-quill-wrapper .ql-editor pre.ql-syntax {
          background: #0B1728;
          color: #E2E8F0;
          border: 1px solid #1C3352;
          border-radius: 8px;
          padding: 14px 16px;
          font-size: 13px;
        }

        /* Picker dropdowns */
        .content-quill-wrapper .ql-snow .ql-picker-options {
          background: #102035;
          border-radius: 8px;
          border: 1px solid #1C3352;
          box-shadow: 0 8px 24px rgba(0,0,0,0.4);
          padding: 4px;
        }
        .content-quill-wrapper .ql-snow .ql-picker-item {
          color: #CBD5E1;
        }
        .content-quill-wrapper .ql-snow .ql-picker-item:hover {
          background: #142742;
          color: #F8FAFC;
          border-radius: 4px;
        }
      `}</style>

      <div className="flex flex-col gap-2">
        {label && (
          <label className="text-xs sm:text-sm font-semibold text-slate-300">
            {label}
          </label>
        )}
        <div className="content-quill-wrapper w-full border border-[#1C3352] rounded-2xl overflow-hidden shadow-lg bg-[#0E1B2E] focus-within:border-amber-500/60 transition-all">
          <div ref={containerRef} />
        </div>
      </div>
    </>
  );
}
