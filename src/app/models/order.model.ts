export class Order {
    constructor(
      public title:string,
      public des:string,
      public id: number,
      public img:string,
      public user_id: number,
      public total_price: number,
      public status: 'pending' | 'accepted' | 'rejected'
    ) {}
  }
  