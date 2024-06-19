import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Section, RecommendationOption, QuestionOption } from '../models';
import { MatRadioChange } from '@angular/material/radio';
import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { DataService } from '../data.service';

@Component({
  selector: 'app-vertical-stepper',
  templateUrl: './vertical-stepper.component.html',
  styleUrls: ['./vertical-stepper.component.css']
})
export class VerticalStepperComponent implements OnInit {

  @Input() sectionIndex: number;
  @Input() sectionLabel: string;
  questionIndex: number = 0;
  numberOfQuestionsInSection: number = 0;

  recommendationText: string | undefined;
  
  questions:any;

  @Output() recommendationChange = new EventEmitter<QuestionOption[]>();


  recommendations: QuestionOption[] = [];


  constructor(private dataService: DataService) {
  }

  ngOnInit() {
    this.dataService.getJsonData().subscribe(data => {

      let sections: Section[] = data;

      
      let section: Section | undefined = undefined;
      for (let i = 0; i < sections.length; i++) {
        if (i === this.sectionIndex) {
          section = sections[i];
        }
      }

      if (section === undefined) {
      } else {

        this.questions = section.questions;
        this.numberOfQuestionsInSection = this.questions.length;
      }
    });
  }

  onSelectionChange(event: MatRadioChange, recommendations: RecommendationOption[]) {
    this.recommendationText = recommendations.find(x => x.key === event.value)?.value;
    if (this.recommendationText === undefined) {
      this.recommendationText = recommendations[0].value;
    }

    let questionOption: QuestionOption = {questionIndex: this.questionIndex, recommendationText: this.recommendationText};
    this.recommendations.push(questionOption);
    this.recommendationChange.emit(this.recommendations);

    this.dataService.setRecommendationBySectionAndQuestion(this.sectionIndex, this.questionIndex, this.recommendationText);
  }

  onStepChange(event: StepperSelectionEvent) {
    this.questionIndex = event.selectedIndex;

    this.recommendationText = this.dataService.getRecommendationBySectionAndQuestion(this.sectionIndex, event.selectedIndex);
  }

}
