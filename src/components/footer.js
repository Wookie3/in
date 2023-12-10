import { Button } from "@/components/ui/button"
import Link from 'next/link';

const Footer = () => {
    return (
        <footer className="px-4 py-8 dark:bg-gray-800 bg-teal-500 dark:text-gray-400 w-full bottom-0">
        <div className="container flex flex-wrap items-center justify-center mx-auto space-y-4 sm:justify-between sm:space-y-0" bis_skin_checked="1">
            <div className="flex flex-row pr-3 space-x-4 sm:space-x-8" bis_skin_checked="1">
               
                <ul className="flex flex-wrap items-center space-x-4 sm:space-x-8">
                    <li>
                        <a rel="noopener noreferrer" href="#">Incented Protocol Inc. ©2023 All Rights Reserved.</a>
                    </li>
                    
                </ul>
            </div>
            <ul className="flex flex-wrap pl-3 space-x-4 sm:space-x-8">
                <li>
                    <a rel="noopener noreferrer" href="#">Instagram</a>
                </li>
                <li>
                    <a rel="noopener noreferrer" href="#">Facebook</a>
                </li>
                <li>
                    <a rel="noopener noreferrer" href="#">Twitter</a>
                </li>
            </ul>
        </div>
    </footer>
    )
};
export default Footer;

{/* <nav>
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
</nav> */}