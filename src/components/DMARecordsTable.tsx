import { useState,useMemo,useEffect } from "react"
import { Loader, Paper, Table,TextInput,Text,Alert,Badge,Select,Group,Pagination } from "@mantine/core"
import { AlertCircle, Search } from "lucide-react"
import { fetchMockDMA } from "../api/dma_mock_api"
import { useQuery } from "@tanstack/react-query"

const DMARecordsTable = () => {

      const [searchTerm, setSearchTerm] = useState('')
      const [auditIdFilter, setAuditIdFilter] = useState('')
      const [notificationEmailFilter, setNotificationEmailFilter] = useState('')
      const [createdAtFilter, setCreatedAtFilter] = useState('')
      const [isProcessedFilter,setIsProcessedFilter]=useState('')
      const [currentPage, setCurrentPage] = useState(1);
      const [pageSize, setPageSize] = useState(10);

      // [opened,{open,close}]=useDisclosure(false)
  
      //Fetch dma records from the backend api

      const {data:dma_records=[],error,isLoading}=useQuery({
          queryKey:['dma'],
          queryFn:fetchMockDMA
      })
  
      const filteredRecords = useMemo(() => {
          return dma_records.filter((record) => {
            const matchesSearch = searchTerm === '' || 
              Object.values(record).some(value => value.toString().toLowerCase().includes(searchTerm.toLowerCase()));
      
        const matchesAuditId = auditIdFilter === '' || record.audit_id.toLowerCase().includes(auditIdFilter.toLowerCase());
        
        const matchesNumberOfRecords = notificationEmailFilter === '' || record.notification_email.toLowerCase().includes(notificationEmailFilter.toLowerCase());
        
        const matchesNotificationEmail = createdAtFilter === '' || record.created_at.toLowerCase().includes(createdAtFilter.toLowerCase());

        const matchesIsProcessed = isProcessedFilter === '' || record.is_processed.toLowerCase().includes(isProcessedFilter.toLowerCase());

        return matchesSearch && matchesAuditId && matchesNumberOfRecords && matchesNotificationEmail && matchesIsProcessed;
      });
    }, [dma_records, searchTerm, auditIdFilter, notificationEmailFilter, createdAtFilter,isProcessedFilter]);


      const paginatedRecords = useMemo(() => {
  
          const startIndex = (currentPage - 1) * pageSize;
          const endIndex = startIndex + pageSize;

          return filteredRecords.slice(startIndex, endIndex);
  
      },[filteredRecords, currentPage, pageSize]);
  
      const totalPages = Math.ceil(filteredRecords.length / pageSize);
      
     useEffect(() => {
      setCurrentPage(1);
    }, [searchTerm, auditIdFilter, notificationEmailFilter, createdAtFilter]);
  

    const clearFilters = () => {
      setSearchTerm('');
      setAuditIdFilter('');
      setNotificationEmailFilter('');
      setCreatedAtFilter('');
      setIsProcessedFilter('');
      setCurrentPage(1);
    };


  if(isLoading){
    
        return(
            <div className="flex justify-center items-center h-64">
                <div className="text-center">
                    <Loader size="lg" color="green"/>
                    <Text mt="md" c="dimmed">Loading DMA Records Data....</Text>
                </div>
            </div>
        )
    
   }
 
 if(error){
    return(
        <Alert icon={<AlertCircle size={16}/>} title="Error" color="red">
            Failed To Load DMA Records Data
        </Alert>
    )
 }

  const rows=paginatedRecords.map((record)=>(

     <Table.Tr className="hover:bg-gray-50 transition-colors duration-200" key={record.id}>
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
         <Table.Td className="foont-medium">
             <Badge variant="light" color="blue" p={18}>
                 {record.notification_email}
             </Badge>
         </Table.Td>
         <Table.Td className="font-medium">
          <Badge variant="light" color={record.is_processed=='Download Ready'?'green':'red'} p={18}>
            {/**show colors based on the boolean variable */}
              {record.is_processed}
          </Badge>
         </Table.Td>
         <Table.Td className="font-medium">
           <Badge variant="light" color="blue" p={18}>
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
                      
                      placeholder="enter audit id,notification email, or created at"
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
                            AUDIT ID
                        </Table.Th>
                        <Table.Th className="text-gray-500 font-semibold">
                          NUMBER OF RECORDS
                        </Table.Th>
                        <Table.Th className="text-gray-500 font-semibold">
                          NOTIFICATION EMAIL
                        </Table.Th>
                        <Table.Th className="text-gray-500 font-semibold">
                          DEDUPE STATUS
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
    </div>
  )
}

export default DMARecordsTable