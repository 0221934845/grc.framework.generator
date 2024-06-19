import { Component, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent {

  @Input() recommendations: string[] = [];

  displayedColumns: string[] = ['index', 'recommendation'];
  dataSource = new MatTableDataSource<{index: number, recommendation: string}>();


  constructor() { }

  ngOnChanges() {
    this.dataSource.data = this.recommendations.map((recommendation, index) => ({ index, recommendation }));
  }

  generatePdf() {
    let header: string[] = [
      "Establish a GRC Framework for Digital Transformation",
      " ",
      "Recommendations:",
      " "
    ];

    let body = this.recommendations;

    let content = header.concat(body);

    let docDefinition = {
      content: content
    };

    pdfMake.createPdf(docDefinition).open();
  }

}
