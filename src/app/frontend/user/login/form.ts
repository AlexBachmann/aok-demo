export default {
	fields: [
		{
			name: "_username",
			type: "text",
			validators: {
				required: true,
				minlength: 4
			}
		},
		{
			name: "_password",
			type: "password",
			validators: {
				minlength: 8,
				required: true
			}
		},
		{
			name: "_remember",
			type: "checkbox"
		}
	]
}