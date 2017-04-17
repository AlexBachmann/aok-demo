/**
 * This file is part of the TEKKL core package
 *
 * (c) Alexander Bachmann <email.bachmann@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
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
		}
	]
}