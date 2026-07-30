import React, { useState } from "react";

import { users as initialUsers } from "../../constant/data/users";
import UserHeader from "../../users/UserHeader";
import UserFilters from "../../users/UserFilters";
import UserTable from "../../users/UserTable";

const UsersPage = () => {
  const [users, setUsers] = useState(initialUsers); // 👈 endi state
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("All");
  const [status, setStatus] = useState("All");

  function handleReset() {
    setRole("All");
    setSearch("");
    setStatus("All");
  }

  const handleCreateUser = (newUser) => {
    setUsers([...users, newUser]);
  }

  const handleUpdateUser = (updateUser) => {
    setUsers((prevUser) => {
      prevUser.map((item) => 
      item.id === updateUser.id ? updateUser : prevUser,
      )
    })
  };

  const handleDelete = (id) => {
    setUsers((prevUsers) => prevUsers.filter((user) => item.id !== id));
  };

  const filteredData = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase());

    const matchesRole = role === "All" || user.role === role;
    const matchesStatus = status === "All" || user.status === status;

    return matchesSearch && matchesRole && matchesStatus;
  });

  return (
    <>
      <UserHeader onCreateUser={handleCreateUser }/>
      <UserFilters
        search={search}
        setSearch={setSearch}
        role={role}
        setRole={setRole}
        status={status}
        setStatus={setStatus}
        onReset={handleReset}
      />

      <UserTable users={users} setUsers={setUsers} />
    </>
  );
};

export default UsersPage;