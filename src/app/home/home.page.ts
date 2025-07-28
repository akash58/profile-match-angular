import { Component, ViewChild, ElementRef } from '@angular/core';
import { ApiService } from '../service/api.service';
import { Router } from '@angular/router';
import { SpinnerService } from '../service/spinner.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  results: any[] = [];
  interests: any = [
    {  name: 'Rishi', image: 'assets/calaveras/profile1.png' },
    { name: 'Ben', image: 'assets/calaveras/profile2.png' },
    { name: 'Joe', image: 'assets/calaveras/profile3.png' },
  ];

  referenceText = 'machine learning';
  resultData: any[] = [];
  items = [
    'artificial intelligence',
    'deep learning',
    'history of computing',
    'neural networks',
    'sports and fitness'
  ];

  selectedItem = '';

  constructor(private apiService: ApiService, private router: Router, private spinnerService: SpinnerService) {
  }
  ngOnInit(){
    const assetImageUrls = [
      'assets/calaveras/profile1.png',
      'assets/calaveras/profile2.png',
      'assets/calaveras/profile3.png'
    ];

    this.faceDetectApi(assetImageUrls);
    this.compareTexts(this.referenceText)
  }

  faceDetectApi(assetImageUrls: any){
    this.spinnerService.show();
    this.apiService.detectFacesFromAssets(assetImageUrls).subscribe({
      next: res => {
        this.results = res;
        this.spinnerService.hide();
      },
      error: err => {
        console.error('Face detect error:', err);
        this.spinnerService.hide();
      }
    });
  }

  compareTexts(data: any) {
    this.spinnerService.show();
    this.apiService.getSimilarityScores(data, this.items).subscribe({
      next: res => {
        this.resultData = res
        console.log(this.resultData, 'ooo')
        this.spinnerService.hide();
      },
      error: err => {
        console.error('API error:', err)
        this.spinnerService.hide();
      }
    });
  }

  goToProfile() {
    this.router.navigate(['/profile']);
  }

}
