import svgPaths from "./svg-ilu7mp8pji";
import imgHeroBackground from "figma:asset/d78e8c668ebb6ce3342f260412602b6644731a16.png";
import imgAppIcon from "figma:asset/fc510f6091e62d3c51173e80c4e64f2c7a3b7f87.png";
import imgScreenshot1 from "figma:asset/f999d7fa86dabfad7fd2af2f99e54539f1b411b0.png";
import imgScreenshot2 from "figma:asset/3b6da3871807e2e9948e89f3f3dfdbdcd7db3bd0.png";
import imgScreenshot3 from "figma:asset/2f8fb0266651e3e9c74c7016a2cb895a8b04890d.png";
import imgAb6AXuAeyq8YD7NzNzhaRRvSdAk9LwAg8CrkBC8FePrKi3R2S0Io5XhnIs3IYtXAtaNxjYawwcBW75OzmPo9SrGbjsbSfZlnDpPYaTe1Qb3UnRmsioaWGi1GVeJctpvuWgHhicRkuSiFz3Mg58ZNi3TtOL92Bg5ELc0Vnkol4PaAkoLa7KoR74Ki4HfWbQmDpdpjClbToeaZaccjoNG5BkgOwUpW83Tz3FfatWrzW23DeBAlNq6WsIraazOyozfVZhTUpcBcX from "figma:asset/11acb89729196bcb46f2fe48ff1a59725b68f9ee.png";

function HeroBackground() {
  return (
    <div className="opacity-60 relative size-full" data-name="Hero Background">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute h-[105%] left-[-3.44%] max-w-none top-[-2.5%] w-[106.88%]" src={imgHeroBackground} />
      </div>
    </div>
  );
}

function AppIcon() {
  return (
    <div className="flex-[1_0_0] h-full min-h-px min-w-px relative" data-name="App Icon">
      <div className="absolute bg-clip-padding border-0 border-[transparent] border-solid inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgAppIcon} />
      </div>
    </div>
  );
}

function BackgroundBorderShadow() {
  return (
    <div className="bg-[#262626] relative rounded-[24px] shrink-0 size-[96px]" data-name="Background+Border+Shadow">
      <div className="content-stretch flex items-center justify-center overflow-clip p-px relative rounded-[inherit] size-full">
        <AppIcon />
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.05)] border-solid inset-0 pointer-events-none rounded-[24px] shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)]" />
    </div>
  );
}

function Heading() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 1">
      <div className="flex flex-col font-['Plus_Jakarta_Sans:ExtraBold',sans-serif] font-extrabold justify-center leading-[0] relative shrink-0 text-[36px] text-white tracking-[-1.8px] w-full">
        <p className="leading-[40px] mb-0">CodeFlow</p>
        <p className="leading-[40px]">Pro</p>
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#72fe8f] text-[14px] tracking-[0.35px] w-full">
        <p className="leading-[20px]">VIBRANT SOFTWARE CO.</p>
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-h-px min-w-px relative" data-name="Container">
      <Heading />
      <Container3 />
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex gap-[24px] items-end relative shrink-0 w-full" data-name="Container">
      <BackgroundBorderShadow />
      <Container2 />
    </div>
  );
}

function Container() {
  return (
    <div className="absolute bottom-0 content-stretch flex flex-col items-start left-0 pb-[32px] px-[24px] right-0" data-name="Container">
      <Container1 />
    </div>
  );
}

function HeroSection() {
  return (
    <div className="h-[397px] overflow-clip relative shrink-0 w-full z-[2]" data-name="Hero Section">
      <div className="absolute flex inset-[-9.92px_-9.75px_-9.93px_-9.75px] items-center justify-center">
        <div className="flex-none h-[416.85px] w-[409.5px]">
          <HeroBackground />
        </div>
      </div>
      <div className="absolute bg-gradient-to-t from-[#0e0e0e] inset-0 to-[rgba(14,14,14,0)] via-1/2 via-[rgba(14,14,14,0.4)]" data-name="Gradient" />
      <Container />
    </div>
  );
}

function Button({ className }: { className?: string }) {
  return (
    <div className={className || "content-stretch flex flex-[1_0_0] flex-col h-[56px] items-center justify-center min-h-px min-w-px pb-[14.5px] pt-[13.5px] relative rounded-[9999px] shadow-[0px_8px_30px_0px_rgba(114,254,143,0.3)]"} data-name="Button" style={{ backgroundImage: "linear-gradient(135deg, rgb(114, 254, 143) 0%, rgb(28, 184, 83) 100%)" }}>
      <div className="flex flex-col font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold h-[28px] justify-center leading-[0] relative shrink-0 text-[#002a0c] text-[18px] text-center w-[51.86px]">
        <p className="leading-[28px]">Install</p>
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="h-[18.35px] relative shrink-0 w-[20px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 18.35">
        <g id="Container">
          <path d={svgPaths.p279a9400} fill="var(--fill-0, #72FE8F)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button1() {
  return (
    <div className="bg-[#20201f] content-stretch flex items-center justify-center relative rounded-[9999px] shrink-0 size-[56px]" data-name="Button">
      <Container4 />
    </div>
  );
}

function ActionBar() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0 w-full" data-name="Action Bar">
      <Button />
      <Button1 />
    </div>
  );
}

function Container5() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#adaaaa] text-[10px] text-center tracking-[1px] uppercase w-[42.63px]">
        <p className="leading-[15px]">Rating</p>
      </div>
    </div>
  );
}

function Margin() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[4px] relative shrink-0" data-name="Margin">
      <Container5 />
    </div>
  );
}

function Container7() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[24px] justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-center text-white w-[25.83px]">
        <p className="leading-[24px]">4.9</p>
      </div>
    </div>
  );
}

function Container8() {
  return (
    <div className="h-[11.083px] relative shrink-0 w-[11.667px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.6667 11.0833">
        <g id="Container">
          <path d={svgPaths.p21398000} fill="var(--fill-0, #72FE8F)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container6() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="Container">
      <Container7 />
      <Container8 />
    </div>
  );
}

function Background() {
  return (
    <div className="bg-[#131313] col-1 justify-self-stretch relative rounded-[16px] row-1 self-start shrink-0" data-name="Background">
      <div className="flex flex-col items-center justify-center size-full">
        <div className="content-stretch flex flex-col items-center justify-center p-[16px] relative w-full">
          <Margin />
          <Container6 />
        </div>
      </div>
    </div>
  );
}

function Container9() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#adaaaa] text-[10px] text-center tracking-[1px] uppercase w-[25.41px]">
        <p className="leading-[15px]">Size</p>
      </div>
    </div>
  );
}

function Margin1() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[4px] relative shrink-0" data-name="Margin">
      <Container9 />
    </div>
  );
}

function Container10() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[24px] justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-center text-white w-[56.67px]">
        <p className="leading-[24px]">128 MB</p>
      </div>
    </div>
  );
}

function Background1() {
  return (
    <div className="bg-[#131313] col-2 justify-self-stretch relative rounded-[16px] row-1 self-start shrink-0" data-name="Background">
      <div className="flex flex-col items-center justify-center size-full">
        <div className="content-stretch flex flex-col items-center justify-center p-[16px] relative w-full">
          <Margin1 />
          <Container10 />
        </div>
      </div>
    </div>
  );
}

function Container11() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#adaaaa] text-[10px] text-center tracking-[1px] uppercase w-[23.03px]">
        <p className="leading-[15px]">Age</p>
      </div>
    </div>
  );
}

function Margin2() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[4px] relative shrink-0" data-name="Margin">
      <Container11 />
    </div>
  );
}

function Container12() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[24px] justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-center text-white w-[21.69px]">
        <p className="leading-[24px]">4+</p>
      </div>
    </div>
  );
}

function Background2() {
  return (
    <div className="bg-[#131313] col-3 justify-self-stretch relative rounded-[16px] row-1 self-start shrink-0" data-name="Background">
      <div className="flex flex-col items-center justify-center size-full">
        <div className="content-stretch flex flex-col items-center justify-center p-[16px] relative w-full">
          <Margin2 />
          <Container12 />
        </div>
      </div>
    </div>
  );
}

function QuickStatsBento() {
  return (
    <div className="gap-x-[12px] gap-y-[12px] grid grid-cols-[repeat(3,minmax(0,1fr))] grid-rows-[_75px] relative shrink-0 w-full" data-name="Quick Stats Bento">
      <Background />
      <Background1 />
      <Background2 />
    </div>
  );
}

function Heading1() {
  return (
    <div className="relative shrink-0 w-full" data-name="Heading 3">
      <div className="content-stretch flex flex-col items-start px-[4px] relative w-full">
        <div className="flex flex-col font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[20px] text-white w-full">
          <p className="leading-[28px]">Screenshots</p>
        </div>
      </div>
    </div>
  );
}

function Screenshot() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-full" data-name="Screenshot 1">
      <div className="absolute bg-clip-padding border-0 border-[transparent] border-solid inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute h-full left-[-37.06%] max-w-none top-0 w-[174.13%]" src={imgScreenshot1} />
      </div>
    </div>
  );
}

function BackgroundBorder() {
  return (
    <div className="absolute bg-[#20201f] h-[500px] left-[24px] rounded-[24px] top-0 w-[288px]" data-name="Background+Border">
      <div className="content-stretch flex flex-col items-start justify-center overflow-clip p-px relative rounded-[inherit] size-full">
        <Screenshot />
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.05)] border-solid inset-0 pointer-events-none rounded-[24px]" />
    </div>
  );
}

function Screenshot1() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-full" data-name="Screenshot 2">
      <div className="absolute bg-clip-padding border-0 border-[transparent] border-solid inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute h-full left-[-37.06%] max-w-none top-0 w-[174.13%]" src={imgScreenshot2} />
      </div>
    </div>
  );
}

function BackgroundBorder1() {
  return (
    <div className="absolute bg-[#20201f] h-[500px] left-[328px] rounded-[24px] top-0 w-[288px]" data-name="Background+Border">
      <div className="content-stretch flex flex-col items-start justify-center overflow-clip p-px relative rounded-[inherit] size-full">
        <Screenshot1 />
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.05)] border-solid inset-0 pointer-events-none rounded-[24px]" />
    </div>
  );
}

function Screenshot2() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-full" data-name="Screenshot 3">
      <div className="absolute bg-clip-padding border-0 border-[transparent] border-solid inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute h-full left-[-37.06%] max-w-none top-0 w-[174.13%]" src={imgScreenshot3} />
      </div>
    </div>
  );
}

function BackgroundBorder2() {
  return (
    <div className="absolute bg-[#20201f] h-[500px] left-[632px] rounded-[24px] top-0 w-[288px]" data-name="Background+Border">
      <div className="content-stretch flex flex-col items-start justify-center overflow-clip p-px relative rounded-[inherit] size-full">
        <Screenshot2 />
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.05)] border-solid inset-0 pointer-events-none rounded-[24px]" />
    </div>
  );
}

function Container13() {
  return (
    <div className="h-[516px] overflow-clip relative shrink-0 w-[390px]" data-name="Container">
      <BackgroundBorder />
      <BackgroundBorder1 />
      <BackgroundBorder2 />
    </div>
  );
}

function ScreenshotsHorizontalScroll() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-center relative shrink-0 w-full" data-name="Screenshots Horizontal Scroll">
      <Heading1 />
      <Container13 />
    </div>
  );
}

function Heading2() {
  return (
    <div className="relative shrink-0 w-full" data-name="Heading 3">
      <div className="content-stretch flex flex-col items-start px-[4px] relative w-full">
        <div className="flex flex-col font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[20px] text-white w-full">
          <p className="leading-[28px]">About this app</p>
        </div>
      </div>
    </div>
  );
}

function Container14() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#adaaaa] text-[14px] w-full">
        <p className="leading-[22.75px] mb-0">Experience the next evolution of mobile</p>
        <p className="leading-[22.75px] mb-0">development. CodeFlow Pro brings a full-featured</p>
        <p className="leading-[22.75px] mb-0">IDE environment to your pocket. Designed for the</p>
        <p className="leading-[22.75px] mb-0">modern developer who demands speed, precision,</p>
        <p className="leading-[22.75px] mb-0">and an aesthetic that inspires. Featuring AI-</p>
        <p className="leading-[22.75px] mb-0">powered autocomplete, Git integration, and a</p>
        <p className="leading-[22.75px]">custom-tuned neon syntax theme.</p>
      </div>
    </div>
  );
}

function Background3() {
  return (
    <div className="absolute bg-[#20201f] bottom-[36px] content-stretch flex flex-col items-start left-0 px-[16px] py-[6px] rounded-[9999px] top-[9.2px]" data-name="Background">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#72fe8f] text-[12px] w-[70.5px]">
        <p className="leading-[16px]">Productivity</p>
      </div>
    </div>
  );
}

function Background4() {
  return (
    <div className="absolute bg-[#20201f] bottom-[36px] content-stretch flex flex-col items-start left-[110.5px] px-[16px] py-[6px] rounded-[9999px] top-[9.2px]" data-name="Background">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#72fe8f] text-[12px] w-[93.61px]">
        <p className="leading-[16px]">Developer Tools</p>
      </div>
    </div>
  );
}

function Background5() {
  return (
    <div className="absolute bg-[#20201f] bottom-0 content-stretch flex flex-col items-start left-0 px-[16px] py-[6px] rounded-[9999px] top-[45.2px]" data-name="Background">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#72fe8f] text-[12px] w-[65.94px]">
        <p className="leading-[16px]">AI Powered</p>
      </div>
    </div>
  );
}

function Container15() {
  return (
    <div className="h-[73.2px] relative shrink-0 w-full" data-name="Container">
      <Background3 />
      <Background4 />
      <Background5 />
    </div>
  );
}

function DescriptionSection() {
  return (
    <div className="content-stretch flex flex-col gap-[14.8px] items-start relative shrink-0 w-full" data-name="Description Section">
      <Heading2 />
      <Container14 />
      <Container15 />
    </div>
  );
}

function Paragraph() {
  return (
    <div className="content-stretch flex flex-col font-['Inter:Regular',sans-serif] font-normal gap-[2.5px] items-start leading-[0] not-italic relative shrink-0" data-name="Paragraph">
      <div className="flex flex-col h-[15px] justify-center relative shrink-0 text-[#adaaaa] text-[10px] tracking-[1px] uppercase w-[57.39px]">
        <p className="leading-[15px]">Provider</p>
      </div>
      <div className="flex flex-col h-[24px] justify-center relative shrink-0 text-[16px] text-white w-[230.91px]">
        <p className="leading-[24px]">Vibrant Software Systems Inc.</p>
      </div>
    </div>
  );
}

function Container17() {
  return (
    <div className="h-[12px] relative shrink-0 w-[7.4px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7.4 12">
        <g id="Container" opacity="0.4">
          <path d={svgPaths.p28c84800} fill="var(--fill-0, #ADAAAA)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container16() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Paragraph />
      <Container17 />
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="content-stretch flex flex-col font-['Inter:Regular',sans-serif] font-normal gap-[2.5px] items-start leading-[0] not-italic relative shrink-0" data-name="Paragraph">
      <div className="flex flex-col h-[15px] justify-center relative shrink-0 text-[#adaaaa] text-[10px] tracking-[1px] uppercase w-[88.84px]">
        <p className="leading-[15px]">Compatibility</p>
      </div>
      <div className="flex flex-col h-[24px] justify-center relative shrink-0 text-[16px] text-white w-[159.58px]">
        <p className="leading-[24px]">Works on this device</p>
      </div>
    </div>
  );
}

function Container19() {
  return (
    <div className="h-[12px] relative shrink-0 w-[7.4px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7.4 12">
        <g id="Container" opacity="0.4">
          <path d={svgPaths.p28c84800} fill="var(--fill-0, #ADAAAA)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container18() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Paragraph1 />
      <Container19 />
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="content-stretch flex flex-col font-['Inter:Regular',sans-serif] font-normal gap-[2.5px] items-start leading-[0] not-italic relative shrink-0" data-name="Paragraph">
      <div className="flex flex-col h-[15px] justify-center relative shrink-0 text-[#adaaaa] text-[10px] tracking-[1px] uppercase w-[49.38px]">
        <p className="leading-[15px]">Privacy</p>
      </div>
      <div className="flex flex-col h-[24px] justify-center relative shrink-0 text-[16px] text-white w-[143.66px]">
        <p className="leading-[24px]">Data Not Collected</p>
      </div>
    </div>
  );
}

function Container21() {
  return (
    <div className="h-[12px] relative shrink-0 w-[7.4px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7.4 12">
        <g id="Container" opacity="0.4">
          <path d={svgPaths.p28c84800} fill="var(--fill-0, #ADAAAA)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container20() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Paragraph2 />
      <Container21 />
    </div>
  );
}

function InfoListSectionNoLinesRule() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start pt-[16px] relative shrink-0 w-full" data-name="Info List Section (No Lines Rule)">
      <Container16 />
      <Container18 />
      <Container20 />
    </div>
  );
}

function ContentArea() {
  return (
    <div className="relative shrink-0 w-full z-[1]" data-name="Content Area">
      <div className="content-stretch flex flex-col gap-[40px] items-start px-[24px] relative w-full">
        <ActionBar />
        <QuickStatsBento />
        <ScreenshotsHorizontalScroll />
        <DescriptionSection />
        <InfoListSectionNoLinesRule />
      </div>
    </div>
  );
}

function Main() {
  return (
    <div className="content-stretch flex flex-col isolate items-start pb-[128px] relative shrink-0 w-full" data-name="Main">
      <HeroSection />
      <ContentArea />
    </div>
  );
}

function Container23({ className }: { className?: string }) {
  return (
    <div className={className || "content-stretch flex flex-col items-start relative shrink-0"} data-name="Container">
      <div className="relative shrink-0 size-[16px]" data-name="Icon">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
          <path d={svgPaths.p300a1100} fill="var(--fill-0, #72FE8F)" id="Icon" />
        </svg>
      </div>
    </div>
  );
}

function Container24() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold h-[28px] justify-center leading-[0] relative shrink-0 text-[20px] text-white tracking-[-0.5px] w-[106.39px]">
        <p className="leading-[28px]">App Details</p>
      </div>
    </div>
  );
}

function Container22() {
  return (
    <div className="-translate-y-1/2 absolute content-stretch flex gap-[12px] items-center left-[24px] top-1/2" data-name="Container">
      <Container23 />
      <Container24 />
    </div>
  );
}

function Icon({ className }: { className?: string }) {
  return (
    <div className={className || "h-[20px] relative shrink-0 w-[18px]"} data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 20">
        <path d={svgPaths.p2b729200} fill="var(--fill-0, #ADAAAA)" id="Icon" />
      </svg>
    </div>
  );
}

function Container25() {
  return (
    <div className="absolute content-stretch flex items-center left-[290px] top-[22px]" data-name="Container">
      <Icon />
    </div>
  );
}

function Ab6AXuAeyq8YD7NzNzhaRRvSdAk9LwAg8CrkBC8FePrKi3R2S0Io5XhnIs3IYtXAtaNxjYawwcBW75OzmPo9SrGbjsbSfZlnDpPYaTe1Qb3UnRmsioaWGi1GVeJctpvuWgHhicRkuSiFz3Mg58ZNi3TtOL92Bg5ELc0Vnkol4PaAkoLa7KoR74Ki4HfWbQmDpdpjClbToeaZaccjoNG5BkgOwUpW83Tz3FfatWrzW23DeBAlNq6WsIraazOyozfVZhTUpcBcX() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-full" data-name="AB6AXuAEYQ8y-d7nzNzhaRRvSdAk9LwAG8CrkB-C8FEPrKI3R2S0IO5XHNIs3IYtXAtaNxjYawwcB_w75OzmPO9srGBJSB_SFZlnDpP_YATe1qb3unRmsioaW-Gi1GVeJctpvuWg-hhicRkuSIFz3mg58ZNi3TtO_l92BG-5ELc0Vnkol4paAkoLA_7KoR74KI4hfWbQmDpdpjClbTOEAZaccjo_nG5BKGOwUpW83tz3ffatWrzW23DeBAlNq6WsIraazOyozfVZhTUpcBcX">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgAb6AXuAeyq8YD7NzNzhaRRvSdAk9LwAg8CrkBC8FePrKi3R2S0Io5XhnIs3IYtXAtaNxjYawwcBW75OzmPo9SrGbjsbSfZlnDpPYaTe1Qb3UnRmsioaWGi1GVeJctpvuWgHhicRkuSiFz3Mg58ZNi3TtOL92Bg5ELc0Vnkol4PaAkoLa7KoR74Ki4HfWbQmDpdpjClbToeaZaccjoNG5BkgOwUpW83Tz3FfatWrzW23DeBAlNq6WsIraazOyozfVZhTUpcBcX} />
      </div>
    </div>
  );
}

function Background6() {
  return (
    <div className="absolute bg-[#262626] content-stretch flex flex-col items-start justify-center left-[333px] overflow-clip rounded-[9999px] size-[32px] top-[14px]" data-name="Background">
      <Ab6AXuAeyq8YD7NzNzhaRRvSdAk9LwAg8CrkBC8FePrKi3R2S0Io5XhnIs3IYtXAtaNxjYawwcBW75OzmPo9SrGbjsbSfZlnDpPYaTe1Qb3UnRmsioaWGi1GVeJctpvuWgHhicRkuSiFz3Mg58ZNi3TtOL92Bg5ELc0Vnkol4PaAkoLa7KoR74Ki4HfWbQmDpdpjClbToeaZaccjoNG5BkgOwUpW83Tz3FfatWrzW23DeBAlNq6WsIraazOyozfVZhTUpcBcX />
    </div>
  );
}

function HeaderBackgroundContentSimulatedAppDetailsPage() {
  return (
    <div className="absolute backdrop-blur-[12px] bg-[rgba(14,14,14,0.8)] h-[64px] left-0 shadow-[0px_0px_40px_0px_rgba(114,254,143,0.08)] top-0 w-[390px]" data-name="Header - Background Content (Simulated App Details Page)">
      <Container22 />
      <Container25 />
      <Background6 />
    </div>
  );
}

function HeaderTopAppBarNavigationShell() {
  return (
    <div className="absolute backdrop-blur-[10px] bg-[rgba(14,14,14,0.8)] content-stretch flex flex-col h-[64px] items-start left-0 opacity-95 shadow-[0px_0px_40px_0px_rgba(114,254,143,0.08)] top-0 w-[390px]" data-name="Header - TopAppBar Navigation Shell">
      <HeaderBackgroundContentSimulatedAppDetailsPage />
    </div>
  );
}

function Container26() {
  return (
    <div className="h-[18px] relative shrink-0 w-[16px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 18">
        <g id="Container">
          <path d={svgPaths.p12a32500} fill="var(--fill-0, #72FE8F)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container27() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#72fe8f] text-[10px] text-left w-[28.245px]">
        <p className="leading-[15px]">Home</p>
      </div>
    </div>
  );
}

function Link() {
  return (
    <button className="content-stretch cursor-pointer flex flex-col items-center justify-center relative" data-name="Link">
      <Container26 />
      <Container27 />
    </button>
  );
}

function Container28() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Container">
          <path d={svgPaths.p176f0bb4} fill="var(--fill-0, #ADAAAA)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container29() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#adaaaa] text-[10px] w-[35.67px]">
        <p className="leading-[15px]">Browse</p>
      </div>
    </div>
  );
}

function Link1() {
  return (
    <div className="-translate-y-1/2 absolute content-stretch flex flex-col items-center justify-center left-[121.92px] opacity-60 top-[calc(50%-6px)]" data-name="Link">
      <Container28 />
      <Container29 />
    </div>
  );
}

function Container30() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Container">
          <path d={svgPaths.p3a031300} fill="var(--fill-0, #ADAAAA)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container31() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#adaaaa] text-[10px] w-[53.31px]">
        <p className="leading-[15px]">Downloads</p>
      </div>
    </div>
  );
}

function Link2() {
  return (
    <div className="-translate-y-1/2 absolute content-stretch flex flex-col items-center justify-center left-[209.38px] opacity-60 top-[calc(50%-6px)]" data-name="Link">
      <Container30 />
      <Container31 />
    </div>
  );
}

function Container32() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Container">
          <path d={svgPaths.p643d217} fill="var(--fill-0, #ADAAAA)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container33() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#adaaaa] text-[10px] w-[33.64px]">
        <p className="leading-[15px]">Library</p>
      </div>
    </div>
  );
}

function Link3() {
  return (
    <div className="-translate-y-1/2 absolute content-stretch flex flex-col items-center justify-center left-[314.47px] opacity-60 top-[calc(50%-6px)]" data-name="Link">
      <Container32 />
      <Container33 />
    </div>
  );
}

export default function AppDetailsV() {
  return (
    <div className="bg-[#0e0e0e] content-stretch flex flex-col items-start relative size-full" data-name="App Details - V1">
      <Main />
      <HeaderTopAppBarNavigationShell />
      <div className="backdrop-blur-[20px] bg-[rgba(14,14,14,0.8)] h-[75px] relative rounded-tl-[24px] rounded-tr-[24px] shadow-[0px_-8px_30px_0px_rgba(0,0,0,0.5)] shrink-0 w-[390px]" data-name="BottomNavBar">
        <div className="-translate-y-1/2 absolute flex h-[36.3px] items-center justify-center left-[40.48px] top-[calc(50%-6px)] w-[31.07px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "32" } as React.CSSProperties}>
          <div className="flex-none scale-x-[110.00000000000001%] scale-y-[110.00000000000001%]">
            <Link />
          </div>
        </div>
        <Link1 />
        <Link2 />
        <Link3 />
      </div>
    </div>
  );
}