import { Component, OnInit } from '@angular/core';
import { Student } from '../typings';

@Component({
  selector: 'app-display-list',
  templateUrl: './display-list.component.html',
  styleUrls: ['./display-list.component.css'],
})
export class DisplayListComponent implements OnInit {
  students: Student[];

  constructor() {
    this.students = [];
  }

  ngOnInit(): void {
    const records = localStorage.getItem('list');
    if (records) {
      this.students = JSON.parse(records);
    }
  }

  deleteStudent(rollNo: string): void {
    const index = this.students.findIndex((p) => p.rollNo === rollNo);
    if (index !== -1) {
      this.students.splice(index, 1);
      localStorage.setItem('list', JSON.stringify(this.students));
    }
  }

  showValue() {
    let marks = this.students.reduce((acc, cur) => (acc += cur.totalMarks!), 0);

    let avgMarks = marks / this.students.length;

    return 'Average Marks : ' + (marks != 0 ? avgMarks : 0);
  }
}
