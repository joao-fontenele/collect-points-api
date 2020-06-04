import { Request, Response } from 'express';
import knex from '../database/connection';

export default class ItemsController {
  static async create(req: Request, res: Response) {
    const point = req.body;
    const {
      name,
      email,
      whatsapp,
      lat,
      lon,
      city,
      uf,
      items,
    } = point;

    const trx = await knex.transaction();
    const pointIds = await trx('points').insert({
      image: 'https://images.unsplash.com/photo-1582408921715-18e7806365c1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=50',
      name,
      email,
      whatsapp,
      lat,
      lon,
      city,
      uf,
    });

    const pointId = pointIds[0];

    const pointItems = items.map((itemId: number) => ({
      itemId,
      pointId: pointId,
    }));

    await trx('pointItems').insert(pointItems)

    await trx.commit();

    return res.json({
      ...point,
      id: pointId,
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

    return res.json(points);
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
      ...point,
      items,
    });
  }
}
