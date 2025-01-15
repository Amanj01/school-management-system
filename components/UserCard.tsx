import Image from "next/image";
import { getTranslations } from "next-intl/server";


const UserCard = async ({ type }: { type: 'teacher' | 'student' | 'parent' | 'staff' }) => {
  const t = await getTranslations("HomePage");

  const cardStyles = {
    teacher: "bg-blue-600 hover:bg-blue-700",
    student: "bg-emerald-600 hover:bg-emerald-700",
    staff: "bg-purple-600 hover:bg-purple-700",
    parent: "bg-amber-600 hover:bg-amber-700"
  };

  const icons = {
    teacher: "/teachers.png",
    student: "/students.png",
    parent: "/parents.png",
    staff: "/staff.png"
  };

  return (
    <div className={`rounded-2xl ${cardStyles[type]} p-4 flex-1 min-w-[130px] transition-all duration-300 shadow-lg hover:shadow-xl`}>
      <div className="flex justify-between items-start">
        <span className="text-[10px] bg-white/90 px-2 py-1 rounded-full text-black font-medium">
          2024/25
        </span>
        <div className="flex gap-2 items-center">
          <Image 
            src={icons[type]} 
            alt={type} 
            width={100} 
            height={100} 
            className="opacity-90"
          />
        </div>
      </div>
      <div className="mt-4">
        <h1 className="text-2xl font-bold my-4 text-white">1,234</h1>
        <h2 className="capitalize text-md font-medium text-white/90 flex items-center gap-2">
          {t(type)}
        </h2>
      </div>
    </div>
  );
};

export default UserCard;
