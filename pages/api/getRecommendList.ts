import { NextApiRequest, NextApiResponse } from "next";
import recommendList from "../../pages/api/recommendList.json";
import bodyParser from 'body-parser';

interface RecommendListFilterPayload {
    PageIndex?: number;
    PageSize?: number;
}

interface RecommendListItem {
    id?: number;
    [key: string]: any;
}

interface RecommendListResponse {
    total: number;
    items: RecommendListItem[];
}

export default function handler(req: NextApiRequest, res: NextApiResponse<RecommendListResponse>) {
    const payload = req.body as RecommendListFilterPayload;

    const startIndex = 5 * ((payload.PageIndex || 1) - 1);
    const endIndex = startIndex + (payload.PageSize || 5);
    console.log(startIndex, endIndex);

    const total = recommendList.length;
    const items = recommendList.slice(startIndex, endIndex);

    res.status(200).json({ total, items });
}
