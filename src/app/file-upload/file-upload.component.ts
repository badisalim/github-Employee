import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { RestApiService } from '../shared/rest-api.service';
//import { FileUploader } from 'ng2-file-upload/file-upload/file-uploader.class';
import { HttpClient, HttpEventType } from '@angular/common/http';
@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {
  title = 'angular-file-upload';
  public uploader: FileUploader = new FileUploader({ url: 'http://localhost:3000/employees' });
  Employee: any = [];
  constructor(public restApi: RestApiService, private http: HttpClient) { }

  selectedFile: File = null;
  onFileSelected(event) {
    this.selectedFile = <File>event.target.files[0];
  }
  ngOnInit(): void {
    this.loadEmployees();
    throw new Error('Method not implemented.');
  }
  loadEmployees() {
    return this.restApi.getEmployees().subscribe((data: {}) => {
      this.Employee = data;
    });
  }

  onUpload() {
    const fd = new FormData();
    fd.append('image', this.selectedFile, this.selectedFile.name);
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
}
