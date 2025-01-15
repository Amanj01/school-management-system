
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useTranslations } from "next-intl";

const formSchema = z.object({
  subject: z.string().min(1, {
    message: "Subject is required",
  }),
  class: z.string().min(1, {
    message: "Class is required",
  }),
  teacher: z.string().min(1, {
    message: "Teacher is required",
  }),
  student: z.string().min(1, {
    message: "Student is required",
  }),
  date: z.string().min(1, {
    message: "Date is required",
  }),
  type: z.enum(["exam", "assignment", "quiz"], {
    required_error: "Result type is required",
  }),
  score: z.string()
    .transform((val) => parseInt(val, 10))
    .refine((val) => val >= 0 && val <= 100, {
      message: "Score must be between 0 and 100",
    }),
});

interface ResultFormProps {
  subjects: string[];
  classes: string[];
  teachers: string[];
  students: string[];
}

export function ResultForm({ 
  subjects = [], 
  classes = [], 
  teachers = [], 
  students = [] 
}: ResultFormProps) {
  const t = useTranslations("ResultForm");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      subject: "",
      class: "",
      teacher: "",
      student: "",
      date: "",
      type: "exam",
      score: 0,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("subject")}</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder={t("selectSubject")} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {subjects.map((subject) => (
                    <SelectItem key={subject} value={subject}>
                      {subject}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="class"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("class")}</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder={t("selectClass")} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {classes.map((className) => (
                    <SelectItem key={className} value={className}>
                      {className}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="teacher"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("teacher")}</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder={t("selectTeacher")} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {teachers.map((teacher) => (
                    <SelectItem key={teacher} value={teacher}>
                      {teacher}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="student"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("student")}</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder={t("selectStudent")} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {students.map((student) => (
                    <SelectItem key={student} value={student}>
                      {student}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("date")}</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("type")}</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder={t("selectType")} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="exam">{t("exam")}</SelectItem>
                  <SelectItem value="assignment">{t("assignment")}</SelectItem>
                  <SelectItem value="quiz">{t("quiz")}</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="score"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("score")}</FormLabel>
              <FormControl>
                <Input 
                  type="number" 
                  min="0" 
                  max="100" 
                  placeholder={t("enterScore")} 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          {t("submit")}
        </Button>
      </form>
    </Form>
  );
}
