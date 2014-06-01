# {%= name %} {%= badge("fury") %}

> {%= description %}

## Install
{%= include("install") %}

## Usage

To register the tag with [verb][verb], add the `tags` property to the front matter of your project's `.verbrc.md` (or `docs/README.tmpl.md`):

```yaml
---
tags: ['{%= name %}']
---
```

In your templates, you can now use the tag like this:

```js
{%%= appname(name, ['verb', 'tag']) %}("foo, bar, baz")
```

Front-matter is just one way to register verb tags, filters, and plugins. See the [verb documentation][docs] for more info.

## Author
{%= include("author") %}

## License
{%= copyright() %}
{%= license() %}

***

{%= include("footer") %}