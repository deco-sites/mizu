import { SectionProps } from "deco/mod.ts";
import { AppContext } from "../../apps/site.ts";
import Icon from "../../components/ui/Icon.tsx";
import Section from "../../components/ui/Section.tsx";
import { usePlatform } from "../../sdk/usePlatform.tsx";
import { useComponent } from "../Component.tsx";
import { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";

interface NoticeProps {
  description?: string;
}

export interface Props {
  desktopImage: ImageWidget;
  mobileImage: ImageWidget;
  title: string;
  heading: string;
  subHeading: string;
  success?: NoticeProps;
  failed?: NoticeProps;

  /** @description Signup label */
  label?: string;

  /** @description Input placeholder */
  namePlaceholder?: string;

  /** @description Input placeholder */
  emailPlaceholder?: string;

  /** @hide true */
  status?: "success" | "failed";
}

export async function action(props: Props, req: Request, ctx: AppContext) {
  const platform = usePlatform();

  const form = await req.formData();
  const email = `${form.get("email") ?? ""}`;

  if (platform === "vtex") {
    // deno-lint-ignore no-explicit-any
    await (ctx as any).invoke("vtex/actions/newsletter/subscribe.ts", {
      email,
    });

    return { ...props, status: "success" };
  }

  return { ...props, status: "failed" };
}

export function loader(props: Props) {
  return { ...props, status: undefined };
}

function Newsletter({
  desktopImage,
  mobileImage,
  title,
  heading,
  subHeading,
  success = {
    description:
      "Cadastro efetuado! Aguarde para receber as novidades em primeira mão.",
  },
  failed = {
    description: "Algo deu errado. Por favor, tente novamente.",
  },
  namePlaceholder = "",
  label = "Sign up",
  emailPlaceholder = "Enter your email address",
  status,
}: SectionProps<typeof loader, typeof action>) {
  if (status === "success" || status === "failed") {
    return (
      <Section.Container
        class="flex flex-col lg:flex-row bg-primary py-0 lg:gap-[55px]"
        style={{ maxWidth: "none" }}
      >
        <Image
          width={960}
          height={418}
          class="lg:hidden w-full object-cover h-[418px]"
          src={mobileImage}
          alt={mobileImage}
          decoding="async"
          loading="lazy"
        />
        <Image
          width={960}
          height={418}
          class="hidden lg:flex w-[48%] object-cover h-[418px]"
          src={desktopImage}
          alt={desktopImage}
          decoding="async"
          loading="lazy"
        />
        <div class="lg:max-w-[690px] w-full lg:w-[50%] flex flex-col items-center justify-center lg:justify-start lg:items-start gap-[20px] pt-[45px] lg:pt-[65px]">
          <h2 class="text-[32px] text-center lg:text-left text-white leading-[2rem] tracking-[0rem] uppercase font-bold">
            {title}
          </h2>
          <h3 class="text-[40px] lg:text-[48px] text-center lg:text-left text-[#0085ca] leading-[2rem] tracking-[0rem] uppercase font-bold">
            {heading}
          </h3>
          <h3 class="text-[32px] text-center lg:text-left text-white leading-[2rem] tracking-[0rem] uppercase font-bold">
            {subHeading}
          </h3>

          {status === "success" &&
            (
              <p class="text-[16px] text-center lg:text-left text-white leading-[2rem] tracking-[0rem]">
                {success.description}
              </p>
            )}
          {status === "failed" &&
            (
              <p class="text-[16px] text-center lg:text-left text-white leading-[2rem] tracking-[0rem]">
                {failed.description}
              </p>
            )}
        </div>
      </Section.Container>
    );
  }

  return (
    <Section.Container
      class="flex flex-col lg:flex-row bg-primary py-0 lg:gap-[55px]"
      style={{ maxWidth: "none" }}
    >
      <Image
        width={960}
        height={418}
        class="lg:hidden w-full object-cover h-[418px]"
        src={mobileImage}
        alt={mobileImage}
        decoding="async"
        loading="lazy"
      />
      <Image
        width={960}
        height={418}
        class="hidden lg:flex w-[48%] object-cover h-[418px]"
        src={desktopImage}
        alt={desktopImage}
        decoding="async"
        loading="lazy"
      />
      <div class="lg:max-w-[690px] w-full lg:w-[50%] flex flex-col items-center justify-center lg:justify-start lg:items-start gap-[20px] pt-[45px] lg:pt-[65px]">
        <h2 class="text-[32px] text-center lg:text-left text-white leading-[2rem] tracking-[0rem] uppercase font-bold">
          {title}
        </h2>
        <h3 class="text-[40px] lg:text-[48px] text-center lg:text-left text-[#0085ca] leading-[40px] tracking-[0rem] uppercase font-bold">
          {heading}
        </h3>
        <h3 class="text-[32px] text-center lg:text-left text-white leading-[2rem] tracking-[0rem] uppercase font-bold">
          {subHeading}
        </h3>
        <form
          hx-target="closest section"
          hx-swap="outerHTML"
          hx-post={useComponent(import.meta.url)}
          class="flex flex-col lg:flex-wrap lg:flex-row items-center lg:justify-start justify-center gap-4 lg:gap-0 w-full"
        >
          <input
            name="name"
            class="input input-bordered h-[48px] lg:mr-[19px] flex-grow w-[262px] lg:w-full lg:max-w-[265px] text-[13px] font-roboto text-[#000000] leading-[29px] tracking-[0.05rem]"
            type="text"
            placeholder={namePlaceholder}
          />
          <input
            name="email"
            class="input input-bordered h-[48px] lg:mr-[19px] flex-grow w-[262px] lg:w-full lg:max-w-[265px] text-[13px] font-roboto text-[#000000] leading-[29px] tracking-[0.05rem]"
            type="text"
            placeholder={emailPlaceholder}
          />

          <button
            class="btn btn-primary lg:min-w-[130px] hover:bg-white h-[48px] lg:mr-[19px] lg:mt-[26px] font-extrabold bg-white text-primary rounded-[24px] text-[16px] leading-[21px] tracking-[0rem] mb-[65px] lg:mb-0 uppercase"
            type="submit"
          >
            <span class="[.htmx-request_&]:hidden flex items-center justify-between gap-[10px]">
              {label}
              <Icon size={24} id={"send"} />
            </span>
            <span class="[.htmx-request_&]:inline hidden loading loading-spinner" />
          </button>
        </form>
      </div>
    </Section.Container>
  );
}

export default Newsletter;
