import {useState,useMemo,useEffect} from "react"
import { useQuery } from "@tanstack/react-query"
import { Table,TextInput,Loader,Alert,Paper,Group,Text,Badge,Select, Pagination,Container, Button, Modal } from "@mantine/core"
import { AlertCircle,Plus, Search } from "lucide-react"
import { useDisclosure } from "@mantine/hooks"
import { fetchPeople } from "../api/mock_api"
import { CreateCampaign } from "./CreateCampaign"

const CampaignsTable = () => {
    const [searchTerm, setSearchTerm] = useState('')
    const [nameFilter, setNameFilter] = useState('')
    const [secondNameFilter, setSecondNameFilter] = useState('')
    const [professionFilter, setProfessionFilter] = useState('')
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [opened,{open,close}]=useDisclosure(false)
    //Fetch Campaign from the backend api
    const {data:people=[],error,isLoading}=useQuery({
        queryKey:['people'],
        queryFn:fetchPeople
    })

    const filteredPeople = useMemo(() => {
        return people.filter((person) => {
          const matchesSearch = searchTerm === '' || 
            Object.values(person).some(value => 
              value.toString().toLowerCase().includes(searchTerm.toLowerCase())
            );
    
      const matchesName = nameFilter === '' || person.name.toLowerCase().includes(nameFilter.toLowerCase());
      
      const matchesSecondName = secondNameFilter === '' || person.secondName.toLowerCase().includes(secondNameFilter.toLowerCase());
      
      const matchesProfession = professionFilter === '' || person.profession.toLowerCase().includes(professionFilter.toLowerCase());

      return matchesSearch && matchesName && matchesSecondName && matchesProfession;
    });
  }, [people, searchTerm, nameFilter, secondNameFilter, professionFilter]);


    const paginatedPeople = useMemo(() => {

        const startIndex = (currentPage - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        return filteredPeople.slice(startIndex, endIndex);

    },[filteredPeople, currentPage, pageSize]);

    const totalPages = Math.ceil(filteredPeople.length / pageSize);
    
   useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, nameFilter, secondNameFilter, professionFilter]);


  const clearFilters = () => {
    setSearchTerm('');
    setNameFilter('');
    setSecondNameFilter('');
    setProfessionFilter('');
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
            <Badge variant="light" color="purple" p={18}>
                 {person.name}
            </Badge>
           
        </Table.Td>
        <Table.Td className="font-medium">
            <Badge variant="light" color="green" p={18}>
                {person.secondName}
            </Badge>
           
        </Table.Td>
        <Table.Td>
            <Badge variant="light" color="blue">
                {person.profession}
            </Badge>
        </Table.Td>
        <Table.Td>
            <Button size="xs" variant="light" onClick={()=>{console.log("Load Campaign")}} className="hover:bg-blue-600">
                Load Campaign
            </Button>
        </Table.Td>

        <Table.Td>
            <Badge color="green" variant="light">
                Loaded
            </Badge>
        </Table.Td>
        <Table.Td>
            <Badge color="red" variant="light" p={18}>
                Today Baba
            </Badge>
        </Table.Td>
        
    </Table.Tr>
 ));
 
  return (
    <div className="space-y-6">
        {/**Search filter section */}
        <Paper p="md" shadow="sm" className="bg-white">
            <Container className="flex justify-start items-start gap-2">
                {/**Create Campaign Modal */}
                <Modal 
                    opened={opened} 
                    onClose={close} 
                    title={
                        <Text size="xl" c="green" fw={500} >
                            CREATE CAMPAIGN
                        </Text>
                    } 
                    centered size="lg" 
                    className="p-4" 
                    radius={12} 
                    transitionProps={{transition:'fade',duration:200}} 
                    overlayProps={{
                        backgroundOpacity:0.25,
                        blur:3,
                    }}
                    padding="lg"
                >
                   <CreateCampaign/>
                </Modal>

                <Button variant="green" onClick={open} leftSection={<Plus size={24}/>} color="red">
                    CREATE CAMPAIGN
                </Button>

            </Container>
            <Group mb="md" justify="space-between">
                <Text size="lg" fw={600} mt="md" className="mt-8">Campaigns Table</Text>
                <Group gap="sm">
                    <Badge color="blue" variant="light" p={18}> 
                        {filteredPeople.length} of {people.length} Results
                    </Badge>
                    <Select
                        value={pageSize.toString()}
                        onChange={(value)=>{
                            setPageSize(Number(value));
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
                </Group>
            </Group>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

                <TextInput
                    placeholder="search all campaign fields...."
                    leftSection={<Search size={16}/>}
                    value={searchTerm}
                    onChange={(event)=>setSearchTerm(event.currentTarget.value)}
                    className="col-span-full lg:col-span-1 -mt-0"
                    label="Search All Campaign Fields"
                />

                 <TextInput
                    placeholder="Filter by Campaign Name"
                    leftSection={<Search size={16}/>}
                    value={nameFilter}
                    onChange={(event)=>setNameFilter(event.currentTarget.value)}
                    className="col-span-full lg:col-span-1"
                    label="Campaign Name"
                />
                 <TextInput
                    placeholder="Filter by Branch"
                    leftSection={<Search size={16}/>}
                    value={secondNameFilter}
                    onChange={(event)=>setSecondNameFilter(event.currentTarget.value)}
                    className="col-span-full lg:col-span-1"
                    label="Campaign Code"
                />

                 <TextInput
                    placeholder="Fliter by Campaign Code"
                    leftSection={<Search size={16}/>}
                    value={professionFilter}
                    onChange={(event)=>setProfessionFilter(event.currentTarget.value)}
                    className="col-span-full lg:col-span-1"
                    label="Branch"
                />

                </div>
            {(searchTerm || nameFilter || secondNameFilter || professionFilter)
             &&
             (
                <Group mt="md" justify="space-between">
                    <Text size="sm" c="dimmed">
                        Active Filters Applied
                    </Text>
                    <button className="text-blue-500 hover:text-blue-800 text-sm font-medium transition-colors" onClick={clearFilters}>
                        Clear All Filters
                    </button>
                </Group>
             )
            }
        </Paper>
        {/**Table section */}


        <Paper shadow="sm" className="overflow-hidden">
            <Table.ScrollContainer minWidth={500}>
                <Table verticalSpacing="sm" highlightOnHover>
                    <Table.Thead>
                        <Table.Tr className="bg-gray-500">
                            <Table.Th className="font-semibold text-gray-500">
                                Campaign Name
                            </Table.Th>
                            <Table.Th className="font-semibold text-gray-500">
                                Campaign Code
                            </Table.Th>
                            <Table.Th className="font-semibold text-gray-500">
                                Branch
                            </Table.Th>
                            <Table.Th className="font-semibold text-gray-500">
                                Load Campaign
                            </Table.Th>
                            <Table.Th className="font-semibold text-gray-500">
                                Campaign Status
                            </Table.Th>
                            <Table.Th className="font-semibold text-gray-500">
                                Created At
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
                        )}
                    </Table.Tbody>
                </Table>
            </Table.ScrollContainer>
            {/**Pagination Section */}
            {filteredPeople.length > 0 && (
                <div className="border-t border-gray-200 px-4 bg-gray-50">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-2">
                            <Text size="sm" c="dimmed">
                                 showing {Math.min((currentPage - 1) * pageSize+1,filteredPeople.length)} to{''} {Math.min(currentPage * pageSize,filteredPeople.length)} of {filteredPeople.length} results
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

export default CampaignsTable