import { Toolbar } from "../components/Toolbar";
import styles from "../styles/EOM.module.css";
export const EOM =({employee}) =>{
     console.log(employee);
     return (
          <div className="page-container">
          <Toolbar/>
          <div className={styles.main}>
          <h1>Employee of the month</h1>
          <div className={styles.employeeOfTheMonth}>
               <h3>{employee.employee}</h3>
               <h3>{employee.position}</h3>
               <img src={employee.image || "public/assets/image.jpg"} alt="../public/image.jpg"/>
          </div>
          </div>
          </div>)
}


export const getServerSideProps = async(pageContext) =>{
     const apiResponse = await fetch(`http://localhost:3004/employeeOfTheMonth`);
     const employee = await apiResponse.json();
     return {
          props:{
               employee: employee[0]
          }
     }

}

export default EOM; // required for next js tp be able to import them.