import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Section } from './models';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  url: string = '/assets/data.json';
  recommendations: string[][] = [[]];

  constructor(private http: HttpClient) { }

  getJsonData(): Observable<Section[]> {
    return this.http.get<Section[]>(this.url);
  }

  prepareRecommendations(sections: Section[]): void {
    sections.forEach((value, index) => {
      this.recommendations[index] = [];

      value.questions.forEach((value, index2) => {
        this.recommendations[index][index2] = "";
      });
    });

  }

  getRecommendationBySectionAndQuestion(sectionIndex: number, questionIndex: number): string {
    return this.recommendations[sectionIndex][questionIndex];
  }

  setRecommendationBySectionAndQuestion(sectionIndex: number, questionIndex: number, recommendationText: string): void {
    this.recommendations[sectionIndex][questionIndex] = recommendationText;
  }

  getRecommendationsMerged(): string[] {
    var recommendationsFlat = this.recommendations.reduce(function(prev, next) {
      return prev.concat(next);
    });

    return recommendationsFlat;
  }

}
