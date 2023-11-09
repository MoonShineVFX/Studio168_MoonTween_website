const functions = require("firebase-functions");
const admin = require("firebase-admin");
const { FieldValue } = require("firebase-admin/firestore");

admin.initializeApp();

exports.getDate = functions.https.onCall(() => {
  var d = new Date(),
	month = '' + (d.getMonth() + 1),
	day = '' + d.getDate(),
	year = d.getFullYear();

	if (month.length < 2) 
	month = '0' + month;
	if (day.length < 2) 
	day = '0' + day;
	
	return year+month+day+year+month+day
});