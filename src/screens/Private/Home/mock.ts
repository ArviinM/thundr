// Define interface for customer details
interface CustomerDetails {
  bio: string;
  work: string;
  location: string;
  height: string;
  starSign: string;
  education: string;
  drinking: string;
  smoking: string;
  religion: string;
  pet: string;
  politics: string;
  personalityType: string;
  hobbies: string;
}

// Define interface for customer photo
interface CustomerPhoto {
  id: number;
  primary: boolean;
  photoUrl: string;
  index: number | null;
}

// Define interface for customer data
interface CustomerData {
  sub: string;
  name: string;
  gender: string;
  birthday: string;
  hometown: string;
  deactivateDate: string | null;
  customerDetails: CustomerDetails;
  withCustomerDetails: boolean;
  withCustomerCompatibilities: boolean;
  customerPhoto: CustomerPhoto[];
  withCustomerPhoto: boolean;
  activated: boolean;
}

// Define interface for mock data item
export interface MockDataItem {
  sub: string;
  percent: string;
  customerData: CustomerData;
}

export const MockData: MockDataItem[] = [
  {
    sub: 'cd9001a6-5f4f-47f9-bf6b-887ff8d727db',
    percent: '30%',
    customerData: {
      sub: 'cd9001a6-5f4f-47f9-bf6b-887ff8d727db',
      name: 'Michelina Makeswell',
      gender: 'Transgender Man',
      birthday: '1966-10-03',
      hometown: 'Salamanca',
      deactivateDate: null,
      customerDetails: {
        bio: 'mi sit amet lobortis sapien sapien non mi integer ac neque duis bibendum morbi non quam nec dui luctus rutrum nulla tellus in sagittis dui vel',
        work: 'Automation Specialist IV',
        location: 'Salamanca',
        height: '7ft 7in',
        starSign: 'Taurus',
        education: 'Highschool',
        drinking: 'Regular',
        smoking: 'Never',
        religion: 'Muslim',
        pet: 'Bird',
        politics: 'Apolitical',
        personalityType: 'Beaver',
        hobbies: '',
      },
      withCustomerDetails: true,
      withCustomerCompatibilities: true,
      customerPhoto: [
        {
          id: 1888,
          primary: true,
          photoUrl:
            'https://plus.unsplash.com/premium_photo-1672239496290-5061cfee7ebb?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          index: null,
        },
      ],
      withCustomerPhoto: true,
      activated: true,
    },
  },
  {
    sub: '0ce0843b-0e7d-42f4-9ee4-36c52fec4b25',
    percent: '40%',
    customerData: {
      sub: '0ce0843b-0e7d-42f4-9ee4-36c52fec4b25',
      name: 'Lindie Stearn',
      gender: 'Gender Variant',
      birthday: '1967-02-11',
      hometown: 'Biga',
      deactivateDate: null,
      customerDetails: {
        bio: 'diam cras pellentesque volutpat dui maecenas tristique est et tempus semper est quam pharetra magna ac consequat metus sapien ut',
        work: 'Web Developer IV',
        location: 'Biga',
        height: '6ft 1in',
        starSign: 'Leo',
        education: 'Highschool',
        drinking: 'Occasional',
        smoking: 'Occasional',
        religion: 'Catholic',
        pet: 'Dog',
        politics: 'Conservative',
        personalityType: 'Beaver',
        hobbies: '',
      },
      withCustomerDetails: true,
      withCustomerCompatibilities: true,
      customerPhoto: [
        {
          id: 1296,
          primary: true,
          photoUrl:
            'https://images.unsplash.com/photo-1584043720379-b56cd9199c94?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          index: null,
        },
      ],
      withCustomerPhoto: true,
      activated: true,
    },
  },
  {
    sub: '5f39b22d-c9b7-4577-b8a7-870eb43ce4b7',
    percent: '40%',
    customerData: {
      sub: '5f39b22d-c9b7-4577-b8a7-870eb43ce4b7',
      name: 'Ree Cattrall',
      gender: 'Gender Fluid',
      birthday: '1962-09-24',
      hometown: 'Luklukan',
      deactivateDate: null,
      customerDetails: {
        bio: 'in lacus curabitur at ipsum ac tellus semper interdum mauris ullamcorper purus sit amet nulla quisque arcu',
        work: 'Sales Representative',
        location: 'Luklukan',
        height: '4ft 6in',
        starSign: 'Pisces',
        education: 'Doctorate',
        drinking: 'Never',
        smoking: 'Regular',
        religion: 'Christian',
        pet: 'Dog',
        politics: 'Conservative',
        personalityType: 'Lion',
        hobbies: '',
      },
      withCustomerDetails: true,
      withCustomerCompatibilities: true,
      customerPhoto: [
        {
          id: 1679,
          primary: true,
          photoUrl:
            'https://images.unsplash.com/photo-1570824629069-2de4bcd4345a?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          index: null,
        },
      ],
      withCustomerPhoto: true,
      activated: true,
    },
  },
  {
    sub: '364ffbd2-4e3d-4e7a-b07d-8124b40e741c',
    percent: '50%',
    customerData: {
      sub: '364ffbd2-4e3d-4e7a-b07d-8124b40e741c',
      name: 'Carita Powis',
      gender: 'Female to Male',
      birthday: '1962-02-22',
      hometown: 'San Juan',
      deactivateDate: null,
      customerDetails: {
        bio: 'morbi non quam nec dui luctus rutrum nulla tellus in sagittis dui vel nisl duis ac nibh fusce lacus purus aliquet at',
        work: 'Health Coach III',
        location: 'San Juan',
        height: '7ft 8in',
        starSign: 'Cancer',
        education: 'Doctorate',
        drinking: 'Never',
        smoking: 'Regular',
        religion: 'Muslim',
        pet: 'Dog',
        politics: 'Liberal',
        personalityType: 'Dog',
        hobbies: '',
      },
      withCustomerDetails: true,
      withCustomerCompatibilities: true,
      customerPhoto: [
        {
          id: 2069,
          primary: true,
          photoUrl:
            'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          index: null,
        },
      ],
      withCustomerPhoto: true,
      activated: true,
    },
  },
  {
    sub: '0f54a00b-1941-452a-beb1-9f5dbb033ed4',
    percent: '50%',
    customerData: {
      sub: '0f54a00b-1941-452a-beb1-9f5dbb033ed4',
      name: 'Emelda Daughtry',
      gender: 'FTM',
      birthday: '1971-05-10',
      hometown: 'Payao',
      deactivateDate: null,
      customerDetails: {
        bio: 'nibh quisque id justo sit amet sapien dignissim vestibulum vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere',
        work: 'Food Chemist',
        location: 'Payao',
        height: '4ft 8in',
        starSign: 'Taurus',
        education: 'Doctorate',
        drinking: 'Never',
        smoking: 'Regular',
        religion: 'Catholic',
        pet: 'Fish',
        politics: 'Conservative',
        personalityType: 'Dog',
        hobbies: '',
      },
      withCustomerDetails: true,
      withCustomerCompatibilities: true,
      customerPhoto: [
        {
          id: 1794,
          primary: true,
          photoUrl:
            'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          index: null,
        },
      ],
      withCustomerPhoto: true,
      activated: true,
    },
  },
  {
    sub: 'd32680d6-3fe0-4ca4-8b63-44a9d0e6d331',
    percent: '60%',
    customerData: {
      sub: 'd32680d6-3fe0-4ca4-8b63-44a9d0e6d331',
      name: 'Kevina Sare',
      gender: 'Gender Fluid',
      birthday: '1969-03-01',
      hometown: 'Loay',
      deactivateDate: null,
      customerDetails: {
        bio: 'dis parturient montes nascetur ridiculus mus vivamus vestibulum sagittis sapien cum sociis natoque',
        work: 'Research Associate',
        location: 'Loay',
        height: '4ft 5in',
        starSign: 'Aquarius',
        education: 'Bachelor',
        drinking: 'Occasional',
        smoking: 'Never',
        religion: 'Buddhist',
        pet: 'Fish',
        politics: 'Moderate',
        personalityType: 'Otter',
        hobbies: '',
      },
      withCustomerDetails: true,
      withCustomerCompatibilities: true,
      customerPhoto: [
        {
          id: 1493,
          primary: true,
          photoUrl:
            'https://images.unsplash.com/photo-1607529378676-a20456ee2f6b?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          index: null,
        },
      ],
      withCustomerPhoto: true,
      activated: true,
    },
  },
  {
    sub: '44281f97-230e-452b-b1f7-0d6e0a4608df',
    percent: '50%',
    customerData: {
      sub: '44281f97-230e-452b-b1f7-0d6e0a4608df',
      name: 'Jessy Klima',
      gender: 'Transgender Male',
      birthday: '1955-04-15',
      hometown: 'Baroy',
      deactivateDate: null,
      customerDetails: {
        bio: 'faucibus accumsan odio curabitur convallis duis consequat dui nec nisi volutpat eleifend donec ut dolor morbi vel lectus in quam fringilla rhoncus',
        work: 'Assistant Media Planner',
        location: 'Baroy',
        height: '6ft 0in',
        starSign: 'Aries',
        education: 'Masters',
        drinking: 'Never',
        smoking: 'Occasional',
        religion: 'Buddhist',
        pet: 'Fish',
        politics: 'Liberal',
        personalityType: 'Otter',
        hobbies: '',
      },
      withCustomerDetails: true,
      withCustomerCompatibilities: true,
      customerPhoto: [
        {
          id: 1188,
          primary: true,
          photoUrl:
            'https://images.unsplash.com/photo-1604276168984-def2763af8e9?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          index: null,
        },
      ],
      withCustomerPhoto: true,
      activated: true,
    },
  },
  {
    sub: '09dc9abe-dd0d-4dd0-ba0e-e29c81d431bf',
    percent: '70%',
    customerData: {
      sub: '09dc9abe-dd0d-4dd0-ba0e-e29c81d431bf',
      name: 'Sheena Von Der Empten',
      gender: 'Transmasculine',
      birthday: '1972-10-16',
      hometown: 'Calubcub Dos',
      deactivateDate: null,
      customerDetails: {
        bio: 'habitasse platea dictumst morbi vestibulum velit id pretium iaculis diam erat fermentum justo nec',
        work: 'GIS Technical Architect',
        location: 'Calubcub Dos',
        height: '5ft 5in',
        starSign: 'Aries',
        education: 'Doctorate',
        drinking: 'Occasional',
        smoking: 'Never',
        religion: 'Others',
        pet: 'None',
        politics: 'Apolitical',
        personalityType: 'Otter',
        hobbies: '',
      },
      withCustomerDetails: true,
      withCustomerCompatibilities: true,
      customerPhoto: [
        {
          id: 1154,
          primary: true,
          photoUrl:
            'https://images.unsplash.com/photo-1625003460653-95a5e4a7ea01?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          index: null,
        },
      ],
      withCustomerPhoto: true,
      activated: true,
    },
  },
  {
    sub: '597acc24-d298-4c7e-822d-3f1561e69462',
    percent: '60%',
    customerData: {
      sub: '597acc24-d298-4c7e-822d-3f1561e69462',
      name: 'Zena Willox',
      gender: 'MTF',
      birthday: '1964-11-23',
      hometown: 'Pawing',
      deactivateDate: null,
      customerDetails: {
        bio: 'lacinia nisi venenatis tristique fusce congue diam id ornare imperdiet sapien urna pretium nisl ut volutpat sapien arcu',
        work: 'Programmer Analyst IV',
        location: 'Pawing',
        height: '4ft 4in',
        starSign: 'Libra',
        education: 'Vocational',
        drinking: 'Regular',
        smoking: 'Never',
        religion: 'Buddhist',
        pet: 'Cat',
        politics: 'Apolitical',
        personalityType: 'Dog',
        hobbies: '',
      },
      withCustomerDetails: true,
      withCustomerCompatibilities: true,
      customerPhoto: [
        {
          id: 1277,
          primary: true,
          photoUrl:
            'https://images.unsplash.com/photo-1592598285030-6a57af53b3d0?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          index: null,
        },
      ],
      withCustomerPhoto: true,
      activated: true,
    },
  },
  {
    sub: '4e3be5f7-1e66-4d12-8e38-df2fcccdc6e7',
    percent: '70%',
    customerData: {
      sub: '4e3be5f7-1e66-4d12-8e38-df2fcccdc6e7',
      name: 'Gay Jedrychowski',
      gender: 'Trans',
      birthday: '1961-12-20',
      hometown: 'Bolong',
      deactivateDate: null,
      customerDetails: {
        bio: 'rhoncus aliquet pulvinar sed nisl nunc rhoncus dui vel sem sed sagittis nam congue risus semper',
        work: 'Community Outreach Specialist',
        location: 'Bolong',
        height: '5ft 1in',
        starSign: 'Capricornus',
        education: 'Bachelor',
        drinking: 'Occasional',
        smoking: 'Regular',
        religion: 'Catholic',
        pet: 'Dog',
        politics: 'Conservative',
        personalityType: 'Dog',
        hobbies: '',
      },
      withCustomerDetails: true,
      withCustomerCompatibilities: true,
      customerPhoto: [
        {
          id: 1671,
          primary: true,
          photoUrl:
            'https://plus.unsplash.com/premium_photo-1709865785911-4e469c91f169?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          index: null,
        },
      ],
      withCustomerPhoto: true,
      activated: true,
    },
  },
];
