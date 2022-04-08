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

import { ArtistListComponent } from "./artist-list/artist-list.component";
import { ArtistAddComponent } from "./artist-add/artist-add.component";
import { ArtistEditComponent } from "./artist-edit/artist-edit.component";


const routes: Routes = [
  {
    path: "list",
    component: ArtistListComponent,
    data: { animation: "ArtistListComponent" },
  },
  {
    path: "add",
    component: ArtistAddComponent,
    data: { animation: "ArtistAddComponent" },
  },
  {
    path: "edit/:id",
    component: ArtistEditComponent,
    data: { path: "edit/:id", animation: "ArtistEditComponent" },
  },
  {
    path: "",
    redirectTo: "dashboard/users/list",
    pathMatch: "full",
  }
];

@NgModule({
  declarations: [
    ArtistListComponent,
    ArtistAddComponent,
    ArtistEditComponent,
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
  bootstrap: [ArtistListComponent],
})
export class ArtistsModule {}
