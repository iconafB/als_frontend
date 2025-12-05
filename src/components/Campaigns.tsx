import { useState, useMemo, useEffect } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import {Table, TextInput, Loader, Stack, Flex, Alert, Paper,Group, Text, Badge, Select, Pagination, Container, Button, Modal} from "@mantine/core";
import { AlertCircle, Plus, Search } from "lucide-react";
import { useDisclosure } from "@mantine/hooks";
import { CreateCampaign } from "./CreateCampaign";
import { campaigns_api } from "../api/campaigns/campaigns";
import type { get_all_campaigns,create_campaign } from "../api/campaigns/types";
import { LoadCampaignModal } from "./Campaigns/LoadCampaignModal";


const Campaigns = () => {
  const [campaignPage, setCampaignPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const [campaignName, setcampaignName] = useState("")

  const [campaignCode, setCampaignCode] = useState("")

  // Filters
  const [searchCampaigns, setSearchCampaigns] = useState("");
  const [campaignNameFilter, setCampaignNameFilter] = useState("");
  const [branchFilter, setBranchFilter] = useState("");
  const [campaignCodesFilter, setCampaignCodesFilter] = useState("");
  const [openedCreate, { open: openCreate, close: closeCreate }]=useDisclosure(false);
  //const [openedLoadCampaign,{ open: openLoadCampaign, close: closeLoadCampaign }] = useDisclosure(false);
  const [selectedRow, setSelectedRow] = useState<any>(null)

  const [openCampaignLoadingModal, setOpenCampaignLoadingModal] = useState(false)

  // Fetch campaigns
  const {
    data: campaigns_data,
    isLoading: isLoadingCampaigns,
    error: allCampaignsError,
  } = useQuery<get_all_campaigns, Error>({
    queryKey: ["campaigns", campaignPage, pageSize],
    queryFn: () => campaigns_api.get_all_campaigns(campaignPage, pageSize),
    placeholderData: keepPreviousData,
  });


  

  // Filter Logic
  const filteredCampaigns = useMemo(() => {
    if (!campaigns_data?.results) return [];

    return campaigns_data?.results.filter((campaign:create_campaign) => {
      const fullText = Object.values(campaign).join(" ").toLowerCase();

      const matchSearch =
        !searchCampaigns ||
        fullText.includes(searchCampaigns.toLowerCase());

      const matchName =
        !campaignNameFilter ||
        campaign.campaign_name
          .toLowerCase()
          .includes(campaignNameFilter.toLowerCase());

      const matchBranch =
        !branchFilter ||
        campaign.branch.toLowerCase().includes(branchFilter.toLowerCase());

      const matchCode =
        !campaignCodesFilter ||
        campaign.camp_code
          .toLowerCase()
          .includes(campaignCodesFilter.toLowerCase());

      return matchSearch && matchName && matchBranch && matchCode;
    });
  }, [
    campaigns_data,
    searchCampaigns,
    campaignNameFilter,
    branchFilter,
    campaignCodesFilter,
  ]);

  // Reset page when filters change
  useEffect(() => {
    setCampaignPage(1);
  }, [searchCampaigns, campaignNameFilter, branchFilter, campaignCodesFilter]);

  const clearCamapignsFilters = () => {
    setSearchCampaigns("");
    setCampaignNameFilter("");
    setCampaignCodesFilter("");
    setBranchFilter("");
    setCampaignPage(1);
  };




  if (isLoadingCampaigns) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader size="lg" color="green" />
        <Text mt="md" c="dimmed">
          Loading Campaign Data...
        </Text>
      </div>
    );
  }

  if (allCampaignsError) {
    return (
      <Alert icon={<AlertCircle size={16} />} title="Error" color="red">
        Failed To Load Campaigns
      </Alert>
    );
  }

  const rows = filteredCampaigns.map((campaign) => (
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
        <Button size="xs" variant="light" onClick={()=>{ 
          setSelectedRow({
            branch:campaign.branch,
            camp_code:campaign.camp_code,
            campaign_name:campaign.campaign_name
          })
          setOpenCampaignLoadingModal(true)

          }}>
          LOAD CAMPAIGN
        </Button>
      </Table.Td>
      <Table.Td>
        <Button>
            ACTIONS
        </Button>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <div className="space-y-6">
      {/* Search & Create Section */}
      <Paper p="md" shadow="sm" className="bg-white">
        <Container className="flex justify-start items-start gap-2">
          {/* Create Campaign Modal */}
          <Modal
            opened={openedCreate}
            onClose={closeCreate}
            title={
              <Text size="xl" c="green" fw={500}>
                CREATE CAMPAIGN
              </Text>
            }
            centered
            size="lg"
            radius={12}
          >
            <CreateCampaign />
          </Modal>

          <Button variant="green" onClick={openCreate} leftSection={<Plus />}>
            CREATE CAMPAIGN
          </Button>
        </Container>

        {/* Filters */}
        <Group mb="md" justify="space-between">
          <Text size="lg" fw={600}>
            Campaigns Table
          </Text>

          <Group gap="sm">
            <Badge color="blue" variant="light" p={18}>
              {filteredCampaigns.length} Results
            </Badge>

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

        {/* Filters Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <TextInput
            placeholder="Search all fields..."
            leftSection={<Search size={16} />}
            value={searchCampaigns}
            onChange={(e) => setSearchCampaigns(e.target.value)}
            label="Search All Fields"
          />

          <TextInput
            placeholder="Filter by Campaign Name"
            leftSection={<Search size={16} />}
            value={campaignNameFilter}
            onChange={(e) => setCampaignNameFilter(e.target.value)}
            label="Campaign Name"
          />

          <TextInput
            placeholder="Filter by Branch"
            leftSection={<Search size={16} />}
            value={branchFilter}
            onChange={(e) => setBranchFilter(e.target.value)}
            label="Branch"
          />

          <TextInput
            placeholder="Filter by Campaign Code"
            leftSection={<Search size={16} />}
            value={campaignCodesFilter}
            onChange={(e) => setCampaignCodesFilter(e.target.value)}
            label="Campaign Code"
          />
        </div>

        {(searchCampaigns ||
          campaignNameFilter ||
          branchFilter ||
          campaignCodesFilter) && (
          <Group mt="md" justify="space-between">
            <Text size="sm" c="dimmed">
              Active Filters Applied
            </Text>
            <button
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
                <Table.Th>ACTIONS</Table.Th>
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
        <div className="border-t border-gray-200 px-4 bg-gray-50 py-3">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <div className="flex justify-center w-full">
                <Pagination
                  value={campaignPage}
                  onChange={setCampaignPage}
                  total={campaigns_data?.total ?? 1}
                  withEdges
                />
            </div>
          </div>
        </div>
      </Paper>

      {/* Load Campaign Modal */}
      {/* <Modal
        opened={openedLoadCampaign}
        onClose={closeLoadCampaign}
        title="Load Campaign"
        size="lg"
        withCloseButton={false}
      > */}

       <LoadCampaignModal opened={openCampaignLoadingModal} onClose={()=>setOpenCampaignLoadingModal(false)} row={selectedRow}/>

      {/* </Modal> */}
    </div>
  );
};

export default Campaigns;
