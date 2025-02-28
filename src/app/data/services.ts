import { Event } from '../interfaces/event.interface';

export const services: Event[] = [
  {
    id: '1',
    name: 'Dr. Mohamed Ben Ali',
    date: '2024-07-19',
    location: 'Bizerte, Tunis',
    performers: ['Mohamed Ben Ali'],
    category_id: '3',
    image: 'assets/imgs/generalSurgery.jpeg',
    description: 'I am a highly experienced General Surgeon with over 5 years of practice. I graduated from FMT, followed by a comprehensive surgical residency where I specialized in a variety of surgical disciplines. My expertise spans from routine procedures to complex surgeries, focusing on patient-centered care and effective recovery.',
    speciality:' General Surgery',
    imageDoctor:'assets/imgs/med.jpeg'
  },
  {
    id: '4',
    name: 'Dr. Rania Kaddour',
    date: '2024-12-27',
    location: 'Tunis, Tunis',
    headliners: ['Rania Kaddour'],
    category_id: '1',
    image: 'assets/imgs/derma.jpeg',
    description: 'I am a board-certified Dermatologist with extensive training in diagnosing and treating a wide range of skin conditions. After completing my medical degree at FMS, I pursued a dermatology residency, where I gained hands-on experience in both medical and cosmetic dermatology. I specialize in treating conditions such as acne, eczema, skin cancer, and various other skin disorders, using the latest evidence-based treatments to ensure optimal outcomes for my patients.',
    speciality:'Dermatology',
    imageDoctor:'assets/imgs/rania.jpeg'
},
  {
    id: '2',
    name: 'Dr. Amir Ghribi',
    date: '2024-11-05',
    location: 'Beja, Tunis',
    headliners: ['Amira Ghribi'],
    category_id: '1',
    image: 'assets/imgs/pediatrian.jpeg',
    description: 'I am a dedicated Pediatrician with a passion for providing comprehensive medical care to children from infancy through adolescence. After earning my medical degree from FMM, I completed a pediatric residency, gaining specialized experience in the diagnosis and treatment of a wide range of childhood illnesses and conditions. I focus on preventive care, growth and development, and managing both acute and chronic conditions to ensure the health and well-being of my young patients.',
    speciality:'Pediatrian',
    imageDoctor:'assets/imgs/amir.jpeg'
  },
  {
    id: '3',
    name: 'Dr. Ali Zouari',
    date: '2024-10-10',
    location: 'Sfax, Tunis',
    headliners: ['Ali Zouari'],
    category_id: '2',
    image: 'assets/imgs/cardio.jpeg',
    description: 'I am a skilled Cardiologist with expertise in diagnosing and treating heart-related conditions. After completing my medical degree at FMT, I pursued a cardiology fellowship, specializing in areas such as heart disease, arrhythmias, and hypertension. I focus on delivering comprehensive care, including prevention, diagnosis, and management of cardiovascular diseases, using the latest medical advancements to ensure optimal heart health for my patients.',
    speciality:'Cardiologist',
    imageDoctor:'assets/imgs/arijit2.jpg'
  },
  {
    id: '5',
    name: 'Dr. Houssem Rachdi',
    date: '2024-09-15',
    location: 'Sousse, Tunis',
    headliners: ['Hela Rachdi'],
    category_id: '1',
    image: 'assets/imgs/neurologie.jpeg',
    description: 'I am a dedicated Neurologist specializing in the diagnosis and treatment of disorders of the nervous system, including conditions like epilepsy, stroke, and neurodegenerative diseases. I graduated from FMM and completed my neurology residency, where I gained extensive experience in both clinical and diagnostic neurology. My goal is to provide compassionate care while using advanced techniques to help manage and treat neurological conditions for my patients.',
    speciality:'Neurologist',
    imageDoctor:'assets/imgs/houssem.jpeg'
},
];