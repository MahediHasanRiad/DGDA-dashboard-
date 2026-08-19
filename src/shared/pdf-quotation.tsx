import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export interface QuotationItem {
  label: string;
  cost: number;
}

export interface QuotationData {
  quotationNumber?: string;
  totalHoursToComplete: number;
  hourlyRate: number;
  materialPrice: number;
  vatAmountTotal: number;
  address?: string;
  vatNumber?: string;
  description?: string;
  items?: QuotationItem[];
  vatPercentage?: number; // e.g., 0.06 or 0.21
  subTotalAmount?: number;
  total?: number;
  assignTo?: string;
  status: "PENDING" | "ACCEPTED" | "REJECTED" | "EXPIRED";
  onAccept?: (quotationNumber?: string) => void;
  onCancel?: (quotationNumber?: string) => void;
}

const maroonBg = "bg-[#B11E4A]";
const maroonText = "text-[#B11E4A]";
const maroonBorder = "border-[#B11E4A]";

export default function QuotationMessageCard({
  data,
}: {
  data: QuotationData;
}) {
  const items = data.items || [];
  const subtotal =
    data.subTotalAmount ?? items.reduce((sum, item) => sum + item.cost, 0);
  const vatRate = data.vatPercentage ?? 0.06; // Default 6% as per screenshot
  const vatAmount = data.vatAmountTotal ?? subtotal * vatRate;
  const grandTotal = data.total ?? subtotal + vatAmount;

  const isMoreThan10Yrs = vatRate === 0.06;

  return (
    <Card className="w-full max-w-sm font-sans overflow-hidden border-[#B11E4A]/40 bg-[#eceae8] rounded-3xl p-5 shadow-xs text-[#1e1b18] space-y-4">
      {/* Title */}
      <h2 className="text-xl font-bold tracking-tight text-gray-900 border-b border-gray-300/60 pb-3">
        Quotation (proposal)
      </h2>

      {/* Brand Header */}
      <div className="flex justify-center py-2">
        <div className="flex items-center gap-3">
          {/* Logo SVG Icon */}
          <div className="w-12 h-12 flex items-center justify-center bg-primary-0 text-white rounded-xl font-black text-2xl tracking-tighter">
            S
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-black tracking-tight text-primary-0 leading-none">
              BELPRO
            </span>
            <span className="text-[9px] text-gray-600 font-bold tracking-widest uppercase mt-0.5">
              B2B PLATFORM
            </span>
          </div>
        </div>
      </div>

      {/* Office & VAT Details */}
      <div className="space-y-1.5 text-xs text-gray-600 border-b border-gray-300/60 pb-3">
        <div className="flex justify-between items-start gap-4">
          <span className="whitespace-nowrap shrink-0">
            Registered Office Address
          </span>
          <span className="text-right text-gray-800 font-normal leading-tight">
            {data.address || "2972 Westheimer Rd. Santa Ana, Illinois 85486"}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span>VAT Number</span>
          <span className="font-mono text-gray-800 font-medium">
            {data.vatNumber || "BE 0876.543.210"}
          </span>
        </div>
      </div>

      {/* Job Title / Description */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-gray-900 leading-snug">
          {data.description ||
            "Emergency Bathroom Pipe Repair & Leakage sealing"}
        </h3>
        <h3 className="text-sm font-bold text-gray-900 leading-snug">
          Task Assigned: {data.assignTo || ""}
        </h3>
      </div>

      {/* Split VAT Info Box (Read-only status display) */}
      <div className="bg-white/90 p-3.5 rounded-2xl border border-gray-200/80 space-y-3 shadow-xs">
        <div className="flex justify-between items-start">
          <h5 className="font-bold text-xs text-gray-900">
            Split vat automation
          </h5>
          <span className="text-[10px] text-gray-500 font-medium">
            Belgian Tax Rule
          </span>
        </div>
        <p className="text-[11px] text-gray-500 leading-relaxed">
          Properties older than 10 years qualify for 6% VAT. Newer builds are
          taxed at 21%.
        </p>

        {/* VAT Option Badges (Read-only state) */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          <div
            className={`h-8 text-[11px] rounded-lg font-medium flex items-center justify-center border ${
              !isMoreThan10Yrs
                ? `${maroonBg} text-white ${maroonBorder}`
                : `${maroonBorder} ${maroonText} bg-white`
            }`}
          >
            &lt;10 YRS (21% VAT)
          </div>
          <div
            className={`h-8 text-[11px] rounded-lg font-medium flex items-center justify-center border ${
              isMoreThan10Yrs
                ? `${maroonBg} text-white ${maroonBorder}`
                : `${maroonBorder} ${maroonText} bg-white`
            }`}
          >
            &gt;10 YRS (6% VAT)
          </div>
        </div>
      </div>

      {/* Summary Totals */}
      <div className="space-y-1.5 text-xs text-gray-700 pt-1">
        <div className="flex justify-between items-center">
          <span>totalHoursToComplete</span>
          <span className="font-medium text-gray-900">
            {data.totalHoursToComplete}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span>Hourly Rate</span>
          <span className="font-medium text-gray-900">€{data.hourlyRate}</span>
        </div>
        <div className="flex justify-between items-center">
          <span>Material Price</span>
          <span className="font-medium text-gray-900">
            €{data.materialPrice}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span>Subtotal (Net)</span>
          <span className="font-medium text-gray-900">€{subtotal}</span>
        </div>
        <div className="flex justify-between items-center">
          <span>VAT Amount ({Math.round(vatRate * 100)}%)</span>
          <span className="font-medium text-gray-900">€{vatAmount}</span>
        </div>
        <div className="flex justify-between items-center pt-1">
          <span className="font-bold text-gray-900 text-sm">Grand total</span>
          <span className="text-lg font-bold text-gray-900">
            €{Math.round(grandTotal)}
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-4 space-y-2 pt-2">
        {data.status === "ACCEPTED" ? (
          <Button
            type="button"
            disabled
            className={`w-full ${maroonBg} text-white rounded-xl h-10 text-sm font-semibold opacity-80 cursor-not-allowed`}
          >
            Accepted
          </Button>
        ) : (
          <div className="flex items-center gap-3 w-full">
            <Button
              type="button"
              variant="outline"
              onClick={() => data.onCancel?.(data.quotationNumber)}
              className={`w-full bg-transparent ${maroonBorder} ${maroonText} hover:bg-rose-50 rounded-xl h-10 text-sm font-semibold transition-colors`}
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={() => data.onAccept?.(data.quotationNumber)}
              className={`w-full ${maroonBg} hover:bg-[#9E1840] text-white rounded-xl h-10 text-sm font-semibold transition-colors`}
            >
              Accept
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
}
