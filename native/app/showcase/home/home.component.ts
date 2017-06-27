/**
 * This file is part of the TEKKL core package
 *
 * (c) Alexander Bachmann <email.bachmann@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { Component } from "@angular/core";

@Component({
    selector: "ns-home",
    moduleId: module.id,
    templateUrl: "home.component.html",
    styleUrls: ['./home.component.css']
})
export class HomeComponent { 
	navigateTo(path){
		console.log(path);
	}
}