import { create } from "zustand";
import { persist, createJSONStorage, PersistOptions } from "zustand/middleware";

export interface Expense {
  id: string;
  label: string;
  amount: number;
  deductedFrom: string;
}

export interface Case extends Record<string, unknown> {
  id: string;
  client_name: string;
  date_of_birth: string;
  doa: string;
  medical_status: string;
  case_status: string;
  law_firm: string;
  expenses: Expense[];
}

interface CaseState {
  cases: Case[];
  isLoading: boolean;
}

interface CaseActions {
  setCases: (cases: Case[]) => void;
  setIsLoading: (loading: boolean) => void;
  addExpense: (caseId: string, expense: Omit<Expense, "id">) => void;
  removeExpenses: (caseId: string, expenseIds: string[]) => void;
}

type PersistedState = {
  cases: Case[];
};

const persistConfig: PersistOptions<CaseState & CaseActions, PersistedState> = {
  name: "case-management-storage",
  storage: createJSONStorage(() => localStorage),
  partialize: (state) => ({ cases: state.cases }),
};

const useStore = create<CaseState & CaseActions>()(
  persist(
    (set) => ({
      cases: [],
      isLoading: false,
      setCases: (cases) => set({ cases }),
      setIsLoading: (loading) => set({ isLoading: loading }),
      addExpense: (caseId, expense) =>
        set((state) => {
          const newExpense = {
            ...expense,
            id: crypto.randomUUID(),
          };

          return {
            cases: state.cases.map((c) =>
              c.id === caseId
                ? {
                    ...c,
                    expenses: Array.isArray(c.expenses)
                      ? [...c.expenses, newExpense]
                      : [newExpense],
                  }
                : c
            ),
          };
        }),
      removeExpenses: (caseId, expenseIds) =>
        set((state) => {
          return {
            cases: state.cases.map((c) =>
              c.id === caseId
                ? {
                    ...c,
                    expenses: Array.isArray(c.expenses)
                      ? c.expenses.filter(
                          (expense) => !expenseIds.includes(expense.id)
                        )
                      : [],
                  }
                : c
            ),
          };
        }),
    }),
    persistConfig
  )
);

export default useStore;
