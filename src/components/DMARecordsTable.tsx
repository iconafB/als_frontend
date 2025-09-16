import { useState,useMemo,useEffect } from "react"
import { Loader, Paper, Table, TextInput,Text,Alert,Pill,Badge,Button,Pagination } from "@mantine/core"
import { AlertCircle } from "lucide-react"

import { useDisclosure } from "@mantine/hooks"

import { fetchMockDMA } from "../api/dma_mock_api"
import { useQuery } from "@tanstack/react-query"

const DMARecordsTable = () => {


      const [searchTerm, setSearchTerm] = useState('')

      const [auditIdFilter, setAuditIdFilter] = useState('')

      const [notificationEmailFilter, setNotificationEmailFilter] = useState('')

      const [createdAtFilter, setCreatedAtFilter] = useState('')

      const [isProcessedFilter,setIsProcessedFilter]=useState(false)

      const [currentPage, setCurrentPage] = useState(1);

      const [pageSize, setPageSize] = useState(10);

      // [opened,{open,close}]=useDisclosure(false)
  
      //Fetch dma records from the backend api

      const {data:people=[],error,isLoading}=useQuery({
          queryKey:['dma'],
          queryFn:fetchMockDMA
      })
  
      const filteredPeople = useMemo(() => {
          return people.filter((person) => {
            const matchesSearch = searchTerm === '' || 
              Object.values(person).some(value => 
                value.toString().toLowerCase().includes(searchTerm.toLowerCase())
              );
      
        const matchesAuditId = auditIdFilter === '' || person.audit_id.toLowerCase().includes(auditIdFilter.toLowerCase());
        
        const matchesNumberOfRecords = notificationEmailFilter === '' || person.notification_email.toLowerCase().includes(notificationEmailFilter.toLowerCase());
        
        const matchesNotificationEmail = createdAtFilter === '' || person.created_at.toLowerCase().includes(createdAtFilter.toLowerCase());

        const matchesIsProcessed = isProcessedFilter === false || person.is_processed;

        return matchesSearch && matchesAuditId && matchesNumberOfRecords && matchesNotificationEmail && matchesIsProcessed;
      });
    }, [people, searchTerm, auditIdFilter, notificationEmailFilter, createdAtFilter,isProcessedFilter]);

  
      const paginatedPeople = useMemo(() => {
  
          const startIndex = (currentPage - 1) * pageSize;
          const endIndex = startIndex + pageSize;
          return filteredPeople.slice(startIndex, endIndex);
  
      },[filteredPeople, currentPage, pageSize]);
  
      const totalPages = Math.ceil(filteredPeople.length / pageSize);
      
     useEffect(() => {
      setCurrentPage(1);
    }, [searchTerm, auditIdFilter, notificationEmailFilter, createdAtFilter]);
  
  
    const clearFilters = () => {

      setSearchTerm('');
      setAuditIdFilter('');
      setNotificationEmailFilter('');
      setCreatedAtFilter('');
      setIsProcessedFilter(false);
      setCurrentPage(1);

    };


     if(isLoading){
    
        return(
            <div className="flex justify-center items-center h-64">
                <div className="text-center">
                    <Loader size="lg" color="green"/>
                    <Text mt="md" c="dimmed">Loading Campaign Data....</Text>
                </div>
            </div>
        )
    
     }

     
 if(error){
    return(
        <Alert icon={<AlertCircle size={16}/>} title="Error" color="red">
            Failed To Load Campaign Data
        </Alert>
    )
 }

  const rows=paginatedPeople.map((person)=>(
 
     <Table.Tr className="hover:bg-gray-50 transition-colors duration-200" key={person.id}>
         <Table.Td className="font-medium">
             {person.audit_id}
         </Table.Td>
         <Table.Td className="font-medium">
             {person.number_of_records}
         </Table.Td>
         <Table.Td>
             <Badge variant="light" color="blue">
                 {person.notification_email}
             </Badge>
         </Table.Td>
         <Table.Td>
            {person.is_processed}
         </Table.Td>
 
         <Table.Td>
            {person.created_at}
         </Table.Td>
     </Table.Tr>
  ));
 

  return (

    <div className="space-y-6">
        <Paper shadow="sm" className="overflow-hidden">

            <Table.ScrollContainer minWidth={500}>

                <Table verticalSpacing="sm" highlightOnHover>

                    <Table.Thead>
                      <Table.Tr className="bg-gray-500">
                        <Table.Th className="text-gray-500 font-semibold">
                            AUDIT ID
                        </Table.Th>
                        <Table.Th className="text-gray-500 font-semibold">
                          Number Of Records
                        </Table.Th>
                        <Table.Th className="text-gray-500 font-semibold">
                          NOTIFICATION EMAIL
                        </Table.Th>
                        <Table.Th className="text-gray-500 font-semibold">
                          IS PROCESSED
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
              {filteredPeople.length > 0 && (
              <div className="border-t border-gray-200 px-4 bg-gray-50">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                   <div className="flex items-center gap-2">
                                        <Text size="sm" c="dimmed">
                                             showing {Math.min((currentPage - 1) * pageSize+1,filteredPeople.length)} to{''} {Math.min(currentPage * pageSize,filteredPeople.length)} of{filteredPeople.length} results
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
    </div>
  )
}

export default DMARecordsTable