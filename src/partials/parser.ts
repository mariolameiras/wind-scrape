import utils from './utils'

import { WindguruData, ExtractedWindguruData, WindguruModelHour, WindguruModelDay } from '../interfaces/windguru'


function windguru (extractedData: ExtractedWindguruData): WindguruData {
  // Group the data by day
  const models = extractedData.models.map(model => {
    const days: WindguruModelDay[] = []
    let currentDay: string = ''
    let count = -1

    // Group the data by hour
    model.data.forEach(modelData => {
      const parsedDate = utils.windguru.getDate(modelData.date)

      if (currentDay !== parsedDate) {
        currentDay = parsedDate
        count++
        days[count] = {
          date: parsedDate,
          hours: []
        }
      }

      modelData.hour = utils.windguru.getHour(modelData.date)
      delete modelData.date

      days[count].hours.push(modelData)
    })

    return {
      name: model.name,
      days
    }
  })

  return {
    spot: extractedData.spot,
    models
  }
}


export default {
  windguru
}
