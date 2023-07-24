//import modules
import { ObjectType, Field } from 'type-graphql'


@ObjectType()
export class Seat {
  @Field()
  Id: number

  @Field()
  ZoneId: number

  @Field()
  SectionId: number

  @Field()
  SeatRow: string

  @Field()
  SeatNumber: number

  @Field()
  AllocationId: number
}
