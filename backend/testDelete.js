const Parse = require('parse/node');

Parse.serverURL = 'https://parseapi.back4app.com'; // This is your Server URL
Parse.initialize(
  'mzhOlXatBmYQSNUS1DM8qkFtWyUzUNPqCTtvS3Jk', // This is your Application ID
  'fuErVJGUuOmR0lFKJYaycPfEPnNxckNB7eyLmpwp', // This is your Javascript key
  '2C5w4GFdMvThWCeKnvuF4IsR4mJqXCmy8IXH9R6d' // This is your Master key (never use it in the frontend)
);

const query = new Parse.Query(Cards);
// here you put the objectId that you want to delete
query.get('sKWVrxNkPE').then((object) => {
  object.destroy().then((response) => {
    if (typeof document !== 'undefined') document.write(`Deleted ParseObject: ${JSON.stringify(response)}`);
    console.log('Deleted ParseObject', response);
  }, (error) => {
    if (typeof document !== 'undefined') document.write(`Error while deleting ParseObject: ${JSON.stringify(error)}`);
    console.error('Error while deleting ParseObject', error);
});