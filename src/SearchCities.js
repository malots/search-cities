'use strict';

import cities from 'all-the-cities';
import kdbush from 'kdbush';
import geokdbush from 'geokdbush';

const _expression = kdbush(cities, v => v.lon, v => v.lat);

class SearchCities {

    geosearch(latitude, longitude, radius, maxResults) {
        if (!isNaN(latitude) && !isNaN(longitude)) {
            let result = geokdbush.around(_expression, longitude, latitude, maxResults, radius);
            if (result.length > 0) {
                return {
                    status: true,
                    data: result
                };
            } else {
                return {
                    status: false,
                    message: 'Not found'
                };
            }
        } else {
            return {
                status: false,
                message: 'Latitude and Longitude must be numbers'
            };
        }
    }

    namesearch(name, radius, maxResults) {
        if (name != null && name != '') {
            let result = cities.filter(city => {
                return city.name.toLowerCase().trim() == name.toLowerCase().trim();
            });
            if (result.length > 0) {
                return this.geosearch(result[0].lat,result[0].lon,radius,maxResults);
            } else {
                return {
                    status: false,
                    message: 'Not found'
                };
            }
        } else {
            return {
                status: false,
                message: 'Name is required'
            };
        }
    }
}

export default SearchCities;