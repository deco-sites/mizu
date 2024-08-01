import { clx } from "../../sdk/clx.ts";
import Icon, { AvailableIcons } from "../../components/ui/Icon.tsx";
import Slider from "../../components/ui/Slider.tsx";
import { useId } from "../../sdk/useId.ts";
import { HTMLWidget, ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";

export interface CTA {
  href: string;
  text: string;
  iconOnHover: AvailableIcons;
}
export interface CarouselImage {
  /** @description desktop otimized image */
  desktop: ImageWidget;

  /** @description mobile otimized image */
  mobile: ImageWidget;

  /** @description Image's alt text */
  alt: string;
}

export interface Text {
  title: HTMLWidget;
  description: HTMLWidget;
}

interface Props {
  summaries: Text[];
  cta: CTA;
  carouselImages: CarouselImage[];
}

function TextPlusCarousel({ carouselImages, cta, summaries }: Props) {
  const id = useId();

  return (
    <div class="relative flex flex-col lg:flex-row lg:justify-end gap-[24px] mt-[24px] lg:mt-[80px]">
      <div class="flex flex-col gap-[40px] px-[12px] max-w-[357px]">
        {summaries.map((summary) => (
          <div class="flex flex-col gap-[24px]">
            <h3
              class="text-primary font-black uppercase text-[32px] lg:text-[40px] leading-[37.5px]"
              dangerouslySetInnerHTML={{ __html: summary.title }}
            />
            <div
              class="font-roboto text-[16px] leading-[18.75px]"
              dangerouslySetInnerHTML={{ __html: summary.description }}
            />
          </div>
        ))}
        <a
          class="mx-auto lg:mx-0 w-min group relative pr-[90px] lg:pr-[40px] hover:pr-[90px] text-nowrap flex transition-all duration-300 justify-center items-center gap-10 bg-primary text-white py-[15px] px-[40px] mt-[24px] rounded font-roboto font-medium mt-[-20px]"
          href={cta.href}
        >
          {cta.text}
          <Icon
            class="lg:opacity-0 group-hover:opacity-100 absolute right-[40px] transition-all duration-300"
            id={cta.iconOnHover}
            size={18}
          />
        </a>
      </div>
      <div
        id={id}
        class="max-w-[1180px] lg:w-[61%]"
      >
        <div class="col-start-1 col-span-3 row-start-1 row-span-1">
          <Slider class="carousel carousel-left w-full transition-all">
            {carouselImages?.map((image, index) => (
              <Slider.Item
                index={index}
                class={clx(
                  "carousel-item px-[8px]",
                  "first:pl-[8px]",
                  "last:pr-[8px]",
                )}
              >
                <Image
                  width={260}
                  height={374}
                  class="w-[260px] lg:w-[394px]"
                  src={image.desktop}
                  alt={image.desktop}
                  decoding="async"
                  loading="lazy"
                />
              </Slider.Item>
            ))}
          </Slider>
        </div>

        <div class="lg:absolute lg:w-[50%] lg:justify-between lg:right-[9%] lg:top-[43%] flex w-full gap-[12px] justify-center items-center my-[20px]">
          <div class="group">
            <Slider.PrevButton class="w-[42px] h-[42px] flex justify-center items-center rounded-full border border-primary text-primary group-hover:text-white bg-transparent lg:bg-white group-hover:bg-primary no-animation">
              <Icon
                id="chevron-right"
                size={16}
                class="fill-[#001489] group-hover:fill-[#fff] rotate-180"
              />
            </Slider.PrevButton>
          </div>

          <div class="group">
            <Slider.NextButton class="w-[42px] h-[42px] flex justify-center items-center rounded-full border border-primary text-primary group-hover:text-white bg-transparent lg:bg-white group-hover:bg-primary no-animation">
              <Icon
                id="chevron-right"
                size={16}
                class="fill-[#001489] group-hover:fill-[#fff]"
              />
            </Slider.NextButton>
          </div>
        </div>
      </div>
      <Slider.JS rootId={id} scroll="smooth" infinite={true} />
    </div>
  );
}

export default TextPlusCarousel;
