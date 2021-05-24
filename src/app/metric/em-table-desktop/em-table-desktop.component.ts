import { Component, OnInit, Input, Inject } from '@angular/core';
import { EMModel } from 'app/Models/EMModel';
import { AppSettings, appSettings } from '@core/config/settings/app-settings';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { EditDataInfoModalComponent } from 'app/edit-data-info-modal/edit-data-info-modal.component';

@Component({
  selector: 'app-em-table-desktop',
  templateUrl: './em-table-desktop.component.html',
  styleUrls: ['./em-table-desktop.component.scss']
})
export class EmTableDesktopComponent implements OnInit {

  @Input() isDesktopPdfInProgress: boolean;
  @Input() isMobilePdfInProgress: boolean;
  @Input() model: EMModel;
  modalRef: BsModalRef;

  constructor(@Inject(appSettings) public settings: AppSettings, private modalService: BsModalService) {
  }

  ngOnInit() {
  }

  onScrollToSchool() {
    this.scroll(document.querySelector('#emTableDesktop .em-rank-text--' + this.model.rank).parentElement);
  }

  openModalWithComponent(field: string) {
    let initialState;
    switch (field) {
      case "FSM":
        initialState = {
          title: "Ever6 FSM",
          textContent: "Percentage of pupils who were eligible for free school meals (FSM) at any point in the last 6 years.",
          referrer: "help-fsm"
        };
        this.modalRef = this.modalService.show(EditDataInfoModalComponent, { initialState });
        break;

      case "SEN":
        initialState = {
          title: "SEN / EHCP",
          textContent: "Percentage of pupils with special educational needs (SEN) with or without either a Statement of special educational needs or an Education, health and care (EHC) plan.",
          referrer: "help-sen"
        };
        this.modalRef = this.modalService.show(EditDataInfoModalComponent, { initialState });
        break;

      case "KS2":
        initialState = {
          title: "Key stage 2 progress scores",
          textContent: "KS2 progress shows how the average of three progress measures, reading, writing and math, pupils at this school made between the end of key stage 1 and the end of key stage 2, compared to pupils across England who got similar results at the end of key stage 1." +
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
          textContent: "Progress 8 shows how much progress pupils at this school made between the end of key stage 2 and the end of key stage 4, compared to pupils across England who got similar results at the end of key stage 2.</p>" +
            "<h4 class='govuk-heading-s govuk-!-margin-top-4'>What do the scores mean</h4>" +
            "<div class='modal__score'><div class='score well-below'>Well below average</div><div>About <span class='bold'>13%</span> of</br> schools in England</div></div>" +
            "<div class='modal__score'><div class='score below'>Below average</div><div>About <span class='bold'>19%</span> of</br> schools in England</div></div>" +
            "<div class='modal__score'><div class='score average'>Average</div><div>About <span class='bold'>37%</span> of</br> schools in England</div></div>" +
            "<div class='modal__score'><div class='score above'>Above average</div><div>About <span class='bold'>17%</span> of</br> schools in England</div></div>" +
            "<div class='modal__score'><div class='score well-above'>Well above average</div><div>About <span class='bold'>14%</span> of</br> schools in England</div></div>" +
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
