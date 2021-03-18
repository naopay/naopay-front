import { Extra } from "./extra";

export class Item {

  constructor(
    public _id: string,
    public image: string, // base64
    public name: string,
    public price: number,
    public available: boolean,
    public category: string, // category id
    public count: number = 1,
    public extras: Extra[] = []
  ) {}

  public static copy(other: Item, count: number, extras: Extra[] = []): Item {
    return new Item(
      other._id,
      other.image,
      other.name,
      other.price,
      other.available,
      other.category,
      count,
      [ ...extras ]
    )
  }
}