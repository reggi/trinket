var _ = require("underscore");

var inflate = require("./inflate");

var standardize = function(content, legend){
    if(_.size(content) == 0) return {};
    legend = inflate(legend);
    return _.extend.apply(null, _.map(content, function(item, content_key){
        content_key = content_key.toLowerCase();
        var legend_key = _.chain(legend).map(function(array, legend_key){
            if(_.contains(array, content_key)) return legend_key;
            return false;
        }).without(false).first().value();
        var key_value = {};
        if(legend_key) key_value[legend_key] = item;
        if(!legend_key) key_value[content_key] = item;
        return key_value;
    }));
};

module.exports = standardize;