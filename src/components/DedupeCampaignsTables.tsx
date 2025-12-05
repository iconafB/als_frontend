
import { useState,useMemo,useEffect } from "react"
import { Loader,Stack,Paper,NumberInput ,Table,TextInput,Text,Alert,Badge,Select,Group,Pagination, Button,Modal,Flex, Grid } from "@mantine/core"
import { AlertCircle, Search } from "lucide-react"
import { fetchDedupeCampaign } from "../api/deduped_campaigns_mock_api"
import { useDisclosure } from "@mantine/hooks"
import { useQuery,useMutation } from "@tanstack/react-query"
import { IconMoneybag,IconBuildingEstate,IconBadgeAd,IconX } from "@tabler/icons-react"


const DedupedCampaignTable = () => {

      const [searchTerm, setSearchTerm] = useState('')
      const [campaignNameFilter, setCampaignNameFilter] = useState('')
      const [campaignCodeFilter, setCampaignCodeFilter] = useState('')
      const [branchFilter, setBranchFilter] = useState('')
      const [leadsFilter, setLeadsFilter] = useState(0)
      const [createdAtFilter, setCreatedAtFilter] = useState('')
      const [currentPage, setCurrentPage] = useState(1);
      const [pageSize, setPageSize] = useState(10);

      const [openedLoadCampaign,{open:openLoadCampaign,close:closeLoadCampaign}]=useDisclosure(false)
     
      const {data:dma_records=[],error,isLoading}=useQuery({
          queryKey:['dedupe_campaign'],
          queryFn:fetchDedupeCampaign
      })
  
      const filteredRecords = useMemo(() => {

          return dma_records.filter((record) => {
            const matchesSearch = searchTerm === '' || 
              Object.values(record).some(value => value.toString().toLowerCase().includes(searchTerm.toLowerCase()));
      
            const matchesCampaignName = campaignNameFilter === '' || record.campaign_name.toLowerCase().includes(campaignNameFilter.toLowerCase());
        
            const matchesCampaignCode = campaignCodeFilter === '' || record.campaign_code.toLowerCase().includes(campaignCodeFilter.toLowerCase());
        
            const matchesCreatedAt = createdAtFilter === '' || record.created_at.toLowerCase().includes(createdAtFilter.toLowerCase());

            const matchesLeads = leadsFilter === 0 || record.leads==leadsFilter;
            
            const matchesBranch = branchFilter === '' || record.branch.toLowerCase().includes(branchFilter.toLowerCase());

            return matchesSearch && matchesCampaignName &&  matchesCampaignCode && matchesCreatedAt &&  matchesLeads &&  matchesBranch ;
      });

    }, [dma_records, searchTerm, campaignNameFilter,  campaignCodeFilter, createdAtFilter, leadsFilter, branchFilter]);


      const paginatedRecords = useMemo(() => {
  
          const startIndex = (currentPage - 1) * pageSize;
          const endIndex = startIndex + pageSize;

          return filteredRecords.slice(startIndex, endIndex);
  
      },[filteredRecords, currentPage, pageSize]);
  
      const totalPages = Math.ceil(filteredRecords.length / pageSize);
      
     useEffect(() => {
      setCurrentPage(currentPage);
    }, [searchTerm, campaignNameFilter, campaignCodeFilter, createdAtFilter,branchFilter,leadsFilter]);
  
  
    const clearFilters = () => {
        setSearchTerm('');
        setCampaignNameFilter(''),
        setCampaignCodeFilter(''),
        setBranchFilter(''),
        setLeadsFilter(0),
        setCreatedAtFilter('')

    };


  if(isLoading){
    
        return(
            <div className="flex justify-center items-center h-64">
                <div className="text-center">
                    <Loader size="lg" color="green"/>
                    <Text mt="md" c="dimmed">Loading Dedupe Campaigns....</Text>
                </div>
            </div>
        )
    
   }


 if(error){
    return(
        <Alert icon={<AlertCircle size={16}/>} title="Error" color="red">
            Failed To Load Dedupe Campaign  Data
        </Alert>
    )
 }


  const rows=paginatedRecords.map((record)=>(
    
     <Table.Tr className="hover:bg-gray-50 transition-colors duration-200" key={record.id}>
         <Table.Td className="font-medium">
          <Badge variant="light" color="blue" p={18}>
             {record.id}
          </Badge>
         </Table.Td>
         <Table.Td className="font-medium">
             <Badge variant="light" color="purple" p={18}>
                {record.campaign_name}
             </Badge>
         </Table.Td>
         <Table.Td className="foont-medium">
             <Badge variant="light" color="blue" p={18}>
                 {record.campaign_code}
             </Badge>
         </Table.Td>
         <Table.Td className="font-medium">
              <Badge variant="light" color="orange" p={18} >
                 {record.branch}
            </Badge>
         </Table.Td>
         <Table.Td className="font-medium">
           <Button variant="outline" color="blue"  onClick={openLoadCampaign}>
                Load Campaign
           </Button>
         </Table.Td>
         <Table.Td className="font-medium">
              <Badge variant="light" color="green" p={18}>
                {record.leads}
              </Badge>
         </Table.Td>
         <Table.Td className="font-medium">
             <Badge variant="light" color="purple" p={18}>
                 {record.created_at}
             </Badge>
         </Table.Td>
     </Table.Tr>
  ));

  return (
    <div className="space-y-6">
        <Paper shadow="sm" className="overflow-hidden">
          <Paper shadow="xs" p="xl">
            <Group mb="mb" justify="space-between">
              <div className="flex justify-between items-center">

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 shadow-xs">
                    <TextInput
                        label="Search Records"
                        leftSection={<Search size={16}/>}
                        className="col-span-full lg:col-span-1 -mt-0"
                        value={searchTerm}
                        onChange={(event)=>{
                          setSearchTerm(event.currentTarget.value)
                        }}
                        placeholder="enter campaign name,code,brach,leads number,or date"
                        w={400}
                    />
                </div>

                <Group gap="sm" justify="space-between">
                  <div className="flex gap-2 mt-6">
                     <Badge variant="light" color="blue" p={18} w={160}>
                      {filteredRecords.length} of {dma_records.length} records
                    </Badge>
                    <Select
                      value={pageSize.toString()}
                      onChange={(value)=>{
                    setPageSize(Number(value))
                    setCurrentPage(1)
                        }}

                      data={[
                            {value:'5',label:'5 per page'},
                            {value:'10',label:'10 per page'},
                            {value:'25',label:'25 per page'},
                            {value:'50',label:'50 per page'}
                            ]}

                        size="sm"
                        w={180}
                      />
                  </div>
                </Group>
              </div>
            </Group>

            {(searchTerm && (
              <Group mt="md" >
                <Text size="sm" c="dimmed">
                  Active Filter Applied
                </Text>
                <button className="text-blue-500 hover:text-blue-800 text-sm font-medium transition-colors -mt-1" onClick={clearFilters}>
                  Clear Filter
                </button>
              </Group>
            ))}
          </Paper>

          <Paper>
              <Table.ScrollContainer minWidth={500}>
                <Table verticalSpacing="sm" highlightOnHover mt={12}>
                    <Table.Thead>
                      <Table.Tr className="bg-gray-500">
                        <Table.Th className="text-gray-500 font-semibold">
                            CAMPAIGN ID
                        </Table.Th>
                        <Table.Th className="text-gray-500 font-semibold">
                            CAMPAIGN NAME
                        </Table.Th>
                        <Table.Th className="text-gray-500 font-semibold">
                            CAMPAIGN CODE
                        </Table.Th>
                        <Table.Th className="text-gray-500 font-semibold">
                            BRANCH
                        </Table.Th>
                        <Table.Th className="text-gray-500 font-semibold">
                            LOAD CAMPAIGN
                        </Table.Th>
                        <Table.Th className="text-gray-500 font-semibold">
                            LEADS
                        </Table.Th>
                        <Table.Th className="text-gray-500 font-semibold">
                            CREATED AT
                        </Table.Th>

                      </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {rows.length >0 ?
                        (rows):
                        (
                        <Table.Tr>
                            <Table.Tr>
                                <Table.Td colSpan={3} className="text-center py-8">
                                    <Text c="dimmed" size="sm">
                                        No result found
                                    </Text>
                                </Table.Td>
                            </Table.Tr>
                        </Table.Tr>
                        )
                      }
                    </Table.Tbody>
      
                </Table>
              </Table.ScrollContainer>
              {/**Pagination Section */}
                {filteredRecords.length > 0 && (
              <div className="border-t border-gray-200 px-4 bg-gray-50 mt-4">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                   <div className="flex items-center gap-2">
                      <Text size="sm" c="dimmed">
                        showing {Math.min((currentPage - 1) * pageSize+1,filteredRecords.length)} to{''} {Math.min(currentPage * pageSize,filteredRecords.length)} of {filteredRecords.length} results
                      </Text>
                   </div>
                   {totalPages > 1 && (
                      <Pagination
                          value={currentPage}
                          onChange={setCurrentPage}
                          total={totalPages}
                          withEdges
                          className="flex-shrink-0"
                      />
                   )}
                </div>
              </div>
                )}
          </Paper>
        </Paper>

        <Modal opened={openedLoadCampaign} onClose={closeLoadCampaign} withCloseButton={false} title="LOAD CAMPAIGN" size="auto" styles={{header:{justifyContent:'center',position:'relative'},title:{flex:1,textAlign:'center'}}} centered>
            
            <form>
                <Stack>
                    {/**Campaign Information */}
                    <Select
                        label="Branch"
                        placeholder="enter branch name"
                        data={['HQ','P3','INVNTDBN']}
                        leftSection={<IconBuildingEstate color="red"/>}
                        required
                    />
                    <Select
                        label="Campaign Name"
                        placeholder="enter campaign name"
                        data={['CAMP_NAME1','CAMP_NAME2','CAMP_NAME3','CAMP_NAME4','CAMP_NAME5']}
                        required
                        leftSection={<IconBadgeAd color="green"/>}
                    />
                    <Select
                        label="Campaign Code"
                        placeholder="enter campaign code"
                        data={['CAMP1','CAMP2','CAMP3','CAMP4','CAMP5']}
                        required
                        leftSection={<IconBadgeAd color="green"/>}
                    />
                </Stack>

                <Stack mt={12}>
                    {/**Lead Information */}
                    <Flex gap={{base:'sm'}}>

                        <NumberInput
                            label="Minimum Salary"
                            placeholder="enter minimum salary"
                            defaultValue={10000}
                            step={1000}
                            leftSection={<IconMoneybag color="green"/>}
                        />
                        <NumberInput
                            label="Maximum Salary"
                            placeholder="enter maximum salary"
                            defaultValue={10000}
                            step={1000}
                            leftSection={<IconMoneybag color="green"/>}
                        />

                        <Select
                            label="Gender"
                            placeholder="enter gender"
                            data={['MALE','FEMALE','BOTH']}
                        />
                        <NumberInput
                            label="Limit"
                            placeholder="number of leads to load"
                            required
                            step={1000}
                        />
                    </Flex>
                    <NumberInput
                        label="Derived Income"
                        placeholder="enter derived income"
                        leftSection={<IconMoneybag color="green"/>}
                        defaultValue={10000}
                        step={500}
                    />
                </Stack>

                <Flex justify="flex-end" align="center" gap={18} mt={30}>
                    <Button type="submit" variant="outline" onClick={()=>{console.log("Load Campaign")}}>
                        Load Campaign
                    </Button>
                    <Button onClick={closeLoadCampaign} variant="outline" color="red" leftSection={<IconX/>}>
                        Cancel
                    </Button>
                </Flex>
            </form>
        </Modal>


    </div>
  )
  
}

export default DedupedCampaignTable