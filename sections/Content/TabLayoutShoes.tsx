import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import { useSection } from "deco/hooks/useSection.ts";

export interface Tab {
  name: string;
  imageName: ImageWidget;
  widthImageName: number;
  heightImageName: number;
  description: string;
  image: ImageWidget;
}

export interface Props {
  title: string;
  mobileImage: ImageWidget;
  tabs: Tab[];
}

export default function TabLayoutShoes({
  title = "TECNOLOGIA PARA IR ALÉM",
  mobileImage =
    "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/11899/f1b4ea9b-438f-445a-9786-377d32280279",
  tabs,
  selected = 0,
}: Props & { selected: number }) {
  return (
    <div class="bg-[#f2f2f2] lg:bg-white flex flex-col lg:items-center px-[12px] lg:px-0 mt-[40px] lg:mt-[65px] mb-[24px] lg:mb-[50px] mb-[24px] py-[12px] pb-[30px] lg:pb-[15px] lg:py-[15px]">
      <h1 class="max-w-[190px] mt-[26px] mx-[14px] mb-[40px] lg:m-0 lg:max-w-[1240px] w-full font-black text-primary leading-[37.5px] text-[32px] lg:text-[40px] lg:leading-[46.88px]">
        {title}
      </h1>
      <div class="hidden lg:block max-w-[1240px] w-full">
        <div class="flex gap-[16px] my-[32px]" role="tablist">
          {tabs.map((tab, index) => (
            <button
              hx-get={useSection({ props: { selected: index } })}
              hx-target="closest section"
              hx-swap="outerHTML"
              style={{
                background: index == selected ? "#001489" : "transparent",
                color: index == selected ? "#fff" : "#001489",
              }}
              class="rounded-[46px] border font-roboto border-[#001489] text-[16px] leading-[18.75px] py-[10px] px-[20px]"
            >
              {tab.name}
            </button>
          ))}
        </div>
        <div class="flex gap-[50px]">
          <div class="flex flex-col pt-[100px]">
            {tabs.map((tab, index) => (
              <button
                hx-get={useSection({ props: { selected: index } })}
                hx-target="closest section"
                hx-swap="outerHTML"
                class="font-roboto text-[16px] flex items-start gap-[72px] w-[500px] h-[139px] mb-[40px]"
                style={{
                  borderBottom: index == selected ? "1px solid #000" : "0",
                }}
              >
                <Image
                  width={207}
                  style={{
                    opacity: index == selected ? "1" : ".6",
                    width: tab.widthImageName,
                    height: tab.heightImageName,
                  }}
                  src={tab.imageName}
                  alt={tab.imageName}
                  decoding="async"
                  loading="lazy"
                />
                {index == selected &&
                  (
                    <p class="text-left text-[#060606] leading-[17px]">
                      {tab.description}
                    </p>
                  )}
              </button>
            ))}
          </div>
          <div class="relative">
            <Image
              width={550}
              height={730}
              class="absolute top-0 right-0 min-w-[318px] w-full"
              src={tabs[0].image}
              alt={tabs[0].image}
              decoding="sync"
              loading="eager"
            />
            <Image
              width={550}
              height={730}
              class="min-w-[318px] w-full relative"
              src={tabs[selected].image}
              alt={tabs[selected].image}
              decoding="async"
              loading="lazy"
            />
          </div>
        </div>
      </div>
      <div class="lg:hidden">
        <Image
          width={311}
          height={433}
          class="mx-auto mb-[24px]"
          src={mobileImage}
          alt={mobileImage}
          decoding="async"
          loading="lazy"
        />
        <div class="flex flex-wrap gap-[16px]">
          {tabs.map((tab) => (
            <div class="flex flex-col items-center justify-start w-[47%]">
              <Image
                width={163}
                height={78}
                src={tab.imageName}
                alt={tab.imageName}
                decoding="async"
                loading="lazy"
              />
              <p class="text-[12px] font-roboto leading-[14px] text-[#060606]">
                {tab.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
