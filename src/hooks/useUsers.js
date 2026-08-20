import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "../api/api";

export const fetchUsers = () => api.get("/users").then((res) => res.data);

export const createUser = (payload) =>
  api.post("/users", payload).then((res) => res.data);

export const updateUser = ({ id, ...payload }) =>
  api.put(`/users/${id}`, payload).then((res) => res.data);

export const deleteUser = (id) =>
  api.delete(`/users/${id}`).then((res) => res.data);

export function useUsers() {
  return useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
    staleTime: 1000 * 60 * 5,
  });
}

export function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createUser,
    onSuccess: (newUser) => {
      queryClient.setQueryData(["users"], (prev = []) => [newUser, ...(prev || [])]);
    },
  });
}

export function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateUser,
    onSuccess: (updatedUser) => {
      queryClient.setQueryData(["users"], (prev = []) =>
        prev.map((user) => (user.id === updatedUser.id ? updatedUser : user))
      );
    },
  });
}

export function useDeleteUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteUser,
    onSuccess: (_, id) => {
      queryClient.setQueryData(["users"], (prev = []) =>
        prev.filter((user) => user.id !== id)
      );
    },
  });
}
