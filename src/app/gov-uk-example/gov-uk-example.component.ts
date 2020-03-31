import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gov-uk-example',
  templateUrl: './gov-uk-example.component.html',
  styleUrls: ['./gov-uk-example.component.scss']
})
export class GovUkExampleComponent implements OnInit {

  constructor() { }

  ngOnInit() {

  }

  onButtonClick() {
    console.log('button clicked!');
  }

}
