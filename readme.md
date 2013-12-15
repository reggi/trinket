# trinket

A hodgepodge of javascript functions with varying uses.

`npm install trinket --save`

## Inflate

Takes a string, array, or object and adds alternative space characters into an array. 

```
inflate(["hello-world"])
// [ 'hello world', 'hello-world', 'hello_world', 'helloworld' ]
```

## Standardize

Takes two parameters one, the content, the other, a legend of preferred keys and alternatives that may be used / confused with the original. This allows for your module to clean incoming config / settings and have a standard within your code. For instance `access_token` and `token` can both be sent into the app, and you're app will just reference `token`.

```
var legend = {
	"token": ["access_token", "access", "consumer_token", "consumer""],
    "color": ["colour"],
    "flavor": ["flavour"],
    "labor": ["labour"],
    "url": ["uri", "link"],
    "hello": ["world", "hello-world", "hello world", "sup", "sup-bro"]
}

var content = {
    "color": "green",
    "flavour": "grape",
    "link": "http://google.com",
    "pet": "fish",
}

var standardized = standardize(content, legend);

/*
    {
        "color": "red",
        "flavor": "grape",
        "url": "http://google.com",
        "pet": "fish",
    }
*/
```