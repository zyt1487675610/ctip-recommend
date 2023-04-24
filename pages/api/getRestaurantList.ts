import { NextApiRequest, NextApiResponse } from "next";
import restaurantList from "../../data/restaurant_list_ecust.json";
import bodyParser from 'body-parser';

interface RestaurantListFilterPayload {
    PageIndex?: number;
    PageSize?: number;
    OrderType?: string;
    PositionLatLonName?: string;
    PositionLat?: number;
    PositionLon?: number;
    MeiShiLinTypes?: number[];
}

interface RestaurantListItem {
    id?: number;
    // name: string;
    // rate: number;
    // distance: number;
    // address: string;
    // cuisine: string;
    // commentCount: number;
    // averagePrice: number;
    // businessHours: string;
    // phone: string;
    // introduction: string;
    [key: string]: any;
}

interface RestaurantListResponse {
    total: number;
    items: RestaurantListItem[];
}

const jsonParser = bodyParser.json();

export default function handler(req: NextApiRequest, res: NextApiResponse<RestaurantListResponse>) {
    const payload = req.body as RestaurantListFilterPayload;

    const filteredItems = restaurantList.filter((item: any) => {
        // 排序筛选
        // if (payload.MeiShiLinTypes && payload.MeiShiLinTypes.indexOf(item.rate) === -1) {
        //     return false;
        // }
        // 位置筛选
        // if (payload.PositionLat && payload.PositionLon) {
        //     // Calculate distance between two coordinates using Haversine formula
        //     const toRad = (value: number) => (value * Math.PI) / 180;
        //     const earthRadius = 6371; // km
        //     const latDiff = toRad(payload.PositionLat - item.latitude);
        //     const lonDiff = toRad(payload.PositionLon - item.longitude);
        //     const a =
        //         Math.sin(latDiff / 2) * Math.sin(latDiff / 2) +
        //         Math.cos(toRad(item.latitude)) *
        //         Math.cos(toRad(payload.PositionLat)) *
        //         Math.sin(lonDiff / 2) *
        //         Math.sin(lonDiff / 2);
        //     const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        //     const distance = earthRadius * c;

        //     if (distance > 10) { // the maximum distance is 10km
        //         return false;
        //     }
        // }
        return true;
    });
    // console.log(payload.PageIndex, payload.PageSize);

    const startIndex = 5 * ((payload.PageIndex || 1) - 1);
    const endIndex = startIndex + (payload.PageSize || 5);
    console.log(startIndex, endIndex);

    const total = filteredItems.length;
    const items = filteredItems.slice(startIndex, endIndex);

    res.status(200).json({ total, items });
}
