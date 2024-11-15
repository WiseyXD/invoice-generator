import { HoverBorderGradient } from '@/components/ui/hover-border-gradient';
import { Button } from '@nextui-org/button';
import Link from 'next/link';

export default function Home() {
    return (
        <main className="min-h-[93vh] flex flex-col items-center justify-center p-24 gap-y-10 ">
            Landing will be here.
            <div className="flex flex-col gap-y-[100px] items-center">
                <Link href={'/register'}>
                    <HoverBorderGradient
                        containerClassName="rounded-full"
                        as="button"
                        className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2"
                    >
                        Join Today
                    </HoverBorderGradient>
                </Link>
                <Button>New Button</Button>
            </div>
        </main>
    );
}
