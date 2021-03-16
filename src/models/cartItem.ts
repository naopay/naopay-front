export class CartItem {
  count: number

  constructor(
    public itemId: string,
    public extraIds?: string[]
  ) {
    this.count = 1
    if (!extraIds) {
      this.extraIds = []
    }
  }
}