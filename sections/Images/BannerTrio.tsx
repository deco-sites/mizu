import { clx } from "../../sdk/clx.ts";
import Slider from "../../components/ui/Slider.tsx";
import { useId } from "../../sdk/useId.ts";
import { HTMLWidget, ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import Icon from "../../components/ui/Icon.tsx";

export interface CarouselImage {
  /** @description desktop otimized image */
  desktop: ImageWidget;
  desktopHover: ImageWidget;
  desktopWidth: string;
  desktopHeight: string;

  /** @description mobile otimized image */
  mobile: ImageWidget;

  href: string;

  /** @description Image's alt text */
  alt: string;
}

export interface Text {
  title: HTMLWidget;
  description: HTMLWidget;
}

interface Props {
  summary: Text;
  carouselImages: CarouselImage[];
}

function BannerTrio({ carouselImages, summary }: Props) {
  const id = useId();

  return (
    <div class="relative flex flex-col gap-[24px] mt-[24px] lg:mt-[80px] max-w-[1238px] mx-auto w-full">
      <div class="px-[16px] lg:px-0 flex flex-col gap-[40px]">
        <div class="flex flex-col gap-[24px]">
          <h3
            class="text-[#060606] font-bold font-roboto uppercase text-[2rem] lg:text-[2rem] leading-[1.2]"
            dangerouslySetInnerHTML={{ __html: summary.title }}
          />
          <div
            class="font-roboto text-[#060606] text-[16px] leading-[1.5] max-w-[610px]"
            dangerouslySetInnerHTML={{ __html: summary.description }}
          />
        </div>
      </div>
      <div class="hidden lg:flex gap-[1rem] relative">
        {carouselImages?.map((image) => (
          <a href={image.href} class="flex w-auto h-auto group relative">
            <Image
              width={image.desktopWidth}
              height={image.desktopHeight}
              class=""
              style={{
                flex: "0 0 auto",
              }}
              src={image.desktop}
              alt={image.desktop}
              decoding="async"
              loading="lazy"
            />
            <Image
              width={image.desktopWidth}
              height={image.desktopHeight}
              style={{
                flex: "0 0 auto",
              }}
              class="opacity-0 group-hover:opacity-100 absolute top-0 left-0 transition-all ease-in-out duration-500"
              src={image.desktopHover}
              alt={image.desktopHover}
              decoding="async"
              loading="lazy"
            />
          </a>
        ))}
      </div>
      <div
        id={id}
        class="W-full lg:hidden"
      >
        <div class="col-start-1 col-span-3 row-start-1 row-span-1">
          <Slider class="carousel carousel-center w-full transition-all">
            {carouselImages?.map((image, index) => (
              <Slider.Item
                index={index}
                class={clx(
                  "carousel-item px-[16px]",
                  "first:pl-[16px]",
                  "last:pr-[16px]",
                )}
              >
                <a href={image.href} class="">
                  <Image
                    width={382}
                    height={314}
                    class=""
                    src={image.mobile}
                    alt={image.mobile}
                    decoding="async"
                    loading="lazy"
                  />
                </a>
              </Slider.Item>
            ))}
          </Slider>
        </div>

        <div class="lg:absolute lg:w-[50%] lg:justify-between lg:right-[9%] lg:top-[43%] flex w-full gap-[36px] mb-[60px] justify-center items-center my-[15px]">
          <div class="group">
            <Slider.PrevButton class="w-[24px] h-[24px] flex justify-center items-center rounded-full border border-[#000] text-white group-hover:text-white bg-[#000] lg:bg-white group-hover:bg-[#000] no-animation">
              <Icon
                id="carret_right"
                size={10}
                class="fill-[#fff]"
              />
            </Slider.PrevButton>
          </div>

          <div class="group">
            <Slider.NextButton class="w-[24px] h-[24px] flex justify-center items-center rounded-full border border-[#000] text-white group-hover:text-white bg-[#000] lg:bg-[#000] group-hover:bg-[#000] no-animation">
              <Icon
                id="carret_left"
                size={10}
                class="fill-[#fff]"
              />
            </Slider.NextButton>
          </div>
        </div>
      </div>
      <Slider.JS rootId={id} scroll="smooth" infinite={true} />
    </div>
  );
}

export default BannerTrio;
