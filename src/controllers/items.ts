import { Request, Response } from 'express';
import knex from '../database/connection';

const host = 'http://localhost:3333';

export default class ItemsController {
  static async index(req: Request, res: Response) {
    const items = await knex('items').select('*');

    const formatted = items.map((item) => ({
      id: item.id,
      title: item.title,
      imageUrl: `${host}/uploads/${item.image}`,
    }));

    return res.json(formatted);
  }
}
