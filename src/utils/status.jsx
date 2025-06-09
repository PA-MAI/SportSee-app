import axios from 'axios';

let isBackendAvailable = true;
let monitorIntervalId = null;
let isMonitoring = false; // verrou de sécurité pour éviter les doublons
let hasReloaded = false;  // nouveau flag pour éviter plusieurs reloads

/**
 * Ping le backend pour vérifier sa disponibilité.
 * @returns {Promise<boolean>}
 */
const pingBackend = async () => {
  try {
    await axios.get('http://localhost:3000/user/12'); // ping backend
    return true;
  } catch {
    return false;
  }
};

/**
 * Démarre une surveillance automatique du backend si offline
 */
const startBackendMonitor = () => {
  if (isMonitoring) return; // ne pas relancer si déjà actif
  isMonitoring = true;

  monitorIntervalId = setInterval(async () => {
    const status = await pingBackend();
    if (status) {
      console.log('✅ Backend à nouveau disponible.');

      if (!isBackendAvailable && !hasReloaded) {
        // Backend était indisponible, il revient, on reload une seule fois
        hasReloaded = true;
        console.warn('Connexion au serveur à nouveau fonctionnelle, rechargement de la page !');
        location.reload();
      }

      isBackendAvailable = true;
      clearInterval(monitorIntervalId);
      monitorIntervalId = null;
      isMonitoring = false; //débloque le verrou
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
  if (isBackendAvailable !== status) {
    // Reset flag si on détecte un changement de statut
    hasReloaded = false;
  }
  isBackendAvailable = status;

  if (!status) {
    console.warn('Backend indisponible. Démarrage de la surveillance...');
    startBackendMonitor(); // commence à surveiller automatiquement si ce n'est pas déjà en cours
  }

  return status;
};

/**
 * Retourne le statut courant connu du backend
 */
export const getIsBackendAvailable = () => isBackendAvailable;