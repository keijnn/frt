//import modules
import { ObjectType, Field } from 'type-graphql'

@ObjectType()
export class Price {
  @Field()
  Price: number

  @Field()
  PerformanceId: number

  @Field()
  ZoneId: number
}
