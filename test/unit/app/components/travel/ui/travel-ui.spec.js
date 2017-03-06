'use strict';

/**
 * @author ankostyuk
 */

describe('app travel ui', function(){
    var $controller, $httpBackend;

    function createAppTravelFormController(scope) {
        return $controller('appTravelFormController', {
            $scope: scope
        });
    }

    beforeEach(angular.mock.module('app'));

    beforeEach(inject(function($injector) {
        $controller = $injector.get('$controller');
        $httpBackend = $injector.get('$httpBackend');

        //
        $httpBackend.whenGET(/places.aviasales.ru\/match/).respond(function(method, url, data, headers, params){
            return [200, require('../places-aviasales-match--' + params.term + '.json')];
        });
    }));

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('appTravelFormController.searchDepartures("lon"), locale = en', function() {
        var $scope      = {},
            controller  = createAppTravelFormController($scope);

        $scope.searchDepartures('lon');
        $httpBackend.flush();

        expect($scope).to.have.deep.property('departures.length', 9);

        // LON
        expect($scope).to.have.deep.property('departures[0].iata', 'LON');
        expect($scope).to.have.deep.property('departures[0]._type', 'city');
        expect($scope).to.have.deep.property('departures[0]._level', 1);
        expect($scope).to.have.deep.property('departures[0]._shortDisplayName', 'London, United Kingdom (LON)');
        expect($scope).to.have.deep.property('departures[0]._fullDisplayName', 'London, United Kingdom (LON)');

        // LON -> LHR
        expect($scope).to.have.deep.property('departures[1].iata', 'LHR');
        expect($scope).to.have.deep.property('departures[1]._type', 'airport');
        expect($scope).to.have.deep.property('departures[1]._level', 2);
        expect($scope).to.have.deep.property('departures[1]._shortDisplayName', 'Heathrow (LHR)');
        expect($scope).to.have.deep.property('departures[1]._fullDisplayName', 'Heathrow, London, United Kingdom (LHR)');

        // LON -> LGW
        expect($scope).to.have.deep.property('departures[2].iata', 'LGW');
        expect($scope).to.have.deep.property('departures[2]._type', 'airport');
        expect($scope).to.have.deep.property('departures[2]._level', 2);
        expect($scope).to.have.deep.property('departures[2]._shortDisplayName', 'Gatwick (LGW)');
        expect($scope).to.have.deep.property('departures[2]._fullDisplayName', 'Gatwick, London, United Kingdom (LGW)');

        // LON -> STN
        expect($scope).to.have.deep.property('departures[3].iata', 'STN');
        expect($scope).to.have.deep.property('departures[3]._type', 'airport');
        expect($scope).to.have.deep.property('departures[3]._level', 2);
        expect($scope).to.have.deep.property('departures[3]._shortDisplayName', 'Stansted (STN)');
        expect($scope).to.have.deep.property('departures[3]._fullDisplayName', 'Stansted, London, United Kingdom (STN)');

        // LON -> LTN
        expect($scope).to.have.deep.property('departures[4].iata', 'LTN');
        expect($scope).to.have.deep.property('departures[4]._type', 'airport');
        expect($scope).to.have.deep.property('departures[4]._level', 2);
        expect($scope).to.have.deep.property('departures[4]._shortDisplayName', 'Luton Airport (LTN)');
        expect($scope).to.have.deep.property('departures[4]._fullDisplayName', 'Luton Airport, London, United Kingdom (LTN)');

        // LON -> LCY
        expect($scope).to.have.deep.property('departures[5].iata', 'LCY');
        expect($scope).to.have.deep.property('departures[5]._type', 'airport');
        expect($scope).to.have.deep.property('departures[5]._level', 2);
        expect($scope).to.have.deep.property('departures[5]._shortDisplayName', 'London City Airport (LCY)');
        expect($scope).to.have.deep.property('departures[5]._fullDisplayName', 'London City Airport, London, United Kingdom (LCY)');

        // LON -> SEN
        expect($scope).to.have.deep.property('departures[6].iata', 'SEN');
        expect($scope).to.have.deep.property('departures[6]._type', 'airport');
        expect($scope).to.have.deep.property('departures[6]._level', 2);
        expect($scope).to.have.deep.property('departures[6]._shortDisplayName', 'Southend (SEN)');
        expect($scope).to.have.deep.property('departures[6]._fullDisplayName', 'Southend, London, United Kingdom (SEN)');

        // LGB
        expect($scope).to.have.deep.property('departures[7].iata', 'LGB');
        expect($scope).to.have.deep.property('departures[7]._type', 'airport');
        expect($scope).to.have.deep.property('departures[7]._level', 1);
        expect($scope).to.have.deep.property('departures[7]._shortDisplayName', 'Long Beach Municipal, Long Beach, CA, United States (LGB)');
        expect($scope).to.have.deep.property('departures[7]._fullDisplayName', 'Long Beach Municipal, Long Beach, CA, United States (LGB)');

        // YXU
        expect($scope).to.have.deep.property('departures[8].iata', 'YXU');
        expect($scope).to.have.deep.property('departures[8]._type', 'airport');
        expect($scope).to.have.deep.property('departures[8]._level', 1);
        expect($scope).to.have.deep.property('departures[8]._shortDisplayName', 'London International, London, ON, Canada (YXU)');
        expect($scope).to.have.deep.property('departures[8]._fullDisplayName', 'London International, London, ON, Canada (YXU)');
    });

    it('appTravelFormController.searchArrivals("мос"), locale = ru', function() {
        var $scope      = {},
            controller  = createAppTravelFormController($scope);

        $scope.searchArrivals('мос');
        $httpBackend.flush();

        expect($scope).to.have.deep.property('arrivals.length', 9);

        // MOW
        expect($scope).to.have.deep.property('arrivals[0].iata', 'MOW');
        expect($scope).to.have.deep.property('arrivals[0]._type', 'city');
        expect($scope).to.have.deep.property('arrivals[0]._level', 1);
        expect($scope).to.have.deep.property('arrivals[0]._shortDisplayName', 'Москва, Россия (MOW)');
        expect($scope).to.have.deep.property('arrivals[0]._fullDisplayName', 'Москва, Россия (MOW)');

        // MOW -> DME
        expect($scope).to.have.deep.property('arrivals[1].iata', 'DME');
        expect($scope).to.have.deep.property('arrivals[1]._type', 'airport');
        expect($scope).to.have.deep.property('arrivals[1]._level', 2);
        expect($scope).to.have.deep.property('arrivals[1]._shortDisplayName', 'Домодедово (DME)');
        expect($scope).to.have.deep.property('arrivals[1]._fullDisplayName', 'Домодедово, Москва, Россия (DME)');

        // MOW -> SVO
        expect($scope).to.have.deep.property('arrivals[2].iata', 'SVO');
        expect($scope).to.have.deep.property('arrivals[2]._type', 'airport');
        expect($scope).to.have.deep.property('arrivals[2]._level', 2);
        expect($scope).to.have.deep.property('arrivals[2]._shortDisplayName', 'Шереметьево (SVO)');
        expect($scope).to.have.deep.property('arrivals[2]._fullDisplayName', 'Шереметьево, Москва, Россия (SVO)');

        // MOW -> VKO
        expect($scope).to.have.deep.property('arrivals[3].iata', 'VKO');
        expect($scope).to.have.deep.property('arrivals[3]._type', 'airport');
        expect($scope).to.have.deep.property('arrivals[3]._level', 2);
        expect($scope).to.have.deep.property('arrivals[3]._shortDisplayName', 'Внуково (VKO)');
        expect($scope).to.have.deep.property('arrivals[3]._fullDisplayName', 'Внуково, Москва, Россия (VKO)');

        // MOW -> ZIA
        expect($scope).to.have.deep.property('arrivals[4].iata', 'ZIA');
        expect($scope).to.have.deep.property('arrivals[4]._type', 'airport');
        expect($scope).to.have.deep.property('arrivals[4]._level', 2);
        expect($scope).to.have.deep.property('arrivals[4]._shortDisplayName', 'Жуковский (ZIA)');
        expect($scope).to.have.deep.property('arrivals[4]._fullDisplayName', 'Жуковский, Москва, Россия (ZIA)');

        // OMO
        expect($scope).to.have.deep.property('arrivals[5].iata', 'OMO');
        expect($scope).to.have.deep.property('arrivals[5]._type', 'airport');
        expect($scope).to.have.deep.property('arrivals[5]._level', 1);
        expect($scope).to.have.deep.property('arrivals[5]._shortDisplayName', 'Мостар, Босния и Герцеговина (OMO)');
        expect($scope).to.have.deep.property('arrivals[5]._fullDisplayName', 'Мостар, Босния и Герцеговина (OMO)');

        // OSM
        expect($scope).to.have.deep.property('arrivals[6].iata', 'OSM');
        expect($scope).to.have.deep.property('arrivals[6]._type', 'airport');
        expect($scope).to.have.deep.property('arrivals[6]._level', 1);
        expect($scope).to.have.deep.property('arrivals[6]._shortDisplayName', 'Мосул, Ирак (OSM)');
        expect($scope).to.have.deep.property('arrivals[6]._fullDisplayName', 'Мосул, Ирак (OSM)');

        // LAX
        expect($scope).to.have.deep.property('arrivals[7].iata', 'LAX');
        expect($scope).to.have.deep.property('arrivals[7]._type', 'airport');
        expect($scope).to.have.deep.property('arrivals[7]._level', 1);
        expect($scope).to.have.deep.property('arrivals[7]._shortDisplayName', 'Лос-Анджелес, CA, США (LAX)');
        expect($scope).to.have.deep.property('arrivals[7]._fullDisplayName', 'Лос-Анджелес, CA, США (LAX)');

        // KGS
        expect($scope).to.have.deep.property('arrivals[8].iata', 'KGS');
        expect($scope).to.have.deep.property('arrivals[8]._type', 'airport');
        expect($scope).to.have.deep.property('arrivals[8]._level', 1);
        expect($scope).to.have.deep.property('arrivals[8]._shortDisplayName', 'Гиппократес, Кос, Греция (KGS)');
        expect($scope).to.have.deep.property('arrivals[8]._fullDisplayName', 'Гиппократес, Кос, Греция (KGS)');
    });

    it('appTravelFormController -> 3 passengers from London City to Moscow Domodedovo airport', function() {
        var $scope      = {},
            controller  = createAppTravelFormController($scope);

        // departures
        $scope.searchDepartures('lon');
        $httpBackend.flush();
        $scope.travel.departure = $scope.departures[0];

        // arrivals
        $scope.searchArrivals('мос');
        $httpBackend.flush();
        $scope.travel.arrival = $scope.arrivals[1];

        // passengers
        $scope.travel.numberOfPassengers = 3;

        // Let's fly :)
        $scope.submit();

        expect($scope).to.have.deep.property('travelData.departure.iata', 'LON');
        expect($scope).to.have.deep.property('travelData.arrival.iata', 'DME');
        expect($scope).to.have.deep.property('travelData.numberOfPassengers', 3);
    });
});
