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

interface Props {
  name: string;
  lname?: string;
}

const InitialsComponent: React.FC<Props> = ({ name, lname }) => {
  const getInitials = (name: string, lname?: string) => {
    const firstNameInitial = name.charAt(0).toUpperCase();
    const lastNameInitial = lname ? lname.charAt(0).toUpperCase() : "";
    return `${firstNameInitial}${lastNameInitial}`;
  };

  return (
    <div>
      <div className="d-flex align-items-center">
        <div className="me-sm-2 me-0">
          <div className="rounded-circle">
            <h6> {getInitials(name, lname)} </h6>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InitialsComponent;
