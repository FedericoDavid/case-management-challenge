import { sampleCases } from "../constants/sampleCases";
import { Case } from "../store/useStore";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const getStoredCases = (): Case[] => {
  try {
    const storedData = localStorage.getItem("case-management-storage");

    if (storedData) {
      const parsedData = JSON.parse(storedData);

      if (parsedData.state && Array.isArray(parsedData.state.cases)) {
        return parsedData.state.cases;
      }
    }
  } catch (error) {
    console.error("Error getting stored cases:", error);
  }
  return sampleCases;
};

export const caseService = {
  async fetchCases(): Promise<Case[]> {
    await delay(800);
    const storedCases = getStoredCases();
    return storedCases.length > 0 ? storedCases : [...sampleCases];
  },

  async searchCases(query: string): Promise<Case[]> {
    await delay(500);
    const normalizedQuery = query.toLowerCase().trim();
    const storedCases = getStoredCases();

    return storedCases.filter((c) =>
      c.client_name.toLowerCase().includes(normalizedQuery)
    );
  },

  async getCaseById(id: string): Promise<Case | undefined> {
    await delay(300);

    const storedCases = getStoredCases();
    const storedCase = storedCases.find((c) => c.id === id);

    if (storedCase) {
      return storedCase;
    }

    return sampleCases.find((c) => c.id === id);
  },
};
