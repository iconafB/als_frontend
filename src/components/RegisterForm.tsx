import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TextInput, PasswordInput, Button, Text, Group, Stack, SimpleGrid } from '@mantine/core';
import { Eye, EyeOff, Mail, Lock, User } from 'lucide-react';
import type { RegisterFormData } from '../types/auth';
import { registerSchema } from '../schemas/authSchema';
import { useAuth } from '../hooks/useAuth';

interface RegisterFormProps {
  onToggleForm: () => void;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({ onToggleForm }) => {
  const { register: registerUser, isRegisterLoading, registerError } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  });

  const onSubmit = (data: RegisterFormData) => {
    registerUser(data);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h2>
        <Text c="dimmed" size="sm">
          Join us today and get started
        </Text>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Stack gap="md">
          <SimpleGrid cols={2} spacing="sm">
            <TextInput
              {...register('first_name')}
              label="First Name"
              placeholder="John"
              leftSection={<User size={16} />}
              error={errors.first_name?.message}
              size="md"
              className="transition-all duration-200 focus-within:scale-[1.02]"
            />
            <TextInput
              {...register('last_name')}
              label="Last Name"
              placeholder="Doe"
              leftSection={<User size={16} />}
              error={errors.last_name?.message}
              size="md"
              className="transition-all duration-200 focus-within:scale-[1.02]"
            />
          </SimpleGrid>

          <TextInput
            {...register('email')}
            label="Email Address"
            placeholder="john.doe@example.com"
            leftSection={<Mail size={16} />}
            error={errors.email?.message}
            size="md"
            className="transition-all duration-200 focus-within:scale-[1.02]"
          />

          <PasswordInput
            {...register('password')}
            label="Password"
            placeholder="Create a strong password"
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

          <PasswordInput
            {...register('confirmPassword')}
            label="Confirm Password"
            placeholder="Confirm your password"
            leftSection={<Lock size={16} />}
            visible={showConfirmPassword}
            onVisibilityChange={setShowConfirmPassword}
            visibilityToggleIcon={({ reveal }) =>
              reveal ? <EyeOff size={16} /> : <Eye size={16} />
            }
            error={errors.confirmPassword?.message}
            size="md"
            className="transition-all duration-200 focus-within:scale-[1.02]"
          />

          {registerError && (
            <Text c="red" size="sm" ta="center" className="bg-red-50 p-3 rounded-lg">
              Registration failed. Please try again.
            </Text>
          )}

          <Button
            type="submit"
            loading={isRegisterLoading || isSubmitting}
            size="md"
            className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
            fullWidth
          >
            Create Account
          </Button>
        </Stack>
      </form>

      <Group justify="center" mt="xl">
        <Text c="dimmed" size="sm">
          Already have an account?{' '}
          <button
            onClick={onToggleForm}
            className="text-purple-500 hover:text-purple-600 font-medium transition-colors duration-200 underline decoration-2 underline-offset-2"
          >
            Sign in here
          </button>
        </Text>
      </Group>
    </div>
  );
};
