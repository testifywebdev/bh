import {
  users, type User, type InsertUser,
  culturalItems, type CulturalItem, type InsertCulturalItem,
  events, type Event, type InsertEvent,
  galleryItems, type GalleryItem, type InsertGalleryItem,
  heritageInfo, type HeritageInfo, type InsertHeritageInfo,
  carouselItems, type CarouselItem, type InsertCarouselItem,
  subscribers, type Subscriber, type InsertSubscriber
} from "@shared/schema";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Cultural Item methods
  getCulturalItems(): Promise<CulturalItem[]>;
  getCulturalItemsByCategory(category: string): Promise<CulturalItem[]>;
  getCulturalItem(id: number): Promise<CulturalItem | undefined>;
  createCulturalItem(item: InsertCulturalItem): Promise<CulturalItem>;

  // Event methods
  getEvents(): Promise<Event[]>;
  getEventsByMonth(month: string): Promise<Event[]>;
  getEvent(id: number): Promise<Event | undefined>;
  createEvent(event: InsertEvent): Promise<Event>;

  // Gallery Item methods
  getGalleryItems(): Promise<GalleryItem[]>;
  getGalleryItemsByCategory(category: string): Promise<GalleryItem[]>;
  getGalleryItem(id: number): Promise<GalleryItem | undefined>;
  createGalleryItem(item: InsertGalleryItem): Promise<GalleryItem>;

  // Heritage Info methods
  getHeritageInfo(): Promise<HeritageInfo[]>;
  getHeritageInfoByCategory(category: string): Promise<HeritageInfo[]>;
  getHeritageInfoItem(id: number): Promise<HeritageInfo | undefined>;
  createHeritageInfo(info: InsertHeritageInfo): Promise<HeritageInfo>;

  // Carousel Item methods
  getCarouselItems(): Promise<CarouselItem[]>;
  getCarouselItem(id: number): Promise<CarouselItem | undefined>;
  createCarouselItem(item: InsertCarouselItem): Promise<CarouselItem>;

  // Newsletter Subscriber methods
  getSubscribers(): Promise<Subscriber[]>;
  createSubscriber(subscriber: InsertSubscriber): Promise<Subscriber>;
  getSubscriberByEmail(email: string): Promise<Subscriber | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private culturalItems: Map<number, CulturalItem>;
  private events: Map<number, Event>;
  private galleryItems: Map<number, GalleryItem>;
  private heritageInfo: Map<number, HeritageInfo>;
  private carouselItems: Map<number, CarouselItem>;
  private subscribers: Map<number, Subscriber>;
  
  private currentUserId: number;
  private currentCulturalItemId: number;
  private currentEventId: number;
  private currentGalleryItemId: number;
  private currentHeritageInfoId: number;
  private currentCarouselItemId: number;
  private currentSubscriberId: number;

  constructor() {
    this.users = new Map();
    this.culturalItems = new Map();
    this.events = new Map();
    this.galleryItems = new Map();
    this.heritageInfo = new Map();
    this.carouselItems = new Map();
    this.subscribers = new Map();
    
    this.currentUserId = 1;
    this.currentCulturalItemId = 1;
    this.currentEventId = 1;
    this.currentGalleryItemId = 1;
    this.currentHeritageInfoId = 1;
    this.currentCarouselItemId = 1;
    this.currentSubscriberId = 1;
    
    this.initializeData();
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Cultural Item methods
  async getCulturalItems(): Promise<CulturalItem[]> {
    return Array.from(this.culturalItems.values());
  }

  async getCulturalItemsByCategory(category: string): Promise<CulturalItem[]> {
    return Array.from(this.culturalItems.values()).filter(
      (item) => item.category === category
    );
  }

  async getCulturalItem(id: number): Promise<CulturalItem | undefined> {
    return this.culturalItems.get(id);
  }

  async createCulturalItem(item: InsertCulturalItem): Promise<CulturalItem> {
    const id = this.currentCulturalItemId++;
    const newItem: CulturalItem = { ...item, id };
    this.culturalItems.set(id, newItem);
    return newItem;
  }

  // Event methods
  async getEvents(): Promise<Event[]> {
    return Array.from(this.events.values());
  }

  async getEventsByMonth(month: string): Promise<Event[]> {
    return Array.from(this.events.values()).filter(
      (event) => event.month.toLowerCase() === month.toLowerCase()
    );
  }

  async getEvent(id: number): Promise<Event | undefined> {
    return this.events.get(id);
  }

  async createEvent(event: InsertEvent): Promise<Event> {
    const id = this.currentEventId++;
    const newEvent: Event = { ...event, id };
    this.events.set(id, newEvent);
    return newEvent;
  }

  // Gallery Item methods
  async getGalleryItems(): Promise<GalleryItem[]> {
    return Array.from(this.galleryItems.values());
  }

  async getGalleryItemsByCategory(category: string): Promise<GalleryItem[]> {
    return Array.from(this.galleryItems.values()).filter(
      (item) => item.category === category
    );
  }

  async getGalleryItem(id: number): Promise<GalleryItem | undefined> {
    return this.galleryItems.get(id);
  }

  async createGalleryItem(item: InsertGalleryItem): Promise<GalleryItem> {
    const id = this.currentGalleryItemId++;
    const newItem: GalleryItem = { ...item, id };
    this.galleryItems.set(id, newItem);
    return newItem;
  }

  // Heritage Info methods
  async getHeritageInfo(): Promise<HeritageInfo[]> {
    return Array.from(this.heritageInfo.values());
  }

  async getHeritageInfoByCategory(category: string): Promise<HeritageInfo[]> {
    return Array.from(this.heritageInfo.values()).filter(
      (info) => info.category === category
    );
  }

  async getHeritageInfoItem(id: number): Promise<HeritageInfo | undefined> {
    return this.heritageInfo.get(id);
  }

  async createHeritageInfo(info: InsertHeritageInfo): Promise<HeritageInfo> {
    const id = this.currentHeritageInfoId++;
    const newInfo: HeritageInfo = { ...info, id };
    this.heritageInfo.set(id, newInfo);
    return newInfo;
  }

  // Carousel Item methods
  async getCarouselItems(): Promise<CarouselItem[]> {
    return Array.from(this.carouselItems.values()).sort((a, b) => a.order - b.order);
  }

  async getCarouselItem(id: number): Promise<CarouselItem | undefined> {
    return this.carouselItems.get(id);
  }

  async createCarouselItem(item: InsertCarouselItem): Promise<CarouselItem> {
    const id = this.currentCarouselItemId++;
    const newItem: CarouselItem = { ...item, id };
    this.carouselItems.set(id, newItem);
    return newItem;
  }

  // Newsletter Subscriber methods
  async getSubscribers(): Promise<Subscriber[]> {
    return Array.from(this.subscribers.values());
  }

  async getSubscriberByEmail(email: string): Promise<Subscriber | undefined> {
    return Array.from(this.subscribers.values()).find(
      (subscriber) => subscriber.email === email
    );
  }

  async createSubscriber(subscriber: InsertSubscriber): Promise<Subscriber> {
    const id = this.currentSubscriberId++;
    const createdAt = new Date();
    const newSubscriber: Subscriber = { ...subscriber, id, createdAt };
    this.subscribers.set(id, newSubscriber);
    return newSubscriber;
  }

  // Initialize with sample data
  private initializeData() {
    // Carousel Items
    const carouselItemsData: InsertCarouselItem[] = [
      {
        title: "Celebrating West India's Cultural Heritage",
        description: "Experience the vibrant traditions, art, and heritage of West India at Bharat Mahotsav",
        imageUrl: "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1600&q=80",
        order: 1
      },
      {
        title: "Vivid Colors of Rajasthan",
        description: "Explore the royal heritage and colorful traditions of Rajasthan",
        imageUrl: "https://images.unsplash.com/photo-1608021880929-848249540eaf?auto=format&fit=crop&w=1600&q=80",
        order: 2
      },
      {
        title: "Vibrant Gujarat",
        description: "Discover the rich cultural tapestry and artistic traditions of Gujarat",
        imageUrl: "https://images.unsplash.com/photo-1585074395785-40818899d711?auto=format&fit=crop&w=1600&q=80",
        order: 3
      }
    ];

    carouselItemsData.forEach(item => {
      const id = this.currentCarouselItemId++;
      const newItem: CarouselItem = { ...item, id };
      this.carouselItems.set(id, newItem);
    });

    // Cultural Items
    const culturalItemsData: InsertCulturalItem[] = [
      {
        title: "Warli Art Tradition",
        description: "Ancient tribal art form from Maharashtra, featuring distinctive geometric patterns that tell stories of everyday life.",
        imageUrl: "https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?auto=format&fit=crop&w=800&q=80",
        category: "art",
        state: "Maharashtra",
        featured: true
      },
      {
        title: "Gujarati Folk Music",
        description: "Traditional musical expressions of Gujarat, including Garba and Dandiya Raas, with distinctive instruments and rhythms.",
        imageUrl: "https://images.unsplash.com/photo-1599991271419-efa70c1a98f8?auto=format&fit=crop&w=800&q=80",
        category: "music",
        state: "Gujarat",
        featured: true
      },
      {
        title: "Lavani Dance",
        description: "Powerful Maharashtrian dance form combining traditional song, rhythmic movements, and theatrical gestures.",
        imageUrl: "https://images.unsplash.com/photo-1583600883972-1976c2f6dca5?auto=format&fit=crop&w=800&q=80",
        category: "dance",
        state: "Maharashtra",
        featured: true
      },
      {
        title: "Ghoomar Dance",
        description: "Traditional folk dance of Rajasthan performed by women during special occasions.",
        imageUrl: "https://images.unsplash.com/photo-1601122997668-56b19c59f185?auto=format&fit=crop&w=800&q=80",
        category: "dance",
        state: "Rajasthan",
        featured: false
      },
      {
        title: "Bandhani Textile Art",
        description: "Traditional tie-dye textile pattern from Gujarat and Rajasthan with intricate designs.",
        imageUrl: "https://images.unsplash.com/photo-1623184515089-86dd19cf15a6?auto=format&fit=crop&w=800&q=80",
        category: "art",
        state: "Gujarat",
        featured: false
      },
      {
        title: "Diwali Festival",
        description: "The festival of lights celebrated with lamps, rangoli, and fireworks across West India.",
        imageUrl: "https://images.unsplash.com/photo-1564546364925-8bdb53be7be8?auto=format&fit=crop&w=800&q=80",
        category: "festivals",
        state: "All States",
        featured: false
      },
      {
        title: "Dhavali Folk Music",
        description: "Traditional musical form from Maharashtra with devotional and cultural themes.",
        imageUrl: "https://images.unsplash.com/photo-1508700929628-666bc8bd84ea?auto=format&fit=crop&w=800&q=80",
        category: "music",
        state: "Maharashtra",
        featured: false
      },
      {
        title: "Navratri Celebrations",
        description: "Nine-night festival worshipping Goddess Durga with vibrant dancing and music.",
        imageUrl: "https://images.unsplash.com/photo-1600697230088-4992c83b2804?auto=format&fit=crop&w=800&q=80",
        category: "festivals",
        state: "Gujarat",
        featured: false
      },
      {
        title: "Miniature Painting",
        description: "Detailed paintings originating from Rajasthan depicting royal scenes and legends.",
        imageUrl: "https://images.unsplash.com/photo-1585302769412-95fc2b97b6ea?auto=format&fit=crop&w=800&q=80",
        category: "art",
        state: "Rajasthan",
        featured: false
      }
    ];

    culturalItemsData.forEach(item => {
      const id = this.currentCulturalItemId++;
      const newItem: CulturalItem = { ...item, id };
      this.culturalItems.set(id, newItem);
    });

    // Events
    const eventsData: InsertEvent[] = [
      {
        title: "West Indian Art Exhibition",
        description: "Explore traditional and contemporary art forms from Maharashtra, Gujarat, Rajasthan, Madhya Pradesh, and Uttar Pradesh.",
        date: new Date("2025-04-12T10:00:00"),
        month: "April",
        day: 12,
        time: "10:00 AM - 12:00 PM",
        location: "NCC Ground, Bharat Mahotsav",
        category: "art",
        imageUrl: "https://images.unsplash.com/photo-1589181990928-c41e05e94e3d?auto=format&fit=crop&w=800&q=80"
      },
      {
        title: "Classical Dance Performances",
        description: "Witness spectacular performances of Kathak, Lavani, and other classical dance forms from West India.",
        date: new Date("2025-04-12T12:30:00"),
        month: "April",
        day: 12,
        time: "12:30 PM - 2:30 PM",
        location: "NCC Ground, Bharat Mahotsav",
        category: "dance",
        imageUrl: "https://images.unsplash.com/photo-1601122555063-8bacb7d7fe62?auto=format&fit=crop&w=800&q=80"
      },
      {
        title: "Folk Music Celebration",
        description: "Experience the vibrant folk music traditions of West India with renowned performers from five states.",
        date: new Date("2025-04-12T15:00:00"),
        month: "April",
        day: 12,
        time: "3:00 PM - 5:00 PM",
        location: "NCC Ground, Bharat Mahotsav",
        category: "music",
        imageUrl: "https://images.unsplash.com/photo-1623467190349-42a72bf9be78?auto=format&fit=crop&w=800&q=80"
      },
      {
        title: "Traditional Games & Activities",
        description: "Participate in traditional games and interactive cultural activities from West Indian states.",
        date: new Date("2025-04-12T17:00:00"),
        month: "April",
        day: 12,
        time: "5:00 PM - 6:30 PM",
        location: "NCC Ground, Bharat Mahotsav",
        category: "games",
        imageUrl: "https://images.unsplash.com/photo-1511017049469-e4c95cb14391?auto=format&fit=crop&w=800&q=80"
      },
      {
        title: "Cultural Photo Booth",
        description: "Capture memories in traditional West Indian attire at our specially designed cultural photo booth.",
        date: new Date("2025-04-12T17:00:00"),
        month: "April",
        day: 12,
        time: "10:00 AM - 7:00 PM (All Day)",
        location: "NCC Ground, Bharat Mahotsav",
        category: "photobooth",
        imageUrl: "https://images.unsplash.com/photo-1600697228786-f6bcdaba3887?auto=format&fit=crop&w=800&q=80"
      },
      {
        title: "Chief Guest Address & Closing Ceremony",
        description: "Join us for the special address by our Chief Guest and the grand closing ceremony celebrations.",
        date: new Date("2025-04-12T19:00:00"),
        month: "April",
        day: 12,
        time: "7:00 PM - 9:00 PM",
        location: "NCC Ground, Bharat Mahotsav",
        category: "guest",
        imageUrl: "https://images.unsplash.com/photo-1608021880929-848249540eaf?auto=format&fit=crop&w=800&q=80"
      }
    ];

    eventsData.forEach(event => {
      const id = this.currentEventId++;
      const newEvent: Event = { ...event, id };
      this.events.set(id, newEvent);
    });

    // Gallery Items
    const galleryItemsData: InsertGalleryItem[] = [
      {
        title: "Navratri Celebration",
        location: "Gujarat",
        imageUrl: "https://images.unsplash.com/photo-1600697230088-4992c83b2804?auto=format&fit=crop&w=600&q=80",
        category: "festivals"
      },
      {
        title: "Kathak Performance",
        location: "Rajasthan",
        imageUrl: "https://images.unsplash.com/photo-1601122555063-8bacb7d7fe62?auto=format&fit=crop&w=600&q=80",
        category: "performances"
      },
      {
        title: "Traditional Pottery",
        location: "Gujarat",
        imageUrl: "https://images.unsplash.com/photo-1621494945782-07f82c6e801a?auto=format&fit=crop&w=600&q=80",
        category: "artifacts"
      },
      {
        title: "Mehrangarh Fort",
        location: "Jodhpur, Rajasthan",
        imageUrl: "https://images.unsplash.com/photo-1530518854187-e91d262d1f18?auto=format&fit=crop&w=600&q=80",
        category: "heritage"
      },
      {
        title: "Diwali Celebration",
        location: "Maharashtra",
        imageUrl: "https://images.unsplash.com/photo-1564546364925-8bdb53be7be8?auto=format&fit=crop&w=600&q=80",
        category: "festivals"
      },
      {
        title: "Ghoomar Dance",
        location: "Rajasthan",
        imageUrl: "https://images.unsplash.com/photo-1601122997668-56b19c59f185?auto=format&fit=crop&w=600&q=80",
        category: "performances"
      },
      {
        title: "Bandhani Textiles",
        location: "Gujarat",
        imageUrl: "https://images.unsplash.com/photo-1623184515089-86dd19cf15a6?auto=format&fit=crop&w=600&q=80",
        category: "artifacts"
      },
      {
        title: "Ranakpur Jain Temple",
        location: "Rajasthan",
        imageUrl: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=600&q=80",
        category: "heritage"
      },
      {
        title: "Holi Festival",
        location: "Maharashtra",
        imageUrl: "https://images.unsplash.com/photo-1552675751-c07817178622?auto=format&fit=crop&w=600&q=80",
        category: "festivals"
      },
      {
        title: "Bharatanatyam Dance",
        location: "Gujarat",
        imageUrl: "https://images.unsplash.com/photo-1583506332248-56c1df9b6505?auto=format&fit=crop&w=600&q=80",
        category: "performances"
      },
      {
        title: "Traditional Jewelry",
        location: "Rajasthan",
        imageUrl: "https://images.unsplash.com/photo-1609144324015-1e9642a2d552?auto=format&fit=crop&w=600&q=80",
        category: "artifacts"
      },
      {
        title: "Gateway of India",
        location: "Mumbai, Maharashtra",
        imageUrl: "https://images.unsplash.com/photo-1566554273541-37a9ca77b91f?auto=format&fit=crop&w=600&q=80",
        category: "heritage"
      }
    ];

    galleryItemsData.forEach(item => {
      const id = this.currentGalleryItemId++;
      const newItem: GalleryItem = { ...item, id };
      this.galleryItems.set(id, newItem);
    });

    // Heritage Info
    const heritageInfoData: InsertHeritageInfo[] = [
      {
        title: "Gujarat",
        description: "Known for vibrant textiles, folk dances like Garba, and distinctive architecture",
        category: "states",
        imageUrl: "https://images.unsplash.com/photo-1585074395785-40818899d711?auto=format&fit=crop&w=800&q=80"
      },
      {
        title: "Maharashtra",
        description: "Home to Warli art, Lavani dance, and diverse cultural traditions",
        category: "states",
        imageUrl: "https://images.unsplash.com/photo-1566554273541-37a9ca77b91f?auto=format&fit=crop&w=800&q=80"
      },
      {
        title: "Rajasthan",
        description: "Famous for its royal heritage, folk music, and colorful festivals",
        category: "states",
        imageUrl: "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=800&q=80"
      },
      {
        title: "Madhya Pradesh",
        description: "Rich in tribal heritage, classical art forms, and historic temples and monuments",
        category: "states",
        imageUrl: "https://images.unsplash.com/photo-1627894486637-b2319cd8b923?auto=format&fit=crop&w=800&q=80"
      },
      {
        title: "Uttar Pradesh",
        description: "Cultural heartland with significant historical sites, classical dance forms, and handicraft traditions",
        category: "states",
        imageUrl: "https://images.unsplash.com/photo-1560690825-5f53025c2caf?auto=format&fit=crop&w=800&q=80"
      },
      {
        title: "Culinary Traditions",
        description: "From Gujarat's sweet-savory balance to Rajasthan's desert-inspired dishes, West Indian cuisine reflects the region's diverse geography and cultural influences.",
        category: "cuisine",
        imageUrl: "https://images.unsplash.com/photo-1602511216792-d785e78567d3?auto=format&fit=crop&w=600&q=80"
      },
      {
        title: "Traditional Attire",
        description: "The colorful ghagras of Rajasthan, the distinctive Navvari sarees of Maharashtra, and Gujarat's mirror-work embroidery showcase regional identity through clothing.",
        category: "attire",
        imageUrl: "https://images.unsplash.com/photo-1600697228786-f6bcdaba3887?auto=format&fit=crop&w=600&q=80"
      },
      {
        title: "Festivals & Celebrations",
        description: "Experience the vibrancy of Navratri in Gujarat, Maharashtra's Ganesh Chaturthi, and the colorful celebrations of Holi and Diwali throughout the region.",
        category: "festivals",
        imageUrl: "https://images.unsplash.com/photo-1590002893550-8b251315b1c1?auto=format&fit=crop&w=600&q=80"
      }
    ];

    heritageInfoData.forEach(info => {
      const id = this.currentHeritageInfoId++;
      const newInfo: HeritageInfo = { ...info, id };
      this.heritageInfo.set(id, newInfo);
    });
  }
}

export const storage = new MemStorage();
