'use strict';

import SearchCities from '..';
import test from 'tape';

test('Should return a valid list of citis', t => {
    let search = new SearchCities();
    t.plan(2);
    let result = search.search(-25.4284,-49.2733, 20, 2);
    t.true(result.status);
    t.equal(result.data[0].name,'Curitiba');
    t.end();
});

