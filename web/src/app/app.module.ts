import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MaterialModule } from "./material";
import { TopBarComponent } from "./top-bar/top-bar.component";
import { LandingComponent } from "./landing/landing.component";
import { MembersComponent } from "./members/members.component";
import { StockComponent } from "./stock/stock.component";
import { RentComponent } from "./rent/rent.component";
import { FlexLayoutModule } from "@angular/flex-layout";
import { DialogBoxComponent } from "./dialog-box/dialog-box.component";
import { DialogRentComponent } from "./dialog-rent/dialog-rent.component";
import { DialogStockComponent } from "./dialog-stock/dialog-stock.component";

@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    LandingComponent,
    MembersComponent,
    StockComponent,
    RentComponent,
    DialogBoxComponent,
    DialogRentComponent,
    DialogStockComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
