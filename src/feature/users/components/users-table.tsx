import { useState } from "react";
import { MoreVertical, Eye, CheckCircle, XCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { UserDetailModal, type UserDetail } from "./user-detail-modal";
import type { StatusFilter } from "./users-filter-bar";

// ── Types ──────────────────────────────────────────────────────────────────

type UserStatus = "VERIFIED" | "PENDING";

interface UserRecord extends UserDetail {
  status: UserStatus;
}

interface UsersTableProps {
  activeFilter?: StatusFilter;
}

// ── Data ───────────────────────────────────────────────────────────────────

const MOCK_USERS: UserRecord[] = [
  {
    id: "u1",
    name: "Jean-Luc Kazadi",
    role: "Customs Broker",
    memberSince: "2026-06-12",
    email: "jl.kazadi@transkat.cd",
    phone: "+243 81 555 0192",
    company: "TransKatanga Logistics SARL",
    nif: "A1802934K",
    completedDeclarations: 142,
    status: "VERIFIED",
  },
  {
    id: "u2",
    name: "Marie Mbemba",
    role: "Import Agent",
    memberSince: "2025-11-03",
    email: "m.mbemba@transkat.cd",
    phone: "+243 82 444 0188",
    company: "TransKatanga Logistics SARL",
    nif: "A1802934K",
    completedDeclarations: 87,
    status: "VERIFIED",
  },
  {
    id: "u3",
    name: "Pierre Kalombo",
    role: "Customs Broker",
    memberSince: "2026-01-20",
    email: "p.kalombo@transkat.cd",
    phone: "+243 81 666 0211",
    company: "TransKatanga Logistics SARL",
    nif: "A1802934K",
    completedDeclarations: 210,
    status: "VERIFIED",
  },
  {
    id: "u4",
    name: "Sophie Tshimanga",
    role: "Trade Facilitator",
    memberSince: "2026-07-01",
    email: "s.tshimanga@transkat.cd",
    phone: "+243 90 333 0099",
    company: "TransKatanga Logistics SARL",
    nif: "A1802934K",
    completedDeclarations: 5,
    status: "PENDING",
  },
  {
    id: "u5",
    name: "André Mulamba",
    role: "Customs Broker",
    memberSince: "2025-09-15",
    email: "a.mulamba@transkat.cd",
    phone: "+243 81 777 0302",
    company: "TransKatanga Logistics SARL",
    nif: "A1802934K",
    completedDeclarations: 315,
    status: "VERIFIED",
  },
  {
    id: "u6",
    name: "Claire Ntumba",
    role: "Logistics Officer",
    memberSince: "2026-08-10",
    email: "c.ntumba@transkat.cd",
    phone: "+243 82 555 0401",
    company: "TransKatanga Logistics SARL",
    nif: "A1802934K",
    completedDeclarations: 2,
    status: "PENDING",
  },
];

const TOTAL_PAGES = 5;
const TABLE_HEADERS = ["User Name", "Email", "Phone", "Company Name", "NIF (Tax ID)", "Status", "Actions"];

// ── Sub-components ─────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: UserStatus }) {
  const isVerified = status === "VERIFIED";
  return (
    <span
      className="inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-bold tracking-wider uppercase border"
      style={
        isVerified
          ? {
              backgroundColor: "var(--color-accent-green-bg)",
              borderColor: "var(--color-accent-green-border)",
              color: "var(--color-accent-green)",
            }
          : {
              backgroundColor: "var(--color-accent-gold-bg)",
              borderColor: "var(--color-accent-gold-border)",
              color: "var(--color-accent-gold)",
            }
      }
    >
      {status}
    </span>
  );
}

function ActionMenu({
  user,
  onViewDetails,
}: {
  user: UserRecord;
  onViewDetails: (u: UserRecord) => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        id={`action-menu-${user.id}`}
        onClick={() => setOpen((p) => !p)}
        className="flex h-8 w-8 items-center justify-center rounded-lg transition-colors"
        style={{ color: "var(--color-text-muted)" }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "var(--color-bg-card-hover)")}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
      >
        <MoreVertical className="h-4 w-4" strokeWidth={2} />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div
            className="absolute right-0 z-20 mt-1 w-40 rounded-xl border py-1.5 shadow-2xl backdrop-blur-md"
            style={{
              backgroundColor: "var(--color-bg-card)",
              borderColor: "var(--color-border-0)",
            }}
          >
            <button
              className="flex w-full items-center gap-2.5 px-3 py-2 text-xs font-medium transition-colors"
              style={{ color: "var(--color-text-secondary)" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "var(--color-bg-card-hover)";
                e.currentTarget.style.color = "var(--color-text-primary-0)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = "var(--color-text-secondary)";
              }}
              onClick={() => { onViewDetails(user); setOpen(false); }}
            >
              <Eye className="h-3.5 w-3.5" strokeWidth={1.8} />
              View details
            </button>
            <button
              className="flex w-full items-center gap-2.5 px-3 py-2 text-xs font-medium transition-colors"
              style={{ color: "var(--color-text-secondary)" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "var(--color-bg-card-hover)";
                e.currentTarget.style.color = "var(--color-accent-green)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = "var(--color-text-secondary)";
              }}
              onClick={() => setOpen(false)}
            >
              <CheckCircle className="h-3.5 w-3.5" strokeWidth={1.8} />
              Approved
            </button>
            <button
              className="flex w-full items-center gap-2.5 px-3 py-2 text-xs font-medium transition-colors"
              style={{ color: "var(--color-text-secondary)" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "var(--color-bg-card-hover)";
                e.currentTarget.style.color = "var(--color-accent-red)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = "var(--color-text-secondary)";
              }}
              onClick={() => setOpen(false)}
            >
              <XCircle className="h-3.5 w-3.5" strokeWidth={1.8} />
              Reject
            </button>
          </div>
        </>
      )}
    </div>
  );
}

function TableRow({
  user,
  onViewDetails,
}: {
  user: UserRecord;
  onViewDetails: (u: UserRecord) => void;
}) {
  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <tr
      className="border-b transition-colors"
      style={{ borderColor: "var(--color-border-subtle)" }}
      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "var(--color-bg-card-hover)")}
      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
    >
      <td className="px-5 py-3.5">
        <div className="flex items-center gap-3">
          {/* Avatar box with initials */}
          <div
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border text-xs font-bold"
            style={{
              backgroundColor: "#162842",
              borderColor: "#1E385D",
              color: "#93C5FD",
            }}
          >
            {initials}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold leading-tight" style={{ color: "var(--color-text-primary-0)" }}>
              {user.name}
            </p>
            <p className="text-xs mt-0.5" style={{ color: "var(--color-text-muted)" }}>
              {user.role}
            </p>
          </div>
        </div>
      </td>
      <td className="px-5 py-3.5">
        <span className="text-sm font-normal" style={{ color: "var(--color-text-secondary)" }}>{user.email}</span>
      </td>
      <td className="px-5 py-3.5">
        <span className="text-sm font-normal" style={{ color: "var(--color-text-secondary)" }}>{user.phone}</span>
      </td>
      <td className="px-5 py-3.5">
        <span className="text-sm font-normal" style={{ color: "var(--color-text-secondary)" }}>{user.company}</span>
      </td>
      <td className="px-5 py-3.5">
        <span className="text-sm font-normal font-mono" style={{ color: "var(--color-text-secondary)" }}>
          {user.nif}
        </span>
      </td>
      <td className="px-5 py-3.5">
        <StatusBadge status={user.status} />
      </td>
      <td className="px-5 py-3.5">
        <ActionMenu user={user} onViewDetails={onViewDetails} />
      </td>
    </tr>
  );
}

function Pagination({
  current,
  total,
  onChange,
}: {
  current: number;
  total: number;
  onChange: (page: number) => void;
}) {
  return (
    <div className="flex items-center justify-center gap-1.5">
      <button
        onClick={() => onChange(Math.max(1, current - 1))}
        disabled={current === 1}
        className="flex h-7 w-7 items-center justify-center rounded-md transition-colors disabled:opacity-30"
        style={{ color: "var(--color-text-muted)" }}
      >
        <ChevronLeft className="h-4 w-4" strokeWidth={2} />
      </button>

      {Array.from({ length: total }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => onChange(page)}
          className={cn(
            "flex h-7 w-7 items-center justify-center rounded-md text-xs font-semibold transition-all"
          )}
          style={
            current === page
              ? {
                  backgroundColor: "var(--color-accent-gold)",
                  color: "#0B1728",
                }
              : {
                  backgroundColor: "transparent",
                  color: "var(--color-text-secondary)",
                }
          }
          onMouseEnter={(e) => {
            if (current !== page) e.currentTarget.style.backgroundColor = "var(--color-bg-card-hover)";
          }}
          onMouseLeave={(e) => {
            if (current !== page) e.currentTarget.style.backgroundColor = "transparent";
          }}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onChange(Math.min(total, current + 1))}
        disabled={current === total}
        className="flex h-7 w-7 items-center justify-center rounded-md transition-colors disabled:opacity-30"
        style={{ color: "var(--color-text-muted)" }}
      >
        <ChevronRight className="h-4 w-4" strokeWidth={2} />
      </button>
    </div>
  );
}

// ── Exported table ─────────────────────────────────────────────────────────

export function UsersTable({ activeFilter = "all" }: UsersTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState<UserRecord | null>(null);

  const filteredUsers = MOCK_USERS.filter((u) => {
    if (activeFilter === "verified") return u.status === "VERIFIED";
    if (activeFilter === "pending")  return u.status === "PENDING";
    return true;
  });

  return (
    <>
      <div
        className="rounded-2xl border shadow-sm overflow-hidden"
        style={{
          backgroundColor: "var(--color-bg-card)",
          borderColor: "var(--color-border-0)",
        }}
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ backgroundColor: "var(--color-bg-primary-0)", borderBottom: "1px solid var(--color-border-0)" }}>
                {TABLE_HEADERS.map((col) => (
                  <th
                    key={col}
                    className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider"
                    style={{ color: "var(--color-text-secondary)" }}
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <TableRow key={user.id} user={user} onViewDetails={setSelectedUser} />
                ))
              ) : (
                <tr>
                  <td
                    colSpan={TABLE_HEADERS.length}
                    className="px-5 py-12 text-center text-sm"
                    style={{ color: "var(--color-text-muted)" }}
                  >
                    No operators found for this filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div
          className="border-t px-5 py-4"
          style={{ borderColor: "var(--color-border-0)" }}
        >
          <Pagination current={currentPage} total={TOTAL_PAGES} onChange={setCurrentPage} />
        </div>
      </div>

      <UserDetailModal
        user={selectedUser}
        onClose={() => setSelectedUser(null)}
        onApprove={(id) => console.log("Approved:", id)}
        onReject={(id) => console.log("Rejected:", id)}
      />
    </>
  );
}
