import { BadgeCheck, icons, LayoutDashboard, MapPinHouse } from "lucide-react"

export const registerFormControls=[
    { 
    name : 'userName',
    label : 'User Name',
    placeholder : 'Enter User Name',
    componentType : 'input',
    type : 'text'
    },
    { 
        name : 'email',
        label : 'Email',
        placeholder : 'Enter Email',
        componentType : 'input',
        type : 'email'
    },
    { 
        name : 'password',
        label : 'Password',
        placeholder : 'Enter Password',
        componentType : 'input',
        type : 'password'
    },
    {
      name: 'role',
      label: 'Role',
      componentType: 'select',
      options: [
          { id: 'admin', label: 'Admin' },
          { id: 'user', label: 'User' }
      ]
  }
    
]

export const loginFormControls = [
  { 
      name: 'email',
      label: 'Email',
      placeholder: 'Enter Email',
      componentType: 'input',
      type: 'email'
  },
  { 
      name: 'password',
      label: 'Password',
      placeholder: 'Enter Password',
      componentType: 'input',
      type: 'password'
  },
  {
      name: 'role',
      label: 'Role',
      componentType: 'select',
      options: [
          { id: 'admin', label: 'Admin' },
          { id: 'user', label: 'User' }
      ]
  }
];


export const addPropertyFormElements = [
    {
      label: "Title",
      name: "title",
      componentType: "input",
      type: "text",
      placeholder: "Enter Property Name",
    },
    {
      label: "Description",
      name: "description",
      componentType: "textarea",
      placeholder: "Enter property description",
    },
    {
      label: "Category",
      name: "category",
      componentType: "select",
      options: [
        { id: "mess", label: "Mess" },
        { id: "hostel", label: "Hostel" },
        { id: "pg", label: "PG" },
      ],
    },
    {
      label: "Location",
      name: "location",
      componentType: "textarea",
      placeholder: "Enter property location",
    },
    {
      label: "Price",
      name: "price",
      componentType: "input",
      type: "number",
      placeholder: "Enter Price of per month",
    },
    {
      label: "Vacancies",
      name: "vacancies",
      componentType: "input",
      type: "number",
      placeholder: "Enter no. of Vacancies",
    },
    {
      label: "Total Capacity",
      name: "totalCapacity",
      componentType: "input",
      type: "number",
      placeholder: "Enter Capacity of Property",
    },
    {
      label: "Contact",
      name: "contact",
      componentType: "input",
      type: "number",
      placeholder: "Enter Contact Number",
    },
  ];

  export const customerViewHeaderMenuItems=[
    {
      id:'home',
      label: 'Home',
      path: '/customer/home',
      
    },
    {
      id:'mess',
      label: 'Mess',
      path: '/customer/listing/',
      
    },
    {
      id:'hostel',
      label: 'Hostel',
      path: '/customer/listing/',
      
    },
    {
      id:'pg',
      label: 'PG',
      path: '/customer/listing/',
      
    },
  ]

  export const filterOptions = {
    category: [
      { id: "hostel", label: "Hostel" },
      { id: "mess", label: "Mess" },
      { id: "pg", label: "PG" },
    ],
    
  };

  export const sortOptions = [
    { id: "price-lowtohigh", label: "Price: Low to High" },
    { id: "price-hightolow", label: "Price: High to Low" },
    { id: "title-atoz", label: "Title: A to Z" },
    { id: "title-ztoa", label: "Title: Z to A" },
  ];
  