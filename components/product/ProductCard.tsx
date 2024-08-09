import type { Product } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import Image from "apps/website/components/Image.tsx";
import { clx } from "../../sdk/clx.ts";
import { formatPrice } from "../../sdk/format.ts";
import { relative } from "../../sdk/url.ts";
import { useOffer } from "../../sdk/useOffer.ts";
import { useSendEvent } from "../../sdk/useSendEvent.ts";
import { useVariantPossibilities } from "../../sdk/useVariantPossiblities.ts";
import WishlistButton from "../wishlist/WishlistButton.tsx";
import AddToCartButton from "./AddToCartButton.tsx";
import { Ring } from "./ProductVariantSelector.tsx";
import { useId } from "../../sdk/useId.ts";
import Icon from "../ui/Icon.tsx";

interface Props {
  product: Product;
  /** Preload card image */
  preload?: boolean;

  /** @description used for analytics event */
  itemListName?: string;

  /** @description index of the product card in the list */
  index?: number;

  class?: string;
}

const WIDTH = 287;
const HEIGHT = 287;
const ASPECT_RATIO = `${WIDTH} / ${HEIGHT}`;

function ProductCard({
  product,
  preload,
  itemListName,
  index,
  class: _class,
}: Props) {
  const id = useId();

  const { url, image: images, offers, isVariantOf, variationColors } = product;
  const hasVariant = isVariantOf?.hasVariant ?? [];
  const title = isVariantOf?.name ?? product.name;
  const [front, back] = images ?? [];

  const { listPrice, price, seller = "1", availability, installments } =
    useOffer(offers);
  const inStock = availability === "https://schema.org/InStock";
  const possibilities = useVariantPossibilities(hasVariant, product);
  // const firstSkuVariations = Object.entries(possibilities)[0];
  // const variants = Object.entries(firstSkuVariations[1] ?? {});
  const secondSkuVariations = Object.entries(possibilities)[1];
  const secondVariants = Object.entries(secondSkuVariations[1] ?? {}); // <-
  const relativeUrl = relative(url);
  // const percent = listPrice && price
  //   ? Math.round(((listPrice - price) / listPrice) * 100)
  //   : 0;

  const item = mapProductToAnalyticsItem({ product, price, listPrice, index });

  {/* Add click event to dataLayer */}
  const event = useSendEvent({
    on: "click",
    event: {
      name: "select_item" as const,
      params: {
        item_list_name: itemListName,
        items: [item],
      },
    },
  });

  return (
    <div
      {...event}
      class={clx("card card-compact group text-sm", _class)}
    >
      <figure
        class={clx(
          "relative bg-base-200",
          "rounded border border-transparent",
        )}
        style={{ aspectRatio: ASPECT_RATIO }}
      >
        {/* Product Images */}
        <a
          href={relativeUrl}
          aria-label="view product"
          class={clx(
            "absolute top-0 left-0",
            "grid grid-cols-1 grid-rows-1",
            "w-full bg-[#f2f2f2] rounded-[.5rem] ",
            !inStock && "opacity-70",
          )}
        >
          <Image
            src={front.url!}
            alt={front.alternateName}
            width={WIDTH}
            height={HEIGHT}
            style={{
              aspectRatio: ASPECT_RATIO,
              mixBlendMode: "multiply",
              contentVisibility: "auto",
              backgroundSize: "contain",
              backgroundPosition: "50%",
              backgroundRepeat: "no-repeat",
            }}
            class={clx(
              "object-cover",
              "rounded w-full",
              "transition-opacity duration-[.4s] ease-in-out col-span-full row-span-full group-hover:opacity-0",
            )}
            sizes="(max-width: 640px) 50vw, 20vw"
            preload={preload}
            loading={preload ? "eager" : "lazy"}
            decoding="async"
          />
          <Image
            src={back?.url ?? front.url!}
            alt={back?.alternateName ?? front.alternateName}
            width={WIDTH}
            height={HEIGHT}
            style={{
              aspectRatio: ASPECT_RATIO,
              mixBlendMode: "multiply",
              contentVisibility: "auto",
              backgroundSize: "contain",
              backgroundPosition: "50%",
              backgroundRepeat: "no-repeat",
            }}
            class={clx(
              "object-cover",
              "rounded w-full",
              "col-span-full row-span-full",
              "transition-opacity duration-[.4s] ease-in-out opacity-0 z-[-1] lg:z-[1] lg:group-hover:opacity-100",
            )}
            sizes="(max-width: 640px) 50vw, 20vw"
            loading="lazy"
            decoding="async"
          />
        </a>
        <div class="hidden lg:flex group/button w-[2.5rem] hover:w-full absolute left-[.625rem] bottom-[.625rem] z-[2]">
          <label class="buy-button-label z-10 top-[65%] cursor-pointer pointer-events-none group-hover/button:pointer-events-auto w-full h-full flex items-center justify-center font-roboto w-[0] absolute top-0 left-0 text-[.875rem] font-medium opacity-0 overflow-hidden translate-y-[-50%] transition-all duration-[.2s] group-hover/button:w-[max-content] group-hover/button:left-1/2 group-hover/button:translate-y-[-50%] group-hover/button:translate-x-[-50%] group-hover/button:opacity-100">
            Adicionar a sacola
          </label>
          <button class="buy-button w-[2.5rem] h-[2.5rem] p-[.625rem] rounded-[1.25rem] absolute left-0 bottom-0 border-0 translate-x-0 transition-all duration-[.2s] overflow-hidden bg-white min-h-[auto] hover:max-w-[17.5rem] hover:w-[calc(100%-20px)] flex items-center">
            <Icon id={"buy"} size={22} />
          </button>
          <ul
            style={{
              gridTemplateColumns: "repeat(6,1fr)",
            }}
            class="grid box-sizes relative bg-white p-[.625rem] w-[calc(100%-1.25rem)] z-30 opacity-0 min-h-[2.5rem] rounded-[.625rem] gap-[.625rem] translate-y-[200%] transition-all ease-in-out duration-[.4s]"
          >
            {secondVariants.map((variant) => (
              <li class="text-[#707070] flex justify-center items-center hover:text-[#000] hover:underline">
                <a
                  class="w-full h-full font-[600] text-[.8125rem] leading-[.875rem]"
                  href={variant[1]}
                >
                  {variant[0]}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </figure>

      <a href={relativeUrl} class="mt-[.625rem]">
        <div
          class="grid"
          style={{ gridTemplateColumns: "1fr minmax(auto,3.75rem)" }}
        >
          <span
            style={{
              "-webkit-line-clamp": "2",
              "-webkit-box-orient": "vertical",
              display: "-webkit-box",
            }}
            class="font-medium font-roboto text-[.875rem] leading-[1.125rem]  text-ellipsis	text-[#1d1d1d] "
          >
            {title}
          </span>
          <WishlistButton item={item} variant="icon" />
        </div>

        <div class="flex flex-col gap-[.75rem] pt-[.75rem]">
          {
            /* {listPrice && (
            <span class="line-through font-normal text-gray-400">
              {formatPrice(listPrice, offers?.priceCurrency)}
            </span>
          )} */
          }
          <span class="font-bold text-[#001489] text-[.875rem] leading-[.875rem] font-roboto">
            {formatPrice(price, offers?.priceCurrency)}
          </span>
          <span class="text-[#707070] text-[.875rem] leading-[.875rem] font-roboto">
            {installments}
          </span>
          <span class="text-[#707070] text-[.875rem] leading-[.875rem] font-roboto">
            {variationColors && variationColors.length > 0 &&
              variationColors.length + (variationColors.length > 1
                  ? " cores disponíveis"
                  : " cor disponível")}
          </span>
        </div>
      </a>
      <ul class="hidden variations lg:flex opacity-0 group-hover:opacity-100 ease-in-out transition-all duration-[.4s] mt-[.625rem] overflow-hidden overflow-x-auto p-[.25rem] min-h-[50px]">
        {variationColors && variationColors.length > 0 &&
          variationColors.map((variation) => (
            <li class="mr-[.1875rem] min-w-[45px]">
              <a
                class="w-full h-full min-w-[45px]"
                href={"/" + variation.linkText + "/p"}
              >
                <Image
                  src={variation.items[0].images[0].imageUrl}
                  alt={front.alternateName}
                  width={45}
                  height={45}
                  class={""}
                  loading={"lazy"}
                  decoding="async"
                />
              </a>
            </li>
          ))}
      </ul>

      {/* SKU Selector */}
      {
        /* {variants.length > 1 && (
        <ul class="flex items-center justify-start gap-2 pt-4 pb-1 pl-1 overflow-x-auto">
          {variants.map(([value, link]) => [value, relative(link)] as const)
            .map(([value, link]) => (
              <li>
                <a href={link} class="cursor-pointer">
                  <input
                    class="hidden peer"
                    type="radio"
                    name={`${id}-${firstSkuVariations[0]}`}
                    checked={link === relativeUrl}
                  />
                  <Ring value={value} checked={link === relativeUrl} />
                </a>
              </li>
            ))}
        </ul>
      )} */
      }

      <div class="flex-grow" />

      {
        /* <div>
        {inStock
          ? (
            <AddToCartButton
              product={product}
              seller={seller}
              item={item}
              class={clx(
                "btn",
                "btn-outline justify-start border-none !text-sm !font-medium px-0 no-animation w-full",
                "hover:!bg-transparent",
                "disabled:!bg-transparent disabled:!opacity-50",
                "btn-primary hover:!text-primary disabled:!text-primary",
              )}
            />
          )
          : (
            <a
              href={relativeUrl}
              class={clx(
                "btn",
                "btn-outline justify-start border-none !text-sm !font-medium px-0 no-animation w-full",
                "hover:!bg-transparent",
                "disabled:!bg-transparent disabled:!opacity-75",
                "btn-error hover:!text-error disabled:!text-error",
              )}
            >
              Sold out
            </a>
          )}
      </div> */
      }
    </div>
  );
}

export default ProductCard;
