import { ErrorStateMatcher, ShowOnDirtyErrorStateMatcher } from '@angular/material/core';
import { StudentService } from './../../services/student.service';
import { ChangeDetectorRef, Component, ViewChild, NgModule } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import Student from '../shared/student.model';
import { NgForm, FormControl, Validators, FormGroupDirective } from '@angular/forms';
@NgModule({
  providers: [
    {provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher}
  ]
})

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-student-list-component',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent {

  studentFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(3)
  ]);

  matcher = new MyErrorStateMatcher();

  student: Student;

  displayedColumns: string[] = ['id', 'name'];
  dataSource = new MatTableDataSource<Student>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private studentService: StudentService, private changeDetectorRefs: ChangeDetectorRef){
    this.student = new Student();
    this.studentService.getStudents().subscribe(res => {
      this.dataSource = new MatTableDataSource<Student>(res);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  cadastrar(): void{
    console.log(JSON.stringify(this.student));
  }

}
