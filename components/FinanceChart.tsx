"use client";

import Image from "next/image";
import { useTranslations } from "next-intl"; 
import {
  LineChart,
  Line,
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
    name: "Jan",
    income: 4000,
    expense: 2400,
  },
  {
    name: "Feb",
    income: 3000,
    expense: 1398,
  },
  {
    name: "Mar",
    income: 2000,
    expense: 9800,
  },
  {
    name: "Apr",
    income: 2780,
    expense: 3908,
  },
  {
    name: "May",
    income: 1890,
    expense: 4800,
  },
  {
    name: "Jun",
    income: 2390,
    expense: 3800,
  },
  {
    name: "Jul",
    income: 3490,
    expense: 4300,
  },
  {
    name: "Aug",
    income: 3490,
    expense: 4300,
  },
  {
    name: "Sep",
    income: 3490,
    expense: 4300,
  },
  {
    name: "Oct",
    income: 3490,
    expense: 4300,
  },
  {
    name: "Nov",
    income: 3490,
    expense: 4300,
  },
  {
    name: "Dec",
    income: 3490,
    expense: 4300,
  },
];

const FinanceChart = () => {
  
  const [financeData, setFinanceData] = useState<Array<{ [key: string]: string | number }>>([]);
  const t = useTranslations("HomePage.financeChart");
  const translatedData = data.map(item => ({
    name: item.name === "Jan" ? t("jan") :
         item.name === "Feb" ? t("feb") :
         item.name === "Mar" ? t("mar") : 
         item.name === "Apr" ? t("apr") :
         item.name === "May" ? t("may") :
         item.name === "Jun" ? t("jun") :
         item.name === "Jul" ? t("jul") :
         item.name === "Aug" ? t("aug") :
         item.name === "Sep" ? t("sep") :
         item.name === "Oct" ? t("oct") :
         item.name === "Nov" ? t("nov") :
         item.name === "Dec" ? t("dec"): item.name,
    income: item.income,
    expense: item.expense
  }));

  useEffect(() => {
    setFinanceData(translatedData);
  }, []); 
  

  return (
    <div className="bg-white rounded-xl w-full h-full p-4 border border-gray-100 shadow-md">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold">{t("finance")}</h1>
        <Image src="/moreDark.png" alt="" width={20} height={20} />
      </div>
      <ResponsiveContainer width="100%" height="90%">
        <LineChart
          width={500}
          height={300}
          data={financeData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
          <XAxis
            dataKey="name"
            axisLine={false}
            tick={{ fill: "#6B7280" }}
            tickLine={false}
            tickMargin={10}
          />
          <YAxis axisLine={false} tick={{ fill: "#9CA3AF" }} tickLine={false}  tickMargin={20}/>
          <Tooltip />
          <Legend
            align="center"
            verticalAlign="top"
            wrapperStyle={{ paddingTop: "10px", paddingBottom: "30px" }}
          />
          <Line
            type="monotone"
            dataKey="income"
            stroke="#10B981"
            strokeWidth={5}
            name={t("income")}
          />
          <Line type="monotone"   name={t("expense")} dataKey="expense" stroke="#818CF0" strokeWidth={5}/>
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default FinanceChart;