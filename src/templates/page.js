import React from 'react';
import { BlockRendererProvider} from '@webdeveducation/wp-block-tools';
import {blockRendererComponents} from '../config/blockRendererComponents';
import { Link, graphql } from 'gatsby';
import {Layout} from '../components';
const Page=(props)=>{
    console.log("Page Prop ", props);
  
    return(
        <Layout>
            <BlockRendererProvider 
            allBlocks={props.pageContext.blocks}
            renderComponent={blockRendererComponents}
            siteDomain={process.env.GATSBY_WP_URL}
            customInternalLinkComponent={({children,internalHref,className},index)=>{
              return <Link to={internalHref} className={className} key={index}>{children}</Link>;
            }}
            />
        </Layout>
    );
}

export const query = graphql`
  query SEOPageQuery($databaseId: Int!) {
    wpPage(databaseId: { eq: $databaseId }) {
      seo {
        metaDesc
        title
      }
    }
    wpCar(databaseId: { eq: $databaseId }) {
      seo {
        metaDesc
        title
      }
    }
  }
`;

export const Head=({data})=>{
    const page = data?.wpPage || data?.wpCar;
    if(!page){
        return null;
    }
    return(
        <>
        <title>
            {page?.seo?.title || ""}
        </title>
        <meta name="description" content={page?.seo?.metaDesc ||""}></meta>
        </>
    )
}
export default Page;