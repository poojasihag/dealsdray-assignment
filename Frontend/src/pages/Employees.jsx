import { useState, useEffect, useRef } from "react";
import axios from "@/lib/axiosConfig"; // Adjust the import path as necessary
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
} from "@/components/ui/table"; // Adjust the import path as necessary
import EmployeeDialog from "./EmployeeDialog"; // Adjust the import path as necessary

const columns = [
  { header: "Profile Picture", accessor: "image" },
  { header: "Employee ID", accessor: "employeeId" },
  { header: "Name", accessor: "name" },
  { header: "Email", accessor: "email" },
  { header: "Mobile", accessor: "mobile" },
  { header: "Designation", accessor: "designation" },
  { header: "Gender", accessor: "gender" },
  { header: "Course", accessor: "course" },
  { header: "Created Date", accessor: "createdate" },
  { header: "Status", accessor: "active" },
  { header: "Actions", accessor: "actions" },
];

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return (
    date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }) +
    " " +
    date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    })
  );
};

const Employees = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const debounceTimeout = useRef(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [employeeToEdit, setEmployeeToEdit] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get("/employees");
      setData(response.data.data);
      setLoading(false);
    } catch (error) {
      setError("Failed to fetch data");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchTerm(value);

    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      if (value === "") {
        fetchData();
      } else {
        const filteredData = data.filter((row) =>
          Object.values(row).some((cell) =>
            String(cell).toLowerCase().includes(value.toLowerCase())
          )
        );
        setData(filteredData);
      }
    }, 300);
  };

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });

    const sortedData = [...data].sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === "asc" ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return direction === "asc" ? 1 : -1;
      }
      return 0;
    });

    setData(sortedData);
  };

  const handleEdit = (employee) => {
    setEmployeeToEdit(employee);
    setIsDialogOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/employees/${id}`);
      setData(data.filter((employee) => employee._id !== id));
    } catch (error) {
      alert("Failed to delete employee");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <Button onClick={() => setIsDialogOpen(true)} className="mb-4">
        Add Employee
      </Button>
      <Input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearch}
        className="mb-4 p-2 border border-gray-300 rounded"
      />
      <Table>
        <TableCaption>Employees List</TableCaption>
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableHead className="cursor-pointer"
                key={column.accessor}
                onClick={() =>
                  column.accessor !== "actions" && handleSort(column.accessor)
                }
              >
                {column.header}
                {sortConfig.key === column.accessor &&
                  sortConfig.direction &&
                  (sortConfig.direction === "asc" ? " ↑" : " ↓")}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row._id}>
              <TableCell>
                <img
                  src={row.image}
                  alt={row.name}
                  className="w-10 h-10 object-cover rounded-full"
                />
              </TableCell>
              {columns.slice(1, -1).map((column) => (
                <TableCell key={column.accessor} >
                  {column.accessor === "createdate"
                    ? formatDate(row[column.accessor])
                    : column.accessor === "active"
                    ? row[column.accessor]
                      ? "Active"
                      : "Inactive"
                    : row[column.accessor]}
                </TableCell>
              ))}
              <TableCell>
                <Button
                  onClick={() => handleEdit(row)}
                  className="mr-2 bg-blue-500 text-white"
                >
                  Edit
                </Button>
                <Button
                  onClick={() => handleDelete(row._id)}
                  className="bg-red-500 text-white"
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={columns.length}>
              Total Employees: {data.length}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>

      <EmployeeDialog
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
        employeeToEdit={employeeToEdit}
        setEmployeeToEdit={setEmployeeToEdit}
        fetchData={fetchData}
      />
    </div>
  );
};

export default Employees;
