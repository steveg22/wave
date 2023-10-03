import { Dialog, Transition } from '@headlessui/react';
import classNames from 'classnames';
import React from 'react';
import { ReactComponent as CloseIcon } from '@/assets/cross.svg';

const sizes = {
  sm: 'max-w-md',
  md: 'max-w-xl',
  lg: 'max-w-3xl',
  xl: 'max-w-7xl',
  full: 'max-w-full',
};

export type DrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  renderFooter: () => React.ReactNode;
  size?: keyof typeof sizes;
};

function Drawer({
  title,
  isOpen,
  onClose,
  children,
  renderFooter,
  size = 'md',
}: DrawerProps) {
  return (
    <Transition appear show={isOpen} as={React.Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={React.Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-y-0 right-0 max-w-full flex">
          <Transition.Child
            as={React.Fragment}
            enter="transform transition ease-in-out duration-700"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transform transition ease-in-out duration-700"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <Dialog.Panel className={classNames('w-screen', sizes[size])}>
              <div className="h-full divide-y divide-gray-200 dark:divide-orange-400 flex flex-col bg-white dark:bg-slate-700 dark:text-white rounded-l-xl shadow-xl">
                <div className="min-h-0 flex-1 flex flex-col py-6 overflow-y-scroll">
                  <div className="px-4 sm:px-6">
                    <div className="flex items-start justify-between">
                      <Dialog.Title className="text-lg font-medium text-gray-900 dark:text-gray-200">
                        {title}
                      </Dialog.Title>
                      <div className="ml-3 h-7 flex items-center">
                        <button
                          type="button"
                          className="bg-white dark:bg-gray-500 rounded-md text-gray-400 dark:text-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-600 dark:ring-gray-400"
                          onClick={onClose}
                        >
                          <span className="sr-only">Close panel</span>
                          <CloseIcon className="h-6 w-6 dark:fill-current" aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 relative flex-1 px-4 sm:px-6">
                    {children}
                  </div>
                </div>
                <div className="flex-shrink-0 px-4 py-4 flex justify-end space-x-2">
                  {renderFooter()}
                </div>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}

export default Drawer;
