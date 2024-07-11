import { Button } from '@/components/ui/button';
import { PAGE_ROUTES } from '@/constants/API_ROUTES';
import { cookies } from 'next/headers';
import Link from 'next/link';

export default function Custom404() {
  const cookieStore = cookies();

  const reqOrigin = cookieStore.get('reqOrigin')?.value || PAGE_ROUTES.BASE;

  return (
    <section className="flex flex-col justify-center items-center h-screen gap-4">
      <div>
        <h1 className="text-4xl font-bold">404</h1>
      </div>
      <div>
        <h2 className="text-2xl">Page not found</h2>
      </div>
      <div>
        <Link href={reqOrigin} className="underline">
          <Button>
            <span className="text-center">Return to last Page</span>
          </Button>
        </Link>
      </div>
    </section>
  );
}
