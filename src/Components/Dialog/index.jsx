import { useDashStore, setDialogState } from "../../store";
import {
  Transition,
  TransitionChild,
  Dialog as DialogHeadlessUI,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { Button } from "../Button";

export const Dialog = () => {
  const isOpen = useDashStore((state) => state.dialogIsOpen);
  return (
    <Transition appear show={isOpen}>
      <DialogHeadlessUI
        as="div"
        className=" z-50 focus:outline-none "
        onClose={() => setDialogState(false)}
      >
        <div className=" absolute top-1/2 -translate-y-1/2 z-10 w-screen">
          <div className="flex min-h-full items-center justify-center p-4">
            <TransitionChild
              enter="ease-out duration-300"
              enterFrom="opacity-0 transform-[scale(95%)]"
              enterTo="opacity-100 transform-[scale(100%)]"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 transform-[scale(100%)]"
              leaveTo="opacity-0 transform-[scale(95%)]"
            >
              <DialogPanel className="w-full max-w-md rounded-xl bg-black p-6 backdrop-blur-2xl">
                <DialogTitle
                  as="h3"
                  className="text-base/7 font-medium text-white/50"
                >
                  Payment successful
                </DialogTitle>
                <p className="mt-2 text-sm/6 text-white/50">
                  Your payment has been successfully submitted. We’ve sent you
                  an email with all of the details of your order.
                </p>
                <div className="mt-4">
                  <Button onClick={() => setDialogState(false)}>
                    Got it, thanks!
                  </Button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </DialogHeadlessUI>
    </Transition>
  );
};
