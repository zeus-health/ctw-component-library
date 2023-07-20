const SESSION_INACTIVE_TIME_MS = 1000 * 60 * 60; // 1 hour
const SESSION_TIMESTAMP_KEY = "zus:sessionLastActiveTimestamp";
const SESSION_USER_ID_KEY = "zus:sessionUserId";

export class Session {
  static isActive() {
    const timestampStr = localStorage.getItem(SESSION_TIMESTAMP_KEY);
    if (timestampStr) {
      const lastActiveTimestamp = parseInt(timestampStr, 10);
      const now = new Date().getTime();
      return now - SESSION_INACTIVE_TIME_MS > lastActiveTimestamp;
    }
    return false;
  }

  static setSessionLastActiveTimestamp() {
    localStorage.setItem(SESSION_TIMESTAMP_KEY, new Date().getTime().toString());
  }

  static clearSessionLastActiveTimestamp() {
    localStorage.removeItem(SESSION_TIMESTAMP_KEY);
  }

  /**
   * Sets the session user id. If the user id is already set and not of the
   * same value, the active session will be cleared.
   */
  static setSessionUserId(userId: string) {
    const sessionUserId = localStorage.getItem(SESSION_USER_ID_KEY);
    if (sessionUserId !== userId) {
      Session.clearSession();
      localStorage.setItem(SESSION_USER_ID_KEY, userId);
    }
  }

  static clearSession() {
    localStorage.removeItem(SESSION_USER_ID_KEY);
    localStorage.removeItem(SESSION_TIMESTAMP_KEY);
  }
}
