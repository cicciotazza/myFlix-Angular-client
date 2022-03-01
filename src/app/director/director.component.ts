/** 
 * DirectorComponent used to render a mat dialog containing information 
 * about the director of the selected movie.
 * @module DirectorComponent
 */

import { Component, Inject, OnInit } from '@angular/core';
// MAT_DIALOG_DATA injection token  allows us to access data passed into dialog
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-director',
  templateUrl: './director.component.html',
  styleUrls: ['./director.component.scss']
})
export class DirectorComponent implements OnInit {
  /**
   * Data passed to the Director dialog in the MovieCardComponent is injected to the 
   * constructor using the MAT_DIALOG_DATA injection token. The data becomes a property on the class
   * and is hence available to be output in the template.
   */   constructor(@Inject(MAT_DIALOG_DATA) public data: { Name: string, Bio: string, Birthday: string, Death: string }) { }

  ngOnInit(): void { }
}
