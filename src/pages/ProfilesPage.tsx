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
  IconGraduationCap,
  IconCalendar,
} from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';

const ProfilesPage = () => {
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
    { title: 'Total Profiles', value: '156', icon: IconUser, color: 'blue' },
    { title: 'Active Members', value: '142', icon: IconUser, color: 'green' },
    { title: 'Departments', value: '12', icon: IconBriefcase, color: 'orange' },
    { title: 'New This Month', value: '8', icon: IconUserPlus, color: 'purple' },
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
              Team Profiles
            </Title>
            <Button leftSection={<IconUserPlus size={16} />} onClick={open}>
              Add Member
            </Button>
          </Group>
          <Text c="dimmed" size="sm">
            Manage team members and their profiles
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

        <Card padding="lg" radius="md" withBorder>
          <Group mb="md" gap="md">
            <TextInput
              placeholder="Search profiles..."
              leftSection={<IconSearch size={16} />}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ flex: 1 }}
            />
            <Select
              placeholder="Filter by department"
              leftSection={<IconFilter size={16} />}
              data={departments}
              value={filterRole}
              onChange={setFilterRole}
              clearable
              w={200}
            />
          </Group>

          <Grid>
            {filteredProfiles.map((profile) => (
              <Grid.Col key={profile.id} span={{ base: 12, sm: 6, lg: 4 }}>
                <Card padding="lg" radius="md" withBorder h="100%">
                  <Group justify="space-between" mb="md">
                    <Badge
                      color={getStatusColor(profile.status)}
                      variant="light"
                    >
                      {profile.status}
                    </Badge>
                    <ActionIcon variant="subtle" color="gray">
                      <IconDots size={16} />
                    </ActionIcon>
                  </Group>

                  <Stack align="center" mb="md">
                    <Avatar
                      src={profile.avatar}
                      size="lg"
                      radius="md"
                    />
                    <div style={{ textAlign: 'center' }}>
                      <Text fw={500} size="lg">
                        {profile.name}
                      </Text>
                      <Text c="dimmed" size="sm">
                        {profile.role}
                      </Text>
                      <Badge variant="outline" size="sm" mt="xs">
                        {profile.department}
                      </Badge>
                    </div>
                  </Stack>

                  <Stack gap="xs" mb="md">
                    <Group gap="xs">
                      <IconMail size={14} />
                      <Text size="xs" c="dimmed">
                        {profile.email}
                      </Text>
                    </Group>
                    <Group gap="xs">
                      <IconPhone size={14} />
                      <Text size="xs" c="dimmed">
                        {profile.phone}
                      </Text>
                    </Group>
                    <Group gap="xs">
                      <IconMapPin size={14} />
                      <Text size="xs" c="dimmed">
                        {profile.location}
                      </Text>
                    </Group>
                    <Group gap="xs">
                      <IconCalendar size={14} />
                      <Text size="xs" c="dimmed">
                        Joined {new Date(profile.joinDate).toLocaleDateString()}
                      </Text>
                    </Group>
                  </Stack>

                  <div mb="md">
                    <Text size="sm" fw={500} mb="xs">Skills</Text>
                    <Group gap="xs">
                      {profile.skills.map((skill) => (
                        <Badge key={skill} variant="light" size="xs">
                          {skill}
                        </Badge>
                      ))}
                    </Group>
                  </div>

                  <Group gap="xs" mt="auto">
                    <Button
                      variant="light"
                      size="sm"
                      leftSection={<IconEdit size={14} />}
                      flex={1}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="light"
                      size="sm"
                      leftSection={<IconUser size={14} />}
                      flex={1}
                    >
                      View
                    </Button>
                  </Group>
                </Card>
              </Grid.Col>
            ))}
          </Grid>

          {filteredProfiles.length === 0 && (
            <Text ta="center" c="dimmed" py="xl">
              No profiles found matching your search criteria
            </Text>
          )}
        </Card>

        <Modal opened={opened} onClose={close} title="Add New Team Member" size="md">
          <Stack gap="md">
            <Group gap="md">
              <TextInput
                label="Full Name"
                placeholder="Enter full name"
                flex={1}
                required
              />
              <Select
                label="Department"
                placeholder="Select department"
                data={departments}
                flex={1}
                required
              />
            </Group>
            
            <TextInput
              label="Role"
              placeholder="Enter job title"
              required
            />
            
            <Group gap="md">
              <TextInput
                label="Email"
                placeholder="email@company.com"
                flex={1}
                required
              />
              <TextInput
                label="Phone"
                placeholder="+1 (555) 123-4567"
                flex={1}
              />
            </Group>
            
            <TextInput
              label="Location"
              placeholder="City, State"
            />
            
            <Textarea
              label="Skills"
              placeholder="List skills separated by commas"
              rows={3}
            />
            
            <Group justify="flex-end" mt="md">
              <Button variant="subtle" onClick={close}>
                Cancel
              </Button>
              <Button onClick={close}>
                Add Member
              </Button>
            </Group>
          </Stack>
        </Modal>
      </Stack>
    </Container>
  );
};

export default ProfilesPage;