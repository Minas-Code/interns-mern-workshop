import { KanbanBoard } from '@/components/common/KanbanBoard';
import { Task } from '@/components/common/TaskCard';
import { Button } from '@/components/ui/button';
import { PAGE_ROUTES } from '@/constants/API_ROUTES';
import { GlobalApiResponse, TodoList } from '@/types';
import { apiRouter } from '@/utils/api-router';
import { UniqueIdentifier } from '@dnd-kit/core';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const TodoListPage = () => {
  const router = useRouter();
  const [tasksList, setTasksList] = useState<Task[] | []>([]);

  const fetchTasks = async () => {
    try {
      const res1 = await apiRouter('GET_TODOS', {
        method: 'GET',
      });
      const { success: expressSuccess, data } = (await res1.json()) as GlobalApiResponse<TodoList[]>;
      setTasksList(
        data.result.map((item: TodoList) => {
          return {
            id: item.id,
            columnId: item.status,
            content: item.description,
            title: item.title,
          };
        })
      );
    } catch (error) {
      alert('Task Fetch failed');
    }
  };
  useEffect(() => {
    fetchTasks();
  }, []);

  const handleDeleteTask = async (e: UniqueIdentifier) => {
    try {
      const res1 = await apiRouter('DELETE_TODO', {
        method: 'DELETE',
        routeParam: e.toString(),
      });
      console.log(res1);
      fetchTasks();
    } catch (error) {
      alert('Task Deletion failed');
    }
  };
  return (
    <section className="min-h-screen flex gap-4 flex-col">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">Mern Stack Workshop Todo List</h1>
      <div className="justify-end flex">
        <Button onClick={() => router.push(PAGE_ROUTES.TODOS_CREATE)}>Add task</Button>
      </div>
      <KanbanBoard todoList={tasksList} deleteTask={handleDeleteTask} />
    </section>
  );
};

export default TodoListPage;
