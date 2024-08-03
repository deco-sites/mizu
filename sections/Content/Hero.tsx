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
                width={640}
                class="hidden lg:flex w-full object-fit"
                sizes="(max-width: 640px) 100vw, 30vw"
                src={image}
                alt={image}
                decoding="async"
                loading="lazy"
              />
            )}
            {mobileImage && (
              <Image
                width={640}
                class="w-full lg:hidden object-fit"
                sizes="(max-width: 640px) 100vw, 30vw"
                src={mobileImage}
                alt={mobileImage}
                decoding="async"
                loading="lazy"
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
                class="text-[#F2F2F2] uppercase tracking-[0px] font-bold text-[32px] font-roboto"
                dangerouslySetInnerHTML={{
                  __html: title || "",
                }}
              >
              </div>
              <p class="text-[#F2F2F2] tracking-[0px] text-[16px] lg:text-[20px] font-roboto">
                {description}
              </p>
              <div class="flex flex-col items-center lg:items-start lg:flex-row gap-4">
                {cta?.map((item) => (
                  <a
                    class="w-min group relative pr-[90px] lg:pr-[40px] hover:pr-[90px] text-nowrap flex transition-all duration-300 justify-center items-center gap-10 bg-[#F2F2F2] text-[#000] py-[15px] px-[40px] mt-[24px] rounded-[28px] font-roboto font-medium mt-[-20px]"
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
