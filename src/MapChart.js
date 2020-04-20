import React from "react";
import JSON from "./map";


import {
  ComposableMap,
  Geographies,
  Geography
} from "react-simple-maps";

const geoUrl = JSON;





 class MapChart extends React.Component{

  
  constructor () {
    super();
    this.state = {
        isVisible: false,
    };
    
}

  handleClick(e)
  {
    this.props.name(e);

  }
 
  

  render()
  {

    return(
    
      <ComposableMap style={{ backgroundColor :"#b3e5fc" }} data-tip="" projectionConfig={{ scale: 200 }}>
        
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map(geo => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onMouseEnter={() => {
                    // const { NAME} = geo.properties;
                    // this.props.setTooltipContent(`${NAME}`);
                  }}
                  onClick={() => { 
                    
                    const { NAME} = geo.properties;
                  
                    this.handleClick(`${NAME}`);
                  }}
                  onMouseLeave={() => {
                    //  
                  }}
                  style={{
                    default: {
                      fill: "#1565c0",
                      outline: "none"
                    },
                    hover: {
                      fill: "#e91e63",
                      outline: "none"
                    },
                    pressed: {
                      fill: "#9c27b0",
                      outline: "none"
                    }
                  }}
                />
              ))
            }
          </Geographies>
        
      </ComposableMap>
    
  );
    
  }

  
  
}

export default MapChart;
