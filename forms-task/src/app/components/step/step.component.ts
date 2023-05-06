import { Component, OnInit } from '@angular/core';
import { Status, Step } from 'src/app/models/models';

@Component({
  selector: 'app-step',
  templateUrl: './step.component.html',
  styleUrls: ['./step.component.scss'],
})
export class StepComponent implements OnInit {
  steps: Step[] = [];
  currentStep = 2;

  ngOnInit(): void {
    this.initSteps();
  }

  initSteps() {
    this.steps = [
      {
        Id: 1,
        Header: 'Profile',
        Status: Status.Done,
      },
      {
        Id: 2,
        Header: 'Check something',
        Status: Status.Active,
      },
      {
        Id: 3,
        Header: 'Finish',
        Status: Status.Inactive,
      },
    ];
  }

  getClassName(status: Status) {
    let res = '';
    switch (status) {
      case Status.Active:
        res = 'active';
        break;
      case Status.Done:
        res = 'done';
        break;
      case Status.Inactive:
        res = 'inactive';
    }
    return res;
  }

  next() {
    let index = this.steps.findIndex((el) => el.Id == this.currentStep);
    this.steps[index].Status = Status.Done;
    if (index < this.steps.length - 1) {
      ++index;
      this.currentStep = this.steps[index].Id;
      this.steps[index].Status = Status.Active;
    }
  }
}
