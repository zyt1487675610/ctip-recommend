import fs from 'fs';
import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;
    console.log("id: ", id);

    switch (req.method) {
        case 'GET':
            if (id === undefined) {
                return res.status(400).json({ message: 'ID parameter is required' });
            }
            fs.readFile("./data/restaurantData.json", "utf-8", (err, data) => {
                if (err) throw err;
                const responseData = JSON.parse(data);
                const restaurantInfo = responseData.find((item: any) => item.RestaurantInfo.RestaurantId === +id);
                res.json(restaurantInfo);
            });
            break;
        case '/api/restaurants':
            break;
        default:
            res.status(404).json({ message: 'API route not found' });
            break;
    }
}
