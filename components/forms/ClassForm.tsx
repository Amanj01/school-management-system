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
    message: "Class name must be at least 2 characters.",
  }),
  capacity: z.string().transform((val) => parseInt(val, 10)).refine((val) => val > 0, {
    message: "Capacity must be greater than 0",
  }),
  grade: z.string().transform((val) => parseInt(val, 10)).refine((val) => val > 0 && val <= 12, {
    message: "Grade must be between 1 and 12",
  }),
  supervisor: z.string().min(1, {
    message: "Supervisor is required",
  }),
});

export function ClassForm({ teachers = [] }) {
  const t = useTranslations("ClassForm");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      capacity: 0,
      grade: 0,
      supervisor: "",
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
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("className")}</FormLabel>
              <FormControl>
                <Input placeholder={t("enterClassName")} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="capacity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("capacity")}</FormLabel>
              <FormControl>
                <Input 
                  type="number" 
                  placeholder={t("enterCapacity")} 
                  {...field}
                  onChange={(e) => field.onChange(e.target.value)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="grade"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("grade")}</FormLabel>
              <FormControl>
                <Input 
                  type="number" 
                  min="1" 
                  max="12" 
                  placeholder={t("enterGrade")} 
                  {...field}
                  onChange={(e) => field.onChange(e.target.value)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="supervisor"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("supervisor")}</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder={t("selectSupervisor")} />
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

        <Button type="submit" className="w-full">
          {t("submit")}
        </Button>
      </form>
    </Form>
  );
}