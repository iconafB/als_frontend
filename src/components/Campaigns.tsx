import { useState, useMemo, useEffect } from "react";
import {Table,TextInput,Loader,Alert,Paper,Group,Text,Badge,Select,Pagination,Container,Button,Modal, Stack,} from "@mantine/core";
import { AlertCircle, Search } from "lucide-react";
import { useFetchCampaigns,useSearchCampaigns } from "../hooks/useCampaigns";
import type { create_campaign, get_all_campaigns } from "../api/campaigns/types";
import { LoadCampaignModal } from "./Campaigns/LoadCampaignModal";
import CreateCampaignsFlow from "./WizardModalForms/CreateCampaignsFlow";

import { useCurrentUserAdmin } from "../hooks/useAuth";


const Campaigns = () => {
  
  const [campaignPage, setCampaignPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [campaignNameFilter, setCampaignNameFilter] = useState("");
  const [branchFilter, setBranchFilter] = useState("");
  const [campaignCodesFilter, setCampaignCodesFilter] = useState("");
  const {data:user}=useCurrentUserAdmin()

  const allCampaignsQuery = useFetchCampaigns(campaignPage, pageSize);

  const search = useSearchCampaigns(
    {
      page: campaignPage,
      page_size: pageSize,
      campaign_name: campaignNameFilter,
      branch: branchFilter,
      camp_code: campaignCodesFilter,
    },
    { debouncedMs: 500, minLength: 1 }
  );
  

  const activeQuery = search.shouldSearch ? search.query : allCampaignsQuery;

  const { data, isLoading, error } = activeQuery as unknown as {
    data: get_all_campaigns | undefined;
    isLoading: boolean;
    error: Error | null;
  };

  useEffect(() => {
    if (search.shouldSearch) setCampaignPage(1);
  }, [
    search.debounced.campaign_name,
    search.debounced.branch,
    search.debounced.camp_code,
    search.shouldSearch,
  ]);
  
  const campaigns = data?.results ?? [];

  const totalPages = useMemo(() => {
    const totalRecords = data?.total ?? 0;
    return Math.max(1, Math.ceil(totalRecords / pageSize));
  }, [data?.total, pageSize]);

  const clearCamapignsFilters = () => {
    setCampaignNameFilter("");
    setCampaignCodesFilter("");
    setBranchFilter("");
    setCampaignPage(1);
  };

  const hasFilters =
    !!campaignNameFilter.trim() ||
    !!branchFilter.trim() ||
    !!campaignCodesFilter.trim();

  // Modals / UI state
  const [selectedRow, setSelectedRow] = useState<any>(null);
  const [openCampaignLoadingModal, setOpenCampaignLoadingModal] =
    useState(false);

  const [flowOpen, setFlowOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Stack>
          <Loader size="lg" color="green" />
          {/* <Text mt="md" c="dimmed">
            Loading Campaign Data...
          </Text> */}
        </Stack>
      </div>
    );
  }

  if (error) {
    return (
      <Alert icon={<AlertCircle size={16} />} title="Error" color="red">
        Failed To Load Campaigns
      </Alert>
    );
  }

  const rows = campaigns.map((campaign: create_campaign) => (
    <Table.Tr
      key={campaign.camp_code}
      className="hover:bg-gray-50 transition-colors"
    >
      <Table.Td>
        <Badge variant="light" color="purple" p={18}>
          {campaign.campaign_name}
        </Badge>
      </Table.Td>

      <Table.Td>
        <Badge variant="light" color="green" p={18}>
          {campaign.camp_code}
        </Badge>
      </Table.Td>

      <Table.Td>
        <Badge variant="light" color="blue">
          {campaign.branch}
        </Badge>
      </Table.Td>

      <Table.Td>
        <Button
          size="xs"
          variant="light"
          onClick={() => {
            setSelectedRow({
              branch: campaign.branch,
              camp_code: campaign.camp_code,
              campaign_name: campaign.campaign_name,
            });
            setOpenCampaignLoadingModal(true);
          }}
        >
          LOAD CAMPAIGN
        </Button>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <div className="space-y-6">

      {/* Search & Create Section */}
      <Paper p="md" shadow="sm" className="bg-white">
        <Container className="flex justify-start items-start gap-2">
          {/* Parent Modal */}
          <Modal opened={modalOpen} onClose={() => setModalOpen(false)}>
            <CreateCampaignsFlow
              opened={flowOpen}
              onClose={() => {
                setFlowOpen(false);
                setModalOpen(false);
              }}
            />
          </Modal>
        </Container>

        {/* Header + Controls */}
        <Group mb="md" justify="space-between">
          <Text size="lg" fw={600}>
            Campaigns Table
          </Text>
          {user?.is_admin &&
          <Button
            onClick={() => {
              setModalOpen(true);
              setFlowOpen(true);
            }}
            variant="filled"
            color="blue"
          >
            CREATE CAMPAIGN AND CAMPAIGN RULE
          </Button>
          }
          <Group gap="sm">
           {/*  <Badge color="blue" variant="light" p={18}>
              {data?.total ?? 0} Total
            </Badge>
 */}
            <Select
              value={pageSize.toString()}
              onChange={(value) => {
                setPageSize(Number(value));
                setCampaignPage(1);
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
        </Group>

        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

          <TextInput
            placeholder="Search by Campaign Name"
            leftSection={<Search size={16} />}
            value={campaignNameFilter}
            onChange={(e) => setCampaignNameFilter(e.currentTarget.value)}
            label="Campaign Name"
            size="md"
            radius="md"
          />

          <TextInput
            placeholder="Search by Campaign Code"
            leftSection={<Search size={16} />}
            value={campaignCodesFilter}
            onChange={(e) => setCampaignCodesFilter(e.currentTarget.value)}
            label="Campaign Code"
            size="md"
            radius="md"
          />

           <TextInput
            placeholder="Search by Branch"
            leftSection={<Search size={16} />}
            value={branchFilter}
            onChange={(e) => setBranchFilter(e.currentTarget.value)}
            label="Branch"
            size="md"
            radius="md"
          />

        </div>

        {hasFilters && (
          <Group mt="md" justify="space-between">
            <Text size="sm" c="dimmed">
              Active Filters Applied
            </Text>
            <button
            type="button"
              onClick={clearCamapignsFilters}
              className="text-blue-500 hover:text-blue-800"
            >
              Clear All Filters
            </button>
          </Group>
        )}
      </Paper>

      {/* Table */}
      <Paper shadow="sm">
        <Table.ScrollContainer minWidth={500}>
          <Table highlightOnHover verticalSpacing="sm">
            <Table.Thead>
              <Table.Tr className="bg-gray-500">
                <Table.Th>CAMPAIGN NAME</Table.Th>
                <Table.Th>CAMPAIGN CODES</Table.Th>
                <Table.Th>BRANCH</Table.Th>
                <Table.Th>LOAD CAMPAIGN</Table.Th>
              </Table.Tr>
            </Table.Thead>

            <Table.Tbody>
              {rows.length > 0 ? (
                rows
              ) : (
                <Table.Tr>
                  <Table.Td colSpan={4} className="text-center py-8">
                    <Text c="dimmed">No result found</Text>
                  </Table.Td>
                </Table.Tr>
              )}
            </Table.Tbody>
          </Table>
        </Table.ScrollContainer>

        {/* Pagination Footer */}

        <div className="border-t border-gray-200 px-4 py-3">

          <div className="flex justify-center w-full">
            <Pagination
              value={campaignPage}
              onChange={setCampaignPage}
              total={totalPages}
              withEdges
            />
          </div>

        </div>

      </Paper>

      {/* Load Campaign Modal */}
      <LoadCampaignModal
        opened={openCampaignLoadingModal}
        onClose={() => setOpenCampaignLoadingModal(false)}
        row={selectedRow}
      />

    </div>
  );
};

export default Campaigns;
