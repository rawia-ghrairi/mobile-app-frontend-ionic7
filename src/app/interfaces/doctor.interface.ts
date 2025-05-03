// doctor.interface.ts
export interface Doctor {
    _id: string; // Assuming the ID is a string (adjust as necessary)
    name: string; // Name of the doctor
    speciality: string; // Doctor's speciality (e.g., cardiologist, dentist, etc.)
    location: string; // Location (e.g., city, clinic address)
    phoneNumber: string;
    imageDoctor: string; // Image URL for the doctor's profile picture
    description:string;
    email:string;
    imageService:string;
  }
  