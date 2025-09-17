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
import { FilesIcon } from 'lucide-react';
import DMARecordsTable from '../components/DMARecordsTable';

const DMARecorsPage = () => {

  const [opened,{open,close}]=useDisclosure(false)


  const courses = [
    {
      title: 'Advanced React Development',
      instructor: 'Dr. Sarah Wilson',
      progress: 65,
      duration: '12 weeks',
      level: 'Advanced',
      rating: 4.8,
      enrolled: 1248,
      status: 'in-progress',
      image: 'https://images.pexels.com/photos/2102415/pexels-photo-2102415.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=1',
    },
    {
      title: 'Machine Learning Fundamentals',
      instructor: 'Prof. Michael Chen',
      progress: 0,
      duration: '16 weeks',
      level: 'Intermediate',
      rating: 4.9,
      enrolled: 2156,
      status: 'not-started',
      image: 'https://images.pexels.com/photos/8439093/pexels-photo-8439093.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=1',
    },
    {
      title: 'UI/UX Design Principles',
      instructor: 'Emma Rodriguez',
      progress: 100,
      duration: '8 weeks',
      level: 'Beginner',
      rating: 4.7,
      enrolled: 892,
      status: 'completed',
      image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=1',
    },
  ];


  const stats = [
    { title: 'DMA Credits', value: '8', icon: IconBook, color: 'blue' },
    { title: 'DMA WHAT WHAT', value: '3', icon: IconCertificate, color: 'green' },
    { title: 'DMA WHAT WHAT', value: '127', icon: IconClock, color: 'orange' },
    { title: 'DMA WHAT', value: '15', icon: IconTrophy, color: 'purple' },
  ];

  const achievements = [
    { title: 'Quick Learner', description: 'Complete 3 courses in a month', color: 'gold' },
    { title: 'Consistent Student', description: '30-day learning streak', color: 'green' },
    { title: 'Certificate Master', description: 'Earn 5 certificates', color: 'blue' },
  ];

  const getStatusColor = (status: string) => {

    switch (status) {
      case 'completed': return 'green';
      case 'in-progress': return 'blue';
      case 'not-started': return 'gray';
      default: return 'gray';
    }
  };


  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner': return 'green';
      case 'Intermediate': return 'orange';
      case 'Advanced': return 'red';
      default: return 'gray';
    }
  };

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
            <Button leftSection={<IconBook size={16} />} variant='outline' onClick={open}>
              UPLOAD
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