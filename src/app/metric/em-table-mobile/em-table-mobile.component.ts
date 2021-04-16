import { Component, OnInit, Input, Inject } from '@angular/core';
import { EMModel } from 'app/Models/EMModel';
import { AppSettings, appSettings } from '@core/config/settings/app-settings';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { EditDataInfoModalComponent } from 'app/edit-data-info-modal/edit-data-info-modal.component';

@Component({
  selector: 'app-em-table-mobile',
  templateUrl: './em-table-mobile.component.html',
  styleUrls: ['./em-table-mobile.component.scss']
})
export class EmTableMobileComponent implements OnInit {

  @Input() model: EMModel;
  modalRef: BsModalRef;
  mode: string;

  constructor(@Inject(appSettings) public settings: AppSettings, private modalService: BsModalService) {
    this.mode = "summary";
  }

  ngOnInit() {
  }

  onScrollToSchool() {
    if(this.mode === "summary" ){
      this.scroll(document.querySelector('#emTableMobileSummary .em-rank-text--' + this.model.rank).parentElement);
    } else {
      this.scroll(document.querySelector('#emTableMobileDetailed .table-cell-highlight').parentElement.parentElement.parentElement);
    }
  }

  onToggleMode() {
    this.mode = this.mode === "summary" ? "detailed" : "summary";
  }

  openModalWithComponent(field: string) {
    let initialState;
    switch (field) {
      case "KS2":
        initialState = {
          title: "Key stage 2 progress scores",
          textContent: "The scores are calculated by comparing the key stage 2 test and assessment results of pupils with the results of pupils in schools across England who started with similar assessment results at the end of the previous key stage 1." +
          "<h4 class='govuk-heading-s govuk-!-margin-top-4'>What do the scores mean</h4>" +
          "<div class='modal__score'><div class='score well-below'>Well below average</div><div>About <span class='bold'>10%</span> of</br> schools in England</div></div>" +
          "<div class='modal__score'><div class='score below'>Below average</div><div>About <span class='bold'>10%</span> of</br> schools in England</div></div>" +
          "<div class='modal__score'><div class='score average'>Average</div><div>About <span class='bold'>60%</span> of</br> schools in England</div></div>" +
          "<div class='modal__score'><div class='score above'>Above average</div><div>About <span class='bold'>10%</span> of</br> schools in England</div></div>" +
          "<div class='modal__score'><div class='score well-above'>Well above average</div><div>About <span class='bold'>10%</span> of</br> schools in England</div></div>" +
          "<div class='govuk-inset-text'><span class='govuk-body-s'>Due to Covid-19 the Government is not publishing the school educational performance data for 2020, the latest progress data is from 2019.</span></div>",
          referrer: "help-ks2"
        };
        this.modalRef = this.modalService.show(EditDataInfoModalComponent, { initialState });
        break;

      case "Progress8":
          initialState = {
            title: "Progress 8 progress scores",
            textContent: "Progress 8 score is calculated for each pupil by comparing their Attainment 8 score – with the average Attainment 8 scores of all pupils nationally who had a similar starting point, using assessment results from the end of primary school.</p>" +
            "<h4 class='govuk-heading-s govuk-!-margin-top-4'>What do the scores mean</h4>" +
            "<div class='modal__score'><div class='score well-below'>Well below average</div><div>About <span class='bold'>13%</span> of</br> schools in England</div></div>" +
            "<div class='modal__score'><div class='score below'>Below average</div><div>About <span class='bold'>19%</span> of</br> schools in England</div></div>" +
            "<div class='modal__score'><div class='score average'>Average</div><div>About <span class='bold'>37%</span> of</br> schools in England</div></div>" +
            "<div class='modal__score'><div class='score above'>Above average</div><div>About <span class='bold'>17%</span> of</br> schools in England</div></div>" +
            "<div class='modal__score'><div class='score well-above'>Well above average</div><div>About <span class='bold'>14%</span> of</br> schools in England</div></div>"+
            "<div class='govuk-inset-text'><span class='govuk-body-s'>Due to Covid-19 the Government is not publishing the school educational performance data for 2020, the latest progress data is from 2019.</span></div>",
            referrer: "help-p8"
          };
          this.modalRef = this.modalService.show(EditDataInfoModalComponent, { initialState });
          break;

      default:
        break;
    }
  }

  private scroll(el: HTMLElement) {
    el.scrollIntoView({ behavior: 'smooth' });
  }

}
