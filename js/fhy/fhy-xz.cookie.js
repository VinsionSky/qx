const cookieName = '凤凰云小镇'
const KEY_loginurl = 'fhyxz_tokenurl'
const KEY_loginheader = 'fhyxz_tokenheader'

const KEY_getInfo_url = 'fhyxz_getInfo_url'
const KEY_getInfo_header = 'fhyxz_getInfo_header'

const KEY_watering_url = 'fhyxz_watering_url'
const KEY_watering_header = 'fhyxz_watering_header'
const fhyxz = init()

const requrl = $request.url
if ($request && $request.method != 'OPTIONS') {
	const headers = JSON.stringify($request.headers)
	if(requrl.match(/msapi\/farm-game\/mobile\/api\/gameUser\/getUserInfo/)) {
       
	  if (requrl) {
		  fhyxz.log('set-url')
		  fhyxz.setdata(KEY_getInfo_url, requrl)
		  fhyxz.log('gd-url:'+ fhyxz.getdata(KEY_getInfo_url))
	  }
	  if (headers) fhyxz.setdata(KEY_getInfo_header, headers)
	  //if ($request.body) fhyxz.setdata(watering_bodyKey, $request.body)
	  fhyxz.log('gd-headers:'+ fhyxz.getdata(KEY_getInfo_header))
	  fhyxz.msg(cookieName, `获取用户信息成功`, ``)
	}
	else if(requrl.match(/msapi\/farm-game\/mobile\/api\/gameUser\/seed\/watering/)) {
       fhyxz.log("watering"+requrl)
	  if (requrl) fhyxz.setdata(KEY_watering_url, requrl)
	  if (headers) fhyxz.setdata(KEY_watering_header, headers)
      fhyxz.msg(cookieName, `浇水成功`, ``)
	}
}

function init() {
  isSurge = () => {
    return undefined === this.$httpClient ? false : true
  }
  isQuanX = () => {
    return undefined === this.$task ? false : true
  }
  getdata = (key) => {
    if (isSurge()) return $persistentStore.read(key)
    if (isQuanX()) return $prefs.valueForKey(key)
  }
  setdata = (key, val) => {
    if (isSurge()) return $persistentStore.write(key, val)
    if (isQuanX()) return $prefs.setValueForKey(key, val)
  }
  msg = (title, subtitle, body) => {
    if (isSurge()) $notification.post(title, subtitle, body)
    if (isQuanX()) $notify(title, subtitle, body)
  }
  log = (message) => console.log(message)
  get = (url, cb) => {
    if (isSurge()) {
      $httpClient.get(url, cb)
    }
    if (isQuanX()) {
      url.method = 'GET'
      $task.fetch(url).then((resp) => cb(null, {}, resp.body))
    }
  }
  post = (url, cb) => {
    if (isSurge()) {
      $httpClient.post(url, cb)
    }
    if (isQuanX()) {
      url.method = 'POST'
      $task.fetch(url).then((resp) => cb(null, {}, resp.body))
    }
  }
  done = (value = {}) => {
    $done(value)
  }
  return { isSurge, isQuanX, msg, log, getdata, setdata, get, post, done }
}
fhyxz.done()
