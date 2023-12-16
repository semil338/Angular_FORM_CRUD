import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Student } from '../typings';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reg-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './reg-form.component.html',
  styleUrls: ['./reg-form.component.css'],
})
export class RegFormComponent implements OnInit {
  students: Student[] = [];

  student: Student = { rollNo: '', name: '', phone: '', totalMarks: null };
  rollNoError: string = '';
  nameError: string = '';
  phoneError: string = '';
  totalMarksError: string = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    const records = localStorage.getItem('list');
    if (records) {
      this.students = JSON.parse(records);
    }
  }

  onSubmit(studentForm: NgForm): void {
    this.rollNoError = this.validateRollNo(this.student.rollNo);
    this.nameError = this.validateName(this.student.name);
    this.phoneError = this.validatePhone(this.student.phone);
    this.totalMarksError = this.validateTotalMarks(this.student.totalMarks!);

    if (
      !this.rollNoError &&
      !this.nameError &&
      !this.phoneError &&
      !this.totalMarksError
    ) {
      this.students.push(this.student);
      localStorage.setItem('list', JSON.stringify(this.students));
      this.student = { rollNo: '', name: '', phone: '', totalMarks: null };
      studentForm.resetForm();
      this.router.navigate(['/display']);
    }
  }

  validateRollNo(rollNo: string): string {
    if (!rollNo) {
      return 'Roll No is required.';
    }
    if (this.students.some((s) => s.rollNo == rollNo)) {
      return 'Roll No must be unique.';
    }
    return '';
  }

  validateName(name: string): string {
    if (!name) {
      return 'Name is required.';
    }
    if (!/^[a-zA-Z]/.test(name)) {
      return 'Name should start with a character.';
    }
    return '';
  }

  validatePhone(phone: string): string {
    if (!phone) {
      return 'Phone number is required.';
    }
    if (!/^\d{10}$/.test(phone)) {
      return 'Phone number should be exactly 10 digits.';
    }
    return '';
  }

  validateTotalMarks(totalMarks: number): string {
    if (
      totalMarks === null ||
      totalMarks === undefined ||
      isNaN(totalMarks) ||
      totalMarks > 500
    ) {
      return 'Total Marks should not be greater than 500.';
    }
    return '';
  }
}
