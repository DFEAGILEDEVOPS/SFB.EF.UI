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
      case "KS2":
        initialState = {
          title: "Key stage 2 progress scores",
          textContent: "The scores are calculated by comparing the key stage 2 test and assessment results of pupils with the results of pupils in schools across England who started with similar assessment results at the end of the previous key stage 1." +
          "<h4 class='govuk-heading-s govuk-!-margin-top-4'>What do the scores mean</h4>" +
          "<div class='modal__score'><div class='score well-below'>Well below average</div><div>About <span class='bold'>10%</span> of</br> schools in England</div></div>" +
          "<div class='modal__score'><div class='score below'>Below average</div><div>About <span class='bold'>10%</span> of</br> schools in England</div></div>" +
          "<div class='modal__score'><div class='score average'>Average</div><div>About <span class='bold'>60%</span> of</br> schools in England</div></div>" +
          "<div class='modal__score'><div class='score above'>Above average</div><div>About <span class='bold'>10%</span> of</br> schools in England</div></div>" +
          "<div class='modal__score'><div class='score well-above'>Well above average</div><div>About <span class='bold'>10%</span> of</br> schools in England</div></div>"
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
            "<div class='modal__score'><div class='score well-above'>Well above average</div><div>About <span class='bold'>14%</span> of</br> schools in England</div></div>"
          };
          this.modalRef = this.modalService.show(EditDataInfoModalComponent, { initialState });
          break;

      case "Score":
        initialState = {
          title: "Efficiency metric score",
          textContent: "Progress 8 score is calculated for each pupil by comparing their Attainment 8 score – with the average Attainment 8 scores of all pupils nationally who had a similar starting point, using assessment results from the end of primary school.</p>" +
          "<p>The efficiency metric score is a school's progress (KS2 or Progress 8) divided by their per pupil expenditure.</p>" +
          "<span class='govuk-!-font-weight-bold'>KS2 progress <span class='italic'>or</span> Progress 8 / Expenditure per pupil = Efficiency metric score</span>"
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
