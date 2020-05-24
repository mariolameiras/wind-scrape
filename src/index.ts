import extract from './partials/extract-data'
import parse from './partials/parser'
import utils from './partials/utils'

import { WindguruData } from './interfaces/windguru'

async function windguru (spot: number | string): Promise<WindguruData> {
  if (!spot) throw new Error('No spot number specified!')
  if (typeof spot !== 'number' && typeof spot !== 'string') throw new TypeError('Spotnumber must be a number or a string!')

  const url = utils.createRequestUrl(spot)

  try {
    const res = await fetch(url)
    const html = await res.text()

    const extractedData = extract.windguruData(html)
    const data = parse.windguru(extractedData)

    return data
  } catch (err) {
    throw err
  }
}



export {
  windguru,
  WindguruData,
}
