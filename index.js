const request = require('request')
const Nightmare = require('nightmare')
const nightmare = Nightmare({
  show: false
})
const extract = require('./partials/extractData')

function getHtml (url) {
  return new Promise((resolve, reject) => {
    request(url, (err, res, html) => {
      if (err) reject(err)
      resolve(html)
    })
  })
}

class Scrape {
  static windfinder (url) {
    if (!url) throw new Error('No url specified!')
    return new Promise((resolve, reject) => {
      getHtml(url)
        .then(html => extract.windfinderData(html))
        .then(windfinder => resolve(windfinder))
        .catch(err => reject(err))
    })
  }

  static windguru (url, modelNumbers) {
    if (!url) throw new Error('No url specified!')
    if (!modelNumbers) throw new Error('No model numbers specified!')
    if (!Array.isArray(modelNumbers)) throw new Error('Model numbers must be in an array!')
    return new Promise((resolve, reject) => {
      nightmare
        .goto(url)
        .wait('.spot-name')
        .wait('#tabid_2_0_dates')
        .wait('#tabid_2_0_WINDSPD')
        .wait('#tabid_2_0_GUST')
        .wait('#tabid_2_0_SMER')
        .evaluate(() => document.querySelector('body').outerHTML)
        .end()
        .then(html => extract.windguruData(html, modelNumbers))
        .then(windguru => {
          resolve(windguru)
        })
        .catch(err => reject(err))
    })
  }
}

module.exports = Scrape
