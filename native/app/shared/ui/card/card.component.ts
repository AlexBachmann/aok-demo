/**
 * This file is part of the TEKKL core package
 *
 * (c) Alexander Bachmann <email.bachmann@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { Component, Input } from "@angular/core";

@Component({
    selector: "tekkl-card",
    moduleId: module.id,
    templateUrl: "./card.component.html",
    styleUrls: ['./card.component.css']
})
export class CardComponent {
	@Input() route: string;

	navigate(){
		console.log(this.route);
	}
}