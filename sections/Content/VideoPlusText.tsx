import type { HTMLWidget, VideoWidget } from "apps/admin/widgets.ts";

export interface Props {
  title?: HTMLWidget;
  video: {
    src: VideoWidget;
    marginOnX: boolean;
  };
}

export default function VideoPlusText({
  title,
  video,
}: Props) {
  return (
    <div class="relative w-full h-full">
      {title &&
        (
          <h1
            class="font-black	text-white text-[40px] leading-[40px] text-center mx-[31px]"
            dangerouslySetInnerHTML={{
              __html: title,
            }}
          />
        )}
      <video loop autoplay muted playsinline class="w-full h-full">
        <source src={video.src}></source>
      </video>
    </div>
  );
}
