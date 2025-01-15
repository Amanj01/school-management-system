"use client";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import {
  RadialBarChart,
  RadialBar,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Total",
    count: 106,
    fill: "white",
  },
  {
    name: "Girls",
    count: 50,
    fill: "#FCD34D",
  },
  {
    name: "Boys",
    count: 63,
    fill: "#4B91E0",
  },
];

const CountChart = () => {
  const [countData, setCountData] = useState<Array<{ [key: string]: string | number }>>([]);
  const t = useTranslations("HomePage.countChart");

  // Calculate percentages
  const totalStudents = data.find(item => item.name === "Total")?.count || 0;
  const boysCount = data.find(item => item.name === "Boys")?.count || 0;
  const girlsCount = data.find(item => item.name === "Girls")?.count || 0;
  
  const boysPercentage = Math.round((boysCount / totalStudents) * 100);
  const girlsPercentage = Math.round((girlsCount / totalStudents) * 100);

  const translatedData = useMemo(() => data.map(item => ({
    name: item.name === "Boys" ? t("boys") : 
          item.name === "Girls" ? t("girls") : 
          item.name === "Total" ? t("total") : item.name,
    count: item.count,
    fill: item.fill
  })), [t]);

  useEffect(() => {
    setCountData(translatedData);
  }, [translatedData]);

  return (
    <div className="bg-white rounded-xl w-full h-full p-4 border border-gray-100 shadow-md">
      {/* TITLE */}
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold">{t("student")}</h1>
        <Image src="/moreDark.png" alt="" width={20} height={20} />
      </div>
      {/* CHART */}
      <div className="relative w-full h-[75%]">
        <ResponsiveContainer>
          <RadialBarChart
            cx="50%"
            cy="50%"
            innerRadius="40%"
            outerRadius="100%"
            barSize={32}
            data={countData}
          >
            <RadialBar background dataKey="count" />
          </RadialBarChart>
        </ResponsiveContainer>
        <Image
          src="/maleFemale.png"
          alt=""
          width={50}
          height={50}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        />
      </div>
      {/* BOTTOM */}
      <div className="flex justify-center gap-16">
        <div className="flex flex-col gap-1">
          <div className="w-5 h-5 bg-lamaSky rounded-full" />
          <h1 className="font-bold">{boysCount}</h1>
          <h2 className="text-sm font-semibold text-gray-600">{t("boys")} ({boysPercentage}%)</h2>
        </div>
        <div className="flex flex-col gap-1">
          <div className="w-5 h-5 bg-lamaYellow rounded-full" />
          <h1 className="font-bold">{girlsCount}</h1>
          <h2 className="text-sm font-semibold text-gray-600">{t("girls")} ({girlsPercentage}%)</h2>
        </div>
      </div>
    </div>
  );
};

export default CountChart;