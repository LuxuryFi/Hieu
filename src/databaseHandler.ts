import { openDB } from 'idb';
import { Trip } from './models/Trip';

const DB_NAME = 'tripdb';

export async function insertTrip(tripInfo: Trip) {
  const db = await openDB(DB_NAME, 2);
  const id = await db.add('trips', tripInfo);
  return id;
}

export async function getAllTrips() {
  console.log('Get All');
  const db = await openDB(DB_NAME, 2);
  const result = await db.getAll('trips');
  return result;
}

export async function getTripById(id: number) {
  const db = await openDB(DB_NAME, 2);
  return db.get('trips', id);
}

export async function deleteTrip1(id: number) {
  const db = await openDB(DB_NAME, 2);
  const result = await db.delete('trips', id);
  alert('Deleted trip successfully!');
  return result;
}

export async function updateTrip(tripInfo: Trip) {
  const db = await openDB(DB_NAME, 2);
  const id = await db.put('trips', tripInfo);
  return id;
}

initDB().then(() => {
  console.log('database created!');
});

async function initDB() {
  const db = await openDB(DB_NAME, 2, {
    upgrade(db) {
      const store = db.createObjectStore('trips', {
        keyPath: 'id',
        autoIncrement: true,
      });
    },
  });
}
