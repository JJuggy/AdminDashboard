import { useState } from 'react';
import { Search, ExternalLink, Building2, Phone, Mail, MapPin } from 'lucide-react';
import { Customer } from '../App';

type CustomerAccessProps = {
  customers: Customer[];
};

export function CustomerAccess({ customers }: CustomerAccessProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.contactName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAccessDashboard = (customer: Customer) => {
    // In a real application, this would authenticate as the customer
    // For now, we'll just show a modal with the customer info
    setSelectedCustomer(customer);
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl mb-2">Customer Dashboard Access</h1>
        <p className="text-[#6B778C]">Access customer dashboards without requiring their credentials</p>
      </div>

      <div className="bg-white rounded-lg border border-[#DFE1E6] shadow-sm">
        <div className="p-6 border-b border-[#DFE1E6]">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B778C]" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search customers by name, contact, or email..."
              className="w-full pl-10 pr-4 py-2 border border-[#DFE1E6] rounded focus:outline-none focus:ring-2 focus:ring-[#0747A6] focus:border-transparent"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#F4F5F7] border-b border-[#DFE1E6]">
              <tr>
                <th className="px-6 py-3 text-left text-sm text-[#42526E]">Organization</th>
                <th className="px-6 py-3 text-left text-sm text-[#42526E]">Contact</th>
                <th className="px-6 py-3 text-left text-sm text-[#42526E]">Service Type</th>
                <th className="px-6 py-3 text-left text-sm text-[#42526E]">Status</th>
                <th className="px-6 py-3 text-left text-sm text-[#42526E]">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#DFE1E6]">
              {filteredCustomers.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-[#6B778C]">
                    No customers found
                  </td>
                </tr>
              ) : (
                filteredCustomers.map((customer) => (
                  <tr key={customer.id} className="hover:bg-[#FAFBFC] transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded bg-[#DEEBFF] flex items-center justify-center">
                          <Building2 className="w-5 h-5 text-[#0747A6]" />
                        </div>
                        <div>
                          <p className="mb-1">{customer.name}</p>
                          <p className="text-sm text-[#6B778C]">{customer.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="mb-1">{customer.contactName}</p>
                      <p className="text-sm text-[#6B778C]">{customer.phone}</p>
                    </td>
                    <td className="px-6 py-4 text-[#42526E]">{customer.serviceType}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded text-sm inline-block ${
                          customer.status === 'active'
                            ? 'bg-[#E3FCEF] text-[#00875A]'
                            : customer.status === 'pending'
                            ? 'bg-[#FFF0E5] text-[#FF991F]'
                            : 'bg-[#F4F5F7] text-[#6B778C]'
                        }`}
                      >
                        {customer.status.charAt(0).toUpperCase() + customer.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleAccessDashboard(customer)}
                        className="flex items-center gap-2 px-4 py-2 bg-[#0747A6] text-white rounded hover:bg-[#0052CC] transition-colors"
                        disabled={customer.status !== 'active'}
                      >
                        <ExternalLink className="w-4 h-4" />
                        Access Dashboard
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {selectedCustomer && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full p-6">
            <h2 className="text-2xl mb-6">Accessing Customer Dashboard</h2>
            
            <div className="bg-[#DEEBFF] border border-[#0747A6] rounded-lg p-4 mb-6">
              <p className="text-[#0747A6]">
                You are about to access the dashboard for <strong>{selectedCustomer.name}</strong>. 
                This action will be logged for security purposes.
              </p>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex items-start gap-3">
                <Building2 className="w-5 h-5 text-[#6B778C] mt-0.5" />
                <div>
                  <p className="text-sm text-[#6B778C]">Organization</p>
                  <p>{selectedCustomer.name}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-[#6B778C] mt-0.5" />
                <div>
                  <p className="text-sm text-[#6B778C]">Contact</p>
                  <p>{selectedCustomer.contactName} • {selectedCustomer.email}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-[#6B778C] mt-0.5" />
                <div>
                  <p className="text-sm text-[#6B778C]">Phone</p>
                  <p>{selectedCustomer.phone}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#6B778C] mt-0.5" />
                <div>
                  <p className="text-sm text-[#6B778C]">Address</p>
                  <p>{selectedCustomer.address}</p>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setSelectedCustomer(null)}
                className="px-6 py-2 border border-[#DFE1E6] rounded text-[#42526E] hover:bg-[#F4F5F7] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  // In a real app, this would navigate to the customer dashboard
                  alert(`Accessing dashboard for ${selectedCustomer.name}...`);
                  setSelectedCustomer(null);
                }}
                className="px-6 py-2 bg-[#0747A6] text-white rounded hover:bg-[#0052CC] transition-colors"
              >
                Confirm Access
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
