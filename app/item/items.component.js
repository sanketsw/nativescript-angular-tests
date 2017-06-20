"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var nativescript_auth0_1 = require("nativescript-auth0");
var item_service_1 = require("./item.service");
var ItemsComponent = (function () {
    function ItemsComponent(itemService) {
        this.itemService = itemService;
        var lock = new nativescript_auth0_1.Auth0Lock({
            clientId: 'In37wI97YdcotndGEQDP_B-6BnKj2YYX',
            domain: 'cadencecore.au.auth0.com'
        });
        lock.show().then(function (res) {
            //goToHomeOrWhatevs();
        }, function (error) {
            //console.log(error);
        });
    }
    ItemsComponent.prototype.ngOnInit = function () {
        this.items = this.itemService.getItems();
    };
    return ItemsComponent;
}());
ItemsComponent = __decorate([
    core_1.Component({
        selector: "ns-items",
        moduleId: module.id,
        templateUrl: "./items.component.html",
    }),
    __metadata("design:paramtypes", [item_service_1.ItemService])
], ItemsComponent);
exports.ItemsComponent = ItemsComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXRlbXMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaXRlbXMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWtEO0FBQ2xELHlEQUErQztBQUUvQywrQ0FBNkM7QUFPN0MsSUFBYSxjQUFjO0lBRTFCLHdCQUFvQixXQUF3QjtRQUF4QixnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUMzQyxJQUFJLElBQUksR0FBRyxJQUFJLDhCQUFTLENBQUM7WUFDeEIsUUFBUSxFQUFFLGtDQUFrQztZQUM1QyxNQUFNLEVBQUMsMEJBQTBCO1NBQ2pDLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBQyxHQUFHO1lBQ3BCLHNCQUFzQjtRQUN2QixDQUFDLEVBQUUsVUFBVSxLQUFLO1lBQ2pCLHFCQUFxQjtRQUN0QixDQUFDLENBQUMsQ0FBQztJQUNKLENBQUM7SUFFRCxpQ0FBUSxHQUFSO1FBQ0MsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQzFDLENBQUM7SUFDRixxQkFBQztBQUFELENBQUMsQUFqQkQsSUFpQkM7QUFqQlksY0FBYztJQUwxQixnQkFBUyxDQUFDO1FBQ1YsUUFBUSxFQUFFLFVBQVU7UUFDcEIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1FBQ25CLFdBQVcsRUFBRSx3QkFBd0I7S0FDckMsQ0FBQztxQ0FHZ0MsMEJBQVc7R0FGaEMsY0FBYyxDQWlCMUI7QUFqQlksd0NBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBBdXRoMExvY2sgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWF1dGgwXCI7XG5pbXBvcnQgeyBJdGVtIH0gZnJvbSBcIi4vaXRlbVwiO1xuaW1wb3J0IHsgSXRlbVNlcnZpY2UgfSBmcm9tIFwiLi9pdGVtLnNlcnZpY2VcIjtcblxuQENvbXBvbmVudCh7XG5cdHNlbGVjdG9yOiBcIm5zLWl0ZW1zXCIsXG5cdG1vZHVsZUlkOiBtb2R1bGUuaWQsXG5cdHRlbXBsYXRlVXJsOiBcIi4vaXRlbXMuY29tcG9uZW50Lmh0bWxcIixcbn0pXG5leHBvcnQgY2xhc3MgSXRlbXNDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXHRpdGVtczogSXRlbVtdO1xuXHRjb25zdHJ1Y3Rvcihwcml2YXRlIGl0ZW1TZXJ2aWNlOiBJdGVtU2VydmljZSkge1xuXHRcdHZhciBsb2NrID0gbmV3IEF1dGgwTG9jayh7XG5cdFx0XHRjbGllbnRJZDogJ0luMzd3STk3WWRjb3RuZEdFUURQX0ItNkJuS2oyWVlYJyxcblx0XHRcdGRvbWFpbjonY2FkZW5jZWNvcmUuYXUuYXV0aDAuY29tJ1xuXHRcdH0pO1xuXHRcdGxvY2suc2hvdygpLnRoZW4oKHJlcykgPT4ge1xuXHRcdFx0Ly9nb1RvSG9tZU9yV2hhdGV2cygpO1xuXHRcdH0sIGZ1bmN0aW9uIChlcnJvcikge1xuXHRcdFx0Ly9jb25zb2xlLmxvZyhlcnJvcik7XG5cdFx0fSk7XG5cdH1cblxuXHRuZ09uSW5pdCgpOiB2b2lkIHtcblx0XHR0aGlzLml0ZW1zID0gdGhpcy5pdGVtU2VydmljZS5nZXRJdGVtcygpO1xuXHR9XG59XG4iXX0=