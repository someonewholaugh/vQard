import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Popover, PopoverPanel, PopoverButton } from '@headlessui/react';
import { AlertCard, Button, Modal } from '@/components/ui';
import { Menu, Warning } from '@/components/icons';

export const ActionMenu = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalClose = () => setIsModalOpen(false);
  const handleModalOpen = () => setIsModalOpen(true);

  return (
    <>
      <Popover className="w-max">
        <PopoverButton className="border border-white/20 rounded-md px-4 py-2 bg-white/10 backdrop-blur-lg transition-colors duration-300 hover:bg-white/20 focus:outline-none w-full">
          <Menu />
        </PopoverButton>
        <PopoverPanel
          transition
          anchor="top end"
          className="rounded-xl bg-white/5 backdrop-blur-md text-sm transition duration-300 ease-in-out [--anchor-gap:var(--spacing-5)] data-[closed]:-translate-y-2 data-[closed]:opacity-0 w-40"
        >
          <div className="p-2">
            <Link to={`id`} aria-label="Edit">
              <button className="rounded-lg py-2 px-3 transition duration-300 hover:bg-white/5  w-full text-left">
                Edit
              </button>
            </Link>
            <button
              className="rounded-lg py-2 px-3 transition duration-300 hover:bg-red-500/20  w-full text-left text-red-500"
              onClick={handleModalOpen}
            >
              Delete
            </button>
          </div>
        </PopoverPanel>
      </Popover>
      <Modal isOpen={isModalOpen} onClose={handleModalClose} hideCloseButton>
        <AlertCard
          icon={<Warning />}
          title="Delete vCard"
          message="Are you sure you want to delete this vCard? This action cannot be undone."
        >
          <div className="flex space-x-2.5 w-full text-white">
            <Button
              className="w-full hover:bg-white/20 transition bg-white/10 border border-white/20 text-inherit"
              onClick={handleModalClose}
            >
              Cancel
            </Button>
            <Button className="w-full bg-red-500 text-inherit">Delete</Button>
          </div>
        </AlertCard>
      </Modal>
    </>
  );
};
