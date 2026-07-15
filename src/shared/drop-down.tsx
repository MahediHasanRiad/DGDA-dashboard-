import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CreateGuard } from "@/features/guard-management/components/add-guard";
import { useActiveStatusMutation, useSuspendStatusMutation } from "@/features/guard-management/redux/guard.redux";
import { MoreVertical } from "lucide-react";
import { useState } from "react";

interface ItemsType {
  id?: string;
  items: string[];
  defaultValue: any;
}

export function DropdownMenuField({id, items, defaultValue }: ItemsType) {
  const [open, setOpen] = useState(false);
  const [activeStatus] = useActiveStatusMutation(defaultValue.id);
  const [suspendStatus] = useSuspendStatusMutation(defaultValue.id);

  const handleDialog = () => {
    setOpen(true);
  };
  const getStatus = async (data: string) => {
    if (!id) return;
    try {
      if (data === "true") {
        await activeStatus(id).unwrap();
      } else {
        await suspendStatus(id).unwrap()
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"secondary"}>
          <MoreVertical className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          {items.map((item, i) => (
            <DropdownMenuItem key={i} onClick={() => getStatus(item)}>
              {item === "true" ? "Active" : "Suspend"}
            </DropdownMenuItem>
          ))}
          <DropdownMenuItem onClick={handleDialog}>Edit</DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
      {/* guard management dialog  */}
      <CreateGuard open={open} setOpen={setOpen} defaultValue={defaultValue} />
    </DropdownMenu>
  );
}
