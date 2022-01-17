import app from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/database";
import "firebase/storage";
import API from "../api";

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

class Firebase {
  constructor() {
    app.initializeApp(firebaseConfig);

    this.auth = app.auth();
    this.provider = new app.auth.GoogleAuthProvider();
    this.firestore = app.firestore();
    this.storageRef = app.storage().ref();
  }

  // *** Auth API ***

  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignInWithGoogle = () => this.auth.signInWithPopup(this.provider);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = (email) => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = (password) =>
    this.auth.currentUser.updatePassword(password);

  // *** Merge Auth and DB User API *** //

  onAuthUserListener = (next, fallback) =>
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

            let user = {
              uid: authUser.uid,
              username: authUser.displayName,
              email: authUser.email,
              roles: data.roles,
            };

            next(user);
          });
      } else {
        fallback();
      }
    });

  // *** User API ***

  user = (uid) => this.firestore.collection("users").doc(uid);

  users = () => this.firestore.collection("users");

  // *** Statistics API ***

  getSummary = async () => {
    return this.getDataCollection("summary", API.getSummary)
  };

  getVaccines = async () => {
    return this.getDataCollection("vaccines", API.getVaccines)
  };

  getDataCollection = async (collection_name, fallback) => {
    let collection = await this.firestore.collection(collection_name).get();
    let docs = collection.docs.reduce((obj, item) => {
      return { ...obj, [item.id]: item };
    }, {});

    try {
      if (docs && moment(docs["Italy"].All.updated).isSame(moment(), "day")) {
        return docs;
      }
      let collectionNew = await fallback();
      Object.entries(collectionNew).forEach((data) => {
        docs[data[0]].set(data[1]);
      });
      return collectionNew;
    } catch (error) {
      let err = {
        error: error,
        message: `Failed to retrieve ${collection} data;`,
      };
      throw err;
    }
  };

  getHistory = async (country) => {
    let ref = this.firestore.collection("country").doc(country);
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
      ref.set(deathNew);

      return deathNew;

    } catch (error) {
      let err = {
        error: error,
        message: `Failed to retrieve ${country} data;`,
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
