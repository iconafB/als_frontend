// DMARecordsTable.tsx
import { useEffect, useMemo, useState } from "react";
import {
  Alert,
  Badge,
  Group,
  Loader,
  Pagination,
  Paper,
  Select,
  Table,
  Text,
  TextInput,
} from "@mantine/core";
import { AlertCircle, Search } from "lucide-react";
import type { PaginatedDMARecordInterface, DMARecordBaseInterface } from "../api/dma/types";
import { useGetDMARecords, useSearchDMARecords } from "../hooks/dmaHooks";

const formatDateOnly = (isoDate: string): string => {
  if (!isoDate) return "";
  return isoDate.split("T")[0]; // YYYY-MM-DD
};

const dedupeStatusColor = (status: string) => {
  const s = (status || "").toLowerCase();
  if (s.includes("complete")) return "green";
  if (s.includes("ready")) return "blue";
  if (s.includes("incomplete") || s.includes("not")) return "red";
  return "gray";
};

const processedColor = (isProcessed: boolean) => (isProcessed ? "green" : "gray");

const DMARecordsTable = () => {
  const [auditIdFilter, setAuditIdFilter] = useState("");
  const [campaignCode, setCampaignCode] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // search query (debounced inside hook)
  const searchHook = useSearchDMARecords(
    {
      page: currentPage,
      page_size: pageSize,
      audit_id: auditIdFilter,
      campaign_code: campaignCode,
    },
    { debouncedMs: 500, minLength: 1 }
  );

  // all records query
  const allRecordsQuery = useGetDMARecords(currentPage, pageSize);

  // active query (search takes precedence when filters exist)
  const activeQuery = searchHook.shouldSearch ? searchHook.query : allRecordsQuery;

  const { data, isLoading, error, isFetching } = activeQuery as unknown as {
    data: PaginatedDMARecordInterface | undefined;
    isLoading: boolean;
    error: Error | null;
    isFetching: boolean;
  };

  // reset page to 1 when debounced filters change
  useEffect(() => {
    if (searchHook.shouldSearch) setCurrentPage(1);
  }, [searchHook.debounced?.audit_id, searchHook.debounced?.campaign_code, searchHook.shouldSearch]);

  const records: DMARecordBaseInterface[] = data?.results ?? [];

  // backend-driven total pages
  const totalPages = useMemo(() => {
    const total = data?.total ?? 0;
    return Math.max(1, Math.ceil(total / pageSize));
  }, [data?.total, pageSize]);

  // if filters shrink results and current page becomes invalid, snap back
  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalPages]);

  const hasFilters = !!auditIdFilter.trim() || !!campaignCode.trim();

  const clearFilters = () => {
    setAuditIdFilter("");
    setCampaignCode("");
    setCurrentPage(1);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <Loader size="lg" />
          <Text mt="md" c="dimmed">
            Loading DMA Records…
          </Text>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <Alert icon={<AlertCircle size={16} />} title="Error" color="red">
        Failed to load DMA records.
      </Alert>
    );
  }

  const rows = records.map((record) => (
    <Table.Tr key={record.pk} className="hover:bg-gray-50 transition-colors duration-200">
      <Table.Td className="font-medium">
        <Badge variant="light" color="blue" p={18}>
          {record.audit_id}
        </Badge>
      </Table.Td>

      <Table.Td className="font-medium">
        <Badge variant="light" color="purple" p={18}>
          {record.number_of_records}
        </Badge>
      </Table.Td>

      <Table.Td className="font-medium">
        <Badge variant="light" color="grape" p={18}>
          {record.notification_email}
        </Badge>
      </Table.Td>

      <Table.Td className="font-medium">
        <Badge variant="light" p={18}>
          {record.camp_code}
        </Badge>
      </Table.Td>

      <Table.Td className="font-medium">
        <Badge variant="light" color={dedupeStatusColor(record.dedupe_status)} p={18}>
          {record.dedupe_status}
        </Badge>
      </Table.Td>

      <Table.Td className="font-medium">
        <Badge variant="light" color="cyan" p={18}>
          {formatDateOnly(record.created_at)}
        </Badge>
      </Table.Td>

      <Table.Td className="font-medium">
        <Badge variant="light" color={processedColor(record.is_processed)} p={18}>
          {record.is_processed ? "True" : "False"}
        </Badge>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <div className="space-y-6">
      <Paper shadow="sm" className="overflow-hidden">
        {/* Filters */}
        <Paper shadow="xs" p="xl">
          <Group justify="space-between" align="flex-end" wrap="wrap" gap="md">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <TextInput
                label="Audit ID"
                leftSection={<Search size={16} />}
                value={auditIdFilter}
                onChange={(e) => setAuditIdFilter(e.currentTarget.value)}
                placeholder="e.g. 9471743"
                w={320}
              />

              <TextInput
                label="Campaign Code"
                leftSection={<Search size={16} />}
                value={campaignCode}
                onChange={(e) => setCampaignCode(e.currentTarget.value)}
                placeholder="e.g. MIWAY"
                w={320}
              />
            </div>

            <Select
              label="Page size"
              value={pageSize.toString()}
              onChange={(value) => {
                setPageSize(Number(value));
                setCurrentPage(1);
              }}
              data={[
                { value: "5", label: "5 per page" },
                { value: "10", label: "10 per page" },
                { value: "25", label: "25 per page" },
                { value: "50", label: "50 per page" },
              ]}
              size="sm"
              w={180}
            />
          </Group>

          {hasFilters && (
            <Group mt="md">
              <Text size="sm" c="dimmed">
                Filters applied
              </Text>
              <button
                type="button"
                onClick={clearFilters}
                className="text-blue-500 hover:text-blue-800 text-sm font-medium transition-colors"
              >
                Clear filters
              </button>
            </Group>
          )}
        </Paper>

        {/* Table */}
        <Paper>
          <Table.ScrollContainer minWidth={1050}>
            <Table highlightOnHover verticalSpacing="sm" mt={12}>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>AUDIT ID</Table.Th>
                  <Table.Th>NUMBER OF RECORDS</Table.Th>
                  <Table.Th>NOTIFICATION EMAIL</Table.Th>
                  <Table.Th>CAMPAIGN CODE</Table.Th>
                  <Table.Th>DEDUPE STATUS</Table.Th>
                  <Table.Th>CREATED AT</Table.Th>
                  <Table.Th>IS PROCESSED</Table.Th>
                </Table.Tr>
              </Table.Thead>

              <Table.Tbody>
                {rows.length > 0 ? (
                  rows
                ) : (
                  <Table.Tr>
                    <Table.Td colSpan={7} className="text-center py-8">
                      <Text c="dimmed" size="sm">
                        No results found.
                      </Text>
                    </Table.Td>
                  </Table.Tr>
                )}
              </Table.Tbody>
            </Table>
          </Table.ScrollContainer>

          {/* Pagination */}
          <div className="border-t border-gray-200 px-4 py-3">
            <Group justify="center">
              <Pagination
                value={currentPage}
                onChange={setCurrentPage}
                total={totalPages}
                withEdges
                disabled={totalPages <= 1}
              />
            </Group>

            <Text size="sm" c="dimmed" ta="center" mt="xs">
              Page {currentPage} of {totalPages} — total {data?.total ?? 0} records
              {isFetching ? " (updating…)" : ""}
            </Text>
          </div>
        </Paper>
      </Paper>
    </div>
  );
};

export default DMARecordsTable;
