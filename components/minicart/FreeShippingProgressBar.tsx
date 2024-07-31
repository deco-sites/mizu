import { formatPrice } from "../../sdk/format.ts";
import { useId } from "../../sdk/useId.ts";

interface Props {
  total: number;
  target: number;
  locale: string;
  currency: string;
}

function FreeShippingProgressBar({ target, total, currency, locale }: Props) {
  const id = useId();
  const remaining = target - total;
  const percent = Math.floor((total / target) * 100);

  return (
    <div class="flex flex-col w-full gap-2">
      <div class="flex justify-center items-center gap-[18px] font-roboto text-[14px] leading-[19px] text-[#060606]">
        {remaining > 0
          ? (
            <>
              <label for={id}>
                Faltam <b>{formatPrice(remaining, currency, locale)}</b>{" "}
                para ganhar <b>frete grátis</b>
              </label>
              <svg
                width={15}
                height={13}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 640 512"
              >
                <path d="M48 0C21.5 0 0 21.5 0 48v320c0 26.5 21.5 48 48 48h16c0 53 43 96 96 96s96-43 96-96h128c0 53 43 96 96 96s96-43 96-96h32c17.7 0 32-14.3 32-32s-14.3-32-32-32V237.3c0-17-6.7-33.3-18.7-45.3L512 114.7c-12-12-28.3-18.7-45.3-18.7H416V48c0-26.5-21.5-48-48-48H48zm368 160h50.7l77.3 77.3V256H416v-96zM112 416a48 48 0 1196 0 48 48 0 11-96 0zm368-48a48 48 0 110 96 48 48 0 110-96z" />
              </svg>
            </>
          )
          : (
            <>
              <svg
                width={14}
                height={13}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 576 512"
                fill="#0085ca"
              >
                <path
                  fill="#0085ca"
                  d="M400 0H176c-26.5 0-48.1 21.8-47.1 48.2.2 5.3.4 10.6.7 15.8H24C10.7 64 0 74.7 0 88c0 92.6 33.5 157 78.5 200.7 44.3 43.1 98.3 64.8 138.1 75.8 23.4 6.5 39.4 26 39.4 45.6 0 20.9-17 37.9-37.9 37.9H192c-17.7 0-32 14.3-32 32s14.3 32 32 32h192c17.7 0 32-14.3 32-32s-14.3-32-32-32h-26.1c-20.9 0-37.9-17-37.9-37.9 0-19.6 15.9-39.2 39.4-45.6 39.9-11 93.9-32.7 138.2-75.8C542.5 245 576 180.6 576 88c0-13.3-10.7-24-24-24H446.4c.3-5.2.5-10.4.7-15.8C448.1 21.8 426.5 0 400 0zM48.9 112h84.4c9.1 90.1 29.2 150.3 51.9 190.6-24.9-11-50.8-26.5-73.2-48.3-32-31.1-58-76-63-142.3zm415.2 142.3c-22.4 21.8-48.3 37.3-73.2 48.3 22.7-40.3 42.8-100.5 51.9-190.6h84.4c-5.1 66.3-31.1 111.2-63 142.3z"
                />
              </svg>
              <label for={id}>
                Parabéns, você ganhou <b>frete grátis!</b>
              </label>
            </>
          )}
      </div>
      <progress
        id={id}
        class="progress progress-info w-full h-[4px] "
        value={percent}
        max={100}
      />
      {remaining > 0
        ? (
          <span class="text-[10px] text-center leading-[19px] text-[#060606]">
            *Frete grátis em compras acima de R$ 199,99
          </span>
        )
        : (
          <span class="text-[10px] text-center leading-[19px] text-[#060606]">
            *O desconto será aplicado automaticamente
          </span>
        )}
    </div>
  );
}

export default FreeShippingProgressBar;
