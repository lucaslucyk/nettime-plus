import themeStorage from '@src/shared/storages/themeStorage';

async function toggleTheme() {
  console.log('initial theme', await themeStorage.get());
  themeStorage.toggle();
  console.log('toggled theme', await themeStorage.get());
}

void toggleTheme();
