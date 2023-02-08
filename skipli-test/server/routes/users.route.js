var express = require("express");
const { getCollection } = require("../services/firebase");
const { postUserActions } = require("../actions/user.actions");
const { sendSMS } = require("../services/twilio");

var router = express.Router();

/* GET users listing. */
router.get("/", async function (req, res, next) {
  try {
    const usersCollection = await getCollection("users");

    // // Update user
    // const test = await usersCollection.where('phone', '=', '0898546564').get()
    // .then(snapshots => {
    //   if (snapshots.size > 0) {
    //     snapshots.forEach(snapshot => {
    //       usersCollection.doc(snapshot.id).update({ code: "131313" })
    //     })
    //   }
    // })

    // // Delete user
    // const test = await usersCollection.where('phone', '=', '0898546564').get()
    // .then(snapshots => {
    //   if (snapshots.size > 0) {
    //     snapshots.forEach(snapshot => {
    //       usersCollection.doc(snapshot.id).delete()
    //     })
    //   }
    // })

    res.json("");
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST
router.post("/", async (req, res) => {
  const phone = req?.body?.phone;
  if (!phone) return res.status(400).json("Phone can't be empty");

  const { isExist, createUser, overwriteCode } = await postUserActions(phone);
  let newUser = {};

  try {
    if (isExist) newUser = await overwriteCode();
    else newUser = await createUser();

    await sendSMS(phone, newUser.code);

    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json(err.message);
  }
});

module.exports = router;
