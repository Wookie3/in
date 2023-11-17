import { Button } from "@/components/ui/button";
import Link from 'next/link';

const Nav = () => {
    return (
        <nav>
            <Link href='/'>
                <Button>
                    Home
                </Button>
            </Link>
            <Link href='/dashboard'>
                <Button>
                    Dashboard
                </Button>
            </Link>
            <Link href='/login'>
                <Button>
                    Login
                </Button>
            </Link>
            <Link href='/profile'>
                <Button>
                    Profile
                </Button>
            </Link>
            <form action="/auth/logout" method="post">
                <Button type="submit">
                    Sign Out
                </Button>
            </form>
        </nav>
    )
};
export default Nav;