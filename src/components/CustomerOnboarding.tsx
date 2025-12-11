import { useState } from 'react';
import { Plus, Edit, ExternalLink, X, ChevronDown, ChevronRight, ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { Customer } from '../App';
import { OnboardingWizard } from './OnboardingWizard';
import { toast } from 'sonner@2.0.3';

type CustomerOnboardingProps = {
  customers: Customer[];
  onAddCustomer: (customer: Omit<Customer, 'id' | 'createdAt'>) => void;
  onUpdateCustomer: (customer: Customer) => void;
};

type OnboardingData = {
  // Step 1 - Enterprise Info
  enterpriseName: string;
  enterpriseWebsite: string;
  enterpriseEmail: string;
  
  // Step 2 - Organizational Structure
  groupLevels: Array<{
    id: string;
    enterprise: string;
    groupLevelName: string;
    groupLevelNumber: string;
  }>;
  groups: Array<{
    id: string;
    enterprise: string;
    locationGroupLevel: string;
    groupName: string;
    parentGroup: string;
  }>;
  
  // Step 3 - Locations (with commodities and solar)
  locations: Array<{
    id: string;
    longitude: string;
    latitude: string;
    locationTag: string;
    locationState: string;
    locationCity: string;
    deviceResolution: string;
    country: string;
    locationGroupLevel: string;
    locationGroup: string;
    locationQualifiers: string[];
    locationTags: string[]; // Location-specific tags
    commodities: Array<{
      id: string;
      commodityType: string;
      price: string;
    }>;
    solarCapacity: string;
  }>;
  
  // Step 4 - Create Sensors
  sensors: Array<{
    id: string;
    location: string;
    sensorId: string;
    installationDate: string;
    firmwareVersion: string;
    meters: Array<{
      id: string;
      meterId: string;
      meterType: string;
      channels: Array<{
        id: string;
        channelName: string;
      }>;
    }>;
  }>;
  
  // Step 5 - Power Sources
  sources: Array<{
    id: string;
    sourceType: 'generator' | 'solar' | 'battery' | 'inverter' | 'grid';
    sensor: string;
    meter: string;
    channel: string;
    capacity?: string;
    // Generator specific
    coefficientA?: string;
    coefficientB?: string;
    tankVolume?: string;
    fuelType?: string;
    // Solar specific
    unitCost?: string;
    azimuth?: string;
    tilt?: string;
    // Inverter specific
    assetName?: string;
    assetId?: string;
    rating?: string;
  }>;
  
  // Step 6 - Admin
  superAdmin: {
    email: string;
    firstName: string;
    lastName: string;
  };
};

export function CustomerOnboarding({ customers, onAddCustomer, onUpdateCustomer }: CustomerOnboardingProps) {
  const [showOnboardingPage, setShowOnboardingPage] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
  const [onboardingData, setOnboardingData] = useState<OnboardingData>({
    enterpriseName: '',
    enterpriseWebsite: '',
    enterpriseEmail: '',
    groupLevels: [],
    groups: [],
    locations: [],
    sensors: [],
    sources: [],
    superAdmin: {
      email: '',
      firstName: '',
      lastName: '',
    },
  });
  const [currentStep, setCurrentStep] = useState(1);
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());
  const [tempLocation, setTempLocation] = useState({
    longitude: '',
    latitude: '',
    locationTag: '',
    locationState: '',
    locationCity: '',
    deviceResolution: '',
    country: '',
    locationGroupLevel: '',
    locationGroup: '',
    locationQualifiers: [] as string[],
    locationTags: [] as string[],
    commodities: [] as Array<{ id: string; commodityType: string; price: string }>,
    solarCapacity: '',
  });
  const [tempGroupLevel, setTempGroupLevel] = useState({
    enterprise: '',
    groupLevelName: '',
    groupLevelNumber: '',
  });
  const [tempGroup, setTempGroup] = useState({
    enterprise: '',
    locationGroupLevel: '',
    groupName: '',
    parentGroup: '',
  });
  const [tempClusterLocation, setTempClusterLocation] = useState({
    location: '',
    locationGroupLevel: '',
    locationGroup: '',
    locationQualifiers: [] as string[],
  });
  const [tempSensor, setTempSensor] = useState({
    location: '',
    sensorId: '',
    installationDate: '',
    firmwareVersion: '',
    meters: [] as Array<{
      id: string;
      meterId: string;
      meterType: string;
      channels: Array<{ id: string; channelName: string }>;
    }>,
  });
  const [tempMeter, setTempMeter] = useState({
    meterId: '',
    meterType: '',
    channels: [] as Array<{ id: string; channelName: string }>,
  });
  const [tempChannelName, setTempChannelName] = useState('');
  const [availableQualifiers] = useState(['Primary', 'Secondary', 'Backup', 'Critical', 'Standard']);
  
  // New state for commodities
  const [tempCommodity, setTempCommodity] = useState({
    commodityType: '',
    price: '',
  });
  
  // New state for power sources
  const [tempSource, setTempSource] = useState({
    sourceType: 'generator' as 'generator' | 'solar' | 'battery' | 'inverter' | 'grid',
    sensor: '',
    meter: '',
    channel: '',
    capacity: '',
    coefficientA: '',
    coefficientB: '',
    tankVolume: '',
    fuelType: '',
    unitCost: '',
    azimuth: '',
    tilt: '',
    assetName: '',
    assetId: '',
    rating: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingCustomer) {
      onUpdateCustomer({
        ...editingCustomer,
        companyName: onboardingData.enterpriseName,
        businessType: editingCustomer.businessType,
        contactName: editingCustomer.contactName,
        email: onboardingData.enterpriseEmail,
        phone: editingCustomer.phone,
        address: editingCustomer.address,
        status: editingCustomer.status,
        locations: editingCustomer.locations,
      });
    } else {
      // For new customer, we'll handle this after all steps
      // onAddCustomer(formData);
    }
    resetForm();
    setShowOnboardingPage(false);
  };

  const resetForm = () => {
    setOnboardingData({
      enterpriseName: '',
      enterpriseWebsite: '',
      enterpriseEmail: '',
      groupLevels: [],
      groups: [],
      locations: [],
      sensors: [],
      sources: [],
      superAdmin: {
        email: '',
        firstName: '',
        lastName: '',
      },
    });
    setCurrentStep(1);
    setEditingCustomer(null);
  };

  const handleEdit = (customer: Customer) => {
    setEditingCustomer(customer);
    // Restore saved onboarding data if it exists
    if (customer.onboardingData) {
      setOnboardingData(customer.onboardingData);
    } else {
      setOnboardingData({
        enterpriseName: customer.companyName,
        enterpriseWebsite: '',
        enterpriseEmail: customer.email,
        locations: [],
        groupLevels: [],
        groups: [],
        sensors: [],
        sources: [],
        superAdmin: {
          email: '',
          firstName: '',
          lastName: '',
        },
      });
    }
    // Restore saved step if it exists
    if (customer.savedStep) {
      setCurrentStep(customer.savedStep);
    } else {
      setCurrentStep(1);
    }
    setShowOnboardingPage(true);
  };

  const handleSaveAndExit = () => {
    // Save current progress as a pending customer or update existing
    if (editingCustomer) {
      // Update existing customer with current progress
      onUpdateCustomer({
        ...editingCustomer,
        companyName: onboardingData.enterpriseName || editingCustomer.companyName,
        email: onboardingData.enterpriseEmail || editingCustomer.email,
        status: 'pending',
        onboardingData: onboardingData,
        savedStep: currentStep,
        locations: onboardingData.locations.map(loc => ({
          id: loc.id,
          name: loc.locationTag || 'Unnamed Location',
          address: `${loc.locationCity}, ${loc.locationState}`,
        })),
      });
    } else if (onboardingData.enterpriseName) {
      // Create new pending customer
      const pendingCustomer: Omit<Customer, 'id' | 'createdAt'> = {
        companyName: onboardingData.enterpriseName || 'Incomplete Onboarding',
        businessType: 'Other',
        contactName: 'Pending',
        email: onboardingData.enterpriseEmail || 'pending@company.com',
        phone: 'N/A',
        address: 'N/A',
        status: 'pending',
        locations: onboardingData.locations.map(loc => ({
          id: loc.id,
          name: loc.locationTag || 'Unnamed Location',
          address: `${loc.locationCity}, ${loc.locationState}`,
        })),
        onboardingData: onboardingData,
        savedStep: currentStep,
      };
      onAddCustomer(pendingCustomer);
    }
    setShowOnboardingPage(false);
    resetForm();
  };

  const toggleRow = (customerId: string) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(customerId)) {
      newExpanded.delete(customerId);
    } else {
      newExpanded.add(customerId);
    }
    setExpandedRows(newExpanded);
  };

  const handleNextStep = () => {
    // Validation logic here
    if (currentStep < 13) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const addLocation = () => {
    if (tempLocation.locationTag && tempLocation.locationCity) {
      const groupText = tempLocation.locationGroup ? ` to ${tempLocation.locationGroup}` : '';
      setOnboardingData({
        ...onboardingData,
        locations: [...onboardingData.locations, { id: Date.now().toString(), ...tempLocation }],
      });
      toast.success(`Location "${tempLocation.locationTag}" added${groupText}`);
      setTempLocation({
        longitude: '',
        latitude: '',
        locationTag: '',
        locationState: '',
        locationCity: '',
        deviceResolution: '',
        country: '',
        locationGroupLevel: '',
        locationGroup: '',
        locationQualifiers: [] as string[],
        locationTags: [] as string[],
        commodities: [] as Array<{ id: string; commodityType: string; price: string }>,
        solarCapacity: '',
      });
    }
  };

  const removeLocation = (id: string) => {
    const location = onboardingData.locations.find((l: any) => l.id === id);
    setOnboardingData({
      ...onboardingData,
      locations: onboardingData.locations.filter((l: any) => l.id !== id),
    });
    if (location) {
      toast.error(`Location "${location.locationTag}" removed`);
    }
  };

  const addGroupLevel = () => {
    if (tempGroupLevel.groupLevelName && tempGroupLevel.groupLevelNumber) {
      setOnboardingData({
        ...onboardingData,
        groupLevels: [...onboardingData.groupLevels, { id: Date.now().toString(), ...tempGroupLevel }],
      });
      setTempGroupLevel({
        enterprise: '',
        groupLevelName: '',
        groupLevelNumber: '',
      });
    }
  };

  const removeGroupLevel = (id: string) => {
    setOnboardingData({
      ...onboardingData,
      groupLevels: onboardingData.groupLevels.filter(g => g.id !== id),
    });
  };

  const addGroup = () => {
    if (tempGroup.groupName && tempGroup.locationGroupLevel) {
      setOnboardingData({
        ...onboardingData,
        groups: [...onboardingData.groups, { id: Date.now().toString(), ...tempGroup }],
      });
      toast.success(`Group "${tempGroup.groupName}" added to ${tempGroup.locationGroupLevel}`);
      setTempGroup({
        enterprise: '',
        locationGroupLevel: '',
        groupName: '',
        parentGroup: '',
      });
    }
  };

  const removeGroup = (id: string) => {
    setOnboardingData({
      ...onboardingData,
      groups: onboardingData.groups.filter(g => g.id !== id),
    });
  };

  const addSensor = () => {
    if (tempSensor.location && tempSensor.sensorId) {
      setOnboardingData({
        ...onboardingData,
        sensors: [...onboardingData.sensors, { id: Date.now().toString(), ...tempSensor }],
      });
      toast.success(`Sensor "${tempSensor.sensorId}" added to ${tempSensor.location}`);
      setTempSensor({
        location: '',
        sensorId: '',
        installationDate: '',
        firmwareVersion: '',
        meters: [],
      });
      setTempMeter({
        meterId: '',
        meterType: '',
        channels: [],
      });
    }
  };

  const removeSensor = (id: string) => {
    setOnboardingData({
      ...onboardingData,
      sensors: onboardingData.sensors.filter(s => s.id !== id),
    });
  };

  const addMeterToSensor = () => {
    if (tempMeter.meterId && tempMeter.meterType) {
      setTempSensor({
        ...tempSensor,
        meters: [...tempSensor.meters, { id: Date.now().toString(), ...tempMeter }],
      });
      setTempMeter({
        meterId: '',
        meterType: '',
        channels: [],
      });
    }
  };

  const removeMeterFromSensor = (meterId: string) => {
    setTempSensor({
      ...tempSensor,
      meters: tempSensor.meters.filter(m => m.id !== meterId),
    });
  };

  const addChannelToMeter = () => {
    if (tempChannelName) {
      setTempMeter({
        ...tempMeter,
        channels: [...tempMeter.channels, { id: Date.now().toString(), channelName: tempChannelName }],
      });
      setTempChannelName('');
    }
  };

  const removeChannelFromMeter = (channelId: string) => {
    setTempMeter({
      ...tempMeter,
      channels: tempMeter.channels.filter(c => c.id !== channelId),
    });
  };
  
  // Commodity functions
  const addCommodityToLocation = () => {
    if (tempCommodity.commodityType && tempCommodity.price) {
      setTempLocation({
        ...tempLocation,
        commodities: [...tempLocation.commodities, { id: Date.now().toString(), ...tempCommodity }],
      });
      setTempCommodity({ commodityType: '', price: '' });
    }
  };
  
  const removeCommodityFromLocation = (commodityId: string) => {
    setTempLocation({
      ...tempLocation,
      commodities: tempLocation.commodities.filter(c => c.id !== commodityId),
    });
  };
  
  // Source functions
  const addSource = () => {
    if (tempSource.sensor && tempSource.meter && tempSource.channel) {
      setOnboardingData({
        ...onboardingData,
        sources: [...onboardingData.sources, { id: Date.now().toString(), ...tempSource }],
      });
      const sourceType = tempSource.sourceType.charAt(0).toUpperCase() + tempSource.sourceType.slice(1);
      toast.success(`${sourceType} power source added`);
      setTempSource({
        sourceType: 'generator',
        sensor: '',
        meter: '',
        channel: '',
        capacity: '',
        coefficientA: '',
        coefficientB: '',
        tankVolume: '',
        fuelType: '',
        unitCost: '',
        azimuth: '',
        tilt: '',
        assetName: '',
        assetId: '',
        rating: '',
      });
    }
  };
  
  const removeSource = (id: string) => {
    setOnboardingData({
      ...onboardingData,
      sources: onboardingData.sources.filter(s => s.id !== id),
    });
  };

  // Conditional rendering: Show either customer list or onboarding page
  if (showOnboardingPage) {
    return (
      <OnboardingWizard
        onClose={() => {
          setShowOnboardingPage(false);
          resetForm();
        }}
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
        onboardingData={onboardingData}
        setOnboardingData={setOnboardingData}
        tempLocation={tempLocation}
        setTempLocation={setTempLocation}
        tempGroupLevel={tempGroupLevel}
        setTempGroupLevel={setTempGroupLevel}
        tempGroup={tempGroup}
        setTempGroup={setTempGroup}
        tempSensor={tempSensor}
        setTempSensor={setTempSensor}
        tempMeter={tempMeter}
        setTempMeter={setTempMeter}
        tempChannelName={tempChannelName}
        setTempChannelName={setTempChannelName}
        tempCommodity={tempCommodity}
        setTempCommodity={setTempCommodity}
        tempSource={tempSource}
        setTempSource={setTempSource}
        availableQualifiers={availableQualifiers}
        addLocation={addLocation}
        removeLocation={removeLocation}
        addGroupLevel={addGroupLevel}
        removeGroupLevel={removeGroupLevel}
        addGroup={addGroup}
        removeGroup={removeGroup}
        addSensor={addSensor}
        removeSensor={removeSensor}
        addMeterToSensor={addMeterToSensor}
        removeMeterFromSensor={removeMeterFromSensor}
        addChannelToMeter={addChannelToMeter}
        removeChannelFromMeter={removeChannelFromMeter}
        addCommodityToLocation={addCommodityToLocation}
        removeCommodityFromLocation={removeCommodityFromLocation}
        addSource={addSource}
        removeSource={removeSource}
        onSaveAndExit={handleSaveAndExit}
      />
    );
  }

  return (
    <div className="w-full">
      {/* Header */}
      <div className="content-stretch flex gap-[8px] items-center justify-between relative shrink-0 w-full mb-[24px]">
        <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[28px] text-[20px] text-zinc-950 tracking-[-0.1px]">Customers</p>
        <button
          onClick={() => {
            resetForm();
            setShowOnboardingPage(true);
          }}
          className="bg-zinc-950 box-border content-stretch flex gap-[10px] items-center justify-center px-[16px] py-[8px] relative rounded-[6px] shrink-0 hover:opacity-90 transition-opacity"
        >
          <p className="font-['Inter:Medium',sans-serif] font-medium leading-[24px] not-italic text-[14px] text-neutral-50 text-nowrap whitespace-pre">Onboard New Customer</p>
        </button>
      </div>

      {/* Customers Table */}
      <div className="relative rounded-[8px] shrink-0 w-full">
        <div aria-hidden="true" className="absolute border border-solid border-zinc-200 inset-0 pointer-events-none rounded-[8px]" />
        <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] w-full">
          {/* Table Header */}
          <div className="bg-zinc-50 content-stretch flex items-center relative shrink-0 w-full border-b border-zinc-200">
            <div className="box-border content-stretch flex gap-[10px] items-center p-[16px] relative shrink-0 w-[123px]">
              <p className="basis-0 font-['Inter:Semi_Bold',sans-serif] font-semibold grow leading-[20px] min-h-px min-w-px not-italic text-[12px] text-zinc-950">ID</p>
            </div>
            <div className="box-border content-stretch flex gap-[10px] items-center p-[16px] relative shrink-0 w-[292px]">
              <p className="basis-0 font-['Inter:Semi_Bold',sans-serif] font-semibold grow leading-[20px] min-h-px min-w-px not-italic text-[12px] text-zinc-950">ENTERPRISE</p>
            </div>
            <div className="basis-0 grow min-h-px min-w-px relative shrink-0">
              <div className="flex flex-row items-center size-full">
                <div className="box-border content-stretch flex gap-[10px] items-center p-[16px] relative w-full">
                  <p className="basis-0 font-['Inter:Semi_Bold',sans-serif] font-semibold grow leading-[20px] min-h-px min-w-px not-italic text-[12px] text-zinc-950">SUPER ADMIN</p>
                </div>
              </div>
            </div>
            <div className="box-border content-stretch flex gap-[10px] items-center p-[16px] relative shrink-0 w-[240px]">
              <p className="basis-0 font-['Inter:Semi_Bold',sans-serif] font-semibold grow leading-[20px] min-h-px min-w-px not-italic text-[12px] text-zinc-950">CREATION DATE</p>
            </div>
            <div className="box-border content-stretch flex gap-[10px] items-center px-[12px] py-[16px] relative shrink-0 w-[160px]">
              <p className="basis-0 font-['Inter:Semi_Bold',sans-serif] font-semibold grow leading-[20px] min-h-px min-w-px not-italic text-[12px] text-zinc-950">STATUS</p>
            </div>
          </div>

          {/* Table Rows */}
          {customers.length === 0 ? (
            <div className="w-full py-[48px] text-center bg-white">
              <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] text-[14px] text-zinc-500">No customers yet. Click "Onboard New Customer" to get started.</p>
            </div>
          ) : (
            customers.map((customer, index) => {
              const isExpanded = expandedRows.has(customer.id);
              return (
                <>
                  <div 
                    key={customer.id} 
                    className={`content-stretch flex items-center relative shrink-0 w-full ${index < customers.length - 1 ? 'border-b border-zinc-200' : ''} ${index % 2 === 0 ? 'bg-zinc-100' : 'bg-white'} hover:bg-zinc-50 transition-colors cursor-pointer`}
                    onClick={() => toggleRow(customer.id)}
                  >
                    {/* ID Column */}
                    <div className="box-border content-stretch flex gap-[10px] items-center p-[16px] relative shrink-0 w-[123px]">
                      <p className="basis-0 font-['Inter:Regular',sans-serif] font-normal grow leading-[24px] min-h-px min-w-px not-italic text-[14px] text-zinc-950">#{customer.id.slice(0, 4)}</p>
                    </div>

                    {/* Enterprise Column */}
                    <div className="box-border content-stretch flex gap-[10px] items-center p-[16px] relative shrink-0 w-[292px]">
                      <p className="-webkit-box basis-0 font-['Inter:Regular',sans-serif] font-normal grow leading-[24px] min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden text-[14px] text-zinc-950">{customer.companyName}</p>
                    </div>

                    {/* Super Admin Column */}
                    <div className="basis-0 grow min-h-px min-w-px relative shrink-0">
                      <div className="flex flex-row items-center size-full">
                        <div className="box-border content-stretch flex gap-[10px] items-center p-[16px] relative w-full">
                          <div className="content-stretch flex flex-col gap-[2px] items-start leading-[20px] not-italic text-[14px] text-nowrap whitespace-pre">
                            <p className="font-['Inter:Medium',sans-serif] font-medium text-zinc-950">{customer.contactName}</p>
                            <p className="font-['Inter:Regular',sans-serif] font-normal text-zinc-500">{customer.email}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Creation Date Column */}
                    <div className="box-border content-stretch flex gap-[10px] items-center p-[16px] relative shrink-0 w-[240px]">
                      <p className="basis-0 font-['Inter:Regular',sans-serif] font-normal grow leading-[24px] min-h-px min-w-px not-italic text-[14px] text-zinc-950">
                        {new Date(customer.createdAt).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric',
                          hour: 'numeric',
                          minute: '2-digit',
                          hour12: true 
                        })}
                      </p>
                    </div>

                    {/* Status Column */}
                    <div className="box-border content-stretch flex gap-[10px] items-center px-[12px] py-[16px] relative shrink-0 w-[160px]">
                      <div className={`box-border content-stretch flex gap-[4px] items-center px-[8px] py-[2px] rounded-[6px] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] shrink-0 ${
                        customer.status === 'active' ? 'bg-zinc-100' : 
                        customer.status === 'pending' ? 'bg-amber-100' : 
                        'bg-red-500'
                      }`}>
                        <p className={`font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic text-[12px] text-center text-nowrap whitespace-pre ${
                          customer.status === 'active' ? 'text-zinc-950' : 
                          customer.status === 'pending' ? 'text-amber-700' : 
                          'text-neutral-50'
                        }`}>
                          {customer.status === 'active' ? 'Online' : customer.status === 'pending' ? 'Pending' : 'Offline'}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Expanded Row Details */}
                  {isExpanded && (
                    <div key={`${customer.id}-details`} className="w-full px-[24px] py-[24px] bg-zinc-50 border-b border-zinc-200">
                      <div className="grid grid-cols-3 gap-[24px] mb-[16px]">
                        <div>
                          <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16px] text-[12px] text-zinc-500 mb-[4px]">Business Type</p>
                          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] text-[14px] text-zinc-950">{customer.businessType}</p>
                        </div>
                        <div>
                          <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16px] text-[12px] text-zinc-500 mb-[4px]">Locations</p>
                          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] text-[14px] text-zinc-950">{customer.locations.length}</p>
                        </div>
                        <div>
                          <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16px] text-[12px] text-zinc-500 mb-[4px]">Phone</p>
                          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] text-[14px] text-zinc-950">{customer.phone}</p>
                        </div>
                      </div>
                      <div className="flex gap-[8px]">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEdit(customer);
                          }}
                          className="bg-white box-border content-stretch flex gap-[6px] items-center justify-center px-[12px] py-[6px] relative rounded-[6px] shrink-0 border border-solid border-zinc-200 hover:bg-zinc-50 transition-colors"
                        >
                          <Edit className="w-[14px] h-[14px] text-zinc-950" />
                          <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic text-[14px] text-nowrap text-zinc-950 whitespace-pre">Edit</p>
                        </button>
                        <button
                          onClick={(e) => e.stopPropagation()}
                          disabled={customer.status !== 'active'}
                          className={`box-border content-stretch flex gap-[6px] items-center justify-center px-[12px] py-[6px] relative rounded-[6px] shrink-0 transition-opacity ${
                            customer.status === 'active' ? 'bg-zinc-950 hover:opacity-90' : 'bg-zinc-200 cursor-not-allowed'
                          }`}
                        >
                          <ExternalLink className={`w-[14px] h-[14px] ${customer.status === 'active' ? 'text-white' : 'text-zinc-400'}`} />
                          <p className={`font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic text-[14px] text-nowrap whitespace-pre ${
                            customer.status === 'active' ? 'text-white' : 'text-zinc-400'
                          }`}>Access Dashboard</p>
                        </button>
                      </div>
                    </div>
                  )}
                </>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}