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
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTranslations } from "next-intl";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Subject name must be at least 2 characters.",
  }),
  teachers: z.array(z.string()).min(1, {
    message: "Select at least one teacher",
  }),
});

export function SubjectForm({ teachers = [] }) {
  const t = useTranslations("SubjectForm");
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      teachers: [],
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("subjectName")}</FormLabel>
              <FormControl>
                <Input placeholder={t("enterSubjectName")} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="teachers"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("teachers")}</FormLabel>
              <Select
                onValueChange={(value) => field.onChange([...field.value, value])}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder={t("selectTeachers")} />
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

        <Button type="submit">{t("submit")}</Button>
      </form>
    </Form>
  );
}
