
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
  Button,
  Avatar,
  SimpleGrid,
  RingProgress,
  Center,
} from '@mantine/core';
import {
  IconSchool,
  IconBook,
  IconCertificate,
  IconTrophy,
  IconPlayerPlay,
  IconBookmark,
  IconClock,
  IconUsers,
  IconStar,
} from '@tabler/icons-react';

const EducationPage = () => {
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
    { title: 'Courses Enrolled', value: '8', icon: IconBook, color: 'blue' },
    { title: 'Certificates', value: '3', icon: IconCertificate, color: 'green' },
    { title: 'Study Hours', value: '127', icon: IconClock, color: 'orange' },
    { title: 'Achievements', value: '15', icon: IconTrophy, color: 'purple' },
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

  return (
    <Container size="xl" px={0}>
      <Stack gap="xl">
        <div>
          <Group justify="space-between" mb="lg">
            <Title order={2} c="dark">
              Education Center
            </Title>
            <Button leftSection={<IconBook size={16} />}>
              Browse Courses
            </Button>
          </Group>
          <Text c="dimmed" size="sm">
            Track your learning progress and discover new courses
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
          <Grid.Col span={{ base: 12, lg: 8 }}>
            <Card padding="lg" radius="md" withBorder>
              <Group justify="space-between" mb="md">
                <Title order={3}>My Courses</Title>
                <Group>
                  <Badge variant="light" color="blue">3 Active</Badge>
                  <Badge variant="light" color="green">5 Completed</Badge>
                </Group>
              </Group>
              
              <Stack gap="md">
                {courses.map((course, index) => (
                  <Card key={index} padding="md" radius="sm" withBorder>
                    <Group align="flex-start">
                      <div
                        style={{
                          width: 80,
                          height: 60,
                          borderRadius: 8,
                          backgroundImage: `url(${course.image})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                        }}
                      />
                      
                      <div style={{ flex: 1 }}>
                        <Group justify="space-between" mb="xs">
                          <Text fw={500} size="lg">
                            {course.title}
                          </Text>
                          <Group gap="xs">
                            <Badge
                              color={getStatusColor(course.status)}
                              variant="light"
                              size="sm"
                            >
                              {course.status.replace('-', ' ')}
                            </Badge>
                            <Badge
                              color={getLevelColor(course.level)}
                              variant="outline"
                              size="sm"
                            >
                              {course.level}
                            </Badge>
                          </Group>
                        </Group>
                        
                        <Text size="sm" c="dimmed" mb="sm">
                          By {course.instructor}
                        </Text>
                        
                        <Group gap="md" mb="sm">
                          <Group gap="xs">
                            <IconClock size={14} />
                            <Text size="xs">{course.duration}</Text>
                          </Group>
                          <Group gap="xs">
                            <IconUsers size={14} />
                            <Text size="xs">{course.enrolled.toLocaleString()} enrolled</Text>
                          </Group>
                          <Group gap="xs">
                            <IconStar size={14} />
                            <Text size="xs">{course.rating}/5</Text>
                          </Group>
                        </Group>
                        
                        {course.status === 'in-progress' && (
                          <div>
                            <Group justify="space-between" mb={5}>
                              <Text size="sm" fw={500}>
                                Progress
                              </Text>
                              <Text size="sm" c="dimmed">
                                {course.progress}%
                              </Text>
                            </Group>
                            <Progress value={course.progress} radius="sm" />
                          </div>
                        )}
                        
                        <Group mt="md" gap="sm">
                          {course.status === 'completed' ? (
                            <Button variant="light" color="green" leftSection={<IconCertificate size={16} />}>
                              View Certificate
                            </Button>
                          ) : (
                            <Button variant="light" leftSection={<IconPlayerPlay size={16} />}>
                              {course.status === 'not-started' ? 'Start Course' : 'Continue'}
                            </Button>
                          )}
                          <ActionIcon variant="light" color="gray">
                            <IconBookmark size={16} />
                          </ActionIcon>
                        </Group>
                      </div>
                    </Group>
                  </Card>
                ))}
              </Stack>
            </Card>
          </Grid.Col>

          <Grid.Col span={{ base: 12, lg: 4 }}>
            <Stack gap="md">
              <Card padding="lg" radius="md" withBorder>
                <Title order={4} mb="md">
                  Learning Progress
                </Title>
                <Center>
                  <RingProgress
                    size={120}
                    thickness={12}
                    sections={[
                      { value: 65, color: 'blue', tooltip: 'Completed courses' },
                      { value: 25, color: 'orange', tooltip: 'In progress' },
                    ]}
                    label={
                      <Center>
                        <div style={{ textAlign: 'center' }}>
                          <Text fw={700} size="xl">65%</Text>
                          <Text size="sm" c="dimmed">Complete</Text>
                        </div>
                      </Center>
                    }
                  />
                </Center>
                <Group justify="center" mt="md" gap="xl">
                  <div style={{ textAlign: 'center' }}>
                    <Text size="lg" fw={700} c="blue">5</Text>
                    <Text size="xs" c="dimmed">Completed</Text>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <Text size="lg" fw={700} c="orange">3</Text>
                    <Text size="xs" c="dimmed">In Progress</Text>
                  </div>
                </Group>
              </Card>

              <Card padding="lg" radius="md" withBorder>
                <Title order={4} mb="md">
                  Recent Achievements
                </Title>
                <Stack gap="md">
                  {achievements.map((achievement, index) => (
                    <Group key={index}>
                      <ActionIcon color={achievement.color} variant="light" size="lg">
                        <IconTrophy size={20} />
                      </ActionIcon>
                      <div style={{ flex: 1 }}>
                        <Text fw={500} size="sm">
                          {achievement.title}
                        </Text>
                        <Text size="xs" c="dimmed">
                          {achievement.description}
                        </Text>
                      </div>
                    </Group>
                  ))}
                </Stack>
              </Card>

              <Card padding="lg" radius="md" withBorder>
                <Title order={4} mb="md">
                  Study Streak
                </Title>
                <Center mb="md">
                  <div style={{ textAlign: 'center' }}>
                    <Text size="3xl" fw={700} c="orange">
                      15
                    </Text>
                    <Text c="dimmed">days in a row</Text>
                  </div>
                </Center>
                <Text size="sm" c="dimmed" ta="center">
                  Keep it up! You're doing great maintaining your learning consistency.
                </Text>
              </Card>

              <Card padding="lg" radius="md" withBorder>
                <Title order={4} mb="md">
                  Recommended
                </Title>
                <Stack gap="sm">
                  <Text size="sm" fw={500}>JavaScript Advanced Patterns</Text>
                  <Text size="xs" c="dimmed" mb="xs">Based on your React course</Text>
                  <Button size="xs" variant="light" fullWidth>
                    View Course
                  </Button>
                </Stack>
              </Card>
            </Stack>
          </Grid.Col>
        </Grid>
      </Stack>
    </Container>
  );
};

export default EducationPage;