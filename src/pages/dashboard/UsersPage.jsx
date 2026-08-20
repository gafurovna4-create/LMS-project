import React, { useState } from "react";
import { useUsers } from "../../hooks/useUsers";
import UserHeader from "../../users/UserHeader";
import UserFilters from "../../users/UserFilters";
import UserTable from "../../users/UserTable";

const UsersPage = () => {
  const { data: users = [], isLoading, isError, error } = useUsers();
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("All");
  const [status, setStatus] = useState("All");

  function handleReset() {
    setRole("All");
    setSearch("");
    setStatus("All");
  }

  const filteredData = users.filter((user) => {
    const matchesSearch =
      user.name?.toLowerCase().includes(search.toLowerCase()) ||
      user.email?.toLowerCase().includes(search.toLowerCase());

    const matchesRole = role === "All" || user.role === role;
    const matchesStatus = status === "All" || user.status === status;

    return matchesSearch && matchesRole && matchesStatus;
  });

  if (isLoading) {
    return (
      <div className="flex min-h-75 items-center justify-center">
        <p className="text-gray-500">Yuklanmoqda...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex min-h-75 items-center justify-center">
        <p className="text-red-500">{error?.message || "Foydalanuvchilarni yuklab bo'lmadi"}</p>
      </div>
    );
  }

  return (
    <>
      <UserHeader />
      <UserFilters
        search={search}
        setSearch={setSearch}
        role={role}
        setRole={setRole}
        status={status}
        setStatus={setStatus}
        onReset={handleReset}
      />

      <UserTable users={filteredData} />
    </>
  );
};

export default UsersPage;