declare global {
  interface Window {
    Telegram: {
      WebApp: {
        ready: () => void;
        expand: () => void;
        close: () => void;
        MainButton: {
          text: string;
          color: string;
          textColor: string;
          isVisible: boolean;
          isActive: boolean;
          isProgressVisible: boolean;
          setText: (text: string) => void;
          onClick: (callback: () => void) => void;
          offClick: (callback: () => void) => void;
          show: () => void;
          hide: () => void;
          enable: () => void;
          disable: () => void;
          showProgress: (leaveActive: boolean) => void;
          hideProgress: () => void;
        };
        initData: string;
        initDataUnsafe: {
          query_id: string;
          user: {
            id: number;
            first_name: string;
            last_name?: string;
            username?: string;
            language_code?: string;
            start_param?: string;
          };
          auth_date: number;
          hash: string;
        };
        platform: string;
        version: string;
        colorScheme: string;
        themeParams: {
          bg_color: string;
          text_color: string;
          hint_color: string;
          link_color: string;
          button_color: string;
          button_text_color: string;
          secondary_bg_color: string;
        };
        isExpanded: boolean;
        viewportHeight: number;
        viewportStableHeight: number;
        headerColor: string;
        backgroundColor: string;
        isClosingConfirmationEnabled: boolean;
        setClosingConfirmation: (enabled: boolean) => void;
        setBackgroundColor: (color: string) => void;
        setHeaderColor: (color: string) => void;
        enableClosingConfirmation: () => void;
        disableClosingConfirmation: () => void;
        showPopup: (params: {
          title?: string;
          message: string;
          buttons?: Array<{
            id: string;
            type: 'default' | 'ok' | 'close' | 'cancel' | 'destructive';
            text: string;
          }>;
        }) => void;
        showAlert: (message: string) => void;
        showConfirm: (message: string) => void;
        showScanQrPopup: (params: {
          text?: string;
        }) => void;
        closeScanQrPopup: () => void;
        readTextFromClipboard: () => Promise<string>;
        writeTextToClipboard: (text: string) => Promise<void>;
        openTelegramLink: (url: string) => void;
        openLink: (url: string) => void;
        openInvoice: (params: {
          url: string;
        }) => void;
      };
    };
  }
}

export const initTelegramWebApp = () => {
  if (window.Telegram?.WebApp) {
    window.Telegram.WebApp.ready();
    window.Telegram.WebApp.expand();
  }
};

export const getTelegramUser = () => {
  if (window.Telegram?.WebApp?.initDataUnsafe?.user) {
    return window.Telegram.WebApp.initDataUnsafe.user;
  }
  return null;
};

export const showTelegramAlert = (message: string) => {
  if (window.Telegram?.WebApp) {
    window.Telegram.WebApp.showAlert(message);
  }
};

export const showTelegramConfirm = (message: string): Promise<boolean> => {
  return new Promise((resolve) => {
    if (window.Telegram?.WebApp) {
      window.Telegram.WebApp.showConfirm(message);
      resolve(true);
    } else {
      resolve(false);
    }
  });
};

export const setTelegramMainButton = (text: string, onClick: () => void) => {
  if (window.Telegram?.WebApp?.MainButton) {
    const mainButton = window.Telegram.WebApp.MainButton;
    mainButton.text = text;
    mainButton.onClick(onClick);
    mainButton.show();
  }
};

export const hideTelegramMainButton = () => {
  if (window.Telegram?.WebApp?.MainButton) {
    window.Telegram.WebApp.MainButton.hide();
  }
}; 