import { BaseStorage, createStorage, StorageType } from '@src/shared/storages/base';

type CurrentAppStorage = BaseStorage<string>;

const storage = createStorage<string>('current-app', '', {
  storageType: StorageType.Local,
});

const currentAppStorage: CurrentAppStorage = {
  ...storage,
};

export default currentAppStorage;
