import { useState } from 'react';
import { TopBar } from './components/TopBar';
import { Sidebar } from './components/Sidebar';
import { DashboardOverview } from './components/DashboardOverview';
import { CustomerOnboarding } from './components/CustomerOnboarding';
import { Toaster } from 'sonner@2.0.3';

export type Customer = {
  id: string;
  companyName: string;
  businessType: 'Data Centers' | 'Cell Towers' | 'Hospitals' | 'Other';
  status: 'active' | 'pending' | 'inactive';
  contactName: string;
  email: string;
  phone: string;
  address: string;
  locations: Array<{ id: string; name: string; address: string }>;
  createdAt: string;
  onboardingData?: any; // Store partial onboarding data for pending customers
  savedStep?: number; // Store the step where they left off
};

export default function App() {
  const [activeView, setActiveView] = useState<'overview' | 'onboarding'>('overview');
  const [customers, setCustomers] = useState<Customer[]>([
    {
      id: '1',
      companyName: 'Starsight',
      businessType: 'Data Centers',
      contactName: 'Dr. Sarah Johnson',
      email: 'sarah.johnson@starsight.com',
      phone: '(555) 123-4567',
      address: '123 Tech Park, Boston, MA',
      status: 'active',
      locations: Array.from({ length: 100 }, (_, i) => ({
        id: `l${i + 1}`,
        name: `Location ${i + 1}`,
        address: `Address ${i + 1}`,
      })),
      createdAt: '2024-11-15',
    },
    {
      id: '2',
      companyName: 'ONL',
      businessType: 'Cell Towers',
      contactName: 'John Martinez',
      email: 'j.martinez@onl.com',
      phone: '(555) 987-6543',
      address: '456 Tower Blvd, Chicago, IL',
      status: 'active',
      locations: Array.from({ length: 20 }, (_, i) => ({
        id: `l${i + 1}`,
        name: `Tower Site ${i + 1}`,
        address: `Site Address ${i + 1}`,
      })),
      createdAt: '2024-10-22',
    },
    {
      id: '3',
      companyName: 'Reddington',
      businessType: 'Hospitals',
      contactName: 'Emily Chen',
      email: 'emily.chen@reddington.com',
      phone: '(555) 456-7890',
      address: '789 Medical Dr, Phoenix, AZ',
      status: 'pending',
      locations: [
        { id: 'l1', name: 'Main Hospital', address: '789 Medical Dr, Phoenix, AZ' },
      ],
      createdAt: '2024-11-28',
    },
    {
      id: '4',
      companyName: 'IHS',
      businessType: 'Cell Towers',
      contactName: 'Michael Adams',
      email: 'michael.adams@ihs.com',
      phone: '(555) 234-5678',
      address: '321 Infrastructure Way, Dallas, TX',
      status: 'active',
      locations: Array.from({ length: 4 }, (_, i) => ({
        id: `l${i + 1}`,
        name: `IHS Tower ${i + 1}`,
        address: `Tower Location ${i + 1}`,
      })),
      createdAt: '2024-09-10',
    },
  ]);

  const handleAddCustomer = (customer: Omit<Customer, 'id' | 'createdAt'>) => {
    const newCustomer: Customer = {
      ...customer,
      id: (customers.length + 1).toString(),
      createdAt: new Date().toISOString().split('T')[0],
    };
    setCustomers([...customers, newCustomer]);
  };

  const handleUpdateCustomer = (updatedCustomer: Customer) => {
    setCustomers(customers.map(c => c.id === updatedCustomer.id ? updatedCustomer : c));
  };

  return (
    <div className="bg-white relative size-full">
      <Toaster position="top-right" richColors />
      <TopBar />
      <div className="flex pt-[56px] size-full">
        <Sidebar activeView={activeView} onViewChange={setActiveView} />
        <main className="flex-1 overflow-auto ml-[252px] bg-white">
          {activeView === 'overview' && (
            <div className="box-border content-stretch flex flex-col gap-[24px] items-start pb-[72px] pt-[88px] px-[72px] w-full">
              <DashboardOverview 
                customers={customers} 
                onNavigateToOnboarding={() => setActiveView('onboarding')}
              />
            </div>
          )}
          {activeView === 'onboarding' && (
            <div className="box-border content-stretch flex flex-col items-start pb-[72px] pt-[88px] px-[72px] w-full">
              <CustomerOnboarding
                customers={customers}
                onAddCustomer={handleAddCustomer}
                onUpdateCustomer={handleUpdateCustomer}
              />
            </div>
          )}
        </main>
      </div>
    </div>
  );
}