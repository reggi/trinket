var expect = require("expect.js");
var _ = require("underscore");
var inflate = require("../index.js").inflate;

describe("inflate", function(){
    it("should inflate a string", function(){
        var inflated = inflate("hello-world");
        var should = [ 'hello world', 'hello-world', 'hello_world', 'helloworld' ];
        expect(inflated).to.be.a("array");
        expect(_.isEqual(inflated, should)).to.be(true);
    });
    it("should inflate a array", function(){
        var inflated = inflate(["hello-world"]);
        var should = [ 'hello world', 'hello-world', 'hello_world', 'helloworld' ];
        expect(inflated).to.be.a("array");
        expect(_.isEqual(inflated, should)).to.be(true);
    });
    it("should inflate a object", function(){
        var inflated = inflate({
            "helloworld": ["hello-world"]
        });
        var should = [ 'hello world', 'hello-world', 'hello_world', 'helloworld' ];
        expect(inflated).to.be.a("object");
        expect(_.isEqual(inflated.helloworld, should)).to.be(true);
    });
    it("should not inflate a integer", function(){
        var inflated = inflate(6);
        expect(inflated).to.be(false);
    });
    it("should inflate array item with two hyphens", function(){
        var inflated = inflate(["link", "anchor", "url", "uri", "uniform-resource-locator"]);
        expect(inflated).to.be.a("array");
        expect(inflated).to.contain("uniform-resource-locator");
        expect(inflated).to.contain("uniform resource locator");
        expect(inflated).to.contain("uniform_resource_locator");
    });
    it("should allow object to contain strings", function(){
        var legend = {
            "color": "colour",
            "flavor": ["flavour"],
            "labor": ["labour"],
            "url": ["uri", "link"],
            "hello": ["world", "hello-world", "hello world", "sup", "sup-bro"]
        }
        var inflated = inflate(legend);
        expect(inflated).to.be.an("object");
        expect(inflated.color).to.be.an("array");
        expect(inflated.color).to.contain("color");
        expect(inflated.color).to.contain("colour");
    });
});