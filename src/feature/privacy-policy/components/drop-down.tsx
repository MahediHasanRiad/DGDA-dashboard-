import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type PrivacyType =
  | "Privacy Policy"
  | "Cookie Policy"
  | "Terms & Conditions"
  | 'All'

export function SiteContentDropDown({
  items,
  selectContent,
}: {
  items: any;
  selectContent: any;
}) {
  return (
    <Select onValueChange={selectContent}>
      <SelectTrigger className="w-full max-w-48">
        <SelectValue placeholder="Privacy Policy" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {items.map((item: any) => (
            <SelectItem
              key={item}
              value={item}
              onClick={() => selectContent(item)}
            >
              {item}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
