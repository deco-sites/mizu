import type { HTMLWidget, ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import Icon, { AvailableIcons } from "../../components/ui/Icon.tsx";

export interface CTA {
  href: string;
  text: string;
  iconOnHover: AvailableIcons;
}

export interface Props {
  title: HTMLWidget;
  subTitle: HTMLWidget;
  description: HTMLWidget;
  image: ImageWidget;
  hoverImage: ImageWidget;
  cta: CTA;
}

export default function HeroNeoVista({
  title = "Mizuno<br /> Neo Vista",
  subTitle = "Tecnologia de prova.<br /> Em dia de treino.",
  description =
    "Conheça o primeiro <b>SUPER TRAINER</b> da Mizuno, desenvolvido com tecnologias de performance para tornar o seu treino ainda mais eficiente.",
  image =
    "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/11899/0fb1d6f6-1f80-45b2-a9ee-1794cba2b325",
  hoverImage =
    "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/11899/b647b5f9-05a7-4c3e-86ed-8b5e22121719",
  cta = {
    href: "/neo-vista",
    text: "Compre Agora",
    iconOnHover: "chevron-right",
  },
}: Props) {
  return (
    <div class="w-full py-[34px] overflow-hidden flex flex-col justify-center items-center">
      <h1
        class="relative lg:top-[76px] text-primary text-[64px] lg:text-[72px] font-extrabold leading-[64px] lg:leading-[72px] text-center uppercase"
        dangerouslySetInnerHTML={{
          __html: title,
        }}
      />
      <div class="group relative">
        <Image
          width={1366}
          height={612}
          class="w-auto transition-all duration-[600ms] max-w-[670px] sm:max-w-none min-h-[266px] sm:max-h-none lg:max-w-[1366px] lg:opacity-0 group-hover:opacity-100"
          src={hoverImage}
          alt={hoverImage}
          decoding="sync"
          loading="eager"
        />
        <Image
          width={1366}
          height={612}
          class="w-auto absolute top-[5px] transition-all duration-[600ms] max-w-[670px] sm:max-w-none min-h-[266px] sm:max-h-none lg:max-w-[1366px] opacity-0 lg:opacity-100"
          src={image}
          alt={image}
          decoding="sync"
          loading="eager"
        />
      </div>
      <div class="relative lg:top-[-60px] max-w-[80%] sm:max-w-[95%] md:max-w-[55%] lg:max-w-[35%] flex flex-col items-center">
        <h2
          class="text-primary text-[32px] lg:text-[40px] font-extrabold leading-[32px] lg:leading-[47px] text-center uppercase mt-[-20px]"
          dangerouslySetInnerHTML={{
            __html: subTitle,
          }}
        />
        <p
          class="text-accent text-[16px] leading-[18.75px] text-center mt-[24px] font-roboto mt-[-20px]"
          dangerouslySetInnerHTML={{
            __html: description,
          }}
        />
        <a
          class="w-min group relative pr-[90px] lg:pr-[40px] hover:pr-[90px] text-nowrap flex transition-all duration-300 justify-center items-center gap-10 bg-primary text-white py-[15px] px-[40px] mt-[24px] rounded font-roboto font-medium mt-[-20px]"
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
    </div>
  );
}
