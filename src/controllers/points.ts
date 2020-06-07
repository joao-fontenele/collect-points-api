import { Request, Response } from 'express';
import knex from '../database/connection';

const host = 'http://localhost:3333';

interface Point {
  id?: number,
  image: string,
  name: string,
  whatsapp: string,
  email: string,
  city: string,
  uf: string,
  lat: number,
  lon: number,
}

function transformPointImage(point: Point) {
  return {
    ...point,
    image: `${host}/uploads/images/${point.image}`,
  };
}

export default class ItemsController {
  static async create(req: Request, res: Response) {
    const {
      name,
      email,
      whatsapp,
      lat,
      lon,
      city,
      uf,
      items,
    } = req.body;

    const parsedLat = Number(lat);
    const parsedLon = Number(lon);

    const parsedItems: number[] = items.split(',')
      .map((itemString: string) => itemString.trim())
      .map((itemString: string) => Number(itemString));

    const point = {
      image: req.file.filename,
      name: String(name),
      email: String(email),
      whatsapp: String(whatsapp),
      lat: parsedLat,
      lon: parsedLon,
      city: String(city),
      uf: String(uf),
    };

    const trx = await knex.transaction();
    const pointIds = await trx('points').insert(point);
    const pointId = pointIds[0];

    const pointItems = parsedItems.map((itemId) => ({
      itemId,
      pointId: pointId,
    }));

    await trx('pointItems').insert(pointItems)
    await trx.commit();

    return res.json({
      ...transformPointImage(point),
      id: pointId,
      items: parsedItems,
    });
  }

  static async index(req: Request, res: Response) {
    const { uf, city, items } = req.query;

    const query = knex('points');

    if (items) {
      const parsedItems = (items as string).split(',').map((item) => Number(item.trim()));
      query.join('pointItems', 'points.id', '=', 'pointItems.pointId')
      .whereIn('pointItems.itemId', parsedItems)
    }

    if (uf) {
      query.where('uf', String(uf))
    }

    if (city) {
      query.where('city', String(city))
    }

    const points = await query.distinct()
      .select('points.*');

    return res.json(points.map(transformPointImage));
  }

  static async show(req: Request, res: Response) {
    const { id } = req.params;

    const point = await knex('points')
      .where('id', id)
      .first();

      if (!point) {
        return res.status(404).json({ message: 'point not found' });
      }

      const items = await knex('items')
        .join('pointItems', 'items.id', '=', 'pointItems.itemId')
        .where('pointItems.pointId', id)
        .select('items.title');

    return res.json({
      ...transformPointImage(point),
      items,
    });
  }
}
