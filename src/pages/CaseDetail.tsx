import { FiArrowLeft } from "react-icons/fi";
import { useParams, Link } from "react-router-dom";
import { Tabs, Tab, Spinner } from "@nextui-org/react";

import DetailTabContent from "../components/DetailTabContent";
import DetailExpensesTable from "../components/DetailExpensesTable";
import useCaseDetail from "../hooks/useCaseDetail";

const CaseDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { loading, currentCase, activeTab, setActiveTab } = useCaseDetail(id);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!currentCase) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-lg">
        <p className="text-gray-500">Client not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <div className="px-6 py-4 border-b border-gray-200 bg-white">
        <Link
          to="/cases"
          className="flex items-center gap-2 text-sm text-gray-600 font-medium"
        >
          <FiArrowLeft size={16} />
          Back to List
        </Link>
      </div>
      <div className="px-6 pt-4">
        <Tabs
          selectedKey={activeTab}
          onSelectionChange={(key) => setActiveTab(key as string)}
          color="primary"
          variant="underlined"
          aria-label="Case tabs"
          classNames={{
            base: "w-fit",
            tabList: "bg-white rounded-t-lg shadow-sm p-0 gap-0",
            tab: "py-4 px-8 h-full font-medium text-sm rounded-t-lg data-[selected=true]:bg-white data-[selected=true]:text-indigo-600 data-[selected=false]:bg-gray-100 data-[selected=false]:text-gray-600",
            tabContent: "",
            cursor: "bg-indigo-600 h-1",
            panel: "py-0",
          }}
        >
          <Tab key="details" title="Details" />
          <Tab key="expenses" title="Expenses" />
        </Tabs>
      </div>
      <div className="px-6 pb-6">
        <div className="bg-white rounded-b-lg shadow-sm p-6">
          {activeTab === "details" ? (
            <DetailTabContent caseData={currentCase} />
          ) : (
            <DetailExpensesTable caseData={currentCase} />
          )}
        </div>
      </div>
    </div>
  );
};

export default CaseDetail;
