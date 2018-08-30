'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _allTheCities = require('all-the-cities');

var _allTheCities2 = _interopRequireDefault(_allTheCities);

var _kdbush = require('kdbush');

var _kdbush2 = _interopRequireDefault(_kdbush);

var _geokdbush = require('geokdbush');

var _geokdbush2 = _interopRequireDefault(_geokdbush);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _expression = (0, _kdbush2.default)(_allTheCities2.default, function (v) {
    return v.lon;
}, function (v) {
    return v.lat;
});

var SearchCities = function () {
    function SearchCities() {
        _classCallCheck(this, SearchCities);
    }

    _createClass(SearchCities, [{
        key: 'geosearch',
        value: function geosearch(latitude, longitude, radius, maxResults) {
            if (!isNaN(latitude) && !isNaN(longitude)) {
                var result = _geokdbush2.default.around(_expression, longitude, latitude, maxResults, radius);
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
    }, {
        key: 'namesearch',
        value: function namesearch(name, radius, maxResults) {
            if (name != null && name != '') {
                var result = _allTheCities2.default.filter(function (city) {
                    return city.name == name;
                });
                if (result.length > 0) {
                    return this.geosearch(result[0].lat, result[0].lon, radius, maxResults);
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
    }]);

    return SearchCities;
}();

exports.default = SearchCities;
