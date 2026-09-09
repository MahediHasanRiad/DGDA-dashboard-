"use client";

import { useMemo } from "react";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";
 
interface Job {
  id: string;
  title: string;
}

interface ComboFieldPropType {
  jobs: Job[];
  setGetJobId: (jobId: string) => void;
}

export function ComboboxField({ jobs, setGetJobId }: ComboFieldPropType) {
  const items = useMemo(
    () => jobs?.map((job) => ({ label: job.title, value: job.id })) ?? [],
    [jobs]
  );

  return (
    <Combobox items={items}>
      <ComboboxInput placeholder="Select Job Name" />
      <ComboboxContent>
        <ComboboxEmpty>No items found.</ComboboxEmpty>
        <ComboboxList className={"bg-bg-primary-0"}>
          {items.map((item) => (
            <ComboboxItem key={item.value} value={item.label} onClick={() => setGetJobId(item.value)}>
              {item.label}
            </ComboboxItem>
          ))}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}