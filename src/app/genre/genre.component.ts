/** 
 * GenreComponent  used to render a mat dialog containing information about
 * the genre of the movie selected.
 * @module DirectorComponent
 */

import { Component, Inject, OnInit } from '@angular/core';
// MAT_DIALOG_DATA injection token, allows to access data passed into dialog
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-genre',
  templateUrl: './genre.component.html',
  styleUrls: ['./genre.component.scss']
})
export class GenreComponent implements OnInit {
/**
   * The data that was passed to the Genre dialog in the MovieCardComponent is injected to the 
   * constructor using the MAT_DIALOG_DATA injection token. The data becomes a property on the class
   * and is hence available to be output in the template.
   */constructor(@Inject(MAT_DIALOG_DATA) public data: { Name: string, Description: string }) { }

  ngOnInit(): void {}
}
