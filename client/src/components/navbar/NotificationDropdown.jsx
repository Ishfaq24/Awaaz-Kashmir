import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, Check, Trash2, CheckCircle2, MessageSquare, AlertTriangle, UserCheck, Settings, ShieldCheck, MapPin } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { markAsRead, markAllAsRead, deleteNotification } from "../../api/notifications";
import useNotifications from "../../hooks/useNotifications";

const getRelativeTime = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);
  
  if (diffInSeconds < 60) return "Just now";
  
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) return `${diffInMinutes} min ago`;
  
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
  
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays === 1) return "Yesterday";
  if (diffInDays < 7) return `${diffInDays} days ago`;
  
  return date.toLocaleDateString();
};

const getIconForType = (type) => {
  switch (type) {
    case "report": return <AlertTriangle className="text-red-500" size={20} />;
    case "verification": return <ShieldCheck className="text-blue-500" size={20} />;
    case "assignment": return <UserCheck className="text-orange-500" size={20} />;
    case "comment": return <MessageSquare className="text-purple-500" size={20} />;
    case "confirmation": return <CheckCircle2 className="text-green-500" size={20} />;
    case "resolved": return <CheckCircle2 className="text-emerald-500" size={20} />;
    case "system": return <Settings className="text-gray-500" size={20} />;
    default: return <Bell className="text-awaaz-secondary" size={20} />;
  }
};

export default function NotificationDropdown({ clerkId, role }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: notifications = [], isLoading } = useNotifications(clerkId, role);
  
  const unreadCount = notifications.filter(n => !n.isRead).length;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleMarkAllRead = async () => {
    try {
      await markAllAsRead(clerkId, role);
      queryClient.setQueryData(["notifications", clerkId, role], (old) => 
        old?.map(n => ({ ...n, isRead: true }))
      );
    } catch (err) {
      console.error(err);
    }
  };

  const handleNotificationClick = async (notification) => {
    if (!notification.isRead) {
      try {
        await markAsRead(notification._id);
        queryClient.setQueryData(["notifications", clerkId, role], (old) => 
          old?.map(n => n._id === notification._id ? { ...n, isRead: true } : n)
        );
      } catch (err) {
        console.error(err);
      }
    }
    
    setIsOpen(false);
    if (notification.report?._id) {
      navigate(`/reports/${notification.report._id}`);
    }
  };

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    try {
      await deleteNotification(id);
      queryClient.setQueryData(["notifications", clerkId, role], (old) => 
        old?.filter(n => n._id !== id)
      );
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.96 }}
        className="relative w-12 h-12 rounded-2xl bg-awaaz-background border border-awaaz-border flex items-center justify-center transition-colors hover:bg-awaaz-surface"
      >
        <Bell className={unreadCount > 0 ? "animate-pulse" : ""} />
        
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 min-w-[20px] h-5 px-1 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center shadow-lg">
            {unreadCount > 99 ? "99+" : unreadCount}
          </span>
        )}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed right-4 left-4 top-[5.25rem] sm:absolute sm:top-auto sm:left-auto sm:right-0 sm:mt-4 w-auto sm:w-96 max-w-none sm:max-w-[min(24rem,calc(100vw-2rem))] bg-white rounded-3xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.15)] border border-gray-100 overflow-hidden z-[200] flex flex-col"
          >
            {/* Header */}
            <div className="px-6 py-4 border-b border-gray-50 flex items-center justify-between bg-white/50 backdrop-blur-sm z-10 sticky top-0">
              <h3 className="font-bold text-lg flex items-center gap-2">
                Notifications
                {unreadCount > 0 && (
                  <span className="bg-red-100 text-red-600 text-xs py-0.5 px-2 rounded-full">
                    {unreadCount} new
                  </span>
                )}
              </h3>
              
              {unreadCount > 0 && (
                <button 
                  onClick={handleMarkAllRead}
                  className="text-sm text-awaaz-secondary hover:text-awaaz-secondary/80 font-medium flex items-center gap-1 transition-colors"
                >
                  <Check size={16} /> Mark all read
                </button>
              )}
            </div>

            {/* List */}
            <div className="max-h-[400px] overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-gray-200">
              {isLoading ? (
                <div className="p-8 text-center text-gray-400 text-sm animate-pulse">Loading notifications...</div>
              ) : notifications.length === 0 ? (
                <div className="p-12 text-center text-gray-400 flex flex-col items-center gap-3">
                  <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center">
                    <Bell className="text-gray-300" size={32} />
                  </div>
                  <p>You're all caught up!</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-50">
                  {notifications.map((notif) => (
                    <motion.div
                      key={notif._id}
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onClick={() => handleNotificationClick(notif)}
                      className={`relative group cursor-pointer p-4 transition-all hover:bg-gray-50 flex gap-4 ${
                        !notif.isRead ? "bg-blue-50/30" : "bg-white"
                      }`}
                    >
                      {/* Read Indicator */}
                      {!notif.isRead && (
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-12 bg-awaaz-secondary rounded-r-full" />
                      )}

                      {/* Icon */}
                      <div className={`shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm ${
                        !notif.isRead ? "bg-white" : "bg-gray-50"
                      }`}>
                        {getIconForType(notif.type)}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0 pt-1">
                        <div className="flex justify-between items-start mb-1 gap-2">
                          <h4 className={`text-sm truncate pr-4 ${!notif.isRead ? "font-bold text-gray-900" : "font-semibold text-gray-700"}`}>
                            {notif.title}
                          </h4>
                        </div>
                        <p className={`text-sm line-clamp-2 leading-relaxed ${!notif.isRead ? "text-gray-700 font-medium" : "text-gray-500"}`}>
                          {notif.message}
                        </p>
                        <span className="text-xs text-gray-400 mt-2 block font-medium">
                          {getRelativeTime(notif.createdAt)}
                        </span>
                      </div>

                      {/* Delete Button (Hover) */}
                      <button
                        onClick={(e) => handleDelete(e, notif._id)}
                        className="opacity-0 group-hover:opacity-100 absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-xl text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all shadow-sm"
                      >
                        <Trash2 size={16} />
                      </button>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
            
            {/* Footer */}
            {notifications.length > 0 && (
              <div className="p-3 border-t border-gray-50 bg-gray-50/50 text-center">
                <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                  End of notifications
                </span>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
