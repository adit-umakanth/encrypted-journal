import { getAuth } from "firebase/auth";
import type { User } from "firebase/auth";

export async function getUser(): Promise<User | null> {
  return new Promise((resolve, reject) => {
    const unsubscribe = getAuth().onAuthStateChanged((user) => {
      unsubscribe();
      resolve(user);
    }, reject);
  });
}
