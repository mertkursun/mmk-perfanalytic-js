# Performance Analytics

> Performance analytics script for TTFB, FCP, Dom Load, and Window Load events

The script is attached at the address below.

https://arabuloptik.com/

Enter this address first and the script will run.

## Install

```
(https://www.npmjs.com/package/mmk-perfanaliytics-js)

npm i mmk-perfanaliytics-js

or

yarn add mmk-perfanaliytics-js
```

## Usage

```js
import perfanalytics from 'mmk-perfanaliytics-js'

const analytics = perfanalytics();
analytics.start();

metrics add localStorage

const metrics = window.localStorage.getItem("metrics")
console.log(JSON.parse(metrics))
```
