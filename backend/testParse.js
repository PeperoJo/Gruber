const Parse = require('parse/node');

Parse.serverURL = 'https://parseapi.back4app.com'; // This is your Server URL
Parse.initialize(
  'mzhOlXatBmYQSNUS1DM8qkFtWyUzUNPqCTtvS3Jk', // This is your Application ID
  'fuErVJGUuOmR0lFKJYaycPfEPnNxckNB7eyLmpwp', // This is your Javascript key
  '2C5w4GFdMvThWCeKnvuF4IsR4mJqXCmy8IXH9R6d' // This is your Master key (never use it in the frontend)
);

const MyCustomClass = Parse.Object.extend('MyCustomClassName');
const myNewObject = new MyCustomClass();

myNewObject.set('myCustomKey1Name', 'myCustomKey1Value');
myNewObject.set('myCustomKey2Name', 'myCustomKey2Value');

myNewObject.save().then(
  (result) => {
    if (typeof document !== 'undefined') document.write(`ParseObject created: ${JSON.stringify(result)}`);
    console.log('ParseObject created', result);
  },
  (error) => {
    if (typeof document !== 'undefined') document.write(`Error while creating ParseObject: ${JSON.stringify(error)}`);
    console.error('Error while creating ParseObject: ', error);
  }
);
