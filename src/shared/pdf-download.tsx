import { buttonVariants } from "@/components/ui/button";
import { PDFDownloadLink, type DocumentProps } from "@react-pdf/renderer";
import type { ReactElement } from "react";

interface PDFDownloadProps {
  Doc: ReactElement<DocumentProps>;
  fileName?: string;
  icon?: string;
}

function PDFDownload({
  Doc,
  fileName = "document.pdf",
  icon,
}: PDFDownloadProps) {
  return (
    <PDFDownloadLink
      document={Doc}
      fileName={fileName}
      className={buttonVariants({ variant: "default" }) + " gap-2 cursor-pointer"}
      
    >
      {({ loading }) =>
        loading ? (
          <span className="text-sm">Loading...</span>
        ) : (
          <>
            {icon ? (
              <img src={icon} alt="" className="w-3 h-3 md:w-4 md:h-4" />
            ) : (
            <span>Export PDF</span>
            )}
          </>
        )
      }
    </PDFDownloadLink>
  );
}

export default PDFDownload;