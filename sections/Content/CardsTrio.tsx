import type { HTMLWidget, VideoWidget } from "apps/admin/widgets.ts";

export interface Props {
  title?: HTMLWidget;
  video: {
    src: VideoWidget;
  };
}

export default function CardsTrio({
  title,
  video,
}: Props) {
  return (
    <div class="relative w-full h-full">
      {title &&
        (
          <div
            class="absolute top-0 left-0 w-full h-full flex justify-center items-center"
            style={{ background: "rgba(0,0,0,.64)" }}
          >
            <div class="w-full h-full lg:max-w-[1240px] flex items-center">
              <h1
                class="w-full font-black	text-white text-[40px] lg:text-[72px] leading-[40px] lg:leading-[64px] text-center lg:text-left mx-[31px] lg:mx-0"
                dangerouslySetInnerHTML={{
                  __html: title,
                }}
              />
            </div>
          </div>
        )}
      {video.src.includes("youtube")
        ? (
          <div class="h-[52.5vw] lg:h-[768px] px-[12px] lg:px-[40px] w-full bg-transparent lg:bg-[#d9d9d9] flex justify-center">
            <iframe
              class="max-w-[1366px]"
              width="100%"
              height="100%"
              src={video.src}
              frameborder="0"
              allowFullScreen
              allow="autoplay"
            />
          </div>
        )
        : (
          <video
            loop
            autoplay
            muted
            playsinline
            class="w-full h-[502px] lg:h-full object-cover"
          >
            <source src={video.src}></source>
          </video>
        )}
    </div>
  );
}
