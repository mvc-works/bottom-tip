## Bottom Tip(an at-bottom message tip)

Note: you have to maintain logs manually with this module.

Prototype https://youtu.be/wjLxXS0CV4k

I intented to replace [webpack-hud][hud] with it
but it turned out to be not as useful as webpack-hud
since messages from Webpack is quite messy.

[hud]: https://github.com/mvc-works/webpack-hud

### Usage

```bash
npm i --save-dev bottom-tip
```

```js
import render from "bottom-tip";

render("warn", "some warning message");

setTimeout(function() {
  render("inactive", null);
}, 2000);
```

Types:

- `inactive`
- `ok`
- `ok~`(show and then hide)
- `warn`
- `error`

### Develop

Try this project:

```bash
yarn vite
# open http://localhost:3000
```

### License

MIT
