import { UserSidebar } from "../User";

const UserLayout = ({ children }) => {
    return (
        <div className="user-layout">
            <UserSidebar />
            <main className="user-content">
                {children}
            </main>
        </div>
    );
};

export default UserLayout;
