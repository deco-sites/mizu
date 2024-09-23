/**
 * We use a custom route at /s?q= to perform the search. This component
 * redirects the user to /s?q={term} when the user either clicks on the
 * button or submits the form. Make sure this page exists in deco.cx/admin
 * of yout site. If not, create a new page on this route and add the appropriate
 * loader.
 *
 * Note that this is the most performatic way to perform a search, since
 * no JavaScript is shipped to the browser!
 */
import { Suggestion } from "apps/commerce/types.ts";
import { Resolved } from "deco/mod.ts";
import { SEARCHBAR_INPUT_FORM_ID, SEARCHBAR_POPUP_ID, } from "../../../constants.ts";
import { useId } from "../../../sdk/useId.ts";
import { useComponent } from "../../../sections/Component.tsx";
import Icon from "../../ui/Icon.tsx";
import { Props as SuggestionProps } from "./Suggestions.tsx";
import { useScript } from "@deco/deco/hooks";
import { asResolved } from "@deco/deco";
// import { SmarthintRecommendation } from "apps/smarthint/utils/typings.ts";
// When user clicks on the search button, navigate it to
export const ACTION = "/s";
// Querystring param used when navigating the user
export const NAME = "q";
export interface SearchbarProps {
    /**
     * @title Placeholder
     * @description Search bar default placeholder message
     * @default What are you looking for?
     */
    placeholder?: string;
    /** @description Loader to run when suggesting new elements */
    loader: Resolved<Suggestion | null>;
}
const script = (formId: string, name: string, popupId: string) => {
    const form = document.getElementById(formId) as HTMLFormElement | null;
    const input = form?.elements.namedItem(name) as HTMLInputElement | null;
    form?.addEventListener("submit", () => {
        event?.preventDefault();
        const search_term = input?.value;
        if (search_term) {
            // window.DECO.events.dispatch({
            //   name: "search",
            //   params: { search_term },
            // });
        }
        window.location.href =
            `https://www.mizuno.com.br/sh/${search_term}?_q=${search_term}&map=ft`;
    });
    // Keyboard event listeners
    addEventListener("keydown", (e: KeyboardEvent) => {
        const isK = e.key === "k" || e.key === "K" || e.keyCode === 75;
        // Open Searchbar on meta+k
        if (e.metaKey === true && isK) {
            const input = document.getElementById(popupId) as HTMLInputElement | null;
            if (input) {
                input.checked = true;
                document.getElementById(formId)?.focus();
            }
        }
    });
};
const Suggestions = import.meta.resolve("./Suggestions.tsx");
export default function Searchbar({ placeholder = "What are you looking for?", loader }: SearchbarProps) {
    const slot = useId();
    return (<div class="w-full px-4 pb-3.5 lg:px-0 lg:pb-0 min-w-[13.5rem] max-w-[25rem] mx-auto lg:max-w-[216px]">
      <form id={SEARCHBAR_INPUT_FORM_ID} action={ACTION} class="w-full grid gap-6 items-center justify-between rounded-[2rem] border border-[.0625rem] border-neutral hover:bg-base-300 transition-all duration-[400ms] ease-in-out" style={{ gridTemplateColumns: "3fr 2rem" }}>
        <input autoFocus tabIndex={0} class="outline-none bg-transparent leading-3 text-xs font-roboto p-[.5625rem] pr-0 text-neutral-content" name={NAME} placeholder={placeholder} autocomplete="off" hx-target={`#${slot}`} hx-post={loader && useComponent<SuggestionProps>(Suggestions, {
            loader: asResolved(loader),
        })} hx-trigger={`input changed delay:300ms, ${NAME}`} hx-indicator={`#${SEARCHBAR_INPUT_FORM_ID}`} hx-swap="innerHTML"/>
        <button type="submit" class="flex pl-[5px]" aria-label="Search" for={SEARCHBAR_INPUT_FORM_ID} tabIndex={-1}>
          <span class="loading loading-spinner loading-xs hidden [.htmx-request_&]:inline"/>
          <Icon size={16} id="search" class="inline [.htmx-request_&]:hidden"/>
        </button>
        {
        /* <label
        type="button"
        class="join-item btn btn-ghost btn-square hidden sm:inline-flex no-animation"
        for={SEARCHBAR_POPUP_ID}
        aria-label="Toggle searchbar"
      >
        <Icon id="close" />
      </label> */
        }
      </form>

      {/* Suggestions slot */}
      <div id={slot}/>

      {/* Send search events as the user types */}
      <script type="module" dangerouslySetInnerHTML={{
            __html: useScript(script, SEARCHBAR_INPUT_FORM_ID, NAME, SEARCHBAR_POPUP_ID),
        }}/>
    </div>);
}
