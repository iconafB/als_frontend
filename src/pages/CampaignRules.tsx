
import React from 'react';
import { Card, Text, SimpleGrid, Group, Badge, Button, Avatar } from '@mantine/core';
import { Trophy, Users, Calendar, MapPin, Clock } from 'lucide-react';

export const CampaignRulesPage: React.FC = () => {
  const sportsTeams = [
    {
      name: 'Thunder Hawks',
      sport: 'Basketball',
      members: 12,
      nextGame: 'Tomorrow 7:00 PM',
      location: 'Main Gym',
      status: 'active',
      wins: 8,
      losses: 2
    },
    {
      name: 'Lightning Bolts',
      sport: 'Soccer',
      members: 18,
      nextGame: 'Friday 6:00 PM',
      location: 'Sports Field',
      status: 'active',
      wins: 6,
      losses: 4
    },
    {
      name: 'Wave Riders',
      sport: 'Swimming',
      members: 15,
      nextGame: 'Next Week',
      location: 'Aquatic Center',
      status: 'training',
      wins: 10,
      losses: 1
    },
    {
      name: 'Court Kings',
      sport: 'Tennis',
      members: 8,
      nextGame: 'Sunday 2:00 PM',
      location: 'Tennis Courts',
      status: 'active',
      wins: 5,
      losses: 3
    }
  ];

  const upcomingEvents = [
    { title: 'Regional Championship', date: 'March 15', sport: 'Basketball' },
    { title: 'Inter-School Tournament', date: 'March 22', sport: 'Soccer' },
    { title: 'Swimming Gala', date: 'April 5', sport: 'Swimming' },
    { title: 'Tennis Open', date: 'April 12', sport: 'Tennis' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'green';
      case 'training': return 'blue';
      case 'inactive': return 'gray';
      default: return 'gray';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Sports Teams</h1>
          <Text c="dimmed" size="lg">Manage your sports teams and track performance</Text>
        </div>
        <Button className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700">
          Add New Team
        </Button>
      </div>

      <SimpleGrid cols={{ base: 1, md: 2 }} spacing="lg">
        {sportsTeams.map((team, index) => (
          <Card key={index} shadow="sm" padding="lg" radius="md" className="hover:shadow-lg transition-shadow duration-200">
            <Group justify="space-between" mb="md">
              <div className="flex items-center gap-3">
                <Avatar size="lg" className="bg-gradient-to-r from-green-500 to-blue-500">
                  <Trophy size={24} color="white" />
                </Avatar>
                <div>
                  <Text size="lg" fw={600} className="text-gray-900">
                    {team.name}
                  </Text>
                  <Text size="sm" c="dimmed">
                    {team.sport}
                  </Text>
                </div>
              </div>
              <Badge color={getStatusColor(team.status)} variant="light">
                {team.status}
              </Badge>
            </Group>

            <div className="space-y-3">
              <Group justify="space-between">
                <Group gap="xs">
                  <Users size={16} className="text-gray-500" />
                  <Text size="sm" c="dimmed">{team.members} members</Text>
                </Group>
                <Text size="sm" fw={500} className="text-green-600">
                  {team.wins}W - {team.losses}L
                </Text>
              </Group>

              <Group gap="xs">
                <Calendar size={16} className="text-gray-500" />
                <Text size="sm" c="dimmed">Next: {team.nextGame}</Text>
              </Group>

              <Group gap="xs">
                <MapPin size={16} className="text-gray-500" />
                <Text size="sm" c="dimmed">{team.location}</Text>
              </Group>
            </div>

            <Group justify="space-between" mt="md">
              <Button variant="light" size="sm">
                View Details
              </Button>
              <Button variant="outline" size="sm">
                Schedule
              </Button>
            </Group>
          </Card>
        ))}
      </SimpleGrid>

      <Card shadow="sm" padding="lg" radius="md">
        <Group justify="space-between" mb="md">
          <Text size="lg" fw={600}>Upcoming Events</Text>
          <Clock size={20} className="text-blue-600" />
        </Group>
        <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} spacing="md">
          {upcomingEvents.map((event, index) => (
            <div key={index} className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-100">
              <Text size="sm" fw={500} className="text-gray-900 mb-1">
                {event.title}
              </Text>
              <Text size="xs" c="dimmed" mb="2">
                {event.sport}
              </Text>
              <Badge color="blue" variant="light" size="xs">
                {event.date}
              </Badge>
            </div>
          ))}
        </SimpleGrid>
      </Card>
    </div>
  );
};