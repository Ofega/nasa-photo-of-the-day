import React from "react";
// import styled from 'styled-components'

const LoadingIndicator = () => {
    return (
        <div className="lds-css ng-scope">
            <div className="lds-spinner">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    )
}

export default LoadingIndicator;