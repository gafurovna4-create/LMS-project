import { useQuery, useQueryClient } from "@tanstack/react-query";
import ProductHeader from "./ProductHeader";
import { api } from "./api/api";

const Product = () => {
  const queryClient = useQueryClient();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["products"],
    queryFn: () => api.get("/products").then((res) => res.data),
  });

  const products = data ?? [];

  const handleProductAdded = (newProduct) => {
    queryClient.setQueryData(["products"], (prev = []) => [newProduct, ...prev]);
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error?.message || "Failed to load products"}</p>;

  return (
    <div className="max-w-7xl mx-auto p-6">
      <ProductHeader onProductAdded={handleProductAdded} />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
        {products.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition duration-300"
          >
            <img
              src={item.images?.[0] || "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80"}
              alt={item.title}
              className="w-full h-52 object-cover"
            />

            <div className="p-4">
              <h2 className="text-lg font-semibold line-clamp-2">
                {item.title}
              </h2>

              <p className="text-gray-500 text-sm mt-2 line-clamp-3">
                {item.description}
              </p>

              <div className="flex justify-between items-center mt-4">
                <span className="text-xl font-bold text-green-600">
                  ${item.price}
                </span>

                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                  Buy
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Product;