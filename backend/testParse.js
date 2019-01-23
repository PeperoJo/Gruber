const Parse = require('parse/node');

Parse.serverURL = 'https://parseapi.back4app.com'; // This is your Server URL
Parse.initialize(
  'BCrUQVkk80pCdeImSXoKXL5ZCtyyEZwbN7mAb11f', // This is your Application ID
  '4wPYRKbpTJeCdmFNaS31AiQZ8344aaYubk6Uo8VW', // This is your Javascript key
  '5AVAtvlGlG5cEeolatkFDhY5p99PzoBUvm7MBLMo' // This is your Master key (never use it in the frontend)
);

const Trip = Parse.Object.extend('Trip');
const myNewObject = new Trip();

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
