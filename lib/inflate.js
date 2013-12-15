var _ = require("underscore");

var inflate_string = function(string){
    var values = [];
    string = string.toLowerCase();
    var match = string.match(/\s|\-|_/g);
    if(match){
        string = string.replace(/\s|\-|_/g,"-");
        values.push(string.replace(/\-/g,""));
        values.push(string.replace(/\-/g,"_"));
        values.push(string.replace(/\-/g," "));
    }
    values.push(string);
    values.sort();
    return values;
}

var inflate_array = function(array){
    return _.chain(array).unique().map(function(item){
        return inflate(item);
    }).flatten().value();
}

var inflate_object = function(object){
    return _.extend.apply(null, _.map(object, function(array, key){
        if(!_.isArray(array)) array = [array];
        var key_value = {};
        key = key.toLowerCase();
        key_value[key] = function(){
            array.push(key);
            var inflated = inflate(array);
            return _.unique(inflated);
        }();
        return key_value;
    }));
}

var inflate = function(item){
    if(_.isString(item)) return inflate_string(item);
    if(_.isArray(item)) return inflate_array(item);
    if(_.isObject(item)) return inflate_object(item);
    return false;
}

module.exports = inflate;