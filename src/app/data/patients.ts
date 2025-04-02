import { Patient } from "../interfaces/patient.interface";
export const patients: Patient[]=[
        { 
         _id:" 1",
         name: 'Jessika Lynch', 
         age: 20, address: 'Wuhan, China', 
         gender: 'Female', 
          photo: 'assets/imgs/3.png', 
          phone: '9999900010', 
          email: 'xyz1@xyz.com' ,
          date_rdv: "2024-05-05", //  (format YYYY-MM-DD)
          time_rdv:"10:10",
        isAccept:false
        },
        { 
        _id: "2", 
        name: 'Chris Manhattan', 
        age: 29, 
        address: 'Sydney, Australia', 
        gender: 'Male', 
        photo: 'assets/imgs/2.png', 
        phone: '9999900020', 
        email: 'xyz2@xyz.com' ,
        date_rdv: "2024-01-14", //  (format YYYY-MM-DD)
        time_rdv:"10:10",
        isAccept:false

    },
        { _id:" 3", 
         name: 'Sanya Iyer', 
         age: 45, 
         address: 'Bengaluru', 
         gender: 'Male',
         photo: 'assets/imgs/4.png',  
         phone: '9999900030', 
         email: 'xyz3@xyz.com' ,
         date_rdv: "2024-07-07", //  (format YYYY-MM-DD)
         time_rdv:"10:10",
         isAccept:false

        },
        { 
        _id:" 4", 
        name: 'Jinpin', 
        age: 40, 
        address: 'Wuhan, China', 
        gender: 'Male',
         photo: 'assets/imgs/1.png', 
          phone: '9999900040', 
          email: 'xyz4@xyz.com' ,
          date_rdv: "2024-06-04", //  (format YYYY-MM-DD)
          time_rdv:"10:10",
          isAccept:false

        },
        { _id: "5", 
        name: 'Mahavir Singh', 
        age: 35, 
        address: 'South Extension II, Delhi', 
        gender: 'Male', 
        photo: 'assets/imgs/2.png', 
         phone: '9999900050', 
         email: 'xyz5@xyz.com' ,
         date_rdv: "2024-02-28", //  (format YYYY-MM-DD)
         time_rdv:"10:10",
         isAccept:false

        },
        { 
          _id: "6", 
        name: 'Lanee T\'ang', 
        age: 20, 
        address: 'Beijing, China', 
        gender: 'Female', 
        photo: 'assets/imgs/3.png', 
        phone: '9999900060', 
        email: 'xyz6@xyz.com' ,
        date_rdv: "2024-02-14", //  (format YYYY-MM-DD)
        time_rdv:"10:10",
        isAccept:false

      }
      ];

