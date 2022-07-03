import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytes,
  listAll,
  deleteObject,
} from "firebase/storage";
import { getAuth } from "firebase/auth";
import { v4 as uuidv4 } from "uuid";

async function getProfilePicture(userid) {
  if (!userid) {
    const auth = getAuth();
    userid = auth.currentUser.uid;
  }
  const path = `/UserProfilePicture/profile-${userid}`;
  let res = await getPicture(path);

  if (!res) {
    const path = `/UserProfilePicture/upah_default_profile.jpg`;
    res = await getPicture(path);
  }

  return res;
}

async function getProfilePictureURL(userid) {
  const storage = getStorage();
  if (!userid) {
    const auth = getAuth();
    userid = auth.currentUser.uid;
  }

  let res = "";

  try {
    const path = `/UserProfilePicture/profile-${userid}`;
    res = await getDownloadURL(ref(storage, path));
  } catch (e) {
    const path = `/UserProfilePicture/upah_default_profile.jpg`;
    res = await getDownloadURL(ref(storage, path));
  }

  return res;
}

async function getPicture(path) {
  try {
    const storage = getStorage();
    let url = await getDownloadURL(ref(storage, path));
    const response = await fetch(url);
    const blob = await response.blob();
    const file = new File([blob], uuidv4(), { type: blob.type });
    return file;
  } catch (error) {
    return null;
  }
}

function uploadPicture(parentPath, file) {
  const storage = getStorage();
  const storageRef = ref(storage, `${parentPath}/${file.name}`);

  // 'file' comes from the Blob or File API
  uploadBytes(storageRef, file).then((snapshot) => {
    console.log("Uploaded a blob or file!: " + `${parentPath}/${file.name}`);
  });
}

function uploadHighlightImage(files, userid) {
  const parentPath = `highlight-${userid}`;
  clearHighlightImage(parentPath);
  files.forEach((file) => {
    // because file.file in the form of {file: FILE, url: 'url'}
    uploadPicture(parentPath, file.file);
  });
}

async function fetchHighlightImage(userid) {
  if (!userid) {
    const auth = getAuth();
    userid = auth.currentUser.uid;
  }

  const storage = getStorage();
  const listRef = ref(storage, `highlight-${userid}`);
  let getFiles = new Promise((resolve) => {
    let res_files = [];
    listAll(listRef)
      .then((res) => {
        res.items.forEach((itemRef) => {
          const picture_files = getPicture(itemRef);
          if (picture_files) {
            res_files.push(picture_files);
          }
        });

        resolve(res_files);
      })
      .catch((error) => {
        console.log("error at listing files");
      });
  });

  let res = [];
  let files = await getFiles;

  for (let i in files) {
    res.push(await files[i]);
  }

  return res;
}

function clearHighlightImage(path) {
  const storage = getStorage();
  const listRef = ref(storage, path);
  listAll(listRef)
    .then((res) => {
      res.items.forEach((itemRef) => {
        deleteObject(itemRef)
          .then(() => {
            console.log("deleted");
          })
          .catch((error) => {
            console.log("error when deleting");
          });
      });
    })
    .catch((error) => {
      console.log("error at listing files");
    });
}

export {
  getProfilePicture,
  uploadPicture,
  uploadHighlightImage,
  getPicture,
  fetchHighlightImage,
  getProfilePictureURL,
};
