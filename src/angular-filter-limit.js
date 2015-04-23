'use strict';

(function (angular) {
    angular
        .module('ab.filter.limit', [])
        .filter('limit', Filter)
    ;

    function Filter() {
        return function (input, limit, startIndex) {

            if (!limit) {
                return
            }

            startIndex = startIndex || 0;

            // Strings
            if (typeof(input) === 'string') {
                return input.substring(startIndex, limit + startIndex)
            }

            // Arrays
            if (Array.isArray(input)) {
                return input.slice(startIndex, limit + startIndex);
            }

            // Objects
            if ((!Array.isArray(input)) && (typeof(input) === 'object')) {
                var out = {}, count = 0;

                limit = (limit > input.length) ? input.length : limit;
                limit = limit + startIndex;

                for (var key in input) {
                    if (input.hasOwnProperty(key)) {
                        if ((count >= startIndex) && (count < limit)) {
                            out[key] = input[key]
                        }
                        count++;
                    }
                }

                return out;
            }
        };
    }
}(angular));
