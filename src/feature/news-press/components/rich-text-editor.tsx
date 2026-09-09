import { useEffect, useRef, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";

interface RichTextEditorProps {
  value?: string;
  onChange?: (content: string) => void;
  placeholder?: string;
}

export function RichTextEditor({
  value = "",
  onChange,
  placeholder = "Enter your main content here...",
}: RichTextEditorProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const quillRef = useRef<Quill | null>(null);
  const [wordCount, setWordCount] = useState(0);

  useEffect(() => {
    if (!containerRef.current || quillRef.current) return;

    const editorDiv = document.createElement("div");
    containerRef.current.appendChild(editorDiv);

    const toolbarOptions = [
      [{ header: [1, 2, 3, false] }, { size: ["small", false, "large", "huge"] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      [{ align: [] }],
      [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
      ["link", "image", "code-block", "clean"],
    ];

    const quill = new Quill(editorDiv, {
      theme: "snow",
      placeholder,
      modules: {
        toolbar: toolbarOptions,
      },
    });

    quillRef.current = quill;

    if (value) {
      quill.root.innerHTML = value;
      const text = quill.getText().trim();
      setWordCount(text ? text.split(/\s+/).length : 0);
    }

    quill.on("text-change", () => {
      const html = quill.root.innerHTML;
      const text = quill.getText().trim();
      const count = text ? text.split(/\s+/).length : 0;
      setWordCount(count);
      const isEmpty = text === "" && !html.includes("<img");
      onChange?.(isEmpty ? "" : html);
    });

    const containerNode = containerRef.current;

    return () => {
      if (containerNode) {
        containerNode.innerHTML = "";
      }
      quillRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Sync external value when changed
  useEffect(() => {
    if (quillRef.current && value !== quillRef.current.root.innerHTML) {
      if (!value && quillRef.current.getText().trim() === "") return;
      quillRef.current.root.innerHTML = value || "";
      const text = quillRef.current.getText().trim();
      setWordCount(text ? text.split(/\s+/).length : 0);
    }
  }, [value]);

  return (
    <div className="rich-editor-wrapper rounded-xl border overflow-hidden shadow-inner flex flex-col"
      style={{
        backgroundColor: "#0B1728",
        borderColor: "#1C3352",
      }}
    >
      <style>{`
        /* Dark Theme Quill Toolbar */
        .rich-editor-wrapper .ql-toolbar.ql-snow {
          background-color: #0E1C30;
          border: none;
          border-bottom: 1px solid #1C3352;
          padding: 8px 12px;
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 4px;
        }

        .rich-editor-wrapper .ql-toolbar.ql-snow .ql-formats {
          margin-right: 8px;
          display: flex;
          align-items: center;
        }

        /* SVG icons styling */
        .rich-editor-wrapper .ql-toolbar button {
          padding: 4px 6px;
          border-radius: 6px;
          transition: background 0.15s, color 0.15s;
        }

        .rich-editor-wrapper .ql-toolbar button:hover,
        .rich-editor-wrapper .ql-toolbar .ql-picker-label:hover {
          background-color: #162B48 !important;
        }

        .rich-editor-wrapper .ql-toolbar .ql-stroke {
          stroke: #94A3B8;
        }

        .rich-editor-wrapper .ql-toolbar .ql-fill {
          fill: #94A3B8;
        }

        .rich-editor-wrapper .ql-toolbar button:hover .ql-stroke,
        .rich-editor-wrapper .ql-toolbar button.ql-active .ql-stroke {
          stroke: #F59E0B;
        }

        .rich-editor-wrapper .ql-toolbar button:hover .ql-fill,
        .rich-editor-wrapper .ql-toolbar button.ql-active .ql-fill {
          fill: #F59E0B;
        }

        /* Dropdowns */
        .rich-editor-wrapper .ql-snow .ql-picker {
          color: #CBD5E1;
          font-size: 12px;
        }

        .rich-editor-wrapper .ql-snow .ql-picker-label {
          border: 1px solid transparent;
          border-radius: 6px;
          padding: 3px 8px;
        }

        .rich-editor-wrapper .ql-snow .ql-picker-label .ql-stroke {
          stroke: #94A3B8;
        }

        .rich-editor-wrapper .ql-snow .ql-picker-options {
          background-color: #102035;
          border: 1px solid #1C3352;
          border-radius: 8px;
          box-shadow: 0 10px 25px rgba(0,0,0,0.5);
          padding: 4px;
        }

        .rich-editor-wrapper .ql-snow .ql-picker-item {
          color: #CBD5E1;
          padding: 4px 8px;
          border-radius: 4px;
        }

        .rich-editor-wrapper .ql-snow .ql-picker-item:hover {
          background-color: #162B48;
          color: #FFFFFF;
        }

        /* Color / Background picker palette */
        .rich-editor-wrapper .ql-snow .ql-color-picker .ql-picker-options,
        .rich-editor-wrapper .ql-snow .ql-icon-picker .ql-picker-options {
          background-color: #102035;
        }

        /* Editor Area */
        .rich-editor-wrapper .ql-container.ql-snow {
          border: none;
          font-family: inherit;
          font-size: 14px;
          background-color: #081321;
          min-height: 180px;
          max-height: 280px;
        }

        .rich-editor-wrapper .ql-editor {
          color: #F8FAFC;
          line-height: 1.7;
          min-height: 180px;
          padding: 16px 20px;
        }

        .rich-editor-wrapper .ql-editor.ql-blank::before {
          color: #64748B;
          font-style: normal;
        }

        .rich-editor-wrapper .ql-editor a {
          color: #60A5FA;
          text-decoration: underline;
        }

        .rich-editor-wrapper .ql-editor pre.ql-syntax {
          background-color: #0B1728;
          border: 1px solid #1C3352;
          color: #E2E8F0;
          border-radius: 8px;
          padding: 10px 14px;
        }
      `}</style>

      {/* Quill Container */}
      <div ref={containerRef} className="flex-1 overflow-y-auto" />

      {/* Status Bar */}
      <div
        className="flex items-center justify-between px-3.5 py-1.5 text-[11px] border-t select-none"
        style={{
          backgroundColor: "#0E1C30",
          borderColor: "#1C3352",
          color: "#64748B",
        }}
      >
        <span>p</span>
        <span>{wordCount} words</span>
      </div>
    </div>
  );
}
