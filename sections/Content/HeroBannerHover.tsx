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
      <div class="mx-auto flex flex-col lg:flex-row gap-8 max-w-[1238px] mx-auto items-center my-[30px] lg:mt-[54px]">
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
              class={`absolute bottom-4 left-4 lg:bottom-8 lg:left-8`}
            >
              <div
                class={`flex flex-col mb-4`}
              >
                <div
                  class="text-base-300 uppercase tracking-normal leading-none mb-4 transition-all duration-300 font-bold text-[2.5rem] font-roboto lg:translate-y-[120%] group-hover:translate-y-0"
                  dangerouslySetInnerHTML={{
                    __html: card.title,
                  }}
                >
                </div>
                <p class="text-base-300 tracking-normal leading-normal	 text-base font-roboto w-9/12 transition-all duration-300 lg:translate-y-[140%] group-hover:translate-y-0">
                  {card.description}
                </p>
                <a
                  class="w-min relative mt-4 text-nowrap flex transition-all duration-300 justify-center items-center gap-10 bg-base-300 lg:bg-transparent text-black lg:border lg:border-white hover:border-2 lg:text-white py-4 px-12 rounded-[30px] font-roboto font-bold lg:opacity-0 group-hover:opacity-100"
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
