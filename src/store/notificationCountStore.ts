import {create} from 'zustand';

type NotificationCountStore = {
  unreadCount: number;
  setUnreadCount: (count: number) => void;
};

const useNotificationCountStore = create<NotificationCountStore>(set => ({
  unreadCount: 0,
  setUnreadCount: count => set({unreadCount: count}),
}));

export default useNotificationCountStore;
