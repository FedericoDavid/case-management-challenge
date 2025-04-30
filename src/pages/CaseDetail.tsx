import { useEffect, useState } from "react";
import { FiArrowLeft } from "react-icons/fi";
import { useParams, useNavigate } from "react-router-dom";
import { Tabs, Tab, Button, Spinner } from "@nextui-org/react";

import { caseService } from "../services/caseService";
import { Case } from "../store/useStore";

const CaseDetail = () => {
  const [caseData, setCaseData] = useState<Case | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<string>("details");

  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCaseData = async () => {
      if (!id) return;

      setLoading(true);

      try {
        const data = await caseService.getCaseById(id);

        if (data) setCaseData(data);
      } catch (error) {
        console.error("Error fetching case data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCaseData();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!caseData) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-lg">
        <p className="text-gray-500">Client not found.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4">
        <Button
          startContent={<FiArrowLeft />}
          variant="light"
          onPress={() => navigate(-1)}
        >
          Back to List
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow">
        <Tabs
          selectedKey={activeTab}
          onSelectionChange={(key) => setActiveTab(key as string)}
          className="p-4"
        >
          <Tab key="details" title="Details">
            <div className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-gray-500 text-sm">Client Name:</h3>
                  <p className="text-lg font-semibold">
                    {caseData.client_name}
                  </p>
                </div>

                <div>
                  <h3 className="text-gray-500 text-sm">Law Firm</h3>
                  <p className="text-lg">{caseData.law_firm}</p>
                </div>

                <div>
                  <h3 className="text-gray-500 text-sm">Date of Birth:</h3>
                  <p className="text-lg">
                    {caseData.id === "9" ? "10/1/1971" : "N/A"}
                  </p>
                </div>

                <div>
                  <h3 className="text-gray-500 text-sm">Date of Incident:</h3>
                  <p className="text-lg">
                    {caseData.id === "9" ? "12/29/2023" : caseData.doa}
                  </p>
                </div>

                <div>
                  <h3 className="text-gray-500 text-sm">Medical Status:</h3>
                  <p className="text-lg">{caseData.medical_status}</p>
                </div>

                <div>
                  <h3 className="text-gray-500 text-sm">Case Status:</h3>
                  <p className="text-lg">{caseData.case_status}</p>
                </div>
              </div>
            </div>
          </Tab>
          <Tab key="expenses" title="Expenses">
            <div className="p-4">
              <div className="flex justify-end mb-4">
                <Button color="primary" className="bg-indigo-500">
                  Add Expense
                </Button>
              </div>

              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">Label</th>
                    <th className="text-left p-2">Amount</th>
                    <th className="text-left p-2">Deducted From</th>
                  </tr>
                </thead>
                <tbody>
                  {caseData.id === "9" ? (
                    <>
                      <tr className="border-b">
                        <td className="p-2">Lyft 05/12/2024</td>
                        <td className="p-2">$54.12</td>
                        <td className="p-2">Client Settlement</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2">Lyft 05/02/2024</td>
                        <td className="p-2">$38.23</td>
                        <td className="p-2">Client Settlement</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2">Lyft 04/23/2024</td>
                        <td className="p-2">$20.39</td>
                        <td className="p-2">Client Settlement</td>
                      </tr>
                    </>
                  ) : (
                    <tr>
                      <td className="p-2 text-center" colSpan={3}>
                        No expenses found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
};

export default CaseDetail;
