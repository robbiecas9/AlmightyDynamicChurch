export interface Belief {
  id: number;
  title: string;
  summary: string;
  content: string;
  scripture: string;
}

export interface Meeting {
  id: number;
  title: string;
  day: string;
  time: string;
  location: string;
  description?: string;
}

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

// Static content for the Hero section
export const heroContent: HeroContent = {
  title: "ALMIGHTY GOD FELLOWSHIP",
  subtitle: "BIBLE COLLEGE JUNCTION, PUTHENCRUZ, ERNAKULAM DIST, KERALA",
  content: "FOLLOW JESUS FOR PEACE AND ETERNAL LIFE",
  imageUrl: "/church-building.jpg",
  buttonText: "Join Our Worship",
  buttonLink: "#meetings",
};

// Static content for the Pastor Message section
export const pastorMessageContent: PastorMessageContent = {
  title: "Message From Our Pastor",
  subtitle: "Rev. Dr. Jacob Mathai",
  content:
    "ALMIGHTY GOD Fellowship is a reformed spiritual movement inspired by the Holy spirit and totally based on the teachings of Jesus Christ. As per the teachings of Jesus Christ in John 17: 3 the ONLY ONE AND TRUE God is the ALMIGHTY JEHOVAH God, the creator of heavens and earth (Genesis 1: 1, 2:4, 17: 1). As per John 4: 23,24 and Mathew 4: 10, Jesus said to worship ONLY THE FATHER in spirit and truth. According to Rev 5: 13 people are expected to give glory and express thanks and gratitude to Jesus, the son of God, our saviour who died for us on the cross of Calvary. We encourage people of all nations to worship Almighty Jehovah God through Jesus Christ. You are welcome to join our worship meetings on every Sundays.",
  name: "Rev Dr. Jacob Mathai",
  position: "Senior Pastor",
  imageUrl: "/pastor.jpg",
};

// Static content for the Scripture Banner
export const scriptureBannerContent: ScriptureBannerContent = {
  content:
    'Jesus said to him, "I am the way, and the truth, and the life. No one comes to the Father except through me."',
  reference: "John 14:6",
};

// Bible Image Section content
export interface BibleImageContent {
  content: string;
  reference: string;
  imageUrl: string;
  buttonText: string;
  buttonLink: string;
}

export const bibleImageContent: BibleImageContent = {
  content:
    "Come, let us bow down in worship, let us kneel before the LORD our Maker; for he is our God and we are the people of his pasture, the flock under his care",
  reference: "Psalms 95: 6,7",
  imageUrl: "/bible-study.jpg",
  buttonText: "Join Our Worship",
  buttonLink: "#meetings",
};

// Meeting schedule data
export const meetingData: Meeting[] = [
  {
    id: 1,
    title: "Sunday Worship Service",
    day: "Sunday",
    time: "10:00 AM - 12:30 PM",
    location: "Main Sanctuary",
    description:
      "Our main weekly worship service with praise, prayer, and Bible teaching.",
  },
  {
    id: 2,
    title: "Wednesday Bible Study",
    day: "Wednesday",
    time: "7:00 PM - 8:30 PM",
    location: "Fellowship Hall",
    description: "Midweek Bible study and prayer meeting.",
  },
  {
    id: 3,
    title: "Friday Prayer Meeting",
    day: "Friday",
    time: "7:30 PM - 9:00 PM",
    location: "Prayer Room",
    description:
      "Special prayer service focusing on intercession and spiritual growth.",
  },
];

export const beliefData: Belief[] = [
  {
    id: 1,
    title: "Almighty God",
    summary:
      'Jehovah is the almighty God. "Almighty" emphasizes God\'s omnipotence, His ultimate power and authority over all creation. He created everything.',
    content:
      'Jehovah is the almighty God. "Almighty" emphasizes God\'s omnipotence, His ultimate power and authority over all creation. He created everything. "Almighty God Jehovah" reflects the belief in God as the supreme ruler of the universe, the creator of all things, and the one who governs with justice, mercy, and love. It underscores and attribute to God\'s divine majesty and power, inviting them to worship Him with reverence and trust in His providence. All human beings need to worship Almighty God in a manner that He has prescribed.',
    scripture: "(Gen 1:1,2:4, Psalms 83:18, Exodus 20:2,3. Deuteronomy 6:4)",
  },
  {
    id: 2,
    title: "Jesus Christ",
    summary:
      "Jesus Christ is the only begotten son of Almighty God. He is God's perfect son. In the greatest demonstration of love ever expressed, God allowed that perfect son to take our place on a cross.",
    content:
      "Jesus Christ is the only begotten son of Almighty God. He is God's perfect son. In the greatest demonstration of love ever expressed, God allowed that perfect son to take our place on a cross. Jesus died for us and gave a provision for our salvation. He and He alone was qualified to pay the debt for our sin and He paid that debt in full. Jesus paid the penalty of our sin. And by faith and grace we can obtain salvation in Christ alone. Jesus willingly sacrificed himself to absolve humanity from sin, bridging the gap between humanity and God. Through his teachings, miracles, death, and resurrection, Jesus manifested God's redemptive plan and demonstrated the depth of divine love and compassion.",
    scripture: "(Mathew 3:16, John 3:16, 1 Timothy 2:5,6)",
  },
  {
    id: 3,
    title: "Holy Spirit",
    summary:
      "The Holy Spirit is the active force of Almighty God. Holy Spirit is not a person, it is the power Almighty God. God uses holy spirit, the power, to accomplish his purposes.",
    content:
      "The Holy Spirit is the active force of Almighty God. Holy Spirit is not a person, it is the power Almighty God. God uses holy spirit, the power, to accomplish his purposes. Holy Spirit is God's active presence in the world, guiding, comforting, and empowering believers. Holy Spirit inspired God's servants to write the Holy scriptures, the Bible. Holy spirit console, strengthen and help to understand deep knowledge about God's word. Holy Spirit leading them to deeper understanding, moral transformation, and spiritual maturity.",
    scripture: "(Genesis 1:2, Mathew 1:20. Acts 2:4,33. Acts 10:44-47)",
  },
  {
    id: 4,
    title: "The Bible",
    summary:
      "All Scripture is inspired by God and is useful to teach us what is true and to make us realize what is wrong in our lives. It corrects us when we are wrong and teaches us to do what is right.",
    content:
      "All Scripture is inspired by God and is useful to teach us what is true and to make us realize what is wrong in our lives. It corrects us when we are wrong and teaches us to do what is right. Our worship and beliefs are based on Bible principles. Meditating on the Bible is a wonderful invitation from God that not only encourages our hearts each day, but transforms us to live according to Bible principles. The Bible instructs us with regard to worship, prayer, organizing churches, and the duties in the family.",
    scripture: "(2 Timothy 3:16,17. Psalms 119:105. John 17:17)",
  },
  {
    id: 5,
    title: "Worship",
    summary:
      'Worshipping the Almighty God through Jesus is a profound act of faith and devotion. We should worship Him in "spirit and in truth". This is not a suggestion, but a command.',
    content:
      'Worshipping the Almighty God through Jesus is a profound act of faith and devotion. We should worship Him in "spirit and in truth". This is not a suggestion, but a command. We do not need large buildings or elaborate ceremonies to do this. We can do this with an truthful and honest heart. Worshipping Almighty God through Jesus acknowledges his central role in our salvation and redemption, recognizing him as the ultimate expression of God\'s presence and power in our lives. May we embrace this sacred privilege with sincere hearts and open minds, allowing our worship to transform and elevate our lives, drawing us closer to the divine presence and purpose.',
    scripture: "(Exodus 20:2,3. Isaiah 42:8. Mathew 4:10. John 4:24)",
  },
  {
    id: 6,
    title: "Salvation",
    summary:
      "Salvation is not earned through good deeds or personal merit but is received as a free gift of God's grace, through faith in Jesus Christ.",
    content:
      "Salvation is not earned through good deeds or personal merit but is received as a free gift of God's grace, through faith in Jesus Christ. Believers need to confess their sins, repent, and place their trust in Jesus as their Lord and Savior, thereby receiving the gift of eternal life and a renewed relationship with God. Through Jesus, we can find forgiveness and the assurance of God's unfailing love, inviting all to experience the transformative power of salvation. The Son of God, Jesus Christ, provides the way for individuals to attain eternal life, offering redemption and reconciliation with God.",
    scripture:
      "(John 3:16,36. Ephesians 2:8-10. Galatians 2:20. 1 Timothy 2:5,6)",
  },
  {
    id: 7,
    title: "Our Hope - Everlasting life in God's Kingdom",
    summary:
      "The hope of eternal life in God's kingdom is a profound source of comfort, strength, and inspiration. We are assured that death is not the end but a gateway to a new and eternal life.",
    content:
      "The hope of eternal life in God's kingdom is a profound source of comfort, strength, and inspiration. We are assured that death is not the end but a gateway to a new and eternal life in communion with our Creator. This hope empowers us to face life's challenges with courage and resilience, knowing that our ultimate destiny is secure in the hands of a loving and faithful God. It reminds us to live with purpose and intentionality, investing our time, talents, and resources in pursuits that have eternal significance.",
    scripture: "(John 17:3. Mathew 6:10, Psalms 37:29, Revelation 21:3,4)",
  },
  {
    id: 8,
    title: "Baptism",
    summary:
      "Water baptism is something we encourage for every believer in Christ to experience. Water baptism is an outward declaration that the one being baptized has made a complete, unconditional dedication.",
    content:
      "Water baptism is something we encourage for every believer in Christ to experience. Water baptism is an outward declaration that the one being baptized has made a complete, unconditional dedication through Lord Jesus Christ to do the will of Almighty God. We are declaring that we who were once dead because of our sin are now alive in Christ, completely forgiven of our sins and made righteous before God. Christian Baptism is a sacred and joyous occasion, celebrating the grace of God, the death and resurrection of Christ, and the new life available to all who put their trust in him.",
    scripture: "(Mathew 28:19,20. Acts 2:38. John 3:5. Colossians 2:12)",
  },
  {
    id: 9,
  title: "Our Christian Responsibility",
  summary: "As followers of Christ, we are called to reflect God's love by living in service, unity, and compassion.",
  content:
    "As Christians, we are called to preach the good news of God’s Kingdom and live lives that reflect Christ’s example. We have a duty to serve, support, and encourage one another—helping fellow believers remain strong, faithful, and hopeful in a challenging world. We are also called to promote love, unity, and compassion in our communities. Loving others as ourselves means extending grace, patience, and kindness to everyone, including those who may be difficult to love. Our actions should reflect God’s character, treating all people with dignity, respect, and sincere care.",
  scripture: "(John 13:34–35, Galatians 6:2, Romans 12:10)",
},
  {
  id: 10,
  title: "God’s Kingdom",
  summary: "God’s Kingdom is the only lasting solution and hope for mankind. It will restore the earth and fulfill God's original purpose.",
  content:
    "God’s Kingdom refers to God’s government—His sovereign authority and reign over all creation and His people. Sometimes called the 'Heavenly Kingdom,' it signifies a government from heaven. Human governments have failed to solve mankind’s problems or bring lasting peace and security. God originally created everything good and harmonious, but under human rule, the world has strayed from that standard. Soon, God’s Kingdom—ruled by His Son, Jesus Christ—will take complete control of the earth and restore it to its original, 'perfect' state. It will reunite mankind with God and fulfill His promises of peace, restoration, and everlasting life.",
  scripture: "(Daniel 2:44, Isaiah 9:6, Psalms 37:29, Revelation 21:3–5)",
},
{
  id: 11,
  title: "Preaching God’s Kingdom",
  summary: "We are called to preach the good news of God’s Kingdom and make disciples of all nations before the end comes.",
  content:
    "Jesus saw preaching the Kingdom as His primary mission. It was the first and last message He proclaimed. He trained His disciples to continue this mission, instructing them to teach others to obey all His commands. We are called to carry this responsibility forward—preaching the good news of the Kingdom to all nations, making disciples, and baptizing them in the name of the Father, Son, and Holy Spirit. As the end of this system draws near, the need to proclaim the Kingdom becomes even more urgent. God’s Kingdom promises full restoration: transforming this world into a paradise under the rulership of Christ Jesus.",
  scripture: "(Matthew 24:14, 28:19–20; Mark 16:15; Acts 1:8)",
},
];
