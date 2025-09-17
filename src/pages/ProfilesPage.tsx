import React, { useState } from 'react';
import {
  Container,
  Title,
  Grid,
  Card,
  Text,
  Badge,
  Group,
  ActionIcon,
  Stack,
  Button,
  Avatar,
  TextInput,
  NumberInput,
  Select,
  SimpleGrid,
  Modal,
  Textarea,
} from '@mantine/core';
import {
  IconUser,
  IconSearch,
  IconFilter,
  IconUserPlus,
  IconMail,
  IconPhone,
  IconMapPin,
  IconBriefcase,
  IconEdit,
  IconDots,
  IconCalendar,
} from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';

const ProfilesPage = () => {

  const [AssignOpened,{open:OpenAssign,close:CloseAssign}]=useDisclosure(false)

  const [opened, { open, close }] = useDisclosure(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState<string | null>(null);

  const profiles = [
    {
      id: 1,
      name: 'John Smith',
      role: 'Senior Developer',
      department: 'Engineering',
      email: 'john.smith@company.com',
      phone: '+1 (555) 123-4567',
      location: 'New York, NY',
      status: 'active',
      joinDate: '2022-03-15',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
      skills: ['React', 'TypeScript', 'Node.js'],
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      role: 'Product Manager',
      department: 'Product',
      email: 'sarah.johnson@company.com',
      phone: '+1 (555) 234-5678',
      location: 'San Francisco, CA',
      status: 'active',
      joinDate: '2021-08-20',
      avatar: 'https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
      skills: ['Product Strategy', 'Analytics', 'Agile'],
    },
    {
      id: 3,
      name: 'Michael Chen',
      role: 'UX Designer',
      department: 'Design',
      email: 'michael.chen@company.com',
      phone: '+1 (555) 345-6789',
      location: 'Austin, TX',
      status: 'active',
      joinDate: '2023-01-10',
      avatar: 'https://images.pexels.com/photos/2381069/pexels-photo-2381069.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
      skills: ['Figma', 'User Research', 'Prototyping'],
    },
    {
      id: 4,
      name: 'Emily Rodriguez',
      role: 'Marketing Lead',
      department: 'Marketing',
      email: 'emily.rodriguez@company.com',
      phone: '+1 (555) 456-7890',
      location: 'Chicago, IL',
      status: 'active',
      joinDate: '2022-11-05',
      avatar: 'https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
      skills: ['Digital Marketing', 'Content Strategy', 'SEO'],
    },
    {
      id: 5,
      name: 'David Wilson',
      role: 'DevOps Engineer',
      department: 'Engineering',
      email: 'david.wilson@company.com',
      phone: '+1 (555) 567-8901',
      location: 'Seattle, WA',
      status: 'inactive',
      joinDate: '2020-06-12',
      avatar: 'https://images.pexels.com/photos/2381069/pexels-photo-2381069.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
      skills: ['AWS', 'Docker', 'Kubernetes'],
    },
    {
      id: 6,
      name: 'Lisa Anderson',
      role: 'Data Scientist',
      department: 'Analytics',
      email: 'lisa.anderson@company.com',
      phone: '+1 (555) 678-9012',
      location: 'Boston, MA',
      status: 'active',
      joinDate: '2023-04-18',
      avatar: 'https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
      skills: ['Python', 'Machine Learning', 'SQL'],
    },
  ];

  const stats = [
    { title: 'TOTAL RULES', value: '156', icon: IconUser, color: 'blue' },
    { title: 'ASSIGNED RULES', value: '142', icon: IconUser, color: 'green' },
    { title: 'UNASSIGNED RULES', value: '12', icon: IconBriefcase, color: 'orange' },
    { title: 'CAMPAIGNS', value: '8', icon: IconUserPlus, color: 'purple' },
  ];

  const departments = [
    'Engineering',
    'Product',
    'Design',
    'Marketing',
    'Analytics',
    'Sales',
    'HR',
  ];

  const getStatusColor = (status: string) => {
    return status === 'active' ? 'green' : 'gray';
  };

  const filteredProfiles = profiles.filter(profile => {
    const matchesSearch = profile.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         profile.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         profile.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = !filterRole || profile.department === filterRole;
    return matchesSearch && matchesFilter;
  });


  return (
    <Container size="xl" px={0}>
      <Stack gap="xl">
        <div>
          <Group justify="space-between" mb="lg">
            <Title order={2} c="dark">
              CAMPAIGN RULES SUMMARY
            </Title>
            <Button leftSection={<IconUserPlus size={16} />} onClick={open}>
              CREATE CAMPAIGN RULE
            </Button>

             <Button leftSection={<IconUserPlus size={16} />} onClick={OpenAssign}>
              ASSIGN CAMPAIGN RULE
              </Button>
          </Group>
          <Text c="dimmed" size="sm">
            MANAGE CAMPAIGN RULES
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

        <Modal opened={opened} onClose={close} title="ADD NEW CAMPAIGN RULE" size="md">
          <Stack gap="md">
            <Group gap="md">
              <TextInput
                label="RULE CODE"
                placeholder="ENTER RULE CODE"
                flex={1}
                required
              />
              <Select
                label="CAMPAIGN CODE"
                placeholder="CAMPAIGN CODE"
                data={departments}
                flex={1}
                required
              />
            </Group>

            <Group gap="md">
              <div className='flex gap-2'>
                <NumberInput
                label="MINIMUM SALARY"
                placeholder="MINIMUM SALARY"
                step={1000}
                required
                />
                <NumberInput
                label="MAXIMUM SALARY"
                placeholder="MAXIMUM SALARY"
                step={1000}
                required
               />
              </div>
            </Group>
            <Group gap="md">
              <NumberInput
                label="ENTER MINIMUM AGE"
                placeholder="MINIMUM AGE"
                flex={1}
                required
              />
              <NumberInput
                label="MAXIMUM AGE"
                required
                placeholder="ENTER MAXIMUM AGE"
                flex={1}
              />
            </Group>

            <Select
              label="GENDER"
              required
              placeholder="Enter the city name"
              data={['MALE','FEMALE']}
            />
            <TextInput
              label="CITY"
              required
              placeholder="Enter the city name"
            />

             <Select
              label="PROVINCE"
              required
              placeholder="Enter Province"
              data={['KWAZULU-NATAL','GAUTENG','WESTERN CAPE','FREE STATE','LIMPOPO','EASTERN CAPE','NORTH WEST','NORTHERN CAPE']}
            />
            
            <Textarea
              label="COMMENTS"
              placeholder="COMMENTS"
              rows={3}
            />
            
            <Group justify="flex-end" mt="md">
              <Button variant="subtle" onClick={close}>
                Cancel
              </Button>
              <Button onClick={close} >
                ADD RULE
              </Button>
            </Group>
          </Stack>
        </Modal>

        <Modal opened={AssignOpened} onClose={CloseAssign} title="ASSIGN CAMPAIGN TO CAMPAIGN RULE">
          <Stack gap="md">
            <Group gap="md">
               <TextInput
                label="RULE CODE"
                placeholder="ENTER RULE CODE"
                flex={1}
                required
              />

              <Select
                label="CAMPAIGN CODE"
                placeholder="CAMPAIGN CODE"
                data={departments}
                flex={1}
                required
              />
              
            </Group>
             <Select
                label="CAMPAIGN NAME"
                placeholder="ENTER CAMPAIGN NAME"
                data={departments}
                flex={1}
                required
                />
            <Group justify='center'>
              <Button variant='outline' color='red' onClick={CloseAssign}>
                Cancel
              </Button>
              <Button variant='outline' color='green'>
                ASSIGN
              </Button>
            </Group>
          </Stack>
        </Modal>
      </Stack>
    </Container>
  );
};

export default ProfilesPage;