import React from "react";
import styled from 'styled-components'
import LoadingIndicator from "./LoadingIndicator";


const Media = props => {

    const { isLoading, media_type, url, title, copyright, explanation } = props;

    return (
        <MediaContainer>
            <figure>
                { 
                    isLoading ? 
                        <LoadingIndicator /> :
                        media_type === "image" ? 
                            <img src={url} alt={title} /> :
                            <iframe src={url} title={title}></iframe>
                }
                <figcaption>{copyright}</figcaption>
            </figure>
            <div>
                <h2>{title}</h2>
                <p>{explanation}</p>
            </div>
        </MediaContainer>
    )
}

export default Media;

const MediaContainer = styled.div`

    max-width: 750px;
    height: 500px;
    background: #e9e9e9;
    width: 100%;

    figure {
        width: 100%;
        height: 100%;

        img,
        iframe {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border: none;
        }
    }

    & > div {
        max-width: 450px;
        color: #000;
        margin: 5rem auto;

        h2 {
            font-size: 2.5rem;
            margin-bottom: 10px;
        }

        p {
            font-size: 1.5rem;
            line-height: 1.5;
        }
    }
`