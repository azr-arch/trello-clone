import Link from "next/link";

import { Button } from "@/components/ui/button";
import localFont from "next/font/local";

import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";

const headingFont = localFont({
    src: "../../public/fonts/charlie-display-3.ttf",
});

const textFont = Poppins({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"],
});

const HomePage = () => {
    return (
        <div className="flex bg flex-col items-center justify-center bg-gradient-to-r from-fuchsia-600 to-pink-600 h-full">
            <div
                className={cn(
                    "flex flex-col items-center text-white max-w-md px-5 md:px-0 md:max-w-3xl text-center gap-4",
                    headingFont.className
                )}
            >
                <h1 className="font-medium text-[34px] leading-tight  md:text-5xl">
                    Thullo Brings all your tasks, teammates, and tools together
                </h1>
                <p className="text-sm md:text-xl font-medium">
                    Keep everything in the same place—even if your team isn`t.
                </p>
            </div>

            <Button size={"lg"} asChild className={cn("mt-6", textFont.className)}>
                <Link href={"/sign-up"}>Get started for free</Link>
            </Button>
        </div>
    );
};

export default HomePage;
