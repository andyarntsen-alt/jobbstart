"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  ArrowLeft,
  Users,
  CreditCard,
  TrendingUp,
  Shield,
  Save,
  Loader2,
  Search,
} from "lucide-react";
import { useAuth } from "@/components/AuthProvider";
import { getSupabaseClient } from "@/lib/supabase/client";
import type { PlanId } from "@/lib/plans";

// Types
interface Stats {
  totalUsers: number;
  planBreakdown: Record<string, number>;
  totalPurchases: number;
  totalRevenue: number;
  recentPurchases: Purchase[];
}

interface UserProfile {
  id: string;
  email: string;
  plan: string;
  is_admin: boolean;
  applications_remaining: number;
  applications_used: number;
  improve_experience_used: number;
  free_trial_used: boolean;
  purchased_at: string | null;
  created_at: string;
}

interface Purchase {
  id: string;
  user_id: string | null;
  plan: string;
  amount: number;
  currency: string;
  stripe_session_id: string;
  stripe_email: string | null;
  created_at: string;
}

interface UserDetail {
  profile: UserProfile;
  purchases: Purchase[];
  applications: { id: string; job_title: string | null; template: string; created_at: string }[];
}

type Tab = "oversikt" | "brukere" | "kjop";

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("nb-NO", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function formatKr(ore: number): string {
  return `${(ore / 100).toLocaleString("nb-NO")} kr`;
}

function planBadgeColor(plan: string): string {
  switch (plan) {
    case "max": return "bg-foreground text-background";
    case "standard": return "bg-foreground/80 text-background";
    case "enkel": return "bg-foreground/20 text-foreground";
    default: return "bg-foreground/10 text-foreground/60";
  }
}

async function getAuthHeaders(): Promise<HeadersInit> {
  const supabase = getSupabaseClient();
  if (!supabase) return {};
  const { data: { session } } = await supabase.auth.getSession();
  if (!session?.access_token) return {};
  return {
    Authorization: `Bearer ${session.access_token}`,
    "Content-Type": "application/json",
  };
}

export default function AdminPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();

  const [tab, setTab] = useState<Tab>("oversikt");
  const [isAdmin, setIsAdmin] = useState(false);
  const [checking, setChecking] = useState(true);

  // Stats
  const [stats, setStats] = useState<Stats | null>(null);
  const [statsLoading, setStatsLoading] = useState(false);

  // Users
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [usersLoading, setUsersLoading] = useState(false);
  const [userSearch, setUserSearch] = useState("");

  // Purchases
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [purchasesLoading, setPurchasesLoading] = useState(false);

  // User detail dialog
  const [selectedUser, setSelectedUser] = useState<UserDetail | null>(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [editFields, setEditFields] = useState<{
    plan: PlanId;
    applications_remaining: number;
    applications_used: number;
    improve_experience_used: number;
  } | null>(null);
  const [saving, setSaving] = useState(false);

  // Check admin
  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      setChecking(false);
      return;
    }

    const supabase = getSupabaseClient();
    if (!supabase) {
      setChecking(false);
      return;
    }

    supabase
      .from("profiles")
      .select("is_admin")
      .eq("id", user.id)
      .single()
      .then(({ data }) => {
        setIsAdmin(data?.is_admin ?? false);
        setChecking(false);
      });
  }, [user, authLoading]);

  // Fetch stats
  const fetchStats = useCallback(async () => {
    setStatsLoading(true);
    try {
      const headers = await getAuthHeaders();
      const res = await fetch("/api/admin/stats", { headers });
      if (res.ok) {
        setStats(await res.json());
      }
    } catch { /* ignore */ }
    setStatsLoading(false);
  }, []);

  // Fetch users
  const fetchUsers = useCallback(async () => {
    setUsersLoading(true);
    try {
      const headers = await getAuthHeaders();
      const res = await fetch("/api/admin/users", { headers });
      if (res.ok) {
        const data = await res.json();
        setUsers(data.users);
      }
    } catch { /* ignore */ }
    setUsersLoading(false);
  }, []);

  // Fetch purchases
  const fetchPurchases = useCallback(async () => {
    setPurchasesLoading(true);
    try {
      const headers = await getAuthHeaders();
      const res = await fetch("/api/admin/purchases", { headers });
      if (res.ok) {
        const data = await res.json();
        setPurchases(data.purchases);
      }
    } catch { /* ignore */ }
    setPurchasesLoading(false);
  }, []);

  // Load data when tab changes
  useEffect(() => {
    if (!isAdmin) return;
    if (tab === "oversikt" && !stats) fetchStats();
    if (tab === "brukere" && users.length === 0) fetchUsers();
    if (tab === "kjop" && purchases.length === 0) fetchPurchases();
  }, [tab, isAdmin, stats, users.length, purchases.length, fetchStats, fetchUsers, fetchPurchases]);

  // Open user detail
  async function openUserDetail(userId: string) {
    setDetailLoading(true);
    setSelectedUser(null);
    setEditFields(null);
    try {
      const headers = await getAuthHeaders();
      const res = await fetch(`/api/admin/users/${userId}`, { headers });
      if (res.ok) {
        const data: UserDetail = await res.json();
        setSelectedUser(data);
        setEditFields({
          plan: data.profile.plan as PlanId,
          applications_remaining: data.profile.applications_remaining,
          applications_used: data.profile.applications_used,
          improve_experience_used: data.profile.improve_experience_used,
        });
      }
    } catch { /* ignore */ }
    setDetailLoading(false);
  }

  // Save user changes
  async function saveUser() {
    if (!selectedUser || !editFields) return;
    setSaving(true);
    try {
      const headers = await getAuthHeaders();
      const res = await fetch(`/api/admin/users/${selectedUser.profile.id}`, {
        method: "PATCH",
        headers,
        body: JSON.stringify(editFields),
      });
      if (res.ok) {
        const data = await res.json();
        setSelectedUser({ ...selectedUser, profile: data.profile });
        // Update in list
        setUsers((prev) =>
          prev.map((u) => (u.id === data.profile.id ? data.profile : u))
        );
      }
    } catch { /* ignore */ }
    setSaving(false);
  }

  // Auth guards
  if (authLoading || checking) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-foreground/30" />
      </div>
    );
  }

  if (!user || !isAdmin) {
    router.push("/");
    return null;
  }

  const filteredUsers = userSearch
    ? users.filter(
        (u) =>
          u.email.toLowerCase().includes(userSearch.toLowerCase()) ||
          u.plan.toLowerCase().includes(userSearch.toLowerCase())
      )
    : users;

  const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: "oversikt", label: "Oversikt", icon: <TrendingUp className="h-3.5 w-3.5" /> },
    { id: "brukere", label: "Brukere", icon: <Users className="h-3.5 w-3.5" /> },
    { id: "kjop", label: "Kjop", icon: <CreditCard className="h-3.5 w-3.5" /> },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-black/5 bg-background">
        <div className="mx-auto flex h-[80px] max-w-[1400px] items-center justify-between px-5 md:px-8 lg:px-10">
          <div className="flex items-center gap-3">
            <Link href="/">
              <span className="text-lg font-black uppercase tracking-[-0.05em] text-foreground">
                CV<span className="opacity-40">pilot</span>
              </span>
            </Link>
            <Badge variant="outline" className="gap-1 rounded-none text-[10px] font-bold uppercase tracking-wider">
              <Shield className="h-3 w-3" />
              Admin
            </Badge>
          </div>
          <Button variant="outline" size="sm" className="gap-2 rounded-none" asChild>
            <Link href="/">
              <ArrowLeft className="h-4 w-4" />
              Tilbake
            </Link>
          </Button>
        </div>
      </header>

      <div className="mx-auto max-w-[1400px] px-5 md:px-8 lg:px-10 py-8">
        {/* Tabs */}
        <div className="flex gap-1 border-b border-border mb-8">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex items-center gap-2 px-4 py-3 text-[11px] font-bold uppercase tracking-wider transition-colors border-b-2 -mb-[1px] ${
                tab === t.id
                  ? "border-foreground text-foreground"
                  : "border-transparent text-foreground/40 hover:text-foreground/70"
              }`}
            >
              {t.icon}
              {t.label}
            </button>
          ))}
        </div>

        {/* Oversikt */}
        {tab === "oversikt" && (
          <div className="space-y-8">
            {statsLoading || !stats ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[...Array(4)].map((_, i) => (
                  <Skeleton key={i} className="h-24 rounded-none" />
                ))}
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="border border-border p-5">
                    <span className="industrial-label block mb-2">Brukere</span>
                    <span className="text-3xl font-bold">{stats.totalUsers}</span>
                  </div>
                  <div className="border border-border p-5">
                    <span className="industrial-label block mb-2">Kjop</span>
                    <span className="text-3xl font-bold">{stats.totalPurchases}</span>
                  </div>
                  <div className="border border-border p-5">
                    <span className="industrial-label block mb-2">Inntekt</span>
                    <span className="text-3xl font-bold">{formatKr(stats.totalRevenue)}</span>
                  </div>
                  <div className="border border-border p-5">
                    <span className="industrial-label block mb-2">Planer</span>
                    <div className="space-y-1 mt-1">
                      {Object.entries(stats.planBreakdown).map(([plan, count]) => (
                        <div key={plan} className="flex justify-between text-sm">
                          <span className="text-foreground/60">{plan}</span>
                          <span className="font-bold">{count}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <span className="industrial-label block mb-4">/ Siste kjop</span>
                  {stats.recentPurchases.length > 0 ? (
                    <div className="space-y-1">
                      {stats.recentPurchases.map((p) => (
                        <div
                          key={p.id}
                          className="border border-border p-4 flex items-center justify-between text-sm"
                        >
                          <div className="flex items-center gap-3">
                            <Badge className={`rounded-none text-[10px] ${planBadgeColor(p.plan)}`}>
                              {p.plan.toUpperCase()}
                            </Badge>
                            <span className="text-foreground/60">{p.stripe_email || "Ukjent"}</span>
                          </div>
                          <div className="flex items-center gap-4">
                            <span className="font-bold">{formatKr(p.amount)}</span>
                            <span className="text-foreground/40 text-xs">{formatDate(p.created_at)}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">Ingen kjop enda.</p>
                  )}
                </div>
              </>
            )}
          </div>
        )}

        {/* Brukere */}
        {tab === "brukere" && (
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground/30" />
              <Input
                placeholder="Sok etter e-post eller plan..."
                value={userSearch}
                onChange={(e) => setUserSearch(e.target.value)}
                className="pl-10 rounded-none"
              />
            </div>

            {usersLoading ? (
              <div className="space-y-2">
                {[...Array(5)].map((_, i) => (
                  <Skeleton key={i} className="h-16 rounded-none" />
                ))}
              </div>
            ) : (
              <div className="space-y-1">
                {filteredUsers.map((u) => (
                  <button
                    key={u.id}
                    onClick={() => openUserDetail(u.id)}
                    className="w-full border border-border p-4 flex items-center justify-between hover:bg-white transition-colors text-left"
                  >
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold truncate">{u.email}</span>
                        {u.is_admin && (
                          <Badge variant="outline" className="rounded-none text-[9px]">
                            <Shield className="h-2.5 w-2.5 mr-1" />
                            Admin
                          </Badge>
                        )}
                      </div>
                      <span className="text-[11px] text-muted-foreground">
                        Registrert {formatDate(u.created_at)}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <Badge className={`rounded-none text-[10px] ${planBadgeColor(u.plan)}`}>
                        {u.plan.toUpperCase()}
                      </Badge>
                      <span className="text-xs text-foreground/50">
                        {u.applications_remaining} / {u.applications_remaining + u.applications_used}
                      </span>
                    </div>
                  </button>
                ))}
                {filteredUsers.length === 0 && (
                  <p className="text-sm text-muted-foreground text-center py-8">
                    Ingen brukere funnet.
                  </p>
                )}
              </div>
            )}
          </div>
        )}

        {/* Kjop */}
        {tab === "kjop" && (
          <div className="space-y-1">
            {purchasesLoading ? (
              <div className="space-y-2">
                {[...Array(5)].map((_, i) => (
                  <Skeleton key={i} className="h-16 rounded-none" />
                ))}
              </div>
            ) : purchases.length > 0 ? (
              purchases.map((p) => (
                <div
                  key={p.id}
                  className="border border-border p-4 flex items-center justify-between text-sm"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <Badge className={`rounded-none text-[10px] shrink-0 ${planBadgeColor(p.plan)}`}>
                      {p.plan.toUpperCase()}
                    </Badge>
                    <span className="text-foreground/60 truncate">
                      {p.stripe_email || "Ukjent e-post"}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 shrink-0">
                    <span className="font-bold">{formatKr(p.amount)}</span>
                    <span className="text-foreground/40 text-xs">{formatDate(p.created_at)}</span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground text-center py-8">
                Ingen kjop enda.
              </p>
            )}
          </div>
        )}
      </div>

      {/* User detail dialog */}
      <Dialog
        open={!!selectedUser || detailLoading}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedUser(null);
            setEditFields(null);
          }
        }}
      >
        <DialogContent className="sm:max-w-xl max-h-[85vh] overflow-y-auto border-border rounded-none">
          {detailLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-6 w-6 animate-spin text-foreground/30" />
            </div>
          ) : selectedUser && editFields ? (
            <>
              <DialogHeader>
                <DialogTitle className="text-base">{selectedUser.profile.email}</DialogTitle>
                <DialogDescription className="text-xs">
                  Registrert {formatDate(selectedUser.profile.created_at)}
                  {selectedUser.profile.purchased_at &&
                    ` · Sist kjopt ${formatDate(selectedUser.profile.purchased_at)}`}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6 mt-4">
                {/* Edit fields */}
                <div className="space-y-3">
                  <span className="industrial-label block">/ Rediger</span>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] font-bold uppercase tracking-wider text-foreground/50 block mb-1">
                        Plan
                      </label>
                      <select
                        value={editFields.plan}
                        onChange={(e) =>
                          setEditFields({ ...editFields, plan: e.target.value as PlanId })
                        }
                        className="w-full border border-border bg-background px-3 py-2 text-sm"
                      >
                        <option value="free">Gratis</option>
                        <option value="enkel">Enkel</option>
                        <option value="standard">Standard</option>
                        <option value="max">Max</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-[11px] font-bold uppercase tracking-wider text-foreground/50 block mb-1">
                        Credits igjen
                      </label>
                      <Input
                        type="number"
                        value={editFields.applications_remaining}
                        onChange={(e) =>
                          setEditFields({
                            ...editFields,
                            applications_remaining: parseInt(e.target.value) || 0,
                          })
                        }
                        className="rounded-none"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold uppercase tracking-wider text-foreground/50 block mb-1">
                        Credits brukt
                      </label>
                      <Input
                        type="number"
                        value={editFields.applications_used}
                        onChange={(e) =>
                          setEditFields({
                            ...editFields,
                            applications_used: parseInt(e.target.value) || 0,
                          })
                        }
                        className="rounded-none"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold uppercase tracking-wider text-foreground/50 block mb-1">
                        Improve brukt
                      </label>
                      <Input
                        type="number"
                        value={editFields.improve_experience_used}
                        onChange={(e) =>
                          setEditFields({
                            ...editFields,
                            improve_experience_used: parseInt(e.target.value) || 0,
                          })
                        }
                        className="rounded-none"
                      />
                    </div>
                  </div>

                  <Button
                    onClick={saveUser}
                    disabled={saving}
                    className="gap-2 rounded-none bg-foreground text-background hover:bg-foreground/90"
                  >
                    {saving ? (
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    ) : (
                      <Save className="h-3.5 w-3.5" />
                    )}
                    Lagre endringer
                  </Button>
                </div>

                {/* Purchases */}
                {selectedUser.purchases.length > 0 && (
                  <div>
                    <span className="industrial-label block mb-3">
                      / Kjop ({selectedUser.purchases.length})
                    </span>
                    <div className="space-y-1">
                      {selectedUser.purchases.map((p) => (
                        <div
                          key={p.id}
                          className="border border-border p-3 flex justify-between text-xs"
                        >
                          <div className="flex items-center gap-2">
                            <Badge className={`rounded-none text-[9px] ${planBadgeColor(p.plan)}`}>
                              {p.plan.toUpperCase()}
                            </Badge>
                            <span className="text-foreground/50">{formatDate(p.created_at)}</span>
                          </div>
                          <span className="font-bold">{formatKr(p.amount)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Applications */}
                {selectedUser.applications.length > 0 && (
                  <div>
                    <span className="industrial-label block mb-3">
                      / Soknader ({selectedUser.applications.length})
                    </span>
                    <div className="space-y-1">
                      {selectedUser.applications.map((a) => (
                        <div
                          key={a.id}
                          className="border border-border p-3 flex justify-between text-xs"
                        >
                          <span className="font-medium truncate">
                            {a.job_title || "Uten tittel"}
                          </span>
                          <span className="text-foreground/50 shrink-0 ml-2">
                            {formatDate(a.created_at)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : null}
        </DialogContent>
      </Dialog>
    </div>
  );
}
