import { type ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import PoweredByDeco from "apps/website/components/PoweredByDeco.tsx";

/** @titleBy title */
interface Item {
  title?: string;
  href?: string;
  type?: "common" | "title";
}

/** @titleBy title */
interface Link extends Item {
  children: Item[];
}

/** @titleBy alt */
interface Social {
  alt?: string;
  href?: string;
  image: ImageWidget;
  widthImage: number;
  heightImage: number;
}

interface ContactUs {
  phone: {
    text: string;
    href: string;
  };
  email: {
    text: string;
    href: string;
  };
  openingHour: {
    text: string;
    href: string;
  };
}

interface Props {
  links?: Link[];
  social?: Social[];
  contactUs?: ContactUs;
  paymentMethods?: Social[];
  security?: Social[];
}

function Footer({
  links = [],
  social = [],
  paymentMethods = [],
  contactUs,
  security = [],
}: Props) {
  return (
    <footer class="bg-base-300">
      <div class="lg:hidden">
        <div class="flex flex-col pb-[15px] pt-10 w-full justify-start">
          <ul class="w-full p-[15px] max-h-[500px] flex flex-wrap justify-end border-b border-neutral">
            {links.map((link, index) => {
              if (link.title) {
                return (
                  <div
                    class="relative h-min w-1/2"
                    style={{ top: index == 2 ? "-120px" : "0" }}
                  >
                    <li class="mb-[15px]">
                      <a
                        class="text-base leading-[1.125rem]  tracking-normal font-bold text-primary"
                        href={link.href}
                      >
                        {link.title}
                      </a>
                    </li>
                    <ul>
                      {link?.children?.map((child) => (
                        <li class="mb-[15px]">
                          <a
                            class="text-base leading-[1.125rem]  tracking-normal "
                            href={child.href}
                            style={{
                              color: child.type === "title"
                                ? "#001489"
                                : "#707070",
                            }}
                          >
                            {child.title}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              }
              return (
                <ul class="h-min w-1/2">
                  {link?.children?.map((child) => (
                    <li class="mb-[15px]">
                      <a
                        class="text-base leading-[1.125rem]  tracking-normal "
                        href={child.href}
                        style={{
                          color: child.type === "title" ? "#001489" : "#707070",
                          fontWeight: child.type === "title"
                            ? "bold"
                            : "normal",
                        }}
                      >
                        {child.title}
                      </a>
                    </li>
                  ))}
                </ul>
              );
            })}
          </ul>
          <div class="flex flex-col justify-center items-center mt-[15px] border-b border-neutral">
            <div>
              <p class="mb-[15px] text-base leading-[1.125rem]  tracking-normal font-bold text-primary">
                SIGA A MIZUNO
              </p>
              <ul class="flex gap-2.5 justify-center mb-[15px]">
                {social.map((item) => (
                  <a href={item.href}>
                    <Image
                      width={20}
                      src={item.image}
                      alt={item.alt}
                    />
                  </a>
                ))}
              </ul>
            </div>
            <div>
              <p class="mb-[15px] text-base leading-[1.125rem]  tracking-normal font-bold text-primary">
                FORMAS DE PAGAMENTO
              </p>
              <ul class="flex gap-2.5 justify-center mb-[15px]">
                {paymentMethods.map((item) => (
                  <a href={item.href}>
                    <Image
                      width={20}
                      src={item.image}
                      alt={item.alt}
                    />
                  </a>
                ))}
              </ul>
            </div>
            <div>
              <p class="mb-[15px] text-base leading-[1.125rem]  tracking-normal font-bold text-primary">
                SEGURANÇA
              </p>
              <ul class="flex gap-2.5 justify-center mb-[15px]">
                {security.map((item) => (
                  <a href={item.href}>
                    <Image
                      width={20}
                      src={item.image}
                      alt={item.alt}
                    />
                  </a>
                ))}
              </ul>
            </div>
            <div>
              <p class="text-center mb-[15px] text-base leading-[1.125rem]  tracking-normal font-bold text-primary">
                FALE CONOSCO
              </p>
              <div class="text-center mb-[15px]">
                <p class="text-base text-neutral leading-[1.125rem]  tracking-normal font-bold">
                  Telefone:
                </p>
                <a
                  class="text-base text-neutral leading-[1.125rem]  tracking-normal"
                  href={contactUs?.phone.href}
                >
                  {contactUs?.phone.text}
                </a>
              </div>
              <div class="text-center mb-[15px]">
                <p class="text-base text-neutral leading-[1.125rem]  tracking-normal font-bold">
                  Email:
                </p>
                <a
                  class="text-base text-neutral leading-[1.125rem]  tracking-normal"
                  href={contactUs?.email.href}
                >
                  {contactUs?.email.text}
                </a>
              </div>
            </div>
            <div>
              <p class="mb-[15px] text-base leading-[1.125rem]  tracking-normal font-bold text-primary uppercase">
                Horários de Atendimento
              </p>
              <div class="text-center text-base text-neutral leading-[1.125rem]  tracking-normal mb-[15px]">
                {contactUs?.openingHour.text}
              </div>
            </div>
          </div>
          <div class="mt-[30px]">
            <p class="leading-3 text-[8px] text-neutral text-center mb-[5px] font-bold">
              FIQUE ATENTO ÀS FRAUDES!
            </p>
            <p class="leading-3 text-[8px] text-neutral text-center mb-[5px]">
              O site Mizuno.com.br é o site exclusivo da marca para compras
              online. Antes de efetuar a compra, verifique que você está no site
              oficial.
            </p>
            <p class="leading-3 text-[8px] text-neutral text-center mb-[5px]">
              Em caso de dúvida ou comunicação suspeita, se informe nos perfis
              oficiais da marca ou pela central de atendimento.
            </p>
            <p class="leading-3 text-[8px] text-neutral text-center mb-[5px]">
              © 2023 MIZUNO TODOS OS DIREITOS RESERVADOS.
            </p>
            <p class="leading-3 text-[8px] text-neutral text-center mb-[5px]">
              Vulcabras – SP Comércio de Artigos Esportivos Ltda. – CNPJ
              18.565.468/0012-41
            </p>
            <p class="leading-3 text-[8px] text-neutral text-center mb-[5px]">
              Estrada Municipal Luiz Lopes Neto, n.º 21 – Tenentes – CEP.
              37.640-000 – Extrema/MG
            </p>
          </div>
        </div>
      </div>
      <div class="hidden lg:flex flex-col">
        <div class="flex flex w-full justify-evenly gap-2.5 mx-auto max-w-[1250px] mt-10">
          {links.map((link) => {
            if (link.title) {
              return (
                <ul class="relative h-min">
                  <li class="mb-2.5">
                    <a
                      class="text-base leading-[1.125rem] text-accent tracking-normal "
                      href={link.href}
                      style={{
                        cursor:
                          link.href === "" || link.href === "#" || !link.href
                            ? "auto"
                            : "pointer",
                      }}
                    >
                      {link.title}
                    </a>
                  </li>
                  <ul>
                    {link?.children?.map((child) => (
                      <li class="mb-2.5">
                        <a
                          class="text-base leading-[1.125rem] text-accent tracking-normal "
                          href={child.href}
                          style={{
                            color: child.type === "title"
                              ? "#001489"
                              : "#707070",
                          }}
                        >
                          {child.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </ul>
              );
            }
            return (
              <ul class="h-min">
                {link?.children?.map((child) => (
                  <li class="mb-2.5">
                    <a
                      class="text-base leading-[1.125rem] tracking-normal "
                      href={child.href}
                      style={{
                        color: child.type === "title" ? "#060606" : "#707070",
                        fontWeight: child.type === "title" ? "400" : "normal",
                      }}
                    >
                      {child.title}
                    </a>
                  </li>
                ))}
              </ul>
            );
          })}
          <div>
            <div>
              <p class="mb-[15px] text-base leading-[1.125rem] text-accent tracking-normal ">
                FALE CONOSCO
              </p>
              <div class="mb-[15px] flex gap-[5px]">
                <p class="text-base text-neutral leading-[1.125rem]  tracking-normal font-bold">
                  Telefone:
                </p>
                <a
                  class="text-base text-neutral leading-[1.125rem]  tracking-normal"
                  href={contactUs?.phone.href}
                >
                  {contactUs?.phone.text}
                </a>
              </div>
              <div class="mb-[15px] flex gap-[5px]">
                <p class="text-base text-neutral leading-[1.125rem]  tracking-normal  font-bold">
                  E-mail:
                </p>
                <a
                  class="text-base text-neutral leading-[1.125rem]  tracking-normal"
                  href={contactUs?.email.href}
                >
                  {contactUs?.email.text}
                </a>
              </div>
            </div>
            <div>
              <p class="mb-[15px] text-base leading-[1.125rem] text-accent tracking-normal  uppercase">
                Horários de Atendimento
              </p>
              <div class="text-base text-neutral leading-[1.125rem]  tracking-normal mb-[15px]">
                {contactUs?.openingHour.text}
              </div>
            </div>
          </div>
          <div class="flex flex-col">
            <div>
              <p class="mb-[15px] text-base leading-[1.125rem] text-accent tracking-normal ">
                SIGA A MIZUNO
              </p>
              <ul class="flex gap-2.5 mb-[15px]">
                {social.map((item) => (
                  <a href={item.href}>
                    <Image
                      width={20}
                      src={item.image}
                      alt={item.alt}
                    />
                  </a>
                ))}
              </ul>
            </div>
            <div>
              <p class="mb-[15px] text-base leading-[1.125rem] text-accent tracking-normal ">
                FORMAS DE PAGAMENTO
              </p>
              <ul class="flex gap-2.5 mb-[15px] flex-wrap max-w-[150px]">
                {paymentMethods.map((item) => (
                  <a href={item.href}>
                    <Image
                      width={23}
                      src={item.image}
                      alt={item.alt}
                    />
                  </a>
                ))}
              </ul>
            </div>
            <div>
              <p class="mb-[15px] text-base leading-[1.125rem] text-accent tracking-normal ">
                SEGURANÇA
              </p>
              <ul class="flex gap-2.5 mb-[15px]">
                {security.map((item) => (
                  <a href={item.href}>
                    <Image
                      width={29}
                      src={item.image}
                      alt={item.alt}
                    />
                  </a>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div class="py-[30px] mt-[30px] border-t-2 border-neutral">
          <div class="max-w-[725px] mx-auto">
            <p class="leading-3 text-xs text-neutral tracking-normal mb-[15px] font-bold font-roboto">
              FIQUE ATENTO ÀS FRAUDES!
            </p>
            <p class="leading-3 text-xs text-neutral tracking-normal font-roboto">
              O site Mizuno.com.br é o site exclusivo da marca para compras
              online. Antes de efetuar a compra, verifique que você está no site
              oficial.
            </p>
            <p class="leading-3 text-xs text-neutral tracking-normal mb-[30px] font-roboto">
              Em caso de dúvida ou comunicação suspeita, se informe nos perfis
              oficiais da marca ou pela central de atendimento.
            </p>
            <p class="leading-3 text-xs text-neutral tracking-normal font-roboto">
              © 2023 MIZUNO TODOS OS DIREITOS RESERVADOS.
            </p>
            <p class="leading-3 text-xs text-neutral tracking-normal font-roboto">
              Vulcabras – SP Comércio de Artigos Esportivos Ltda. – CNPJ
              18.565.468/0012-41
            </p>
            <p class="leading-3 text-xs text-neutral tracking-normal font-roboto">
              Estrada Municipal Luiz Lopes Neto, n.º 21 – Tenentes – CEP.
              37.640-000 – Extrema/MG
            </p>
          </div>
          <div class="flex justify-center items-center pt-10 pb-5">
            <PoweredByDeco />
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
