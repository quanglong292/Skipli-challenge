const { credential } = require("firebase-admin");
const { initializeApp } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");

let fireStoreSession;

const test = {
  type: "service_account",
  project_id: "skipli-challenge-3e519",
  private_key_id: "8efda1e805b585334300c659941e3a8d559799ef",
  private_key:
    "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDGH/XOoPEqJexZ\nB3I0M0bBZUDAj+c1vVgL9R1/SRv87a6frgQbZf1QAKrTWXwpAU/qHo4r2QOI/6bJ\nHmJ4VPJr0iki6xmBf03ZQ3goo/HxqCN3Oznbo1JdrpzK10lH+V4qMZId4koWTphw\nUjljD8a1PWGXU4bM5bhVBtCfByhfwBZlIfw3gZLDKrKHkL+aTdbOoIz+aSHY4nuB\ne1JjbY2h0qxEdgeMlc9CIllOeCm7JsN+FaLMEx53p7ciAD53P1pzPDayslL/cqEo\nHsk5/7ooQ/Ykzk/XCtTwxXffLJEpF1I4dYdsWUqaR/UPQM66LbACMD4nF3NtnUeO\ni/mwFHc3AgMBAAECggEAGtx6bGlQSRvwefboekCkIdRN0yME1eRglj5v9rHoJC1A\nClDYKF7Lg+095n8GC7PXLIa3/883C3vzFjwTCFLRYIzocYjZDGrrbb7Cq7/j2D+o\n5KFtrA7t5oWl/FpJNS459hPXxkrH1f5nQdM5Xz+O++42glhwuOxBnEWFmLSqZKYJ\nIQAv/yQTQYBpUjOqnx2mhlGDQ7IhlQpn4Ha+mvi3HdPWDDi431xdhwZKCmbieQ1P\npKUovjmL2Wb2b95hytQHIDtojluAKbN2a4l0B1b1zR+muSJU0g/Ar+VmWs6WtCIp\n3ermJmbQOS84bf+iGn4SoDX2zGE/QGiJLHWiGsduAQKBgQDzvE2le/EUJZoLLE/D\nEdFWJywYlksU+PyF9jtful0jDjvXWDHoa1KkIhKsu5YwY7/Err7d/ktWEjM95mJO\nWYSS2Yz6cuxsE17lOOVWdiZDA/1bauz2QDGCCYlY+ScUKRarlVcB5DtkeAbJeQa5\n8u3f/12eb4NHLcOIgAvRfhwMTwKBgQDQGB6HTx2j8r3TYctfkIu0yOAMiP/H09/m\nyV5mUWt6NxOll/D/ZX2mQ5nI+zEzHrUct7C8aJruRAeIP6CAmZEUxPGr1VKLf1V/\na7Gfw9cW1PupEiDe/pehlop2LBowZe6TlLD/WQe8B9dAQfEWyp/vGZ/eCT+hmV1P\n0MNZM4okmQKBgD+vYApxTBibipiIx36M1UnRinASNSQRusm2AOWOaG+UdIZcAQ5d\nnIZOcNq5WRDjv2PA1RZkL4MZ1lHCNMWMFlvYhEGcbbH/jbgPGb1xuaWhET4lvizJ\nsSXtH/ojf9aAte+3YbiYzfv+cKeL+/nyQ71XmDqhoIekqYatDml6rhF5AoGBAJqn\nwlCn0QyfBMuMG/0LTXlv7WwDia223uoD8L+0dV9gfZ6NfRQjFq4yAaJoZdlrUglk\nz9pHGBZKwxpUx3GsMDIyaLZflbiNSzqnDF0DzOBwLBUsnvd8Wa9DVeabwl8D8rsG\nQEGWpnPtk+Fy4L4im5i0/6aiUwNEGyCNtBGgh2PJAoGAGNGCWM+mYk3DG6hRlVYL\ns27jpqmzhyEn+mu/cRt4dLh2NLKbZbo0NK6r8pfXGVS6K9aOVB4xEGpFHl1UQwnx\nhRy7iZUdGi0TDlaGgsjcvNlc2vRIw/BSLoHPYnlPqEKVPny0PaliwOVRTQ59Tuw1\ndkxmfRuko+u09xq/cU+ySR8=\n-----END PRIVATE KEY-----\n",
  client_email:
    "firebase-adminsdk-r2hp3@skipli-challenge-3e519.iam.gserviceaccount.com",
  client_id: "115187040751688622294",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url:
    "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-r2hp3%40skipli-challenge-3e519.iam.gserviceaccount.com",
};

const initFirebaseSession = () => {
  const firebaseSession = initializeApp({
    credential: credential.cert(test),
  });
  this.fireStoreSession = getFirestore(firebaseSession);
};

const getFireStoreSession = () => {
  return this.fireStoreSession;
};

const getCollection = async (name) => {
  const data = await getFireStoreSession().collection(name);
  return data;
};

module.exports = {
  initFirebaseSession,
  getFireStoreSession,
  getCollection,
};
