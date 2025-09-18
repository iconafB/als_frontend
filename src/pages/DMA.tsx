import React from 'react';
import { Card, Text, SimpleGrid, Group, Badge, Button, Avatar, Progress } from '@mantine/core';
import { Briefcase, Clock, Users, CheckCircle, AlertCircle, Calendar } from 'lucide-react';

export const DmaPage: React.FC = () => {
  const projects = [
    {
      title: 'Website Redesign',
      client: 'Tech Solutions Inc.',
      status: 'in-progress',
      progress: 75,
      deadline: '2024-03-25',
      team: 4,
      priority: 'high',
      description: 'Complete overhaul of company website with modern design'
    },
    {
      title: 'Mobile App Development',
      client: 'StartupXYZ',
      status: 'in-progress',
      progress: 45,
      deadline: '2024-04-15',
      team: 6,
      priority: 'medium',
      description: 'Native iOS and Android app for food delivery service'
    },
    {
      title: 'Database Migration',
      client: 'Enterprise Corp',
      status: 'completed',
      progress: 100,
      deadline: '2024-03-01',
      team: 3,
      priority: 'high',
      description: 'Migration from legacy system to cloud-based solution'
    },
    {
      title: 'E-commerce Platform',
      client: 'Retail Plus',
      status: 'planning',
      progress: 15,
      deadline: '2024-05-30',
      team: 5,
      priority: 'medium',
      description: 'Custom e-commerce solution with inventory management'
    },
    {
      title: 'API Integration',
      client: 'FinTech Solutions',
      status: 'in-progress',
      progress: 60,
      deadline: '2024-03-20',
      team: 2,
      priority: 'high',
      description: 'Third-party payment gateway integration'
    },
    {
      title: 'Data Analytics Dashboard',
      client: 'Analytics Pro',
      status: 'review',
      progress: 90,
      deadline: '2024-03-18',
      team: 3,
      priority: 'low',
      description: 'Real-time analytics dashboard with custom visualizations'
    }
  ];

  const tasks = [
    { title: 'Review client feedback', project: 'Website Redesign', due: 'Today', priority: 'high' },
    { title: 'Update project timeline', project: 'Mobile App Development', due: 'Tomorrow', priority: 'medium' },
    { title: 'Deploy to staging', project: 'API Integration', due: 'March 18', priority: 'high' },
    { title: 'Prepare presentation', project: 'Data Analytics Dashboard', due: 'March 19', priority: 'low' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'green';
      case 'in-progress': return 'blue';
      case 'review': return 'yellow';
      case 'planning': return 'purple';
      case 'on-hold': return 'gray';
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

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'green';
    if (progress >= 50) return 'blue';
    if (progress >= 25) return 'yellow';
    return 'red';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Work Projects</h1>
          <Text c="dimmed" size="lg">Manage your projects and track progress</Text>
        </div>
        <Button className="bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700">
          New Project
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <Card key={index} shadow="sm" padding="lg" radius="md" className="hover:shadow-lg transition-all duration-200 hover:scale-[1.02]">
            <Group justify="space-between" mb="md">
              <Avatar size="md" className="bg-gradient-to-r from-indigo-500 to-purple-500">
                <Briefcase size={20} color="white" />
              </Avatar>
              <Group gap="xs">
                <Badge color={getStatusColor(project.status)} variant="light" size="sm">
                  {project.status}
                </Badge>
                <Badge color={getPriorityColor(project.priority)} variant="outline" size="sm">
                  {project.priority}
                </Badge>
              </Group>
            </Group>

            <Text size="lg" fw={600} className="text-gray-900 mb-1" lineClamp={1}>
              {project.title}
            </Text>

            <Text size="sm" c="dimmed" mb="md">
              {project.client}
            </Text>

            <Text size="sm" c="dimmed" mb="md" lineClamp={2}>
              {project.description}
            </Text>

            <div className="space-y-3 mb-md">
              <div>
                <Group justify="space-between" mb="xs">
                  <Text size="sm" fw={500}>Progress</Text>
                  <Text size="sm" c="dimmed">{project.progress}%</Text>
                </Group>
                <Progress 
                  value={project.progress} 
                  color={getProgressColor(project.progress)} 
                  size="md" 
                  radius="xl" 
                />
              </div>

              <Group justify="space-between">
                <Group gap="xs">
                  <Calendar size={14} className="text-gray-500" />
                  <Text size="xs" c="dimmed">{project.deadline}</Text>
                </Group>
                <Group gap="xs">
                  <Users size={14} className="text-gray-500" />
                  <Text size="xs" c="dimmed">{project.team} members</Text>
                </Group>
              </Group>
            </div>

            <Group justify="space-between">
              <Button variant="light" size="sm">
                View Details
              </Button>
              <Button variant="outline" size="sm">
                Update
              </Button>
            </Group>
          </Card>
        ))}
      </div>

      <SimpleGrid cols={{ base: 1, lg: 2 }} spacing="lg">
        <Card shadow="sm" padding="lg" radius="md">
          <Group justify="space-between" mb="md">
            <Text size="lg" fw={600}>Upcoming Tasks</Text>
            <CheckCircle size={20} className="text-green-600" />
          </Group>
          <div className="space-y-3">
            {tasks.map((task, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <Text size="sm" fw={500} className="text-gray-900">
                    {task.title}
                  </Text>
                  <Text size="xs" c="dimmed">
                    {task.project} • Due: {task.due}
                  </Text>
                </div>
                <Badge color={getPriorityColor(task.priority)} variant="light" size="sm">
                  {task.priority}
                </Badge>
              </div>
            ))}
          </div>

        </Card>

        <Card shadow="sm" padding="lg" radius="md">
          <Group justify="space-between" mb="md">
            <Text size="lg" fw={600}>Project Statistics</Text>
            <AlertCircle size={20} className="text-blue-600" />
          </Group>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div>
                <Text size="lg" fw={600} className="text-green-700">2</Text>
                <Text size="sm" c="dimmed">Completed</Text>
              </div>
              <CheckCircle size={24} className="text-green-600" />
            </div>
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div>
                <Text size="lg" fw={600} className="text-blue-700">3</Text>
                <Text size="sm" c="dimmed">In Progress</Text>
              </div>
              <Clock size={24} className="text-blue-600" />
            </div>
            <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
              <div>
                <Text size="lg" fw={600} className="text-purple-700">1</Text>
                <Text size="sm" c="dimmed">Planning</Text>
              </div>
              <Calendar size={24} className="text-purple-600" />
            </div>
          </div>
        </Card>

      </SimpleGrid>
    </div>
  );

};

