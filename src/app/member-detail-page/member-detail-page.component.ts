import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  IonAvatar,
  IonBackButton,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCol,
  IonContent,
  IonHeader,
  IonIcon,
  IonImg,
  IonInput, IonItem,
  IonItemDivider,
  IonLabel,
  IonList,
  IonModal, IonPopover,
  IonRow,
  IonTitle,
  IonToolbar,
  NavController,
  IonThumbnail
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  addCircle,
  ban,
  barbell,
  call,
  chatboxEllipses,
  logoWhatsapp,
  notifications,
  person, trashOutline,
  document as documentIcon,
  eye,
  eyeOff
} from 'ionicons/icons';
import { MemberPersonalDetailComponent } from '../member-personal-detail/member-personal-detail.component';

import { CommonModule, DOCUMENT } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { OverlayEventDetail } from '@ionic/core/components';
import { ActionButtonComponent } from 'src/app/widgets/action-button/action-button.component';
import { InfoCardComponent } from 'src/app/widgets/info-card/info-card.component';
import { ImageUploadComponent } from "../image-upload/image-upload.component";
import { DoctorService } from '../services/doctor.service';
import { FilesService } from '../services/files.services';
import { UploadFilesComponent } from "../upload-files/upload-files.component";
@Component({
  selector: 'app-member-detail-page',
  templateUrl: './member-detail-page.component.html',
  styleUrls: ['./member-detail-page.component.scss'],
  standalone: true,
  imports: [IonImg, IonAvatar, IonList, IonPopover, IonModal, IonItem, IonInput, 
    IonCardContent,
    IonLabel,
    IonCardHeader,
    IonItemDivider,
    IonCol,
    IonRow,
    IonCard,
    IonBackButton,
    IonButtons,
    IonIcon,
    IonButton,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    MemberPersonalDetailComponent,
    InfoCardComponent,
    IonThumbnail,
    ActionButtonComponent,
    ImageUploadComponent,
    UploadFilesComponent,
    ReactiveFormsModule,
    CommonModule,
],
})
export class MemberDetailPageComponent  implements OnInit {
  @ViewChild(IonModal) modal!: IonModal;
  @ViewChild('modal') addFileModal!: IonModal;
  @ViewChild('popover') popover!: HTMLIonPopoverElement;
  message = 'This modal example uses triggers to automatically open a modal when the button is clicked.';
  name!: string;
  isOpen = false;
  languages:String="Arabe/French"
  urgence:String="Yes"
  consultationPrice:String="80 $"
  paymentMethods:String="Cash"
  member:any;
  fileForm: FormGroup;
  files: any[] = [];
  constructor(private fb: FormBuilder,private route:ActivatedRoute,private navCtrl:NavController,private filesService:FilesService,private doctorService:DoctorService, @Inject(DOCUMENT) private document: Document) {
    addIcons({notifications,addCircle,trashOutline,call,logoWhatsapp,chatboxEllipses,person,barbell,ban,document: documentIcon, eye, eyeOff});
    this.fileForm = this.fb.group({
      filname: ['', Validators.required],
      DiagnosticFile: [null, Validators.required],
      doctor_id: ['']
    });
  }
  onFileChange(event: any) {
      const file = event.target.files[0];
      if (file) {
        this.fileForm.patchValue({
          DiagnosticFile: file
        });
      }
    }
  
  ngOnInit() {
    const _id = this.route.snapshot.paramMap.get('ids');
    this.fileForm.patchValue({ doctor_id: _id});
    console.log('Doctor ID:', _id);
    
    // Initialize files array and load files
    this.files = [];
    this.loadFile();
    
    if (_id) {
      this.doctorService.getDoctorById(_id).subscribe(
        (data) => {
          if (data) {
            this.member = data;
            console.log(this.member);
            console.log('Doctor data:', this.member);
          } else {
            console.error('Doctor not found with id:', _id);
          }
        },
        (error) => {
          console.error('Error fetching doctor data:', error);
        }
      );
    }
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }
  onWillDismiss(event: CustomEvent<OverlayEventDetail>) {
    if (event.detail.role === 'confirm') {
      this.message = `Hello, ${event.detail.data}!`;
    }
  }
  submitForm() {
    if (this.fileForm.valid) {
      const formData = new FormData();
      formData.append('filname', this.fileForm.get('filname')?.value);
      formData.append('doctor_id', this.fileForm.get('doctor_id')?.value);
      formData.append('file', this.fileForm.get('DiagnosticFile')?.value);
  
      console.log('Submitting file:', this.fileForm.value);
      
      // Log form data keys
      console.log('FormData keys:');
      for (const key of ['filname', 'doctor_id', 'file']) {
        console.log(`${key} included: ${formData.has(key)}`);
      }
      
      this.filesService.addFiles(formData).subscribe(
        (response: any) => {
          console.log('File added successfully, server response:', response);
          this.addFileModal.dismiss();
          this.fileForm.reset();
          // Add a small delay before reloading files to ensure server has processed the upload
          setTimeout(() => {
            this.loadFile();
          }, 1000); // Increased delay to 1 second to ensure server processing
        },
        (error) => {
          console.error('Error adding file', error);
        }
      );
    }
  }

  loadFile() {
    console.log('Loading files...');
    this.filesService.getFileByPatient().subscribe(
      (data: any) => {
        console.log('Raw files data received:', data);
        if (data) {
          // Check if data is an array or if it's wrapped in a property
          if (Array.isArray(data)) {
            this.files = data;
          } else if (data.data && Array.isArray(data.data)) {
            // If data is wrapped in a 'data' property (common API pattern)
            this.files = data.data;
          } else if (typeof data === 'object') {
            // Try to convert object to array if needed
            this.files = Object.values(data);
          } else {
            this.files = [];
          }
          console.log('Processed files data:', this.files);
        } else {
          console.error('File not found:');
          this.files = [];
        }
      },
      (error) => {
        console.error('Error fetching file data:', error);
        this.files = [];
      }
    );
  }
  
  isPdfFile(file: any): boolean {
    return file.file_type === 'pdf' || file.DiagnosticFile?.toLowerCase().endsWith('.pdf');
  }
  startUpload(file: any) {
    const link = this.document.createElement('a');
    link.href = file.DiagnosticFile;
    link.download = file.filname || 'diagnostic_file';
    link.target = '_blank';
    this.document.body.appendChild(link);
    link.click();
    this.document.body.removeChild(link);
  }
  deleteImage(file: any) {
    // Use file.id instead of file._id to match backend response
    const fileId = file.id || file._id;
    
    this.filesService.deleteFileById(fileId).subscribe(
      (res: any) => {
        console.log('File deleted:', res);
        this.loadFile();
      },
      (err) => {
        console.error('Error deleting file:', err);
      }
    );
  }
}
