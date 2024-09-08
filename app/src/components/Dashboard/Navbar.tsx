import BlueChicken from "../../assets/bluechicken.png";
import {
  Disclosure,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { ArrowPathIcon, UserPlusIcon } from "@heroicons/react/24/outline";
import { useAuth } from "react-oidc-context";
import { useUser } from "../../UserProvider";

type NavbarProps = {};

export default function Navbar(props: NavbarProps) {
  const auth = useAuth();
  const user = useUser();

  return (
    <Disclosure as="nav" className="bg-gray-800">
      <>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <img className="h-8 w-8" src={BlueChicken} />
              </div>
              <div className="pl-2 text-3xl font-bold text-white">
                Seed Finder
              </div>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:items-center">
              <Menu as="div" className="relative ml-3">
                <div>
                  <MenuButton className="relative flex max-w-xs items-center rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">Open user menu</span>
                    <img
                      alt=""
                      src={user.avatar}
                      className="h-8 w-8 rounded-full"
                    />
                  </MenuButton>
                </div>
                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                >
                  <MenuItem key="logout">
                    <a
                      className="block cursor-pointer px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100"
                      onClick={() => auth.removeUser()}
                    >
                      Logout
                    </a>
                  </MenuItem>
                </MenuItems>
              </Menu>
            </div>
          </div>
        </div>
      </>
    </Disclosure>
  );
}
