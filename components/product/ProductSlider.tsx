import { Product } from "apps/commerce/types.ts";
import { clx } from "../../sdk/clx.ts";
import Icon from "../ui/Icon.tsx";
import Slider from "../ui/Slider.tsx";
import ProductCard from "./ProductCard.tsx";
import { useId } from "../../sdk/useId.ts";

interface Props {
  products: Product[];
  itemListName?: string;
}

function ProductSlider({ products, itemListName }: Props) {
  const id = useId();

  return (
    <>
      <div
        id={id}
        class="grid grid-rows-1 relative"
        style={{
          gridTemplateColumns: "min-content 1fr min-content",
        }}
      >
        <div class="col-start-1 col-span-3 row-start-1 row-span-1 mb-[70px] lg:mb-0">
          <Slider class="carousel carousel-end sm:carousel-end gap-[16px] w-full">
            {products?.map((product, index) => (
              <Slider.Item
                index={index}
                class={clx(
                  "carousel-item",
                  "last:mr-[16px]",
                  "",
                )}
              >
                <ProductCard
                  index={index}
                  product={product}
                  itemListName={itemListName}
                  class="w-[179px] lg:w-[287px]"
                  preload={false}
                />
              </Slider.Item>
            ))}
          </Slider>
        </div>

        <div class="absolute z-10 lg:z-[-1] w-full bottom-[-25px] lg:bottom-[auto] lg:w-[106%] lg:left-[-37px] lg:justify-between lg:top-[43%] flex w-full gap-[1.25rem] lg:gap-[36px] mb-[60px] justify-center items-center my-[15px]">
          <div class="group">
            <Slider.PrevButton class="w-[28px] h-[28px] flex justify-center items-center rounded-full border border-[#000] text-white group-hover:text-white bg-[#000] lg:bg-[#000] group-hover:bg-[#000] no-animation">
              <Icon
                id="carret_right"
                size={14}
                class="fill-[#fff]"
              />
            </Slider.PrevButton>
          </div>

          <div class="group">
            <Slider.NextButton class="w-[28px] h-[28px] flex justify-center items-center rounded-full border border-[#000] text-white group-hover:text-white bg-[#000] lg:bg-[#000] group-hover:bg-[#000] no-animation">
              <Icon
                id="carret_left"
                size={14}
                class="fill-[#fff]"
              />
            </Slider.NextButton>
          </div>
        </div>
      </div>
      <Slider.JS rootId={id} infinite={true} />
    </>
  );
}

export default ProductSlider;
