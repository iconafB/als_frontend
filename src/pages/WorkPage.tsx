import React from 'react';
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
  Stack,
  Avatar,
  Button,
  SimpleGrid,
} from '@mantine/core';
import {
  IconBriefcase,
  IconClock,
  IconCircleCheck,
  IconAlertCircle,
  IconUsers,
  IconTrendingUp,
  IconCalendar,
  IconDots,
} from '@tabler/icons-react';

const WorkPage = () => {
  const projects = [
    {
      name: 'Project Alpha',
      description: 'Strategic initiative for Q1 2025',
      progress: 75,
      status: 'active',
      team: 5,
      deadline: '2025-03-15',
      priority: 'high',
    },
    {
      name: 'Website Redesign',
      description: 'Complete overhaul of company website',
      progress: 45,
      status: 'active',
      team: 8,
      deadline: '2025-04-20',
      priority: 'medium',
    },
    {
      name: 'Data Migration',
      description: 'Migrate legacy systems to cloud',
      progress: 90,
      status: 'review',
      team: 3,
      deadline: '2025-02-28',
      priority: 'high',
    },
  ];

  const stats = [
    { title: 'Active Projects', value: '12', icon: IconBriefcase, color: 'blue' },
    { title: 'Completed Tasks', value: '148', icon: IconCircleCheck, color: 'green' },
    { title: 'Team Members', value: '24', icon: IconUsers, color: 'orange' },
    { title: 'Pending Reviews', value: '7', icon: IconAlertCircle, color: 'red' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'blue';
      case 'review': return 'orange';
      case 'completed': return 'green';
      default: return 'gray';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'red';
      case 'medium': return 'yellow';
      case 'low': return 'green';
      default: return 'gray';
    }
  };

  return (
    <Container size="xl" px={0}>
      <Stack gap="xl">
        <div>
          <Group justify="space-between" mb="lg">
            <Title order={2} c="dark">
              Work Dashboard
            </Title>
            <Button leftSection={<IconBriefcase size={16} />}>
              New Project
            </Button>
          </Group>
          <Text c="dimmed" size="sm">
            Manage your projects and track progress
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

        <div>
          <Title order={3} mb="md">
            Active Projects
          </Title>
          <Grid>
            {projects.map((project) => (
              <Grid.Col key={project.name} span={{ base: 12, md: 6, lg: 4 }}>
                <Card padding="lg" radius="md" withBorder h="100%">
                  <Group justify="space-between" mb="md">
                    <Badge color={getStatusColor(project.status)} variant="light">
                      {project.status}
                    </Badge>
                    <ActionIcon variant="subtle" color="gray">
                      <IconDots size={16} />
                    </ActionIcon>
                  </Group>
                  
                  <Text fw={500} size="lg" mb="sm">
                    {project.name}
                  </Text>
                  <Text size="sm" c="dimmed" mb="md">
                    {project.description}
                  </Text>

                  <Stack gap="sm">
                    <div>
                      <Group justify="space-between" mb={5}>
                        <Text size="sm" fw={500}>
                          Progress
                        </Text>
                        <Text size="sm" c="dimmed">
                          {project.progress}%
                        </Text>
                      </Group>
                      <Progress value={project.progress} radius="sm" />
                    </div>

                    <Group justify="space-between">
                      <Group gap="xs">
                        <IconUsers size={14} />
                        <Text size="xs" c="dimmed">
                          {project.team} members
                        </Text>
                      </Group>
                      <Badge
                        color={getPriorityColor(project.priority)}
                        variant="outline"
                        size="xs"
                      >
                        {project.priority}
                      </Badge>
                    </Group>

                    <Group gap="xs" mt="sm">
                      <IconCalendar size={14} />
                      <Text size="xs" c="dimmed">
                        Due: {new Date(project.deadline).toLocaleDateString()}
                      </Text>
                    </Group>
                  </Stack>
                </Card>
              </Grid.Col>
            ))}
          </Grid>
        </div>

        <Card padding="lg" radius="md" withBorder>
          <Group justify="space-between" mb="md">
            <Title order={4}>Recent Activity</Title>
            <ActionIcon variant="subtle">
              <IconTrendingUp size={16} />
            </ActionIcon>
          </Group>
          <Stack gap="md">
            <Group>
              <Avatar size="sm" color="blue">JD</Avatar>
              <div style={{ flex: 1 }}>
                <Text size="sm" fw={500}>John Doe completed "API Integration"</Text>
                <Text size="xs" c="dimmed">2 hours ago</Text>
              </div>
            </Group>
            <Group>
              <Avatar size="sm" color="green">SM</Avatar>
              <div style={{ flex: 1 }}>
                <Text size="sm" fw={500}>Sarah Miller updated Project Alpha timeline</Text>
                <Text size="xs" c="dimmed">4 hours ago</Text>
              </div>
            </Group>
            <Group>
              <Avatar size="sm" color="orange">RJ</Avatar>
              <div style={{ flex: 1 }}>
                <Text size="sm" fw={500}>Robert Johnson created new task</Text>
                <Text size="xs" c="dimmed">6 hours ago</Text>
              </div>
            </Group>
          </Stack>
        </Card>
      </Stack>
    </Container>
  );
};

export default WorkPage;