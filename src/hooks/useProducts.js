import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "../api/api";

export const fetchProducts = () => api.get("/products").then((res) => res.data);

export const createProduct = (payload) =>
  api.post("/products", payload).then((res) => res.data);

export function useProducts() {
  return useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });
}

export function useCreateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createProduct,
    onSuccess: (newProduct) => {
      queryClient.setQueryData(["products"], (prev = []) => {
        const exists = prev.some((item) => item.id === newProduct.id);
        return exists ? prev : [newProduct, ...prev];
      });

      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
}
