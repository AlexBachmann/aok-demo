export default {
	fields: [
		{
			name: "username",
			type: "text",
			validators: {
				required: true,
				minlength: 4,
				maxlength: 124
			}
		},
		{
			name: "email",
			type: "email",
			validators: {
				required: true,
				minlength: 6,
				maxlength: 124,
				email: true
			}
		},
		{
			name: "password",
			type: "password",
			validators: {
				minlength: 8,
				required: true
			}
		},
		{
			name: "verify_password",
			type: "password",
			validators: {
				required: true,
				sameAs: 'password'
			}
		}
	]
}