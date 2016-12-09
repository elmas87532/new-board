//首頁

/*****************FIREBASE*****************/
/*****************FIREBASE*****************/
/*****************FIREBASE*****************/

var firebase = require("firebase");
var config = {
   apiKey: "AIzaSyA6XwbquEGRHx2czHHnLckfuPqW2zWc5r0",
   authDomain: "cool-project-669f6.firebaseapp.com",
   databaseURL: "https://cool-project-669f6.firebaseio.com/",
   storageBucket: "cool-project-669f6.appspot.com"
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

exports.update = function(req, res){
  var id = req.param('id');
  console.log(id);
  //firebase.database().ref().child('/message/'+id).remove();

  res.render('pages/update', {
            ogheadTitle: 'Board',
            listdata: message,
            refresh: refresh,
            id: id
        });
};

exports.updating= function(req, res){
  console.log(req.body.content);
  console.log(req.body.id);

  var msgRef = database.ref('message/'+req.body.id);
  msgRef.set({
    name: req.body.name,
    content: req.body.content
  });
  message= new Array();
  firebase.database().ref('/message').once('value').then(function(snapshot) {
    //console.log(snapshot.val());
    message=snapshot.val();
  });

  res.render('pages/updating', {
            ogheadTitle: 'Board',
            listdata: message,
            refresh: refresh
        });
}


exports.delete = function(req, res){
  var id = req.param('id');
  console.log(id);
  //firebase.database().ref().child('/message/'+id).remove();
  deleteData(id);

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

