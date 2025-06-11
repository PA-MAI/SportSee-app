import axios from 'axios';

let isBackendAvailable = true;
let monitorIntervalId = null;
let isMonitoring = false;  // Verrou pour éviter les tests simultanés
let hasReloaded = false;   // Évite les rechargements multiples

/**
 * Ping le backend pour vérifier sa disponibilité.
 * @returns {Promise<boolean>}
 */
const pingBackend = async () => {
  try {
    await axios.get('http://localhost:3000/user/12');
    return true;
  } catch {
    return false;
  }
};

/**
 * Gère les changements de statut du backend.
 * Met à jour les flags et déclenche un reload si nécessaire.
 * @param {boolean} newStatus
 */
const handleBackendStatusChange = (newStatus) => {
  if (isBackendAvailable !== newStatus) {
    hasReloaded = false; // reset si changement de statut
  }

  // Si le backend redevient disponible après une coupure
  if (!isBackendAvailable && newStatus && !hasReloaded) {
    console.warn('Connexion au serveur à nouveau fonctionnelle, rechargement de la page !');
    hasReloaded = true;
    location.reload();
  }

  isBackendAvailable = newStatus;
};

/**
 * Démarre une surveillance automatique toutes les 60s du backend si offline
 */
const startBackendMonitor = () => {
  if (isMonitoring) return; // Ne pas relancer si déjà actif
  isMonitoring = true;

  monitorIntervalId = setInterval(async () => {
    const status = await pingBackend();
    handleBackendStatusChange(status);

    if (status) {
      console.log('✅ Backend à nouveau disponible.');
      clearInterval(monitorIntervalId);
      monitorIntervalId = null;
      isMonitoring = false;
    }
  }, 60000); // ping toutes les 60 secondes
};

/**
 * Vérifie si le backend est disponible.
 * Lance un suivi si offline.
 * @returns {Promise<boolean>}
 */
export const checkBackendStatus = async () => {
  const status = await pingBackend();
  handleBackendStatusChange(status);

  if (!status) {
    console.warn('Backend indisponible. Démarrage de la surveillance...');
    startBackendMonitor();
  }

  return status;
};

/**
 * Retourne le statut courant connu du backend
 */
export const getIsBackendAvailable = () => isBackendAvailable;