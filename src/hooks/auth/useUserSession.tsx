'use client';

import { useQuery } from '@tanstack/react-query';

import { services } from '@/container';
import { User } from '@/core/domain/models/auth';

export function useUserSession() {
  const {
    data: user,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery<User, Error>({
    queryKey: ['userSession'],
    queryFn: async () => {
      return services.AuthService.getUserSession();
    },
    enabled: false,
    retry: false,
    refetchOnWindowFocus: false,
  });

  return {
    user: user ?? null,
    isLoading,
    isError,
    error,
    fetchUserSession: refetch,
  };
}
