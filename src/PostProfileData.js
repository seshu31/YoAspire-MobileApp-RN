const articlesData = [
  {
    id: 1,
    PostId: 1,
    Active: 1,
    No_of_Likes: 3,
    Category_Type: 'article',
    First_Name: 'venu',
    Last_Name: 'makaraju',
    Title: 'Web Developer',
    Description:
      'Current working tool React Native Current working tool React Native Current working tool React Native React Native Current working tool React Native Current working tool React Native',
    heading: 'Heading1',
  },
  {
    id: 2,
    PostId: 2,
    Active: 1,
    No_of_Likes: 2,
    Category_Type: 'webinar',
    First_Name: 'sraz',
    Last_Name: 'vadlamanu',
    Title: 'Web Developer',
    Description: 'current working tool Java',
    Organiser: 'Aspire',
    Brief: 'This is sravani working as a developer in aspire',
    admin_flag: 1,
  },
  {
    id: 3,
    PostId: 3,
    Active: 0,
    No_of_Likes: 3,
    Category_Type: 'job',
    First_Name: 'ram',
    Last_Name: 'ponanna',
    Title: 'Backend Developer',
    Description: 'Current working tool Nodejs, mongodb ',
    Organiser: 'Aspire',
    Location: 'Vijayawada',
    Job_Type: 'Full time',
    creator: 1,
  },
  // Add more static article data as needed
];

const groupMembers = [
  {
    UserId: 1,
    profile: {
      First_Name: 'durga',
      Last_Name: 'sravani',
      User_Name: 'srazzz',
      heading: 'heading example',
    },
    admin_flag: 1,
  },
  {
    UserId: 2,
    profile: {
      First_Name: 'ram',
      Last_Name: 'p',
      User_Name: 'srazzz',
      heading: 'heading example',
    },
  },
  {
    UserId: 3,
    profile: {
      First_Name: 'venu',
      Last_Name: 'm',
      User_Name: 'srazzz',
      heading: 'heading example',
    },
  },
  // Add more static article data as needed
];
export {articlesData, groupMembers};
