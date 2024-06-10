// interface Props {
//   name: string;
//   lname?: string;
// }

// const InitialsComponent: React.FC<Props> = ({ name, lname }) => {
//   const getInitials = (name: string, lname: string) => {
//     const firstNameInitial = name.charAt(0).toUpperCase();
//     const lastNameInitial = lname.charAt(0).toUpperCase();
//     return `${firstNameInitial}${lastNameInitial}`;
//   };

//   return (
//     <div>
//       <div className="d-flex align-items-center">
//         <div className="me-sm-2 me-0">
//           <div className="rounded-circle">
//             <h2> {getInitials(name, lname)}</h2>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default InitialsComponent;
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

interface Props {
  name: string;
  lname?: string;
}

const InitialsComponent: React.FC<Props> = ({ name }) => {
  const getInitials = (fullName: string, numWords = 2) => {
    if (!fullName) return '';

    return fullName
      .split(' ')
      .slice(0, numWords)
      .map((word: any) => word.charAt(0).toUpperCase())
      .join('');
  };

  // Use getInitials function with only first two words
  const initials = getInitials(name, 2);

  return (
    <div>
      <div className='d-flex align-items-center'>
        <div className='me-sm-2 me-0'>
          <div className='rounded-circle'>
            <h6>{initials}</h6>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InitialsComponent;
