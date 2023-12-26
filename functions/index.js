const functions = require("firebase-functions");
const admin = require("firebase-admin");
const crypto = require('crypto');
admin.initializeApp();

const algorithm = "aes-256-cbc";
const key = "aaaaBBBBccccDDDDeeeeFFFFggggHHHH";
const fixedIv = 'moontwinmoontwin';
const getADate=()=> {
	var d = new Date();

	// 將 UTC 時間轉換為台灣時間 (UTC+8)
	var offset = 8; // 台灣時區偏移量
	var utc = d.getTime() + (d.getTimezoneOffset() * 60000); // 將本地時間轉換為 UTC 時間
	var taiwanTime = new Date(utc + (3600000 * offset)); // 轉換為台灣時間

	var year = taiwanTime.getFullYear();
	var month = '' + (taiwanTime.getMonth() + 1);
	var day = '' + taiwanTime.getDate();

	if (month.length < 2) 
			month = '0' + month;
	if (day.length < 2) 
			day = '0' + day;
	
	return year + month + day + year + month + day;
}
let iv = getADate();


exports.encrypt = functions.https.onCall((text) => {
		let cipher = crypto.createCipheriv(algorithm, key, iv);
		console.log(iv,key)
		let encrypted = cipher.update(text, "utf8", "base64");
		return encrypted += cipher.final("base64");
	});



