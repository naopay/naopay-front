import { Extra } from "./extra";

export interface Item {
  _id: string
  image: string // base64
  name: string
  price: number
  available: boolean
  category: string // category id
  extras: Extra[]

  count?: number // front use only
}