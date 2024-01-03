const getUrl = ()=>{
    return (window.location.origin + '/api')
}
export default {
	baseUrl: 'http://192.168.0.113:8080',
	// baseUrl: getUrl(),
	version: '1.0.0',
	tokenKey: 'cx-token',
	userInfoKey: 'cx-userInfo'
}