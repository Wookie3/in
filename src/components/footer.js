import { Button } from "@/components/ui/button"
import Link from 'next/link';

const Footer = () => {
    return (
        <nav>
            <p>Contact Us:</p>
            <Link href={'/dashboard'}>
                <Button>
                    Social Link 1
                </Button>
            </Link>
            <Link href={'/login'}>
                <Button>
                Social Link 2
                </Button>
            </Link>
        </nav>
    )
};
export default Footer;