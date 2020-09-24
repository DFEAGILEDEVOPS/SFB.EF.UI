import { Injectable } from '@angular/core';
import html2canvas from "html2canvas";
import * as $ from 'jquery';
import { from } from 'rxjs';
import { jsPDF } from "jspdf";

@Injectable({
  providedIn: 'root'
})
export class PdfService {
  MARGIN_LEFT: number;
  doc: any;
  offset: number;
  canvassesForDesktopTables: any[];
  //canvassesForMobileTables: any[];

  constructor() {
    this.MARGIN_LEFT = 50;
  }

  public generatePdf(media: string) {
    $("#downloadPage").text(" Loading...");
    $("body").css("cursor", "wait");
    this.offset = 60;
    this.doc = new jsPDF({ unit: 'px', format: 'a1', orientation: 'portrait' });
    //this.pdfWriteLine("H1", $("H1").text(), media === "mobile");

    return new Promise((resolve) => {
        if(media === "mobile") {
          $('#emTableDesktop').css("width", "1000px");
          $('#emTableDesktop .em-table__rank-header').css("padding-top", "300px");
        }
        setTimeout(() => {
          this.pdfGenerateImage('#emTableDesktop').then((canvas) => {
            // this.pdfAddNewPage();

            this.pdfAddImage(canvas, 500, 1550);
            //this.offset += canvas.height + 50;

            this.pdfSave("Self-assessment-dashboard.pdf");
            $("#downloadPage").text(" Download page");
            $("body").css("cursor", "");
            if(media === "mobile") {
              $('#emTableDesktop').css("width", "unset");
              $('#emTableDesktop .em-table__rank-header').css("padding-top", "unset");
            }
            resolve();
          });
        }, 1000);
  })


  }



  private pdfAddNewPage() {
    this.doc.addPage('a1', 'portrait');
    this.offset = 30;
  }

  private pdfGenerateImage(elementId) {
    let element = $(elementId)[0];
    return html2canvas(element, {
      imageTimeout: 20000,
      removeContainer: false,
      width: element.clientWidth,
      height: element.clientHeight,
      allowTaint:true
    });
  }

  private pdfAddImage(canvas, width, height) {
    let img = canvas.toDataURL("image/png");
    this.doc.addImage(img, 'JPEG', this.MARGIN_LEFT, this.offset, width, height, "", 'FAST');
  }

  private pdfSave(pdfName: string) {
    this.doc.save(pdfName);
  }

  private pdfWriteLine(type: string, text: string, isMobile?: boolean) {
    this.doc.setTextColor(0, 0, 0);
    let fontSize;
    switch (type) {
      case 'H1':
        this.offset += 4;
        this.doc.setFont("helvetica", "bold");
        fontSize = 40;
        break;
      case 'H2':
        this.offset += 3;
        this.doc.setFont("helvetica", "bold");
        fontSize = 30;
        break;
      case 'H3':
        this.offset += 2;
        this.doc.setFont("helvetica", "bold");
        fontSize = 20;
        break;
      case 'Warning':
        this.doc.setFont("helvetica", "italic");
        this.doc.setTextColor(244, 119, 56);
        fontSize = 12;
        break;
      case 'Grayed':
        this.doc.setTextColor(177, 180, 182);
        fontSize = 14;
        break;
      case 'Info':
        this.doc.setFont("helvetica", "italic");
        fontSize = 14;
        break;
      case 'Bold':
        this.doc.setFont("helvetica", "bold");
        fontSize = 14;
        break;
      case 'SmallBold':
        this.doc.setFont("helvetica", "bold");
        fontSize = 8;
        break;
      default:
        this.doc.setFont("helvetica");
        fontSize = 12;
        this.offset += 2;
    }

    this.doc.setFontSize(fontSize);
    if (isMobile) {
      this.doc.text(this.MARGIN_LEFT, this.offset, text);
    }else{
      this.doc.text(this.MARGIN_LEFT + 5, this.offset, text);
    }
    this.offset += fontSize + 8;
  }


}
