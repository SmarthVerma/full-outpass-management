import { useLocation } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";
import { ActionButton, Logo, LogoutButton, ProfileButton } from "@/components";
import { NavigateLink } from "./Links";

export const Navbar = () => {
  const user = useAppSelector(state => state.authUser.user);

  const location = useLocation();
  const isLoginPath = location.pathname === '/login';

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-800 p-4 flex justify-between items-center shadow-lg font-mono">
      <Logo />
      <div>
        {user ? (
          <div className="flex gap-3 ">
            <ProfileButton className="bg-white" />
            <LogoutButton className="bg-white" />
            {/* Conditional rendering for Pending Outpasses tab */}
          </div>
        ) : (
          <>
            <NavigateLink to='/' className="text-gray-200 hover:text-white mx-4">
              <ActionButton className="text-white font-bold hover:bg-transparent hover:text-white">
                Home
              </ActionButton>
            </NavigateLink>
            {!isLoginPath ? (
              <NavigateLink to='/login'>
                <ActionButton className="rounded bg-white text-black">
                  Login
                </ActionButton>
              </NavigateLink>
            ) : (
              <NavigateLink to='/signup'>
                <ActionButton className="rounded bg-white text-black">
                  Signup
                </ActionButton>
              </NavigateLink>
            )}
          </>
        )}
      </div>
    </nav>
  );
};