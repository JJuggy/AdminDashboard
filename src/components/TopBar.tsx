import svgPaths from "../imports/svg-vdxskqbkt5";
import imgAvatar from "figma:asset/a36983dad1d91b1a9851b361814e44f9a6ebfc9a.png";

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

function Avatar() {
  return (
    <div className="relative shrink-0 size-[32px]" data-name="avatar">
      <img alt="" className="block max-w-none size-full" height="32" src={imgAvatar} width="32" />
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

export function TopBar() {
  return (
    <div className="fixed top-0 left-0 right-0 z-10 bg-white content-stretch flex gap-[20px] items-center h-[56px]" data-name="Top bar">
      <div aria-hidden="true" className="absolute border-[0px_0px_1px] border-solid border-zinc-200 bottom-[-1px] left-0 pointer-events-none right-0 top-0" />
      
      <div className="box-border content-stretch flex flex-col gap-[10px] h-[56px] items-start justify-center overflow-clip px-[24px] py-[10px] relative shrink-0 w-[252px]">
        <Logo />
      </div>

      <div className="basis-0 flex flex-row grow items-center self-stretch shrink-0">
        <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" />
      </div>

      <div className="box-border content-stretch flex gap-[32px] items-center px-[24px] py-0 relative shrink-0">
        <Frame1 />
        <div className="content-stretch flex gap-[8px] items-center justify-end relative shrink-0">
          <p className="font-['Inter:Medium',sans-serif] font-[550] leading-[16px] not-italic relative shrink-0 text-[12px] text-nowrap text-zinc-950 whitespace-pre">Admin User</p>
          <Avatar />
        </div>
      </div>
    </div>
  );
}
