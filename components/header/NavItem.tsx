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
  const { url, text, children, color } = item;
  const image = item?.image;
  console.log(item);
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
            class="fixed hidden hover:flex group-hover:flex bg-base-100 z-40 items-start justify-center gap-6 border-t-2 border-b-2 border-base-200 w-screen"
            style={{
              top: "0px",
              left: "0px",
              marginTop: HEADER_HEIGHT_DESKTOP,
            }}
          >
            {image && (
              <Image
                class="p-6"
                src={image}
                alt={image}
                width={300}
                height={332}
                loading="lazy"
              />
            )}
          </div>
        )}
    </li>
  );
}

export default NavItem;
