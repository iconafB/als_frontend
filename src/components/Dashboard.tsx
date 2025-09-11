
import React from 'react';
import { Button, Text, Card, Group, Avatar, Stack } from '@mantine/core';
import { LogOut, User, Mail } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

export const Dashboard: React.FC = () => {

  const {  logout } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4">
      <div className="max-w-2xl mx-auto pt-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to Your Dashboard</h1>
          <Text c="dimmed" size="lg">
            You have successfully logged in!
          </Text>
        </div>

        <Card shadow="lg" padding="xl" radius="lg" className="backdrop-blur-sm bg-white/70 border border-white/20">
          <Stack gap="lg">
            <Group justify="center">
              <Avatar
                size={80}
                radius="xl"
                className="bg-gradient-to-r from-blue-500 to-purple-500"
              >
                <User size={40} color="white" />
              </Avatar>
            </Group>

            <Stack gap="md" align="center">
              <Text size="xl" fw={600} className="text-gray-900">
                Welcome With Your Email
              </Text>
              
              <Group gap="xs" c="dimmed">
                <Mail size={16} />
                <Text size="sm">Welcome With Your Email</Text>
              </Group>
            </Stack>

            <div className="bg-gray-50 p-4 rounded-lg">
              <Text size="sm" c="dimmed" ta="center">
                This is a demo dashboard
              </Text>
            </div>

            <Button
              onClick={logout}
              variant="outline"
              leftSection={<LogOut size={16} />}
              size="md"
              className="border-red-200 text-red-600 hover:bg-red-50 transition-all duration-200"
              fullWidth
            >
              Sign Out
            </Button>
          </Stack>
        </Card>
      </div>
    </div>
  );
};