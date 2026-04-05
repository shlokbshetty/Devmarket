import svgPaths from "./svg-93qikcx2m8";
import imgUserProfile from "figma:asset/71a0ace83d9cc5c7f12edc02af08c0b4d12dbd63.png";
import imgAb6AXuBHcdgDnJx70QHXg7Mbk1Eq5K2WWs7I5J4GM8WIeodqeqQh4XMkZsmdLWz8DbYPkCz1XmIqsa6Bo1GL0X7AbQEz6YZNvJ85Uf0GGewOlph97HWLm0WDv18ZCzgytx2QRwwx562Ws0Gny92GXyXbz6EIbrK1KJQZwetvTtzmHtWhLfrMiN4Yrq3U6ViDvmOslFwgApmlWWxcyThNwidSframNeRmxrt6ZvJkZotGta3P9YFbJdTqqluAtOvvxVcsv4Mvq9UuKx9M from "figma:asset/f0e4ab6dfc10a7457c9e188954dc763933a01c87.png";
import imgAb6AXuDhlB84NvHtXkIgZgu98SvgPaJaRiUxY4Y2NDb55QAvt2U9KZt1E4LoI1RRbw02MaZezbQxpPoYjrsNvY3Jlzcc4L5EoxSrSricWHln0VPiMkcydsb0Gor2AvUusOc5VozOypL7G4W7WUrfraZdzPv437VyuLw6XjA1GMobxd5J52CVrrSwXxBmmpG2SnDmWbwo4WlxnhwYqraUr1TKmqak1QpUgzlGCflTHYsUsFUubtEy9TtR5VMsr9EMkYgU1Xdi5K4Exmxxc from "figma:asset/d3cacca709f600d55c1a9394a436ac5d764bec39.png";

function Container1({ className }: { className?: string }) {
  return (
    <div className={className || "content-stretch flex flex-col items-start relative shrink-0"} data-name="Container">
      <div className="relative shrink-0 size-[18px]" data-name="Icon">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
          <path d={svgPaths.p8a35e00} fill="var(--fill-0, #72FE8F)" id="Icon" />
        </svg>
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold h-[32px] justify-center leading-[0] relative shrink-0 text-[24px] text-white tracking-[-1.2px] w-[176px]">
        <p className="leading-[32px]">DevMarket</p>
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0" data-name="Container">
      <Container1 />
      <Container2 />
    </div>
  );
}

function UserProfile() {
  return (
    <div className="max-w-[40px] relative shrink-0 size-[40px]" data-name="User Profile">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgUserProfile} />
      </div>
    </div>
  );
}

function Background() {
  return (
    <div className="bg-[#1a1a1a] content-stretch flex flex-col items-start overflow-clip relative rounded-[12px] shrink-0 size-[40px]" data-name="Background">
      <UserProfile />
    </div>
  );
}

function NavTopAppBarShell() {
  return (
    <div className="bg-[#0e0e0e] relative shrink-0 w-full z-[3]" data-name="Nav - TopAppBar Shell">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[24px] py-[16px] relative w-full">
          <Container />
          <Background />
        </div>
      </div>
    </div>
  );
}

function Heading() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 1">
      <div className="flex flex-col font-['Plus_Jakarta_Sans:ExtraBold',sans-serif] font-extrabold justify-center leading-[0] relative shrink-0 text-[48px] text-white tracking-[-1.2px] w-full">
        <p className="leading-[48px]">Your Library</p>
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="content-stretch flex flex-col items-start max-w-[672px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#adaaaa] text-[18px] w-full">
        <p className="leading-[28px] mb-0">Curated tools, integrated environments,</p>
        <p className="leading-[28px] mb-0">and the building blocks of your next</p>
        <p className="leading-[28px]">breakthrough.</p>
      </div>
    </div>
  );
}

function HeaderSection() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full" data-name="Header Section">
      <Heading />
      <Container3 />
    </div>
  );
}

function Paragraph() {
  return (
    <div className="font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold h-[49px] relative shrink-0 text-[#72fe8f] w-full" data-name="Paragraph">
      <div className="-translate-y-1/2 absolute flex flex-col h-[48px] justify-center left-0 text-[48px] top-[24px] w-[103.16px]">
        <p className="leading-[48px]">99.9</p>
      </div>
      <div className="-translate-y-1/2 absolute flex flex-col h-[28px] justify-center left-[111.16px] text-[20px] top-[35px] w-[20.92px]">
        <p className="leading-[28px]">%</p>
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="content-stretch flex flex-col gap-[8.5px] items-start leading-[0] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Plus_Jakarta_Sans:Medium',sans-serif] font-medium h-[24px] justify-center relative shrink-0 text-[#adaaaa] text-[16px] w-[108.56px]">
        <p className="leading-[24px]">Uptime Status</p>
      </div>
      <Paragraph />
    </div>
  );
}

function Container6() {
  return (
    <div className="content-stretch flex gap-[4px] h-[8px] items-start justify-center relative shrink-0 w-full" data-name="Container">
      <div className="bg-[#72fe8f] flex-[1_0_0] h-full min-h-px min-w-px rounded-[12px]" data-name="Background" />
      <div className="bg-[#72fe8f] flex-[1_0_0] h-full min-h-px min-w-px rounded-[12px]" data-name="Background" />
      <div className="bg-[#72fe8f] flex-[1_0_0] h-full min-h-px min-w-px rounded-[12px]" data-name="Background" />
      <div className="bg-[#72fe8f] flex-[1_0_0] h-full min-h-px min-w-px rounded-[12px]" data-name="Background" />
      <div className="bg-[rgba(28,184,83,0.3)] flex-[1_0_0] h-full min-h-px min-w-px rounded-[12px]" data-name="Overlay" />
    </div>
  );
}

function Container5() {
  return (
    <div className="content-stretch flex flex-col gap-[7.5px] items-start relative shrink-0 w-full" data-name="Container">
      <Container6 />
      <div className="flex flex-col font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal h-[16px] justify-center leading-[0] relative shrink-0 text-[#adaaaa] text-[12px] tracking-[1.2px] uppercase w-[174.38px]">
        <p className="leading-[16px]">Active Services Health</p>
      </div>
    </div>
  );
}

function Margin() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[32px] relative shrink-0 w-full" data-name="Margin">
      <Container5 />
    </div>
  );
}

function QuickAccessStatCard() {
  return (
    <div className="bg-[#1a1a1a] col-1 justify-self-stretch relative rounded-[8px] row-2 self-start shrink-0" data-name="Quick Access / Stat Card">
      <div className="content-stretch flex flex-col items-start justify-between p-[32px] relative w-full">
        <Container4 />
        <Margin />
      </div>
    </div>
  );
}

function Container9() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="Container">
          <path d={svgPaths.p4c2b800} fill="var(--fill-0, #88EBFF)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container10() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold h-[16px] justify-center leading-[0] relative shrink-0 text-[#88ebff] text-[12px] tracking-[1.2px] uppercase w-[127.83px]">
        <p className="leading-[16px]">Library Insights</p>
      </div>
    </div>
  );
}

function Container8() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-name="Container">
      <Container9 />
      <Container10 />
    </div>
  );
}

function Heading1() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[8px] relative shrink-0 w-full" data-name="Heading 2">
      <div className="flex flex-col font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[36px] text-white w-full">
        <p className="leading-[40px] mb-0">24.8 GB</p>
        <p className="leading-[40px]">Optimized</p>
      </div>
    </div>
  );
}

function Container11() {
  return (
    <div className="content-stretch flex flex-col items-start max-w-[384px] pb-[16px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#adaaaa] text-[16px] w-full">
        <p className="leading-[24px] mb-0">Smart compression and shared</p>
        <p className="leading-[24px] mb-0">dependency management saved</p>
        <p className="leading-[24px] mb-0">significant storage across 14 active</p>
        <p className="leading-[24px]">projects.</p>
      </div>
    </div>
  );
}

function Button() {
  return (
    <div className="content-stretch flex items-center justify-center px-[24px] py-[12px] relative rounded-[12px] shrink-0" data-name="Button" style={{ backgroundImage: "linear-gradient(135deg, rgb(114, 254, 143) 0%, rgb(28, 184, 83) 100%)" }}>
      <div className="flex flex-col font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold h-[24px] justify-center leading-[0] relative shrink-0 text-[#005f26] text-[16px] text-center w-[128.22px]">
        <p className="leading-[24px]">Manage Storage</p>
      </div>
    </div>
  );
}

function Container7() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full" data-name="Container">
      <Container8 />
      <Heading1 />
      <Container11 />
      <Button />
    </div>
  );
}

function LibraryInsightsCard() {
  return (
    <div className="bg-[#131313] col-1 justify-self-stretch relative rounded-[8px] row-1 self-start shrink-0" data-name="Library Insights Card">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start p-[32px] relative w-full">
          <div className="absolute bg-gradient-to-l bottom-0 from-[#72fe8f] left-1/2 opacity-20 right-0 to-[rgba(114,254,143,0)] top-0 via-1/2 via-[rgba(114,254,143,0)]" data-name="Gradient" />
          <Container7 />
        </div>
      </div>
    </div>
  );
}

function InsightsBentoSection() {
  return (
    <div className="gap-x-[24px] gap-y-[24px] grid grid-cols-[repeat(1,minmax(0,1fr))] grid-rows-[__384px_209px] relative shrink-0 w-full" data-name="Insights Bento Section">
      <QuickAccessStatCard />
      <LibraryInsightsCard />
    </div>
  );
}

function Heading2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Heading 3">
      <div className="flex flex-col font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold h-[32px] justify-center leading-[0] relative shrink-0 text-[24px] text-white w-[168.03px]">
        <p className="leading-[32px]">Recently Used</p>
      </div>
    </div>
  );
}

function Link() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Link">
      <div className="flex flex-col font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold h-[20px] justify-center leading-[0] relative shrink-0 text-[#72fe8f] text-[14px] w-[105.5px]">
        <p className="leading-[20px]">View All History</p>
      </div>
    </div>
  );
}

function Container12() {
  return (
    <div className="content-stretch flex items-end justify-between relative shrink-0 w-full" data-name="Container">
      <Heading2 />
      <Link />
    </div>
  );
}

function Ab6AXuBHcdgDnJx70QHXg7Mbk1Eq5K2WWs7I5J4GM8WIeodqeqQh4XMkZsmdLWz8DbYPkCz1XmIqsa6Bo1GL0X7AbQEz6YZNvJ85Uf0GGewOlph97HWLm0WDv18ZCzgytx2QRwwx562Ws0Gny92GXyXbz6EIbrK1KJQZwetvTtzmHtWhLfrMiN4Yrq3U6ViDvmOslFwgApmlWWxcyThNwidSframNeRmxrt6ZvJkZotGta3P9YFbJdTqqluAtOvvxVcsv4Mvq9UuKx9M() {
  return (
    <div className="h-[342px] relative shrink-0 w-full" data-name="AB6AXuBHcdgDnJx-70qHXg7mbk1Eq5k2WWs7i5j4gM8WIeodqeqQh4xMkZsmdLWz8DbYPkCz1xmIqsa6Bo1gL0x7AbQEz6yZNvJ85UF0gGEWOlph97hWLm0wDV_18ZCzgytx2qRwwx562ws0gny92gXY_xbz6EIbrK1kJ-QZwetvTTZMHtWhLfrMiN4yrq3u6ViDVMOslFwgApmlWWxcyThNwidSFRAMNeRMXRT6ZVJkZOTGta3p9yFbJDTqqluAtOVVXVcsv4mvq9UuKx9m">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 overflow-hidden">
          <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgAb6AXuBHcdgDnJx70QHXg7Mbk1Eq5K2WWs7I5J4GM8WIeodqeqQh4XMkZsmdLWz8DbYPkCz1XmIqsa6Bo1GL0X7AbQEz6YZNvJ85Uf0GGewOlph97HWLm0WDv18ZCzgytx2QRwwx562Ws0Gny92GXyXbz6EIbrK1KJQZwetvTtzmHtWhLfrMiN4Yrq3U6ViDvmOslFwgApmlWWxcyThNwidSframNeRmxrt6ZvJkZotGta3P9YFbJdTqqluAtOvvxVcsv4Mvq9UuKx9M} />
        </div>
        <div className="absolute bg-white inset-0 mix-blend-saturation" />
      </div>
    </div>
  );
}

function Container14() {
  return (
    <div className="aspect-square content-stretch flex flex-col items-start justify-center overflow-clip relative shrink-0 w-full z-[2]" data-name="Container">
      <Ab6AXuBHcdgDnJx70QHXg7Mbk1Eq5K2WWs7I5J4GM8WIeodqeqQh4XMkZsmdLWz8DbYPkCz1XmIqsa6Bo1GL0X7AbQEz6YZNvJ85Uf0GGewOlph97HWLm0WDv18ZCzgytx2QRwwx562Ws0Gny92GXyXbz6EIbrK1KJQZwetvTtzmHtWhLfrMiN4Yrq3U6ViDvmOslFwgApmlWWxcyThNwidSframNeRmxrt6ZvJkZotGta3P9YFbJdTqqluAtOvvxVcsv4Mvq9UuKx9M />
      <div className="absolute bg-gradient-to-r from-[rgba(32,32,31,0)] inset-0 to-[#20201f]" data-name="Gradient" />
    </div>
  );
}

function Background1() {
  return (
    <div className="bg-[#2c2c2c] content-stretch flex flex-col items-start px-[8px] py-[4px] relative rounded-[2px] shrink-0" data-name="Background">
      <div className="flex flex-col font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold h-[15px] justify-center leading-[0] relative shrink-0 text-[#72fe8f] text-[10px] uppercase w-[35.7px]">
        <p className="leading-[15px]">Active</p>
      </div>
    </div>
  );
}

function Container17() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal h-[16px] justify-center leading-[0] relative shrink-0 text-[#adaaaa] text-[12px] w-[70.72px]">
        <p className="leading-[16px]">Used 2h ago</p>
      </div>
    </div>
  );
}

function Container16() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-name="Container">
      <Background1 />
      <Container17 />
    </div>
  );
}

function Margin1() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[8px] relative shrink-0 w-full" data-name="Margin">
      <Container16 />
    </div>
  );
}

function Heading3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 4">
      <div className="flex flex-col font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[30px] text-white w-full">
        <p className="leading-[36px]">Nexus IDE Pro</p>
      </div>
    </div>
  );
}

function Heading4Margin() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[8px] relative shrink-0 w-full" data-name="Heading 4:margin">
      <Heading3 />
    </div>
  );
}

function Container18() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#adaaaa] text-[14px] w-full">
        <p className="leading-[20px] mb-0">High-performance integrated</p>
        <p className="leading-[20px]">development environment with AI-drive…</p>
      </div>
    </div>
  );
}

function Margin2() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[24px] relative shrink-0 w-full" data-name="Margin">
      <Container18 />
    </div>
  );
}

function Button1() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center px-[24px] py-[10px] relative rounded-[12px] shrink-0" data-name="Button" style={{ backgroundImage: "linear-gradient(135deg, rgb(114, 254, 143) 0%, rgb(28, 184, 83) 100%)" }}>
      <div className="flex flex-col font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold h-[20px] justify-center leading-[0] relative shrink-0 text-[#005f26] text-[14px] text-center w-[49.14px]">
        <p className="leading-[20px]">Launch</p>
      </div>
    </div>
  );
}

function Container20() {
  return (
    <div className="h-[2.333px] relative shrink-0 w-[9.333px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.33333 2.33333">
        <g id="Container">
          <path d={svgPaths.p30335600} fill="var(--fill-0, white)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button2() {
  return (
    <div className="content-stretch flex items-center justify-center p-px relative rounded-[12px] shrink-0 size-[40px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#484847] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <Container20 />
    </div>
  );
}

function Container19() {
  return (
    <div className="content-stretch flex gap-[12px] items-start relative shrink-0 w-full" data-name="Container">
      <Button1 />
      <Button2 />
    </div>
  );
}

function Container15() {
  return (
    <div className="relative shrink-0 w-full z-[1]" data-name="Container">
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col items-start justify-center p-[32px] relative w-full">
          <Margin1 />
          <Heading4Margin />
          <Margin2 />
          <Container19 />
        </div>
      </div>
    </div>
  );
}

function LargeFeatureCard() {
  return (
    <div className="bg-[#20201f] col-1 content-stretch flex flex-col isolate items-start justify-self-stretch overflow-clip relative rounded-[8px] row-1 self-start shrink-0" data-name="Large Feature Card 1">
      <Container14 />
      <Container15 />
    </div>
  );
}

function Ab6AXuDhlB84NvHtXkIgZgu98SvgPaJaRiUxY4Y2NDb55QAvt2U9KZt1E4LoI1RRbw02MaZezbQxpPoYjrsNvY3Jlzcc4L5EoxSrSricWHln0VPiMkcydsb0Gor2AvUusOc5VozOypL7G4W7WUrfraZdzPv437VyuLw6XjA1GMobxd5J52CVrrSwXxBmmpG2SnDmWbwo4WlxnhwYqraUr1TKmqak1QpUgzlGCflTHYsUsFUubtEy9TtR5VMsr9EMkYgU1Xdi5K4Exmxxc() {
  return (
    <div className="h-[342px] relative shrink-0 w-full" data-name="AB6AXuDhlB84nvHTXkIGZgu98svgPaJaRiUxY4Y2nDb55QAvt2u9KZt1E4LO-i1rRbw0-2MaZEZBQxpPoYjrsNvY3jlzcc4L5EoxSrSricWHln0vPiMKCYDSB0Gor2AvUusOC5vozOypL7g4w7WUrfraZDZPv437vyuLW6xjA1GMobxd5J52CVrrSwXxBmmpG2SNDmWBWO4WlxnhwYQRAUr1tKMQAK1qpUgzlGCflT-hYSUsFUubtEy9TtR5vMSR9eMkYgU1xdi5K4exmxxc">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 overflow-hidden">
          <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgAb6AXuDhlB84NvHtXkIgZgu98SvgPaJaRiUxY4Y2NDb55QAvt2U9KZt1E4LoI1RRbw02MaZezbQxpPoYjrsNvY3Jlzcc4L5EoxSrSricWHln0VPiMkcydsb0Gor2AvUusOc5VozOypL7G4W7WUrfraZdzPv437VyuLw6XjA1GMobxd5J52CVrrSwXxBmmpG2SnDmWbwo4WlxnhwYqraUr1TKmqak1QpUgzlGCflTHYsUsFUubtEy9TtR5VMsr9EMkYgU1Xdi5K4Exmxxc} />
        </div>
        <div className="absolute bg-white inset-0 mix-blend-saturation" />
      </div>
    </div>
  );
}

function Container21() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center overflow-clip relative shrink-0 w-full z-[2]" data-name="Container">
      <Ab6AXuDhlB84NvHtXkIgZgu98SvgPaJaRiUxY4Y2NDb55QAvt2U9KZt1E4LoI1RRbw02MaZezbQxpPoYjrsNvY3Jlzcc4L5EoxSrSricWHln0VPiMkcydsb0Gor2AvUusOc5VozOypL7G4W7WUrfraZdzPv437VyuLw6XjA1GMobxd5J52CVrrSwXxBmmpG2SnDmWbwo4WlxnhwYqraUr1TKmqak1QpUgzlGCflTHYsUsFUubtEy9TtR5VMsr9EMkYgU1Xdi5K4Exmxxc />
      <div className="absolute bg-gradient-to-r from-[rgba(32,32,31,0)] inset-0 to-[#20201f]" data-name="Gradient" />
    </div>
  );
}

function Background2() {
  return (
    <div className="bg-[#2c2c2c] content-stretch flex flex-col items-start px-[8px] py-[4px] relative rounded-[2px] shrink-0" data-name="Background">
      <div className="flex flex-col font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold h-[15px] justify-center leading-[0] relative shrink-0 text-[#88ebff] text-[10px] uppercase w-[36.34px]">
        <p className="leading-[15px]">Cloud</p>
      </div>
    </div>
  );
}

function Container24() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal h-[16px] justify-center leading-[0] relative shrink-0 text-[#adaaaa] text-[12px] w-[88.89px]">
        <p className="leading-[16px]">Used yesterday</p>
      </div>
    </div>
  );
}

function Container23() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-name="Container">
      <Background2 />
      <Container24 />
    </div>
  );
}

function Margin3() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[8px] relative shrink-0 w-full" data-name="Margin">
      <Container23 />
    </div>
  );
}

function Heading4() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 4">
      <div className="flex flex-col font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[30px] text-white w-full">
        <p className="leading-[36px]">SynthDeploy</p>
      </div>
    </div>
  );
}

function Heading4Margin1() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[8px] relative shrink-0 w-full" data-name="Heading 4:margin">
      <Heading4 />
    </div>
  );
}

function Container25() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#adaaaa] text-[14px] w-full">
        <p className="leading-[20px] mb-0">Automated pipeline orchestration for</p>
        <p className="leading-[20px]">distributed microservices and…</p>
      </div>
    </div>
  );
}

function Margin4() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[24px] relative shrink-0 w-full" data-name="Margin">
      <Container25 />
    </div>
  );
}

function Button3() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center px-[24px] py-[10px] relative rounded-[12px] shrink-0" data-name="Button" style={{ backgroundImage: "linear-gradient(135deg, rgb(114, 254, 143) 0%, rgb(28, 184, 83) 100%)" }}>
      <div className="flex flex-col font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold h-[20px] justify-center leading-[0] relative shrink-0 text-[#005f26] text-[14px] text-center w-[49.14px]">
        <p className="leading-[20px]">Launch</p>
      </div>
    </div>
  );
}

function Container27() {
  return (
    <div className="h-[2.333px] relative shrink-0 w-[9.333px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.33333 2.33333">
        <g id="Container">
          <path d={svgPaths.p30335600} fill="var(--fill-0, white)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button4() {
  return (
    <div className="content-stretch flex items-center justify-center p-px relative rounded-[12px] shrink-0 size-[40px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#484847] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <Container27 />
    </div>
  );
}

function Container26() {
  return (
    <div className="content-stretch flex gap-[12px] items-start relative shrink-0 w-full" data-name="Container">
      <Button3 />
      <Button4 />
    </div>
  );
}

function Container22() {
  return (
    <div className="relative shrink-0 w-full z-[1]" data-name="Container">
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col items-start justify-center p-[32px] relative w-full">
          <Margin3 />
          <Heading4Margin1 />
          <Margin4 />
          <Container26 />
        </div>
      </div>
    </div>
  );
}

function LargeFeatureCard1() {
  return (
    <div className="bg-[#20201f] col-1 content-stretch flex flex-col isolate items-start justify-self-stretch overflow-clip relative rounded-[8px] row-2 self-start shrink-0" data-name="Large Feature Card 2">
      <Container21 />
      <Container22 />
    </div>
  );
}

function Container13() {
  return (
    <div className="gap-x-[32px] gap-y-[32px] grid grid-cols-[repeat(1,minmax(0,1fr))] grid-rows-[__585px_585px] relative shrink-0 w-full" data-name="Container">
      <LargeFeatureCard />
      <LargeFeatureCard1 />
    </div>
  );
}

function RecentlyUsedSection() {
  return (
    <div className="content-stretch flex flex-col gap-[32px] items-start pt-[16px] relative shrink-0 w-full" data-name="Recently Used Section">
      <Container12 />
      <Container13 />
    </div>
  );
}

function Button5() {
  return (
    <div className="relative shrink-0" data-name="Button">
      <div aria-hidden="true" className="absolute border-[#72fe8f] border-b-2 border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center justify-center pb-[18px] relative">
        <div className="flex flex-col font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold h-[24px] justify-center leading-[0] relative shrink-0 text-[#72fe8f] text-[16px] text-center w-[63.44px]">
          <p className="leading-[24px]">All Apps</p>
        </div>
      </div>
    </div>
  );
}

function Button6() {
  return (
    <div className="relative shrink-0" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center justify-center pb-[16px] relative">
        <div className="flex flex-col font-['Plus_Jakarta_Sans:Medium',sans-serif] font-medium h-[24px] justify-center leading-[0] relative shrink-0 text-[#adaaaa] text-[16px] text-center w-[40.14px]">
          <p className="leading-[24px]">Tools</p>
        </div>
      </div>
    </div>
  );
}

function Button7() {
  return (
    <div className="relative shrink-0" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center justify-center pb-[16px] relative">
        <div className="flex flex-col font-['Plus_Jakarta_Sans:Medium',sans-serif] font-medium h-[24px] justify-center leading-[0] relative shrink-0 text-[#adaaaa] text-[16px] text-center w-[55.19px]">
          <p className="leading-[24px]">Plugins</p>
        </div>
      </div>
    </div>
  );
}

function Button8() {
  return (
    <div className="relative shrink-0" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center justify-center pb-[16px] relative">
        <div className="flex flex-col font-['Plus_Jakarta_Sans:Medium',sans-serif] font-medium h-[24px] justify-center leading-[0] relative shrink-0 text-[#adaaaa] text-[16px] text-center w-[51.45px]">
          <p className="leading-[24px]">Assets</p>
        </div>
      </div>
    </div>
  );
}

function HorizontalBorder() {
  return (
    <div className="content-stretch flex gap-[32px] items-center pb-px relative shrink-0 w-full" data-name="HorizontalBorder">
      <div aria-hidden="true" className="absolute border-[#1a1a1a] border-b border-solid inset-0 pointer-events-none" />
      <Button5 />
      <Button6 />
      <Button7 />
      <Button8 />
    </div>
  );
}

function Container30() {
  return (
    <div className="h-[16px] relative shrink-0 w-[20px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 16">
        <g id="Container">
          <path d={svgPaths.p18c14180} fill="var(--fill-0, #72FE8F)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Background3() {
  return (
    <div className="bg-[#20201f] content-stretch flex h-[48px] items-center justify-center relative rounded-[4px] shrink-0 w-[25.83px]" data-name="Background">
      <Container30 />
    </div>
  );
}

function Container29() {
  return (
    <div className="col-1 content-stretch flex h-[48px] items-center justify-center justify-self-stretch relative row-1 self-center shrink-0" data-name="Container">
      <Background3 />
    </div>
  );
}

function Heading5() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 5">
      <div className="flex flex-col font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[16px] text-white w-full">
        <p className="leading-[24px] mb-0">Terminus</p>
        <p className="leading-[24px]">Shell</p>
      </div>
    </div>
  );
}

function Container32() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#adaaaa] text-[12px] w-full">
        <p className="leading-[16px] mb-0">Version 4.2.0 •</p>
        <p className="leading-[16px]">Pro License</p>
      </div>
    </div>
  );
}

function Container31() {
  return (
    <div className="col-[2/span_5] justify-self-stretch relative row-1 self-center shrink-0" data-name="Container">
      <div className="content-stretch flex flex-col items-start px-[16px] relative w-full">
        <Heading5 />
        <Container32 />
      </div>
    </div>
  );
}

function Container33() {
  return (
    <div className="col-[7/span_3] content-stretch flex flex-col items-start justify-self-stretch relative row-1 self-center shrink-0" data-name="Container">
      <div className="flex flex-col font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal h-[40px] justify-center leading-[0] relative shrink-0 text-[#adaaaa] text-[14px] w-[72.8px]">
        <p className="leading-[20px] mb-0">Installed 14</p>
        <p className="leading-[20px]">days ago</p>
      </div>
    </div>
  );
}

function Container34() {
  return (
    <div className="col-[10/span_2] content-stretch flex flex-col items-end justify-self-stretch relative row-1 self-center shrink-0" data-name="Container">
      <div className="flex flex-col font-['Liberation_Mono:Regular',sans-serif] h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#adaaaa] text-[12px] text-right w-[43.22px]">
        <p className="leading-[16px]">420 MB</p>
      </div>
    </div>
  );
}

function Container36() {
  return (
    <div className="h-[14px] relative shrink-0 w-[11px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11 14">
        <g id="Container">
          <path d="M0 14V0L11 7L0 14V14" fill="var(--fill-0, #72FE8F)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button9() {
  return (
    <div className="absolute content-stretch flex flex-col items-center justify-center p-[8px] right-[-0.01px] rounded-[12px] top-0" data-name="Button">
      <Container36 />
    </div>
  );
}

function Container35() {
  return (
    <div className="col-12 h-[40px] justify-self-stretch opacity-0 relative row-1 self-center shrink-0" data-name="Container">
      <Button9 />
    </div>
  );
}

function ListItem() {
  return (
    <div className="relative rounded-[8px] shrink-0 w-full" data-name="List Item 1">
      <div className="grid grid-cols-[repeat(12,minmax(0,1fr))] grid-rows-[_80px] p-[16px] relative w-full">
        <Container29 />
        <Container31 />
        <Container33 />
        <Container34 />
        <Container35 />
      </div>
    </div>
  );
}

function Container38() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="Container">
          <path d={svgPaths.p254c2600} fill="var(--fill-0, #88EBFF)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Background4() {
  return (
    <div className="bg-[#20201f] content-stretch flex h-[48px] items-center justify-center relative rounded-[4px] shrink-0 w-[25.83px]" data-name="Background">
      <Container38 />
    </div>
  );
}

function Container37() {
  return (
    <div className="col-1 content-stretch flex h-[48px] items-center justify-center justify-self-stretch relative row-1 self-center shrink-0" data-name="Container">
      <Background4 />
    </div>
  );
}

function Heading6() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 5">
      <div className="flex flex-col font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[16px] text-white w-full">
        <p className="leading-[24px] mb-0">Prisma</p>
        <p className="leading-[24px]">Visualizer</p>
      </div>
    </div>
  );
}

function Container40() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#adaaaa] text-[12px] w-full">
        <p className="leading-[16px] mb-0">Version 1.0.8 •</p>
        <p className="leading-[16px]">Community</p>
      </div>
    </div>
  );
}

function Container39() {
  return (
    <div className="col-[2/span_5] justify-self-stretch relative row-1 self-center shrink-0" data-name="Container">
      <div className="content-stretch flex flex-col items-start px-[16px] relative w-full">
        <Heading6 />
        <Container40 />
      </div>
    </div>
  );
}

function Container41() {
  return (
    <div className="col-[7/span_3] content-stretch flex flex-col items-start justify-self-stretch relative row-1 self-center shrink-0" data-name="Container">
      <div className="flex flex-col font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal h-[40px] justify-center leading-[0] relative shrink-0 text-[#adaaaa] text-[14px] w-[66.45px]">
        <p className="leading-[20px] mb-0">Updated</p>
        <p className="leading-[20px]">yesterday</p>
      </div>
    </div>
  );
}

function Container42() {
  return (
    <div className="col-[10/span_2] content-stretch flex flex-col items-end justify-self-stretch relative row-1 self-center shrink-0" data-name="Container">
      <div className="flex flex-col font-['Liberation_Mono:Regular',sans-serif] h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#adaaaa] text-[12px] text-right w-[43.22px]">
        <p className="leading-[16px]">1.2 GB</p>
      </div>
    </div>
  );
}

function Container44() {
  return (
    <div className="h-[14px] relative shrink-0 w-[11px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11 14">
        <g id="Container">
          <path d="M0 14V0L11 7L0 14V14" fill="var(--fill-0, #72FE8F)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button10() {
  return (
    <div className="absolute content-stretch flex flex-col items-center justify-center p-[8px] right-[-0.01px] rounded-[12px] top-0" data-name="Button">
      <Container44 />
    </div>
  );
}

function Container43() {
  return (
    <div className="col-12 h-[40px] justify-self-stretch opacity-0 relative row-1 self-center shrink-0" data-name="Container">
      <Button10 />
    </div>
  );
}

function ListItem1() {
  return (
    <div className="relative rounded-[8px] shrink-0 w-full" data-name="List Item 2">
      <div className="grid grid-cols-[repeat(12,minmax(0,1fr))] grid-rows-[_80px] p-[16px] relative w-full">
        <Container37 />
        <Container39 />
        <Container41 />
        <Container42 />
        <Container43 />
      </div>
    </div>
  );
}

function Container46() {
  return (
    <div className="relative shrink-0 size-[22px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 22">
        <g id="Container">
          <path d={svgPaths.p388e0500} fill="var(--fill-0, #7CFBB5)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Background5() {
  return (
    <div className="bg-[#20201f] content-stretch flex h-[48px] items-center justify-center relative rounded-[4px] shrink-0 w-[25.83px]" data-name="Background">
      <Container46 />
    </div>
  );
}

function Container45() {
  return (
    <div className="col-1 content-stretch flex h-[48px] items-center justify-center justify-self-stretch relative row-1 self-center shrink-0" data-name="Container">
      <Background5 />
    </div>
  );
}

function Heading7() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 5">
      <div className="flex flex-col font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[16px] text-white w-full">
        <p className="leading-[24px] mb-0">API Mock-</p>
        <p className="leading-[24px]">Up Studio</p>
      </div>
    </div>
  );
}

function Container48() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#adaaaa] text-[12px] w-full">
        <p className="leading-[16px] mb-0">Version 2.3.1 •</p>
        <p className="leading-[16px]">Pro License</p>
      </div>
    </div>
  );
}

function Container47() {
  return (
    <div className="col-[2/span_5] justify-self-stretch relative row-1 self-center shrink-0" data-name="Container">
      <div className="content-stretch flex flex-col items-start px-[16px] relative w-full">
        <Heading7 />
        <Container48 />
      </div>
    </div>
  );
}

function Container49() {
  return (
    <div className="col-[7/span_3] content-stretch flex flex-col items-start justify-self-stretch relative row-1 self-center shrink-0" data-name="Container">
      <div className="flex flex-col font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal h-[60px] justify-center leading-[0] relative shrink-0 text-[#adaaaa] text-[14px] w-[67.17px]">
        <p className="leading-[20px] mb-0">Installed 2</p>
        <p className="leading-[20px] mb-0">months</p>
        <p className="leading-[20px]">ago</p>
      </div>
    </div>
  );
}

function Container50() {
  return (
    <div className="col-[10/span_2] content-stretch flex flex-col items-end justify-self-stretch relative row-1 self-center shrink-0" data-name="Container">
      <div className="flex flex-col font-['Liberation_Mono:Regular',sans-serif] h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#adaaaa] text-[12px] text-right w-[36.02px]">
        <p className="leading-[16px]">85 MB</p>
      </div>
    </div>
  );
}

function Container52() {
  return (
    <div className="h-[14px] relative shrink-0 w-[11px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11 14">
        <g id="Container">
          <path d="M0 14V0L11 7L0 14V14" fill="var(--fill-0, #72FE8F)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button11() {
  return (
    <div className="absolute content-stretch flex flex-col items-center justify-center p-[8px] right-[-0.01px] rounded-[12px] top-0" data-name="Button">
      <Container52 />
    </div>
  );
}

function Container51() {
  return (
    <div className="col-12 h-[40px] justify-self-stretch opacity-0 relative row-1 self-center shrink-0" data-name="Container">
      <Button11 />
    </div>
  );
}

function ListItem2() {
  return (
    <div className="relative rounded-[8px] shrink-0 w-full" data-name="List Item 3">
      <div className="grid grid-cols-[repeat(12,minmax(0,1fr))] grid-rows-[_80px] p-[16px] relative w-full">
        <Container45 />
        <Container47 />
        <Container49 />
        <Container50 />
        <Container51 />
      </div>
    </div>
  );
}

function Container54() {
  return (
    <div className="relative shrink-0 size-[22px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 22">
        <g id="Container">
          <path d={svgPaths.p11c2d500} fill="var(--fill-0, #72FE8F)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Background6() {
  return (
    <div className="bg-[#20201f] content-stretch flex h-[48px] items-center justify-center relative rounded-[4px] shrink-0 w-[25.83px]" data-name="Background">
      <Container54 />
    </div>
  );
}

function Container53() {
  return (
    <div className="col-1 content-stretch flex h-[48px] items-center justify-center justify-self-stretch relative row-1 self-center shrink-0" data-name="Container">
      <Background6 />
    </div>
  );
}

function Heading8() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 5">
      <div className="flex flex-col font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[16px] text-white w-full">
        <p className="leading-[24px]">Neural Lint</p>
      </div>
    </div>
  );
}

function Container56() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#adaaaa] text-[12px] w-full">
        <p className="leading-[16px] mb-0">Version 0.9.2-</p>
        <p className="leading-[16px]">beta • Beta</p>
      </div>
    </div>
  );
}

function Container55() {
  return (
    <div className="col-[2/span_5] justify-self-stretch relative row-1 self-center shrink-0" data-name="Container">
      <div className="content-stretch flex flex-col items-start px-[16px] relative w-full">
        <Heading8 />
        <Container56 />
      </div>
    </div>
  );
}

function Container57() {
  return (
    <div className="col-[7/span_3] content-stretch flex flex-col items-start justify-self-stretch relative row-1 self-center shrink-0" data-name="Container">
      <div className="flex flex-col font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal h-[40px] justify-center leading-[0] relative shrink-0 text-[#adaaaa] text-[14px] w-[74.39px]">
        <p className="leading-[20px] mb-0">Last used 3</p>
        <p className="leading-[20px]">days ago</p>
      </div>
    </div>
  );
}

function Container58() {
  return (
    <div className="col-[10/span_2] content-stretch flex flex-col items-end justify-self-stretch relative row-1 self-center shrink-0" data-name="Container">
      <div className="flex flex-col font-['Liberation_Mono:Regular',sans-serif] h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#adaaaa] text-[12px] text-right w-[43.22px]">
        <p className="leading-[16px]">112 MB</p>
      </div>
    </div>
  );
}

function Container60() {
  return (
    <div className="h-[14px] relative shrink-0 w-[11px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11 14">
        <g id="Container">
          <path d="M0 14V0L11 7L0 14V14" fill="var(--fill-0, #72FE8F)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button12() {
  return (
    <div className="absolute content-stretch flex flex-col items-center justify-center p-[8px] right-[-0.01px] rounded-[12px] top-0" data-name="Button">
      <Container60 />
    </div>
  );
}

function Container59() {
  return (
    <div className="col-12 h-[40px] justify-self-stretch opacity-0 relative row-1 self-center shrink-0" data-name="Container">
      <Button12 />
    </div>
  );
}

function ListItem3() {
  return (
    <div className="relative rounded-[8px] shrink-0 w-full" data-name="List Item 4">
      <div className="grid grid-cols-[repeat(12,minmax(0,1fr))] grid-rows-[_56px] p-[16px] relative w-full">
        <Container53 />
        <Container55 />
        <Container57 />
        <Container58 />
        <Container59 />
      </div>
    </div>
  );
}

function Container28() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full" data-name="Container">
      <ListItem />
      <ListItem1 />
      <ListItem2 />
      <ListItem3 />
    </div>
  );
}

function SectionAllAppsToolsPluginsListView() {
  return (
    <div className="content-stretch flex flex-col gap-[32px] items-start pt-[16px] relative shrink-0 w-full" data-name="Section - All Apps, Tools, Plugins (List View)">
      <HorizontalBorder />
      <Container28 />
    </div>
  );
}

function Main() {
  return (
    <div className="max-w-[1280px] relative shrink-0 w-full z-[2]" data-name="Main">
      <div className="content-stretch flex flex-col gap-[48px] items-start max-w-[inherit] pb-[112px] pt-[32px] px-[24px] relative w-full">
        <HeaderSection />
        <InsightsBentoSection />
        <RecentlyUsedSection />
        <SectionAllAppsToolsPluginsListView />
      </div>
    </div>
  );
}

function Container61() {
  return (
    <div className="h-[18px] relative shrink-0 w-[16px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 18">
        <g id="Container">
          <path d={svgPaths.p12a32500} fill="var(--fill-0, #ADAAAA)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container62() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#adaaaa] text-[10px] text-left w-[28.245px]">
        <p className="leading-[15px]">Home</p>
      </div>
    </div>
  );
}

function Link1() {
  return (
    <button className="content-stretch cursor-pointer flex flex-col items-center justify-center opacity-60 relative" data-name="Link">
      <Container61 />
      <Container62 />
    </button>
  );
}

function Container63() {
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

function Container64() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#adaaaa] text-[10px] w-[35.67px]">
        <p className="leading-[15px]">Browse</p>
      </div>
    </div>
  );
}

function Link2() {
  return (
    <div className="-translate-y-1/2 absolute content-stretch flex flex-col items-center justify-center left-[121.92px] opacity-60 top-[calc(50%-6px)]" data-name="Link">
      <Container63 />
      <Container64 />
    </div>
  );
}

function Container65() {
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

function Container66() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#adaaaa] text-[10px] w-[53.31px]">
        <p className="leading-[15px]">Downloads</p>
      </div>
    </div>
  );
}

function Link3() {
  return (
    <div className="-translate-y-1/2 absolute content-stretch flex flex-col items-center justify-center left-[209.38px] opacity-60 top-[calc(50%-6px)]" data-name="Link">
      <Container65 />
      <Container66 />
    </div>
  );
}

function Container67() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Container">
          <path d={svgPaths.p643d217} fill="var(--fill-0, #72FE8F)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container68() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#72fe8f] text-[10px] text-left w-[33.64px]">
        <p className="leading-[15px]">Library</p>
      </div>
    </div>
  );
}

function Link4() {
  return (
    <button className="-translate-y-1/2 absolute content-stretch cursor-pointer flex flex-col items-center justify-center left-[314.47px] top-[calc(50%-6px)]" data-name="Link">
      <Container67 />
      <Container68 />
    </button>
  );
}

export default function LibraryRefined() {
  return (
    <div className="bg-[#0e0e0e] content-stretch flex flex-col gap-[17px] isolate items-start pb-[104px] relative size-full" data-name="Library - Refined">
      <NavTopAppBarShell />
      <Main />
      <div className="backdrop-blur-[20px] bg-[rgba(14,14,14,0.8)] h-[75px] relative rounded-tl-[24px] rounded-tr-[24px] shadow-[0px_-8px_30px_0px_rgba(0,0,0,0.5)] shrink-0 w-[390px] z-[1]" data-name="BottomNavBar">
        <div className="-translate-y-1/2 absolute flex h-[36.3px] items-center justify-center left-[40.48px] top-[calc(50%-6px)] w-[31.07px]" style={{ "--transform-inner-width": "1185", "--transform-inner-height": "32" } as React.CSSProperties}>
          <div className="flex-none scale-x-[110.00000000000001%] scale-y-[110.00000000000001%]">
            <Link1 />
          </div>
        </div>
        <Link2 />
        <Link3 />
        <Link4 />
      </div>
    </div>
  );
}