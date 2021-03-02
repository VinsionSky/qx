const chavy = init()
const cookieName = '凤凰云小镇'
const KEY_loginurl = 'fhyxz_tokenurl'
const KEY_loginheader = 'fhyxz_tokenheader'

const KEY_getInfo_url = 'fhyxz_getInfo_url'
const KEY_getInfo_header = 'fhyxz_getInfo_header'

const KEY_watering_url = 'fhyxz_watering_url'
const KEY_watering_header = 'fhyxz_watering_header'

const signinfo = {}
let VAL_getInfo_url = chavy.getdata(KEY_getInfo_url)
let VAL_getInfo_header = chavy.getdata(KEY_getInfo_header)

let VAL_watering_url = chavy.getdata(KEY_watering_url)
let VAL_watering_header = chavy.getdata(KEY_watering_header)


;(sign = async () => {
    chavy.log(`🔔 ${cookieName}`)
    //await loginapp()
	//await getinfo()
    await watering()
    
    showmsg()
    chavy.done()
})().catch((e) => chavy.log(`❌ ${cookieName} 签到失败: ${e}`), chavy.done())

/*
function loginapp() {
    return new Promise((resolve, reject) => {
        const url = { url: VAL_loginurl, headers: JSON.parse(VAL_loginheader) }
        chavy.post(url, (error, response, data) => {
            try {
                resolve()
            } catch (e) {
                chavy.msg(cookieName, `登录结果: 失败`, `说明: ${e}`)
                chavy.log(`❌ ${cookieName} loginapp - 登录失败: ${e}`)
                chavy.log(`❌ ${cookieName} loginapp - response: ${JSON.stringify(response)}`)
                resolve()
            }
        })
    })
}*/

function getinfo() {
    return new Promise((resolve, reject) => {
        const url = { url: KEY_getInfo_url, headers: {"Cookie": JSON.parse(KEY_getInfo_header)["Cookie"]}}
        chavy.get(url, (error, response, data) => {
            try {
                signinfo.info = JSON.parse(data)
                resolve()
            } catch (e) {
                chavy.msg(cookieName, `获取用户信息: 失败`, `说明: ${e}`)
                chavy.log(`❌ ${cookieName} getinfo - 获取用户信息失败: ${e}`)
                chavy.log(`❌ ${cookieName} getinfo - response: ${JSON.stringify(response)}`)
                resolve()
            }
        })
    })
}

function watering() {
    return new Promise((resolve, reject) => {
		let w_body = { "mapJsonId": 10, "mapLevelJsonId": 104, "seedJsonId": 1005 }
        const url = { url: VAL_watering_url, headers: JSON.parse(VAL_signheader), body : w_body }
        chavy.post(url, (error, response, data) => {
            try {
				chavy.msg(cookieName, `浇水结果`, data)
                signinfo.watering = JSON.parse(data)
                resolve()
            } catch (e) {
                chavy.msg(cookieName, `浇水结果: 失败`, `说明: ${e}`)
                chavy.log(`❌ ${cookieName} watering - 浇水失败: ${e}`)
                chavy.log(`❌ ${cookieName} watering - response: ${JSON.stringify(response)}`)
                resolve()
            }
        })
    })
}

function showmsg() {
    let subTitle = ''
    let detail = JSON.stringify(signinfo)
    console.log(detail)
    
    chavy.msg(cookieName, subTitle, detail)
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
        if (url['headers'] != undefined) {
            delete url['headers']['Content-Length']
            console.log(url['headers'])
        }
        if (isSurge()) {
            $httpClient.get(url, cb)
        }
        if (isQuanX()) {
            url.method = 'GET'
            $task.fetch(url).then((resp) => cb(null, resp, resp.body))
        }
    }
    post = (url, cb) => {
        if (url['headers'] != undefined) {
            delete url['headers']['Content-Length']
            console.log(url['headers'])
        }
        if (isSurge()) {
            $httpClient.post(url, cb)
        }
        if (isQuanX()) {
            url.method = 'POST'
            $task.fetch(url).then((resp) => cb(null, resp, resp.body))
        }
    }
    done = (value = {}) => {
        $done(value)
    }
    return { isSurge, isQuanX, msg, log, getdata, setdata, get, post, done }
}
