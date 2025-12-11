import { Customer } from '../App';
import { Users, UserCheck, UserPlus, Activity, AlertCircle, CheckCircle } from 'lucide-react';

type DashboardOverviewProps = {
  customers: Customer[];
  onNavigateToOnboarding?: () => void;
};

export function DashboardOverview({ customers, onNavigateToOnboarding }: DashboardOverviewProps) {
  const activeCustomers = customers.filter(c => c.status === 'active').length;
  const pendingCustomers = customers.filter(c => c.status === 'pending').length;

  // Mock Sentinel data
  const sentinelAlerts = [
    { id: '1', customer: 'Metro Data Center', location: 'Server Room A', issue: 'Temperature spike detected', severity: 'high', timestamp: '2 hours ago' },
    { id: '2', customer: 'City Hospital Network', location: 'Main Building', issue: 'Brief power fluctuation', severity: 'medium', timestamp: '5 hours ago' },
  ];

  return (
    <div className="w-full">
      {/* Header */}
      <div className="relative shrink-0 w-full mb-[24px]">
        <div className="size-full">
          <div className="box-border content-stretch flex flex-col gap-[16px] items-start px-0 py-0 relative w-full">
            <div className="content-stretch flex gap-[24px] items-start relative shrink-0 w-full">
              <div className="basis-0 content-stretch flex flex-col gap-[2px] grow h-[58px] items-start min-h-px min-w-px not-italic relative shrink-0 text-nowrap whitespace-pre">
                <p className="font-['Inter:Bold',sans-serif] font-bold leading-[32px] relative shrink-0 text-[24px] text-zinc-950 tracking-[-0.6px]">Dashboard Overview</p>
                <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] relative shrink-0 text-[16px] text-zinc-500">Monitor your EMS customers and system health</p>
              </div>
            </div>
            <div className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0 w-full">
              <div className="h-px relative shrink-0 w-full">
                <div aria-hidden="true" className="absolute border border-solid border-zinc-200 inset-0 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-[16px] mb-[32px]">
        {/* Total Customers */}
        <div className="bg-white relative rounded-[8px] shrink-0">
          <div aria-hidden="true" className="absolute border border-solid border-zinc-200 inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
          <div className="box-border content-stretch flex flex-col items-start px-[24px] py-[20px] relative w-full">
            <div className="flex items-center gap-[12px] mb-[16px] w-full">
              <div className="bg-zinc-100 p-[8px] rounded-[6px]">
                <Users className="w-[20px] h-[20px] text-zinc-950" />
              </div>
              <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] text-[14px] text-zinc-500">Total Customers</p>
            </div>
            <p className="font-['Inter:Bold',sans-serif] font-bold text-[36px] leading-[44px] text-zinc-950">{customers.length}</p>
          </div>
        </div>

        {/* Active Customers */}
        <div className="bg-white relative rounded-[8px] shrink-0">
          <div aria-hidden="true" className="absolute border border-solid border-zinc-200 inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
          <div className="box-border content-stretch flex flex-col items-start px-[24px] py-[20px] relative w-full">
            <div className="flex items-center gap-[12px] mb-[16px] w-full">
              <div className="bg-lime-100 p-[8px] rounded-[6px]">
                <UserCheck className="w-[20px] h-[20px] text-lime-600" />
              </div>
              <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] text-[14px] text-zinc-500">Active Customers</p>
            </div>
            <p className="font-['Inter:Bold',sans-serif] font-bold text-[36px] leading-[44px] text-lime-600">{activeCustomers}</p>
          </div>
        </div>

        {/* Pending Onboarding */}
        <button 
          onClick={onNavigateToOnboarding}
          className="bg-white relative rounded-[8px] shrink-0 hover:shadow-lg transition-shadow cursor-pointer text-left w-full"
        >
          <div aria-hidden="true" className="absolute border border-solid border-zinc-200 inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
          <div className="box-border content-stretch flex flex-col items-start px-[24px] py-[20px] relative w-full">
            <div className="flex items-center gap-[12px] mb-[16px] w-full">
              <div className="bg-amber-100 p-[8px] rounded-[6px]">
                <UserPlus className="w-[20px] h-[20px] text-amber-600" />
              </div>
              <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] text-[14px] text-zinc-500">Pending Onboarding</p>
            </div>
            <p className="font-['Inter:Bold',sans-serif] font-bold text-[36px] leading-[44px] text-amber-600">{pendingCustomers}</p>
          </div>
        </button>
      </div>

      {/* Sentinel App Module */}
      <div className="bg-white relative rounded-[8px] shrink-0 w-full">
        <div aria-hidden="true" className="absolute border border-solid border-zinc-200 inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
        <div className="box-border content-stretch flex flex-col items-start px-[24px] py-[20px] relative w-full">
          {/* Title */}
          <div className="content-stretch flex flex-col gap-px items-start not-italic relative shrink-0 w-full mb-[24px]">
            <div className="flex items-center gap-[12px] w-full">
              <Activity className="w-[20px] h-[20px] text-zinc-950" />
              <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[28px] relative shrink-0 text-[18px] text-nowrap text-zinc-950 whitespace-pre">Sentinel App - Downtime Monitoring</p>
            </div>
            <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[14px] text-zinc-500">Real-time alerts and downtime tracking for your customers</p>
          </div>

          {/* Separator */}
          <div className="box-border content-stretch flex flex-col gap-[10px] items-start px-0 py-[16px] relative shrink-0 w-full">
            <div className="h-px relative shrink-0 w-full">
              <div aria-hidden="true" className="absolute border border-solid border-zinc-200 inset-0 pointer-events-none" />
            </div>
          </div>

          {/* Alerts List */}
          <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full">
            {sentinelAlerts.map((alert) => (
              <div key={alert.id} className="content-stretch flex items-start gap-[12px] relative shrink-0 w-full">
                <div className={`shrink-0 mt-[2px] ${alert.severity === 'high' ? 'text-red-500' : 'text-amber-500'}`}>
                  {alert.severity === 'high' ? (
                    <AlertCircle className="w-[20px] h-[20px]" />
                  ) : (
                    <AlertCircle className="w-[20px] h-[20px]" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-[8px] mb-[4px]">
                    <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] text-[14px] text-zinc-950">
                      {alert.customer}
                    </p>
                    <div className={`px-[8px] py-[2px] rounded-[6px] ${
                      alert.severity === 'high' ? 'bg-red-100' : 'bg-amber-100'
                    }`}>
                      <p className={`font-['Inter:Medium',sans-serif] font-medium leading-[16px] text-[12px] ${
                        alert.severity === 'high' ? 'text-red-700' : 'text-amber-700'
                      }`}>
                        {alert.severity.toUpperCase()}
                      </p>
                    </div>
                  </div>
                  <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] text-[14px] text-zinc-500 mb-[4px]">
                    {alert.location}: {alert.issue}
                  </p>
                  <p className="font-['Inter:Regular',sans-serif] font-normal leading-[16px] text-[12px] text-zinc-400">
                    {alert.timestamp}
                  </p>
                </div>
                <button className="bg-white box-border content-stretch flex gap-[10px] items-center justify-center px-[12px] py-[4px] relative rounded-[6px] shrink-0">
                  <div aria-hidden="true" className="absolute border border-solid border-zinc-200 inset-0 pointer-events-none rounded-[6px]" />
                  <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[12px] text-nowrap text-zinc-950 whitespace-pre">View Details</p>
                </button>
              </div>
            ))}

            {sentinelAlerts.length === 0 && (
              <div className="flex items-center gap-[12px] py-[24px] w-full justify-center">
                <CheckCircle className="w-[20px] h-[20px] text-lime-600" />
                <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] text-[14px] text-zinc-500">
                  All systems operational - No alerts
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}