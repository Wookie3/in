import Link from 'next/link';
import { Button } from "@/components/ui/button"

const Home = () => {
    return (
        <div>
            Home
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
        </div>
    )
};
export default Home;