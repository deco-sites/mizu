import type { HTMLWidget, ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";

export interface CTA {
  href: string;
  text: string;
}

export interface Card {
  title: HTMLWidget;
  description: string;
  image: ImageWidget;
  desktopWidth: number;
  desktopHeight: number;
  mobileImage: ImageWidget;
  cta: CTA;
}

export interface Props {
  cards: Card[];
}

export default function HeroBannerHover({
  cards,
}: Props) {
  return (
    <div>
      <div class="mx-auto flex flex-col lg:flex-row gap-[32px] max-w-[1238px] mx-auto items-center my-[30px] lg:mt-[54px]">
        {cards.map((card) => (
          <div
            class={`group flex w-full lg:h-full relative items-center overflow-hidden`}
          >
            <a href={card.cta.href} class="w-full lg:h-full">
              <Image
                width={card.desktopWidth}
                height={card.desktopHeight}
                class="hidden lg:flex object-cover w-full lg:h-full transition-all duration-300 group-hover:scale-105"
                src={card.image}
                alt={card.image}
                decoding="async"
                loading="lazy"
              />
              <Image
                width={414}
                height={534}
                class="lg:hidden object-cover w-full lg:h-full transition-all duration-300 group-hover:scale-105"
                src={card.mobileImage}
                alt={card.mobileImage}
                decoding="async"
                loading="lazy"
              />
            </a>
            <div
              class={`absolute bottom-[1rem] left-[1rem] lg:bottom-[2rem] lg:left-[2rem]`}
            >
              <div
                class={`flex flex-col mb-[16px]`}
              >
                <div
                  class="text-[#F2F2F2] uppercase tracking-[0px] leading-[1] mb-[1rem] transition-all duration-300 font-bold text-[2.5rem] font-roboto lg:translate-y-[120%] group-hover:translate-y-0"
                  dangerouslySetInnerHTML={{
                    __html: card.title,
                  }}
                >
                </div>
                <p class="text-[#F2F2F2] tracking-[0px] leading-[1.5] text-[16px] font-roboto w-[75%] transition-all duration-300 lg:translate-y-[140%] group-hover:translate-y-0">
                  {card.description}
                </p>
                <a
                  class="w-min relative mt-[1rem] text-nowrap flex transition-all duration-300 justify-center items-center gap-10 bg-[#F2F2F2] lg:bg-transparent text-[#000] lg:border lg:border-white hover:border-2 lg:text-white py-[1rem] px-[3rem] rounded-[30px] font-roboto font-bold mt-[-20px] lg:opacity-0 group-hover:opacity-100"
                  href={card.cta.href}
                >
                  {card.cta.text}
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
