import { Component, OnInit } from '@angular/core';
import { SpinnerService } from '../service/spinner.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
  standalone: false
})
export class SpinnerComponent  implements OnInit {

  constructor(public spinnerService: SpinnerService) {}

  ngOnInit() {}

  get isLoading(): boolean {
    return this.spinnerService.isLoading;
  }
}
