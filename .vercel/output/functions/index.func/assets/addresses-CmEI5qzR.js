import { t as supabase } from "./supabase-Bcm-EwD8.js";
import { n as getSession } from "./auth-DZmPN7vG.js";
import { t as Button } from "./button-Bq5vK6RO.js";
import { useEffect, useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { Loader2, MapPin, Plus, Trash2 } from "lucide-react";
//#region src/routes/account/addresses.tsx?tsr-split=component
function AccountAddresses() {
	const [session, setSession] = useState(null);
	const [addresses, setAddresses] = useState([]);
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
		pincode: ""
	});
	useEffect(() => {
		getSession().then((session) => {
			setSession(session);
			if (session) fetchAddresses(session.user.id);
		});
	}, []);
	async function fetchAddresses(userId) {
		setLoading(true);
		const { data, error } = await supabase.from("user_addresses").select("*").eq("user_id", userId).order("created_at", { ascending: false });
		if (error) {
			console.error("Error fetching addresses:", error);
			setAddresses([]);
		} else setAddresses(data || []);
		setLoading(false);
	}
	async function handleSubmit(e) {
		e.preventDefault();
		if (!session) return;
		setLoading(true);
		const { error } = await supabase.from("user_addresses").insert([{
			user_id: session.user.id,
			...formData
		}]);
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
				pincode: ""
			});
			fetchAddresses(session.user.id);
		}
		setLoading(false);
	}
	async function deleteAddress(id) {
		if (!session) return;
		const { error } = await supabase.from("user_addresses").delete().eq("id", id);
		if (!error) fetchAddresses(session.user.id);
	}
	if (!session) return null;
	return /* @__PURE__ */ jsxs("div", {
		className: "space-y-8",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4",
			children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h1", {
				className: "text-3xl font-serif font-bold text-foreground tracking-wide",
				children: "Addresses"
			}), /* @__PURE__ */ jsx("p", {
				className: "text-muted-foreground mt-2",
				children: "Manage your saved shipping locations."
			})] }), !isAdding && /* @__PURE__ */ jsxs(Button, {
				onClick: () => setIsAdding(true),
				className: "flex items-center gap-2 w-full sm:w-auto",
				children: [/* @__PURE__ */ jsx(Plus, { size: 16 }), " Add New Address"]
			})]
		}), isAdding ? /* @__PURE__ */ jsxs("div", {
			className: "bg-card border border-border p-6 rounded-xl shadow-sm",
			children: [/* @__PURE__ */ jsx("h3", {
				className: "font-semibold text-lg mb-4",
				children: "Add a new address"
			}), /* @__PURE__ */ jsxs("form", {
				onSubmit: handleSubmit,
				className: "space-y-4",
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: "grid grid-cols-1 sm:grid-cols-2 gap-4",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ jsx("label", {
								className: "text-sm font-medium",
								children: "Recipient Name"
							}), /* @__PURE__ */ jsx("input", {
								required: true,
								type: "text",
								className: "w-full h-10 rounded-md border bg-background px-3 py-2 text-sm",
								value: formData.recipient_name,
								onChange: (e) => setFormData({
									...formData,
									recipient_name: e.target.value
								})
							})]
						}), /* @__PURE__ */ jsxs("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ jsx("label", {
								className: "text-sm font-medium",
								children: "Phone Number"
							}), /* @__PURE__ */ jsx("input", {
								required: true,
								type: "tel",
								className: "w-full h-10 rounded-md border bg-background px-3 py-2 text-sm",
								value: formData.phone,
								onChange: (e) => setFormData({
									...formData,
									phone: e.target.value
								})
							})]
						})]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ jsx("label", {
							className: "text-sm font-medium",
							children: "Address Line 1"
						}), /* @__PURE__ */ jsx("input", {
							required: true,
							type: "text",
							className: "w-full h-10 rounded-md border bg-background px-3 py-2 text-sm",
							value: formData.address_line_1,
							onChange: (e) => setFormData({
								...formData,
								address_line_1: e.target.value
							}),
							placeholder: "Flat, House no., Building, Company, Apartment"
						})]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ jsx("label", {
							className: "text-sm font-medium",
							children: "Address Line 2 (Optional)"
						}), /* @__PURE__ */ jsx("input", {
							type: "text",
							className: "w-full h-10 rounded-md border bg-background px-3 py-2 text-sm",
							value: formData.address_line_2,
							onChange: (e) => setFormData({
								...formData,
								address_line_2: e.target.value
							}),
							placeholder: "Area, Street, Sector, Village"
						})]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "grid grid-cols-2 sm:grid-cols-4 gap-4",
						children: [
							/* @__PURE__ */ jsxs("div", {
								className: "space-y-2 col-span-2",
								children: [/* @__PURE__ */ jsx("label", {
									className: "text-sm font-medium",
									children: "City"
								}), /* @__PURE__ */ jsx("input", {
									required: true,
									type: "text",
									className: "w-full h-10 rounded-md border bg-background px-3 py-2 text-sm",
									value: formData.city,
									onChange: (e) => setFormData({
										...formData,
										city: e.target.value
									})
								})]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ jsx("label", {
									className: "text-sm font-medium",
									children: "State"
								}), /* @__PURE__ */ jsx("input", {
									required: true,
									type: "text",
									className: "w-full h-10 rounded-md border bg-background px-3 py-2 text-sm",
									value: formData.state,
									onChange: (e) => setFormData({
										...formData,
										state: e.target.value
									})
								})]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ jsx("label", {
									className: "text-sm font-medium",
									children: "Pincode"
								}), /* @__PURE__ */ jsx("input", {
									required: true,
									type: "text",
									className: "w-full h-10 rounded-md border bg-background px-3 py-2 text-sm",
									value: formData.pincode,
									onChange: (e) => setFormData({
										...formData,
										pincode: e.target.value
									})
								})]
							})
						]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ jsx("label", {
							className: "text-sm font-medium",
							children: "Address Label"
						}), /* @__PURE__ */ jsxs("select", {
							className: "w-full h-10 rounded-md border bg-background px-3 py-2 text-sm",
							value: formData.label,
							onChange: (e) => setFormData({
								...formData,
								label: e.target.value
							}),
							children: [
								/* @__PURE__ */ jsx("option", {
									value: "Home",
									children: "Home"
								}),
								/* @__PURE__ */ jsx("option", {
									value: "Office",
									children: "Office"
								}),
								/* @__PURE__ */ jsx("option", {
									value: "Other",
									children: "Other"
								})
							]
						})]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "pt-4 flex gap-3",
						children: [/* @__PURE__ */ jsxs(Button, {
							type: "submit",
							disabled: loading,
							children: [loading && /* @__PURE__ */ jsx(Loader2, { className: "mr-2 h-4 w-4 animate-spin" }), "Save Address"]
						}), /* @__PURE__ */ jsx(Button, {
							type: "button",
							variant: "outline",
							onClick: () => setIsAdding(false),
							children: "Cancel"
						})]
					})
				]
			})]
		}) : loading ? /* @__PURE__ */ jsx("div", {
			className: "flex justify-center p-12",
			children: /* @__PURE__ */ jsx(Loader2, { className: "h-8 w-8 animate-spin text-primary" })
		}) : addresses.length === 0 ? /* @__PURE__ */ jsxs("div", {
			className: "bg-card border border-border p-12 rounded-xl text-center shadow-sm",
			children: [
				/* @__PURE__ */ jsx(MapPin, { className: "mx-auto h-12 w-12 text-muted-foreground mb-4 opacity-50" }),
				/* @__PURE__ */ jsx("h3", {
					className: "text-lg font-medium mb-2",
					children: "No addresses saved"
				}),
				/* @__PURE__ */ jsx("p", {
					className: "text-muted-foreground mb-6",
					children: "Add an address so you don't have to enter it at checkout."
				}),
				/* @__PURE__ */ jsx(Button, {
					onClick: () => setIsAdding(true),
					variant: "outline",
					children: "Add New Address"
				})
			]
		}) : /* @__PURE__ */ jsx("div", {
			className: "grid grid-cols-1 md:grid-cols-2 gap-6",
			children: addresses.map((address) => /* @__PURE__ */ jsxs("div", {
				className: "bg-card border border-border p-5 rounded-xl shadow-sm relative group",
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: "flex items-center justify-between mb-3",
						children: [/* @__PURE__ */ jsx("span", {
							className: "bg-primary/10 text-primary text-xs font-semibold px-2.5 py-1 rounded-full",
							children: address.label
						}), /* @__PURE__ */ jsx("div", {
							className: "flex gap-2",
							children: /* @__PURE__ */ jsx("button", {
								onClick: () => deleteAddress(address.id),
								className: "text-muted-foreground hover:text-red-500 transition-colors p-1",
								children: /* @__PURE__ */ jsx(Trash2, { size: 16 })
							})
						})]
					}),
					/* @__PURE__ */ jsx("h4", {
						className: "font-semibold text-lg",
						children: address.recipient_name
					}),
					/* @__PURE__ */ jsx("p", {
						className: "text-sm text-muted-foreground mt-1",
						children: address.phone
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "mt-3 text-sm text-foreground/80 space-y-0.5",
						children: [
							/* @__PURE__ */ jsx("p", { children: address.address_line_1 }),
							address.address_line_2 && /* @__PURE__ */ jsx("p", { children: address.address_line_2 }),
							/* @__PURE__ */ jsxs("p", { children: [
								address.city,
								", ",
								address.state,
								" ",
								address.pincode
							] })
						]
					})
				]
			}, address.id))
		})]
	});
}
//#endregion
export { AccountAddresses as component };
