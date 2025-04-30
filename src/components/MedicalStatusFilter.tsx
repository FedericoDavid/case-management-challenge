import {
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { FiFilter } from "react-icons/fi";

interface MedicalStatusOption {
  key: string;
  label: string;
}

const MEDICAL_STATUS_OPTIONS: MedicalStatusOption[] = [
  { key: "all", label: "All Statuses" },
  { key: "Ready for Assignment", label: "Ready for Assignment" },
  { key: "Signed", label: "Signed" },
  { key: "Scheduled", label: "Scheduled" },
];

interface MedicalStatusFilterProps {
  selectedStatus: string;
  onStatusChange: (status: string) => void;
}

const MedicalStatusFilter: React.FC<MedicalStatusFilterProps> = ({
  selectedStatus,
  onStatusChange,
}) => {
  return (
    <div className="flex items-center gap-4">
      <Dropdown>
        <DropdownTrigger>
          <Button
            startContent={<FiFilter size={18} />}
            className="bg-lavender-100 text-indigo-600 border-none h-10 rounded-full"
            variant="flat"
          >
            Filter by Medical Status
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Medical Status Filter"
          onAction={(key) => onStatusChange(key as string)}
          selectedKeys={[selectedStatus]}
          selectionMode="single"
        >
          {MEDICAL_STATUS_OPTIONS.map((option) => (
            <DropdownItem key={option.key}>{option.label}</DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

export default MedicalStatusFilter;
