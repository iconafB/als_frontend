import {
  Alert,
  Container,
  Title,
  Grid,
  Card,
  Text,
  Progress,
  Badge,
  Group,
  ActionIcon,
  Modal,
  Stack,
  Button,
  Paper,
  SimpleGrid,
  FileInput,
  RingProgress,
  Center,
} from '@mantine/core';



import { useEffect,useState } from 'react';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useDisclosure } from '@mantine/hooks';

import {
  IconBook,
  IconCertificate,
  IconTrophy,
  IconClock,
  IconPlus
} from '@tabler/icons-react';

import { FilesIcon,FileSpreadsheet,UploadIcon,AlertCircle } from 'lucide-react';

import DMARecordsTable from '../components/DMARecordsTable';

import { dma_api } from '../api/dma/dma';
import { toast } from 'react-toastify';


const DMARecorsPage = () => {

  const [opened,{open,close}]=useDisclosure(false);
  const [currentTime, setCurrentTime] = useState(new Date())
  const [selectedFile, setSelectedFile] = useState<File|null>(null);

  //FETCH DMA RECORDS and update dma status
  
  //fetch dma credits and display every 10 seconds
  const {data:dma_credits,isLoading:isLoadingCredits,error}=useQuery({
    queryKey:["credits"],
    queryFn:dma_api.check_credits,
    refetchInterval:10000
  });

  //upload file upload

  const fileUploadMutation=useMutation({

    mutationFn:dma_api.upload_dma_records,
    onSuccess:(data)=>{
      toast.success('DMA records uploaded successfully')
    },
    onError:(error)=>{
      toast.error('Failed to upload DMA records')
      console.error(error)
    }
  });


  const handleClose=()=>{
    setSelectedFile(null);
    close();
  }
  const handleFileSelect=(file:File | null)=>{
    setSelectedFile(file)
  }

  //upload dma files
  const handleRecordUpload=()=>{

    if(selectedFile){
      fileUploadMutation.mutate(selectedFile)
    }
  }

  //time update
  useEffect(()=>{

    const timeId=setInterval(()=>{
      setCurrentTime(new Date())
    },1000);

    return ()=>clearInterval(timeId)
  },[]);

 //customized time
 const formattedDate=currentTime.toLocaleString();

  
   const dma_status = [
    { title: 'DMA Credits', value: dma_credits?.credits, icon: IconBook, color: 'blue' },
    { title: 'Email Sent', value: "biyela@gmail.com", icon: IconCertificate, color: 'green' },
    { title: 'Time Sent', value: formattedDate, icon: IconClock, color: 'orange' }
  ];


  //const ACCEPTED_FILE_TYPES = 'text/csv, .csv, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
  

  const isValidFileType = (file: File | null) => {

    if (!file) return false;
    const validTypes = [
      'text/csv',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    ];
    return validTypes.includes(file.type) || 
           file.name.endsWith('.csv') || 
           file.name.endsWith('.xlsx') || 
           file.name.endsWith('.xls');
  };
  return (
    <Container size="xl" px={0}>
      <Stack gap="xl">
        <div>
          <Group justify="space-between" mb="lg">
            <Title order={2} c="dark">
              DMA RECORDS SUMMARY
            </Title>
            <Modal opened={opened} onClose={close} title="SUBMIT DMA RECORDS" classNames={{title: 'text-6xl font-bold text-blue-600 dark:text-blue-400 text-center'}} size="xl" radius="md" centered>
              <Paper shadow='xs' p='xl'>
                 <Text size="sm" c="dimmed" p={14}>
                    Upload a CSV or Excel file containing people data.
                  </Text>

                 <form>
                    <FileInput
                      label="DMA Records File"
                      accept=".csv,.xlsx,.xls"
                      mt="md"
                      p={12}
                      ml={12}
                      placeholder="Upload DMA RECORDS"
                      error={selectedFile && !isValidFileType(selectedFile)?'Please select a valid csv or excel file':null}
                      clearable
                      leftSection={<UploadIcon size={30}/>}
                      className='transition-all duration-200'
                    />
                    {
                      selectedFile && (
                        <div className='bg-gray-50 p-3 rounded-lg'>
                          <Group gap="xs" align='center'>
                            <div className='flex-1'>
                              <Text size='sm' fw={500}>
                                {selectedFile.name}
                              </Text>
                              <Text size='xs' c="dimmed">
                                {(selectedFile.size/1024).toFixed(1)}KB
                              </Text>
                            </div>
                          </Group>
                        </div>
                      )
                    }

                    {
                      fileUploadMutation.isPending && (
                        <div className='space-y-2'>
                          <Group justify='space-between'>
                            <Text size='sm'>uploading.....</Text>
                            <Text></Text>
                          </Group>
                        </div>
                      )
                    }

                    {
                      fileUploadMutation.isError && (
                        <Alert icon={<AlertCircle size={16}/>} color='red' title="Upload Error">
                          {fileUploadMutation.error?.message || "An error occurred during upload"}
                        </Alert>
                      )
                    }
                    <Group justify='flex-end' mt="md" gap="lg">
                      <div className='flex justify-center items-center mt-8'>
                        <Button 
                          type='submit' 
                          variant='subtle' 
                          onClick={handleRecordUpload}
                          
                          //disabled={!selectedFile || !isValidFileType(selectedFile) || fileUploadMutation.isPending}
                          loading={fileUploadMutation.isPending}

                          leftSection={<UploadIcon size={16}/>}
                          color='green'
                        >
                          SUBMIT
                        </Button>
                        <Button variant='subtle' onClick={close} color='red' disabled={fileUploadMutation.isPending} className='hover:bg-gray-100 transition-colors'>
                          Cancel
                        </Button>

                      </div>
                    </Group>
                 </form>

              </Paper>
            </Modal>
            <Button leftSection={<IconPlus size={16} />} variant='outline' onClick={open}>
              ADD DMA RECORD
            </Button>
          </Group>
          <Text c="dimmed" size="md">
            Track your DMA records
          </Text>

        </div>
        <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} spacing="md">

          {dma_status.map((stat) => (
            <Card key={stat.title} padding="md" radius="md" withBorder>
              <Group justify="space-between">
                <div>
                  <Text c="dimmed" size="sm" tt="uppercase" fw={700}>
                    {stat.title}
                  </Text>
                  <Text fw={700} size="sm">
                    {stat.value}
                  </Text>
                </div>
                <ActionIcon
                  color={stat.color}
                  variant="light"
                  radius="md"
                  size="xl"
                >
                  <stat.icon size={22} />
                </ActionIcon>
              </Group>
            </Card>
          ))}

        </SimpleGrid>
        <Group>
        </Group>
        <DMARecordsTable/>
      </Stack>
    </Container>
  );
};

export default DMARecorsPage;