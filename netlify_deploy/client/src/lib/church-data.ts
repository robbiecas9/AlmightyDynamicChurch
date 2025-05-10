import { Belief, Meeting } from "@shared/schema";

export interface HeroContent {
  title: string;
  subtitle: string;
  content: string;
  imageUrl: string;
  buttonText: string;
  buttonLink: string;
}

export interface PastorMessageContent {
  title: string;
  subtitle: string;
  content: string;
  name: string;
  position: string;
  imageUrl: string;
}

export interface ScriptureBannerContent {
  content: string;
  reference: string;
}

export interface BibleImageContent {
  content: string;
  reference: string;
  imageUrl: string;
  buttonText: string;
  buttonLink: string;
}

export const heroContent: HeroContent = {
  title: "Welcome to Almighty God Fellowship",
  subtitle: "A place of love, faith, and community",
  content: "We are a community of believers committed to serving God and spreading His love. Join us in worship as we grow together in faith and fellowship.",
  imageUrl: "/church-building.jpg",
  buttonText: "Join Us",
  buttonLink: "#meetings",
};

export const pastorMessageContent: PastorMessageContent = {
  title: "A Message from Our Pastor",
  subtitle: "Walking together in faith",
  content: "Dear brothers and sisters in Christ, it is with joy that I welcome you to Almighty God Fellowship. Our church is built on the foundation of God's unchanging love and the timeless truths of His Word. We believe that every person is valuable in God's sight and has a special place in His plan. As we worship together, study His Word, and serve our community, we grow closer to Him and to one another. Whether you are exploring faith for the first time or seeking a church home, we invite you to join us on this journey of faith, hope, and love.",
  name: "Pastor Thomas Jacob",
  position: "Senior Pastor",
  imageUrl: "/pastor.jpg",
};

export const scriptureBannerContent: ScriptureBannerContent = {
  content: "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.",
  reference: "John 3:16",
};

export const bibleImageContent: BibleImageContent = {
  content: "Your word is a lamp for my feet, a light on my path.",
  reference: "Psalm 119:105",
  imageUrl: "/bible-study.jpg",
  buttonText: "Join Bible Study",
  buttonLink: "#meetings",
};

export const meetingData: Meeting[] = [
  {
    id: 1,
    title: "Sunday Worship",
    day: "Sunday",
    time: "10:00 AM - 12:00 PM",
    location: "Main Sanctuary",
    description: "Our main worship service with praise, prayer, and teaching from God's Word.",
  },
  {
    id: 2,
    title: "Bible Study",
    day: "Wednesday",
    time: "7:00 PM - 8:30 PM",
    location: "Fellowship Hall",
    description: "Midweek Bible study and prayer meeting for spiritual growth and fellowship.",
  },
  {
    id: 3,
    title: "Youth Group",
    day: "Friday",
    time: "6:30 PM - 8:30 PM",
    location: "Youth Center",
    description: "A time for teenagers to connect, worship, and grow in their faith together.",
  },
  {
    id: 4,
    title: "Children's Church",
    day: "Sunday",
    time: "10:00 AM - 11:30 AM",
    location: "Children's Wing",
    description: "Fun, engaging Bible lessons and activities for children ages 4-12.",
  },
  {
    id: 5,
    title: "Prayer Meeting",
    day: "Tuesday",
    time: "6:00 AM - 7:00 AM",
    location: "Prayer Room",
    description: "Early morning prayer gathering to start the day with God.",
  },
  {
    id: 6,
    title: "Women's Fellowship",
    day: "Saturday",
    time: "4:00 PM - 5:30 PM",
    location: "Fellowship Hall",
    description: "A time for women to gather for fellowship, study, and prayer.",
  },
  {
    id: 7,
    title: "Men's Fellowship",
    day: "Saturday",
    time: "7:00 AM - 8:30 AM",
    location: "Fellowship Hall",
    description: "Breakfast, Bible study, and fellowship for men of all ages.",
  },
  {
    id: 8,
    title: "Choir Practice",
    day: "Thursday",
    time: "7:00 PM - 8:30 PM",
    location: "Choir Room",
    description: "Rehearsal for our worship choir. New voices are always welcome!",
  },
];

export const beliefData: Belief[] = [
  {
    id: 1,
    title: "The Bible",
    summary: "God's infallible Word",
    content: "We believe the Bible is the inspired, infallible Word of God and our final authority for faith and practice. It is without error in its original manuscripts and contains everything we need for salvation and godly living.",
    scripture: "2 Timothy 3:16-17 - All Scripture is God-breathed and is useful for teaching, rebuking, correcting and training in righteousness, so that the servant of God may be thoroughly equipped for every good work.",
  },
  {
    id: 2,
    title: "God",
    summary: "Trinity: Father, Son, and Holy Spirit",
    content: "We believe in one God, eternally existing in three persons: Father, Son, and Holy Spirit. Each person of the Trinity is fully God, sharing the same divine attributes yet distinct in person.",
    scripture: "Matthew 28:19 - Therefore go and make disciples of all nations, baptizing them in the name of the Father and of the Son and of the Holy Spirit.",
  },
  {
    id: 3,
    title: "Jesus Christ",
    summary: "Fully God and fully human",
    content: "We believe Jesus Christ is fully God and fully human. He was born of a virgin, lived a sinless life, performed miracles, died on the cross for our sins, was bodily resurrected, ascended to heaven, and will return to judge the living and the dead.",
    scripture: "John 1:14 - The Word became flesh and made his dwelling among us. We have seen his glory, the glory of the one and only Son, who came from the Father, full of grace and truth.",
  },
  {
    id: 4,
    title: "Salvation",
    summary: "By grace through faith alone",
    content: "We believe salvation is by grace alone through faith alone in Christ alone. It is a free gift from God, not earned by good works but received by personal faith in the Lord Jesus Christ and His finished work on the cross.",
    scripture: "Ephesians 2:8-9 - For it is by grace you have been saved, through faith—and this is not from yourselves, it is the gift of God—not by works, so that no one can boast.",
  },
  {
    id: 5,
    title: "Holy Spirit",
    summary: "Empowers believers for Christian living",
    content: "We believe the Holy Spirit indwells every believer at the moment of salvation, empowering them to live a godly life and equipping them with gifts for service in God's kingdom.",
    scripture: "John 14:26 - But the Advocate, the Holy Spirit, whom the Father will send in my name, will teach you all things and will remind you of everything I have said to you.",
  },
  {
    id: 6,
    title: "The Church",
    summary: "Body of Christ and community of believers",
    content: "We believe the Church is the body of Christ, a spiritual organism made up of all born-again believers. We are called to worship, fellowship, discipleship, ministry, and evangelism.",
    scripture: "1 Corinthians 12:27 - Now you are the body of Christ, and each one of you is a part of it.",
  },
  {
    id: 7,
    title: "Baptism",
    summary: "Public declaration of faith",
    content: "We believe baptism is a public declaration of faith in Christ. It symbolizes our identification with Christ's death, burial, and resurrection and our new life in Him.",
    scripture: "Romans 6:4 - We were therefore buried with him through baptism into death in order that, just as Christ was raised from the dead through the glory of the Father, we too may live a new life.",
  },
  {
    id: 8,
    title: "Communion",
    summary: "Remembrance of Christ's sacrifice",
    content: "We believe communion is a memorial of Christ's sacrifice on the cross. It reminds us of His broken body and shed blood for our redemption and proclaims His death until He returns.",
    scripture: "1 Corinthians 11:26 - For whenever you eat this bread and drink this cup, you proclaim the Lord's death until he comes.",
  },
  {
    id: 9,
    title: "Second Coming",
    summary: "Christ's return for His Church",
    content: "We believe in the personal, visible, and imminent return of the Lord Jesus Christ for His Church. This blessed hope motivates us to holy living, faithful service, and eager evangelism.",
    scripture: "Acts 1:11 - 'Men of Galilee,' they said, 'why do you stand here looking into the sky? This same Jesus, who has been taken from you into heaven, will come back in the same way you have seen him go into heaven.'",
  },
  {
    id: 10,
    title: "Eternity",
    summary: "Heaven and hell are real destinations",
    content: "We believe in the resurrection of both the saved and the lost—the saved to eternal life in heaven with God, and the lost to eternal separation from God in hell.",
    scripture: "John 5:28-29 - Do not be amazed at this, for a time is coming when all who are in their graves will hear his voice and come out—those who have done what is good will rise to live, and those who have done what is evil will rise to be condemned.",
  },
];
