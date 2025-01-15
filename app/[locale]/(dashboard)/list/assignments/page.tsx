import Pagination from "@/components/Pagination";
import { getTranslations } from "next-intl/server";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import {
  assignmentsData,
  role,
} from "@/lib/data";
import Image from "next/image";
import Buttons from "@/components/Buttons";
 
type Assignment = {
  id: number;
  subject: string;
  class: string;
  teacher: string;
  dueDate: string;
};

const columns = [
  {
    header: "Subject Name",
    accessor: "name",
  },
  {
    header: "Class",
    accessor: "class",
  },
  {
    header: "Teacher",
    accessor: "teacher",
    className: "hidden md:table-cell",
  },
  {
    header: "Due Date",
    accessor: "dueDate",
    className: "hidden md:table-cell",
  },
  {
    header: "Actions",
    accessor: "action",
  },
];

const AssignmentListPage = async () => {

  const t = await getTranslations("table");
  const renderRow = (item: Assignment) => (
    <tr
      key={item.id}
      className="border-b border-gray-300 even:bg-slate-50 text-sm hover:bg-blue-200 transition-all duration-300 ease-in-out"
    >
      <td className="flex items-center gap-4 p-4">{item.subject}</td>
      <td>{item.class}</td>
      <td className="hidden md:table-cell">{item.teacher}</td>
      <td className="hidden md:table-cell">{item.dueDate}</td>
      <td>
        <div className="flex items-center gap-2">
          {role === "admin" || role === "teacher" ? (
            <>
               <Buttons table={"class"} type={"delete"} />
               <Buttons table={"class"} type={"update"} />
            </>
          ) : null}
        </div>
      </td>
    </tr>
  );

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">{t("allAssignments")}</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-200">
              <Image src="/filter.png" alt="" width={14} height={14} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-200">
              <Image src="/sort.png" alt="" width={14} height={14} />
            </button>
            {role === "admin" || role === "teacher" ? <Buttons table="assignment" type="create" /> : null}
          </div>
        </div>
      </div>
      {/* LIST */}
      <Table columns={columns} renderRow={renderRow} data={assignmentsData} />
      {/* PAGINATION */}
      <Pagination />
    </div>
  );
};

export default AssignmentListPage;