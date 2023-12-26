const functions = require("firebase-functions");
const admin = require("firebase-admin");
const crypto = require('crypto');
admin.initializeApp();

const algorithm = "aes-256-cbc";
const key = "aaaaBBBBccccDDDDeeeeFFFFggggHHHH";
const fixedIv = 'moontwinmoontwin';
const getADate=()=> {
	var d = new Date();
	
	var year = d.getFullYear();
	var month = '' + (d.getMonth() + 1); 
	var day = '' + d.getDate();

	if (month.length < 2) 
	month = '0' + month;
	if (day.length < 2) 
	day = '0' + day;
	
	return year+month+day+year+month+day
}
let iv = getADate();


exports.encrypt = functions.https.onCall((text) => {
  let cipher = crypto.createCipheriv(algorithm, key, iv);
  console.log(iv,key)
  let encrypted = cipher.update(text, "utf8", "base64");
  return encrypted += cipher.final("base64");
});



