/**
 * This file is part of the TEKKL core package
 *
 * (c) Alexander Bachmann <email.bachmann@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { StringHelper } from './string-helper';

export class TimeHelper {
	static formatDurationStringFromSeconds(seconds, formats?: {
		days: string,
		hours: string,
		minutes: string
		seconds: string
	}){
		if(seconds < 0) seconds = 0;

		var days = Math.floor(seconds / 86400);
		seconds = seconds % 86400;

		var hours = Math.floor(seconds / 3600);
		seconds = seconds % 3600;

		var minutes = Math.floor(seconds / 60);
		seconds = seconds % 60;

		return TimeHelper.formatDuration(days, hours, minutes, seconds, formats);
	}
	static formatDuration(
		days, 
		hours, 
		minutes, 
		seconds, 
		formats?: {
			days: string,
			hours: string,
			minutes: string
			seconds: string
		}
	){
		if(!formats){
			formats = {
				days: '%days days, %hoursh %minutesmin remaining',
				hours: '%Hoursh%minutesmin remaining',
				minutes: '%Minutes:%seconds minutes remaining',
				seconds: '%Seconds seconds remaining'
			}
		}

		var format = formats['seconds'];
		if(minutes) format = formats['minutes'];
		if(hours) format = formats['hours'];
		if(days) format = formats['days'];

		format = format.replace('%days', days);
		format = format.replace('%hours', StringHelper.leftPad(hours, 2, '0'));
		format = format.replace('%Hours', hours);
		format = format.replace('%minutes', StringHelper.leftPad(minutes, 2, '0'));
		format = format.replace('%Minutes', minutes);
		format = format.replace('%seconds', StringHelper.leftPad(seconds, 2, '0'));
		format = format.replace('%Seconds', seconds);

		return format;
	}
}