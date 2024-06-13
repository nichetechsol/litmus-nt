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

async function listLitmusProducts(site_id: any) {
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
      let downloadLink = null;
      let dataName = null;
      if (topFile) {
        const { data: fileData, error: signedURLError } = await supabase.storage
          .from('Litmus_Products')
          .list(`${item.name}/${topFile}`); // Adjust the expiration time as needed
        if (fileData && fileData.length > 0) {
          dataName = fileData[0].name;

          const { data: download, error } = await supabase.storage
            .from('Litmus_Products')
            .createSignedUrl(`${item.name}/${topFile}/${dataName}`, 60);
          if (error) {
            downloadLink = null;
          } else {
            downloadLink = download.signedUrl;
          }
        }
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

  return {
    errorCode: 0,
    message: 'Success',
    data: results,
  };
}

async function allCurrentfiles(site_id: any, org_id: any, org_type_id: any) {
  let fileTypes = []; // Declare fileTypes variable

  // Fetch entitlements package based on site_id
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

  // If org_type_id is 1 and entitlement_name_id is not 14, return an error
  if (org_type_id === 1 && !entitlement14) {
    return {
      errorCode: 3,
      message: 'Entitlement 14 is required for org_type_id 1',
      data: null,
    };
  } else {
    // Find the entitlement with entitlement_name_id === 14
    const entitlementValue = entitlements_package.find(
      (entitlement) => entitlement.entitlement_name_id === 14,
    );

    // Get the entitlement_value_id if it exists, otherwise set to null
    const entitlement_value_id_14 = entitlementValue
      ? entitlementValue.entitlement_value_id
      : null;

    // Fetch the entitlements values from the Supabase table based on the entitlement_value_id_14
    const { data: entitlements_values, error } = await supabase
      .from('entitlements_values')
      .select('*')
      .eq('id', entitlement_value_id_14);

    // If there is an error in fetching, log it or handle it accordingly
    if (error) {
      // Handle the error as needed, possibly return or throw
    }

    // Extract the value_text from the fetched data, ensure entitlements_values is not null
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
      // Handle error
    } else {
      // Extracting file_type from each object in filedownload_permissions
      fileTypes = filedownload_permissions.map(
        (permission) => permission.file_type,
      );

      // Now you have an array of file types in fileTypes
    }
  }
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
      // Store all files and their download links
      const filesWithLinks = [];

      const allFiles = folderData.map((subItem) => ({
        name: subItem.name,
        status: subItem.name.includes('_Current') ? 'current' : 'archive',
      }));

      for (const file of allFiles) {
        const { data: fileData, error: signedURLError } = await supabase.storage
          .from('Litmus_Products')
          .list(`${item.name}/${file.name}`);

        if (fileData) {
          for (const fileEntry of fileData) {
            const dataName = fileEntry.name;
            const fileExtension = dataName.split('.').pop(); // Get the file extension

            // Check if the file extension is included in the fileTypes array
            const extensionIncluded = fileTypes.includes(fileExtension)
              ? 'Y'
              : 'N';

            const { data: download, error } = await supabase.storage
              .from('Litmus_Products')
              .createSignedUrl(`${item.name}/${file.name}/${dataName}`, 60);

            if (!error) {
              filesWithLinks.push({
                FileName: dataName,
                downloadLink: download.signedUrl,
                status: file.status,
                disabled: extensionIncluded, // Add extensionIncluded to the result
              });
            }
          }
        }
      }

      results.push({
        folder: item.name,
        errorCode: 0,
        message: 'Success',
        data: filesWithLinks,
      });
    }
  }

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

export { allCurrentfiles, allfiles, listLitmusProducts };
