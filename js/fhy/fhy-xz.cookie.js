const cookieName = '凤凰云小镇'
const tokenurlKey = 'fhyxz_tokenurl'
const tokenheaderKey = 'fhyxz_tokenheader'
const watering_urlKey = 'fhyxz_watering_url'

const KEY_getInfo_url = 'fhyxz_getInfo_url'
const KEY_getInfo_header = 'fhyxz_getInfo_header'

const watering_headerKey = 'fhyxz_watering_header'
const watering_bodyKey = 'fhyxz_watering_body'
const fhyxz = init()

const requrl = $request.url
if ($request && $request.method != 'OPTIONS') {
	const requrl = JSON.stringify($request.headers)
	if(requrl.match(/\/msapi\/farm-game\/mobile\/api\/gameUser\/getUserInfo/)) {
	  //const watering_bodyVal = $request.body
	  if (requrl) fhyxz.setdata(KEY_getInfo_url, requrl)
	  if (headers) fhyxz.setdata(KEY_getInfo_header, headers)
	  //if (watering_bodyVal) fhyxz.setdata(watering_bodyKey, watering_bodyVal)
	  fhyxz.msg(cookieName, `获取用户信息成功`, ``)
	}
	else if(requrl.match(/msapi\/farm-game\/mobile\/api\/gameUser\/seed\/watering/)) {
	  if (requrl) fhyxz.setdata(KEY_getInfo_url, requrl)
	  if (headers) fhyxz.setdata(KEY_getInfo_header, headers)
      fhyxz.msg(cookieName, `浇水成功`, ``)
      fhyxz.log("浇水hearder:"+watering_headerVal);
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
