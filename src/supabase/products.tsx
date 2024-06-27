/* eslint-disable simple-import-sort/exports */
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

async function listLitmusProducts(site_id: any, org_id: any, org_type_id: any) {
  // Fetch entitlements package based on site_id
  const { data: entitlements_package, error: errorEntitlement } = await supabase
    .from('entitlements_package')
    .select('*')
    .eq('site_id', site_id);

  // Check if there was an error in fetching entitlements package
  if (errorEntitlement) {
    return {
      errorCode: 2,
      message: 'Error fetching entitlements package',
      data: null,
    };
  }

  // Determine the relevant entitlements
  const entitlement14 = entitlements_package.some(
    (entitlement) => entitlement.entitlement_name_id === 14,
  );
  const entitlement15 = entitlements_package.some(
    (entitlement) => entitlement.entitlement_name_id === 15,
  );
  if (org_type_id === 1 && !entitlement14) {
    return {
      errorCode: 1,
      message: 'Entitlement 14 is required for org_type_id 1',
      data: null,
    };
  }

  const entitlementValue = entitlements_package.find(
    (entitlement) => entitlement.entitlement_name_id === 14,
  );
  const entitlement_value_id_14 = entitlementValue
    ? entitlementValue.entitlement_value_id
    : null;

  const { data: entitlements_values, error: errorValues } = await supabase
    .from('entitlements_values')
    .select('*')
    .eq('id', entitlement_value_id_14);

  if (errorValues) {
    return {
      errorCode: 1,
      message: 'Error fetching entitlements values',
      data: null,
    };
  }

  const values = entitlements_values
    ? entitlements_values[0]?.value_text
    : null;

  const {
    data: filedownload_permissions,
    error: filedownload_permissions_error,
  } = await supabase
    .from('filedownload_permissions')
    .select('*')
    .eq('org_type_id', org_type_id)
    .eq('entitlement_value', values);

  if (filedownload_permissions_error) {
    return {
      errorCode: 5,
      message: 'Error fetching file download permissions',
      data: null,
    };
  }

  const fileTypes = filedownload_permissions.map(
    (permission) => permission.file_type,
  );
  // Fetch the list of Litmus Products from storage
  const { data, error } = await supabase.storage.from('Litmus_Products').list();

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

  // Filter folders based on entitlements
  const filteredFolders = data.filter((item) => {
    if (
      entitlement14 &&
      (item.name === 'Litmus_Edge' || item.name === 'Litmus_Edge_Manager')
    ) {
      return true;
    }
    if (entitlement15 && item.name === 'Litmus_UNS') {
      return true;
    }
    return false;
  });

  const results = [];
  for (const item of filteredFolders) {
    const { data: folderData, error: folderError } = await supabase.storage
      .from('Litmus_Products')
      .list(item.name);

    if (folderError) {
      results.push({
        folder: item.name,
        errorCode: 1,
        message: 'Error retrieving folder contents',
        data: null,
      });
    } else {
      const currentFiles = folderData
        .filter((subItem) => subItem.name.includes('_Current'))
        .map((subItem) => subItem.name);

      // Get the top file from the currentFiles array
      const topFile = currentFiles.length > 0 ? currentFiles[0] : null;

      // Generate a signed URL for the top file
      const downloadLink = null;
      let dataName = null;
      let extensionIncluded = null;

      if (topFile) {
        const { data: fileData, error: signedURLError } = await supabase.storage
          .from('Litmus_Products')
          .list(`${item.name}/${topFile}`); // Adjust the expiration time as needed
        if (fileData && fileData.length > 0) {
          dataName = fileData[0].name;
          const fileExtension = dataName.split('.').pop();
          if (fileExtension) {
            if (org_type_id === 1) {
              extensionIncluded = fileTypes.includes(fileExtension) ? 'Y' : 'N';
            } else if (org_type_id === 2 || org_type_id === 3) {
              extensionIncluded = 'Y';
            }
          }

          // const { data: download, error } = await supabase.storage
          //   .from('Litmus_Products')
          //   .createSignedUrl(`${item.name}/${topFile}/${dataName}`, 60);
          // if (error) {
          //   downloadLink = null;
          // } else {
          //   downloadLink = download.signedUrl;
          //   const fileExtension = dataName.split('.').pop();
          //   if (org_type_id === 1) {
          //     extensionIncluded = fileTypes.includes(fileExtension) ? 'Y' : 'N';
          //   } else if (org_type_id === 2 || org_type_id === 3) {
          //     extensionIncluded = 'Y';
          //   }
          // }
        }
      }

      results.push({
        folder: item.name,

        errorCode: 0,
        message: 'Success',
        data: {
          FileName: dataName,
          downloadLink: '',
          extensionIncluded: extensionIncluded,
          subfolder: topFile,
        },
      });
    }
  }

  return {
    errorCode: 0,
    message: 'Success',
    data: results,
  };
}

async function allCurrentfiles(site_id: any, org_id: any, org_type_id: any) {
  if (!site_id || !org_id || !org_type_id) {
    return {
      errorCode: 1,
      message: 'Error fetching files',
      data: null,
    };
  }

  const { data: entitlements_package, error: errorEntitlement } = await supabase
    .from('entitlements_package')
    .select('*')
    .eq('site_id', site_id);

  if (errorEntitlement) {
    return {
      errorCode: 1,
      message: 'Error fetching entitlements package',
      data: null,
    };
  }

  const entitlement14 = entitlements_package.some(
    (entitlement) => entitlement.entitlement_name_id === 14,
  );
  const entitlement15 = entitlements_package.some(
    (entitlement) => entitlement.entitlement_name_id === 15,
  );

  if (org_type_id === 1 && !entitlement14) {
    return {
      errorCode: 1,
      message: 'Entitlement 14 is required for org_type_id 1',
      data: null,
    };
  }

  const entitlementValue = entitlements_package.find(
    (entitlement) => entitlement.entitlement_name_id === 14,
  );
  const entitlement_value_id_14 = entitlementValue
    ? entitlementValue.entitlement_value_id
    : null;

  const { data: entitlements_values, error: errorValues } = await supabase
    .from('entitlements_values')
    .select('*')
    .eq('id', entitlement_value_id_14);

  if (errorValues) {
    return {
      errorCode: 1,
      message: 'Error fetching entitlements values',
      data: null,
    };
  }

  const values = entitlements_values
    ? entitlements_values[0]?.value_text
    : null;

  const {
    data: filedownload_permissions,
    error: filedownload_permissions_error,
  } = await supabase
    .from('filedownload_permissions')
    .select('*')
    .eq('org_type_id', org_type_id)
    .eq('entitlement_value', values);

  if (filedownload_permissions_error) {
    return {
      errorCode: 5,
      message: 'Error fetching file download permissions',
      data: null,
    };
  }

  const fileTypes = filedownload_permissions.map(
    (permission) => permission.file_type,
  );

  const { data: litmusProducts, error: litmusProductsError } =
    await supabase.storage.from('Litmus_Products').list();

  if (litmusProductsError) {
    return {
      errorCode: 1,
      message: 'Error fetching Litmus Products',
      data: null,
    };
  }

  if (!litmusProducts || litmusProducts.length === 0) {
    return {
      errorCode: 1,
      message: 'No Data Available for this product',
      data: null,
    };
  }

  const filteredFolders = litmusProducts.filter((item) => {
    if (
      entitlement14 &&
      (item.name === 'Litmus_Edge' || item.name === 'Litmus_Edge_Manager')
    ) {
      return true;
    }
    if (entitlement15 && item.name === 'Litmus_UNS') {
      return true;
    }
    return false;
  });

  const results = await Promise.all(
    filteredFolders.map(async (item) => {
      const { data: folderData, error: folderError } = await supabase.storage
        .from('Litmus_Products')
        .list(item.name);

      if (folderError) {
        return {
          folder: item.name,
          errorCode: 1,
          message: 'Error retrieving folder contents',
          data: null,
        };
      }

      const filesWithLinks = await Promise.all(
        folderData.map(async (subItem) => {
          const allFiles = {
            name: subItem.name,
            status: subItem.name.includes('_Current') ? 'current' : 'archive',
          };

          const { data: fileData, error: fileDataError } =
            await supabase.storage
              .from('Litmus_Products')
              .list(`${item.name}/${allFiles.name}`);

          if (fileDataError) {
            return null;
          }

          return await Promise.all(
            fileData.map(async (fileEntry) => {
              const dataName = fileEntry.name;
              const fileExtension = dataName.split('.').pop();
              let extensionIncluded;

              if (org_type_id === 1) {
                extensionIncluded = fileTypes.includes(fileExtension)
                  ? 'Y'
                  : 'N';
              } else if (org_type_id === 2 || org_type_id === 3) {
                extensionIncluded = 'Y';
              }

              // const { data: download, error: downloadError } =
              //   await supabase.storage
              //     .from('Litmus_Products')
              //     .createSignedUrl(
              //       `${item.name}/${allFiles.name}/${dataName}`,
              //       60,
              //     );

              // if (downloadError) {
              //   return null;
              // }

              return {
                FileName: dataName,
                downloadLink: '',
                status: allFiles.status,
                disabled: extensionIncluded,
                subfolder: allFiles.name,
              };
            }),
          );
        }),
      );

      return {
        folder: item.name,
        errorCode: 0,
        message: 'Success',
        data: filesWithLinks.flat(),
      };
    }),
  );

  return {
    errorCode: 0,
    message: 'Success',
    data: results,
  };
}

async function allfiles() {
  // Retrieve the list of items in the root directory
  const { data: rootData, error: rootError } = await supabase.storage
    .from('Litmus_Products')
    .list();

  // Handle error if there's an issue fetching root data
  if (rootError) {
    return {
      errorCode: 1,
      message: 'No Data Available for this product',
      data: null,
    };
  }

  const results = []; // Array to store results from each folder
  const currentFilesList = []; // Array to store current files

  // Iterate over each item in the root directory
  for (const item of rootData) {
    // Retrieve the list of items within the current folder
    const { data: folderData, error: folderError } = await supabase.storage
      .from('Litmus_Products')
      .list(item.name);

    if (folderError) {
      // Handle error if there's an issue fetching folder data
      results.push({
        folder: item.name,
        errorCode: 1,
        message: 'Error retrieving folder contents',
        data: null,
      });
    } else {
      // Separate current and old files based on their names
      const currentFiles = folderData
        .filter((subItem) => subItem.name.includes('_Current'))
        .map((subItem) => subItem.name);

      const notCurrentFiles = folderData
        .filter((subItem) => !subItem.name.includes('_Current'))
        .map((subItem) => subItem.name);

      // Add the current files to the currentFilesList array
      currentFilesList.push(...currentFiles);

      // Store the result for the current folder
      results.push({
        folder: item.name,
        errorCode: 0,
        message: 'Success',
        data: {
          currentFiles: currentFiles,
          oldFiles: notCurrentFiles,
        },
      });
    }
  }

  return {
    errorCode: 0,
    message: 'Success',
    data: currentFilesList, // Return the list of current files
  };
}
const downloadProduct = async (
  folder: string,
  subfolder: any,
  fileName: any,
) => {
  const path: any = folder + '/' + subfolder + '/' + fileName;
  const { data, error } = await supabase.storage
    .from('Litmus_Products')
    .download(path);

  // Adjust the expiration time as needed
  if (error) {
    return null;
  }
  return data;
};
export { allCurrentfiles, allfiles, listLitmusProducts, downloadProduct };
