interface SftpParams {
  path: string;
}

export const listDir = ({ path = '/' }: SftpParams): string[] => {
  const files = ['.', '..', path, 'Folder 1', 'Folder 2', 'File 1.txt', 'File 2.doc'];
  return files;
};

export const getFile = ({ path }: SftpParams): string => {
  return path;
};
