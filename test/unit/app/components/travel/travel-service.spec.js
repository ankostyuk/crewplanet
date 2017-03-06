'use strict';

/**
 * @author ankostyuk
 */

describe('app travelService', function(){
    var $httpBackend, travelService;

    beforeEach(angular.mock.module('app'));

    beforeEach(inject(function($injector) {
        travelService = $injector.get('travelService');
        $httpBackend = $injector.get('$httpBackend');

        //
        $httpBackend.whenGET(/places.aviasales.ru\/match/).respond(function(method, url, data, headers, params){
            return [200, require('./places-aviasales-match--' + params.term + '.json')];
        });
    }));

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('travelService.searchPoint("lon"), locale = en', function() {
        travelService.searchPoint('lon', function(points) {
            expect(points).to.have.lengthOf(3);

            // LON
            expect(points).to.have.deep.property('[0].city._type', 'city');
            expect(points).to.have.deep.property('[0].city.iata', 'LON');
            expect(points).to.have.deep.property('[0].airports.length', 6);
            
            // LON -> LHR
            expect(points).to.have.deep.property('[0].airports[0]._type', 'airport');
            expect(points).to.have.deep.property('[0].airports[0].iata', 'LHR');
            expect(points).to.have.deep.property('[0].airports[0].city_iata', 'LON');

            // LON -> LGW
            expect(points).to.have.deep.property('[0].airports[1]._type', 'airport');
            expect(points).to.have.deep.property('[0].airports[1].iata', 'LGW');
            expect(points).to.have.deep.property('[0].airports[1].city_iata', 'LON');

            // LON -> STN
            expect(points).to.have.deep.property('[0].airports[2]._type', 'airport');
            expect(points).to.have.deep.property('[0].airports[2].iata', 'STN');
            expect(points).to.have.deep.property('[0].airports[2].city_iata', 'LON');

            // LON -> LTN
            expect(points).to.have.deep.property('[0].airports[3]._type', 'airport');
            expect(points).to.have.deep.property('[0].airports[3].iata', 'LTN');
            expect(points).to.have.deep.property('[0].airports[3].city_iata', 'LON');

            // LON -> LCY
            expect(points).to.have.deep.property('[0].airports[4]._type', 'airport');
            expect(points).to.have.deep.property('[0].airports[4].iata', 'LCY');
            expect(points).to.have.deep.property('[0].airports[4].city_iata', 'LON');

            // LON -> SEN
            expect(points).to.have.deep.property('[0].airports[5]._type', 'airport');
            expect(points).to.have.deep.property('[0].airports[5].iata', 'SEN');
            expect(points).to.have.deep.property('[0].airports[5].city_iata', 'LON');

            // LGB
            expect(points).to.have.deep.property('[1].city', null);
            expect(points).to.have.deep.property('[1].airports.length', 1);
            expect(points).to.have.deep.property('[1].airports[0]._type', 'airport');
            expect(points).to.have.deep.property('[1].airports[0].iata', 'LGB');
            expect(points).to.have.deep.property('[1].airports[0].city_iata', 'LGB');

            // YXU
            expect(points).to.have.deep.property('[2].city._type', 'city');
            expect(points).to.have.deep.property('[2].city.iata', 'YXU');
            expect(points).to.have.deep.property('[2].airports.length', 1);

            // YXU -> YXU
            expect(points).to.have.deep.property('[2].airports[0]._type', 'airport');
            expect(points).to.have.deep.property('[2].airports[0].iata', 'YXU');
            expect(points).to.have.deep.property('[2].airports[0].city_iata', 'YXU');
        });

        $httpBackend.flush();
    });

    it('travelService.searchPoint("мос"), locale = ru', function() {
        travelService.searchPoint('мос', function(points) {
            expect(points).to.have.lengthOf(5);

            // MOW
            expect(points).to.have.deep.property('[0].city._type', 'city');
            expect(points).to.have.deep.property('[0].city.iata', 'MOW');
            expect(points).to.have.deep.property('[0].airports.length', 4);

            // MOW -> DME
            expect(points).to.have.deep.property('[0].airports[0]._type', 'airport');
            expect(points).to.have.deep.property('[0].airports[0].iata', 'DME');
            expect(points).to.have.deep.property('[0].airports[0].city_iata', 'MOW');

            // MOW -> SVO
            expect(points).to.have.deep.property('[0].airports[1]._type', 'airport');
            expect(points).to.have.deep.property('[0].airports[1].iata', 'SVO');
            expect(points).to.have.deep.property('[0].airports[1].city_iata', 'MOW');

            // MOW -> VKO
            expect(points).to.have.deep.property('[0].airports[2]._type', 'airport');
            expect(points).to.have.deep.property('[0].airports[2].iata', 'VKO');
            expect(points).to.have.deep.property('[0].airports[2].city_iata', 'MOW');

            // MOW -> ZIA
            expect(points).to.have.deep.property('[0].airports[3]._type', 'airport');
            expect(points).to.have.deep.property('[0].airports[3].iata', 'ZIA');
            expect(points).to.have.deep.property('[0].airports[3].city_iata', 'MOW');

            // OMO
            expect(points).to.have.deep.property('[1].city', null);
            expect(points).to.have.deep.property('[1].airports.length', 1);
            expect(points).to.have.deep.property('[1].airports[0]._type', 'airport');
            expect(points).to.have.deep.property('[1].airports[0].iata', 'OMO');
            expect(points).to.have.deep.property('[1].airports[0].city_iata', 'OMO');

            // OSM
            expect(points).to.have.deep.property('[2].city', null);
            expect(points).to.have.deep.property('[2].airports.length', 1);
            expect(points).to.have.deep.property('[2].airports[0]._type', 'airport');
            expect(points).to.have.deep.property('[2].airports[0].iata', 'OSM');
            expect(points).to.have.deep.property('[2].airports[0].city_iata', 'OSM');

            // LAX
            expect(points).to.have.deep.property('[3].city._type', 'city');
            expect(points).to.have.deep.property('[3].city.iata', 'LAX');
            expect(points).to.have.deep.property('[3].airports.length', 1);

            // LAX -> LAX
            expect(points).to.have.deep.property('[3].airports[0]._type', 'airport');
            expect(points).to.have.deep.property('[3].airports[0].iata', 'LAX');
            expect(points).to.have.deep.property('[3].airports[0].city_iata', 'LAX');

            // KGS
            expect(points).to.have.deep.property('[4].city', null);
            expect(points).to.have.deep.property('[4].airports.length', 1);
            expect(points).to.have.deep.property('[4].airports[0]._type', 'airport');
            expect(points).to.have.deep.property('[4].airports[0].iata', 'KGS');
            expect(points).to.have.deep.property('[4].airports[0].city_iata', 'KGS');

        });

        $httpBackend.flush();
    });
});
