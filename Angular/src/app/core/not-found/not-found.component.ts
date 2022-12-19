import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})

export class NotFoundComponent implements OnInit {
  
  page_not_found: boolean = false


  ngOnInit(): void {
    this.page_not_found= true 
  }
}
