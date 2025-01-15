import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import { getLocale } from "next-intl/server";
import TableSearch from "@/components/TableSearch";
import { getTranslations } from "next-intl/server";
import { Eye } from 'lucide-react';
 import { role, studentsData } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";
import Buttons from "@/components/Buttons";

type Student = {
  id: number;
  studentId: string;
  name: string;
  email?: string;
  photo: string;
  phone?: string;
  grade: number;
  class: string;
  address: string;
};

const columns = [
  {
    header: "Info",
    accessor: "info",
  },
  {
    header: "Student ID",
    accessor: "studentId",
    className: "hidden md:table-cell",
  },
  {
    header: "Grade",
    accessor: "grade",
    className: "hidden md:table-cell",
  },
  {
    header: "Phone",
    accessor: "phone",
    className: "hidden lg:table-cell",
  },
  {
    header: "Address",
    accessor: "address",
    className: "hidden lg:table-cell",
  },
  {
    header: "Actions",
    accessor: "action",
  },
];

const StudentListPage = async () => {

  const locale = await getLocale();
  const t = await getTranslations("table");

  const renderRow = (item: Student) => (
    <tr
      key={item.id}
      className="border-b border-gray-300 even:bg-slate-50 text-sm hover:bg-blue-200 transition-all duration-300 ease-in-out"
    >
      <td className="flex items-center gap-4 p-4">
        <Image
          src={item.photo}
          alt=""
          width={40}
          height={40}
          className="md:hidden xl:block w-10 h-10 rounded-full object-cover"
        />
        <div className="flex flex-col">
          <h3 className="font-semibold">{item.name}</h3>
          <p className="text-xs text-gray-500">{item.class}</p>
        </div>
      </td>
      <td className="hidden md:table-cell">{item.studentId}</td>
      <td className="hidden md:table-cell">{item.grade}</td>
      <td className="hidden md:table-cell">{item.phone}</td>
      <td className="hidden md:table-cell">{item.address}</td>
      <td className="flex items-center justify-left gap-2 py-6">
          {role === "admin" ? (
            <div className="flex items-center gap-2"> 
             <Link href={`/${locale}/list/students/${"1"}`}>
             <button className="w-7 h-7 flex items-center justify-center rounded-full bg-blue-200 hover:bg-blue-300 active:bg-blue-400">
               <Eye className="w-4 h-4 text-blue-500" />
             </button>
             </Link>
             <Buttons table={"student"} type={"delete"} />
             <Buttons table={"student"} type={"update"} />
           </div>
          ) : null}
       </td>
    </tr>
  );

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">{t("allStudents")}</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-200">
              <Image src="/filter.png" alt="" width={14} height={14} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-200">
              <Image src="/sort.png" alt="" width={14} height={14} />
            </button>
            {role === "admin" ? (
                <Buttons table="student" type="create" />
            ) : null}
          </div>
        </div>
      </div>
      {/* LIST */}
      <Table columns={columns} renderRow={renderRow} data={studentsData} />
      {/* PAGINATION */}
      <Pagination />
    </div>
  );
};

export default StudentListPage;