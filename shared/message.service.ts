import { supabase } from "./supabase";
import type { Database } from "./database.types";

type MessageRow = Database["public"]["Tables"]["messages"]["Row"];
type ConversationRow = Database["public"]["Tables"]["conversations"]["Row"];

export interface Message extends MessageRow {
  sender_name?: string;
  recipient_name?: string;
}

export interface Conversation extends ConversationRow {
  business_name?: string;
  business_image?: string;
  last_message?: string;
}

class MessageService {
  /**
   * Send a message
   */
  async sendMessage(senderId: string, recipientId: string, content: string) {
    try {
      const { data, error } = await supabase
        .from("messages")
        .insert([{ sender_id: senderId, recipient_id: recipientId, content }])
        .select()
        .single();

      if (error) {
        throw error;
      }

      // Update or create conversation
      await this.updateConversation(senderId, recipientId, data.id);

      return { data, error: null };
    } catch (err) {
      return {
        data: null,
        error: err instanceof Error ? err.message : "Failed to send message",
      };
    }
  }

  /**
   * Get messages between two users (conversation)
   */
  async getConversationMessages(userId: string, otherUserId: string) {
    try {
      const { data, error } = await supabase
        .from("messages")
        .select("*")
        .or(
          `and(sender_id.eq.${userId},recipient_id.eq.${otherUserId}),and(sender_id.eq.${otherUserId},recipient_id.eq.${userId})`
        )
        .order("created_at", { ascending: true });

      if (error) {
        throw error;
      }

      return { data: data || [], error: null };
    } catch (err) {
      return {
        data: [],
        error: err instanceof Error ? err.message : "Failed to fetch messages",
      };
    }
  }

  /**
   * Get all conversations for a user
   */
  async getUserConversations(userId: string) {
    try {
      const { data, error } = await supabase
        .from("conversations")
        .select("*, businesses(name, image_url), messages(content)")
        .eq("user_id", userId)
        .order("updated_at", { ascending: false });

      if (error) {
        throw error;
      }

      return { data: data || [], error: null };
    } catch (err) {
      return {
        data: [],
        error: err instanceof Error ? err.message : "Failed to fetch conversations",
      };
    }
  }

  /**
   * Get or create conversation
   */
  async getOrCreateConversation(userId: string, businessId: string) {
    try {
      let { data: conversation, error } = await supabase
        .from("conversations")
        .select("*")
        .eq("user_id", userId)
        .eq("business_id", businessId)
        .single();

      if (error && error.code === "PGRST116") {
        // Conversation doesn't exist, create it
        const { data: newConversation, error: createError } = await supabase
          .from("conversations")
          .insert([{ user_id: userId, business_id: businessId }])
          .select()
          .single();

        if (createError) {
          throw createError;
        }

        conversation = newConversation;
      } else if (error) {
        throw error;
      }

      return { data: conversation, error: null };
    } catch (err) {
      return {
        data: null,
        error: err instanceof Error ? err.message : "Failed to get conversation",
      };
    }
  }

  /**
   * Update conversation (set last message and unread count)
   */
  private async updateConversation(
    userId: string,
    otherUserId: string,
    messageId: string
  ) {
    try {
      // Find the business associated with other user
      const { data: business } = await supabase
        .from("businesses")
        .select("id")
        .eq("user_id", otherUserId)
        .single();

      if (business) {
        await supabase
          .from("conversations")
          .update({ last_message_id: messageId })
          .eq("user_id", userId)
          .eq("business_id", business.id);
      }
    } catch (err) {
      console.error("Failed to update conversation:", err);
    }
  }

  /**
   * Mark message as read
   */
  async markAsRead(messageId: string) {
    try {
      const { error } = await supabase
        .from("messages")
        .update({ read: true })
        .eq("id", messageId);

      if (error) {
        throw error;
      }

      return { error: null };
    } catch (err) {
      return {
        error: err instanceof Error ? err.message : "Failed to mark as read",
      };
    }
  }

  /**
   * Mark all messages in conversation as read
   */
  async markConversationAsRead(userId: string, otherUserId: string) {
    try {
      const { error } = await supabase
        .from("messages")
        .update({ read: true })
        .eq("recipient_id", userId)
        .eq("sender_id", otherUserId);

      if (error) {
        throw error;
      }

      return { error: null };
    } catch (err) {
      return {
        error: err instanceof Error ? err.message : "Failed to mark as read",
      };
    }
  }

  /**
   * Get unread message count for user
   */
  async getUnreadCount(userId: string) {
    try {
      const { data, error } = await supabase
        .from("messages")
        .select("id")
        .eq("recipient_id", userId)
        .eq("read", false);

      if (error) {
        throw error;
      }

      return { count: data?.length || 0, error: null };
    } catch (err) {
      return {
        count: 0,
        error: err instanceof Error ? err.message : "Failed to get unread count",
      };
    }
  }

  /**
   * Delete a message
   */
  async deleteMessage(messageId: string) {
    try {
      const { error } = await supabase
        .from("messages")
        .delete()
        .eq("id", messageId);

      if (error) {
        throw error;
      }

      return { error: null };
    } catch (err) {
      return {
        error: err instanceof Error ? err.message : "Failed to delete message",
      };
    }
  }
}

export const messageService = new MessageService();
