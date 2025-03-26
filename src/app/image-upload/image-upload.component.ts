import { Component, OnInit } from '@angular/core';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { HttpClient } from '@angular/common/http';
import { LoadingController, Platform, ToastController } from '@ionic/angular';
import { IonicModule } from "@ionic/angular";
import { IonIcon } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { finalize } from 'rxjs/operators';

const IMAGE_DIR = 'stored-images';

interface LocalFile {
  name: string;
  path: string;
  data: string;
}

interface UploadResponse {
	success: boolean;
  }

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class ImageUploadComponent implements OnInit {

  images: LocalFile[] = [];

  constructor(
    private plt: Platform,
    private http: HttpClient,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController
  ) {}

  async ngOnInit() {
    this.loadFiles();
  }

  async loadFiles() {
    this.images = [];

    const loading = await this.loadingCtrl.create({
      message: 'Loading data...'
    });
    await loading.present();

    try {
      const result = await Filesystem.readdir({
        path: IMAGE_DIR,
        directory: Directory.Data
      });
      this.loadFileData(result.files.map((x) => x.name));
    } catch (err) {
      // Folder does not exist! Create it.
      await Filesystem.mkdir({
        path: IMAGE_DIR,
        directory: Directory.Data
      });
    } finally {
      loading.dismiss();
    }
  }

  // Get the actual base64 data of an image based on the name of the file
  async loadFileData(fileNames: string[]) {
    for (let f of fileNames) {
      const filePath = `${IMAGE_DIR}/${f}`;

      const readFile = await Filesystem.readFile({
        path: filePath,
        directory: Directory.Data
      });

      this.images.push({
        name: f,
        path: filePath,
        data: `data:image/jpeg;base64,${readFile.data}`
      });
    }
  }

  // Little helper to show toast messages
  async presentToast(text: string) {
    const toast = await this.toastCtrl.create({
      message: text,
      duration: 3000
    });
    toast.present();
  }

  async selectImage() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri,
      source: CameraSource.Photos // Camera, Photos or Prompt!
    });

    if (image) {
      this.saveImage(image);
    }
  }

  // Create a new file from a captured image
  async saveImage(photo: Photo) {
    console.log('Selected photo:', photo);
    const base64Data = await this.readAsBase64(photo);

    const fileName = new Date().getTime() + '.jpeg';
    const savedFile = await Filesystem.writeFile({
      path: `${IMAGE_DIR}/${fileName}`,
      data: base64Data,
      directory: Directory.Data
    });
  }

  // Helper function to read image as base64
private async readAsBase64(photo: Photo) {
  if (!photo.webPath) {
    throw new Error('Photo webPath is undefined');
  }

  // For hybrid environments, use the `webPath` Blob URL
  if (this.plt.is('hybrid')) {
    const response = await fetch(photo.webPath);
    const blob = await response.blob();
    return await this.convertBlobToBase64(blob) as string;
  } else {
    // For web, just handle the Blob URL
    const response = await fetch(photo.webPath);
    const blob = await response.blob();
    return await this.convertBlobToBase64(blob) as string;
  }
}


  // Helper function to convert blob to base64
  private convertBlobToBase64(blob: Blob) {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload = () => resolve(reader.result as string);
      reader.readAsDataURL(blob);
    });
  }

  // Convert the base64 to blob data and create formData with it
  async startUpload(file: LocalFile) {
    const response = await fetch(file.data);
    const blob = await response.blob();
    const formData = new FormData();
    formData.append('file', blob, file.name);
    this.uploadData(formData);
  }

  // Upload the formData to the API
  async uploadData(formData: FormData) {
    const loading = await this.loadingCtrl.create({
      message: 'Uploading image...',
    });
    await loading.present();

    const url = 'http://127.0.0.1:5000/upload'; // Use your own API URL

    this.http.post<UploadResponse>(url, formData)
      .pipe(finalize(() => loading.dismiss()))
      .subscribe(res => {
        if (res['success']) {
          this.presentToast('File upload complete.');
        } else {
          this.presentToast('File upload failed.');
        }
      });
  }

  // Delete image from filesystem
  async deleteImage(file: LocalFile) {
    await Filesystem.deleteFile({
      directory: Directory.Data,
      path: file.path
    });
    this.loadFiles();
    this.presentToast('File removed.');
  }
}
