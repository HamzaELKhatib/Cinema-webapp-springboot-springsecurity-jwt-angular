import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { RouterModule, Routes } from "@angular/router";
import { CoreCommonModule } from "src/@core/common.module";
import { FormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NgSelectModule } from "@ng-select/ng-select";
import { Ng2FlatpickrModule } from "ng2-flatpickr";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { CorePipesModule } from "src/@core/pipes/pipes.module";
import { CoreDirectivesModule } from "src/@core/directives/directives";
import { CoreSidebarModule } from "src/@core/components";
import { FileUploadModule } from "ng2-file-upload";
import { HallListComponent } from "./hall-list/hall-list.component";
import { HallAddComponent } from "./hall-add/hall-add.component";
import { HallEditComponent } from "./hall-edit/hall-edit.component";



const routes: Routes = [
  {
    path: "list",
    component: HallListComponent,
    data: { animation: "HallListComponent" },
  },
  {
    path: "add",
    component: HallAddComponent,
    data: { animation: "HallAddComponent" },
  },
  {
    path: "edit/:id",
    component: HallEditComponent,
    data: { path: "edit/:id", animation: "HallEditComponent" },
  },
  {
    path: "",
    redirectTo: "dashboard/users/list",
    pathMatch: "full",
  }
];

@NgModule({
  declarations: [
    HallListComponent,
    HallAddComponent,
    HallEditComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    CoreCommonModule,
    FormsModule,
    NgbModule,
    NgSelectModule,
    Ng2FlatpickrModule,
    NgxDatatableModule,
    CorePipesModule,
    CoreDirectivesModule,
    CoreSidebarModule,
    FileUploadModule,
  ],
  bootstrap: [HallListComponent],
})
export class HallModule {}
