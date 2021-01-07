import { StudentService } from './../../services/student.service';
import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import Student from '../shared/student.model';

@Component({
  selector: 'app-aluno-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})

export class ListComponent {

  displayedColumns: string[] = ['id', 'name'];
  dataSource = new MatTableDataSource<Student>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private studentService: StudentService, private changeDetectorRefs: ChangeDetectorRef){
    this.studentService.getStudents().subscribe(res => {
      this.dataSource = new MatTableDataSource<Student>(res);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

}
