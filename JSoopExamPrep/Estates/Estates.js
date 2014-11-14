function processEstatesAgencyCommands(commands) {

    'use strict';

    Object.prototype.inherits = function(parent) {
        if (!Object.create) {
            Object.prototype.create = function(proto) {
                function F() {};
                F.prototype = proto;
                return new F();
            };
        };

        this.prototype = Object.create(parent.prototype);
        this.prototype.constructor = this;
    }

    Object.prototype.isValidString = function(str) {
        switch (str) {
            case "":
            case 0:
            case "0":
            case null:
            case false:
            case typeof str == "undefined":
            case undefined:
                return false;
            default:
                return true;
        }
    };

    Object.prototype.isValidNumber = function(num) {
        if (!isNaN(parseFloat(num)) && isFinite(num) && num % 1 === 0) {
            return true;
        } else {
            return false;
        }
    };

    Object.prototype.isValidBoolean = function(bool) {
        if (!isNullOrUndefind(bool)) {
            return bool.constructor === Boolean;
        } else {
            return false;
        }

        function isNullOrUndefind(bool) {
            switch (bool) {
                case null:
                case undefined:
                    return true;
                default:
                    return false;
            }
        };
    };

    var Estate = (function() {
        function Estate(name, area, location, isFurnitured) {
            if (this.constructor === Estate) {
                throw {
                    message: "Can't instantiate abstract class Estate"
                }
            }
            this.setName(name);
            this.setArea(area);
            this.setLocation(location);
            this.setIsFurnitured(isFurnitured);
        }
        Estate.prototype.getName = function() {
            return this._name;
        };

        Estate.prototype.setName = function(name) {
            if (isValidString(name)) {
                this._name = name;
            } else {
                throw new Error('The name should be non-empty string.');
            }
        };

        Estate.prototype.getArea = function() {
            return this._area;
        };

        Estate.prototype.setArea = function(area) {
            if (isValidNumber(area) && area > 0 && area <= 10000) {
                this._area = area;
            } else {
                throw new Error('The area should be integer between 1 and 10000.');
            }
        };

        Estate.prototype.getLocation = function() {
            return this._location;
        };

        Estate.prototype.setLocation = function(location) {
            if (isValidString(location)) {
                this._location = location;
            } else {
                throw new Error('The location should be non-empty string.');
            }
        };

        Estate.prototype.getIsFurnitured = function() {
            return this._isFurnitured;
        };

        Estate.prototype.setIsFurnitured = function(isFurnitured) {
            if (isValidBoolean(isFurnitured)) {
                this._isFurnitured = isFurnitured;
            } else {
                throw new Error('The isFurnitured should be boolean.');
            }
        };

        Estate.prototype.toString = function() {
            return this.constructor.name + ': Name = ' +
                this.getName() + ', Area = ' +
                this.getArea() + ', Location = ' +
                this.getLocation() + ', Furnitured = ' +
                (this.getIsFurnitured() ? 'Yes' : 'No');
        };

        return Estate;
    }());


    var BuildingEstate = (function() {
        function BuildingEstate(name, area, location, isFurnitured, rooms, hasElevator) {
            if (this.constructor === BuildingEstate) {
                throw {
                    message: "Can't instantiate abstract class BuildingEstate"
                }
            }
            Estate.call(this, name, area, location, isFurnitured);
            this.setRooms(rooms);
            this.setHasElevator(hasElevator);
        };

        BuildingEstate.inherits(Estate);

        BuildingEstate.prototype.getRooms = function() {
            return this._rooms;
        };

        BuildingEstate.prototype.setRooms = function(rooms) {
            if (isValidNumber(rooms) && rooms >= 0 && rooms <= 100) {
                this._rooms = rooms;
            } else {
                throw new Error('The rooms should be integer between 0 and 100.');
            }
        };

        BuildingEstate.prototype.getHasElevator = function() {
            return this._hasElevator;
        };

        BuildingEstate.prototype.setHasElevator = function(hasElevator) {
            if (isValidBoolean(hasElevator)) {
                this._hasElevator = hasElevator;
            } else {
                throw new Error('The hasElevator should be boolean.');
            }
        };

        BuildingEstate.prototype.toString = function() {
            var base = Estate.prototype.toString.call(this);
            return base + ', Rooms: ' +
                this.getRooms() + ', Elevator: ' +
                (this.getHasElevator() ? 'Yes' : 'No');
        };

        return BuildingEstate;
    }());

    var Apartment = (function() {
        function Apartment(name, area, location, isFurnitured, rooms, hasElevator) {
            BuildingEstate.call(this, name, area, location, isFurnitured, rooms, hasElevator);
        };

        Apartment.inherits(BuildingEstate);

        return Apartment;
    }());

    var Office = (function() {
        function Office(name, area, location, isFurnitured, rooms, hasElevator) {
            BuildingEstate.call(this, name, area, location, isFurnitured, rooms, hasElevator);
        };

        Office.inherits(BuildingEstate);

        return Office;
    }());

    var House = (function() {
        function House(name, area, location, isFurnitured, floors) {
            Estate.call(this, name, area, location, isFurnitured);
            this.setFloors(floors);
        };

        House.inherits(Estate);

        House.prototype.getFloors = function() {
            return this._floors;
        };

        House.prototype.setFloors = function(floors) {
            if (isValidNumber(floors) && floors >= 1 && floors <= 10) {
                this._floors = floors;
            } else {
                throw new Error('The floors should be integer between 1 and 10.');
            }
        };

        House.prototype.toString = function() {
            var base = Estate.prototype.toString.call(this);
            return base + ', Floors: ' + this.getFloors();
        };

        return House;
    }());

    var Garage = (function() {
        function Garage(name, area, location, isFurnitured, width, height) {
            Estate.call(this, name, area, location, isFurnitured, width);
            this.setWidth(width);
            this.setHeight(height);
        };

        Garage.inherits(Estate);

        Garage.prototype.getWidth = function() {
            return this._width;
        };

        Garage.prototype.setWidth = function(width) {
            if (isValidNumber(width) && width >= 1 && width <= 500) {
                this._width = width;
            } else {
                throw new Error('The width should be integer between 1 and 500.');
            }
        };

        Garage.prototype.getHeight = function() {
            return this._height;
        };

        Garage.prototype.setHeight = function(height) {
            if (isValidNumber(height) && height >= 1 && height <= 500) {
                this._height = height;
            } else {
                throw new Error('The height should be integer between 1 and 500.');
            }
        };

        Garage.prototype.toString = function() {
            var base = Estate.prototype.toString.call(this);
            return base + ', Width: ' +
                this.getWidth() + ', Height: ' +
                this.getHeight();
        };

        return Garage;
    }());

    var Offer = (function() {
        function Offer(estate, price) {
            if (this.constructor === Offer) {
                throw {
                    message: "Can't instantiate abstract class Offer"
                }
            }
            this.setEstate(estate);
            this.setPrice(price);
        };

        Offer.prototype.getEstate = function() {
            return this._estate;
        };

        Offer.prototype.setEstate = function(estate) {
            if (!estate) {
                throw new Error('The etate should be real estate.');
            };
            this._estate = estate;
        };

        Offer.prototype.getPrice = function() {
            return this._price;
        };

        Offer.prototype.setPrice = function(price) {
            if (isValidNumber(price) && price >= 0) {
                this._price = price;
            } else {
                throw new Error('The price should be positive integer.');
            }
        };

        Offer.prototype.toString = function() {
            return this.constructor.name.substring(0, 4) + ': Estate = ' +
                this.getEstate().getName() + ', Location = ' +
                this.getEstate().getLocation() + ', Price = ' +
                this.getPrice();
        };

        return Offer;
    }());

    var RentOffer = (function() {
        function RentOffer(estate, price) {
            Offer.call(this, estate, price);
        };

        RentOffer.inherits(Offer);

        return RentOffer;
    }());

    var SaleOffer = (function() {
        function SaleOffer(estate, price) {
            Offer.call(this, estate, price);
        };

        SaleOffer.inherits(Offer);

        return SaleOffer;
    }());


    var EstatesEngine = (function() {
        var _estates;
        var _uniqueEstateNames;
        var _offers;

        function initialize() {
            _estates = [];
            _uniqueEstateNames = {};
            _offers = [];
        }

        function executeCommand(command) {
            var cmdParts = command.split(' ');
            var cmdName = cmdParts[0];
            var cmdArgs = cmdParts.splice(1);
            switch (cmdName) {
                case 'create':
                    return executeCreateCommand(cmdArgs);
                case 'status':
                    return executeStatusCommand();
                case 'find-sales-by-location':
                    return executeFindSalesByLocationCommand(cmdArgs[0]);
                case 'find-rents-by-location':
                    return executeFindRentsByLocationCommand(cmdArgs[0]);
                case 'find-rents-by-price':
                    return executeFindRentsByPriceCommand(cmdArgs[0], cmdArgs[1]);
                default:
                    throw new Error('Unknown command: ' + cmdName);
            }
        }

        function executeCreateCommand(cmdArgs) {
            var objType = cmdArgs[0];
            switch (objType) {
                case 'Apartment':
                    var apartment = new Apartment(cmdArgs[1], Number(cmdArgs[2]), cmdArgs[3],
                        parseBoolean(cmdArgs[4]), Number(cmdArgs[5]), parseBoolean(cmdArgs[6]));
                    addEstate(apartment);
                    break;
                case 'Office':
                    var office = new Office(cmdArgs[1], Number(cmdArgs[2]), cmdArgs[3],
                        parseBoolean(cmdArgs[4]), Number(cmdArgs[5]), parseBoolean(cmdArgs[6]));
                    addEstate(office);
                    break;
                case 'House':
                    var house = new House(cmdArgs[1], Number(cmdArgs[2]), cmdArgs[3],
                        parseBoolean(cmdArgs[4]), Number(cmdArgs[5]));
                    addEstate(house);
                    break;
                case 'Garage':
                    var garage = new Garage(cmdArgs[1], Number(cmdArgs[2]), cmdArgs[3],
                        parseBoolean(cmdArgs[4]), Number(cmdArgs[5]), Number(cmdArgs[6]));
                    addEstate(garage);
                    break;
                case 'RentOffer':
                    var estate = findEstateByName(cmdArgs[1]);
                    var rentOffer = new RentOffer(estate, Number(cmdArgs[2]));
                    addOffer(rentOffer);
                    break;
                case 'SaleOffer':
                    estate = findEstateByName(cmdArgs[1]);
                    var saleOffer = new SaleOffer(estate, Number(cmdArgs[2]));
                    addOffer(saleOffer);
                    break;
                default:
                    throw new Error('Unknown object to create: ' + objType);
            }
            return objType + ' created.';
        }

        function parseBoolean(value) {
            switch (value) {
                case "true":
                    return true;
                case "false":
                    return false;
                default:
                    throw new Error("Invalid boolean value: " + value);
            }
        }

        function findEstateByName(estateName) {
            for (var i = 0; i < _estates.length; i++) {
                if (_estates[i].getName() == estateName) {
                    return _estates[i];
                }
            }
            return undefined;
        }

        function addEstate(estate) {
            if (_uniqueEstateNames[estate.getName()]) {
                throw new Error('Duplicated estate name: ' + estate.getName());
            }
            _uniqueEstateNames[estate.getName()] = true;
            _estates.push(estate);
        }

        function addOffer(offer) {
            _offers.push(offer);
        }

        function executeStatusCommand() {
            var result = '',
                i;
            if (_estates.length > 0) {
                result += 'Estates:\n';
                for (i = 0; i < _estates.length; i++) {
                    result += "  " + _estates[i].toString() + '\n';
                }
            } else {
                result += 'No estates\n';
            }

            if (_offers.length > 0) {
                result += 'Offers:\n';
                for (i = 0; i < _offers.length; i++) {
                    result += "  " + _offers[i].toString() + '\n';
                }
            } else {
                result += 'No offers\n';
            }

            return result.trim();
        }

        function executeFindSalesByLocationCommand(location) {
            if (!location) {
                throw new Error("Location cannot be empty.");
            }
            var selectedOffers = _offers.filter(function(offer) {
                return offer.getEstate().getLocation() === location &&
                    offer instanceof SaleOffer;
            });
            selectedOffers.sort(function(a, b) {
                return a.getEstate().getName().localeCompare(b.getEstate().getName());
            });
            return formatQueryResults(selectedOffers);
        }

        function executeFindRentsByLocationCommand(location) {
            if (!location) {
                throw new Error("Location cannot be empty.");
            }
            var selectedOffers = _offers.filter(function(offer) {
                return offer.getEstate().getLocation() === location &&
                    offer instanceof RentOffer;
            });
            selectedOffers.sort(function(a, b) {
                return a.getEstate().getName().localeCompare(b.getEstate().getName());
            });
            return formatQueryResults(selectedOffers);
        }

        function executeFindRentsByPriceCommand(min, max) {
            if (!isValidNumber(min) || !isValidNumber(max)) {
                throw new Error("Minimum or maximum price cannot be empty.");
            }
            var minPrice = Math.min(min, max);
            var maxPrice = Math.max(min, max);

            var selectedOffers = _offers.filter(function(offer) {
                return offer.getPrice() <= maxPrice &&
                    offer.getPrice() >= minPrice &&
                    offer instanceof RentOffer;
            });

            selectedOffers.sort(function(a, b) {
                var criterion1A = a.getPrice(),
                    criterion1B = b.getPrice();

                if (criterion1A === criterion1B) {
                    // Second criteria logic
                    var criterion2A = a.getEstate().getName(),
                        criterion2B = b.getEstate().getName();

                    return criterion2A < criterion2B ? -1 : criterion2A > criterion2B ? 1 : 0;
                }
                //first criteria logic
                return criterion1A - criterion1B;
            });

            return formatQueryResults(selectedOffers);
        }


        function formatQueryResults(offers) {
            var result = '';
            if (offers.length == 0) {
                result += 'No Results\n';
            } else {
                result += 'Query Results:\n';
                for (var i = 0; i < offers.length; i++) {
                    var offer = offers[i];
                    result += '  [Estate: ' + offer.getEstate().getName() +
                        ', Location: ' + offer.getEstate().getLocation() +
                        ', Price: ' + offer.getPrice() + ']\n';
                }
            }
            return result.trim();
        }

        return {
            initialize: initialize,
            executeCommand: executeCommand
        };
    }());


    // Process the input commands and return the results
    var results = '';
    EstatesEngine.initialize();
    commands.forEach(function(cmd) {
        if (cmd != '') {
            try {
                var cmdResult = EstatesEngine.executeCommand(cmd);
                results += cmdResult + '\n';
            } catch (err) {
                // console.log(err);
                results += 'Invalid command.\n';
            }
        }
    });
    return results.trim();

}

// ------------------------------------------------------------
// Read the input from the console as array and process it
// Remove all below code before submitting to the judge system!
// ------------------------------------------------------------

(function() {
    var arr = [];
    if (typeof(require) == 'function') {
        // We are in node.js --> read the console input and process it
        require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        }).on('line', function(line) {
            arr.push(line);
        }).on('close', function() {
            console.log(processEstatesAgencyCommands(arr));
        });
    }
})();
