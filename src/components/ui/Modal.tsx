import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import { Close } from '../icons/Close';
import type { ModalProps } from '@/types';

export const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  return (
    <Dialog open={isOpen} as="div" className="relative z-50" onClose={onClose}>
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-black/40 backdrop-blur-xl duration-300 ease-out data-[closed]:opacity-0"
      />
      <div className="fixed inset-0 flex items-center justify-center">
        <DialogPanel
          transition
          className="w-full h-fit max-w-md max-h-[90vh] overflow-y-auto rounded-xl p-4 duration-300 ease-out data-[closed]:scale-95 data-[closed]:opacity-0"
        >
          {children}
          <div className="flex justify-center mt-8">
            <button
              type="button"
              title="Close"
              onClick={onClose}
              className="p-2 transition duration-200 border rounded-full hover:bg-black-secondary/20"
            >
              <Close />
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};
