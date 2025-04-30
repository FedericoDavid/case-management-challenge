import { FiBriefcase } from "react-icons/fi";
import { Case } from "../store/useStore";
import { ReactNode } from "react";

interface DetailTabContentProps {
  caseData: Case;
}

interface InfoBoxProps {
  label: string;
  value: string | ReactNode;
  icon?: ReactNode;
  isTitle?: boolean;
}

const InfoBox = ({ label, value, icon, isTitle = false }: InfoBoxProps) => {
  return (
    <div className="mb-10 flex items-start">
      {icon && <div className="mr-3 mt-1">{icon}</div>}
      <div className={icon ? "" : "w-full"}>
        <h3 className="text-sm uppercase text-gray-500 font-medium mb-2">
          {label}
        </h3>
        {isTitle ? (
          <p className="text-xl font-semibold">{value}</p>
        ) : (
          <p className="text-lg">{value}</p>
        )}
      </div>
    </div>
  );
};

const DetailTabContent = ({ caseData }: DetailTabContentProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
      <div>
        <InfoBox
          label="Client Name:"
          value={`#${caseData.id} - ${caseData.client_name}`}
          isTitle={true}
        />
        <InfoBox
          label="Date of Birth:"
          value={(caseData.date_of_birth as string) || "Not specified"}
        />
        <InfoBox label="Medical Status:" value={caseData.medical_status} />
      </div>

      <div>
        <InfoBox
          label="Law Firm"
          value={caseData.law_firm}
          icon={<FiBriefcase size={20} className="text-gray-400" />}
        />
        <InfoBox label="Date of Incident:" value={caseData.doa} />
        <InfoBox label="Case Status:" value={caseData.case_status} />
      </div>
    </div>
  );
};

export default DetailTabContent;
