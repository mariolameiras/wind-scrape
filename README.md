## Disclaimer
This package scrapes websites. Web scraping is a grey area and may not be allowed by the website.  
Use with caution and for *personal* use only!

As per windfinder's [Terms & Conditions](https://www.windfinder.com/contact/terms/)
> 1.4.2 The data are protected in our favor by copyright or related rights.

> 1.5.2 The data may be used without our consent only for the intended use within the scope of the services offered by us; in particular the data may not be used for own software, apps, web pages, etc., unless we have expressly agreed to this use.

As per windguru's [Terms and Conditions](https://www.windguru.cz/help.php?sec=terms)
> 3.2. It is forbidden to download website content by automated scripts.

This basically means that you can't use the windfinder & windguru scrape functions in this package.  
I wasn't able to find the terms and conditions for Windy.

### Note
If you are going to use this package in a project I highly recommend implementing writing the scraped data to a file, and using this file if a website has been scraped within a certain amount of time. This avoids spamming a website with unnecessary requests.  

# Wind scrape
[![Maintainability](https://api.codeclimate.com/v1/badges/f9070ac5a17f58cd5bf0/maintainability)](https://codeclimate.com/github/jeroentvb/wind-scrape/maintainability)  
This package can scrape wind forecast from windfinder superforecast and windguru.

## Table of contents
* [Installation](#installation)
* [Usage](#usage)
  * [Windfinder](#windfinder)
  * [Windguru](#windguru)
  * [Windy](#windy)
  * [Windfinder report](#report)
<!-- * [Testing](#testing) -->

## Installation
```sh
npm install jeroentvb/wind-scrape#dist

# Or get a specific version e.g. v3.0.1

npm install https://github.com/jeroentvb/wind-scrape/releases/download/{ VERSION }/dist.tgz
```
The upper command always gets the newest version (on every `npm install`) from the dist branch. With the second command you can specify a release version (which won't be updated on every `npm install`).
Releases can be found [here](https://github.com/jeroentvb/wind-scrape/releases).

## Usage
```js
const scrape = require('wind-scrape')

// TypeScript
import * as scrape from 'wind-scrape'

// Scrape windfinder spot
scrape.windfinder('tarifa')
  .then(data => console.log(data)
  .catch(err => console.error(err)

// Scrape windguru spot
scrape.windguru(43)
  .then(data => console.log(data)
  .catch(err => console.error(err)

// Scrape windy spot
scrape.windy(36.012, -5.611)
  .then(data => console.log(data)
  .catch(err => console.error(err)

// Scrape windreport of a windguru spot
scrape.windReport('tarifa')
  .then(data => console.log(data)
  .catch(err => console.error(err)
```

### windfinder
**scrape.windfinder(spotname)**  
Scrapes data from a windfinder superforecast page. Returns a promise which resolves in an object with the following format:
<details>
 <summary>Windfinder data format</summary>
 
 ```json
{
    "name": "Windfinder",
    "spot": "Tarifa Centro",
    "days": [
        {
            "date": "Sunday, Apr 07",
            "hours": [
                {
                    "hour": 7,
                    "windspeed": 16,
                    "windgust": 24,
                    "winddirection": 265,
                    "temperature": 14
                }
            ]
        }
    ]
}
```  
</details>

It also slices the data to only return day hours.

#### spotname  
A string. Name of the spot to scrape. This is the part after `https://www.windfinder.com/weatherforecast/`.  
Example: to scrape data for Tarifa Centro, use `tarifa`.

### windguru
**scrape.windguru(url, modelNumbers)**  
Scrapes data from selected windguru model (tables). Returns a promise which resolves in an object with the following format:
<details>
 <summary>Windguru data format</summary>
 
```json
{
    "spot": {
        "name": "Spain - Tarifa",
        "coordinates": {
            "lat": "36",
            "lng": "-5.65"
        },
        "altitude": "16 C"
    },
    "models": [
        {
            "name": "GFS 27 km",
            "days": [
                {
                    "date": "Tue 4",
                    "hours": [
                        {
                            "wspd": "1",
                            "gust": "2",
                            "wdirn": "N",
                            "wdeg": "352",
                            "tmp": "16",
                            "slp": "1027",
                            "hcld": "0",
                            "mcld": "0",
                            "lcld": "-",
                            "apcp": "0",
                            "rh": "68",
                            "hour": "10"
                        }
```
</details>

The included data may vary per forecast model. You can find the keys of variables on the [windguru micro help page](http://micro.windguru.cz/help.php). The only variable all hours have is `hour`.  
Wave models are now included as well. They have different variables.

#### spotnumber
A string or integer. The number windguru uses for a spot.  
Example: to scrape data for Tarifa, use `43`. You can get this number from the url of the forecast for a spot.

### Windy
**scrape.windy(lat, long)**  
Scrapes data for a custom location. Returns a promise which resolves in an object with the following format:
<details>
 <summary>Windguru data format</summary>
 
```json
{
    "name": "Windy",
    "models": [
        {
            "name": "ECMWF 9km",
            "days": [
                {
                    "date": "07-04-2019",
                    "hours": [
                        {
                            "hour": 9,
                            "windspeed": 20,
                            "windgust": 30,
                            "winddirection": 278
                        }
                    ]
                }
            ]
        }
    ]
}
```  
</details>

#### lat
Latitude of a spot

#### long
Longitude of a spot. Together these make up the coordinates of a spot.
Consider the following windy url `https://www.windy.com/36.012/-5.611/wind?`. `36.012` would be the latitude, `-5.611` the longitude.  
I recommend using windy specific coordinates. Though, any set of coordinates should work.

### WindReport
**scrape.windReport(spotname)**  
Gets the report data for a windfinder spot report. Returns a promise which resolves in an object with the following format:
<details>
 <summary>Windguru data format</summary>
 
```json
{
    "name": "Windfinder report",
    "spot": "tarifa",
    "report": [
        {
            "windspeed": 17,
            "windgust": 25,
            "winddirection": 260,
            "time": "2019-04-06T15:00:00+02:00"
        }
    ]
}
```   
</details>
Time is given in ISO8601 format.

<!-- ## Testing
To test newly added features just run one of the following commands. If the test is succesful a file containing the scraped data will be written in the root of the project.  
The spot used is *Tarifa*.
```sh
# Test all scrape functions  
npm test  

# Test the windfinder function
npm run test:windfinder  

# Test the windguru function  
npm run test:windguru  

# Test the windy function  
npm run test:windy  

# Test the windReport function
npm run test:windreport
``` -->
