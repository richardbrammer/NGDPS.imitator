ngdps.imitator
==============

Extends Adobe DPS Store and Library SDK (adobeDPS) to make testing in the browser possible.

Testing
-------

Karma tests will fail, because the Adobe Library and Store SDK produces a page reload,when it does not find the app. 

To successfully run the karma tests, do the following:

1. Download AdobeLibraryAPI.js from [http://www.adobe.com/go/dps-library-store-api](http://www.adobe.com/go/dps-library-store-api)
2. Rename the file to AdobeLibraryAPI.mock.js
3. Uncomment the following line (499):

```javascript
// removed for karma testing in NGDPS.imitator to avoid page reload
// window.location = this.BRIDGE_PREFIX_URI + encodeURIComponent(stringData);
```
4. run ```karma start```
