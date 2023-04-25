import React, { useState, useEffect, useRef, useCallback } from "react";
import Styles from "../styles/filterBar.module.scss";
import debounce from "../utils/debounce";
import { Dropdown, SideBar, CheckList, Space } from "antd-mobile";
import { DropdownRef } from "antd-mobile/es/components/dropdown";
import filterData from "../data/filterData";
import classNames from "classnames";

const positonTabs = [
  {
    key: "DistanceSort",
    title: "附近",
  },
  {
    key: "LandmarkSort",
    title: "热门地标",
  },
  {
    key: "ZoneSort",
    title: "热门商圈",
  },

  {
    key: "RegionSort",
    title: "行政区",
  },

  {
    key: "MetroSort",
    title: "地铁",
  },
];

const FilterBar: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const [isSticky, setIsSticky] = useState(false);

  const handleScroll = useCallback(() => {
    const top = containerRef?.current?.getBoundingClientRect().top;
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
  }, [isSticky]);

  useEffect(() => {
    // 滚动事件处理函数，用于控制吸顶，进行了防抖处理
    const debouncedHandleScroll = debounce(handleScroll, 5);
    window.addEventListener("scroll", debouncedHandleScroll);
    return () => {
      window.removeEventListener("scroll", debouncedHandleScroll);
    };
  }, [handleScroll]);

  // 用于控制下拉菜单的显示与隐藏
  const ref = useRef<DropdownRef>(null);

  // 定义筛选项
  const [selectedPosition, setSelectedPosition] = useState<string[]>([]);
  const [selectedCuisine, setSelectedCuisine] = useState<string[]>([]);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [selectedType, setSelectedType] = useState<string>(filterData.DefaultSort[0].Name);

  const [activeKey, setActiveKey] = useState(positonTabs[0].key);

  return (
    <div className={Styles.container} ref={containerRef} onClick={handleDropdownClick}>
      <Dropdown className={isSticky ? Styles.sticky : ""} ref={ref}>
        <Dropdown.Item key="1" title={"位置"} className={Styles.dropdown}>
          <CheckList
            multiple={false}
            // defaultValue={[selectedType]}
            // onChange={(val) => {
            //   setSelectedType(val[0] || selectedType);
            //   ref.current?.close();
            // }}
            // value={[selectedType]}
          >
            <div className={Styles.boxContainer}>
              <div className={Styles.side}>
                <SideBar activeKey={activeKey} onChange={setActiveKey}>
                  {positonTabs.map((item) => (
                    <SideBar.Item key={item.key} title={item.title} />
                  ))}
                </SideBar>
              </div>

              <div className={Styles.main}>
                <div
                  className={classNames(Styles.content, {
                    [Styles.active]: activeKey === "DistanceSort",
                  })}
                >
                  {filterData.DistanceSort.map((item) => (
                    <CheckList.Item className={Styles.checkItem} value={item.Name} key={item.Id} title={item.Name} />
                  ))}
                </div>
                <div
                  className={classNames(Styles.content, {
                    [Styles.active]: activeKey === "LandmarkSort",
                  })}
                >
                  {filterData.LandmarkSort.map((item) => (
                    <CheckList.Item className={Styles.checkItem} value={item.Name} key={item.Id} title={item.Name} />
                  ))}
                </div>
                <div
                  className={classNames(Styles.content, {
                    [Styles.active]: activeKey === "ZoneSort",
                  })}
                >
                  {filterData.DefaultSort.map((item) => (
                    <CheckList.Item className={Styles.checkItem} value={item.Name} key={item.Id} title={item.Name} />
                  ))}
                </div>
                <div
                  className={classNames(Styles.content, {
                    [Styles.active]: activeKey === "RegionSort",
                  })}
                >
                  {filterData.DefaultSort.map((item) => (
                    <CheckList.Item className={Styles.checkItem} value={item.Name} key={item.Id} title={item.Name} />
                  ))}
                </div>
                <div
                  className={classNames(Styles.content, {
                    [Styles.active]: activeKey === "MetroSort",
                  })}
                >
                  {filterData.DefaultSort.map((item) => (
                    <CheckList.Item className={Styles.checkItem} value={item.Name} key={item.Id} title={item.Name} />
                  ))}
                </div>
                <div className={classNames(Styles.content, { [Styles.active]: activeKey === "key2" })}>页面 2</div>
                <div className={classNames(Styles.content, { [Styles.active]: activeKey === "key3" })}>页面 3</div>
              </div>

              <div className="check-list"></div>
            </div>
          </CheckList>
        </Dropdown.Item>
        <Dropdown.Item key="2" title={"筛选"} className="dropdownItem">
          {/* <CheckList
            multiple={false}
            defaultValue={[selectedType]}
            onChange={(val) => {
              setSelectedType(val[0] || selectedType);
              ref.current?.close();
            }}
            value={[selectedType]}
          >
            {filterData.DefaultSort.map((item) => (
              <CheckList.Item value={item.Name} key={item.Id} title={item.Name} />
            ))}
          </CheckList> */}
        </Dropdown.Item>
        <Dropdown.Item key="4" title={selectedType} className="dropdownItem">
          <CheckList
            multiple={false}
            defaultValue={[selectedType]}
            onChange={(val) => {
              setSelectedType(val[0] || selectedType);
              ref.current?.close();
            }}
            value={[selectedType]}
          >
            {filterData.DefaultSort.map((item) => (
              <CheckList.Item value={item.Name} key={item.Id} title={item.Name} />
            ))}
          </CheckList>
        </Dropdown.Item>
      </Dropdown>
    </div>
  );
};

export default FilterBar;
