import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {CoreSidebarService} from 'src/@core/components/core-sidebar/core-sidebar.service';
import {AuthenticationService} from "../../../../auth/service/authentication.service";
import {FileUploader} from "ng2-file-upload";
import {SliderService} from "../../../../service/slider.service";
import {environment} from "../../../../../environments/environment";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'new-slider-sidebar',
  templateUrl: './new-slider-sidebar.component.html',
  styleUrls: ['./new-slider-sidebar.component.scss']
})
export class NewSliderSidebarComponent implements OnInit {

  @Output() onItemAdded = new EventEmitter<boolean>();
  public uploader: FileUploader = new FileUploader({
    isHTML5: true,
    itemAlias: 'file',
  })
  public isAddingItem = false;
  public previewPath: any;
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private _coreSidebarService: CoreSidebarService, private _authService: AuthenticationService, private _sliderService: SliderService,
              private sanitizer: DomSanitizer) {

    this.uploader.onAfterAddingFile = (fileItem) => {
      this.previewPath = this.sanitizer.bypassSecurityTrustUrl((window.URL.createObjectURL(fileItem._file)));
    }
  }

  toggleSidebar(name): void {
    this._coreSidebarService.getSidebarRegistry(name).toggleOpen();
  }


  uploadImage(slider) {

    this.uploader.options.authToken = 'Bearer ' + this._authService.getToken()
    this.uploader.setOptions({url: `${this.apiServerUrl}/slider/${slider.id}/image`})
    this.uploader.uploadAll()
    this.isAddingItem = true


  }

  submit(form) {
    console.log(form.value)
    if (form.valid) {
      this._sliderService.addNew(form.value).subscribe(
        (response) => {
          this.uploadImage(response)


        }
      )
    }
  }

  ngOnInit(): void {
    this.uploader.onCompleteAll = () => {
      this.isAddingItem = false
      this.onItemAdded.emit(true);
      this.toggleSidebar('new-slider-sidebar');
    };

  }
}
