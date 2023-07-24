import { ObjectType, Field } from 'type-graphql'

@ObjectType()
export class TicketResponce {
  @Field()
  zone: string

  @Field()
  section: string

  @Field()
  row: string

  @Field()
  seatNumber: number

  @Field()
  price: number
}
