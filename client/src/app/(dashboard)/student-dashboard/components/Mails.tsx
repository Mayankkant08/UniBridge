"use client";

import { Mail, Archive, Trash2, Star } from "lucide-react";
import { Card, CardContent, CardHeader } from "../../../../../components/ui/card";
import { Button } from "../../../../../components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../../../../../components/ui/avatar";
import { Badge } from "../../../../../components/ui/badge";

const emails = [
  {
    id: 1,
    from: "Dean's Office",
    subject: "Semester Results Notification",
    preview: "Your semester results are now available in the portal...",
    time: "2 hours ago",
    unread: true,
    avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100",
  },
  {
    id: 2,
    from: "Library System",
    subject: "Book Reservation Confirmed",
    preview: "Your reserved book has been confirmed and is ready for pickup...",
    time: "Yesterday",
    unread: true,
    avatar: "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=100",
  },
  {
    id: 3,
    from: "Course Instructor",
    subject: "Assignment Feedback",
    preview: "Great work on your recent assignment! Here is the detailed feedback...",
    time: "3 days ago",
    unread: false,
    avatar: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100",
  },
];

export function Mails() {
  return (
    <Card className="bg-white border-0 shadow-sm" style={{ borderLeft: "4px solid #1E1E1E" }}>
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <h3 className="text-sm font-semibold text-gray-900">Inbox</h3>
        <div className="flex gap-1">
          <Button size="icon" variant="ghost" className="h-8 w-8">
            <Archive className="w-4 h-4 text-gray-400" />
          </Button>
          <Button size="icon" variant="ghost" className="h-8 w-8">
            <Trash2 className="w-4 h-4 text-gray-400" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {emails.map((email) => (
            <div
              key={email.id}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer border"
              style={{ borderColor: email.unread ? "#1E1E1E40" : "#1E1E1E15" }}
            >
              <Avatar className="w-10 h-10">
                <AvatarImage src={email.avatar} />
                <AvatarFallback>{email.from[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className={`text-sm ${email.unread ? "font-semibold" : "font-medium"} text-gray-900 truncate`}>
                    {email.from}
                  </p>
                  {email.unread && (
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  )}
                </div>
                <p className="text-sm text-gray-600 truncate">{email.subject}</p>
                <p className="text-xs text-gray-500 truncate">{email.preview}</p>
              </div>
              <div className="flex flex-col items-end gap-2 ml-2">
                <span className="text-xs text-gray-500">{email.time}</span>
                <Button size="icon" variant="ghost" className="h-6 w-6">
                  <Star className="w-4 h-4 text-gray-400" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
