'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/text-area';
import { useToast } from '@/components/ui/use-toast';
import { PAGE_ROUTES } from '@/constants/API_ROUTES';
import { TodoStatus } from '@/constants/enum';
import { GlobalApiResponse, TodoList } from '@/types';
import { apiRouter } from '@/utils/api-router';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoaderCircle } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { CreateTaskSchemaType, createTaskSchema } from './schema';

const TodoActionPage = () => {
  const params = useSearchParams();
  const taskId = params.get('taskId');
  const router = useRouter();
  const { toast } = useToast();

  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<CreateTaskSchemaType>({
    defaultValues: {
      status: TodoStatus.PENDING,
    },
    resolver: zodResolver(createTaskSchema),
  });
  const { handleSubmit } = form;

  const createTask = async (data: CreateTaskSchemaType) => {
    try {
      await apiRouter('CREATE_TODO', {
        method: 'POST',
        body: JSON.stringify(data),
      });
      toast({
        title: 'Success',
        description: 'Task created Successfully',
        duration: 1000,
      });
      router.replace(PAGE_ROUTES.TODOS_LIST);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Task creation failed',
        duration: 1000,
      });
      setIsLoading(false);
    }
  };
  const updateTask = async (data: CreateTaskSchemaType) => {
    try {
      await apiRouter('CREATE_TODO', {
        method: 'PATCH',
        routeParam: taskId || '',
        body: JSON.stringify(data),
      });
      toast({
        title: 'Success',
        description: 'Task Updated Successfully',
        duration: 1000,
      });
      router.replace(PAGE_ROUTES.TODOS_LIST);
    } catch (error) {
      toast({
        title: 'Success',
        description: 'Task updation failed',
        duration: 1000,
      });
      setIsLoading(false);
    }
  };

  const getTaskById = async () => {
    if (!taskId) return;
    try {
      const res = await apiRouter('GET_TODOS', {
        method: 'GET',
        routeParam: taskId || '',
      });
      const { data } = (await res.json()) as GlobalApiResponse<TodoList>;
      form.setValue('title', data.result.title);
      form.setValue('description', data.result.description);
      form.setValue('status', TodoStatus[data.result.status]);
    } catch (error) {
      alert('Task get failed');
      setIsLoading(false);
    }
  };
  const onSubmit = (data: CreateTaskSchemaType) => {
    setIsLoading(true);
    if (taskId) {
      updateTask(data);
    } else {
      createTask(data);
    }
  };
  useEffect(() => {
    if (!taskId) return;
    getTaskById();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [taskId]);

  return (
    <section className="flex flex-col justify-center items-center  gap-8">
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Card className="w-full max-w-[52rem] min-w-[50rem]">
            <CardHeader>
              <CardTitle className="text-2xl">{taskId ? 'Update' : 'Create'} Task</CardTitle>
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
                        <Select onValueChange={field.onChange} key={field.value} defaultValue={field.value}>
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
                <Button type="submit" className="w-full">
                  {isLoading && <LoaderCircle className="animate-spin" />}

                  <span className="ml-2">{taskId ? 'Update' : 'Create'} Task</span>
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
