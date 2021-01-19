import { ErrorStateMatcher, ShowOnDirtyErrorStateMatcher } from '@angular/material/core';
import { StudentService } from '@services/student.service';
import { ChangeDetectorRef, Component, ViewChild, NgModule } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import Student from '@models/student.model';
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
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss'],
})
export class StudentComponent {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns: string[] = ['id', 'name'];
  dataSource: MatTableDataSource<Student> = new MatTableDataSource<Student>();

  studentFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(3)
  ]);

  matcher = new MyErrorStateMatcher();

  interval: any;

  constructor(private studentService: StudentService, private changeDetectorRefs: ChangeDetectorRef){
    this.studentService.getStudents().subscribe(res => {
      this.dataSource = new MatTableDataSource<Student>(res);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  register(): void{
    const name: string = this.studentFormControl.value;
    this.studentService.registerStudent(new Student(name)).subscribe( res => {
      const data = this.dataSource.data;
      data.push(res);
      this.dataSource.data = data;
      alert('Aluno ' + name + ' cadastrado com sucesso!');
    });
  }

}
