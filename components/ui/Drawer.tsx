import { useScript } from "deco/hooks/useScript.ts";
import { type ComponentChildren } from "preact";
import { clx } from "../../sdk/clx.ts";
import { useId } from "../../sdk/useId.ts";

export interface Props {
  open?: boolean;
  class?: string;
  children?: ComponentChildren;
  aside: ComponentChildren;
  id?: string;
}

const script = (id: string) => {
  const handler = (e: KeyboardEvent) => {
    if (e.key !== "Escape" && e.keyCode !== 27) {
      return;
    }

    const input = document.getElementById(id) as HTMLInputElement | null;

    if (!input) {
      return;
    }

    input.checked = false;
  };

  addEventListener("keydown", handler);
};

function Drawer({
  children,
  aside,
  open,
  class: _class = "",
  id = useId(),
}: Props) {
  return (
    <>
      <div class={clx("drawer", _class)}>
        <input
          id={id}
          name={id}
          checked={open}
          type="checkbox"
          class="drawer-toggle"
          aria-label={open ? "open drawer" : "closed drawer"}
        />

        <div class="drawer-content">
          {children}
        </div>

        <aside
          data-aside
          class={clx(
            "drawer-side h-full z-40 overflow-hidden",
            "[[data-aside]&_section]:contents", // lazy-loading via useSection
          )}
        >
          <label for={id} class="drawer-overlay bg-[transparent_!important]" />
          {aside}
        </aside>
      </div>
      <script
        type="module"
        dangerouslySetInnerHTML={{ __html: useScript(script, id) }}
      />
    </>
  );
}

function Aside(
  { title, drawer, children, hasTop = true }: {
    title: string;
    drawer: string;
    children: ComponentChildren;
    hasTop?: boolean;
  },
) {
  return (
    <div
      data-aside
      class="grid w-full divide-y divide-base-300 lg:w-[400px] h-full relative lg:max-h-[calc(100dvh-68px)] lg:top-[68px]"
      style={{
        backgroundColor: hasTop ? "#fff" : "#f9f9f9",
        maxWidth: "100vw",
        gridTemplateRows: hasTop ? "auto 1fr" : "auto",
        top: hasTop ? "" : "118px",
        boxShadow: "0px 0px 20px rgba(0,0,0,0.16)",
      }}
    >
      {hasTop &&
        (
          <div class="flex justify-between items-center p-5 pb-3 pr-[35px]">
            <h1 class="">
              <span class="text-accent text-base font-bold leading-6 tracking-normal">
                {title}
              </span>
            </h1>
            <label
              for={drawer}
              aria-label="X"
              class="cursor-pointer text-accent text-base font-bold leading-6 tracking-normal"
            >
              X
            </label>
          </div>
        )}
      {children}
    </div>
  );
}

Drawer.Aside = Aside;

export default Drawer;
