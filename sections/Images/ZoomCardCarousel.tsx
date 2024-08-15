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
        <h2 class="text-[2.5rem] font-bold text-[#060606] text-center leading-[1.5] font-roboto">
          {title}
        </h2>
        <p class="font-medium text-[1rem] text-[#060606] text-center leading-[1.5] font-roboto mt-[20px]">
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
                <div class="w-full bg-[#f2f2f2] py-[4rem]">
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
                <a href={card.href} class="my-[16px]">
                  <p class="leading-[1.5] text-[#060606] text-center text-[1rem] font-roboto group-hover:font-bold">
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
            "carousel justify-center gap-[1rem]",
          )}
        >
          {cards.map((_, index) => (
            <li class="carousel-item">
              <Slider.Dot
                index={index}
                class={clx(
                  "bg-[#707070] h-[1rem] w-[1rem] no-animation rounded-full",
                  "disabled:bg-[#0085ca] disabled:hover:bg-primary cursor-pointer",
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
          class="mx-auto bg-[#060606] font-roboto text-[1rem] rounded-[30px] text-white transition-all duration-300 py-[1rem] px-[5rem] hover:bg-[#0085ca]"
        >
          {cta.text}
        </a>
      </div>
    </>
  );
}

export default ZoomCardCarousel;
