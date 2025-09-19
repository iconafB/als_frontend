import {
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

import { useDisclosure } from '@mantine/hooks';

import {
  IconBook,
  IconCertificate,
  IconTrophy,
  IconClock
} from '@tabler/icons-react';
import { FilesIcon,UploadIcon } from 'lucide-react';
import DMARecordsTable from '../components/DMARecordsTable';

const DMARecorsPage = () => {

  const [opened,{open,close}]=useDisclosure(false);
  //FETCH DMA RECORDS

  const stats = [
    { title: 'DMA Credits', value: '8', icon: IconBook, color: 'blue' },
    { title: 'DMA WHAT WHAT', value: '3', icon: IconCertificate, color: 'green' },
    { title: 'DMA WHAT WHAT', value: '127', icon: IconClock, color: 'orange' },
    { title: 'DMA WHAT', value: '15', icon: IconTrophy, color: 'purple' },
  ];



  const ACCEPTED_FILE_TYPES = 'text/csv, .csv, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
  
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
                 <form>
                <FileInput
                  label="DMA Records File"
                  accept={ACCEPTED_FILE_TYPES}
                  mt="md"
                  placeholder="DMA RECORDS"
                  clearable
                  leftSection={<FilesIcon size={30}/>}
                />
                <div className='flex justify-center items-center mt-8'>
                  <Button variant='outline'>
                    SUBMIT
                  </Button>
                </div>
                 </form>
              </Paper>
            </Modal>
            <Button leftSection={<UploadIcon size={16} />} variant='outline' onClick={open}>
              UPLOAD DMA RECORDS
            </Button>
          </Group>
          <Text c="dimmed" size="md">
            Track your DMA records
          </Text>
        </div>
        <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} spacing="md">

          {stats.map((stat) => (
            <Card key={stat.title} padding="md" radius="md" withBorder>
              <Group justify="space-between">
                <div>
                  <Text c="dimmed" size="sm" tt="uppercase" fw={700}>
                    {stat.title}
                  </Text>
                  <Text fw={700} size="xl">
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