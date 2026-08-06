import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { getSession } from "../../lib/auth";
import { Session } from "@supabase/supabase-js";
import { Button } from "../../components/ui/button";
import { Loader2, Plus, MapPin, Trash2, Edit2 } from "lucide-react";

export const Route = createFileRoute("/account/addresses")({
  component: AccountAddresses,
});

function AccountAddresses() {
  const [session, setSession] = useState<Session | null>(null);
  const [addresses, setAddresses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({
    label: "Home",
    recipient_name: "",
    phone: "",
    address_line_1: "",
    address_line_2: "",
    city: "",
    state: "",
    pincode: "",
  });

  useEffect(() => {
    getSession().then((session) => {
      setSession(session);
      if (session) fetchAddresses(session.user.id);
    });
  }, []);

  async function fetchAddresses(userId: string) {
    setLoading(true);
    const { data, error } = await supabase
      .from("user_addresses")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching addresses:", error);
      // Fallback if table doesn't exist yet
      setAddresses([]);
    } else {
      setAddresses(data || []);
    }
    setLoading(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!session) return;
    
    setLoading(true);
    const { error } = await supabase.from("user_addresses").insert([
      {
        user_id: session.user.id,
        ...formData
      }
    ]);
    
    if (error) {
      alert("Error saving address: " + error.message);
      console.error(error);
    } else {
      setIsAdding(false);
      setFormData({
        label: "Home",
        recipient_name: "",
        phone: "",
        address_line_1: "",
        address_line_2: "",
        city: "",
        state: "",
        pincode: "",
      });
      fetchAddresses(session.user.id);
    }
    setLoading(false);
  }

  async function deleteAddress(id: string) {
    if (!session) return;
    const { error } = await supabase.from("user_addresses").delete().eq("id", id);
    if (!error) {
      fetchAddresses(session.user.id);
    }
  }

  if (!session) return null;

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif font-bold text-foreground tracking-wide">Addresses</h1>
          <p className="text-muted-foreground mt-2">Manage your saved shipping locations.</p>
        </div>
        {!isAdding && (
          <Button onClick={() => setIsAdding(true)} className="flex items-center gap-2 w-full sm:w-auto">
            <Plus size={16} /> Add New Address
          </Button>
        )}
      </div>
      
      {isAdding ? (
        <div className="bg-card border border-border p-6 rounded-xl shadow-sm">
          <h3 className="font-semibold text-lg mb-4">Add a new address</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Recipient Name</label>
                <input required type="text" className="w-full h-10 rounded-md border bg-background px-3 py-2 text-sm" value={formData.recipient_name} onChange={(e) => setFormData({...formData, recipient_name: e.target.value})} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Phone Number</label>
                <input required type="tel" className="w-full h-10 rounded-md border bg-background px-3 py-2 text-sm" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Address Line 1</label>
              <input required type="text" className="w-full h-10 rounded-md border bg-background px-3 py-2 text-sm" value={formData.address_line_1} onChange={(e) => setFormData({...formData, address_line_1: e.target.value})} placeholder="Flat, House no., Building, Company, Apartment" />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Address Line 2 (Optional)</label>
              <input type="text" className="w-full h-10 rounded-md border bg-background px-3 py-2 text-sm" value={formData.address_line_2} onChange={(e) => setFormData({...formData, address_line_2: e.target.value})} placeholder="Area, Street, Sector, Village" />
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="space-y-2 col-span-2">
                <label className="text-sm font-medium">City</label>
                <input required type="text" className="w-full h-10 rounded-md border bg-background px-3 py-2 text-sm" value={formData.city} onChange={(e) => setFormData({...formData, city: e.target.value})} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">State</label>
                <input required type="text" className="w-full h-10 rounded-md border bg-background px-3 py-2 text-sm" value={formData.state} onChange={(e) => setFormData({...formData, state: e.target.value})} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Pincode</label>
                <input required type="text" className="w-full h-10 rounded-md border bg-background px-3 py-2 text-sm" value={formData.pincode} onChange={(e) => setFormData({...formData, pincode: e.target.value})} />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Address Label</label>
              <select className="w-full h-10 rounded-md border bg-background px-3 py-2 text-sm" value={formData.label} onChange={(e) => setFormData({...formData, label: e.target.value})}>
                <option value="Home">Home</option>
                <option value="Office">Office</option>
                <option value="Other">Other</option>
              </select>
            </div>
            
            <div className="pt-4 flex gap-3">
              <Button type="submit" disabled={loading}>
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Save Address
              </Button>
              <Button type="button" variant="outline" onClick={() => setIsAdding(false)}>
                Cancel
              </Button>
            </div>
          </form>
        </div>
      ) : loading ? (
        <div className="flex justify-center p-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : addresses.length === 0 ? (
        <div className="bg-card border border-border p-12 rounded-xl text-center shadow-sm">
          <MapPin className="mx-auto h-12 w-12 text-muted-foreground mb-4 opacity-50" />
          <h3 className="text-lg font-medium mb-2">No addresses saved</h3>
          <p className="text-muted-foreground mb-6">Add an address so you don't have to enter it at checkout.</p>
          <Button onClick={() => setIsAdding(true)} variant="outline">
            Add New Address
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {addresses.map((address) => (
            <div key={address.id} className="bg-card border border-border p-5 rounded-xl shadow-sm relative group">
              <div className="flex items-center justify-between mb-3">
                <span className="bg-primary/10 text-primary text-xs font-semibold px-2.5 py-1 rounded-full">
                  {address.label}
                </span>
                <div className="flex gap-2">
                  <button onClick={() => deleteAddress(address.id)} className="text-muted-foreground hover:text-red-500 transition-colors p-1">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              <h4 className="font-semibold text-lg">{address.recipient_name}</h4>
              <p className="text-sm text-muted-foreground mt-1">{address.phone}</p>
              <div className="mt-3 text-sm text-foreground/80 space-y-0.5">
                <p>{address.address_line_1}</p>
                {address.address_line_2 && <p>{address.address_line_2}</p>}
                <p>{address.city}, {address.state} {address.pincode}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
