import utils from './utils'
import { SpotInfo, ExtractedWindguruData, ExtractedWindguruModelData } from '../interfaces/windguru'


function windguruData (data: string): ExtractedWindguruData {
  let foundPre = false
  let spot: SpotInfo = {
    name: '',
    coordinates: {
      lat: '',
      lng: ''
    },
    altitude: '',
    temperature: ''
  }
  
  const filteredData = data
    .split('\n')
    // Get the data from the HTML
    .filter(row => {
      if (row.includes('</pre>')) foundPre = false

      if (foundPre && row !== '') return true

      if (row.includes('<pre>')) foundPre = true
    })
    // Filter unneeded rows from the data, including the spot info
    .filter((row, i) => {
      if (i === 1) spot = utils.windguru.parseSpotInfo(row)
      if (i < 2) return false
      return true
    })
  
  // Group the modeldata in its own object
  const rawData = extractWindguruModel(filteredData)

  const models = rawData.map((modelData): ExtractedWindguruModelData => {
    let modelInfo: string = ''
    let legend: string[] = []

    // Filter the modelInfo and legend from the data
    const extractedModelData = modelData.filter((row, i) => {
      if (i === 0) modelInfo = utils.windguru.parseModelInfo(row)
      if (i === 1) legend = utils.windguru.parseLegend(row)

      if (i < 3) return

      return true
    })
    // Split the rows into an array of data
    .map(row => {
      return row
        .trim()
        .split(/  +/g)
    })
    // Transform the array of values into an object
    .map(values => {
      const dataObj: {[key: string]: any} = {}

      legend.forEach((item, i) => {
        dataObj[item] = values[i]
      })

      return dataObj
    })

    return {
      name: modelInfo,
      data: extractedModelData
    }
  })

  return {
    spot,
    models
  }
}

function extractWindguruModel (data: string[]): string[][] {
  let extractedData: string[][] = []
  let index = -1

  data.forEach(row => {
    if (row[0] !== ' ') {
      index++
      extractedData[index] = []
    }

    extractedData[index].push(row)
  })

  return extractedData
}



export default {
  windguruData,
}
