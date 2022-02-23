import { Transition, Dialog } from "@headlessui/react";
import { LockClosedIcon } from "@heroicons/react/outline";
import React, { FC, Fragment, useState } from "react";
import { useAuth } from "../hooks/useAuth";

interface Props {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Login: FC<Props> = ({ isOpen, setIsOpen }) => {
  const closeModal = () => setIsOpen(false);
  const [values, setValues] = useState<{ email: string; password: string }>();

  const auth = useAuth();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues((oldValues: any) => ({
      ...oldValues,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    values?.email && values.password && auth.signIn({ ...values });
    closeModal();
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={closeModal}
      >
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0" />
          </Transition.Child>

          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
              <Dialog.Title
                as="h3"
                className="text-lg font-medium leading-6 text-gray-900"
              >
                Login
              </Dialog.Title>
              <form className="mt-8 space-y-6" action="#" onSubmit={onSubmit}>
                <input type="hidden" name="remember" defaultValue="true" />
                <div className="rounded-md shadow-sm -space-y-px">
                  <div>
                    <label htmlFor="email-address" className="sr-only">
                      Email address
                    </label>
                    <input
                      id="email-address"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={values?.email}
                      onChange={onChange}
                      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-[#ff8215] focus:border-[#ff8215] focus:z-10 sm:text-sm"
                      placeholder="Enter 'admin@test.com'"
                    />
                  </div>
                  <div>
                    <label htmlFor="password" className="sr-only">
                      Password
                    </label>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      value={values?.password}
                      onChange={onChange}
                      autoComplete="current-password"
                      required
                      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-[#ff8215] focus:border-[#ff8215] focus:z-10 sm:text-sm"
                      placeholder="Enter 'admin'"
                    />
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#ff8215] hover:bg-[#ff8215] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ff8215]"
                  >
                    <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                      <LockClosedIcon
                        className="h-5 w-5 text-white"
                        aria-hidden="true"
                      />
                    </span>
                    Sign in
                  </button>
                </div>
              </form>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Login;
