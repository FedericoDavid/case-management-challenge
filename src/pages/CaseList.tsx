import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Spinner,
  Pagination,
  Button,
  Input,
} from "@nextui-org/react";
import { FiSearch, FiPlus } from "react-icons/fi";
import useStore from "../store/useStore";
import { caseService } from "../services/caseService";
import { useSortTable } from "../hooks/useSortTable";
import { Case } from "../store/useStore";
import useDebounce from "../hooks/useDebounce";
import MedicalStatusFilter from "../components/MedicalStatusFilter";

const PAGE_SIZE = 8;

const tableColumns = [
  { name: "CLIENT NAME", key: "client_name", allowsSorting: true },
  { name: "DOA", key: "doa", allowsSorting: true },
  { name: "MEDICAL STATUS", key: "medical_status", allowsSorting: true },
  { name: "CASE STATUS", key: "case_status", allowsSorting: true },
  { name: "LAW FIRM", key: "law_firm", allowsSorting: true },
];

const CaseList = () => {
  const [medicalStatusFilter, setMedicalStatusFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const navigate = useNavigate();
  const { cases, isLoading, setIsLoading } = useStore();

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  useEffect(() => {
    const loadCases = async () => {
      setIsLoading(true);

      try {
        const data = await caseService.fetchCases();

        useStore.setState({ cases: data });
      } finally {
        setIsLoading(false);
      }
    };

    loadCases();
  }, [setIsLoading]);

  const filteredCases = useMemo(() => {
    let result = [...cases];

    if (debouncedSearchTerm.trim()) {
      const query = debouncedSearchTerm.toLowerCase().trim();
      result = result.filter((c) =>
        c.client_name.toLowerCase().includes(query)
      );
    }

    if (medicalStatusFilter !== "all") {
      result = result.filter((c) => c.medical_status === medicalStatusFilter);
    }

    return result;
  }, [cases, debouncedSearchTerm, medicalStatusFilter]);

  const { sortedItems, sortDescriptor, setSortDescriptor } = useSortTable<Case>(
    {
      data: filteredCases,
      initialSortDescriptor: { column: "client_name", direction: "ascending" },
    }
  );

  const totalPages = Math.ceil(sortedItems.length / PAGE_SIZE);
  const paginatedItems = useMemo(() => {
    return sortedItems.slice(
      (currentPage - 1) * PAGE_SIZE,
      currentPage * PAGE_SIZE
    );
  }, [sortedItems, currentPage]);

  const handleRowClick = (caseId: string) => {
    navigate(`/cases/${caseId}`);
  };

  return (
    <div className="p-6">
      <div className="flex flex-col items-center">
        <div className="w-full max-w-6xl">
          <h1 className="text-3xl font-semibold text-gray-800 mb-6">Clients</h1>

          <div className="bg-white rounded-xl shadow-sm overflow-hidden p-6 mb-6">
            <div className="flex justify-between items-center mb-6">
              <MedicalStatusFilter
                selectedStatus={medicalStatusFilter}
                onStatusChange={setMedicalStatusFilter}
              />

              <div className="flex items-center">
                <Input
                  placeholder="Search Clients"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  startContent={<FiSearch className="text-gray-400" />}
                  classNames={{
                    base: "w-72",
                    inputWrapper:
                      "border-1 border-gray-200 bg-white h-10 rounded-full",
                  }}
                />
                <Button
                  className="bg-indigo-500 text-white h-10 ml-4 rounded-full"
                  startContent={<FiPlus size={18} />}
                  onPress={() => navigate("/cases/new")}
                >
                  Add Client
                </Button>
              </div>
            </div>

            <Table
              aria-label="Client cases table"
              sortDescriptor={sortDescriptor}
              onSortChange={setSortDescriptor}
              classNames={{
                wrapper: "shadow-none",
                th: "bg-transparent text-default-500 font-medium border-b border-gray-200",
                td: "py-3 text-sm",
                tr: "hover:bg-gray-50 data-[odd=true]:bg-gray-50/50",
              }}
            >
              <TableHeader columns={tableColumns}>
                {(column) => (
                  <TableColumn
                    key={column.key}
                    allowsSorting={column.allowsSorting}
                    className="uppercase text-xs font-semibold"
                  >
                    {column.name}
                  </TableColumn>
                )}
              </TableHeader>
              <TableBody
                items={paginatedItems}
                isLoading={isLoading}
                emptyContent="No clients found"
                loadingContent={<Spinner label="Loading..." />}
              >
                {(item) => {
                  const isFirstRow = item.id === "1";
                  return (
                    <TableRow
                      key={item.id}
                      className={`cursor-pointer ${
                        isFirstRow ? "bg-green-50" : ""
                      }`}
                      onClick={() => handleRowClick(item.id)}
                    >
                      <TableCell>{item.client_name}</TableCell>
                      <TableCell>{item.doa}</TableCell>
                      <TableCell>{item.medical_status}</TableCell>
                      <TableCell>{item.case_status}</TableCell>
                      <TableCell>{item.law_firm}</TableCell>
                    </TableRow>
                  );
                }}
              </TableBody>
            </Table>

            {totalPages > 1 && (
              <div className="flex justify-center mt-4">
                <Pagination
                  total={totalPages}
                  page={currentPage}
                  onChange={setCurrentPage}
                  showControls
                  classNames={{
                    wrapper: "gap-0",
                    item: "bg-transparent",
                    cursor: "bg-indigo-500 text-white",
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaseList;
