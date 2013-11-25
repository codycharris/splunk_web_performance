// Modules
var http = require('http');
var url  = require('url');
var winston = require('winston');

// Configure Winston (Logging)
winston.add(winston.transports.File, { filename: '/var/log/rum.log', json: false});
winston.remove(winston.transports.Console);

// Sleep function for JS
function sleep(milliseconds) {
    "use strict";
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds) {
            break;
        }
    }
}

function getRandomArbitary (min, max) {
    return Math.random() * (max - min) + min;
}

var max = 1000;

var ua_raw = [];
var ua_family = [];

ua_raw[0] = 'Mozilla/5.0 (Windows NT 6.1; rv:19.0) Gecko/20100101 Firefox/19.0';
ua_family[0] = 'Firefox';

ua_raw[1] = 'Mozilla/5.0 (Windows NT 6.2; WOW64) AppleWebKit/537.31 (KHTML, like Gecko) Chrome/26.0.1410.43 Safari/537.31';
ua_family[1] = 'Chrome';

ua_raw[2] = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_3) AppleWebKit/536.28.10 (KHTML, like Gecko) Version/6.0.3 Safari/536.28.10';
ua_family[2] = 'Safari';

ua_raw[3] = 'Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Trident/5.0)';
ua_family[3] = 'IE';

console.log("Generating sample data... please wait.");

while (var i = 0; i < max; i++) {
    var now = new Date().getTime();
    var random = Math.floor((Math.random() * 1000) + 100);
    var random_ua = Math.floor((Math.random() * 9) % 2);
    var small_variant = Math.floor((Math.random() * 10) + 1);
    var med_variant = Math.floor((Math.random() * 100) + 10);
    var large_variant = Math.floor((Math.random() * 1000) + 100);
    var nt_nav_st = now;
    var nt_fet_st = now + small_variant;
    var nt_dns_st = nt_fet_st + small_variant;
    var nt_dns_end = nt_dns_st + small_variant;
    var nt_con_st = nt_dns_end + small_variant;
    var nt_con_end = nt_con_st + small_variant;
    var nt_req_st = nt_con_end + small_variant;
    var nt_res_st = nt_con_end + med_variant;
    var nt_res_end = nt_res_st + med_variant;
    var nt_domloading = nt_res_end + med_variant;
    var nt_domint = nt_domloading + med_variant;
    var tstart = now + 50;
    var btstart = now + 100;
    var end = now + 100 + random;
    var t_resp = random;
    var t_page = 3000 + random;
    var t_done = 3000 + random + small_variant;

    var obj = {
        "nt_red_cnt": "0",
        "nt_nav_type": "0",
        "nt_nav_st": "" + nt_nav_st + "",
        "nt_red_st": "0",
        "nt_red_end": "0",
        "nt_fet_st": "" + nt_fet_st + "",
        "nt_dns_st": "" + nt_dns_st + "",
        "nt_dns_end": "" + nt_dns_end + "",
        "nt_con_st": "" + nt_con_st + "",
        "nt_con_end": "" + nt_con_end + "",
        "nt_req_st": "" + nt_req_st + "",
        "nt_res_st": "" + nt_res_st + "",
        "nt_res_end": "" + nt_res_end + "",
        "nt_domloading": "" + nt_domloading + "",
        "nt_domint": "" + nt_domint + "",
        "nt_domcontloaded_st": "1365465366635",
        "nt_domcontloaded_end": "1365465366642",
        "nt_domcomp": "1365465367440",
        "nt_load_st": "1365465367441",
        "nt_load_end": "1365465367481",
        "nt_unload_st": "0",
        "nt_unload_end": "0",
        "nt_spdy": "0",
        "nt_first_paint": "1365465366.66738",
        "rt.start": "navigation",
        "rt.tstart": "" + tstart + "",
        "rt.bstart": "" + btstart + "",
        "rt.end": "" + end + "",
        "t_resp": "" + t_resp + "",
        "t_page": "" + t_page + "",
        "t_done": "" + t_done + "",
        "r": "",
        "t_other": "boomerang|5,boomr_fb|436,t_domloaded|575",
        "v": "0.0",
        "u": "http://www.example.com/id/" + random + "",
        "ua": "" + ua_raw[random_ua] + "",
		   "ua_raw":{
		      "string":"" + ua_raw[random_ua] + "", 
		      "ua":{
		         "family":"" + ua_family[random_ua] + "",
		         "major":"10",
		         "minor":"0",
		         "patch":null
		      },
		      "userAgent":{
		         "family":"" + ua_family[random_ua] + "",
		         "major":"10",
		         "minor":"0",
		         "patch":null
		      },
		      "os":{
		         "family":"Windows",
		         "major":"8",
		         "minor":null,
		         "patch":null,
		         "patchMinor":null
		      },
		      "device":{
		         "family":"Other"
		      },
		      "family":"" + ua_family[random_ua] + "",
		      "major":10,
		      "minor":0
		   }      
    };

    var string = JSON.stringify(obj);
    winston.log('info', string);
    sleep(100);
}
// Put a friendly message on the terminal
console.log("Done");
