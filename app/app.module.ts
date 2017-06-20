import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { AppRoutingModule } from "./app.routing";
import { AppComponent } from "./app.component";

import { ItemService } from "./item/item.service";
import { TestPage2Service } from "./testPage2/shared/testPage2.service";
import { ItemsComponent } from "./item/items.component";
import { ItemDetailComponent } from "./item/item-detail.component";
import { TestPageComponent } from "./testPage/testPage.component";
import { TestPage2Component } from "./testPage2/testPage2.component";


@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        AppRoutingModule
    ],
    declarations: [
        AppComponent,
        ItemsComponent,
        ItemDetailComponent,
        TestPageComponent,
        TestPage2Component
    ],
    providers: [
        ItemService,
        TestPage2Service
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AppModule { }
