"use client";
import Image from "next/image";
import { useTranslations } from "next-intl"; // Change to useTranslations hook

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useEffect, useState } from "react";

const data = [
  {
    name: "Sun",
    present: 60,
    absent: 40,
  },
  {
    name: "Mon",
    present: 70,
    absent: 60,
  },
  {
    name: "Tue",
    present: 90,
    absent: 75,
  },
  {
    name: "Wed",
    present: 90,
    absent: 75,
  },
  {
    name: "Thu",
    present: 65,
    absent: 55,
  },
];


const AttendanceChart = () => {
  
  const [attendanceData, setAttendanceData] = useState<Array<{ [key: string]: string | number }>>([]);
  const t = useTranslations("HomePage.AttendanceChart");

  const translatedData = data.map(item => ({
    name: item.name === "Sun" ? t("sun") :
     item.name === "Mon" ? t("mon") :
      item.name === "Tue" ? t("tue") :
       item.name === "Wed" ? t("wed") :
        item.name === "Thu" ? t("thu") :
         item.name,
    [t("present")]: item.present,
    [t("absent")]: item.absent
  }));

  useEffect(() => {
    setAttendanceData(translatedData);
  }, []);

  return (
    <div className="bg-white rounded-lg border border-gray-100 shadow-md p-4 h-full">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold">{t("attendance")}</h1>
        <Image src="/moreDark.png" alt="" width={20} height={20} />
      </div>
      <ResponsiveContainer width="100%" height="90%">
        <BarChart width={500} height={300} data={attendanceData} barSize={20}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ddd" />
          <XAxis
            dataKey="name"
            axisLine={false}
            tick={{ fill: "#6B7280 " }}
            tickLine={false}
          />
          <YAxis axisLine={false} tick={{ fill: "#6b9280 " }} tickLine={false} />
          <Tooltip
            contentStyle={{ borderRadius: "10px", borderColor: "lightgray" }}
          />
          <Legend
            align="left"
            verticalAlign="top"
            wrapperStyle={{ paddingTop: "20px", paddingBottom: "40px" }}
          />
          <Bar
            dataKey={t("present")}
            fill="#22c67e"
            legendType="circle"
            radius={[10, 10, 0, 0]}
          />
          <Bar
            dataKey={t("absent")}
            fill="#4B91E0"
            legendType="circle"
            radius={[10, 10, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};export default AttendanceChart;