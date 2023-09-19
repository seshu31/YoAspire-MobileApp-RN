const Profiles = [
  {
    UserId: 2,
    profile: {
      First_Name: 'durga',
      Last_Name: 'sravani',
      User_Name: 'srazzz',
      heading: 'heading example',
      DOB: '2000-04-08T18:30:00.000Z',
      Title: 'Backend developer',
      Email: 'sravs.vadlamanu2@gmail.com',
      phone_no: '9186572345',
      Location: 'Nuzvid',
    },
    experience: [
      {
        Company_name: 'Aspire',
        Role: 'Developer',
        From: '2020-04-08T18:30:00.000Z',
      },
      {
        Company_name: 'Info',
        Role: 'Backend developer',
        From: '2020-04-08T18:30:00.000Z',
      },
      {
        Company_name: 'Aspire2',
        Role: 'Developer2',
        From: '2020-04-08T18:30:00.000Z',
      },
      {
        Company_name: 'Info2',
        Role: 'Backend developer2',
        From: '2020-04-08T18:30:00.000Z',
      },
    ],
    education: [
      {
        college_name: 'RGUKT',
        From: '2000-04-08T18:30:00.000Z',
        To: '2000-04-08T18:30:00.000Z',
      },
      {
        college_name: 'RGUKT2',
        From: '2010-04-08T18:30:00.000Z',
        To: '2011-04-08T18:30:00.000Z',
      },
      {
        college_name: 'RGUKT3',
        From: '2011-04-08T18:30:00.000Z',
        To: '2012-04-08T18:30:00.000Z',
      },
      {
        college_name: 'RGUKT4',
        From: '2012-04-08T18:30:00.000Z',
        To: '2013-04-08T18:30:00.000Z',
      },
    ],
    skills: ['HTML', 'CSS', 'python', 'java'],
    publications: [
      {
        title: 'title 1',
        date: '2022-03-25T18:30:00.000Z',
      },
      {
        title: 'title 2',
        date: '2022-03-25T18:30:00.000Z',
      },
      {
        title: 'title 3',
        date: '2022-03-25T18:30:00.000Z',
      },
    ],
    courses: [
      {
        title: 'course1',
      },
      {
        title: 'course2',
      },
      {
        title: 'course3',
      },
    ],
    projects: [
      {
        title: 'title 1',
        From: '2020-01-08T18:30:00.000Z',
        To: '2020-05-08T18:30:00.000Z',
      },
      {
        title: 'title 2',
        From: '2020-02-08T18:30:00.000Z',
        To: '2020-04-08T18:30:00.000Z',
      },
      {
        title: 'title 3',
        From: '2020-04-08T18:30:00.000Z',
        To: '2020-05-08T18:30:00.000Z',
      },
    ],
  },
  {
    UserId: 3,
    profile: {
      First_Name: 'durga1 durga1 durga1 durga1durga1',
      heading:
        'heading example1 heading example1 heading example1 heading example1 heading example1 heading example1',
      Last_Name: 'sravani1',
      DOB: '2000-04-08T18:30:00.000Z',
      Title: 'frontend developer',
      Email: 'sravs.vadlamanu3@gmail.com',
      phone_no: '9186572345',
      Location: 'vijayawada',
    },
    experience: [
      {
        Company_name: 'Aspire',
        Role: 'Developer',
        From: '2020-04-08T18:30:00.000Z',
      },
    ],
    education: [
      {
        college_name: 'RGUKT',
        From: '2000-04-08T18:30:00.000Z',
        To: '2000-04-08T18:30:00.000Z',
      },
    ],
    skills: ['C', 'python'],
  },
  {
    UserId: 4,
    profile: {
      First_Name: 'durga2',
      Last_Name: 'sravani2',
      heading: 'heading example2',
      DOB: '2000-04-08T18:30:00.000Z',
      Title: 'fullstack developer',
      Email: 'sravs.vadlamanu4@gmail.com',
      phone_no: '9186572345',
      Location: 'hyderabad',
    },
    experience: [
      {
        Company_name: 'Aspire',
        Role: 'Developer',
        From: '2020-04-08T18:30:00.000Z',
      },
    ],
    education: [
      {
        college_name: 'RGUKT',
        From: '2000-04-08T18:30:00.000Z',
        To: '2000-04-08T18:30:00.000Z',
      },
    ],
    skills: ['C', 'Java'],
  },
  {
    UserId: 5,
    profile: {
      First_Name: 'durga3',
      Last_Name: 'sravani3',
      heading: 'heading example3',
      Title: 'developer',
      DOB: '2000-04-08T18:30:00.000Z',
      Email: 'sravs.vadlamanu5@gmail.com',
      phone_no: '9186572345',
      Location: 'secundrabad',
    },
    experience: [
      {
        Company_name: 'Aspire',
        Role: 'Developer',
        From: '2020-04-08T18:30:00.000Z',
      },
    ],
    education: [
      {
        college_name: 'RGUKT',
        From: '2000-04-08T18:30:00.000Z',
        To: '2000-04-08T18:30:00.000Z',
      },
    ],
    skills: ['C', 'python'],
  },
];

const Followees = [
  {
    FollowerId: 9,
    profile: {
      First_Name: 'follower1',
      Last_Name: 'sravani',
      heading: 'heading example',
      DOB: '2000-04-08T18:30:00.000Z',
      Title: 'Backend developer',
      Email: 'sravs.vadlamanu2@gmail.com',
      phone_no: '9186572345',
      Location: 'Nuzvid',
    },
    experience: [
      {
        Company_name: 'Aspire',
        Role: 'Developer',
        From: '2020-04-08T18:30:00.000Z',
      },
      {
        Company_name: 'Info',
        Role: 'Backend developer',
        From: '2020-04-08T18:30:00.000Z',
      },
      {
        Company_name: 'Aspire2',
        Role: 'Developer2',
        From: '2020-04-08T18:30:00.000Z',
      },
      {
        Company_name: 'Info2',
        Role: 'Backend developer2',
        From: '2020-04-08T18:30:00.000Z',
      },
    ],
    education: [
      {
        college_name: 'RGUKT',
        From: '2000-04-08T18:30:00.000Z',
        To: '2000-04-08T18:30:00.000Z',
      },
      {
        college_name: 'RGUKT2',
        From: '2010-04-08T18:30:00.000Z',
        To: '2011-04-08T18:30:00.000Z',
      },
      {
        college_name: 'RGUKT3',
        From: '2011-04-08T18:30:00.000Z',
        To: '2012-04-08T18:30:00.000Z',
      },
      {
        college_name: 'RGUKT4',
        From: '2012-04-08T18:30:00.000Z',
        To: '2013-04-08T18:30:00.000Z',
      },
    ],
    skills: ['HTML', 'CSS', 'python', 'java'],
    publications: [
      {
        title: 'title 1',
        date: '2022-03-25T18:30:00.000Z',
      },
      {
        title: 'title 2',
        date: '2022-03-25T18:30:00.000Z',
      },
      {
        title: 'title 3',
        date: '2022-03-25T18:30:00.000Z',
      },
    ],
    courses: [
      {
        title: 'course1',
      },
      {
        title: 'course2',
      },
      {
        title: 'course3',
      },
    ],
    projects: [
      {
        title: 'title 1',
        From: '2020-01-08T18:30:00.000Z',
        To: '2020-05-08T18:30:00.000Z',
      },
      {
        title: 'title 2',
        From: '2020-02-08T18:30:00.000Z',
        To: '2020-04-08T18:30:00.000Z',
      },
      {
        title: 'title 3',
        From: '2020-04-08T18:30:00.000Z',
        To: '2020-05-08T18:30:00.000Z',
      },
    ],
  },
  {
    FolloweeId: 10,
    profile: {
      First_Name: 'followee2',
      heading: 'heading example1',
      Last_Name: 'sravani1',
      DOB: '2000-04-08T18:30:00.000Z',
      Title: 'frontend developer',
      Email: 'sravs.vadlamanu3@gmail.com',
      phone_no: '9186572345',
      Location: 'vijayawada',
    },
    experience: [
      {
        Company_name: 'Aspire',
        Role: 'Developer',
        From: '2020-04-08T18:30:00.000Z',
      },
    ],
    education: [
      {
        college_name: 'RGUKT',
        From: '2000-04-08T18:30:00.000Z',
        To: '2000-04-08T18:30:00.000Z',
      },
    ],
    skills: ['C', 'python'],
  },
  {
    FolloweeId: 11,
    profile: {
      First_Name: 'followee3',
      Last_Name: 'sravani2',
      heading: 'heading example2',
      DOB: '2000-04-08T18:30:00.000Z',
      Title: 'fullstack developer',
      Email: 'sravs.vadlamanu4@gmail.com',
      phone_no: '9186572345',
      Location: 'hyderabad',
    },
    experience: [
      {
        Company_name: 'Aspire',
        Role: 'Developer',
        From: '2020-04-08T18:30:00.000Z',
      },
    ],
    education: [
      {
        college_name: 'RGUKT',
        From: '2000-04-08T18:30:00.000Z',
        To: '2000-04-08T18:30:00.000Z',
      },
    ],
    skills: ['C', 'Java'],
  },
  {
    FolloweeId: 12,
    profile: {
      First_Name: 'followee4',
      Last_Name: 'sravani3',
      heading: 'heading example3',
      Title: 'developer',
      DOB: '2000-04-08T18:30:00.000Z',
      Email: 'sravs.vadlamanu5@gmail.com',
      phone_no: '9186572345',
      Location: 'secundrabad',
    },
    experience: [
      {
        Company_name: 'Aspire',
        Role: 'Developer',
        From: '2020-04-08T18:30:00.000Z',
      },
    ],
    education: [
      {
        college_name: 'RGUKT',
        From: '2000-04-08T18:30:00.000Z',
        To: '2000-04-08T18:30:00.000Z',
      },
    ],
    skills: ['C', 'python'],
  },
];

const ChatListData = [
  {
    UserId: 2,
    flag: 'sender',
    message: 'heyy sraz',
    profile: {
      First_Name: 'durga',
      Last_Name: 'sravani',
      User_Name: 'srazzz',
      heading: 'heading example',
      DOB: '2000-04-08T18:30:00.000Z',
      Title: 'Backend developer',
      Email: 'sravs.vadlamanu2@gmail.com',
      phone_no: '9186572345',
      Location: 'Nuzvid',
    },
  },
  {
    UserId: 3,
    flag: 'sender',
    message: 'heyy durga',
    profile: {
      First_Name: 'durga1durga1',
      heading:
        'heading example1 heading example1 heading example1 heading example1 heading example1 heading example1',
      Last_Name: 's',
      DOB: '2000-04-08T18:30:00.000Z',
      Title: 'frontend developer',
      Email: 'sravs.vadlamanu3@gmail.com',
      phone_no: '9186572345',
      Location: 'vijayawada',
    },
  },
  {
    UserId: 4,
    flag: 'receiver',
    message: 'heyy ram',
    profile: {
      First_Name: 'durga2',
      Last_Name: 'sravani2',
      heading: 'heading example2',
      DOB: '2000-04-08T18:30:00.000Z',
      Title: 'fullstack developer',
      Email: 'sravs.vadlamanu4@gmail.com',
      phone_no: '9186572345',
      Location: 'hyderabad',
    },
  },
  {
    UserId: 5,
    flag: 'receiver',
    message: 'heyy venu',
    profile: {
      First_Name: 'durga3',
      Last_Name: 'sravani3',
      heading: 'heading example3',
      Title: 'developer',
      DOB: '2000-04-08T18:30:00.000Z',
      Email: 'sravs.vadlamanu5@gmail.com',
      phone_no: '9186572345',
      Location: 'secundrabad',
    },
  },
];

const chatArray = [
  {msgId: 1, message: 'hello'},
  {msgId: 2, message: 'hi'},
  {msgId: 3, message: 'what are you doing?'},
  {msgId: 4, message: 'nothing'},
  {msgId: 5, message: 'bye'},
  {msgId: 6, message: 'bye'},
];
export {Profiles, Followees, ChatListData, chatArray};
