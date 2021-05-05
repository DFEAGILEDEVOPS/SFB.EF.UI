import { Injectable } from '@angular/core';
import html2canvas from "html2canvas";
import * as $ from 'jquery';
import { jsPDF } from "jspdf";

@Injectable({
  providedIn: 'root'
})
export class PdfService {
  MARGIN_LEFT: number;
  doc: any;
  offset: number;

  constructor() {
    this.MARGIN_LEFT = 50;
  }

  public generatePdf(media: string) {
    $("body").css("cursor", "wait");
    this.offset = 60;
    this.doc = new jsPDF({ unit: 'px', format: 'a1', orientation: 'portrait' });
    this.pdfWriteLine("H1", $("H1").text());
    this.pdfWriteLine("Bold", $("#resultsFor").text());
    this.pdfWriteLine("Normal", $("#emRankContent-1").text());
    this.pdfWriteLine("Normal", $("#emRankContent-2").text());

    return new Promise((resolve) => {
      this.pdfGenerateImage('#emTableDesktop').then((canvas) => {
        if (media === "mobile") {
          this.pdfAddImage(canvas, 500, 1500);
        } else {
          this.pdfAddImage(canvas, null, null);
        }

        this.pdfSave("Efficiency-metric.pdf");
        $("body").css("cursor", "");
        resolve();
      });
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
      allowTaint:true,
      scale: 1
    });
  }

  private pdfAddImage(canvas, width, height) {
    let img = canvas.toDataURL("image/png");
    this.doc.addImage(img, 'JPEG', this.MARGIN_LEFT, this.offset, width, height, "", 'FAST');
  }

  private pdfSave(pdfName: string) {
    this.doc.save(pdfName);
  }

  private pdfWriteLine(type: string, text: string) {
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
    this.doc.text(this.MARGIN_LEFT, this.offset, text);
    this.offset += fontSize + 8;
  }


}
