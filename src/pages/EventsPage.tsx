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
  Timeline,
  SimpleGrid,
  Modal
} from '@mantine/core';

import { useDisclosure } from '@mantine/hooks';
import {
  IconCalendarEvent,
  IconMapPin,
  IconClock,
  IconUsers,
  IconPlus,
  IconVideo,
  IconBuildingSkyscraper,
} from '@tabler/icons-react';



const EventsPage = () => {

  const stats = [
    { title: 'Dedupe Campaigns', value: '12', icon: IconCalendarEvent, color: 'blue' },
    { title: '######', value: '4', icon: IconClock, color: 'green' },
    { title: '########', value: '6', icon: IconVideo, color: 'purple' },
    { title: '#######', value: '234', icon: IconUsers, color: 'orange' },
  ];
  
  return (
    <Container size="xl" px={0}>
      <Stack gap="xl">
        <div>
          <Group justify="space-between" mb="lg">
            <Title order={2} c="dark">
              DEDUPE CAMPAIGNS 
            </Title>
            <Button leftSection={<IconPlus size={16} />}>
              MANUAL DEDUPE FILE INSERT
            </Button>
            <Button leftSection={<IconPlus size={16}/>}>
              INSERT DEDUPE LIST
            </Button>
            <Button leftSection={<IconPlus size={16}/>}>
              INSERT ENRICHED DATA
            </Button>
          </Group>
          <Text c="dimmed" size="sm">
            Manage and observe dedupe campaigns
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

export default EventsPage;