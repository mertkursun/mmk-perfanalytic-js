# Performance Analytics

> Performance analytics tool for TTFB, FCP, Dom Load, and Window Load events

## Install

```
(https://www.npmjs.com/package/perfanalytics-for-trendyol-case)

$ npm i perfanalytics-for-trendyol-case
```

## Usage

```js
import perfanalytics from 'perfanalytics-for-trendyol-case'

const analytics = perfanalytics();
analytics.run(process.env.REACT_APP_BASE_API_URL + "/analytics");
```

## API

### perfAnalytics(options?)

#### options

Type: `object`
```js
{
  TTFB = true, // Calculate Time To First Byte time
  FCP = true, // Calculate First Contentful Paint time
  domLoad = true,  // Calculate DOM Load time
  windowLoad = true, // Calculate Window Load time
  resourceLoad = true, // Calculate Resources Load time
}
```
## Commands
- `npm run build` - Babel will transpile ES6 => ES5 and minify the code.