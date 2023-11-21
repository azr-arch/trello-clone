import Image from "next/image";
import Link from "next/link";

import localFont from "next/font/local";
import { cn } from "@/lib/utils";

const headingFont = localFont({
    src: "../public/fonts/charlie-display-3.ttf",
});

export const Logo = () => {
    return (
        <Link href="/">
            <div className="hover:opacity-75 transition items-center gap-x-2 hidden md:flex">
                <Image src={"/logo.svg"} width={30} height={30} alt="Logo" />
                <p className={cn("text-lg text-neutral-700 pb-1", headingFont.className)}>Thello</p>
            </div>
        </Link>
    );
};
