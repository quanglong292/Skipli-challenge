const { getCollection } = require("../services/firebase");

const findUser = async (phone) => {
  const usersCollection = await getCollection("users");
  const data = await (
    await usersCollection.where("phone", "=", phone).get()
  )?.docs?.[0]?.data();

  return data;
};

const genDigits = () => {
  return Math.floor(Math.random() * 999999).toString();
};

const postUserActions = async (phone) => {
  const findOne = await findUser(phone);
  const isExist = Boolean(findOne);
  const usersCollection = await getCollection("users");

  const overwriteCode = async () => {
    const code = genDigits();
    await usersCollection
      .where("phone", "=", phone)
      .get()
      .then((snapshots) => {
        if (snapshots.size > 0) {
          snapshots.forEach((snapshot) => {
            usersCollection.doc(snapshot.id).update({ code });
          });
        }
      });

    return { ...findOne, code };
  };

  const createUser = async () => {
    const newUser = {
      phone,
      code: genDigits(),
      favorite_github_users: [],
    };
    await usersCollection.doc().create(newUser);

    return newUser;
  };

  // const
  return { isExist, createUser, overwriteCode };
};

module.exports = { postUserActions, genDigits };
