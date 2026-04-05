export default function Frame() {
  return (
    <div className="relative size-full">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 390 884">
        <g id="Frame 1">
          <foreignObject height="892" width="398" x="-4" y="-4">
            <div style={{ backdropFilter: "blur(2px)", clipPath: "url(#bgblur_0_1_1169_clip_path)", height: "100%", width: "100%" }} xmlns="http://www.w3.org/1999/xhtml" />
          </foreignObject>
          <path d="M0 0H390V884H0V0Z" data-figma-bg-blur-radius="4" fill="var(--fill-0, black)" fillOpacity="0.6" id="Modal Backdrop" />
        </g>
        <defs>
          <clipPath id="bgblur_0_1_1169_clip_path" transform="translate(4 4)">
            <path d="M0 0H390V884H0V0Z" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}