import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../services/student.service';
import { Student } from '../../models/student.model';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
  students: Student[] = [];
  selectedStudent: Student = { id: 0, name: '', age: 0, email: '' };
  editingStudentId: number | null = null;
  isAddMode = false;

  constructor(private studentService: StudentService) {}

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents() {
    this.studentService.getAllStudents().subscribe(data => {
      this.students = data;
    });
  }

  // Guardar o actualizar un estudiante
  saveStudent(student?: Student) {
    if (this.isAddMode) {
      this.studentService.addStudent(this.selectedStudent).subscribe(() => {
        this.loadStudents();
        this.resetForm();
      });
    } else if (student) {
      this.studentService.updateStudent(student.id, student).subscribe(() => {
        this.loadStudents();
        this.cancelEditMode();
      });
    }
  }

  // Activar el modo de edición para un estudiante
  enableEditMode(student: Student) {
    this.editingStudentId = student.id;
  }

  // Determinar si un estudiante está en modo de edición
  isEditMode(student: Student): boolean {
    return this.editingStudentId === student.id;
  }

  // Cancelar el modo de edición
  cancelEditMode() {
    this.editingStudentId = null;
  }

  // Eliminar un estudiante
  deleteStudent(id: number) {
    this.studentService.deleteStudent(id).subscribe(() => {
      this.loadStudents();
    });
  }

  // Agregar un nuevo estudiante
  addNewStudent() {
    this.selectedStudent = { id: 0, name: '', age: 0, email: '' };
    this.isAddMode = true;
  }

  // Cancelar el agregar/editar
  cancel() {
    this.resetForm();
  }

  // Resetear el formulario y cancelar modos
  resetForm() {
    this.selectedStudent = { id: 0, name: '', age: 0, email: '' };
    this.isAddMode = false;
    this.cancelEditMode();
  }
}





