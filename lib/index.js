const performance = window.performance;
const API = 'https://perfapp-api.herokuapp.com/metrics';

const convertTime = val => {
  return val / 1000;
};

const getTTFB = () => convertTime(performance.timing.responseStart - performance.timing.requestStart);

const getFCP = () => {
  const FCPPerformance = performance.getEntriesByType('paint').find(entry => entry.name === 'first-contentful-paint');
  if (FCPPerformance) {
    return convertTime(FCPPerformance.startTime);
  }
  return 0;
};

const getDOMLoad = () => convertTime(performance.timing.domContentLoadedEventEnd - performance.timing.navigationStart);
const getWindowLoad = () => convertTime(performance.timing.loadEventStart - performance.timing.navigationStart);

const getResourcesLoad = () => {
  const resources = performance.getEntriesByType('resource');

  resources.forEach(res => {
    console.log("ResourceName and Type ----->", res.name, res.initiatorType);
    console.log("ResponseTime ----->", convertTime(res.responseEnd - res.responseStart));
    console.log("RequestTime ----->", convertTime(res.requestStart > 0 ? res.responseEnd - res.requestStart : "0"));
    console.log("FetchResponseTime ----->", convertTime(res.fetchStart > 0 ? res.responseEnd - res.fetchStart : "0"));
    console.log("StartResponseTime ----->", convertTime(res.startTime > 0 ? res.responseEnd - res.startTime : "0"));
  });
  const resourceLoad = resources.reduce((acc, resource) => acc + (resource.responseEnd - resource.startTime), 0);
  return convertTime(resourceLoad);
};

const sendData = body => {
  fetch(API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
};

const mmkPerfAnalytics = () => ({
  start() {
    window.onload = () => {
      let FCPTime, TTFBTime, domLoadTime, windowLoadTime, resourceLoadTime;
      windowLoadTime = getWindowLoad();
      TTFBTime = getTTFB();
      domLoadTime = getDOMLoad();
      FCPTime = getFCP();
      resourceLoadTime = getResourcesLoad();
      const data = {
        "url": window.location.href,
        "date": performance.timeOrigin,
        "ttfb": TTFBTime,
        "fcp": FCPTime,
        "domLoad": domLoadTime,
        "windowLoad": windowLoadTime
      };
      console.log("data", data);
      sendData(data);
    };
  }
});

export default mmkPerfAnalytics;

export { mmkPerfAnalytics };