/*

^https?:\/\/api\.591master\.com:8081\/(?:1\.0|\d\.\d\.\d)\/ui(?:forum|common)\/(?:downloadwallpaper|getuser) url script-response-body PhoneYJGJ_SVIP.js
hostname = api.591master.com

*/

const path1 = "/uicommon/getuser";
const path2 = "/1.0/uiforum/downloadwallpaper";

let obj = JSON.parse($response.body);

if ($request.url.indexOf(path1) != -1){
    obj.data.expireTime = 99999999999,
    obj.data.isVip = true,
    obj.data.expExpireTime = 1867600302,
    obj.data.score = 99999
}
if ($request.url.indexOf(path2) != -1){
  obj = {
    "errno": 0,
    "errmsg": "OK",
    "data": "aXVNbR5r7cLe0FSpoXFuPw=="
  }
}
$done({body: JSON.stringify(obj)});