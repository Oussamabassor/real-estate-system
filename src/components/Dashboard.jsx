import React, { useState } from "react";
import {
  LineChart,
  BarChart,
  PieChart,
  Pie,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  ChevronRight,
  Home,
  Users,
  Calendar,
  Settings,
  CreditCard,
  Bell,
  Search,
  Menu,
  X,
  ChevronDown,
  TrendingUp,
  Percent,
  Award,
  DollarSign,
  HelpCircle,
  LogOut,
} from "lucide-react";
import { useDashboardData } from '../hooks/useDashboardData';

// Données fictives pour les graphiques
const revenueData = [
  { name: "Jan", revenue: 35000 },
  { name: "Fév", revenue: 42000 },
  { name: "Mar", revenue: 38000 },
  { name: "Avr", revenue: 45000 },
  { name: "Mai", revenue: 52000 },
  { name: "Juin", revenue: 58000 },
];

const occupationData = [
  { name: "Occupé", value: 75 },
  { name: "Libre", value: 25 },
];

const typesData = [
  { name: "Appartements", value: 45 },
  { name: "Maisons", value: 30 },
  { name: "Villas", value: 15 },
  { name: "Lofts", value: 10 },
];

const users = [
  {
    id: 1,
    name: "Sophie Martin",
    email: "sophie.martin@example.com",
    status: "Actif",
    lastLogin: "19/03/2025",
    properties: 3,
  },
  {
    id: 2,
    name: "Thomas Dubois",
    email: "thomas.dubois@example.com",
    status: "Actif",
    lastLogin: "20/03/2025",
    properties: 1,
  },
  {
    id: 3,
    name: "Marie Leclerc",
    email: "marie.leclerc@example.com",
    status: "Inactif",
    lastLogin: "15/02/2025",
    properties: 2,
  },
  {
    id: 4,
    name: "Jean Moreau",
    email: "jean.moreau@example.com",
    status: "Actif",
    lastLogin: "18/03/2025",
    properties: 4,
  },
];

const reservations = [
  {
    id: 1,
    client: "Émilie Dupont",
    property: "Villa Azur",
    type: "Villa",
    duration: "7 jours",
    startDate: "22/03/2025",
    price: "4 800 €",
    status: "Confirmé",
  },
  {
    id: 2,
    client: "Pierre Leroy",
    property: "Appartement Élysée",
    type: "Appartement",
    duration: "3 jours",
    startDate: "21/03/2025",
    price: "960 €",
    status: "En attente",
  },
  {
    id: 3,
    client: "Isabelle Blanc",
    property: "Loft Moderne",
    type: "Loft",
    duration: "5 jours",
    startDate: "24/03/2025",
    price: "1 750 €",
    status: "Confirmé",
  },
  {
    id: 4,
    client: "Michel Rousseau",
    property: "Maison Provence",
    type: "Maison",
    duration: "14 jours",
    startDate: "01/04/2025",
    price: "5 600 €",
    status: "Payé",
  },
];

// Composant principal
const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("dashboard");
  const { data, loading, error, refetch } = useDashboardData();

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="p-4 text-red-600 bg-red-100 rounded-lg">
          Erreur: {error}
          <button 
            onClick={refetch}
            className="px-4 py-2 ml-4 text-white bg-red-600 rounded-lg hover:bg-red-700"
          >
            Réessayer
          </button>
    </div>

      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? "w-64" : "w-20"
        } bg-gray-900 text-white transition-all duration-300 ease-in-out`}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-800">
          <div
            className={`flex items-center ${
              !sidebarOpen && "justify-center w-full"
            }`}
          >
            <Home className="w-6 h-6 text-yellow-400" />
            {sidebarOpen && (
              <span className="ml-3 text-lg font-semibold">LuxeImmo</span>
            )}
          </div>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-gray-400 hover:text-white"
          >
            {sidebarOpen ? (
              <ChevronRight className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
        <nav className="px-2 mt-5">
          <SidebarItem
            icon={<Home />}
            label="Tableau de bord"
            active={activeTab === "dashboard"}
            onClick={() => setActiveTab("dashboard")}
            collapsed={!sidebarOpen}
          />
          <SidebarItem
            icon={<Calendar />}
            label="Réservations"
            active={activeTab === "reservations"}
            onClick={() => setActiveTab("reservations")}
            collapsed={!sidebarOpen}
          />
          <SidebarItem
            icon={<Users />}
            label="Utilisateurs"
            active={activeTab === "users"}
            onClick={() => setActiveTab("users")}
            collapsed={!sidebarOpen}
          />
          <SidebarItem
            icon={<CreditCard />}
            label="Paiements"
            active={activeTab === "payments"}
            onClick={() => setActiveTab("payments")}
            collapsed={!sidebarOpen}
          />
          <SidebarItem
            icon={<Settings />}
            label="Paramètres"
            active={activeTab === "settings"}
            onClick={() => setActiveTab("settings")}
            collapsed={!sidebarOpen}
          />
        </nav>
        <div className="absolute bottom-0 w-full p-4 border-t border-gray-800">
          <div className="flex items-center">
            <div className="flex items-center justify-center w-8 h-8 font-bold text-gray-900 bg-yellow-400 rounded-full">
              A
            </div>
            {sidebarOpen && (
              <div className="ml-3">
                <p className="text-sm font-medium">Admin</p>
                <p className="text-xs text-gray-400">admin@luxeimmo.com</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <div className="z-10 bg-white shadow-lg">
          <div className="flex items-center justify-between h-16 px-6">
            <div className="flex items-center">
              <h1 className="text-2xl font-semibold text-gray-800">
                {activeTab === "dashboard" && "Tableau de bord"}
                {activeTab === "reservations" && "Réservations"}
                {activeTab === "users" && "Utilisateurs"}
                {activeTab === "payments" && "Paiements"}
                {activeTab === "settings" && "Paramètres"}
              </h1>
            </div>
            <div className="flex items-center">
              <div className="relative mr-4"></div>
                <input
                  type="text"
                  placeholder="Rechercher..."
                  className="w-64 py-2 pl-10 pr-4 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-800 focus:border-transparent"
                />
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              </div>
              <button className="relative mr-4">
                <Bell className="w-6 h-6 text-gray-500" />
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <div className="flex items-center justify-center w-8 h-8 font-bold text-white bg-blue-800 rounded-full">
                A
              </div>
            </div>
          </div>
        </div>


        {/* Main Content */}
        <main className="p-6">
          {activeTab === "dashboard" && (
            <DashboardContent 
              loading={loading} 
              data={data}
              refetch={refetch}
            />
          )}
          {activeTab === "reservations" && (
            <ReservationsContent 
              loading={loading} 
              reservations={data.reservations}
              refetch={refetch}
            />
          )}
          {activeTab === "users" && (
            <UsersContent 
              loading={loading} 
              users={data.users}
              refetch={refetch}
            />
          )}
        </main>
      </div>
  );
};

// Composant pour les éléments de la barre latérale
const SidebarItem = ({ icon, label, active, onClick, collapsed }) => {
  return (
    <a
      href="#"
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
      className={`flex items-center px-2 py-3 mt-1 rounded-lg ${
        active
          ? "bg-blue-800 text-white"
          : "text-gray-300 hover:bg-gray-800 hover:text-white"
      } ${collapsed ? "justify-center" : ""}`}
    >
      <div className="flex items-center justify-center w-6 h-6">{icon}</div>
      {!collapsed && <span className="ml-3">{label}</span>}
    </a>
  );
};

// Composant pour le contenu du tableau de bord
const DashboardContent = ({ loading, data, refetch }) => {
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-16 h-16 border-4 border-blue-800 rounded-full border-t-transparent animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Statistiques */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Réservations Totales"
          value={data.stats.totalReservations}
          change={data.stats.reservationsChange}
          icon={<Calendar className="w-6 h-6 text-blue-800" />}
          color="blue"
        />
        <StatCard
          title="Revenus Mensuels"
          value={data.stats.monthlyRevenue}
          change={data.stats.revenueChange}
          icon={<DollarSign className="w-6 h-6 text-green-600" />}
          color="green"
        />
        <StatCard
          title="Taux d'Occupation"
          value={data.stats.occupationRate}
          change={data.stats.occupationChange}
          icon={<Percent className="w-6 h-6 text-purple-600" />}
          color="purple"
        />
        <StatCard
          title="Réservations Premium"
          value={data.stats.premiumReservations}
          change={data.stats.premiumChange}
          icon={<Award className="w-6 h-6 text-yellow-500" />}
          color="yellow"
        />
      </div>

      {/* Graphiques */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="p-6 bg-white shadow-md rounded-xl">
          <h2 className="mb-4 text-lg font-semibold text-gray-800">
            Revenus (6 derniers mois)
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data.revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#1e40af"
                strokeWidth={2}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="p-6 bg-white shadow-md rounded-xl">
            <h2 className="mb-4 text-lg font-semibold text-gray-800">
              Taux d'Occupation
            </h2>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={data.occupationData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  nameKey="name"
                  label
                >
                  {data.occupationData.map((entry, index) => (
                    <Pie
                      key={`cell-${index}`}
                      fill={index === 0 ? "#1e40af" : "#e5e7eb"}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="p-6 bg-white shadow-md rounded-xl">
            <h2 className="mb-4 text-lg font-semibold text-gray-800">
              Types de Biens
            </h2>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={data.typesData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  nameKey="name"
                  label
                >
                  {data.typesData.map((entry, index) => (
                    <Pie
                      key={`cell-${index}`}
                      fill={
                        index === 0
                          ? "#1e40af"
                          : index === 1
                          ? "#3b82f6"
                          : index === 2
                          ? "#93c5fd"
                          : "#dbeafe"
                      }
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Dernières Réservations */}
      <div className="p-6 bg-white shadow-lg rounded-xl">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800">
            Dernières Réservations
          </h2>
          <a
            href="#"
            className="flex items-center text-sm font-medium text-blue-800 hover:text-blue-600"
          >
            Voir toutes <ChevronRight className="w-4 h-4 ml-1" />
          </a>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  Client
                </th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  Propriété
                </th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  Type
                </th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  Durée
                </th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  Prix
                </th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  Statut
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data.reservations.map((reservation) => (
                <tr key={reservation.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">
                      {reservation.client}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-700 whitespace-nowrap">
                    {reservation.property}
                  </td>
                  <td className="px-6 py-4 text-gray-700 whitespace-nowrap">
                    {reservation.type}
                  </td>
                  <td className="px-6 py-4 text-gray-700 whitespace-nowrap">
                    {reservation.duration}
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    {reservation.price}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${
                        reservation.status === "Confirmé"
                          ? "bg-green-100 text-green-800"
                          : reservation.status === "En attente"
                          ? "bg-yellow-100 text-yellow-800"
                          : reservation.status === "Payé"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {reservation.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// Composant pour les cartes de statistiques
const StatCard = ({ title, value, change, icon, color }) => {
  const getColorClass = (color) => {
    switch (color) {
      case "blue":
        return "bg-blue-50 border-blue-800";
      case "green":
        return "bg-green-50 border-green-600";
      case "purple":
        return "bg-purple-50 border-purple-600";
      case "yellow":
        return "bg-yellow-50 border-yellow-500";
      default:
        return "bg-gray-50 border-gray-800";
    }
  };

  return (
    <div
      className={`rounded-xl p-6 shadow-md border-l-4 ${getColorClass(
        color
      )} bg-white`}
    >
      <div className="flex justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="mt-1 text-3xl font-semibold text-gray-900">{value}</p>
        </div>
        <div className="p-2 rounded-full bg-gray-50">{icon}</div>
      </div>
      <div className="flex items-center mt-2 text-sm">
        <TrendingUp className="w-4 h-4 mr-1 text-green-500" />
        <span className="font-medium text-green-500">{change}</span>
        <span className="ml-2 text-gray-500">vs mois précédent</span>
      </div>
    </div>
  );
};

// Composant pour la section des réservations
const ReservationsContent = ({ loading, reservations, refetch }) => {
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-16 h-16 border-4 border-blue-800 rounded-full border-t-transparent animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-800">
          Toutes les réservations
        </h2>
        <div className="flex space-x-2">
          <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-800">
            Filtrer <ChevronDown className="inline w-4 h-4 ml-1" />
          </button>
          <button className="px-4 py-2 text-sm font-medium text-white bg-blue-800 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-800">
            Ajouter une réservation
          </button>
        </div>
      </div>

      <div className="p-6 bg-white shadow-md rounded-xl">
        <div className="flex items-center justify-between mb-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Rechercher une réservation..."
              className="w-64 py-2 pl-10 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-800 focus:border-transparent"
            />
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          </div>
          <div className="flex space-x-2">
            <button className="px-3 py-1 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200">
              Tous
            </button>
            <button className="px-3 py-1 text-sm font-medium text-green-700 bg-green-100 rounded-lg hover:bg-green-200">
              Confirmés
            </button>
            <button className="px-3 py-1 text-sm font-medium text-yellow-700 bg-yellow-100 rounded-lg hover:bg-yellow-200">
              En attente
            </button>
            <button className="px-3 py-1 text-sm font-medium text-blue-700 bg-blue-100 rounded-lg hover:bg-blue-200">
              Payés
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  Client
                </th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  Propriété
                </th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  Type
                </th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  Date d'arrivée
                </th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  Durée
                </th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  Prix
                </th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  Statut
                </th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {reservations.map((reservation) => (
                <tr key={reservation.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">
                      {reservation.client}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-700 whitespace-nowrap">
                    {reservation.property}
                  </td>
                  <td className="px-6 py-4 text-gray-700 whitespace-nowrap">
                    {reservation.type}
                  </td>
                  <td className="px-6 py-4 text-gray-700 whitespace-nowrap">
                    {reservation.startDate}
                  </td>
                  <td className="px-6 py-4 text-gray-700 whitespace-nowrap">
                    {reservation.duration}
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    {reservation.price}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${
                        reservation.status === "Confirmé"
                          ? "bg-green-100 text-green-800"
                          : reservation.status === "En attente"
                          ? "bg-yellow-100 text-yellow-800"
                          : reservation.status === "Payé"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {reservation.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                    <a
                      href="#"
                      className="mr-3 text-blue-800 hover:text-blue-600"
                    >
                      Éditer
                    </a>
                    <a href="#" className="text-red-600 hover:text-red-900">
                      Supprimer
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// Composant pour la section des utilisateurs
const UsersContent = ({ loading, users, refetch }) => {
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-16 h-16 border-4 border-blue-800 rounded-full border-t-transparent animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-800">
          Gestion des utilisateurs
        </h2>
        <div className="flex space-x-2">
          <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-800">
            Filtrer <ChevronDown className="inline w-4 h-4 ml-1" />
          </button>
          <button className="px-4 py-2 text-sm font-medium text-white bg-blue-800 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-800">
            Ajouter un utilisateur
          </button>
        </div>
      </div>

      <div className="p-6 bg-white shadow-md rounded-xl">
        <div className="flex items-center justify-between mb-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Rechercher un utilisateur..."
              className="w-64 py-2 pl-10 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-800 focus:border-transparent"
            />
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          </div>
          <div className="flex space-x-2">
            <button className="px-3 py-1 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200">
              Tous
            </button>
            <button className="px-3 py-1 text-sm font-medium text-green-700 bg-green-100 rounded-lg hover:bg-green-200">
              Actifs
            </button>
            <button className="px-3 py-1 text-sm font-medium text-red-700 bg-red-100 rounded-lg hover:bg-red-200">
              Inactifs
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  Utilisateur
                </th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  Email
                </th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  Statut
                </th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  Dernière connexion
                </th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  Propriétés
                </th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex items-center justify-center w-10 h-10 font-bold text-gray-600 bg-gray-200 rounded-full">
                        {user.name.charAt(0)}
                      </div>
                      <div className="ml-4">
                        <div className="font-medium text-gray-900">
                          {user.name}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-700 whitespace-nowrap">
                    {user.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${
                        user.status === "Actif"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-700 whitespace-nowrap">
                    {user.lastLogin}
                  </td>
                  <td className="px-6 py-4 text-gray-700 whitespace-nowrap">
                    {user.properties}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                    <a
                      href="#"
                      className="mr-3 text-blue-800 hover:text-blue-600"
                    >
                      Éditer
                    </a>
                    <a href="#" className="text-red-600 hover:text-red-900">
                      Supprimer
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
