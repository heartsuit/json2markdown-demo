const json2md = require("json2md")

json2md.converters.backquote = function (input, json2md) {
    // return "`" + input + "`";
    if (input instanceof Array) {
        return input.map(x => `\`${x}\``);
    } else {
        return `\`${input}\``;
    }
}

json2md.converters.link = function (input, json2md) {
    return `[${input.title}](${input.source})`;
}

console.log(json2md([
    { h1: "JSON To Markdown" }
    , { backquote: "0" }
    , { backquote: ["1", "2"] }
    , { link: { title: "Some Link", source: "https://example.com/some-image.png" } }
    , { blockquote: "A JSON to Markdown converter." }
    , {
        img: [
            { title: "Some image", source: "https://example.com/some-image.png" }
            , { title: "Another image", source: "https://example.com/some-image1.png" }
            , { title: "Yet another image", source: "https://example.com/some-image2.png" }
        ]
    }
    , { h2: "Features" }
    , {
        ul: [
            "Easy to use"
            , "You can programmatically generate Markdown content"
            , "..."
        ]
    }
    , { h2: "How to contribute" }
    , {
        ol: [
            "Fork the project"
            , "Create your branch"
            , "Raise a pull request"
        ]
    }
    , { h2: "Code blocks" }
    , { p: "Below you can see a code block example." }
    , {
        "code": {
            language: "js"
            , content: [
                "function sum (a, b) {"
                , "   return a + b"
                , "}"
                , "sum(1, 2)"
            ]
        }
    }
]))