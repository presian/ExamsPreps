function processRestaurantManagerCommands(commands) {

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

    Object.prototype.isValidPositiveNumber = function(num) {
        if (!isNaN(parseFloat(num)) && isFinite(num) && num >= 0) {
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

    Array.prototype.alphabeticllySortRecipeByName = function(a, b) {
        return a.getName().localeCopare(b.getName());
    };

    var RestaurantEngine = (function() {
        var _restaurants, _recipes;

        function initialize() {
            _restaurants = [];
            _recipes = [];
        }

        var Restaurant = (function() {
            function Restaurant(name, location) {
                this.setName(name);
                this.setLocation(location);
                this._recipes = [];
            };

            Restaurant.prototype.getName = function() {
                return this._name;
            };

            Restaurant.prototype.setName = function(name) {
                if (isValidString(name)) {
                    this._name = name;
                } else {
                    throw new Error('The name should be non-empty string.');
                }
            };

            Restaurant.prototype.getLocation = function() {
                return this._location;
            };

            Restaurant.prototype.setLocation = function(location) {
                if (isValidString(location)) {
                    this._location = location;
                } else {
                    throw new Error('The location should be non-empty string.');
                }
            };

            Restaurant.prototype.addRecipe = function(recipe) {
                this._recipes.push(recipe);
            };

            Restaurant.prototype.removeRecipe = function(recipe) {
                var index = this._recipes.indexOf(recipe);
                if (index >= 0) {
                    this._recipes.splice(index, 1);
                } else {
                    throw new Error('Restaurant ' +
                        this.getName() + ' is not contain ' +
                        recipe.getName() + ' recipe.');
                }
            };

            Restaurant.prototype.printRestaurantMenu = function() {

                var header = '***** ' + this.getName() + ' - ' +
                    this.getLocation() + ' *****\n';
                var menu = '';
                if (this._recipes.length === 0) {
                    menu = 'No recipes... yet\n';
                } else {

                    var drinks = [];
                    var salads = [];
                    var mainCourses = [];
                    var desserts = [];

                    this._recipes.forEach(function(recipe) {
                        switch (recipe.constructor.name) {
                            case 'Drink':
                                drinks.push(recipe);
                                break;
                            case 'Salad':
                                salads.push(recipe);
                                break;
                            case 'MainCourse':
                                mainCourses.push(recipe);
                                break;
                            case 'Dessert':
                                desserts.push(recipe);
                                break;
                            default:
                                break;
                        }
                    });
                    if (drinks.length > 0) {

                        menu += '~~~~~ DRINKS ~~~~~\n'
                            // drinks.alphabeticllySortRecipeByName()
                        drinks.forEach(function(drink) {
                            menu += drink.toString();
                        });
                    };
                    if (salads.length > 0) {
                        menu += '~~~~~ SALADS ~~~~~\n'
                            // salads.alphabeticllySortRecipeByName();
                        salads.forEach(function(salad) {
                            menu += salad.toString();
                        });
                    };
                    if (mainCourses.length > 0) {
                        menu += '~~~~~ MAIN COURSES ~~~~~\n';
                        // mainCourses.alphabeticllySortRecipeByName();
                        mainCourses.forEach(function(mainCourse) {
                            menu += mainCourse.toString();
                        });
                    };
                    if (desserts.length > 0) {
                        menu += '~~~~~ DESSERTS ~~~~~\n';
                        // desserts.alphabeticllySortRecipeByName();
                        desserts.forEach(function(dessert) {
                            menu += dessert.toString();
                        });
                    };

                }
                return header + menu;
            };

            return Restaurant;
        }());

        var Recipe = (function() {
            function Recipe(name, price, calories, quantity, timeToPrepare) {
                if (this.constructor === Recipe) {
                    throw {
                        message: "Can't instantiate abstract class Recipe"
                    }
                }
                this.setName(name);
                this.setPrice(price);
                this.setCalories(calories);
                this.setQuantity(quantity);
                this.setTimeToPrepare(timeToPrepare);
                this.setUnit();
            };

            Recipe.prototype.getName = function() {
                return this._name;
            };

            Recipe.prototype.setName = function(name) {
                if (isValidString(name)) {
                    this._name = name;
                } else {
                    throw new Error('The name should be non-empty string.');
                }
            };

            Recipe.prototype.getPrice = function() {
                return this._price;
            };

            Recipe.prototype.setPrice = function(price) {
                if (isValidPositiveNumber(price)) {
                    this._price = price;
                } else {
                    throw new Error('The price should be positive number.');
                }
            };

            Recipe.prototype.getCalories = function() {
                return this._calories;
            };

            Recipe.prototype.setCalories = function(calories) {
                if (isValidPositiveNumber(calories)) {
                    if (this.constructor === Drink && calories > 100) {
                        throw new Error('The calories of drink should be positive number under 100.');
                    }
                    this._calories = calories;
                } else {
                    throw new Error('The clories should be positive number.');
                }
            };

            Recipe.prototype.getQuantity = function() {
                return this._quantity;
            };

            Recipe.prototype.setQuantity = function(quantity) {
                if (isValidPositiveNumber(quantity)) {
                    this._quantity = quantity;
                } else {
                    throw new Error('The quantity should be positive number.');
                }
            };

            Recipe.prototype.getTimeToPrepare = function() {
                return this._timeToPrepare;
            };

            Recipe.prototype.setTimeToPrepare = function(timeToPrepare) {
                if (isValidPositiveNumber(timeToPrepare)) {
                    if (this.constructor === Drink && timeToPrepare > 20) {
                        throw new Error('The time to prepare of drink should be under 20.');
                    }

                    this._timeToPrepare = timeToPrepare;
                } else {
                    throw new Error('The time to prepare should be positive number.');
                }
            };

            Recipe.prototype.setUnit = function() {
                if (this.constructor === Drink) {
                    this._unit = 'ml';
                } else {
                    this._unit = 'g';
                }
            };

            Recipe.prototype.toString = function() {
                return '==  ' + this.getName() + ' == $' + this.getPrice().toFixed(2) +
                    '\nPer serving: ' + this.getQuantity() + ' ' +
                    this._unit + ', ' + this.getCalories() + ' kcal' +
                    '\nReady in ' + this.getTimeToPrepare() + ' minutes\n';
            };
            return Recipe;
        }());

        var Meal = (function() {
            function Meal(name, price, calories, quantity, timeToPrepare, isVegan) {
                if (this.constructor === Meal) {
                    throw {
                        message: "Can't instantiate abstract class Meal"
                    }
                }
                Recipe.call(this, name, price, calories, quantity, timeToPrepare);
                this.setIsVegan(isVegan);

            };

            Meal.inherits(Recipe);

            Meal.prototype.getIsVegan = function() {
                return this._isVegan;
            };

            Meal.prototype.setIsVegan = function(isVegan) {
                if (isValidBoolean(isVegan)) {
                    this._isVegan = isVegan;
                } else {
                    throw new Error('The isVegan should be boolean.');
                }
            };

            Meal.prototype.toggleVegan = function() {
                this._isVegan = !this._isVegan;
            };

            Meal.prototype.toString = function() {
                var base = Recipe.prototype.toString.call(this);
                return (this.getIsVegan() ? '[VEGAN] ' : '') + base;
            };

            return Meal;
        }());

        var Drink = (function() {
            function Drink(name, price, calories, quantity, timeToPrepare, isCarbonated) {
                Recipe.call(this, name, price, calories, quantity, timeToPrepare);
                this.setIsCarbonated(isCarbonated);
            };

            Drink.inherits(Recipe);

            Drink.prototype.getIsCarbonated = function() {
                return this._isCarbonated;
            };

            Drink.prototype.setIsCarbonated = function(isCarbonated) {
                if (isValidBoolean(isCarbonated)) {
                    this._isCarbonated = isCarbonated;
                } else {
                    throw new Error('The isCarbonated should be boolean.');
                }
            };

            Drink.prototype.toString = function() {
                var base = Recipe.prototype.toString.call(this);
                return base + 'Carbonated: ' + (this.getIsCarbonated() ? 'yes' : 'no') + '\n';
            };

            return Drink;
        }());

        var Dessert = (function() {
            function Dessert(name, price, calories, quantity, timeToPrepare, isVegan) {
                Meal.call(this, name, price, calories, quantity, timeToPrepare, isVegan);
                this._withSugar = true;
            };

            Dessert.inherits(Meal);

            Dessert.prototype.toggleSugar = function() {
                this._withSugar = !this._withSugar;
            };

            Dessert.prototype.toString = function() {
                var base = Meal.prototype.toString.call(this);
                return (this._withSugar ? '' : '[NO SUGAR] ') + base;
            };

            return Dessert;
        }());

        var MainCourse = (function() {
            function MainCourse(name, price, calories, quantity, timeToPrepare, isVegan, type) {
                Meal.call(this, name, price, calories, quantity, timeToPrepare, isVegan);
                this.setType(type);
            };

            MainCourse.inherits(Meal);

            MainCourse.prototype.getType = function() {
                return this._type;
            };

            MainCourse.prototype.setType = function(type) {
                if (isValidString(type)) {
                    this._type = type;
                } else {
                    throw new Error('The type should be non-empty string.');
                }
            };

            MainCourse.prototype.toString = function() {
                var base = Meal.prototype.toString.call(this);
                return base + 'Type: ' + this.getType() + '\n';
            };

            return MainCourse;
        }());

        var Salad = (function() {
            function Salad(name, price, calories, quantity, timeToPrepare, isVegan, hasPasta) {
                Meal.call(this, name, price, calories, quantity, timeToPrepare, true);
                this.setHasPasta(hasPasta);
            };

            Salad.inherits(Meal);

            Salad.prototype.getHasPasta = function() {
                return this._hasPasta;
            };

            Salad.prototype.setHasPasta = function(hasPasta) {
                //TODO: make validation
                this._hasPasta = hasPasta;

            };

            Salad.prototype.toString = function() {
                var base = Meal.prototype.toString.call(this);
                return base + 'Contains pasta: ' + (this.getHasPasta() ? 'yes' : 'no') + '\n';
            };

            return Salad;
        }());

        var Command = (function() {

            function Command(commandLine) {
                this._params = new Array();
                this.translateCommand(commandLine);
            }

            Command.prototype.translateCommand = function(commandLine) {
                var self, paramsBeginning, name, parametersKeysAndValues;
                self = this;
                paramsBeginning = commandLine.indexOf("(");

                this._name = commandLine.substring(0, paramsBeginning);
                name = commandLine.substring(0, paramsBeginning);
                parametersKeysAndValues = commandLine
                    .substring(paramsBeginning + 1, commandLine.length - 1)
                    .split(";")
                    .filter(function(e) {
                        return true
                    });

                parametersKeysAndValues.forEach(function(p) {
                    var split = p
                        .split("=")
                        .filter(function(e) {
                            return true;
                        });
                    self._params[split[0]] = split[1];
                });
            }

            return Command;
        }());

        function createRestaurant(name, location) {
            _restaurants[name] = new Restaurant(name, location);
            return "Restaurant " + name + " created\n";
        }

        function createDrink(name, price, calories, quantity, timeToPrepare, isCarbonated) {
            _recipes[name] = new Drink(name, price, calories, quantity, timeToPrepare, isCarbonated);
            return "Recipe " + name + " created\n";
        }

        function createSalad(name, price, calories, quantity, timeToPrepare, containsPasta) {
            _recipes[name] = new Salad(name, price, calories, quantity, timeToPrepare, containsPasta);
            return "Recipe " + name + " created\n";
        }

        function createMainCourse(name, price, calories, quantity, timeToPrepare, isVegan, type) {
            _recipes[name] = new MainCourse(name, price, calories, quantity, timeToPrepare, isVegan, type);
            return "Recipe " + name + " created\n";
        }

        function createDessert(name, price, calories, quantity, timeToPrepare, isVegan) {
            _recipes[name] = new Dessert(name, price, calories, quantity, timeToPrepare, isVegan);
            return "Recipe " + name + " created\n";
        }

        function toggleSugar(name) {
            var recipe;

            if (!_recipes.hasOwnProperty(name)) {
                throw new Error("The recipe " + name + " does not exist");
            }
            recipe = _recipes[name];

            if (recipe instanceof Dessert) {
                recipe.toggleSugar();
                return "Command ToggleSugar executed successfully. New value: " + recipe._withSugar.toString().toLowerCase() + "\n";
            } else {
                return "The command ToggleSugar is not applicable to recipe " + name + "\n";
            }
        }

        function toggleVegan(name) {
            var recipe;

            if (!_recipes.hasOwnProperty(name)) {
                throw new Error("The recipe " + name + " does not exist");
            }

            recipe = _recipes[name];
            if (recipe instanceof Meal) {
                recipe.toggleVegan();
                return "Command ToggleVegan executed successfully. New value: " +
                    recipe._isVegan.toString().toLowerCase() + "\n";
            } else {
                return "The command ToggleVegan is not applicable to recipe " + name + "\n";
            }
        }

        function printRestaurantMenu(name) {
            var restaurant;

            if (!_restaurants.hasOwnProperty(name)) {
                throw new Error("The restaurant " + name + " does not exist");
            }

            restaurant = _restaurants[name];
            return restaurant.printRestaurantMenu();
        }

        function addRecipeToRestaurant(restaurantName, recipeName) {
            var restaurant, recipe;

            if (!_restaurants.hasOwnProperty(restaurantName)) {
                throw new Error("The restaurant " + restaurantName + " does not exist");
            }
            if (!_recipes.hasOwnProperty(recipeName)) {
                throw new Error("The recipe " + recipeName + " does not exist");
            }

            restaurant = _restaurants[restaurantName];
            recipe = _recipes[recipeName];
            restaurant.addRecipe(recipe);
            return "Recipe " + recipeName + " successfully added to restaurant " + restaurantName + "\n";
        }

        function removeRecipeFromRestaurant(restaurantName, recipeName) {
            var restaurant, recipe;

            if (!_recipes.hasOwnProperty(recipeName)) {
                throw new Error("The recipe " + recipeName + " does not exist");
            }
            if (!_restaurants.hasOwnProperty(restaurantName)) {
                throw new Error("The restaurant " + restaurantName + " does not exist");
            }

            restaurant = _restaurants[restaurantName];
            recipe = _recipes[recipeName];
            restaurant.removeRecipe(recipe);
            return "Recipe " + recipeName + " successfully removed from restaurant " + restaurantName + "\n";
        }

        function executeCommand(commandLine) {
            var cmd, params, result;
            cmd = new Command(commandLine);
            params = cmd._params;

            switch (cmd._name) {
                case 'CreateRestaurant':
                    result = createRestaurant(params["name"], params["location"]);
                    break;
                case 'CreateDrink':
                    result = createDrink(params["name"], parseFloat(params["price"]), parseInt(params["calories"]),
                        parseInt(params["quantity"]), params["time"], parseBoolean(params["carbonated"]));
                    break;
                case 'CreateSalad':
                    result = createSalad(params["name"], parseFloat(params["price"]), parseInt(params["calories"]),
                        parseInt(params["quantity"]), params["time"], parseBoolean(params["pasta"]));
                    break;
                case "CreateMainCourse":
                    result = createMainCourse(params["name"], parseFloat(params["price"]), parseInt(params["calories"]),
                        parseInt(params["quantity"]), params["time"], parseBoolean(params["vegan"]), params["type"]);
                    break;
                case "CreateDessert":
                    result = createDessert(params["name"], parseFloat(params["price"]), parseInt(params["calories"]),
                        parseInt(params["quantity"]), params["time"], parseBoolean(params["vegan"]));
                    break;
                case "ToggleSugar":
                    result = toggleSugar(params["name"]);
                    break;
                case "ToggleVegan":
                    result = toggleVegan(params["name"]);
                    break;
                case "AddRecipeToRestaurant":
                    result = addRecipeToRestaurant(params["restaurant"], params["recipe"]);
                    break;
                case "RemoveRecipeFromRestaurant":
                    result = removeRecipeFromRestaurant(params["restaurant"], params["recipe"]);
                    break;
                case "PrintRestaurantMenu":
                    result = printRestaurantMenu(params["name"]);
                    break;
                default:
                    throw new Error('Invalid command name: ' + cmdName);
            }

            return result;
        }

        function parseBoolean(value) {
            switch (value) {
                case "yes":
                    return true;
                case "no":
                    return false;
                default:
                    throw new Error("Invalid boolean value: " + value);
            }
        }

        return {
            initialize: initialize,
            executeCommand: executeCommand
        };
    }());


    // Process the input commands and return the results
    var results = '';
    RestaurantEngine.initialize();
    commands.forEach(function(cmd) {
        if (cmd != "") {
            try {
                var cmdResult = RestaurantEngine.executeCommand(cmd);
                results += cmdResult;
            } catch (err) {
                results += err.message + "\n";
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
            console.log(processRestaurantManagerCommands(arr));
        });
    }
})();
