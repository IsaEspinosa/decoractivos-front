import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PagesRoutes } from "./routes/pages";

@NgModule({
  imports: [
    RouterModule.forRoot([...PagesRoutes], { onSameUrlNavigation: "reload" })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
