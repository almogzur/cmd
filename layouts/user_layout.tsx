import UserFooter from "@/components/user/user_footer";
import UserTopNavbar from "@/components/user/user_top_bar";

export default function UserLayout({ children }: { children: React.ReactNode }) {
    return (
    <>
    <UserTopNavbar />
    {children}
    <UserFooter/>
    </>
)
}