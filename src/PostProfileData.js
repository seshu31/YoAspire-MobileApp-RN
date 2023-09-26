const articlesData = [
  {
    UserId: 1,
    Brief: 'This is the brief of article',
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
    Time_of_Event: '1812',
    PostedOn: '2023-09-25T10:16:09.981Z',
  },
  {
    UserId: 1,
    id: 2,
    PostId: 2,
    Active: 1,
    No_of_Likes: 2,
    Link: 'http://thisis-link.com',
    Category_Type: 'webinar',
    Date_of_Event: '2023-04-08T18:30:00.000Z',
    Time_of_Event: '1812',
    First_Name: 'sraz',
    Last_Name: 'vadlamanu',
    Title: 'Web Developer',
    Description: 'current working tool Java',
    Organiser: 'Aspire',
    Brief: 'This is sravani working as a developer in aspire',
    admin_flag: 1,
    PostedOn: '2023-08-27T10:16:09.981Z',
  },
  {
    id: 3,
    UserId: 1,
    PostId: 3,
    Active: 0,
    No_of_Likes: 3,
    Date_of_Event: '2023-04-08T18:30:00.000Z',
    Time_of_Event: '0612',
    Link: 'http://thisis-link.com',
    Category_Type: 'job',
    Brief: 'This is the brief of article id3',
    First_Name: 'ram',
    Last_Name: 'ponanna',
    Title: 'Backend Developer',
    Description:
      'Current working tool Nodejs, mongodb, Current working tool Nodejs, mongodb, Current working tool Nodejs, mongodb, Current working tool Nodejs, mongodb ',
    Organiser: 'Aspire',
    Location: 'Vijayawada',
    Job_Type: 'Full time',
    creator: 1,
    PostedOn: '2023-09-27T10:14:09.981Z',
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

const commentsData = [
  {
    id: '1',
    text: 'This is comment 1',
    First_Name: 'venu',
    Last_Name: 'm',
    Comment: 'Comment 1',
  },
  {
    id: '2',
    text: 'This is comment 2',
    First_Name: 'venu2',
    Last_Name: 'm',
    Comment: 'Comment 2',
  },
  {
    id: '3',
    text: 'This is comment 3',
    First_Name: 'venu3',
    Last_Name: 'm',
    Comment: 'Comment 3',
  },
];
export {articlesData, groupMembers, commentsData};
