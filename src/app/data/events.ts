import { Event } from '../interfaces/event.interface';

export const events: Event[] = [
  {
    id: '1',
    name: 'Dr. Yassine Trabelsi',//
    date: '2024-07-19',
    location: 'Soussa, tunisia',//
    performers: ['John Mulaney', 'Ali Wong', 'Hassan Minhaj'],
    category_id: '3',
    image: 'assets/imgs/gala3.jpg',//
    description: 'I am a dedicated cardiologist focused on diagnosing, treating, and preventing heart-related conditions. With a patient-centered approach, I strive to provide comprehensive care for cardiovascular health, helping individuals lead a healthy life through prevention, management, and advanced treatment options. Your heart health is my priority.',//
    speciality:'Cardiologist',//
    imageDoctor:'',
  },
  {
    id: '4',
    name: 'Dr. Leila Miled ',
    date: '2024-12-27',
    location: 'Bizerte, Tunisia',
    headliners: ['Martin Garrix', 'DJ Snake', 'The Chainsmokers'],
    category_id: '1',
    image: 'assets/imgs/gala2.jpg',
    description: 'I am an experienced orthopedic surgeon dedicated to helping patients regain mobility and live pain-free lives. With a passion for musculoskeletal health, I specialize in diagnosing and treating bone, joint, and ligament conditions through both surgical and non-surgical approaches.',
    speciality:'Orthopedic Surgeon',
    imageDoctor:'',
  },
  {
    id: '2',
    name: 'Dr. Sami Boussetta ',
    date: '2024-11-05',
    location: 'Tunis, Tunisia',
    headliners: ['A.R. Rahman'],
    category_id: '1',
    image: 'assets/imgs/rahman2.jpg',
    description: 'I am a passionate dermatologist dedicated to helping patients achieve healthy skin. I specialize in diagnosing and treating a wide range of skin, hair, and nail conditions while also providing personalized skincare solutions. My goal is to enhance confidence and well-being through expert dermatological care.',
    speciality:'Dermatologist',
    imageDoctor:'',
  },
  {
    id: '3',
    name: 'Dr. Emna Jaziri ',
    date: '2024-10-10',
    location: 'Nabeul, Tuinisia',
    headliners: ['Shahrukh Khan'],
    category_id: '2',
    image: 'assets/imgs/srk2.jpg',
    description: 'I am a dedicated pediatrician passionate about caring for children health and well-being. From newborns to adolescents, I provide compassionate medical care, focusing on prevention, diagnosis, and treatment of childhood illnesses. My goal is to ensure every child grows up healthy, happy, and thriving.',
    speciality:'Pediatrician',
    imageDoctor:'',
  },
  {
    id: '5',
    name: 'Dr. Mohamed Ben Salah',
    date: '2024-09-15',
    location: 'Jandouba, Tunisia',
    headliners: ['Arijit Singh'],
    category_id: '1',
    image: 'assets/imgs/arijit2.jpg',
    description: 'I am a dedicated radiologist specializing in medical imaging and diagnostics. With expertise in X-rays, MRIs, and CT scans, I provide accurate interpretations to support effective patient care.',
    speciality:'Radiologist',
    imageDoctor:'',
  },
];
