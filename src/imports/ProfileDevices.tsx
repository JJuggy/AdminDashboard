import svgPaths from "./svg-vdxskqbkt5";
import imgAvatar from "figma:asset/a36983dad1d91b1a9851b361814e44f9a6ebfc9a.png";

function IconsOutlined() {
  return (
    <div className="relative size-[16px]" data-name="Icons - outlined">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="x">
          <path d="M12 4L4 12M4 4L12 12" id="Vector" stroke="var(--stroke-0, #09090B)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Frame() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[10px] items-center justify-center p-[12px] relative rounded-[4px] size-[32px]" data-name="Frame">
      <div aria-hidden="true" className="absolute border border-solid border-zinc-200 inset-[-1px] pointer-events-none rounded-[5px]" />
      <div className="flex items-center justify-center relative shrink-0">
        <div className="flex-none rotate-[180deg]">
          <IconsOutlined />
        </div>
      </div>
    </div>
  );
}

function Header() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[2px] grow h-[58px] items-start min-h-px min-w-px not-italic relative shrink-0 text-nowrap whitespace-pre" data-name="Header">
      <p className="font-['Inter:Bold',sans-serif] font-bold leading-[32px] relative shrink-0 text-[24px] text-zinc-950 tracking-[-0.6px]">Profile</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] relative shrink-0 text-[16px] text-zinc-500">Manage your profile</p>
    </div>
  );
}

function Frame6() {
  return (
    <div className="content-stretch flex gap-[24px] items-start relative shrink-0 w-full">
      <div className="flex items-center justify-center relative shrink-0">
        <div className="flex-none rotate-[180deg]">
          <Frame />
        </div>
      </div>
      <Header />
    </div>
  );
}

function Separator() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0 w-full" data-name="Separator">
      <div className="h-px relative shrink-0 w-full" data-name="Line">
        <div aria-hidden="true" className="absolute border border-solid border-zinc-200 inset-0 pointer-events-none" />
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[16px] items-start px-[16px] py-0 relative w-full">
          <Frame6 />
          <Separator />
        </div>
      </div>
    </div>
  );
}

function SubmenuItem() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="submenu item">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[8px] items-center px-[16px] py-[8px] relative w-full">
          <p className="basis-0 font-['Inter:Medium',sans-serif] font-medium grow leading-[20px] min-h-px min-w-px not-italic relative shrink-0 text-[14px] text-zinc-950">Personal info</p>
        </div>
      </div>
    </div>
  );
}

function SubmenuItem1() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="submenu item">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[8px] items-center px-[16px] py-[8px] relative w-full">
          <p className="basis-0 font-['Inter:Medium',sans-serif] font-medium grow leading-[20px] min-h-px min-w-px not-italic relative shrink-0 text-[14px] text-zinc-950">Security</p>
        </div>
      </div>
    </div>
  );
}

function SubmenuItem2() {
  return (
    <div className="bg-zinc-100 relative rounded-[6px] shrink-0 w-full" data-name="submenu item">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[8px] items-center px-[16px] py-[8px] relative w-full">
          <p className="basis-0 font-['Inter:Semi_Bold',sans-serif] font-semibold grow leading-[20px] min-h-px min-w-px not-italic relative shrink-0 text-[14px] text-zinc-950">Devices</p>
        </div>
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative self-stretch shrink-0 w-[250px]" data-name="Container">
      <SubmenuItem />
      <SubmenuItem1 />
      <SubmenuItem2 />
    </div>
  );
}

function Title() {
  return (
    <div className="content-stretch flex flex-col gap-px items-start not-italic relative shrink-0 w-full" data-name="Title">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[28px] relative shrink-0 text-[18px] text-nowrap text-zinc-950 whitespace-pre">Devices</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-w-full relative shrink-0 text-[14px] text-zinc-500 w-[min-content]">{`You're currently logged in to Atlas on these devices. If you don't recognize a device, log out to keep your account secure.`}</p>
    </div>
  );
}

function Separator1() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[10px] items-start px-0 py-[24px] relative shrink-0 w-full" data-name="Separator">
      <div className="h-px relative shrink-0 w-full" data-name="Line">
        <div aria-hidden="true" className="absolute border border-solid border-zinc-200 inset-0 pointer-events-none" />
      </div>
    </div>
  );
}

function IconsOutlined1() {
  return (
    <div className="relative shrink-0 size-[32px]" data-name="Icons - outlined">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="laptop">
          <path d={svgPaths.p3d41ab00} id="Vector" stroke="var(--stroke-0, #09090B)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Container2() {
  return (
    <div className="content-stretch flex flex-col gap-[2px] items-start relative shrink-0" data-name="Container">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[14px] text-lime-600 text-nowrap whitespace-pre">Firefox on windows</p>
    </div>
  );
}

function Badge() {
  return (
    <div className="bg-zinc-100 box-border content-stretch flex gap-[4px] items-center px-[8px] py-[2px] relative rounded-[6px] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] shrink-0" data-name="Badge">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[12px] text-center text-nowrap text-zinc-950 whitespace-pre">This device</p>
    </div>
  );
}

function Container3() {
  return (
    <div className="basis-0 content-stretch flex gap-[12px] grow items-center min-h-px min-w-px relative shrink-0" data-name="Container">
      <IconsOutlined1 />
      <Container2 />
      <Badge />
    </div>
  );
}

function Button() {
  return (
    <div className="bg-white box-border content-stretch flex gap-[10px] items-center justify-center px-[16px] py-[6px] relative rounded-[6px] shrink-0" data-name="button">
      <div aria-hidden="true" className="absolute border border-solid border-zinc-200 inset-0 pointer-events-none rounded-[6px]" />
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[24px] not-italic relative shrink-0 text-[14px] text-nowrap text-zinc-950 whitespace-pre">Log Out</p>
    </div>
  );
}

function Container4() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full" data-name="Container">
      <Container3 />
      <Button />
    </div>
  );
}

function Container5() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full" data-name="Container">
      <Container4 />
    </div>
  );
}

function Container6() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full" data-name="Container">
      <Container5 />
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex flex-col font-['Inter:Regular',sans-serif] font-normal gap-[4px] items-start leading-[0] not-italic relative shrink-0 text-[14px] text-zinc-500">
      <div className="flex flex-col justify-center relative shrink-0 w-[422px]">
        <p className="leading-[20px]">Today at 6:54am</p>
      </div>
      <div className="flex flex-col justify-center relative shrink-0 w-[422px]">
        <p className="leading-[20px]">Lagos (Lagos), Nigeria</p>
      </div>
    </div>
  );
}

function Container7() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[16px] items-start pl-[44px] pr-0 py-0 relative w-full">
          <Frame2 />
        </div>
      </div>
    </div>
  );
}

function Separator2() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[10px] items-start px-0 py-[16px] relative shrink-0 w-full" data-name="Separator">
      <div className="h-px relative shrink-0 w-full" data-name="Line">
        <div aria-hidden="true" className="absolute border border-solid border-zinc-200 inset-0 pointer-events-none" />
      </div>
    </div>
  );
}

function ExampleSlotShareThisDocumentContent() {
  return (
    <div className="content-stretch flex flex-col h-[113px] items-start relative shrink-0 w-full" data-name="Example Slot - Share this document Content">
      <Container6 />
      <Container7 />
      <Separator2 />
    </div>
  );
}

function Content() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0 w-full z-[3]" data-name="Content">
      <ExampleSlotShareThisDocumentContent />
    </div>
  );
}

function IconsOutlined2() {
  return (
    <div className="relative shrink-0 size-[32px]" data-name="Icons - outlined">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="laptop">
          <path d={svgPaths.p3d41ab00} id="Vector" stroke="var(--stroke-0, #09090B)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Container8() {
  return (
    <div className="content-stretch flex flex-col gap-[2px] items-start relative shrink-0" data-name="Container">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[14px] text-lime-600 text-nowrap whitespace-pre">Chrome on Mac OS X</p>
    </div>
  );
}

function Container9() {
  return (
    <div className="basis-0 content-stretch flex gap-[12px] grow items-center min-h-px min-w-px relative shrink-0" data-name="Container">
      <IconsOutlined2 />
      <Container8 />
    </div>
  );
}

function Button1() {
  return (
    <div className="bg-white box-border content-stretch flex gap-[10px] items-center justify-center px-[16px] py-[6px] relative rounded-[6px] shrink-0" data-name="button">
      <div aria-hidden="true" className="absolute border border-solid border-zinc-200 inset-0 pointer-events-none rounded-[6px]" />
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[24px] not-italic relative shrink-0 text-[14px] text-nowrap text-zinc-950 whitespace-pre">Log Out</p>
    </div>
  );
}

function Container10() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full" data-name="Container">
      <Container9 />
      <Button1 />
    </div>
  );
}

function Container11() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full" data-name="Container">
      <Container10 />
    </div>
  );
}

function Container12() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full" data-name="Container">
      <Container11 />
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex flex-col font-['Inter:Regular',sans-serif] font-normal gap-[4px] items-start leading-[0] not-italic relative shrink-0 text-[14px] text-zinc-500">
      <div className="flex flex-col justify-center relative shrink-0 w-[422px]">
        <p className="leading-[20px]">Monday at 6:54am</p>
      </div>
      <div className="flex flex-col justify-center relative shrink-0 w-[422px]">
        <p className="leading-[20px]">Poplar (Power Hamlets), United Kingdom</p>
      </div>
    </div>
  );
}

function Container13() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[16px] items-start pl-[44px] pr-0 py-0 relative w-full">
          <Frame3 />
        </div>
      </div>
    </div>
  );
}

function ExampleSlotShareThisDocumentContent1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Example Slot - Share this document Content">
      <Container12 />
      <Container13 />
    </div>
  );
}

function Content1() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0 w-full z-[2]" data-name="Content">
      <ExampleSlotShareThisDocumentContent1 />
    </div>
  );
}

function Button2() {
  return (
    <div className="bg-red-500 box-border content-stretch flex gap-[10px] items-center justify-center px-[16px] py-[6px] relative rounded-[6px] shrink-0 z-[1]" data-name="button">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[24px] not-italic relative shrink-0 text-[14px] text-neutral-50 text-nowrap whitespace-pre">Log Out all devices</p>
    </div>
  );
}

function Container14() {
  return (
    <div className="content-stretch flex flex-col gap-[32px] isolate items-start justify-center relative shrink-0 w-full" data-name="Container">
      <Content />
      <Content1 />
      <Button2 />
    </div>
  );
}

function Container15() {
  return (
    <div className="basis-0 bg-white grow max-w-[672px] min-h-px min-w-px relative rounded-[8px] shrink-0" data-name="Container">
      <div aria-hidden="true" className="absolute border border-solid border-zinc-200 inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
      <div className="max-w-inherit size-full">
        <div className="box-border content-stretch flex flex-col items-start max-w-inherit px-[24px] py-[20px] relative w-full">
          <Title />
          <Separator1 />
          <Container14 />
        </div>
      </div>
    </div>
  );
}

function Container16() {
  return (
    <div className="content-stretch flex gap-[48px] items-start relative shrink-0 w-full" data-name="Container">
      <Container1 />
      <Container15 />
    </div>
  );
}

function Logo() {
  return (
    <div className="h-[24px] relative shrink-0 w-[112.2px]" data-name="Logo">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 113 24">
        <g id="Logo">
          <path d={svgPaths.p172fcc00} fill="var(--fill-0, #09090B)" id="Subtract" />
          <g id="owerLabs">
            <path d={svgPaths.p1674a900} fill="var(--fill-0, #09090B)" />
            <path d={svgPaths.pb726b00} fill="var(--fill-0, #09090B)" />
            <path d={svgPaths.p20c35f80} fill="var(--fill-0, #09090B)" />
            <path d={svgPaths.p2d210a00} fill="var(--fill-0, #09090B)" />
            <path d={svgPaths.p346da500} fill="var(--fill-0, #09090B)" />
            <path d={svgPaths.pb56b7c0} fill="var(--fill-0, #09090B)" />
            <path d={svgPaths.p24c0d900} fill="var(--fill-0, #09090B)" />
            <path d={svgPaths.p3564f680} fill="var(--fill-0, #09090B)" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function AssetsStoreSwitcher() {
  return (
    <div className="bg-white box-border content-stretch flex flex-col gap-[10px] h-[56px] items-start justify-center overflow-clip px-[24px] py-[10px] relative shrink-0 w-[252px]" data-name="Assets/Store switcher">
      <Logo />
    </div>
  );
}

function Frame4() {
  return (
    <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0">
      <div className="flex flex-col items-center justify-center size-full">
        <div className="size-full" />
      </div>
    </div>
  );
}

function Frame1() {
  return (
    <div className="relative shrink-0 size-[36px]" data-name="Frame">
      <div className="absolute inset-[-2.78%_-5.56%_-8.33%_-5.56%]" style={{ "--fill-0": "rgba(255, 255, 255, 1)", "--stroke-0": "rgba(228, 228, 231, 1)" } as React.CSSProperties}>
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 40 40">
          <g filter="url(#filter0_d_5_8017)" id="Frame">
            <rect fill="var(--fill-0, white)" height="36" rx="6" width="36" x="2" y="1" />
            <rect height="35" rx="5.5" stroke="var(--stroke-0, #E4E4E7)" width="35" x="2.5" y="1.5" />
            <path clipRule="evenodd" d={svgPaths.pe95bc00} fill="var(--fill-0, #09090B)" fillRule="evenodd" id="Vector" />
          </g>
          <defs>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="40" id="filter0_d_5_8017" width="40" x="0" y="0">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset dy="1" />
              <feGaussianBlur stdDeviation="1" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0" />
              <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_5_8017" />
              <feBlend in="SourceGraphic" in2="effect1_dropShadow_5_8017" mode="normal" result="shape" />
            </filter>
          </defs>
        </svg>
      </div>
    </div>
  );
}

function Avatar() {
  return (
    <div className="relative shrink-0 size-[32px]" data-name="avatar">
      <img alt="" className="block max-w-none size-full" height="32" src={imgAvatar} width="32" />
    </div>
  );
}

function RightSideElements() {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-end relative shrink-0" data-name="Right Side Elements">
      <p className="font-['Inter:Medium',sans-serif] font-[550] leading-[16px] not-italic relative shrink-0 text-[12px] text-nowrap text-zinc-950 whitespace-pre">Temiloluwa Silva</p>
      <Avatar />
    </div>
  );
}

function Frame5() {
  return (
    <div className="box-border content-stretch flex gap-[32px] items-center px-[24px] py-0 relative shrink-0">
      <Frame1 />
      <RightSideElements />
    </div>
  );
}

function TopBar() {
  return (
    <div className="absolute bg-white content-stretch flex gap-[20px] items-center left-0 top-0 w-[1440px]" data-name="Top bar">
      <div aria-hidden="true" className="absolute border-[0px_0px_1px] border-solid border-zinc-200 bottom-[-1px] left-0 pointer-events-none right-0 top-0" />
      <AssetsStoreSwitcher />
      <div className="basis-0 flex flex-row grow items-center self-stretch shrink-0">
        <Frame4 />
      </div>
      <Frame5 />
    </div>
  );
}

export default function ProfileDevices() {
  return (
    <div className="bg-white relative size-full" data-name="Profile - Devices">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[24px] items-start pb-[64px] pt-[96px] px-[24px] relative size-full">
          <Container />
          <Container16 />
          <TopBar />
        </div>
      </div>
    </div>
  );
}