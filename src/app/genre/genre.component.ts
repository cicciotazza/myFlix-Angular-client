import { Component, Inject, OnInit } from '@angular/core';
// MAT_DIALOG_DATA injection token, allows to access data passed into dialog
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-genre',
  templateUrl: './genre.component.html',
  styleUrls: ['./genre.component.scss']
})
export class GenreComponent implements OnInit {
// Data passed to the dialog, injected into the component so can be used in the component template
constructor(@Inject(MAT_DIALOG_DATA) public data: { Name: string, Description: string }) { }

  ngOnInit(): void {}
}
