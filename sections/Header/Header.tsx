import type { HTMLWidget, ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import { useDevice } from "deco/hooks/useDevice.ts";
import { useSection } from "deco/hooks/useSection.ts";
import Alert from "../../components/header/Alert.tsx";
import Bag from "../../components/header/Bag.tsx";
import Menu from "../../components/header/Menu.tsx";
import NavItem, { NavItemNode } from "../../components/header/NavItem.tsx";
import SignIn from "../../components/header/SignIn.tsx";
import Searchbar, {
  type SearchbarProps,
} from "../../components/search/Searchbar/Form.tsx";
import Drawer from "../../components/ui/Drawer.tsx";
import Icon from "../../components/ui/Icon.tsx";
import {
  HEADER_HEIGHT_DESKTOP,
  HEADER_HEIGHT_MOBILE,
  NAVBAR_HEIGHT_MOBILE,
  SEARCHBAR_DRAWER_ID,
  SIDEMENU_CONTAINER_ID,
  SIDEMENU_DRAWER_ID,
} from "../../constants.ts";

export interface Logo {
  src: ImageWidget;
  mobileSrc: ImageWidget;
  alt: string;
  width?: number;
  height?: number;
}

export interface SectionProps {
  alerts?: HTMLWidget[];

  /**
   * @title Navigation items
   * @description Navigation items used both on mobile and desktop menus
   */
  navItems?: NavItemNode[];

  /**
   * @title Searchbar
   * @description Searchbar configuration
   */
  searchbar: SearchbarProps;

  /** @title Logo */
  logo: Logo;

  /** @hide true */
  variant?: "initial" | "menu";
}

type Props = Omit<SectionProps, "alert" | "variant">;

const Desktop = (
  { navItems, logo, searchbar }: Props,
) => (
  <>
    <div class="bg-white max-w-[1250px] mx-auto w-full flex items-center z-10 relative">
      <a class="w-auto" href="/" aria-label="Store logo">
        <Image
          class="mb-[5px]"
          src={logo.src}
          alt={logo.alt}
          width={logo.width || 100}
          height={logo.height || 23}
        />
      </a>

      <ul class="flex w-auto gap-[10px] pl-[40px]">
        {navItems?.map((item) => <NavItem item={item} />)}
      </ul>

      <div class="flex w-auto gap-[1.25rem] justify-center items-center">
        <Searchbar {...searchbar} />
        <SignIn variant="desktop" />
        <Image
          class="cursor-pointer"
          src={"https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/11899/772125fb-f121-40fc-b27c-0632722e40bf"}
          width={20}
          height={21}
        />
        <Bag />
      </div>
    </div>
  </>
);

const Mobile = ({ logo, searchbar }: Props) => (
  <>
    <Drawer
      id={SEARCHBAR_DRAWER_ID}
      aside={
        <Drawer.Aside title="Search" drawer={SEARCHBAR_DRAWER_ID}>
          <div class="w-screen overflow-y-auto">
            <Searchbar {...searchbar} />
          </div>
        </Drawer.Aside>
      }
    />
    <Drawer
      id={SIDEMENU_DRAWER_ID}
      aside={
        <Drawer.Aside hasTop={false} title="Menu" drawer={SIDEMENU_DRAWER_ID}>
          <div
            id={SIDEMENU_CONTAINER_ID}
            class="h-full flex items-center justify-center"
            style={{ minWidth: "100vw" }}
          >
            <span class="loading loading-spinner" />
          </div>
        </Drawer.Aside>
      }
    />

    <div
      class="grid items-center w-screen px-[16px] py-[15px]"
      style={{
        height: NAVBAR_HEIGHT_MOBILE,
        gridTemplateColumns:
          "5rem auto 5rem",
      }}
    >
      <label
        for={SIDEMENU_DRAWER_ID}
        class="btn btn-square btn-sm btn-ghost justify-start"
        aria-label="open menu"
        hx-target={`#${SIDEMENU_CONTAINER_ID}`}
        hx-swap="outerHTML"
        hx-trigger="click once"
        hx-get={useSection({ props: { variant: "menu" } })}
      >
        <Icon height={18} width={24} id="menu" />
      </label>

      {logo && (
        <a
          href="/"
          class="flex-grow inline-flex items-center justify-center"
          aria-label="Store logo"
        >
          <Image
            src={logo.mobileSrc}
            alt={logo.alt}
            class=""
            width={73}
            height={28}
          />
        </a>
      )}

      <div class="flex gap-[1rem] items-center justify-end">
        <SignIn variant="mobile" />
        <Bag />
      </div>
    </div>
    <Searchbar {...searchbar} />
  </>
);

function Header({
  alerts = [],
  logo = {
    src:
      "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/2291/986b61d4-3847-4867-93c8-b550cb459cc7",
    mobileSrc: "https://mizunobrio.vtexassets.com/arquivos/LOGO-MOBILE.svg",
    width: 100,
    height: 16,
    alt: "Logo",
  },
  ...props
}: Props) {
  const device = useDevice();

  return (
    <header
      class="mb-[65px] lg:mb-[21px]"
      style={{
        height: device === "desktop"
          ? HEADER_HEIGHT_DESKTOP
          : HEADER_HEIGHT_MOBILE
      }}
    >
      <div class="fixed w-full z-40 top-0 left-0 bg-white">
        {device === "desktop"
          ? <Desktop logo={logo} {...props} />
          : <Mobile logo={logo} {...props} />}
        {alerts.length > 0 && <Alert alerts={alerts} />}
      </div>
    </header>
  );
}

export default function Section({ variant, ...props }: SectionProps) {
  if (variant === "menu") {
    return <Menu navItems={props.navItems ?? []} />;
  }

  return <Header {...props} />;
}
