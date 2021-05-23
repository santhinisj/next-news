import styles from "../../styles/Feed.module.css";
import {Toolbar} from "../../components/Toolbar";
import {useRouter } from 'next/router';

export const Feed = ({articles, pageNumber}) =>{
     const router = useRouter();
     return (
          <div className="page-container">
          <Toolbar/>
          <div className={styles.main}>
          Pagenumber {pageNumber}
          {articles.map((each,index) => {
               return(
                    <div key={index} className={styles.post}>

                    <h1>{each.title}</h1>
                    <div>{each.description}</div>
                    <img src={each.urlToImage} />
                    <div >{each.description}</div>
                    </div>
               )
          })}
          <div className={styles.paginator}>
          <div onClick={()=>pageNumber!=1 ?router.push(`/feed/${pageNumber-1}`).then(()=>scrollTo(0,0)): null} className={pageNumber!=1?styles.active:styles.disabled}>Previous</div>
          <div onClick={()=>router.push(`/feed/${pageNumber+1}`)} >Next</div>
          </div>
          </div>
          </div>)

}

 // ----------------------------------------------------
// scrollTo  TO SCROLL TO THE TOP OF THE SCREEN
// -------------------------------------------------------
export const getServerSideProps = async pageContext => {
     const pageNumber = pageContext.query.slug;
     if(!pageNumber || pageNumber<0){
          return {
               props:{
                    articles:[],
                    pageNumber:1
               }
          }
     }
     else{
          var url = 'https://newsapi.org/v2/everything?' +
          'q=Apple&' +
          'from=2021-05-23&' +
          'sortBy=popularity&' +
          'pageSize=5&'+
          `pageNumber=${pageNumber}`;
          const apiResponse = await fetch(url,{
               headers:{
                    Authorization:`Token ${process.env.NEWS_API}`
               }
          });
          const apiJson = await apiResponse.json();
          const {articles } = apiJson;
          return {
               props:{
                    articles:articles,
                    pageNumber:Number.parseInt(pageNumber)
               }
          }
     }

}

export default Feed;