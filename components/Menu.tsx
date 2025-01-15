"use client";
import { role } from "@/lib/data";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLocale } from "next-intl";
import { useTranslations } from "next-intl";
import { AlignJustify, X } from "lucide-react";

const menuItems = [
  {
    title: "MENU",
    items: [
      {
        icon: "/home.png",
        label: "Home",
        href: "/",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/teacher.png",
        label: "Teachers",
        href: "/list/teachers",
        visible: ["admin", "teacher"],
      },
      {
        icon: "/student.png",
        label: "Students",
        href: "/list/students",
        visible: ["admin", "teacher"],
      },
      {
        icon: "/parent.png",
        label: "Parents",
        href: "/list/parents",
        visible: ["admin", "teacher"],
      },
      {
        icon: "/subject.png",
        label: "Subjects",
        href: "/list/subjects",
        visible: ["admin"],
      },
      {
        icon: "/class.png",
        label: "Classes",
        href: "/list/classes",
        visible: ["admin", "teacher"],
      },
      {
        icon: "/lesson.png",
        label: "Lessons",
        href: "/list/lessons",
        visible: ["admin", "teacher"],
      },
      {
        icon: "/exam.png",
        label: "Exams",
        href: "/list/exams",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/assignment.png",
        label: "Assignments",
        href: "/list/assignments",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/result.png",
        label: "Results",
        href: "/list/results",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/attendance.png",
        label: "Attendance",
        href: "/list/attendance",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/calendar.png",
        label: "Events",
        href: "/list/events",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/message.png",
        label: "Messages",
        href: "/list/messages",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/announcement.png",
        label: "Announcements",
        href: "/list/announcements",
        visible: ["admin", "teacher", "student", "parent"],
      },
    ],
  },
  {
    title: "OTHER",
    items: [
      {
        icon: "/profile.png",
        label: "Profile",
        href: "/profile",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/setting.png",
        label: "Settings",
        href: "/settings",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/logout.png",
        label: "Logout",
        href: "/logout",
        visible: ["admin", "teacher", "student", "parent"],
      },
    ],
  },
];

const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const locale = useLocale();
  const t = useTranslations("menu");

  return (
    <>
{!isOpen && <button
  className={`lg:hidden fixed top-4 ${locale === 'en' ? 'left-1' : 'right-1'} z-50 p-1 rounded-full bg-transparent text-black border border-gray-300`}
  onClick={() => setIsOpen(!isOpen)}
>
  <AlignJustify />  
</button>}

<div
  className={`transition-transform duration-300 ease-in-out fixed top-0 ${
    locale === 'en' ? 'left-0' : 'right-0'
  } h-full w-64 bg-white shadow-lg z-40 transform ${
    isOpen 
      ? 'translate-x-0' 
      : locale === 'en' 
        ? '-translate-x-full' 
        : 'translate-x-full'
  } lg:translate-x-0 lg:relative lg:shadow-none lg:w-auto lg:bg-transparent`}
>

        <div className="p-4 lg:p-0">
          <button
            className= {`lg:hidden absolute top-4 ${locale == "en" ? "right-4" : "left-4"} z-50 p-1 rounded-full bg-transparent border border-gray-300 text-black `}
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen && <X />  }
          </button>
          {menuItems.map((section) => (
            <div className="mb-6" key={section.title}>
              <h2 className="text-gray-500 text-sm font-semibold lg:hidden">
                {section.title}
              </h2>
              <div className="flex flex-col gap-2 mt-2">
                {section.items.map((item) => {
                  if (item.visible.includes(role)) {
                    return (
                      <Link
                        href={`/${locale}${item.href}`}
                        key={item.label}
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-3 p-2 rounded-md text-gray-700 hover:bg-blue-100 hover:text-blue-700 transition"
                      >
                        <Image
                          src={item.icon}
                          alt=""
                          width={20}
                          height={20}
                        />
                        <span className="text-sm font-medium">{t(item.label)}</span>
                      </Link>
                    );
                  }
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Overlay for mobile view */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-25 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
};

export default Menu;
