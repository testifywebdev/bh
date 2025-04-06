import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User schema
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

// Cultural Item schema
export const culturalItems = pgTable("cultural_items", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url").notNull(),
  category: text("category").notNull(), // art, music, dance, festivals
  state: text("state").notNull(), // Gujarat, Maharashtra, etc.
  featured: boolean("featured").default(false),
});

export const insertCulturalItemSchema = createInsertSchema(culturalItems).omit({
  id: true,
});

// Event schema
export const events = pgTable("events", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  date: timestamp("date").notNull(),
  month: text("month").notNull(), // October, November, etc.
  day: integer("day").notNull(), // 1-31
  time: text("time").notNull(),
  location: text("location").notNull(),
  category: text("category").notNull(), // art, music, dance, festivals
  imageUrl: text("image_url"),
});

export const insertEventSchema = createInsertSchema(events).omit({
  id: true,
});

// Gallery Item schema
export const galleryItems = pgTable("gallery_items", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  location: text("location").notNull(),
  imageUrl: text("image_url").notNull(),
  category: text("category").notNull(), // festivals, performances, artifacts, heritage
});

export const insertGalleryItemSchema = createInsertSchema(galleryItems).omit({
  id: true,
});

// Heritage Information schema
export const heritageInfo = pgTable("heritage_info", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url"),
  category: text("category").notNull(), // states, cuisine, attire, festivals
});

export const insertHeritageInfoSchema = createInsertSchema(heritageInfo).omit({
  id: true,
});

// Carousel Item schema
export const carouselItems = pgTable("carousel_items", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url").notNull(),
  order: integer("order").notNull(),
});

export const insertCarouselItemSchema = createInsertSchema(carouselItems).omit({
  id: true,
});

// Newsletter Subscribers schema
export const subscribers = pgTable("subscribers", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertSubscriberSchema = createInsertSchema(subscribers).pick({
  email: true,
});

// Type definitions
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type CulturalItem = typeof culturalItems.$inferSelect;
export type InsertCulturalItem = z.infer<typeof insertCulturalItemSchema>;

export type Event = typeof events.$inferSelect;
export type InsertEvent = z.infer<typeof insertEventSchema>;

export type GalleryItem = typeof galleryItems.$inferSelect;
export type InsertGalleryItem = z.infer<typeof insertGalleryItemSchema>;

export type HeritageInfo = typeof heritageInfo.$inferSelect;
export type InsertHeritageInfo = z.infer<typeof insertHeritageInfoSchema>;

export type CarouselItem = typeof carouselItems.$inferSelect;
export type InsertCarouselItem = z.infer<typeof insertCarouselItemSchema>;

export type Subscriber = typeof subscribers.$inferSelect;
export type InsertSubscriber = z.infer<typeof insertSubscriberSchema>;
