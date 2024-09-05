import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CheckIcon } from "@radix-ui/react-icons";
import { Column } from "@tanstack/react-table";
import { addDays, format, subDays , isFriday , isSaturday } from "date-fns";
import * as React from "react";

interface DataTableFilterProps<TData, TValue> {
  column?: Column<TData, TValue>;
  title?: string;
  options?: {
    label: string;
    value: string;
    icon?: React.ComponentType<{ className?: string }>;
  }[];
}

function DataTableFilterByDate<TData, TValue>({
  column,
  title,
}: DataTableFilterProps<TData, TValue>) {
  const facets = column?.getFacetedUniqueValues();
  const [selectedValues, setSelectedValues] = React.useState<Set<string>>(
    new Set()
  );




  const today = new Date();


  const filteredOptions = Array.from({ length: 9 }, (_, index) => {
    const date = index < 3 ? subDays(today, 3 - index) : addDays(today, index - 3);
    return {
      label: format(date, "dd MMMM yyyy"),
      value: format(date, "dd MMMM yyyy"),
      icon: CheckIcon,
    };
  });




  const todayOption = {
    label: "Today",
    value: format(new Date(), "dd MMMM yyyy"),
    icon: CheckIcon,
  };
  const tomorrowOption = {
    label: "Tomorrow",
    value: format(
      new Date(new Date().setDate(new Date().getDate() + 1)),
      "dd MMMM yyyy"
    ),
    icon: CheckIcon,
  };

  // const filteredOptions = [todayOption, tomorrowOption];

  const [selectedFruit, setSelectedFruit] = React.useState<any>(null);

  // Handle the selection change
  const handleSelectionChange = (value: string) => {
    console.log("handleSelectionChange value: " + value);
    
    if (value === "all") {
      column?.setFilterValue("");
    } else {
      column?.setFilterValue(value);
    }
  };

  const handleClearFilters = () => {
    setSelectedValues(new Set());
    column?.setFilterValue(undefined);
    handleSelectionChange(todayOption.value);
  };

  React.useEffect(() => {
    column?.setFilterValue(todayOption.value);
  }, [todayOption.value]);

  return (
    <>
      <Select
        onValueChange={handleSelectionChange}
        defaultValue={`${todayOption.value}`}
      >
        <SelectTrigger className="sm:min-w-[180px] w-full focus:ring-0">
          <SelectValue placeholder="Select a date" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {filteredOptions.map((option) => {
              return (
                <SelectItem value={option.value} key={option.value}>
                  <div className="flex items-center capitalize">{option.value}</div>
                </SelectItem>
              );
            })}
            <SelectItem value="all">All</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </>
  );
}

export default DataTableFilterByDate;
