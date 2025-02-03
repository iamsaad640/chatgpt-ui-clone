import { Box, Text, Switch } from "@chakra-ui/react";
import DataTable from "react-data-table-component";
import { useState } from "react";

const initialData = [
  { id: 1, name: "John Doe", email: "john@example.com", active: true },
  { id: 2, name: "Jane Smith", email: "jane@example.com", active: false },
  { id: 3, name: "Sam Johnson", email: "sam@example.com", active: true },
];

interface User {
  id: number;
  name: string;
  email: string;
  active: boolean;
}

const ListUsers = () => {
  const [data, setData] = useState(initialData);
  const columns = [
    {
      name: "ID",
      selector: (row: User) => row.id,
      sortable: true,
    },
    {
      name: "Name",
      selector: (row: User) => row.name,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row: User) => row.email,
      sortable: true,
    },
    {
      name: "Active",
      cell: (row: User) => (
        <Switch
          isChecked={row.active}
          onChange={() => handleToggleActive(row.id)}
        />
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  const handleToggleActive = (id: number) => {
    setData((prevData) =>
      prevData.map((user) =>
        user.id === id ? { ...user, active: !user.active } : user
      )
    );
    console.log(`Toggle active state for user with id: ${id}`);
  };
  return (
    <Box p="4">
      <Text fontSize="2xl" as="div">
        List of Users
      </Text>
      <DataTable
        columns={columns}
        data={data}
        pagination
        style={{ overflow: "scroll" }}
      />
    </Box>
  );
};
export default ListUsers;
