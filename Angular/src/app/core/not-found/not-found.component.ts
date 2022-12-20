import { urlPaths } from 'src/app/support/url.paths';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['../../jobs/delete/delete.component.css']
})

export class NotFoundComponent implements OnInit {

  paths = urlPaths
  
  page_not_found: boolean = false


  ngOnInit(): void {
    this.page_not_found= true 
  }
}
