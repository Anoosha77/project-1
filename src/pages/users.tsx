import { useEffect, useState } from "react";
import { createUser, getUsers, sendEmail } from "@/@core/api/api"; 
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Menu, Mail } from "lucide-react";
import { useSidebar } from "@/components/ui/sidebar";

export default function UserManagement() {
  const { toggleSidebar } = useSidebar();
  const [users, setUsers] = useState<any[]>([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);


  const [selectedUser, setSelectedUser] = useState<any | null>(null);
  const [note, setNote] = useState("");
  const [title, setTitle] = useState(""); 
  const [emailLoading, setEmailLoading] = useState(false);

  const fetchUsers = async () => {
    try {
      const data = await getUsers();
      setUsers(data.users || []);
      setTotalUsers(data.count || 0);
    } catch (err) {
      console.error("Error fetching users:", err);
      toast.error("Failed to fetch users");
    }
  };

  const handleCreateUser = async () => {
    if (!formData.name || !formData.email || !formData.password) {
      toast.error("All fields are required");
      return;
    }
    try {
      setLoading(true);
      await createUser(formData);
      toast.success("User created successfully");
      setFormData({ name: "", email: "", password: "" });
      fetchUsers();
    } catch (err: any) {
      console.error("Error creating user:", err);
      toast.error(err.response?.data?.message || "Failed to create user");
    } finally {
      setLoading(false);
    }
  };

  const handleSendEmail = async () => {
    if (!note.trim()) {
      toast.error("Please enter a note before sending.");
      return;
    }
    if (!title.trim()) {
      toast.error("Please enter a title before sending.");
      return;
    }
    try {
      setEmailLoading(true);

      await sendEmail({
        userId: selectedUser.id,         
        note,
        title, 
      });

      toast.success(`Email sent to ${selectedUser.email}`);
      setNote("");
      setTitle(":tada: Email Notification"); 
      setSelectedUser(null); 
    } catch (err: any) {
      console.error("Error sending email:", err.response || err);
      toast.error(err.response?.data?.message || "Failed to send email");
    } finally {
      setEmailLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="p-6 space-y-6 font-sans bg-[#121212] min-h-screen text-white">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="text-[#00E5FF]"
          >
            <Menu className="w-5 h-5" />
          </Button>
          <h1 className="text-2xl font-bold text-[#00E5FF]">
            Users <span className="text-gray-400 text-lg">({totalUsers})</span>
          </h1>
        </div>

        {/* Create User Dialog */}
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-[#00E5FF] text-black hover:bg-cyan-400">Create User</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md w-full bg-[#1E1E1E] text-white">
            <DialogHeader>
              <DialogTitle className="text-[#00E5FF]">Create a New User</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col gap-3 mt-2">
              <Input
                placeholder="Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="bg-[#2A2A2A] text-white border-gray-600"
              />
              <Input
                placeholder="Email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="bg-[#2A2A2A] text-white border-gray-600"
              />
              <Input
                placeholder="Password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="bg-[#2A2A2A] text-white border-gray-600"
              />
              <DialogFooter>
                <Button
                  onClick={handleCreateUser}
                  disabled={loading}
                  className="w-full bg-[#00E5FF] text-black hover:bg-cyan-400"
                >
                  {loading ? "Creating..." : "Save"}
                </Button>
              </DialogFooter>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Users Table */}
      <div className="overflow-x-auto border border-gray-700 rounded-lg">
        <table className="min-w-full text-left border-collapse">
          <thead className="bg-[#2A2A2A]">
            <tr>
              <th className="px-4 py-2 text-white border-b border-gray-600">#</th>
              <th className="px-4 py-2 text-white border-b border-gray-600">Name</th>
              <th className="px-4 py-2 text-white border-b border-gray-600">Email</th>
              <th className="px-4 py-2 text-white border-b border-gray-600">Verified</th>
              <th className="px-4 py-2 text-white border-b border-gray-600">Created At</th>
              <th className="px-4 py-2 text-white border-b border-gray-600">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user, idx) => (
                <tr key={user.id} className="hover:bg-[#2A2A2A] transition-all">
                  <td className="px-4 py-2 border-b border-gray-600">{idx + 1}</td>
                  <td className="px-4 py-2 border-b border-gray-600">{user.name}</td>
                  <td className="px-4 py-2 border-b border-gray-600">{user.email}</td>
                  <td className="px-4 py-2 border-b border-gray-600">{user.verified ? "Yes" : "No"}</td>
                  <td className="px-4 py-2 border-b border-gray-600">
                    {new Date(user.createdAt).toLocaleString()}
                  </td>
                  <td className="px-4 py-2 border-b border-gray-600">
                    <Button
                      onClick={() => setSelectedUser(user)}
                      className="bg-[#00E5FF] text-black hover:bg-cyan-400 flex items-center gap-2"
                    >
                      <Mail className="w-4 h-4" />
                      Send Email
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-4 py-4 text-center text-gray-400">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Email Dialog */}
      <Dialog open={!!selectedUser} onOpenChange={() => setSelectedUser(null)}>
        <DialogContent className="sm:max-w-md w-full bg-[#1E1E1E] text-white">
          <DialogHeader>
            <DialogTitle className="text-[#00E5FF]">
              Send Email to {selectedUser?.name}
            </DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-3 mt-2">

            {/* Title Input */}
            <Input
              placeholder="Enter email title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-[#2A2A2A] text-white border-gray-600"
            />

            {/* Note Textarea */}
            <Textarea
              placeholder="Write your note..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="bg-[#2A2A2A] text-white border-gray-600"
              rows={4}
            />

            <DialogFooter>
              <Button
                onClick={handleSendEmail}
                disabled={emailLoading}
                className="w-full bg-[#00E5FF] text-black hover:bg-cyan-400"
              >
                {emailLoading ? "Sending..." : "Send Email"}
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
