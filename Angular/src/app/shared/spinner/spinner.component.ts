import { Component } from '@angular/core';
import { LoadingSpinnerService } from 'src/services/http-spinner.service';


@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})



export class SpinnerComponent {

  constructor(public loader: LoadingSpinnerService){}


}
