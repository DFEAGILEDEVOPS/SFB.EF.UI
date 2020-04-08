import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EMModel } from 'app/Models/EMModel';
import { appSettings, AppSettings } from '@core/config/settings/app-settings';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  urn: number;
  model: EMModel;
  tableState: string;
  columnState: string;

  constructor(@Inject(appSettings) public appsettings: AppSettings, private route: ActivatedRoute, private http: HttpClient) {
    this.route.params.subscribe(params => {
      this.urn = +params.urn;
      this.model = new EMModel();
      this.tableState = 'full';
      this.columnState = 'school-data';
    });
  }

  ngOnInit() {
    this.http.get('https://aa-t1dv-sfb.azurewebsites.net/api/efficiencymetric/' + this.urn).
    subscribe(result => {
      this.model = result as EMModel;
    });
  }

  onTableDecileToggle() {
    this.tableState = this.tableState === 'full' ? 'decileOnly' : 'full';
  }

  onColumnDetailsToggle() {
    this.columnState = this.columnState === 'school-data' ? 'contact-details' : 'school-data';
  }

  onRenderRankingModal() {
    // debugger;
    // const body = document.getElementsByTagName('BODY')[0];
    // const page = document.getElementById('js-modal-page');

    // const modalCode = document.createElement('<dialog id="js-modal" class="modal" role="dialog" aria-labelledby="modal-title">' +
    //     '<a href="#" id="js-modal-close" class="modal-close" data-focus-back="additionalGrantModal" title="Close">Close</a>' +
    //     '<h1 id="modal-title" class="modal-title">Additional grant for schools</h1><p id="modal-content">' +
    //     '<a href="#" id="js-modal-close-bottom" class="modal-close white-font" data-focus-back="additionalGrantModal"' +
    //     'title="Close">Close</a></dialog>');

    // this.insertAfter(modalCode, page);
    // body.classList.add('no-scroll');

    // page.setAttribute('aria-hidden', 'true');

    // // add overlay
    // const modalOverlay = document.createElement(
    //     '<span id="js-modal-overlay" class="modal-overlay" title="Close" data-background-click="enabled">' +
    //     '<span class="invisible">Close modal</span></span>');

    // this.insertAfter(modalOverlay, document.getElementById('js-modal'));

    // document.getElementById('#js-modal-close').focus();

}

  private insertAfter(newNode, existingNode) {
    existingNode.parentNode.insertBefore(newNode, existingNode.nextSibling);
  }
}
