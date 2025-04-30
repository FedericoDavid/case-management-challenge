import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { caseService } from "../services/caseService";
import useStore, { Case } from "../store/useStore";

export const useCaseDetail = (id: string | undefined) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [currentCase, setCurrentCase] = useState<Case | null>(null);
  const [activeTab, setActiveTab] = useState<string>("details");

  const { cases, setCases } = useStore();
  const navigate = useNavigate();

  useEffect(() => {
    const loadCaseById = async () => {
      if (!id) {
        navigate("/cases");
        return;
      }

      setLoading(true);

      try {
        const caseFromStore = cases.find((c) => c.id === id);

        if (caseFromStore) {
          setCurrentCase(caseFromStore);
          setLoading(false);
          return;
        }

        const caseData = await caseService.getCaseById(id);

        if (caseData) {
          const caseWithExpenses = {
            ...caseData,
            expenses: caseData.expenses || [],
          };

          setCurrentCase(caseWithExpenses);
          setCases([...cases.filter((c) => c.id !== id), caseWithExpenses]);
        } else {
          navigate("/cases");
          return;
        }
      } catch (error) {
        console.error("Error loading case data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadCaseById();
  }, [id, setCases, navigate, cases]);

  return {
    loading,
    currentCase,
    activeTab,
    setActiveTab,
  };
};

export default useCaseDetail;
