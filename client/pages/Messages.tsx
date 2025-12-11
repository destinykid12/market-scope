import { AppLayout } from "@/components/layout/AppLayout";
import { MessageSquare, Send, Clock } from "lucide-react";
import { useState } from "react";
import { mockConversations } from "@/services/mockData";

export default function MessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState<
    string | null
  >(null);

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return "now";
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return date.toLocaleDateString();
  };

  if (selectedConversation) {
    const conversation = mockConversations.find(
      (c) => c.id === selectedConversation,
    );
    return (
      <AppLayout headerTitle={conversation?.businessName}>
        <div className="max-w-2xl mx-auto h-full flex flex-col">
          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            <div className="flex justify-start">
              <div className="bg-secondary rounded-lg p-4 max-w-xs">
                <p className="text-foreground text-sm">
                  Hi! How can I help you today?
                </p>
              </div>
            </div>
            <div className="flex justify-end">
              <div className="bg-primary text-white rounded-lg p-4 max-w-xs">
                <p className="text-sm">I'm looking for your services</p>
              </div>
            </div>
            <div className="flex justify-start">
              <div className="bg-secondary rounded-lg p-4 max-w-xs">
                <p className="text-foreground text-sm">
                  Great! Let me know what you need
                </p>
              </div>
            </div>
          </div>

          {/* Input Area */}
          <div className="border-t border-border p-4">
            <div className="flex gap-3">
              <input
                type="text"
                placeholder="Type a message..."
                className="flex-1 px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white text-foreground"
              />
              <button className="px-4 py-3 bg-accent hover:bg-orange-600 text-white rounded-lg transition-colors flex items-center gap-2">
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout headerTitle="Messages">
      <div className="max-w-2xl mx-auto px-4 py-8 lg:py-12">
        {mockConversations.length > 0 ? (
          <div>
            <h2 className="text-xl font-bold text-foreground mb-4">
              Conversations
            </h2>
            <div className="space-y-2">
              {mockConversations.map((conversation) => (
                <button
                  key={conversation.id}
                  onClick={() => setSelectedConversation(conversation.id)}
                  className="w-full flex gap-4 p-4 rounded-lg border border-border hover:bg-secondary transition-colors text-left"
                >
                  {/* Avatar */}
                  <div
                    className={`${conversation.image} w-12 h-12 rounded-full flex-shrink-0`}
                  />

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h3 className="font-semibold text-foreground">
                        {conversation.businessName}
                      </h3>
                      <span className="text-xs text-muted-foreground flex-shrink-0">
                        {formatTime(conversation.timestamp)}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {conversation.lastMessage}
                    </p>
                  </div>

                  {/* Unread Badge */}
                  {conversation.unreadCount > 0 && (
                    <div className="flex items-center justify-center w-6 h-6 rounded-full bg-accent text-white text-xs font-bold flex-shrink-0">
                      {conversation.unreadCount}
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary-50 mx-auto mb-4">
              <MessageSquare className="text-primary" size={32} />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">
              No Messages Yet
            </h2>
            <p className="text-muted-foreground max-w-md mx-auto mb-8">
              Start a conversation with businesses by searching and contacting
              them.
            </p>
            <button className="inline-flex items-center gap-2 bg-accent hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors">
              <Send size={20} />
              Start a Conversation
            </button>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
