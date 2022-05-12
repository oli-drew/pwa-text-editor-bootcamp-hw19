import { openDB } from "idb";

const initdb = async () =>
  await openDB("jate", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("jate")) {
        console.log("jate database already exists");
        return;
      }
      db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
      console.log("jate database created");
    },
  });

// TODO:
// Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log("PUT stuff in the database");
  const jateDb = await openDB("jate", 1);
  const tx = jateDb.transaction("jate", "readwrite");
  const store = tx.objectStore("jate");
  await store.put({ id: 0, content: content });
  console.log("Text saved to the database");
};

// TODO:
// Get all the content from the database
export const getDb = async () => {
  const jateDb = await openDB("jate", 1);
  const tx = jateDb.transaction("jate", "readonly");
  const store = tx.objectStore("jate");
  const request = store.getAll();
  const result = await request;
  if (result[0].content) return result[0].content;
};

initdb();
