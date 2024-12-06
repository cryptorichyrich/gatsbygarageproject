import React from 'react';
import { BlockRenderer, getClasses, getStyles } from '@webdeveducation/wp-block-tools';
import { MediaText, CallToActionButton, Cover, TickItem, CarPrice, CarSearch, ContactForm7 } from '../components';
import { GatsbyImage } from 'gatsby-plugin-image';

export const blockRendererComponents=(block)=>{                
    switch(block.name){
        case "contact-form-7/contact-form-selector":
            return (
            <ContactForm7 
            key={block.id} 
            formId={block.attributes.id} 
            formMarkup={block.attributes.formMarkup.replace('novalidate="novalidate"',"").split('aria-required="true"').join('aria-required="true" required')}
            />);
        case "tgg/carsearch":
            return <CarSearch key={block.id}
            style={getStyles(block)} 
            className={getClasses(block)}             
            ></CarSearch>
        case "tgg/carprice":
            return (<CarPrice key={block.id} price={block.attributes.price} blocks={block.innerBlocks}></CarPrice>);
        case "tgg/tickitem":
            return (<TickItem key={block.id}> 
            <BlockRenderer blocks={block.innerBlocks}/>
            </TickItem>);
        case "core/cover":
            return(<Cover key={block.id} 
                style={getStyles(block)} 
                className={getClasses(block)} 
                gatsbyImage={block.attributes.gatsbyImage}>
                    <BlockRenderer blocks={block.innerBlocks}/>
            </Cover>);
        case "core/image":
            return (
            <figure key={block.id} className={getClasses(block)}>
                <GatsbyImage 
                style={getStyles(block)}
                image={block.attributes.gatsbyImage}
                alt={block.attributes.alt || ""}
                width={block.attributes.width}
                height={block.attributes.height}/>
            </figure>);
        case "core/media-text":
            return <MediaText 
            key={block.id} 
            className={getClasses(block)} 
            style={getStyles(block)} 
            gatsbyImage={block.attributes.gatsbyImage} 
            mediaPosition={block.attributes.mediaPosition} 
            verticalAlignment={block.attributes.verticalAlignment}>
                <BlockRenderer blocks={block.innerBlocks}/>
            </MediaText>;
        case "tgg/ctabutton":
            const alignMap={
                'left':"text-left",
                'center':"text-center",
                'right':"text-right"
            }
            return (
                <div key={block.id} className={alignMap[block.attributes.data.align]}>
                <CallToActionButton dynamicContent={block.dynamicContent} destination={block.attributes.data.destination} label={block.attributes.data.label}/>
                </div>
            );
        default:
            return null; 
    }
};
