import { BaseStorage, createStorage, StorageType } from '@src/shared/storages/base';

type AccessTokenStorage = BaseStorage<string>;

const storage = createStorage<string>('access-token', '', {
  storageType: StorageType.Local,
});

const authStorage: AccessTokenStorage = {
  ...storage,
};

export default authStorage;
