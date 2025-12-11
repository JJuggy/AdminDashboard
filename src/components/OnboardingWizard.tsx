import { ArrowLeft, ArrowRight, Check, X, Plus, ChevronDown, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner@2.0.3';
import { OnboardingPreview } from './OnboardingPreview';
import { Button } from './ui/Button';
import { Input } from './ui/Input';

type Step = {
  number: number;
  title: string;
  description: string;
};

type OnboardingWizardProps = {
  onClose: () => void;
  currentStep: number;
  setCurrentStep: (step: number) => void;
  onboardingData: any;
  setOnboardingData: (data: any) => void;
  tempLocation: any;
  setTempLocation: (data: any) => void;
  tempGroupLevel: any;
  setTempGroupLevel: (data: any) => void;
  tempGroup: any;
  setTempGroup: (data: any) => void;
  tempSensor: any;
  setTempSensor: (data: any) => void;
  tempMeter: any;
  setTempMeter: (data: any) => void;
  tempChannelName: string;
  setTempChannelName: (name: string) => void;
  tempCommodity: any;
  setTempCommodity: (data: any) => void;
  tempSource: any;
  setTempSource: (data: any) => void;
  availableQualifiers: string[];
  addLocation: () => void;
  removeLocation: (id: string) => void;
  addGroupLevel: () => void;
  removeGroupLevel: (id: string) => void;
  addGroup: () => void;
  removeGroup: (id: string) => void;
  addSensor: () => void;
  removeSensor: (id: string) => void;
  addMeterToSensor: () => void;
  removeMeterFromSensor: (meterId: string) => void;
  addChannelToMeter: () => void;
  removeChannelFromMeter: (channelId: string) => void;
  addCommodityToLocation: () => void;
  removeCommodityFromLocation: (commodityId: string) => void;
  addSource: () => void;
  removeSource: (id: string) => void;
  onSaveAndExit: () => void;
};

const steps: Step[] = [
  { number: 1, title: 'Enterprise Info', description: 'Set up enterprise information' },
  { number: 2, title: 'Create Structure', description: 'Define organizational hierarchy' },
  { number: 3, title: 'Add Locations', description: 'Add and configure locations' },
  { number: 4, title: 'Create Sensors', description: 'Add sensors and meters' },
  { number: 5, title: 'Power Sources', description: 'Configure power sources' },
  { number: 6, title: 'Review & Admin', description: 'Review and create admin' },
];

const commodityTypes = ['Fuel', 'Electricity', 'Diesel', 'Gas', 'Water'];
const fuelTypes = ['Diesel', 'Petrol', 'Gas', 'Biodiesel'];

export function OnboardingWizard({
  onClose,
  currentStep,
  setCurrentStep,
  onboardingData,
  setOnboardingData,
  tempLocation,
  setTempLocation,
  tempGroupLevel,
  setTempGroupLevel,
  tempGroup,
  setTempGroup,
  tempSensor,
  setTempSensor,
  tempMeter,
  setTempMeter,
  tempChannelName,
  setTempChannelName,
  tempCommodity,
  setTempCommodity,
  tempSource,
  setTempSource,
  availableQualifiers,
  addLocation,
  removeLocation,
  addGroupLevel,
  removeGroupLevel,
  addGroup,
  removeGroup,
  addSensor,
  removeSensor,
  addMeterToSensor,
  removeMeterFromSensor,
  addChannelToMeter,
  removeChannelFromMeter,
  addCommodityToLocation,
  removeCommodityFromLocation,
  addSource,
  removeSource,
  onSaveAndExit,
}: OnboardingWizardProps) {
  
  // UI state for expandable sections
  const [expandedSections, setExpandedSections] = useState({
    commodities: false,
    solar: false,
  });
  
  const handleNext = () => {
    if (currentStep < 6) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const nigerianStates = ['Lagos', 'Abuja', 'Kano', 'Rivers', 'Kaduna', 'Oyo', 'Delta'];

  const toggleSection = (section: 'commodities' | 'solar') => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <div className="w-full min-h-screen bg-white flex">
      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-zinc-200 px-[72px] py-[24px] z-20">
          <div className="box-border content-stretch flex gap-[8px] items-center relative shrink-0 w-full">
            <button
              onClick={onClose}
              className="box-border content-stretch flex flex-col gap-[10px] items-center justify-center p-[12px] relative rounded-[4px] size-[32px] hover:bg-zinc-50 transition-colors"
            >
              <div aria-hidden="true" className="absolute border border-solid border-zinc-200 inset-[-1px] pointer-events-none rounded-[5px]" />
              <div className="flex items-center justify-center relative shrink-0">
                <ArrowLeft className="w-[16px] h-[16px] text-zinc-950" />
              </div>
            </button>
            <div className="basis-0 content-stretch flex flex-col gap-[2px] grow items-start min-h-px min-w-px relative shrink-0">
              <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[28px] not-italic relative shrink-0 text-[20px] text-nowrap text-zinc-950 tracking-[-0.1px] whitespace-pre">Onboard Customer</p>
            </div>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="sticky top-[81px] bg-white border-b border-zinc-200 z-10">
          <div className="box-border content-stretch flex flex-col items-start pb-px pt-[24px] px-[72px] relative w-full">
            <div className="content-stretch flex gap-[8px] items-start relative shrink-0 w-full">
              {steps.map((step, index) => (
                <div key={step.number} className="flex items-start gap-[8px]">
                  <div className={`relative ${index === steps.length - 1 ? 'shrink-0 w-[120px]' : 'shrink-0 w-[152px]'}`}>
                    {/* Step content */}
                    <div className="absolute content-stretch flex flex-col gap-[8px] h-[56px] items-center left-0 top-0 w-[120px]">
                      {/* Circle */}
                      <div className={`basis-0 grow min-h-px min-w-px relative rounded-full shrink-0 w-[32px] flex items-center justify-center ${
                        step.number === currentStep ? 'bg-zinc-950' : step.number < currentStep ? 'bg-lime-600' : 'bg-zinc-200'
                      }`}>
                        <p className={`font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[18px] not-italic text-[12px] ${
                          step.number === currentStep || step.number < currentStep ? 'text-white' : 'text-zinc-500'
                        }`}>
                          {step.number}
                        </p>
                      </div>
                      {/* Label */}
                      <p className={`font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic text-[12px] text-center whitespace-pre ${
                        step.number === currentStep ? 'text-zinc-950' : 'text-zinc-500'
                      }`}>
                        {step.title}
                      </p>
                    </div>
                    {/* Connector line */}
                    {index < steps.length - 1 && (
                      <div className={`absolute h-[2px] left-[124px] top-[15px] w-[24px] ${
                        step.number < currentStep ? 'bg-lime-600' : 'bg-zinc-200'
                      }`} />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      {/* Content Area */}
      <div className="flex-1 overflow-auto">
        <div className="box-border content-stretch flex flex-col items-start px-[72px] py-[24px] pb-[120px] w-full">
          {/* Step 1: Enterprise Info */}
          {currentStep === 1 && (
            <div className="box-border content-stretch flex flex-col gap-[16px] items-start overflow-clip px-0 py-[24px] relative rounded-[8px] shadow-[0px_4px_6px_-4px_rgba(0,0,0,0.1),0px_10px_15px_-3px_rgba(0,0,0,0.1)] shrink-0 w-full">
              <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
                <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[28px] not-italic relative shrink-0 text-[18px] text-nowrap text-zinc-950 whitespace-pre">Enterprise Information</p>
                <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-w-full not-italic relative shrink-0 text-[14px] text-zinc-500 w-[min-content]">Provide basic information about the enterprise</p>
                
                {/* Form Fields */}
                <div className="box-border content-stretch flex flex-col gap-[32px] items-start justify-center pb-0 pt-[24px] px-0 relative shrink-0 w-full">
                  {/* Enterprise Name */}
                  <div className="content-stretch flex flex-col gap-[6px] items-start relative shrink-0 w-full">
                    <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[14px] text-nowrap text-zinc-950 whitespace-pre">Enterprise Name</p>
                    <div className="content-stretch flex gap-[8px] items-start relative shrink-0 w-full">
                      <div className="basis-0 content-stretch flex flex-col gap-[6px] grow items-start min-h-px min-w-px relative shrink-0">
                        <div className="bg-white relative rounded-[6px] shrink-0 w-full">
                          <div aria-hidden="true" className="absolute border border-solid border-zinc-200 inset-[-1px] pointer-events-none rounded-[7px]" />
                          <div className="flex flex-row items-center size-full">
                            <div className="box-border content-stretch flex gap-[12px] items-center px-[12px] py-[8px] relative w-full">
                              <input
                                type="text"
                                value={onboardingData.enterpriseName}
                                onChange={(e) => setOnboardingData({ ...onboardingData, enterpriseName: e.target.value })}
                                className="basis-0 font-['Inter:Regular',sans-serif] font-normal grow leading-[24px] min-h-px min-w-px not-italic outline-none text-[14px] text-zinc-950 bg-transparent w-full"
                                placeholder="Enter enterprise name"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Enterprise Website Address */}
                  <div className="content-stretch flex flex-col gap-[6px] items-start relative shrink-0 w-full">
                    <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[14px] text-nowrap text-zinc-950 whitespace-pre">Enterprise Website Address</p>
                    <div className="content-stretch flex gap-[8px] items-start relative shrink-0 w-full">
                      <div className="basis-0 content-stretch flex flex-col gap-[6px] grow items-start min-h-px min-w-px relative shrink-0">
                        <div className="bg-white relative rounded-[6px] shrink-0 w-full">
                          <div aria-hidden="true" className="absolute border border-solid border-zinc-200 inset-[-1px] pointer-events-none rounded-[7px]" />
                          <div className="flex flex-row items-center size-full">
                            <div className="box-border content-stretch flex gap-[12px] items-center px-[12px] py-[8px] relative w-full">
                              <input
                                type="text"
                                value={onboardingData.enterpriseWebsite}
                                onChange={(e) => setOnboardingData({ ...onboardingData, enterpriseWebsite: e.target.value })}
                                className="basis-0 font-['Inter:Regular',sans-serif] font-normal grow leading-[24px] min-h-px min-w-px not-italic outline-none text-[14px] text-zinc-950 bg-transparent w-full"
                                placeholder="https://example.com"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Enterprise Email Address */}
                  <div className="content-stretch flex flex-col gap-[6px] items-start relative shrink-0 w-[464px]">
                    <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[14px] text-nowrap text-zinc-950 whitespace-pre">Enterprise Email Address</p>
                    <div className="content-stretch flex gap-[8px] items-start relative shrink-0 w-full">
                      <div className="basis-0 content-stretch flex flex-col gap-[6px] grow items-start min-h-px min-w-px relative shrink-0">
                        <div className="bg-white relative rounded-[6px] shrink-0 w-full">
                          <div aria-hidden="true" className="absolute border border-solid border-zinc-200 inset-[-1px] pointer-events-none rounded-[7px]" />
                          <div className="flex flex-row items-center size-full">
                            <div className="box-border content-stretch flex gap-[12px] items-center px-[12px] py-[8px] relative w-full">
                              <input
                                type="email"
                                value={onboardingData.enterpriseEmail}
                                onChange={(e) => setOnboardingData({ ...onboardingData, enterpriseEmail: e.target.value })}
                                className="basis-0 font-['Inter:Regular',sans-serif] font-normal grow leading-[24px] min-h-px min-w-px not-italic outline-none text-[14px] text-zinc-950 bg-transparent w-full"
                                placeholder="contact@enterprise.com"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Create Organizational Structure */}
          {currentStep === 2 && (
            <div>
              <div className="mb-[24px]">
                <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] text-[16px] text-zinc-950 mb-[8px]">
                  Create Organizational Structure
                </p>
                <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] text-[14px] text-zinc-500 mb-[12px]">
                  Define your 3-level hierarchy before adding locations. This organizes locations from broad to specific.
                </p>
                <div className="bg-lime-50 border border-lime-200 rounded-[6px] p-[12px]">
                  <p className="font-['Inter:Medium',sans-serif] font-medium leading-[18px] text-[13px] text-lime-900 mb-[6px]">
                    Example: Region → State → Cluster
                  </p>
                  <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18px] text-[13px] text-lime-800">
                    Level 1 (Region): South Region, North Region<br/>
                    Level 2 (State): Lagos (in South Region), Kano (in North Region)<br/>
                    Level 3 (Cluster): Ikeja Cluster, Yaba Cluster (both in Lagos)
                  </p>
                </div>
              </div>

              {/* Step 1: Define Level Names */}
              <div className="mb-[32px]">
                <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] text-[14px] text-zinc-950 mb-[16px]">
                  Step 1: Define Your 3 Hierarchy Levels
                </p>
                <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18px] text-[13px] text-zinc-500 mb-[16px]">
                  Name each level according to your organization (e.g., Region, State, Cluster or Country, City, Branch)
                </p>
                <div className="grid grid-cols-3 gap-[16px]">
                  {[1, 2, 3].map((levelNum) => {
                    const existingLevel = onboardingData.groupLevels.find((l: any) => parseInt(l.groupLevelNumber) === levelNum);
                    return (
                      <div key={levelNum} className="bg-zinc-50 p-[16px] rounded-[8px]">
                        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] text-[14px] text-zinc-950 mb-[12px]">
                          Level {levelNum} {levelNum === 1 && '(Top)'}
                        </p>
                        <input
                          type="text"
                          value={existingLevel?.groupLevelName || ''}
                          onChange={(e) => {
                            const value = e.target.value;
                            if (existingLevel) {
                              // Update existing
                              setOnboardingData({
                                ...onboardingData,
                                groupLevels: onboardingData.groupLevels.map((l: any) => 
                                  l.id === existingLevel.id ? { ...l, groupLevelName: value } : l
                                ),
                              });
                            } else if (value) {
                              // Create new
                              setOnboardingData({
                                ...onboardingData,
                                groupLevels: [...onboardingData.groupLevels, {
                                  id: Date.now().toString(),
                                  enterprise: onboardingData.enterpriseName,
                                  groupLevelName: value,
                                  groupLevelNumber: levelNum.toString(),
                                }].sort((a: any, b: any) => parseInt(a.groupLevelNumber) - parseInt(b.groupLevelNumber)),
                              });
                            }
                          }}
                          className="w-full px-[12px] py-[8px] border border-zinc-200 rounded-[6px] bg-white focus:outline-none focus:ring-2 focus:ring-zinc-950"
                          placeholder={levelNum === 1 ? "e.g., Region" : levelNum === 2 ? "e.g., State" : "e.g., Cluster"}
                        />
                        {existingLevel && (
                          <div className="mt-[8px]">
                            <p className="font-['Inter:Regular',sans-serif] font-normal leading-[16px] text-[12px] text-lime-700">
                              ✓ Defined
                            </p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Step 2: Create Groups within Each Level */}
              <div>
                <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] text-[14px] text-zinc-950 mb-[16px]">
                  Step 2: Create Groups within Each Level
                </p>
                <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18px] text-[13px] text-zinc-500 mb-[16px]">
                  Add specific groups to each level. Level 2 & 3 groups must have a parent from the level above.
                </p>

                <div className="space-y-[20px]">
                  {onboardingData.groupLevels
                    .sort((a: any, b: any) => parseInt(a.groupLevelNumber) - parseInt(b.groupLevelNumber))
                    .map((level: any, index: number) => {
                      const levelGroups = onboardingData.groups.filter((g: any) => g.locationGroupLevel === level.groupLevelName);
                      const levelNumber = parseInt(level.groupLevelNumber);
                      const parentLevel = onboardingData.groupLevels.find((l: any) => parseInt(l.groupLevelNumber) === levelNumber - 1);
                      const availableParents = parentLevel ? onboardingData.groups.filter((g: any) => g.locationGroupLevel === parentLevel.groupLevelName) : [];

                      return (
                        <div key={level.id} className="bg-zinc-50 p-[20px] rounded-[8px]">
                          <div className="flex items-center justify-between mb-[16px]">
                            <div>
                              <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] text-[14px] text-zinc-950">
                                Level {level.groupLevelNumber}: {level.groupLevelName}
                              </p>
                              <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18px] text-[13px] text-zinc-500">
                                {levelGroups.length} group{levelGroups.length !== 1 ? 's' : ''} created
                              </p>
                            </div>
                          </div>

                          {/* Add Group Form */}
                          <div className="grid grid-cols-2 gap-[12px] mb-[12px]">
                            <div className={levelNumber > 1 ? '' : 'col-span-2'}>
                              <label className="block mb-[8px]">
                                <p className="font-['Inter:Medium',sans-serif] font-medium leading-[18px] text-[13px] text-zinc-700">Group Name</p>
                              </label>
                              <input
                                type="text"
                                value={tempGroup.locationGroupLevel === level.groupLevelName ? tempGroup.groupName : ''}
                                onChange={(e) => setTempGroup({ 
                                  ...tempGroup, 
                                  groupName: e.target.value,
                                  locationGroupLevel: level.groupLevelName,
                                  enterprise: onboardingData.enterpriseName,
                                })}
                                className="w-full px-[12px] py-[8px] border border-zinc-200 rounded-[6px] bg-white focus:outline-none focus:ring-2 focus:ring-zinc-950"
                                placeholder={`e.g., ${levelNumber === 1 ? 'North Region' : levelNumber === 2 ? 'Lagos' : 'Ikeja Cluster'}`}
                              />
                            </div>
                            
                            {levelNumber > 1 && (
                              <div>
                                <label className="block mb-[8px]">
                                  <p className="font-['Inter:Medium',sans-serif] font-medium leading-[18px] text-[13px] text-zinc-700">Parent {parentLevel?.groupLevelName} *</p>
                                </label>
                                <select
                                  value={tempGroup.locationGroupLevel === level.groupLevelName ? tempGroup.parentGroup : ''}
                                  onChange={(e) => setTempGroup({ ...tempGroup, parentGroup: e.target.value })}
                                  className="w-full px-[12px] py-[8px] border border-zinc-200 rounded-[6px] bg-white focus:outline-none focus:ring-2 focus:ring-zinc-950"
                                  disabled={availableParents.length === 0}
                                >
                                  <option value="">Select parent</option>
                                  {availableParents.map((parent: any) => (
                                    <option key={parent.id} value={parent.groupName}>
                                      {parent.groupName}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            )}
                          </div>

                          <button
                            type="button"
                            onClick={() => {
                              if (tempGroup.locationGroupLevel === level.groupLevelName && tempGroup.groupName) {
                                if (levelNumber === 1 || tempGroup.parentGroup) {
                                  addGroup();
                                  setTempGroup({
                                    ...tempGroup,
                                    groupName: '',
                                    parentGroup: '',
                                  });
                                }
                              }
                            }}
                            disabled={
                              tempGroup.locationGroupLevel !== level.groupLevelName ||
                              !tempGroup.groupName ||
                              (levelNumber > 1 && !tempGroup.parentGroup) ||
                              (levelNumber > 1 && availableParents.length === 0)
                            }
                            className="bg-zinc-950 flex gap-[8px] items-center justify-center px-[12px] py-[6px] rounded-[6px] disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <Plus className="w-[14px] h-[14px] text-white" />
                            <p className="font-['Inter:Medium',sans-serif] font-medium leading-[18px] text-[13px] text-white">
                              Add to {level.groupLevelName}
                            </p>
                          </button>

                          {levelNumber > 1 && availableParents.length === 0 && (
                            <p className="mt-[12px] font-['Inter:Regular',sans-serif] font-normal leading-[16px] text-[12px] text-amber-700 bg-amber-50 p-[8px] rounded-[4px]">
                              ⚠️ Create {parentLevel?.groupLevelName} groups first before adding {level.groupLevelName} groups
                            </p>
                          )}

                          {/* Groups List */}
                          {levelGroups.length > 0 && (
                            <div className="mt-[16px] space-y-[6px]">
                              {levelGroups.map((group: any) => (
                                <div key={group.id} className="flex items-center justify-between p-[10px] bg-white border border-zinc-200 rounded-[6px]">
                                  <div>
                                    <p className="font-['Inter:Medium',sans-serif] font-medium leading-[18px] text-[13px] text-zinc-950">
                                      {group.groupName}
                                    </p>
                                    {group.parentGroup && (
                                      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[16px] text-[12px] text-zinc-500">
                                        Parent: {group.parentGroup}
                                      </p>
                                    )}
                                  </div>
                                  <button type="button" onClick={() => removeGroup(group.id)}>
                                    <X className="w-[14px] h-[14px] text-zinc-500" />
                                  </button>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })}
                </div>
              </div>

            </div>
          )}

          {/* Step 3: Add & Configure Locations */}
          {currentStep === 3 && (
            <div>
              <div className="mb-[24px]">
                <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] text-[16px] text-zinc-950 mb-[8px]">
                  Add & Configure Locations
                </p>
                <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] text-[14px] text-zinc-500">
                  Add all locations with complete configuration including commodities and solar capacity
                </p>
              </div>

              {/* Add Location Form with Expandable Sections */}
              <div className="bg-zinc-50 p-[20px] rounded-[8px] mb-[24px]">
                <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] text-[14px] text-zinc-950 mb-[16px]">
                  Add New Location
                </p>
                
                {/* Basic Information - Always Visible */}
                <div className="mb-[20px]">
                  <div className="flex items-center justify-between mb-[12px]">
                    <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] text-[14px] text-zinc-950">
                      Basic Information *
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-[16px]">
                    <div>
                      <label className="block mb-[8px]">
                        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[18px] text-[13px] text-zinc-700">Location Name *</p>
                      </label>
                      <input
                        type="text"
                        value={tempLocation.locationTag}
                        onChange={(e) => setTempLocation({ ...tempLocation, locationTag: e.target.value })}
                        className="w-full px-[12px] py-[8px] border border-zinc-200 rounded-[6px] bg-white focus:outline-none focus:ring-2 focus:ring-zinc-950"
                        placeholder="Main Office, Branch A, etc."
                      />
                    </div>

                    <div>
                      <label className="block mb-[8px]">
                        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[18px] text-[13px] text-zinc-700">Location State *</p>
                      </label>
                      <select
                        value={tempLocation.locationState}
                        onChange={(e) => setTempLocation({ ...tempLocation, locationState: e.target.value })}
                        className="w-full px-[12px] py-[8px] border border-zinc-200 rounded-[6px] bg-white focus:outline-none focus:ring-2 focus:ring-zinc-950"
                      >
                        <option value="">Select state</option>
                        {nigerianStates.map((state) => (
                          <option key={state} value={state}>{state}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block mb-[8px]">
                        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[18px] text-[13px] text-zinc-700">Location City *</p>
                      </label>
                      <input
                        type="text"
                        value={tempLocation.locationCity}
                        onChange={(e) => setTempLocation({ ...tempLocation, locationCity: e.target.value })}
                        className="w-full px-[12px] py-[8px] border border-zinc-200 rounded-[6px] bg-white focus:outline-none focus:ring-2 focus:ring-zinc-950"
                        placeholder="Ikeja"
                      />
                    </div>

                    <div>
                      <label className="block mb-[8px]">
                        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[18px] text-[13px] text-zinc-700">Country *</p>
                      </label>
                      <input
                        type="text"
                        value={tempLocation.country}
                        onChange={(e) => setTempLocation({ ...tempLocation, country: e.target.value })}
                        className="w-full px-[12px] py-[8px] border border-zinc-200 rounded-[6px] bg-white focus:outline-none focus:ring-2 focus:ring-zinc-950"
                        placeholder="Nigeria"
                      />
                    </div>

                    <div>
                      <label className="block mb-[8px]">
                        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[18px] text-[13px] text-zinc-700">Longitude</p>
                      </label>
                      <input
                        type="text"
                        value={tempLocation.longitude}
                        onChange={(e) => setTempLocation({ ...tempLocation, longitude: e.target.value })}
                        className="w-full px-[12px] py-[8px] border border-zinc-200 rounded-[6px] bg-white focus:outline-none focus:ring-2 focus:ring-zinc-950"
                        placeholder="6.5244"
                      />
                    </div>

                    <div>
                      <label className="block mb-[8px]">
                        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[18px] text-[13px] text-zinc-700">Latitude</p>
                      </label>
                      <input
                        type="text"
                        value={tempLocation.latitude}
                        onChange={(e) => setTempLocation({ ...tempLocation, latitude: e.target.value })}
                        className="w-full px-[12px] py-[8px] border border-zinc-200 rounded-[6px] bg-white focus:outline-none focus:ring-2 focus:ring-zinc-950"
                        placeholder="3.3792"
                      />
                    </div>

                    <div>
                      <label className="block mb-[8px]">
                        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[18px] text-[13px] text-zinc-700">Assign to Group</p>
                        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[16px] text-[12px] text-zinc-500 mt-[4px]">
                          Locations can only be assigned to the lowest level groups
                        </p>
                      </label>
                      <select
                        value={tempLocation.locationGroup}
                        onChange={(e) => {
                          const selectedGroup = onboardingData.groups.find((g: any) => g.groupName === e.target.value);
                          setTempLocation({ 
                            ...tempLocation, 
                            locationGroup: e.target.value,
                            locationGroupLevel: selectedGroup?.locationGroupLevel || '',
                          });
                        }}
                        className="w-full px-[12px] py-[8px] border border-zinc-200 rounded-[6px] bg-white focus:outline-none focus:ring-2 focus:ring-zinc-950"
                      >
                        <option value="">Select group (optional)</option>
                        {(() => {
                          // Only show groups from the last level (level 3)
                          const lastLevel = onboardingData.groupLevels.find((l: any) => parseInt(l.groupLevelNumber) === 3);
                          if (!lastLevel) return null;
                          
                          return onboardingData.groups
                            .filter((group: any) => group.locationGroupLevel === lastLevel.groupLevelName)
                            .map((group: any) => (
                              <option key={group.id} value={group.groupName}>
                                {group.groupName} ({group.locationGroupLevel})
                              </option>
                            ));
                        })()}
                      </select>
                    </div>

                    <div>
                      <label className="block mb-[8px]">
                        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[18px] text-[13px] text-zinc-700">Qualifiers</p>
                      </label>
                      <div className="flex flex-wrap gap-[6px]">
                        {availableQualifiers.map((qualifier) => (
                          <button
                            key={qualifier}
                            type="button"
                            onClick={() => {
                              const qualifiers = (tempLocation.locationQualifiers || []).includes(qualifier)
                                ? (tempLocation.locationQualifiers || []).filter((q: string) => q !== qualifier)
                                : [...(tempLocation.locationQualifiers || []), qualifier];
                              setTempLocation({ ...tempLocation, locationQualifiers: qualifiers });
                            }}
                            className={`px-[10px] py-[4px] rounded-[4px] font-['Inter:Medium',sans-serif] font-medium text-[12px] transition-colors ${
                              (tempLocation.locationQualifiers || []).includes(qualifier)
                                ? 'bg-zinc-950 text-white'
                                : 'bg-white border border-zinc-200 text-zinc-950 hover:border-zinc-300'
                            }`}
                          >
                            {qualifier}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block mb-[8px]">
                        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[18px] text-[13px] text-zinc-700">Location Tags</p>
                        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[16px] text-[12px] text-zinc-500 mt-[4px]">
                          Add tags specific to this location (e.g., Critical, Priority, Backup)
                        </p>
                      </label>
                      <div className="flex gap-[8px] mb-[8px]">
                        <input
                          type="text"
                          value=""
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                              const newTag = e.currentTarget.value.trim();
                              if (!tempLocation.locationTags.includes(newTag)) {
                                setTempLocation({ 
                                  ...tempLocation, 
                                  locationTags: [...(tempLocation.locationTags || []), newTag] 
                                });
                              }
                              e.currentTarget.value = '';
                            }
                          }}
                          className="flex-1 px-[12px] py-[8px] border border-zinc-200 rounded-[6px] bg-white focus:outline-none focus:ring-2 focus:ring-zinc-950"
                          placeholder="Type a tag and press Enter"
                        />
                      </div>
                      {tempLocation.locationTags && tempLocation.locationTags.length > 0 && (
                        <div className="flex flex-wrap gap-[6px]">
                          {tempLocation.locationTags.map((tag, idx) => (
                            <div key={idx} className="flex items-center gap-[6px] px-[8px] py-[4px] bg-amber-100 rounded-[4px]">
                              <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16px] text-[12px] text-amber-700">
                                {tag}
                              </p>
                              <button
                                type="button"
                                onClick={() => {
                                  setTempLocation({
                                    ...tempLocation,
                                    locationTags: tempLocation.locationTags.filter((_, i) => i !== idx)
                                  });
                                }}
                              >
                                <X className="w-[12px] h-[12px] text-amber-700" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Commodities - Expandable */}
                <div className="mb-[20px]">
                  <button
                    type="button"
                    onClick={() => toggleSection('commodities')}
                    className="flex items-center justify-between w-full p-[12px] bg-white border border-zinc-200 rounded-[6px] hover:bg-zinc-50 transition-colors"
                  >
                    <div className="flex items-center gap-[8px]">
                      {expandedSections.commodities ? (
                        <ChevronDown className="w-[16px] h-[16px] text-zinc-500" />
                      ) : (
                        <ChevronRight className="w-[16px] h-[16px] text-zinc-500" />
                      )}
                      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] text-[14px] text-zinc-950">
                        Commodities <span className="text-zinc-500 font-normal">(Optional)</span>
                      </p>
                    </div>
                    {tempLocation.commodities.length > 0 && (
                      <div className="inline-block px-[8px] py-[2px] bg-lime-100 rounded-[4px]">
                        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16px] text-[11px] text-lime-700">
                          {tempLocation.commodities.length} added
                        </p>
                      </div>
                    )}
                  </button>
                  
                  {expandedSections.commodities && (
                    <div className="mt-[12px] p-[16px] bg-white border border-zinc-200 rounded-[6px]">
                      <div className="grid grid-cols-2 gap-[12px] mb-[12px]">
                        <div>
                          <label className="block mb-[8px]">
                            <p className="font-['Inter:Medium',sans-serif] font-medium leading-[18px] text-[13px] text-zinc-700">Commodity Type</p>
                          </label>
                          <select
                            value={tempCommodity.commodityType}
                            onChange={(e) => setTempCommodity({ ...tempCommodity, commodityType: e.target.value })}
                            className="w-full px-[12px] py-[8px] border border-zinc-200 rounded-[6px] bg-white focus:outline-none focus:ring-2 focus:ring-zinc-950"
                          >
                            <option value="">Select type</option>
                            {commodityTypes.map((type) => (
                              <option key={type} value={type}>{type}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="block mb-[8px]">
                            <p className="font-['Inter:Medium',sans-serif] font-medium leading-[18px] text-[13px] text-zinc-700">Price per Unit</p>
                          </label>
                          <input
                            type="text"
                            value={tempCommodity.price}
                            onChange={(e) => setTempCommodity({ ...tempCommodity, price: e.target.value })}
                            className="w-full px-[12px] py-[8px] border border-zinc-200 rounded-[6px] bg-white focus:outline-none focus:ring-2 focus:ring-zinc-950"
                            placeholder="0.00"
                          />
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={addCommodityToLocation}
                        className="bg-zinc-950 flex gap-[8px] items-center justify-center px-[12px] py-[6px] rounded-[6px]"
                      >
                        <Plus className="w-[14px] h-[14px] text-white" />
                        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[18px] text-[13px] text-white">Add Commodity</p>
                      </button>
                      
                      {tempLocation.commodities.length > 0 && (
                        <div className="mt-[12px] space-y-[6px]">
                          {tempLocation.commodities.map((commodity: any) => (
                            <div key={commodity.id} className="flex items-center justify-between p-[8px] bg-zinc-50 rounded-[4px]">
                              <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18px] text-[13px] text-zinc-950">
                                {commodity.commodityType} - ₦{commodity.price}
                              </p>
                              <button type="button" onClick={() => removeCommodityFromLocation(commodity.id)}>
                                <X className="w-[14px] h-[14px] text-zinc-500" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Solar Capacity - Expandable */}
                <div className="mb-[20px]">
                  <button
                    type="button"
                    onClick={() => toggleSection('solar')}
                    className="flex items-center justify-between w-full p-[12px] bg-white border border-zinc-200 rounded-[6px] hover:bg-zinc-50 transition-colors"
                  >
                    <div className="flex items-center gap-[8px]">
                      {expandedSections.solar ? (
                        <ChevronDown className="w-[16px] h-[16px] text-zinc-500" />
                      ) : (
                        <ChevronRight className="w-[16px] h-[16px] text-zinc-500" />
                      )}
                      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] text-[14px] text-zinc-950">
                        Solar Capacity <span className="text-zinc-500 font-normal">(Optional)</span>
                      </p>
                    </div>
                    {tempLocation.solarCapacity && (
                      <div className="inline-block px-[8px] py-[2px] bg-lime-100 rounded-[4px]">
                        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16px] text-[11px] text-lime-700">
                          {tempLocation.solarCapacity} KW
                        </p>
                      </div>
                    )}
                  </button>
                  
                  {expandedSections.solar && (
                    <div className="mt-[12px] p-[16px] bg-white border border-zinc-200 rounded-[6px]">
                      <div>
                        <label className="block mb-[8px]">
                          <p className="font-['Inter:Medium',sans-serif] font-medium leading-[18px] text-[13px] text-zinc-700">Solar Capacity (KW)</p>
                        </label>
                        <input
                          type="text"
                          value={tempLocation.solarCapacity}
                          onChange={(e) => setTempLocation({ ...tempLocation, solarCapacity: e.target.value })}
                          className="w-full px-[12px] py-[8px] border border-zinc-200 rounded-[6px] bg-white focus:outline-none focus:ring-2 focus:ring-zinc-950"
                          placeholder="Enter capacity in KW"
                        />
                      </div>
                    </div>
                  )}
                </div>

                <button
                  type="button"
                  onClick={addLocation}
                  className="mt-[16px] bg-zinc-950 flex gap-[8px] items-center justify-center px-[16px] py-[8px] rounded-[6px]"
                >
                  <Plus className="w-[16px] h-[16px] text-white" />
                  <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] text-[14px] text-white">Add Location</p>
                </button>
              </div>

              {/* Locations List */}
              {onboardingData.locations.length > 0 && (
                <div>
                  <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] text-[14px] text-zinc-950 mb-[12px]">
                    Added Locations ({onboardingData.locations.length})
                  </p>
                  <div className="space-y-[8px]">
                    {onboardingData.locations.map((location: any) => (
                      <div key={location.id} className="flex items-start justify-between p-[12px] bg-white border border-zinc-200 rounded-[6px]">
                        <div className="flex-1">
                          <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] text-[14px] text-zinc-950">
                            {location.locationTag || 'Unnamed Location'}
                          </p>
                          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] text-[14px] text-zinc-500">
                            {location.locationCity}, {location.locationState}, {location.country}
                          </p>
                          {location.locationGroup && (
                            <div className="mt-[6px]">
                              <span className="inline-block px-[8px] py-[2px] bg-lime-100 rounded-[4px]">
                                <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16px] text-[11px] text-lime-700">
                                  {location.locationGroup}
                                </p>
                              </span>
                            </div>
                          )}
                          {(location.commodities.length > 0 || location.solarCapacity) && (
                            <div className="mt-[6px] flex gap-[6px] flex-wrap">
                              {location.commodities.length > 0 && (
                                <span className="inline-block px-[8px] py-[2px] bg-zinc-100 rounded-[4px]">
                                  <p className="font-['Inter:Regular',sans-serif] font-normal leading-[16px] text-[11px] text-zinc-600">
                                    {location.commodities.length} commodity{location.commodities.length > 1 ? 'ies' : ''}
                                  </p>
                                </span>
                              )}
                              {location.solarCapacity && (
                                <span className="inline-block px-[8px] py-[2px] bg-zinc-100 rounded-[4px]">
                                  <p className="font-['Inter:Regular',sans-serif] font-normal leading-[16px] text-[11px] text-zinc-600">
                                    Solar: {location.solarCapacity} KW
                                  </p>
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                        <button type="button" onClick={() => removeLocation(location.id)}>
                          <X className="w-[16px] h-[16px] text-zinc-500" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Step 4: Create Sensors */}
          {currentStep === 4 && (
            <div>
              <div className="mb-[24px]">
                <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] text-[16px] text-zinc-950 mb-[8px]">
                  Sensor Configuration
                </p>
                <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] text-[14px] text-zinc-500">
                  Add sensors, meters, and channels for each location
                </p>
              </div>

              {/* Add Sensor Form */}
              <div className="bg-zinc-50 p-[20px] rounded-[8px] mb-[24px]">
                <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] text-[14px] text-zinc-950 mb-[16px]">
                  Add Sensor
                </p>
                <div className="space-y-[12px]">
                  <div>
                    <label className="block mb-[8px]">
                      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] text-[14px] text-zinc-950">Select Location *</p>
                    </label>
                    <select
                      value={tempSensor.location}
                      onChange={(e) => setTempSensor({ ...tempSensor, location: e.target.value })}
                      className="w-full px-[12px] py-[8px] border border-zinc-200 rounded-[6px] bg-white focus:outline-none focus:ring-2 focus:ring-zinc-950"
                    >
                      <option value="">Select location</option>
                      {onboardingData.locations.map((location: any) => (
                        <option key={location.id} value={location.locationTag}>
                          {location.locationTag || 'Unnamed Location'} ({location.locationCity})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-[12px]">
                    <div>
                      <label className="block mb-[8px]">
                        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] text-[14px] text-zinc-950">Sensor ID *</p>
                      </label>
                      <input
                        type="text"
                        value={tempSensor.sensorId}
                        onChange={(e) => setTempSensor({ ...tempSensor, sensorId: e.target.value })}
                        className="w-full px-[12px] py-[8px] border border-zinc-200 rounded-[6px] bg-white focus:outline-none focus:ring-2 focus:ring-zinc-950"
                        placeholder="SN-001"
                      />
                    </div>
                    <div>
                      <label className="block mb-[8px]">
                        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] text-[14px] text-zinc-950">Installation Date</p>
                      </label>
                      <input
                        type="date"
                        value={tempSensor.installationDate}
                        onChange={(e) => setTempSensor({ ...tempSensor, installationDate: e.target.value })}
                        className="w-full px-[12px] py-[8px] border border-zinc-200 rounded-[6px] bg-white focus:outline-none focus:ring-2 focus:ring-zinc-950"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block mb-[8px]">
                      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] text-[14px] text-zinc-950">Firmware Version</p>
                    </label>
                    <input
                      type="text"
                      value={tempSensor.firmwareVersion}
                      onChange={(e) => setTempSensor({ ...tempSensor, firmwareVersion: e.target.value })}
                      className="w-full px-[12px] py-[8px] border border-zinc-200 rounded-[6px] bg-white focus:outline-none focus:ring-2 focus:ring-zinc-950"
                      placeholder="v1.0.0"
                    />
                  </div>

                  {/* Meters for this sensor */}
                  <div className="border-t border-zinc-200 pt-[16px] mt-[16px]">
                    <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] text-[14px] text-zinc-950 mb-[12px]">
                      Meters ({tempSensor.meters.length})
                    </p>
                    
                    <div className="bg-white p-[12px] rounded-[6px] mb-[12px]">
                      <div className="grid grid-cols-2 gap-[12px] mb-[12px]">
                        <div>
                          <label className="block mb-[8px]">
                            <p className="font-['Inter:Medium',sans-serif] font-medium leading-[18px] text-[13px] text-zinc-700">Meter ID</p>
                          </label>
                          <input
                            type="text"
                            value={tempMeter.meterId}
                            onChange={(e) => setTempMeter({ ...tempMeter, meterId: e.target.value })}
                            className="w-full px-[12px] py-[8px] border border-zinc-200 rounded-[6px] bg-white focus:outline-none focus:ring-2 focus:ring-zinc-950"
                            placeholder="M-001"
                          />
                        </div>
                        <div>
                          <label className="block mb-[8px]">
                            <p className="font-['Inter:Medium',sans-serif] font-medium leading-[18px] text-[13px] text-zinc-700">Meter Type</p>
                          </label>
                          <input
                            type="text"
                            value={tempMeter.meterType}
                            onChange={(e) => setTempMeter({ ...tempMeter, meterType: e.target.value })}
                            className="w-full px-[12px] py-[8px] border border-zinc-200 rounded-[6px] bg-white focus:outline-none focus:ring-2 focus:ring-zinc-950"
                            placeholder="Type A"
                          />
                        </div>
                      </div>

                      {/* Channels for this meter */}
                      <div className="mb-[12px]">
                        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[18px] text-[13px] text-zinc-950 mb-[8px]">
                          Channels ({tempMeter.channels.length})
                        </p>
                        <div className="flex gap-[8px]">
                          <input
                            type="text"
                            value={tempChannelName}
                            onChange={(e) => setTempChannelName(e.target.value)}
                            className="flex-1 px-[12px] py-[6px] border border-zinc-200 rounded-[6px] bg-white focus:outline-none focus:ring-2 focus:ring-zinc-950"
                            placeholder="Channel name"
                          />
                          <button
                            type="button"
                            onClick={addChannelToMeter}
                            className="bg-zinc-950 px-[12px] py-[6px] rounded-[6px]"
                          >
                            <Plus className="w-[14px] h-[14px] text-white" />
                          </button>
                        </div>
                        {tempMeter.channels.length > 0 && (
                          <div className="mt-[8px] flex flex-wrap gap-[6px]">
                            {tempMeter.channels.map((channel: any) => (
                              <div key={channel.id} className="flex items-center gap-[6px] px-[8px] py-[4px] bg-zinc-100 rounded-[4px]">
                                <p className="font-['Inter:Regular',sans-serif] font-normal leading-[16px] text-[12px] text-zinc-950">
                                  {channel.channelName}
                                </p>
                                <button type="button" onClick={() => removeChannelFromMeter(channel.id)}>
                                  <X className="w-[12px] h-[12px] text-zinc-500" />
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      <button
                        type="button"
                        onClick={addMeterToSensor}
                        className="bg-zinc-950 flex gap-[6px] items-center justify-center px-[12px] py-[6px] rounded-[6px]"
                      >
                        <Plus className="w-[14px] h-[14px] text-white" />
                        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[18px] text-[13px] text-white">Add Meter</p>
                      </button>
                    </div>

                    {tempSensor.meters.length > 0 && (
                      <div className="space-y-[6px]">
                        {tempSensor.meters.map((meter: any) => (
                          <div key={meter.id} className="flex items-center justify-between p-[8px] bg-white rounded-[4px] border border-zinc-200">
                            <div>
                              <p className="font-['Inter:Medium',sans-serif] font-medium leading-[18px] text-[13px] text-zinc-950">
                                {meter.meterId} ({meter.meterType})
                              </p>
                              <p className="font-['Inter:Regular',sans-serif] font-normal leading-[16px] text-[12px] text-zinc-500">
                                {meter.channels.length} channel{meter.channels.length !== 1 ? 's' : ''}
                              </p>
                            </div>
                            <button type="button" onClick={() => removeMeterFromSensor(meter.id)}>
                              <X className="w-[14px] h-[14px] text-zinc-500" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={addSensor}
                    className="w-full bg-zinc-950 flex gap-[8px] items-center justify-center px-[16px] py-[8px] rounded-[6px]"
                  >
                    <Plus className="w-[16px] h-[16px] text-white" />
                    <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] text-[14px] text-white">Add Sensor</p>
                  </button>
                </div>
              </div>

              {/* Sensors List */}
              {onboardingData.sensors.length > 0 && (
                <div>
                  <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] text-[14px] text-zinc-950 mb-[12px]">
                    Added Sensors ({onboardingData.sensors.length})
                  </p>
                  <div className="space-y-[8px]">
                    {onboardingData.sensors.map((sensor: any) => (
                      <div key={sensor.id} className="flex items-start justify-between p-[12px] bg-white border border-zinc-200 rounded-[6px]">
                        <div>
                          <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] text-[14px] text-zinc-950">
                            {sensor.sensorId} @ {sensor.location}
                          </p>
                          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] text-[14px] text-zinc-500">
                            {sensor.meters.length} meter{sensor.meters.length !== 1 ? 's' : ''} • {sensor.firmwareVersion}
                          </p>
                        </div>
                        <button type="button" onClick={() => removeSensor(sensor.id)}>
                          <X className="w-[16px] h-[16px] text-zinc-500" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Step 5: Configure Power Sources */}
          {currentStep === 5 && (
            <div>
              <div className="mb-[24px]">
                <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] text-[16px] text-zinc-950 mb-[8px]">
                  Configure Power Sources
                </p>
                <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] text-[14px] text-zinc-500">
                  Add and configure power sources like generators, solar panels, batteries, inverters, and grid connections
                </p>
              </div>

              {/* Add Source Form */}
              <div className="bg-zinc-50 p-[20px] rounded-[8px] mb-[24px]">
                <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] text-[14px] text-zinc-950 mb-[16px]">
                  Add Power Source
                </p>
                
                <div className="space-y-[12px]">
                  {/* Source Type Selector */}
                  <div>
                    <label className="block mb-[8px]">
                      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] text-[14px] text-zinc-950">Source Type *</p>
                    </label>
                    <select
                      value={tempSource.sourceType}
                      onChange={(e) => setTempSource({ ...tempSource, sourceType: e.target.value as any })}
                      className="w-full px-[12px] py-[8px] border border-zinc-200 rounded-[6px] bg-white focus:outline-none focus:ring-2 focus:ring-zinc-950"
                    >
                      <option value="generator">Generator</option>
                      <option value="solar">Solar</option>
                      <option value="battery">Battery</option>
                      <option value="inverter">Inverter</option>
                      <option value="grid">Grid</option>
                    </select>
                  </div>

                  {/* Common fields for all sources */}
                  <div className="grid grid-cols-3 gap-[12px]">
                    <div>
                      <label className="block mb-[8px]">
                        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] text-[14px] text-zinc-950">Select Sensor *</p>
                      </label>
                      <select
                        value={tempSource.sensor}
                        onChange={(e) => setTempSource({ ...tempSource, sensor: e.target.value })}
                        className="w-full px-[12px] py-[8px] border border-zinc-200 rounded-[6px] bg-white focus:outline-none focus:ring-2 focus:ring-zinc-950"
                      >
                        <option value="">Select sensor</option>
                        {onboardingData.sensors.map((sensor: any) => (
                          <option key={sensor.id} value={sensor.sensorId}>
                            {sensor.sensorId}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block mb-[8px]">
                        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] text-[14px] text-zinc-950">Select Meter *</p>
                      </label>
                      <select
                        value={tempSource.meter}
                        onChange={(e) => setTempSource({ ...tempSource, meter: e.target.value })}
                        className="w-full px-[12px] py-[8px] border border-zinc-200 rounded-[6px] bg-white focus:outline-none focus:ring-2 focus:ring-zinc-950"
                      >
                        <option value="">Select meter</option>
                        {tempSource.sensor && onboardingData.sensors
                          .find((s: any) => s.sensorId === tempSource.sensor)
                          ?.meters.map((meter: any) => (
                            <option key={meter.id} value={meter.meterId}>
                              {meter.meterId}
                            </option>
                          ))}
                      </select>
                    </div>
                    <div>
                      <label className="block mb-[8px]">
                        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] text-[14px] text-zinc-950">Select Channel *</p>
                      </label>
                      <select
                        value={tempSource.channel}
                        onChange={(e) => setTempSource({ ...tempSource, channel: e.target.value })}
                        className="w-full px-[12px] py-[8px] border border-zinc-200 rounded-[6px] bg-white focus:outline-none focus:ring-2 focus:ring-zinc-950"
                      >
                        <option value="">Select channel</option>
                        {tempSource.sensor && tempSource.meter && onboardingData.sensors
                          .find((s: any) => s.sensorId === tempSource.sensor)
                          ?.meters.find((m: any) => m.meterId === tempSource.meter)
                          ?.channels.map((channel: any) => (
                            <option key={channel.id} value={channel.channelName}>
                              {channel.channelName}
                            </option>
                          ))}
                      </select>
                    </div>
                  </div>

                  {/* Generator specific fields */}
                  {tempSource.sourceType === 'generator' && (
                    <div className="border-t border-zinc-200 pt-[12px] mt-[12px]">
                      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] text-[14px] text-zinc-950 mb-[12px]">
                        Generator Configuration
                      </p>
                      <div className="grid grid-cols-2 gap-[12px]">
                        <div>
                          <label className="block mb-[8px]">
                            <p className="font-['Inter:Medium',sans-serif] font-medium leading-[18px] text-[13px] text-zinc-700">Capacity (KW)</p>
                          </label>
                          <input
                            type="text"
                            value={tempSource.capacity}
                            onChange={(e) => setTempSource({ ...tempSource, capacity: e.target.value })}
                            className="w-full px-[12px] py-[8px] border border-zinc-200 rounded-[6px] bg-white focus:outline-none focus:ring-2 focus:ring-zinc-950"
                            placeholder="100"
                          />
                        </div>
                        <div>
                          <label className="block mb-[8px]">
                            <p className="font-['Inter:Medium',sans-serif] font-medium leading-[18px] text-[13px] text-zinc-700">Tank Volume (L)</p>
                          </label>
                          <input
                            type="text"
                            value={tempSource.tankVolume}
                            onChange={(e) => setTempSource({ ...tempSource, tankVolume: e.target.value })}
                            className="w-full px-[12px] py-[8px] border border-zinc-200 rounded-[6px] bg-white focus:outline-none focus:ring-2 focus:ring-zinc-950"
                            placeholder="500"
                          />
                        </div>
                        <div>
                          <label className="block mb-[8px]">
                            <p className="font-['Inter:Medium',sans-serif] font-medium leading-[18px] text-[13px] text-zinc-700">Coefficient A</p>
                          </label>
                          <input
                            type="text"
                            value={tempSource.coefficientA}
                            onChange={(e) => setTempSource({ ...tempSource, coefficientA: e.target.value })}
                            className="w-full px-[12px] py-[8px] border border-zinc-200 rounded-[6px] bg-white focus:outline-none focus:ring-2 focus:ring-zinc-950"
                            placeholder="0.5"
                          />
                        </div>
                        <div>
                          <label className="block mb-[8px]">
                            <p className="font-['Inter:Medium',sans-serif] font-medium leading-[18px] text-[13px] text-zinc-700">Coefficient B</p>
                          </label>
                          <input
                            type="text"
                            value={tempSource.coefficientB}
                            onChange={(e) => setTempSource({ ...tempSource, coefficientB: e.target.value })}
                            className="w-full px-[12px] py-[8px] border border-zinc-200 rounded-[6px] bg-white focus:outline-none focus:ring-2 focus:ring-zinc-950"
                            placeholder="0.3"
                          />
                        </div>
                        <div className="col-span-2">
                          <label className="block mb-[8px]">
                            <p className="font-['Inter:Medium',sans-serif] font-medium leading-[18px] text-[13px] text-zinc-700">Fuel Type</p>
                          </label>
                          <select
                            value={tempSource.fuelType}
                            onChange={(e) => setTempSource({ ...tempSource, fuelType: e.target.value })}
                            className="w-full px-[12px] py-[8px] border border-zinc-200 rounded-[6px] bg-white focus:outline-none focus:ring-2 focus:ring-zinc-950"
                          >
                            <option value="">Select fuel type</option>
                            {fuelTypes.map((type) => (
                              <option key={type} value={type}>{type}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Solar specific fields */}
                  {tempSource.sourceType === 'solar' && (
                    <div className="border-t border-zinc-200 pt-[12px] mt-[12px]">
                      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] text-[14px] text-zinc-950 mb-[12px]">
                        Solar Configuration
                      </p>
                      <div className="grid grid-cols-2 gap-[12px]">
                        <div>
                          <label className="block mb-[8px]">
                            <p className="font-['Inter:Medium',sans-serif] font-medium leading-[18px] text-[13px] text-zinc-700">Capacity (KW)</p>
                          </label>
                          <input
                            type="text"
                            value={tempSource.capacity}
                            onChange={(e) => setTempSource({ ...tempSource, capacity: e.target.value })}
                            className="w-full px-[12px] py-[8px] border border-zinc-200 rounded-[6px] bg-white focus:outline-none focus:ring-2 focus:ring-zinc-950"
                            placeholder="50"
                          />
                        </div>
                        <div>
                          <label className="block mb-[8px]">
                            <p className="font-['Inter:Medium',sans-serif] font-medium leading-[18px] text-[13px] text-zinc-700">Unit Cost</p>
                          </label>
                          <input
                            type="text"
                            value={tempSource.unitCost}
                            onChange={(e) => setTempSource({ ...tempSource, unitCost: e.target.value })}
                            className="w-full px-[12px] py-[8px] border border-zinc-200 rounded-[6px] bg-white focus:outline-none focus:ring-2 focus:ring-zinc-950"
                            placeholder="0.15"
                          />
                        </div>
                        <div>
                          <label className="block mb-[8px]">
                            <p className="font-['Inter:Medium',sans-serif] font-medium leading-[18px] text-[13px] text-zinc-700">Azimuth (degrees)</p>
                          </label>
                          <input
                            type="text"
                            value={tempSource.azimuth}
                            onChange={(e) => setTempSource({ ...tempSource, azimuth: e.target.value })}
                            className="w-full px-[12px] py-[8px] border border-zinc-200 rounded-[6px] bg-white focus:outline-none focus:ring-2 focus:ring-zinc-950"
                            placeholder="180"
                          />
                        </div>
                        <div>
                          <label className="block mb-[8px]">
                            <p className="font-['Inter:Medium',sans-serif] font-medium leading-[18px] text-[13px] text-zinc-700">Tilt (degrees)</p>
                          </label>
                          <input
                            type="text"
                            value={tempSource.tilt}
                            onChange={(e) => setTempSource({ ...tempSource, tilt: e.target.value })}
                            className="w-full px-[12px] py-[8px] border border-zinc-200 rounded-[6px] bg-white focus:outline-none focus:ring-2 focus:ring-zinc-950"
                            placeholder="30"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Inverter specific fields */}
                  {tempSource.sourceType === 'inverter' && (
                    <div className="border-t border-zinc-200 pt-[12px] mt-[12px]">
                      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] text-[14px] text-zinc-950 mb-[12px]">
                        Inverter Configuration
                      </p>
                      <div className="grid grid-cols-2 gap-[12px]">
                        <div>
                          <label className="block mb-[8px]">
                            <p className="font-['Inter:Medium',sans-serif] font-medium leading-[18px] text-[13px] text-zinc-700">Asset Name</p>
                          </label>
                          <input
                            type="text"
                            value={tempSource.assetName}
                            onChange={(e) => setTempSource({ ...tempSource, assetName: e.target.value })}
                            className="w-full px-[12px] py-[8px] border border-zinc-200 rounded-[6px] bg-white focus:outline-none focus:ring-2 focus:ring-zinc-950"
                            placeholder="Inverter A"
                          />
                        </div>
                        <div>
                          <label className="block mb-[8px]">
                            <p className="font-['Inter:Medium',sans-serif] font-medium leading-[18px] text-[13px] text-zinc-700">Asset ID</p>
                          </label>
                          <input
                            type="text"
                            value={tempSource.assetId}
                            onChange={(e) => setTempSource({ ...tempSource, assetId: e.target.value })}
                            className="w-full px-[12px] py-[8px] border border-zinc-200 rounded-[6px] bg-white focus:outline-none focus:ring-2 focus:ring-zinc-950"
                            placeholder="INV-001"
                          />
                        </div>
                        <div className="col-span-2">
                          <label className="block mb-[8px]">
                            <p className="font-['Inter:Medium',sans-serif] font-medium leading-[18px] text-[13px] text-zinc-700">Rating (KVA)</p>
                          </label>
                          <input
                            type="text"
                            value={tempSource.rating}
                            onChange={(e) => setTempSource({ ...tempSource, rating: e.target.value })}
                            className="w-full px-[12px] py-[8px] border border-zinc-200 rounded-[6px] bg-white focus:outline-none focus:ring-2 focus:ring-zinc-950"
                            placeholder="5"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Battery/Grid - Basic capacity only */}
                  {(tempSource.sourceType === 'battery' || tempSource.sourceType === 'grid') && (
                    <div className="border-t border-zinc-200 pt-[12px] mt-[12px]">
                      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] text-[14px] text-zinc-950 mb-[12px]">
                        {tempSource.sourceType === 'battery' ? 'Battery' : 'Grid'} Configuration
                      </p>
                      <div>
                        <label className="block mb-[8px]">
                          <p className="font-['Inter:Medium',sans-serif] font-medium leading-[18px] text-[13px] text-zinc-700">Capacity (KW)</p>
                        </label>
                        <input
                          type="text"
                          value={tempSource.capacity}
                          onChange={(e) => setTempSource({ ...tempSource, capacity: e.target.value })}
                          className="w-full px-[12px] py-[8px] border border-zinc-200 rounded-[6px] bg-white focus:outline-none focus:ring-2 focus:ring-zinc-950"
                          placeholder="100"
                        />
                      </div>
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={addSource}
                    className="w-full bg-zinc-950 flex gap-[8px] items-center justify-center px-[16px] py-[8px] rounded-[6px] mt-[16px]"
                  >
                    <Plus className="w-[16px] h-[16px] text-white" />
                    <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] text-[14px] text-white">Add Source</p>
                  </button>
                </div>
              </div>

              {/* Sources List */}
              {onboardingData.sources.length > 0 && (
                <div>
                  <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] text-[14px] text-zinc-950 mb-[12px]">
                    Added Power Sources ({onboardingData.sources.length})
                  </p>
                  <div className="space-y-[8px]">
                    {onboardingData.sources.map((source: any) => (
                      <div key={source.id} className="flex items-start justify-between p-[12px] bg-white border border-zinc-200 rounded-[6px]">
                        <div>
                          <div className="flex items-center gap-[8px] mb-[4px]">
                            <div className={`inline-block px-[8px] py-[2px] rounded-[4px] ${
                              source.sourceType === 'generator' ? 'bg-orange-100' :
                              source.sourceType === 'solar' ? 'bg-yellow-100' :
                              source.sourceType === 'battery' ? 'bg-blue-100' :
                              source.sourceType === 'inverter' ? 'bg-purple-100' :
                              'bg-green-100'
                            }`}>
                              <p className={`font-['Inter:Medium',sans-serif] font-medium leading-[16px] text-[11px] ${
                                source.sourceType === 'generator' ? 'text-orange-700' :
                                source.sourceType === 'solar' ? 'text-yellow-700' :
                                source.sourceType === 'battery' ? 'text-blue-700' :
                                source.sourceType === 'inverter' ? 'text-purple-700' :
                                'text-green-700'
                              }`}>
                                {source.sourceType.charAt(0).toUpperCase() + source.sourceType.slice(1)}
                              </p>
                            </div>
                            <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] text-[14px] text-zinc-950">
                              {source.sensor} / {source.meter}
                            </p>
                          </div>
                          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] text-[14px] text-zinc-500">
                            Channel: {source.channel} • {source.capacity && `${source.capacity} KW`}
                          </p>
                        </div>
                        <button type="button" onClick={() => removeSource(source.id)}>
                          <X className="w-[16px] h-[16px] text-zinc-500" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Step 6: Review & Create Admin */}
          {currentStep === 6 && (
            <div>
              <div className="mb-[24px]">
                <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] text-[16px] text-zinc-950 mb-[8px]">
                  Review Configuration & Create Admin
                </p>
                <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] text-[14px] text-zinc-500">
                  Review your configuration and create a super admin to manage this enterprise
                </p>
              </div>

              <div className="grid grid-cols-2 gap-[24px]">
                {/* Left: Review Summary */}
                <div className="space-y-[16px]">
                  <div className="bg-white border border-zinc-200 rounded-[8px] p-[16px]">
                    <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] text-[14px] text-zinc-950 mb-[12px]">
                      Configuration Summary
                    </p>
                    
                    <div className="space-y-[12px]">
                      <div className="flex justify-between py-[8px] border-b border-zinc-100">
                        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] text-[14px] text-zinc-500">Enterprise</p>
                        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] text-[14px] text-zinc-950">
                          {onboardingData.enterpriseName}
                        </p>
                      </div>
                      <div className="flex justify-between py-[8px] border-b border-zinc-100">
                        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] text-[14px] text-zinc-500">Group Levels</p>
                        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] text-[14px] text-zinc-950">
                          {onboardingData.groupLevels.length}
                        </p>
                      </div>
                      <div className="flex justify-between py-[8px] border-b border-zinc-100">
                        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] text-[14px] text-zinc-500">Groups</p>
                        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] text-[14px] text-zinc-950">
                          {onboardingData.groups.length}
                        </p>
                      </div>
                      <div className="flex justify-between py-[8px] border-b border-zinc-100">
                        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] text-[14px] text-zinc-500">Locations</p>
                        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] text-[14px] text-zinc-950">
                          {onboardingData.locations.length}
                        </p>
                      </div>
                      <div className="flex justify-between py-[8px] border-b border-zinc-100">
                        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] text-[14px] text-zinc-500">Sensors</p>
                        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] text-[14px] text-zinc-950">
                          {onboardingData.sensors.length}
                        </p>
                      </div>
                      <div className="flex justify-between py-[8px]">
                        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] text-[14px] text-zinc-500">Power Sources</p>
                        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] text-[14px] text-zinc-950">
                          {onboardingData.sources.length}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Detailed breakdown */}
                  {onboardingData.locations.length > 0 && (
                    <div className="bg-white border border-zinc-200 rounded-[8px] p-[16px]">
                      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] text-[14px] text-zinc-950 mb-[12px]">
                        Locations Overview
                      </p>
                      <div className="space-y-[6px] max-h-[200px] overflow-y-auto">
                        {onboardingData.locations.map((location: any) => (
                          <div key={location.id} className="p-[8px] bg-zinc-50 rounded-[4px]">
                            <p className="font-['Inter:Medium',sans-serif] font-medium leading-[18px] text-[13px] text-zinc-950">
                              {location.locationTag}
                            </p>
                            <p className="font-['Inter:Regular',sans-serif] font-normal leading-[16px] text-[12px] text-zinc-500">
                              {location.locationCity}, {location.locationState}
                              {location.locationGroup && ` • ${location.locationGroup}`}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Right: Create Super Admin */}
                <div>
                  <div className="bg-zinc-50 p-[20px] rounded-[8px]">
                    <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] text-[14px] text-zinc-950 mb-[16px]">
                      Create Super Admin
                    </p>
                    <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18px] text-[13px] text-zinc-500 mb-[16px]">
                      Create an admin account to manage this enterprise
                    </p>
                    
                    <div className="space-y-[12px]">
                      <div>
                        <label className="block mb-[8px]">
                          <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] text-[14px] text-zinc-950">Email Address *</p>
                        </label>
                        <input
                          type="email"
                          value={onboardingData.superAdmin.email}
                          onChange={(e) => setOnboardingData({ 
                            ...onboardingData, 
                            superAdmin: { ...onboardingData.superAdmin, email: e.target.value }
                          })}
                          className="w-full px-[12px] py-[8px] border border-zinc-200 rounded-[6px] bg-white focus:outline-none focus:ring-2 focus:ring-zinc-950"
                          placeholder="admin@company.com"
                        />
                      </div>
                      <div>
                        <label className="block mb-[8px]">
                          <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] text-[14px] text-zinc-950">First Name *</p>
                        </label>
                        <input
                          type="text"
                          value={onboardingData.superAdmin.firstName}
                          onChange={(e) => setOnboardingData({ 
                            ...onboardingData, 
                            superAdmin: { ...onboardingData.superAdmin, firstName: e.target.value }
                          })}
                          className="w-full px-[12px] py-[8px] border border-zinc-200 rounded-[6px] bg-white focus:outline-none focus:ring-2 focus:ring-zinc-950"
                          placeholder="John"
                        />
                      </div>
                      <div>
                        <label className="block mb-[8px]">
                          <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] text-[14px] text-zinc-950">Last Name *</p>
                        </label>
                        <input
                          type="text"
                          value={onboardingData.superAdmin.lastName}
                          onChange={(e) => setOnboardingData({ 
                            ...onboardingData, 
                            superAdmin: { ...onboardingData.superAdmin, lastName: e.target.value }
                          })}
                          className="w-full px-[12px] py-[8px] border border-zinc-200 rounded-[6px] bg-white focus:outline-none focus:ring-2 focus:ring-zinc-950"
                          placeholder="Doe"
                        />
                      </div>
                      <div>
                        <label className="block mb-[8px]">
                          <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] text-[14px] text-zinc-950">Enterprise</p>
                        </label>
                        <input
                          type="text"
                          value={onboardingData.enterpriseName}
                          className="w-full px-[12px] py-[8px] border border-zinc-200 rounded-[6px] bg-zinc-100 focus:outline-none"
                          readOnly
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mt-[16px] p-[16px] bg-lime-50 border border-lime-200 rounded-[8px]">
                    <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] text-[14px] text-lime-900 mb-[8px]">
                      Ready to Complete
                    </p>
                    <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18px] text-[13px] text-lime-700">
                      You're all set! Click "Complete Onboarding" to finish the setup and create the admin account.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-zinc-200 z-20">
        <div className="box-border content-stretch flex items-center justify-between px-[72px] py-[16px] relative w-full">
          <button
            onClick={onSaveAndExit}
            className="box-border content-stretch cursor-pointer flex gap-[10px] items-center justify-center px-[16px] py-[6px] relative rounded-[6px] shrink-0 hover:bg-zinc-50 transition-colors"
          >
            <p className="font-['Inter:Medium',sans-serif] font-medium leading-[24px] not-italic relative shrink-0 text-[14px] text-nowrap text-zinc-950 whitespace-pre">Save & Exit</p>
          </button>
          <div className="flex gap-[8px]">
            <button
              onClick={handlePrev}
              disabled={currentStep === 1}
              className={`box-border content-stretch flex gap-[8px] items-center justify-center px-[16px] py-[6px] relative rounded-[6px] shrink-0 ${
                currentStep === 1 ? 'bg-zinc-100 cursor-not-allowed' : 'bg-zinc-100 hover:bg-zinc-200'
              }`}
            >
              <div aria-hidden="true" className="absolute border border-solid border-zinc-200 inset-0 pointer-events-none rounded-[6px]" />
              <ArrowLeft className={`w-[16px] h-[16px] ${currentStep === 1 ? 'text-zinc-400' : 'text-zinc-950'}`} />
              <p className={`font-['Inter:Medium',sans-serif] font-medium leading-[24px] not-italic relative shrink-0 text-[14px] text-nowrap whitespace-pre ${
                currentStep === 1 ? 'text-zinc-400' : 'text-zinc-950'
              }`}>Previous</p>
            </button>
            {currentStep < 6 ? (
              <button
                onClick={handleNext}
                className="bg-zinc-950 flex gap-[8px] items-center justify-center px-[16px] py-[6px] rounded-[6px] hover:opacity-90 transition-opacity"
              >
                <p className="font-['Inter:Medium',sans-serif] font-medium leading-[24px] not-italic text-[14px] text-neutral-50 text-nowrap whitespace-pre">Next</p>
                <ArrowRight className="w-[16px] h-[16px] text-neutral-50" />
              </button>
            ) : (
              <button
                onClick={onSaveAndExit}
                className="bg-lime-600 flex gap-[8px] items-center justify-center px-[16px] py-[6px] rounded-[6px] hover:opacity-90 transition-opacity"
              >
                <Check className="w-[16px] h-[16px] text-white" />
                <p className="font-['Inter:Medium',sans-serif] font-medium leading-[24px] text-[14px] text-white text-nowrap whitespace-pre">Complete Onboarding</p>
              </button>
            )}
          </div>
        </div>
      </div>
      </div>
      
      {/* Preview Sidebar */}
      <OnboardingPreview onboardingData={onboardingData} currentStep={currentStep} />
    </div>
  );
}
