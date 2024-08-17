import type { ImageWidget } from "apps/admin/widgets.ts";
import Icon from "../../components/ui/Icon.tsx";
import Slider from "../../components/ui/Slider.tsx";
import { clx } from "../../sdk/clx.ts";
import { useId } from "../../sdk/useId.ts";
import Image from "apps/website/components/Image.tsx";

export interface Card {
  image: ImageWidget;
  href: string;
  description: string;
}

export interface Props {
  title: string;
  description: string;
  cards?: Card[];
  cta: {
    href: string;
    text: string;
  };
}

function ZoomCardCarousel({ cards = [], description, title, cta }: Props) {
  const id = useId();

  return (
    <>
      <div class="my-[4rem] lg:mt-[3rem]">
        <h2 class="text-[2.5rem] font-bold text-accent text-center leading-normal	 font-roboto">
          {title}
        </h2>
        <p class="font-medium text-base text-accent text-center leading-normal	 font-roboto mt-5">
          {description}
        </p>
      </div>
      <div
        id={id}
        class={clx(
          "grid",
          "grid-rows-[1fr_32px_1fr_64px]",
          "grid-cols-[32px_1fr_32px] min-h-[660px]",
          "md:grid-cols-[112px_1fr_112px] md:min-h-[550px]",
          "lg:w-full 2xl:min-h-[600px]",
        )}
      >
        <div class="col-span-full row-span-full lg:ml-[calc((100vw-1238px)/2)]">
          <Slider class="carousel carousel-center w-full gap-[.5rem]  ">
            {cards.map((card, index) => (
              <Slider.Item
                index={index}
                class="group carousel-item w-full md:w-1/3 lg:w-[22%] flex-col"
              >
                <div class="w-full bg-base-300 py-[4rem]">
                  <a href={card.href} class="w-full">
                    <Image
                      src={card.image}
                      width={900}
                      height={900}
                      loading={"lazy"}
                      decoding={"async"}
                      class="transition-all duration-300 group-hover:scale-[1.15]"
                    />
                  </a>
                </div>
                <a href={card.href} class="my-4">
                  <p class="leading-normal	 text-accent text-center text-base font-roboto group-hover:font-bold">
                    {card.description}
                  </p>
                </a>
              </Slider.Item>
            ))}
          </Slider>
        </div>

        <ul
          class={clx(
            "col-span-full row-start-4 z-10 mt-[1.5rem]",
            "carousel justify-center gap-4",
          )}
        >
          {cards.map((_, index) => (
            <li class="carousel-item">
              <Slider.Dot
                index={index}
                class={clx(
                  "bg-neutral h-[1rem] w-[1rem] no-animation rounded-full",
                  "disabled:bg-info disabled:hover:bg-primary cursor-pointer",
                )}
              >
              </Slider.Dot>
            </li>
          ))}
        </ul>

        <Slider.JS rootId={id} />
      </div>
      <div class="hidden md:flex mt-[2.5rem] mb-[4rem]">
        <a
          href={cta.href}
          class="mx-auto bg-accent font-roboto text-base rounded-[30px] text-white transition-all duration-300 py-4 px-[5rem] hover:bg-info"
        >
          {cta.text}
        </a>
      </div>
    </>
  );
}

export default ZoomCardCarousel;
