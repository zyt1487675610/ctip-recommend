import React, { useState, useEffect } from "react";
import styles from "./mapContainer.module.scss";

type Props = {};

const MapContainer: React.FC = ({}: Props) => {
  const [mapInstance, setMapInstance] = useState<any>({});
  const [amapLoaded, setAmapLoaded] = useState(false);
  const [position, setPosition] = useState<Number[]>([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      import("@amap/amap-jsapi-loader")
        .then((AMapLoader) => {
          AMapLoader.load({
            key: "575c39e9399bb4d468773983fb489d2a",
            version: "2.0",
            plugins: ["AMap.Geolocation", "AMap.Scale", "AMap.Driving"],
          }).then((AMap) => {
            const map = new AMap.Map("container", {
              viewMode: "3D",
              zoom: 10,
              center: [116.397428, 39.90923],
            });

            const geolocation = new AMap.Geolocation({
              enableHighAccuracy: true,
              timeout: 10000,
              buttonPosition: "RB",
              buttonOffset: new AMap.Pixel(10, 20),
              zoomToAccuracy: true,
            });

            geolocation.getCurrentPosition((status: string, result: any) => {
              if (status === "complete") {
                const lnglat = [result.position.lng, result.position.lat];
                setPosition(lnglat);
                map.setZoomAndCenter(16, lnglat);
              }
            });
            // const content = '<div class="marker-route marker-marker-bus-from">marker</div>';

            // const marker = new AMap.Marker({
            //   content: content, // 自定义点标记覆盖物内容
            //   position: position, // 基点位置
            //   offset: new AMap.Pixel(-17, -42), // 相对于基点的偏移位置
            // });

            // map.add(marker);

            setMapInstance(map);
            map.addControl(new AMap.Scale());
            map.addControl(geolocation);
            let driving = new AMap.Driving({
              map: map,
              policy: AMap.DrivingPolicy.LEAST_TIME,
            });
            let startLngLat = [116.379028, 39.865042];
            let endLngLat = [116.427281, 39.903719];
            driving.search(startLngLat, endLngLat);
          });
        })
        .then(() => {
          setAmapLoaded(true);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, []);

  return (
    <div>
      {amapLoaded && (
        <div id="container" className={styles.map} style={{ height: "800px" }}>
          地图加载中...
        </div>
      )}
    </div>
  );
};

export default MapContainer;
