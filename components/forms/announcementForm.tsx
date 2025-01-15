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
  title: z.string().min(2, {
    message: "Title must be at least 2 characters",
  }),
  class: z.string().min(1, {
    message: "Class is required",
  }),
  date: z.string().min(1, {
    message: "Date is required",
  }),
});

interface AnnouncementFormProps {
  classes: string[];
}

export function AnnouncementForm({ classes = [] }: AnnouncementFormProps) {
  const t = useTranslations("AnnouncementForm");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      class: "",
      date: "",
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
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("title")}</FormLabel>
              <FormControl>
                <Input placeholder={t("enterTitle")} {...field} />
              </FormControl>
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

        <Button type="submit" className="w-full">
          {t("submit")}
        </Button>
      </form>
    </Form>
  );
}
