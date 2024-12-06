/**
 * This component receives a formId and a formMarkup (HTML of the form) as properties
 * and renders a fieldset with the formMarkup as innerHTML.
 * The form within the fieldset will have its id attribute set to the formId.
 */
import React, { useEffect, useRef, useState } from "react";

export const ContactForm7 = ({ formId, formMarkup }) => {
    // Create a reference for the fieldset element to interact with the DOM directly
    const formRef = useRef(null);
    const [hasSubmitted,setHasSubmitted]=useState(false);
    useEffect(() => {
        /**
         * On component mount, retrieve the form element within the fieldset.
         * Set the form's id attribute to the provided formId.
         * This step is crucial because formMarkup is an HTML string and can't be manipulated directly.
         */
        if (formRef?.current) {
            const formElement = formRef.current.getElementsByTagName("form")?.[0];
            if (formElement) {
                // Define the form submit handler
                const handleSubmit = (e) => {
                    e.preventDefault(); // Prevent default form submission behavior
                    const formData = new FormData(e.target); // Capture form data

                    // Send form data to the specified endpoint using a POST request
                    fetch(`${process.env.GATSBY_WP_URL}/wp-json/contact-form-7/v1/contact-forms/${formId}/feedback`, {
                        method: "POST",
                        body: formData,
                    }).then(()=>{
                        setHasSubmitted(true);
                    });
                };

                // Attach the submit event listener to the form
                formElement.addEventListener("submit", handleSubmit);
                
                // Cleanup function to remove event listener on component unmount
                return () => {
                    formElement.removeEventListener("submit", handleSubmit);
                };
            }
        }
    }, [formRef, formId]);

    /**
     * Render a fieldset with the formMarkup as its innerHTML.
     * The form inside the fieldset will have its id attribute assigned to the formId.
     */
    return (hasSubmitted?<div className="bg-emerald-900 text-white p-4 text-center">Thank you for your message!</div>:<fieldset  ref={formRef} dangerouslySetInnerHTML={{ __html: formMarkup }} ></fieldset>);
};

