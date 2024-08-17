import type { HTMLWidget, ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import Icon, { AvailableIcons } from "../../components/ui/Icon.tsx";

export interface CTA {
  id?: string;
  href: string;
  text: string;
  iconOnHover: AvailableIcons;
  variant: "Normal" | "Reverse";
}

export interface Props {
  title?: HTMLWidget;
  description?: string;
  image?: ImageWidget;
  mobileImage?: ImageWidget;
  imageURL?: string;
  preloadImages?: boolean;
  placement?: "left" | "right" | "center";
  cta?: CTA[];
}

const PLACEMENT = {
  left: "flex-col items-start text-left justify-center lg:items-center",
  right: "flex-col items-end text-left justify-center lg:items-center",
  center: "flex-col items-center justify-center text-center",
};

export default function HeroFlats({
  title,
  description,
  image,
  mobileImage,
  placement = "center",
  imageURL = "#",
  cta = [],
  preloadImages = false,
}: Props) {
  return (
    <div>
      <div class="mx-auto flex flex-col items-center lg:pt-[30px] mb-[30px] lg:mb-[94px]">
        <div
          class={`flex w-full relative items-center`}
        >
          <a href={imageURL} class="w-full">
            {image && (
              <Image
                width={1920}
                height={700}
                class="hidden lg:flex w-full object-fit"
                sizes="(max-width: 640px) 100vw, 30vw"
                src={image}
                alt={image}
                preload={preloadImages}
                decoding={preloadImages ? "sync" : "async"}
                loading={preloadImages ? "eager" : "lazy"}
              />
            )}
            {mobileImage && (
              <Image
                width={414}
                height={573}
                class="w-full lg:hidden object-fit"
                sizes="(max-width: 640px) 100vw, 30vw"
                src={mobileImage}
                alt={mobileImage}
                preload={preloadImages}
                decoding={preloadImages ? "sync" : "async"}
                loading={preloadImages ? "eager" : "lazy"}
              />
            )}
          </a>
          <div
            class={`absolute top-[45px] left-0 w-full h-full`}
          >
            <div
              class={`flex max-w-[1250px] mx-auto w-full h-full ${
                PLACEMENT[placement]
              }`}
            >
              <div
                class="text-base-300 uppercase tracking-normal font-bold text-[32px] font-roboto"
                dangerouslySetInnerHTML={{
                  __html: title || "",
                }}
              >
              </div>
              <p class="text-base-300 tracking-normal text-base lg:text-xl font-roboto">
                {description}
              </p>
              <div class="flex flex-col items-center lg:items-start lg:flex-row gap-4">
                {cta?.map((item) => (
                  <a
                    class="w-min group relative pr-[90px] lg:pr-10 hover:pr-[90px] text-nowrap flex transition-all duration-300 justify-center items-center gap-10 bg-base-300 text-black py-[15px] px-10 mt-6 rounded-[28px] font-roboto font-medium mt-[-20px]"
                    href={item.href}
                  >
                    {item.text}
                    <Icon
                      class="lg:opacity-0 group-hover:opacity-100 absolute right-[40px] transition-all duration-300"
                      id={item.iconOnHover}
                      size={18}
                    />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
