import Icon from "../../components/ui/Icon.tsx";
import { NavItemNode } from "./NavItem.tsx";

export interface Props {
  navItems: NavItemNode[];
}

function MenuItem({ item }: { item: NavItemNode }) {
  return (
    <div class="collapse">
      {
        item.children.length > 0 && 
        <input id="collapse-input-animation" type="checkbox" />
      }
      <div class="collapse-title flex justify-between items-center p-[20px] text-[#060606] text-[12px] leading-[11px] font-roboto tracking-[0rem] uppercase" style={{
        color: item.color ? item.color : "inherit",
        minHeight: 'fit-content',
        height: 'min-content'
      }}>
        {
          item.children.length == 0 &&
          <a href={item.url}>{item.text}</a>
        }
        {item.children.length > 0 && item.text}
        {
          item.children.length > 0 &&
          <Icon
            class="abtransition-all duration-300 rotate-90"
            id={"chevron-right"}
            size={10}
          />
        }
      </div>
      {
        item.children.length > 0 &&
        <div class="collapse-content">
          <ul class="divide-y divide-[#f2f2f2]">
            {item.children?.map((node) => {
              if (node.title?.text) {
                return (
                  <>
                    <div class="collapse collapse-child">
                      <input id="collapse-input-animation" type="checkbox" />
                      <div class="collapse-title flex justify-between items-center pl-[10px] pr-[3px] divide-y divide-[#f2f2f2] py-[12px] text-[#060606] text-[12px] leading-[11px] font-roboto tracking-[0rem] uppercase" style={{
                        minHeight: 'fit-content',
                        height: 'min-content'
                      }}>
                        {node.title.text}
                        <Icon
                          class="abtransition-all duration-300 rotate-90"
                          id={"chevron-right"}
                          size={10}
                        />
                      </div>
                      <div class="collapse-content">
                        <ul>
                          {
                            node?.links?.map(link => (
                              <li class="pl-[10px] py-[12px] text-[#707070] text-[12px] leading-[11px] font-roboto tracking-[0rem] uppercase">
                                <a href={link.url}>{link.text}</a>
                              </li>
                            ))
                          }
                        </ul>
                      </div>
                    </div>
                  </>
                )
              } else if (node.links && node.links.length > 0) {
                return (
                  <ul>
                    {
                      node?.links?.map(link => (
                        <li>
                          <a class="text-sm text-[#707070] text-[12px] leading-[11px] font-roboto tracking-[0rem] uppercase" href={link.url}>{link.text}</a>
                        </li>
                      ))
                    }
                  </ul>
                )
              }
            })}
            <li>
              <a class="pl-[10px] text-[#707070] text-[12px] leading-[11px] font-roboto tracking-[0rem] uppercase" href={item.url}>VER TUDO</a>
            </li>
          </ul>
        </div>
      }
    </div>
  );
}

function Menu({ navItems }: Props) {
  return (
    <div
      class="flex flex-col h-full overflow-y-auto bg-[#f9f9f9]"
      style={{ minWidth: "100vw" }}
    >
      <ul class="flex-grow flex flex-col divide-y divide-[#f2f2f2] overflow-y-auto">
        {navItems.map((item) => (
          <li>
            <MenuItem item={item} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Menu;
