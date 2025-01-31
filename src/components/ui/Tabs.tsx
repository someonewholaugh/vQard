import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import { TabsProps } from '@/types';

export const Tabs = ({ tabs }: TabsProps) => {
  return (
    <TabGroup className="w-full space-y-8">
      <div className="flex items-center justify-between">
        <div className="w-1/2 space-y-1 text-left">
          <h1 className="text-lg tracking-wide md:text-xl">Collection</h1>
          <p className="text-[0.7rem] md:text-xs tracking-wide text-stone-400">
            Manage your digital assets <span className="hidden md:inline">in one place.</span>
          </p>
        </div>
        <TabList className="flex space-x-2 md:space-x-4">
          {tabs.map((tab, index) => (
            <Tab
              key={index}
              className="rounded-lg px-4 py-2 text-xs md:text-sm transition-colors duration-300 ease-in-out backdrop-blur-md focus:outline-none bg-white/5 border border-white/20 data-[selected]:border-transparent data-[selected]:bg-white/25 data-[selected]:data-[hover]:bg-white/30 data-[hover]:bg-white/15"
            >
              {tab.label}
            </Tab>
          ))}
        </TabList>
      </div>
      <TabPanels>
        {tabs.map((tab, index) => (
          <TabPanel key={index}>{tab.content}</TabPanel>
        ))}
      </TabPanels>
    </TabGroup>
  );
};
