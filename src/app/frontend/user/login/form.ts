export default {
	fields: [
		{
			name: "username",
			type: "text",
			validators: {
				required: true,
				minlength: 4
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
			name: "remember",
			type: "checkbox"
		}
	]
}