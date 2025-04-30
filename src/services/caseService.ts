import { Case } from "../store/useStore";

const sampleCases: Case[] = [
  {
    id: "1",
    client_name: "Carlos Cox",
    doa: "1/25/2025",
    medical_status: "Ready for Assignment",
    case_status: "Active",
    law_firm: "XYZ Law",
  },
  {
    id: "2",
    client_name: "Carlos Cox",
    doa: "1/25/2025",
    medical_status: "Signed",
    case_status: "Active",
    law_firm: "XYZ Law",
  },
  {
    id: "3",
    client_name: "Carlos Cox",
    doa: "1/25/2025",
    medical_status: "Scheduled",
    case_status: "Active",
    law_firm: "XYZ Law",
  },
  {
    id: "4",
    client_name: "Carlos Cox",
    doa: "1/25/2025",
    medical_status: "Scheduled",
    case_status: "Active",
    law_firm: "XYZ Law",
  },
  {
    id: "5",
    client_name: "Carlos Cox",
    doa: "1/25/2025",
    medical_status: "Scheduled",
    case_status: "Active",
    law_firm: "XYZ Law",
  },
  {
    id: "6",
    client_name: "Carlos Cox",
    doa: "1/25/2025",
    medical_status: "Scheduled",
    case_status: "Active",
    law_firm: "XYZ Law",
  },
  {
    id: "7",
    client_name: "Carlos Cox",
    doa: "1/25/2025",
    medical_status: "Scheduled",
    case_status: "Active",
    law_firm: "XYZ Law",
  },
  {
    id: "8",
    client_name: "Carlos Cox",
    doa: "1/25/2025",
    medical_status: "Scheduled",
    case_status: "Active",
    law_firm: "XYZ Law",
  },
  {
    id: "9",
    client_name: "Greg Conner",
    doa: "10/1/1971",
    medical_status: "In Treatment",
    case_status: "Pending",
    law_firm: "Julian Sanders & Associates",
  },
  {
    id: "10",
    client_name: "Maria Smith",
    doa: "3/15/2025",
    medical_status: "Completed",
    case_status: "Closed",
    law_firm: "ABC Legal",
  },
];

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const caseService = {
  async fetchCases(): Promise<Case[]> {
    await delay(800);
    return [...sampleCases];
  },

  async searchCases(query: string): Promise<Case[]> {
    await delay(500);
    const normalizedQuery = query.toLowerCase().trim();

    return sampleCases.filter((c) =>
      c.client_name.toLowerCase().includes(normalizedQuery)
    );
  },

  async getCaseById(id: string): Promise<Case | undefined> {
    await delay(300);
    return sampleCases.find((c) => c.id === id);
  },

  // Crear un nuevo caso (simulado)
  async createCase(newCase: Omit<Case, "id">): Promise<Case> {
    await delay(1000);

    return {
      id: Math.random().toString(36).substring(2, 9),
      ...newCase,
    } as Case;
  },

  // Actualizar un caso (simulado)
  async updateCase(id: string, updatedCase: Partial<Case>): Promise<Case> {
    await delay(800);
    const existingCase = sampleCases.find((c) => c.id === id);

    if (!existingCase) {
      throw new Error(`Case with id ${id} not found`);
    }

    const updated: Case = {
      ...existingCase,
      ...updatedCase,
    };

    return updated;
  },

  // Eliminar un caso (simulado)
  async deleteCase(id: string): Promise<boolean> {
    await delay(600);
    // Simulamos la eliminación del caso con id
    console.log(`deleted case: ${id}`);
    return true;
  },
};
