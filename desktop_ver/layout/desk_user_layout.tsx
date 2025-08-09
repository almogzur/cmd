 import DeskUserTopBar from '@/desktop_ver/layout/layout_components/user/desk_user_top_bar'
import DeskUserFooter from './layout_components/user/desk_user_footer';


const DesktopUserLayout = ({ children }: {  children?: React.ReactNode }) => {
    return <>
    <DeskUserTopBar/>
    {children}
    <DeskUserFooter/>
    </>;
};
export default DesktopUserLayout;