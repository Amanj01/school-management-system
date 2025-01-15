"use client"
import {Trash2, UserRoundPen } from 'lucide-react'
import { useLocale } from 'next-intl'
import Image from 'next/image'
import React, { useState } from 'react'
import TeacherForm from './forms/TeacherForm'
import StudentForm from './forms/StudentForm'
import { SubjectForm } from './forms/SubjectForm'
import { ParentForm } from './forms/ParentForm'
import { ClassForm } from './forms/ClassForm'
import { LessonForm } from './forms/LessonForm'
import { ExamForm } from './forms/ExamForm'
import { AssignmentForm } from './forms/AssignmentForm'
import { ResultForm } from './forms/ResultForm'
import { EventForm } from './forms/EventForm'
import { AnnouncementForm } from './forms/announcementForm'

const Buttons = ({  table,
  type,
  data,
  id,
}: {
  table: "teacher" | "student" | "parent" | "subject" | "class" | "lesson" | "exam" | "assignment" | "result" | "attendance" | "event" | "announcement";
  type: "create" | "update" | "delete";
  data?: any;
  id?: number;
}) => {
  const locale = useLocale()
  const [showTeacherForm, setShowTeacherForm] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const handleDelete = () => {
    // Add your delete logic here
    console.log(`Deleting ${table} with id: ${id}`)
    setShowDeleteModal(false)
  }

  if (type === "delete") {
    return (
      <>
        <button 
          onClick={() => setShowDeleteModal(true)}
          className="w-7 h-7 flex items-center justify-center rounded-full bg-red-200 hover:bg-red-300 active:bg-red-400"
        >
          <Trash2 className="w-4 h-4 text-red-500" />
        </button>

        {showDeleteModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
              <h2 className="text-xl font-bold mb-4">Confirm Deletion</h2>
              <p className="mb-6">Are you sure you want to delete this {table}?</p>
              <div className="flex justify-end gap-4">
                <button 
                  onClick={() => setShowDeleteModal(false)}
                  className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleDelete}
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </>
    )
  }

  if ((table === "teacher" || table === "student" || table === "announcement" ||
    table === "parent" || table === "subject" || table === "class" || table === "lesson" ||
     table === "exam" || table === "assignment" || table === "result" ||
     table === "attendance" || table === "event")

    && 

    (type === "update" )) {
    return (
      <>
        <button 
          onClick={() => setShowTeacherForm(!showTeacherForm)} 
          className="w-7 h-7 flex items-center justify-center rounded-full bg-green-200 hover:bg-green-300 active:bg-green-400"
        >
          <UserRoundPen className="w-4 h-4 text-green-500"/> 
        </button>

        {showTeacherForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {table === "teacher" && <TeacherForm type="update" /> }
              {table === "student" && <StudentForm type="update" />}
              {table === "subject" && <SubjectForm />}
              {table === "parent" && <ParentForm  />}
              {table === "class" && <ClassForm />}
              {table === "lesson" && <LessonForm subjects={[]} classes={[]} teachers={[]} />}
              {table === "exam" && <ExamForm subjects={[]} classes={[]} teachers={[]}  />} 
              {table==="assignment" && <AssignmentForm subjects={[]} classes={[]} teachers={[]}   />}
              {table === "result" && <ResultForm subjects={[]} classes={[]} teachers={[]} students={[]}/>}
              {table ==="event" && <EventForm classes={[]} />}
              {table ==="announcement" && <AnnouncementForm classes={[]} />}
              {/* table === "attendance" && <StudentForm type={'create'} /> */}
              <button 
                onClick={() => setShowTeacherForm(false)}
                className="mt-4 px-4 py-2 bg-gray-200 rounded-md"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </>
    )
  }


  if ((table === "teacher" || table === "student" || table === "announcement" ||
    table === "parent" || table === "subject" || table === "class" || table === "lesson" ||
     table === "exam" || table === "assignment" || table === "result" ||
     table === "attendance" || table === "event")

    && 

    (type === "create" )) {
    return (
      <div>
        <button 
          onClick={() => setShowTeacherForm(!showTeacherForm)}
          className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-200"
        >
          <Image src="/plus.png" alt="" width={14} height={14} />
        </button>
        
        {showTeacherForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              {table === "teacher" && <TeacherForm type="create" /> }
              {table === "student" && <StudentForm type={'create'} />}
              {table === "subject" && <SubjectForm />}
              {table === "parent" && <ParentForm  />}
              {table === "class" && <ClassForm />}
              {table === "lesson" && <LessonForm subjects={[]} classes={[]} teachers={[]} />}
              {table === "exam" && <ExamForm subjects={[]} classes={[]} teachers={[]}  />} 
              {table==="assignment" && <AssignmentForm subjects={[]} classes={[]} teachers={[]}   />}
              {table === "result" && <ResultForm subjects={[]} classes={[]} teachers={[]} students={[]}/>}
              {table ==="announcement" && <AnnouncementForm classes={[]} />}
              {table ==="event" && <EventForm classes={[]} />}
               {/* table === "attendance" && <StudentForm type={'create'} /> */}
               <button 
                onClick={() => setShowTeacherForm(false)}
                className="mt-4 px-4 py-2 bg-gray-200 rounded-md"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    )
  }

}

export default Buttons;
