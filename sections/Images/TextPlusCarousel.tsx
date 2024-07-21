import { clx } from "../../sdk/clx.ts";
import Icon from "../../components/ui/Icon.tsx";
import Slider from "../../components/ui/Slider.tsx";
import { useId } from "../../sdk/useId.ts";
import { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";

export interface CarouselImage {
  /** @description desktop otimized image */
  desktop: ImageWidget;

  /** @description mobile otimized image */
  mobile: ImageWidget;

  /** @description Image's alt text */
  alt: string;
}

interface Props {
  carouselImages: CarouselImage[];
  itemListName?: string;
}

function TextPlusCarousel({ carouselImages, itemListName }: Props) {
  const id = useId();

  return (
    <>
      <div
        id={id}
        class="grid grid-rows-1"
        style={{
          gridTemplateColumns: "min-content 1fr min-content",
        }}
      >
        <div class="col-start-1 col-span-3 row-start-1 row-span-1">
          <Slider class="carousel carousel-center sm:carousel-end gap-5 sm:gap-10 w-full">
            {carouselImages?.map((image, index) => (
              <Slider.Item
                index={index}
                class={clx(
                  "carousel-item",
                  "first:pl-5 first:sm:pl-0",
                  "last:pr-5 last:sm:pr-0",
                )}
              >
                <Image
                  width={318}
                  height={295}
                  class="w-[287px] sm:w-[300px]"
                  src={image.desktop}
                  alt={image.desktop}
                  decoding="async"
                  loading="lazy"
                />
              </Slider.Item>
            ))}
          </Slider>
        </div>

        <div class="col-start-1 col-span-1 row-start-1 row-span-1 z-10 self-center">
          <Slider.PrevButton class="hidden sm:flex disabled:invisible btn btn-neutral btn-sm btn-circle no-animation">
            <Icon id="chevron-right" class="rotate-180" />
          </Slider.PrevButton>
        </div>

        <div class="col-start-3 col-span-1 row-start-1 row-span-1 z-10 self-center">
          <Slider.NextButton class="hidden sm:flex disabled:invisible btn btn-neutral btn-sm btn-circle no-animation">
            <Icon id="chevron-right" />
          </Slider.NextButton>
        </div>
      </div>
      <Slider.JS rootId={id} />
    </>
  );
}

export default TextPlusCarousel;
