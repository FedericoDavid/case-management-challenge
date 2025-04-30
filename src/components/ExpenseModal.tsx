import { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Select,
  SelectItem,
} from "@nextui-org/react";
import useStore from "../store/useStore";

interface ExpenseModalProps {
  isOpen: boolean;
  onClose: () => void;
  caseId: string;
}

const deductionTypes = [
  { value: "Not Deducted", label: "Not Deducted" },
  { value: "Client Settlement", label: "Client Settlement" },
  { value: "Law Firm", label: "Law Firm" },
  { value: "Other", label: "Other" },
];

const ExpenseModal = ({ isOpen, onClose, caseId }: ExpenseModalProps) => {
  const [expenseLabel, setExpenseLabel] = useState("");
  const [expenseAmount, setExpenseAmount] = useState("");
  const [deductionType, setDeductionType] = useState<string>("Not Deducted");

  const { addExpense } = useStore();

  const handleSubmit = () => {
    if (!expenseLabel.trim() || !expenseAmount.trim()) {
      return;
    }

    const cleanAmount = expenseAmount.replace(/^\$/, "").trim();

    if (isNaN(Number(cleanAmount))) {
      alert("Please enter a valid number");
      return;
    }

    const numericAmount = parseFloat(cleanAmount);

    addExpense(caseId, {
      label: expenseLabel,
      amount: numericAmount,
      deductedFrom: deductionType,
    });

    resetForm();
    onClose();
  };

  const resetForm = () => {
    setExpenseLabel("");
    setExpenseAmount("");
    setDeductionType("Not Deducted");
  };

  return (
    <Modal
      isOpen={isOpen}
      placement="center"
      onClose={() => {
        resetForm();
        onClose();
      }}
      onOpenChange={(open) => {
        if (!open) {
          resetForm();
          onClose();
        }
      }}
    >
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex flex-col gap-1 text-xl">
              Add Expense
            </ModalHeader>
            <ModalBody>
              <Select
                label="Deduction Type"
                placeholder="Select deduction type"
                selectedKeys={[deductionType]}
                onChange={(e) => setDeductionType(e.target.value)}
                className="mb-4"
              >
                {deductionTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </Select>
              <Input
                label="Expense Label"
                placeholder="Enter expense description"
                value={expenseLabel}
                onChange={(e) => setExpenseLabel(e.target.value)}
                className="mb-4"
              />
              <Input
                type="text"
                label="Expense Amount"
                placeholder="0.00"
                startContent="$"
                value={expenseAmount}
                onChange={(e) => setExpenseAmount(e.target.value)}
              />
            </ModalBody>
            <ModalFooter>
              <Button
                color="primary"
                className="w-full bg-indigo-600"
                onPress={handleSubmit}
              >
                Submit Expense
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ExpenseModal;
