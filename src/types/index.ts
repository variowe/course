export interface User {
  id: number;
  firstName: string;
  lastName?: string;
  username?: string;
  languageCode?: string;
}

export interface Lesson {
  id: number;
  title: string;
  description: string;
  content: string;
  audioUrl?: string;
  progress: number;
  image?: string;
}

export interface HomeworkTask {
  id: number;
  title: string;
  description: string;
  deadline: string;
  type: 'text' | 'voice';
  status: 'pending' | 'submitted' | 'graded';
  submission?: string;
  grade?: number;
  feedback?: string;
}

export interface Achievement {
  id: number;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: string;
}

export interface UserProgress {
  level: number;
  experience: number;
  nextLevel: number;
  completedLessons: number;
  totalLessons: number;
  streak: number;
  achievements: Achievement[];
}

export interface AudioRecording {
  id: string;
  url: string;
  duration: number;
  createdAt: string;
}

export interface TelegramWebApp {
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
    user: User;
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
} 