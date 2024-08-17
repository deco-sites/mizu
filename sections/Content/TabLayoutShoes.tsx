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
  desktopCoverImage: ImageWidget;
  tabs: Tab[];
}

export default function TabLayoutShoes({
  title = "TECNOLOGIA PARA IR ALÉM",
  mobileImage =
    "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/11899/f1b4ea9b-438f-445a-9786-377d32280279",
  tabs,
  desktopCoverImage,
  selected = 0,
}: Props & { selected: number }) {
  return (
    <div class="bg-base-300 lg:bg-white flex flex-col lg:items-center px-3 lg:px-0 mt-10 lg:mt-[65px] mb-6 lg:mb-[50px] mb-6 py-3 pb-[30px] lg:pb-[15px] lg:py-[15px]">
      <h1 class="max-w-[190px] mt-[26px] mx-[14px] mb-10 lg:m-0 lg:max-w-[1240px] w-full font-black text-primary leading-[37.5px] text-[32px] lg:text-[40px] lg:leading-[46.88px]">
        {title}
      </h1>
      <div class="hidden lg:block max-w-[1240px] w-full">
        <div class="flex gap-4 my-8" role="tablist">
          {tabs.map((tab, index) => (
            <button
              hx-get={useSection({ props: { selected: index } })}
              hx-target="closest section"
              hx-swap="outerHTML"
              style={{
                background: index == selected ? "#001489" : "transparent",
                color: index == selected ? "#fff" : "#001489",
              }}
              class="rounded-[46px] border font-roboto border-primary text-base leading-[18.75px] py-2.5 px-5"
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
                class="font-roboto text-base flex items-start gap-[72px] w-[500px] h-[139px] mb-10"
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
                    <p class="text-left text-accent leading-[17px]">
                      {tab.description}
                    </p>
                  )}
              </button>
            ))}
          </div>
          <div class="relative w-full">
            <Image
              width={550}
              height={730}
              class="absolute top-0 right-0 min-w-[318px] w-full"
              src={desktopCoverImage}
              alt={desktopCoverImage}
              decoding="sync"
              loading="eager"
              preload={true}
            />
            <Image
              width={550}
              height={730}
              class="min-w-[318px] w-full relative"
              src={tabs[selected].image}
              alt={tabs[selected].image}
              decoding="sync"
              loading="eager"
            />
          </div>
        </div>
      </div>
      <div class="lg:hidden">
        <Image
          width={311}
          height={433}
          class="mx-auto mb-6"
          src={mobileImage}
          alt={mobileImage}
          decoding="async"
          loading="lazy"
        />
        <div class="flex flex-wrap gap-4">
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
              <p class="text-xs font-roboto leading-[14px] text-accent">
                {tab.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
