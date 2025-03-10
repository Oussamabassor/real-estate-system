import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { propertyService } from '../services/propertyService';
import { queryKeys } from '../services/queryClient';

export function useProperties(page = 1, perPage = 10) {
  return useQuery({
    queryKey: [...queryKeys.properties.all, page, perPage],
    queryFn: () => propertyService.getAll(page, perPage),
    keepPreviousData: true,
  });
}

export function useProperty(id) {
  return useQuery({
    queryKey: queryKeys.properties.detail(id),
    queryFn: () => propertyService.getById(id),
    enabled: !!id,
  });
}

export function useFeaturedProperties() {
  return useQuery({
    queryKey: queryKeys.properties.featured,
    queryFn: () => propertyService.getAll(1, 6),
  });
}

export function useSearchProperties(query, filters) {
  return useQuery({
    queryKey: [...queryKeys.properties.search(filters), query],
    queryFn: () => propertyService.search(query, filters),
    enabled: !!query,
  });
}

export function useCreateProperty() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => propertyService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries(queryKeys.properties.all);
    },
  });
}

export function useUpdateProperty() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => propertyService.update(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries(queryKeys.properties.detail(variables.id));
      queryClient.invalidateQueries(queryKeys.properties.all);
    },
  });
}

export function useDeleteProperty() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => propertyService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries(queryKeys.properties.all);
    },
  });
} 