import { LOGO } from "../assets";

export function LogoBlack() {
  return (
    <div
      className="relative h-[70px] md:h-[86px] xl:h-[101px] overflow-hidden shrink-0"
      style={{ aspectRatio: "56/92" }}
    >
      <div className="absolute inset-[39.3%_22.44%_27.27%_21.8%]">
        <img alt="" className="absolute inset-0 size-full max-w-none" src={LOGO.lCross} />
      </div>
      <div className="absolute inset-[0.01%_0.04%_-0.01%_-0.03%]">
        <img alt="" className="absolute inset-0 size-full max-w-none" src={LOGO.lBkBody} />
      </div>
      <div className="absolute inset-[0.28%_0.91%_0.55%_0.93%]">
        <img alt="" className="absolute inset-0 size-full max-w-none" src={LOGO.lOutline} />
      </div>
      <div className="absolute inset-[8.08%_28.73%_50.16%_28.91%]">
        <img alt="" className="absolute inset-0 size-full max-w-none" src={LOGO.lBkTop} />
      </div>
      <div className="absolute inset-[8.48%_17.21%_23.98%_17.74%]">
        <img alt="" className="absolute inset-0 size-full max-w-none" src={LOGO.lWingL} />
      </div>
      <div className="absolute inset-[20.92%_11.4%_9.53%_14.42%]">
        <img alt="" className="absolute inset-0 size-full max-w-none" src={LOGO.lWingR} />
      </div>
      <div className="absolute inset-[28.91%_5.27%_18.5%_5.26%]">
        <img alt="" className="absolute inset-0 size-full max-w-none" src={LOGO.lBkSide} />
      </div>
      <div className="absolute inset-[34.02%_13.72%_22.26%_13.93%]">
        <img alt="" className="absolute inset-0 size-full max-w-none" src={LOGO.lBkBot} />
      </div>
    </div>
  );
}

export function LogoWhite({ heightClass }: { heightClass?: string }) {
  return (
    <div
      className={`relative overflow-hidden shrink-0 ${heightClass ?? "h-[60px] md:h-[76px] xl:h-[92px]"}`}
      style={{ aspectRatio: "56/92" }}
    >
      <div className="absolute inset-[39.3%_22.44%_27.27%_21.8%]">
        <img alt="" className="absolute inset-0 size-full max-w-none" src={LOGO.lCross} />
      </div>
      <div className="absolute inset-[0.01%_0.04%_-0.01%_-0.03%]">
        <img alt="" className="absolute inset-0 size-full max-w-none" src={LOGO.lWhBody} />
      </div>
      <div className="absolute inset-[0.28%_0.91%_0.55%_0.93%]">
        <img alt="" className="absolute inset-0 size-full max-w-none" src={LOGO.lOutline} />
      </div>
      <div className="absolute inset-[8.08%_28.73%_50.16%_28.91%]">
        <img alt="" className="absolute inset-0 size-full max-w-none" src={LOGO.lWhTop} />
      </div>
      <div className="absolute inset-[8.48%_17.21%_23.98%_17.74%]">
        <img alt="" className="absolute inset-0 size-full max-w-none" src={LOGO.lWingL} />
      </div>
      <div className="absolute inset-[20.92%_11.4%_9.53%_14.42%]">
        <img alt="" className="absolute inset-0 size-full max-w-none" src={LOGO.lWingR} />
      </div>
      <div className="absolute inset-[28.91%_5.27%_18.5%_5.26%]">
        <img alt="" className="absolute inset-0 size-full max-w-none" src={LOGO.lWhSide} />
      </div>
      <div className="absolute inset-[34.02%_13.72%_22.26%_13.93%]">
        <img alt="" className="absolute inset-0 size-full max-w-none" src={LOGO.lWhBot} />
      </div>
    </div>
  );
}
