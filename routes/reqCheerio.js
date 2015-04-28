/**
 * Created by nina on 4/28/15.
 */
var router = require('express').Router();
var request = require('request');
var cheerio = require('cheerio');
var uuid = require('uuid');
var path = require('path');
var fs = require('fs');
var async = require('async');
var src_url ='';
var imgModel =  require('../models/imgModel');

router.get('/',function(req , res){

    request(req.query.url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var arr;
            src_url = req.query.url;
            //console.log('In here '+req.query.url);
          //  console.log(body); // Show the HTML for the url.
            $ = cheerio.load(body);
            arr = ($('img'));
            //console.log(obj);  //Object of objects
            arr = Array.prototype.slice.call(arr);
            arr =  arr.map(function(img){
                return(img.attribs.src);
            });
        }
        if(error) res.status(500).json(error);
        else res.status(200).json(arr);

        async.parallelLimit(arr.map(function(src){
            return downLoadFile.bind(null, src);
        }) ,4,function(err, results){
            if(err) console.log(err);
            else console.log('Successful!!');
        });

    });
});

function downLoadFile(url, callback){
    var ext = path.extname(url);
    var uid = uuid.v4();
    var filePathName = 'images/'+ uid + ext;
    var readStream = request(url);
    var obj ={img_url: url,fired_url: src_url,uuid:uid};
    var writeStream = fs.createWriteStream(filePathName);
    writeStream.on('finish', function(){
            new imgModel(obj).save(function(err, results){
                if(err) console.log('error in mongo :( ' + err);
                else{console.log('safely added the record to mongo')};
            });
            callback(null, uid);// No error assuming
        //callback(null, uid);// No error assuming
        //console.log('File written');
    });
    readStream.pipe(writeStream);
//    return uuid;
};

module.exports = router;