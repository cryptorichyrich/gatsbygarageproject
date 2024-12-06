const path = require("path");
const { assignIds, assignGatsbyImage } = require("@webdeveducation/wp-block-tools");
const fs = require("fs");
exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions;

  // Correctly resolve the page template path
  const pageTemplate = path.resolve("src/templates/page.js");

  // GraphQL query
  const { data, errors } = await graphql(`
    query AllPagesQuery {
        wp {
            themeStylesheet
        }
      allWpCar{
        nodes{
          databaseId
          blocks
          uri
        }
      }
      allWpPage {
        nodes {
          blocks
          databaseId
          uri
        }
      }
    }
  `);

  const allPages=[...data.allWpPage.nodes,...data.allWpCar.nodes];
  // Handle errors in GraphQL query
  if (errors) {
    console.error("GraphQL query errors:", errors);
    return;
  }

  // Handle case when no pages are found
  if (!allPages || allPages.length === 0) {
    console.warn("No pages found in WordPress");
    return;
  }

  try{
    fs.writeFileSync("./public/themeStylesheet.css", data.wp.themeStylesheet);
  }catch(e){

  }
  // Loop through the pages and create pages
  for (let i = 0; i < allPages.length; i++) {
    const page = allPages[i];
    let blocks = page.blocks;

    // Assign unique IDs to blocks, safeguard against undefined
    blocks = assignIds(blocks);
    blocks = await assignGatsbyImage({
      blocks,
      graphql,
      coreMediaText: true,
      coreImage:true,
      coreCover:true
    })
    // Create page
    createPage({
      path: page.uri,
      component: pageTemplate,
      context: {
        blocks,
        databaseId: page.databaseId, // Pass additional context if needed
      },
    });
  }
};
