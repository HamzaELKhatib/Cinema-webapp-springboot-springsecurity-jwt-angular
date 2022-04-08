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
import { ProjectionListComponent } from "./projection-list/projection-list.component";
import { ProjectionAddComponent } from "./projection-add/projection-add.component";
import { ProjectionEditComponent } from "./projection-edit/projection-edit.component";



const routes: Routes = [
  {
    path: "add",
    component: ProjectionAddComponent,
    data: { animation: "ProjectionAddComponent" },
  },
  {
    path: "list",
    component: ProjectionListComponent,
    data: { animation: "ProjectionListComponent" },
  },

  {
    path: "edit/:id",
    component: ProjectionEditComponent,
    data: { path: "edit/:id", animation: "ProjectionEditComponent" },
  },

  {
    path: "",
    redirectTo: "dashboard/projections/list",
    pathMatch: "full",
  }
];

@NgModule({
  declarations: [
    ProjectionAddComponent,
    ProjectionEditComponent,
    ProjectionListComponent,
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
  bootstrap: [ProjectionListComponent],
  exports: [
    ProjectionListComponent
  ]
})
export class ProjectionModule {}
