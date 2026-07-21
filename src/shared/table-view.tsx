import React, { useState } from "react";
import { MoreVertical, Eye, Trash2, Edit, Pencil } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export type StatusType = "ACTIVE" | "INACTIVE" | "PENDING";

export interface Technician {
  id: string;
  name: string;
  email: string;
  joinDate: string;
  status: StatusType;
}

interface TechnicianTableProps {
  technicians?: Technician[];
  onView?: (technician: Technician) => void;
  onEdit?: (technician: Technician) => void;
  onDelete?: (id: string) => void;
}

// Default mock data matching the screenshot
const defaultData: Technician[] = [
  {
    id: "1",
    name: "Marvin McKinney",
    email: "manhhachkt08@gmail.com",
    joinDate: "04-03-2026",
    status: "ACTIVE",
  },
  {
    id: "2",
    name: "Eleanor Pena",
    email: "eleanor.pena@example.com",
    joinDate: "12-01-2026",
    status: "ACTIVE",
  },
  {
    id: "3",
    name: "Wade Warren",
    email: "wade.warren@example.com",
    joinDate: "15-02-2026",
    status: "INACTIVE",
  },
];

export const TechnicianTable: React.FC<TechnicianTableProps> = ({
  technicians = defaultData,
  onView,
  onEdit,
  onDelete,
}) => {
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  const toggleMenu = (id: string) => {
    setActiveMenuId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="w-full overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xs font-sans">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          {/* Table Header */}
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50/50 text-sm font-semibold text-gray-800">
              <th className="py-3.5 px-6 border-r border-gray-200/60 last:border-r-0">
                Technician name
              </th>
              <th className="py-3.5 px-6 border-r border-gray-200/60 last:border-r-0">
                Gmail
              </th>
              <th className="py-3.5 px-6 border-r border-gray-200/60 last:border-r-0">
                Join date
              </th>
              <th className="py-3.5 px-6 border-r border-gray-200/60 last:border-r-0">
                Statues
              </th>
              <th className="py-3.5 px-6">Actions</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
            {technicians.length > 0 ? (
              technicians.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-gray-50/60 transition-colors"
                >
                  {/* Name */}
                  <td className="py-4 px-6 border-r border-gray-100 font-medium text-gray-800 whitespace-nowrap">
                    {item.name}
                  </td>

                  {/* Gmail */}
                  <td className="py-4 px-6 border-r border-gray-100 text-gray-600 whitespace-nowrap">
                    {item.email}
                  </td>

                  {/* Join Date */}
                  <td className="py-4 px-6 border-r border-gray-100 text-gray-600 whitespace-nowrap">
                    {item.joinDate}
                  </td>

                  {/* Status */}
                  <td className="py-4 px-6 border-r border-gray-100 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold tracking-wider uppercase border ${
                        item.status === "ACTIVE"
                          ? "bg-emerald-50 text-emerald-600 border-emerald-300"
                          : "bg-gray-50 text-gray-500 border-gray-300"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>

                  {/* Actions (Three dots + Dropdown Menu) */}
                  <td className="py-4 px-6 relative whitespace-nowrap">
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <button
                          className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                          aria-label="Actions"
                        >
                          <MoreVertical className="h-4 w-4" />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="h-4 w-4 mr-2" />
                          View
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Pencil className="h-4 w-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600 focus:text-red-600">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={5}
                  className="py-8 text-center text-sm text-gray-500"
                >
                  No technicians found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TechnicianTable;
