/*

^https?:\/\/getway\.radio\.cn\/app* url script-response-body YunTing_VIP.js
hostname = getway.radio.cn

*/
var body = $response.body.replace(/\u0069\u0073\u0056\u0069\u0070\u0022\u003A\u0031/g, '\u0069\u0073\u0056\u0069\u0070\u0022\u003A\u0030');
$done({ body });