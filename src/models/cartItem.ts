export class CartItem {

  constructor(
    public itemId: string,
    public extraIds?: string[],
    public count: number = 1
  ) {
    if (!extraIds) {
      this.extraIds = []
    }
  }
}