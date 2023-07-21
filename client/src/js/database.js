import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
// Version & db
const jateDb = await openDB('jate', 1);
// new transaction w/ privileges
const tx = jateDb.transaction('jate', 'readwrite');
// desired object store
const store = tx.objectStore('jate');
// store and pass content
const request = store.put({ id: 1, value: content });
// confirmation request
const result = await request;
  console.log('🤖 - data saved to the database', result);
};









// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () =>{
// create db and versoin we want to use
const jateDb = await openDB ('jate', 1);
// new trans w/ db & privileges
const tx = jateDb.transaction('jate', 'readonly');
// open desired object
const store = tx.objectStore('jate');
// use getAll method
const request = store.getAll();
// get confirmation
const result = await request;
  console.log('🚀 whoohoo data has been read from db', result);
  return result.value;

}; 

initdb();
