'use client';
import { Button } from '@/components/ui/button';
import { PAGE_ROUTES } from '@/constants/API_ROUTES';
import Link from 'next/link';
export default function Error() {
  return (
    <section className="flex flex-col justify-center items-center h-screen gap-4">
      <div>
        <h1 className="text-4xl font-bold">500</h1>
      </div>
      <div>
        <h2 className="text-2xl"> Error</h2>
      </div>
      <div>
        <Link href={PAGE_ROUTES.BASE} className="underline">
          <Button>
            <span className="text-center">Home</span>
          </Button>
        </Link>
      </div>
    </section>
  );
}
