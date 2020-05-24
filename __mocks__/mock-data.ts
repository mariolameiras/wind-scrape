module.exports = {
  windguru: {
    html: require('./windguru/html.mock'),
    extractedData: require('./windguru/extracted-data.mock'),
    parsedData: require('./windguru/parsed-data.mock'),
    url: 'http://micro.windguru.cz/?s=43&m=all',
    spotString: 'Spain - Tarifa,  lat: 36, lon: -5.65, SST: 16 C',
    spotInfo: require('./windguru/spot-info.mock'),
    legendString: 'Date    WSPD    GUST   WDIRN    WDEG     TMP     SLP    HCLD    MCLD    LCLD    APCP      RH',
    legend: require('./windguru/legend.mock'),
    fullDateTime: 'Tue 11. 19h',
    date: 'Tue 11',
    hour: '19'
  }
}
