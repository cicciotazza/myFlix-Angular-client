import { Component, Inject, OnInit } from '@angular/core';
// MAT_DIALOG_DATA an injection token,  allows us to access data passed in to a dialog
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-synopsis',
  templateUrl: './synopsis.component.html',
  styleUrls: ['./synopsis.component.scss']
})
export class SynopsisComponent implements OnInit {
  // The data passed to the dialog is injected into the component so it can be used in the component template
  constructor(@Inject(MAT_DIALOG_DATA) public data: { Title: string, Description: string }) { }

  ngOnInit(): void { }
}
