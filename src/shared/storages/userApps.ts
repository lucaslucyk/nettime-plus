import { BaseStorage, createStorage, StorageType } from '@src/shared/storages/base';

type UserAppsStorage = BaseStorage<string> & {
  setApps: (apps: UserApp[]) => void;
  getApps: () => Promise<UserApp[] | null>;
  clearApps: () => void;
};

interface UserApp {
  name: string;
  kind: string;
  id: string;
}

const storage = createStorage<string>('user-apps', '', {
  storageType: StorageType.Local,
});

const userAppsStorage: UserAppsStorage = {
  ...storage,
  setApps: (apps: UserApp[]) => {
    storage.set(JSON.stringify(apps));
  },
  getApps: async () => {
    const apps = await storage.get();
    // console.log("user apps")
    // console.log(apps)
    const result = apps !== null && apps !== '' ? JSON.parse(apps) : null;
    return result;
  },
  clearApps: () => {
    storage.set("");
  }
};

export default userAppsStorage;
