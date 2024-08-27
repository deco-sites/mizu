import { Suggestion } from "apps/commerce/types.ts";
import { Resolved } from "deco/mod.ts";
import type { AppContext } from "../../../apps/site.ts";
import { clx } from "../../../sdk/clx.ts";
import { ComponentProps } from "../../../sections/Component.tsx";
import ProductCard from "../../product/ProductCard.tsx";
import Icon from "../../ui/Icon.tsx";
import Slider from "../../ui/Slider.tsx";
import { ACTION, NAME } from "./Form.tsx";
import { SmarthintRecommendation } from "apps/smarthint/utils/typings.ts";

export interface Props {
  /**
   * @title Suggestions Integration
   * @todo: improve this typings ({query: string, count: number}) => Suggestions
   */
  loader: Resolved<SmarthintRecommendation | null>;
  term?: string
}

export const action = async (props: Props, req: Request, ctx: AppContext) => {
  const { loader: { __resolveType, ...loaderProps } } = props;

  const form = await req.formData();
  const query = `${form.get(NAME ?? "q")}`;

  // @ts-expect-error This is a dynamic resolved loader
  const suggestion = await ctx.invoke(__resolveType, {
    ...loaderProps,
    query,
  }) as Suggestion | null;

  const productsWithVariations = await Promise.all(
    (suggestion?.products || []).map(async (product) => {
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

  if (suggestion) {
    suggestion.products = productsWithVariations
  }

  return { suggestion, term: query };
};

export const loader = async (props: Props, req: Request, ctx: AppContext) => {
  const { loader: { __resolveType, ...loaderProps } } = props;

  const query = new URL(req.url).searchParams.get(NAME ?? "q");

  // @ts-expect-error This is a dynamic resolved loader
  const suggestion = await ctx.invoke(__resolveType, {
    ...loaderProps,
    query,
  }) as Suggestion | null;

  const productsWithVariations = await Promise.all(
    (suggestion?.products || []).map(async (product) => {
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

  if (suggestion) {
    suggestion.products = productsWithVariations
  }

  return { suggestion, term: query };
};

function Suggestions(
  { suggestion, term }: ComponentProps<typeof loader, typeof action>,
) {
  const { products = [], searches = [] } = suggestion ?? {};
  const hasProducts = Boolean(products?.length);
  const hasTerms = Boolean(searches.length);
  return (
    <div
      class={clx(`p-[1.25rem] bg-[#f9f9f9] lg:top-[64px]`, !hasProducts && !hasTerms && "hidden")}
      style={{
        position: "fixed",
        right: 0,
        width: "100%",
      }}
    >
      <div class="gap-4 flex flex-col lg:flex-row-reverse lg:justify-center">
        <div class="flex flex-col">
          <span
            class="font-bold text-[.875rem] leading-[1rem] text-primary h-[36px]"
            role="heading"
            aria-level={3}
          >
            Sugestões
          </span>
          <ul class="flex flex-col">
            {searches.map(({ term }) => (
              <li>
                {/* TODO @gimenes: use name and action from searchbar form */}
                  {/* href={` ${ACTION}?${NAME}=${term}`} */}
                <a
                  href={`https://www.mizuno.com.br/sh/${term}?_q=${term}&map=ft`}
                  class="flex gap-4 items-center text-[#969090]"
                >
                  <span dangerouslySetInnerHTML={{ __html: term }} />
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div class="flex flex-col pt-12 md:pt-0 overflow-x-hidden">
          <span
            class="font-medium text-xl text-black hidden"
            role="heading"
            aria-level={3}
          >
            Produtos sugeridos
          </span>
          <Slider class="carousel gap-[1.25rem]">
            {products.map((product, index) => (
              <Slider.Item
                index={index}
                class="carousel-item first:ml-4 last:mr-4 max-w-[300px] w-[48%]"
              >
                <ProductCard
                  product={product}
                  index={index}
                  itemListName="Suggeestions"
                />
              </Slider.Item>
            ))}
          </Slider>
          <div class="w-full text-center">
            <a
              href={`https://www.mizuno.com.br/sh/${term}?_q=${term}&map=ft`}
              class="text-center w-full leading-[1rem] text-primary underline text-[.875rem] font-[600]"
            >
              Ver todos os produtos
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Suggestions;
