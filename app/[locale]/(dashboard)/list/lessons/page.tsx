import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import {getTranslations} from "next-intl/server";
import TableSearch from "@/components/TableSearch";
import { lessonsData, role } from "@/lib/data";
import Image from "next/image";
import Buttons from "@/components/Buttons";
// import FormModal from "@/components/FormModal";

type Lesson = {
  id: number;
  subject: string;
  class: string;
  teacher: string;
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
    header: "Actions",
    accessor: "action",
  },
];

const LessonListPage = async () => {
  
  const t = await getTranslations("table");
  const renderRow = (item: Lesson) => (
    <tr
      key={item.id}
      className="border-b border-gray-300 even:bg-slate-50 text-sm hover:bg-blue-200 transition-all duration-300 ease-in-out"
    >
      <td className="flex items-center gap-4 p-4">{item.subject}</td>
      <td>{item.class}</td>
      <td className="hidden md:table-cell">{item.teacher}</td>
      <td>
        <div className="flex items-center gap-2">
          {role === "admin" ? (
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
        <h1 className="hidden md:block text-lg font-semibold">{t("allLessons")}</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-200">
              <Image src="/filter.png" alt="" width={14} height={14} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-200">
              <Image src="/sort.png" alt="" width={14} height={14} />
            </button>
            {role === "admin" ? <Buttons table="lesson" type="create" /> : null}
          </div>
        </div>
      </div>
      {/* LIST */}
      <Table columns={columns} renderRow={renderRow} data={lessonsData} />
      {/* PAGINATION */}
      <Pagination />
    </div>
  );
};

export default LessonListPage;