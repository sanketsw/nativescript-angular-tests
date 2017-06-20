import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes } from "@angular/router";

import { ItemsComponent } from "./item/items.component";
import { ItemDetailComponent } from "./item/item-detail.component";
import { TestPageComponent } from "./testPage/testPage.component";
import { TestPage2Component } from "./testPage2/testPage2.component";

const routes: Routes = [
    { path: "items", component: ItemsComponent },
    { path: "item/:id", component: ItemDetailComponent },
    { path: "testPage", component: TestPageComponent },
    { path: "", component: TestPage2Component },
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }