// functions/config/firebase.js

import admin from 'firebase-admin';

// Export functions/getters that access admin.firestore()
// This ensures that 'db' is only accessed when these functions are called,
// by which time admin.initializeApp() should have completed in index.js.

let _db;
let _FieldValue;

function getDb() {
  if (!_db) {
    _db = admin.firestore();
  }
  return _db;
}

function getFieldValue() {
  if (!_FieldValue) {
    _FieldValue = admin.firestore.FieldValue;
  }
  return _FieldValue;
}

export { getDb, getFieldValue };