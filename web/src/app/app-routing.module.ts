import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LandingComponent, MembersComponent, StockComponent, RentComponent } from ".";

const routes: Routes = [
    { path: "home", component: LandingComponent },
    { path: "members", component: MembersComponent },
    { path: "stock", component: StockComponent },
    { path: "rent", component: RentComponent },
    { path: "**", redirectTo: "/home", pathMatch: "full" }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
