// hooks/useAuth.ts
// hooks/useAuth.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { auth_api } from "../api/auth/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
import { useAuthContext } from "../contexts/auth-context"; // Import context

export const useAuth = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { updateToken } = useAuthContext(); // Use context to update token

  const loginMutation = useMutation({
    mutationFn: auth_api.login_user,
    onSuccess: (data) => {
      updateToken(data.access_token); // This updates both state AND localStorage
      toast.success("Logged in successfully");
      setTimeout(() => navigate("/dashboard"), 150);
    },
    onError: () => {
      toast.error("Login failed. Please check your credentials.");
    },
  });

  const registerMutation = useMutation({
    mutationFn: auth_api.register_user,
    onSuccess: (data) => {
      toast.success(`${data.first_name} registered successfully`);
      // Optionally auto-login after register?
    },
    onError: () => {
      toast.error("Registration failed.");
    },
  });

  const logout = useCallback(() => {
    updateToken(null); // Clears token + localStorage
    queryClient.clear();
    navigate("/login");
  }, [updateToken, queryClient, navigate]);

  return {
    login: loginMutation.mutate,
    register: registerMutation.mutate,
    logout,
    isLoginLoading: loginMutation.isPending,
    isRegisterLoading: registerMutation.isPending,
    loginError: loginMutation.error,
    registerError: registerMutation.error,
  };
};