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
  IconFiles
} from '@tabler/icons-react';


const HomePage = () => {
  
  const stats = [
    { title: 'Campaigns', value: '12', icon: IconBriefcase, color: 'blue' },
    { title: 'dedupe campaigns', value: '148', icon: IconCircleCheck, color: 'green' },
    { title: 'campaigns rules', value: '24', icon: IconUsers, color: 'orange' },
    { title: 'DMA records', value: '7', icon: IconFiles, color: 'red' },
  ];

  

  return (
    <Container size="xl" px={0}>
      <Stack gap="xl">
        <div>
          <Group justify="space-between" mb="lg">
            <Title order={2} c="dark">
              ALS DASHBOARD
            </Title>
            <Button leftSection={<IconBriefcase size={16} />}>
              New Project
            </Button>
          </Group>
          <Text c="dimmed" size="sm">
            Manage campaigns, set campaign rules and track dma records 
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

        
      </Stack>
    </Container>
  );
};

export default HomePage;