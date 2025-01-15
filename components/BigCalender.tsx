"use client";

import { Calendar, momentLocalizer, View, Views } from "react-big-calendar";
import moment from "moment";
import { useLocale, useTranslations } from "next-intl";
import { calendarEvents } from "@/lib/data";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useState } from "react";
import "moment/locale/ku"; // Kurdish locale
import "moment/locale/ar"; // Arabic locale

const localizer = momentLocalizer(moment);

const BigCalendar = () => {
  const [view, setView] = useState<View>(Views.WORK_WEEK);

  const locale = useLocale();
  moment.locale(locale); // Set moment locale based on the current language
  const t = useTranslations("HomePage.bigCalender");

  const handleOnChangeView = (selectedView: View) => {
    setView(selectedView);
  };

  const translatedEvents = calendarEvents.map((event) => ({
    ...event,
    title: t("subjects."+event.title),
  }));

  // Translation map for views
  const viewTranslations: Record<string, string> = {
    [Views.WORK_WEEK]: t("views.workWeek"),
    [Views.DAY]: t("views.day"),
    };

  return (
    <Calendar 
      localizer={localizer}
      events={translatedEvents}
      startAccessor="start"
      endAccessor="end"
      views={["work_week", "day"]}
      view={view}
      style={{ height: "98%" }}
      onView={handleOnChangeView}
      min={new Date(2025, 1, 0, 8, 0, 0)}
      max={new Date(2025, 1, 0, 15, 0, 0)}
      messages={{
   
        work_week: viewTranslations[Views.WORK_WEEK],
        day: viewTranslations[Views.DAY],
      }}
    />
  );
};

export default BigCalendar;
