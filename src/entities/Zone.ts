//import modules
import { ObjectType, Field } from 'type-graphql'

@ObjectType()
export class Zone {
  @Field()
  Id: number

  @Field()
  Zone: {
    Id: number
    Description: string
  }

  @Field()
  PerformanceId: number
}
