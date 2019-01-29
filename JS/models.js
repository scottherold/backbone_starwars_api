// Creates the Starship model
var StarshipModel = Backbone.Model.extend({
    defaults: {
        name: null,
        manufacturer: null,
        crew: null,
        cost_in_credits: null
    }
});

// Creates the Starship collection
var StarshipCollection = Backbone.Collection.extend({
    model: StarshipModel,
    url: "http://swapi.co/api/starships/?format=json",
    parse: function(data){
        return data.results;
    },
    falconChecker: function(ship) {
        if(ship.get("name") === "Millennium Falcon") {
            ship.set({cost_in_credits: "priceless"});
        }
    }
    
});

var starships = new StarshipCollection();

// Fetch the complete list of Starships
starships.fetch().then(function(){
    console.log(starships.models);
    starships.models.forEach(starships.falconChecker);
    console.log(starships.findWhere({name: "Millennium Falcon"}));
});