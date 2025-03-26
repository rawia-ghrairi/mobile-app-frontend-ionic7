import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-upload-files',
  templateUrl: './upload-files.component.html',
  styleUrls: ['./upload-files.component.scss'],
  standalone: true,
  imports: [IonicModule,CommonModule],
})
export class UploadFilesComponent  implements OnInit {

  images: string[] = [];
  flaskApiUrl = 'http://127.0.0.1:5000/uploads'; // Change this if hosted

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchImages();
  }

  fetchImages() {
    this.http.get<{ images: string[] }>(`${this.flaskApiUrl}/list`).subscribe(
      (data) => {
        console.log("Raw API Response:", data); // Log full response
  
        // Extract the images array from the response object
        this.images = data.images || [];
  
        // Prepend the Flask API URL to each image filename
        this.images = this.images.map((image) => `${this.flaskApiUrl}/${image}`);
  
        console.log("Images with full URL:", this.images); // Log the updated image URLs
      },
      (error) => {
        console.error('Error fetching images:', error);
      }
    );
  }
  
  

}
