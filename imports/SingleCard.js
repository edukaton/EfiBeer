import React from 'react';

export default () => 
  <div className="singleCardComponent">
    <div className="container-fluid">
        <div className="singleCardWrapper row">
            <div className="singleCardArrowLeft col-md-2">
                <i className="fas fa-angle-left"></i>
            </div>
            <div className="col-md-8">
                <div className="singleCard"> To jest przykladowa tresc</div>
            </div>
            <div className="singleCardArrowRight col-md-2">
                <i className="fas fa-angle-right"></i>
            </div>
        </div>    
    </div>
  </div>;
