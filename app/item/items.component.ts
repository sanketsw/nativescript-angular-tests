import { Component, OnInit } from "@angular/core";
import { Auth0Lock } from "nativescript-auth0";
import { Item } from "./item";
import { ItemService } from "./item.service";

@Component({
	selector: "ns-items",
	moduleId: module.id,
	templateUrl: "./items.component.html",
})
export class ItemsComponent implements OnInit {
	items: Item[];
	constructor(private itemService: ItemService) {
		var lock = new Auth0Lock({
			clientId: 'In37wI97YdcotndGEQDP_B-6BnKj2YYX',
			domain:'cadencecore.au.auth0.com'
		});
		lock.show().then((res) => {
			//goToHomeOrWhatevs();
		}, function (error) {
			//console.log(error);
		});
	}

	ngOnInit(): void {
		this.items = this.itemService.getItems();
	}
}
