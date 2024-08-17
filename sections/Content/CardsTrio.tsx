import type { ImageWidget } from "apps/admin/widgets.ts";
import Icon, { AvailableIcons } from "../../components/ui/Icon.tsx";
import Image from "apps/website/components/Image.tsx";

export interface CTA {
  href: string;
  text: string;
  iconOnHover: AvailableIcons;
}

export interface Card {
  image: ImageWidget;
  href: string;
  title?: string;
  description?: string;
  cta: CTA;
}

export interface Props {
  cards: Card[];
}

export default function CardsTrio({
  cards,
}: Props) {
  return (
    <div class="px-3 lg:px-10 pt-2.5 lg:pt-20 pb-[50px] overflow-auto w-full flex gap-1 lg:gap-6 max-w-[1920px]">
      {cards.map((card) => (
        <div class="min-w-[318px]">
          <a href={card.href} class="min-w-[318px] lg:w-full">
            <Image
              width={318}
              height={295}
              class="min-w-[318px] lg:w-full"
              src={card.image}
              alt={card.image}
              decoding="async"
              loading="lazy"
            />
          </a>
          <div>
            {card.title &&
              (
                <h3 class="font-bold text-[40px] leading-[46.88px] text-accent uppercase pt-6 pb-4">
                  {card.title}
                </h3>
              )}
            {card.description &&
              (
                <p class="text-base leading-[18.75px] text-accent">
                  {card.description}
                </p>
              )}
            <a
              class="w-min group relative pr-[90px] lg:pr-10 hover:pr-[90px] text-nowrap flex transition-all duration-300 justify-center items-center gap-10 bg-primary text-white py-[15px] px-10 mt-6 rounded font-roboto font-medium"
              href={card.cta.href}
            >
              {card.cta.text}
              <Icon
                class="lg:opacity-0 group-hover:opacity-100 absolute right-[40px] transition-all duration-300"
                id={card.cta.iconOnHover}
                size={18}
              />
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}
