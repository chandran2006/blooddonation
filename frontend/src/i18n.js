import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      // Navigation
      "dashboard": "Dashboard",
      "profile": "Profile",
      "logout": "Logout",
      "manageUsers": "Manage Users",
      "createRequest": "Create Request",
      
      // Common
      "loading": "Loading...",
      "save": "Save",
      "cancel": "Cancel",
      "delete": "Delete",
      "edit": "Edit",
      "search": "Search",
      "filter": "Filter",
      "reset": "Reset",
      
      // Auth
      "login": "Login",
      "signup": "Sign Up",
      "email": "Email",
      "password": "Password",
      "name": "Name",
      "phone": "Phone",
      "city": "City",
      "role": "Role",
      
      // Blood
      "bloodGroup": "Blood Group",
      "donor": "Donor",
      "patient": "Patient",
      "hospital": "Hospital",
      "admin": "Admin",
      
      // Requests
      "patientName": "Patient Name",
      "hospitalName": "Hospital Name",
      "urgency": "Urgency",
      "status": "Status",
      "emergency": "Emergency",
      "normal": "Normal",
      "pending": "Pending",
      "accepted": "Accepted",
      "completed": "Completed",
      
      // Messages
      "welcome": "Welcome to Blood Donation System",
      "saveLives": "Save Lives, Donate Blood",
      "noData": "No data available",
      "success": "Success",
      "error": "Error",
    }
  },
  es: {
    translation: {
      "dashboard": "Tablero",
      "profile": "Perfil",
      "logout": "Cerrar Sesión",
      "manageUsers": "Gestionar Usuarios",
      "createRequest": "Crear Solicitud",
      
      "loading": "Cargando...",
      "save": "Guardar",
      "cancel": "Cancelar",
      "delete": "Eliminar",
      "edit": "Editar",
      "search": "Buscar",
      "filter": "Filtrar",
      "reset": "Restablecer",
      
      "login": "Iniciar Sesión",
      "signup": "Registrarse",
      "email": "Correo Electrónico",
      "password": "Contraseña",
      "name": "Nombre",
      "phone": "Teléfono",
      "city": "Ciudad",
      "role": "Rol",
      
      "bloodGroup": "Grupo Sanguíneo",
      "donor": "Donante",
      "patient": "Paciente",
      "hospital": "Hospital",
      "admin": "Administrador",
      
      "patientName": "Nombre del Paciente",
      "hospitalName": "Nombre del Hospital",
      "urgency": "Urgencia",
      "status": "Estado",
      "emergency": "Emergencia",
      "normal": "Normal",
      "pending": "Pendiente",
      "accepted": "Aceptado",
      "completed": "Completado",
      
      "welcome": "Bienvenido al Sistema de Donación de Sangre",
      "saveLives": "Salva Vidas, Dona Sangre",
      "noData": "No hay datos disponibles",
      "success": "Éxito",
      "error": "Error",
    }
  },
  fr: {
    translation: {
      "dashboard": "Tableau de Bord",
      "profile": "Profil",
      "logout": "Déconnexion",
      "manageUsers": "Gérer les Utilisateurs",
      "createRequest": "Créer une Demande",
      
      "loading": "Chargement...",
      "save": "Enregistrer",
      "cancel": "Annuler",
      "delete": "Supprimer",
      "edit": "Modifier",
      "search": "Rechercher",
      "filter": "Filtrer",
      "reset": "Réinitialiser",
      
      "login": "Connexion",
      "signup": "S'inscrire",
      "email": "Email",
      "password": "Mot de Passe",
      "name": "Nom",
      "phone": "Téléphone",
      "city": "Ville",
      "role": "Rôle",
      
      "bloodGroup": "Groupe Sanguin",
      "donor": "Donneur",
      "patient": "Patient",
      "hospital": "Hôpital",
      "admin": "Administrateur",
      
      "patientName": "Nom du Patient",
      "hospitalName": "Nom de l'Hôpital",
      "urgency": "Urgence",
      "status": "Statut",
      "emergency": "Urgence",
      "normal": "Normal",
      "pending": "En Attente",
      "accepted": "Accepté",
      "completed": "Terminé",
      
      "welcome": "Bienvenue au Système de Don de Sang",
      "saveLives": "Sauvez des Vies, Donnez du Sang",
      "noData": "Aucune donnée disponible",
      "success": "Succès",
      "error": "Erreur",
    }
  },
  hi: {
    translation: {
      "dashboard": "डैशबोर्ड",
      "profile": "प्रोफ़ाइल",
      "logout": "लॉग आउट",
      "manageUsers": "उपयोगकर्ता प्रबंधित करें",
      "createRequest": "अनुरोध बनाएं",
      
      "loading": "लोड हो रहा है...",
      "save": "सहेजें",
      "cancel": "रद्द करें",
      "delete": "हटाएं",
      "edit": "संपादित करें",
      "search": "खोजें",
      "filter": "फ़िल्टर",
      "reset": "रीसेट",
      
      "login": "लॉगिन",
      "signup": "साइन अप",
      "email": "ईमेल",
      "password": "पासवर्ड",
      "name": "नाम",
      "phone": "फोन",
      "city": "शहर",
      "role": "भूमिका",
      
      "bloodGroup": "रक्त समूह",
      "donor": "दाता",
      "patient": "रोगी",
      "hospital": "अस्पताल",
      "admin": "व्यवस्थापक",
      
      "patientName": "रोगी का नाम",
      "hospitalName": "अस्पताल का नाम",
      "urgency": "तात्कालिकता",
      "status": "स्थिति",
      "emergency": "आपातकाल",
      "normal": "सामान्य",
      "pending": "लंबित",
      "accepted": "स्वीकृत",
      "completed": "पूर्ण",
      
      "welcome": "रक्तदान प्रणाली में आपका स्वागत है",
      "saveLives": "जीवन बचाएं, रक्तदान करें",
      "noData": "कोई डेटा उपलब्ध नहीं",
      "success": "सफलता",
      "error": "त्रुटि",
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: localStorage.getItem('language') || 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
