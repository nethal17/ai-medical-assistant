"use client";
import { SignInButton, SignUpButton, UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { DumbbellIcon, HomeIcon, UserIcon, ZapIcon, MenuIcon, XIcon } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";

const Navbar = () => {
    const { isSignedIn } = useUser();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-gray-100 backdrop-blur-md border-b border-primary py-3 shadow-lg">
            <div className="container flex items-center justify-between mx-auto">
                <div className="flex items-center justify-between w-full md:w-auto">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="p-1 bg-primary/30 rounded">
                            <ZapIcon className="w-5 h-5 text-primary animate-pulse" />
                        </div>
                        <span className="text-xl font-bold font-mono">
                            pulse<span className="text-primary">mind</span>.ai
                        </span>
                    </Link>

                    {/* Mobile menu button */}
                    <button
                        className="md:hidden p-2 rounded-md text-gray-700 hover:text-primary focus:outline-none"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? <XIcon size={24} /> : <MenuIcon size={24} />}
                    </button>
                </div>

                {/* Desktop Navigation Links */}
                <div className="hidden md:flex items-center gap-6">
                    <Link
                        href="/"
                        className="flex items-center gap-1.5 text-md hover:font-bold hover:cursor-pointer font-mono transition-all hover:text-lg"
                    >
                        <span>Home</span>
                    </Link>

                    <Link
                        href="/generate-program"
                        className="flex items-center gap-1.5 text-md hover:font-bold hover:cursor-pointer font-mono transition-all hover:text-lg"
                    >
                        <span>History</span>
                    </Link>

                    <Link
                        href="/profile"
                        className="flex items-center gap-1.5 text-md hover:font-bold hover:cursor-pointer font-mono transition-all hover:text-lg"
                    >
                        <span>Pricing</span>
                    </Link>

                    <Link
                        href="/profile"
                        className="flex items-center gap-1.5 text-md hover:font-bold hover:cursor-pointer font-mono transition-all hover:text-lg"
                    >
                        <span>Profile</span>
                    </Link>
                </div>

                {/* Desktop Auth Buttons */}
                <nav className="hidden md:flex items-center gap-6">
                    {isSignedIn ? (
                        <>
                            <Button
                                asChild
                                variant="outline"
                                className="ml-2 border-primary hover:text-primary text-white bg-primary hover:bg-white"
                            >
                                <Link href="/dashboard">Get Started</Link>
                            </Button>
                            
                            <UserButton/>
                        </>
                    ) : (
                        <>
                            <SignInButton>
                                <Button
                                    variant={"outline"}
                                    className="border border-primary text-primary hover:text-white hover:bg-primary"
                                >
                                    Sign In
                                </Button>
                            </SignInButton>

                            <SignUpButton>
                                <Button className="bg-primary text-white hover:bg-background hover:text-primary border border-primary">
                                    Sign Up
                                </Button>
                            </SignUpButton>
                        </>
                    )}
                </nav>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden absolute top-full left-0 right-0 bg-gray-100 backdrop-blur-md border-t border-primary py-4 px-6 space-y-4">
                        <div className="flex flex-col space-y-4">
                            <Link
                                href="/"
                                className="flex items-center gap-1.5 text-md hover:text-primary transition-colors font-mono py-2"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                <HomeIcon size={22} />
                                <span>Home</span>
                            </Link>

                            <Link
                                href="/generate-program"
                                className="flex items-center gap-1.5 text-md hover:text-primary transition-colors font-mono py-2"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                <DumbbellIcon size={22} />
                                <span>Generate</span>
                            </Link>

                            <Link
                                href="/profile"
                                className="flex items-center gap-1.5 text-md hover:text-primary transition-colors font-mono py-2"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                <UserIcon size={22} />
                                <span>Profile</span>
                            </Link>
                        </div>

                        <div className="flex flex-col space-y-3 pt-4 border-t border-primary/50">
                            {isSignedIn ? (
                                <>
                                    <Button
                                        asChild
                                        variant="outline"
                                        className="border-primary hover:text-primary text-white bg-primary hover:bg-white"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        <Link href="/dashboard">Get Started</Link>
                                    </Button>
                                    <div className="flex justify-center">
                                        <UserButton />
                                    </div>
                                </>
                            ) : (
                                <>
                                    <SignInButton>
                                        <Button
                                            variant={"outline"}
                                            className="w-full border border-primary text-primary hover:text-white hover:bg-primary"
                                            onClick={() => setMobileMenuOpen(false)}
                                        >
                                            Sign In
                                        </Button>
                                    </SignInButton>

                                    <SignUpButton>
                                        <Button 
                                            className="w-full bg-primary text-white hover:bg-background hover:text-primary border border-primary"
                                            onClick={() => setMobileMenuOpen(false)}
                                        >
                                            Sign Up
                                        </Button>
                                    </SignUpButton>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </header>
    )
};

export default Navbar;