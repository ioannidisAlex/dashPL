import { useDashStore, setDialogState } from "../../store";
import {
  Transition,
  TransitionChild,
  Dialog as DialogHeadlessUI,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import EditForm from "../EditDashboardForm";

export const Dialog = () => {
  const isOpen = useDashStore((state) => state.dialogIsOpen);
  return (
    <Transition appear show={isOpen}>
      <DialogHeadlessUI
        as="div"
        className=" z-50 focus:outline-none "
        onClose={() => setDialogState(false)}
      >
        <div className="absolute top-1/2 -translate-y-1/2 z-10 w-screen">
          <div className="flex min-h-full items-center justify-center p-4">
            <TransitionChild
              enter="ease-out duration-300"
              enterFrom="opacity-0 transform-[scale(95%)]"
              enterTo="opacity-100 transform-[scale(100%)]"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 transform-[scale(100%)]"
              leaveTo="opacity-0 transform-[scale(95%)]"
            >
              <DialogPanel style={{backgroundColor: "#bbf2"}} className="w-full max-w-md rounded-xl p-6 backdrop-blur-2xl">
                {/* <EditForm onClickOfItsButton={() => setDialogState(false)}/> */}
                
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </DialogHeadlessUI>
    </Transition>
  );
};
