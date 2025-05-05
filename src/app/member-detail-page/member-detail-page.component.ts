import { Component, OnInit, ViewChild } from '@angular/core';
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
  person, trashOutline
} from 'ionicons/icons';
import { MemberPersonalDetailComponent } from '../member-personal-detail/member-personal-detail.component';

import { CommonModule } from '@angular/common';
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
  files:any
  constructor(private fb: FormBuilder,private route:ActivatedRoute,private navCtrl:NavController,private filesService:FilesService,private doctorService:DoctorService) {
    addIcons({notifications,addCircle,trashOutline,call,logoWhatsapp,chatboxEllipses,person,barbell,ban,});
    this.fileForm = this.fb.group({
      filname: ['', Validators.required],
      DiagnosticFile: [null, Validators.required],
      doctor_id: ['']
    });
  }
  onImageChange(event: any) {
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
    this.loadFile() ;
    if (_id) {
      this.doctorService.getDoctorById(_id).subscribe(
        (data) => {
          if (data) {
            this.member = data;  // Set doctor if found
            console.log(this.member);
            console.log('Doctor data:', this.member);  // Log for debugging
          } else {
            console.error('Doctor not found with id:', _id);  // Handle case where doctor is not found
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
      formData.append('image', this.fileForm.get('DiagnosticFile')?.value);
  
      this.filesService.addFiles(formData).subscribe(
        (response) => {
          console.log('File added successfully', response);
          this.isOpen = false; // Fermer le popover
          // Réinitialiser le formulaire si nécessaire
          this.fileForm.reset();
          this.loadFile() ;       },
        (error) => {
          console.error('Error adding file', error);
        }
      );
    }
  
  }


  loadFile(){
    this.filesService.getFileByPatient().subscribe(
      (data) => {
        if (data) {
          this.files = data;  // Set doctor if found
          console.log(this.files);
          console.log('Doctor data:',this.files);  // Log for debugging
        } else {
          console.error('File not found :');  // Handle case where doctor is not found
        }
      },
      (error) => {
        console.error('Error fetching file data:', error);
      }
    );
  }
  startUpload(file: any) {
    const link = document.createElement('a');
    link.href = file.DiagnosticFile;
    link.download = file.filname || 'diagnostic_file'; // nom du fichier
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  
  deleteImage(file: any) {
   
      this.filesService.deleteFileById(file._id).subscribe(
        (res: any) => {
          console.log('File deleted:', res);
          this.loadFile(); // Recharge la liste des fichiers
        },
        (err) => {
          console.error('Error deleting file:', err);
        }
      );
    
  }
  
}
