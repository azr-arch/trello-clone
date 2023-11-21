import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const Footer = () => {
    return (
        <div
            className="fixed bottom-0 w-full h-16 px-4 border-t
            shadow-sm bg-white flex items-center"
        >
            <div
                className="md:max-w-screen-2xl mx-auto flex
                items-center w-full justify-between"
            >
                <Logo />
                <div className="space-x-8 md:block text-black md:w-auto flex items-center justify-between w-full">
                    <Link href={"/"}>Privacy Policy</Link>
                    <Link href={"/"}>About us!</Link>
                </div>
            </div>
        </div>
    );
};
