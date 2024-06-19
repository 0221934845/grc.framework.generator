import { Component, OnInit } from '@angular/core';

import { DataService } from '../data.service';
import { QuestionOption, Section } from '../models';
import { StepperSelectionEvent } from '@angular/cdk/stepper';

@Component({
  selector: 'app-horizontal-stepper',
  templateUrl: './horizontal-stepper.component.html',
  styleUrls: ['./horizontal-stepper.component.css']
})
export class HorizontalStepperComponent implements OnInit {

  sections: Section[];
  sectionIndex: number = 0;
  numberOfSections: number = 0;

  allRecommendations: string[] = [];
  allRecommendationsStructured: QuestionOption[][] = [[]];


  constructor(private dataService: DataService) {
  }

  ngOnInit() {
    this.dataService.getJsonData().subscribe(data => {
      this.sections = data;
      this.numberOfSections = this.sections.length;

      this.dataService.prepareRecommendations(this.sections);

      let summarySection: Section = {label: "Summary", questions: []};
      this.sections.push(summarySection);
    });
  }

  onStepChange(event: StepperSelectionEvent) {

    if (event.selectedStep.label !== "Summary") {
      this.sectionIndex = event.selectedIndex;
    }
    
  }

  updateRecommendations_initial(recommendations: string[]) {
    this.allRecommendations = recommendations;
  }

  updateRecommendations(recommendations: QuestionOption[]) {

    if (this.allRecommendationsStructured[this.sectionIndex] === undefined) {
      this.allRecommendationsStructured[this.sectionIndex] = [];
    }
    let localRecommendations = this.allRecommendationsStructured[this.sectionIndex];

    for (let currentRecommendation of recommendations) {

      let questionAlreadyAnswered = false;
      for (let localRecommendation of localRecommendations) {
        if (localRecommendation.questionIndex === currentRecommendation.questionIndex) {
          localRecommendation.recommendationText = currentRecommendation.recommendationText;
          questionAlreadyAnswered = true;
          break;
        }
      }

      if (!questionAlreadyAnswered) {
        localRecommendations.push(currentRecommendation);
      } 
    }

    this.allRecommendations = this.flattenTheStructure(this.allRecommendationsStructured);

  }

  flattenTheStructure(allRecommendationsStructured: QuestionOption[][]): string[] {
    let entries: string[] = [];

    for (let allRecommendationsPerSection of allRecommendationsStructured) {

      if (allRecommendationsPerSection === undefined) {
        continue;
      }

      for (let recommendation of allRecommendationsPerSection) {
        entries.push(recommendation.recommendationText);
      }
    }

    return entries;
  }

}
