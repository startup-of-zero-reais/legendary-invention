import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import clsx from "clsx";
import { Fragment } from "react";
import { CONSTANTS } from "@/constants";

const navigation = [
  { name: "Encontrar Projeto", href: "#", current: true },
  { name: "Meus Projetos", href: "#", current: false },
];

const profile_settings = ["Perfil", "Configurações", "Sair"];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  return (
    <Disclosure
      as="nav"
      className="relative bg-white h-16 border-b border-gray-200"
    >
      {({ open }) => (
        <>
          <div className="mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden ">
                {/* Mobile Button menu */}
                <Disclosure.Button className="inline-flex items-center justify-center p-2">
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <div className="flex h-8 w-auto lg:hidden justify-center items-center">
                    <Image
                      src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                      alt="Workflow"
                      width={50}
                      height={50}
                    />
                    <h1 className="ml-3 font-medium">
                      {CONSTANTS.name_application}
                    </h1>
                  </div>
                  <div className="hidden h-8 w-auto lg:flex justify-center items-center">
                    <Image
                      src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                      alt="Workflow"
                      width={50}
                      height={50}
                    />
                    <h1 className="ml-3 font-medium">
                      {CONSTANTS.name_application}
                    </h1>
                  </div>
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4 ml-10">
                    {navigation.map((item) => (
                      <a
                        className={classNames(
                          item.current
                            ? `text-blue-400 font-normal`
                            : "text-gray-300 font-light hover:bg-gray-700 hover:text-white",
                          "rounded-md text-sm relative px-2 py-2"
                        )}
                        key={item.name}
                        href={item.href}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                        {item.current && (
                          <div className="absolute w-full h-0.5 bg-blue-400 top-12 left-0" />
                        )}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              <Menu as="div">
                <Menu.Button>
                  <span className="sr-only">Open user menu</span>
                  <Image
                    className="h-8 w-8 rounded-full"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt="Perfil de usuário"
                    width={50}
                    height={50}
                  />
                </Menu.Button>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    {profile_settings.map((setting, key) => (
                      <Menu.Item key={key}>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            {setting}
                          </a>
                        )}
                      </Menu.Item>
                    ))}
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          </div>
          <Disclosure.Panel className="sm:hidden bg-white border-b border-gray-200">
            <div className="space-y-1 px-2 pt-2 pb-3">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "bg-gray-900 text-white"
                      : "text-gray-700 hover:bg-gray-700 hover:text-white",
                    "block px-3 py-2 rounded-md text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
