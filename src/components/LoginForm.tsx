import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TextInput, PasswordInput, Button, Text, Group, Stack } from '@mantine/core';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';
import type { LoginFormData } from '../types/auth';
import { loginSchema } from '../schemas/authSchema';

import { useAuth } from '../hooks/useAuth';


interface LoginFormProps {
  onToggleForm: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onToggleForm }) => {
  const { login, isLoginLoading, loginError } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: '',
      password: ''
    }
  });

  const onSubmit = (data: LoginFormData) => {
    login(data);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h2>
        <Text c="dimmed" size="sm">
          Sign in to your account to continue
        </Text>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Stack gap="md">
          <TextInput
            {...register('username')}
            label="Email Address"
            placeholder="Enter your email"
            leftSection={<Mail size={16} />}
            error={errors.username?.message}
            size="md"
            className="transition-all duration-200 focus-within:scale-[1.02]"
          />

          <PasswordInput
            {...register('password')}
            label="Password"
            placeholder="Enter your password"
            leftSection={<Lock size={16} />}
            visible={showPassword}
            onVisibilityChange={setShowPassword}
            visibilityToggleIcon={({ reveal }) =>
              reveal ? <EyeOff size={16} /> : <Eye size={16} />
            }
            error={errors.password?.message}
            size="md"
            className="transition-all duration-200 focus-within:scale-[1.02]"
          />

          {loginError && (
            <Text c="red" size="sm" ta="center" className="bg-red-50 p-3 rounded-lg">
              Login failed. Please try again.
            </Text>
          )}

          <Button
            type="submit"
            loading={isLoginLoading || isSubmitting}
            size="md"
            className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105"
            fullWidth
          >
            Sign In
          </Button>
        </Stack>
      </form>

      <Group justify="center" mt="xl">
        <Text c="dimmed" size="sm">
          Don't have an account?{' '}
          <button
            onClick={onToggleForm}
            className="text-blue-500 hover:text-blue-600 font-medium transition-colors duration-200 underline decoration-2 underline-offset-2"
          >
            Create one here
          </button>
        </Text>
      </Group>
    </div>
  );
};