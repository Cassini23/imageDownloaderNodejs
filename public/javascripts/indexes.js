/**
 * Created by nina on 4/28/15.
 */

var urls = [];

document.addEventListener('DOMContentLoaded', function(){
   var text = document.querySelector('input[type = "text"]');
    text.addEventListener('change', function(){
        //console.log(text.value);
        makeAjaxCall('GET','/reqCheerio?url='+text.value,function(err, results){
            if(err) console.log(err);
            else console.log('Completed');
            //set urls
            urls = results;
            console.log(urls);
        });
    });
});

function makeAjaxCall(HttpVerb, url, callback){
    var xhr = new XMLHttpRequest();
    xhr.open(HttpVerb,url);
    xhr.addEventListener('readystatechange', function(err,results){
        if(xhr.readyState === 4){
            if(xhr.status===200) callback(err, JSON.parse(xhr.responseText));
            //else callback(JSON.parse(xhr.responseText), null);
        }
    });
     xhr.send();
};
