import { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Button,
  useDisclosure,
  Selection,
} from "@nextui-org/react";
import { FiPlus, FiTrash2 } from "react-icons/fi";

import ExpenseModal from "./ExpenseModal";

import useStore, { Case, Expense } from "../store/useStore";
import { useSortTable } from "../hooks/useSortTable";

interface DetailExpensesTableProps {
  caseData: Case;
}

const columns = [
  { name: "", key: "selection", allowsSorting: false },
  { name: "LABEL", key: "label", allowsSorting: true },
  { name: "AMOUNT", key: "amount", allowsSorting: true },
  { name: "DEDUCTED FROM", key: "deductedFrom", allowsSorting: true },
];

const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
};

const DetailExpensesTable = ({ caseData }: DetailExpensesTableProps) => {
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]));
  const [localExpenses, setLocalExpenses] = useState<Expense[]>(
    caseData.expenses || []
  );

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { cases, removeExpenses } = useStore();

  const selectionSize =
    selectedKeys === "all" ? localExpenses.length : selectedKeys.size;

  const { sortedItems, sortDescriptor, setSortDescriptor } =
    useSortTable<Expense>({
      data: localExpenses,
      initialSortDescriptor: { column: "label", direction: "ascending" },
    });

  const handleDeleteSelected = () => {
    if (selectedKeys === "all" || selectedKeys.size > 0) {
      const selectedKeyArray =
        selectedKeys === "all"
          ? localExpenses.map((expense) => expense.id)
          : Array.from(selectedKeys).map((key) => String(key));

      removeExpenses(caseData.id, selectedKeyArray);
      setSelectedKeys(new Set([]));
    }
  };

  useEffect(() => {
    const updatedCase = cases.find((c) => c.id === caseData.id);
    if (updatedCase) {
      setLocalExpenses(updatedCase.expenses || []);
    }
  }, [cases, caseData.id]);

  return (
    <div>
      <div className="flex justify-end gap-2 mb-2">
        {selectionSize > 0 && (
          <Button
            color="danger"
            variant="light"
            className="font-medium bg-pink-50"
            startContent={<FiTrash2 size={18} className="text-danger" />}
            onPress={handleDeleteSelected}
          >
            Delete
          </Button>
        )}
        <Button
          color="primary"
          className="bg-indigo-600 font-medium"
          startContent={<FiPlus size={18} />}
          onPress={onOpen}
        >
          Add Expense
        </Button>
      </div>
      <Table
        aria-label="Expenses table"
        sortDescriptor={sortDescriptor}
        onSortChange={setSortDescriptor}
        selectedKeys={selectedKeys}
        onSelectionChange={setSelectedKeys}
        selectionMode="multiple"
        classNames={{
          wrapper: "shadow-none",
          th: "bg-transparent text-default-500 font-medium border-b border-gray-200",
          td: "py-3 text-sm",
          tr: "hover:bg-gray-50 data-[odd=true]:bg-gray-50/50",
        }}
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn
              key={column.key}
              allowsSorting={column.allowsSorting}
              className={`uppercase text-xs font-semibold ${
                column.key === "selection" ? "w-10" : ""
              }`}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={sortedItems} emptyContent="No expenses found">
          {(item: Expense) => (
            <TableRow key={item.id}>
              <TableCell>{null}</TableCell>
              <TableCell>{item.label}</TableCell>
              <TableCell>{formatCurrency(item.amount)}</TableCell>
              <TableCell>{item.deductedFrom}</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <ExpenseModal isOpen={isOpen} onClose={onClose} caseId={caseData.id} />
    </div>
  );
};

export default DetailExpensesTable;
