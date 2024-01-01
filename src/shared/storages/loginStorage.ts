import { BaseStorage, createStorage, StorageType } from '@src/shared/storages/base';

type Logged = 'false' | 'true';

type LoggedStorage = BaseStorage<Logged> & {
  toggle: () => void;
};

const storage = createStorage<Logged>('logged-key', 'false', {
  storageType: StorageType.Local,
});

const logginStorage: LoggedStorage = {
  ...storage,
  // TODO: extends your own methods
  toggle: () => {
    storage.set(currentLogged => {
      return currentLogged === 'false' ? 'true' : 'false';
    });
  },
};

export default logginStorage;
