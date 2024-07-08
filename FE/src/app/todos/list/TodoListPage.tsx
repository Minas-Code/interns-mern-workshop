import { KanbanBoard } from '@/components/common/KanbanBoard';
import { Button } from '@/components/ui/button';
import React from 'react';

const TodoListPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="flex justify-between w-full flex-row p-4">
        <Button variant="link" asChild className="text-primary h-8 w-8 p-0">
          <a href="https://github.com/Georgegriff/react-dnd-kit-tailwind-shadcn-ui"></a>
        </Button>
        <Button variant="link" asChild className="text-primary h-16 w-16"></Button>
        {/* <ThemeToggle /> */}
      </header>
      <main className="mx-4 flex flex-col gap-6">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Mern Stack Workshop Todo List
        </h1>
        <KanbanBoard />
      </main>
    </div>
  );
};

export default TodoListPage;
