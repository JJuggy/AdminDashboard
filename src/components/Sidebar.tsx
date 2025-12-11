import { Home, Users, Radio, FileBarChart2, User, UserCog } from 'lucide-react';

type SidebarProps = {
  activeView: 'overview' | 'onboarding';
  onViewChange: (view: 'overview' | 'onboarding') => void;
};

export function Sidebar({ activeView, onViewChange }: SidebarProps) {
  return (
    <div className="fixed left-0 top-[56px] bottom-0 w-[252px] bg-white border-r border-solid border-zinc-200">
      {/* Main Navigation */}
      <div className="box-border content-stretch flex flex-col gap-[4px] items-start p-[8px] w-full">
        <button
          onClick={() => onViewChange('overview')}
          className={`w-full ${
            activeView === 'overview' ? 'bg-zinc-100' : 'bg-white'
          } box-border content-stretch flex gap-[8px] items-center px-[8px] py-[6px] rounded-[6px] transition-colors hover:bg-zinc-50`}
        >
          <Home className="w-[16px] h-[16px] text-zinc-950" />
          <p className={`font-['Inter:${activeView === 'overview' ? 'Semi_Bold' : 'Medium'}',sans-serif] ${activeView === 'overview' ? 'font-semibold' : 'font-medium'} leading-[20px] text-[14px] text-zinc-950 text-left flex-1`}>
            Dashboard
          </p>
        </button>

        <button
          onClick={() => onViewChange('onboarding')}
          className={`w-full ${
            activeView === 'onboarding' ? 'bg-zinc-100' : 'bg-white'
          } box-border content-stretch flex gap-[8px] items-center px-[8px] py-[6px] rounded-[6px] transition-colors hover:bg-zinc-50`}
        >
          <Users className="w-[16px] h-[16px] text-zinc-950" />
          <p className={`font-['Inter:${activeView === 'onboarding' ? 'Semi_Bold' : 'Medium'}',sans-serif] ${activeView === 'onboarding' ? 'font-semibold' : 'font-medium'} leading-[20px] text-[14px] text-zinc-950 text-left flex-1`}>
            Customers
          </p>
        </button>

        <button className="w-full bg-white box-border content-stretch flex gap-[8px] items-center px-[8px] py-[6px] rounded-[6px] transition-colors hover:bg-zinc-50">
          <Radio className="w-[16px] h-[16px] text-zinc-950" />
          <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] text-[14px] text-zinc-950 text-left flex-1">
            Sensors
          </p>
        </button>

        <button className="w-full bg-white box-border content-stretch flex gap-[8px] items-center px-[8px] py-[6px] rounded-[6px] transition-colors hover:bg-zinc-50">
          <FileBarChart2 className="w-[16px] h-[16px] text-zinc-950" />
          <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] text-[14px] text-zinc-950 text-left flex-1">
            Support tickets
          </p>
        </button>
      </div>

      {/* Spacer */}
      <div className="h-[16px]" />

      {/* Settings Section */}
      <div className="box-border content-stretch flex flex-col gap-[4px] items-start px-[8px] pb-[8px] w-full">
        <div className="w-full px-[8px] py-[6px]">
          <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] text-[14px] text-zinc-950 text-left">
            Settings
          </p>
        </div>

        <button className="w-full bg-white box-border content-stretch flex gap-[8px] items-center px-[8px] py-[6px] rounded-[6px] transition-colors hover:bg-zinc-50">
          <User className="w-[16px] h-[16px] text-zinc-950" />
          <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] text-[14px] text-zinc-950 text-left flex-1">
            Team members
          </p>
        </button>

        <button className="w-full bg-white box-border content-stretch flex gap-[8px] items-center px-[8px] py-[6px] rounded-[6px] transition-colors hover:bg-zinc-50">
          <UserCog className="w-[16px] h-[16px] text-zinc-950" />
          <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] text-[14px] text-zinc-950 text-left flex-1">
            Roles and permissions
          </p>
        </button>
      </div>
    </div>
  );
}