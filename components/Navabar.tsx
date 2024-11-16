'use client';
import { useSession } from '@/providers/SessionProvider';
import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    NavbarMenu,
    NavbarMenuItem,
    NavbarMenuToggle,
    Button as NextButton,
} from '@nextui-org/react';
import Link from 'next/link';
import React from 'react';
import { AcmeLogo } from './AcmeLogo';
import { ModeToggle } from './mode-toggle';

export default function NewNavbar() {
    const sessionData = useSession();

    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    const menuItems = [
        'Profile',
        'Dashboard',
        'Activity',
        'Analytics',
        'System',
        'Deployments',
        'My Settings',
        'Team Settings',
        'Help & Feedback',
        'Log Out',
    ];

    return (
        <Navbar onMenuOpenChange={setIsMenuOpen} isBordered position="static">
            <NavbarContent className="w-full px-3">
                <NavbarMenuToggle
                    aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                    className="sm:hidden"
                />
                <Link href={'/'} className="cursor-pointer">
                    <NavbarBrand>
                        <AcmeLogo />
                        <p className="font-bold text-inherit">Hira Invoice</p>
                    </NavbarBrand>
                </Link>
            </NavbarContent>
            {sessionData.session ? (
                <>
                    <NavbarContent
                        className="hidden sm:flex gap-4"
                        justify="center"
                    >
                        <NavbarItem>
                            <Link color="foreground" href="#">
                                Invoices
                            </Link>
                        </NavbarItem>
                        <NavbarItem>
                            <Link href="#" aria-current="page">
                                Customers
                            </Link>
                        </NavbarItem>
                        <NavbarItem>
                            <Link color="foreground" href="#">
                                <ModeToggle />
                            </Link>
                        </NavbarItem>
                    </NavbarContent>

                    <NavbarMenu>
                        {menuItems.map((item, index) => (
                            <NavbarMenuItem key={`${item}-${index}`}>
                                <Link
                                    color={
                                        index === 2
                                            ? 'primary'
                                            : index === menuItems.length - 1
                                              ? 'danger'
                                              : 'foreground'
                                    }
                                    className="w-full"
                                    href="#"
                                >
                                    {item}
                                </Link>
                            </NavbarMenuItem>
                        ))}
                    </NavbarMenu>
                </>
            ) : (
                <NavbarContent justify="end">
                    <NavbarItem className="hidden lg:flex">
                        <Link href="/login">Login</Link>
                    </NavbarItem>
                    <NavbarItem>
                        <NextButton
                            as={Link}
                            color="primary"
                            href="/register"
                            variant="flat"
                        >
                            Sign Up
                        </NextButton>
                    </NavbarItem>
                </NavbarContent>
            )}
        </Navbar>
    );
}
