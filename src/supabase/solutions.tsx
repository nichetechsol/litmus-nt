/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import supabase from '@/supabase/db';
interface FolderResult {
  folder: string;
  errorCode: number;
  message: string;
  data: {
    currentFiles: string[];
    archivedFiles: string[];
  } | null;
}

// async function listSolutions() {
//   // Fetch the list of Litmus Products from storage
//   const { data, error } = await supabase.storage
//     .from('Litmus_Solutions')
//     .list();

//   // Handle errors from fetching Litmus Products
//   if (error) {
//     return {
//       errorCode: 1,
//       message: 'Error fetching Litmus Products',
//       data: null,
//     };
//   }

//   if (!data || data.length === 0) {
//     return {
//       errorCode: 1,
//       message: 'No Data Available for this product',
//       data: null,
//     };
//   }

//   const results = [];

//   for (const item of data) {
//     const { data: folderData, error: folderError } = await supabase.storage
//       .from('Litmus_Solutions')
//       .list(item.name);

//     if (folderError) {
//       results.push({
//         folder: item.name,
//         errorCode: 1,
//         message: 'Error retrieving folder contents',
//         data: null,
//       });
//       continue;
//     }

//     let downloadLink = null;
//     let dataName = null;

//     if (folderData && folderData.length > 0) {
//       if (item.name === 'LE_Production_Record_DB') {
//         // Fetch sub-folders within LE_Production_Record_DB
//         for (const subFolder of folderData) {
//           const { data: subFolderData, error: subFolderError } =
//             await supabase.storage
//               .from('Litmus_Solutions')
//               .list(`${item.name}/${subFolder.name}`);

//           if (subFolderError) {
//             results.push({
//               folder: `${item.name}/${subFolder.name}`,
//               errorCode: 1,
//               message: 'Error retrieving sub-folder contents',
//               data: null,
//             });
//             continue;
//           }

//           if (subFolderData && subFolderData.length > 0) {
//             dataName = subFolderData[0].name;
//             const { data: signedUrlData, error: signedUrlError } =
//               await supabase.storage
//                 .from('Litmus_Solutions')
//                 .createSignedUrl(
//                   `${item.name}/${subFolder.name}/${dataName}`,
//                   60,
//                 ); // Adjust the expiration time as needed

//             if (signedUrlError) {
//               downloadLink = null;
//             } else {
//               downloadLink = signedUrlData.signedUrl;
//             }

//             results.push({
//               folder: `${item.name}/${subFolder.name}`,
//               errorCode: 0,
//               message: 'Success',
//               data: {
//                 FileName: dataName,
//                 downloadLink: downloadLink,
//               },
//             });
//           }
//         }
//       } else {
//         dataName = folderData[0].name;
//         const { data: signedUrlData, error: signedUrlError } =
//           await supabase.storage
//             .from('Litmus_Solutions')
//             .createSignedUrl(`${item.name}/${dataName}`, 60); // Adjust the expiration time as needed

//         if (signedUrlError) {
//           downloadLink = null;
//         } else {
//           downloadLink = signedUrlData.signedUrl;
//         }

//         results.push({
//           folder: item.name,
//           errorCode: 0,
//           message: 'Success',
//           data: {
//             FileName: dataName,
//             downloadLink: downloadLink,
//           },
//         });
//       }
//     }
//   }

//   return {
//     errorCode: 0,
//     message: 'Success',
//     data: results,
//   };
// }
async function listSolutions() {
  // Fetch the list of Litmus Products from storage
  const { data, error } = await supabase.storage
    .from('Litmus_Solutions')
    .list();

  // Handle errors from fetching Litmus Products
  if (error) {
    return {
      errorCode: 1,
      message: 'Error fetching Litmus Products',
      data: null,
    };
  }

  if (!data || data.length === 0) {
    return {
      errorCode: 1,
      message: 'No Data Available for this product',
      data: null,
    };
  }

  const results = [];

  for (const item of data) {
    const { data: folderData, error: folderError } = await supabase.storage
      .from('Litmus_Solutions')
      .list(item.name);

    if (folderError) {
      results.push({
        folder: item.name,
        errorCode: 1,
        message: 'Error retrieving folder contents',
        data: null,
      });
      continue;
    }

    let downloadLink = null;
    let dataName = null;

    if (folderData && folderData.length > 0) {
      if (item.name === 'LE_Production_Record_DB') {
        // Fetch sub-folders within LE_Production_Record_DB
        for (const subFolder of folderData) {
          const { data: subFolderData, error: subFolderError } =
            await supabase.storage
              .from('Litmus_Solutions')
              .list(`${item.name}/${subFolder.name}`);

          if (subFolderError) {
            results.push({
              folder: `${item.name}/${subFolder.name}`,
              errorCode: 1,
              message: 'Error retrieving sub-folder contents',
              data: null,
            });
            continue;
          }

          if (subFolderData && subFolderData.length > 0) {
            dataName = subFolderData[0].name;
            const { data: signedUrlData, error: signedUrlError } =
              await supabase.storage
                .from('Litmus_Solutions')
                .createSignedUrl(
                  `${item.name}/${subFolder.name}/${dataName}`,
                  60,
                ); // Adjust the expiration time as needed

            if (signedUrlError) {
              downloadLink = null;
            } else {
              downloadLink = signedUrlData.signedUrl;
            }

            results.push({
              folder: `${item.name}/${subFolder.name}`,
              errorCode: 0,
              message: 'Success',
              data: {
                FileName: dataName,
                downloadLink: downloadLink,
              },
            });
          }
        }
      } else {
        dataName = folderData[0].name;
        const { data: signedUrlData, error: signedUrlError } =
          await supabase.storage
            .from('Litmus_Solutions')
            .createSignedUrl(`${item.name}/${dataName}`, 60); // Adjust the expiration time as needed

        if (signedUrlError) {
          downloadLink = null;
        } else {
          downloadLink = signedUrlData.signedUrl;
        }

        results.push({
          folder: item.name,
          errorCode: 0,
          message: 'Success',
          data: {
            FileName: dataName,
            downloadLink: downloadLink,
          },
        });
      }
    }
  }

  return {
    errorCode: 0,
    message: 'Success',
    data: results,
  };
}

async function listOfAllSolutions() {
  // Fetch the list of Litmus Products from storage
  const { data: folders, error: folderError } = await supabase.storage
    .from('Litmus_Solutions')
    .list();

  // Handle errors from fetching Litmus Products
  if (folderError) {
    return {
      errorCode: 1,
      message: 'Error fetching Litmus Products',
      data: null,
    };
  }

  if (!folders || folders.length === 0) {
    return {
      errorCode: 1,
      message: 'No Data Available for this product',
      data: null,
    };
  }

  const results = await Promise.all(
    folders.map(async (item) => {
      const mainFolder: any = {
        folder: item.name,
        errorCode: 0,
        message: 'Success',
        data: [],
      };

      const { data: folderData, error: folderError } = await supabase.storage
        .from('Litmus_Solutions')
        .list(item.name);

      if (folderError) {
        return {
          ...mainFolder,
          errorCode: 1,
          message: 'Error retrieving folder contents',
        };
      }

      const processFiles = async (
        folderPath: any,
        files: any[],
        includeSubFolder: boolean,
      ) => {
        const subFolderData: any = {
          files: [],
        };

        if (includeSubFolder) {
          subFolderData.subFolder = folderPath;
        } else {
          subFolderData.subFolder = '';
        }

        for (const file of files) {
          if (file.name !== '.emptyFolderPlaceholder') {
            const downloadLink = await generateSignedUrl(
              `${folderPath}/${file.name}`,
            );
            subFolderData.files.push({
              FileName: file.name,
              downloadLink: downloadLink,
            });
          }
        }

        if (subFolderData.files.length > 0) {
          mainFolder.data.push(subFolderData);
        }
      };

      if (item.name === 'LE_Production_Record_DB') {
        // Fetch sub-folders within LE_Production_Record_DB
        await Promise.all(
          folderData.map(async (subFolder) => {
            const { data: subFolderFiles, error: subFolderError } =
              await supabase.storage
                .from('Litmus_Solutions')
                .list(`${item.name}/${subFolder.name}`);

            if (subFolderError) {
              mainFolder.data.push({
                subFolder: subFolder.name,
                errorCode: 1,
                message: 'Error retrieving sub-folder contents',
                files: [],
              });
            } else if (subFolderFiles && subFolderFiles.length > 0) {
              await processFiles(
                `${item.name}/${subFolder.name}`,
                subFolderFiles,
                true,
              );
            }
          }),
        );
      } else {
        await processFiles(item.name, folderData, false);
      }

      return mainFolder;
    }),
  );

  return {
    errorCode: 0,
    message: 'Success',
    data: results,
  };
}

const generateSignedUrl = async (path: string) => {
  const { data: signedUrlData, error: signedUrlError } = await supabase.storage
    .from('Litmus_Solutions')
    .createSignedUrl(path, 60); // Adjust the expiration time as needed
  if (signedUrlError) {
    return null;
  }
  return signedUrlData.signedUrl;
};

export { listOfAllSolutions, listSolutions };
