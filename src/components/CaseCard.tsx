import { Card, CardBody, CardFooter, Chip, Button } from "@nextui-org/react";
import { Link } from "react-router-dom";
import { FiEdit2, FiEye } from "react-icons/fi";

import { formatDate } from "../utils/date";
import { Case } from "../store/useStore";

const medicalStatusColorMap: Record<string, "success" | "warning" | "danger"> =
  {
    recovered: "success",
    treatment: "warning",
    critical: "danger",
  };

const caseStatusColorMap: Record<string, "primary" | "warning" | "success"> = {
  open: "primary",
  pending: "warning",
  closed: "success",
};

interface CaseCardProps {
  caseItem: Case;
}

const CaseCard: React.FC<CaseCardProps> = ({ caseItem }) => {
  const getMedicalStatusColor = (status: string) => {
    return medicalStatusColorMap[status] || "default";
  };

  const getCaseStatusColor = (status: string) => {
    return caseStatusColorMap[status] || "default";
  };

  return (
    <Card className="w-full hover:shadow-md transition-shadow">
      <CardBody className="p-4">
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-start">
            <h3 className="text-lg font-semibold truncate">
              #{caseItem.id} - {caseItem.client_name}
            </h3>
            <Chip
              color={getMedicalStatusColor(caseItem.medical_status)}
              size="sm"
              variant="flat"
            >
              {caseItem.medical_status}
            </Chip>
          </div>

          <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
            Law Firm: {caseItem.law_firm}
          </p>

          <div className="flex items-center justify-between mt-3">
            <Chip
              color={getCaseStatusColor(caseItem.case_status)}
              size="sm"
              variant="flat"
            >
              {caseItem.case_status}
            </Chip>
            <span className="text-xs text-gray-500">
              Date of Accident: {formatDate(caseItem.doa)}
            </span>
          </div>
        </div>
      </CardBody>

      <CardFooter className="gap-2 p-4 pt-0">
        <Button
          as={Link}
          to={`/cases/${caseItem.id}`}
          variant="light"
          size="sm"
          startContent={<FiEye />}
          className="flex-1"
        >
          View
        </Button>
        <Button
          as={Link}
          to={`/cases/${caseItem.id}/edit`}
          variant="light"
          size="sm"
          startContent={<FiEdit2 />}
          className="flex-1"
        >
          Edit
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CaseCard;
