import Image from "apps/website/components/Image.tsx";
import { HEADER_HEIGHT_DESKTOP } from "../../constants.ts";
import { Color, ImageWidget } from "apps/admin/widgets.ts";

export interface Link {
  text?: string;
  url?: string;
  color?: Color;
  bold?: boolean;
  underline?: boolean;
}

export interface NavLeaf {
  title?: {
    text?: string;
    url?: string;
    color?: Color;
    bold?: boolean;
    underline?: boolean;
  };
  links?: Link[];
  seeMore?: {
    text?: string;
    url?: string;
  };
}

export interface NavItemNode {
  text: string;
  url: string;
  color?: Color;
  bold?: boolean;
  underline?: boolean;
  image?: ImageWidget;
  imageUrl?: string;
  children: NavLeaf[];
}

function NavItem({ item }: { item: NavItemNode }) {
  const { url, text, children, color, image, imageUrl } = item;
  return (
    <li class="relative group flex items-center px-[10px]">
      <a
        href={url}
        style={{
          color: color ? color : "inherit",
          height: HEADER_HEIGHT_DESKTOP,
        }}
        class="flex items-center text-[12px] font-roboto text-[#060606] group-hover:text-[#001489_!important] group-hover:font-bold leading-[1.25rem] tracking-[0rem] uppercase text-center"
      >
        <span class="after:content-[''] after:w-full after:absolute after:bottom-[1px] after:left-0 after:transition-all after:ease-in-out after:duration-300 after:delay-0 after:h-[3px] after:scale-x-50 after:group-hover:scale-x-100 after:bg-white after:group-hover:bg-primary">
          {text}
        </span>
      </a>

      {children && children.length > 0 &&
        (
          <div
            class="fixed top-0 left-0 w-full hidden hover:flex group-hover:flex bg-[#f9f9f9] "
            style={{
              boxShadow: "rgba(0,0,0,0.06) 0px 12px 12px",
              marginTop: "65.31px",
            }}
          >
            <div class="max-w-[1238px] pb-[20px] w-full mx-auto group-hover:flex items-start justify-center gap-[10px]">
              <ul
                class="grid w-full justify-center pt-[12px] pb-[5px] overflow-hidden max-h-[382px]"
                style={{
                  gridTemplateColumns: "repeat(auto-fit,minmax(20%,150px))",
                }}
              >
                {children.map((child) => (
                  <li class="min-w-[150px] leading-[0.8125rem] text-[0.75rem] tracking-[0rem] text-[#060606]">
                    <a
                      class="font-roboto flex pb-[5px] text-[#001489] text-[14px] leading-[1.125rem] tracking-[0rem] uppercase font-extrabold"
                      href={child.title?.url}
                    >
                      {child.title?.text}
                    </a>
                    <ul>
                      {child?.links?.map((link) => (
                        <li class="font-roboto text-[#777777] hover:text-[#001489] hover:font-bold text-[12px] leading-[26px] tracking-[0rem]">
                          <a href={link.url}>
                            {link.text}
                          </a>
                        </li>
                      ))}
                    </ul>
                    <a
                      class="underline font-roboto font-light text-[#777777] hover:text-[#001489] hover:font-bold text-[12px] leading-[26px] tracking-[0rem]"
                      href={child.seeMore?.url}
                    >
                      {child.seeMore?.text}
                    </a>
                  </li>
                ))}
              </ul>
              {image && (
                <a
                  style={{
                    minWidth: "430px",
                  }}
                  href={imageUrl ?? "#"}
                >
                  <Image
                    class=""
                    src={image}
                    alt={image}
                    width={430}
                    height={430}
                    loading="lazy"
                  />
                </a>
              )}
            </div>
          </div>
        )}
    </li>
  );
}

export default NavItem;
