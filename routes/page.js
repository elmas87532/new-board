//首頁

/*****************FIREBASE*****************/
/*****************FIREBASE*****************/
/*****************FIREBASE*****************/

var firebase = require("firebase");
var config = {
   apiKey: "AIzaSyBnheo2ky0leJXatme-iWVrOoGeAA5kzGc",
   authDomain: "jsmessenger-b39b5.firebaseapp.com",
   databaseURL: "https://jsmessenger-b39b5.firebaseio.com",
   storageBucket: "jsmessenger-b39b5.appspot.com"
 };
 firebase.initializeApp(config);
 var database = firebase.database();
 


var message= new Array();
var rows = 0; //資料總比數
firebase.database().ref('/message').once('value').then(function(snapshot) {
  //console.log(snapshot.val());
  message=snapshot.val();
  rows = message.length-1;
});



function writeMessageData(num, name, content) {
  var msgRef = database.ref('message/'+num);
  msgRef.set({
    id: num,
    name: name,
    content: content
  });
  message= new Array();
  firebase.database().ref('/message').once('value').then(function(snapshot) {
    //console.log(snapshot.val());
    message=snapshot.val();
  });
}

function refresh(){
  message= new Array();
  firebase.database().ref('/message').once('value').then(function(snapshot) {
    //console.log(snapshot.val());
    message=snapshot.val();
  });
}


/*****************--------*****************/
/*****************--------*****************/
/*****************--------*****************/

exports.index = function(req, res) {
        res.render('pages/index', {
            ogheadTitle: 'Board',
            listdata: message,
            refresh: refresh
        });

};

//傳統輸入 

exports.post = function(req, res) {


    console.log(req.body.num);
    console.log(req.body.name);
    console.log(req.body.content);

    num = req.body.num;
    name = req.body.name;
    content = req.body.content;
    res.render('pages/success');

    /*var d = new Date();
    var id = name+d.getTime();
    console.log(id);*/
    writeMessageData(num,name,content);
};


var gcloud = require('gcloud');
var gcs = gcloud.storage({
      projectId: 'jsmessenger-b39b5',
      keyFilename: 'jsmessenger-af0ab814fbf0.json'
    });
var bucket = gcs.bucket('jsmessenger-b39b5.appspot.com');


exports.delete = function(req, res){
  var id = req.param('id');
  console.log(id);
  //firebase.database().ref().child('/message/'+id).remove();
  deleteData(id);
  //bucket.delete('message/'+id);
  res.render('pages/delete', {
            ogheadTitle: 'Board',
            listdata: message,
            refresh: refresh
        });
};
function empty(){
  console.log("fen");
}

function deleteData(id){
  firebase.database().ref().child('/message/'+id).remove();
  refresh();
  setTimeout(empty,2000);
}

