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
} from '@mantine/core';
import {
  IconCalendarEvent,
  IconMapPin,
  IconClock,
  IconUsers,
  IconPlus,
  IconCalendar,
  IconVideo,
  IconBuildingSkyscraper,
} from '@tabler/icons-react';

const EventsPage = () => {
  const upcomingEvents = [
    {
      title: 'Team Standup',
      date: '2025-01-10',
      time: '09:00 AM',
      location: 'Conference Room A',
      type: 'meeting',
      attendees: 8,
      status: 'confirmed',
    },
    {
      title: 'Product Launch Webinar',
      date: '2025-01-12',
      time: '02:00 PM',
      location: 'Online',
      type: 'webinar',
      attendees: 150,
      status: 'confirmed',
    },
    {
      title: 'Client Presentation',
      date: '2025-01-15',
      time: '10:30 AM',
      location: 'Client Office',
      type: 'presentation',
      attendees: 5,
      status: 'pending',
    },
    {
      title: 'Annual Company Retreat',
      date: '2025-01-20',
      time: '09:00 AM',
      location: 'Mountain Resort',
      type: 'retreat',
      attendees: 45,
      status: 'confirmed',
    },
  ];

  const stats = [
    { title: 'Upcoming Events', value: '12', icon: IconCalendarEvent, color: 'blue' },
    { title: 'This Week', value: '4', icon: IconClock, color: 'green' },
    { title: 'Virtual Events', value: '6', icon: IconVideo, color: 'purple' },
    { title: 'Attendees', value: '234', icon: IconUsers, color: 'orange' },
  ];

  const getEventTypeIcon = (type: string) => {
    switch (type) {
      case 'meeting': return IconUsers;
      case 'webinar': return IconVideo;
      case 'presentation': return IconBuildingSkyscraper;
      case 'retreat': return IconMapPin;
      default: return IconCalendarEvent;
    }
  };

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'meeting': return 'blue';
      case 'webinar': return 'purple';
      case 'presentation': return 'orange';
      case 'retreat': return 'green';
      default: return 'gray';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'green';
      case 'pending': return 'yellow';
      case 'cancelled': return 'red';
      default: return 'gray';
    }
  };

  return (
    <Container size="xl" px={0}>
      <Stack gap="xl">
        <div>
          <Group justify="space-between" mb="lg">
            <Title order={2} c="dark">
              Events Calendar
            </Title>
            <Button leftSection={<IconPlus size={16} />}>
              Create Event
            </Button>
          </Group>
          <Text c="dimmed" size="sm">
            Manage your schedule and upcoming events
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

        <Grid>
          <Grid.Col span={{ base: 12, md: 8 }}>
            <Card padding="lg" radius="md" withBorder>
              <Title order={3} mb="md">
                Upcoming Events
              </Title>
              <Stack gap="md">
                {upcomingEvents.map((event, index) => {
                  const EventIcon = getEventTypeIcon(event.type);
                  return (
                    <Card key={index} padding="md" radius="sm" withBorder>
                      <Group justify="space-between" mb="sm">
                        <Group>
                          <ActionIcon
                            color={getEventTypeColor(event.type)}
                            variant="light"
                            radius="md"
                          >
                            <EventIcon size={18} />
                          </ActionIcon>
                          <div>
                            <Text fw={500}>{event.title}</Text>
                            <Text size="sm" c="dimmed">
                              {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                            </Text>
                          </div>
                        </Group>
                        <Badge
                          color={getStatusColor(event.status)}
                          variant="light"
                        >
                          {event.status}
                        </Badge>
                      </Group>

                      <Group gap="md">
                        <Group gap="xs">
                          <IconCalendar size={14} />
                          <Text size="sm">
                            {new Date(event.date).toLocaleDateString()}
                          </Text>
                        </Group>
                        <Group gap="xs">
                          <IconClock size={14} />
                          <Text size="sm">{event.time}</Text>
                        </Group>
                        <Group gap="xs">
                          <IconMapPin size={14} />
                          <Text size="sm">{event.location}</Text>
                        </Group>
                        <Group gap="xs">
                          <IconUsers size={14} />
                          <Text size="sm">{event.attendees} attendees</Text>
                        </Group>
                      </Group>
                    </Card>
                  );
                })}
              </Stack>
            </Card>
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 4 }}>
            <Stack gap="md">
              <Card padding="lg" radius="md" withBorder>
                <Title order={4} mb="md">
                  Today's Schedule
                </Title>
                <Timeline active={1} bulletSize={24} lineWidth={2}>
                  <Timeline.Item
                    bullet={<IconUsers size={12} />}
                    title="Team Standup"
                  >
                    <Text c="dimmed" size="sm">
                      9:00 AM - Conference Room A
                    </Text>
                  </Timeline.Item>
                  <Timeline.Item
                    bullet={<IconBuildingSkyscraper size={12} />}
                    title="Client Call"
                  >
                    <Text c="dimmed" size="sm">
                      2:00 PM - Online
                    </Text>
                  </Timeline.Item>
                  <Timeline.Item
                    title="Project Review"
                    bullet={<IconCalendarEvent size={12} />}
                  >
                    <Text c="dimmed" size="sm">
                      4:30 PM - Conference Room B
                    </Text>
                  </Timeline.Item>
                </Timeline>
              </Card>

              <Card padding="lg" radius="md" withBorder>
                <Title order={4} mb="md">
                  Quick Actions
                </Title>
                <Stack gap="sm">
                  <Button variant="light" leftSection={<IconPlus size={16} />} fullWidth>
                    Schedule Meeting
                  </Button>
                  <Button variant="light" leftSection={<IconVideo size={16} />} fullWidth>
                    Start Video Call
                  </Button>
                  <Button variant="light" leftSection={<IconCalendar size={16} />} fullWidth>
                    View Calendar
                  </Button>
                </Stack>
              </Card>

              <Card padding="lg" radius="md" withBorder>
                <Title order={4} mb="md">
                  Recent Invitations
                </Title>
                <Stack gap="sm">
                  <Group>
                    <Avatar size="sm" color="blue">AM</Avatar>
                    <div style={{ flex: 1 }}>
                      <Text size="sm" fw={500}>Alice invited you to "Marketing Review"</Text>
                      <Text size="xs" c="dimmed">2 hours ago</Text>
                    </div>
                  </Group>
                  <Group>
                    <Avatar size="sm" color="green">BT</Avatar>
                    <div style={{ flex: 1 }}>
                      <Text size="sm" fw={500}>Bob scheduled "Team Lunch"</Text>
                      <Text size="xs" c="dimmed">1 day ago</Text>
                    </div>
                  </Group>
                </Stack>
              </Card>
            </Stack>
          </Grid.Col>
        </Grid>
      </Stack>
    </Container>
  );
};

export default EventsPage;