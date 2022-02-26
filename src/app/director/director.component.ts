import { Component, Inject, OnInit } from '@angular/core';
// MAT_DIALOG_DATA injection token  allows us to access data passed into dialog
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-director',
  templateUrl: './director.component.html',
  styleUrls: ['./director.component.scss']
})
export class DirectorComponent implements OnInit {
  // Data passed to the dialog, injected into the component can be used in the template
  constructor(@Inject(MAT_DIALOG_DATA) public data: { Name: string, Bio: string, Birthday: string, Death: string }) { }
  
  ngOnInit(): void {}
}
