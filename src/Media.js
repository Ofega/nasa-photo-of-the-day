import React from "react";
import LoadingIndicator from "./LoadingIndicator";

const Media = props => {
    const { isLoading, media_type, url, title, explanation } = props;
    return (
        <div className="media-container">
            <div className="media">
                { 
                    isLoading ? 
                        <LoadingIndicator /> :
                        media_type === "image" ? 
                            <img src={url} alt={title} /> :
                            <iframe src={url} title={title}></iframe>
                }
            </div>
            <div className="media-content">
            <h2>{title}</h2>
            <p>{explanation}</p>
            </div>
        </div>
    )
}

export default Media;