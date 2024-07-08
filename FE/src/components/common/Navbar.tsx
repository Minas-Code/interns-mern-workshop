'use client';
import { CircleUser, Menu, Moon, Sun } from 'lucide-react';
import Link from 'next/link';
import { useAuthContext } from '../context/AuthContext';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';
import { PAGE_ROUTES } from '@/constants/API_ROUTES';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useToast } from '@/components/ui/use-toast';
import { useTheme } from 'next-themes';
const Nav = () => {
  const { userInfo, logout } = useAuthContext();
  const { setTheme } = useTheme();
  const { toast } = useToast();
  const router = useRouter();

  function copyText(entryText: string) {
    navigator.clipboard.writeText(entryText);
    toast({
      title: 'Copied to clipboard',
      description: entryText,
      duration: 1000,
    });
  }

  const onLogoutClick = () => {
    logout();
    router.replace(PAGE_ROUTES.SIGN_IN);
  };

  return (
    <nav className="flex justify-between w-full mb-16 py-3 px-6">
      <div>
        <Link href="/" className="flex gap-2 flex-center">
          {/* <Image src="/logo-icon.svg" alt="logo" width={30} height={30} className="object-contain" /> */}
          <p className="font-bold blue_gradient">MERN APP</p>
        </Link>
      </div>

      {/* Desktop Navigation */}
      <div className="sm:flex hidden">
        <div className="flex gap-8 md:gap-10 py-2 text-lg">
          <Link href="/">Home</Link>
        </div>
      </div>

      <div className="flex relative gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon" className="rounded-full">
              <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setTheme('light')}>Light</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme('dark')}>Dark</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme('system')}>System</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon" className="rounded-full">
              <CircleUser className="h-5 w-5" />
              <span className="sr-only">Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => copyText(userInfo?.email || '')}>
              Email: {userInfo?.email}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => copyText(userInfo?.name || '')}>Name: {userInfo?.name}</DropdownMenuItem>
            <DropdownMenuItem onClick={() => onLogoutClick()}>
              <Button>Logout</Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <div className="flex"></div>
      </div>
    </nav>
  );
};

export default Nav;
