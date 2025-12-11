import { Building2, MapPin, Tag, Layers, Zap, Battery, ChevronRight, ChevronDown } from 'lucide-react';
import { useState } from 'react';

type OnboardingPreviewProps = {
  onboardingData: any;
  currentStep: number;
};

export function OnboardingPreview({ onboardingData, currentStep }: OnboardingPreviewProps) {
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set());

  const toggleGroup = (groupId: string) => {
    const newExpanded = new Set(expandedGroups);
    if (newExpanded.has(groupId)) {
      newExpanded.delete(groupId);
    } else {
      newExpanded.add(groupId);
    }
    setExpandedGroups(newExpanded);
  };

  const getChildGroups = (parentName: string) => {
    return onboardingData.groups.filter((g: any) => g.parentGroup === parentName);
  };

  const renderGroupTree = (group: any, level: number = 0) => {
    const childGroups = getChildGroups(group.groupName);
    const hasChildren = childGroups.length > 0;
    const isExpanded = expandedGroups.has(group.id);

    return (
      <div key={group.id}>
        <div
          className={`flex items-center gap-[6px] py-[6px] px-[8px] rounded-[4px] hover:bg-zinc-100 cursor-pointer transition-colors ${
            level > 0 ? 'ml-[20px]' : ''
          }`}
          style={{ paddingLeft: `${8 + level * 20}px` }}
          onClick={() => hasChildren && toggleGroup(group.id)}
        >
          {/* Expand/Collapse Icon */}
          {hasChildren ? (
            isExpanded ? (
              <ChevronDown className="w-[14px] h-[14px] text-zinc-500 flex-shrink-0" />
            ) : (
              <ChevronRight className="w-[14px] h-[14px] text-zinc-500 flex-shrink-0" />
            )
          ) : (
            <div className="w-[14px] h-[14px] flex-shrink-0" />
          )}

          {/* Group Info */}
          <div className="flex-1 min-w-0">
            <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16px] text-[12px] text-zinc-950 truncate">
              {group.groupName}
            </p>
            <p className="font-['Inter:Regular',sans-serif] font-normal leading-[14px] text-[11px] text-zinc-500 truncate">
              {group.locationGroupLevel}
            </p>
          </div>

          {/* Child Count Badge */}
          {hasChildren && (
            <div className="inline-block px-[6px] py-[2px] bg-lime-100 rounded-[4px] flex-shrink-0">
              <p className="font-['Inter:Medium',sans-serif] font-medium leading-[14px] text-[10px] text-lime-700">
                {childGroups.length}
              </p>
            </div>
          )}
        </div>

        {/* Render children if expanded */}
        {hasChildren && isExpanded && (
          <div className="border-l-2 border-zinc-200 ml-[16px]">
            {childGroups.map((childGroup: any) => renderGroupTree(childGroup, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="w-[420px] bg-white border-l border-zinc-200 h-full overflow-auto">
      <div className="sticky top-0 bg-white border-b border-zinc-200 px-[20px] py-[16px] z-10">
        <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] text-[16px] text-zinc-950">
          Onboarding Preview
        </p>
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] text-[14px] text-zinc-500 mt-[4px]">
          Track your progress
        </p>
      </div>

      <div className="px-[20px] py-[20px] space-y-[24px]">
        {/* Enterprise Info */}
        <div>
          <div className="flex items-center gap-[8px] mb-[12px]">
            <Building2 className="w-[16px] h-[16px] text-zinc-500" />
            <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] text-[14px] text-zinc-950">
              Enterprise
            </p>
          </div>
          {onboardingData.enterpriseName ? (
            <div className="bg-zinc-50 p-[12px] rounded-[6px]">
              <p className="font-['Inter:Medium',sans-serif] font-medium leading-[18px] text-[13px] text-zinc-950">
                {onboardingData.enterpriseName}
              </p>
              {onboardingData.enterpriseWebsite && (
                <p className="font-['Inter:Regular',sans-serif] font-normal leading-[16px] text-[12px] text-zinc-500 mt-[4px]">
                  {onboardingData.enterpriseWebsite}
                </p>
              )}
            </div>
          ) : (
            <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18px] text-[13px] text-zinc-400 italic">
              Not set
            </p>
          )}
        </div>

        {/* Hierarchy Levels */}
        <div>
          <div className="flex items-center gap-[8px] mb-[12px]">
            <Layers className="w-[16px] h-[16px] text-zinc-500" />
            <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] text-[14px] text-zinc-950">
              Hierarchy Levels
            </p>
          </div>
          {onboardingData.groupLevels.length > 0 ? (
            <div className="space-y-[8px]">
              {onboardingData.groupLevels
                .sort((a: any, b: any) => parseInt(a.groupLevelNumber) - parseInt(b.groupLevelNumber))
                .map((level: any) => (
                  <div key={level.id} className="bg-zinc-50 p-[12px] rounded-[6px]">
                    <div className="flex items-center justify-between">
                      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[18px] text-[13px] text-zinc-950">
                        Level {level.groupLevelNumber}: {level.groupLevelName}
                      </p>
                      <div className="inline-block px-[6px] py-[2px] bg-lime-100 rounded-[4px]">
                        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[14px] text-[11px] text-lime-700">
                          {onboardingData.groups.filter((g: any) => g.locationGroupLevel === level.groupLevelName).length}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          ) : (
            <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18px] text-[13px] text-zinc-400 italic">
              No levels defined
            </p>
          )}
        </div>

        {/* Groups */}
        {onboardingData.groups.length > 0 && (
          <div>
            <div className="flex items-center gap-[8px] mb-[12px]">
              <Tag className="w-[16px] h-[16px] text-zinc-500" />
              <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] text-[14px] text-zinc-950">
                Groups Hierarchy
              </p>
              <div className="inline-block px-[8px] py-[2px] bg-zinc-100 rounded-[4px]">
                <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16px] text-[11px] text-zinc-700">
                  {onboardingData.groups.length}
                </p>
              </div>
            </div>
            <div className="max-h-[300px] overflow-y-auto bg-white border border-zinc-200 rounded-[6px]">
              {/* Render Level 1 groups (no parent) as tree roots */}
              {onboardingData.groups
                .filter((group: any) => !group.parentGroup)
                .map((rootGroup: any) => renderGroupTree(rootGroup, 0))}
            </div>
          </div>
        )}

        {/* Locations */}
        <div>
          <div className="flex items-center gap-[8px] mb-[12px]">
            <MapPin className="w-[16px] h-[16px] text-zinc-500" />
            <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] text-[14px] text-zinc-950">
              Locations
            </p>
            <div className="inline-block px-[8px] py-[2px] bg-zinc-100 rounded-[4px]">
              <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16px] text-[11px] text-zinc-700">
                {onboardingData.locations.length}
              </p>
            </div>
          </div>
          {onboardingData.locations.length > 0 ? (
            <div className="max-h-[200px] overflow-y-auto space-y-[4px]">
              {onboardingData.locations.map((location: any) => (
                <div key={location.id} className="bg-zinc-50 px-[10px] py-[6px] rounded-[4px]">
                  <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16px] text-[12px] text-zinc-950">
                    {location.locationTag}
                  </p>
                  <p className="font-['Inter:Regular',sans-serif] font-normal leading-[14px] text-[11px] text-zinc-500">
                    {location.locationCity}, {location.locationState}
                  </p>
                  {location.locationTags && location.locationTags.length > 0 && (
                    <div className="flex flex-wrap gap-[4px] mt-[4px]">
                      {location.locationTags.map((tag: string, idx: number) => (
                        <span
                          key={idx}
                          className="inline-block px-[6px] py-[2px] bg-amber-100 rounded-[4px] font-['Inter:Medium',sans-serif] font-medium leading-[12px] text-[10px] text-amber-700"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18px] text-[13px] text-zinc-400 italic">
              No locations added
            </p>
          )}
        </div>

        {/* Sensors */}
        <div>
          <div className="flex items-center gap-[8px] mb-[12px]">
            <Zap className="w-[16px] h-[16px] text-zinc-500" />
            <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] text-[14px] text-zinc-950">
              Sensors
            </p>
            <div className="inline-block px-[8px] py-[2px] bg-zinc-100 rounded-[4px]">
              <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16px] text-[11px] text-zinc-700">
                {onboardingData.sensors.length}
              </p>
            </div>
          </div>
          {onboardingData.sensors.length > 0 ? (
            <div className="max-h-[150px] overflow-y-auto space-y-[4px]">
              {onboardingData.sensors.map((sensor: any) => (
                <div key={sensor.id} className="bg-zinc-50 px-[10px] py-[6px] rounded-[4px]">
                  <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16px] text-[12px] text-zinc-950">
                    {sensor.sensorId}
                  </p>
                  <p className="font-['Inter:Regular',sans-serif] font-normal leading-[14px] text-[11px] text-zinc-500">
                    {sensor.location}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18px] text-[13px] text-zinc-400 italic">
              No sensors added
            </p>
          )}
        </div>

        {/* Power Sources */}
        <div>
          <div className="flex items-center gap-[8px] mb-[12px]">
            <Battery className="w-[16px] h-[16px] text-zinc-500" />
            <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] text-[14px] text-zinc-950">
              Power Sources
            </p>
            <div className="inline-block px-[8px] py-[2px] bg-zinc-100 rounded-[4px]">
              <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16px] text-[11px] text-zinc-700">
                {onboardingData.sources.length}
              </p>
            </div>
          </div>
          {onboardingData.sources.length > 0 ? (
            <div className="max-h-[150px] overflow-y-auto space-y-[4px]">
              {onboardingData.sources.map((source: any) => (
                <div key={source.id} className="bg-zinc-50 px-[10px] py-[6px] rounded-[4px]">
                  <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16px] text-[12px] text-zinc-950">
                    {source.sourceType}
                  </p>
                  <p className="font-['Inter:Regular',sans-serif] font-normal leading-[14px] text-[11px] text-zinc-500">
                    {source.location}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18px] text-[13px] text-zinc-400 italic">
              No sources added
            </p>
          )}
        </div>
      </div>
    </div>
  );
}