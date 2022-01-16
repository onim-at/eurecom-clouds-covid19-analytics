import app from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/database";
import "firebase/storage";
import { MEDIAGROUP } from "../api";
const API = MEDIAGROUP;

const moment = require("moment");

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

interface RolesDictionary {
  [key: string]: string;
}

interface User {
  uid: string;
  username: string;
  email: string;
  roles: RolesDictionary;
}

class Firebase {
  auth: app.auth.Auth;
  provider: app.auth.GoogleAuthProvider;
  firestore: app.firestore.Firestore;
  storageRef: app.storage.Reference;

  constructor() {
    app.initializeApp(firebaseConfig);

    this.auth = app.auth();
    this.provider = new app.auth.GoogleAuthProvider();
    this.firestore = app.firestore();
    this.storageRef = app.storage().ref();
  }

  // *** Auth API ***

  doCreateUserWithEmailAndPassword = (email: string, password: string) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email: string, password: string) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignInWithGoogle = () => this.auth.signInWithPopup(this.provider);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = (email: string) => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = (password: string) =>
    this.auth.currentUser.updatePassword(password);

  // *** Merge Auth and DB User API *** //

  onAuthUserListener = (next, fallback: () => any) =>
    this.auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        this.user(authUser.uid)
          .get()
          .then((doc) => {
            var data = doc.data();
            // default empty roles
            if (!data.roles) {
              data.roles = {};
            }

            let user: User = {
              uid: authUser.uid,
              username: authUser.displayName,
              email: authUser.email,
              roles: data.roles,
            };

            next(authUser);
          });
      } else {
        fallback();
      }
    });

  // *** User API ***

  user = (uid: string) => this.firestore.collection("users").doc(uid);

  users = () => this.firestore.collection("users");

  // *** Statistics API ***

  getSummary = async () => {
    let collection = await this.firestore.collection("summary").get();
    let docs = collection.docs.map((doc) => doc.data());

    try {
      if (
        docs["Italy"] &&
        moment(docs["Italy"].data().All.updated).isSame(moment(), "day")
      ) {
        return docs;
      }

      let summaryNew = await API.getSummary();
      Object.entries(summaryNew).forEach((data) => {
        docs[data[0]].set(data[1]);
      });
      return summaryNew;
    } catch (error) {
      let err = {
        error: error,
        message: "Failed to retrieve summary data; ",
      };
      throw err;
    }
  };

  getHistory = async (country: string) => {
    let ref = this.firestore.collection("vaccines").doc(country)
    let doc = await ref.get();

    try {
      let yesterday = moment().subtract(1, "days").format("yyyy-mm-dd");
      if (doc.exists && doc.data().All.dates.hasOwnProperty(yesterday)) {
        return doc.data();
      }

      let confirmedNew = await API.getHistory(country, "confirmed");
      let deathNew = await API.getHistory(country, "deaths");

      Object.entries(confirmedNew.All.dates).forEach((data) => {
        let hist = {
          confirmed: data[1],
          death: deathNew.All.dates[data[0]],
        };

        deathNew.All.dates[data[0]] = hist;
      });
      ref.set(deathNew)
      
      return deathNew

    } catch (error) {
      let err = {
        error: error,
        message: "Failed to retrieve vaccines data; ",
      };
      throw err;
    }
  };

  getVaccines = async () => {
    let collection = await this.firestore.collection("vaccines").get();
    let docs = collection.docs.map((doc) => doc.data());

    try {
      if (
        docs["Italy"] &&
        moment(docs["Italy"].All.updated).isSame(moment(), "day")
      ) {
        return docs;
      }
      let vaccinesNew = await API.getVaccines();
      Object.entries(vaccinesNew).forEach((data) => {
        docs[data[0]].set(data[1]);
      });
      return vaccinesNew;
    } catch (error) {
      let err = {
        error: error,
        message: "Failed to retrieve vaccines data; ",
      };
      throw err;
    }
  };

  // *** News API ***

  storeImage = (imagePath, image) => {
    var imageRef = this.storageRef.child(imagePath);
    return imageRef.put(image).then(function (snapshot) {
      return imageRef.getDownloadURL().then((url) => url);
    });
  };

  removeImage = (imagePath) => {
    var imageRef = this.storageRef.child(imagePath);
    return imageRef
      .delete()
      .then(function () {
        return true;
      })
      .catch(function (error) {
        return error;
      });
  };

  addNews = (news) => {
    var newsRef = this.firestore.collection("news");
    return newsRef
      .add(Object.assign({}, news))
      .then(() => {
        return true;
      })
      .catch((err) => err);
  };

  updateNews = (id, news) => {
    var newsRef = this.firestore.collection("news").doc(id);
    return newsRef
      .update(Object.assign({}, news))
      .then(() => {
        return true;
      })
      .catch((err) => err);
  };

  deleteNews = (id) => {
    var newsRef = this.firestore.collection("news").doc(id);
    return newsRef.get().then((doc) => {
      if (doc.exists) {
        return newsRef.delete().then(() => {
          if (doc.data().imagePath) this.removeImage(doc.data().imagePath);
        });
      }
    });
  };

  getNewsByUser = (userid) => {
    var newsRef = this.firestore.collection("news");
    return newsRef
      .where("userid", "==", userid)
      .get()
      .then(function (querySnapshot) {
        var news = [];
        querySnapshot.forEach(function (doc) {
          news.push({ newsid: doc.id, ...doc.data() });
        });
        return news;
      })
      .catch((err) => err);
  };

  getNewsByLocation = (location) => {
    var newsRef = this.firestore.collection("news");
    return newsRef
      .where("location", "==", location)
      .get()
      .then(function (querySnapshot) {
        var news = [];
        querySnapshot.forEach(function (doc) {
          news.push(doc.data());
        });
        return news;
      })
      .catch((err) => err);
  };
}
export default Firebase;
