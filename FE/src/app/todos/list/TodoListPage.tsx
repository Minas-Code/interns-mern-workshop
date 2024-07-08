import { KanbanBoard } from '@/components/common/KanbanBoard';
import { Button } from '@/components/ui/button';
import { PAGE_ROUTES } from '@/constants/API_ROUTES';
import { useRouter } from 'next/navigation';
import React from 'react';

const TodoListPage = () => {
  const router = useRouter();
  return (
    <section className="min-h-screen flex gap-4 flex-col">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">Mern Stack Workshop Todo List</h1>
      <div className="justify-end flex">
        <Button onClick={() => router.push(PAGE_ROUTES.TODOS_CREATE)}>Add task</Button>
      </div>
      <KanbanBoard />
    </section>
  );
};

export default TodoListPage;
