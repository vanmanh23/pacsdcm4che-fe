import { useEffect, useState } from "react";
import { columns, type User } from "./_components/columns";
import UserTable from "./_components/UserTable";
import { GetAllUsers } from "../../../apis/authApis";
import { ListFilter, Plus, Search } from "lucide-react";
import { Button } from "../../../components/ui/button";

export default function Component() {
  const [usersData, setUsersData] = useState<User[]>([]);
  const [submitSearch, setSubmitSearch] = useState<{ [key: string]: string }>(
    {}
  );
  const [formValues, setFormValues] = useState<{ [key: string]: string }>({});
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const [studies] = await Promise.all([GetAllUsers()]);
        setUsersData(studies);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    fetchUsers();
  }, []);
  const handleChange = (field: string, value: string) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
  };
  const handleSearch = () => {
    if (formValues.userName === "") {
      return;
    } else {
      setSubmitSearch(formValues);
    }
  };
  return (
    <div className="flex flex-col gap-3 mx-6">
      <div></div>
      <div className="w-full flex justify-between">
        <div>
          <h3 className="text-2xl font-semibold">All users ({usersData.length})</h3>
        </div>
        <div className="flex flex-row items-center gap-2 h-10">
          <div className="flex flex-row items-center h-full gap-2 pl-2 border-slate-200 rounded-md border">
            <Search className="text-secondary" size={16} />
            <input
              type="text"
              placeholder="Search by name"
              value={formValues.userName}
              onChange={(value) => handleChange("userName", value.target.value)}
              className="outline-bg-secondary p-1 pl-2"
            />
          </div>
          <div className="flex flex-row items-center cursor-pointer border h-full text-menu-items border-slate-300 rounded-md px-2 text-sm gap-2" onClick={handleSearch}>
            <ListFilter size={16} />
            <p>Filter</p>
          </div>
          <Button className=" bg-bg-secondary hover:bg-bg-secondary/70 text-white h-full">
            <div className="flex flex-row items-center justify-center h-full">
              <Plus />
              <span className="ml-2 text-sm">Add User</span>
            </div>
          </Button>
        </div>
      </div>
      <div>
        <UserTable columns={columns} data={usersData} formValues={submitSearch} />
      </div>
    </div>
  );
}
