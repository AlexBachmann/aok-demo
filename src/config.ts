export const config = {
	http : {
		devEndpoint: 'http://tekkl.local',
		prodEndpoint: 'http://tekkl.local',
		tokenName: 'loop_one_jwt_klj34asd49adhe',
		noJwtError: true,
		tokenGetter : (() => localStorage.getItem(this.tokenName)),
		tokenSetter: ((token) => {
			// You have to read localStorage before you can set (http://stackoverflow.com/questions/13292744/why-isnt-localstorage-persisting-in-chrome)
			localStorage.getItem(this.tokenName);
			localStorage.setItem(this.tokenName, token);
		})
	}
}