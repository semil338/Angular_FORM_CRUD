import { Component, OnInit } from '@angular/core';
import { Student } from '../typings';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css'],
})
export class UpdateComponent implements OnInit {
  students: Student[] = [];

  student: Student = { rollNo: '', name: '', phone: '', totalMarks: null };
  rollNoError: string = '';
  nameError: string = '';
  phoneError: string = '';
  totalMarksError: string = '';

  id: string;

  constructor(private route: ActivatedRoute, private router: Router) {
    this.id = this.route.snapshot.paramMap.get('id')!;
  }

  ngOnInit(): void {
    const records = localStorage.getItem('list');
    if (records) {
      this.students = JSON.parse(records);
    }
    const student = this.students.find((s) => s.rollNo == this.id);
    if (student) {
      this.student.rollNo = student.rollNo;
      this.student.name = student.name;
      this.student.phone = student.phone;
      this.student.totalMarks = student.totalMarks;
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
      const index = this.students.findIndex((s) => s.rollNo == this.id);
      const newStudents = [
        ...this.students.slice(0, index),
        this.student,
        ...this.students.slice(index + 1, this.students.length),
      ];
      localStorage.setItem('list', JSON.stringify(newStudents));
      this.student = { rollNo: '', name: '', phone: '', totalMarks: null };
      studentForm.resetForm();
      this.router.navigate(['/display']);
    }
  }

  validateRollNo(rollNo: string): string {
    if (!rollNo) {
      return 'Roll No is required.';
    }
    if (this.students.some((s) => s.rollNo == rollNo && s.rollNo != this.id)) {
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
