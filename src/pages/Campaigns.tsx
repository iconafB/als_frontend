import React from 'react';
import { Card, Text, SimpleGrid, Group, Badge, Button, Avatar, Progress } from '@mantine/core';
import { GraduationCap, Users, BookOpen, Award, MapPin, Phone } from 'lucide-react';

export const CampaignsPage: React.FC = () => {
  const schools = [
    {
      name: 'Riverside Elementary',
      type: 'Elementary',
      students: 450,
      teachers: 25,
      rating: 4.8,
      address: '123 Oak Street',
      phone: '(555) 123-4567',
      programs: ['STEM', 'Arts', 'Sports'],
      performance: 92
    },
    {
      name: 'Central High School',
      type: 'High School',
      students: 1200,
      teachers: 75,
      rating: 4.6,
      address: '456 Main Avenue',
      phone: '(555) 234-5678',
      programs: ['AP Courses', 'Robotics', 'Drama', 'Athletics'],
      performance: 88
    },
    {
      name: 'Westside Middle School',
      type: 'Middle School',
      students: 650,
      teachers: 40,
      rating: 4.5,
      address: '789 Pine Road',
      phone: '(555) 345-6789',
      programs: ['Band', 'Science Club', 'Student Council'],
      performance: 85
    },
    {
      name: 'Northgate Academy',
      type: 'Private',
      students: 300,
      teachers: 20,
      rating: 4.9,
      address: '321 Elm Street',
      phone: '(555) 456-7890',
      programs: ['IB Program', 'Language Immersion', 'Fine Arts'],
      performance: 95
    }
  ];

  const achievements = [
    { school: 'Central High School', achievement: 'State Championship - Debate Team', date: '2024' },
    { school: 'Riverside Elementary', achievement: 'Excellence in STEM Education Award', date: '2024' },
    { school: 'Northgate Academy', achievement: 'Top 10 Private Schools Recognition', date: '2024' },
    { school: 'Westside Middle School', achievement: 'Community Service Award', date: '2023' }
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Elementary': return 'green';
      case 'Middle School': return 'blue';
      case 'High School': return 'purple';
      case 'Private': return 'orange';
      default: return 'gray';
    }
  };

  const getPerformanceColor = (performance: number) => {
    if (performance >= 90) return 'green';
    if (performance >= 80) return 'blue';
    if (performance >= 70) return 'yellow';
    return 'red';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Schools Directory</h1>
          <Text c="dimmed" size="lg">Explore educational institutions in our network</Text>
        </div>
        <Button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700">
          Add School
        </Button>
      </div>

      <SimpleGrid cols={{ base: 1, lg: 2 }} spacing="lg">
        {schools.map((school, index) => (
          <Card key={index} shadow="sm" padding="lg" radius="md" className="hover:shadow-lg transition-shadow duration-200">
            <Group justify="space-between" mb="md">
              <div className="flex items-center gap-3">
                <Avatar size="lg" className="bg-gradient-to-r from-blue-500 to-purple-500">
                  <GraduationCap size={24} color="white" />
                </Avatar>
                <div>
                  <Text size="lg" fw={600} className="text-gray-900">
                    {school.name}
                  </Text>
                  <Group gap="xs">
                    <Badge color={getTypeColor(school.type)} variant="light" size="sm">
                      {school.type}
                    </Badge>
                    <Text size="sm" c="dimmed">
                      ⭐ {school.rating}
                    </Text>
                  </Group>
                </div>
              </div>
            </Group>

            <div className="space-y-3 mb-md">
              <Group justify="space-between">
                <Group gap="xs">
                  <Users size={16} className="text-gray-500" />
                  <Text size="sm" c="dimmed">{school.students} students</Text>
                </Group>
                <Group gap="xs">
                  <BookOpen size={16} className="text-gray-500" />
                  <Text size="sm" c="dimmed">{school.teachers} teachers</Text>
                </Group>
              </Group>

              <Group gap="xs">
                <MapPin size={16} className="text-gray-500" />
                <Text size="sm" c="dimmed">{school.address}</Text>
              </Group>

              <Group gap="xs">
                <Phone size={16} className="text-gray-500" />
                <Text size="sm" c="dimmed">{school.phone}</Text>
              </Group>

              <div>
                <Text size="sm" fw={500} mb="xs">Performance Score</Text>
                <Progress 
                  value={school.performance} 
                  color={getPerformanceColor(school.performance)} 
                  size="md" 
                  radius="xl" 
                />
                <Text size="xs" c="dimmed" ta="right" mt="xs">
                  {school.performance}%
                </Text>
              </div>
            </div>

            <div className="mb-md">
              <Text size="sm" fw={500} mb="xs">Programs</Text>
              <Group gap="xs">
                {school.programs.map((program, idx) => (
                  <Badge key={idx} variant="outline" size="xs">
                    {program}
                  </Badge>
                ))}
              </Group>
            </div>

            <Group justify="space-between">
              <Button variant="light" size="sm">
                View Details
              </Button>
              <Button variant="outline" size="sm">
                Contact
              </Button>
            </Group>
          </Card>
        ))}
      </SimpleGrid>

      <Card shadow="sm" padding="lg" radius="md">
        <Group justify="space-between" mb="md">
          <Text size="lg" fw={600}>Recent Achievements</Text>
          <Award size={20} className="text-yellow-600" />
        </Group>
        <div className="space-y-3">
          {achievements.map((achievement, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-yellow-200">
              <div className="flex-1">
                <Text size="sm" fw={500} className="text-gray-900">
                  {achievement.achievement}
                </Text>
                <Text size="xs" c="dimmed">
                  {achievement.school}
                </Text>
              </div>
              <Badge color="yellow" variant="light" size="sm">
                {achievement.date}
              </Badge>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};