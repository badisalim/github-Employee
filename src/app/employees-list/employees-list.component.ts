import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../shared/rest-api.service';
import { HttpEventType } from '@angular/common/http';
import { FileUploader } from 'ng2-file-upload';

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.css']
})
export class EmployeesListComponent implements OnInit {
  public uploader: FileUploader = new FileUploader({ url: 'http://localhost:3000/employees' });
  Employee: any = [];
  http: any;

  constructor(
    public restApi: RestApiService
  ) { }

  ngOnInit(): void {
    this.loadEmployees();
    throw new Error('Method not implemented.');
  }

  // Get employees list
  loadEmployees() {
    return this.restApi.getEmployees().subscribe((data: {}) => {
      this.Employee = data;
    });
  }

  // Delete employee
  deleteEmployee(id) {
    if (window.confirm('Are you sure, you want to delete?')) {
      this.restApi.deleteEmployee(id).subscribe(data => {
        this.loadEmployees();
      });
    }
  }
  onUpload() {
    const fd = new FormData();
    fd.append('image', this.selectedFile.name);
    this.http.post('http://localhost:3000/employees', fd, {
      reportProgress: true,
      observe: 'events'
    })

      .subscribe(event => {

        if (event.type === HttpEventType.UploadProgress) {
          console.log('UploadProgress:' + Math.round(event.loaded / event.total * 100) + '%');
        } else if (event.type === HttpEventType.Response) {
          console.log(event);
        }
      });
  }
  selectedFile(arg0: string, selectedFile: any, name: any) {
    throw new Error('Method not implemented.');
  }
}
