import { Button } from "@/components/ui/button"
import Link from 'next/link';

const Footer = () => {
    return (
        <nav>
            <p>Contact Us:</p>
            <a href={'http://www.google.ca/'}>
                <Button>
                    Social Link 1
                </Button>
            </a>
            <Link href={'http://www.bing.com/'}>
                <Button>
                Social Link 2
                </Button>
            </Link>
        </nav>
    )
};
export default Footer;