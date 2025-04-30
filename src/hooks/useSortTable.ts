/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useMemo } from "react";
import { SortDescriptor } from "@react-types/shared";

interface UseSortTableProps<T> {
  data: T[];
  initialSortDescriptor: SortDescriptor;
  columnProcessors?: {
    [columnKey: string]: (value: any, item: T) => any;
  };
}

export function useSortTable<T extends Record<string, any>>({
  data,
  initialSortDescriptor,
  columnProcessors = {},
}: UseSortTableProps<T>) {
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>(
    initialSortDescriptor
  );

  const sortedItems = useMemo(() => {
    if (!data) return [];

    const { column, direction } = sortDescriptor;

    if (!column || !direction) {
      return data;
    }

    const items = [...data];

    items.sort((a, b) => {
      let aValue = a[column as keyof T];
      let bValue = b[column as keyof T];

      if (columnProcessors[column]) {
        aValue = columnProcessors[column](aValue, a);
        bValue = columnProcessors[column](bValue, b);
      } else {
        if (typeof aValue === "string") aValue = aValue.toLowerCase();
        if (typeof bValue === "string") bValue = bValue.toLowerCase();
      }

      if (aValue < bValue) return direction === "ascending" ? -1 : 1;
      if (aValue > bValue) return direction === "ascending" ? 1 : -1;
      return 0;
    });

    return items;
  }, [data, sortDescriptor, columnProcessors]);

  return { sortedItems, sortDescriptor, setSortDescriptor };
}
