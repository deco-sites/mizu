import type { Product } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import ProductSlider from "../../components/product/ProductSlider.tsx";
import Section from "../../components/ui/Section.tsx";
import { useOffer } from "../../sdk/useOffer.ts";
import { useSendEvent } from "../../sdk/useSendEvent.ts";
import { HTMLWidget } from "apps/admin/widgets.ts";
import type { SectionProps } from "deco/mod.ts";

export interface Props {
  title: HTMLWidget;
  description: HTMLWidget;
  products: Product[] | null;
}

export const loader = async (props: Props, req: Request) => {
  const productsWithVariations = await Promise.all(
    props.products.map(async (product) => {
      if (product?.isVariantOf?.model) {
        const variations = await fetch(
          `https://www.mizuno.com.br/api/catalog_system/pub/products/search?fq=alternateIds_RefId:${
            product.isVariantOf.model.substr(0, 10)
          }*&_from=0&_to=20`,
        ).then((r) => r.json());

        return {
          ...product,
          variationColors: variations,
        };
      }
      return product;
    }),
  );

  return {
    ...props,
    products: productsWithVariations,
  };
};

export default function ProductShelf(
  { products, title, description }: SectionProps<typeof loader>,
) {
  if (!products || products.length === 0) {
    return null;
  }

  const viewItemListEvent = useSendEvent({
    on: "view",
    event: {
      name: "view_item_list",
      params: {
        item_list_name: title,
        items: products.map((product, index) =>
          mapProductToAnalyticsItem({
            index,
            product,
            ...(useOffer(product.offers)),
          })
        ),
      },
    },
  });

  return (
    <Section.Container
      {...viewItemListEvent}
      class="[view-transition-name:loading-fallback-2]"
    >
      <div class="flex flex-col gap-8">
        <h3
          class="text-accent font-bold font-roboto uppercase text-[2rem] lg:text-[2rem] leading-[1.2]"
          dangerouslySetInnerHTML={{ __html: title }}
        />
        <div
          class="font-roboto text-accent text-base leading-normal	 max-w-[610px]"
          dangerouslySetInnerHTML={{ __html: description }}
        />
      </div>
      <ProductSlider products={products} itemListName={title} />
    </Section.Container>
  );
}

export function LoadingFallback() {
  return (
    <div
      style={{ height: "716px" }}
      class="flex justify-center items-center [view-transition-name:loading-fallback-2]"
    >
      <span class="loading loading-spinner" />
    </div>
  );
}
