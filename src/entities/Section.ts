//import modules
import { ObjectType, Field } from 'type-graphql'

@ObjectType()
export class Section {
  @Field()
  Id: number

  @Field()
  AdditionalText: string
}
