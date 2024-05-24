
import face1 from "../../../assets/images/faces/1.jpg";
import face2 from "../../../assets/images/faces/2.jpg";
import face4 from "../../../assets/images/faces/4.jpg";
import face5 from "../../../assets/images/faces/5.jpg";
import face6 from "../../../assets/images/faces/6.jpg";
import face7 from "../../../assets/images/faces/7.jpg";
import face8 from "../../../assets/images/faces/8.jpg";
import face10 from "../../../assets/images/faces/10.jpg";
import face11 from "../../../assets/images/faces/11.jpg";
import face12 from "../../../assets/images/faces/12.jpg";
import face13 from "../../../assets/images/faces/13.jpg";
import face14 from "../../../assets/images/faces/14.jpg";
import face15 from "../../../assets/images/faces/15.jpg";
import face21 from "../../../assets/images/faces/21.jpg";
import media39 from "../../../assets/images/media/media-39.jpg";
import media13 from "../../../assets/images/media/media-13.jpg";
import media63 from "../../../assets/images/media/media-63.jpg";
import media34 from "../../../assets/images/media/media-34.jpg";
import media36 from "../../../assets/images/media/media-36.jpg";
import media21 from "../../../assets/images/media/media-21.jpg";

const icon1 = <i className="ri-heart-3-fill text-[1rem] text-danger"></i>
const icon2 = <i className="ri-heart-3-line text-[1rem] text-[#8c9097] dark:text-white/50"></i>
// const img = <div className="avatar avatar-xl avatar-rounded me-3 bg-primary text-white font-medium">SJ</div>
interface contacts {
    id: number
    src: string
    phn: string
    class:string
    email: string
    icon :JSX.Element
}
export const contactsdata:contacts[] = [
    { id: 1, class: "Melissa Jane", email: "melissajane2134@gmail.com", phn: "+1(555) 354 2345", icon: icon1, src: face4 },
    { id: 2, class: "Simon Cowall", email: "simoncowal111@gmail.com", phn: " +1(555) 873 8923", icon: icon2, src: face15 },
    { id: 3, class: "Susana Sane", email: "susanasane@gmail.com", phn: "+1(555) 347 0923", icon: icon2, src: face2 },
    { id: 4, class: "Sahne Watson", email: "shanewatson@gmail.com", phn: "+1(555) 674 7824", icon: icon2, src: face13 },
    { id: 5, class: "Dwayne Happy", email: "dwaynehappy235@gmail.com", phn: "+1(555) 985 2893", icon: icon2, src: media39 },
    { id: 6, class: "Meisha Tite", email: "meishatite456@gmail.com", phn: "+1(555) 675 4680", icon: icon2, src: face5 },
    { id: 7, class: "Andrew Gerfield", email: "andrewgerfield00@gmail.com", phn: "+1(555) 765 8937", icon: icon2, src: face10 },
    { id: 8, class: "Samantha Melon", email: "samanthamelon@gmail.com", phn: "+1(555) 890 5687", icon: icon2, src: face21 },
    { id: 9, class: "Elisha Smith", email: "elishasmith@gmail.com", phn: "+1(555) 972 9883", icon: icon2, src: face11 },
    { id: 10, class: "Devon Convoy", email: "devonconvoy65@gmail.com", phn: "+1(555) 693 7836", icon: icon2, src: media63 },
    { id: 11, class: "Jason Mama", email: "jasonmama96@gmail.com", phn: "+1(555) 875 6789", icon: icon2, src: face12 },
    { id: 12, class: "Monika Karen", email: "monikakaren@gmail.com", phn: "+1(555) 568 9234", icon: icon2, src: face1 },
    { id: 13, class: "Tom Holland", email: "tomholland98@gmail.com", phn: "+1(555) 892 4334", icon: icon2, src: media13 },
    { id: 14, class: "Anelica Julie", email: "angelicajulie@gmail.com", phn: "+1(555) 882 3445", icon: icon2, src: media36 },
    { id: 15, class: "Aneera Khan", email: "aneerakhan@gmail.com", phn: "+1(555) 973 8734", icon: icon2, src: face8 },
    { id: 16, class: "Linda Simson", email: "lindasimson@gmail.com", phn: "+1(555) 234 9345", icon: icon2, src: face21 },
    { id: 17, class: "Umaga Nigel", email: "umaganigel89@gmail.com", phn: "+1(555) 783 0213", icon: icon2, src: face14 },
    { id: 18, class: "Json Taylor", email: "jsontaylor@gmail.com", phn: "+1(555) 234 2452", icon: icon2, src: face8 },
    { id: 19, class: "Karizma Tope", email: "Karizmatope@gmail.com", phn: "+1(555) 890 2455", icon: icon2, src: face7 },
    { id: 20, class: "Gahaskar Shaik", email: "gahaskarshaik@gmail.com", phn: "+1(555) 982 7648", icon: icon2, src: media34 },
    { id: 21, class: "Balvinder Singh", email: "balvindersingh@gmail.com", phn: "+1(555) 002 1239", icon: icon2, src: media21 },
    { id: 22, class: "Ramika Missi", email: "ramikamissi@gmail.com", phn: "+1(555) 982 4834", icon: icon2, src: face6 }
]