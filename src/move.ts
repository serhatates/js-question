
type List = {
  id: string;
  name: string;
  files: File[]
}[];

type File = {
  id: string;
  name: string;
};

export default function move(list: List, source: string, destination: string): List {
  let sourceFolderIndex: number = -1;
  let destinationFolderIndex: number = -1;
  let fileIndex: number = -1;

  for (let folderIndex = 0, len = list.length; folderIndex < len; folderIndex++) {
    let folder = list[folderIndex];

    if (fileIndex === -1) {
      let fileIndexTemp = folder.files.findIndex(file => file.id === source);
      if (fileIndexTemp !== -1) {
        sourceFolderIndex = folderIndex;
        fileIndex = fileIndexTemp;
      }
    }

    if (folder.id === destination) {
      destinationFolderIndex = folderIndex;
    }

    if (fileIndex !== -1 && destinationFolderIndex !== -1)
      break;
  }

  if (fileIndex === -1) {
    throw new Error('You cannot move a folder');
  }

  if (destinationFolderIndex === -1) {
    throw new Error('You cannot specify a file as the destination');
  }

  const fileToMove: File = list[sourceFolderIndex].files[fileIndex];
  list[destinationFolderIndex].files.push(fileToMove);
  list[sourceFolderIndex].files.splice(fileIndex, 1);

  return list;
}
