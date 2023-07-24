//import modules
import { Query, Resolver, Arg } from 'type-graphql'

//import entities
import { Price } from '../entities/Price'
import { Section } from '../entities/Section'
import { Zone } from '../entities/Zone'
import { Seat } from '../entities/Seat'
import { TicketResponce } from '../entities/Responce'

async function getData<T>(url: string): Promise<T> {
  const res = (await fetch(url)) as Response

  if (!res.ok) throw res

  return res.json()
}

@Resolver()
export class TicketResolver {
  @Query(() => [TicketResponce])
  async getTickets(@Arg('id') id: number) {
    const seatsUrl = `https://my.laphil.com/en/rest-proxy/TXN/Packages/${id}/Seats?constituentId=0&modeOfSaleId=26&packageId=1195`
    const pricesUrl = `https://my.laphil.com/en/rest-proxy/TXN/Packages/${id}/Prices?expandPerformancePriceType=&includeOnlyBasePrice=&modeOfSaleId=26&priceTypeId=&sourceId=30885`
    const zoneUrl = `https://my.laphil.com/en/rest-proxy/TXN/Performances/ZoneAvailabilities?performanceIds=8444`
    const sectionsUrl = `https://my.laphil.com/en/rest-proxy/ReferenceData/Sections?seatMapId=12`

    const seats = await getData<Seat[]>(seatsUrl)
    const prices = await getData<Price[]>(pricesUrl)
    const zones = await getData<Zone[]>(zoneUrl)
    const sections = await getData<Section[]>(sectionsUrl)

    const tickets = seats
      .filter((seat) => seat.AllocationId !== 0)
      .map((seat) => {
        const zone = zones.find((zone) => zone.Zone.Id === seat.ZoneId)
        const price = prices.find(
          (price) => price.PerformanceId === zone?.PerformanceId && price.ZoneId === zone.Zone.Id
        )
        const section = sections.find((section) => section.Id === seat.SectionId)

        const seatNumber = seat.SeatNumber
        const row = seat.SeatRow
        const zoneD = zone?.Zone.Description
        const sectionD = section?.AdditionalText
        const priceN = price?.Price

        return { zone: zoneD, section: sectionD, seatNumber, row, price: priceN }
      })

    return tickets
  }
}
