import { Button } from "@/components/ui/button";
import Link from 'next/link';

const Nav = () => {
    return (
        <nav>
            <Link href={'/dashboard'}>
                <Button>
                    Dashboard
                </Button>
            </Link>
            <Link href={'/login'}>
                <Button>
                    Login
                </Button>
            </Link>
            <Link href={'/profile'}>
                <Button>
                    Profile
                </Button>
            </Link>
        </nav>
    )
};
export default Nav;