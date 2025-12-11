# Customer Onboarding Wizard - Logic Documentation

## Table of Contents
1. [Overview](#overview)
2. [Architecture](#architecture)
3. [Data Structures](#data-structures)
4. [Workflow & State Management](#workflow--state-management)
5. [Step-by-Step Logic](#step-by-step-logic)
6. [Key Functions](#key-functions)
7. [Validation Rules](#validation-rules)
8. [UI Components](#ui-components)

---

## Overview

The Customer Onboarding Wizard is a comprehensive multi-step form system for onboarding new customers into an EMS (Energy Management System) admin dashboard. It guides administrators through the process of:

1. **Creating Enterprise Information** - Basic company details
2. **Building Organizational Structure** - Defining 3-level hierarchy and groups
3. **Adding Locations** - Configuring locations with commodities, solar capacity, and tags
4. **Creating Sensors** - Setting up sensors with meters and channels
5. **Configuring Power Sources** - Adding generators, solar panels, batteries, inverters, and grid connections
6. **Creating Super Admin** - Setting up the enterprise administrator account

### Key Features
- **Progressive State Management**: All data is saved throughout the wizard journey
- **Toast Notifications**: Real-time feedback for user actions
- **Preview Sidebar**: Live preview of onboarding progress with hierarchical tree view
- **Save & Exit**: Ability to save progress and resume later
- **Location-Specific Tags**: Tags are associated with individual locations, not enterprise-wide
- **Hierarchical Organization**: Exactly 3 levels of organizational structure

---

## Architecture

### Component Hierarchy

```
CustomerOnboarding (Main Container)
├── Customer List View
│   ├── Header with "Onboard New Customer" button
│   ├── Customer Table
│   └── Expandable Row Details
│
└── OnboardingWizard (Full-screen modal)
    ├── Header (with back button)
    ├── Progress Stepper
    ├── Content Area (step-specific forms)
    ├── OnboardingPreview Sidebar
    └── Action Buttons (Next/Previous/Save & Exit)
```

### File Structure

```
/components/
├── CustomerOnboarding.tsx    # Main container, state management
├── OnboardingWizard.tsx       # Wizard UI and step rendering
├── OnboardingPreview.tsx      # Sidebar preview component
└── ui/
    ├── Button.tsx
    ├── Input.tsx
    ├── Stepper.tsx
    └── ... (other UI components)
```

---

## Data Structures

### OnboardingData Type

```typescript
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
    groupLevelNumber: string; // "1", "2", or "3"
  }>;
  
  groups: Array<{
    id: string;
    enterprise: string;
    locationGroupLevel: string;
    groupName: string;
    parentGroup: string; // Empty for level 1, required for levels 2 & 3
  }>;
  
  // Step 3 - Locations
  locations: Array<{
    id: string;
    longitude: string;
    latitude: string;
    locationTag: string; // Location name/identifier
    locationState: string;
    locationCity: string;
    deviceResolution: string;
    country: string;
    locationGroupLevel: string;
    locationGroup: string;
    locationQualifiers: string[]; // ['Primary', 'Secondary', 'Backup', etc.]
    locationTags: string[]; // Location-specific custom tags
    commodities: Array<{
      id: string;
      commodityType: string; // 'Fuel', 'Electricity', 'Diesel', 'Gas', 'Water'
      price: string;
    }>;
    solarCapacity: string; // Solar panel capacity in kW
  }>;
  
  // Step 4 - Sensors
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
    fuelType?: string; // 'Diesel', 'Petrol', 'Gas', 'Biodiesel'
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
```

### Customer Type

```typescript
type Customer = {
  id: string;
  companyName: string;
  businessType: string;
  contactName: string;
  email: string;
  phone: string;
  address: string;
  status: 'active' | 'pending' | 'offline';
  locations: Array<{
    id: string;
    name: string;
    address: string;
  }>;
  createdAt: string;
  onboardingData?: OnboardingData; // Saved progress
  savedStep?: number; // Last completed step
};
```

---

## Workflow & State Management

### State Variables (in CustomerOnboarding.tsx)

#### Primary State
- **`onboardingData`**: Main data object containing all onboarding information
- **`currentStep`**: Current wizard step (1-6)
- **`showOnboardingPage`**: Boolean to toggle between customer list and wizard
- **`editingCustomer`**: Customer being edited (null for new customer)

#### Temporary Form State (for building complex objects before adding)
- **`tempLocation`**: Form data for a location being created
- **`tempGroupLevel`**: Form data for a group level being defined
- **`tempGroup`**: Form data for a group being created
- **`tempSensor`**: Form data for a sensor being created
- **`tempMeter`**: Form data for a meter being added to a sensor
- **`tempChannelName`**: String for a channel being added to a meter
- **`tempCommodity`**: Form data for a commodity being added to a location
- **`tempSource`**: Form data for a power source being created

#### UI State
- **`expandedRows`**: Set of customer IDs with expanded details in the table
- **`expandedSections`**: Object tracking expanded sections in location form (commodities, solar)
- **`expandedGroups`**: Set of group IDs expanded in the preview sidebar tree view

### State Flow

```
User Action → Update Temp State → Validation → Add to Main State → Clear Temp State → Toast Notification
```

**Example: Adding a Location**

1. User fills out `tempLocation` form fields
2. User clicks "Add Location" button
3. `addLocation()` function validates required fields
4. If valid, create new location object with unique ID
5. Add to `onboardingData.locations` array
6. Clear `tempLocation` state
7. Show success toast with location name

---

## Step-by-Step Logic

### Step 1: Enterprise Information

**Purpose**: Collect basic enterprise details

**Fields**:
- Enterprise Name (required)
- Enterprise Website Address
- Enterprise Email Address (required)

**Logic**:
- Direct binding to `onboardingData` state
- No complex validation beyond required fields
- Data is immediately saved to main state

**Code Location**: `OnboardingWizard.tsx` lines 202-281

---

### Step 2: Organizational Structure

**Purpose**: Define 3-level hierarchy and create groups within each level

#### Sub-Step 1: Define Level Names

**Logic**:
- Display 3 input fields for Level 1, 2, and 3
- Each level must have a unique name (e.g., "Region", "State", "Cluster")
- Levels are automatically numbered 1, 2, 3
- When user types a level name:
  - If level doesn't exist → Create new `groupLevel` object
  - If level exists → Update existing `groupLevel` object
- Levels are always sorted by `groupLevelNumber`

**Key Constraints**:
- Must have exactly 3 levels
- Each level needs a descriptive name
- Level numbers are fixed (1, 2, 3) and auto-assigned

#### Sub-Step 2: Create Groups

**Logic**:
```
For each defined level:
  1. Display form to add groups to that level
  2. If level > 1:
     - Require parent group selection from previous level
     - Only show groups from level (n-1) as parent options
  3. When "Add to [Level]" clicked:
     - Validate group name and parent (if required)
     - Create group with unique ID
     - Link to parent group (if level > 1)
     - Show success toast
     - Clear temp form
  4. Display list of created groups for that level
     - Show parent relationship for levels 2 & 3
     - Allow deletion
```

**Parent-Child Relationship**:
- **Level 1 Groups**: No parent (root level)
- **Level 2 Groups**: Must have a Level 1 parent
- **Level 3 Groups**: Must have a Level 2 parent

**Validation Rules**:
- Cannot add Level 2 groups if no Level 1 groups exist
- Cannot add Level 3 groups if no Level 2 groups exist
- Parent group is required for levels 2 and 3

**Example Hierarchy**:
```
Level 1: Region
  └── South Region
  └── North Region

Level 2: State (parent: Region)
  └── Lagos (parent: South Region)
  └── Oyo (parent: South Region)
  └── Kano (parent: North Region)

Level 3: Cluster (parent: State)
  └── Ikeja Cluster (parent: Lagos)
  └── Yaba Cluster (parent: Lagos)
  └── Ibadan North (parent: Oyo)
```

**Code Location**: `OnboardingWizard.tsx` lines 283-499

---

### Step 3: Add & Configure Locations

**Purpose**: Add physical locations with complete configuration

#### Basic Information (Always Visible)

**Required Fields**:
- **Location Name** (`locationTag`): Identifier for the location
- **Location State**: Selected from dropdown (Nigerian states)
- **Location City**: Free text input
- **Country**: Free text input

**Optional Fields**:
- **Longitude**: GPS coordinate
- **Latitude**: GPS coordinate
- **Assign to Group**: Only shows Level 3 groups (lowest level)
- **Qualifiers**: Multi-select badges (Primary, Secondary, Backup, Critical, Standard)
- **Location Tags**: Custom tags specific to this location

#### Location Tags Logic

**Behavior**:
- Tags are **location-specific**, not enterprise-wide
- User types a tag and presses **Enter** to add
- Duplicate tags are prevented
- Tags are stored in `locationTags` array within each location
- Tags can be removed by clicking X button
- Tags display as colored badges in the location card

**Implementation**:
```typescript
// Adding a tag
onKeyDown={(e) => {
  if (e.key === 'Enter' && e.currentTarget.value.trim()) {
    const newTag = e.currentTarget.value.trim();
    if (!tempLocation.locationTags.includes(newTag)) {
      setTempLocation({ 
        ...tempLocation, 
        locationTags: [...tempLocation.locationTags, newTag] 
      });
    }
    e.currentTarget.value = '';
  }
}}
```

#### Group Assignment Logic

**Constraint**: Locations can only be assigned to **Level 3 (lowest level) groups**

**Reason**: Hierarchical organization structure means:
- Level 1 groups are too broad (e.g., "Region")
- Level 2 groups are intermediate (e.g., "State")
- Level 3 groups are specific enough for location assignment (e.g., "Cluster")

**Implementation**:
```typescript
// Filter groups to only show Level 3
const lastLevel = onboardingData.groupLevels.find(
  (l: any) => parseInt(l.groupLevelNumber) === 3
);

const availableGroups = onboardingData.groups.filter(
  (group: any) => group.locationGroupLevel === lastLevel.groupLevelName
);
```

#### Expandable Sections

**1. Commodities Section**

**Purpose**: Define commodity pricing for the location

**Fields per Commodity**:
- **Commodity Type**: Dropdown (Fuel, Electricity, Diesel, Gas, Water)
- **Price**: Numeric input

**Logic**:
- Click "Commodities" section to expand/collapse
- Add multiple commodities to `tempLocation.commodities` array
- Each commodity has unique ID
- Can remove commodities before saving location
- Commodities are saved with the location

**2. Solar Capacity Section**

**Purpose**: Track solar panel capacity for the location

**Fields**:
- **Solar Capacity**: Numeric input (in kW)

**Logic**:
- Simple text input
- Stored as `tempLocation.solarCapacity`
- Saved with location

#### Adding a Location

**Process**:
1. User fills out all required fields
2. Optionally adds commodities and solar capacity
3. Clicks "Add Location" button
4. Validation:
   - `locationTag` must not be empty
   - `locationCity` must not be empty
5. If valid:
   - Create location object with unique ID (timestamp)
   - Add to `onboardingData.locations` array
   - Show success toast: "Location '[name]' added to [group]"
   - Clear `tempLocation` state and reset form
6. If invalid:
   - No action (button could be disabled)

**Code Location**: `OnboardingWizard.tsx` lines 501-800+

---

## Key Functions

### Location Management

#### `addLocation()`
```typescript
const addLocation = () => {
  if (tempLocation.locationTag && tempLocation.locationCity) {
    const groupText = tempLocation.locationGroup 
      ? ` to ${tempLocation.locationGroup}` 
      : '';
    
    setOnboardingData({
      ...onboardingData,
      locations: [
        ...onboardingData.locations, 
        { id: Date.now().toString(), ...tempLocation }
      ],
    });
    
    toast.success(`Location "${tempLocation.locationTag}" added${groupText}`);
    
    // Reset form
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
      locationQualifiers: [],
      locationTags: [],
      commodities: [],
      solarCapacity: '',
    });
  }
};
```

**Key Points**:
- Validates required fields (`locationTag` and `locationCity`)
- Generates unique ID using timestamp
- Spreads `tempLocation` into new object
- Shows dynamic toast message
- Resets entire form state

#### `removeLocation(id: string)`
```typescript
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
```

**Key Points**:
- Finds location before removal for toast message
- Filters out location by ID
- Shows error-style toast (red) for deletion

---

### Group & Group Level Management

#### `addGroupLevel()`
```typescript
const addGroupLevel = () => {
  if (tempGroupLevel.groupLevelName && tempGroupLevel.groupLevelNumber) {
    setOnboardingData({
      ...onboardingData,
      groupLevels: [
        ...onboardingData.groupLevels, 
        { id: Date.now().toString(), ...tempGroupLevel }
      ],
    });
    setTempGroupLevel({
      enterprise: '',
      groupLevelName: '',
      groupLevelNumber: '',
    });
  }
};
```

**Note**: In practice, group levels are added inline in Step 2 UI, not through this function

#### `addGroup()`
```typescript
const addGroup = () => {
  if (tempGroup.groupName && tempGroup.locationGroupLevel) {
    setOnboardingData({
      ...onboardingData,
      groups: [
        ...onboardingData.groups, 
        { id: Date.now().toString(), ...tempGroup }
      ],
    });
    toast.success(
      `Group "${tempGroup.groupName}" added to ${tempGroup.locationGroupLevel}`
    );
    setTempGroup({
      enterprise: '',
      locationGroupLevel: '',
      groupName: '',
      parentGroup: '',
    });
  }
};
```

**Key Points**:
- Validates group name and level
- Parent group validation happens in UI (button disabled if invalid)
- Shows success toast with group name and level

#### `removeGroup(id: string)`
```typescript
const removeGroup = (id: string) => {
  setOnboardingData({
    ...onboardingData,
    groups: onboardingData.groups.filter(g => g.id !== id),
  });
};
```

**Warning**: No cascade deletion check. Removing a parent group doesn't remove child groups or orphan locations.

---

### Commodity Management (Location-specific)

#### `addCommodityToLocation()`
```typescript
const addCommodityToLocation = () => {
  if (tempCommodity.commodityType && tempCommodity.price) {
    setTempLocation({
      ...tempLocation,
      commodities: [
        ...tempLocation.commodities, 
        { id: Date.now().toString(), ...tempCommodity }
      ],
    });
    setTempCommodity({ commodityType: '', price: '' });
  }
};
```

**Key Points**:
- Adds to **`tempLocation`**, not `onboardingData`
- Commodity is saved when location is saved
- No toast notification (micro-interaction)

#### `removeCommodityFromLocation(commodityId: string)`
```typescript
const removeCommodityFromLocation = (commodityId: string) => {
  setTempLocation({
    ...tempLocation,
    commodities: tempLocation.commodities.filter(c => c.id !== commodityId),
  });
};
```

---

### Navigation & State Persistence

#### `handleNextStep()`
```typescript
const handleNextStep = () => {
  if (currentStep < 6) {
    setCurrentStep(currentStep + 1);
  }
};
```

**Future Enhancement**: Should include validation before allowing navigation

#### `handlePrevStep()`
```typescript
const handlePrevStep = () => {
  if (currentStep > 1) {
    setCurrentStep(currentStep - 1);
  }
};
```

#### `handleSaveAndExit()`
```typescript
const handleSaveAndExit = () => {
  if (editingCustomer) {
    // Update existing customer
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
    const pendingCustomer = {
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
```

**Key Points**:
- Saves current progress to customer record
- Sets status to 'pending'
- Stores entire `onboardingData` for resuming later
- Saves current step number
- Converts locations to simplified format for display

#### `handleEdit(customer: Customer)`
```typescript
const handleEdit = (customer: Customer) => {
  setEditingCustomer(customer);
  
  if (customer.onboardingData) {
    setOnboardingData(customer.onboardingData);
  } else {
    // Initialize with customer data
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
  
  if (customer.savedStep) {
    setCurrentStep(customer.savedStep);
  } else {
    setCurrentStep(1);
  }
  
  setShowOnboardingPage(true);
};
```

**Key Points**:
- Restores saved `onboardingData` if exists
- Restores saved step number
- Opens wizard at saved progress point

---

## Validation Rules

### Step 1: Enterprise Information
- ✅ **Enterprise Name**: Required (enforced by UI validation)
- ⚠️ **Enterprise Email**: Required (enforced by UI validation)
- ℹ️ **Enterprise Website**: Optional

### Step 2: Organizational Structure

**Group Levels**:
- ✅ Must define all 3 levels
- ✅ Each level must have a unique name
- ✅ Level numbers are auto-assigned (1, 2, 3)

**Groups**:
- ✅ Group name required
- ✅ Level assignment required
- ✅ Parent group required for Level 2 and Level 3
- ⚠️ Cannot add Level 2 groups without Level 1 groups
- ⚠️ Cannot add Level 3 groups without Level 2 groups
- ✅ Parent must be from immediately preceding level

### Step 3: Add Locations

**Required Fields**:
- ✅ Location Name (`locationTag`)
- ✅ Location City
- ✅ Location State (must select from dropdown)
- ✅ Country

**Optional Fields**:
- ℹ️ Longitude / Latitude
- ℹ️ Group assignment (can only assign to Level 3 groups)
- ℹ️ Qualifiers (multi-select)
- ℹ️ Location Tags (custom, location-specific)
- ℹ️ Commodities (expandable section)
- ℹ️ Solar Capacity (expandable section)

**Business Rules**:
- 🔒 Locations can **only** be assigned to Level 3 groups
- 🔒 If no Level 3 groups exist, group assignment is unavailable
- 🔒 Location tags are unique per location (no duplicates)
- 🔒 Each commodity must have type and price

---

## UI Components

### OnboardingWizard Component

**Props**:
```typescript
type OnboardingWizardProps = {
  onClose: () => void;
  currentStep: number;
  setCurrentStep: (step: number) => void;
  onboardingData: any;
  setOnboardingData: (data: any) => void;
  // Temp state for forms
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
  // Helper data
  availableQualifiers: string[];
  // Actions
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
```

**Layout**:
```
┌─────────────────────────────────────────────────────────────┬─────────────┐
│ Header (Back button, Title)                                 │             │
├─────────────────────────────────────────────────────────────┤             │
│ Progress Stepper (1-6)                                      │             │
├─────────────────────────────────────────────────────────────┤             │
│                                                             │             │
│                                                             │             │
│               Step Content Area                             │  Preview    │
│               (Dynamic based on currentStep)                │  Sidebar    │
│                                                             │             │
│                                                             │             │
└─────────────────────────────────────────────────────────────┴─────────────┘
```

### OnboardingPreview Component

**Purpose**: Sidebar that displays real-time progress

**Props**:
```typescript
type OnboardingPreviewProps = {
  onboardingData: any;
  currentStep: number;
};
```

**Displays**:
1. **Enterprise Info**: Name and website
2. **Hierarchy Levels**: All 3 levels with group counts
3. **Groups Hierarchy**: Expandable tree view
   - Click to expand/collapse
   - Shows parent-child relationships
   - Badge with child count
   - Indentation for visual hierarchy
4. **Locations**: List with city, state, and location tags
5. **Sensors**: List with sensor IDs and locations
6. **Power Sources**: List with source types

**Tree View Logic**:
```typescript
const renderGroupTree = (group: any, level: number = 0) => {
  const childGroups = getChildGroups(group.groupName);
  const hasChildren = childGroups.length > 0;
  const isExpanded = expandedGroups.has(group.id);

  return (
    <div>
      {/* Group row with expand/collapse icon */}
      <div onClick={() => hasChildren && toggleGroup(group.id)}>
        {hasChildren ? (
          isExpanded ? <ChevronDown /> : <ChevronRight />
        ) : (
          <EmptySpace />
        )}
        <GroupInfo>{group.groupName}</GroupInfo>
        {hasChildren && <ChildCountBadge>{childGroups.length}</ChildCountBadge>}
      </div>
      
      {/* Recursive render of children */}
      {hasChildren && isExpanded && (
        <div className="border-l-2 ml-[16px]">
          {childGroups.map(child => renderGroupTree(child, level + 1))}
        </div>
      )}
    </div>
  );
};
```

### Toast Notifications

**Library**: `sonner@2.0.3`

**Usage Patterns**:

```typescript
// Success - Green toast
toast.success(`Location "${name}" added to ${group}`);
toast.success(`Group "${name}" added to ${level}`);
toast.success(`${sourceType} power source added`);

// Error/Deletion - Red toast  
toast.error(`Location "${name}" removed`);
```

**Toast Triggers**:
- ✅ Location added
- ❌ Location removed
- ✅ Group added
- ✅ Sensor added
- ✅ Power source added

---

## Advanced Concepts

### Hierarchical Group Relationships

**Constraint**: 3-level mandatory hierarchy

**Example**:
```
Enterprise: PowerGrid Corp
  └─ Level 1: Region
      ├─ South Region
      │   └─ Level 2: State
      │       ├─ Lagos (parent: South Region)
      │       │   └─ Level 3: Cluster
      │       │       ├─ Ikeja Cluster (parent: Lagos)
      │       │       └─ Yaba Cluster (parent: Lagos)
      │       └─ Oyo (parent: South Region)
      │           └─ Level 3: Cluster
      │               └─ Ibadan North (parent: Oyo)
      └─ North Region
          └─ Level 2: State
              └─ Kano (parent: North Region)
                  └─ Level 3: Cluster
                      └─ Kano Central (parent: Kano)
```

**Traversal Algorithm** (Preview Sidebar):
```
1. Find all Level 1 groups (parentGroup === '')
2. For each Level 1 group:
   a. Render group
   b. Find children (Level 2 groups where parentGroup === currentGroup.groupName)
   c. For each child:
      i. Render child
      ii. Find grandchildren (Level 3 groups where parentGroup === child.groupName)
      iii. Render grandchildren
```

### Location Assignment Rules

**Why Only Level 3?**

The hierarchical structure is designed from **broad → specific**:
- **Level 1 (Region)**: Too broad (e.g., "South Region" covers multiple states)
- **Level 2 (State)**: Still broad (e.g., "Lagos" has many areas)
- **Level 3 (Cluster)**: Specific enough for precise location assignment

**Implementation**:
```typescript
// Only show Level 3 groups in location assignment dropdown
const lastLevel = onboardingData.groupLevels.find(
  (l: any) => parseInt(l.groupLevelNumber) === 3
);

const availableGroups = onboardingData.groups.filter(
  (group: any) => group.locationGroupLevel === lastLevel.groupLevelName
);
```

### Location Tags vs Enterprise Tags

**Location Tags** (Current Implementation):
- ✅ Stored within each location object
- ✅ Unique per location
- ✅ Added via Enter key
- ✅ Displayed in preview sidebar
- ✅ Examples: "Critical", "Priority", "Backup", "24/7", "High Traffic"

**Enterprise Tags** (Not Implemented):
- ❌ Would be stored in `onboardingData` root level
- ❌ Would be shared across locations
- ❌ Would require tag management UI

**Rationale**: Location-specific tags provide more granular categorization and flexibility

---

## Future Enhancements

### Validation Improvements
- [ ] Form-level validation before allowing "Next Step"
- [ ] Email format validation
- [ ] URL format validation for website
- [ ] Numeric validation for coordinates
- [ ] Required field indicators with asterisks

### Data Integrity
- [ ] Cascade deletion warnings (e.g., "Deleting this group will orphan 5 locations")
- [ ] Duplicate name prevention for groups and locations
- [ ] Unique constraint enforcement

### UX Improvements
- [ ] Drag-and-drop location assignment to groups
- [ ] Bulk location import (CSV upload)
- [ ] Map view for location coordinates
- [ ] Auto-fill city/state from coordinates (reverse geocoding)
- [ ] Search and filter in location list

### State Management
- [ ] Migrate to Zustand or Redux for complex state
- [ ] Implement undo/redo functionality
- [ ] Auto-save draft every N seconds
- [ ] Versioning of onboarding progress

### Preview Enhancements
- [ ] Export preview as PDF
- [ ] Send preview email to stakeholders
- [ ] Print-friendly preview view
- [ ] Validation checklist in preview

---

## Appendix

### Constants

```typescript
// Available commodity types
const commodityTypes = ['Fuel', 'Electricity', 'Diesel', 'Gas', 'Water'];

// Available fuel types for generators
const fuelTypes = ['Diesel', 'Petrol', 'Gas', 'Biodiesel'];

// Available qualifiers for locations
const availableQualifiers = [
  'Primary', 
  'Secondary', 
  'Backup', 
  'Critical', 
  'Standard'
];

// Nigerian states (for location dropdown)
const nigerianStates = [
  'Lagos', 
  'Abuja', 
  'Kano', 
  'Rivers', 
  'Kaduna', 
  'Oyo', 
  'Delta'
];

// Power source types
type SourceType = 'generator' | 'solar' | 'battery' | 'inverter' | 'grid';
```

### ID Generation

All entities use timestamp-based IDs:
```typescript
id: Date.now().toString()
```

**Pros**:
- Simple
- No collision in single-user context
- Sortable by creation time

**Cons**:
- Not globally unique
- Potential collision in rapid creation
- Not cryptographically secure

**Recommendation**: Replace with UUID library for production

---

## Summary

The Customer Onboarding Wizard implements a sophisticated multi-step data collection system with:

1. **Progressive State Building**: Each step builds upon previous data
2. **Hierarchical Organization**: 3-level mandatory structure ensures proper organization
3. **Location-Centric Design**: Tags and commodities tied to individual locations
4. **Real-Time Preview**: Sidebar shows live progress with expandable tree views
5. **State Persistence**: Save & Exit functionality allows resuming incomplete onboarding
6. **User Feedback**: Toast notifications for all major actions
7. **Validation**: Progressive enforcement ensures data quality

The wizard successfully guides administrators through the complex process of onboarding a new EMS customer with minimal errors and maximum clarity.
