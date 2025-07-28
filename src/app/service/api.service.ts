import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, map, switchMap } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private faceDetectApiUrl = 'https://api.api-ninjas.com/v1/facedetect';
  private textDetectApiUrl = 'https://api.api-ninjas.com/v1/textsimilarity';
  private apiKey = 'j8xK2b2OnNP6d7AO9ssaiA==8t6uVymNlKkCMyDp';

  constructor(private http: HttpClient) {}

  detectFacesFromAssets(imageUrls: string[]): Observable<any[]> {
    // Map each image to an Observable that fetches the blob and posts it
    const requests = imageUrls.map(url =>
      this.http.get(url, { responseType: 'blob' }).pipe(
        switchMap(blob => {
          const file = new File([blob], this.extractFileName(url), { type: blob.type });
          const formData = new FormData();
          formData.append('image', file);

          const headers = new HttpHeaders({
            'X-Api-Key': this.apiKey
          });

          return this.http.post(this.faceDetectApiUrl, formData, { headers });
        })
      )
    );

    // Use forkJoin to execute all requests in parallel
    return forkJoin(requests);
  }

  private extractFileName(url: string): string {
    return url.split('/').pop() || 'image.jpg';
  }

  getSimilarityScores(referenceText: string, items: string[]): Observable<any[]> {
    const headers = new HttpHeaders({
      'X-Api-Key': this.apiKey,
      'Content-Type': 'application/json'
    });

    const requests = items.map(item => {
      const body = {
        text_1: referenceText,
        text_2: item
      };

      return this.http.post<any>(this.textDetectApiUrl, body, { headers }).pipe(
        map(res => ({
          item,
          similarity: res.similarity
        }))
      );
    });

    return forkJoin(requests).pipe(
      map(results => results.sort((a, b) => b.similarity - a.similarity))
    );
  }

}
