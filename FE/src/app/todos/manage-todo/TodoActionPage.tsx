'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/text-area';
import { TodoStatus } from '@/lib/enum';
import { createTaskSchema, CreateTaskSchemaType } from '@/lib/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';

const TodoActionPage = () => {
  const form = useForm<CreateTaskSchemaType>({
    defaultValues: {
      status: TodoStatus.PENDING,
    },
    resolver: zodResolver(createTaskSchema),
  });
  const { handleSubmit } = form;
  const onSubmit = (data: CreateTaskSchemaType) => console.log(data);
  return (
    <section className="flex flex-col justify-center items-center h-screen gap-8">
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Card className="w-full max-w-[52rem] min-w-[50rem]">
            <CardHeader>
              <CardTitle className="text-2xl">Create Task</CardTitle>
              <CardDescription>
                Enter your Task details. <br />
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input type="text" className="w-full" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea className="w-full" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className=" grid gap-2">
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <FormControl>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select Task status" />
                          </SelectTrigger>
                          <SelectContent>
                            {Object.values(TodoStatus).map((status) => (
                              <SelectItem key={status} value={status}>
                                {status.charAt(0) + status.slice(1).toLowerCase()}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
            <CardFooter>
              <div className="w-full">
                <Button
                  type="submit"
                  // onClick={handleLoginSubmit}
                  className="w-full"
                  // disabled={mutation.isPending}
                >
                  {/* {mutation.isPending && <LoaderCircle className="animate-spin" />} */}

                  <span className="ml-2">Create Task</span>
                </Button>
              </div>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </section>
  );
};

export default TodoActionPage;
