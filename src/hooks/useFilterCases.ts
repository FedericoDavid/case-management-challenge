import { useMemo } from "react";
import { Case } from "../store/useStore";
import useDebounce from "./useDebounce";

interface UseFilterCasesProps {
  cases: Case[];
  searchTerm: string;
  medicalStatusFilter: string;
}

export const useFilterCases = ({
  cases,
  searchTerm,
  medicalStatusFilter,
}: UseFilterCasesProps) => {
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const filteredCases = useMemo(() => {
    let result = [...cases];

    if (debouncedSearchTerm.trim()) {
      const query = debouncedSearchTerm.toLowerCase().trim();
      result = result.filter((c) =>
        c.client_name.toLowerCase().includes(query)
      );
    }

    if (medicalStatusFilter !== "all") {
      result = result.filter((c) => c.medical_status === medicalStatusFilter);
    }

    return result;
  }, [cases, debouncedSearchTerm, medicalStatusFilter]);

  return filteredCases;
};
