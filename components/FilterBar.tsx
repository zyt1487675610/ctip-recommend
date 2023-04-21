import React, { useState, useEffect, useRef, useCallback } from "react";
import { Dropdown, SideBar , Space } from "antd-mobile";
import Styles from "../styles/filterBar.module.scss";
import debounce from "../utils/debounce";

interface Props {
  //   stickyTop: number; // 用于控制吸顶的高度
}

const FilterBar: React.FC<Props> = (props) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const [selectedPosition, setSelectedPosition] = useState<string[]>([]);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [selectedSort, setSelectedSort] = useState<string[]>([]);

  const [isSticky, setIsSticky] = useState(false);

  const handleScroll = useCallback(() => {
    const top = containerRef?.current?.getBoundingClientRect().top;
    console.log("handleScroll", top);

    if (top && top < 0) {
      setIsSticky(true);
    } else {
      setIsSticky(false);
    }
  }, [containerRef, setIsSticky]);
  const handleDropdownClick = useCallback(() => {
    const container = containerRef.current;
    if (container && !isSticky) {
      // 只有当容器不在 sticky 状态下才会将页面滚动到目标位置
      window.scrollBy({
        top: container.getBoundingClientRect().top,
      });
    }
  }, [containerRef.current, isSticky]);
  useEffect(() => {
    // 滚动事件处理函数，用于控制吸顶，进行了防抖处理
    const debouncedHandleScroll = debounce(handleScroll, 5);
    window.addEventListener("scroll", debouncedHandleScroll);

    return () => {
      window.removeEventListener("scroll", debouncedHandleScroll);
    };
  }, []);
  return (
    <div className={Styles.container} ref={containerRef} onClick={handleDropdownClick}>
      <Dropdown className={isSticky ? Styles.sticky : ""}>
        <Dropdown.Item key="position" title="附近">
          <div style={{ padding: 12 }}>
            商机筛选内容
            <br />
            商机筛选内容
            <br />
            商机筛选内容
            <br />
          </div>
        </Dropdown.Item>
        <Dropdown.Item key="sorter" title="">
          <div style={{ padding: 12 }}>
            排序内容
            <br />
            排序内容
            <br />
            排序内容
            <br />
            排序内容
            <br />
          </div>
        </Dropdown.Item>

        <Dropdown.Item key="more" title="更多筛选">
          <div style={{ padding: 12 }}>
            更多筛选内容
            <br />
            更多筛选内容
            <br />
          </div>
        </Dropdown.Item>
      </Dropdown>
    </div>
  );
};

export default FilterBar;
