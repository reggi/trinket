var expect = require("expect.js");
var _ = require("underscore");
var standardize = require("../index.js").standardize;

describe("standardize", function(){
    it("should keep non-legend items", function(){
        var legend = {
            "url": ["link", "anchor", "url", "uri", "uniform-resource-locator"]
        };
        var standardized = standardize({"name": "thomas"}, legend);
        expect(standardized).to.have.property('name');
        expect(standardized.name).to.be("thomas");
    });
    it("should contain url", function(){
        var legend = {
            "url": ["link", "anchor", "url", "uri", "uniform-resource-locator"]
        };
        var standardized = standardize({"link": "http://google.com"}, legend);
        expect(standardized).to.have.property('url');
        var standardized = standardize({"anchor": "http://google.com"}, legend);
        expect(standardized).to.have.property('url');
        var standardized = standardize({"url": "http://google.com"}, legend);
        expect(standardized).to.have.property('url');
        var standardized = standardize({"uri": "http://google.com"}, legend);
        expect(standardized).to.have.property('url');
        var standardized = standardize({"uniform-resource-locator": "http://google.com"}, legend);
        expect(standardized).to.have.property('url');
        var standardized = standardize({"uniform resource locator": "http://google.com"}, legend);
        expect(standardized).to.have.property('url');
        var standardized = standardize({"uniform-resource-locator": "http://google.com"}, legend);
        expect(standardized).to.have.property('url');
        var standardized = standardize({"uniform_resource_locator": "http://google.com"}, legend);
        expect(standardized).to.have.property('url');
    });
    it("should be able to pass key/string pairs", function(){
        var legend = {
            "color": "colour",
            "flavor": ["flavour"],
            "labor": ["labour"],
            "url": ["uri", "link"],
            "hello": ["world", "hello-world", "hello world", "sup", "sup-bro"]
        };
        var content = {
            "color": "green",
            "flavour": "grape",
            "link": "http://google.com",
            "pet": "fish",
        };
        var standardized = standardize(content, legend);
        expect(standardized).to.have.property('color');
        expect(standardized).to.have.property('flavor');
        expect(standardized).to.have.property('url');
        expect(standardized).to.have.property('pet');
    });
});