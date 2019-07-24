import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { QuotesComponent } from "../../quotes/components/Quotes.component";
import { RouterModule, Routes } from "@angular/router";
import { NotFoundComponent } from '../../not-found/not-found.component';

const AppRoute: Routes = [
  { path: 'quotes', component: QuotesComponent },
  { path: '', redirectTo: '/quotes', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(AppRoute)],
  declarations: [],
  exports: [RouterModule]
})
export class RoutesModule {}
