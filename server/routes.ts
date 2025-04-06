import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertSubscriberSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // API Routes
  // All routes are prefixed with /api

  // Get all cultural items
  app.get("/api/cultural-items", async (req, res) => {
    try {
      const items = await storage.getCulturalItems();
      res.json(items);
    } catch (error) {
      res.status(500).json({ message: "Error fetching cultural items" });
    }
  });

  // Get cultural items by category
  app.get("/api/cultural-items/category/:category", async (req, res) => {
    try {
      const { category } = req.params;
      const items = await storage.getCulturalItemsByCategory(category);
      res.json(items);
    } catch (error) {
      res.status(500).json({ message: "Error fetching cultural items by category" });
    }
  });

  // Get a specific cultural item
  app.get("/api/cultural-items/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const item = await storage.getCulturalItem(id);
      
      if (!item) {
        return res.status(404).json({ message: "Cultural item not found" });
      }
      
      res.json(item);
    } catch (error) {
      res.status(500).json({ message: "Error fetching cultural item" });
    }
  });

  // Get all events
  app.get("/api/events", async (req, res) => {
    try {
      const events = await storage.getEvents();
      res.json(events);
    } catch (error) {
      res.status(500).json({ message: "Error fetching events" });
    }
  });

  // Get events by month
  app.get("/api/events/month/:month", async (req, res) => {
    try {
      const { month } = req.params;
      const events = await storage.getEventsByMonth(month);
      res.json(events);
    } catch (error) {
      res.status(500).json({ message: "Error fetching events by month" });
    }
  });

  // Get a specific event
  app.get("/api/events/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const event = await storage.getEvent(id);
      
      if (!event) {
        return res.status(404).json({ message: "Event not found" });
      }
      
      res.json(event);
    } catch (error) {
      res.status(500).json({ message: "Error fetching event" });
    }
  });

  // Get all gallery items
  app.get("/api/gallery-items", async (req, res) => {
    try {
      const items = await storage.getGalleryItems();
      res.json(items);
    } catch (error) {
      res.status(500).json({ message: "Error fetching gallery items" });
    }
  });

  // Get gallery items by category
  app.get("/api/gallery-items/category/:category", async (req, res) => {
    try {
      const { category } = req.params;
      const items = await storage.getGalleryItemsByCategory(category);
      res.json(items);
    } catch (error) {
      res.status(500).json({ message: "Error fetching gallery items by category" });
    }
  });

  // Get a specific gallery item
  app.get("/api/gallery-items/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const item = await storage.getGalleryItem(id);
      
      if (!item) {
        return res.status(404).json({ message: "Gallery item not found" });
      }
      
      res.json(item);
    } catch (error) {
      res.status(500).json({ message: "Error fetching gallery item" });
    }
  });

  // Get all heritage info
  app.get("/api/heritage-info", async (req, res) => {
    try {
      const info = await storage.getHeritageInfo();
      res.json(info);
    } catch (error) {
      res.status(500).json({ message: "Error fetching heritage info" });
    }
  });

  // Get heritage info by category
  app.get("/api/heritage-info/category/:category", async (req, res) => {
    try {
      const { category } = req.params;
      const info = await storage.getHeritageInfoByCategory(category);
      res.json(info);
    } catch (error) {
      res.status(500).json({ message: "Error fetching heritage info by category" });
    }
  });

  // Get a specific heritage info item
  app.get("/api/heritage-info/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const info = await storage.getHeritageInfoItem(id);
      
      if (!info) {
        return res.status(404).json({ message: "Heritage info not found" });
      }
      
      res.json(info);
    } catch (error) {
      res.status(500).json({ message: "Error fetching heritage info" });
    }
  });

  // Get all carousel items
  app.get("/api/carousel-items", async (req, res) => {
    try {
      const items = await storage.getCarouselItems();
      res.json(items);
    } catch (error) {
      res.status(500).json({ message: "Error fetching carousel items" });
    }
  });

  // Subscribe to newsletter
  app.post("/api/subscribe", async (req, res) => {
    try {
      // Validate request body
      const validatedData = insertSubscriberSchema.parse(req.body);
      
      // Check if email already exists
      const existingSubscriber = await storage.getSubscriberByEmail(validatedData.email);
      if (existingSubscriber) {
        return res.status(400).json({ message: "Email already subscribed" });
      }
      
      // Create subscriber
      const subscriber = await storage.createSubscriber(validatedData);
      res.status(201).json({ message: "Successfully subscribed to newsletter", subscriber });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid email address", errors: error.errors });
      }
      res.status(500).json({ message: "Error subscribing to newsletter" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
