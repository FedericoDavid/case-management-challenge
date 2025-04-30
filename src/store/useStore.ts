import { create } from "zustand";

export interface Case extends Record<string, unknown> {
  id: string;
  client_name: string;
  doa: string;
  medical_status: string;
  case_status: string;
  law_firm: string;
}

interface StoreState {
  cases: Case[];
  searchQuery: string;
  isLoading: boolean;
  addCase: (newCase: Omit<Case, "id">) => void;
  updateCase: (id: string, updatedCase: Partial<Case>) => void;
  deleteCase: (id: string) => void;
  setSearchQuery: (query: string) => void;
  setIsLoading: (loading: boolean) => void;
  filterCases: (medicalStatus: string | null) => Case[];
}

const useStore = create<StoreState>((set, get) => ({
  cases: [],
  searchQuery: "",
  isLoading: false,

  addCase: (newCase) =>
    set((state) => {
      const id = crypto.randomUUID();
      const caseData: Omit<Case, "id"> = newCase;
      return {
        cases: [
          ...state.cases,
          {
            ...caseData,
            id,
          } as Case,
        ],
      };
    }),

  updateCase: (id, updatedCase) =>
    set((state) => ({
      cases: state.cases.map((c) =>
        c.id === id ? { ...c, ...updatedCase } : c
      ),
    })),

  deleteCase: (id) =>
    set((state) => ({
      cases: state.cases.filter((c) => c.id !== id),
    })),

  setSearchQuery: (query) => set({ searchQuery: query }),

  setIsLoading: (loading) => set({ isLoading: loading }),

  filterCases: (medicalStatus) => {
    const { cases, searchQuery } = get();
    let filtered = [...cases];

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter((c) =>
        c.client_name.toLowerCase().includes(query)
      );
    }

    if (medicalStatus && medicalStatus !== "all") {
      filtered = filtered.filter((c) => c.medical_status === medicalStatus);
    }

    return filtered;
  },
}));

export default useStore;
