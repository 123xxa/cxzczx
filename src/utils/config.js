const getUrl = ()=>{
    return process.env.NODE_ENV ==='development'?'http://192.168.0.118:8080': (window.location.origin + '/api')
}
console.log()
export default {
	baseUrl: getUrl(),
	version: '1.0.0',
	tokenKey: 'cx-token',
	userInfoKey: 'cx-userInfo'
}