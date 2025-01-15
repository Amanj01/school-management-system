import Announcements from "../../../../components/Announcements";
import BigCalendar from "../../../../components/BigCalender";
import EventCalendar from '../../../../components/EventCalendar';
import { getTranslations } from "next-intl/server";

const StudentPage = async() => {
  const t = await getTranslations("HomePage.bigCalender");
  return (
    <div className="p-4 flex gap-4 flex-col xl:flex-row">
      {/* LEFT */}
      <div className="w-full xl:w-2/3 border border-gray-100 shadow-md">
        <div className="h-full bg-white p-4 rounded-md">
          <h1 className="text-xl font-semibold">{t("views.schedule")} (4A)</h1>
          <BigCalendar/>
        </div>
      </div>
      {/* RIGHT */}
      <div className="w-full xl:w-1/3 flex flex-col gap-8">
        <EventCalendar />
        <Announcements />
      </div>
    </div>
  );
};

export default StudentPage;