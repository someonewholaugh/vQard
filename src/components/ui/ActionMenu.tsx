import { useState, MouseEvent } from 'react';
import { Popover, PopoverPanel, PopoverButton } from '@headlessui/react';
import { AlertCard, Button, Modal } from '@/components/ui';
import { Menu, Warning } from '@/components/icons';
import { ActionMenuProps } from '@/types';

export const ActionMenu = ({
  customModalContent,
  customDeleteButton,
  customEditButton,
  modalTitle = 'Delete vCard',
  modalMessage = 'Are you sure you want to delete this vCard? This action cannot be undone.',
  onDelete,
  onClick,
}: ActionMenuProps) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleActionClick = (event: MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;
    const action = target.dataset.action;

    action === 'edit' ? onClick?.() : openModal();
  };

  return (
    <>
      <Popover className="flex-none w-max">
        <PopoverButton className="w-full px-4 py-2 transition-colors duration-300 border rounded-md border-white/20 bg-white/10 backdrop-blur-lg hover:bg-white/20 focus:outline-none">
          <Menu />
        </PopoverButton>
        <PopoverPanel
          transition
          anchor="top end"
          className="rounded-xl bg-black/60 border border-white/20 backdrop-blur-md text-sm transition duration-300 ease-in-out [--anchor-gap:var(--spacing-5)] data-[closed]:-translate-y-2 data-[closed]:opacity-0 w-40"
        >
          <div className="p-2" onClick={handleActionClick}>
            {customEditButton || (
              <button
                type="button"
                className="w-full px-3 py-2 text-left transition duration-300 rounded-lg hover:bg-white/5"
                data-action="edit"
              >
                Edit
              </button>
            )}
            {customDeleteButton || (
              <button
                type="button"
                className="w-full px-3 py-2 text-left text-red-500 transition duration-300 rounded-lg hover:bg-red-500/20"
                data-action="delete"
              >
                Delete
              </button>
            )}
          </div>
        </PopoverPanel>
      </Popover>
      <Modal isOpen={isModalOpen} onClose={closeModal} hideCloseButton>
        {customModalContent || (
          <AlertCard icon={<Warning />} title={modalTitle} message={modalMessage}>
            <div className="flex space-x-2.5 w-full text-white">
              <Button
                className="w-full transition border hover:bg-white/20 bg-white/10 border-white/20 text-inherit"
                onClick={closeModal}
              >
                Cancel
              </Button>
              <Button
                className="w-full bg-red-500 text-inherit"
                onClick={() => {
                  onDelete?.();
                  closeModal();
                }}
              >
                Delete
              </Button>
            </div>
          </AlertCard>
        )}
      </Modal>
    </>
  );
};
