import { role, teachersData } from "@/lib/data";
import Pagination from "@/components/Pagination";
import { getLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import Image from "next/image";
import Buttons from "@/components/Buttons";
import Link from "next/link";
import { Eye } from "lucide-react";
 
type Teacher = {
  id: number;
  teacherId: string;
  name: string;
  email?: string;
  photo: string;
  phone: string;
  subjects: string[];
  classes: string[];
  address: string;
};

const columns = [
  {
    header: "Info",
    accessor: "info",
  },
  {
    header: "Teacher ID",
    accessor: "teacherId",
    className: "hidden md:table-cell",
  },
  {
    header: "Subjects",
    accessor: "subjects",
    className: "hidden md:table-cell",
  },
  {
    header: "Classes",
    accessor: "classes",
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

const TeacherListPage = async () => {

  const locale = await getLocale();
  const t = await getTranslations("table");
  const ts = await getTranslations("Subjects");

  const renderRow = (item: Teacher) => (
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
          className="w-12 h-12 rounded-full object-cover border-2 border-blue-400"
        />
        <div className="flex flex-col">
          <h3 className="font-semibold text-gray-800">{item.name}</h3>
          <p className="text-xs text-gray-500">{item?.email}</p>
        </div>
      </td>
      <td className="hidden md:table-cell text-gray-700">{item.teacherId}</td>
      <td className="hidden md:table-cell text-gray-700">
        {item.subjects.map(subject => ts(subject)).join(", ")}
      </td>
      <td className="hidden md:table-cell text-gray-700">{item.classes.join(", ")}</td>
      <td className="hidden md:table-cell text-gray-700">{item.phone}</td>
      <td className="hidden md:table-cell text-gray-700">{item.address}</td>
      <td className="flex flex-row justify-left items-center gap-2 py-6 ">
        {role === "admin" && (
          <>
            <Link href={`/${locale}/list/teachers/${"1"}`}>
              <button className="w-7 h-7 flex items-center justify-center rounded-full bg-blue-200 hover:bg-blue-300 active:bg-blue-400">
                <Eye className="w-4 h-4 text-blue-500" />
              </button>
            </Link>
            <Buttons table={"teacher"} type={"delete"} />
            <Buttons table={"teacher"} type={"update"} />
          </>
        )}
      </td>
    </tr>
  );
  
  
  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0 border border-gray-50 shadow-sm">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">{t("allTeachers")}</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-200">
              <Image src="/filter.png" alt="" width={14} height={14} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-200">
              <Image src="/sort.png" alt="" width={14} height={14} />
            </button>
            {role === "admin" && (
              <Buttons table="teacher" type={"create"}  />
            )}
          </div>
        </div>
      </div>
      {/* LIST */}

      <Table columns={columns} renderRow={renderRow} data={teachersData} />

      {/* PAGINATION */}
      <Pagination />
    </div>
  );
};

export default TeacherListPage;