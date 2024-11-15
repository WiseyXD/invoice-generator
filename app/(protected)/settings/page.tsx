import { logout } from '@/actions/logout';
import { validateRequest } from '@/actions/validateRequests';
import { Button } from '@/components/ui/button';

export default async function page() {
    const { session } = await validateRequest();
    return (
        <div className="min-h-[93vh]">
            {JSON.stringify(session)}
            <form action={logout}>
                /<Button>Logout</Button>
            </form>
        </div>
    );
}
