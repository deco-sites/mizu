import Slider from "../../components/ui/Slider.tsx";
import { useId } from "../../sdk/useId.ts";
import Icon from "../ui/Icon.tsx";

export interface Props {
  alerts?: string[];
  /**
   * @title Autoplay interval
   * @description time (in seconds) to start the carousel autoplay
   */
  interval?: number;
}

function Alert({ alerts = [], interval = 5 }: Props) {
  const id = useId();

  return (
    <div id={id} class="relative top-[118px] lg:top-16">
      <Slider class="carousel carousel-center w-full gap-6 bg-base-300 text-primary">
        {alerts.map((alert, index) => (
          <Slider.Item index={index} class="carousel-item">
            <span
              class="py-4 px-8 lg:px-4 lg:py-4 leading-[18px] w-screen text-center text-primary text-sm lg:text-base font-roboto font-bold"
              dangerouslySetInnerHTML={{ __html: alert }}
            />
          </Slider.Item>
        ))}
      </Slider>

      <div class="h-full absolute lg:h-[50px] lg:static w-full justify-between right-0 top-0 flex w-full gap-3 items-center">
        <div class="group">
          <Slider.PrevButton class="lg:absolute lg:top-[14%] lg:left-[calc(50%-400px)] w-6 h-6 flex justify-center items-center text-primary bg-transparent no-animation">
            <Icon
              id="carret_right"
              size={12}
              class="fill-primary"
            />
          </Slider.PrevButton>
        </div>

        <div class="group">
          <Slider.NextButton class="lg:absolute lg:top-[14%] lg:right-[calc(50%-400px)] w-6 h-6 flex justify-center items-center text-primary bg-transparent no-animation">
            <Icon
              id="carret_left"
              size={12}
              class="fill-primary"
            />
          </Slider.NextButton>
        </div>
      </div>

      <Slider.JS rootId={id} interval={interval && interval * 1e3} />
    </div>
  );
}

export default Alert;
